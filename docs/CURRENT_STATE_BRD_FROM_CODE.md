# Current-State Business Requirements Document (BRD)

**System:** TecAxle HRMS
**Document version:** 1.0 — as-built from code, v14.8 (Mobile App Removal)
**Source of truth:** the implementation in this repository on branch `main`
**Date:** 2026-04-17

---

## 1. Document Purpose

### 1.1 Why this document exists
This Business Requirements Document (BRD) describes what the TecAxle HRMS system **actually does today**, derived from the production codebase. It is intended as a baseline reference for business stakeholders, HR process owners, product owners, implementation/review teams, and auditors.

### 1.2 Basis
Every capability, rule, workflow, and automation described here is grounded in working code — controllers, handlers, services, background jobs, workflow engine, domain entities, frontend pages, and configuration models. Where behavior has been **inferred** rather than directly confirmed in the source, it is labeled as such. Where implementation is partial or a gap exists, that gap is called out explicitly.

### 1.3 Scope of review
- Backend: [src/Api/](../src/Api/), [src/Application/](../src/Application/), [src/Domain/](../src/Domain/), [src/Infrastructure/](../src/Infrastructure/)
- Admin frontend: [time-attendance-frontend/](../time-attendance-frontend/)
- Self-service frontend: [time-attendance-selfservice-frontend/](../time-attendance-selfservice-frontend/)
- Tests under [tests/](../tests/) used where they confirm behavior
- The [CLAUDE.md](../CLAUDE.md) project guidelines were used as orientation but every fact below is re-verified against code

### 1.4 Intended audience
- HR leadership and process owners
- Finance / payroll function leads
- Product owners and business analysts
- Audit, compliance, and risk reviewers
- Implementation partners and system integrators
- Architecture and engineering leadership

### 1.5 Conventions
Throughout this document, claims are tagged where material:
- **[Implemented]** — directly observable in code
- **[Inferred]** — reasonable reading of code structure/naming; not directly demonstrated
- **[Gap / Partial]** — backend-only, UI-missing, deferred, or otherwise not business-complete

---

## 2. System Overview

### 2.1 What the system is
TecAxle HRMS is an enterprise Human Resource Management and Workforce Management System covering the full employee lifecycle: recruitment, onboarding, time & attendance, leave, shifts, payroll, compensation, performance, training, employee relations, and offboarding. It serves HR administrators, payroll administrators, line managers, and end employees through a unified web platform with bilingual (English + Arabic, RTL-aware) support.

### 2.2 Business purpose
The system automates HR operations that are historically fragmented across spreadsheets, paper forms, and siloed vendor tools. It enforces policy consistently, maintains a single employee record of truth, produces auditable trails for compliance, and provides operational visibility to HR and leadership.

### 2.3 High-level operating model
- **Single company, multi-branch.** The system operates as a single business entity (TecAxle), organized internally into multiple branches and hierarchical departments. A company-level settings singleton governs global policy, with branch- and department-level overrides.
- **Role-based, permission-gated.** Every action is governed by roles (SystemAdmin, HRManager, Manager, Employee, etc.) and ~223 fine-grained authorization policies across ~70 resources × 26 actions.
- **Branch-scoped data access.** Users see only the branches they are assigned to via `UserBranchScope`, except SystemAdmin who sees everything.
- **Workflow-driven approvals.** Business requests (leave, remote work, allowance, loan, expense, letter, etc.) flow through a configurable multi-step approval engine before taking effect.
- **Policy-driven automations.** Background jobs handle attendance generation, auto-checkout, leave accruals, contract/visa/document expiry alerts, lifecycle transitions, and operational failure surfacing.
- **Two user-facing web portals.** An **Admin Portal** (port 4200) for HR, payroll, and management operations, and a **Self-Service Portal** (port 4201) for employees and their line managers.

### 2.4 Current deployment context
- Backend: .NET 9 Web API on `http://localhost:5099` during development; production at `https://api.clockn.net` on Ubuntu 24.04
- Database: PostgreSQL 15+ (tested on 18), single database `tecaxle_hrms`
- Admin Portal: Angular 20 on `http://localhost:4200` / production `https://www.clockn.net` (Cloudflare Pages)
- Self-Service Portal: Angular 20 on `http://localhost:4201` / production `https://portal.clockn.net`
- Real-time: SignalR hub at `/hubs/notifications`

### 2.5 Single-company note
The codebase was collapsed from a multi-tenant SaaS to a single-company HRMS in v14.0 and finished the rename from `Tenant*` to `Company*` by v14.7. There is now exactly one database, one `TecAxleDbContext`, and one settings singleton (`CompanySettings`). Login is single-step email + password with no tenant resolution step. The Flutter mobile app and all mobile-specific backend surface (FCM push, NFC, GPS verification, dedicated mobile endpoints) were removed in v14.8.

---

## 3. Business Scope

### 3.1 In-scope (fully operational)
1. **Organization management** — branches (with GPS metadata), departments (hierarchical), job grades, roles, permissions, users, user-branch scopes
2. **Employee management** — employee master, active / suspended / pre-hire states, sub-entities (address, bank, dependents, education, work experience, visa, emergency contact)
3. **Employee lifecycle** — contracts, promotions, transfers, salary adjustments, probation tracking
4. **Recruitment** — job requisitions, postings, candidates, applications, interview scheduling & feedback, offer letters
5. **Onboarding** — templates, processes per employee, tasks with deadlines and overdue alerts, documents
6. **Time & attendance** — daily automated records, check-in/out transactions, late/early/overtime calculation, shift-driven auto-checkout, attendance corrections
7. **Shift management** — regular/flexible/split/rotating/night shifts, shift periods, shift assignments (employee/department/branch scope with priority), shift swap requests, on-call scheduling
8. **Leave management** — vacation types, vacation policies, employee vacations, leave balances, leave entitlements, accrual policies, monthly accrual and carry-over expiry jobs, leave encashments, compensatory offs
9. **Excuse management** — excuse policies, excuse requests with attachments
10. **Remote work** — remote work policies, remote work requests
11. **Approval workflows** — configurable multi-step workflow engine with approver-type resolution, delegation, escalation, timeouts, return-for-correction, resubmit, fallback routing, validation rules
12. **Post-approval execution** — six approval executors (allowance, loan, salary advance, expense, benefit, letter) that materialize approved requests into downstream artifacts
13. **Payroll & compensation** — payroll periods, payroll records, line-itemized detail, tax, social insurance, overtime pay, absence deduction, effective-dated inputs, calendar policy, end-of-service policy, two-pass allowance algorithm, admin-unlock for paid periods
14. **Compensation ancillaries** — allowance types/policies/assignments/requests/change-logs, loan types/policies/applications/repayments, salary advances, benefit plans/enrollments/claims, expense categories/policies/claims, letter templates/requests
15. **Performance management** — review cycles, reviews (self-assessment → manager review), goals, competencies & competency assessments, performance improvement plans (with follow-through), 360-feedback requests and responses
16. **Training & development** — categories, courses, programs, sessions, enrollments, certifications, budgets, evaluations, attendance tracking, career paths
17. **Succession planning** — key positions, talent profiles, succession plans, talent pool
18. **Employee relations** — grievances (with SLA), disciplinary actions, investigations, counseling records
19. **Asset management** — categories, assets, assignments (with overdue tracking), maintenance
20. **Document management** — document categories, employee documents, company policies, letter templates, letter requests (with file attachments)
21. **Announcements** — scheduled publish, expiry, categories, bilingual content
22. **Surveys** — templates, distributions, participants, responses, reminder/expiry jobs
23. **Offboarding** — resignation requests, termination records, clearance checklists, final settlements, exit interviews
24. **Analytics & reporting** — daily analytics snapshots, monthly rollups, attendance/leave/payroll/custom/compliance/session/audit reports, scheduled reports, executive dashboards
25. **Operations visibility** — operational alerts (silent-failure surfacer, approval-execution failures, lifecycle failures), work queues, approved-but-not-executed list, global search omnibox
26. **Security & audit** — JWT auth, 2FA (TOTP + backup codes), session tracking, password history, blacklisted tokens, login lockout, comprehensive audit log with field-level changes
27. **Notifications** — SignalR real-time, bilingual in-app notifications, recipient role resolver, read tracking
28. **File upload & attachment** — centralized local-disk storage with entity-linked attachments (10 MB max, typed)
29. **Company configuration** — general, attendance, leave, payroll, approval, notification, security, thresholds, lifecycle, workflow routing — with branch/department overrides
30. **Timesheets** — timesheet periods (weekly/biweekly/monthly), timesheets, auto-generation, submission reminders, auto-closure
31. **Projects** — projects and project tasks (supporting timesheets and potentially resource allocation)

### 3.2 Out-of-scope / intentionally removed
- **Multi-tenant SaaS architecture** — removed in v14.0; no tenant resolution, no subscription plans, no module entitlement layer
- **Flutter mobile ESS app** — removed in v14.8; no iOS / Android client, no FCM push, no NFC attendance, no GPS location verification, no mobile-only endpoints, no notification broadcasts. Branch latitude / longitude / geofence radius are retained as metadata only.
- **Module-level feature flags / subscription entitlements** — every module is always enabled
- **Platform admin UI** (tenants, subscription plans) — gone

### 3.3 Business boundaries (current)
- **One legal entity** (TecAxle) — multi-company is not supported
- **One database, one runtime** — the system is not multi-tenant
- **Web-only employee channel** — employees transact via the Self-Service Portal browser app; there is no native app
- **Local file storage** — file uploads go to local disk under `uploads/`; no built-in S3/blob integration has been observed in current code
- **Email / SMS channels** — not wired as first-class delivery (notifications are in-app/SignalR); scheduled reports framework exists but actual email delivery is **[Gap]** (TODO in `ScheduledReportExecutionJob`)

---

## 4. Business Actors and Roles

### 4.1 Role taxonomy
Roles are data-driven (stored in `Role` entity with `RolePermission` mappings). The following roles are seeded or referenced by policy code:

#### 4.1.1 SystemAdmin
- **Responsibility:** Overall system custodianship, privileged operations
- **Main actions:** All CRUD across all modules; admin-unlock of paid payroll periods; role/permission management; company configuration edits; cross-branch visibility
- **Access scope:** Full (no branch scope applied)
- **Approval responsibilities:** May act as fallback approver when configured
- **Operational responsibilities:** Resolve operational alerts; manage workflow definitions; seed / correct policy data; handle escalations

#### 4.1.2 HRManager (and "HR" in legacy paths)
- **Responsibility:** HR operations, lifecycle, compliance
- **Main actions:** Employee master maintenance, contracts, transfers, promotions, onboarding, offboarding, leave policies, allowance/loan policies, grievances, training, public holidays, review cycles
- **Access scope:** Branch-scoped unless explicitly permitted
- **Approval responsibilities:** Receives HR-targeted workflows (alert notifications, fallback approvals when `WorkflowFallbackApproverRole="HRManager"`)
- **Operational responsibilities:** Resolve operational failure alerts; trigger final settlement calculation; manage clearance checklists

#### 4.1.3 Manager (Line Manager, Department Head, Branch Manager)
- **Responsibility:** First-line approvals for direct reports, team oversight
- **Main actions:** Approve/reject leave, excuses, remote work, attendance corrections, shift swaps, timesheets, goals, performance reviews; view team attendance; delegate approvals
- **Access scope:** Own team / department / branch (based on `Department.ManagerEmployeeId` or `Branch.ManagerEmployeeId`)
- **Approval responsibilities:** Primary approver for most employee-initiated requests
- **Operational responsibilities:** Follow up on PIP outcomes, complete performance review cycles, monitor overdue onboarding tasks

#### 4.1.4 Employee (regular user)
- **Responsibility:** Self-service of personal HR matters
- **Main actions:** Clock in/out, request leave, excuse, remote work, shift swap, attendance correction, submit timesheet, request allowance/loan/advance/expense/letter, fill surveys, track training enrollments, view payslips
- **Access scope:** Strictly own data (pending approvals filtered by assignment)
- **Approval responsibilities:** None by default; may receive delegated approvals
- **Operational responsibilities:** Respond to assigned onboarding tasks, complete self-assessments, acknowledge disciplinary actions

#### 4.1.5 Workflow-resolved roles (runtime)
The workflow engine resolves approvers by type, not by static role:
- **DirectManager** — resolved via reporting structure on the employee record
- **DepartmentHead** — `Department.ManagerEmployeeId`
- **BranchManager** — `Branch.ManagerEmployeeId`
- **Role-based** — one user from a role pool via strategy (see §8)
- **SpecificUser** — explicit user ID
- **System** — system action (no human)

#### 4.1.6 Technician / Specialist roles
- **Fingerprint technician** **[Inferred]** — assigned on `FingerprintRequest`; responsible for enrollment/update/repair scheduling
- **Counselor** — assigned on `CounselingRecord`; notified of follow-up reminders
- **Assigned/Escalated user** (grievance workflow) — notified of SLA breaches

#### 4.1.7 System user
A dedicated `IsSystemUser=true` account (two seeded: `tecaxleadmin@system.local`, `systemadmin@system.local`) is resolved via `ISystemUserResolver` and used as the attribution actor for system-driven actions (timeouts, escalations, auto-approvals, auto-rejections, fallback routing) so audit trails never show "user 0".

### 4.2 Role–scope interactions
- A user's **effective access** is the intersection of role permissions, user-branch scopes, and entity ownership (e.g., an employee cannot see another employee's pending approvals even if their role would theoretically allow it).
- SystemAdmin bypasses branch scope checks.
- Employees with manager privileges (resolved through reporting links rather than role) receive their team's approvals automatically.

---

## 5. Functional Modules

The following table summarizes the implemented modules; each is elaborated with processes (§6), rules (§7), and automation (§9) later.

| # | Module | Business objective | Main users | Key dependencies |
|---|---|---|---|---|
| 1 | **Authentication & Authorization** | Secure access with RBAC + branch scope | All | — |
| 2 | **Organization** (Branches, Departments, Users, Roles, Permissions) | Define the operating structure | SystemAdmin, HRManager | — |
| 3 | **Employees** (+ sub-entities) | Maintain the authoritative employee record | HRManager, Manager, Employee | Organization |
| 4 | **Employee Lifecycle** (Contracts, Promotions, Transfers, Salary Adjustments, Job Grades) | Track contractual and structural changes | HRManager, Finance | Employees, Payroll |
| 5 | **Time & Attendance** | Capture, calculate, finalize attendance | All | Shifts, Leave, Overtime, Public Holidays |
| 6 | **Shifts** (Shifts, ShiftAssignments, ShiftSwap, OnCall) | Define working time rules and assignments | HRManager, Manager | Attendance |
| 7 | **Leave Management** (Vacation Types, Vacations, Balances, Entitlements, Accrual Policies, Encashments, Compensatory Offs) | Manage paid absence | All | Attendance, Payroll |
| 8 | **Excuse Management** | Short-term exception requests | Employee, Manager | Attendance |
| 9 | **Remote Work** | Approved remote/hybrid work | Employee, Manager | Attendance |
| 10 | **Approval Workflows** | Configurable multi-step approvals | All (roles vary) | Cross-cutting |
| 11 | **Approval Execution** | Apply approved outcomes downstream | System (via executors) | Workflows + target modules |
| 12 | **Payroll** (Periods, Records, Detail, Settings, Tax, SI, Calendar Policy, Overtime Config, Run Audit) | Produce legally compliant, auditable payroll | Payroll Admin, HRManager | Employees, Attendance, Leave, Compensation ancillaries |
| 13 | **Allowances** (Types, Policies, Assignments, Requests, Change Logs) | Non-base compensation items | HRManager, Finance, Employee | Payroll |
| 14 | **Loans** (Types, Policies, Applications, Repayments) | Employee loans | HR, Finance, Employee | Payroll |
| 15 | **Salary Advances** | Advance against future salary | HR, Finance, Employee | Payroll |
| 16 | **Benefits** (Plans, Enrollments, Claims, Open Enrollment Periods) | Health / insurance / perks | HR, Finance, Employee | Payroll |
| 17 | **Expenses** (Categories, Policies, Claims) | Expense reimbursement | Employee, Manager, Finance | Payroll |
| 18 | **Letters** (Templates, Requests) | Employment / salary / visa / custom letters | Employee, HR | Documents |
| 19 | **End-of-Service** (Policies, Calculator, Benefit record) | Compute and pay EOS | HR, Finance | Offboarding, Payroll |
| 20 | **Recruitment** (Requisitions, Postings, Candidates, Applications, Interviews, Offers) | Hiring funnel | HR, Hiring Manager | Employees (pre-hire) |
| 21 | **Onboarding** (Templates, Processes, Tasks, Documents) | New-hire orientation | HR, new hire, line manager | Employees, Lifecycle Automation |
| 22 | **Performance** (Cycles, Reviews, Goals, Competency Frameworks, PIPs, 360 Feedback) | Performance management | HR, Manager, Employee | Employees |
| 23 | **Training** (Categories, Courses, Programs, Sessions, Enrollments, Certifications, Budgets, Evaluations, Attendance) | L&D | HR, Employee | Performance |
| 24 | **Succession** (Key Positions, Talent Profiles, Plans, Career Paths) | Succession planning | HR, Senior mgmt | Employees, Performance |
| 25 | **Employee Relations** (Grievances, Disciplinary, Investigations, Counseling) | People issues | HR, Manager, Employee | Employees |
| 26 | **Assets** (Categories, Assets, Assignments, Maintenance) | Corporate property & warranty | HR, IT/Facilities | Employees |
| 27 | **Documents** (Categories, Employee Documents, Company Policies, Letters) | Document repository | HR, Employee | File upload |
| 28 | **Announcements** | Company-wide communication | HR, All | Notifications |
| 29 | **Surveys** (Templates, Distributions, Responses) | Engagement surveys | HR, Employee | Notifications |
| 30 | **Offboarding** (Resignations, Terminations, Clearance, Final Settlements, Exit Interviews) | Controlled exits | HR, Finance, Employee | Employees, Payroll, EOS |
| 31 | **Timesheets** (Periods, Timesheets) | Project / branch-level time reporting | Employee, Manager | Attendance, Projects |
| 32 | **Projects** (Projects, Tasks) | Project reference for timesheets | HR / PM | Timesheets |
| 33 | **Analytics** (Snapshots, Monthly Rollups, Saved Dashboards) | Executive reporting | Exec, HR | Cross-cutting |
| 34 | **Reports** (Attendance, Leave, Payroll, Custom, Compliance, Session, Audit, Scheduled Reports) | Regulatory + operational reporting | HR, Finance, Audit | Cross-cutting |
| 35 | **Operations** (Operational Alerts, Work Queues, Approved-Not-Executed, Global Search, Ops Dashboard) | Operational visibility & recovery | HR, Operations | Lifecycle Automation, Approval Execution |
| 36 | **Notifications** | Real-time + stored in-app notifications | All | Cross-cutting |
| 37 | **Company Configuration** | Central policy singleton with branch / department overrides | SystemAdmin, HRManager | Cross-cutting |
| 38 | **Audit** (Audit Logs) | Field-level change history | Audit, SystemAdmin | Cross-cutting |
| 39 | **Public Holidays** | Holiday calendar (optionally branch-specific, recurring, bilingual) | HR | Attendance, Payroll |

---

## 6. End-to-End Business Processes

Each sub-section below documents a business process in business language, derived from code.

### 6.1 Employee onboarding (from offer to active)
**Business purpose:** Convert an accepted offer into a fully onboarded, active employee with minimal manual effort.

**Trigger:** `OfferAcceptedEvent` published when a recruitment offer is accepted.

**Preconditions:**
- Offer is in accepted state
- Employee record (typically `IsPreHire=true, IsActive=false`) has been created or will be created by handler
- `LifecycleAutomationEnabled = true` and `AutoCreateOnboardingOnOfferAcceptance = true`

**Main flow:**
1. `OfferAcceptedHandler` receives event
2. Handler resolves onboarding template: `DefaultOnboardingTemplateId` → department default → branch default → `IsDefault` fallback
3. Handler invokes `CreateOnboardingProcessFromOfferCommand` to create `OnboardingProcess` from the selected template
4. Template tasks are copied into `OnboardingTask` rows with due dates and assignees
5. Template documents are copied into `OnboardingDocument` slots
6. Audit row written to `LifecycleAutomationAudit` (status `Succeeded`)
7. Onboarding tasks appear in the new hire's self-service portal and HR task queue
8. Overdue tasks are flagged daily by `OnboardingTaskOverdueJob` and notified to employee + HR
9. When HR marks the onboarding process **Complete**, `OnboardingCompletedEvent` publishes
10. `OnboardingCompletedHandler`:
   - Always stamps `Employee.OnboardingCompletedAt` (milestone)
   - If `AutoActivateEmployeeOnOnboardingComplete = true` (default **false**): sets `Employee.IsActive = true`, `IsPreHire = false`

**Alternate flows:**
- **No template configured:** handler writes audit row with `MissingPrerequisite` status, notifies HR, does not create process
- **Employee already has an active process:** handler writes `Skipped` audit row (idempotency)
- **Duplicate event:** `DuplicateSuppressed` via audit table

**Exception flows:**
- Handler exception caught by `ILifecycleEventPublisher` wrapper — never propagates to triggering command. Writes `Failed` audit row; the hourly `OperationalFailureSurfacerJob` raises an `OperationalFailureAlert` visible to HR ops dashboard.

**Status transitions:**
- `OnboardingProcess.Status`: Pending → InProgress → Complete (or Cancelled)
- `OnboardingTask.Status`: Pending → InProgress → Overdue (auto) → Completed (or Cancelled)

**Final outcome:** Employee is **onboarded** (milestone stamped) and optionally **activated**; all onboarding tasks are closed.

**Users/roles:** HR (manages template, supervises), Line Manager (confirms task completions), New Hire (self-service portal tasks)

**Automation points:** `OfferAcceptedHandler`, `OnboardingTaskOverdueJob`, `OnboardingCompletedHandler`

**Related modules:** Recruitment, Employees, Notifications, Lifecycle Automation

### 6.2 Attendance capture and finalization
**Business purpose:** Produce a daily, rule-consistent attendance record per employee, suitable for payroll and compliance.

**Trigger:** Daily scheduled jobs + real-time check-in/out transactions.

**Preconditions:** Active employee with shift assignment; shift defines working hours, grace period, overtime rules.

**Main flow:**
1. **2:00 AM:** `DailyAttendanceGenerationJob` pre-creates `AttendanceRecord` rows for every active employee for the coming day, initialized based on shift + off-day rules.
2. **Throughout the day:** `AttendanceTransaction` rows are written via:
   - Biometric device feeds (check-in / check-out / break-start / break-end)
   - Manual entries by HR (manual override, tracked with `IsManualOverride=true`)
   - `AttendanceCorrectionRequest` approvals (post-hoc corrections)
3. **Hourly:** `ShiftDrivenAutoCheckOutJob` scans employees whose effective shift end + grace period has passed without a check-out, and synthesizes an `AutoCheckOut` transaction. Idempotent: skips if check-out already exists.
4. `AttendanceCalculationService` recomputes working hours, late/early minutes, overtime hours using the applicable `OvertimeConfiguration` day-type rules.
5. Attendance status is derived (Present, Absent, Late, EarlyLeave, OnLeave, DayOff, Overtime, Holiday, SickLeave, OnDuty, Excused, RemoteWork, Incomplete).
6. **11:59 PM:** `EndOfDayAttendanceFinalizationJob` recalculates yesterday's records and transitions pending statuses to their final value (e.g. Pending → Absent).

**Alternate flows:**
- **Leave / remote work / excuse approved for that day:** attendance record reflects the approved status (OnLeave / RemoteWork / Excused) instead of being absent.
- **Public holiday or off-day:** status is Holiday or DayOff; not counted as absent.
- **Attendance correction request:** after manager approval, a new transaction is inserted and calculation reruns.

**Exception flows:**
- Employee without a shift assignment is skipped by the auto-checkout and generation jobs (logged, not errored).
- Finalization of a record blocks further modification (`IsFinalized=true`).
- Failed individual employee generations are logged but do not stop the batch.

**Status transitions:**
- `AttendanceRecord.Status`: Pending → {Present, Absent, Late, OnLeave, ...} → final on finalization
- `AttendanceTransaction.TransactionType`: CheckIn, CheckOut, BreakStart, BreakEnd (+ `AutoCheckOut`)

**Final outcome:** An immutable daily attendance record per employee, suitable for payroll absence deduction and overtime pay.

**Users/roles:** Employee (punches), Manager (approves corrections, reviews), HR (manual overrides, policy), System (auto-checkout, finalization)

**Automation points:** `DailyAttendanceGenerationJob` (2 AM), `ShiftDrivenAutoCheckOutJob` (hourly), `EndOfDayAttendanceFinalizationJob` (23:59)

### 6.3 Leave request to attendance effect
**Business purpose:** Allow employees to request paid absence, validate balance, route through approval, and reflect on attendance.

**Trigger:** Employee submits a vacation request from Self-Service Portal.

**Preconditions:**
- Vacation type is active; employee has sufficient balance in `LeaveBalance`
- Request does not exceed `MaxVacationDaysPerRequest` or `MaxVacationFuturePlanningYears`
- Employee has approved leave accrual policy/entitlement

**Main flow:**
1. Employee creates `EmployeeVacation` with date range, reason, optional attachments
2. FluentValidation checks: date sanity, balance sufficiency, window limits (via `IValidationSettingsProvider`)
3. Workflow instance is created from the applicable `WorkflowDefinition` (entity type = Vacation); definition snapshot captured in `DefinitionSnapshotJson`
4. Step 1 typically assigns to the employee's direct manager; optional steps to HR / department head / branch manager
5. Approval / rejection / delegation / return-for-correction actions are recorded on `WorkflowStepExecution`
6. On final approval: `RequestFinallyApprovedEvent` publishes; workflow status → `Approved`
7. **[Inferred]** The vacation entity is marked approved and reserves balance in `LeaveBalance`; daily attendance for the affected days reflects `OnLeave`
8. Notifications fire at each step via SignalR + in-app store (bilingual)

**Alternate flows:**
- **Rejected:** workflow status → `Rejected`; employee notified with reason
- **Returned for correction:** step action returns request to employee; they amend and resubmit (up to `MaxWorkflowResubmissions` = 3 default)
- **Delegated:** approver passes to another user within `MaxWorkflowDelegationDepth` (default 2)
- **Timeout:** `WorkflowTimeoutProcessingJob` applies configured action (Expire / Escalate / AutoApprove / AutoReject)

**Exception flows:**
- **Validation rule failure** (e.g., `VacationBalanceRule`): validation step auto-rejects
- **No approver resolvable:** fallback chain (explicit user → fallback role → `FailedRouting` + operational alert to HR)
- **Carry-over expiry** impacts balance: `LeaveCarryoverExpiryJob` enforces `CarryOverExpiryMonths` annually — negative adjustments applied idempotently

**Status transitions:**
- `WorkflowInstance.Status`: Pending → InProgress → Approved | Rejected | Cancelled | Expired | ReturnedForCorrection → Approved | FailedRouting
- **[Inferred]** Vacation request status mirrors workflow status (Pending → Approved / Rejected / Cancelled)
- `LeaveBalance.ReservedDays` / `UsedDays` / `AccruedDays` adjust per `LeaveTransaction` events

**Final outcome:** Balance deducted; attendance records show `OnLeave`; payroll absence-deduction calculator sees these as paid days (or unpaid, depending on vacation type).

**Users/roles:** Employee, Manager (primary approver), HR (policy + fallback), System (timeout, carry-over expiry)

**Automation points:** `MonthlyLeaveAccrualJob`, `LeaveCarryoverExpiryJob`, `WorkflowTimeoutProcessingJob`

### 6.4 Payroll processing (monthly)
**Business purpose:** Produce line-itemized, policy-compliant, auditable payroll with a controlled approval-to-paid lifecycle.

**Trigger:** HR / payroll admin creates a `PayrollPeriod` and issues `POST /api/v1/payroll-periods/{id}/process`.

**Preconditions:**
- Period is in `Draft` status and not locked
- Effective-dated inputs exist: salary segments, tax config, social insurance config, overtime configurations, calendar policy, end-of-service policy (if needed), active allowance assignments, approved benefit enrollments, active loan repayments, approved salary advances, approved expenses, approved letter-driven salary changes
- Active `PayrollCalendarPolicy` defines `BasisType` (CalendarDays / WorkingDays / FixedBasis)

**Main flow:**
1. `ProcessPayrollPeriodCommandHandler` opens a `PayrollRunAudit` row (`RunType=InitialProcess, Status=Running`), snapshots resolved config IDs and dates into `ConfigSnapshotJson`
2. For each active employee with matching branch scope:
   - `IPayrollInputResolver` assembles a `PayrollCalculationContext` (salary segments, allowance assignments, attendance records, tax config, SI config, employee insurance enrollment, benefit enrollments, OT configs per date, calendar policy, public holidays, adjustments)
   - `IPayrollCalculationService` runs multi-pass calculation:
     - **Pass 1:** fixed + `PercentageOfBasic` allowances
     - **Overtime:** day-type-aware (Normal / PublicHoliday / OffDay) via `IOvertimePayCalculator` + `OvertimeConfiguration.GetOvertimeRate/RoundOvertimeHours/MeetsMinimumThreshold`
     - **Pass 2:** `PercentageOfGross` allowances (computed against provisional gross = base + Pass-1 allowances + overtime)
     - **Deductions:** absence (base / `dailyBasisDays`), loan installments, salary advances, benefit contributions, insurance, tax
     - **Tax:** progressive brackets via `ITaxCalculator`; applies `AllowanceType.IsTaxable` filter
     - **Social insurance:** `ISocialInsuranceCalculator` with `IsSocialInsurable` filter, `MaxInsurableSalary` cap, nationality filter via `AppliesToNationalityCode`, employee + employer lines
     - **Proration:** `IProrationCalculator.GetFraction` for effective-dated inputs
   - Line-itemized `PayrollRecordDetail` rows written for every contribution
   - Per-employee `PayrollRunAuditItem` row with snapshot totals and any warnings
3. `PayrollRecord` persists with `Status=Calculated`, `CalculationBreakdownJson` containing full forensic snapshot
4. `PayrollPeriod.Status: Draft → Processing → Processed`

**Alternate flows:**
- **Recalculation:** `POST /{id}/recalculate` — soft-deletes non-finalized records, reverses payroll-linked side-effects (loans/advances/expenses) via `PayrollSideEffectReverser`, reruns calculation. `RunType=Recalculation`.
- **Approval:** `POST /{id}/approve` — `Processed → Approved`
- **Mark paid:** `POST /{id}/mark-paid` — `Approved → Paid`; sets `LockedAtUtc` on period + all records; records become immutable (`Status=Finalized`)
- **Cancel:** `POST /{id}/cancel` — cancels if not locked; reverses side-effects
- **Admin unlock:** `POST /{id}/admin-unlock` — **SystemAdmin only, reason required** — unlocks Paid period, reverts records to Calculated, reverses side-effects via `PayrollSideEffectReverser.ReverseAllInPeriodAsync`

**Exception flows:**
- Per-employee failures recorded in `PayrollRunAuditItem` with `ErrorMessage`; batch continues
- Missing tax config → tax = 0 + warning captured
- Missing social insurance enrollment → SI = 0 + warning
- Calendar policy returning 0 days → fallback to period's calendar days
- Attempting to mutate a locked record or paid period is rejected

**Status transitions:**
- `PayrollPeriod.Status`: Draft → Processing → Processed → Approved → Paid (🔒) | Cancelled
- `PayrollRecord.Status`: Pending → Calculated → Adjusted → Finalized (on period mark-paid); `LockedAtUtc` set when period paid; readable via `IsLocked`

**Final outcome:** A legally traceable, explainable payroll run with append-only audit trail, side-effects reversible before payment, locked on payment, and unlockable only with privileged admin action + justification.

**Users/roles:** Payroll Admin, HR, SystemAdmin (for admin-unlock)

**Automation points:** `BenefitDeductionSyncJob` pre-populates benefit deductions into open Draft periods monthly

**Related modules:** Employees, Attendance, Leave, Allowances, Loans, Salary Advances, Benefits, Expenses, End-of-Service

### 6.5 Approval request to downstream execution
**Business purpose:** Convert an approved request (allowance/loan/advance/expense/benefit/letter) into a real downstream artifact — automatically, idempotently, and safely.

**Trigger:** Workflow transitions to `Approved` and publishes `RequestFinallyApprovedEvent`.

**Preconditions:**
- Workflow instance in `Approved` status
- An `IApprovalExecutor` is registered for the entity type

**Main flow:**
1. `RequestFinallyApprovedHandler` receives the event
2. Handler maps `EntityType` to its executor:
   - `AllowanceRequest` → `AllowanceRequestExecutor` → create/update `AllowanceAssignment` (New/Increase/Decrease/Remove/Temporary)
   - `LoanApplication` → `LoanApplicationExecutor` → create `LoanRepayment` schedule
   - `SalaryAdvance` → `SalaryAdvanceExecutor` → create advance deduction
   - `ExpenseClaim` → `ExpenseClaimExecutor` → create reimbursement instruction
   - `BenefitEnrollment` → `BenefitEnrollmentExecutor` → activate enrollment
   - `LetterRequest` → `LetterRequestExecutor` → generate letter document
3. Executor issues `ExecuteApprovalCommand`; outcome recorded as `ExecutionOutcome` (Succeeded / AlreadyExecuted / NotReady / ValidationFailed / Failed)
4. Idempotency: executor flips `IsExecuted` marker; re-runs are safe and return `AlreadyExecuted`
5. Downstream entities become eligible for inclusion in next payroll run

**Alternate flows:**
- **No executor registered** (e.g., Vacation, Excuse, RemoteWork, AttendanceCorrection, ShiftSwap, Overtime request): no automatic downstream artifact; affected systems read request status directly
- **Failed execution:** `OperationalFailureAlert` created (category `ApprovalExecution`) with `IsRetryable` flag; approver HTTP response remains 200; HR sees alert on dashboard
- **Validation failure** (e.g., missing letter template): `ValidationFailed` outcome, alert raised

**Exception flows:** See §8 below; failure alerts, idempotent retries, and an "Approved-but-Not-Executed" list in the admin ops dashboard provide recovery paths.

**Final outcome:** Approved business request materialized as a concrete downstream artifact (assignment, repayment, reimbursement, enrollment, letter).

**Users/roles:** Approver (acts), System (executes), HR (resolves failures)

### 6.6 Resignation to deactivation (offboarding)
**Business purpose:** Orchestrate a compliant exit from resignation submission to final deactivation, preserving settlement, clearance, and optional EOS computation.

**Trigger:** Employee submits `ResignationRequest` via Self-Service Portal.

**Preconditions:**
- Employee is active
- `LifecycleAutomationEnabled = true`

**Main flow:**
1. Request enters workflow; manager + HR approval chain applies
2. Final approval publishes `ResignationApprovedEvent`
3. `ResignationApprovedHandler` (if `AutoCreateTerminationOnResignationApproved = true`, **opt-in, default false**): creates `TerminationRecord`
4. `TerminationCreatedEvent` publishes
5. `TerminationCreatedHandler` runs two **independent** sub-steps (per-substep audit rows):
   - **Clearance:** if `AutoCreateClearanceOnTermination = true` (default true): creates `ClearanceChecklist` from `DefaultClearanceTemplateId` or 8-item hardcoded fallback (IT, access revocation, asset return, ID card, etc.)
   - **Suspend employee:** if `AutoSuspendEmployeeOnTerminationCreated = true` (default true): sets `Employee.IsSuspended=true` and `User.IsActive=false` — employee can no longer log in but record is preserved
6. HR / relevant owners complete each `ClearanceItem`; when all are complete, checklist is marked `Completed`
7. `ClearanceCompletedEvent` publishes
8. `ClearanceCompletedHandler`:
   - Always notifies HR "Clearance complete — final settlement unblocked"
   - If `AutoEnableFinalSettlementCalcOnClearanceComplete = true` (opt-in, default false): calls `CalculateFinalSettlementCommand` immediately
9. `FinalSettlement` is calculated: last salary, accrued leave cash-out, EOS benefit per `EndOfServicePolicy` (Saudi default seeded; snapshot persisted on `EndOfServiceBenefit.AppliedPolicySnapshotJson`), loans / advances settlements, expense reimbursements — assembled as a final pay output
10. HR marks final settlement as `Paid`
11. `FinalSettlementPaidEvent` publishes
12. `FinalSettlementPaidHandler` (if `AutoDeactivateEmployeeOnFinalSettlementPaid = true`, default true): sets `Employee.IsActive=false` — fully off-boarded
13. Optionally `ExitInterview` is recorded

**Alternate flows:**
- **Resignation rejected:** no downstream action; resignation request stays rejected
- **Resignation withdrawn:** cancels workflow
- **Direct termination** (not from resignation): HR creates `TerminationRecord` directly; same handler fires for clearance + suspend substeps

**Exception flows:**
- If clearance requires completion before settlement (`RequireClearanceCompleteBeforeFinalSettlement = true`): final settlement calculation is blocked until clearance complete
- Handler failures write `Failed` audit rows; `OperationalFailureSurfacerJob` surfaces alerts
- Fallback to hardcoded 8 clearance items if no template configured — keeps process moving

**Status transitions:**
- `ResignationRequest`: Pending → Approved → (Terminated) | Rejected | Withdrawn / Cancelled
- `TerminationRecord`: created → completed
- `ClearanceChecklist`: created → InProgress → Completed
- `FinalSettlement`: Calculated → Approved → Paid
- `Employee`: Active → Suspended (interim) → Inactive (post-settlement)
- `User`: IsActive=true → IsActive=false (at suspend)

**Final outcome:** Employee fully off-boarded with a complete audit trail: resignation, termination, clearance, settlement, EOS, optional exit interview.

**Users/roles:** Employee, Manager, HR, Finance (settlement approval), SystemAdmin (override suspended/inactive)

**Automation points:** 4 lifecycle event handlers (`ResignationApprovedHandler`, `TerminationCreatedHandler`, `ClearanceCompletedHandler`, `FinalSettlementPaidHandler`); `ContractExpiryAlertJob` can also kick this off (see §6.7)

### 6.7 Contract expiry handling
**Business purpose:** Eliminate the "silent contract expired, still Active" bug.

**Trigger:** Daily `ContractExpiryAlertJob` at 3:00 AM.

**Main flow:**
1. Pre-expiry alerts at configured windows (`ContractExpiryAlertDaysCsv` default "30,15,7") — creates `Notification` for HR per contract per window
2. For contracts with `Status=Active` and `EndDate <= today`: publishes `ContractExpiredEvent`
3. `ContractExpiredHandler` parses `CompanySettings.ContractExpiredAction` (default `AutoMarkExpired`; also valid: `NotifyOnly`, `Suspend`, `Deactivate`)
4. Handler invokes `ApplyContractExpiredActionCommand`
5. Safety fallback: if action is Suspend or Deactivate but employee is already inactive, downgrades to `AutoMarkExpired` to avoid double-suspension
6. Audit row written; duplicates suppressed

**Final outcome:** Expired contracts are recognized by the system — no longer silently Active.

### 6.8 PIP follow-through
**Business purpose:** Ensure an unsuccessful PIP outcome actually triggers HR action.

**Trigger:** Hourly `PipFollowThroughJob`.

**Main flow:**
1. Job scans for `PerformanceImprovementPlan` with `Status=CompletedUnsuccessful` and no `RelatedResignationRequestId`
2. For each PIP, creates a `ResignationRequest` in `Pending` status (system-initiated)
3. Sets `PIP.RelatedResignationRequestId`, `FollowThroughProcessedAt`, `OutcomeNotes`
4. Notifies HR users

**Skip conditions:** Employee missing/inactive; employee already has a non-terminal resignation request.

**Final outcome:** Failed PIPs enter the standard resignation flow, feeding into the offboarding automation chain.

### 6.9 Attendance correction
**Business purpose:** Allow HR/employee-requested corrections to historical attendance within policy.

**Trigger:** Employee or HR creates `AttendanceCorrectionRequest`.

**Main flow:**
1. Request validated against `AttendanceCorrectionMaxRetroactiveDays` (backward window)
2. Workflow approval (typically manager → HR)
3. On approval: `AttendanceTransaction` created / updated; `AttendanceRecord` recalculated
4. Not permitted on finalized records (blocked).

### 6.10 Shift swap
**Trigger:** Employee creates `ShiftSwapRequest` naming a colleague.
**Flow:** Workflow approval. On approval: shift assignments are swapped for the target date(s). Statuses: Pending → Approved / Rejected.

### 6.11 Remote work request
Policy-driven (`RemoteWorkPolicy` supports blackout periods, department eligibility). Approved requests mark attendance as `RemoteWork` instead of requiring on-site check-in.

### 6.12 Allowance / Loan / Salary Advance / Expense / Benefit / Letter request
All follow the generic pattern: employee submits → workflow approval → executor creates downstream artifact → payroll picks it up (except letters, which produce documents). See §6.5.

### 6.13 Timesheet submission
**Flow:** Hourly `TimesheetPeriodGenerationJob` creates the next `TimesheetPeriod` per branch 7 days before current ends. Employees submit timesheets (Draft → Submitted). Reminders sent by `TimesheetSubmissionReminderJob` (2 days before deadline by default). Periods auto-close by `TimesheetPeriodClosureJob` past deadline (Open → Closed).

### 6.14 Recruitment pipeline
Sequential: `JobRequisition` → `JobPosting` → `Candidate` + `JobApplication` → `InterviewSchedule` + `InterviewFeedback` → `OfferLetter`. Pipeline analytics available. Offer acceptance triggers §6.1.

### 6.15 Performance review cycle
`PerformanceReviewCycle` sets window; `PerformanceReview` per employee goes through `SelfAssessmentPending → ManagerReviewPending → Completed`. `ReviewCycleReminderJob` sends reminders at configured intervals (`ReviewReminderDaysCsv` default "7,3,1"). Tied to `GoalDefinition`, `CompetencyAssessment`, and 360 via `FeedbackRequest360` + `Feedback360Response`.

### 6.16 Grievance handling
`Grievance` has SLA-tracked lifecycle (Filed → UnderReview → InvestigationStarted → PendingResolution → Escalated → Resolved/Closed). `GrievanceSlaAlertJob` alerts overdue and approaching-due grievances to assigned + escalated + HR users.

### 6.17 Survey distribution
`SurveyDistributionActivatorJob` activates scheduled distributions when start date arrives. `SurveyReminderJob` reminds pending participants per `ReminderFrequencyDays`. `SurveyExpiryJob` closes distributions past end date and marks pending participants as Expired.

### 6.18 Asset lifecycle
Assignments tracked; `OverdueAssetReturnAlertJob` moves `AssetAssignment.Status` from Active to Overdue past return date and alerts employee + HR. `AssetWarrantyExpiryAlertJob` alerts HR on upcoming warranty expiries. Maintenance recorded on `AssetMaintenance`.

### 6.19 Operational alert resolution
Failures surfaced as `OperationalFailureAlert` (from `OperationalFailureSurfacerJob`, `IFailureAlertService`). HR / Ops can view in admin UI, retry (if `IsRetryable=true`), resolve with notes. Deduplicated by `(Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false)` — RetryCount increments instead of creating duplicates.

### 6.20 Global search / omnibox
Admin top-nav omnibox (Ctrl/⌘+K to focus; Escape to clear). Enter submits to `/global-search?q=<query>`. Portable EF queries (`.ToLower().Contains()` rather than Postgres-only `ILike`) so the search works uniformly across all back-ends including in-memory test harness.

### 6.21 Configuration maintenance
Admin UI provides 6 tabs (General, Attendance, Leave, Approval, Notification, Security) on Company Configuration; per-branch overrides at `/company-configuration/branches/{id}`. Resolved settings available via `GET /api/v1/company-configuration/resolved?branchId=&deptId=` with 5-minute cache in `ICompanySettingsResolver`.

---

## 7. Business Rules

Rules are enforced at the controller, command-handler, validator, domain, and background-job layers.

### 7.1 Authentication & access
| Rule | Description | Enforced where | Violation outcome |
|---|---|---|---|
| Email-based single-step login | `email + password` only; no tenant step | `LoginCommandHandler` | Invalid creds rejected |
| Password policy | `PasswordMinLength` configurable | Password validators | Creation/change blocked |
| Progressive lockout | `LoginLockoutPolicyJson` on `CompanySettings` | Login attempts tracker | Temporary lockout |
| Password history | Prevent reuse | Password change | Rejected |
| 2FA (TOTP + backup codes) | Per-user optional second factor | Auth flow | Login blocked until verified |
| Branch scope | Users see only assigned branches (SystemAdmin sees all) | Data queries | Empty results for out-of-scope |
| `MustChangePassword` | Forces change on first login | Login flow | Redirect to change screen |
| JWT refresh via cookie | Refresh token rotated | `/auth/refresh` | Session invalidated |
| Session blacklist | `BlacklistedToken` table | Token validation | 401 |

### 7.2 Attendance / Shift / Overtime rules
| Rule | Description | Enforced where |
|---|---|---|
| Grace period | Late threshold before marking late | Attendance calculation |
| Shift core hours | Must be present for core window | Attendance calculation |
| Shift auto-checkout | Only when shift's effective end + grace passed; idempotent | `ShiftDrivenAutoCheckOutJob` |
| Overtime thresholds | Daily/weekly/monthly minimum from `OvertimeConfiguration`; `MeetsMinimumThreshold()` + `RoundOvertimeHours()` | Overtime calculator |
| Overtime rates by day type | Normal / PublicHoliday / OffDay (depending on `WeekendAsOffDay`) | Overtime calculator |
| Correction retroactive limit | `AttendanceCorrectionMaxRetroactiveDays` | Correction validator |
| Finalized record immutable | `IsFinalized=true` blocks edits | Controllers / handlers |
| Overtime config future | Max days in future configurable via `OvertimeConfigMaxFutureDays` | Validator |

### 7.3 Leave & excuse rules
| Rule | Description | Enforced where |
|---|---|---|
| Balance validation before approval | Rejected if insufficient | `VacationBalanceRule` validation rule |
| Max per request | `MaxVacationDaysPerRequest` | Request validator |
| Max future planning | `MaxVacationFuturePlanningYears` | Request validator |
| Accrual timing | Monthly via `MonthlyLeaveAccrualJob`; respects min service months; prorated for mid-year hires | Accrual job |
| Carry-over expiry | `LeaveAccrualPolicy.CarryOverExpiryMonths`; idempotent by `ReferenceType=CarryOverExpiry + year` | Carry-over job |
| Excuse window | `ExcuseBackwardWindowDays`, `ExcuseForwardWindowDays` | Excuse request validator |
| Compensatory off expiry | Auto-expired past expiry date | `CompensatoryOffExpiryJob` |

### 7.4 Payroll & compensation rules
| Rule | Description | Enforced where |
|---|---|---|
| Effective-dated inputs | All payroll inputs resolved by overlap with period | `IPayrollInputResolver` |
| No hardcoded 30-day month | Basis from `PayrollCalendarPolicy` (CalendarDays/WorkingDays/FixedBasis) | `IPayrollCalendarResolver` |
| Taxable filter | `AllowanceType.IsTaxable` determines inclusion in taxable base | `ITaxCalculator` |
| SI-eligible filter | `AllowanceType.IsSocialInsurable` + `MaxInsurableSalary` cap | `ISocialInsuranceCalculator` |
| Nationality-filtered SI | `SocialInsuranceConfig.AppliesToNationalityCode` (null = all) | `IPayrollInputResolver` |
| Two-pass allowance | PercentageOfBasic → overtime → PercentageOfGross (avoids self-ref) | `IPayrollCalculationService` |
| Locked records immutable | `LockedAtUtc.HasValue` OR `Status=Finalized` blocks mutation | Handlers |
| Admin-unlock: SystemAdmin only, reason required | Unlocks Paid period, reverts to Processed, reverses side-effects | `PayrollPeriodsController.AdminUnlock` |
| Run audit required | `PayrollRunAudit` row written on every run operation | Process/recalc handlers |
| Side-effect reversal | Loans/advances/expenses reset when record deleted, period unlocked/cancelled | `PayrollSideEffectReverser` |
| EOS policy snapshot | `EndOfServiceBenefit.AppliedPolicySnapshotJson` captured at calculation | `IEndOfServiceCalculator` |

### 7.5 Approval-workflow rules
| Rule | Description | Enforced where |
|---|---|---|
| Definition snapshot immutable per instance | `WorkflowInstance.DefinitionSnapshotJson` is the source of truth — later definition edits don't retro-apply | Workflow engine |
| Max delegation depth | `MaxWorkflowDelegationDepth` (default 2) | Delegation resolver |
| Max resubmissions | `MaxWorkflowResubmissions` (default 3) | Resubmit handler |
| Fallback approver chain | Configured approver → `WorkflowFallbackApproverUserId` → `WorkflowFallbackApproverRole` → `FailedRouting` | Approver resolver |
| Role assignment strategies | FirstMatch / RoundRobin / LeastPendingApprovals (default) / FixedPriority | Role resolver |
| System-action attribution | Timeouts/escalations/auto-decisions attributed via `ISystemUserResolver` (never user 0) | Audit path |
| Return-for-correction allowed only where step permits | `WorkflowStep.AllowReturnForCorrection` | Return-for-correction handler |
| Only requester can resubmit | Permission check | Resubmit handler |
| Validation rule fail-closed | Unregistered validation code → auto-reject | Validation step evaluator |
| Frozen cleanup | Workflow frozen >90 days (`FrozenWorkflowCleanupDays`) → auto-cancelled | `FrozenWorkflowCleanupJob` |

### 7.6 Approval-execution rules
| Rule | Description | Enforced where |
|---|---|---|
| Idempotent execution | `IsExecuted` flag + `AlreadyExecuted` outcome | Each executor |
| Async failure, sync success | Failures → `OperationalFailureAlert`; approver HTTP always 200 | `RequestFinallyApprovedHandler` |
| Retry flag | `IsRetryable=true` for transient failures | Failure alert creation |
| Downstream safety | Post-approval artifacts are additive / reversible (via side-effect reverser for payroll-linked ones) | Executors + reverser |

### 7.7 Lifecycle automation rules
| Rule | Description | Enforced where |
|---|---|---|
| Master kill-switch | `LifecycleAutomationEnabled=false` disables all handlers | `LifecycleAutomationBase` |
| Default-preserving additivity | All 16 lifecycle settings have DB defaults preserving pre-v13.5 behavior | CompanySettings defaults |
| Idempotency | Each handler checks `LifecycleAutomationAudit` for prior success; duplicate-suppresses | `LifecycleAutomationBase` |
| No exception propagation | Handler exceptions caught by `ILifecycleEventPublisher`, recorded as `Failed` | Publisher wrapper |
| Per-substep independence | Termination clearance + suspend are independent; one failing doesn't block the other | `TerminationCreatedHandler` |
| Safety fallback | Contract expired action downgrades Suspend/Deactivate to AutoMarkExpired if already inactive | `ContractExpiredHandler` |
| Milestone vs activation separation | Onboarding completion always stamps `OnboardingCompletedAt`; activation is opt-in | `OnboardingCompletedHandler` |

### 7.8 Alert / operational rules
| Rule | Description | Enforced where |
|---|---|---|
| Alert CSV windows | Multiple pre-expiry reminders per configurable days | Each alert job |
| Dedup alerts | By `(Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false)`; RetryCount increments | `IFailureAlertService` |
| Surfacer scan window | 7 days of `LifecycleAutomationAudit` rows | `OperationalFailureSurfacerJob` |
| Notification recipients | Central resolver by `NotificationRecipientRolesCsv` (default "HRManager,SystemAdmin") | `INotificationRecipientResolver` |

### 7.9 Validation thresholds (from `CompanySettings`)
`MaxVacationDaysPerRequest`, `MaxVacationFuturePlanningYears`, `MaxShiftGracePeriodMinutes`, `ExcuseBackwardWindowDays`, `ExcuseForwardWindowDays`, `MaxUploadSizeMb`, `AttendanceCorrectionMaxRetroactiveDays`, `DefaultProbationDays`, `OvertimeConfigMaxFutureDays`, `TimesheetSubmissionReminderDaysBefore`.

### 7.10 Branch-scope rule
Non-SystemAdmin users are restricted to branches listed in their `UserBranchScope`. This scoping is applied across listing queries, search queues, and dashboard widgets.

### 7.11 Deprecation / legacy rules still active
- Legacy "HR" and "Admin" role names still resolved by some jobs (GrievanceSlaAlertJob, AssetWarrantyExpiryAlertJob, OverdueAssetReturnAlertJob) for backward compatibility, alongside the configured `NotificationRecipientRolesCsv`.
- `SalaryAdvance.DeductionMonth` was fully removed in v14.7; `DeductionStartDate`/`EndDate` is now the sole basis.
- `AutoCheckOutEnabled` / `AutoCheckOutTime` company-wide flags were removed in v14.6; `ShiftDrivenAutoCheckOutJob` is the sole source of truth.
- Mobile-specific settings (`EnableGpsAttendance`, `EnableNfcAttendance`, `EnablePushNotifications`, `MobileCheckInEnabled`, `RequireNfcForMobile`, `RequireGpsForMobile`, `AllowMockLocation`) were removed in v14.8.

---

## 8. Approval and Decision Workflows

### 8.1 Approval engine overview
A single configurable multi-step workflow engine handles every business approval. Definitions can be branch-scoped or org-wide, are versioned (running instances snapshot the definition, so in-flight approvals are unaffected by later edits), and apply to a specific entity type (Vacation, Excuse, RemoteWork, AllowanceRequest, LoanApplication, SalaryAdvance, ExpenseClaim, BenefitEnrollment, LetterRequest, AttendanceCorrection, ShiftSwap, Overtime, Timesheet, Transfer, Promotion, Resignation, FinalSettlement, Payroll period approval, etc.).

### 8.2 Approver types
- **DirectManager** — employee's direct manager from the reporting structure
- **Role** — one user from a role pool via role-assignment strategy
- **SpecificUser** — explicit user ID
- **DepartmentHead** — `Department.ManagerEmployeeId`
- **BranchManager** — `Branch.ManagerEmployeeId`
- **System** — no human; used for validation/auto steps

### 8.3 Role-assignment strategies
- **FirstMatch** — first active user (legacy, non-deterministic)
- **RoundRobin** — rotates via `WorkflowRoleAssignmentCursor` persistent cursor
- **LeastPendingApprovals** — picks user with fewest pending executions (default; best UX under variable load)
- **FixedPriority** — by `UserRole.Priority`

### 8.4 Approval actions (terminal vs non-terminal)
| Action | Terminal? |
|---|---|
| Approved | Yes (step-level; workflow terminal if last step) |
| Rejected | Yes |
| Delegated | No |
| Skipped | Yes |
| TimedOut | No (triggers configured timeout action) |
| AutoApproved / AutoRejected | Yes |
| Escalated | No |
| ReturnedForCorrection (v13.6) | No |
| Resubmitted (v13.6) | No |
| FailedNoApprover (v13.6) | Yes → `FailedRouting` |

### 8.5 Delegation, fallback, failure
- **Delegation:** Bounded by `MaxWorkflowDelegationDepth` (default 2); liveness + entity-type filter enforced via `ApprovalDelegation` (time-bound, no self-delegation; overlapping allowed for different entity types).
- **Fallback chain for approver resolution:** configured approver → `WorkflowFallbackApproverUserId` → `WorkflowFallbackApproverRole` (default "HRManager") → **`FailedRouting`** terminal status + `WorkflowSystemActionAudit` + `OperationalFailureAlert` to HR.
- **Timeouts:** Per-step `TimeoutAction` ∈ {Expire, Escalate, AutoApprove, AutoReject}; processed hourly by `WorkflowTimeoutProcessingJob` via `IWorkflowEngine.ProcessTimeoutsAsync`.
- **System-action audit:** Every system-executed action (timeout, escalation, auto-approval, auto-rejection, expiration, fallback routing) is appended to `WorkflowSystemActionAudit` with resolved system user ID, timestamp, forensic detail JSON.

### 8.6 Return-for-correction + Resubmit (v13.6)
- `POST /api/v1/approvals/{id}/return-for-correction` — approver returns to requester (requires comments); permitted only when `WorkflowStep.AllowReturnForCorrection = true`
- `POST /api/v1/approvals/{id}/resubmit` — original requester-only; resubmits from configured `ResumeFromStepOrder` (default step 1); `ResubmissionCount` incremented, capped by `MaxWorkflowResubmissions` (default 3)

### 8.7 Validation rules
`IWorkflowValidationRule` contract — stateless, deterministic. Config in `WorkflowStep.ValidationConfigJson`. Registered via DI and discoverable via `GET /api/v1/workflows/validation-rules`. Fail-closed: unregistered rule → auto-reject. Example: `VacationBalanceRule`.

### 8.8 Approval decision vs downstream execution (important distinction)
**Approval decision:** Recorded on `WorkflowStepExecution` by the approving user. Moves the workflow forward or terminates it.

**Downstream execution:** When the workflow transitions to `Approved`, `RequestFinallyApprovedEvent` publishes, and a matching `IApprovalExecutor` materializes the approved request into a real domain artifact. Six executors exist today:
1. `AllowanceRequestExecutor` — creates/updates `AllowanceAssignment`
2. `LoanApplicationExecutor` — creates `LoanRepayment` schedule
3. `SalaryAdvanceExecutor` — creates advance deduction
4. `ExpenseClaimExecutor` — creates reimbursement instruction
5. `BenefitEnrollmentExecutor` — activates enrollment
6. `LetterRequestExecutor` — generates letter document

**Execution outcomes:** `Succeeded`, `AlreadyExecuted` (idempotency), `NotReady`, `ValidationFailed`, `Failed`.

**Operational failure handling:** Executor failure does NOT surface as HTTP 500 to the approver. Instead:
- `OperationalFailureAlert` is created with category `ApprovalExecution` and `IsRetryable` flag
- HR sees it in the Operations Dashboard (Admin UI)
- HR can **retry** (re-dispatch execution command) or **resolve with notes** (mark fixed externally)
- Deduplicated by `(Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false)`; retry increments `RetryCount` instead of duplicating

**Approved-but-not-executed concept:** The admin UI provides a dedicated "Approved-Not-Executed" page ([/approved-not-executed](../time-attendance-frontend/src/app/app.routes.ts)) listing requests where workflow is `Approved` but the `IsExecuted` marker on the downstream entity is still false — so nothing falls through the cracks.

### 8.9 Approvals API endpoints (summary)
- **WorkflowsController** — definition CRUD + activate/deactivate (SystemAdmin); instance lookup; validation-rules list; system-action audit browser; role-assignment stats
- **ApprovalsController** — `/pending`, `/history`, `/{id}/approve|reject|delegate|cancel|return-for-correction|resubmit`, `/delegations` CRUD
- **ApprovalExecutionController** — execution status, retry, approved-not-executed listing **[Inferred]** from controller name + §11 UI evidence

### 8.10 Entity types WITHOUT executors today
Vacation, Excuse, RemoteWork, AttendanceCorrection, ShiftSwap, Overtime, Timesheet, Transfer, Promotion, Payroll, Resignation (termination creation is via lifecycle handler, not executor), FinalSettlement (approval routing but no post-approval executor pattern).
These categories rely on their originating modules to react to workflow status transitions directly (e.g., attendance reads the request's status) rather than via the executor pattern. **[Gap]** This is a consistency gap — not all approved requests produce downstream artifacts through the same pipeline.

---

## 9. Automation and Background Processing

### 9.1 Inventory of scheduled jobs
All jobs are registered via Coravel in [Program.cs](../src/Api/TimeAttendanceSystem.Api/Program.cs). 37 background jobs total.

#### 9.1.1 Attendance & time
| Job | Schedule | Purpose |
|---|---|---|
| `DailyAttendanceGenerationJob` | 02:00 daily | Pre-generate attendance records for all active employees |
| `EndOfDayAttendanceFinalizationJob` | 23:59 daily | Finalize yesterday's records |
| `ShiftDrivenAutoCheckOutJob` | Hourly | Per-employee auto-checkout using shift effective end + grace period (replaces v14.6-removed company-wide flags) |

#### 9.1.2 Leave & accrual
| Job | Schedule | Purpose |
|---|---|---|
| `MonthlyLeaveAccrualJob` | Monthly 01:00 on 1st | Process monthly accrual; proration for mid-year hires |
| `LeaveCarryoverExpiryJob` | 04:00 daily | Enforce `CarryOverExpiryMonths`; idempotent |
| `CompensatoryOffExpiryJob` | 02:30 daily | Expire comp offs past expiry |
| `ExpireTemporaryAllowancesJob` | 02:00 daily | Expire temporary allowance assignments past effective-to date |

#### 9.1.3 Contract / visa / document / certification expiry
| Job | Schedule | Purpose |
|---|---|---|
| `ContractExpiryAlertJob` | 03:00 daily | Pre-expiry alerts + publishes `ContractExpiredEvent` for past-end-date contracts |
| `VisaExpiryAlertJob` | 04:00 daily | Employee visa renewal reminders |
| `DocumentExpiryAlertJob` | 08:00 daily | Document renewal reminders (filters out rejected) |
| `CertificationExpiryAlertJob` | 10:00 daily | Certification renewal reminders (`RenewalRequired=true`) |

#### 9.1.4 Asset & property
| Job | Schedule | Purpose |
|---|---|---|
| `AssetWarrantyExpiryAlertJob` | 14:00 daily | Warranty expiry alerts (Active assets only) |
| `OverdueAssetReturnAlertJob` | 15:00 daily | Alerts + updates assignment to Overdue |

#### 9.1.5 Performance & development
| Job | Schedule | Purpose |
|---|---|---|
| `PipFollowThroughJob` | Hourly | Create pending resignation for `CompletedUnsuccessful` PIPs |
| `PIPExpiryCheckJob` | 06:00 daily | Alert managers on PIP end-date reached (does not auto-close) |
| `ReviewCycleReminderJob` | 07:00 daily | Reminders for self-assessment / manager review deadlines |
| `TrainingSessionReminderJob` | 11:00 daily | Reminders for upcoming training sessions |

#### 9.1.6 Engagement / surveys / announcements
| Job | Schedule | Purpose |
|---|---|---|
| `SurveyDistributionActivatorJob` | Hourly | Activate scheduled distributions |
| `SurveyReminderJob` | 09:00 daily | Reminders to pending participants |
| `SurveyExpiryJob` | Hourly | Close distributions past end date |
| `AnnouncementSchedulerJob` | Hourly | Publish scheduled announcements |
| `AnnouncementExpiryJob` | Hourly | Mark past-expiry announcements as Expired |

#### 9.1.7 Employee relations
| Job | Schedule | Purpose |
|---|---|---|
| `GrievanceSlaAlertJob` | 12:00 daily | SLA overdue + approaching alerts to assigned + escalated + HR |
| `CounselingFollowUpReminderJob` | 13:00 daily | Counselor follow-up reminders |

#### 9.1.8 Onboarding
| Job | Schedule | Purpose |
|---|---|---|
| `OnboardingTaskOverdueJob` | 05:00 daily | Flag overdue onboarding tasks, notify employee + HR |

#### 9.1.9 Timesheets
| Job | Schedule | Purpose |
|---|---|---|
| `TimesheetPeriodGenerationJob` | 03:00 daily | Auto-create next timesheet period per branch when current within 7 days of ending |
| `TimesheetSubmissionReminderJob` | 08:00 daily | Reminders for draft / missing timesheets |
| `TimesheetPeriodClosureJob` | 01:30 daily | Auto-close periods past deadline |

#### 9.1.10 Payroll & benefits
| Job | Schedule | Purpose |
|---|---|---|
| `BenefitEnrollmentExpiryJob` | 01:15 daily | Terminate active enrollments past effective end / termination date |
| `BenefitDeductionSyncJob` | Monthly 03:00 on 1st | Sync benefit contributions as `PayrollAdjustment` into open Draft payroll periods (idempotent) |
| `OpenEnrollmentPeriodActivatorJob` | 00:05 daily | Open periods whose start date arrives; close past end date |

#### 9.1.11 Analytics & reports
| Job | Schedule | Purpose |
|---|---|---|
| `AnalyticsSnapshotJob` | 01:00 daily | Daily snapshot of headcount/attrition/recruitment/training/leave/overtime/payroll/engagement |
| `MonthlyAnalyticsRollupJob` | Monthly 02:00 on 1st | Aggregate daily snapshots (averages / sums / maxima) |
| `ScheduledReportExecutionJob` | Hourly | Process due scheduled reports. **[Gap]** Report generation + email delivery is TODO |

#### 9.1.12 Workflow & operations
| Job | Schedule | Purpose |
|---|---|---|
| `WorkflowTimeoutProcessingJob` | Hourly | Process per-step timeouts (Expire/Escalate/AutoApprove/AutoReject) |
| `FrozenWorkflowCleanupJob` | 03:00 daily | Cancel workflow instances frozen >`FrozenWorkflowCleanupDays` (default 90) days |
| `OperationalFailureSurfacerJob` | Hourly | Scan `LifecycleAutomationAudit` (7-day window) for Failed/MissingPrerequisite, raise deduplicated `OperationalFailureAlert` |

### 9.2 Lifecycle-event handlers (MediatR)
Seven handlers respond to domain events, all extending `LifecycleAutomationBase`, all gated by `LifecycleAutomationEnabled` master flag, all writing audit rows, all idempotent, all wrapped by `ILifecycleEventPublisher` so exceptions never break the originating command.

| # | Event | Handler | Behavior | Key flags |
|---|---|---|---|---|
| 1 | `OfferAcceptedEvent` | `OfferAcceptedHandler` | Create `OnboardingProcess` from template | `AutoCreateOnboardingOnOfferAcceptance`, `DefaultOnboardingTemplateId` |
| 2 | `OnboardingCompletedEvent` | `OnboardingCompletedHandler` | Always stamp `OnboardingCompletedAt`; optionally activate | `AutoActivateEmployeeOnOnboardingComplete` (default false) |
| 3 | `ResignationApprovedEvent` | `ResignationApprovedHandler` | Create `TerminationRecord` | `AutoCreateTerminationOnResignationApproved` (default false, opt-in) |
| 4 | `TerminationCreatedEvent` | `TerminationCreatedHandler` | Substep 1: create clearance; Substep 2: suspend employee | `AutoCreateClearanceOnTermination` (default true), `DefaultClearanceTemplateId`, `AutoSuspendEmployeeOnTerminationCreated` (default true) |
| 5 | `ClearanceCompletedEvent` | `ClearanceCompletedHandler` | Notify HR; optionally calc final settlement | `AutoEnableFinalSettlementCalcOnClearanceComplete` (default false), `RequireClearanceCompleteBeforeFinalSettlement` |
| 6 | `FinalSettlementPaidEvent` | `FinalSettlementPaidHandler` | Deactivate employee | `AutoDeactivateEmployeeOnFinalSettlementPaid` (default true) |
| 7 | `ContractExpiredEvent` | `ContractExpiredHandler` | Apply `ContractExpiredAction` (NotifyOnly / AutoMarkExpired / Suspend / Deactivate) | `ContractExpiredAction` (default AutoMarkExpired) |

### 9.3 Audit & safety patterns (universal)
- **`LifecycleAutomationAudit`** — append-only; captures `AutomationType`, source entity, target entity, `Status` (Disabled / Succeeded / Skipped / DuplicateSuppressed / Failed / MissingPrerequisite), reason, error, context JSON, user ID, timestamps.
- **`OperationalFailureAlert`** — created by `IFailureAlertService.RaiseAsync`; dedup by (Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false); `IsRetryable` flag; categories include `LifecycleAutomation`, `ApprovalExecution`, etc.
- **`PayrollRunAudit` + `PayrollRunAuditItem`** — payroll equivalent; one audit per process/recalculate/finalization/cancellation run; per-employee audit item.
- **`WorkflowSystemActionAudit`** — immutable forensic trail for system-driven workflow actions.
- **`AuditLog` + `AuditChange`** — entity-level audit with field-level before/after.

---

## 10. Data and Business Entities

### 10.1 People & organization
- **Employee** — authoritative personnel record; `IsActive`, `IsSuspended` (two-phase offboarding), `IsPreHire` (lifecycle automation), `OnboardingCompletedAt`. Sub-entities: `EmployeeAddress`, `EmployeeBankDetail`, `EmployeeDependent`, `EmployeeEducation`, `EmployeeWorkExperience`, `EmployeeVisa`, `EmergencyContact`, `EmployeeProfileChange`.
- **Branch** — office location with `ManagerEmployeeId`, `Latitude`, `Longitude`, `GeofenceRadiusMeters` (retained as metadata post-v14.8).
- **Department** — hierarchical (parent-child) with `ManagerEmployeeId`.
- **User** — login account; linked to employee via `EmployeeUserLink`; `IsSystemUser`, `IsActive`, `MustChangePassword`.
- **Role, Permission, RolePermission, UserRole, UserBranchScope** — RBAC primitives.
- **JobGrade** — salary band metadata.

### 10.2 Time & attendance
- **AttendanceRecord** — daily aggregate; `Status` (14-value enum), `IsApproved`, `IsFinalized`, `IsManualOverride`.
- **AttendanceTransaction** — punch record; `TransactionType` (CheckIn, CheckOut, BreakStart, BreakEnd, AutoCheckOut).
- **AttendanceCorrectionRequest**, **ShiftSwapRequest**, **OnCallSchedule**, **WorkingDay**.
- **Shift** — type, periods, grace periods, overtime rules, check-in requirements.
- **ShiftPeriod**, **ShiftAssignment** (employee/department/branch with priority + temporary windows), **ShiftChange** (history).

### 10.3 Leave
- **VacationType**, **EmployeeVacation**, **LeaveBalance** (Accrued/Used/Reserved/AdjustedDays), **LeaveTransaction**, **LeaveAccrualPolicy**, **LeaveEntitlement**, **LeaveEncashment**, **CompensatoryOff**.
- **Excuse** — `ExcusePolicy`, `EmployeeExcuse`.
- **RemoteWorkPolicy**, **RemoteWorkRequest**.

### 10.4 Workflow & approval
- **WorkflowDefinition** (versioned), **WorkflowStep**, **WorkflowInstance** (with `DefinitionSnapshotJson`), **WorkflowStepExecution**, **ApprovalDelegation**, **WorkflowSystemActionAudit**, **WorkflowRoleAssignmentCursor**.
- **Workflow instance statuses:** Pending, InProgress, Approved, Rejected, Cancelled, Expired, Frozen, ReturnedForCorrection, FailedRouting.
- **Execution actions:** Approved, Rejected, Delegated, Skipped, TimedOut, AutoApproved, AutoRejected, Escalated, ReturnedForCorrection, FailedNoApprover, Resubmitted.

### 10.5 Payroll & compensation
- **PayrollPeriod** — Draft → Processing → Processed → Approved → Paid | Cancelled; `LockedAtUtc`.
- **PayrollRecord** — Pending → Calculated → Adjusted → Finalized; `LockedAtUtc`; `CalculationBreakdownJson`.
- **PayrollRecordDetail** — line-itemized contribution (allowance / deduction / OT / tax / SI).
- **PayrollAdjustment** — manual adjustments (including `InsuranceDeduction` synced by `BenefitDeductionSyncJob`).
- **PayrollRunAudit / PayrollRunAuditItem** — forensic per-run trail.
- **TaxConfiguration**, **TaxBracket**, **SocialInsuranceConfiguration**, **InsuranceProvider**, **EmployeeInsurance**, **PayrollCalendarPolicy**, **OvertimeConfiguration**.
- **EndOfServicePolicy**, **EndOfServicePolicyTier**, **EndOfServiceResignationDeductionTier**, **EndOfServiceBenefit** (with `AppliedPolicySnapshotJson`).
- **SalaryStructure**, **EmployeeSalary** (effective-dated), **SalaryAdjustment**.
- **AllowanceType**, **AllowancePolicy**, **AllowanceAssignment** (Active/Expired), **AllowanceRequest**, **AllowanceChangeLog**.
- **LoanType**, **LoanPolicy**, **LoanApplication**, **LoanRepayment**.
- **SalaryAdvance** (with `DeductionStartDate` / `DeductionEndDate` after v14.7).
- **BenefitPlan**, **BenefitEnrollment**, **BenefitClaim**, **OpenEnrollmentPeriod**.
- **ExpenseCategory**, **ExpensePolicy**, **ExpenseClaim**.
- **LetterTemplate**, **LetterRequest**.

### 10.6 Recruitment & onboarding
- **JobRequisition**, **JobPosting**, **Candidate**, **JobApplication**, **InterviewSchedule**, **InterviewFeedback**, **OfferLetter**.
- **OnboardingTemplate**, **OnboardingTemplateTask**, **OnboardingProcess**, **OnboardingTask** (Pending/InProgress/Overdue/Completed/Cancelled), **OnboardingDocument**.

### 10.7 Performance
- **PerformanceReviewCycle**, **PerformanceReview** (SelfAssessmentPending → ManagerReviewPending → Completed), **GoalDefinition**, **CompetencyFramework**, **Competency**, **CompetencyAssessment**, **PerformanceImprovementPlan** (Active / CompletedSuccessful / CompletedUnsuccessful / Extended; `RelatedResignationRequestId`, `FollowThroughProcessedAt`), **FeedbackRequest360**, **Feedback360Response**.

### 10.8 Training & succession
- **TrainingCategory**, **TrainingCourse**, **TrainingProgram**, **TrainingSession** (Scheduled/InProgress/Completed/Cancelled), **TrainingEnrollment** (Approved/InProgress/Completed/Withdrawn), **TrainingAttendance**, **TrainingEvaluation**, **TrainingBudget**, **EmployeeCertification** (with `RenewalReminderDays`).
- **KeyPosition**, **TalentProfile**, **SuccessionPlan**, **CareerPath**, **TalentPool** **[Inferred]**.

### 10.9 Employee relations & lifecycle
- **EmployeeContract** (Active/Expired/Terminated; `Status` driven by `ContractExpiredAction`).
- **EmployeePromotion**, **EmployeeTransfer**, **SalaryAdjustment**.
- **Grievance** (Filed/UnderReview/InvestigationStarted/PendingResolution/Escalated/Resolved/Closed).
- **DisciplinaryAction**, **Investigation**, **CounselingRecord** (with `FollowUpRequired`, `FollowUpCompleted`).

### 10.10 Offboarding
- **ResignationRequest** (Pending/Approved/Rejected/Withdrawn).
- **TerminationRecord**.
- **ClearanceChecklist**, **ClearanceItem** (Pending/InProgress/Completed/NotApplicable).
- **FinalSettlement** (Calculated/Approved/Paid).
- **ExitInterview**.

### 10.11 Workplace
- **Asset**, **AssetCategory**, **AssetAssignment** (Active/Overdue/Returned), **AssetMaintenance**.
- **CompanyPolicy**, **DocumentCategory**, **EmployeeDocument** (with verification status), **FileAttachment** (entity-linked).
- **Announcement** (Draft/Scheduled/Published/Expired), **AnnouncementCategory**.
- **SurveyTemplate**, **SurveyDistribution** (Upcoming/Scheduled/Active/Closed), **SurveyParticipant** (Invited/Started/Completed/Expired), **SurveyResponse**.

### 10.12 Timesheets & projects
- **TimesheetPeriod** (Open/Closed; Weekly/BiWeekly/Monthly), **Timesheet** (Draft/Submitted/Approved/Rejected).
- **Project**, **ProjectTask**.

### 10.13 Company & configuration
- **CompanySettings** — singleton row, 9 categories (General, Attendance, Leave, Payroll, Approval, Notification, Security, Thresholds, Lifecycle Automation + Workflow Routing).
- **BranchSettingsOverride**, **DepartmentSettingsOverride**.
- **PublicHoliday** (bilingual; branch-specific; recurring).

### 10.14 Operations, audit, notifications
- **LifecycleAutomationAudit** — append-only automation trail.
- **OperationalFailureAlert** — surfaced failures (dedup / retry / resolve).
- **AuditLog** + **AuditChange** — field-level change log.
- **Notification** — in-app stored; bilingual; action URLs; read tracking.
- **Session**, **BlacklistedToken**, **LoginAttempt** — security/audit.
- **AnalyticsSnapshot** (Daily + Monthly; by metric / branch / department).

---

## 11. Operational Visibility and Control

### 11.1 Operational alerts
`OperationalFailureAlert` + `IFailureAlertService`:
- **Categories:** `LifecycleAutomation`, `ApprovalExecution`, and others
- **Severities:** Error (retryable), Warning (retryable if flag set)
- **Sources:** `OperationalFailureSurfacerJob` (sweep of lifecycle audit), `PipFollowThroughJob` (lifecycle errors), executors (approval execution failures)
- **Dedup:** by `(Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false)`; RetryCount increments
- **Admin UI:** `OperationalAlertsController` + `/operational-alerts` page — list, filter, retry, resolve with notes

### 11.2 Ops Dashboard
`OpsDashboardController` + admin page — shows:
- Count of unresolved failures
- Count of approved-but-not-executed requests
- Count of frozen workflows
- Count of overdue onboarding tasks
- Count of PIPs in `CompletedUnsuccessful` pending follow-through

### 11.3 Work queues
Admin has queues for:
- Overdue approvals (by branch/department)
- Pending onboarding (by template/branch)
- Pending clearance (by termination)
- PIP follow-through needed
- Shift auto-checkout anomalies
- Operational alerts

### 11.4 Approved-but-not-executed visibility
Dedicated admin page `/approved-not-executed` listing requests with `WorkflowInstance.Status=Approved` and `IsExecuted=false` on the downstream entity.

### 11.5 Execution status visibility
Admin can inspect per-executor outcomes via the Operations Dashboard and drill into `OperationalFailureAlert` details. **[Inferred]** Retry from the UI dispatches `ExecuteApprovalCommand` again.

### 11.6 Global search (omnibox)
- Top-nav input on admin shell; Ctrl/⌘+K to focus; Escape clears
- Enter submits to `/global-search?q=<query>`
- Backend: `GlobalSearchService` (portable EF predicates — `.ToLower().Contains()` — per v14.5 portability fix)
- RTL-safe; bilingual placeholder text
- Admin URL mirrors `?q=` for bookmarkable searches

### 11.7 Payroll run audit trail
Backend endpoint `GET /api/v1/payroll-periods/{id}/run-audit` returns per-run and per-employee records. **[Gap]** There is no dedicated admin drill-down page for `PayrollRunAuditItem` rows; the audit data is API-queryable but not rendered in a rich UI today.

### 11.8 Lifecycle automation audit trail
Backend endpoints under `LifecycleAutomationController` (`/audit`, `/audit/{id}`, `/audit/by-entity`). **[Gap]** No dedicated admin UI listing these audit rows today — data exists and is queryable.

### 11.9 UI vs backend-only
| Control plane | Admin UI | Backend-only |
|---|---|---|
| Operational alerts | ✓ | — |
| Ops dashboard | ✓ | — |
| Approved-not-executed | ✓ | — |
| Work queues | ✓ | — |
| Global search | ✓ | — |
| Payroll run audit | Partial | Drill-down UI missing |
| Lifecycle automation audit | ✗ | Audit exposed via API only |
| End-of-service policy CRUD | ✗ | Backend only (policies seeded, editable via API) |
| Alert rule configuration | ✗ | Not configurable; alerts are raised, not custom-ruled |

---

## 12. User Experience and Operator Experience

### 12.1 Admin Portal (4200)
- ~45 business modules with comprehensive CRUD coverage across ~320 components
- Sidebar organized into 12 logical groups: Main, Organization, Time & Attendance, Leave & Absence, HR & Lifecycle, Compensation, Performance & Growth, Workplace, Workflows & Approvals, Operations, Reports & Analytics, Settings
- Modern form design system (`.app-modern-form`) applied to ~90% of forms
- Modern view design system (`.app-modern-view`) applied to most view pages
- ERP token palette (`--app-*`) used throughout; Indigo blue primary (`#4F6BF6`)
- i18n: 7,036 EN + 7,035 AR keys, fully synchronized
- RTL-aware (`:host-context([dir="rtl"])`)
- Top-nav omnibox with Ctrl/⌘+K focus

### 12.2 Self-Service Portal (4201)
- ~8 core employee modules across ~55 components
- Sidebar: Dashboard, My Profile, Time & Attendance, Leave & Requests, Compensation, HR Services, Development, Engagement, Pending Approvals, Manager Section
- Employee-centric views of allowances, payslips, salary, benefits, expenses, loans, assets, grievances, disciplinary actions, documents, letters
- Modern design rollout ~64% on form/view pages
- i18n: 3,601 EN + 3,601 AR keys
- Manager section visible to users with direct reports (team dashboard, approvals)

### 12.3 Self-service capabilities
Create: vacation request, excuse request, remote work request, attendance correction, shift swap, timesheet, resignation, survey responses.
View (read-only): my attendance, my payslips, my salary, my allowances, my benefits, my expenses, my loans, my assets, my grievances, my disciplinary records, my documents, my letters.

### 12.4 Manager capabilities (in self-service portal)
- Team dashboard (team attendance, pending approvals)
- Receive and action pending approvals (approve / reject / delegate / return / forward / resubmit review)

### 12.5 Current UX strengths
- Consistent shared component library (DataTable, StatusBadge, DefinitionList, FormHeader, DetailCard, ModalWrapper, PageHeader, UnifiedFilter)
- Fully bilingual including dates, notifications, error messages
- Modern visual language: flat cards, subtle shadows, 13px gray-500 DL labels, 14px gray-900 values, 2px underline tabs
- Standalone Angular 20 with Signals + OnPush change detection for performance
- Global omnibox search
- Real-time notifications via SignalR

### 12.6 Operational friction points visible from implementation
- **EOS policy tiers** must be managed via API / seed — no admin UI
- **Lifecycle automation audit** is API-only — HR cannot visually inspect the automation trail
- **Payroll run audit drill-down** missing a dedicated UI
- **Some "coming soon" markers** in Leave Entitlements bulk upload and user-employee matching flow
- **Scheduled report execution** — report generation + email delivery not implemented (framework only)
- **Alert rule configuration** — alert types are hardcoded; there is no UI to define custom alert rules
- **Shift swap self-service for partners** — tested as a requestor-driven flow; partner confirmation UX **[Inferred]** may need polish

---

## 13. Integrations and External Dependencies

### 13.1 Runtime & infrastructure
- **PostgreSQL 15+ (tested on 18)** — single database `tecaxle_hrms`; migrations maintained via EF Core 9
- **.NET 9 runtime** — Web API + Coravel scheduler
- **Angular 20 (admin + self-service)** — two separate SPAs
- **SignalR** — real-time notification hub at `/hubs/notifications`
- **Cloudflare Pages** — admin + self-service portal delivery (production)
- **Cloudflare / HTTPS** — TLS termination at edge

### 13.2 External services directly exercised
- **Local disk storage** — `uploads/` directory for file attachments
- **HTTPS + JWT** — no external SSO / IdP integration observed
- **Time zone data** — .NET `TimeZoneInfo`, branch-aware timezone handling in `ShiftDrivenAutoCheckOutJob`

### 13.3 Integrations present but stub-level
- **Scheduled reports** framework exists (`ScheduledReport`, `ScheduledReportExecutionJob`) but actual report generation and email delivery are **[Gap]** (TODO).
- **Biometric fingerprint devices** — schema for `FingerprintRequest` with technician assignment; device-side integration is **[Inferred]** as external / outside this repository.

### 13.4 Decommissioned integrations (post-v14.8)
- **FCM push notifications** — removed
- **NFC attendance** — removed
- **GPS location verification** — removed (branch GPS kept as metadata only)
- **Notification broadcast fan-out** — removed (in-app only)

### 13.5 Frontend / backend coupling
- REST + JSON (JWT-authenticated)
- SignalR for push-style events
- CORS open for `localhost:4200, 4201, 4202` in dev and production domains in prod
- Login cookies (refresh token) + Authorization Bearer header (access token)

---

## 14. Security, Access, and Scope Controls

### 14.1 Authentication
- Email-based single-step login (`POST /api/v1/auth/login`)
- JWT access token + cookie-based refresh token (`POST /api/v1/auth/refresh`)
- Two-factor authentication (TOTP) with backup codes; enable/confirm/verify endpoints
- Password reset via email (request / reset endpoints)
- Progressive lockout driven by `LoginLockoutPolicyJson`
- Password history + `MustChangePassword` flag
- Blacklisted tokens table

### 14.2 Authorization
- Role-based access via `UserRole` + `RolePermission` — ~223 policies across 70+ resources × 26 actions (per system memory; code shows `[Authorize(Policy = "...")]` on every controller action)
- Fine-grained permission tuples e.g., `UserRead`, `UserCreate`, `PayrollProcess`, `EmployeeTerminate`

### 14.3 Branch-scoped data access
- `UserBranchScope` table — each user lists their accessible branches (empty = all = SystemAdmin-like)
- Applied across listing queries, search, dashboards, queues
- Non-SystemAdmin users cannot load data outside their scope

### 14.4 Privileged / admin-only actions
- **Payroll admin-unlock** — `POST /api/v1/payroll-periods/{id}/admin-unlock` — SystemAdmin only, requires reason
- **Workflow definition CRUD** — SystemAdmin only
- **CompanySettings edits** — SystemAdmin / HRManager
- **Role / permission management** — SystemAdmin
- **Seed endpoints** — dev/admin only

### 14.5 Protected operational actions
- **Cancel workflow** — requester or admin
- **Resubmit** — requester only
- **Return-for-correction** — only on steps with `AllowReturnForCorrection=true`
- **Approve/reject** — only assigned approver (or delegate)
- **Delegation** — delegator-only; no self-delegation
- **Attendance correction** — only within `AttendanceCorrectionMaxRetroactiveDays`

### 14.6 Search / queue / dashboard scoping
- Search queries respect branch scope
- Queues filter by assignment (e.g., "my pending approvals") — only assigned users see them
- Dashboards present aggregates respecting branch scope

### 14.7 Retry/resolve security assumptions
- **[Inferred]** Operational failure retry and resolve actions are HR / SystemAdmin only — controllers use policy gates, exact policies not verified here

### 14.8 Data security
- Passwords hashed with PBKDF2-SHA256, 10,000 iterations, unique salts
- Parameterized queries via EF Core (no raw SQL observed in attack surfaces)
- Rate limiting middleware on API
- Global exception handler returns standardized JSON errors with `traceId` (stack traces only in dev)
- Audit log on data modifications

---

## 15. Reports, Dashboards, and Query Capabilities

### 15.1 Admin reports (admin UI + backend)
- Attendance Report (branch / department / employee / date-range filters; CSV export)
- Leave Report
- Payroll Reports
- Custom Reports (generic query-driven)
- Compliance Reports
- Session Reports (session report + login history)
- Audit Logs (field-level change log browser)

### 15.2 Admin analytics
- Executive Dashboard
- Headcount analytics
- Attrition analytics
- Recruitment analytics
- Training analytics
- Leave analytics
- Overtime analytics
- Payroll analytics
- Engagement analytics
- Saved Dashboards (`SavedDashboardsController`)

### 15.3 Manager dashboards
- Team attendance
- Pending approvals count
- Team leave / overtime

### 15.4 Employee dashboard
- Personal KPIs (attendance, leave balance, upcoming shifts, pending requests)

### 15.5 Operational dashboards
- Ops Dashboard (alerts, approved-not-executed, frozen workflows, overdue tasks)
- Operational Alerts list (retry / resolve)
- Work Queues

### 15.6 Queries / endpoints
- `GET /api/v1/payroll-periods/{id}/run-audit` — per-run audit trail
- `GET /api/v1/lifecycle-automation/audit` — automation audit rows
- `GET /api/v1/workflows/validation-rules` — registered rules (admin form dropdown)
- `GET /api/v1/workflows/system-actions` — system-action forensics
- `GET /api/v1/workflows/role-assignment-stats` — RoundRobin cursor + pending counts per role
- `GET /api/v1/global-search?q=` — omnibox
- `GET /api/v1/company-configuration/resolved?branchId=&deptId=` — effective settings with inheritance

### 15.7 Scheduled reports
Framework-only: `ScheduledReport` + `ScheduledReportExecutionJob` updates `LastRunAt` / `NextRunAt` on schedule, but does not actually generate content or deliver it. **[Gap]**

---

## 16. Known Limitations, Gaps, and Partial Areas

### 16.1 Backend-ready, UI-missing
- **End-of-Service policy management** — policies + tiers must be seeded or edited via API; no admin UI
- **Lifecycle automation audit browser** — endpoints exist; no admin UI to visually inspect events / replay / escalate
- **Payroll run audit drill-down** — high-level endpoints work; no rich per-employee-per-run UI
- **Alert rule configuration** — alerts raised by fixed categories; no UI to define custom alert types or suppressions

### 16.2 Partial / placeholder features
- **Scheduled report execution** — framework only; report generation + email delivery TODO
- **Leave entitlements bulk upload** — modal placeholder ("coming soon")
- **User-to-Employee matching** — some TODO comments around filtering to unlinked employees
- **Remote Work Policy edge cases** — some TODOs in handler code
- **Benefit deduction integration into payroll** — `BenefitDeductionSyncJob` writes adjustments into Draft periods; the final "benefit deduction integrator" into the calculation context is noted as pending full implementation

### 16.3 Approval-to-execution coverage gap
- Six executors (allowance, loan, advance, expense, benefit, letter); **no executor** for vacation, excuse, remote work, attendance correction, shift swap, overtime, timesheet, transfer, promotion, resignation-to-termination (handled via lifecycle event instead), payroll-period approval, final-settlement approval
- Consistency gap: not all approved requests produce a downstream artifact through the same pipeline; some rely on the owning module to react to workflow status

### 16.4 Operational retry semantics
- Retry for `OperationalFailureAlert` is **[Inferred]** supported via controller; exact retry dispatch mechanism is not fully verified from code reading

### 16.5 Legacy / deprecation items still active
- Legacy "HR" and "Admin" role names still honored in some notification jobs alongside `NotificationRecipientRolesCsv`
- `tenant_configuration.*` i18n key block retained despite renaming (intentional, to avoid churn without user-visible gain)
- Frozen workflow cleanup at 90 days is an **implicit assumption** that modules don't come back after that

### 16.6 Data lifecycle gaps
- **Archival / purge policy** — no evidence of scheduled data-purge jobs for very old payroll records, attendance transactions, audit logs
- **Backup / restore** — out of scope of application code; ops concern

### 16.7 Testing scope
- 167 backend tests + 12 frontend tests passing (per CLAUDE.md)
- Covered: payroll calculators, business rules, lifecycle automation (with real-Postgres integration for rollback), workflow routing
- **[Gap]** Large surface area (30+ modules) is not exhaustively tested; most CRUD is not covered by tests, and UI e2e coverage is limited to a few files

---

## 17. Assumptions and Inferences

The following statements in this BRD are **inferred** from code structure, naming, and cross-references — not directly demonstrated by a handler invocation or test:

1. **Vacation balance deduction side-effects** — The `EmployeeVacation` being marked approved (post-workflow) and the `LeaveBalance.ReservedDays` / `UsedDays` updates are inferred from entity relationships and the presence of `LeaveTransaction`; the exact command path was not verified end to end.
2. **Approval-to-attendance reflection** — That `OnLeave` / `RemoteWork` statuses appear on `AttendanceRecord` after approval is inferred from `AttendanceStatus` enum values + the modules' interdependence; exact integration point not verified.
3. **Fingerprint device integration** — Schema exists (`FingerprintRequest`); physical device connectivity is inferred to be external.
4. **Retry mechanism for operational alerts** — Inferred as a controller action; exact retry dispatch path not read.
5. **Talent Pool / Succession coverage** — Entities referenced in CLAUDE.md; exact aggregates inferred.
6. **Policy enforcement in `WorkflowFallbackApproverRole="HRManager"`** — Default assumed from documentation; exact default read as "HRManager".
7. **Manager-of-manager resolution** — Reporting structure is assumed to flow through a single direct-manager link; multi-level manager resolution for approvals is inferred rather than directly seen.
8. **Alert retry increments** — `RetryCount` behavior inferred from CLAUDE.md + lifecycle report; exact column read not confirmed.
9. **Timesheets consuming attendance** — Exact data flow between `AttendanceRecord` and `Timesheet` rows not verified.
10. **Project allocation logic** — `Project` + `ProjectTask` entities exist; their use (project billing, resource planning) is inferred from naming.

---

## 18. Traceability Appendix

This appendix maps each major BRD section to the primary code artifacts, so reviewers can open any claim and verify it in code.

### 18.1 Authentication & authorization
- Controllers: [AuthController](../src/Api/TimeAttendanceSystem.Api/Controllers/AuthController.cs), [UsersController](../src/Api/TimeAttendanceSystem.Api/Controllers/UsersController.cs), [RolesController](../src/Api/TimeAttendanceSystem.Api/Controllers/RolesController.cs), [PermissionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/PermissionsController.cs), [SessionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/SessionsController.cs)
- Handler: [LoginCommandHandler](../src/Application/TimeAttendanceSystem.Application/Authorization/Commands/Login/LoginCommandHandler.cs)
- Security: [JwtTokenGenerator](../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Security/JwtTokenGenerator.cs)
- Entities: `User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `UserBranchScope`, `BlacklistedToken`, `LoginAttempt`, `Session`

### 18.2 Organization & employee
- Controllers: [BranchesController](../src/Api/TimeAttendanceSystem.Api/Controllers/BranchesController.cs), [DepartmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/DepartmentsController.cs), [EmployeesController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeesController.cs), [EmployeeDetailsController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeDetailsController.cs), [JobGradesController](../src/Api/TimeAttendanceSystem.Api/Controllers/JobGradesController.cs)
- Entities: `Branch`, `Department`, `Employee`, `EmployeeAddress`, `EmployeeBankDetail`, `EmployeeDependent`, etc.

### 18.3 Time & attendance
- Controllers: [AttendanceCorrectionRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AttendanceCorrectionRequestsController.cs), [ShiftAssignmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ShiftAssignmentsController.cs), [ShiftsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ShiftsController.cs), [ShiftSwapRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ShiftSwapRequestsController.cs), [OnCallSchedulesController](../src/Api/TimeAttendanceSystem.Api/Controllers/OnCallSchedulesController.cs)
- Jobs: `DailyAttendanceGenerationJob`, `EndOfDayAttendanceFinalizationJob`, `ShiftDrivenAutoCheckOutJob` in [BackgroundJobs/](../src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/)
- Entities: `AttendanceRecord`, `AttendanceTransaction`, `Shift`, `ShiftPeriod`, `ShiftAssignment`, `OnCallSchedule`

### 18.4 Leave & excuse & remote work
- Controllers: [EmployeeVacationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeVacationsController.cs), [VacationTypesController](../src/Api/TimeAttendanceSystem.Api/Controllers/VacationTypesController.cs), [LeaveBalancesController](../src/Api/TimeAttendanceSystem.Api/Controllers/LeaveBalancesController.cs), [LeaveEncashmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/LeaveEncashmentsController.cs), [CompensatoryOffsController](../src/Api/TimeAttendanceSystem.Api/Controllers/CompensatoryOffsController.cs), [EmployeeExcusesController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeExcusesController.cs), [ExcusePoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/ExcusePoliciesController.cs), [RemoteWorkRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/RemoteWorkRequestsController.cs), [RemoteWorkPoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/RemoteWorkPoliciesController.cs)
- Jobs: `MonthlyLeaveAccrualJob`, `LeaveCarryoverExpiryJob`, `CompensatoryOffExpiryJob`

### 18.5 Approval workflow engine
- Controllers: [WorkflowsController](../src/Api/TimeAttendanceSystem.Api/Controllers/WorkflowsController.cs), (ApprovalsController via Application layer), [ApprovalExecutionController](../src/Api/TimeAttendanceSystem.Api/Controllers/ApprovalExecutionController.cs)
- Application: [Workflows/](../src/Application/TimeAttendanceSystem.Application/Workflows/)
- Entities: `WorkflowDefinition`, `WorkflowStep`, `WorkflowInstance`, `WorkflowStepExecution`, `ApprovalDelegation`, `WorkflowSystemActionAudit`, `WorkflowRoleAssignmentCursor`
- Jobs: `WorkflowTimeoutProcessingJob`, `FrozenWorkflowCleanupJob`

### 18.6 Approval execution
- Executors (in Application layer): `AllowanceRequestExecutor`, `LoanApplicationExecutor`, `SalaryAdvanceExecutor`, `ExpenseClaimExecutor`, `BenefitEnrollmentExecutor`, `LetterRequestExecutor`
- Event: `RequestFinallyApprovedEvent`; handler: `RequestFinallyApprovedHandler`
- Outcome enum: `ExecutionOutcome`

### 18.7 Payroll
- Controllers: [PayrollPeriodsController](../src/Api/TimeAttendanceSystem.Api/Controllers/PayrollPeriodsController.cs), [PayrollSettingsController](../src/Api/TimeAttendanceSystem.Api/Controllers/PayrollSettingsController.cs), [OvertimeConfigurationController](../src/Api/TimeAttendanceSystem.Api/Controllers/OvertimeConfigurationController.cs), [EndOfServiceController](../src/Api/TimeAttendanceSystem.Api/Controllers/EndOfServiceController.cs), [EndOfServicePoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/EndOfServicePoliciesController.cs), [SalaryStructuresController](../src/Api/TimeAttendanceSystem.Api/Controllers/SalaryStructuresController.cs), [EmployeeSalariesController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeSalariesController.cs), [SalaryAdjustmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/SalaryAdjustmentsController.cs)
- Calculators (Application): [Payroll/Services/](../src/Application/TimeAttendanceSystem.Application/Payroll/Services/) — `IPayrollCalculationService`, `IPayrollInputResolver`, `ITaxCalculator`, `ISocialInsuranceCalculator`, `IOvertimePayCalculator`, `IAbsenceDeductionCalculator`, `IPayrollCalendarResolver`, `IProrationCalculator`
- Handler: [ProcessPayrollPeriodCommandHandler](../src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs)
- Service: `PayrollSideEffectReverser`, `EndOfServiceCalculator`
- Entities: `PayrollPeriod`, `PayrollRecord`, `PayrollRecordDetail`, `PayrollAdjustment`, `PayrollRunAudit`, `PayrollRunAuditItem`, `TaxConfiguration`, `SocialInsuranceConfiguration`, `PayrollCalendarPolicy`, `OvertimeConfiguration`, `EndOfServicePolicy`, `EndOfServiceBenefit`, `SalaryStructure`, `EmployeeSalary`, `SalaryAdjustment`
- Jobs: `BenefitDeductionSyncJob`

### 18.8 Compensation ancillaries
- Allowances: [AllowanceTypesController](../src/Api/TimeAttendanceSystem.Api/Controllers/AllowanceTypesController.cs), [AllowancePoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/AllowancePoliciesController.cs), [AllowanceAssignmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AllowanceAssignmentsController.cs), [AllowanceRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AllowanceRequestsController.cs) + `ExpireTemporaryAllowancesJob`
- Loans: [LoanTypesController](../src/Api/TimeAttendanceSystem.Api/Controllers/LoanTypesController.cs), [LoanPoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/LoanPoliciesController.cs), [LoanApplicationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/LoanApplicationsController.cs)
- Advances: [SalaryAdvancesController](../src/Api/TimeAttendanceSystem.Api/Controllers/SalaryAdvancesController.cs)
- Benefits: [BenefitPlansController](../src/Api/TimeAttendanceSystem.Api/Controllers/BenefitPlansController.cs), [BenefitEnrollmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/BenefitEnrollmentsController.cs), [BenefitClaimsController](../src/Api/TimeAttendanceSystem.Api/Controllers/BenefitClaimsController.cs), [OpenEnrollmentPeriodsController](../src/Api/TimeAttendanceSystem.Api/Controllers/OpenEnrollmentPeriodsController.cs) + `BenefitEnrollmentExpiryJob`, `OpenEnrollmentPeriodActivatorJob`
- Expenses: [ExpenseCategoriesController](../src/Api/TimeAttendanceSystem.Api/Controllers/ExpenseCategoriesController.cs), [ExpensePoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/ExpensePoliciesController.cs), [ExpenseClaimsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ExpenseClaimsController.cs)
- Letters: [LetterTemplatesController](../src/Api/TimeAttendanceSystem.Api/Controllers/LetterTemplatesController.cs), [LetterRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/LetterRequestsController.cs)

### 18.9 Recruitment & onboarding
- Controllers: [JobRequisitionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/JobRequisitionsController.cs), [JobPostingsController](../src/Api/TimeAttendanceSystem.Api/Controllers/JobPostingsController.cs), [CandidatesController](../src/Api/TimeAttendanceSystem.Api/Controllers/CandidatesController.cs), [JobApplicationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/JobApplicationsController.cs), [InterviewSchedulesController](../src/Api/TimeAttendanceSystem.Api/Controllers/InterviewSchedulesController.cs), [InterviewFeedbacksController](../src/Api/TimeAttendanceSystem.Api/Controllers/InterviewFeedbacksController.cs), [OnboardingTemplatesController](../src/Api/TimeAttendanceSystem.Api/Controllers/OnboardingTemplatesController.cs), [OnboardingTasksController](../src/Api/TimeAttendanceSystem.Api/Controllers/OnboardingTasksController.cs)
- Jobs: `OnboardingTaskOverdueJob`
- Lifecycle handler: `OfferAcceptedHandler`, `OnboardingCompletedHandler`

### 18.10 Performance, training, succession
- Controllers: [PerformanceReviewCyclesController](../src/Api/TimeAttendanceSystem.Api/Controllers/PerformanceReviewCyclesController.cs), [PerformanceReviewsController](../src/Api/TimeAttendanceSystem.Api/Controllers/PerformanceReviewsController.cs), [GoalDefinitionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/GoalDefinitionsController.cs), [CompetencyFrameworksController](../src/Api/TimeAttendanceSystem.Api/Controllers/CompetencyFrameworksController.cs), [PerformanceImprovementPlansController](../src/Api/TimeAttendanceSystem.Api/Controllers/PerformanceImprovementPlansController.cs), [FeedbackRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/FeedbackRequestsController.cs), [TrainingCategoriesController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingCategoriesController.cs), [TrainingCoursesController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingCoursesController.cs), [TrainingProgramsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingProgramsController.cs), [TrainingSessionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingSessionsController.cs), [TrainingEnrollmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingEnrollmentsController.cs), [TrainingAttendanceController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingAttendanceController.cs), [TrainingBudgetsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingBudgetsController.cs), [TrainingEvaluationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TrainingEvaluationsController.cs), [EmployeeCertificationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeCertificationsController.cs), [KeyPositionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/KeyPositionsController.cs), [TalentProfilesController](../src/Api/TimeAttendanceSystem.Api/Controllers/TalentProfilesController.cs), [SuccessionPlansController](../src/Api/TimeAttendanceSystem.Api/Controllers/SuccessionPlansController.cs), [CareerPathsController](../src/Api/TimeAttendanceSystem.Api/Controllers/CareerPathsController.cs)
- Jobs: `ReviewCycleReminderJob`, `PIPExpiryCheckJob`, `PipFollowThroughJob`, `TrainingSessionReminderJob`, `CertificationExpiryAlertJob`

### 18.11 Employee lifecycle & offboarding
- Controllers: [EmployeeContractsController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeContractsController.cs), [EmployeePromotionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeePromotionsController.cs), [EmployeeTransfersController](../src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeTransfersController.cs), [ResignationRequestsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ResignationRequestsController.cs), [TerminationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TerminationsController.cs), [ClearanceController](../src/Api/TimeAttendanceSystem.Api/Controllers/ClearanceController.cs), [FinalSettlementsController](../src/Api/TimeAttendanceSystem.Api/Controllers/FinalSettlementsController.cs), [ExitInterviewsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ExitInterviewsController.cs), [LifecycleAutomationController](../src/Api/TimeAttendanceSystem.Api/Controllers/LifecycleAutomationController.cs)
- Handlers: `ResignationApprovedHandler`, `TerminationCreatedHandler`, `ClearanceCompletedHandler`, `FinalSettlementPaidHandler`, `ContractExpiredHandler`
- Entity: `LifecycleAutomationAudit`

### 18.12 Workplace modules
- Announcements: [AnnouncementCategoriesController](../src/Api/TimeAttendanceSystem.Api/Controllers/AnnouncementCategoriesController.cs), [AnnouncementsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AnnouncementsController.cs) + jobs
- Assets: [AssetsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AssetsController.cs), [AssetCategoriesController](../src/Api/TimeAttendanceSystem.Api/Controllers/AssetCategoriesController.cs), [AssetAssignmentsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AssetAssignmentsController.cs), [AssetMaintenanceController](../src/Api/TimeAttendanceSystem.Api/Controllers/AssetMaintenanceController.cs) + jobs
- Employee Relations: [GrievancesController](../src/Api/TimeAttendanceSystem.Api/Controllers/GrievancesController.cs), [DisciplinaryActionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/DisciplinaryActionsController.cs), [InvestigationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/InvestigationsController.cs), [CounselingRecordsController](../src/Api/TimeAttendanceSystem.Api/Controllers/CounselingRecordsController.cs) + jobs
- Documents: [DocumentCategoriesController](../src/Api/TimeAttendanceSystem.Api/Controllers/DocumentCategoriesController.cs), [CompanyPoliciesController](../src/Api/TimeAttendanceSystem.Api/Controllers/CompanyPoliciesController.cs)
- Surveys: [SurveyTemplatesController](../src/Api/TimeAttendanceSystem.Api/Controllers/SurveyTemplatesController.cs), [SurveyDistributionsController](../src/Api/TimeAttendanceSystem.Api/Controllers/SurveyDistributionsController.cs), [SurveyResponsesController](../src/Api/TimeAttendanceSystem.Api/Controllers/SurveyResponsesController.cs) + jobs

### 18.13 Timesheets & projects
- Controllers: [TimesheetPeriodsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TimesheetPeriodsController.cs), [TimesheetsController](../src/Api/TimeAttendanceSystem.Api/Controllers/TimesheetsController.cs), [ProjectsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ProjectsController.cs), [ProjectTasksController](../src/Api/TimeAttendanceSystem.Api/Controllers/ProjectTasksController.cs)
- Jobs: `TimesheetPeriodGenerationJob`, `TimesheetSubmissionReminderJob`, `TimesheetPeriodClosureJob`

### 18.14 Configuration, notifications, operations
- Controllers: [CompanyConfigurationController](../src/Api/TimeAttendanceSystem.Api/Controllers/CompanyConfigurationController.cs), [NotificationsController](../src/Api/TimeAttendanceSystem.Api/Controllers/NotificationsController.cs), [OperationalAlertsController](../src/Api/TimeAttendanceSystem.Api/Controllers/OperationalAlertsController.cs), [OpsDashboardController](../src/Api/TimeAttendanceSystem.Api/Controllers/OpsDashboardController.cs), [GlobalSearchController](../src/Api/TimeAttendanceSystem.Api/Controllers/GlobalSearchController.cs), [PublicHolidaysController](../src/Api/TimeAttendanceSystem.Api/Controllers/PublicHolidaysController.cs)
- Services: `ICompanySettingsResolver`, `INotificationRecipientResolver`, `ISystemUserResolver`, `IFailureAlertService`, `GlobalSearchService`
- Hub: [NotificationHub](../src/Api/TimeAttendanceSystem.Api/Hubs/NotificationHub.cs)

### 18.15 Reports & analytics
- Controllers: [ReportsController](../src/Api/TimeAttendanceSystem.Api/Controllers/ReportsController.cs), [CustomReportsController](../src/Api/TimeAttendanceSystem.Api/Controllers/CustomReportsController.cs), [AnalyticsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AnalyticsController.cs), [DashboardController](../src/Api/TimeAttendanceSystem.Api/Controllers/DashboardController.cs), [SavedDashboardsController](../src/Api/TimeAttendanceSystem.Api/Controllers/SavedDashboardsController.cs), [AuditLogsController](../src/Api/TimeAttendanceSystem.Api/Controllers/AuditLogsController.cs)
- Jobs: `AnalyticsSnapshotJob`, `MonthlyAnalyticsRollupJob`, `ScheduledReportExecutionJob`

### 18.16 Frontend artefacts
- Admin routes: [app.routes.ts](../time-attendance-frontend/src/app/app.routes.ts)
- Admin sidebar: [sidenav.component.ts](../time-attendance-frontend/src/app/layout/sidenav/sidenav.component.ts)
- Admin menu service: [menu.service.ts](../time-attendance-frontend/src/app/core/menu/menu.service.ts)
- Self-service routes + portal pages: [portal/](../time-attendance-selfservice-frontend/src/app/pages/portal/)

---

## 19. Executive Summary of Current-State Maturity

### 19.1 Strong / operationally solid / production-ready
- **Core HR coverage** — all primary HR functions (employee master, org, leave, attendance, shifts, payroll, recruitment, onboarding, performance, training, offboarding) are implemented end-to-end with UI
- **Payroll pipeline** — production-safe, effective-dated, lockable, admin-unlockable, fully audited, line-itemized; two-pass allowance algorithm; reversible side-effects; real-Postgres integration test coverage
- **Workflow engine** — hardened with definition snapshots, role-assignment strategies, bounded delegation, fallback routing, return-for-correction, resubmit, validation rules, system-action audit, role-assignment cursor
- **Lifecycle automation** — seven event handlers with master kill-switch, per-flag gating, audit idempotency, substep independence, safety fallbacks
- **Operational visibility** — operational alerts, work queues, approved-not-executed, global omnibox search, ops dashboard
- **Bilingual + RTL UX** — fully synchronized EN/AR keys across admin and self-service
- **Real-time notifications** — SignalR hub with bilingual content, recipient role resolver
- **Security posture** — JWT + refresh cookie, 2FA, progressive lockout, password history, branch scope, session blacklist, comprehensive audit log
- **Config-driven thresholds** — no hardcoded business rules; everything in `CompanySettings` with branch / department overrides
- **Single-company, single-database architecture** — clean, no tenant resolution overhead, consistent schema

### 19.2 Operationally solid but with room to polish
- **Approval execution pipeline** — works for 6 request types with alerting; 10+ more request types rely on status reads rather than the executor pattern
- **Analytics framework** — daily + monthly snapshots with rich dashboards; scheduled reports need actual generation + delivery
- **Benefits deduction into payroll** — sync job writes adjustments; exact calculator integration flagged as "pending full implementation"

### 19.3 Complete enough for production but UI-missing
- End-of-Service policy management (API only)
- Lifecycle automation audit browser (API only)
- Payroll run audit drill-down (backend only)

### 19.4 Partial / deferred
- Scheduled report execution (framework only, no content generation / email)
- Alert rule configuration (fixed categories; no custom rules)
- Leave entitlements bulk upload (placeholder)
- User-to-Employee matching UX refinement
- Benefit deduction integrator finalization

### 19.5 Future-state BRD refinement recommendations (for discussion, not current behavior)
The following are **recommendations for the next BRD iteration** — not current-state behavior:

1. **Unify post-approval execution under one executor pattern** — bring vacation, excuse, remote work, attendance correction, shift swap, timesheet, transfer, promotion, payroll period approval, final settlement approval under the same `IApprovalExecutor` contract + `OperationalFailureAlert` safety net.
2. **Complete the scheduled-report pipeline** — implement generation + email delivery (SMTP or SES) to close the TODO.
3. **Add admin UIs for backend-ready audits** — EOS policy management, lifecycle automation audit browser, payroll run audit per-employee drill-down, configurable alert rules.
4. **Archival & retention policy** — jobs + policy for very old attendance transactions, audit log rows, soft-deleted payroll records.
5. **Expand automated test coverage** — CRUD-level backend tests and UI e2e tests for the long tail of modules.
6. **Formalize approver-resolution inferences** — multi-level manager resolution, delegation cycle detection, retry mechanisms should be confirmed with targeted tests.
7. **Consolidate legacy "HR" / "Admin" role names** — migrate all notification jobs to the single `NotificationRecipientRolesCsv` resolver and remove hardcoded role string fallbacks.
8. **Finalize benefit deduction integrator** in the payroll calculation pipeline.

### 19.6 Overall maturity verdict
The system is a **mature, production-ready HRMS** suitable for a single-company, multi-branch enterprise. Core HR, time & attendance, payroll, approval, and lifecycle flows are solid and well-guarded. The main opportunities are operational/UI polish around audit browsing, closing the last few partial-implementation gaps, and homogenizing the approval-to-execution pattern across all request types.

---

*End of Current-State BRD — derived from code, v14.8.*
