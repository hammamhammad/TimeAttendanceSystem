# Workflow Routing Hardening — v13.6

**Shipped**: 2026-04-16
**Labels**: backend, workflow engine, data model, migration, frontend (follow-up)

This document is the forensic companion to the v13.6 PR titled **Workflow Routing Hardening**. It captures the 12 production-safety defects we removed, the new routing design, the data-model changes, the migration strategy, and the remaining risks. Same house style as `LIFECYCLE_AUTOMATION_FIX.md` and `HARDCODED_BUSINESS_RULES_FIX.md`.

---

## 1. Context

The HRMS workflow engine (`WorkflowDefinition` / `WorkflowInstance` / `WorkflowStep` / `WorkflowStepExecution` / `ApprovalDelegation`) worked end-to-end but contained 12 latent defects that could route approvals to the wrong person, stall workflows silently, or leave weak audit records. Every defect below has a file:line citation verified before the rewrite.

| # | Defect | Location | Fix |
|---|---|---|---|
| 1 | Role-based approver picked arbitrarily via `FirstOrDefaultAsync` | `WorkflowEngine.cs:796–804` (pre-v13.6) | Per-step `RoleAssignmentStrategy` (FirstMatch / RoundRobin / **LeastPendingApprovals** / FixedPriority). See §3B. |
| 2 | DepartmentHead resolved via heuristic; ignored `Department.ManagerEmployeeId` | `WorkflowEngine.cs:773–794` | New `ApproverResolver` uses `Department.ManagerEmployeeId` explicitly; falls back via tenant chain on miss. See §3A. |
| 3 | `WorkflowInstance` did not snapshot its definition | `WorkflowInstance.cs` | `DefinitionSnapshotJson` + `DefinitionVersion` populated at creation. See §3F. |
| 4 | `WorkflowDefinition.Version` incremented but never consumed | `WorkflowDefinition.cs:80,173` | Version is now pinned onto the instance at start and consumed by the snapshot path. |
| 5 | Multi-level delegation unbounded | `WorkflowEngine.cs:184–236` | `TenantSettings.MaxWorkflowDelegationDepth` (default 2) + cycle detection via `DelegatedFromExecutionId` walk. See §3C. |
| 6 | Timeout / escalation actor was the literal string `"0"` | `WorkflowEngine.cs:481,500` | Every system action now uses `ISystemUserResolver.GetSystemUserIdAsync()`. New `WorkflowSystemActionAudit` table. See §3D. |
| 7 | Validation steps always passed | `WorkflowEngine.cs:895–900` | `IWorkflowValidationRule` + registry; unregistered code ⇒ auto-reject (fail closed). Ships with `VacationBalanceRule`. See §3E. |
| 8 | No `ReturnForCorrection` action | `ApprovalAction.cs` | New `ApprovalAction.ReturnedForCorrection` + new `WorkflowStatus.ReturnedForCorrection` + new `ResubmitAsync` path. See §3G. |
| 9 | Workflow kickoff duplicated verbatim in 4 handlers | Vacation/Excuse/RemoteWork/AttendanceCorrection `Create*CommandHandler`s | New `IWorkflowStarter` consolidates the kickoff contract. Existing handlers left working via `IWorkflowEngine`; new consumers go through `IWorkflowStarter`. See §3H. |
| 10 | `ApproverType.BranchManager` defined but not implemented | `ApproverType.cs:5` | `Branch.ManagerEmployeeId` added. `ApproverResolver.ResolveBranchManagerAsync` implemented. |
| 11 | No fallback when approver resolution failed | `WorkflowEngine.cs:605–612` | Tenant fallback chain: `WorkflowFallbackApproverUserId` → `WorkflowFallbackApproverRole`. Final miss ⇒ `WorkflowStatus.FailedRouting` + notification to `NotificationRecipientRolesCsv`. |
| 12 | Dual approval paths (workflow + legacy direct-status) for 4 request types | `ApproveEmployeeExcuse`, `ApproveRemoteWorkRequest`, `ApproveAttendanceCorrectionRequest`, `ToggleEmployeeVacationStatus` | Legacy handlers marked `[Obsolete]` with migration guidance. Scheduled for removal in v14. See §3J. |

---

## 2. New domain primitives

### 2.1 Enums

| Enum | Added in v13.6 | Values |
|---|---|---|
| `ApprovalAction` | `ReturnedForCorrection = 9`, `FailedNoApprover = 10`, `Resubmitted = 11` | preserves 1–8 |
| `WorkflowStatus` | `ReturnedForCorrection = 8` (non-terminal), `FailedRouting = 9` (terminal) | preserves 1–7 |
| `RoleAssignmentStrategy` (new) | `FirstMatch = 1`, `RoundRobin = 2`, `LeastPendingApprovals = 3` (default), `FixedPriority = 4` | — |
| `WorkflowSystemActionType` (new) | `Timeout`, `Escalation`, `AutoApprove`, `AutoReject`, `Expire`, `FallbackRouting` | — |

### 2.2 Entities

**New tables**

- `WorkflowRoleAssignmentCursors(Id, RoleId unique, LastAssignedUserId, LastAssignedAtUtc, ...)` — one row per role, advanced by the `RoundRobin` strategy.
- `WorkflowSystemActionAudits(Id, WorkflowInstanceId, StepExecutionId, ActionType, TriggeredAtUtc, SystemUserId, Reason, DetailsJson, ...)` — append-only forensic trail for every timeout / escalation / auto-approve / fallback-routing / expire event. Indexed on `(WorkflowInstanceId, TriggeredAtUtc)` and `ActionType`.

**Modified tables**

- `Branches`: `ManagerEmployeeId (long?, FK Employees)` + index.
- `UserRoles`: `Priority (int, default 0)` + composite index `(RoleId, Priority)` for `FixedPriority` strategy.
- `TenantSettings`: `WorkflowFallbackApproverRole (string, default "HRManager")`, `WorkflowFallbackApproverUserId (long?)`, `MaxWorkflowDelegationDepth (int, default 2)`, `MaxWorkflowResubmissions (int, default 3)`.
- `WorkflowSteps`: `RoleAssignmentStrategy (int, default 3 = LeastPendingApprovals)`, `AllowReturnForCorrection (bool, default false)`, `ValidationRuleCode (varchar(100)?)`, `ValidationConfigJson (jsonb?)`.
- `WorkflowInstances`: `DefinitionVersion (int, default 1)`, `DefinitionSnapshotJson (jsonb, default '{}')`, `ReturnedAtUtc (timestamptz?)`, `ReturnedByUserId (long? FK Users)`, `ResubmissionCount (int, default 0)`.
- `WorkflowStepExecutions`: `ValidationDetailsJson (jsonb?)`.

---

## 3. Design — per section

### 3A — Department-Head & Branch-Manager routing

`IApproverResolver` (`src/Application/.../Workflows/Services/ApproverResolver.cs`) resolves every `ApproverType`:

- `DepartmentHead` → `Department.ManagerEmployeeId` → `EmployeeUserLink.UserId`. No "first employee with null ManagerEmployeeId" heuristic.
- `BranchManager` → `Branch.ManagerEmployeeId` → `EmployeeUserLink.UserId`.
- Unset / inactive user / no `EmployeeUserLink` ⇒ fall through to the fallback chain. A `WorkflowSystemActionAudit` row with `ActionType = FallbackRouting` records why primary failed.

### 3B — Role-based routing

Per-step configuration `WorkflowStep.RoleAssignmentStrategy`. Default `LeastPendingApprovals` (picks the candidate with the fewest currently-pending workflow executions; ties broken by lowest UserId).

- `RoundRobin` uses `WorkflowRoleAssignmentCursors` with optimistic concurrency on the cursor row. Cursor advances in monotonic UserId order; wraps at end.
- `FixedPriority` reads `UserRole.Priority` (new) — higher priority wins; ties broken by lowest UserId.
- `FirstMatch` preserves legacy behavior for tenants that explicitly opt in (e.g. roles with a single user).
- An empty candidate pool triggers the tenant fallback chain; the existing step execution's `AssignedToUserId` is frozen — reassignment only via delegation or escalation.

### 3C — Delegation

`WorkflowEngine.DelegateAsync`:

- Self-delegation already blocked; kept.
- New: walk the `DelegatedFromExecutionId` chain to compute depth. Reject when `depth >= TenantSettings.MaxWorkflowDelegationDepth` (default 2) with a clear error.
- New: cycle detection — if the candidate delegate userId is already in the chain, reject with `"Delegation would create a cycle."`
- Delegate user must be active (`User.IsActive`). Inactive ⇒ reject.
- Both the delegator and the delegate receive in-app notifications (the requester notification was already sent).

### 3D — Escalation and timeout

`ProcessTimeoutsAsync`:

- Every system action is attributed to `ISystemUserResolver.GetSystemUserIdAsync()` — never the literal string `"0"`.
- Writes one `WorkflowSystemActionAudit` row per action (`Timeout`, `AutoApprove`, `AutoReject`, `Escalation`, `Expire`) with `DetailsJson` including the source step, timeout action, dueAtUtc, escalation target.
- When escalation has no `EscalationStepId` configured, the workflow expires cleanly with a specific audit reason (`"Escalation target missing; workflow expired"`) and `ActionType = Expire`. Tenant fallback for escalation is intentionally NOT applied automatically — escalation misconfiguration should surface, not silently reroute.

### 3E — Validation steps

`IWorkflowValidationRule` (`src/Application/.../Workflows/Validation/IWorkflowValidationRule.cs`) + `IWorkflowValidationRuleRegistry`. Rules registered through DI; the registry keys them by `RuleCode`.

- A validation step without `ValidationRuleCode`, or with an unregistered code, **fails closed** with `AutoRejected` + a clear comment.
- Reference rule `VacationBalanceRule` (`vacation_balance`) ships in the PR and demonstrates the pattern.
- Rule output (pass/fail + reason + optional detail bag) is persisted into `WorkflowStepExecution.ValidationDetailsJson`.
- If a step has `AllowReturnForCorrection = true` AND the rule fails, the workflow transitions to `ReturnedForCorrection` instead of terminating.

### 3F — Workflow definition versioning

At `StartWorkflowAsync`, the engine serializes the live `WorkflowDefinition` (including all steps with their v13.6 attributes) into `WorkflowInstance.DefinitionSnapshotJson` and pins `DefinitionVersion`. The snapshot format includes `schemaVersion: 1` so v14+ can evolve the shape safely.

Admin edits to the live definition do not affect running instances — they use the snapshot. New instances pick up the latest definition.

Migration backfill (`20260416093000_WorkflowRoutingHardeningV13_6.cs`) populates `DefinitionSnapshotJson` and `DefinitionVersion` for every non-terminal instance using PostgreSQL `jsonb_build_object` + `jsonb_agg` — terminal instances keep `{}` / `1` (they're never read). See §6.

### 3G — Return-for-Correction

New non-final approver action. Only available on steps with `WorkflowStep.AllowReturnForCorrection = true`.

- Approver calls `POST /api/v1/approvals/{id}/return-for-correction` with required `comments`. Workflow transitions to `WorkflowStatus.ReturnedForCorrection`; `ReturnedAtUtc` / `ReturnedByUserId` stamped.
- Publishes `RequestReturnedForCorrectionEvent` (MediatR `INotification`) — source modules can listen and mark their own entity as editable. Modules that don't listen simply treat it as a pending state.
- Requester calls `POST /api/v1/approvals/{id}/resubmit`. `ResubmissionCount` increments; the engine rejects if it exceeds `TenantSettings.MaxWorkflowResubmissions` (default 3) with remediation guidance. On success the workflow resumes from step 1.

### 3H — Centralized `IWorkflowStarter`

Small service (`WorkflowStarter.cs`) wrapping `IWorkflowEngine` with one call signature:

```csharp
Task<WorkflowResult<WorkflowInstance>> StartApprovalAsync(
    WorkflowEntityType entityType, long entityId, long requestedByUserId,
    long? branchId, IReadOnlyDictionary<string, object>? context = null,
    bool autoApproveCurrentUserStepIfPermitted = false,
    string? autoApproveComment = null,
    CancellationToken ct = default);
```

The 4 existing `Create*CommandHandler`s continue to call `IWorkflowEngine` directly — no behavior change. New request modules must use `IWorkflowStarter`. Consolidation of the existing 4 handlers is documented as an allowed follow-up since the code paths converge at the engine.

### 3I — API surface

**New endpoints**:

- `POST /api/v1/approvals/{id}/return-for-correction` — body `{ comments }`.
- `POST /api/v1/approvals/{id}/resubmit` — body `{ comments? }`.
- `GET /api/v1/workflows/validation-rules` — returns `[{ ruleCode, displayName }]`.
- `GET /api/v1/workflows/system-actions` — paginated audit browse (`workflowInstanceId`, `actionType`, date range).
- `GET /api/v1/workflows/role-assignment-stats?roleId=...` — operational debugging (cursor state + pending counts per candidate).

**Response enrichment**:

- `GET /api/v1/approvals/pending` — `PendingApproval` DTO now carries `allowReturnForCorrection`, `delegatedFromUserId`, `delegatedFromUserName`, `isDelegated`, `isReturnedForCorrection`, `resubmissionCount`. Existing fields unchanged.
- `WorkflowStepRequest` (used by Create/Update) accepts `roleAssignmentStrategy`, `allowReturnForCorrection`, `validationRuleCode`, `validationConfigJson`.

### 3J — Legacy direct-status handlers

`ApproveEmployeeExcuseCommand`, `ApproveRemoteWorkRequestCommand`, `ApproveAttendanceCorrectionRequestCommand`, `ToggleEmployeeVacationStatusCommand` are tagged `[Obsolete]` with a migration note. The callers in `EmployeeVacationsController` and `AttendanceCorrectionRequestsController` are deliberately left in place to preserve every known flow. Warnings fire at compile-time (no `TreatWarningsAsErrors` is set) and serve as migration signal. v14 will remove them.

---

## 4. Critical files

**Domain** (new):
- [RoleAssignmentStrategy.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/Enums/RoleAssignmentStrategy.cs)
- [WorkflowSystemActionType.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/Enums/WorkflowSystemActionType.cs)
- [WorkflowRoleAssignmentCursor.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/WorkflowRoleAssignmentCursor.cs)
- [WorkflowSystemActionAudit.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/WorkflowSystemActionAudit.cs)

**Domain** (extended):
- [ApprovalAction.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/Enums/ApprovalAction.cs), [WorkflowStatus.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/Enums/WorkflowStatus.cs)
- [WorkflowInstance.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/WorkflowInstance.cs), [WorkflowStep.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/WorkflowStep.cs), [WorkflowStepExecution.cs](src/Domain/TimeAttendanceSystem.Domain/Workflows/WorkflowStepExecution.cs)
- [Branch.cs](src/Domain/TimeAttendanceSystem.Domain/Branches/Branch.cs), [UserRole.cs](src/Domain/TimeAttendanceSystem.Domain/Users/UserRole.cs)
- [TenantSettings.cs](src/Domain/TimeAttendanceSystem.Domain/Tenants/TenantSettings.cs)

**Application** (new):
- [IWorkflowValidationRule.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Validation/IWorkflowValidationRule.cs), [IWorkflowValidationRuleRegistry.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Validation/IWorkflowValidationRuleRegistry.cs)
- [VacationBalanceRule.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Validation/Rules/VacationBalanceRule.cs)
- [IApproverResolver.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/IApproverResolver.cs), [ApproverResolver.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/ApproverResolver.cs)
- [IWorkflowStarter.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/IWorkflowStarter.cs)
- [WorkflowDefinitionSnapshot.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/WorkflowDefinitionSnapshot.cs)
- [ReturnForCorrectionCommand.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Commands/ReturnForCorrection/) + handler
- [ResubmitWorkflowCommand.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Commands/Resubmit/) + handler
- [RequestReturnedForCorrectionEvent.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Events/RequestReturnedForCorrectionEvent.cs)

**Application** (rewritten):
- [WorkflowEngine.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/WorkflowEngine.cs) — full rewrite. Delegates approver resolution to `ApproverResolver`, snapshots definitions, fixes system actor, adds delegation guards, adds validation-rule dispatch, adds return-for-correction flow.
- [IWorkflowEngine.cs](src/Application/TimeAttendanceSystem.Application/Workflows/Services/IWorkflowEngine.cs) — interface extended with `ReturnForCorrectionAsync` and `ResubmitAsync`. `PendingApproval` DTO gains 6 new fields.
- [DependencyInjection.cs](src/Application/TimeAttendanceSystem.Application/DependencyInjection.cs) — registers `IApproverResolver`, `IWorkflowStarter`, `IWorkflowValidationRuleRegistry`, `VacationBalanceRule`.

**Application** (obsolete):
- 4 legacy approval command records tagged `[Obsolete]` with v14-removal message.

**Infrastructure**:
- New EF configs: [WorkflowRoleAssignmentCursorConfiguration.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/WorkflowRoleAssignmentCursorConfiguration.cs), [WorkflowSystemActionAuditConfiguration.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/WorkflowSystemActionAuditConfiguration.cs).
- Extended EF configs: `WorkflowInstanceConfiguration`, `WorkflowStepConfiguration`, `WorkflowStepExecutionConfiguration`, `BranchConfiguration`, `UserRoleConfiguration`, `TenantSettingsConfiguration`.
- Migration: [20260416093000_WorkflowRoutingHardeningV13_6.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260416093000_WorkflowRoutingHardeningV13_6.cs) — additive, with in-place snapshot backfill for all non-terminal instances.
- [IApplicationDbContext.cs](src/Application/TimeAttendanceSystem.Application/Abstractions/IApplicationDbContext.cs) + [TecAxleDbContext.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/TecAxleDbContext.cs) — new DbSets.

**API**:
- [ApprovalsController.cs](src/Api/TimeAttendanceSystem.Api/Controllers/ApprovalsController.cs) — return-for-correction + resubmit endpoints.
- [WorkflowsController.cs](src/Api/TimeAttendanceSystem.Api/Controllers/WorkflowsController.cs) — validation-rules, system-actions, role-assignment-stats endpoints. `WorkflowStepRequest` carries v13.6 fields.

---

## 5. Migration

File: `20260416093000_WorkflowRoutingHardeningV13_6.cs`. Additive only — every new column has a safe default:

- `Branches.ManagerEmployeeId` — nullable, no backfill required (admin assigns later).
- `UserRoles.Priority` — default 0; no change to existing ordering.
- `TenantSettings` — 4 new columns, defaults preserve pre-v13.6 behavior exactly (`"HRManager"`, 2, 3).
- `WorkflowSteps` — `RoleAssignmentStrategy = LeastPendingApprovals` is the new default; `AllowReturnForCorrection = false` preserves legacy behavior.
- `WorkflowInstances` — new snapshot columns populated **inline** by a PostgreSQL `UPDATE ... FROM ... jsonb_build_object(...)` query that reads the live `WorkflowDefinitions` + `WorkflowSteps` for every non-terminal instance. Terminal instances (`Status IN (3,4,5,6,9)`) keep `{}` — they're never read.
- Two new tables (`WorkflowRoleAssignmentCursors`, `WorkflowSystemActionAudits`) with indexes.

**Migration safety**:
- Zero data loss.
- Zero required backfills outside the snapshot SQL (which is idempotent and bounded).
- Running v13.5 code against a v13.6-migrated DB works — all new columns have defaults the older code ignores.
- Rolling back v13.6 requires reverting code + keeping new columns dormant; the `Down` migration is authored and will drop cleanly.

**Known limitation**: pre-v13.6 instances got their snapshot "late" — reflected at migration time, not at original submission time. Safe because no tenant has reported the underlying "definition edit mid-flight" bug, and behavior is correct from migration forward.

---

## 6. Verification

Commands:

```bash
# Backend build + tests
cd src/Api/TimeAttendanceSystem.Api && dotnet build
cd tests/TecAxle.Hrms.Payroll.Tests && dotnet test           # existing: 27/27
cd tests/TecAxle.Hrms.Entitlement.Tests && dotnet test       # existing: 79/79
cd tests/TecAxle.Hrms.BusinessRules.Tests && dotnet test     # existing: 31/31
cd tests/TecAxle.Hrms.LifecycleAutomation.Tests && dotnet test # existing: 25/25
cd tests/TecAxle.Hrms.Workflow.Tests && dotnet test          # new — target green

# DB sanity after migration
psql -d ta_<tenant> -c "SELECT COUNT(*) FROM \"WorkflowInstances\" WHERE \"DefinitionSnapshotJson\" = '{}' AND \"Status\" NOT IN (3,4,5,6,9);"
# Expected: 0
```

End-to-end smoke test (dev env):
1. Submit a vacation — verify `WorkflowInstance.DefinitionSnapshotJson` is populated and `AssignedToUserId` matches the resolved manager.
2. Delegate approval — both delegator and delegate receive notifications; `DelegatedFromExecutionId` populated.
3. Delegate at depth 3 — rejected with clear error.
4. Edit the live `WorkflowDefinition` — in-flight instances keep their snapshot; new submissions use updated def.
5. Backdate `DueAt` and run `WorkflowTimeoutProcessingJob` — audit row in `WorkflowSystemActionAudits` with real system user, not 0.
6. Approver uses "Return for Correction" on a step where `AllowReturnForCorrection = true` — requester sees `ReturnedForCorrection` status; resubmit restores `InProgress` with incremented `ResubmissionCount`.
7. Configure a Validation step with `ValidationRuleCode = "vacation_balance"` and verify insufficient balance → `AutoRejected` with the correct reason captured in `ValidationDetailsJson`.

---

## 7. Frontend impact

**Admin portal** (`time-attendance-frontend/`):
- Model additions in `workflow.model.ts` for the new DTO fields (delegated-from, returned-for-correction, definition version/snapshot, system-action rows, validation rules, role-assignment stats).
- `approvals.service.ts` gets `returnForCorrection(id, comments)` and `resubmit(id, comments)`.
- `workflows.service.ts` gets `getValidationRules()`, `getSystemActions(...)`, `getRoleAssignmentStats(roleId)`.
- Pending-approvals UI gains **Return for Correction** + **Resubmit** buttons (conditional on step flag / requester identity) and a delegated-from chain line.
- Workflow-step editor (admin) gains four new controls: `RoleAssignmentStrategy` dropdown, `AllowReturnForCorrection` toggle, `ValidationRuleCode` searchable-select (populated from `/workflows/validation-rules`), `ValidationConfigJson` textarea.
- Branch edit page gains `ManagerEmployeeId` searchable-select.
- Tenant-configuration Security tab gains a "Workflow Routing" section with 4 controls.
- System-actions audit browser screen at `/workflows/system-actions`.

**Self-service portal** (`time-attendance-selfservice-frontend/`):
- Pending-approvals UI gets the same return-for-correction button (for managers) and returned-for-correction banner + resubmit button (for requesters).
- Request detail pages for Vacation / Excuse / RemoteWork / AttendanceCorrection gain a returned-for-correction banner with the approver's comment.

Some of the above frontend surface may ship as an immediate follow-up PR (see `Remaining risks`).

---

## 8. Tests

New project `tests/TecAxle.Hrms.Workflow.Tests/`. Target categories:

- **Department head routing** — explicit field, fallback user, fallback role, audit on fallback, failed routing.
- **Role strategies** — FirstMatch / RoundRobin / LeastPendingApprovals / FixedPriority; empty pool triggers fallback.
- **Delegation** — single-level, depth-2 allowed, depth-3 rejected, cycle rejected.
- **Timeout + escalation** — real system user id, audit row, fallback-via-tenant on missing target, expire on full miss.
- **Validation** — unknown code fail-closed, pass path, fail path, `VacationBalanceRule` happy + insufficient balance.
- **Versioning** — snapshot populated, edits don't affect running instance, `IncrementVersion` called on update.
- **Return-for-correction** — disabled step rejects action, resubmit resumes workflow, resubmission-limit enforcement, non-requester can't resubmit.
- **FailedRouting** — transitions to FailedRouting status and fires HR notification when routing fully fails.

Full suite target after v13.6: **~202 passing tests** (Payroll 27 + Entitlement 79 + BusinessRules 31 + LifecycleAutomation 25 + Workflow ~40).

---

## 9. Remaining risks & open questions

1. **Legacy direct-status approval handlers still exist** — tagged `[Obsolete]`, callers untouched. v14 will remove.
2. **Snapshot schema versioning** — `DefinitionSnapshotJson` carries `schemaVersion: 1`. v14 deserializers must handle version 1 explicitly if the shape changes.
3. **Round-robin cursor contention** — single-row-per-role hotspot. Negligible at HRMS scale; tenants with high contention should switch to `LeastPendingApprovals`.
4. **Pre-v13.6 instance snapshots are "late"** — documented limitation. No tenant has reported the underlying bug so this is low-risk.
5. **Frontend admin-UI rollout** — models + endpoints + selfservice essentials ship in this PR; admin UI for the four new step-config fields + system-actions browser may land as a follow-up. Swagger / direct SQL remain available in the interim.
6. **`WorkflowSystemActionAudit` retention** — no retention policy in v13.6. A `FrozenWorkflowCleanupJob`-style periodic job can be added if a tenant grows beyond ~1M rows.
7. **Tenant fallback during escalation** — deliberately not applied when `TimeoutAction = Escalate` and `EscalationStepId` is missing. Makes escalation misconfig surface immediately rather than silently rerouting to HR. Revisit if tenants prefer auto-reroute.
8. **`IWorkflowStarter` consolidation of the 4 `Create*CommandHandler`s** — service exists but the 4 handlers still call `IWorkflowEngine` directly. Same code path at runtime; the refactor is a cosmetic follow-up.

---

## 10. Appendix — Per-defect resolution table

| # | Defect | Fix file | Key lines |
|---|---|---|---|
| 1 | Role first-match non-determinism | `ApproverResolver.cs` | `ResolveRoleByStrategyAsync` |
| 2 | Department-head heuristic | `ApproverResolver.cs` | `ResolveDepartmentHeadAsync` |
| 3 | No instance snapshot | `WorkflowEngine.cs` | `StartWorkflowAsync` → `WorkflowDefinitionSnapshot.Serialize` |
| 4 | `Version` unused | `WorkflowEngine.cs` | `StartWorkflowAsync` pins `DefinitionVersion` |
| 5 | Unbounded delegation | `WorkflowEngine.cs` | `DelegateAsync` + `WalkDelegationChainAsync` |
| 6 | System actor "0" | `WorkflowEngine.cs` | `ProcessTimeoutsAsync` uses `ISystemUserResolver`; writes `WorkflowSystemActionAudit` |
| 7 | Validation always passed | `WorkflowEngine.cs` | `ProcessValidationStepAsync` → `IWorkflowValidationRuleRegistry.Find`; fails closed if unset/unregistered |
| 8 | No return-for-correction | `WorkflowEngine.cs` | `ReturnForCorrectionAsync`, `ResubmitAsync`; new `ApprovalAction.ReturnedForCorrection`, `WorkflowStatus.ReturnedForCorrection` |
| 9 | Kickoff duplication | `WorkflowStarter.cs` | New `IWorkflowStarter` provides single contract; v14 will migrate 4 handlers |
| 10 | BranchManager unimplemented | `ApproverResolver.cs` | `ResolveBranchManagerAsync`; `Branch.ManagerEmployeeId` added |
| 11 | No fallback on fail | `ApproverResolver.cs` | `ResolveFallbackAsync`; `WorkflowEngine.RecordFailedRoutingAsync` + HR notification |
| 12 | Dual legacy paths | Command files | `[Obsolete]` attributes + v14 removal note |

**Version**: v13.6
**Previous**: v13.5 Lifecycle Automation
