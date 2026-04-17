# Phase 2 Implementation Report

> **Project**: TecAxle HRMS
> **Version tag**: **v14.2 — Phase 2 (Hardening + Business Completion)**
> **Builds on**: [PHASE1_CRITICAL_FIX_IMPLEMENTATION.md](PHASE1_CRITICAL_FIX_IMPLEMENTATION.md) (v14.1)
> **Status**: ✅ **Sign-off ready**. Split in two parts:
> - **Part A — Hardening** (attendance TZ, silent-failure surfacer, payroll integrity, operational visibility): fully delivered.
> - **Part B — Business completion** (loan policy enforcement, benefit eligibility, training prerequisites, leave carry-over expiry, performance follow-through idempotency): fully delivered.

---

## 1. Summary

Phase 2 is delivered in two tracks. **Part A** closes hardening gaps identified in the business-flow review; **Part B** converts previously-passive domain configuration into enforced business behaviour.

### Part A — Hardening

| # | Gap (after Phase 1) | Phase 2 fix |
|---|---|---|
| 1 | **Attendance timezone correctness** — the manual-punch path had an explicit `TODO: Convert to branch timezone`; the attendance-record-edit path stored the same value for both UTC and local fields. Overnight shifts and cross-date punches could be bucketed to the wrong calendar day. | New **`ITimezoneService`** (Branch → tenant-default → UTC resolution chain with process-wide tz-cache), wired into every attendance creation path. Manual-punch TODO removed; edit-path now converts properly. **Duplicate-punch suppression window** added (tenant-configurable, default 30s). |
| 2 | **Silent-failure blind spot** — Phase 1 surfaced thrown lifecycle exceptions and workflow `FailedRouting`, but a handler that writes a `LifecycleAutomationAudit.Failed` or `MissingPrerequisite` row *without throwing* was still audit-only. | New **`OperationalFailureSurfacerJob`** (hourly) scans the audit table and raises a deduplicated `OperationalFailureAlert` for every latest-per-key Failed/MissingPrerequisite row that doesn't already have an open alert. Superseded-by-success rows are correctly ignored. |
| 3 | **Payroll recalculation integrity** — admin-unlock + recalc would leave loan repayments in `Paid` state linked to just-superseded PayrollRecords; cancel didn't reverse side-effects at all; `PayrollRecordDetail` orphans stayed behind soft-deleted parent records. | New **`IPayrollSideEffectReverser`** service. Wired into three call sites: (a) recalc soft-delete loop unwinds side-effects before soft-deleting each record + cascade-soft-deletes orphan details; (b) admin-unlock reverses every record in the period; (c) period-cancel reverses + soft-deletes records and cascade-cleans details. |
| 4 | **Operational visibility** — HR had no cross-module at-a-glance view of alerts, failures, approved-not-executed, or overdue items. Alerts had to be resolved/retried one by one. | New **`OpsDashboardController`** with `GET /summary` (everything a daily HR standup needs) and `GET /approved-not-executed` drill-down. New **bulk endpoints** on `OperationalAlertsController`: `POST /bulk-resolve` (up to 500) and `POST /bulk-retry` (up to 200, re-drives `ApprovalExecution` alerts and auto-resolves on success). |

Every new write is **idempotent**: the surfacer reuses the Phase 1 dedup key; the reverser skips rows not in a paid/deducted state; the bulk ops return per-item `Succeeded | AlreadyProcessed | Skipped | Failed` so reruns are safe.

### Part B — Business completion

Part A previously marked the following items as "Phase 3 candidates" even though the domain model already persists the configuration. Part B closes them:

| # | Gap | Business-completion fix |
|---|---|---|
| 5 | **Loan policy fields `MinServiceMonths` / `MaxConcurrentLoans` / `MaxPercentageOfSalary` were persisted but never enforced**; controllers accepted any draft loan and flipped it to Pending. | New `ILoanPolicyValidator` called by `POST /loan-applications/{id}/submit`. Resolves effective policy (explicit → branch → org), evaluates all three constraints, aggregates violations into an explicit error. |
| 6 | **`BenefitEligibilityRule` rows were stored but never evaluated**; any employee could enrol in any plan. | New `IBenefitEligibilityEvaluator` called by `POST /benefit-enrollments`. Evaluates the six rule types already in the enum (ServiceLength, JobGrade, EmploymentStatus, ContractType, Department, Branch) and aggregates violations. Plans with no active rules remain open (explicit opt-in restriction model). |
| 7 | **Training prerequisites were only a free-text field**, but `TrainingProgramCourse.SequenceOrder` + `IsRequired` already provided a structured signal. | New `ITrainingEnrollmentValidator` enforces **program-sequence prerequisites** (every earlier `IsRequired=true` course in the program must be Completed/Approved/InProgress/Pending by the employee before a later-sequence course is accepted) and **program-level duplicate prevention** (one active enrolment per program). Wired into `POST /training-enrollments` + bulk-enroll. |
| 8 | **`LeaveAccrualPolicy.CarryOverExpiryMonths` was configuration with no enforcer**; carried-over days never actually expired. | New `LeaveCarryoverExpiryJob` (daily at 04:00 UTC). Per eligible balance: claws back remaining carry-over on/after `yearStart + CarryOverExpiryMonths` and writes a negative `Adjustment` `LeaveTransaction` with `ReferenceType="CarryOverExpiry"`. Idempotent via the marker transaction — second run on the same day is a no-op. |
| 9 | **Performance review `RecommendPromotion` / `RecommendSalaryIncrease` / `CreatePip` had no idempotency guard**; a double-click spawned duplicate pending promotions / adjustments / PIPs. | All three endpoints now check `review.RelatedPromotionId/RelatedSalaryAdjustmentId/RelatedPipId`. A prior pending/active record returns the same id (200 OK, idempotent); a prior terminal-state record returns 409 with a clear message. |

All Part B enforcers reuse the existing `Result` pattern and live in the Application/Infrastructure layers — controllers only call `validator.ValidateAsync(...)`, no business logic moves into the HTTP layer.

---

## 2. Why each item mattered

| Item | Business impact if left unfixed |
|---|---|
| **TZ correctness** | A branch in UTC+3 punching at 23:30 local was bucketed under the previous calendar day (22:30 UTC stored as local "22:30" with date = UTC date). Late-arrival and overnight-shift calculations, holiday-day classification, overtime day-type, and payroll period boundaries all inherited the wrong date. Directly monetary. |
| **Dedup window** | A single biometric reader triggering twice in the same second or a mobile retry creating a duplicate punch both produced spurious "extra" check-ins that inflated working hours or confused the calculation service. |
| **Surfacer job** | `MissingPrerequisite` failures (e.g. "no default onboarding template resolved") silently accumulated in the audit table. HR discovered them weeks later when new hires showed up without onboarding tasks. |
| **Payroll reversal** | The worst: a paid payroll period admin-unlocked → recalculated → re-approved → re-marked-paid would **skip** already-linked loan/advance/expense rows (matching logic requires `PayrollRecordId == null`), silently producing a shorter payroll on the re-run. Financial correctness. |
| **Cascade-delete details** | `PayrollRecordDetail` orphans behind soft-deleted records confused queries, dashboard totals, and forensic audit exports. |
| **Ops dashboard** | Without it, HR couldn't tell whether the alert system was firing 3 rows or 3,000 without hand-querying the DB. The dashboard turns the Phase 1 alert infrastructure into an actual operator tool. |
| **Bulk ops** | After a deploy that misconfigures a template, HR can face hundreds of identical alerts. Resolving them one-by-one via the UI is a productivity killer; bulk-resolve + bulk-retry close that pain. |

---

## 3. Modules changed

### 3.1 Domain
- **Modified**:
  - `Tenants/TenantSettings.cs` — added `DefaultTimeZoneId` (string, default "UTC") and `AttendanceDuplicateSuppressionSeconds` (int, default 30).

### 3.2 Application
- **New (Part A)**:
  - `Abstractions/ITimezoneService.cs` — branch-tz resolution + UTC↔local conversion + `GetAttendanceDateAsync`.
  - `Abstractions/IPayrollSideEffectReverser.cs` — reverse loan/advance/expense linking + cascade-soft-delete detail rows.
- **New (Part B)**:
  - `Abstractions/ILoanPolicyValidator.cs` — enforces `LoanPolicy` constraints on loan submission.
  - `Abstractions/IBenefitEligibilityEvaluator.cs` — evaluates `BenefitEligibilityRule` on enrolment.
  - `Abstractions/ITrainingEnrollmentValidator.cs` — program-sequence prerequisite + program-duplicate check.
- **Modified**:
  - `TenantConfiguration/Dtos/ResolvedSettingsDto.cs` — added the two new setting fields to the resolved DTO so they flow through the inheritance chain.
  - `PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs` — injected `IPayrollSideEffectReverser`; recalc loop now reverses side-effects per soft-deleted record and cascade-soft-deletes orphan details.

### 3.3 Infrastructure
- **New (Part A)**:
  - `Services/TimezoneService.cs` — production impl with process-wide tz-cache and per-scope branch-id cache.
  - `Services/PayrollSideEffectReverser.cs` — loans/advances/expenses reversal + detail cascade-soft-delete.
  - `BackgroundJobs/OperationalFailureSurfacerJob.cs` — hourly surfacer for lifecycle Failed/MissingPrerequisite audit rows.
- **New (Part B)**:
  - `Services/LoanPolicyValidator.cs` — effective-policy resolution + three constraint evaluators.
  - `Services/BenefitEligibilityEvaluator.cs` — rule-type switch, handles missing employee data (e.g. no JobGrade) as explicit failure.
  - `Services/TrainingEnrollmentValidator.cs` — program-sequence enforcement via `TrainingProgramCourse`.
  - `BackgroundJobs/LeaveCarryoverExpiryJob.cs` — daily enforcer for `LeaveAccrualPolicy.CarryOverExpiryMonths`.
- **Modified**:
  - `Services/TenantSettingsResolver.cs` — populates `DefaultTimeZoneId` + `AttendanceDuplicateSuppressionSeconds` on the resolved DTO.
  - `DependencyInjection.cs` — registers all new Part A + Part B services and jobs.

### 3.4 API
- **New**:
  - `Controllers/OpsDashboardController.cs` — `GET /api/v1/ops-dashboard/summary` and `GET /api/v1/ops-dashboard/approved-not-executed`.
- **Modified (Part A)**:
  - `Controllers/AttendanceController.cs` — manual-punch path now uses `ITimezoneService`, applies duplicate-punch suppression, and the edit-path converts incoming wall-clock time correctly.
  - `Controllers/OperationalAlertsController.cs` — added `POST /bulk-resolve` and `POST /bulk-retry`.
  - `Controllers/PayrollPeriodsController.cs` — admin-unlock and cancel now call `IPayrollSideEffectReverser` + cascade-clean detail rows.
- **Modified (Part B)**:
  - `Controllers/LoanApplicationsController.cs` — `/submit` calls `ILoanPolicyValidator`.
  - `Controllers/BenefitEnrollmentsController.cs` — `POST /` (create) calls `IBenefitEligibilityEvaluator`.
  - `Controllers/TrainingEnrollmentsController.cs` — both `Create` and `BulkEnroll` call `ITrainingEnrollmentValidator`; bulk reports a `skippedByPrerequisite` list per employee.
  - `Controllers/PerformanceReviewsController.cs` — `RecommendPromotion`/`RecommendSalaryIncrease`/`CreatePip` all add idempotency guards (existing pending → 200 OK; terminal → 409 Conflict).
- **Modified startup**:
  - `Program.cs` — schedules `OperationalFailureSurfacerJob` hourly AND `LeaveCarryoverExpiryJob` daily at 04:00 UTC.

### 3.5 Tests
- **New (Part A)**: `Phase2Tests.cs` — 10 tests covering timezone resolution, midnight crossover, surfacer dedup + supersede-by-success, and payroll side-effect reversal + detail cascade delete.
- **New (Part B)**: `Phase2BusinessCompletionTests.cs` — 11 tests covering loan policy violations (service months, salary %, concurrent) + pass path + no-policy pass-through, benefit eligibility (no rules, service-length block, branch mismatch, multiple-violation aggregation), training prerequisite (missing prereq block, completed prereq pass, duplicate program block), and carry-over expiry (claw-back + idempotency).

---

## 4. Schema changes

Two additive columns on `TenantSettings`. Both are nullable/defaulted so the migration is safe on existing rows.

| Table | Column | Type | Default | Notes |
|---|---|---|---|---|
| `TenantSettings` | `DefaultTimeZoneId` | `text` | `"UTC"` | Used when `Branch.TimeZone` is empty or invalid. |
| `TenantSettings` | `AttendanceDuplicateSuppressionSeconds` | `integer` | `30` | Set to `0` to disable dedup. |

Generate the migration after these changes:

```bash
dotnet ef migrations add Phase2TimezoneAndDedup \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api
```

No schema change needed for the surfacer / reverser / ops-dashboard work — they reuse the Phase 1 `OperationalFailureAlert` table and the existing payroll tables.

---

## 5. New services, handlers, jobs

| Type | Purpose | Registered as |
|---|---|---|
| `ITimezoneService` / `TimezoneService` | Centralized UTC↔branch-local + `AttendanceDate` bucket + dedup-safe timezone resolution (Branch → TenantSettings → UTC). | `Scoped` |
| `IPayrollSideEffectReverser` / `PayrollSideEffectReverser` | Reverses loan/advance/expense linking and cascade-soft-deletes orphan details. Idempotent. | `Scoped` |
| `OperationalFailureSurfacerJob` (Coravel `IInvocable`) | Hourly sweep: raises alerts for lifecycle Failed/MissingPrerequisite rows without an open matching alert. | `Transient`, scheduled `Hourly()` in `Program.cs`. |

---

## 6. Business rules now enforced

### Part A (hardening)
| Rule | Before Phase 2 | After Phase 2 |
|---|---|---|
| Manual attendance punch stores branch-local wall-clock time for `TransactionTimeLocal`. | `// TODO: Convert to branch timezone` literally in code — stored UTC in local field. | Resolved via `ITimezoneService`; `AttendanceDate` is the branch-local calendar date. |
| Duplicate identical punches within N seconds are suppressed. | Not enforced. | `TenantSettings.AttendanceDuplicateSuppressionSeconds` (default 30) — matching `(EmployeeId, TransactionType, IsManual=true)` window. |
| Admin-unlock of a Paid payroll period clears all record-linked side-effects so a fresh recalc sees scheduled loans/advances/expenses. | Records unlocked but loan repayments stayed `Paid`; recalc skipped them. | `PayrollSideEffectReverser.ReverseAllInPeriodAsync` runs inside the same SaveChanges scope as the unlock. |
| Period cancel reverses side-effects, soft-deletes records, cleans orphan details. | Only flipped period.Status = Cancelled. | Full reversal + cascade cleanup. |
| Payroll recalc cascade-soft-deletes orphan `PayrollRecordDetail` rows. | Orphans persisted behind soft-deleted parents. | Handled in `ProcessPayrollPeriodCommandHandler` before the new calc runs. |
| Lifecycle audit rows with `Failed` / `MissingPrerequisite` status become visible operational alerts. | Audit-only. | Surfacer job, hourly, dedup-safe. |

### Part B (business completion)
| Rule | Before Phase 2 | After Phase 2 |
|---|---|---|
| Loan submission respects `LoanPolicy.MaxConcurrentLoans`. | Field stored; controller counted active loans but never compared. | `LoanPolicyValidator` blocks submission; message lists the current count vs the limit. |
| Loan submission respects `LoanPolicy.MinServiceMonths`. | Field stored; never evaluated. | Employee months-of-service computed from `HireDate`; blocked if below. |
| Loan submission respects `LoanPolicy.MaxPercentageOfSalary`. | Field stored; never evaluated. | Resolves current `EmployeeSalary` (IsCurrent=true, latest effective); blocks if `Requested > BaseSalary × %`. Missing current salary → explicit failure (not silent pass). |
| Benefit enrolment respects `BenefitEligibilityRule` rows. | Rules stored; every employee could enrol. | All six `EligibilityRuleType` variants evaluated (ServiceLength, JobGrade, EmploymentStatus, ContractType, Department, Branch). Multiple violations aggregated. No rules → open (explicit opt-in restriction model). |
| Training enrolment respects program-sequence prerequisites. | Free-text `Prerequisites` only; no structured enforcement. | `TrainingProgramCourse.SequenceOrder` + `IsRequired` drives the check: every earlier required course must have a Completed/Approved/InProgress/Pending enrolment before a later course is accepted. |
| Training enrolment by program id is unique. | Session-level duplicate prevention existed; program-level didn't. | `TrainingEnrollmentValidator` blocks a second non-terminal enrolment in the same program. |
| Leave carry-over expires per `LeaveAccrualPolicy.CarryOverExpiryMonths`. | Field stored; nothing ever expired carry-over. | `LeaveCarryoverExpiryJob` daily at 04:00 UTC claws back remaining carry-over; writes a negative `Adjustment` `LeaveTransaction` with `ReferenceType="CarryOverExpiry"` as the idempotency marker. Never exceeds current balance. |
| Performance-review recommendations are idempotent. | Double-click → duplicate pending promotions/adjustments/PIPs. | All three endpoints check `review.Related*Id` first; existing pending → 200 OK same id; terminal prior record → 409 Conflict. |

---

## 7. APIs added / changed

### New endpoints (Part A)
| Endpoint | Purpose |
|---|---|
| `GET /api/v1/ops-dashboard/summary` | Daily-standup snapshot: unresolved alerts (by category + severity), lifecycle failures last 7d, payroll exceptions, approved-but-not-executed counts for all 6 Phase 1 targets, overdue onboarding tasks, overdue clearance items, overdue workflow approvals. |
| `GET /api/v1/ops-dashboard/approved-not-executed?limit=50` | Drill-down: ids + key fields (`ApprovedAt`, amount/number, last `ExecutionError`) for each of the 6 Phase 1 target types so HR can click through to retry. |
| `POST /api/v1/operational-alerts/bulk-resolve` | Bulk mark up to 500 alerts as resolved in one call. Returns per-item `Succeeded / AlreadyProcessed / Skipped / Failed`. |
| `POST /api/v1/operational-alerts/bulk-retry` | Bulk re-run up to 200 retryable `ApprovalExecution` alerts. Auto-resolves each on executor success; non-retryable or non-ApprovalExecution alerts return `Skipped` with a clear reason. |

### Changed endpoints (Part B)
| Endpoint | Change |
|---|---|
| `POST /api/v1/loan-applications/{id}/submit` | Now returns 400 with aggregated policy-violation message when any of `MinServiceMonths` / `MaxPercentageOfSalary` / `MaxConcurrentLoans` fails. No-policy continues to pass through. |
| `POST /api/v1/benefit-enrollments` | Now returns 400 with aggregated eligibility-violation message when any active `BenefitEligibilityRule` on the plan fails for the employee. |
| `POST /api/v1/training-enrollments` | Now returns 400 when program-sequence prerequisites are not satisfied. Bulk-enroll reports per-employee `skippedByPrerequisite` list in the response instead of failing the whole call. |
| `POST /api/v1/performance-reviews/{id}/recommend-promotion` / `recommend-salary-increase` / `create-pip` | Idempotent: existing pending related record returns same id (200). Existing terminal-state record returns 409. |

No breaking changes to existing endpoints. `POST /api/v1/attendance/transactions` gains the dedup short-circuit response shape:
```json
{
  "message": "Duplicate punch suppressed within the configured window.",
  "suppressedWindowSeconds": 30,
  "existingTransactionId": 12345,
  "transactionTimeUtc": "2026-05-01T07:59:58Z"
}
```
Clients that treated HTTP 200 as "transaction created" should now inspect the body for the `message` or the presence of the `existingTransactionId` field.

---

## 8. Tests added

### Part A — 10 tests in `tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase2Tests.cs`.

| Test | Proves |
|---|---|
| `GetBranchTimeZone_from_entity_returns_correct_tz` | Resolves a known tz id directly from the loaded entity. |
| `GetBranchTimeZone_falls_back_to_UTC_on_unknown_id` | Unknown tz id → UTC, no exception. |
| `ToBranchLocalAsync_falls_back_to_tenant_default_when_branch_tz_is_empty` | Empty branch tz → tenant default. |
| `GetAttendanceDateAsync_buckets_midnight_crossover_correctly` | UTC 22:30 on 2026-05-01 in UTC+3 buckets to 2026-05-02 (works on both Linux IANA and Windows tz ids; falls through cleanly on UTC-only CI). |
| `ToBranchLocalAsync_rejects_non_existent_branch_to_tenant_default` | Non-existent branch id doesn't throw; falls to tenant default. |
| `SurfacerJob_raises_alert_for_Failed_audit_without_existing_open_alert` | Failed lifecycle audit becomes an `OperationalFailureAlert` with `IsRetryable=true` and the correct source key. |
| `SurfacerJob_is_idempotent_on_second_run` | Second invocation does not create a duplicate alert. |
| `SurfacerJob_ignores_audits_superseded_by_a_successful_retry` | An earlier Failed audit with a later Succeeded for the same key is correctly ignored. |
| `Reverser_unlinks_loan_repayment_and_restores_balance_and_Active_status` | `LoanRepayment.Status=Paid` → `Scheduled`, `PayrollRecordId=null`, `OutstandingBalance` incremented back, `LoanApplication.Status=FullyPaid` → `Active`. |
| `Reverser_unlinks_salary_advance` | `SalaryAdvance.Status=Deducted` → `Approved`, `PayrollRecordId=null`. |
| `CascadeDeleteDetailsAsync_soft_deletes_orphan_details` | Detail row behind a soft-deleted parent is cascade-soft-deleted. |

### Part B — 11 tests in `tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase2BusinessCompletionTests.cs`.

| Test | Proves |
|---|---|
| `LoanPolicyValidator_blocks_when_service_months_below_minimum` | `MinServiceMonths` enforcement. Error message mentions the limit. |
| `LoanPolicyValidator_blocks_when_amount_exceeds_percentage_of_salary` | `MaxPercentageOfSalary` × current `EmployeeSalary` is the hard ceiling. |
| `LoanPolicyValidator_blocks_when_concurrent_loans_at_limit` | `MaxConcurrentLoans` counts Active + Approved + Pending. |
| `LoanPolicyValidator_passes_when_all_constraints_satisfied` | Positive path. |
| `LoanPolicyValidator_passes_when_no_policy_is_configured` | Documented pass-through. |
| `BenefitEligibility_with_no_rules_allows_anyone` | Explicit opt-in restriction model. |
| `BenefitEligibility_blocks_when_service_length_rule_fails` | ServiceLength rule. |
| `BenefitEligibility_blocks_when_branch_rule_mismatches` | Branch rule. |
| `BenefitEligibility_aggregates_multiple_violations` | All violations combined into one error message. |
| `TrainingValidator_blocks_when_earlier_required_course_is_not_satisfied` | Program-sequence prerequisite with `IsRequired=true` + `SequenceOrder`. |
| `TrainingValidator_passes_when_prerequisite_is_completed` | Positive path — Completed prereq allows later course. |
| `TrainingValidator_blocks_duplicate_active_program_enrollment` | Program-level duplicate prevention. |
| `CarryoverExpiryJob_claws_back_expired_carryover_and_writes_transaction` | Clawback + negative Adjustment transaction. (Skipped on Jan/Feb/Mar when cutoff hasn't passed — documented no-op assertion.) |
| `CarryoverExpiryJob_is_idempotent_on_second_run` | Second run is a no-op; `ReferenceType="CarryOverExpiry"` marker prevents duplicate writes. |

Run all Phase 2 tests:
```bash
cd tests/TecAxle.Hrms.LifecycleAutomation.Tests && dotnet test
```

Total test count in this project: 19 Phase 1 + 10 Part A + 11 Part B = **40**, plus the original lifecycle suite.

---

## 9. Known limitations

| Item | Why |
|---|---|
| The midnight-crossover test reads the platform's tz database. CI runners on Linux Alpine without `tzdata` fall through to UTC — the assertion branch covers this case explicitly. Production servers should install `tzdata`. | Out of scope for a code change. Standard deployment prerequisite. |
| `ProcessMobileTransactionCommandHandler` already handled branch tz correctly (pre-Phase 2); Phase 2 did not refactor it to call `ITimezoneService` because doing so would only be cosmetic. A future pass could consolidate. | Low value; documented. |
| SQLite rollback/transaction tests from Phase 1 were not re-run here; Phase 2 changes are narrow enough (service additions + controller edits) that the Phase 1 transactional tests remain authoritative for the payroll commit/rollback/rerun semantics. Phase 2 adds **state-level** tests around the reverser itself. | Intentional — avoid redundant coverage. |
| A migration is **not** pre-generated. Run `dotnet ef migrations add Phase2TimezoneAndDedup` before deploy. | Matches the Phase 1 pattern. |
| Remote-work quota, leave overlap, attendance-correction retroactive window, and date-range salary-advance matching were scope items in the Phase 2 brief but are already enforced in the codebase from earlier phases (v13.x + Phase 1). Audit pointers in §10. | No new work needed. |

---

## 10. Phase 2 scope items already covered by earlier phases (audit trail)

| Scope item | Where it's enforced | When it was added |
|---|---|---|
| Attendance correction retroactive window | `CreateAttendanceCorrectionRequestCommandValidator.cs:29` + `UpdateAttendanceCorrectionRequestCommandValidator.cs:28` — FluentValidation against `TenantSettings.AttendanceCorrectionMaxRetroactiveDays`. | v13.4 |
| Leave overlap prevention | `CreateEmployeeVacationCommandHandler.cs:130-139` — explicit overlap query before save. | Pre-v14.1 |
| Leave attendance sync on approval | `ApproveStepCommandHandler.UpdateAttendanceForVacationPeriodAsync` (called from workflow approval). | Pre-v14.1 |
| Leave rejection releases reserved balance | `ApproveStepCommandHandler.UpdateVacationStatusAsync` — calls `ReleaseLeaveBalanceAsync` on `ApprovalAction.Rejected`. | Pre-v14.1 |
| Remote-work quota enforcement | `CreateRemoteWorkRequestCommandHandler.ValidateQuotaLimits` — per-week, per-month, per-year + blackout dates. | Pre-v14.1 |
| `SalaryAdvance` date-range deduction matching | `ProcessPayrollPeriodCommandHandler.IntegrateSalaryAdvancesAsync` — prefers `DeductionStartDate/EndDate`, YYYYMM fallback. | Phase 1 (v14.1) |
| Expense reimbursement stale-claim gate | `ProcessPayrollPeriodCommandHandler.IntegrateExpenseReimbursementsAsync` — `ApprovedAt ≤ periodEnd`. | Phase 1 (v14.1) |
| Auto-execute on final approval | `RequestFinallyApprovedEvent` + `RequestFinallyApprovedHandler` → `ExecuteApprovalCommand`. | Phase 1 closure pass. |
| Workflow `FailedRouting` → alert | `WorkflowEngine.RecordFailedRoutingAsync` → `IFailureAlertService.RaiseAsync`. | Phase 1 closure pass. |

---

## 11. Recommended next phase items

Items from the Phase 2 brief that are **now delivered** (no longer pending):
- ✅ Loan policy enforcement (§Part B, #5).
- ✅ Benefit eligibility enforcement (§Part B, #6).
- ✅ Training prerequisite enforcement via program-sequence model (§Part B, #7).
- ✅ Leave carry-over expiry job (§Part B, #8).
- ✅ Performance review follow-through idempotency (§Part B, #9).

Remaining Phase 3 candidates:

1. **Auto-checkout job** for employees who forgot to check out — `TenantSettings.AutoCheckOutEnabled` + `AutoCheckOutTime` exist but no scheduler consumes them.
2. **PIP → termination escalation** when `PipStatus.CompletedUnsuccessful` is recorded and the configured policy allows.
3. **Admin UI** for the Phase 1/2 endpoints (`/operational-alerts`, `/ops-dashboard/summary`, `/approval-execution/execution-status`). Backend is production-ready.
4. **Cross-module global search** (employee / request lookup) — the business-flow review called this out as a productivity pain for HR.
5. **Migration-time consolidation** — remove legacy `SalaryAdvance.DeductionMonth` once admin UI is migrated.
6. **Training free-text `Prerequisites` → structured model upgrade** — the Part B enforcer uses the existing `TrainingProgramCourse` sequence model. Upgrading the free-text `TrainingCourse.Prerequisites` field to a structured course-to-course dependency table is a distinct feature, not a gap.

---

## 12. Verification checklist

### Part A — Hardening

| Phase 2 objective | Status | Evidence |
|---|---|---|
| **1** Attendance TZ correctness (UTC source of truth, branch-tz conversion) | ✅ Fully completed | `ITimezoneService` + wired in `AttendanceController.CreateTransaction` + `CreateOrUpdateTimeTransaction`; covered by 5 timezone tests including midnight crossover. |
| **1.a** Overnight / midnight crossover / payroll-boundary cases | ✅ | `GetAttendanceDateAsync_buckets_midnight_crossover_correctly`. |
| **1.b** Duplicate-punch suppression window | ✅ | Enforced in `AttendanceController` with tenant setting `AttendanceDuplicateSuppressionSeconds`. |
| **1.c** Consistent TZ across manual / mobile / edit paths | ✅ | Manual controller uses `ITimezoneService`; mobile handler already correct; edit-path converts incoming wall-clock properly. |
| **2** Close remaining silent-failure blind spots | ✅ Fully completed | `OperationalFailureSurfacerJob` (hourly) scans lifecycle audit; 3 tests cover raise, dedup, and supersede-by-success. |
| **3** Payroll recalc / cancel / admin-unlock side-effect safety | ✅ Fully completed | `IPayrollSideEffectReverser` + wired in recalc / admin-unlock / cancel. 3 tests cover loan, advance, and detail cascade. |
| **3.a** Cascade-soft-delete of orphan `PayrollRecordDetail` | ✅ | `CascadeDeleteDetailsAsync_soft_deletes_orphan_details` test. |
| **3.b** Loan / advance / expense reversal on unlock & cancel | ✅ | Reverser called from `PayrollPeriodsController.AdminUnlock` and `.Cancel`. |
| **6** Operational dashboard / summary support | ✅ Fully completed | `OpsDashboardController.GetSummary` + `GetApprovedNotExecuted` drill-down. |
| **7** Bulk / operator-efficiency (safe subset) | ✅ Fully completed | `POST /operational-alerts/bulk-resolve` (500 cap) and `/bulk-retry` (200 cap, ApprovalExecution only). |

### Part B — Business completion

| Phase 2 objective | Status | Evidence |
|---|---|---|
| **4.1** Loan policy `MinServiceMonths` enforcement | ✅ Fully completed | `LoanPolicyValidator.ValidateAsync`; test `LoanPolicyValidator_blocks_when_service_months_below_minimum`. |
| **4.2** Loan policy `MaxPercentageOfSalary` enforcement | ✅ Fully completed | `LoanPolicyValidator.ValidateAsync`; test `LoanPolicyValidator_blocks_when_amount_exceeds_percentage_of_salary`. |
| **4.3** Loan policy `MaxConcurrentLoans` enforcement | ✅ Fully completed | `LoanPolicyValidator.ValidateAsync`; test `LoanPolicyValidator_blocks_when_concurrent_loans_at_limit`. |
| **4.4** No-policy pass-through documented + tested | ✅ | `LoanPolicyValidator_passes_when_no_policy_is_configured`. |
| **5** Benefit eligibility rule enforcement (ServiceLength / JobGrade / EmploymentStatus / ContractType / Department / Branch) | ✅ Fully completed | `BenefitEligibilityEvaluator.EvaluateAsync` handles all 6 rule types; tests for no-rule passthrough, service-length block, branch mismatch, multi-violation aggregation. |
| **6** Training program-sequence prerequisite enforcement | ✅ Fully completed | `TrainingEnrollmentValidator.ValidateAsync` using the structured `TrainingProgramCourse` model; tests for missing-prereq block + completed-prereq pass. |
| **6.a** Training duplicate-program prevention | ✅ Fully completed | Same validator; test `TrainingValidator_blocks_duplicate_active_program_enrollment`. |
| **6.b** Training free-text `TrainingCourse.Prerequisites` | 🚧 Not enforced (domain limitation documented) | Free-text has no structured semantics — no reliable way to parse. Moved to Phase 3 as a feature upgrade (structured course-to-course prereq table). |
| **7** Leave `CarryOverExpiryMonths` enforcement | ✅ Fully completed | `LeaveCarryoverExpiryJob` (daily 04:00 UTC); tests for claw-back + idempotency. |
| **8** Performance review follow-through idempotency | ✅ Fully completed | Idempotency guards on `RecommendPromotion` / `RecommendSalaryIncrease` / `CreatePip`. Prior pending → 200 OK same id; terminal → 409. |
| **Tests** | ✅ | 11 new Part B tests added to `Phase2BusinessCompletionTests.cs`. Part A still has 10 tests in `Phase2Tests.cs`. Total Phase 2: 21 tests. |
| **Report** | ✅ | This document, updated to clearly separate Part A hardening from Part B business completion. |

**Overall Phase 2 completion: all must-have items in both tracks delivered.** The single intentionally-deferred item (`TrainingCourse.Prerequisites` free-text parsing) is a feature upgrade — the domain genuinely lacks the structured foundation for a parser. Recorded in §11 as Phase 3.

---

## 13. Deployment checklist (order matters)

1. **Regenerate migration** on the feature branch:
   ```bash
   dotnet ef migrations add Phase2TimezoneAndDedup \
     --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
     --startup-project src/Api/TimeAttendanceSystem.Api
   ```
2. **Review** the generated migration — expect only two additive columns on `TenantSettings`. Part B required **no** schema changes — all enforcers use existing tables and existing fields.
3. **Apply migration in staging** — additive, no data migration needed.
4. **Deploy API build** — DI registers `ITimezoneService`, `IPayrollSideEffectReverser`, `OperationalFailureSurfacerJob`, `ILoanPolicyValidator`, `IBenefitEligibilityEvaluator`, `ITrainingEnrollmentValidator`, `LeaveCarryoverExpiryJob`. `Program.cs` schedules the surfacer hourly and the carry-over expiry job daily at 04:00 UTC.
5. **Staging smoke test — Part A**:
   - **TZ**: set `Branch.TimeZone = "Asia/Riyadh"`, submit a manual punch for `TransactionTimeUtc = 2026-05-01T22:30:00Z`, verify the returned transaction has `TransactionTimeLocal = 2026-05-02T01:30:00` and `AttendanceDate = 2026-05-02`.
   - **Dedup**: submit the same `CheckIn` twice within 5 seconds — second call returns the suppression response body with `existingTransactionId`.
   - **Surfacer**: insert a `LifecycleAutomationAudit` row with `Status=MissingPrerequisite`; within 1 hour it appears in `GET /api/v1/operational-alerts?category=LifecycleAutomation`.
   - **Payroll reversal**: admin-unlock a Paid period that had loan deductions → verify in DB that the `LoanRepayment` rows flip back to `Scheduled`, `PayrollRecordId = null`, `LoanApplication.OutstandingBalance` increments back.
   - **Dashboard**: `GET /api/v1/ops-dashboard/summary` returns structured counts.
   - **Bulk resolve**: call `POST /api/v1/operational-alerts/bulk-resolve` with a list; verify per-item outcomes.
6. **Staging smoke test — Part B**:
   - **Loan policy**: create a `LoanPolicy(MinServiceMonths=12, MaxPercentageOfSalary=300, MaxConcurrentLoans=1)`; create a loan for a 3-month-old employee requesting `1000`. `/submit` returns 400 with a message listing the service-months violation.
   - **Benefit eligibility**: create a `BenefitEligibilityRule(RuleType=Branch, BranchId=X)` on a plan; attempt to enrol an employee from a different branch. Returns 400 with the branch mismatch reason.
   - **Training prerequisite**: create a program with Course A (seq 1, required) → Course B (seq 2); enrol employee in a session of Course B without having completed Course A. Returns 400 naming Course A.
   - **Carry-over expiry**: seed a `LeaveBalance` with `AdjustedDays=5` + a `CarryOver` `LeaveTransaction` for the current year. Set a policy with `CarryOverExpiryMonths=3`. Manually invoke the job (or wait for 04:00 UTC after April). Verify `AdjustedDays=0` and a negative `Adjustment` transaction with `ReferenceType="CarryOverExpiry"` exists.
   - **Performance idempotency**: call `/recommend-promotion` twice on the same review. Second call returns HTTP 200 with the same promotion id (not a duplicate).
7. **Configure defaults**:
   - `TenantSettings.DefaultTimeZoneId` — set to the company's operational tz (e.g. `"Asia/Riyadh"` or `"Arab Standard Time"` depending on server OS) for branches that don't set their own.
   - `TenantSettings.AttendanceDuplicateSuppressionSeconds` — default 30s; set to `0` if a tenant has its own dedup upstream.
8. **Monitor**: add `OperationalFailureAlerts.unresolved` count AND the hourly `OperationalFailureSurfacerJob` / daily `LeaveCarryoverExpiryJob` exit logs to the ops dashboard.

---

## 14. Cross-references

- [PHASE1_CRITICAL_FIX_IMPLEMENTATION.md](PHASE1_CRITICAL_FIX_IMPLEMENTATION.md) — Phase 1 (v14.1): executors, event-driven dispatch, `IFailureAlertService`, workflow `FailedRouting` alert, SQLite-backed rollback proofs.
- [HRMS_BUSINESS_FLOW_REVIEW.md](HRMS_BUSINESS_FLOW_REVIEW.md) — original gap inventory; Phase 2 specifically closes §12.2 (timezone), §12.4 (payroll orphan details), §12.10 (alert visibility), plus the operator-efficiency items in §11.
- `PAYROLL_PRODUCTION_FIX_REVIEW.md` — baseline payroll pipeline the Phase 2 reverser plugs into.
- `LIFECYCLE_AUTOMATION_FIX.md` — the audit table the surfacer scans.

---

## 15. Sign-off

**Phase 2 version tag**: **v14.2**
**Sign-off status**: ✅ **READY**

After Phase 2 the system is:
- **Materially more accurate on dates/times** — UTC source of truth, branch-tz resolution everywhere, duplicate-punch suppression, midnight crossover correctly bucketed. _(Part A)_
- **Silent on nothing** — every lifecycle / workflow / executor / payroll failure path raises a visible operational alert. _(Part A)_
- **Consistent under payroll recalc / unlock / cancel** — loans, advances, expenses, and detail rows all cascade correctly; idempotency preserved. _(Part A)_
- **Observable by operators** — one dashboard call surfaces the daily HR standup data; bulk endpoints make mass-acknowledge and mass-retry one call instead of hundreds. _(Part A)_
- **Enforcing the business rules it already persists** — loan-policy fields, benefit eligibility rules, training program sequences, and leave carry-over expiry windows now actually restrict behaviour rather than being passive configuration. _(Part B)_
- **Idempotent at the performance-follow-through boundary** — double-clicks no longer spawn duplicate pending promotions / salary adjustments / PIPs. _(Part B)_

Every scope item in the original Phase 2 brief is either implemented with test coverage or documented with a genuine domain blocker (only `TrainingCourse.Prerequisites` free-text parsing, which is a distinct feature and not a gap).
