# Development Guidelines for TecAxle HRMS

## System Overview

TecAxle HRMS is a comprehensive enterprise HRMS / workforce-management system owned and operated by **TecAxle**. A single backend, admin frontend, self-service frontend, and mobile app serve a single company. Multi-branch within the company is fully supported (branches, departments, user branch scopes).

### High-level capabilities

- **Time & attendance tracking** — automated daily attendance, overtime, late/early detection, device integration (biometric, GPS+NFC mobile)
- **Leave management** — vacation types, policies, balances, accruals, transactions, approvals
- **Employee self-service portal** — employees manage their own vacation/excuse/remote-work/fingerprint requests; managers approve their team's
- **Approval workflows** — multi-step configurable approval processes with delegation, escalation, return-for-correction, resubmission
- **Organization management** — multi-branch, departments with hierarchy, employees, users, roles, permissions, user-branch-scopes
- **Shift management** — regular/flexible/split/rotating/night shifts, shift periods, shift assignments, off days, grace periods, overtime rules
- **Remote work management** — policies and requests for remote/hybrid work
- **Real-time notifications** — SignalR-based in-app notifications, Firebase push on mobile
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
- **Mobile**: no tenant-discovery screen; app launches directly to login. `AppConfig.apiBaseUrl` is the hardcoded backend URL.
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

- **Branches** — multi-branch organization support, GPS geofencing (latitude, longitude, `GeofenceRadiusMeters`) with interactive Leaflet map picker. `Branch.ManagerEmployeeId` for workflow routing.
- **Departments** — hierarchical (parent-child), `Department.ManagerEmployeeId`.
- **Employees** — `IsActive`, `IsSuspended` (two-phase offboarding), `IsPreHire` (lifecycle automation), `OnboardingCompletedAt` milestone timestamp.
- **Users** — login accounts linked to employees via `EmployeeUserLink`.
- **Roles, Permissions, RolePermission, UserRole** — fine-grained RBAC.
- **UserBranchScope** — per-user branch access scope (empty = all branches / SystemAdmin).

### 3. Time & Attendance

- AttendanceRecord (daily auto-generated), AttendanceTransaction (check-in/out, break), calculated working hours, overtime, late/early minutes.
- Status tracking: Present, Absent, Late, OnLeave, Holiday, Weekend, etc.
- Manual override with approval workflow; finalization locks records.
- Device integration: biometric fingerprint devices + GPS+NFC mobile.
- Mobile GPS+NFC dual verification (Haversine geofence distance + HMAC-SHA256 signed NFC payload), `AttendanceVerificationLog` audits every attempt.

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

### 10. NFC Tag Management & Security

- `NfcTag` — physical NFC tags registered to branches, status lifecycle (Unregistered/Registered/Active/Disabled/Lost).
- HMAC-SHA256 signed payload: `{tagId}|{branchId}|{tagUid}|{timestamp}|{hmacSignature}`.
- `NfcEncryption:SecretKey` + `RequirePayload` toggle in `appsettings.json`.

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

SignalR hub at `/hubs/notifications`. Bilingual notifications (RequestSubmitted/Approved/Rejected/Delegated/Escalated/ApprovalPending/DelegationReceived/ApprovalReminder). Read tracking, action URLs. Firebase Cloud Messaging for mobile push.

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

- **`CompanySettings`** (table: `CompanySettings`, entity path: `src/Domain/TimeAttendanceSystem.Domain/Company/CompanySettings.cs`) — singleton row. Centralized operational settings covering 10 categories (General, Attendance, Leave, Payroll, Approval, Notification, Mobile, Security, Business-Rule Thresholds, Lifecycle Automation). Renamed from `TenantSettings` in v14.5; all Tenant* naming was retired in v14.5/14.7.
- **`BranchSettingsOverride`** — per-branch nullable overrides for attendance/mobile.
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
- **Flutter 3.22+** for mobile (optional).

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
| Mobile App | Device/Emulator | Flutter — GPS+NFC attendance |

### Troubleshooting

- **Backend won't start** → check PostgreSQL, verify `DefaultConnection` in `appsettings.json`.
- **Frontend compile errors** → `rm -rf node_modules && npm install`.
- **Port conflicts** → check 4200/4201/5099, use `--port` to change.
- **Can't log in** → use the full email address. `MustChangePassword` redirects on first login.
- **SignalR not connecting** → check browser console for WebSocket errors, verify JWT token is sent.
- **Mobile NFC/GPS** → real hardware only. Verify branch has GPS coords + `GeofenceRadiusMeters` configured.

---

## General Development Rules

### Project Structure

- Split new components into three files (`ts`, `html`, `css`).
- Follow established folder patterns.
- **Three UI apps**: `time-attendance-frontend/` (4200), `time-attendance-selfservice-frontend/` (4201), `ess_mobile_app/` (Flutter).

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

Use `StatusBadgeComponent`, `DefinitionListComponent`, `BadgeListComponent`, `FormHeaderComponent`, `DetailCardComponent`. `computed()` for reactive badge config.

#### List pages

Use `DataTableComponent`, `TableActionsComponent`, `SearchFilterComponent` / `UnifiedFilterComponent`, `BulkActionsToolbarComponent`, `PaginationComponent`, `EmptyStateComponent`.

**Required pattern**: `<app-page-header>` has NO child content. Add/Create button goes on `<app-unified-filter>` via `[showAddButton]` + `[addButtonText]` + `(add)` event.

**Table actions**: use `computed<TableAction[]>()` with `condition` functions for conditional visibility.

**Enum values**: Frontend TypeScript enums use **string values** matching backend JSON serialization (`Draft = 'Draft'`, not `Draft = 1`).

#### Form pages

Use `FormHeaderComponent`, `FormSectionComponent` (with `variant="modern"`), `FormGroupComponent`, `SearchableSelectComponent`, `DateRangePickerComponent`, `TimeRangeInputComponent`, `LocationPickerComponent`.

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

Page bg: `#F5F6FA`. Sidebar: deep navy `#0F1629`.

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

### NFC Tag Security

HMAC-SHA256 signed payload. `appsettings.json`:
```json
"NfcEncryption": {
  "SecretKey": "your-hmac-secret-key",
  "RequirePayload": false
}
```
- `RequirePayload: false` → graceful degradation (UID-only verification).
- `RequirePayload: true` → full payload signature verification.

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
- **Mobile App**: Flutter connecting to `https://api.clockn.net`

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

# --- Mobile ---
cd ess_mobile_app
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
flutter run

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

#### Mobile (`ess_mobile_app/`)

| Area | Path |
|---|---|
| Router | [lib/app/router.dart](ess_mobile_app/lib/app/router.dart) |
| API client | [lib/core/network/api_client.dart](ess_mobile_app/lib/core/network/api_client.dart) |
| Auth interceptor | [lib/core/network/auth_interceptor.dart](ess_mobile_app/lib/core/network/auth_interceptor.dart) |
| Auth provider | [lib/shared/providers/auth_provider.dart](ess_mobile_app/lib/shared/providers/auth_provider.dart) |
| Config | [lib/core/config/app_config.dart](ess_mobile_app/lib/core/config/app_config.dart) |
| Theme | [lib/core/theme/app_theme.dart](ess_mobile_app/lib/core/theme/app_theme.dart) |
| Features | [lib/features/](ess_mobile_app/lib/features/) |
| Push | [lib/shared/services/push_notification_service.dart](ess_mobile_app/lib/shared/services/push_notification_service.dart) |

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

### Mobile attendance verification

- Dual verification: GPS geofence + NFC tag.
- Audit every attempt to `AttendanceVerificationLogs`.
- Failure reasons: `GpsOutsideGeofence`, `NfcTagMismatch`, `NfcTagNotRegistered`, `NfcTagInactive`, `BranchNotConfigured`, `GpsUnavailable`, `NfcPayloadInvalid`, `NfcPayloadTampering`.
- Capture device ID, model, platform, app version.
- Convert UTC to branch local time for transaction timestamps.

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
- Not logging failed verification attempts to `AttendanceVerificationLogs`
- Not configuring branch GPS coordinates before enabling mobile attendance
- Forgetting timezone conversion for mobile transaction timestamps
- Hardcoding business rules — move to `CompanySettings`
- Hardcoding role names in notification queries — use `INotificationRecipientResolver`
- Using `Role.Name == "HR"` pattern — use `NotificationRecipientRolesCsv` setting
- Hardcoding 30-day month in payroll math — use `IPayrollCalendarResolver`
- Adding `if`-block payroll logic instead of a new calculator service
- Writing a migration that drops/renames a column without preserving data

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

**Last Updated**: April 17, 2026
**Version**: 14.7 — Final Cleanup & Polish

System is a single-company HRMS with one database (`tecaxle_hrms`), one `TecAxleDbContext`, single-step email+password login, and no subscription/entitlement system. The v14.x series replaced the multi-tenant SaaS architecture, retired every remnant of tenant-based naming and dead entitlement metadata, and hardened payroll transactional safety via real-Postgres integration tests.

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
