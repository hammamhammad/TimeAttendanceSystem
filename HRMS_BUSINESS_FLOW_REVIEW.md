# HRMS Business Flow Review

> **Project**: TecAxle HRMS (v14.0 — single-company collapse)
> **Review date**: 2026-04-16
> **Scope**: Full-stack, end-to-end business-flow analysis (backend `.NET 9`, admin Angular, self-service Angular, Flutter mobile, PostgreSQL, Coravel jobs, SignalR, FCM)
> **Artifacts inspected**: 127 API controllers, ~220 DB tables, 38 background jobs, 3 front-end applications, 4 domain layers, existing fix-review documents (`PAYROLL_PRODUCTION_FIX_REVIEW.md`, `LIFECYCLE_AUTOMATION_FIX.md`, `WORKFLOW_ROUTING_HARDENING_FIX.md`, etc.).
> **Audience**: Product, business analysts, HR solution architects, engineering leadership.

---

## 1. Executive Summary

### What the system is
TecAxle HRMS is a **single-company, multi-branch workforce-management platform** covering the full employee lifecycle: **hire → work → reward → exit**. It is composed of:

- **Backend API** (.NET 9, Clean Architecture + MediatR/CQRS) on `localhost:5099`.
- **Admin portal** (Angular 20, signals, standalone components) on `:4200` — HR, payroll, admin.
- **Self-service portal** (Angular 20) on `:4201` — employees and managers.
- **Mobile app** (Flutter 3.22) — field attendance with GPS + NFC dual verification.
- **PostgreSQL 15+** single DB `tecaxle_hrms`.
- **Coravel** scheduler hosting 38+ background jobs.
- **SignalR** real-time notifications + **FCM** push.

### Main modules discovered
26 top-level business domains (see §2). The biggest and most carefully engineered are:
1. **Payroll pipeline** — production-hardened (v13.0/v13.1), policy-driven, fully audited, locked on Paid.
2. **Approval workflow engine** — v13.6 hardening (role-assignment strategies, bounded delegation, definition snapshots, return-for-correction/resubmit, fallback routing, system-action audit).
3. **Lifecycle automation** — v13.5, 7 domain-event-driven HR transitions, kill-switch + per-setting opt-in.
4. **Time & attendance** — daily auto-generation, dual-source punches (biometric / mobile GPS+NFC / manual), overtime config per-date.
5. **Tenant (company) settings + inheritance** — `Company → Branch → Department` resolver, 5-min cache.

### Business maturity — quick verdict
| Rating | Description | Examples |
|---|---|---|
| **Mature** (production-grade) | Payroll calculation pipeline, workflow engine, time & attendance calculation, leave accrual, EOS, lifecycle event bus, mobile GPS+NFC verification, audit infrastructure (`PayrollRunAudit`, `LifecycleAutomationAudit`, `WorkflowSystemActionAudit`, `AuditLog`) |
| **Functional** (works end-to-end but gaps) | Recruitment, onboarding, offboarding/clearance, shift assignment/swap, excuse, remote work, disciplinary, documents, announcements, assets, surveys, reports/analytics |
| **CRUD shell** (data model only, no real workflow) | **Allowance requests → assignment linkage** (approval state but no application handler), **loan/salary-advance approval** (no application handler), **expense claim approval** (no application handler), **letter requests** (no document generation), **benefit premium payroll deduction** (framework exists but NOT wired to payroll), **talent/succession/career paths** (data only), **training prerequisites / evaluation → certification**, **goals framework**, **competency framework**, **on-call schedules** (thin) |
| **Partial / missing** | External candidate portal, interview rubrics/scoring, 360-feedback response aggregation, PIP → termination escalation, training-to-certification automation, offline mobile support, timesheet↔attendance reconciliation, retention-risk action plans |

### Key observations
1. **Payroll and Workflow engines are textbook-quality.** Effective-date resolution, policy tiers, lock enforcement, forensic audit snapshots — all present.
2. **The three financial side-integrations to payroll (loans, salary advances, expense reimbursements) are fragile.** They assume pre-created records in the correct state, use brittle matching keys (`DeductionMonth=YYYYMM`), and have no transactional safeguards with the payroll run.
3. **Benefits are architecturally disconnected from payroll.** `BenefitPlan.EmployeePremiumAmount` is never pulled into payroll deduction — employees keep receiving full salary regardless of elections. HR must manually create `AllowanceAssignment` deductions.
4. **Many "workflow-driven" entities (AllowanceRequest, LoanApplication, SalaryAdvance, ExpenseClaim, LetterRequest) have no command handler to apply the approved outcome** — they reach status `Approved` and then stall. This is the single largest gap.
5. **Lifecycle automation handler failures are silent** — by design (`ILifecycleEventPublisher` swallows handler exceptions) — but there is **no HR-facing alert** surfacing `LifecycleAutomationAudit.Status = Failed/FailedRouting`. HR must actively query audit tables.
6. **Timezone conversion is incomplete** (explicit `TODO` in `AttendanceController`), a meaningful risk for multi-branch attendance, overnight shifts, and border dates.
7. **Business rules have been thoroughly moved to `TenantSettings`** (v13.3–v13.6), but there are still hardcoded defaults inside handlers (e.g., 8 clearance items, 30-day fallback calendar basis, default workflow fallback role name).
8. **The admin portal lacks bulk actions, global search, and a unified approvals inbox**; the self-service portal has a fragmented "request types" pattern with no single "my requests" view. Both hurt daily HR/employee productivity.
9. **Mobile app has no offline support, generic failure messages, and no background sync** — a gap for field staff.
10. **Reporting is hard-coded endpoints**, no self-service custom-report builder, no scheduled email delivery wired, and analytics snapshot retention policy is unclear.

---

## 2. System Scope and Functional Map

### Backend controllers by domain group

| Group | Controllers (representative) | User roles | Key dependencies |
|---|---|---|---|
| **Authentication & Access** | `Auth`, `Users`, `Roles`, `Permissions`, `Sessions`, `Seed` | All | JWT, PBKDF2, RefreshToken cookies, `UserBranchScope` |
| **Organization** | `Branches`, `Departments`, `JobGrades` | SystemAdmin, HRManager | `ManagerEmployeeId`, geofence config, shift default resolution |
| **People** | `Employees`, `EmployeeDetails`, `EmployeeContracts`, `EmployeePromotions`, `EmployeeTransfers`, `SalaryAdjustments` | HR, Manager | `EmployeeUserLink`, lifecycle events |
| **Time & Attendance** | `Attendance`, `AttendanceCorrectionRequests`, `MobileAttendance`, `MobileSchedule`, `NfcTags`, `PublicHolidays`, `OvertimeConfiguration` | Employee, Manager, HR | `DailyAttendanceGenerationJob`, `ShiftAssignment`, `AttendanceVerificationLog`, HMAC-SHA256 |
| **Shifts** | `Shifts`, `ShiftAssignments`, `ShiftSwapRequests`, `OnCallSchedules`, `CompensatoryOffs` | Manager, HR | Shift resolution priority (Employee > Dept > Branch) |
| **Leave & Absence** | `VacationTypes`, `EmployeeVacations`, `LeaveBalances`, `LeaveEncashments`, `EmployeeExcuses`, `ExcusePolicies`, `RemoteWorkPolicies`, `RemoteWorkRequests` | Employee, Manager, HR | `LeaveAccrualPolicy`, `MonthlyLeaveAccrualJob`, workflows |
| **Timesheets & Projects** | `TimesheetPeriods`, `Timesheets`, `Projects`, `ProjectTasks` | Employee, Manager, PM | `TimesheetPeriodGenerationJob`, `TimesheetSubmissionReminderJob` |
| **Approval Workflows** | `Approvals`, `Workflows`, `LifecycleAutomation` | All (approver depends on role) | `WorkflowDefinition`, `ApproverResolver`, `ApprovalDelegation`, `WorkflowTimeoutProcessingJob` |
| **Payroll & Comp** | `PayrollPeriods`, `PayrollSettings`, `AllowanceTypes`, `AllowancePolicies`, `AllowanceAssignments`, `AllowanceRequests`, `SalaryStructures`, `EmployeeSalaries`, `EndOfService`, `EndOfServicePolicies` | HR, Payroll Admin, SystemAdmin | `IPayrollCalculationService`, `IPayrollInputResolver`, `PayrollRunAudit`, `ExpireTemporaryAllowancesJob` |
| **Loans & Advances** | `LoanTypes`, `LoanPolicies`, `LoanApplications`, `SalaryAdvances` | Employee, HR, Finance | Payroll integration (deduction lines), `LoanRepaymentReminderJob` |
| **Expenses** | `ExpenseCategories`, `ExpensePolicies`, `ExpenseClaims` | Employee, Manager, Finance | Payroll integration (reimbursement lines) |
| **Benefits** | `BenefitPlans`, `BenefitEnrollments`, `BenefitClaims`, `OpenEnrollmentPeriods` | Employee, HR | `OpenEnrollmentPeriodActivatorJob`, `BenefitDeductionSyncJob`, `BenefitEnrollmentExpiryJob` |
| **Recruitment** | `JobRequisitions`, `JobPostings`, `Candidates`, `JobApplications`, `OfferLetters` | HR, Hiring Manager | Workflow, `OfferAcceptedEvent` → onboarding |
| **Onboarding** | `OnboardingTemplates`, `OnboardingProcesses`, `OnboardingTasks` | HR, Buddy, New Hire | Template resolver (default → dept → branch → IsDefault), `OnboardingTaskOverdueJob` |
| **Performance** | `PerformanceReviewCycles`, `PerformanceReviews`, `CompetencyFrameworks`, `PerformanceImprovementPlans`, `FeedbackRequests` | Employee, Manager, HR | `ReviewCycleReminderJob`, `PIPExpiryCheckJob` |
| **Training** | `TrainingCategories`, `TrainingCourses`, `TrainingPrograms`, `TrainingSessions`, `TrainingEnrollments`, `TrainingAttendance`, `TrainingEvaluations`, `TrainingBudgets` | Employee, Trainer, HR | `TrainingSessionReminderJob` |
| **Talent / Succession** | `TalentProfiles`, `SuccessionPlans`, `KeyPositions`, `CareerPaths` | HR, Leadership | `SuccessionPlanReviewReminderJob`, `TalentProfileSyncJob` |
| **Employee Relations** | `CounselingRecords`, `DisciplinaryActions` | HR, Manager, Employee | `CounselingFollowUpReminderJob`, `GrievanceSlaAlertJob` |
| **Offboarding** | `ResignationRequests`, `Terminations`, `Clearance`, `ExitInterviews` | Employee, HR, IT/Finance/Admin | Lifecycle: resignation-approved → termination → clearance → EOS → deactivate |
| **Documents & Compliance** | `EmployeeDocuments`, `DocumentCategories`, `EmployeeCertifications` | HR, Employee | `DocumentExpiryAlertJob`, `CertificationExpiryAlertJob`, `VisaExpiryAlertJob`, `ContractExpiryAlertJob` |
| **Assets** | `Assets`, `AssetCategories`, `AssetAssignments`, `AssetMaintenance` | Admin, IT, Employee | `AssetWarrantyExpiryAlertJob`, `OverdueAssetReturnAlertJob` |
| **Communication** | `Announcements`, `AnnouncementCategories`, `NotificationBroadcasts`, `Notifications`, `PushTokens` | HR, All | `AnnouncementSchedulerJob`, `AnnouncementExpiryJob`, SignalR, FCM |
| **Surveys** | `SurveyTemplates`, `SurveyDistributions`, `SurveyResponses` | HR, Employee | `SurveyDistributionActivatorJob`, `SurveyReminderJob`, `SurveyExpiryJob` |
| **Reports & Analytics** | `Reports`, `CustomReports`, `Analytics`, `Dashboard`, `SavedDashboards`, `AuditLogs` | HR, Manager, Admin | `AnalyticsSnapshotJob`, `MonthlyAnalyticsRollupJob`, `ScheduledReportExecutionJob` |
| **Configuration** | `TenantConfiguration`, `CompanyPolicies`, `LetterTemplates`, `LetterRequests`, `ExcusePolicies`, `OvertimeConfiguration`, `EndOfServicePolicies`, `VacationTypes`, `LoanPolicies`, `AllowancePolicies`, `ExpensePolicies`, `RemoteWorkPolicies` | HR, SystemAdmin | `ITenantSettingsResolver`, 5-min cache |

### Module dependency map (high level)

```
             ┌──────────────────┐
             │  Authentication  │
             └──────────────────┘
                      │
       ┌──────────────┴──────────────┐
       ▼                             ▼
┌────────────┐              ┌──────────────┐
│ Organization│◄────────────│   Roles/RBAC  │
└────────────┘              └──────────────┘
       │
       ▼
┌────────────┐   OfferAccepted   ┌────────────┐   OnboardingComplete    ┌────────────┐
│ Recruitment├──────────────────►│ Onboarding ├────────────────────────►│  Employee  │
└────────────┘                   └────────────┘                         └─────┬──────┘
                                                                              │
                         ┌────────────────────────────┬───────────────────────┤
                         ▼                            ▼                       ▼
                ┌──────────────┐             ┌─────────────────┐      ┌───────────────┐
                │ Time & Atten │             │    Leave etc    │      │  Performance  │
                │   + Shifts   │             │   + Approvals   │      │  + Training   │
                └──────┬───────┘             └────────┬────────┘      └───────────────┘
                       │                              │
                       └──────────┐      ┌────────────┘
                                  ▼      ▼
                             ┌────────────────┐
                             │    PAYROLL     │────── Loans / Advances / Expense reimb / EOS
                             │   (locked)     │                │
                             └────────────────┘                ▼
                                     │             ┌─────────────────────┐
                                     ▼             │  Offboarding chain  │
                              Payslips /           │ Resignation→Term→   │
                              Bank file            │ Clearance→EOS→      │
                                                   │ FinalSettle→Deactiv │
                                                   └─────────────────────┘
```

---

## 3. Roles and Actors

All policies evaluated via **permission claims** (70+ resources × 26 actions = 223+ policies) plus a **branch-scope filter** (`UserBranchScope`) applied at the query layer. `SystemAdmin` bypasses branch scope.

### 3.1 System Admin (`SystemAdmin`)
- **Responsibility**: Tenant configuration, user/role management, payroll admin-unlock, lifecycle automation toggles, master data.
- **Modules**: All, including `PayrollSettings`, `TenantConfiguration`, `Roles/Permissions`, `Seed`, `LifecycleAutomation`, `WorkflowsController` validation-rules and role-assignment-stats endpoints.
- **Exclusive actions**: `POST /api/v1/payroll-periods/{id}/admin-unlock` (requires reason), edit `TenantSettings`, promote/demote users, execute `Seed` operations.
- **Branch scope**: none (sees all branches).

### 3.2 HR Manager
- **Responsibility**: Employee lifecycle (hire, onboard, contracts, promotions, transfers, offboard), payroll processing (except admin-unlock), leave & excuse policy, workflow configuration, notifications, policies and documents.
- **Modules**: Employees, Contracts, Onboarding, Offboarding/Clearance, Vacation/Excuse types & policies, `PayrollPeriods` (process / recalculate / approve / mark-paid), Recruitment, Performance, Training, Disciplinary, Announcements, CompanyPolicies.
- **Notable approvals**: HR receives **FailedRouting** fallbacks, pending-acknowledgment tracking, lifecycle-automation audit.

### 3.3 Payroll / Finance Admin
- In practice, a variant of HR Manager with payroll-only responsibilities (process, recalculate, approve, mark-paid) and loan/advance/expense approvals.
- `SalaryStructures`, `EmployeeSalaries`, `SalaryAdjustments`, `EndOfService`, `LoanApplications`, `SalaryAdvances`, `ExpenseClaims`.

### 3.4 Branch Manager
- **Responsibility**: Operational oversight of a single branch (or branches where `UserBranchScope` assigns them).
- Approver type in workflows (`BranchManager` → resolved via `Branch.ManagerEmployeeId`).
- Can trigger `BranchSettingsOverride` changes, configure geofence, override shifts at branch level.

### 3.5 Department Head / Manager
- **Responsibility**: Team supervision; approves leave/excuse/remote-work/correction/expense/training requests for team.
- Approver type: `Manager`, `DirectManager`, `DepartmentHead` (resolved via `Employee.ManagerId` or `Department.ManagerEmployeeId`).
- Manager dashboard surfaces pending approvals + team attendance.

### 3.6 Employee
- **Responsibility**: Self-service — submit leave, excuse, remote-work, correction, shift-swap, comp-off, expense claim, loan application, salary advance, allowance request, letter request, acknowledge policies and announcements, fill timesheets, update profile.
- Cannot see anyone else's data (query filter restricts to own `EmployeeId`).

### 3.7 Approver / Delegate (cross-cutting)
- Any user with a pending `WorkflowStepExecution.AssignedToUserId` becomes an approver for that step.
- `ApprovalDelegation` lets an approver forward work to a delegate for a date range (bounded by `MaxWorkflowDelegationDepth`, default 2).

### 3.8 IT / Admin / Finance (clearance personas)
- Not formal system roles but reflected in the **8 hardcoded default clearance items** (IT: return laptop & revoke access, Finance: settle advances & return card, Admin: return access card & parking, HR: exit interview & final settlement).
- In practice, they are `Employee` users with the relevant permissions.

### 3.9 System user (`IsSystemUser = true`)
- Two seeded accounts (`systemadmin@system.local`, `tecaxleadmin@system.local`).
- `ISystemUserResolver` guarantees a non-zero user id for `WorkflowSystemActionAudit` rows (timeouts, escalations, fallback routing).

### 3.10 Role → module matrix (summary)

| Role | Org | Att | Leave | Payroll | Recr | Onb | Perf | Train | Offb | Reports | Settings |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Employee | View self | R/W own | Request | View own | — | Tasks | Self-review | Enroll | Resign | Own | — |
| Manager | Team | R/W team | Approve | — | Hiring mgr | Review | Review team | Approve | Approve resign | Team | — |
| HR Manager | R/W | R/W | R/W | R/W (no unlock) | R/W | R/W | R/W | R/W | R/W | R/W | R/W |
| Payroll Admin | R | R | R | R/W | — | — | — | — | R | R/W | — |
| System Admin | R/W | R/W | R/W | R/W + unlock | R/W | R/W | R/W | R/W | R/W | R/W | R/W |

---

## 4. End-to-End Business Flows

This section walks through every material flow. For each: purpose, trigger, preconditions, steps, user & system actions, approval chain, notifications, status transitions, exceptions, outcome, entities, code pointers.

### 4.1 Authentication & login

**Purpose**: Authenticate a user, issue JWT + refresh token, enforce policy (lockout, 2FA, must-change-password).

**Trigger**: `POST /api/v1/auth/login` with `{ email, password, deviceInfo?, rememberMe? }` (admin portal, self-service, mobile).

**Preconditions**: User row exists, `IsActive=true`, no active lockout.

**Flow**:
1. Email normalized to lowercase; `User` fetched with `Roles`, `Permissions`, `UserBranchScope`.
2. Lockout check against `LockoutEndUtc` + `LoginLockoutPolicyJson` (tenant-configurable progressive lockout).
3. PBKDF2-SHA256 (10,000 iterations) password verification.
4. On failure: increment `FailedLoginAttempts`, set `LastFailedLoginAtUtc`, optionally apply lockout.
5. On success: reset counters, optionally prompt 2FA (TOTP) if enabled, check `MustChangePassword`.
6. `JwtTokenGenerator` issues access token with claims: `sub`, `email`, `roles`, `permissions`, `branch_scope`, `preferred_language`. Refresh token set as HTTP-only cookie.
7. Login event + session row recorded.

**Status transitions**: `User.IsActive`, `LockoutEndUtc`, `LastLoginAtUtc`, `FailedLoginAttempts`.

**Exceptions / edge cases**: generic "Invalid credentials" to prevent enumeration; disabled account message; 2FA required; force password change.

**Outcome**: `{ accessToken, refreshToken, expiresAt, mustChangePassword, user }`.

**Entities**: `Users`, `UserRole`, `RolePermission`, `UserBranchScope`, `Sessions`, `TenantSettings.LoginLockoutPolicyJson`.

**Weak points**:
- Refresh is cookie-based but mobile stores tokens in `FlutterSecureStorage` and uses the Authorization header — mixed patterns.
- No device-binding or anomalous-login detection.
- Password policy (`PasswordMinLength`) is configurable; password history is tracked, but rotation not enforced by a job.

### 4.2 Branch-scoped query filter

**Purpose**: Prevent leakage of other branches' data to branch-scoped users.

**Flow**: When a user has `UserBranchScope` rows, every list/get handler filters by `Employee.BranchId IN (scope)` (except SystemAdmin). `ICurrentUser.BranchIds` is injected into handlers via `BaseHandler`.

**Weak point**: The filter is re-implemented in many handlers; not enforced by EF global filter. Easy to forget in a new controller.

### 4.3 Employee hiring (via recruitment) and lifecycle

**Purpose**: Move a candidate into an active employee record with contract + salary + onboarding + user account.

**Flow**:
1. **JobRequisition** (`Draft → PendingApproval → Approved → Open → Filled/Rejected`). `REQ-YYYY-NNNN` auto-numbering. Budgeted salary range, `NumberOfPositions`, target hire date.
2. **JobPosting** (from Open requisition; `Draft → Published → Closed`). `IsInternal` exposes an internal posting feed via `/internal`.
3. **Candidate** created from application form or HR entry. `ResumeUrl` stored but not parsed.
4. **JobApplication** (`New → ScreeningReview → InterviewScheduled → Interviewing → OfferPending → OfferExtended → OfferAccepted/Declined → Hired/Rejected/Withdrawn`). `Advance(status)`, `Reject(reason, reasonAr)`, `Withdraw`.
5. **InterviewSchedule** per application: type (Phone/Technical/Behavioral/Panel/Final), result (Pending/Passed/Failed/Rescheduled), duration, location, meeting link. One-to-one `InterviewFeedback` (unstructured notes).
6. **OfferLetter** (`Draft → PendingApproval → Approved → Sent → Accepted/Declined`). On `Submit`, creates a `WorkflowInstance` for approval chain.
7. **Offer accepted (the hiring transaction)** — database transaction wraps:
   - Create `Employee` (`IsActive=false, IsPreHire=true` if `CreateEmployeeInactiveAtOfferAcceptance=true`, else `IsActive=true`).
   - Create `EmployeeContract` with `ProbationEndDate = StartDate + DefaultProbationDays` (TenantSettings, default 90).
   - Create `EmployeeSalary` from `SalaryStructure` (branch or org default).
   - Link `Candidate.ConvertedToEmployeeId`.
   - Increment `JobRequisition.FilledPositions`; mark `Filled` if complete.
   - Publish `OfferAcceptedEvent`.
8. **Onboarding auto-creation** (handler subscribes to `OfferAcceptedEvent`):
   - Resolve template: `OfferLetter.OnboardingTemplateId` → `Department.DefaultOnboardingTemplateId` → `Branch.DefaultOnboardingTemplateId` → `TenantSettings.DefaultOnboardingTemplateId` → any template with `IsDefault=true`.
   - Create `OnboardingProcess` + one `OnboardingTask` per `OnboardingTemplateTask` (with `DueDate = StartDate + DueDaysAfterJoining`).
   - Log `LifecycleAutomationAudit`.
9. **Onboarding execution**:
   - Employee and assignees work through tasks (`Pending → Completed | Skipped`).
   - Documents collected via `OnboardingDocument` (`Pending → Submitted → Verified/Rejected`).
   - `Complete` endpoint gated by `OnboardingCompletionRequiresAllRequiredTasks` (default true) and `OnboardingCompletionRequiresAllRequiredDocuments` (default false).
10. **Onboarding completed**:
    - `OnboardingProcess.ActualCompletionDate` set.
    - `Employee.OnboardingCompletedAt` set (milestone).
    - If `AutoActivateEmployeeOnOnboardingComplete=true`: `IsPreHire=false, IsActive=true`.

**Notifications**: Not explicit in code — relies on the notification service being called elsewhere. `OnboardingTaskOverdueJob` nudges overdue tasks.

**Weak points**: Silent failures in the handler chain (captured in `LifecycleAutomationAudit` but not surfaced); no task interdependencies; no e-signature; no template inheritance.

### 4.4 Time & attendance daily cycle

**Purpose**: Capture presence, compute working hours / overtime / late / early / absence per day.

**Sources of punches**:
- Biometric/RFID device posts to `POST /api/v1/attendance/transactions` (server-side).
- Mobile `POST /api/v1/mobile/attendance/transaction` with GPS + NFC (see §4.5).
- Manual HR entry (marks `IsManual=true`, requires `EnteredByUserId`).

**Flow**:
1. **Punch creates `AttendanceTransaction`** (CheckIn/CheckOut/BreakStart/BreakEnd/ManualAdjustment/AutoCheckOut). Stores `TransactionTimeUtc`, `TransactionTimeLocal`, `AttendanceDate`, `IsManual`, device/location metadata.
2. **`DailyAttendanceGenerationJob`** runs daily (Coravel) — for each active employee without an `AttendanceRecord` for the date:
   - Resolve effective `ShiftAssignment` (priority: Employee > Department > Branch; highest `Priority` wins ties; `EffectiveFromDate`/`EffectiveToDate` filter).
   - Call `IAttendanceCalculationService.CalculateAttendanceAsync(employeeId, date, transactions, shiftAssignment)`.
   - Persist `AttendanceRecord` with `Status`, `WorkingHours`, `BreakHours`, `OvertimeHours`, `LateMinutes`, `EarlyLeaveMinutes`, `ScheduledStartTime`/`EndTime`, etc.
3. **Status determination** (excerpt): Present, Absent, Late, EarlyLeave, Holiday, OnLeave, Excused, OnDuty, Remote, Incomplete, Overtime, Weekend, Pending.
4. **Late/early minutes** only computed for non-holiday, non-excused, non-leave statuses. Partial excuses (`EmployeeExcuse` approved for portion of day) deduct from late/early minutes.
5. **Overtime** via `IOvertimePayCalculator` + `OvertimeConfiguration` (day-type buckets, grace period, rounding, min threshold). Writes `PreShiftOvertime`, `PostShiftOvertime`, `OvertimeRate`, `OvertimeDayType`, `OvertimeCalculationNotes` to record.

**Recalculation**: `RecalculateAttendanceAsync` preserves overrides/approvals/finalization flags and historical `ShiftAssignmentId`.

**Past-dates mapping**: `Pending` status for past dates is surfaced as `Absent` in responses (business rule: missing clock-in = absent).

**Exceptions**:
- No transactions → `Absent` on a working day.
- On approved leave → `OnLeave` (no penalty).
- Holiday → `Holiday` (no penalty).

**Weak points** (ranked):
1. **Timezone**: `TransactionTimeLocal = transactionTime; // TODO convert to branch TZ` — not implemented. Affects overnight shifts and multi-TZ branches.
2. **Race condition**: `DailyAttendanceGenerationJob` does not lock records; concurrent manual edit can lose updates (no `ConcurrencyToken`).
3. **Cascading recalcs not debounced**: each punch triggers a recalculation.
4. **No retroactive recalculation when holidays created**: records for the new holiday date keep old status.
5. **No duplicate punch dedup window** (e.g., two scans within 10 seconds).
6. **`AttendanceCorrectionMaxRetroactiveDays` defined but not enforced in handler/validator** — employees can submit corrections arbitrarily far in the past.
7. **Partial implementations**: `TransactionTimeLocal` not strictly tied to branch TZ.

### 4.5 Mobile GPS + NFC dual-verification attendance

**Purpose**: Prevent attendance fraud (buddy-punch, location spoofing) by requiring both GPS geofence and NFC tag match.

**Flow**:
1. Mobile posts `{ employeeId, branchId, transactionType, lat, lon, nfcTagUid, nfcPayload?, deviceId, deviceModel?, platform, appVersion? }`.
2. **GPS check**: Haversine distance from `Branch.Latitude/Longitude` must be ≤ `Branch.GeofenceRadiusMeters`. Fail → `GpsOutsideGeofence`.
3. **NFC check**: Tag UID must match an active `NfcTag` row for the branch. If `NfcEncryption.RequirePayload=true`, HMAC-SHA256 signature validated on `tagId|branchId|tagUid|timestamp`. Failures produce specific reasons: `NfcTagNotRegistered`, `NfcTagMismatch`, `NfcTagInactive`, `NfcPayloadInvalid`, `NfcPayloadTampering`, `BranchNotConfigured`, `GpsUnavailable`.
4. **Failure path**: `AttendanceVerificationLog` created with `Status=Failed` and reason; no transaction created.
5. **Success path**: Log created with `Status=Success`; `AttendanceTransaction` created; attendance recalculation triggered for the day.

**Configuration**: `appsettings.json → NfcEncryption.{SecretKey, RequirePayload}`; `Branch.GeofenceRadiusMeters`.

**Weak points**: no per-tag expiry / tag rotation, no NFC key versioning (rotating the secret invalidates all existing payloads), no offline queueing (failed network = failed punch), error messages in mobile UI are generic.

### 4.6 Shift assignment + shift swap + comp-off

- **Assignment**: `ShiftAssignment` records with type (Employee/Department/Branch), effective date range, priority, status (`Active/Pending/Inactive`). Resolution per §4.4.
- **Shift swap** (`ShiftSwapRequests`): `Requested → PartnerPending → PartnerApproved → Approved → Completed | Rejected | Cancelled`. On approval, two temporary per-date `ShiftAssignment` rows are created for each employee. Risk: **no conflict detection** with existing leave/swap approvals; no circular-swap prevention.
- **Compensatory off** (`CompensatoryOffs`): convert accumulated OT hours into paid time off. Balance = OT accumulated − used − expired. `CompensatoryOffExpiryJob` marks unused comp-offs as Expired. Weak point: the "approved then unused" balance expiry policy and windows are not fully driven by `TenantSettings`.
- **On-call** (`OnCallSchedules`): thin — schedule rows exist, but integration with attendance status `OnDuty` and compensation (on-call premium) is unclear.

### 4.7 Overtime policy

`OvertimeConfiguration` entity:
- Rates: `NormalDayRate` (1.5), `PublicHolidayRate` (2.0), `OffDayRate` (2.5).
- Gates: `EnablePreShiftOvertime` (false), `EnablePostShiftOvertime` (true), `MinimumOvertimeMinutes` (15), `MaxPreShiftOvertimeHours` (2), `MaxPostShiftOvertimeHours` (4), `OvertimeGracePeriodMinutes` (5), `RoundingIntervalMinutes` (15).
- Flags: `WeekendAsOffDay` (true), `ConsiderFlexibleTime` (true), `RequireApproval` (**unused** — no enforcer in code).

**Weak points**: no weekly/monthly caps; `RequireApproval=true` is a dead flag; no per-shift override; rounding can inflate/deflate vs manual check.

### 4.8 Leave / vacation request

**Flow**:
1. Employee submits `CreateEmployeeVacationCommand` with `StartDate`, `EndDate`, `VacationTypeId`, `IsHalfDay?`, attachment.
2. Validator enforces `MaxVacationDaysPerRequest`, `MaxVacationFuturePlanningYears`, half-day rules.
3. `LeaveBalance.ReserveBalance(days)` moves days from `CurrentBalance` to `PendingDays`.
4. `IWorkflowEngine.StartWorkflowAsync()` creates a `WorkflowInstance` with definition snapshot. Approver types: DirectManager / Role / DepartmentHead / BranchManager / SpecificUser.
5. **On approval**: `LeaveBalance.ConfirmUsage(days)` moves pending → used. **Claimed**: attendance marked `OnLeave`. **Actual**: no handler observed — gap.
6. **On rejection**: no automatic `ReleaseReservedBalance()` call in handler — caller responsibility → inconsistency risk.
7. Accrual: `MonthlyLeaveAccrualJob` on the 1st of each month processes prior month via `ILeaveAccrualService`. Policy: `IsMonthlyAccrual`, `ProrateMidYearHires`, `MinimumServiceMonths`, `MaxAccrualCap`, `AllowsCarryOver`, `MaxCarryOverDays`, `CarryOverExpiryMonths`. **No carryover-expiry job** was found → expired balance can persist.
8. **Encashment**: `EmployeeLeaveEncashment` → `Pending → Approved → linked PayrollRecord`.

**Weak points**: no overlap-check call (`EmployeeVacation.OverlapsWith()` exists but not invoked); balance can drift if rejection doesn't release; claimed attendance sync not implemented.

### 4.9 Excuse request

- Backward window `ExcuseBackwardWindowDays` (default 365), forward window `ExcuseForwardWindowDays` (default 30).
- Policy-driven limits: `MaxPersonalExcusesPerMonth`, `MaxPersonalExcuseHoursPerMonth`, `MaxPersonalExcuseHoursPerDay`, `MaxHoursPerExcuse`, `AllowPartialHourExcuses`, `MinimumExcuseDuration`.
- `ExcuseType.OfficialDuty` sets `AffectsSalary=false` on approval, bypassing per-type limits.
- Workflow is optional — **no enforcement that `WorkflowInstanceId` is present before approve**.

**Weak points**: attachment validation missing; overlap check missing; salary impact integration with payroll unclear.

### 4.10 Remote work request

- Branch-scoped `RemoteWorkPolicy` with quotas (per-week / per-month / per-year, at least one must be set), blackout JSON, eligibility fields, `MaxConsecutiveDays`, `MinAdvanceNoticeDays`.
- `WorkingDaysCount` computed at request creation (excludes weekends/holidays).
- **Weakness**: quota enforcement not visible in handler → requests can be approved beyond policy; blackout JSON parse failure falls open (returns true) — risky default.
- **No department-level eligibility** — only branch.

### 4.11 Approval workflow engine (v13.6 — the heart)

**Entities**: `WorkflowDefinition` (versioned) → `WorkflowStep` (ordered) → `WorkflowInstance` (snapshot + state) → `WorkflowStepExecution` (assignment + action).

**State machine**:
```
Pending → InProgress → Approved | Rejected | Cancelled | Expired
                     ↘ ReturnedForCorrection → InProgress (via Resubmit) → …
                     ↘ Frozen (manual)
                     ↘ FailedRouting (terminal, when no approver resolvable)
```

**Approver resolution** (`ApproverResolver`): SpecificUser → DirectManager → DepartmentHead (via `Department.ManagerEmployeeId`) → BranchManager (via `Branch.ManagerEmployeeId`) → Role pool (+ strategy) → System.

**Role assignment strategies** (per-step):
- **FirstMatch**: legacy, first active user by id — not fair.
- **RoundRobin**: uses `WorkflowRoleAssignmentCursor` per role.
- **LeastPendingApprovals** (default, UX-optimal): pick user with fewest open approvals, ties by lowest UserId.
- **FixedPriority**: highest `UserRole.Priority`.

**Fallback chain** (v13.6): `TenantSettings.WorkflowFallbackApproverUserId` > `WorkflowFallbackApproverRole` (default "HRManager"). If both fail → `FailedRouting` terminal status + `WorkflowSystemActionAudit` row.

**Delegation**: `ApprovalDelegation` (delegator → delegate, date range, entity filter). `MaxWorkflowDelegationDepth` (default 2). No explicit cycle detection beyond depth limit.

**Return-for-correction & resubmit**: non-terminal statuses, capped by `MaxWorkflowResubmissions` (default 3).

**Timeouts & system actions**: `WorkflowTimeoutProcessingJob` (hourly). Per-step `TimeoutHours` + `TimeoutAction` (Expire/Escalate/AutoApprove/AutoReject). Every system action writes `WorkflowSystemActionAudit` with the resolved system user id (never 0).

**Validation rules** (v13.6): `IWorkflowValidationRule` for `StepType=Validation`. Unregistered `ValidationRuleCode` → fail-closed (auto-reject).

**Definition versioning**: at instance creation, definition + steps are snapshotted into `DefinitionSnapshotJson`; HR can edit live definition without disrupting running instances.

**Weak points**:
- FailedRouting is audit-only — **no push notification to HR** by default.
- Fallback-role misconfiguration can break all routing silently.
- Cycle detection relies on depth cap, not an explicit visited-set.
- Unregistered validation rule codes cause silent auto-rejections.
- Return-for-correction has a global resubmit cap but no per-employee or per-step SLA.

### 4.12 Lifecycle automation (v13.5 — 7 flows)

**Master switch**: `TenantSettings.LifecycleAutomationEnabled` (default true).

| # | Trigger event | Setting (default) | Effect |
|---|---|---|---|
| 1 | `OfferAcceptedEvent` | `AutoCreateOnboardingOnOfferAcceptance=true` | Create `OnboardingProcess` + tasks via template fallback chain |
| 2 | `OnboardingCompletedEvent` | `AutoActivateEmployeeOnOnboardingComplete=false` | (if on) `IsPreHire=false, IsActive=true` |
| 3 | `ResignationApprovedEvent` | `AutoCreateTerminationOnResignationApproved=false` | (if on) create `TerminationRecord` |
| 4 | `TerminationCreatedEvent` | `AutoCreateClearanceOnTermination=true` + `AutoSuspendEmployeeOnTerminationCreated=true` | Create `ClearanceChecklist` (8 hardcoded defaults if no template) + `IsSuspended=true` + `User.IsActive=false` |
| 5 | `ClearanceCompletedEvent` | `AutoEnableFinalSettlementCalcOnClearanceComplete=false` | (if on) enable final settlement; optional gate `RequireClearanceCompleteBeforeFinalSettlement` |
| 6 | `FinalSettlementPaidEvent` | `AutoDeactivateEmployeeOnFinalSettlementPaid=true` | `IsActive=false, IsSuspended=false` |
| 7 | `ContractExpiredEvent` (via `ContractExpiryAlertJob`) | `ContractExpiredAction` ∈ NotifyOnly / AutoMarkExpired / Suspend / Deactivate | Per config; fixes pre-v13.5 "Active past end date" bug |

**Publisher semantics**: `ILifecycleEventPublisher` wraps MediatR `IPublisher` in try/catch — handler failures are caught and recorded in `LifecycleAutomationAudit` but never propagate to the triggering command (so `ApproveResignation` always returns success even if `TerminationRecord` creation failed).

**Audit row**: `LifecycleAutomationAudit { SourceEntityType/Id, TargetEntityType/Id, Status (Success/Skipped/Failed/Duplicate/Disabled/MissingPrerequisite), Reason, ErrorMessage, TriggeredAtUtc, CompletedAtUtc, ContextJson }`.

**Weak point**: the silent-failure contract is intentional, but **no alert** surfaces failed/missing-prerequisite rows to HR — the audit table must be actively watched.

### 4.13 Payroll processing pipeline (the crown jewel)

**Period lifecycle**: `Draft → Processing → Processed → Approved → Paid (🔒) | Cancelled`.

**Endpoints** (`/api/v1/payroll-periods/{id}/...`):
- `process` → Draft-only; runs calculation across all active employees in branch.
- `recalculate` → Processed/Draft; soft-deletes non-locked records, re-runs.
- `approve` → Processed → Approved (no recalc).
- `mark-paid` → Approved → Paid, sets `LockedAtUtc` on period and each record.
- `cancel` → terminal cancellation.
- `admin-unlock` → SystemAdmin only, requires reason, Paid → Processed + unlock records (manual re-approval needed).

**Per-employee calculation** (`IPayrollCalculationService`):
1. Resolve **base salary** for period (with proration across overlapping `EmployeeSalary` segments) via `IPayrollInputResolver`.
2. Apply salary-structure components (from latest effective `EmployeeSalary`).
3. **Pass 1 allowances** (Fixed + PercentageOfBasic) — stackable, prorated by overlap.
4. **Manual adjustments** (`PayrollAdjustment`) — Bonus, Penalty, LoanInstallment, etc.
5. Count attendance-derived `AbsentDays`, `WorkingDays`, `PaidDays`.
6. **Overtime pay** — per-date `OvertimeConfiguration` resolved; day-type classified (Normal / PublicHoliday / OffDay); rounding + minimum threshold applied; hourly basis = `BaseSalary / DailyRateBasis / StandardHoursPerDay`; `IPayrollCalendarResolver` resolves `DailyRateBasis` per `PayrollCalendarPolicy.BasisType` (CalendarDays / WorkingDays / FixedBasis).
7. **Pass 2 allowances** (PercentageOfGross) against provisional gross = base + pass-1 allowances + OT. No self-stacking among percentage-of-gross.
8. **Absence deduction** = `AbsentDays × (BaseSalary / DailyRateBasis)`.
9. **Tax** (`ITaxCalculator`) — progressive brackets, `IsTaxable` filter on allowances.
10. **Social insurance** (`ISocialInsuranceCalculator`) — `IsSocialInsurable` filter, `MaxInsurableSalary` cap, nationality-filtered config, Employee + Employer contributions (employer line is informational, not deducted).
11. **Final totals** — GrossEarnings, TotalDeductions, NetSalary. Every contribution is line-itemized in `PayrollRecordDetail` with `Notes`.
12. `CalculationBreakdownJson` snapshot on `PayrollRecord` — forensic audit (resolved config IDs, salary segments, allowances applied, daily/hourly bases, holidays).
13. `PayrollRunAudit` + `PayrollRunAuditItem` per run and per employee (warnings/errors/skipped).

**External integrations** (after per-employee calc):
- **Loan repayments**: query `LoanRepayment` with `Status=Scheduled`, matching month, null `PayrollRecordId`. Add negative detail line. On persist, set `Status=Paid`, update `LoanApplication.OutstandingBalance`, possibly flip to `FullyPaid`.
- **Salary advances**: query `SalaryAdvance` with `Status=Approved`, `DeductionMonth=YYYYMM`, null `PayrollRecordId`. Add negative detail line. Set `Status=Deducted`.
- **Expense reimbursements**: query `ExpenseReimbursement` with `Method=Payroll`, `ExpenseClaimStatus=Approved`, null `PayrollRecordId`. Add positive detail line. Set `ExpenseClaim.Status=Reimbursed`.

**Lock enforcement**: `LockedAtUtc.HasValue` is checked in every controller mutation path — but it's controller-level, not a domain invariant on the entity.

**Weak points** (financial):
1. **Loan repayment schedules not auto-generated** — if HR never creates `LoanRepayment` rows, deductions silently skip. Balance drifts.
2. **`SalaryAdvance.DeductionMonth=YYYYMM`** is brittle — a period spanning month-end misses matches.
3. **Expense reimbursement has no date-range validation** — any approved claim (even from months ago) gets reimbursed.
4. **Benefits not integrated** — `BenefitPlan.EmployeePremiumAmount` is never deducted.
5. **No transactional boundary around side integrations** — partial failure leaves loans `Paid` but no `PayrollRecord`.
6. **Tax/SI configs not cached within run** — config change mid-run yields inconsistent rates across employees.
7. **On-leave / remote / excused attendance status handling in payroll is implicit** — WorkingDays = Present + Late; OnLeave / Excused / Remote treatment needs verification.
8. **Soft-deleted PayrollRecords leave orphaned `PayrollRecordDetail`** rows.
9. **Tax = 0 on missing config** — quietly under-deducts.
10. **Lock enforcement is controller-guarded**, not domain-invariant — new endpoints could bypass.

### 4.14 End-of-Service benefit

**Flow** (on termination + clearance-complete if gated):
1. `IEndOfServiceCalculator.CalculateAsync(hireDate, terminationDate, terminationType, baseSalary, totalAllowances, countryCode)`.
2. Resolve effective `EndOfServicePolicy` by date + country (Saudi default seeded).
3. Determine service years/months/days.
4. Walk tiers (`EndOfServicePolicyTier.ServiceYearsFrom/To`, `BenefitPercentageOfSalary` or fixed amount, `AppliesAfterTerminationType`).
5. Apply resignation deductions (`EndOfServiceResignationDeductionTier`) if resignation.
6. Return `EndOfServiceComputation { TotalAmount, DeductionAmount, NetAmount, AppliedPolicySnapshotJson }`.
7. Persist `EndOfServiceBenefit` linked to `TerminationRecord` with immutable snapshot.

**Weak point**: calculator fallback when no policy is found needs verification; snapshot JSON is not queryable for forensic diffs.

### 4.15 Loans / advances / expenses / benefits / letters (CRUD-only gaps)

These modules have full data models and list/read endpoints but **no application handler applies the approved outcome**:

| Module | Has `Approved` status? | Handler that enacts it? | Payroll integration? |
|---|---|---|---|
| `AllowanceRequest` | ✅ | ❌ (no auto-creation of `AllowanceAssignment`) | Indirect via assignment |
| `LoanApplication` | ✅ | ❌ (no auto-generation of `LoanRepayment` schedule) | ✅ but schedule must exist |
| `SalaryAdvance` | ✅ | ❌ (no visible approve command) | ✅ if `DeductionMonth` matches |
| `ExpenseClaim` | ✅ | ❌ (no reimbursement routing) | ✅ if `Method=Payroll` |
| `BenefitEnrollment` | ✅ | ❌ (no premium deduction wiring) | ❌ |
| `LetterRequest` | ✅ | ❌ (no document generation / template rendering) | n/a |

**Business impact**: HR can mark things Approved in the UI but nothing downstream happens.

### 4.16 Offboarding end-to-end

```
ResignationRequest (Draft→Pending→Approved/Rejected/Withdrawn)
      │ (if AutoCreateTerminationOnResignationApproved)
      ▼
TerminationRecord (Draft/Approved/Processed/Completed)
      │ (AutoCreateClearanceOnTermination=true)
      ▼
ClearanceChecklist (Pending→InProgress→Completed) + 8 hardcoded items OR DefaultClearanceTemplateId
  + Employee.IsSuspended=true, User.IsActive=false
      │ (on all items complete)
      ▼ ClearanceCompletedEvent
(optionally) enable final settlement
      │
      ▼
FinalSettlement (paid) — includes EOS, leave encashment, final salary
      │ FinalSettlementPaidEvent
      ▼
Employee.IsActive=false (fully deactivated)
```

**ExitInterview** is a separate path (one of the default 8 clearance items).

**Weak points**: manual resignation→termination creation by default (opt-in automation); hardcoded default 8 items; no escalation for overdue clearance items; no rehire-eligibility flag; no data-retention policy; no structured exit interview.

### 4.17 Performance management, training, talent

- **Performance**: multi-state `PerformanceReview` (SelfAssessmentPending → ManagerReviewPending → PendingApproval → Approved → Acknowledged / Disputed). Can "recommend promotion" / "recommend salary increase" / "create PIP" — but these create `Pending` records, **no auto-execution**.
- **Training**: full entity graph but **no prerequisites enforcement, no attendance marking endpoint in controllers, no auto-certification on completion, no renewal automation**, and no enrollment gating by budget.
- **Talent/succession**: profile + nine-box grid + succession candidates — but **data only**, no workflow or auto-promotion path.

### 4.18 Notifications, assets, documents, surveys, announcements

All functional but each has its own weak spots documented in §5.

### 4.19 Reports & analytics

Dashboard + analytics endpoints exist (headcount, engagement, leave, overtime, payroll). `AnalyticsSnapshotJob` + `MonthlyAnalyticsRollupJob` create trend data. `ScheduledReportExecutionJob` exists but frontend wiring for scheduling/emailing the report is not visible. No custom report builder.

---

## 5. Module-by-Module Detailed Analysis

Abbreviated table — one row per module with supposed-vs-actual, rules, weak points.

| Module | Should do | Actual implementation | Main business rules | Missing | UX concerns | Risk |
|---|---|---|---|---|---|---|
| **Auth & RBAC** | Secure single-step login, 2FA, lockout | Implemented; JWT+refresh; PBKDF2 | `LoginLockoutPolicyJson`, `PasswordMinLength` | Anomaly detection, device binding | No "Forgot password" clarity | Credential stuffing if lockout tuning weak |
| **Org structure** | Branches/depts/grades | Implemented, geofence + manager FKs | Branch geofence, dept hierarchy | Branch closure state machine | Map picker only on create | Geofence radius=0 not validated |
| **Time & attendance** | Auto-calc daily records | Implemented | Shift priority, grace, holiday impact | Timezone per branch, retro recalc on holiday add, dedup window | Pending→Absent silent flip | Incorrect pay if TZ wrong |
| **Shifts / swaps** | Assign, swap, comp-off | Implemented | Priority 0–100, effective date | Circular swap prevent, conflict check with leave | Separate request entities | Double-booked shifts |
| **Overtime** | Multi-rate day-type | Implemented | Normal/Holiday/OffDay rates | Weekly/monthly caps, `RequireApproval` flag, per-shift override | — | Unapproved OT paid |
| **Leave** | Request/balance/accrual | Implemented | Accrual policy, carryover, blackout | Attendance sync, carryover-expiry job, release-on-reject | No unified requests | Balance drift |
| **Excuse** | Windowed hour excuses | Implemented | Per-type limits | Attachment validation, overlap | — | Over-limit approvals |
| **Remote work** | Policy + request | Implemented | Quotas, blackout JSON | Quota enforcement in handler, dept eligibility, fail-closed blackout | — | Over-quota approvals |
| **Workflow engine** | Generic approval | Implemented (v13.6 hardened) | Delegation depth, fallback chain, snapshots | Real-time FailedRouting alert, cycle detection explicit, validation registry startup check | No approver SLA visibility | Silent stalls |
| **Lifecycle automation** | 7 domain transitions | Implemented (v13.5) | 16 TenantSettings flags | Alert on Failed/MissingPrerequisite, UI dashboard | Audit-only | Missed transitions silent |
| **Payroll** | Compute + lock | Implemented (v13.0/v13.1) | Effective dating, tier tax/SI, two-pass allowances | Date-ranged loan/advance matching, benefit deduction, tx boundary | No payslip preview | Financial miscalc |
| **EOS** | Snapshot benefit | Implemented | Policy tiers, resignation deductions | Forensic snapshot diff | — | Wrong tier if policy missing |
| **Allowances** | Policy + assignment + request | Partially implemented | `IsTaxable`, `IsSocialInsurable`, proration | **Request→assignment auto-apply**, expiry job partial | — | Approved requests stall |
| **Loans** | Policy, apply, repay | CRUD + payroll side only | Interest rate, installments | **Approval handler, auto-schedule generation** | — | Unpaid loans |
| **Advances** | Request, deduct | CRUD + payroll side only | `DeductionMonth=YYYYMM` | **Approval handler**; date range instead of YYYYMM | — | Missed deduction |
| **Expenses** | Claim, reimburse | CRUD + payroll side only | Method Payroll/BankTransfer | **Approval handler**; claim-date validation | — | Duplicate reimbursement |
| **Benefits** | Plan, enroll, deduct | Data model only | Plan year, premiums | **Payroll premium deduction**; eligibility evaluation | — | Employer absorbs cost |
| **Letters** | Template + request | CRUD only | — | **Document generation / template rendering** | — | Stuck Approved status |
| **Recruitment** | Requisition→Offer→Hire | Implemented | Workflow, auto-numbering | External candidate portal, structured interview scoring, background check | Pipeline no time-to-hire | Manual steps cause drops |
| **Onboarding** | Auto from offer | Implemented | Template fallback, gates | Task interdependencies, e-sign, reminders | — | Incomplete hires go active |
| **Performance** | Cycle→Review→Action | Implemented (states) | Self/manager ratings, dispute | 360 aggregation, PIP→term escalation, competency→grade benchmark | Dispute has no resolver | Ratings not executed |
| **Training** | Enroll + evaluate | Partial | Capacity check, duplicate prevention | Prerequisites, attendance marking, cert renewal | No learning paths | Certs unused |
| **Talent/Succession** | Profiles, 9-box, succession | Data only | — | Skills taxonomy, promotion workflow, mobility portal | — | No action from data |
| **Offboarding** | Resign→Term→Clear→EOS→Deact | Implemented | Hardcoded 8 items, gates | Customizable checklist templates, escalation, rehire flag | — | Delayed clearance |
| **Disciplinary / Counseling** | Warnings, appeals, follow-ups | Implemented | Confidentiality, severity | Escalation rules, PIP link, action-plan tracking | — | Manual-only |
| **Documents / Certs / Visa / Contract / Asset / Benefits** | Expiry reminders | Implemented | Alert-days CSVs | Version control (docs), renewal automation, acknowledgment on policies | — | Expired compliance risk |
| **Announcements / Policies** | Publish + ack | Implemented | Targeting CSV, acknowledgment flag | Read receipts, recall, analytics | Targeting fragile | Policy not acknowledged |
| **Surveys** | Template + distribute | Implemented | Anonymity | Response validation, branching logic, preview, export | — | Low-quality data |
| **Reports / Analytics** | Dashboards + audit | Implemented | Snapshot job daily | Custom builder, scheduled email, CSV export | No drill-down | Operational blindness |
| **File storage** | Upload + link | Implemented | Ext/size allowlist | Virus scan, versioning, orphan cleanup, per-file ACL | — | Malware/orphan bloat |
| **Notifications** | In-app + push + realtime | Implemented | Recipient resolver | Preferences, retry, template admin | No DND | Notification fatigue |

---

## 6. Approval Workflows and Decision Logic

### Observed approval chains (inferred from `WorkflowEntityType` usage)
- **Leave / Vacation** — Employee → DirectManager → (optional HR/BranchManager).
- **Excuse** — Employee → DirectManager. (Workflow optional — can be auto-approved if not configured.)
- **Remote work** — Employee → DirectManager (if `RequiresManagerApproval=true`).
- **Attendance correction** — Employee → Manager → HR (depending on workflow definition).
- **Shift swap** — Employee A → Partner B → Manager.
- **Comp-off** — Employee → Manager.
- **Job requisition** — HR/Manager → Approvers (per workflow definition).
- **Offer letter** — HR → Approver (per workflow definition).
- **Resignation** — Employee → Manager / HR (MediatR commands; no explicit workflow instance creation).
- **Timesheet** — Employee submit → Manager approve.
- **Training enrollment** — Manager gate implied.
- **Allowance / Loan / Advance / Expense / Letter / Benefit claim** — `Approved` state exists, workflow instance linkable, but **no command handler executes the approved outcome**.

### Decision logic (strengths)
- Role assignment strategies: **FirstMatch / RoundRobin / LeastPendingApprovals / FixedPriority** — load-balancing options.
- Delegation with bounded depth + entity-type filter.
- Return-for-correction loop capped by `MaxWorkflowResubmissions`.
- Fallback approver chain (`WorkflowFallbackApproverUserId` > `WorkflowFallbackApproverRole`).
- System-action audit for every timeout/escalation/auto-approve/auto-reject.

### Weaknesses and inconsistencies
- Approval coverage is **not uniform** — some entities have real workflow creation on submit (JobRequisition, OfferLetter, vacation, excuse, remote-work), others bypass the engine entirely (resignation uses MediatR direct commands; disciplinary appeals use direct status transitions).
- **Self-approval** prevention — `TenantSettings.AllowSelfApproval=false` is documented; enforcement across all handlers needs verification.
- **Notifications on workflow transitions** — documented but dependent on caller invoking notification service; not enforced by the engine.
- **No SLA per step** — `TimeoutHours` is informational; return-for-correction adds latency without any total-time cap.
- **No approver UI for delegation** — delegation rows may be created via API, but a delegation inbox view in admin UI is missing.

---

## 7. Configuration and Policy Logic

### Company-level (`TenantSettings`) — single singleton row (schema name kept for stability)

Grouped categories (summary):
1. **General** — company name, country, currency, time zone, fiscal year start, language.
2. **Security** — `PasswordMinLength`, `LoginLockoutPolicyJson`.
3. **Attendance** — geofence default, grace period defaults.
4. **Leave** — `AllowNegativeLeaveBalance`, `RequireAttachmentForSickLeave`, `MinDaysBeforeLeaveRequest`, `AllowHalfDayLeave`, `AllowLeaveEncashment`, `LeaveYearStart`, `MaxVacationDaysPerRequest`, `MaxVacationFuturePlanningYears`.
5. **Excuse** — `ExcuseBackwardWindowDays`, `ExcuseForwardWindowDays`.
6. **Payroll** — `DefaultProbationDays`, `OvertimeConfigMaxFutureDays`.
7. **Approval** — `AutoApproveAfterTimeout`, `DefaultApprovalTimeoutHours`, `AllowSelfApproval`, `RequireApprovalComments`, `WorkflowFallbackApproverRole`, `WorkflowFallbackApproverUserId`, `MaxWorkflowDelegationDepth`, `MaxWorkflowResubmissions`.
8. **Notification** — `EnableEmailNotifications`, `EnablePushNotifications`, `EnableSmsNotifications`, `NotifyManagerOnLeaveRequest`, `NotifyEmployeeOnApproval`, `NotificationRecipientRolesCsv`.
9. **Mobile** — `MaxUploadSizeMb`, geofence radius default.
10. **Lifecycle automation (16 flags)** — `LifecycleAutomationEnabled`, `AutoCreateOnboardingOnOfferAcceptance`, `DefaultOnboardingTemplateId`, `OnboardingCompletionRequiresAllRequiredTasks/Documents`, `AutoActivateEmployeeOnOnboardingComplete`, `CreateEmployeeInactiveAtOfferAcceptance`, `AutoCreateTerminationOnResignationApproved`, `AutoCreateClearanceOnTermination`, `DefaultClearanceTemplateId`, `AutoSuspendEmployeeOnTerminationCreated`, `AutoEnableFinalSettlementCalcOnClearanceComplete`, `RequireClearanceCompleteBeforeFinalSettlement`, `AutoDeactivateEmployeeOnFinalSettlementPaid`, `ContractExpiredAction`.
11. **Alert day CSVs** — `ContractExpiryAlertDaysCsv`, `VisaExpiryAlertDaysCsv`, `DocumentExpiryAlertDaysCsv`, `AssetWarrantyExpiryAlertDaysCsv`, `AssetOverdueReturnAlertDaysCsv`, `TrainingSessionReminderDaysCsv`, `SuccessionPlanReminderDaysCsv`, `GrievanceSlaAlertDaysCsv`, `ReviewReminderDaysCsv`.

### Branch and Department overrides
- `BranchSettingsOverride` — attendance & mobile overrides.
- `DepartmentSettingsOverride` — default shift + approval-comments flag.
- Resolver chain: Company → Branch → Department (5-min memory cache; `InvalidateCache()` on update).

### Policy entities (not `TenantSettings` but policy-driven behavior)
- `LeaveAccrualPolicy`, `ExcusePolicy`, `RemoteWorkPolicy`, `LoanPolicy`, `AllowancePolicy`, `ExpensePolicy`, `OvertimeConfiguration`, `EndOfServicePolicy`, `PayrollCalendarPolicy`, `TaxConfiguration`, `SocialInsuranceConfiguration`.

### Hardcoded rules that should be configurable
| Rule | Location | Should become |
|---|---|---|
| **8 default clearance items** | Clearance handler | `DefaultClearanceTemplate` seeded, or fully rely on `DefaultClearanceTemplateId` |
| **30-day fallback month basis** | `IPayrollCalendarResolver` | Force explicit `PayrollCalendarPolicy`, no silent fallback |
| **Default probation 90 days** | `TenantSettings` (already configurable, but hardcoded in `OfferAccept` if missing) | Add validation requiring explicit value |
| **`WorkflowFallbackApproverRole=HRManager`** | Default value in seed | Seeder should validate the role exists |
| **Overtime defaults** (1.5/2.0/2.5, 15-min threshold, 15-min round) | `OvertimeConfiguration` seeded | Already policy-driven; just remove magic numbers in code comments |
| **Payroll `Tax=0` on missing config** | `ITaxCalculator` | Fail loudly or require explicit zero-tax policy |
| **Benefit premium deduction** | Not implemented at all | Add wired-in deduction step to payroll |

### Missing configurability
- Per-shift overtime multipliers.
- Weekly/monthly OT caps.
- Per-department remote-work eligibility.
- Clearance templates per termination type (Resignation vs. TerminationForCause vs. Redundancy).
- Notification templates and delivery preferences per user.
- Data retention policies (post-termination purge cadence).

---

## 8. Integrations and External Dependencies

| Integration | Purpose | Trigger | Data | Failure mode | Business risk |
|---|---|---|---|---|---|
| **PostgreSQL 15+ (Npgsql)** | Single DB `tecaxle_hrms` | All transactions | EF Core | Hard down → app unusable | Fully depends on DB availability |
| **Firebase Cloud Messaging** | Mobile push notifications | Notification events | Device token + payload | No retry visible; no stale-token cleanup | Missed approvals/alerts for mobile users |
| **SignalR hub `/hubs/notifications`** | Real-time web notifications | Auth'd connection | JWT header | WebSocket auth mismatch in LB requires Redis backplane (noted in CLAUDE.md) | Missed real-time updates |
| **Biometric / RFID devices** | Attendance punches | Device POSTs to attendance API | `AttendanceTransaction` payload | No device auth protocol documented | Spoofed attendance |
| **NFC tags (physical)** | Dual-verify mobile punch | Mobile NFC scan | HMAC-signed payload or UID-only | HMAC secret rotation not versioned | Tag compromise invalidates all tags |
| **Email / SMS** | Notifications | `EnableEmailNotifications` / `EnableSmsNotifications` | Template-based | No retry, no provider abstraction visible | Silent delivery failure |
| **File storage** | `uploads/` local disk (cloud abstraction ready) | File upload | Multipart, 10 MB default | No virus scan, no encryption at rest | Malware / data breach |
| **Google/Leaflet map** | GPS picker on branches | Admin UI | Static lib | Offline = manual coords | Minor |
| **Cloudflare Pages** | Hosts admin + self-service | Deploy pipeline | Static build | CDN outage → portal down | Admin access blocked |

**Absent integrations** (notable):
- No accounting/ERP export (payroll → SAP/Oracle) visible.
- No bank file (WPS / SIF) generator for payroll payments.
- No government portal hook (e.g., GOSI / Qiwa for Saudi Arabia).
- No background-check provider.
- No e-signature (DocuSign / Adobe Sign).
- No Single-Sign-On (SAML/OIDC).
- No HRMS→Payroll provider export.

---

## 9. Automation, Background Jobs, and Scheduled Processes

All 38 jobs are Coravel `IInvocable` implementations. Schedule cadence is configured via `BackgroundJobSettingsHelper`.

| Category | Job | Cadence | Purpose |
|---|---|---|---|
| **Expiry/Alert** | `CertificationExpiryAlertJob` | Daily | Employee certifications approaching expiry |
| | `DocumentExpiryAlertJob` | Daily | Documents by `DocumentExpiryAlertDaysCsv` |
| | `VisaExpiryAlertJob` | Daily | Visas by `VisaExpiryAlertDaysCsv` |
| | `ContractExpiryAlertJob` | Daily | Fires `ContractExpiredEvent` when `EndDate ≤ today` |
| | `AssetWarrantyExpiryAlertJob` | Daily | Asset warranty approaching |
| | `OverdueAssetReturnAlertJob` | Daily | Assets not returned post-termination |
| | `BenefitEnrollmentExpiryJob` | Daily | Benefit enrolment end |
| | `CompensatoryOffExpiryJob` | Daily | Unused comp-off expired per policy |
| | `ExpireTemporaryAllowancesJob` | Daily/Monthly | Close out temporary allowances |
| **Attendance** | `DailyAttendanceGenerationJob` | Daily | Create `AttendanceRecord` per employee |
| | `EndOfDayAttendanceFinalizationJob` | Daily (EOD) | Close day |
| | `ApplyScheduledProfileChangesJob` | Daily | Effective-dated changes (shift etc.) |
| **Leave / Payroll** | `MonthlyLeaveAccrualJob` | 1st of month | Accrue per `LeaveAccrualPolicy` |
| | `BenefitDeductionSyncJob` | Monthly | (framework; deduction wiring absent) |
| **Reminders** | `TimesheetSubmissionReminderJob` | Daily | Nudge unsubmitted timesheets |
| | `TrainingSessionReminderJob` | Daily | Upcoming training sessions |
| | `CounselingFollowUpReminderJob` | Daily | Pending follow-ups |
| | `LoanRepaymentReminderJob` | Daily | Upcoming installments |
| | `SurveyReminderJob` | Daily | Incomplete survey responses |
| | `ReviewCycleReminderJob` | Daily | Pending reviews |
| | `OnboardingTaskOverdueJob` | Daily | Overdue tasks |
| | `SuccessionPlanReviewReminderJob` | Daily | Succession review cadence |
| | `GrievanceSlaAlertJob` | Daily | SLA breach alerts |
| **Announcements** | `AnnouncementSchedulerJob` | Minute-level | Publish at `ScheduledPublishDate` |
| | `AnnouncementExpiryJob` | Daily | Expire stale announcements |
| **Workflow** | `WorkflowTimeoutProcessingJob` | Hourly | Apply `TimeoutAction` on overdue steps |
| | `FrozenWorkflowCleanupJob` | Daily | Cleanup orphaned frozen instances |
| **Analytics** | `AnalyticsSnapshotJob` | Daily | Trend snapshot |
| | `MonthlyAnalyticsRollupJob` | Month-end | Monthly rollup |
| **Surveys** | `SurveyDistributionActivatorJob` | Scheduled | Activate distributions |
| | `SurveyExpiryJob` | Daily | Close expired surveys |
| **Other** | `TimesheetPeriodGenerationJob` | Weekly/Monthly | Create periods |
| | `TimesheetPeriodClosureJob` | Period end | Lock periods |
| | `OpenEnrollmentPeriodActivatorJob` | Scheduled | Activate benefits enrolment window |
| | `ScheduledReportExecutionJob` | Scheduled | Run + email reports (wiring uncertain) |
| | `PIPExpiryCheckJob` | Daily | Check PIP end dates |
| | `TalentProfileSyncJob` | Daily | Sync data |

**Retry / failure handling**: Not visible at the job level — exceptions likely bubble to Coravel's scheduler logging; no per-job retry-with-backoff or dead-letter queue.

**Observability gaps**:
- No HR-facing dashboard for job runs (success/fail/last-run-time).
- No alerting when a job skips a day.
- Minimal idempotency guarantees — some jobs rely on "did row already exist?" checks.

---

## 10. Business Rules Inventory

### Eligibility
- Leave accrual requires `MinimumServiceMonths` (policy).
- Remote work requires `MinAdvanceNoticeDays` and branch-scoped policy.
- Probation — new employees have `ProbationEndDate` (default 90 days); implicit treatment in leave/OT policies should be verified.
- Loan application — `LoanPolicy.MinServiceMonths`, `MaxConcurrentLoans`, `MaxPercentageOfSalary` (rules defined; **enforcement missing**).
- Training enrollment — session capacity (`MaxParticipants`) enforced; prerequisites declared but **not enforced**.
- Benefits enrollment — `OpenEnrollmentPeriod` controls window; eligibility JSON on plan is **not evaluated**.

### Validation
- Max vacation days per request.
- Max vacation future-planning years.
- Excuse backward/forward windows.
- Upload size `MaxUploadSizeMb`.
- Password min length.
- Login lockout progressive policy.
- Geofence radius check (>0 should be enforced; not validated in code).
- Attendance correction retroactive days (config exists; **not enforced**).

### Date rules
- `AttendanceDate` cannot be in the future.
- Correction target date ≤ today.
- Contract `EndDate` triggers `ContractExpiredEvent` via job.
- Probation end = start + default probation days.
- Leave future planning cap.
- Effective-dated records use inclusive `FromDate ≤ date AND (ToDate is null OR date ≤ ToDate)`.

### Approval conditions
- `AllowSelfApproval=false` (default).
- `DefaultApprovalTimeoutHours=72`.
- Delegation depth ≤ `MaxWorkflowDelegationDepth` (default 2).
- Resubmissions ≤ `MaxWorkflowResubmissions` (default 3).
- Fallback chain only after primary resolution fails.

### Payroll
- All inputs must be effective-dated; overlaps are prorated.
- Two-pass allowances (fixed+%basic → OT → %gross).
- Tax on `IsTaxable` allowances only.
- SI on `IsSocialInsurable` allowances only, capped at `MaxInsurableSalary`, nationality-filtered.
- Absence deduction = absent × (base / daily basis).
- Paid records are locked (`LockedAtUtc`).
- Admin-unlock requires SystemAdmin + reason.
- Recalculation soft-deletes non-locked records only.

### Attendance
- `Pending` past dates are surfaced as `Absent`.
- Manual transactions require `EnteredByUserId`.
- Grace period before marking Late.
- Night-shift tolerance ±1 day between local and attendance date.
- Overtime `MinimumOvertimeMinutes` + `RoundingIntervalMinutes` applied.

### Leave
- `ReserveBalance` moves current → pending; `ConfirmUsage` pending → used.
- Accrual on 1st of month for prior month (if `IsMonthlyAccrual=true`).
- Carryover limited by `MaxCarryOverDays`, expires after `CarryOverExpiryMonths` (**no enforcer job observed**).
- Half-day rules: `HalfDayType` required, start=end.

### Security / access
- Branch scope filter on every list/get (when applicable).
- Permission policies on every controller action.
- SystemAdmin bypass.
- Confidential records (disciplinary, counseling) filtered for non-HR.

### Cross-module
- Offer acceptance → onboarding creation.
- Onboarding completion → employee activation (if configured).
- Resignation approved → (optional) termination creation.
- Termination created → clearance creation + suspend.
- Clearance complete → (optional) enable final settlement.
- Final settlement paid → employee deactivation.
- Contract expired → configured action.

---

## 11. User Experience Review

### 11.1 Employee (self-service portal + mobile)

**Friction points**:
- **Fragmented "my requests"**: vacation, excuse, remote-work, correction, shift-swap, comp-off, fingerprint, allowance, loan, advance, expense, letter — 12 different screens, no unified inbox.
- **No real-time balance check while filling forms** — balance only shown at submission error.
- **No form-state persistence** — navigating away loses in-progress data.
- **No push notification on approval status change** — employees must re-check portal/app.
- **Mobile app**:
  - Generic error messages ("Check-in failed") without reason (GPS? NFC? Network?).
  - No offline support; a signal drop at 8:00 AM means a failed punch.
  - No form caching.
  - Hard-coded API URL.
  - No biometric prompt for sensitive actions (approve leave etc.).
- **Payslip**: viewable but no preview-before-process, no itemized explanation page.
- **Leave request**: can't book multiple vacations in one flow (annual planning pain).
- **Self-service portal not mobile-responsive** — widths designed for desktop.

### 11.2 Manager

**Friction points**:
- **Pending-approvals list** is a single entity type at a time in many cases; no unified queue with filters (entity type, SLA, urgency).
- **No bulk approve/reject**.
- **No SLA visibility** — can't see which items are overdue vs. fresh.
- **No delegation UI** — delegation rows can be created via API but no inbox view exists for delegates.
- **Team attendance** exists but without swift drill-down to the record that triggered "Late" or "Absent".
- **Shift-swap partner approval** is buried in a separate screen.

### 11.3 HR Manager

**Friction points**:
- **No global search** across employees/requests — must use per-page filters.
- **No bulk actions** (bulk shift assign, bulk leave approve, bulk document verify).
- **Payroll processing**: admin-unlock requires manual recalculate → approve → mark-paid — one-click re-finalize missing.
- **Recruitment**: no candidate timeline view; application status advances through many states without a Gantt.
- **Onboarding**: can't bulk-create processes for a new-hire cohort.
- **Lifecycle automation failures** are audit-only — must query DB to see them.
- **Reports**: no scheduled-export UI (the backend job exists); no custom report builder.
- **Audit log** view exists but querying by entity/user/date requires reading raw rows.

### 11.4 System Admin

**Friction points**:
- **Tenant settings UI** groups 100+ fields on flat forms — no guided wizard for first-time setup.
- **Workflow definition editor** — no visual workflow builder; definitions likely created via forms/JSON.
- **Role & permission assignment** — no audit of who changed what permission when.
- **Seed / bulk import** — `SeedController` exists, but no admin UI for importing employees from CSV.

### 11.5 Cross-cutting UX recommendations
- Unified **Requests** inbox per persona.
- **Bulk actions** toolbar on every list.
- **Global search** (employees, requests, approvals) with saved filters.
- **SLA + priority** visible on approval items.
- **Scheduled report delivery** UI on `ScheduledReportExecutionJob`.
- **Mobile offline queue** for check-in/out when network unavailable.
- **Specific error messages** on mobile verification failures.
- **Payslip breakdown** view with line-item notes.

---

## 12. Weaknesses, Gaps, and Risks

### 12.1 Business logic gaps (highest impact)
- **Approval-to-execution missing** for Allowance Requests, Loan Applications, Salary Advances, Expense Claims, Letter Requests, Benefit Enrollments. Requests reach `Approved` and **stop**.
- **Leave approval does not mark attendance `OnLeave`**.
- **Benefits premiums not deducted in payroll**.
- **Loan repayment schedules not auto-generated** — silent skipped deductions.
- **Remote work quota not enforced** at approval time.
- **PIP / Disciplinary do not escalate to termination** automatically.
- **Exit interview is a checkbox, not a structured survey**.
- **Training evaluation does not gate certificate issuance**.
- **Succession plans have no nomination / approval workflow**.
- **`OnCallSchedules` not wired to attendance status `OnDuty` or compensation**.

### 12.2 Technical-to-business mismatches
- **Timezone not converted** for `TransactionTimeLocal` — overnight/cross-border attendance can be off by a day.
- **`SalaryAdvance.DeductionMonth=YYYYMM`** integer instead of date range — missed matches on periods spanning month-end.
- **Expense reimbursement has no date-range filter** — stale claims get reimbursed.
- **Benefits framework present, but no payroll wiring**.

### 12.3 Missing validations
- `AttendanceCorrectionMaxRetroactiveDays` defined, **not enforced**.
- `Branch.GeofenceRadiusMeters` > 0 not validated.
- Duplicate punch dedup window missing.
- Allowance request eligibility rules JSON — **not evaluated**.
- Benefit plan eligibility rules JSON — **not evaluated**.
- Loan policy caps — **not enforced** on application.
- Remote work quota caps — **not enforced**.
- Workflow step "self-approval" prevention — configurable but cross-handler enforcement unclear.

### 12.4 Missing exception handling / retries
- FCM push, email/SMS delivery — **no retry visible**; silent failures.
- Background-job exceptions — **no retry-with-backoff**.
- Payroll external integrations (loans/advances/expenses) — **no transactional boundary**; partial failure leaves inconsistent state.
- `DailyAttendanceGenerationJob` — **no locking against concurrent edits**.

### 12.5 Incomplete flows
- Resignation → Termination manual by default.
- Interview feedback is notes only (no rubrics/scoring).
- Letter requests have no document generation.
- Training attendance marking — no observed endpoint.
- 360 feedback — requests created but responses not aggregated into review.
- Stale notification / push tokens — no cleanup.
- File attachments — no orphan cleanup after soft delete of parent.

### 12.6 Poor configurability
- Hardcoded 8 clearance items.
- Default payroll calendar fallback to 30 days.
- Default workflow fallback role "HRManager" not validated to exist.
- Alert day CSVs fixed format — can't differ per document type.
- Overtime weekly/monthly caps impossible.
- Per-department remote-work eligibility impossible.

### 12.7 UX weaknesses
See §11 in detail.

### 12.8 Data consistency risks
- Leave balance drift on rejection (no release).
- Orphaned `PayrollRecordDetail` after soft-deleted `PayrollRecord`.
- `LoanApplication.OutstandingBalance` vs `LoanRepayment.BalanceRemaining` can diverge.
- Missing attendance record after holiday add.
- Benefit enrolment without payroll deduction = employer subsidy drift.
- Cascade recalculations can briefly produce inconsistent `AttendanceRecord` state.

### 12.9 Permission / security risks
- Branch-scope filter is per-handler — not an EF global filter; risk of leakage in new handlers.
- No `LockedAtUtc` domain-invariant — relies on controller guards.
- NFC secret key rotation invalidates all tags (no versioning).
- File storage has no virus scanning, no encryption at rest, no per-file ACL.
- Confidential records filtered by hand in handlers — not via a policy; risk of leakage.
- No anomaly-detection for logins.
- No tenant-level audit of permission grants.

### 12.10 Reporting / audit gaps
- `AuditLog` exists but no admin UI query tool.
- Lifecycle audit / workflow system-action audit / payroll-run audit are all append-only — no dashboards.
- `ScheduledReportExecutionJob` unclear delivery pipeline.
- No custom report builder.
- No data-retention policy / archiving schedule.

---

## 13. Recommendations and Enhancement Opportunities

### Critical (fix now)

| Rec | Problem | Impact | Suggested enhancement | Affected modules | Business value |
|---|---|---|---|---|---|
| **C1 Complete the approval→execution handlers** | Approved Allowance/Loan/Advance/Expense/Letter/Benefit requests never materialize | HR trust in system; real-money gaps | Add CQRS handlers that, on `Approve`, create/update the resulting entity (`AllowanceAssignment`, `LoanRepayment` schedule, `SalaryAdvance` deduction window, `ExpenseReimbursement` voucher, generated letter PDF, `BenefitEnrollment` payroll-linked deduction row) inside a transaction and emit domain events | Payroll, Benefits, Allowances, Loans, Expenses, Letters | Eliminates largest class of silent gaps |
| **C2 Wire benefit premiums into payroll** | Employee elections not deducted | Employer absorbs premium cost | Add a calculator step that reads active `BenefitEnrollment` and adds `EmployeeMonthlyContribution` as a deduction detail line | Payroll, Benefits | Correct cost accounting |
| **C3 Fix timezone handling on attendance** | Overnight / multi-branch punches miscounted | Wrong pay, wrong OT | Resolve branch TZ via a service; apply to `TransactionTimeLocal`, date-bucket keys, holiday matching | Attendance, Payroll | Accurate payroll for shift workers |
| **C4 Transactional safeguard for payroll side-integrations** | Loan `Paid` with no `PayrollRecord` | Data drift, disputes | Wrap loan/advance/expense updates and record creation in a single EF transaction | Payroll, Loans, Advances, Expenses | Bulletproof financial audit |
| **C5 Alert on workflow `FailedRouting` and lifecycle audit failures** | Silent stalls | Forgotten approvals, missed hires | On append of a failed audit row, emit notifications to `NotificationRecipientRolesCsv` | Workflow, Lifecycle | Operational observability |
| **C6 Enforce `AttendanceCorrectionMaxRetroactiveDays`** | Corrections possible for arbitrarily old dates | Financial manipulation | Add validator check | Attendance | Audit integrity |
| **C7 Auto-generate loan repayment schedule** | Silent missed deductions | Outstanding balances drift | On `LoanApplication.Approve`, generate `LoanRepayment` rows per installment | Loans, Payroll | Financial correctness |
| **C8 Harden `PayrollRecord` lock as a domain invariant** | New endpoint could bypass guards | Modification of locked records | Move `LockedAtUtc.HasValue` check into entity methods; throw if modified | Payroll | Audit integrity |

### High

| Rec | Problem | Impact | Suggested enhancement |
|---|---|---|---|
| **H1 Retroactive attendance recalc when holiday is added** | Records say Present on a newly declared holiday | Pay / OT rate wrong | Background job to recompute records for new/edited holiday dates |
| **H2 Enforce quota on remote-work requests** | Over-quota approvals | Budget overspend | Validate `WorkingDaysCount ≤ MaxDaysPerMonth` etc. in handler |
| **H3 Auto-release leave balance on rejection** | Pending days not released | Balance drift | Call `ReleaseReservedBalance()` in reject handler |
| **H4 Carryover expiry job** | Policy field present, nothing expires | HR manual cleanup | `LeaveCarryoverExpiryJob` runs on fiscal-year boundary |
| **H5 Unified "My Requests" and "Pending Approvals" inboxes** | Fragmented UX | Productivity loss | Single list view with entity-type filter, SLA, bulk actions |
| **H6 Resignation → Termination automation default true** | Manual step missed | Delayed clearance | Flip `AutoCreateTerminationOnResignationApproved` default, or surface an "auto-create" toggle on resignation approve |
| **H7 Offline queue on mobile punches** | Signal drop = missed punch | Employee frustration | Queue in secure storage, sync when online |
| **H8 Specific error messages on mobile verification failure** | Generic "Check-in failed" | Support tickets | Map `VerificationFailureReason` → localized message |
| **H9 Date-range-based `SalaryAdvance.DeductionMonth`** | Month-straddling periods miss matches | Missed deductions | Convert to `DeductionFromDate`/`DeductionToDate` |
| **H10 Expense claim reimbursement must be within current period** | Stale claims re-reimbursed | Double payment | Add `ExpenseDateStart ≤ period.EndDate` filter |
| **H11 Scheduled report delivery UI** | Job exists, no UI | Manual reporting | Wire `ScheduledReportExecutionJob` to a definition row + email recipients |
| **H12 Custom clearance templates per termination type** | One size fits all | Rigid offboarding | `ClearanceTemplate` entity with `TerminationType` filter |
| **H13 Interview rubrics and multi-rater aggregation** | Hiring decisions unstructured | Quality drop | Structured `InterviewFeedbackRubric` + aggregation endpoint |
| **H14 PIP/Disciplinary escalation rules** | Manual escalation | Inconsistent outcomes | Rules engine for count / severity thresholds |
| **H15 360 response aggregation into review** | Requests exist, no synthesis | Hollow 360 | Aggregate responses into review report |
| **H16 Enforce loan policy caps on application** | Policy has no teeth | Over-exposure | Validate `MaxConcurrentLoans`, `MaxPercentageOfSalary`, `MinServiceMonths` |
| **H17 Branch-scope filter as EF global filter** | Each handler re-implements | Leakage risk | Global query filter using `ICurrentUser.BranchIds` |
| **H18 Notification templates + user preferences** | Hardcoded templates, no DND | Notification fatigue | `NotificationTemplate` entity + per-user preference |

### Medium

| Rec | Problem | Suggested enhancement |
|---|---|---|
| **M1 Attendance dedup window** | Bounce-punches create duplicate transactions | 30-sec dedup check |
| **M2 NFC secret key versioning** | Rotation invalidates all tags | `KeyVersion` in payload + active key list |
| **M3 Virus scan file uploads** | Malware risk | Integrate ClamAV/Azure Defender |
| **M4 `Branch.GeofenceRadiusMeters > 0` validator** | Accidental zero | Add validator |
| **M5 Training prerequisites enforcement** | Listed, not enforced | Validate on enrollment |
| **M6 Certification renewal reminders + auto-enrollment** | Expiry tracked, nothing happens | Renewal job |
| **M7 Project budget vs. actual report** | Manual | Endpoint comparing logged hours to budget |
| **M8 Timesheet↔Attendance variance report** | Data silos | Reconciliation endpoint |
| **M9 Workflow cycle detection explicit** | Relies on depth cap | Track visited nodes |
| **M10 Validation rule registry startup check** | Unregistered code causes silent fail | Compare definitions vs. registered rules at startup |
| **M11 Data retention policies per entity** | GDPR / local risk | Config per entity + archival job |
| **M12 Payslip preview before Mark-Paid** | Surprises on payday | Preview endpoint + UI |
| **M13 Performance rating calibration** | No cross-team calibration | Calibration session entity |
| **M14 Succession nomination workflow** | Data only | Approval chain |
| **M15 Career path enforcement on promotions** | Free-form promotions | Validate against `CareerPath` |
| **M16 Orphan `PayrollRecordDetail` cleanup** | DB bloat | Cascade or cleanup job |
| **M17 Stale FCM token cleanup** | Wasted sends | Remove on repeated delivery failure |
| **M18 Admin dashboard for background-job runs** | Ops blind | Run-history view + alerts |
| **M19 Tax=0 on missing config fail loudly** | Quiet under-deduction | Validate config exists or explicit zero-tax policy |
| **M20 Department-level remote-work eligibility** | Only branch | Extend policy with dept filter |

### Low

| Rec | Suggested enhancement |
|---|---|
| **L1 Template inheritance for onboarding** | Parent/child templates |
| **L2 Task interdependencies in onboarding** | DAG of task prerequisites |
| **L3 E-signature for offer letters & policies** | Integrate DocuSign |
| **L4 Internal mobility portal** | Employees see open positions + apply |
| **L5 Rehire-eligibility flag** | `Employee.IsRehireEligible`, reason |
| **L6 Visual workflow builder** | Drag-and-drop UI |
| **L7 Standardized exit interview survey** | Link `ExitInterview` to `SurveyTemplate` |
| **L8 Read receipts on announcements** | Tracking model |
| **L9 Keyboard shortcuts + accessibility (WCAG 2.1 AA)** | Full audit |
| **L10 Payslip bilingual PDF generation** | Template-based |
| **L11 Mobile landscape support** | Layout fix |
| **L12 Per-shift overtime multipliers** | Override at shift level |
| **L13 Weekly/monthly OT caps** | New config fields |

---

## 14. Open Questions / Unclear Areas

1. **Does `PayrollPeriod.Status = Processing` auto-roll back on failure?** Code path suggests no; period stays in `Processing` if the handler crashes mid-run.
2. **Does `AutoCheckOut` get applied when an employee forgets to check out?** Enum value exists; a background job creating it is not visible.
3. **What does `OnCallScheduling` actually affect** at the attendance/payroll level? Status `OnDuty` exists but integration is thin.
4. **Is there a bank-file export for payroll payments** (WPS/SIF)? Not visible.
5. **How is payslip PDF generated and delivered?** Self-service portal downloads "historical payslips" but the generation path is unclear.
6. **`ScheduledReportExecutionJob` delivery target** — email? S3? UI? Not wired visibly.
7. **Where is the department-level `DefaultShiftId` consumed**? Inheritance exists; resolver usage needs verification.
8. **Does `AllowSelfApproval=false` cover all handlers**, or only explicit checks in select ones?
9. **Clarity on `LeaveAccrualPolicy.ExpiresAtYearEnd`** — what job enforces this? Presumed manual.
10. **EOS calculator fallback behavior** if no `EndOfServicePolicy` matches — amount zero? exception?
11. **How are timesheet and attendance hours reconciled for payroll** — which is source of truth?
12. **2FA enrollment flow** — is there a self-service enrollment in portal or admin-only?
13. **Does the system track the actual approver user ID when delegation is used in `WorkflowStepExecution`**? `AssignedToUserId` vs `ActionTakenByUserId` — both present in model, usage consistency unclear.
14. **Data retention after offboarding** — no visible purge policy for PII.
15. **Real-time SignalR in load-balanced prod** — Redis backplane noted as needed but not confirmed configured.

---

## 15. Appendix

### 15.1 Key API endpoint groups

| Area | Representative endpoints |
|---|---|
| Auth | `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout` |
| Attendance | `POST /api/v1/attendance/transactions`, `POST /api/v1/attendance/generate/{date}`, `PUT /api/v1/attendance/{id}`, `POST /api/v1/mobile/attendance/transaction` |
| Approvals / Workflow | `POST /api/v1/approvals/{id}/approve`, `/reject`, `/return-for-correction`, `/resubmit`; `GET /api/v1/workflows/validation-rules`, `/system-actions`, `/role-assignment-stats` |
| Payroll | `POST /api/v1/payroll-periods/{id}/process`, `/recalculate`, `/approve`, `/mark-paid`, `/cancel`, `/admin-unlock`, `GET /api/v1/payroll-periods/{id}/run-audit` |
| Payroll settings | `GET/POST/PUT/DELETE /api/v1/payroll-settings/{tax-configs\|social-insurance\|insurance-providers\|calendar-policies}[/{id}]` |
| EOS | `GET /api/v1/end-of-service/{terminationId}`, `POST /api/v1/end-of-service/calculate`; full CRUD on `EndOfServicePolicies` |
| Tenant config | `GET/PUT /api/v1/tenant-configuration`, `GET /api/v1/tenant-configuration/resolved?branchId=&deptId=`, `GET/PUT/DELETE /api/v1/tenant-configuration/branches/{id}` |
| Lifecycle audit | `GET /api/v1/lifecycle-automation/audit`, `/audit/{id}`, `/audit/by-entity` |
| Recruitment | `POST /api/v1/job-requisitions/{id}/submit`, `POST /api/v1/offer-letters/{id}/accept`, `POST /api/v1/offer-letters/{id}/decline` |
| Offboarding | `POST /api/v1/clearance/{terminationId}/initialize`, `POST /api/v1/clearance/items/{itemId}/complete` |
| SignalR | `/hubs/notifications` |

### 15.2 Key services / classes

| Role | Type |
|---|---|
| Auth | `LoginCommandHandler`, `JwtTokenGenerator` |
| Base handler | `BaseHandler<TReq,TRes>` with `Context` + `CurrentUser` |
| Current user | `ICurrentUser` |
| Tenant settings | `ITenantSettingsResolver`, `TenantSettingsResolver` (5-min cache) |
| Validation settings | `IValidationSettingsProvider` |
| Payroll calc | `IPayrollCalculationService`, `IPayrollInputResolver`, `ITaxCalculator`, `ISocialInsuranceCalculator`, `IOvertimePayCalculator`, `IAbsenceDeductionCalculator`, `IPayrollCalendarResolver`, `IProrationCalculator` |
| EOS | `IEndOfServiceCalculator` |
| Attendance | `IAttendanceCalculationService`, `IDailyAttendanceGeneratorService` |
| Workflow | `IWorkflowEngine`, `ApproverResolver`, `IWorkflowValidationRule`, `IWorkflowValidationRuleRegistry` |
| Lifecycle | `ILifecycleEventPublisher` |
| System user | `ISystemUserResolver` |
| Notification recipients | `INotificationRecipientResolver` |
| File storage | `IFileStorageService`, `FileAttachment` |

### 15.3 Key domain entities

- Org: `Branch`, `Department`, `JobGrade`, `Employee`, `User`, `Role`, `Permission`, `EmployeeUserLink`, `UserBranchScope`.
- Attendance: `AttendanceRecord`, `AttendanceTransaction`, `AttendanceVerificationLog`, `Shift`, `ShiftPeriod`, `ShiftAssignment`, `NfcTag`, `PublicHoliday`, `OvertimeConfiguration`.
- Leave/Excuse/Remote: `VacationType`, `EmployeeVacation`, `LeaveBalance`, `LeaveTransaction`, `LeaveAccrualPolicy`, `EmployeeExcuse`, `ExcusePolicy`, `RemoteWorkPolicy`, `RemoteWorkRequest`.
- Workflow: `WorkflowDefinition`, `WorkflowStep`, `WorkflowInstance`, `WorkflowStepExecution`, `ApprovalDelegation`, `WorkflowRoleAssignmentCursor`, `WorkflowSystemActionAudit`.
- Lifecycle: `LifecycleAutomationAudit`.
- Payroll: `PayrollPeriod`, `PayrollRecord`, `PayrollRecordDetail`, `PayrollRunAudit`, `PayrollRunAuditItem`, `PayrollCalendarPolicy`, `TaxConfiguration`, `SocialInsuranceConfiguration`, `InsuranceProvider`, `EmployeeInsurance`.
- Comp: `AllowanceType`, `AllowancePolicy`, `AllowanceAssignment`, `AllowanceRequest`, `AllowanceChangeLog`, `SalaryStructure`, `SalaryComponent`, `EmployeeSalary`, `SalaryAdjustment`, `PayrollAdjustment`.
- Finance: `LoanType`, `LoanPolicy`, `LoanApplication`, `LoanRepayment`, `SalaryAdvance`, `ExpenseCategory`, `ExpensePolicy`, `ExpenseClaim`, `ExpenseClaimItem`, `ExpenseReimbursement`.
- Benefits: `BenefitPlan`, `OpenEnrollmentPeriod`, `BenefitEnrollment`, `BenefitClaim`, `BenefitDependent`.
- EOS: `EndOfServicePolicy`, `EndOfServicePolicyTier`, `EndOfServiceResignationDeductionTier`, `EndOfServiceBenefit`.
- Recruitment: `JobRequisition`, `JobPosting`, `Candidate`, `JobApplication`, `InterviewSchedule`, `InterviewFeedback`, `OfferLetter`.
- Onboarding: `OnboardingTemplate`, `OnboardingTemplateTask`, `OnboardingProcess`, `OnboardingTask`, `OnboardingDocument`.
- Performance: `PerformanceReviewCycle`, `PerformanceReview`, `GoalDefinition`, `CompetencyFramework`, `Competency`, `CompetencyAssessment`, `PerformanceImprovementPlan`, `FeedbackRequest360`, `Feedback360Response`.
- Training: `TrainingCategory`, `TrainingCourse`, `TrainingProgram`, `TrainingSession`, `TrainingEnrollment`, `TrainingAttendance`, `TrainingEvaluation`, `TrainingBudget`.
- Talent: `TalentProfile`, `KeyPosition`, `SuccessionPlan`, `CareerPath`.
- Offboarding: `ResignationRequest`, `TerminationRecord`, `ClearanceChecklist`, `ClearanceItem`, `ExitInterview`, `FinalSettlement`.
- Employee Relations: `CounselingRecord`, `DisciplinaryAction`, `Grievance`.
- Documents/Assets: `EmployeeDocument`, `DocumentCategory`, `EmployeeCertification`, `Asset`, `AssetCategory`, `AssetAssignment`, `AssetMaintenance`, `FileAttachment`.
- Communication: `Announcement`, `AnnouncementCategory`, `NotificationBroadcast`, `Notification`, `PushToken`.
- Surveys: `SurveyTemplate`, `SurveyDistribution`, `SurveyResponse`.
- Config: `TenantSettings`, `BranchSettingsOverride`, `DepartmentSettingsOverride`, `CompanyPolicy`, `LetterTemplate`, `LetterRequest`, `AuditLog`, `AuditChange`.

### 15.4 Important admin portal pages

`/dashboard`, `/employees`, `/branches`, `/departments`, `/users`, `/roles`, `/shifts`, `/shift-assignments`, `/attendance`, `/vacations`, `/excuses`, `/remote-work`, `/approvals`, `/workflows`, `/onboarding`, `/offboarding`, `/contracts`, `/promotions`, `/transfers`, `/payroll/periods`, `/payroll/settings`, `/allowances`, `/recruitment/*`, `/performance/*`, `/training/*`, `/talent/*`, `/documents`, `/assets`, `/announcements`, `/surveys`, `/expenses`, `/loans`, `/reports`, `/analytics`, `/settings/tenant-configuration`, `/audit-logs`.

### 15.5 Important self-service / mobile screens

Self-service: Dashboard, My Attendance, My Profile, Vacation Requests, Excuse Requests, Remote Work Requests, Attendance Corrections, Shift Swap, Compensatory Off, Payslips, My Salary, My Allowances, My Benefits, My Assets, Surveys, Announcements, Letter Requests, Certifications, Training, Fingerprint Requests, Expenses, Loans, Resignation, Timesheets, Manager Dashboard, Pending Approvals.

Mobile: Login, Home, Attendance (GPS+NFC), Leave, Excuse, Remote Work, Schedule, Shift Swap, Approvals (manager), Notifications, Profile.

### 15.6 Important configuration files

- `src/Api/TimeAttendanceSystem.Api/appsettings.json` — DB connection, JWT, NFC encryption, FCM, CORS.
- `src/Api/TimeAttendanceSystem.Api/appsettings.Development.json` — dev overrides.
- `src/Api/TimeAttendanceSystem.Api/Program.cs` — DI, migration, middleware, SignalR.
- `time-attendance-frontend/src/app/app.routes.ts` — admin routes.
- `time-attendance-selfservice-frontend/src/app/app.routes.ts` — self-service routes.
- `ess_mobile_app/lib/core/config/app_config.dart` — mobile config.

### 15.7 End-to-end timeline diagram (hire → work → exit)

```
 Day 0       JobRequisition approved → JobPosting published → Candidate applies
 Day X       Interviews (InterviewSchedule + Feedback)
 Day X+n     OfferLetter sent → Accepted
             └ tx: Employee created (IsPreHire=true if configured)
             └ EmployeeContract (ProbationEndDate=+DefaultProbationDays)
             └ EmployeeSalary from SalaryStructure
             └ OfferAcceptedEvent → OnboardingProcess + tasks
 Day Y       Onboarding tasks complete + docs verified
             └ OnboardingCompletedEvent → (opt) Employee activated
 Daily       AttendanceTransaction → DailyAttendanceGenerationJob → AttendanceRecord
             └ Overtime, Late/Early, Status via shift + holiday + leave
 Monthly     MonthlyLeaveAccrualJob → LeaveBalance
             Payroll period: process → recalc → approve → mark-paid (🔒)
             └ Tax, SI, two-pass allowances, OT, absence deduction
             └ Side-integrations: loan repayments, advances, expense reimb
 Periodic    Contract renewal / promotion / transfer / salary adjustment
             Performance review cycle → (opt) promotion / salary increase / PIP
             Training enrollment → attendance → evaluation → cert
             Documents / visa / certification expiry alerts
 End         ResignationRequest approved
             └ (opt) TerminationRecord auto-created
             └ ClearanceChecklist (+ 8 defaults / template) + suspend
             └ ClearanceCompletedEvent → (opt) enable FinalSettlement
             └ EOS calculator applied (policy-driven + snapshot)
             └ FinalSettlement paid → Employee deactivated
```

### 15.8 Permission-to-action matrix (selected, abbreviated)

| Resource | SystemAdmin | HRManager | Payroll | BranchMgr | Manager | Employee |
|---|---|---|---|---|---|---|
| Employees | CRUD | CRUD | R | R (scope) | R (team) | R (self) |
| Payroll periods | CRUD + unlock | CRUD (no unlock) | CRUD (no unlock) | R | — | — |
| Workflows | CRUD | CRUD | R | R | R | R (own) |
| Attendance | CRUD | CRUD | R | R (scope) | R (team) | R (self)+ correction |
| Tenant settings | CRUD | R | — | — | — | — |
| Reports | All | HR+Ops | Payroll | Scope | Team | — |

### 15.9 Related documentation (already in repo)

- `CLAUDE.md` — architecture + guidelines.
- `PAYROLL_PRODUCTION_FIX_REVIEW.md` — v13.0 rewrite.
- `HARDCODED_BUSINESS_RULES_FIX.md` — v13.3.
- `HARDCODED_RULES_REMAINING_FIX.md` — v13.4.
- `LIFECYCLE_AUTOMATION_FIX.md` — v13.5.
- `WORKFLOW_ROUTING_HARDENING_FIX.md` — v13.6.
- `OVERTIME_BUSINESS_RULES.md` — OT detail.
- `HARDCODED_RULES_AUDIT.md` — historical audit.
- `BACKEND_TECHNICAL_DOCUMENTATION.md` / `FRONTEND_TECHNICAL_DOCUMENTATION.md` — technical refs.
- `SYSTEM_ENHANCEMENT_PLAN.md` — prior enhancement plan.

---

**Document classification**: Business solution review. Intended for product, BA, solution architecture, and engineering leadership.
**Reviewed modules**: 26 top-level business domains across 127 controllers, 220+ tables, 38 scheduled jobs, 3 client apps.
**Status legend**: ✅ mature — ⚠️ functional-with-gaps — ❌ CRUD-only — 🚧 partial / missing.
