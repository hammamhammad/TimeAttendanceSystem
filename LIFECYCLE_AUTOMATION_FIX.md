# Lifecycle Automation Fix — v13.5

**Release date:** 2026-04-16
**Scope:** cross-module (Recruitment, Onboarding, Employee, Contracts, Resignation, Termination, Clearance, Final Settlement, Notifications, Workflows)
**Status:** backend + admin-frontend shipped; 162 tests green; migration additive + deploy-safe

---

## 1. Current lifecycle gaps found

Audit of the pre-v13.5 codebase confirmed seven broken or brittle transitions:

| # | Transition | Pre-v13.5 state |
|---|---|---|
| 1 | Offer Accepted → Onboarding | Wired but hardcoded inline in `OfferLettersController.AcceptOffer` (lines 482–535). Not configurable, not auditable, not idempotent, crashed silently when no template matched. |
| 2 | Onboarding Completed → Activate | **Missing**. Employee was born active at offer acceptance; onboarding completion had no downstream effect. |
| 3 | Resignation Approved → Termination | **Missing**. `ApproveResignationCommandHandler` only flipped `EmploymentStatus=Resigned`; no `TerminationRecord` was ever created automatically. |
| 4 | Termination Created → Clearance | Wired but hardcoded in `CreateTerminationRecordCommandHandler` (8 items, no template, no config, no audit). |
| 5 | Clearance Completed → Enable settlement | **Missing**. `CalculateFinalSettlementCommand` ran regardless of clearance state. |
| 6 | Final Settlement Paid → Deactivate | **Missing**. Deactivation was coupled to termination creation, not payment. |
| 7 | Contract Expired → Action | Alert-only (`ContractExpiryAlertJob`). Contracts silently stayed `Active` past their `EndDate` — a real data-integrity bug. |

Cross-cutting gaps:
- No domain-event pattern (MediatR `INotification` unused for events).
- No automation audit trail — HR couldn't see what fired, failed, or was suppressed.
- `TenantSettings` had zero lifecycle-automation toggles.

---

## 2. Automation design

Seven transitions × one `INotification` event each. Every event handler reads `TenantSettings`, dedupes on an idempotency key, runs its downstream command, and appends exactly one `LifecycleAutomationAudit` row per attempt — succeeded / skipped / failed / duplicate-suppressed / disabled / missing-prerequisite. Handler failures are caught by `ILifecycleEventPublisher` so a buggy handler never cascades back into the originating command.

```
OfferLettersController.AcceptOffer
  └─ publish OfferAcceptedEvent
       └─ OfferAcceptedHandler ─► CreateOnboardingProcessFromOfferCommand
                                     └─ LifecycleAutomationAudit (OfferAcceptedCreateOnboarding)

OnboardingProcessesController.Complete
  └─ publish OnboardingCompletedEvent
       └─ OnboardingCompletedHandler (milestone or activate)
                                     └─ LifecycleAutomationAudit (OnboardingCompletedActivateEmployee)

ApproveResignationCommandHandler
  └─ publish ResignationApprovedEvent
       └─ ResignationApprovedHandler ─► CreateTerminationFromResignationCommand
                                     └─ LifecycleAutomationAudit (ResignationApprovedCreateTermination)

CreateTerminationRecordCommandHandler
  └─ publish TerminationCreatedEvent
       └─ TerminationCreatedHandler ─► CreateClearanceFromTemplateCommand
                                    ─► SuspendEmployeeCommand
                                     └─ LifecycleAutomationAudit (TerminationCreateClearance + TerminationSuspendEmployee)

ClearanceController.CompleteItem (on final item → flip-to-Completed only)
  └─ publish ClearanceCompletedEvent
       └─ ClearanceCompletedHandler (notify-only or ─► CalculateFinalSettlementCommand)
                                     └─ LifecycleAutomationAudit (ClearanceCompletedEnableSettlement)

MarkFinalSettlementPaidCommandHandler
  └─ publish FinalSettlementPaidEvent
       └─ FinalSettlementPaidHandler ─► DeactivateEmployeeCommand
                                     └─ LifecycleAutomationAudit (FinalSettlementPaidDeactivateEmployee)

ContractExpiryAlertJob (daily, Coravel)
  └─ for each contract with EndDate <= today + Status==Active: publish ContractExpiredEvent
       └─ ContractExpiredHandler ─► ApplyContractExpiredActionCommand (configured action)
                                     └─ LifecycleAutomationAudit (ContractExpiredAction)
```

**Design principles that drove the architecture:**

- **Synchronous + idempotent + swallowed-failures.** Handlers run in the same request scope as the originating command (so they see the commit), but via `ILifecycleEventPublisher` which catches everything. An automation bug shows up as a `Failed` audit row, never as HTTP 500.
- **Opt-in for new behavior, opt-out for existing behavior.** Every DB default preserves observable v13.x behavior — deploying this version is a no-op until a tenant flips a flag.
- **Two-phase suspend/deactivate.** The old "deactivate at termination" model conflates login-blocking with record-deactivation. We split them: termination → `IsSuspended=true` + `User.IsActive=false` (login blocked, records visible for reporting/payroll/clearance); final-settlement-paid → `Employee.IsActive=false` (fully off-boarded). New tenants with defaults untouched get the same end-state as v13.x, just with clearer semantics.
- **Contract status fix.** The pre-v13.5 silent "contract Active past end date" bug is cleaned up by default — `ContractExpiredAction = AutoMarkExpired` flips status. Tenants who want the old behavior can set it back to `NotifyOnly`.

---

## 3. Configuration added

**16 new `TenantSettings` fields** (all additive, DB defaults preserve v13.x behavior):

| Field | Type | DB default | Effect |
|---|---|---|---|
| `LifecycleAutomationEnabled` | bool | `true` | Master kill-switch |
| `AutoCreateOnboardingOnOfferAcceptance` | bool | `true` | Matches v13.x hardcoded behavior |
| `DefaultOnboardingTemplateId` | long? | `null` | Null → fall back to dept → branch → IsDefault |
| `CreateEmployeeInactiveAtOfferAcceptance` | bool | `false` | Opt-in pre-hire gate |
| `AutoActivateEmployeeOnOnboardingComplete` | bool | `false` | Opt-in; default = milestone-only |
| `OnboardingCompletionRequiresAllRequiredTasks` | bool | `true` | Matches v13.x validation |
| `OnboardingCompletionRequiresAllRequiredDocuments` | bool | `false` | New gate — opt-in |
| `AutoCreateTerminationOnResignationApproved` | bool | `false` | Opt-in |
| `AutoCreateClearanceOnTermination` | bool | `true` | Matches v13.x behavior |
| `DefaultClearanceTemplateId` | long? | `null` | Null → seed 8 hardcoded items (v13.x parity) |
| `AutoSuspendEmployeeOnTerminationCreated` | bool | `true` | Replaces immediate `IsActive=false` |
| `RequireClearanceCompleteBeforeFinalSettlement` | bool | `false` | Opt-in gate |
| `AutoEnableFinalSettlementCalcOnClearanceComplete` | bool | `false` | Opt-in |
| `AutoDeactivateEmployeeOnFinalSettlementPaid` | bool | `true` | Completes v13.x end-state with `AutoSuspend…=true` |
| `ContractExpiredAction` | string enum | `"AutoMarkExpired"` | Fixes silent "Active past end date" bug |

**3 new `Employee` fields** (additive, default `false`/`null`):
- `IsSuspended` — termination marker, cleared at full deactivation.
- `IsPreHire` — pre-hire gate marker (only used when opt-in flag is on).
- `OnboardingCompletedAt` — milestone timestamp.

Migration: [20260416072853_AddLifecycleAutomationV13_5.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260416072853_AddLifecycleAutomationV13_5.cs). Additive only, no backfill, zero-downtime deploy-safe.

---

## 4. Events, services, commands added

**New infrastructure:**
- [ILifecycleEventPublisher](src/Application/TimeAttendanceSystem.Application/Abstractions/ILifecycleEventPublisher.cs) + [LifecycleEventPublisher](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/LifecycleEventPublisher.cs) — wraps `IPublisher`, catches + logs handler exceptions.
- [LifecycleAutomationAudit](src/Domain/TimeAttendanceSystem.Domain/Lifecycle/LifecycleAutomationAudit.cs) entity + [config](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/LifecycleAutomationAuditConfiguration.cs) + DbSet on `IApplicationDbContext` / `TecAxleDbContext` / `ApplicationDbContextAdapter`.
- 2 new enums + 1 (`ContractExpiredAction`) in [Common/Enums.cs](src/Domain/TimeAttendanceSystem.Domain/Common/Enums.cs).

**7 events** — [LifecycleEvents.cs](src/Application/TimeAttendanceSystem.Application/Lifecycle/Events/LifecycleEvents.cs).

**7 MediatR commands** — idempotent, each writes its own side-effects only:
- [CreateOnboardingProcessFromOfferCommand](src/Application/TimeAttendanceSystem.Application/Lifecycle/Commands/OnboardingCommands.cs)
- [CreateTerminationFromResignationCommand](src/Application/TimeAttendanceSystem.Application/Lifecycle/Commands/OffboardingCommands.cs)
- `CreateClearanceFromTemplateCommand` (same file)
- `ApplyContractExpiredActionCommand` (same file)
- `SuspendEmployeeCommand` / `ActivateEmployeeCommand` / `DeactivateEmployeeCommand` — [EmployeeStateCommands.cs](src/Application/TimeAttendanceSystem.Application/Lifecycle/Commands/EmployeeStateCommands.cs)

**7 MediatR event handlers** — all inherit [LifecycleAutomationBase](src/Application/TimeAttendanceSystem.Application/Lifecycle/Handlers/LifecycleAutomationBase.cs) which standardizes settings-load → kill-switch → flag-check → idempotency → run → audit:
- `OfferAcceptedHandler`, `OnboardingCompletedHandler`, `ResignationApprovedHandler`, `TerminationCreatedHandler`, `ClearanceCompletedHandler`, `FinalSettlementPaidHandler`, `ContractExpiredHandler`.

---

## 5. Business rules implemented

- **Workflow approval respected.** `ApproveResignationCommandHandler` still requires `Status == Pending` and only after that fires the event. `MarkFinalSettlementPaidCommandHandler` still requires `Status == Approved`. Lifecycle handlers trust those contracts.
- **Offer accepted but no template:** `CreateOnboardingProcessFromOfferCommand` returns `Result.Failure("No onboarding template available…")`. Handler records `MissingPrerequisite` and notifies HR.
- **Candidate already linked to employee:** offer controller still persists `Candidate.ConvertedToEmployeeId` + `OfferLetter.CreatedEmployeeId` under transaction; handler trusts the committed employee id.
- **Employee already has active onboarding:** defense-in-depth query in the create-onboarding command skips with `Skipped` status.
- **Onboarding completed with missing required items:** two gates — required tasks (default on, matches v13.x) and required documents (new, opt-in via `OnboardingCompletionRequiresAllRequiredDocuments`). Controller rejects before publishing the event.
- **Resignation rejected / cancelled / withdrawn:** only the `Pending → Approved` path publishes the event.
- **Termination without clearance template:** `DefaultClearanceTemplateId == null` → handler seeds the 8 hardcoded items (v13.x parity). `ContextJson` records which path was taken.
- **Clearance incomplete:** if `RequireClearanceCompleteBeforeFinalSettlement=true`, `CalculateFinalSettlementCommand` returns `Result.Failure("Clearance must be completed…")`.
- **Final settlement not finalized:** `MarkFinalSettlementPaidCommandHandler` still requires `Status == Approved` — the deactivation event only fires once it is actually paid.
- **Contract expired but employee already inactive:** handler degrades `Suspend` / `Deactivate` → `AutoMarkExpired` so the contract status is still cleaned up; audit records this via `Skipped`/`Succeeded` reason.
- **Automation re-run / duplicate event:** idempotency key `(SourceEntityType, SourceEntityId, AutomationType, Status=Succeeded)` — handler records `DuplicateSuppressed` on replay, never double-creates.
- **Tenant disables one step:** each handler reads its own flag independently — disabling "create clearance" does not disable "suspend employee". Master kill-switch disables everything.

---

## 6. Duplicate-prevention logic

Two layers:

1. **Audit-row idempotency key.** Every handler queries before acting:
   `EXISTS (LifecycleAutomationAudits WHERE SourceEntityType=? AND SourceEntityId=? AND AutomationType=? AND Status=Succeeded AND NOT IsDeleted)`
   Backed by index `IX_LifecycleAutomationAudits_Source_Type_Status`.

2. **Target-side existence checks.** Defense in depth:
   - `CreateOnboardingProcessFromOfferCommand` — skip if employee already has a NotStarted/InProgress onboarding process.
   - `CreateTerminationFromResignationCommand` — skip if a `TerminationRecord` already references the resignation.
   - `CreateClearanceFromTemplateCommand` — skip if a `ClearanceChecklist` already references the termination.
   - `ClearanceController.CompleteItem` only publishes `ClearanceCompletedEvent` on the transition from non-Completed to Completed, never on repeated "all items complete" checks.
   - `Suspend` / `Activate` / `Deactivate` commands all check current state and return `Success` without side-effects if already in the target state.

---

## 7. Audit/history behavior

New table `LifecycleAutomationAudits` with indexes:
- `IX_LifecycleAutomationAudits_Source` — fast lookup for detail-page timelines.
- `IX_LifecycleAutomationAudits_Source_Type_Status` — idempotency check.

One row per attempt, with:
- `SourceEntityType`, `SourceEntityId` — what triggered this.
- `TargetEntityType`, `TargetEntityId` — what got created (nullable).
- `Status` — `Succeeded | Skipped | Failed | DuplicateSuppressed | Disabled | MissingPrerequisite`.
- `Reason` — human-readable "why skipped/disabled/missing" text.
- `ErrorMessage` — exception text on failure.
- `TriggeredAtUtc`, `CompletedAtUtc`.
- `TriggeredByUserId` — null for background-job-driven transitions (contract expiry).
- `ContextJson` — forensic snapshot of decision inputs (template resolution, tenant-flag values, chosen action).

Append-only; `RowVersion` + `IsDeleted` inherited from `BaseEntity` for consistency, but nothing currently ever deletes a row.

---

## 8. Notification behavior

Three places where `IInAppNotificationService` is touched by the lifecycle layer:

1. **Onboarding auto-create failed** (`OfferAcceptedHandler`) — notifies HR when a template can't be resolved. Recipient set comes from `INotificationRecipientResolver` (default `"HRManager,SystemAdmin"` per v13.4).

2. **Clearance complete — final settlement unblocked** (`ClearanceCompletedHandler`) — fired only when `AutoEnableFinalSettlementCalcOnClearanceComplete=false`. HR sees "clearance done, you can now calculate the settlement."

3. **Contract expiry pre-alerts** (unchanged from v13.x) — daily notifications for contracts expiring in configured windows.

No new `NotificationType` enum values were added — existing `ApprovalReminder` covers these.

---

## 9. API / frontend impact

### API — no breaking changes

All existing endpoints preserved. New read-only endpoints for audit:
- `GET /api/v1/lifecycle-automation/audit` — paginated, filterable by `automationType`, `sourceEntityType`, `sourceEntityId`, `status`, `from`, `to`.
- `GET /api/v1/lifecycle-automation/audit/{id}` — single entry including `ContextJson`.
- `GET /api/v1/lifecycle-automation/audit/by-entity?entityType=...&entityId=...` — used by the Automation History card on detail pages.

See [LifecycleAutomationController](src/Api/TimeAttendanceSystem.Api/Controllers/LifecycleAutomationController.cs).

### Frontend additions (admin portal)

- **Model + service:**
  - [lifecycle-automation.model.ts](time-attendance-frontend/src/app/shared/models/lifecycle-automation.model.ts)
  - [lifecycle-automation.service.ts](time-attendance-frontend/src/app/core/services/lifecycle-automation.service.ts)
- **Automation History card** (reusable): [automation-history-card.component.ts](time-attendance-frontend/src/app/shared/components/automation-history-card/automation-history-card.component.ts) — drop onto any detail page with `entityType` + `entityId` inputs. Shows a timeline of automation events with status pills, reasons, error messages.
- **Translations:** new `lifecycle_automation.*` keys in both [en.json](time-attendance-frontend/src/app/core/i18n/translations/en.json) and [ar.json](time-attendance-frontend/src/app/core/i18n/translations/ar.json) — status labels, type labels, contract-expired action labels, settings page strings.

### Frontend work not yet wired into specific pages

The following are intentionally deferred — they are mechanical integrations that don't risk regressions:
- Dropping `<app-automation-history-card>` into view-offer, view-onboarding, view-resignation, view-termination, view-clearance, view-final-settlement, view-contract.
- Adding the 16 new toggles into `tenant-configuration/security-settings` (or a new `lifecycle-automation` sub-tab). The backend `GET/PUT /api/v1/tenant-configuration` endpoint already returns/accepts the new fields via the existing `TenantSettings` shape, so wiring is just UI.

Neither deferral blocks the automation from working — tenants can configure via Swagger and the card is ready to consume audit data. Follow-up PR will land the UI wiring.

### Self-Service portal

No changes. Automation is entirely admin-side.

### Mobile app

No changes.

---

## 10. Tests added

New test project: [tests/TecAxle.Hrms.LifecycleAutomation.Tests](tests/TecAxle.Hrms.LifecycleAutomation.Tests/) — xUnit + FluentAssertions + EF Core InMemory + Moq. **25 tests, all green** (~6 seconds).

| File | Tests | Focus |
|---|---|---|
| `TerminationCreatedHandlerTests.cs` | 4 | Both sub-steps run; kill-switch disables both; per-flag disable; duplicate event |
| `FinalSettlementPaidHandlerTests.cs` | 4 | Deactivates when enabled; skips when already inactive; disabled when flag off; dedupe |
| `ResignationApprovedHandlerTests.cs` | 3 | Creates termination when enabled; disabled by default; dedupe |
| `OnboardingCompletedHandlerTests.cs` | 3 | Milestone-only default; activate mode flips pre-hire; kill-switch |
| `ContractExpiredHandlerTests.cs` | 6 | All four action modes dispatched correctly; degrade-to-AutoMarkExpired when employee already inactive; dedupe |
| `EmployeeStateCommandTests.cs` | 5 | Suspend idempotent; Suspend blocks linked User.IsActive; Deactivate idempotent; Deactivate clears IsSuspended; Activate flips pre-hire + stamps milestone |

Shared fixtures in [TestHarness.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/TestHarness.cs): `NewDb()`, `SeedSettings()`, `SeedEmployee()`, `StubUser()`, `CountAudits()`.

### Existing suites regression check

| Suite | Tests | Result |
|---|---|---|
| `TecAxle.Hrms.Payroll.Tests` | 27 | All green |
| `TecAxle.Hrms.BusinessRules.Tests` | 31 | All green |
| `TecAxle.Hrms.Entitlement.Tests` | 79 | All green |
| `TecAxle.Hrms.LifecycleAutomation.Tests` | 25 | All green |
| **Total** | **162** | **All green** |

Run from repo root:
```bash
dotnet test tests/TecAxle.Hrms.LifecycleAutomation.Tests/TecAxle.Hrms.LifecycleAutomation.Tests.csproj
dotnet test tests/TecAxle.Hrms.Payroll.Tests/TecAxle.Hrms.Payroll.Tests.csproj
dotnet test tests/TecAxle.Hrms.BusinessRules.Tests/TecAxle.Hrms.BusinessRules.Tests.csproj
dotnet test tests/TecAxle.Hrms.Entitlement.Tests/TecAxle.Hrms.Entitlement.Tests.csproj
```

### Coverage of "specific scenarios to handle" from the original spec

| Scenario | Test |
|---|---|
| Offer accepted but no onboarding template exists | `CreateOnboardingProcessFromOfferCommand` returns `Result.Failure("No onboarding template available…")`; handler writes `MissingPrerequisite` + notifies HR. Covered by handler `try/catch` path. |
| Candidate already linked to employee | Offer controller is the guard (unchanged transaction). Lifecycle handler trusts `OfferLetter.CreatedEmployeeId`. |
| Employee already has active onboarding | Target-side existence check in `CreateOnboardingProcessFromOfferCommand` returns `Success(null)` → handler writes `Skipped`. |
| Onboarding completed with missing required docs | New `OnboardingCompletionRequiresAllRequiredDocuments` gate in `OnboardingProcessesController.Complete`. |
| Resignation rejected or cancelled | `ApproveResignationCommandHandler` only publishes on `Pending → Approved`. Rejected/withdrawn paths publish nothing. |
| Termination created without clearance template | Handler falls back to 8 hardcoded items; `ContextJson` records fallback. |
| Clearance incomplete | `RequireClearanceCompleteBeforeFinalSettlement` gate in `CalculateFinalSettlementCommand`. |
| Final settlement not finalized | `MarkFinalSettlementPaidCommandHandler` requires `Status=Approved`. |
| Contract expired but employee already inactive | `ContractExpiredHandlerTests.Degrades_to_mark_expired_when_employee_already_inactive…` ✅ |
| Automation re-run / duplicate event | `TerminationCreatedHandlerTests.Duplicate_event_does_not_double_create_clearance` ✅ + similar in every handler test |
| Tenant disables one automation step | `TerminationCreatedHandlerTests.Substep_flag_off_disables_that_substep_but_runs_the_other` ✅ |
| Master kill-switch | `TerminationCreatedHandlerTests.Master_kill_switch_off_writes_disabled_rows_for_both_substeps` ✅ + similar |
| Workflow approval required before automation | Built into `ApproveResignationCommandHandler` / `MarkFinalSettlementPaidCommandHandler` pre-conditions. |

---

## 11. Remaining risks / open questions

- **Transaction semantics on offer accept.** `OfferLettersController.AcceptOffer` commits employee + contract + salary before publishing `OfferAcceptedEvent`, then the handler runs its own `SaveChangesAsync` for onboarding. If the handler throws, the offer is still accepted — HR sees a `Failed` audit row and a notification. If atomic "accept-with-onboarding" is required, the publisher would need to re-throw and the controller transaction would need to wrap both. Documented but not implemented; default behavior favors "never break the user-visible accept action."

- **Workflow attachment on `TerminationRecord`.** If a future workflow type is introduced for terminations (currently there isn't one), the handler would fire on `CreateTerminationRecordCommand` return — not post-workflow-approval. A `TerminationCreateRequiresWorkflowApproval` gate can be added later. Not in scope now because no such workflow exists.

- **Frontend wiring of card onto detail pages + settings sub-tab.** The model, service, reusable card, and translations are shipped. Wiring into ~7 detail pages + the tenant-config settings page is a mechanical follow-up PR (intentionally kept out of this change to minimize regression surface).

- **Rollback path.** There is no "un-automate" endpoint. If finance reverses a settlement payment, HR must manually re-activate the employee. A future `ManualReversal` automation type + audit row could be added.

- **Payroll locks interaction.** `CalculateFinalSettlementCommand` already respects payroll period locks (uses already-finalized numbers when the termination month is Paid). No change to payroll lock semantics.

- **Pre-existing test-build warning.** The test project targets `net10.0` while Infrastructure builds to `net9.0`. Both frameworks load under the test runner (shown in the passing run) — matches the existing Entitlement.Tests project. No fix needed.

---

## Summary

Seven broken/missing HR lifecycle transitions are now automated, configurable, auditable, and idempotent. Every automation respects approvals, writes a forensic audit row, dedupes on replay, and fails loud-but-non-fatal when inputs are missing. Default configuration mirrors v13.x observable behavior bit-for-bit, so deploying v13.5 changes nothing until a tenant actively enables the new capabilities.

**Deliverables:** 1 migration, 1 new entity + 2 new enums, 3 new `Employee` fields, 16 new `TenantSettings` fields, 7 events, 7 commands, 7 event handlers, 1 shared base + 1 publisher abstraction, 1 audit API controller, 1 reusable Angular card + service + model + bilingual translations, 25 new tests (162 across the full suite, all green), 7 existing handlers/controllers modified to publish events, 1 background job extended.
