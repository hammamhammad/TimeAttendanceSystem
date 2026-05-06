# Development Guidelines for TecAxle HRMS

## System Overview

TecAxle HRMS is a comprehensive enterprise HRMS / workforce-management system owned and operated by **TecAxle**. A single backend, admin frontend, and self-service frontend serve a single company. Multi-branch within the company is fully supported (branches, departments, user branch scopes).

### High-level capabilities

- **Time & attendance tracking** — automated daily attendance, overtime, late/early detection, biometric fingerprint device integration
- **Leave management** — vacation types, policies, balances, accruals, transactions, approvals
- **Employee self-service portal** — employees manage their own vacation/excuse/remote-work/fingerprint requests; managers approve their team's
- **Approval workflows** — multi-step configurable approval processes with delegation, escalation, return-for-correction, resubmission
- **Organization management** — multi-branch, departments with hierarchy, employees, users, roles, permissions, user-branch-scopes
- **Shift management** — regular/flexible/split/rotating/night shifts, shift periods, shift assignments, off days, grace periods, overtime rules
- **Remote work management** — policies and requests for remote/hybrid work
- **Real-time notifications** — SignalR-based in-app notifications (web)
- **Comprehensive reporting** — attendance, leave, payroll, custom reports, audit logs
- **Recruitment** — job requisitions, postings, candidates, applications, interviews, offer letters
- **Onboarding** — templates, processes, tasks, documents
- **Performance management** — review cycles, reviews, goals, competencies, PIPs, 360 feedback
- **Payroll & compensation** — salary structures, periods, allowances, tax, social insurance, EOS calculation (production-safe pipeline)
- **Employee lifecycle** — contracts, promotions, transfers, salary adjustments
- **Offboarding** — resignations, terminations, clearances, exit interviews, final settlements
- **File upload & attachments** — centralized file storage with entity-linked attachments

### Single-company architecture

- **One database**: `tecaxle_hrms` (PostgreSQL). No master DB, no per-tenant DBs, no tenant-resolution middleware. Single `DefaultConnection` in `appsettings.json`.
- **One EF Core DbContext**: [TecAxleDbContext](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/TecAxleDbContext.cs).
- **JWT authentication**: `sub`, `email`, `roles`, `permissions`, `branch_scope`, `preferred_language`. **No** `tenant_id`, `is_platform_user`, or `platform_role` claims.
- **Single-step login**: `POST /api/v1/auth/login` with `{email, password}` → returns JWT + user info.
- **No subscription/entitlement system**: every feature is always enabled. No `[RequiresModule]`, `[RequiresModuleEndpoint]`, `[RequiresLimit]`, `[AllowModuleReadOnly]` attributes anywhere. No `EntitlementService`, `ModuleDeactivationService`, or `SystemModule` enum.
- **No Platform menu**: admin sidebar contains only business modules. No Tenants, Subscription Plans, or Platform admin UI.
- **No mobile app**: the Flutter ESS app and all mobile-specific backend surface (FCM push, NFC tags, GPS verification, mobile endpoints) were removed in v14.8. Employees interact with the system via the web self-service portal only. Branch GPS coordinates are retained as branch metadata (displayed on the admin map picker).
- **C# namespaces**: `TecAxle.Hrms.*` (project directories are still named `TimeAttendanceSystem.*` with `RootNamespace`/`AssemblyName` overrides in `.csproj`).

---

## Core Modules

### 1. Authentication & Authorization

- **Single-step email-based login**: `POST /api/v1/auth/login` with `{email, password}` — authenticates against the single DB, issues JWT + refresh token, returns `{accessToken, refreshToken, expiresAt, mustChangePassword, user}`.
- JWT refresh via `POST /api/v1/auth/refresh` with cookie-based refresh token.
- Two-factor authentication (TOTP) with backup codes.
- Role-based access control (RBAC) + fine-grained permission system (70+ resources, 26 actions, 223+ authorization policies).
- Branch-scoped access control via `UserBranchScope` — users only see data from their assigned branches (SystemAdmin sees all).
- Session management, blacklisted tokens, password policies & history tracking.
- Login attempt tracking + progressive lockout driven by company-configurable `LoginLockoutPolicyJson` in `CompanySettings`.

### 2. Organization Structure

- **Branches** — multi-branch organization support, GPS coordinates (latitude, longitude, `GeofenceRadiusMeters`) used as branch metadata with interactive Leaflet map picker. `Branch.ManagerEmployeeId` for workflow routing.
- **Departments** — hierarchical (parent-child), `Department.ManagerEmployeeId`.
- **Employees** — `IsActive`, `IsSuspended` (two-phase offboarding), `IsPreHire` (lifecycle automation), `OnboardingCompletedAt` milestone timestamp.
- **Users** — login accounts linked to employees via `EmployeeUserLink`.
- **Roles, Permissions, RolePermission, UserRole** — fine-grained RBAC.
- **UserBranchScope** — per-user branch access scope (empty = all branches / SystemAdmin).

### 3. Time & Attendance

- AttendanceRecord (daily auto-generated), AttendanceTransaction (check-in/out, break), calculated working hours, overtime, late/early minutes.
- Status tracking: Present, Absent, Late, OnLeave, Holiday, Weekend, etc.
- Manual override with approval workflow; finalization locks records.
- Device integration: biometric fingerprint devices.

### 4. Shift Management

- Shift types (Regular, Flexible, Split, Rotating, Night), ShiftPeriods, break configuration, grace periods, overtime rules per shift.
- ShiftAssignment — assign at employee / department / branch level with priority + temporary windows.
- Core hours enforcement, off days, shift changes tracked with history.

### 5. Leave Management

VacationType, EmployeeVacation, LeaveBalance, LeaveTransaction, LeaveAccrualPolicy, LeaveEntitlement. Monthly accrual job, expiry/carryover handling, calendar view.

### 6. Excuse Management

ExcusePolicy, EmployeeExcuse (with attachments), balance tracking, reset periods.

### 7. Remote Work Management

RemoteWorkPolicy, RemoteWorkRequest, blackout periods, department eligibility.

### 8. Approval Workflows

- WorkflowDefinition, WorkflowStep, WorkflowInstance, WorkflowStepExecution, ApprovalDelegation.
- Multi-step, approver types (Role, User, Manager, DirectManager, DepartmentHead, BranchManager).
- **v13.6 hardening**: per-step `RoleAssignmentStrategy` (FirstMatch, RoundRobin, LeastPendingApprovals, FixedPriority), bounded delegation depth + cycle detection, explicit `FailedRouting` terminal status, `ReturnForCorrection`/`Resubmit` non-terminal actions, validation rules via `IWorkflowValidationRule`, system-action audit trail (`WorkflowSystemActionAudit`), role-assignment cursor (`WorkflowRoleAssignmentCursor`), definition-version snapshots on instance creation.
- Endpoints: `POST /api/v1/approvals/{id}/return-for-correction`, `POST /api/v1/approvals/{id}/resubmit`, `GET /api/v1/workflows/validation-rules`, `GET /api/v1/workflows/system-actions`, `GET /api/v1/workflows/role-assignment-stats`.
- Company-configurable: `WorkflowFallbackApproverRole`, `WorkflowFallbackApproverUserId`, `MaxWorkflowDelegationDepth` (default 2), `MaxWorkflowResubmissions` (default 3).

### 9. Self-Service Portal

Separate Angular app (`time-attendance-selfservice-frontend/`, port 4201). Employees: attendance, vacation, excuse, remote-work, fingerprint requests, personal dashboard. Managers: team view, pending approvals, manager dashboard. All restricted to current user / team.

### 11. Fingerprint / Biometric Management

FingerprintRequest (Enrollment/Update/Repair/Replacement) with technician assignment, scheduling, status tracking.

### 12. Overtime Management

OvertimeConfiguration per branch with regular + premium rates, daily/weekly/monthly thresholds, automatic calculation integrated into attendance pipeline.

### 13. Public Holidays

Create, recurring, branch-specific, bilingual names. Automatic attendance impact.

### 14. Dashboards & Analytics

Admin (org/HR/attendance/leave/system stats), Manager (team stats, pending approvals), Employee (personal). Widgets with real-time refresh.

### 15. Reporting & Audit

Attendance, leave, payroll, custom reports. Full audit trail: `AuditLog` + `AuditChange` (field-level before/after). Session reports, login history. Scheduled reports via `ScheduledReportExecutionJob`.

### 16. System Administration

- Database seeding on first startup (see "First-run seed" below).
- Background jobs via **Coravel** — 35+ scheduled jobs (daily attendance, monthly accrual, workflow timeouts, contract/visa/document/certification expiry alerts, etc.).
- Permission management, system configuration.
- Global exception handler — standardized JSON error responses with `statusCode`, `message`, `traceId`.

### 17. Multi-Language Support

Full English + Arabic (RTL). Bilingual entity names. ~2,700+ translation keys per language, fully synchronized. `:host-context([dir="rtl"])` in component CSS.

### 18. Real-Time Notifications

SignalR hub at `/hubs/notifications`. Bilingual notifications (RequestSubmitted/Approved/Rejected/Delegated/Escalated/ApprovalPending/DelegationReceived/ApprovalReminder). Read tracking, action URLs.

### 19. Recruitment & Hiring

JobRequisition → JobPosting → Candidate → JobApplication → Interview/InterviewFeedback → OfferLetter. Pipeline analytics.

### 20. Onboarding

OnboardingTemplate + OnboardingTemplateTask → OnboardingProcess per employee → OnboardingTask + OnboardingDocument. Categories: Documentation, IT, HR, Training, Equipment, Access, Introduction.

### 21. Performance Management

PerformanceReviewCycle, PerformanceReview, GoalDefinition, CompetencyFramework / Competency / CompetencyAssessment, PerformanceImprovementPlan, FeedbackRequest360 / Feedback360Response.

### 22. Employee Lifecycle

EmployeeContract, EmployeePromotion, EmployeeTransfer, SalaryAdjustment, JobGrade. Sub-entities: EmployeeAddress, EmployeeBankDetail, EmployeeDependent, EmployeeEducation, EmployeeWorkExperience, EmployeeVisa, EmergencyContact, EmployeeProfileChange.

### 23. Payroll & Compensation

#### Production-safe calculation pipeline

Policy-driven, fully audited, finalized-payroll-locked. Every input is resolved by effective date; every multiplier comes from configuration; every run is audited. See `PAYROLL_PRODUCTION_FIX_REVIEW.md`.

- **`IPayrollCalculationService`** — per-employee orchestrator: resolver → calculators → result.
- **`IPayrollInputResolver`** — centralizes "which record applies for this period" for salary, allowances, tax, SI (nationality-filtered via `AppliesToNationalityCode`), employee insurance, OT (per-date), calendar policy, public holidays.
- **Calculators** (all stateless):
  - **`ITaxCalculator`** — progressive brackets, `IsTaxable` allowance filter.
  - **`ISocialInsuranceCalculator`** — `IsSocialInsurable` filter, `MaxInsurableSalary` cap, Employee + Employer lines.
  - **`IOvertimePayCalculator`** — reuses `OvertimeConfiguration.GetOvertimeRate(DayType)` + `RoundOvertimeHours` + `MeetsMinimumThreshold`. Day-type buckets: Holiday / weekend (when `WeekendAsOffDay=true`) / normal.
  - **`IAbsenceDeductionCalculator`** — `dailyRate = baseSalary / dailyBasisDays`.
  - **`IPayrollCalendarResolver`** — resolves `dailyBasisDays` per `PayrollCalendarPolicy.BasisType` (CalendarDays / WorkingDays / FixedBasis).
  - **`IProrationCalculator`** — overlap-fraction math for effective-dated inputs.
- **`PayrollCalendarPolicy`** — eliminates hardcoded 30-day month.
- **Two-pass allowances** — Fixed + `PercentageOfBasic` first → overtime pay → then `PercentageOfGross` against provisional gross.
- **Line-itemized `PayrollRecordDetail`** — every contribution with `Notes`.
- **Status lifecycle**: `Draft → Processing → Processed → Approved → Paid (🔒) | Cancelled`. Paid records are `LockedAtUtc`.
- **Endpoints**: `POST /api/v1/payroll-periods/{id}/{process|recalculate|approve|mark-paid|cancel|admin-unlock}` (admin-unlock is SystemAdmin-only, requires reason).
- **`PayrollRunAudit` + `PayrollRunAuditItem`** — append-only audit trail. `GET /api/v1/payroll-periods/{id}/run-audit`.
- **`PayrollRecord.CalculationBreakdownJson`** — forensic snapshot.

#### Allowances & policies

AllowanceType, AllowancePolicy, AllowanceAssignment (effective-dated), AllowanceRequest (workflow-driven), AllowanceChangeLog.

#### End-of-Service

`EndOfServicePolicy` + `EndOfServicePolicyTier` + `EndOfServiceResignationDeductionTier` — effective-dated, optional `CountryCode`. Saudi default seeded on first run. `IEndOfServiceCalculator` persists `AppliedPolicySnapshotJson` on `EndOfServiceBenefit`.

#### Settings controllers

- `PayrollSettingsController`: `GET/POST/PUT/DELETE /api/v1/payroll-settings/{tax-configs|social-insurance|insurance-providers|calendar-policies}[/{id}]`.
- `EndOfServicePoliciesController`: full EOS policy CRUD.

### 24. Offboarding

ResignationRequest → TerminationRecord → ClearanceChecklist (+ ClearanceItem) → FinalSettlement. ExitInterview separate. EndOfServiceBenefit computed from `EndOfServicePolicy`.

### 25. Lifecycle Automation (v13.5)

Automates seven HR lifecycle transitions via MediatR domain events. Every automation is configurable (per-setting), auditable (`LifecycleAutomationAudit`), idempotent, backward-compatible by default.

1. **Offer Accepted → Onboarding** — template resolved via `DefaultOnboardingTemplateId` → dept → branch → `IsDefault` fallback.
2. **Onboarding Completed → Activate** — milestone-only by default; opt-in activation via `AutoActivateEmployeeOnOnboardingComplete`.
3. **Resignation Approved → Termination** — opt-in via `AutoCreateTerminationOnResignationApproved`.
4. **Termination Created → Clearance + Suspend** — 8 hardcoded default items when `DefaultClearanceTemplateId` is null. Employee is suspended (`IsSuspended=true` + `User.IsActive=false`), not deactivated.
5. **Clearance Completed → Enable Settlement** — optional `RequireClearanceCompleteBeforeFinalSettlement` gate.
6. **Final Settlement Paid → Deactivate** — `Employee.IsActive=false` (fully off-boarded).
7. **Contract Expired → Action** — `ContractExpiryAlertJob` publishes `ContractExpiredEvent` for contracts with `EndDate ≤ today` + `Status=Active`. `ContractExpiredAction` ∈ (NotifyOnly / AutoMarkExpired / Suspend / Deactivate). Default fixes the silent "Active past end date" bug.

**`ILifecycleEventPublisher`** wraps MediatR `IPublisher` with try/catch — handler failures never propagate to the triggering command.

**16 new `CompanySettings` fields** — all additive, DB defaults preserve pre-v13.5 behavior. Master kill-switch: `LifecycleAutomationEnabled`.

**Audit API**: `GET /api/v1/lifecycle-automation/audit`, `GET /audit/{id}`, `GET /audit/by-entity`.

### 26. File Upload & Attachment System

- Local disk storage in `uploads/` (configurable for cloud).
- `POST /api/v1/files/upload` (multipart, 10MB max) / `GET /api/v1/files/{storedFileName}`.
- `FileAttachment` links files to any entity via `EntityType` + `EntityId`.
- Supported: PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX.

---

## Company Configuration & Policy Framework

- **`CompanySettings`** (table: `CompanySettings`, entity path: `src/Domain/TimeAttendanceSystem.Domain/Company/CompanySettings.cs`) — singleton row. Centralized operational settings covering 9 categories (General, Attendance, Leave, Payroll, Approval, Notification, Security, Business-Rule Thresholds, Lifecycle Automation). Renamed from `TenantSettings` in v14.5; all Tenant* naming was retired in v14.5/14.7. Mobile-only fields (`EnableGpsAttendance`, `EnableNfcAttendance`, `EnablePushNotifications`, `MobileCheckInEnabled`, `RequireNfcForMobile`, `RequireGpsForMobile`, `AllowMockLocation`) were removed in v14.8.
- **`BranchSettingsOverride`** — per-branch nullable overrides for attendance.
- **`DepartmentSettingsOverride`** — per-department overrides for default shift + approval comments.
- **`ICompanySettingsResolver.GetSettingsAsync(branchId?, deptId?)`** — inheritance chain Company → Branch → Department. 5-min memory cache, `InvalidateCache()` after mutation.

### Company-configurable business rules

All hardcoded business rules were moved to `CompanySettings` in v13.3 + v13.4. Examples:

- **Password policy**: `PasswordMinLength`, `LoginLockoutPolicyJson`.
- **Alert windows**: `ContractExpiryAlertDaysCsv` ("30,15,7"), `VisaExpiryAlertDaysCsv` ("90,60,30,15,7"), `DocumentExpiryAlertDaysCsv`, `AssetWarrantyExpiryAlertDaysCsv`, `AssetOverdueReturnAlertDaysCsv`, `TrainingSessionReminderDaysCsv`, `SuccessionPlanReminderDaysCsv`, `GrievanceSlaAlertDaysCsv`, `ReviewReminderDaysCsv`.
- **Validation thresholds**: `MaxVacationDaysPerRequest`, `MaxVacationFuturePlanningYears`, `MaxShiftGracePeriodMinutes`, `ExcuseBackwardWindowDays`, `ExcuseForwardWindowDays`, `MaxUploadSizeMb`, `AttendanceCorrectionMaxRetroactiveDays`, `DefaultProbationDays`, `OvertimeConfigMaxFutureDays`.
- **Notification recipients**: `NotificationRecipientRolesCsv` ("HRManager,SystemAdmin") — resolved via `INotificationRecipientResolver`.
- **Lifecycle automation flags** (16 fields, see v13.5 above).
- **Workflow routing** (v13.6): `WorkflowFallbackApproverRole`, `WorkflowFallbackApproverUserId`, `MaxWorkflowDelegationDepth`, `MaxWorkflowResubmissions`.

### Services

- **`IValidationSettingsProvider`** — scoped cache of thresholds for FluentValidation. `WarmAsync()` hydrates; `Current` is read synchronously inside rules.
- **`ICompanyPayrollCalendarService`** (renamed from `ITenantPayrollCalendarService` in v14.7) — one-off monthly daily-rate resolution outside the payroll pipeline.
- **`ISystemUserResolver`** — returns the system user ID (`IsSystemUser=true`, preferring `systemadmin`). 5-min cache, throws on unresolvable.
- **`INotificationRecipientResolver`** — single abstraction for resolving notification recipient user IDs by role CSV.
- **`ILifecycleEventPublisher`** — MediatR publisher wrapper that swallows handler failures.

### API endpoints

- `GET/PUT /api/v1/company-configuration` — company settings CRUD (renamed from `/api/v1/tenant-configuration` in v14.5)
- `GET /api/v1/company-configuration/resolved?branchId=&deptId=` — resolved settings with inheritance
- `GET/PUT/DELETE /api/v1/company-configuration/branches/{id}` — branch overrides

---

## Running the System

### Prerequisites

- **PostgreSQL 15+** running on localhost:5432 (tested with 18).
- **.NET 9 SDK** (project targets `net9.0`).
- **Node.js 20+** + npm.

### First-run setup

1. **Create the database**:
   ```bash
   psql -U postgres -c "CREATE DATABASE tecaxle_hrms;"
   ```

2. **Start the backend** (Terminal 1):
   ```bash
   cd src/Api/TimeAttendanceSystem.Api
   dotnet run
   ```
   - Runs on **http://localhost:5099**
   - On first run: applies `Initial` migration (~220 tables), runs `SeedData.SeedAsync`:
     - Roles + permissions
     - Two system admin users (`tecaxleadmin@system.local`, `systemadmin@system.local` — both password `TempP@ssw0rd123!`, `IsSystemUser=true`, SystemAdmin role)
     - Default shift, remote-work policy, workflow definitions, vacation types, excuse policy, allowance types, Saudi EOS policy
   - Swagger UI: http://localhost:5099/swagger

3. **Load sample business data** (one-time, optional):
   ```bash
   cd tools
   dotnet run --project RunSampleData.csproj
   ```
   - 5 branches (HQ/JED/DAM/MED/MAK), 20 departments, 50 employees + user accounts
   - All employee passwords: `Emp@123!` (`MustChangePassword=true` on first login)

4. **Start admin portal** (Terminal 2):
   ```bash
   cd time-attendance-frontend
   npm install    # first time only
   npm start
   ```
   - http://localhost:4200

5. **Start self-service portal** (Terminal 3):
   ```bash
   cd time-attendance-selfservice-frontend
   npm install    # first time only
   npm start
   ```
   - http://localhost:4201

### Default login credentials

| Role | Email | Password |
|---|---|---|
| SystemAdmin | `systemadmin@system.local` | `TempP@ssw0rd123!` |
| SystemAdmin | `tecaxleadmin@system.local` | `TempP@ssw0rd123!` |
| Branch Manager (sample) | `ahmed.rashid@company.com` | `Emp@123!` ⚠️ forced change |
| Dept Manager (sample) | `sara.fahad@company.com` | `Emp@123!` |
| Regular employee (sample) | `salma.khaldi@company.com` | `Emp@123!` |

Sample employees follow the pattern `{first}.{last}@company.com` / `Emp@123!`.

### Running applications summary

| Application | URL | Purpose |
|---|---|---|
| Backend API | http://localhost:5099 | REST API + SignalR Hub + Swagger |
| Admin Portal | http://localhost:4200 | Full system management (HR/Admin) |
| Self-Service Portal | http://localhost:4201 | Employee self-service + manager approvals |

### Troubleshooting

- **Backend won't start** → check PostgreSQL, verify `DefaultConnection` in `appsettings.json`.
- **Frontend compile errors** → `rm -rf node_modules && npm install`.
- **Port conflicts** → check 4200/4201/5099, use `--port` to change.
- **Can't log in** → use the full email address. `MustChangePassword` redirects on first login.
- **SignalR not connecting** → check browser console for WebSocket errors, verify JWT token is sent.

---

## General Development Rules

### Project Structure

- Split new components into three files (`ts`, `html`, `css`).
- Follow established folder patterns.
- **Two UI apps**: `time-attendance-frontend/` (4200), `time-attendance-selfservice-frontend/` (4201).

### Development Workflow

- Always give the plan first, then wait for confirmation.
- Compile / build after each phase, confirm 0 errors before continuing.
- Test features thoroughly before claiming completion.
- When testing UI changes, run backend + both frontends.
- Preserve existing DB data during migrations (additive only).

### Backend

- Background jobs via **Coravel**.
- Clean Architecture: Domain → Application → Infrastructure → API.
- EF Core for data access (PostgreSQL via Npgsql).
- DTOs for request/response, FluentValidation, AutoMapper, MediatR.
- Run backend on **http://localhost:5099**.

### Frontend

- Admin on **4200**, Self-service on **4201**.
- **Angular 20** template syntax: `@if` / `@for` / `@switch` (zero legacy directives).
- Angular Signals for reactive state.
- Standalone components only.
- **All user-facing text via `i18n.t('key')`** — never hardcode English strings.
- **Component CSS RTL**: use `:host-context([dir="rtl"])`.
- **CSS tokens**: `var(--app-*)` from [styles/variables.css](time-attendance-frontend/src/styles/variables.css) and [styles/erp-tokens.css](time-attendance-frontend/src/styles/erp-tokens.css). Never hardcode hex.
- **ERP Design System**: UI follows `ERP_Design_System.html`. All colors/typography/components are token-driven.

---

## Frontend Component Standards

### Required services

- **`NotificationService`** for all user notifications.
- **`ConfirmationService`** for confirmation dialogs.

### Shared components (mandatory)

#### View pages

**As of v15.0 there are no dedicated view-* components in most modules** — the view/edit split was collapsed into a single edit form that becomes read-only when the user lacks edit permission. Don't create new `view-*` components or `/view` routes. The 21 entities that retained display-only components (resignations, applications, performance reviews, timesheets, etc.) live at `/<entity>/:id/edit` URLs and use `StatusBadgeComponent`, `DefinitionListComponent`, `BadgeListComponent`, `FormHeaderComponent`, `DetailCardComponent` for layout.

#### List pages

Use `DataTableComponent`, `SearchFilterComponent` / `UnifiedFilterComponent`, `BulkActionsToolbarComponent`, `PaginationComponent`, `EmptyStateComponent`.

**Required pattern**: `<app-page-header>` has NO child content. Add/Create button goes on `<app-unified-filter>` via `[showAddButton]` + `[addButtonText]` + `(add)` event.

**Row actions** (v15.0): Don't render per-row action buttons. Just declare `[actions]="actions"` on `<app-data-table>` — the data-table renders a single ⋮ kebab menu in its top toolbar that operates on the selected row. The kebab is enabled only when exactly one row is checked. Use `computed<TableAction[]>()` with `condition` functions for conditional visibility. Don't include `view` actions (key='view'); they're filtered out globally because view/edit are unified.

**Column priority** (v15.0): Set `priority: 'high' | 'medium' | 'low'` on every `TableColumn` for responsive hiding. `low` hides at <1280px, `medium` hides at <1024px, `high` always visible. Calibrate so the high-priority columns fit a 1280px laptop without horizontal scroll.

**Enum values**: Frontend TypeScript enums use **string values** matching backend JSON serialization (`Draft = 'Draft'`, not `Draft = 1`).

#### Form pages

Use `FormHeaderComponent`, `FormSectionComponent` (with `variant="modern"`), `FormGroupComponent`, `SearchableSelectComponent`, `DateRangePickerComponent`, `TimeRangeInputComponent`, `LocationPickerComponent`.

**Read-only by permission** (v15.0): Every `edit-*` (and dual-purpose `create-*`) page must:
- Inject `PermissionService` and expose `canEdit(): boolean` returning `this.permissionService.has('<entity>.update')`.
- After form-population (`patchValue()`), call `if (!this.canEdit()) this.form.disable({ emitEvent: false });`.
- Hide Save/Reset/Submit buttons via `@if (canEdit())`. Cancel button text swaps: `canEdit() ? i18n.t('common.cancel') : i18n.t('common.back')`.
- Cancel/Back navigates to the LIST page (`/${entity}`), NOT to a `/view` URL — that path now redirects to `/edit`, causing a redirect loop.
- For ngModel/template-driven forms, wrap content in `<fieldset [disabled]="!canEdit()" style="border:0;padding:0;margin:0;">`.

**Reactive forms `[disabled]` rule** (v15.0): NEVER bind `[disabled]="EXPR"` on an element/component that also has `formControlName="..."` or `[formControl]`. Triggers Angular's runtime warning and can cause "changed after checked" errors. Use `form.get('x').disable({ emitEvent: false })` programmatically — wrap in `effect()` if reactive to signals, or call after `patchValue()` for one-shot disables. Buttons with `[disabled]` are fine; only form-control directives are affected.

#### Modal standards

- `ModalWrapperComponent` for custom modals.
- `ConfirmationModalComponent` (via `ConfirmationService`).

### Badge & status display rules

- **NEVER** use inline `<span class="badge">` — always `StatusBadgeComponent`.
- **NEVER** use manual `dt/dd` — always `DefinitionListComponent`.
- For DataTable columns, HTML injection pattern (documented exception).

### Modern Form Design System

All create/edit forms use `.app-modern-form`. Labels above inputs (not floating). Full-bordered inputs with focus ring.

### Modern View Design System

All view/detail pages use `.app-modern-view`. Clean cards (1px gray-200 border, 12px radius, shadow-sm), flat gray-25 card headers, 13px gray-500 DL labels, 14px gray-900 values, 2px underline tabs.

### Color palette (ERP Indigo Blue)

| Token | Value | Usage |
|---|---|---|
| `--app-primary` | `#4F6BF6` | Primary actions, links, focus |
| `--app-success` | `#22C55E` | Active, approved |
| `--app-danger` | `#EF4444` | Errors, rejected, inactive |
| `--app-warning` | `#F59E0B` | Pending |
| `--app-info` | `#3B82F6` | Info, in-progress |
| `--app-accent` | `#F97316` | Highlights |

Page bg: `#F5F6FA`. Sidebar: **light** `#F8FAFC` (ERP port, v14.9 — see below).

### Navigation & Layout (ERP Design System port, v14.9)

Both frontends use a light-indigo sidebar modeled on `ERP_Design_System.html`, replacing the previous dark-navy shell.

- **Brand**: "ERP Suite" — i18n key `nav.brand`. The left-side logo icon (purple gradient grid) opens the **Module Launcher**.
- **Sidebar** ([sidenav.component.*](time-attendance-frontend/src/app/layout/sidenav/)): 180px expanded / 56px collapsed, flush to the screen edge (no border-radius, no floating margin), light `#F8FAFC` background with a 1px right divider. Menu items are **pill-shaped** (6px radius, 7×14 padding), active state is indigo (`#E0E7FF` bg, `#4338CA` text) with a 3px absolute accent bar anchored at `left: -8px`. Long item text **wraps** (`white-space: normal; overflow-wrap: anywhere`) — no ellipsis truncation. Group section titles (MAIN/ORGANIZATION/etc.) are **not rendered** — groups are structural only, the area switcher plays the top-level grouping role.
- **Logo header strip**: `position: fixed`, top-left, width `--sidebar-header-width` (fixed 180px, never collapses), height = `--topbar-height` (44px). When the sidebar body collapses to 56px, the logo **overhangs** — this is intentional (ERP spec). Click the logo icon to open the Module Launcher.
- **Collapse toggle**: sidebar body header (not the topbar). Collapsed state persists to `localStorage['nav.sidebarCollapsed']`.
- **Area switcher** at the bottom of the sidebar — a popup over its trigger that filters the visible groups to one macro-area. Selected area persists to `localStorage['nav.activeArea']`. Navigating to a route auto-switches to the area that owns it. Admin areas (5): `dashboard`, `people`, `workforce`, `payroll`, `operations`. Self-service areas (4): `me`, `pay`, `services`, `approvals`. Tagged via the `area: NavAreaKey` field on each `MenuGroup` in [menu.service.ts](time-attendance-frontend/src/app/core/menu/menu.service.ts).
- **Module Launcher**: full-height left drawer (420px, slides from left, `translateX(-100%) → translateX(0)` over 0.25s) with a `backdrop-filter: blur(6px)` backdrop over the rest of the page. Shows 4 ERP modules: **HR** (active, indigo), **CRM** / **Sales** / **Inventory** (SOON placeholder badges). Active tile has an indigo border + `#F5F7FF` tint + inline blue check badge next to the module name. Click outside or Escape closes. Lives in [sidenav.component.html](time-attendance-frontend/src/app/layout/sidenav/sidenav.component.html) + CSS as `.module-launcher-backdrop` / `.module-launcher-panel`. Data comes from `MenuService.getModules()` / `activeModule()`.
- **Topbar** ([topbar.component.*](time-attendance-frontend/src/app/layout/topbar/)): 44px tall, `left: var(--sidebar-header-width)` so it always starts right of the fixed logo (doesn't reflow when the body collapses). **Breadcrumb** on the left (route-driven from `data.title` + `NavigationEnd`), icon buttons + user avatar on the right. Inline search was replaced with a **magnifier icon → popover** (360px, anchored below the icon); `Ctrl+K` opens it, `Escape` closes, submitting navigates to `/global-search?q=`. No hamburger toggle in the topbar — the collapse toggle lives in the sidebar body header.
- **Layout shell** ([layout.component.ts](time-attendance-frontend/src/app/layout/layout.component.ts)): drives `--sidebar-width` via an `effect()` (180/56/0 for expanded/collapsed/mobile) so topbar + main-content margins stay in sync with the live width.
- **CSS tokens** ([erp-tokens.css](time-attendance-frontend/src/styles/erp-tokens.css)):
  - `--app-sidebar-bg: #F8FAFC` / `--app-sidebar-hover: #EEF2FF` / `--app-sidebar-active: #E0E7FF`
  - `--app-sidebar-text: #475569` / `--app-sidebar-text-active: #4338CA`
  - `--app-sidebar-section-title: #98A2B3`
  - `--sidebar-width: 180px` (runtime-toggled to 56px)
  - `--sidebar-width-collapsed: 56px`
  - `--sidebar-header-width: 180px` (fixed, never collapses — drives topbar `left` and logo width)
  - `--topbar-height: 44px`
- **i18n keys added**: `nav.brand`, `nav.switchArea`, `nav.areas.{dashboard,people,workforce,payroll,operations,me,pay,services,approvals}`, `nav.modules.{title,subtitle,soon,active,areas_count,hr.*,crm.*,sales.*,inventory.*}`.
- **Budget**: both frontends have `anyComponentStyle.maximumError: 10kB` (self-service was bumped from 8kB to match admin — sidenav.component.css is the largest at ~9kB).

---

## Code Quality Standards

### TypeScript

- Signals (`signal()`, `computed()`), DI via `inject()`, avoid `any`.

### Templates

- `@if` / `@for` / `@switch` only.
- `@for` requires `track`.
- `i18n.t('key')` for all user-facing text.

### Styling

- Bootstrap 5 utility classes for layout.
- Never hardcode hex colors.
- Inter for UI, JetBrains Mono for codes/money.

---

## Backend Architecture Guidelines

### Clean Architecture layers

1. **Domain** (`TecAxle.Hrms.Domain`) — entities, enums, domain events. No other-layer deps.
2. **Application** (`TecAxle.Hrms.Application`) — DTOs, service interfaces, CQRS (MediatR), FluentValidation, AutoMapper. Depends on Domain only.
3. **Infrastructure** (`TecAxle.Hrms.Infrastructure`) — DbContext, EF configs, repository impls, background jobs (Coravel), external services. Depends on Domain + Application.
4. **API** (`TecAxle.Hrms.Api`) — controllers, SignalR hubs, middleware (GlobalExceptionHandler, Localization, RateLimiting), Swagger.

### Common patterns

- **Repository**: generic `GetByIdAsync`, `AddAsync`, `UpdateAsync`, `DeleteAsync`. Feature-specific for complex queries.
- **Service**: business logic (e.g. `AttendanceCalculationService.CalculateAttendanceAsync`).
- **DTO**: request + response DTOs.
- **CQRS**: MediatR commands + queries + handlers. Handlers inherit from `BaseHandler<TReq, TRes>` (provides `Context` + `CurrentUser`).

---

## Security Guidelines

### Authentication & Authorization

- JWT for API auth.
- Email-based single-step login.
- Token refresh (cookie-based).
- 2FA for sensitive accounts.
- Login attempt tracking + progressive lockout.
- Role-based + permission-based authorization.
- Branch-scoped data access via `UserBranchScope`.

### Data Security

- Passwords: PBKDF2-SHA256, 10000 iterations, unique salts.
- Password history tracking, blacklisted tokens.
- Audit all data modifications.
- Parameterized queries (EF Core).

### API Security

- Input validation every endpoint.
- Rate limiting middleware.
- HTTPS in production.
- CORS for dev: localhost:4200, 4201, 4202.
- **GlobalExceptionHandlerMiddleware** catches all unhandled exceptions, returns JSON `{ statusCode, message, traceId, detail?, stackTrace? }` (detail/stackTrace dev-only).

---

## Performance Guidelines

### Backend

- Async/await for all I/O.
- Pagination on list endpoints.
- `.Include()` to avoid N+1.
- Cache (e.g. `ICompanySettingsResolver` 5-min).
- Background jobs for long-running tasks.
- Proper EF indexing.

### Frontend

- Lazy-loaded routes (all use `loadComponent`).
- OnPush change detection.
- Unsubscribe from observables.
- `@for (item of items; track item.id)` — always `track`.

### Database

- Appropriate indexes (`HasIndex`).
- `Select` projection when possible.
- Batch operations.
- Connection pooling (default Npgsql).

---

## Testing Standards

### Before committing

- [ ] `dotnet build` with 0 errors
- [ ] `npx ng build` on both frontends with 0 errors
- [ ] Manually verify UI changes (4200 + 4201)
- [ ] Test with different roles (SystemAdmin, HRManager, Manager, Employee)
- [ ] Verify Arabic RTL
- [ ] Verify form validation + error handling + loading states

### Test projects (167 backend + 12 frontend passing; v14.7)

| Project | Tests | Coverage |
|---|---|---|
| `tests/TecAxle.Hrms.Payroll.Tests/` | 27 | Proration, Tax, Calendar, Absence calculators |
| `tests/TecAxle.Hrms.BusinessRules.Tests/` | 31 | EOS Saudi, LoginLockoutPolicy, CSV parsing, NotificationRecipientResolver, v13.4 defaults |
| `tests/TecAxle.Hrms.LifecycleAutomation.Tests/` | 91 | Handler behavior, idempotency, kill-switch, employee state, Phase 1-4 coverage, Phase 6/7 deprecation pins, Phase 6 real-Postgres rollback integration (3) |
| `tests/TecAxle.Hrms.Workflow.Tests/` | 18 | Dept-head routing, role strategies, delegation, validation rules, snapshot versioning |

### Three test layers (v14.7)

Tests are split into three clearly-labelled layers. Each has a dedicated script in `scripts/`:

| Layer | Script | Requires Postgres | What runs |
|---|---|---|---|
| Backend unit | `./scripts/test-backend-unit.sh` | No (auto-skips) | Everything in `./TimeAttendanceSystem.sln`. `[PostgresRequiredFact]` tests auto-skip when `HRMS_INTEGRATION_DB` is unset and no dev Postgres is reachable. |
| Backend integration | `./scripts/test-backend-integration.sh` | Yes | `PayrollTransactionRollbackTests` against real Postgres transactions, FK constraints, full migration chain. See `PostgresTestHarness`. |
| Frontend | `./scripts/test-frontend.sh` | No | Karma + Jasmine specs (12 passing) via headless Chrome. |
| All layers | `./scripts/test-all.sh` (bash) / `./scripts/test-all.ps1` (PowerShell) | Optional | Runs all three in sequence. |

### Postgres integration harness

- **`PostgresTestHarness`** (tests/TecAxle.Hrms.LifecycleAutomation.Tests/) provisions a disposable `tecaxle_test_{guid}` database per test class, applies the full EF migration chain, and drops it on tear-down.
- Point at any Postgres cluster via `HRMS_INTEGRATION_DB` env-var; falls back to the dev connection string when unset.
- CI (`.github/workflows/ci.yml`) runs the integration job against a Postgres 18 service container in a dedicated `backend-integration` job.
- **`[PostgresRequiredFact]`** attribute auto-skips with a precise reason when the cluster is unreachable.

---

## Deployment

### Production environment

- **Backend + DB**: Ubuntu 24.04 LTS at `https://api.clockn.net`
- **Admin Portal**: Cloudflare Pages at `https://www.clockn.net`
- **Self-Service Portal**: Cloudflare Pages at `https://portal.clockn.net`

### Production considerations

- Environment-specific `appsettings.Production.json`.
- HTTPS + SSL.
- Daily DB backups + continuous WAL.
- Log aggregation + error tracking.
- Production frontend builds (`ng build --configuration production`).
- CDN (Cloudflare Pages).
- Migration pipeline (EF migrations at deploy or bundles).
- Proper CORS for production domains.
- SignalR in load-balanced env needs Redis backplane.

---

## Quick Reference

### Essential commands

```bash
# --- Backend ---
cd src/Api/TimeAttendanceSystem.Api && dotnet run

# Migration
dotnet ef migrations add MigrationName \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api

dotnet ef database update \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api

# --- Sample data ---
cd tools && dotnet run --project RunSampleData.csproj

# --- Admin frontend ---
cd time-attendance-frontend && npm start
cd time-attendance-frontend && npx ng build

# --- Self-service frontend ---
cd time-attendance-selfservice-frontend && npm start
cd time-attendance-selfservice-frontend && npx ng build

# --- Tests ---
cd tests/TecAxle.Hrms.Payroll.Tests && dotnet test
```

### Key file locations

#### Backend

| Area | Path |
|---|---|
| API entry | [Program.cs](src/Api/TimeAttendanceSystem.Api/Program.cs) |
| Controllers | [src/Api/TimeAttendanceSystem.Api/Controllers/](src/Api/TimeAttendanceSystem.Api/Controllers/) |
| SignalR hubs | [src/Api/TimeAttendanceSystem.Api/Hubs/](src/Api/TimeAttendanceSystem.Api/Hubs/) |
| Middleware | [src/Api/TimeAttendanceSystem.Api/Middleware/](src/Api/TimeAttendanceSystem.Api/Middleware/) |
| Filters | [src/Api/TimeAttendanceSystem.Api/Filters/](src/Api/TimeAttendanceSystem.Api/Filters/) |
| Application | [src/Application/TimeAttendanceSystem.Application/](src/Application/TimeAttendanceSystem.Application/) |
| BaseHandler | [BaseHandler.cs](src/Application/TimeAttendanceSystem.Application/Common/BaseHandler.cs) |
| ICurrentUser | [ICurrentUser.cs](src/Application/TimeAttendanceSystem.Application/Abstractions/ICurrentUser.cs) |
| IApplicationDbContext | [IApplicationDbContext.cs](src/Application/TimeAttendanceSystem.Application/Abstractions/IApplicationDbContext.cs) |
| LoginCommandHandler | [LoginCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/Authorization/Commands/Login/LoginCommandHandler.cs) |
| Domain entities | [src/Domain/TimeAttendanceSystem.Domain/](src/Domain/TimeAttendanceSystem.Domain/) |
| CompanySettings | [CompanySettings.cs](src/Domain/TimeAttendanceSystem.Domain/Company/CompanySettings.cs) (renamed from `TenantSettings` in v14.5) |
| DbContext | [TecAxleDbContext.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/TecAxleDbContext.cs) |
| SeedData | [SeedData.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/SeedData.cs) |
| Migrations | [Persistence/PostgreSql/Migrations/](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/) |
| EF configs | [Persistence/PostgreSql/Configurations/](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/) |
| Background jobs | [BackgroundJobs/](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/) |
| Services | [Services/](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/) |
| JwtTokenGenerator | [JwtTokenGenerator.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Security/JwtTokenGenerator.cs) |
| Payroll calculators | [Payroll/Services/](src/Application/TimeAttendanceSystem.Application/Payroll/Services/) |
| Payroll handler | [ProcessPayrollPeriodCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs) |
| Lifecycle automation | [Lifecycle/](src/Application/TimeAttendanceSystem.Application/Lifecycle/) |
| Workflow engine | [Workflows/](src/Application/TimeAttendanceSystem.Application/Workflows/) |
| Appsettings | [appsettings.json](src/Api/TimeAttendanceSystem.Api/appsettings.json), [appsettings.Development.json](src/Api/TimeAttendanceSystem.Api/appsettings.Development.json) |

#### Admin frontend (`time-attendance-frontend/`)

| Area | Path |
|---|---|
| Pages | [src/app/pages/](time-attendance-frontend/src/app/pages/) |
| Shared components | [src/app/shared/components/](time-attendance-frontend/src/app/shared/components/) |
| Core services | [src/app/core/services/](time-attendance-frontend/src/app/core/services/) |
| Auth service | [auth.service.ts](time-attendance-frontend/src/app/core/auth/auth.service.ts) |
| Auth guards | [src/app/core/auth/guards/](time-attendance-frontend/src/app/core/auth/guards/) |
| Menu service | [menu.service.ts](time-attendance-frontend/src/app/core/menu/menu.service.ts) |
| Sidenav | [sidenav.component.ts](time-attendance-frontend/src/app/layout/sidenav/sidenav.component.ts) |
| i18n | [src/app/core/i18n/translations/](time-attendance-frontend/src/app/core/i18n/translations/) |
| CSS tokens | [variables.css](time-attendance-frontend/src/styles/variables.css), [erp-tokens.css](time-attendance-frontend/src/styles/erp-tokens.css) |
| Routes | [app.routes.ts](time-attendance-frontend/src/app/app.routes.ts) |

#### Self-service frontend (`time-attendance-selfservice-frontend/`)

| Area | Path |
|---|---|
| Portal pages | [src/app/pages/portal/](time-attendance-selfservice-frontend/src/app/pages/portal/) |
| Portal service | [portal.service.ts](time-attendance-selfservice-frontend/src/app/pages/portal/services/portal.service.ts) |
| Portal models | [src/app/pages/portal/models/](time-attendance-selfservice-frontend/src/app/pages/portal/models/) |
| Menu service | [menu.service.ts](time-attendance-selfservice-frontend/src/app/core/menu/menu.service.ts) |
| i18n | [src/app/core/i18n/translations/](time-attendance-selfservice-frontend/src/app/core/i18n/translations/) |
| Shared components | [src/app/shared/components/](time-attendance-selfservice-frontend/src/app/shared/components/) |

---

## Feature-specific rules

### Attendance

- Recalculate working hours after any modification.
- Consider shift periods + break times.
- Validate against core-hours compliance.
- Check for overlapping transactions.
- Apply grace periods before marking late.
- Calculate regular + premium overtime.
- Track manual overrides separately.

### Payroll

- **Never hardcode** multipliers/day-counts/rates. All values come from configuration entities, resolved by effective date via `IPayrollInputResolver`.
- Reuse `OvertimeConfiguration` entity methods. Do not reimplement OT math.
- All new payroll inputs must be effective-dated.
- Add new calculations as calculator services, not `if` blocks in the handler.
- Respect the lifecycle lock: any mutation to `PayrollRecord` / `PayrollPeriod` must first check `LockedAtUtc.HasValue` and reject when set.
- Write a `PayrollRunAudit` row for any operation that changes payroll records.
- Surface warnings, don't fail silently.
- Normalize date-keyed lookups to `DateTime.SpecifyKind(d.Date, DateTimeKind.Unspecified)`.
- For proration, use `IProrationCalculator.GetFraction`.
- Recalculation is explicit — `POST /{id}/recalculate`, never `/process` twice.
- Line-itemize every contribution in `PayrollRecordDetail`.

### Leave Management

- Validate balance before approval.
- Update leave transactions for all balance changes.
- Handle accruals per `LeaveAccrualPolicy`.
- Consider carryover + expiry.
- Integrate with approval workflows.
- Update attendance records when leave is approved.

### Shift Assignment

- Respect priority for overlaps.
- Support effective date ranges.
- Handle shift changes with history tracking.
- Validate shift periods don't overlap.
- Support employee / department / branch-level assignments.

### Approval Workflows

- Multi-step processes.
- Approver types: Role, User, Manager, DirectManager, DepartmentHead, BranchManager.
- Timeout + escalation.
- Delegation with bounded depth + cycle detection.
- Track history + comments.
- Notifications at each step.
- Cancellation, return-for-correction, resubmission.

### Self-Service Portal

- Restrict data to current employee.
- Managers access team data only.
- Validate before submitting requests.
- Show balance info before allowing requests.
- Allow cancellation with proper validation.
- Real-time status updates via SignalR.

### Notifications

- SignalR for real-time.
- Bilingual content.
- Action URLs for navigation.
- Track read/unread.
- Target users/groups via `INotificationRecipientResolver`.

### Reporting

- Flexible date-range + branch/department/employee filters.
- Pagination for large datasets.
- CSV export.
- Loading states during generation.

---

## Common Mistakes to Avoid

- Forgetting to validate leave balances before approval
- Not recalculating attendance after shift changes
- Missing branch scope in data queries
- Not handling Arabic RTL layout
- Using inline styles instead of shared components
- Forgetting to update audit logs
- Missing pagination on large datasets
- Not sending notifications for workflow events
- Hardcoding business rules — move to `CompanySettings`
- Hardcoding role names in notification queries — use `INotificationRecipientResolver`
- Using `Role.Name == "HR"` pattern — use `NotificationRecipientRolesCsv` setting
- Hardcoding 30-day month in payroll math — use `IPayrollCalendarResolver`
- Adding `if`-block payroll logic instead of a new calculator service
- Writing a migration that drops/renames a column without preserving data
- Adding a new `view-*` component or `/view` route (v15.0) — single edit form per entity, use `[readonly]` based on permission
- Per-row action buttons in list pages (v15.0) — declare `actions` on `app-data-table` and the kebab will render them
- Including a `view` action on a list page (v15.0) — filtered out globally; just don't define it
- Cancel/Back in an edit page navigating to `/<entity>/:id/view` (v15.0) — use the LIST URL `/<entity>`; `/view` redirects to `/edit` and creates a loop
- Binding `[disabled]` on an input that has `formControlName` (v15.0) — disable programmatically via `form.get('x').disable()` (in `effect()` if reactive to signals)
- Using `[value]="x"` on a `<select>` to set its initial selection (v15.0) — use `[selected]="opt === x"` on each `<option>` instead; `[value]` doesn't fire reliably on first render
- Setting `table-layout: fixed` on a data-grid (v15.0) — overflows `.grid-container { overflow: hidden }`. Use `auto` and rely on `.table-responsive { overflow-x: auto }` for horizontal scroll fallback

---

## Related Documentation

### Background & architectural reviews

- `PAYROLL_PRODUCTION_FIX_REVIEW.md` — v13.0 payroll rewrite
- `HARDCODED_BUSINESS_RULES_FIX.md` — v13.3 policy/settings migration
- `HARDCODED_RULES_REMAINING_FIX.md` — v13.4 remaining rules + resolver
- `LIFECYCLE_AUTOMATION_FIX.md` — v13.5 lifecycle automation
- `WORKFLOW_ROUTING_HARDENING_FIX.md` — v13.6 workflow routing
- `MODULE_ENTITLEMENT_ENFORCEMENT_FIX.md` — v13.2 (historical; entitlement layer removed in v14.0)
- `HRMS_BUSINESS_FLOW_REVIEW.md` — business flow overview
- `PHASE1_CRITICAL_FIX_IMPLEMENTATION.md` — v14.1 approval execution + payroll transactional safety
- `PHASE2_IMPLEMENTATION_REPORT.md` — v14.2 attendance timezone + operational visibility
- `PHASE3_IMPLEMENTATION_REPORT.md` — v14.3 shift auto-checkout + global search
- `PHASE4_IMPLEMENTATION_REPORT.md` — v14.4 admin UI + legacy deprecation
- `PHASE5_TENANT_CLEANUP_REPORT.md` + `PHASE5_SIGNOFF_ADDENDUM.md` — v14.5 Tenant→Company rename
- `PHASE6_IMPLEMENTATION_REPORT.md` — v14.6 real-Postgres harness + deprecation retirements + omnibox
- `FINAL_CLEANUP_AND_POLISH_REPORT.md` — v14.7 final consolidated cleanup

### Testing

- `TestCases/00_TEST_CASES_INDEX.md`
- `TestCases/TEST_DATA_SETUP_GUIDE.md`

### Deployment

- `UBUNTU_DEPLOYMENT_GUIDE.md`

---

**Last Updated**: May 5, 2026
**Version**: 15.0 — Grid + View/Edit Unification

System is a single-company HRMS with one database (`tecaxle_hrms`), one `TecAxleDbContext`, single-step email+password login, and no subscription/entitlement system. The v14.x series replaced the multi-tenant SaaS architecture, retired every remnant of tenant-based naming and dead entitlement metadata, hardened payroll transactional safety via real-Postgres integration tests, removed the Flutter mobile app (v14.8), and in v14.9 ported both web frontends' navigation and layout shell to the ERP Design System. **v15.0 unifies the list-page and form trees**: the per-row Actions column was replaced with a single table-level kebab menu, the `view-*`/`edit-*` component split was collapsed into a single edit form that becomes read-only when the user lacks edit permission, and the grid header / responsive / filter-popover layers were rebuilt for predictability.

### Summary of v15.0 changes (Grid + View/Edit Unification)

Two big architectural changes plus a long tail of corrections that fell out of them. All changes are frontend-only — no backend, no DB schema, no API contract changes.

**1. Per-row Actions removed → table-level kebab menu**

- `app-data-table` no longer renders a per-row Actions column. The `actions: TableAction[]` input still works the same; the kebab in the new top toolbar is what renders them.
- New `.grid-row-toolbar` strip at the top of every list-page table (above the column headers, just below the page-level Refresh + Add button). Layout: `[hint text] [⋮ kebab]`.
- The kebab is enabled only when **exactly one row is selected** (via the existing checkbox column). Hint text reads "Select a row to enable actions" / "1 row selected" / "N rows selected" via `common.select_row_for_actions` / `one_row_selected` / `rows_selected`.
- Click ⋮ → dropdown shows the available actions for the selected row (after each action's `condition` callback). Click → emits `actionClick` with that row.
- `view` actions are filtered out globally in `getAvailableActions()` so they never render in the kebab — the historical View entries can stay in `actions: TableAction[]` arrays but they're inert.
- Closes on outside click + Escape.
- Files: `time-attendance-frontend/src/app/shared/components/data-table/data-table.component.ts` and the mirrored self-service copy.

**2. View/Edit unification — single edit form per entity**

- All `/<entity>/:id/view` URLs are gone. **56 routes** redirect (`pathMatch: 'full'`, `redirectTo: '/<entity>/:id/edit'`) to their edit equivalents. **21 view-only routes** that had no edit equivalent (resignations, applications, performance reviews, timesheets, etc.) had `path: '...:id/view'` simply renamed to `path: '...:id/edit'` — the underlying view-* component still loads, just at the unified URL.
- **53 orphan `view-*` component folders deleted** under `time-attendance-frontend/src/app/pages/...`. Routes already redirected away from them.
- Edit forms become read-only when the user lacks the `<entity>.update` permission. Standard pattern in every `edit-*` (and dual-purpose `create-*`) component:
  - Inject `PermissionService`, expose a `canEdit(): boolean` getter (`return this.permissionService.has('<entity>.update');`).
  - After form-population (`patchValue()`), call `if (!this.canEdit()) this.form.disable({ emitEvent: false });`.
  - Hide Save / Reset / Submit buttons via `@if (canEdit())`.
  - Cancel button text swaps: `canEdit() ? i18n.t('common.cancel') : i18n.t('common.back')`.
- For form components that take a `[readonly]` boolean input (e.g. `DepartmentFormComponent`), changes are reflected via `ngOnChanges` so toggling `enable()` / `disable()` lives at the form-component level instead of the page level.
- 4 `create-*` components that use plain JS objects + ngModel (not `FormGroup`) carry a `// TODO: wire up readonly disable when canEdit is false (form is a plain object with ngModel — not a FormGroup)` comment instead. Those need fieldset wrapping (`<fieldset [disabled]="!canEdit()">`).
- Form-header default actions stripped — no more "View Details" or "Edit" jump buttons. Only the Back-to-list button remains.
- **Edit-page Cancel/Back navigates to the LIST page** (e.g. `/branches`), NOT the old `/view` URL — that previously caused an infinite redirect loop (`/edit` → click Back → `/view` → redirects to `/edit`). Same for post-save redirects.
- List-page row-click handlers still navigate to `[entity, id, 'view']` and that's intentional — the route silently redirects to edit, which is the desired UX.

**3. Data-table layout fixes (system-wide)**

The chain of fixes that ended at the current behavior:

- `table.data-grid` → `table-layout: auto` so each column auto-sizes to fit its header + cell content. NOT `fixed` (that mode used the larger of "table width" or "sum of column widths" and overflowed `.grid-container { overflow: hidden }` clipping the rightmost columns).
- Headers stay on **one line** (`white-space: nowrap`). No truncation, no wrapping. Long labels grow the column.
- `.table-responsive { overflow-x: auto; overflow-y: visible; }` — when the resulting table is wider than the viewport, the user gets a horizontal scrollbar **inside** the rounded `.grid-container` (which keeps `overflow: hidden` for clean borders). `overflow-y: visible` keeps filter popovers floating correctly.
- Tightened header chrome: `padding: 12px 12px` (down from 12 16), `letter-spacing: 0.4px` (down from 0.5).
- Cell `overflow-wrap: break-word` so long values wrap on word boundaries without breaking words mid-character.
- Page-size `<select>` uses `[selected]="size === getPageSizeValue()"` on each `<option>`, NOT `[value]` on the select. The latter doesn't reliably set the displayed option on first render — the select would display "5" while the table actually rendered 10 rows.

**4. Responsive priority breakpoints — settled at 1280 / 1024**

The `priority: 'low' | 'medium' | 'high'` field on `TableColumn` was already there but the `data-priority` attribute was never being emitted on `<th>`/`<td>` (so the CSS rules never fired). Fixed via `[attr.data-priority]="column.priority || null"` on both header cells and body cells.

Final breakpoints (after a few iterations — 1600/1400 was too aggressive, 1440/1200 still too aggressive — settled here):
- `@media (max-width: 1280px)`: hide `priority="low"` columns
- `@media (max-width: 1024px)`: hide `priority="medium"` columns
- `@media (max-width: 768px)`: switch to mobile-card layout (existing)

Calibrate column priority for a 1280px laptop. 11 list-page tables had business-critical columns that were marked too aggressively (`employmentStatus`, `overtimeHours`/`lateMinutes`, `taxableBadge`, `currentStatus`, etc.) — promoted to `medium` or `high`.

**5. Filter popover — signal-backed inputs + null-row support**

The big root-cause fix: `columnType` and `options` on `FilterPopoverComponent` were plain `@Input` properties read by `computed()`. Computed only tracks **signal** dependencies, so the popover memoized stale results from initial empty options. Fixed by wrapping with setter-backed signals:

```ts
private _options = signal<{ label: string; value: any }[]>([]);
@Input() set options(val: ...) { this._options.set(val ?? []); }
get options() { return this._options(); }
```

Same fix applied to `SearchableSelectComponent` (the `filteredOptions` computed had identical staleness — typing "dal" returned no results until managers loaded).

UX improvements:
- For list-bounded column types (reference / enum / status / boolean), `widgetType` always renders the list widget — even when there are no distinct values. Empty state = clean dashed-border card with "No values to filter by" + two presence-operator chips ("Is empty" / "Is not empty"). The misleading "Search…" input is hidden when options is empty.
- New `FILTER_EMPTY_SENTINEL = '__filter_empty_value__'` constant in `filter-engine/types.ts`.
- New `emptyValueLabel?: string` field on `TableColumn`. When set AND the data has any null/empty rows in that field, `buildFilterOptions()` prepends a synthetic option `{ label: emptyValueLabel, value: FILTER_EMPTY_SENTINEL }` to the dropdown. Example: department list's parent column declares `emptyValueLabel: i18n.t('department.root_department')` so "Root Department" shows up as a clickable filter value.
- `data-table.onApplyFilter()` rewrites the descriptor: when `value === FILTER_EMPTY_SENTINEL`, operator becomes `isEmpty` (or `isNotEmpty` when the original was `notEquals`), value/value2 cleared.

**6. `[disabled]` + `formControlName` warnings — eliminated**

Angular's runtime warning fires when `[disabled]="EXPR"` is bound on an element/component that also has `formControlName="..."` or `[formControl]`. Fixed across 5 form files (10 attribute removals): employee-vacations create+edit, leave-entitlement-form, talent-profiles create, succession-plans create, employee-excuse request form, edit-role.

Replacement pattern: `effect()` in the constructor that watches the relevant signals and calls `ctrl.disable({ emitEvent: false })` / `ctrl.enable({ emitEvent: false })` only when the current state differs. For `populateForm()`-style flows, just call `form.disable()` after `patchValue()`.

**7. Manager dropdown refactor (department form)**

`pages/departments/department-form/` previously rolled its own dropdown for the Manager field (raw input + manual `dropdown-menu` + custom focus/blur/search state). v15.0 swapped it for the standard `<app-searchable-select>` (matching Branch and Parent Department on the same form). Removed branch-scoping: managers were previously loaded with `getManagers(branchId)` so a department in Dammam couldn't list a manager from Makkah. Real-world usage needs cross-branch managers (regional, shared services), so `loadManagers()` now passes no branch filter — any active employee is a candidate.

**8. Modern form pseudo-element fix**

Bootstrap's `.form-floating > label::after` pseudo-element renders a small white masking rectangle behind floating labels (so they look clean overlapping inputs). In `app-modern-form`, the label sits ABOVE the input (not floating), so this pseudo showed up as a stray bar at the top of textareas. Killed in `components.css` (admin + self-service) via `display: none !important; content: none !important;`.

**9. i18n keys cleaned**

- `filter.no_values` ("No values to filter by") + `filter.no_match` ("No matching values") added.
- `common.select_row_for_actions` / `common.one_row_selected` / `common.rows_selected` added (kebab-toolbar hints).
- Duplicate `type_probationary` / `type_part_time` keys removed from the `employee_contracts` block in `en.json` (build was emitting "Duplicate key" warnings).

**Going forward**

- Don't add new `view-*` components. Single edit form per entity with `[readonly]="!canEdit()"`.
- Don't add per-row action columns to list pages. Just declare `actions: TableAction[]` on the data-table input — the kebab renders them at the top of the table. Don't include `view` actions; they're filtered out.
- Don't bind `[disabled]` directly on inputs/selects/components that use `formControlName` or `[formControl]`. Use `form.get('x').disable()` programmatically (in an `effect()` if reactive to signals).
- Set `priority: 'high' | 'medium' | 'low'` on every `TableColumn` for proper responsive hiding. High = always visible. Medium = hides at <1024px. Low = hides at <1280px.
- Set `emptyValueLabel` on a column when null rows have a meaningful UI render (e.g. badges like "Root Department", "Unassigned"). The filter list will surface that as a clickable empty-rows option.
- Edit-page Cancel/Back navigates to the LIST page, not back to a `/view` URL. Same for post-save redirects.

### Summary of v14.9 changes (ERP Design System Navigation Port)

Both frontends (admin + self-service) adopted the Navigation & Layout section of `ERP_Design_System.html` with local adaptations. See the **Navigation & Layout** subsection under *Frontend Component Standards* above for the full specification — this entry is just the changelog.

- **Brand** → "ERP Suite" (`nav.brand` i18n key). The purple gradient grid icon in the top-left opens the Module Launcher.
- **Sidebar skin** flipped from dark navy `#0F1629` to light `#F8FAFC` with indigo pill active state (`#E0E7FF` bg, `#4338CA` text, 3px accent bar). Widths changed from 250/72 → 180/56. Now flush to the screen edge with no border-radius or floating margin.
- **Logo strip is `position: fixed`** at top-left with `--sidebar-header-width: 180px` — stays visible and at full width when the body collapses to 56px (ERP "overhang" pattern). The topbar always starts at `left: var(--sidebar-header-width)` so the breadcrumb never slides under the logo.
- **Group section titles removed** from the sidebar HTML (MAIN/ORGANIZATION/etc. no longer render). Groups are structural only; the area switcher is the new top-level grouping.
- **Area switcher** added at the bottom of the sidebar — Dashboard/People/Workforce/Payroll/Operations (admin) or Me/Pay/Services/Approvals (self-service). `MenuGroup.area: NavAreaKey` field tags each group; active area persists to `localStorage['nav.activeArea']`; navigation auto-switches to the owning area.
- **Module Launcher** added as a full-height left drawer (420px, slide-in 0.25s) with a `backdrop-filter: blur(6px)` overlay. Four tiles: HR (active), CRM/Sales/Inventory (SOON). Triggered by clicking the sidebar logo icon.
- **Long item text wraps** (`white-space: normal; overflow-wrap: anywhere`) — no more ellipsis truncation on "Employee Vacations", "Leave Management", etc.
- **Topbar** shortened from 60px → 44px. Inline omnibox removed; search now a **magnifier icon → popover** (360px), keeps the `Ctrl+K` shortcut and `/global-search?q=` navigation. Collapse-sidebar hamburger moved off the topbar to the sidebar body header. Page title replaced by a route-driven **breadcrumb** on the left.
- **Layout shell**: `LayoutComponent` drives `--sidebar-width` via an `effect()` (180/56/0 for expanded/collapsed/mobile); collapsed state persists to `localStorage['nav.sidebarCollapsed']`.
- **CSS tokens** in [erp-tokens.css](time-attendance-frontend/src/styles/erp-tokens.css): the six `--app-sidebar-*` tokens got the light palette; added `--sidebar-width` (runtime-toggled), `--sidebar-width-collapsed`, `--sidebar-header-width`, `--topbar-height`.
- **i18n keys added** to `nav.*` in both admin and self-service translation files: `brand`, `switchArea`, `areas.*`, `modules.*`.
- **Angular budgets**: self-service `anyComponentStyle.maximumError` bumped 8kB → 10kB to accommodate the richer sidenav styling (matches admin).
- **Files touched** (per frontend): `src/styles/erp-tokens.css`, `src/app/core/menu/menu.service.ts`, `src/app/layout/layout.component.{ts,html,css}`, `src/app/layout/sidenav/sidenav.component.{ts,html,css}`, `src/app/layout/topbar/topbar.component.{ts,html,css}`, `src/app/core/i18n/translations/{en,ar}.json`.

**v14.9 follow-up — RTL layout-width consistency fix.** Two stale leftovers from the pre-ERP-port floating sidebar were still driving the RTL shell and produced a visible ~70px gap between the content card and the sidebar in Arabic mode:
- `:root[dir="rtl"] .main-content { margin-right: 250px !important; }` + `:root[dir="rtl"] .main-content.sidenav-collapsed { margin-right: 72px !important; }` in both frontends' `src/styles.css` hardcoded the old 250/72 sidebar widths and, via `!important`, silently overrode the correct `var(--sidebar-width)` from `layout.component.css`. Replaced with `margin-right: var(--sidebar-width, 180px) !important;` and the `.sidenav-collapsed` override was deleted (`LayoutComponent.effect()` already toggles the var 180↔56).
- `:host-context([dir="rtl"]) .sidebar-mock { left: auto; right: 8px; }` in both `sidenav.component.css` files kept the RTL sidebar 8px off the screen edge while the logo (at `right: 0`) was already flush. Changed to `right: 0` so LTR and RTL both sit flush at the edge per spec.
- **Rule going forward:** layout dimensions (sidebar width, topbar height) must reference `var(--sidebar-width)` / `var(--sidebar-header-width)` / `var(--topbar-height)` — never hardcoded px, and never `!important` combined with a hardcoded px for layout dimensions.

### Summary of v14.8 changes (Mobile App Removal)

Full removal of the Flutter ESS app and all mobile-specific backend code. Option B from the scope proposal: the app directory, FCM push notifications, NFC tag management, GPS+NFC attendance verification, and dedicated mobile endpoints are all gone. Branch GPS fields (`Latitude`, `Longitude`, `GeofenceRadiusMeters`) are retained purely as branch metadata; they no longer drive any runtime behavior.

**Deletions (Flutter app)**:
- `ess_mobile_app/` — entire Flutter project (lib, android, ios, web, windows, integration_test, assets, pubspec, README, RELEASE_GUIDE, setup.ps1). Android had `google-services.json` (FCM) — gone with the folder.
- `.gitignore` — removed the `# --- Flutter / mobile` block.

**Deletions (backend — controllers)**:
- `PushTokensController.cs`
- `NfcTagsController.cs`
- `MobileAttendanceController.cs`
- `MobileScheduleController.cs`
- `NotificationBroadcastsController.cs`

**Deletions (backend — CQRS folders)**:
- `Application/MobileAttendance/` (ProcessMobileTransaction + CheckLocation)
- `Application/NfcTags/` (8 commands + 5 queries)
- `Application/Notifications/Commands/RegisterPushToken/`
- `Application/Notifications/Commands/UnregisterPushToken/`
- `Application/Notifications/Commands/CreateBroadcast/`
- `Application/Notifications/Queries/GetBroadcasts/`

**Deletions (backend — services + EF configs)**:
- `Infrastructure/Services/NfcTagEncryptionService.cs`
- `Application/Abstractions/INfcTagEncryptionService.cs`
- `PushNotificationTokenConfiguration.cs`
- `NfcTagConfiguration.cs`
- `AttendanceVerificationLogConfiguration.cs`
- `NotificationBroadcastConfiguration.cs`

**Deletions (backend — domain entities)**:
- `Domain/Notifications/PushNotificationToken.cs`
- `Domain/Notifications/NotificationBroadcast.cs` (incl. `BroadcastTargetType` + `NotificationChannel` enums — the `InApp`/`Push`/`Both` enum moved with the entity since every consumer is gone)
- `Domain/Branches/NfcTag.cs` + `NfcTagStatus.cs`
- `Domain/Attendance/AttendanceVerificationLog.cs` (incl. `VerificationTransactionType`, `VerificationStatus`, `VerificationFailureReason` enums)

**Edits (backend — entity/DTO field strips)**:
- `Domain/Notifications/Notification.cs` — dropped `Channel`, `BroadcastId`, `DeepLink`, and `Broadcast` navigation. In-app notifications don't need channel selection anymore.
- `Domain/Company/CompanySettings.cs` — dropped `EnableGpsAttendance`, `EnableNfcAttendance`, `EnablePushNotifications`, `MobileCheckInEnabled`, `RequireNfcForMobile`, `RequireGpsForMobile`, `AllowMockLocation`.
- `Domain/Branches/BranchSettingsOverride.cs` — dropped matching nullable override fields for the same 7 company fields.
- DTOs updated in lockstep: `CompanySettingsDto`, `ResolvedSettingsDto`, `BranchSettingsOverrideDto`.
- `UpdateCompanySettingsCommand`/`Handler` + `GetCompanySettingsQueryHandler` — fields removed from DTOs and assignments.
- `UpdateBranchSettingsOverrideCommand`/`Handler` + `GetBranchSettingsOverrideQueryHandler` — same treatment.
- `CompanySettingsResolver` (`MapFromCompanySettings`, `ApplyBranchOverrides`, `SetAllSources`) — all three updated.

**Edits (backend — DbContext + DI + config)**:
- `TecAxleDbContext` — dropped 4 `DbSet`s (`NfcTags`, `PushNotificationTokens`, `AttendanceVerificationLogs`, `NotificationBroadcasts`).
- `IApplicationDbContext` + `ApplicationDbContextAdapter` — matching `DbSet` property drops.
- `DependencyInjection` — removed `INfcTagEncryptionService` registration and the `MOBILE ESS POLICIES` block (`NotificationManagement`, `NfcTagManagement`, `NfcTagRead`).
- `NotificationConfiguration` (EF config) — stripped `Channel`, `BroadcastId`, `DeepLink` property configs, `HasOne(n => n.Broadcast)` FK, and `IX_Notifications_BroadcastId` index.
- `appsettings.json` — removed `NfcEncryption` block (SecretKey + RequirePayload).

**Deletions (admin frontend)**:
- `pages/nfc-tags/` — list, form, view, service.
- `pages/settings/company-configuration/mobile-settings/`.
- `pages/notifications/` — `send-notification` + `broadcast-history` components. Folder now empty and deleted.
- `core/services/notification-broadcast.service.ts`.
- `shared/components/notification-center-widget/` — the entire widget (broadcast-stat-driven, no other consumers).
- `shared/models/nfc-tag.model.ts`.

**Edits (admin frontend)**:
- `app.routes.ts` — stripped `settings/mobile` sub-route, 4 `/nfc-tags/*` routes, 2 `/notifications/send` + `/notifications/history` routes.
- `company-configuration.component.ts` — removed the Mobile navItem (the 6th tab).
- `company-configuration.models.ts` — dropped `enableGpsAttendance`, `enableNfcAttendance`, `enablePushNotifications`, `mobileCheckInEnabled`, `requireNfcForMobile`, `requireGpsForMobile`, `allowMockLocation` from `CompanySettingsDto` + `BranchSettingsOverrideDto`.
- `attendance-settings.component.html` — removed the two toggles (GPS + NFC).
- `notification-settings.component.ts` — removed the Push toggle.
- `i18n/translations/en.json` + `ar.json` — deleted: `nfc_tags.*` (full block), `tenant_configuration.attendance.{gps,nfc}`, `tenant_configuration.notification.push`, `tenant_configuration.mobile.*`, and the 80+ broadcast/send-notification keys in `notifications.*` (kept core notification keys).

**Deletions (tests + docs)**:
- `TestCases/14-NFC-nfc-notifications.md`
- `e2e/pages/admin/nfc-tags.page.ts`
- `e2e/pages/admin/notifications.page.ts`
- `e2e/tests/14-nfc-notifications/` (whole folder)

**Migration**: A single `RemoveMobileAndNfc` EF migration drops the tables `PushNotificationTokens`, `NfcTags`, `AttendanceVerificationLogs`, `NotificationBroadcasts`, and strips the associated `Notifications.Channel`, `Notifications.BroadcastId`, `Notifications.DeepLink` columns + `IX_Notifications_BroadcastId` + `FK_Notifications_NotificationBroadcasts`. Also drops 7 bool columns from `CompanySettings` (the mobile fields) and 5 bool? columns from `BranchSettingsOverrides`.

**Self-service frontend**: zero changes. Never had any mobile/NFC/push UI.

**Tests**: no backend test files referenced any of the deleted types, so no test changes were needed. All 167 tests still valid.

### Summary of v14.7 changes (Final Cleanup & Polish)

- **`SalaryAdvance.DeductionMonth` fully removed** — entity, EF index, API, admin UI, frontend model, and DB column. Data-preserving migration `20260417152940_RemoveDeductionMonth` back-fills `DeductionStartDate`/`EndDate` from any legacy YYYYMM rows **before** dropping. Replaced single-column index with composite `IX_SalaryAdvances_DeductionRange`.
- **`ITenantPayrollCalendarService` → `ICompanyPayrollCalendarService`** — interface + class + file + DI + all call sites.
- **CI pipeline rewritten** in `.github/workflows/ci.yml` — fixed broken `./src/TimeAttendanceSystem.sln` path (was always at repo root) and split into 3 jobs: `backend-unit`, `backend-integration` (Postgres 18 service container), `frontend`.
- **Dev test scripts** added under `scripts/`: `test-backend-unit.sh`, `test-backend-integration.sh`, `test-frontend.sh`, `test-all.sh`, plus `test-all.ps1` for Windows.
- **README 🧪 Testing section** added documenting the three test layers and `HRMS_INTEGRATION_DB`.
- **Dead metadata swept** — 304 `module: 'TimeAttendance'` + `moduleStrict:` entries from `app.routes.ts` (leftover from the v14.0-removed entitlement layer); dead `cardModuleMap` in dashboard component; obsolete `tenant-config-page` CSS class.
- **Canonical route** `/settings/company-config` with `/settings/tenant-config` as permanent redirect preserving child segments + bookmarks.
- **Pre-existing frontend specs fixed** — `StatusBadgeComponent` (was querying `.badge` instead of `.erp-badge`) and `App` (was expecting `ng new` template text). 12/12 frontend specs now pass.
- **Omnibox URL sync + Escape-to-clear** — the topbar omnibox mirrors `?q=` of the active search page and clears on Escape.

### Summary of v14.6 changes (Reliability & Deprecation)

- **Real-Postgres integration harness** (`PostgresTestHarness` + `PostgresRequiredFactAttribute`) replaces the broken Phase 1 `SqliteTestHarness` (deleted). Per-test-class disposable DB with full EF migration chain.
- **3 previously-skipped rollback tests now run** — commit path, rollback path, rerun-after-rollback-idempotently — all against real Postgres transactions.
- **`SalaryAdvance.DeductionMonth` write-frozen** — API no longer accepts it on create; executor only reads (for back-compat on pre-Phase-6 rows); response projections dropped it.
- **`CompanySettings.AutoCheckOutEnabled` / `AutoCheckOutTime` fully removed** — entity, DTOs (`CompanySettingsDto`, `ResolvedSettingsDto`, `BranchSettingsOverrideDto`), `UpdateCompanySettings*`/`UpdateBranchSettingsOverride*` commands + handlers, `GetCompanySettings`/`GetBranchSettingsOverride` query handlers, admin UI (`attendance-settings.component.html`), and DB columns. Migration `20260417131611_RemoveLegacyAutoCheckoutSettings`. Shift-driven `ShiftDrivenAutoCheckOutJob` is the single source of truth.
- **Top-nav omnibox** added to admin shell — Enter → `/global-search?q=<query>`, `Ctrl/⌘+K` focuses from anywhere, RTL-safe, i18n in EN + AR (`search.placeholder`).
- **Dead `tenants.*` i18n block** (40 keys for the v14.0-removed Tenants-management page) deleted from `en.json` and `ar.json`.

### Summary of v14.5 changes (Tenant → Company Naming Cleanup)

Retired all remnant `Tenant*` naming from the codebase and DB schema (the v14.0 collapse removed the multi-tenant feature but kept tenant-* names for schema stability). Cleanup covers **~80 backend files + test files + frontend folder** renamed.

- **Entity**: `TenantSettings` → `CompanySettings`
- **DB table**: `TenantSettings` → `CompanySettings` via `20260417121022_RenameTenantSettingsToCompanySettings` (data-preserving `RenameTable` + `ALTER INDEX` for PK)
- **Service**: `ITenantSettingsResolver` → `ICompanySettingsResolver`; impl `TenantSettingsResolver` → `CompanySettingsResolver`
- **Controller**: `TenantConfigurationController` → `CompanyConfigurationController`
- **Route**: `/api/v1/tenant-configuration/*` → `/api/v1/company-configuration/*`
- **EF config**: `TenantSettingsConfiguration` → `CompanySettingsConfiguration`
- **Domain folder**: `src/Domain/TimeAttendanceSystem.Domain/Tenants/` → `Company/`
- **Application folder**: `TenantConfiguration/` → `CompanyConfiguration/` (incl. CQRS `UpdateTenantSettings*` → `UpdateCompanySettings*`, `GetTenantSettings*` → `GetCompanySettings*`, `TenantSettingsDto` → `CompanySettingsDto`)
- **Frontend**: `pages/settings/tenant-configuration/` → `company-configuration/` (all 6 files)
- **Tests**: all `Domain.Tenants` and `Application.TenantConfiguration` references updated
- **Incidental production fix**: `PayrollSideEffectReverser.CascadeDeleteDetailsAsync` now calls `.IgnoreQueryFilters()` so the cascade actually fires on soft-deleted parents (pre-existing bug surfaced during v14.5 verification)
- **Incidental portability win**: `GlobalSearchService` swapped 24× Postgres-only `EF.Functions.ILike(...)` for portable `.ToLower().Contains(qLower)` so the search works under EF InMemory too

### Summary of v14.0 changes

**Backend deletions** (~4,500 LOC):
- Master DB infrastructure: `Persistence/Master/`, `MultiTenancy/` (TenantConnectionResolver, TenantProvisioningService, ConnectionStringEncryption, MultiTenancyOptions, TenantMigrationRunner, TenantDbContextFactory)
- Middleware: `TenantResolutionMiddleware`
- Services: `EntitlementService`, `ModuleDeactivationService`, `TenantContext`
- Domain entities (13): `Platform/`, `Subscriptions/`, `Tenants/Tenant|TenantStatus|TenantUserEmail`, `Modules/`, `Configuration/`
- EF configurations: 14 for deleted entities
- Background jobs: `TenantIteratingJob`, `ModuleAwareJob`
- Controllers (5): TenantsController, SubscriptionPlansController, TenantSubscriptionsController, EntitlementsController, PolicyTemplatesController
- CQRS folders: Tenants, Subscriptions, PolicyTemplates, SetupTracking, Authorization/Commands/{PlatformLogin,ResolveTenants}
- Behaviors + attributes: `ModuleEntitlementBehavior`, `UsageLimitBehavior`, `RequiresModuleAttribute`, `RequiresLimitAttribute`, `RequiresModuleEndpointAttribute`, `AllowModuleReadOnlyAttribute` — stripped from 209 files
- Tests: `tests/TecAxle.Hrms.Entitlement.Tests/` (79 tests, irrelevant in single-tenant)

**Backend modifications**:
- `AuthController` simplified — dropped `ResolveTenants`, `PlatformLogin` endpoints; `LoginRequest` drops `TenantId`
- `LoginCommandHandler` rewritten — single-step auth against `IApplicationDbContext`
- `JwtTokenGenerator.GenerateAccessToken` drops `tenantId` parameter + `tenant_id`/`is_platform_user`/`platform_role` claims
- `BaseHandler` — dropped `ResolveTenantIdAsync` + `IMasterDbContext` reference
- `ICurrentUser` — dropped `TenantId` property
- `CurrentUser` — dropped `TenantId` getter
- `IApplicationDbContext` — dropped `SetupSteps`, platform imports
- `ITenantSettingsResolver` — dropped `tenantId` parameter
- `TenantSettingsResolver` cache key → `"company-settings"` (singleton)
- `SystemUserResolver` — dropped `ITenantContext` dependency
- `ValidationSettingsProvider` — dropped `ITenantContext` dependency
- `AuditActionFilter` — dropped `ITenantContext` skip logic
- `Program.cs` — dropped master DB migration + `TenantResolutionMiddleware` + platform imports; single `dbContext.Database.MigrateAsync()` + `SeedData.SeedAsync(dbContext)`
- `DependencyInjection.cs` — dropped `ConfigureMasterDatabase`, all multi-tenancy services, multi-tenancy-mode branch
- `TecAxleDbContext` — dropped `SetupSteps` DbSet, platform namespace imports, platform-exclusion filter
- `TenantConfigurationController` — rewritten from scratch (6 endpoints)
- `TenantSettings` entity — dropped `TenantId` FK + `Tenant` navigation
- `TenantSettingsConfiguration` — dropped FK + index
- Migrations: 72 old migrations deleted, fresh `20260416163539_Initial` created
- `appsettings.json` / `appsettings.Development.json` — single `DefaultConnection` → `tecaxle_hrms`
- `tools/RunSampleData.cs` — updated connection string
- `scripts/sample-data-with-users.sql` — patched for current schema (`Branches.GeofenceRadiusMeters` NOT NULL, `Users.IsSystemUser` NOT NULL, `Employees.ProbationStatus`/`IsSuspended`/`IsPreHire` NOT NULL)

**Admin frontend deletions**:
- `src/app/pages/tenants/` (4 components + service + model)
- `src/app/pages/subscription-plans/` (3 components)
- `src/app/pages/module-disabled/`
- `src/app/pages/settings/tenant-configuration/{setup-status,policy-templates}/`
- `src/app/core/services/entitlement.service.ts`
- `src/app/core/auth/guards/module.guard.ts`
- `src/app/shared/models/entitlement.model.ts`
- `src/app/shared/components/module-status-banner/`

**Admin frontend modifications**:
- Sidenav — dropped `platformPaths`, `platformGroupKeys`, `isPlatformUser`, module-entitlement filter
- Menu service — dropped Platform group, dropped `module?: SystemModule`, stripped `module:` from 39 items
- `moduleGuard` stripped from 306 routes
- Tenants/SubscriptionPlans route definitions deleted
- `auth.service.ts` — dropped `resolveTenants()`, `isPlatformUser()`, `is_platform_user` localStorage
- `auth.guard.ts` — dropped platform-user branch
- `auth.interceptor.ts` — dropped platform-user refresh-skip branch
- `login.component.ts` — dropped `isPlatformUser` redirect
- `filter-registry.service.ts` — dropped `EntitlementService` + platform-admin skip
- `notification-bell.component.ts` — dropped platform-admin skip
- `dashboard.component.ts` — dropped `EntitlementService` + module filter on cards/widgets
- `api.config.ts` — dropped `resolveTenants` and `platformLogin` endpoints
- `user.model.ts` — dropped `TenantOption`, `ResolveTenantsResponse`, `isPlatformUser?: boolean`
- `tenant-configuration.component.ts` — dropped `templates` + `setup-status` nav items
- `tenant-configuration.service.ts` — dropped setup-status + policy-template CRUD
- `tenant-configuration.models.ts` — dropped Policy/Setup DTOs + `tenantId`

**Self-service frontend deletions**:
- `src/app/core/services/entitlement.service.ts`
- `src/app/core/auth/guards/module.guard.ts`
- `src/app/shared/models/entitlement.model.ts`

**Self-service frontend modifications**:
- 28 menu items lost `module:` tag
- `moduleGuard` stripped from 51 routes
- Sidenav, menu service, layout, employee dashboard cleaned

**Mobile deletions**:
- `lib/features/tenant_discovery/` (292 LOC)

**Mobile modifications**:
- `AuthState` — dropped `hasTenant`, `tenantConfig`, `setTenant()`, `reset()`
- `TenantConfig` model deleted from `AppConfig`
- `AppConfig` — dropped `tenantConfigKey`
- `SecureStorageService` — dropped `saveTenantConfig`, `getTenantConfig`, `clearTenantConfig`
- Router — dropped `/tenant-discovery` route; initial route → `LoginScreen`
- `ApiClient` — hardcoded `AppConfig.apiBaseUrl` (or `localApiUrl` when `isDevelopment=true`)
- `LoginScreen` — dropped `_tenantConfig`; uses `AppConfig.apiBaseUrl` directly
- `AttendanceScreen` — uses hardcoded `AppConfig.apiBaseUrl`
- `AuthInterceptor._tryRefreshToken` — uses `AppConfig.apiBaseUrl`
- `ProfileScreen` — dropped "Switch Company" tile + tenant-name display

**Test results**: 162 passing tests across 4 projects (was 5 with Entitlement). Build clean on backend + all 3 frontends + mobile.

**Tenant naming cleanup status** (resolved in v14.5 + v14.7; see "Summary of v14.5 changes" and "Summary of v14.7 changes" above):
- ✅ `TenantSettings` entity + DB table → renamed to `CompanySettings`
- ✅ `TenantConfigurationController` + route → `CompanyConfigurationController` + `/api/v1/company-configuration`
- ✅ `TenantSettingsConfiguration` EF config file → `CompanySettingsConfiguration`
- ✅ `TenantSettingsResolver` / `ITenantSettingsResolver` → `CompanySettingsResolver` / `ICompanySettingsResolver`
- ✅ `TenantConfiguration/` CQRS folder → `CompanyConfiguration/`
- ✅ `ITenantPayrollCalendarService` → `ICompanyPayrollCalendarService` (v14.7)
- ✅ `/settings/tenant-config` route → `/settings/company-config` with legacy redirect (v14.7)
- `BranchSettingsOverride` + `DepartmentSettingsOverride` entities + endpoints (kept — these are legitimate branch/department scoping, never tenant-related)
- The `tenant_configuration.*` i18n key block retained deliberately — 60+ keys used across 8 child components; operator-visible text already says "Company Configuration", renaming keys would be churn without user-visible gain.

### Previous versions

- **v15.0** — Grid + View/Edit Unification: per-row Actions column replaced with a single table-level kebab menu (operates on the selected row); all `/<entity>/:id/view` URLs collapsed (56 redirected, 21 path-renamed); 53 orphan view-* component folders deleted; edit forms become read-only when user lacks edit permission via `form.disable()`; `table-layout: auto` + horizontal scroll fallback so every column fits; `data-priority` attribute properly emitted (1280/1024 breakpoints); filter popover signal-backed inputs + null-row "Root Department" support via `emptyValueLabel`; system-wide `[disabled]` + `formControlName` warning fixes; manager dropdown unified with `app-searchable-select` and de-scoped from branch
- **v14.9** — ERP Design System Navigation Port: both web frontends adopted the ERP spec's light-sidebar nav shell. "ERP Suite" branding, 180/56px sidebar widths, fixed-width logo header (overhang on collapse), pill menu items with wrapped long text, Area switcher at the bottom (Dashboard/People/Workforce/Payroll/Operations for admin, Me/Pay/Services/Approvals for self-service), Module Launcher (HR/CRM/Sales/Inventory) as a full-height left drawer with blurred backdrop, 44px breadcrumb topbar, magnifier-icon search popover replacing the inline omnibox
- **v14.8** — Mobile App Removal — deleted Flutter ESS app + all mobile-specific backend (FCM push, NFC tags, GPS verification, mobile endpoints, `NotificationBroadcast`); single EF migration `RemoveMobileAndNfc` drops 4 tables + 3 `Notifications` columns + 7 `CompanySettings` bool columns
- **v14.7** — Final Cleanup & Polish: fully retire `DeductionMonth`, fix CI pipeline, 3-layer test scripts, canonical `/settings/company-config` route, dead-metadata sweep (see `FINAL_CLEANUP_AND_POLISH_REPORT.md`)
- **v14.6** — Real-Postgres integration harness; retire `AutoCheckOutEnabled`/`AutoCheckOutTime`; top-nav omnibox (see `PHASE6_IMPLEMENTATION_REPORT.md`)
- **v14.5** — Tenant → Company naming cleanup (entity, DB, controller, route, service, folders) (see `PHASE5_TENANT_CLEANUP_REPORT.md` + `PHASE5_SIGNOFF_ADDENDUM.md`)
- **v14.4** — Phase 4 admin UI backend tests (global search shape, failure-alert service, legacy back-fill)
- **v14.3** — Shift-driven auto-checkout job, PIP follow-through, global-search, operational-failure alerts + dashboard
- **v14.2** — Attendance timezone correctness, silent-failure surfacer, payroll integrity, loan/benefit/training validators
- **v14.1** — Approval-to-execution executors, benefits-to-payroll integration, payroll transactional safety, `PayrollSideEffectReverser`
- **v14.0** — Single-Company Collapse — removed multi-tenant SaaS architecture (~4,500 LOC deleted)
- **v13.6** — Workflow Routing Hardening (department-head routing, role assignment strategies, delegation depth, return-for-correction/resubmit)
- **v13.5** — Lifecycle Automation (7 automated HR transitions via domain events)
- **v13.4** — Remaining hardcoded business rules migrated to `CompanySettings`; `INotificationRecipientResolver` consolidated 15 divergent role-name checks
- **v13.3** — Hardcoded business rules migrated to `CompanySettings` (EOS policy, payroll calendar, validation thresholds, login lockout)
- **v13.2** — Module entitlement enforcement hardening (HTTP filter layer, removed in v14.0)
- **v13.1** — Payroll production-safety follow-ups (calendar policy CRUD, run audit UI, admin-unlock)
- **v13.0** — Production-safe payroll calculation pipeline
