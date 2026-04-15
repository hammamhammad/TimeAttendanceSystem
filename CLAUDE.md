# Development Guidelines for TecAxle HRMS

## System Overview

TecAxle HRMS is a comprehensive enterprise-grade **per-tenant database** SaaS workforce management platform owned and operated by **TecAxle**. The system uses a single shared backend, frontend, and mobile application to serve all tenants, with complete data isolation via dedicated databases:
- **Per-Tenant Database Architecture**: A master database (`tecaxle_master`) stores only platform-level entities (tenant registry, subscription plans, platform users — 13 tables). Each tenant gets a dedicated PostgreSQL database (`ta_{company_domain}`, e.g. `ta_nadek_com`) containing all business data (employees, attendance, leaves, etc.). Platform tables are NOT duplicated in tenant DBs. Email-based login resolves the tenant from the master DB, then authenticates against the tenant's own database.
- **Platform Administration (TecAxle Admin)**: Platform-level users (TecAxle Admin / TecAxle Support) manage all tenants, provision new databases, assign subscription plans, and monitor platform health from a unified admin portal.
- **Subscription & Entitlements**: Configurable plans (Starter/Professional/Enterprise), per-tenant module enable/disable, feature flags, and usage limits
- **Time & Attendance Tracking**: Automated attendance recording, overtime calculation, and reporting
- **Leave Management**: Vacation requests, leave balances, accruals, and approvals
- **Employee Self-Service Portal**: Separate frontend for employees to manage their own requests
- **Approval Workflows**: Multi-step configurable approval processes with delegation
- **Organization Management**: Multi-branch support with departments and hierarchies
- **Shift Management**: Complex shift configurations with multiple periods and assignments
- **Remote Work Management**: Policies and requests for remote/hybrid work
- **Real-Time Notifications**: SignalR-based in-app notification system
- **Comprehensive Reporting**: Analytics, dashboards, and audit logging
- **Recruitment & Hiring**: Job requisitions, postings, candidates, applications, interviews, and offers
- **Onboarding**: Templates, processes, tasks, and document management
- **Performance Management**: Review cycles, reviews, goals, competencies, PIPs, and 360 feedback
- **Payroll & Compensation**: Salary structures, payroll periods, allowances, and adjustments
- **Employee Lifecycle**: Contracts, promotions, transfers, and offboarding
- **File Upload & Attachments**: Centralized file storage with entity-linked attachments

---

## System Features Reference

### Core Modules

#### 1. Authentication & Authorization
- **Unified email-based login**: Single `/api/v1/auth/login` endpoint for both tenant users and platform admins
  - Step 1: Query `TenantUserEmails` table in master DB to resolve tenant from email
  - Step 2: If found, connect to the tenant's dedicated database and authenticate the user
  - Step 3: If not found in tenants, check `PlatformUsers` table in master DB and authenticate as platform admin
- JWT-based authentication with refresh tokens
- **JWT claims**: Tenant users get `tenant_id` claim; platform admins get `platform_role` + `is_platform_user` claims
- Two-factor authentication (2FA) with backup codes
- Role-based access control (RBAC)
- Permission-based authorization
- Branch-scoped access control (multi-tenancy)
- Session management and blacklisted tokens
- Password policies and history tracking
- Login attempt tracking and lockout

#### 1b. Multi-Tenant SaaS & Subscription Architecture (Per-Tenant Database Model)
- **Per-Tenant Database Isolation**: Each tenant gets a dedicated PostgreSQL database named by company email domain (`ta_{domain}`, e.g. `ta_nadek_com`). No `TenantId` FK filtering needed — all data in a tenant DB belongs to that tenant. If a DB name collides with an orphaned database, a numeric suffix is appended (`ta_nadek_com_2`).
- **Master Database** (`tecaxle_master`): Contains ONLY 13 platform-level tables: `Tenants`, `PlatformUsers`, `TenantUserEmails`, `SubscriptionPlans`, `PlanModuleEntitlements`, `PlanFeatureFlags`, `PlanLimits`, `TenantSubscriptions`, `TenantModuleAddOns`, `TenantFeatureOverrides`, `EntitlementChangeLogs`, `PolicyTemplates`, `PolicyTemplateItems`. Accessed via `MasterDbContext`. At startup, only `MasterDbContext` is migrated — NOT `TecAxleDbContext`.
- **Tenant Database**: Stores all business data (employees, branches, departments, attendance, leaves, etc.) plus a local `Tenants` table (single row, for FK on TenantSettings/SetupSteps). Does NOT contain platform tables (SubscriptionPlans, PlatformUsers, TenantUserEmails, etc.). Accessed via `TecAxleDbContext`.
- **Strict Entity Separation**: Platform entities (Tenants, Subscriptions, etc.) are ONLY in `IMasterDbContext`/`MasterDbContext`. They are NOT in `IApplicationDbContext`/`TecAxleDbContext`. All handlers that need platform data inject `IMasterDbContext` directly. The `TecAxleDbContext.OnModelCreating` excludes platform entity configurations via a filter on `ApplyConfigurationsFromAssembly`.
- **Tenant Entity**: Each company/organization is a Tenant with subdomain, branding, company info, regional defaults, plus new fields: `EncryptedConnectionString`, `DatabaseName`, `DatabaseCreatedAt`, `DatabaseMigrationVersion`
- **TenantConnectionResolver** (`ITenantConnectionResolver`): Dynamically resolves tenant DB connection string from master DB. Decrypts `EncryptedConnectionString` using AES-256 via `ConnectionStringEncryption`.
- **MultiTenancyOptions**: Configuration with modes: `SharedDatabase`, `Hybrid`, `PerTenantDatabase`. Current mode: `PerTenantDatabase`.
- **TenantProvisioningService**: Auto-creates tenant database on tenant creation:
  1. Derives DB name from company email domain (`ta_{domain}`, handles collisions with suffix)
  2. Creates PostgreSQL database, applies EF Core migrations, seeds business data (roles, permissions, shifts, workflows, vacation types)
  3. Creates local Tenant record in tenant DB (for FK on TenantSettings/SetupSteps)
  4. Creates TenantSettings and SetupSteps in tenant DB
  5. Creates TWO system admin users: `tecaxleadmin@{domain}` and `systemadmin@{domain}` (both with `IsSystemUser = true`, SystemAdmin role, all branch access)
  6. Maps both admin emails in master `TenantUserEmails` table for login resolution
  7. Stores encrypted connection string in master `Tenants` table
- **System User Protection**: Users with `IsSystemUser = true` cannot be edited or deleted. The `User` entity has an `IsSystemUser` boolean property. `UpdateUserCommandHandler` and `DeleteUserCommandHandler` check this flag. Frontend `user-table.component.ts` hides edit/delete buttons for system users.
- **Startup Migration**: `Program.cs` only migrates `MasterDbContext` against the master DB at startup. Tenant DBs are migrated during provisioning. `MasterSeedData` seeds platform admin and subscription plans into master DB.
- **ConnectionStringEncryption**: AES-256 encryption/decryption for tenant connection strings stored in master DB.
- **Tenant Context Pipeline**: `tenant_id` claim in JWT, `TenantResolutionMiddleware`, `ITenantContext` scoped service — resolves which tenant DB to connect to for the current request.
- **Module Registry**: 26 system modules defined in `SystemModule` enum with metadata, permission mappings, dependency rules, and background job associations
- **Subscription Plans**: `SubscriptionPlan` entity (in master DB) with tiers (Starter/Professional/Enterprise/Custom), pricing, module entitlements, feature flags, and usage limits. Full CRUD via `POST/PUT/DELETE /api/v1/subscription-plans`.
- **Tenant Subscriptions**: `TenantSubscription` (in master DB) links tenant to plan with billing cycle, status, period tracking
- **Module Add-Ons**: `TenantModuleAddOn` for optional modules purchased on top of base plan
- **Feature Overrides**: `TenantFeatureOverride` for per-tenant feature flag overrides (sales/beta access)
- **Entitlement Service**: `IEntitlementService` with per-tenant caching (5-min TTL), checks modules/features/limits
- **MediatR Pipeline Behaviors**: `[RequiresModule]` attribute + `ModuleEntitlementBehavior` for automatic module enforcement; `[RequiresLimit]` + `UsageLimitBehavior` for usage limit enforcement. **173 commands/queries decorated** across all non-Core modules with two-tier access: commands fully blocked, queries allow read-only historical access via `AllowReadWhenDisabled = true`
- **Tenant-Iterating Background Jobs**: `TenantIteratingJob` abstract base class — iterates all active tenants from master DB, connects to each tenant's database, and runs the job. Replaces the old `ModuleAwareJob` pattern. Can optionally skip tenants without a required module.
- **Frontend Entitlement Service**: Signal-based `EntitlementService` with `isModuleEnabled()` and `isModuleReadOnly()`, loaded on login via `FilterRegistryService` auth effect (skipped for platform admin). `moduleGuard` on 201 routes (strict mode for create/edit, read-only for list/view), module-tagged navigation items, `ModuleStatusBannerComponent` for read-only warning. Sidenav hides Platform menu items for tenant users and hides modules not in the tenant's subscription plan.
- **Platform Admin UI Isolation**: Platform admin (`isPlatformUser`) sees ONLY Platform menu items (Tenants, Subscription Plans). Tenant admin does NOT see Platform menu items. Controlled in `sidenav.component.ts` via `platformPaths` and `platformGroupKeys` sets. `FilterRegistryService` and `NotificationBellComponent` skip tenant-only API calls for platform admin.
- **Grouped Sidebar Navigation**: Menu items are organized into 12 logical `MenuGroup` sections with visual section headers (uppercase labels in expanded mode, subtle dividers when collapsed). Groups: Main, Platform, Organization, Time & Attendance, Leave & Absence, HR & Lifecycle, Compensation, Performance & Growth, Workplace, Workflows & Approvals, Reports & Analytics, Settings. Defined in `MenuService` via `MenuGroup` interface (`groupKey`, `titleKey`, `items[]`). Sidenav renders groups with `hasVisibleGroup()` gating — empty groups are hidden based on permissions and module entitlements. Translation keys under `nav_group.*` in both EN and AR.
- **Default Plans**: Starter (5 modules, 50 employees), Professional (13 modules, 500 employees), Enterprise (all 26 modules, unlimited)
- **Subscription Plan Management UI**: Full plan CRUD at `/subscription-plans` — create, edit, delete plans with module entitlements, feature flags, and usage limits
- **Tenant Management UI**: Admin pages for CRUD tenants (with auto-provisioning), view/assign/change/cancel subscriptions. Create tenant form includes: Basic Info (with logo upload) + Company Info (email required) + Plan Selection + Default Settings. On creation, the system auto-provisions the tenant DB (`ta_{company_domain}`), seeds two system admin users (`tecaxleadmin` + `systemadmin`), and assigns the selected plan. **Email domain uniqueness enforced** — each tenant must use a unique email domain to prevent `TenantUserEmails` conflicts.
- **Platform Entities**: `PlatformUser` (in master DB) with `PlatformRole` enum (`TecAxleAdmin`, `TecAxleSupport`). `TenantUserEmail` (in master DB) maps user emails to tenant IDs for login resolution.
- **C# Namespaces**: All backend namespaces are `TecAxle.Hrms.*` (project directories still named `TimeAttendanceSystem.*` with `RootNamespace`/`AssemblyName` overrides set in `.csproj` files).

#### 1d. Operational Strength & Module Lifecycle (Phase 4)
- **Module Entitlement Enforcement**: All 173 non-Core commands/queries decorated with `[RequiresModule(SystemModule.X)]`. Commands are fully blocked when module disabled; queries allow historical data access via `AllowReadWhenDisabled = true`. SystemAdmin bypasses all checks.
- **Reports Module Checks**: `ReportsController` checks `IEntitlementService.IsModuleEnabledAsync()` per endpoint — attendance→TimeAttendance, leave→LeaveManagement, payroll→Payroll, contracts→EmployeeLifecycle, documents→Documents, certifications→Training, compliance→EmployeeLifecycle. SystemAdmin bypasses.
- **Entitlement Audit Trail**: `EntitlementChangeLog` entity tracks all subscription/entitlement state transitions (plan changes, module enable/disable, cancellations). Append-only with before/after JSON snapshots. Integrated into `ChangePlanCommandHandler` and `CancelSubscriptionCommandHandler`.
- **Safe Module Deactivation**: `IModuleDeactivationService` orchestrates module disable/enable. On deactivation: in-flight workflows are frozen (`WorkflowStatus.Frozen = 7`), previous status stored in `ContextJson` for restoration. On reactivation: frozen workflows resume from previous state.
- **Workflow Freeze/Unfreeze**: `WorkflowEntityType` → `SystemModule` mapping in `ModuleMetadata.GetModuleForEntityType()`. `WorkflowInstance.CanBeModified()` returns false for frozen workflows. `FrozenWorkflowCleanupJob` auto-cancels workflows frozen > 90 days.
- **Cross-Module Dependency Enforcement**: `ChangePlanCommandHandler` validates `ModuleDependencyRules.GetDependentModules()` before allowing plan downgrade. Cannot disable a module that enabled modules depend on.
- **Frontend Read-Only Mode**: `moduleGuard` allows list/view route access when module disabled (read-only), blocks create/edit routes (`moduleStrict: true`). `ModuleStatusBannerComponent` shows warning banner. `UnifiedFilterComponent` hides Add button via `[readOnly]` input.

#### 1c. Tenant Configuration & Policy Framework
- **TenantSettings Entity**: Centralized strongly-typed operational settings per tenant covering 7 categories (General, Attendance, Leave, Payroll, Approval, Notification, Mobile, Security). One row per tenant in `TenantSettings` table.
- **BranchSettingsOverride Entity**: Branch-level overrides for attendance and mobile settings. All properties nullable — null = inherit from TenantSettings. One optional row per branch in `BranchSettingsOverrides` table.
- **DepartmentSettingsOverride Entity**: Department-level overrides with limited scope (default shift, approval comments only). One optional row per department in `DepartmentSettingsOverrides` table.
- **Settings Inheritance Chain**: Platform Defaults → Tenant Settings → Branch Overrides → Department Overrides. Resolved by `ITenantSettingsResolver` service with 5-min caching and per-field source tracking ("tenant", "branch", "department").
- **PolicyTemplate / PolicyTemplateItem Entities**: Named collections of policy configurations (JSON blobs) for quick tenant setup. System templates and tenant-created custom templates. Supported PolicyTypes: `TenantSettings`, `VacationType`, `ExcusePolicy`, `Shift` (with ShiftPeriods), `OffDay`, `OvertimeConfiguration`, `RemoteWorkPolicy`.
- **Seeded Policy Templates** (8 total, auto-seeded on first run):
  - **Saudi Standard** (`saudi-standard`, SA): 12 items — TenantSettings, 7 vacation types (Annual/Sick/Marriage/Maternity/Paternity/Bereavement/Hajj per Saudi Labor Law Articles 109/114/117/151), ExcusePolicy, Shift (Sun-Thu 08:00-17:00), OffDay (Fri-Sat), OvertimeConfiguration
  - **UAE Standard** (`uae-standard`, AE): 11 items — TenantSettings, 6 vacation types per Decree-Law 33/2021, ExcusePolicy, Shift (Mon-Fri 09:00-18:00), OffDay (Sat-Sun), OvertimeConfiguration
  - **6 Industry Templates** (SA): Healthcare (12h rotating shifts), Construction (06:00-14:00), Technology (flexible + remote work), Retail (split shifts), Government (07:30-14:30), Education (07:00-14:00)
- **SetupStep Entity**: Tracks tenant onboarding completion per step (company_info, branches, departments, shifts, vacation_types, excuse_policies, workflows, employees, payroll). Auto-detection logic checks DB for actual data.
- **Auto-Initialization**: When a tenant is created, `TenantSettings` defaults and 9 `SetupStep` rows are automatically created.
- **SystemAdmin Fallback**: `BaseHandler.ResolveTenantIdAsync()` allows SystemAdmin users (who have no `tenant_id` JWT claim) to access tenant configuration by falling back to the first active tenant.
- **API Endpoints**:
  - `GET/PUT /api/v1/tenant-configuration` — tenant settings CRUD
  - `GET /api/v1/tenant-configuration/resolved?branchId=&deptId=` — resolved settings with inheritance + source tracking
  - `GET/PUT/DELETE /api/v1/tenant-configuration/branches/{id}` — branch overrides
  - `GET/POST /api/v1/tenant-configuration/setup-status` — setup tracking with auto-detection
  - `GET /api/v1/policy-templates?region=&industry=` — policy template listing with region/industry filters
  - `GET /api/v1/policy-templates/{id}` — get template by ID with items and ConfigurationJson
  - `POST /api/v1/policy-templates` — create custom tenant template
  - `PUT /api/v1/policy-templates/{id}` — update template (system templates require SystemAdmin)
  - `DELETE /api/v1/policy-templates/{id}` — delete custom template (system templates cannot be deleted)
  - `POST /api/v1/policy-templates/{id}/apply?branchId=` — apply template to tenant or branch
- **Frontend Tenant Administration Console**: Sidebar + content layout at `/settings/tenant-config` with 9 child routes (General, Attendance, Leave, Approval, Notification, Mobile, Security, Policy Templates, Setup Status). External policy links (Excuse Policies, Overtime, Workflows, etc.) are permission-gated.
- **Frontend Service**: `TenantConfigurationService` in `time-attendance-frontend/src/app/pages/settings/tenant-configuration/services/`

#### 2. Organization Structure
- **Tenants**: Top-level company/organization entity (stored in master DB) — owns a dedicated database, has subscription plan, company info, and regional defaults
- **Branches**: Multi-branch organization support with branch-scoped data, GPS geofencing (latitude, longitude, radius) with interactive map-based location picker (Leaflet + OpenStreetMap). Stored in tenant DB (no TenantId FK needed — the database itself provides isolation).
- **Departments**: Hierarchical department structure (parent-child relationships)
- **Employees**: Complete employee lifecycle management
- **Users**: User accounts with role and branch assignments
- **Roles & Permissions**: Fine-grained permission system (70+ resources, 26 actions, 223+ authorization policies)

#### 3. Time & Attendance
- **Attendance Records**: Daily automated generation of attendance records
- **Transactions**: Check-in, check-out, break start/end tracking
- **Calculations**: Automatic working hours, overtime, late minutes, early leave
- **Status Tracking**: Present, Absent, Late, OnLeave, Holiday, Weekend, etc.
- **Manual Override**: Edit and override automated attendance calculations
- **Approval Workflow**: Multi-step attendance approval process
- **Finalization**: Lock attendance records after approval
- **Device Integration**: Support for biometric fingerprint devices
- **Mobile GPS+NFC Verification**: Dual-verification attendance via geofencing and NFC tag scanning
- **Attendance Verification Audit**: Full audit trail of all mobile verification attempts (GPS data, NFC data, device info, failure reasons)

#### 4. Shift Management
- **Shift Types**: Regular, Flexible, Split, Rotating, Night shifts
- **Shift Periods**: Multiple work periods per shift
- **Break Configuration**: Configurable break times
- **Grace Periods**: Late arrival and early departure tolerance
- **Overtime Rules**: Per-shift overtime calculation settings
- **Off Days**: Configurable off days per shift
- **Core Hours**: Define mandatory working hours
- **Shift Assignments**: Assign shifts to employees, departments, or branches
- **Priority System**: Handle overlapping shift assignments by priority
- **Temporary Assignments**: Time-bound shift assignments
- **Change Shift**: Modify employee or attendance record shifts

#### 5. Leave Management
- **Vacation Types**: Configurable leave types (annual, sick, personal, etc.)
- **Leave Policies**: Paid/unpaid, max days, carryover rules, accrual policies
- **Employee Vacations**: Create, approve, and track vacation requests
- **Leave Balances**: Track balances by employee and vacation type
- **Leave Transactions**: Accrual, usage, adjustments, carryover, expiry
- **Leave Entitlements**: Automatic entitlement assignments
- **Approval Workflow**: Multi-step vacation approval process
- **Calendar View**: Visual vacation calendar

#### 6. Excuse Management
- **Excuse Policies**: Configurable excuse types and limits
- **Excuse Types**: Sick, Personal, Emergency, Medical, Family, etc.
- **Documentation Requirements**: Attachable documents for excuses
- **Approval Workflow**: Multi-step excuse approval process
- **Balance Tracking**: Track excuse hours/days usage
- **Reset Periods**: Configure policy reset cycles

#### 7. Remote Work Management
- **Remote Work Policies**: Maximum days per week/month, notice periods
- **Work Location Types**: Office, Remote, Field Work, Client Site
- **Remote Work Requests**: Create and approve remote work requests
- **Approval Workflow**: Multi-step remote work approval process
- **Blackout Periods**: Define periods when remote work is not allowed
- **Department Eligibility**: Configure which departments can work remotely

#### 8. Approval Workflows
- **Workflow Definitions**: Configurable multi-step approval processes
- **Workflow Types**: Support for Vacation, Excuse, Remote Work, and custom types
- **Step Types**: Approval, Notification, Condition, Automatic
- **Approver Types**: Role, User, Manager, Direct Manager, Department Head
- **Delegation**: Delegate approvals to other users
- **Timeout & Escalation**: Automatic escalation on timeout
- **Conditional Logic**: Execute steps based on conditions
- **Parallel & Sequential**: Support both approval patterns
- **Branch-Specific**: Different workflows per branch

#### 9. Employee Self-Service Portal
**Separate Angular Application** (`time-attendance-selfservice-frontend`)
- **Employee Dashboard**: Personal attendance stats, vacation balance, recent activity
- **Manager Dashboard**: Team statistics, pending approvals, team member list
- **My Attendance**: View personal attendance records and history
- **My Profile**: View and update personal information
- **Vacation Requests**: Create, view, edit, and cancel vacation requests
- **Excuse Requests**: Create, view, edit, and cancel excuse requests
- **Remote Work Requests**: Create, view, edit, and cancel remote work requests
- **Fingerprint Requests**: Request fingerprint enrollment, update, or repair
- **Approvals**: Approve/reject team member requests (for managers)
- **Team View**: View team members and their hierarchy

#### 10. NFC Tag Management & Security
- **NFC Tags**: Physical NFC tags registered to branches for attendance verification
- **Tag Lifecycle**: Status tracking (Unregistered, Registered, Active, Disabled, Lost)
- **HMAC-SHA256 Signing**: Encrypted payload written during provisioning for tamper detection
- **Payload Format**: `{tagId}|{branchId}|{tagUid}|{timestamp}|{hmacSignature}`
- **Verification Hash**: SHA256 integrity hash for each tag
- **Scan Tracking**: Last scan timestamp and scan count per tag
- **Write Protection**: User audit trail for tag provisioning
- **Configuration-Driven**: `NfcEncryption:RequirePayload` toggle in appsettings

#### 11. Fingerprint/Biometric Management
- **Fingerprint Requests**: Employee self-service requests for fingerprint management
- **Request Types**: Enrollment, Update, Repair, Replacement
- **Technician Assignment**: Assign technicians to handle requests
- **Status Tracking**: Pending, InProgress, Completed, Cancelled
- **Preferred Date/Time**: Schedule fingerprint appointments
- **Technician Notes**: Track technician feedback and resolution

#### 12. Overtime Management
- **Overtime Configuration**: Per-branch overtime rules
- **Regular Overtime**: Standard overtime rate and thresholds
- **Premium Overtime**: Enhanced overtime for weekends/holidays
- **Daily/Weekly/Monthly Thresholds**: Multiple calculation periods
- **Automatic Calculation**: Overtime calculated during attendance processing
- **Approval Requirements**: Optional approval workflow for overtime

#### 13. Public Holidays
- **Holiday Management**: Create and manage public holidays
- **Recurring Holidays**: Support for annual recurring holidays
- **Branch-Specific**: Different holidays per branch
- **Attendance Impact**: Automatic marking of attendance on holidays
- **Bilingual Names**: Holiday names in English and Arabic

#### 14. Dashboards & Analytics
- **Admin Dashboard**: Organization stats, HR stats, attendance stats, leave stats, system health
- **Employee Dashboard**: Personal attendance, leave balance, recent activity, upcoming vacations
- **Manager Dashboard**: Team size, pending approvals, team attendance overview
- **Widgets**: Modular dashboard with real-time data refresh
- **Weekly Trends**: Attendance trends over time
- **Incomplete Records**: Track and highlight incomplete attendance

#### 15. Reporting & Audit
- **Attendance Reports**: Summary and detailed reports with date range, branch, department filtering
- **Leave Reports**: Leave summary and breakdown by type
- **Export to CSV**: Download reports for external analysis
- **Audit Logs**: Comprehensive tracking of all system changes
- **Audit Changes**: Before/after value comparison for all modifications
- **Session Reports**: Active sessions and login history
- **User Activity Tracking**: Track who did what and when

#### 16. System Administration
- **Database Seeding**: Initialize system with sample data
- **Background Jobs** (using Coravel):
  - Daily attendance generation
  - End-of-day attendance finalization
  - Monthly leave accrual calculations
  - Workflow timeout processing (hourly)
- **Permission Management**: Manage system permissions (52 authorization policies)
- **System Configuration**: Configure system-wide settings
- **Global Exception Handler**: Centralized error handling middleware with standardized JSON error responses and traceId for debugging

#### 17. Multi-Language Support
- **Bilingual UI**: Full support for English and Arabic (100% translation coverage)
- **Entity Names**: All entities support bilingual names
- **RTL Support**: Full right-to-left layout for Arabic including sidebar, topbar, forms, tables, and all components
- **Translation Service**: Centralized i18n service with ~2,700+ translation keys per language
- **Translation Sync**: EN and AR translation files are fully synchronized with zero missing keys

#### 18. Real-Time Notifications
- **SignalR Hub**: Real-time notification delivery via WebSocket
- **Notification Types**:
  - RequestSubmitted: Sent when a request is created
  - RequestApproved: Sent when a request is approved
  - RequestRejected: Sent when a request is rejected
  - RequestDelegated: Sent when approval is delegated
  - RequestEscalated: Sent when a request times out
  - ApprovalPending: Sent when a new request awaits approval
  - DelegationReceived: Sent when delegation is assigned to user
  - ApprovalReminder: Reminder for pending approvals
- **User-Targeted**: Notifications sent to specific user groups
- **Bilingual Content**: Title and message in English and Arabic
- **Read Tracking**: Mark notifications as read
- **Action URLs**: Navigate directly to related entities

#### 19. Recruitment & Hiring
- **Job Requisitions**: Create, approve, and track hiring requests with priority, budget, and target dates
- **Job Postings**: Publish requisitions internally/externally with descriptions, requirements, and benefits
- **Candidates**: Manage candidate profiles with resumes, skills, experience, and salary expectations
- **Job Applications**: Track applications through pipeline stages (Applied, Screening, Interview, Assessment, Offered, Hired, Rejected)
- **Interviews**: Schedule phone, video, in-person, panel, technical, and HR interviews with multiple interviewers
- **Interview Feedback**: Collect structured feedback with technical, communication, culture fit, and overall ratings
- **Offer Letters**: Generate, approve, send, and track offer letters with salary, benefits, and terms
- **Recruitment Dashboard**: Pipeline analytics, time-to-hire metrics, and source effectiveness

#### 20. Onboarding
- **Onboarding Templates**: Reusable task templates with categories (Documentation, IT, HR, Training, Equipment, Access, Introduction)
- **Onboarding Processes**: Employee-specific onboarding instances created from templates
- **Onboarding Tasks**: Track task completion with priorities, due dates, assignees, and mandatory flags
- **Onboarding Documents**: File upload and document management per onboarding process
- **Onboarding Dashboard**: Active processes, completion rates, overdue tracking, and task distribution by category

#### 21. Performance Management
- **Review Cycles**: Define review periods (Annual, Semi-Annual, Quarterly, Monthly, Probation, Project-Based, 360-Degree)
- **Performance Reviews**: Structured reviews with overall ratings, strengths, areas for improvement, and goals
- **Goals & Objectives**: SMART goal setting with progress tracking and weight-based scoring
- **Competency Framework**: Define competencies with proficiency levels and department-specific requirements
- **Performance Improvement Plans (PIPs)**: Formal improvement plans with milestones, check-ins, and outcomes
- **360-Degree Feedback**: Multi-rater feedback collection from managers, peers, direct reports, and self
- **Performance Dashboard**: Rating distributions, goal completion rates, and review cycle progress

#### 22. Employee Lifecycle Management
- **Employee Contracts**: Contract creation, activation, renewal, termination, and document attachment
- **Salary Adjustments**: Annual increments, promotions, market adjustments, and corrections with approval workflow
- **Employee Promotions**: Track promotions with salary changes, title changes, and effective dates
- **Employee Transfers**: Inter-branch and inter-department transfers with history tracking
- **Job Grades**: Grade structure with salary ranges for compensation planning

#### 23. Payroll & Compensation
- **Salary Structures**: Define salary components (Basic, HRA, Transport, etc.) with calculation types
- **Payroll Periods**: Monthly payroll processing with record generation and finalization
- **Allowance Types & Policies**: Configurable allowance types with eligibility rules and calculation methods
- **Allowance Assignments**: Assign allowances to employees with effective date ranges
- **Allowance Requests**: Employee-initiated allowance requests with approval workflow
- **End-of-Service Benefits**: Saudi labor law compliant EOS calculation

##### Production-Safe Payroll Calculation Pipeline (v13.0)
The payroll calculation engine was refactored from a procedural handler with hardcoded formulas into a policy-driven pipeline. Every input is resolved by effective date; every multiplier comes from configuration; every run is audited; finalized payroll is locked. See `PAYROLL_PRODUCTION_FIX_REVIEW.md` for the full rationale.

- **Orchestrator**: `IPayrollCalculationService` — per-employee workflow: resolver → calculators → result. Stateless, DI-scoped, injected into `ProcessPayrollPeriodCommandHandler`.
- **Effective-date resolver**: `IPayrollInputResolver` — centralizes all "which record applies for this period" logic. Builds a fully-resolved `PayrollCalculationContext` before any arithmetic runs.
  - **Salary**: all `EmployeeSalary` records overlapping `[periodStart, periodEnd]` are returned (ordered by `EffectiveDate`). Two open-ended `IsCurrent=true` rows for the same employee raise `PayrollCalculationException` and fail that employee only.
  - **Allowances**: all `AllowanceAssignment` rows with `Status=Active` overlapping the period are stacked.
  - **Tax configuration**: branch-specific beats tenant-wide; within a scope, latest `EffectiveDate ≤ periodEnd` wins.
  - **Social insurance configuration**: branch-specific > tenant-wide; **nationality-filtered** via new `AppliesToNationalityCode` (exact case-insensitive match on `Employee.Nationality`; falls back to the null-code config if no match).
  - **Employee insurance**: employee must have an active `EmployeeInsurance` row whose `[StartDate, EndDate]` overlaps the period — otherwise SI contributions are 0 with a warning.
  - **Overtime configuration**: per-date map — if the config changes mid-period, each day uses the config active on that specific date.
  - **Calendar policy**: branch-specific > tenant-wide; latest effective wins; falls back to `FixedBasis(30)` + `StandardHoursPerDay=8` if none configured.
  - **Public holidays**: resolved via existing `PublicHoliday.GetHolidayDateForYear(year)` for each year in the period, filtered to national or branch-matching rules.

- **Calculators** (all stateless, all consume the resolved context — never hardcode):
  - **`ITaxCalculator`** — builds taxable base (basic + allowances flagged `IsTaxable`), applies progressive `TaxBracket`s via stepping logic (`slice × Rate + FixedAmount`), writes `PayrollRecord.TaxAmount`, adds `TaxDeduction` detail line with config name + effective date. No tax config → 0 + audit warning.
  - **`ISocialInsuranceCalculator`** — builds insurable base (basic + allowances flagged `IsSocialInsurable`), caps at `MaxInsurableSalary`, multiplies by config rates. Writes `SocialInsuranceEmployee` (deducted) and `SocialInsuranceEmployer` (informational, not in net). No active `EmployeeInsurance` → 0 + warning.
  - **`IOvertimePayCalculator`** — **reuses existing `OvertimeConfiguration` entity methods**: `GetOvertimeRate(DayType)`, `RoundOvertimeHours`, `MeetsMinimumThreshold`. Classifies each attendance day by `DayType` (Holiday → config.PublicHolidayRate, weekend-when-`WeekendAsOffDay`-is-true → OffDayRate, else NormalDayRate), line-itemizes per day-type bucket. **Never hardcodes 1.5×.**
  - **`IAbsenceDeductionCalculator`** — `dailyRate = baseSalary / dailyBasisDays`, where `dailyBasisDays` comes from `IPayrollCalendarResolver`. **No hardcoded 30.**
  - **`IPayrollCalendarResolver`** — produces `dailyBasisDays` per `PayrollCalendarPolicy.BasisType`: `CalendarDays` (28/29/30/31), `WorkingDays` (excl. Fri/Sat; excl. unpaid public holidays if `TreatPublicHolidaysAsPaid=false`), or `FixedBasis` (e.g. 30). Also provides `StandardHoursPerDay` used by the hourly basis for overtime.
  - **`IProrationCalculator`** — `overlapDays / periodDays`, used by salary slices (mid-period raise), allowance starts/ends inside the period, and any future input that needs partial-period applicability.

- **`PayrollCalendarPolicy`** entity (new, tenant/branch-scoped) — the single source of truth for daily-rate basis. Eliminates the legacy hardcoded 30-day month.

- **`SocialInsuranceConfig.AppliesToNationalityCode`** (new, nullable) — enables Saudi-GOSI-style segregation without requiring a per-nationality config tree. Resolver prefers exact nationality match; falls back to null-code "applies to all."

- **Overtime configuration is consumed, never duplicated**. `OvertimeConfigurationService` (pre-existing) continues to serve read paths; the payroll calculator calls the same entity methods the service uses.

- **Line-itemized breakdowns** — every payroll record now carries explicit `PayrollRecordDetail` rows for Housing Allowance, per-day-type Overtime buckets, Income Tax, SI (Employee deduction), and SI (Employer informational). Each line has a `Notes` column explaining the calculation inputs used.

##### Payroll Status Lifecycle & Locking
```
Draft ─process→ Processing ─calc→ Processed ─approve→ Approved ─markPaid→ Paid 🔒
  │                                    │
  │                           ┌──recalculate──┐
  │                           │               │
  │                           ▼               │
  │                       Processed ←─────────┘
  │
  └────cancel────▶ Cancelled
```
- `ProcessPayrollPeriodCommand(long PayrollPeriodId, bool IsRecalculation = false)` — the only entry point. Initial processing requires `Status=Draft`; recalculation requires `Status=Draft|Processed`.
- `POST /api/v1/payroll-periods/{id}/process` calls it with `IsRecalculation=false`.
- `POST /api/v1/payroll-periods/{id}/recalculate` calls it with `IsRecalculation=true` — on recalc, existing non-locked `PayrollRecord` rows are soft-deleted (with note linking to the new run) and fresh records are produced. `CalculationVersion` increments.
- `POST /api/v1/payroll-periods/{id}/mark-paid` transitions `Approved → Paid`, sets `PayrollPeriod.LockedAtUtc`, sets `LockedAtUtc` on every non-deleted record, flips records to `PayrollRecordStatus.Finalized`, and writes a `Finalization` entry to `PayrollRunAudit`.
- **Lock enforcement**: `/process` and `/recalculate` reject locked periods (HTTP 400 "Payroll period is locked (Paid) and cannot be processed or recalculated.") — checked in the handler up front, before any state mutation. Locked records are never overwritten even if a recalc somehow bypasses the period-level check.

##### Payroll Audit Trail
- **`PayrollRunAudit`** — one row per run (`InitialProcess` / `Recalculation` / `Adjustment` / `Finalization` / `Cancellation`). Captures triggering user, start/complete timestamps, status (`Running` / `Completed` / `Failed` / `CompletedWithWarnings`), employees processed/failed/skipped, warning count, plus JSON columns `ConfigSnapshotJson`, `WarningsJson`, `ErrorsJson`.
- **`PayrollRunAuditItem`** — one row per employee per run with calculated totals, status (`Succeeded` / `SkippedNoSalary` / `SkippedInactive` / `FailedWithError` / `CompletedWithWarnings`), per-item warnings/error message.
- **`PayrollRecord.CalculationBreakdownJson`** — serialized snapshot of the exact inputs used: salary segments with their effective dates, resolved config IDs + effective dates, calendar basis used, hourly basis used, SI config details, OT config IDs touched, and final totals. Supports later forensic audit and explainability.
- **`PayrollRecord.LastRunId`** — FK to the `PayrollRunAudit` that produced this record.
- **Endpoint**: `GET /api/v1/payroll-periods/{id}/run-audit` returns the chronological run history for a period.

##### Two-Pass Allowance Resolution (Percentage-of-Gross)
The orchestrator applies allowances in two passes to support `CalculationType.PercentageOfGross` without self-reference:
1. **Pass 1** — Fixed amount and `PercentageOfBasic` allowances are resolved and added to `TotalAllowances`. Overtime pay is then computed and also added.
2. **Pass 2** — `PercentageOfGross` assignments are resolved against a **provisional gross** (`BaseSalary + Pass-1 allowances + OvertimePay`). This fixes the base before computing pct allowances so they can't reference themselves.
Each pct-of-gross detail line records its basis explicitly in `Notes`, e.g. `"Allowance #2 @ 5.00% of gross (13572.74)"`. Tenants that want stacking pct-of-gross behavior must split assignments into separate effective windows — the engine deliberately does not chain percentages.

##### Recalculation Rules
- **Blocked when**: period is `Paid` / `LockedAtUtc` is set / period is `Cancelled`.
- **Allowed when**: period is `Draft` or `Processed` — explicit opt-in via the `/recalculate` endpoint (distinct from `/process`). A second call to `/process` on a `Processed` period is rejected to prevent silent overwrites.
- **Behavior**: existing `PayrollRecord` rows whose `LockedAtUtc` is null and `Status != Finalized` are soft-deleted (`IsDeleted=true`, `Notes` appended with "Superseded by recalc on {timestamp}"). New records are inserted with `CalculationVersion = 2` and `LastRunId` pointing to the new audit row.
- **Not allowed**: `PayrollRecordStatus.Adjusted` is a declared state but no code path currently sets it — adjustments flow through recalculation instead.

##### Admin Retroactive Unlock (SystemAdmin-only)
For rare cases where a Paid/locked payroll must be corrected (e.g. tax bracket error discovered post-finalization):
- **Endpoint**: `POST /api/v1/payroll-periods/{id}/admin-unlock` with body `{ "reason": "..." }`. SystemAdmin authorization required (returns 403 otherwise). Reason is mandatory (400 if missing).
- **Preconditions**: period status must be `Paid` with `LockedAtUtc` set. Returns 400 otherwise.
- **Effect**: reverts period status to `Processed` (NOT Approved — so `/recalculate` is immediately allowed), clears `LockedAtUtc`/`LockedByUserId` on period and every non-deleted record, sets records back to `PayrollRecordStatus.Calculated`, and clears `ApprovedAt`/`ApprovedByUserId` so the full approval workflow re-runs.
- **Audit**: writes a `PayrollRunAudit` row with `RunType=Adjustment` and the supplied reason serialized into `WarningsJson` as `{ "kind": "admin-unlock", "reason": "...", "records": N }`. Permanent, queryable forensic trail.
- **Deliberately no auto-recalc**: the admin must consciously call `/recalculate` → `/approve` → `/mark-paid` in sequence, reviewing numbers at each step. The endpoint only unlocks; it never changes calculated values itself.

##### Edge Cases and Warnings
The calculator emits warnings (surfaced in `PayrollRunAuditItem.WarningsJson` + `PayrollRunAudit.WarningsJson`) for these non-fatal scenarios — calculation continues for other employees:
- Mid-period salary change → base salary prorated across slices; warning notes the number of slices.
- No tax configuration effective for the period → `TaxAmount = 0`.
- No social insurance configuration effective → SI = 0.
- Employee has no active `EmployeeInsurance` overlapping the period → SI = 0.
- Overtime hours recorded on a day with no active `OvertimeConfiguration` → that day's OT is skipped.

Fatal (per-employee) errors are caught and recorded as `PayrollRunAuditItem.FailedWithError`; the run continues:
- Two open-ended `IsCurrent=true` salary records for the same employee → "Resolve before processing payroll."
- No effective salary found for the period → "Employee X has no effective salary for period Y..Z."

##### DateTime.Kind Normalization
`HashSet<DateTime>` and `Dictionary<DateTime, T>` mix `DateTimeKind` into the hash, so dates with `Kind=Utc` (from `timestamptz` columns like `SpecificDate`) do not match dates with `Kind=Unspecified` (from `date` columns like `AttendanceDate`) even when representing the same day. The payroll resolver and OT calculator both normalize date-keyed collections to `DateTime.SpecifyKind(d.Date, DateTimeKind.Unspecified)` at both construction and lookup sites. Keep this pattern when adding new date-keyed lookups across Postgres tables that mix column types.

#### 24. Offboarding
- **Resignation Requests**: Employee resignation submission with notice period tracking
- **Termination Records**: Employment termination with reason classification and documentation
- **Exit Interviews**: Structured exit interview feedback collection
- **Clearance Checklists**: Department-specific clearance items with completion tracking
- **Final Settlements**: Calculate final settlement including pending salary, leave encashment, and EOS

#### 25. File Upload & Attachment System
- **File Storage**: Local disk storage in `uploads/` directory (configurable for cloud in production)
- **Upload API**: `POST /api/v1/files/upload` - multipart form data, 10MB max
- **Download API**: `GET /api/v1/files/{storedFileName}`
- **Reusable Component**: `FileUploadComponent` in `shared/components/file-upload/`
- **Supported Types**: PDF, DOC, DOCX, JPG, JPEG, PNG, XLSX
- **Entity Tracking**: `FileAttachment` entity links files to any entity via EntityType + EntityId
- **Integrated Forms**: File upload integrated into employee edit (photo), contracts (document), salary adjustments (supporting docs), candidates (resume), applications (cover letter), offer letters (PDF), onboarding processes (documents), and allowance requests (supporting documents)

---

## General Development Rules

### Project Structure
- Understand the project structure and follow this structure before implementing any new feature
- Split the new components into three files (ts, html, css)
- Follow the established folder organization patterns
- **Two Frontend Applications**:
  - `time-attendance-frontend`: Admin/management application (http://localhost:4200)
  - `time-attendance-selfservice-frontend`: Employee self-service portal (http://localhost:4201)
- **See "Running the Complete System" section below for startup instructions**

### Development Workflow
- Always give me the plan for implementation, then wait for me to confirm
- Compile the project and confirm no compilation errors before going to the next step
- Test features thoroughly before considering them complete
- Consider which frontend application the feature belongs to (admin vs. self-service)
- When testing, run all three applications: Backend (5099), Admin (4200), and Self-Service (4201)

### Backend Development
- Use **Coravel package** for all background jobs
- **Database Setup for Development**:
  - **Master DB** (`tecaxle_master`): Created automatically on first run with platform seed data (subscription plans, system modules)
  - **Tenant DBs** (`ta_tenant_{id}`): Auto-provisioned when a tenant is created via the admin UI or API. Each tenant DB gets EF Core migrations applied and a SystemAdmin user seeded.
  - After tenant DB creation: Run `scripts/sample-data-with-users.sql` against a tenant DB to populate with sample data (50 employees, 5 branches, 20 departments)
  - Sample data includes login credentials - Default password: `Emp@123!` (users must change on first login)
  - **Connection strings** in `appsettings.json`: `MasterDatabase` for the master DB, `PostgreSqlConnection` as template for tenant DBs, `MultiTenancy` section for mode configuration
- **C# Namespaces**: All namespaces are `TecAxle.Hrms.*` (project directories remain `TimeAttendanceSystem.*` with `RootNamespace`/`AssemblyName` set in `.csproj`)
- **DbContext**: `TecAxleDbContext` for tenant DBs (renamed from `TimeAttendanceDbContext`), `MasterDbContext` for master DB
- When applying database migrations, ensure that all existing data in the database is preserved
- Always run the backend on **http://localhost:5099**
- Follow Clean Architecture layers: Domain → Application → Infrastructure → API
- Use Entity Framework Core for data access
- Implement repository pattern with generic base repository
- Use DTOs for API request/response
- Implement proper validation using FluentValidation
- Use AutoMapper for object mapping

### Frontend Development
- Always run the admin frontend on **http://localhost:4200**
- Always run the self-service portal on **http://localhost:4201**
- Both frontends are separate applications that share the same backend API
- **Angular 20**: Always use the modern template syntax `@if` / `@for` / `@switch` instead of legacy structural directives (`*ngIf`, `*ngFor`, `*ngSwitch`). The entire codebase has been migrated - zero legacy directives remain.
- Follow Angular 20 standalone component patterns
- Use Angular Signals for reactive state management
- **All user-facing text must use `i18n.t('key')`** - never hardcode English strings in templates
- **Component CSS RTL**: Use `:host-context([dir="rtl"])` instead of `:root[dir="rtl"]` for RTL styles in component CSS files (Angular view encapsulation requires this)
- **CSS Variables**: Use `var(--app-*)` CSS variables from `styles/variables.css` and `styles/erp-tokens.css` instead of hardcoded hex colors
- **ERP Design System**: The UI follows the ERP Design System (`ERP_Design_System.html`). All colors, typography, and component styles are defined via CSS tokens in `erp-tokens.css`

---

## Frontend Component Standards

### Required Services
- Always use `NotificationService` for user notifications (success, error, warning, info)
- Always use `ConfirmationService` for confirmation dialogs (delete, submit, etc.)

### Data Display Standards
- Always use `DataTableComponent` for tables in the frontend
- Use `EmptyStateComponent` when no data is available
- Use `LoadingSpinnerComponent` for loading states

### Shared Component Usage (IMPORTANT)

#### View Pages
When creating view/detail pages, **always use**:
- `StatusBadgeComponent` for all status displays
- `DefinitionListComponent` for label-value pairs (instead of manual dt/dd)
- `BadgeListComponent` for collections of badges
- `FormHeaderComponent` for page headers with navigation
- `DetailCardComponent` for information cards

**Required Pattern**:
```typescript
import { Component, signal, inject, computed } from '@angular/core';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { BadgeListComponent, BadgeItem } from '../../../shared/components/badge-list/badge-list.component';

// Always use computed properties for reactive badge configuration
statusBadge = computed(() => ({
  label: this.entity()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
  variant: this.entity()?.isActive ? 'success' : 'secondary'
}));
```

#### List Pages
When creating list pages, **always use**:
- `DataTableComponent` for the main table
- `TableActionsComponent` for row actions (view, edit, delete)
- `SearchFilterComponent` or `UnifiedFilterComponent` for filtering
- `BulkActionsToolbarComponent` for bulk operations
- `PaginationComponent` for pagination
- `EmptyStateComponent` for empty states

**Required List Page Pattern** (IMPORTANT):
```html
<div class="xxx-page">
  <!-- Page Header - NO child content, NO buttons inside -->
  <app-page-header [title]="i18n.t('module.title')" />

  <!-- Unified Filter - handles Search, Refresh, and Add buttons -->
  <app-unified-filter
    [searchPlaceholder]="i18n.t('module.search_placeholder')"
    [showAddButton]="true"
    [addButtonText]="i18n.t('module.create')"
    [showRefreshButton]="true"
    [refreshButtonText]="i18n.t('common.refresh')"
    [refreshing]="loading()"
    (searchChange)="onSearchChange($event)"
    (add)="navigateToCreate()"
    (refresh)="onRefreshData()">
  </app-unified-filter>

  <!-- Data Table -->
  <app-data-table ... />
</div>
```

**NEVER** put buttons inside `<app-page-header>` on list pages. The "Create/Add" button is rendered by `<app-unified-filter>` via `[showAddButton]` and `[addButtonText]`. Use `(add)` event for navigation.

**Table Actions** must use `computed<TableAction[]>()` signal with `condition` functions for conditional visibility:
```typescript
tableActions = computed<TableAction[]>(() => [
  { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
  { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary',
    condition: (item: any) => item.status === 'Draft' },
  { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
]);
```

**Enum Values**: Frontend TypeScript enums must use **string values** matching the backend JSON serialization (e.g., `Draft = 'Draft'`, not `Draft = 1`). The .NET backend serializes enums as strings by default.

#### Form Pages
When creating form pages, **always use**:
- `FormHeaderComponent` for page header
- `FormSectionComponent` for logical grouping of fields
- `FormGroupComponent` for individual form fields with labels and validation
- `SearchableSelectComponent` for dropdowns with search
- `DateRangePickerComponent` for date ranges
- `TimeRangeInputComponent` for time ranges
- `LocationPickerComponent` for GPS coordinate selection with map (Leaflet + OpenStreetMap)

### Modal Standards
- Use `ModalWrapperComponent` for all custom modals
- Use `ConfirmationModalComponent` for confirmation dialogs (via `ConfirmationService`)

### Badge and Status Display Rules
- **NEVER** use inline `<span class="badge">` - always use `StatusBadgeComponent`
- **NEVER** create manual badge HTML - use shared components
- **NEVER** use manual dt/dd lists - always use `DefinitionListComponent`
- For DataTable columns, use HTML injection pattern (documented exception)

**Bad - Don't do this**:
```html
<span [class]="getStatusBadgeClass(entity.isActive)">
  {{ getStatusText(entity.isActive) }}
</span>

<dl class="row">
  <dt class="col-sm-4">Name</dt>
  <dd class="col-sm-8">{{ entity.name }}</dd>
</dl>
```

**Good - Do this**:
```html
<app-status-badge
  [status]="statusBadge().label"
  [variant]="statusBadge().variant">
</app-status-badge>

<app-definition-list
  [items]="basicInfoItems()"
  [labelWidth]="'4'"
  [valueWidth]="'8'">
</app-definition-list>
```

---

## Code Quality Standards

### TypeScript Standards
- Use signals for reactive state: `signal()`, `computed()`
- Use dependency injection with `inject()` function
- Maintain type safety - avoid `any` type when possible
- Use interfaces for complex objects

### Template Standards
- Use `@if`, `@for`, and `@switch` syntax (Angular 20) - **never** use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use signal accessors with `()`
- Maintain consistent indentation
- Use i18n service for all user-facing text: `i18n.t('key')` - never hardcode strings
- Never use `|| 'Fallback Text'` pattern with i18n - use `i18n.t('key')` for fallbacks too

### Styling Standards — ERP Design System

The UI follows the **ERP Design System** defined in `ERP_Design_System.html`. All styling uses CSS custom properties (design tokens).

- Use Bootstrap 5 utility classes for layout
- **Never hardcode hex colors** — always use `var(--app-*)` tokens from `styles/erp-tokens.css`
- **Typography**: Inter font for UI, JetBrains Mono for codes/money (`var(--app-font-family-mono)`)
- **RTL in component CSS**: Always use `:host-context([dir="rtl"])` selector, never `:root[dir="rtl"]`
- **RTL padding fix**: `<ul>` elements need explicit `padding-right: 0` in RTL

**CSS Architecture** (import order in `styles.css`):
```
styles/variables.css    → Base design tokens
styles/erp-tokens.css   → ERP color/shadow/typography overrides (THE source of truth)
styles/utilities.css    → Utility classes
styles/components.css   → Component patterns (buttons, cards, forms, badges, views)
styles/patterns.css     → Complex UI patterns
+ Leaflet fix           → Bootstrap img override for Leaflet map tiles (in styles.css)
```

**Leaflet Map Integration**: `leaflet` + `@types/leaflet` installed. Leaflet CSS loaded globally in `angular.json`. Bootstrap's `img { max-width: 100% }` breaks Leaflet tiles — override is in `styles.css` (`.leaflet-container img { max-width: none !important }`). Marker icons copied to `assets/leaflet/` via angular.json asset glob.

**Color Palette** (ERP Indigo Blue):

| Token | Value | Usage |
|-------|-------|-------|
| `--app-primary` | `#4F6BF6` | Primary actions, links, focus indicators |
| `--app-success` | `#22C55E` | Active, approved, success states |
| `--app-danger` | `#EF4444` | Errors, rejected, inactive states |
| `--app-warning` | `#F59E0B` | Pending, warning states |
| `--app-info` | `#3B82F6` | Info, in-progress states |
| `--app-accent` | `#F97316` | Highlights, accent elements |
| `--app-gray-200` | `#EAECF0` | Borders, dividers |
| `--app-gray-300` | `#D0D5DD` | Input borders |
| `--app-gray-500` | `#667085` | Secondary text, labels |
| `--app-gray-700` | `#344054` | Primary text |
| `--app-gray-900` | `#101828` | Headings, dark text |

Each semantic color has shade variants: `--app-{color}-50` (lightest bg), `--app-{color}-100`, `--app-{color}-400`, `--app-{color}-500`, `--app-{color}-600` (darkest text).

**Page Background**: `#F5F6FA` (`--app-page-bg`)
**Sidebar**: Deep navy `#0F1629` (`--app-sidebar-bg`)

**Shadows** (use `rgba(16,24,40,...)` not `rgba(0,0,0,...)`):

| Token | Usage |
|-------|-------|
| `--app-shadow-xs` | Inputs, small elements |
| `--app-shadow-sm` | Cards, panels |
| `--app-shadow-md` | Hover states, dropdowns |
| `--app-shadow-lg` | Toasts, popovers |
| `--app-shadow-xl` | Modals, dialogs |

**Button Classes** (overridden in `components.css`):

| Class | Style |
|-------|-------|
| `.btn-primary` | Indigo bg (#4F6BF6), white text |
| `.btn-secondary` | White bg, gray-300 border, gray-700 text |
| `.btn-ghost` / `.btn-link` | Transparent bg, primary text, primary-50 hover |
| `.btn-success/danger/warning/info` | Semantic color bg, white text |
| `.btn-sm` | 6px 12px padding, 13px font |
| `.btn-lg` | 12px 24px padding, 15px font |

**Status Badges** (ERP pill design with dot indicator):

StatusBadgeComponent renders pill-shaped badges (border-radius 16px) with a 6px colored dot. Uses `erp-badge-*` classes with semantic-50 backgrounds and semantic-600 text. Never use Bootstrap `bg-*` badge classes.

### Modern Form Design System (ERP Label-Above-Input)

All create/edit forms **must** use the `.app-modern-form` CSS class system. This applies to both frontends.

**Design**: Labels permanently positioned above inputs (NOT floating/animated). Full-bordered inputs with focus ring.

**CSS Architecture**:
- Design tokens: `styles/erp-tokens.css` (button/form/shadow overrides)
- Form styles: `styles/components.css` (scoped under `.app-modern-form`)
- RTL overrides: `styles.css` (under `:root[dir="rtl"] .app-modern-form`)

**Form Field Specs**:
- Label: 13px, font-weight 500, color gray-700 (`#344054`)
- Input: `1px solid gray-300`, border-radius 6px, font-size 14px, padding `10px 14px`
- Focus: border `--app-primary`, box-shadow `0 0 0 3px --app-primary-100` (#D8E0FF)
- Validation: border `--app-danger`, box-shadow `0 0 0 3px --app-danger-100` (#FEE2E2)

**How to Apply**:
1. Add `app-modern-form` class to the outermost container `<div>`
2. Use `<app-form-section variant="modern">` for section cards
3. Convert fields by type:

| Field Type | Pattern |
|---|---|
| Text/date/password/number input | Wrap in `<div class="form-floating">`, input BEFORE label, add `id` + `placeholder` |
| Native `<select>` | Wrap in `<div class="form-floating">` with `form-select` class |
| SearchableSelectComponent | Wrap in `<div class="app-modern-field">` with `<label class="app-modern-label">` |
| Multi-select / complex controls | `app-modern-field` + `app-modern-label` |
| Checkboxes / toggles | Keep as-is (enhanced by global CSS) |

4. Move `.invalid-feedback` outside `form-floating`, add `d-block` class
5. Use `<div class="app-form-actions">` for submit/cancel buttons

**Section Cards**: White bg, `1px solid gray-200` border, 12px radius, shadow-xs. Header has icon + title + separator line.

### Modern View Design System (ERP Entity Detail Pages)

All view/detail pages use the `.app-modern-view` CSS class system.

**Card Design**: Clean white cards with `1px solid gray-200` border, 12px radius, shadow-sm. No accent left-border.
**Card Headers**: Flat `gray-25` background, 16px 600-weight title with icon, gray-200 bottom border.
**Definition Lists**: Labels are 13px gray-500 (normal case, not uppercase). Values are 14px gray-900.
**Tabs**: 2px bottom border, active tab has primary color + primary bottom border. Font 14px, weight 500.
**Stat Cards**: Clean bordered cards, 28px bold value, 13px gray-500 label.

**Reference**: See `ERP_Design_System.html` for the full visual spec.

---

## Documentation Requirements

### When Creating New Features
1. Follow patterns in `SHARED_COMPONENTS_QUICK_REFERENCE.md`
2. Reference `COMPONENT_REFACTORING_DOCUMENTATION.md` for best practices
3. Check `DOCUMENTATION_INDEX.md` for related documentation

### When Refactoring
1. Use computed properties for reactive data
2. Replace inline patterns with shared components
3. Maintain backward compatibility when possible
4. Test thoroughly after refactoring

---

## Testing Standards

### Before Committing Code
- [ ] Compile with no TypeScript errors
- [ ] All computed properties update correctly
- [ ] Shared components render properly
- [ ] i18n translations work correctly
- [ ] No visual regressions
- [ ] Responsive behavior maintained
- [ ] Loading states work correctly
- [ ] Error handling works correctly

### Build Verification
- Run `ng build` to verify production build
- Check bundle sizes haven't increased significantly
- Verify no console errors in development mode

---

## Reference Documentation

### Essential Reading
- **Quick Reference**: `SHARED_COMPONENTS_QUICK_REFERENCE.md` - Component usage guide
- **Refactoring Guide**: `COMPONENT_REFACTORING_DOCUMENTATION.md` - Patterns and best practices
- **Documentation Index**: `DOCUMENTATION_INDEX.md` - Master index of all docs

### Component Documentation
All shared components are documented in `SHARED_COMPONENTS_QUICK_REFERENCE.md` with:
- Usage examples
- Input/Output parameters
- TypeScript patterns
- HTML examples
- Common use cases

### Architecture Documentation
- `PROJECT_ARCHITECTURE.md` - System architecture overview
- `COMPONENT_EXTRACTION_PLAN.md` - Component strategy and rationale
- `API_DOCUMENTATION.md` - Backend API reference

---

## Common Patterns

### Creating a New View Page
1. Import required components: `StatusBadgeComponent`, `DefinitionListComponent`, `BadgeListComponent`
2. Create signal for entity: `entity = signal<Entity | null>(null)`
3. Create computed properties for badges: `statusBadge = computed(() => ({ ... }))`
4. Create computed properties for definition lists: `basicInfoItems = computed(() => [...])`
5. Use components in template instead of inline HTML

### Creating a New List Page
1. Import: `DataTableComponent`, `TableActionsComponent`, `EmptyStateComponent`
2. Define table columns with `TableColumn[]` interface
3. Define table actions with `TableActionItem[]` interface
4. Handle pagination, sorting, and filtering
5. Use `EmptyStateComponent` for no data states

### Creating a New Form
1. Import form components: `FormHeaderComponent`, `FormSectionComponent`, `FormGroupComponent`
2. Use `ReactiveFormsModule` for form handling
3. Group related fields in `FormSectionComponent`
4. Use `FormGroupComponent` for each field with validation
5. Use appropriate input components (`SearchableSelectComponent`, `DateRangePickerComponent`, etc.)

---

## Important Notes

### Component Usage is Mandatory
- Using shared components is **not optional** - it's required for consistency
- All new features must follow established patterns
- Refactor existing code to use shared components when modifying it

### Performance Considerations
- Shared components are optimized and tested
- Using them ensures consistent performance
- Computed properties are efficient with Angular signals

### Maintenance Benefits
- Centralized component logic reduces bugs
- Consistent UI patterns improve UX
- Easier to update styling across the application
- Reduced code duplication

---

## Getting Help

### Can't Find a Component?
- Check `SHARED_COMPONENTS_QUICK_REFERENCE.md` for complete catalog
- Search the `shared/components` directory
- Ask team members for guidance

### Unsure About a Pattern?
- Review `COMPONENT_REFACTORING_DOCUMENTATION.md` for examples
- Look at recently refactored components (view-user, view-vacation-type, edit-attendance)
- Check `DOCUMENTATION_INDEX.md` for related documentation

### Need to Create New Shared Component?
- Review `COMPONENT_EXTRACTION_PLAN.md` for component design principles
- Follow established component structure (separate ts/html/css files)
- Document the new component in `SHARED_COMPONENTS_QUICK_REFERENCE.md`

---

## Employee Self-Service Portal (Separate Application)

### Overview
The TecAxle HRMS includes a **separate Angular application** specifically designed for employee self-service. This is a standalone frontend application that runs independently from the admin portal.

**Application Location**: `time-attendance-selfservice-frontend/`

### Key Differences from Admin Portal

| Aspect | Admin Portal | Self-Service Portal |
|--------|--------------|---------------------|
| **Location** | `time-attendance-frontend/` | `time-attendance-selfservice-frontend/` |
| **Port** | http://localhost:4200 | http://localhost:4201 |
| **Target Users** | HR, Managers, Administrators | Employees, Managers |
| **Access Level** | Full system access (based on roles) | Limited to personal data and team data (for managers) |
| **Features** | Full CRUD operations, system config | Self-service requests, view-only data |

### Self-Service Portal Features

#### For All Employees
1. **Dashboard** (`employee-dashboard/`)
   - Personal attendance statistics
   - Leave balance summary
   - Recent activity timeline
   - Upcoming vacations
   - Pending requests status

2. **My Attendance** (`my-attendance/`)
   - View personal attendance records
   - Attendance history with filters
   - Monthly attendance calendar
   - Attendance details (check-in/out times, working hours, overtime)

3. **My Profile** (`my-profile/`)
   - View personal information
   - View job details
   - View contact information
   - View department and branch assignment
   - Change password modal

4. **Leave Requests** (`vacation-requests/`)
   - Create new vacation requests
   - View current leave balance
   - View vacation request history
   - Edit pending vacation requests
   - Cancel approved vacation requests (with validation)
   - Track approval status with workflow details
   - View approval history

5. **Excuse Requests** (`excuse-requests/`)
   - Create excuse requests
   - Upload supporting documents
   - View excuse request history
   - Edit pending excuse requests
   - Track approval status
   - View remaining excuse balance

6. **Remote Work Requests** (`remote-work-requests/`)
   - Request remote work days
   - Select work location (Remote, Field Work, Client Site)
   - View remote work request history
   - Edit pending requests
   - Cancel requests
   - Track approval status

7. **Fingerprint Requests** (`fingerprint-requests/`)
   - Request fingerprint enrollment
   - Request fingerprint updates/repairs
   - Track request status
   - Specify preferred date/time
   - View technician notes

#### For Managers (Additional Features)
8. **Manager Dashboard** (`manager-dashboard/`)
   - Team size and statistics
   - Direct reports count
   - Indirect reports count
   - Team members list
   - Pending approvals count

9. **Team Management** (`team-members/`)
   - View team members
   - View team hierarchy
   - View team attendance overview
   - Filter by department, status
   - Search team members

10. **Approvals** (`pending-approvals/`)
    - Approve/reject vacation requests
    - Approve/reject excuse requests
    - Approve/reject remote work requests
    - Add comments to approvals
    - View approval history
    - View pending team requests

### Self-Service Portal Architecture

#### Project Structure
```
time-attendance-selfservice-frontend/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── portal/
│   │   │   │   ├── employee-dashboard/
│   │   │   │   ├── manager-dashboard/
│   │   │   │   ├── my-attendance/
│   │   │   │   ├── my-profile/
│   │   │   │   ├── vacation-requests/
│   │   │   │   ├── excuse-requests/
│   │   │   │   ├── remote-work-requests/
│   │   │   │   ├── fingerprint-requests/
│   │   │   │   ├── team-members/
│   │   │   │   ├── pending-approvals/
│   │   │   │   ├── portal-navigation/
│   │   │   │   ├── services/
│   │   │   │   │   └── portal.service.ts
│   │   │   │   └── models/
│   │   │   │       ├── employee-dashboard.model.ts
│   │   │   │       ├── manager-dashboard.model.ts
│   │   │   │       ├── my-attendance.model.ts
│   │   │   │       ├── my-profile.model.ts
│   │   │   │       └── fingerprint-request.model.ts
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   ├── guards/
│   │   │   └── interceptors/
│   │   └── app.config.ts
│   └── assets/
└── package.json
```

#### Key Components
- **Portal Components**: Located in `src/app/pages/portal/`
- **Portal Service**: `src/app/pages/portal/services/portal.service.ts` - API communication
- **Portal Models**: `src/app/pages/portal/models/` - Type definitions
- **Shared Components**: Reusable UI components
- **Guards**: Route guards for authentication and role-based access
- **Interceptors**: HTTP interceptors for token management

### Development Guidelines for Self-Service Portal

#### Authentication & Authorization
```typescript
// Employee can only access their own data
// Managers can access their team's data
// Use employee-specific guards

// Example: employee-auth.guard.ts
export const employeeAuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isEmployee()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

// Example: manager-auth.guard.ts
export const managerAuthGuard = () => {
  const authService = inject(AuthService);

  return authService.isAuthenticated() && authService.isManager();
};
```

#### Data Access Patterns
```typescript
// Always fetch current employee's data
async loadMyData() {
  this.myAttendance = await this.portalService.getMyAttendance();
  this.myBalance = await this.portalService.getMyLeaveBalance();
}

// For managers: fetch team data
async loadTeamData() {
  if (this.isManager()) {
    this.teamMembers = await this.portalService.getMyTeam();
    this.pendingApprovals = await this.portalService.getPendingApprovals();
  }
}
```

#### Request Validation
```typescript
// Always validate before submitting requests
async submitVacationRequest(request: VacationRequest) {
  // 1. Validate dates
  if (request.startDate > request.endDate) {
    this.notificationService.error('Invalid date range');
    return;
  }

  // 2. Check balance
  const balance = await this.portalService.getLeaveBalance(request.vacationTypeId);
  if (balance < request.totalDays) {
    this.notificationService.error('Insufficient leave balance');
    return;
  }

  // 3. Submit request
  await this.portalService.createVacationRequest(request);
  this.notificationService.success('Request submitted successfully');
}
```

#### Manager Approval Pattern
```typescript
// Manager approval workflow
async approveRequest(requestId: number, requestType: string) {
  const confirmed = await this.confirmationService.confirm({
    title: 'Approve Request',
    message: 'Are you sure you want to approve this request?',
    confirmText: 'Approve',
    cancelText: 'Cancel'
  });

  if (confirmed) {
    await this.portalService.approveRequest(requestId, requestType);
    this.notificationService.success('Request approved');
    this.refreshPendingApprovals();
  }
}
```

### API Endpoints for Tenant & Subscription Management

#### Tenant Management (Base: `/api/v1/tenants`) — Platform Admin only
- `GET /` - List tenants (paginated, search, filter by status/isActive)
- `GET /{id}` - Get tenant by ID with subscription details
- `POST /` - Create tenant (validates email domain uniqueness, auto-provisions dedicated database, seeds SystemAdmin, assigns plan)
- `PUT /{id}` - Update tenant
- `POST /{id}/activate` - Activate tenant
- `POST /{id}/suspend` - Suspend tenant
- `GET /discover` - Tenant discovery for mobile apps (public, no auth)

#### Subscription Plans (Base: `/api/v1/subscription-plans`) — Platform Admin only
- `GET /` - List all subscription plans with module entitlements and limits
- `GET /{id}` - Get plan by ID with full details
- `POST /` - Create a new subscription plan
- `PUT /{id}` - Update an existing subscription plan
- `DELETE /{id}` - Delete a subscription plan

#### Tenant Subscriptions (Base: `/api/v1/tenants/{tenantId}/subscription`) — SystemAdmin only
- `GET /` - Get active subscription for a tenant
- `POST /` - Assign a subscription plan to a tenant
- `PUT /change-plan` - Change tenant's subscription plan
- `POST /cancel` - Cancel tenant's subscription

#### Entitlements (Base: `/api/v1/entitlements`) — Authenticated users
- `GET /` - Get current tenant's full entitlement summary (plan, modules, features, limits)
- `GET /modules` - Get list of enabled module names for current tenant
- `GET /usage` - Get usage vs limits for current tenant

### API Endpoints for Self-Service

The self-service portal communicates with the backend through dedicated endpoints:

#### Portal Endpoints (Base: `/api/v1/portal`)
- `GET /employee-dashboard` - Get employee dashboard data
- `GET /manager-dashboard` - Get manager dashboard data
- `GET /team-members` - Get team members (paginated, with filters)
- `GET /team-members/{employeeId}` - Get specific team member details
- `GET /pending-approvals` - Get pending approvals for manager
- `GET /my-attendance` - Get personal attendance records
- `GET /my-profile` - Get employee profile
- `PUT /my-profile` - Update employee profile
- `GET /my-vacations` - Get employee's vacation requests
- `GET /my-vacations/{id}` - Get vacation request details
- `GET /approval-vacation/{id}` - Get vacation for approval (manager view)

#### Notification Endpoints (Base: `/api/v1/notifications`)
- `GET /` - Get notifications (with unreadOnly and limit params)
- `GET /unread-count` - Get unread notification count
- `POST /{id}/mark-read` - Mark notification as read
- `POST /mark-all-read` - Mark all notifications as read
- `DELETE /{id}` - Delete a notification

#### Request Management Endpoints
- `GET /api/v1/employee-vacations/my-requests` - Get my vacation requests
- `POST /api/v1/employee-vacations` - Create vacation request
- `PUT /api/v1/employee-vacations/{id}` - Update vacation request
- `DELETE /api/v1/employee-vacations/{id}` - Cancel vacation request

- `GET /api/v1/employee-excuses/my-requests` - Get my excuse requests
- `POST /api/v1/employee-excuses` - Create excuse request

- `GET /api/v1/remote-work-requests/my-requests` - Get my remote work requests
- `POST /api/v1/remote-work-requests` - Create remote work request

- `GET /api/v1/fingerprint-requests/my-requests` - Get my fingerprint requests
- `POST /api/v1/fingerprint-requests` - Create fingerprint request

### Running the Self-Service Portal

#### Development
```bash
# Navigate to self-service frontend
cd time-attendance-selfservice-frontend

# Install dependencies
npm install

# Run development server (configure port in angular.json)
npm start

# The app will run on configured port (NOT 4200, which is used by admin portal)
```

#### Production Build
```bash
# Build for production
npm run build

# Output will be in dist/ folder
# Deploy to separate domain/subdomain (e.g., portal.company.com)
```

### Deployment Considerations

#### Separate Deployment
- Deploy on a different domain or subdomain from admin portal
- Example: `admin.company.com` vs `portal.company.com`
- Or: `company.com/admin` vs `company.com/portal`

#### Configuration
- Configure separate environment files
- Set API base URL to point to backend
- Configure authentication settings
- Set up proper CORS on backend for self-service origin

#### Security
- Implement proper authentication guards
- Validate employee access to data
- Restrict manager access to only their team
- Implement request throttling
- Validate all inputs before submission

### Best Practices for Self-Service Development

1. **Always Restrict Data Access**
   - Employees should only see their own data
   - Managers should only see their direct/indirect reports
   - Validate access on both frontend and backend

2. **Provide Clear Feedback**
   - Show balance before allowing requests
   - Display clear validation messages
   - Show request status prominently
   - Provide loading states for all operations

3. **Mobile-Friendly Design**
   - Self-service portal is often accessed from mobile devices
   - Ensure responsive design
   - Test on various screen sizes
   - Consider mobile-specific UX patterns

4. **Real-Time Updates**
   - Refresh dashboard data automatically
   - Show real-time approval status
   - Update balances after requests
   - Notify users of approval/rejection via SignalR

5. **Offline Considerations**
   - Handle network failures gracefully
   - Show appropriate error messages
   - Allow retry for failed operations
   - Cache non-sensitive data when appropriate

---

## Mobile Application (Flutter)

### Overview
The TecAxle HRMS includes a **Flutter mobile application** for employee self-service on iOS and Android devices. This native mobile app provides GPS+NFC verified attendance with biometric authentication.

**Application Location**: `ess_mobile_app/`
**Platforms**: iOS, Android, Windows, Web

### Key Capabilities

| Feature | Description |
|---------|-------------|
| **GPS + NFC Verification** | Dual-verification attendance using geofencing and NFC tags |
| **Biometric Authentication** | Fingerprint/Face ID login via device biometrics |
| **Push Notifications** | Firebase Cloud Messaging for real-time alerts |
| **Multi-Tenant Support** | Organization discovery via subdomain/URL |
| **Offline Support** | Graceful handling of network failures |
| **Bilingual UI** | English and Arabic with RTL support |

### Feature Modules

The app has 11 feature modules located in `lib/features/`:

| Module | Description |
|--------|-------------|
| `auth/` | Login, biometric authentication |
| `tenant_discovery/` | Company URL entry, organization discovery |
| `home/` | Dashboard with quick actions |
| `attendance/` | GPS+NFC check-in/check-out with dual verification |
| `leave/` | Leave request management (list, create, detail) |
| `excuse/` | Excuse request management (list, create, detail) |
| `remote_work/` | Remote work requests (list, create, detail) |
| `notifications/` | Push & in-app notifications |
| `profile/` | User profile management |
| `schedule/` | Work schedule viewing |
| `admin/` | Admin dashboard, NFC tag management, notification broadcasts, branch management |

### Navigation Structure

The app uses a **ShellRoute** with bottom navigation:

| Nav Item | Screen | Description |
|----------|--------|-------------|
| Home | HomeScreen | Dashboard with quick actions |
| Attendance | AttendanceScreen | GPS+NFC check-in/check-out |
| Requests | (Hub) | Consolidates Leave, Excuses, Remote Work requests |
| Notifications | NotificationsScreen | Push & in-app notifications |
| Profile | ProfileScreen | User profile and settings |

**Role-Based Access:**
- **All Employees**: Home, Attendance, Requests (Leave, Excuses, Remote Work), Notifications, Profile, Schedule
- **Managers**: Additional access to Manager Dashboard, Team Members, Pending Approvals
- **Admins**: Additional access to Admin Dashboard, NFC Tag Management, Notification Broadcasts, Branch Management

### Project Structure

```
ess_mobile_app/
├── lib/
│   ├── main.dart                 # App entry point
│   ├── app/
│   │   ├── app.dart              # MaterialApp configuration
│   │   └── router.dart           # GoRouter with ShellRoute navigation
│   ├── core/
│   │   ├── config/               # App configuration constants
│   │   ├── network/              # Dio client, Retrofit API service, auth interceptor
│   │   ├── storage/              # Secure storage service
│   │   ├── theme/                # App theme & colors (app_theme.dart)
│   │   └── l10n/                 # Localization (app_localizations.dart)
│   ├── features/                 # Feature modules (11 total)
│   └── shared/
│       ├── models/               # Shared data models (Freezed + JSON serializable)
│       ├── providers/            # Global Riverpod providers (13 providers)
│       ├── services/             # Push notification service
│       └── widgets/              # Reusable widgets (stats_card, etc.)
├── assets/                       # Images, icons, translations
├── android/                      # Android-specific configuration
├── ios/                          # iOS-specific configuration
└── pubspec.yaml                  # Dependencies
```

### Riverpod Providers

| Provider | Purpose |
|----------|---------|
| `attendance_history_provider` | Attendance record history |
| `schedule_provider` | Work schedule data |
| `excuse_provider` | Excuse request management |
| `leave_provider` | Leave request management |
| `remote_work_provider` | Remote work request management |
| `notification_provider` | In-app notification management |
| `admin_dashboard_provider` | Admin statistics and data |
| `branch_admin_provider` | Branch management for admins |
| `broadcast_provider` | Notification broadcast for admins |
| `nfc_tag_admin_provider` | NFC tag management for admins |

### Architecture

The app follows **Clean Architecture** with **Riverpod** for state management:

- **Presentation Layer**: UI widgets, screens, controllers
- **Domain Layer**: Business logic, use cases
- **Data Layer**: API clients (Retrofit), repositories, data sources

**Key Dependencies**:
- `flutter_riverpod` - State management
- `go_router` - Navigation
- `dio` + `retrofit` - HTTP client
- `flutter_secure_storage` - Secure token storage
- `location` - GPS tracking
- `nfc_manager` - NFC tag reading
- `local_auth` - Biometric authentication
- `firebase_messaging` - Push notifications

### Mobile-Specific API Endpoints

| Feature | Endpoint |
|---------|----------|
| Tenant Discovery | `GET /api/v1/tenants/discover` |
| Login | `POST /api/v1/auth/login` |
| Check-In/Out | `POST /api/v1/mobile/attendance/transaction` |
| Location Check | `POST /api/v1/mobile/attendance/check-location` |
| Push Token | `POST /api/v1/push-tokens/register` |
| Notifications | `GET /api/v1/notifications` |

### Development Commands

```bash
# Navigate to mobile app directory
cd ess_mobile_app

# Install dependencies
flutter pub get

# Generate code (Riverpod, Freezed, Retrofit)
flutter pub run build_runner build --delete-conflicting-outputs

# Run on connected device/emulator
flutter run

# Build debug APK
flutter build apk --debug

# Build release APK
flutter build apk --release

# Build iOS (requires Mac)
flutter build ios
```

### Android Permissions

The AndroidManifest.xml includes comprehensive permissions for:
- **NFC**: `android.permission.NFC` - NFC tag reading for attendance
- **GPS/Location**: `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `ACCESS_BACKGROUND_LOCATION` - Geofence verification
- **Biometric**: `USE_BIOMETRIC`, `USE_FINGERPRINT` - Biometric authentication
- **Camera**: `android.permission.CAMERA` - Document scanning
- **Vibration**: `android.permission.VIBRATE` - Haptic feedback
- **Internet**: `android.permission.INTERNET` - API communication

**App Label**: `TecAxle HRMS` (configured in AndroidManifest.xml)

### Theme Customization

Colors and theme are defined in `lib/core/theme/app_theme.dart`:

```dart
class AppColors {
  static const Color primary = Color(0xFFA8A4CE);      // TecAxle HRMS Lavender Purple
  static const Color secondary = Color(0xFF5C6670);   // TecAxle HRMS Blue-Gray
  static const Color accent = Color(0xFFE5DD7A);      // TecAxle HRMS Soft Gold
  // ... additional colors
}
```

### Firebase Setup

For push notifications, configure Firebase:

1. Add `google-services.json` to `android/app/`
2. Add `GoogleService-Info.plist` to `ios/Runner/`
3. Configure Firebase project with your app's package name

### Best Practices for Mobile Development

1. **Always Test on Real Devices**
   - GPS and NFC require real hardware
   - Test biometric auth on physical devices
   - Verify push notifications work end-to-end

2. **Handle Permissions Gracefully**
   - Request location permission before check-in
   - Handle permission denial with clear messaging
   - Provide settings deep-link for re-enabling

3. **Optimize for Battery**
   - Use location only when needed
   - Batch API requests when possible
   - Avoid background location tracking

4. **Security Considerations**
   - Store tokens in secure storage (not SharedPreferences)
   - Use biometric auth for sensitive operations
   - Clear credentials on logout

---

## Admin Frontend Application

### Overview
The admin frontend (`time-attendance-frontend`) is the full-featured management application for HR administrators, managers, and system administrators.

**Application Location**: `time-attendance-frontend/`
**Port**: http://localhost:4200

### Admin Portal Features

#### Authentication (`pages/auth/`)
- Login page
- Change password

#### Dashboard (`pages/dashboard/`)
- Organization statistics
- HR statistics
- Attendance overview
- Leave statistics
- System health

#### Organization Management

**Branches** (`pages/branches/`)
- Branch list with filters
- Create branch (full page at `/branches/create` with map location picker)
- Edit branch (full page at `/branches/:id/edit` with map location picker)
- View branch details (with readonly map showing geofence)
- Branch table component

**Departments** (`pages/departments/`)
- Department list with hierarchical tree view
- Create/edit department
- View department details
- Department filters
- Department info panel

**Employees** (`pages/employees/`)
- Employee list with filters
- Create/edit employee
- View employee details
- Change employee shift
- Employee table component

#### Time & Attendance (`pages/attendance/`)
- **Daily Attendance**: Daily view of all employees
- **Daily Attendance Detail**: Individual day details
- **Employee Attendance Detail**: Individual employee history
- **Edit Attendance**: Modify attendance records
- **Change Attendance Shift**: Change shift for specific records
- **Monthly Report**: Monthly attendance summary
- **Shared Components**: Charts, summary cards, filter panel

#### Leave Management

**Employee Vacations** (`pages/employee-vacations/`)
- Vacation list with filters
- Create/edit vacation
- View vacation details
- Bulk vacation creation modal
- Vacation table component

**Employee Excuses** (`pages/employee-excuses/`)
- Excuse list with filters
- Create excuse request
- View excuse details

#### Remote Work (`pages/remote-work/`)
- Remote work assignment list
- Assign remote work
- Edit remote work assignment
- View remote work assignment details

#### Approvals (`pages/approvals/`)
- Pending approvals list
- Approval history

#### Shift Management (`pages/shifts/`)
- Shift list with filters
- Create/edit shift
- View shift details
- Assign shifts to employees/departments

#### User Management (`pages/users/`)
- User list with filters
- Create/edit user
- View user details
- Role management
- User form component
- User table component

#### Roles & Permissions (`pages/roles/`)
- Role list with filters
- Create/edit role
- View role details

#### Settings (`pages/settings/`)

**Vacation Types** (`vacation-types/`)
- Vacation type list
- Create/edit/view vacation type

**Excuse Policies** (`excuse-policies/`)
- Excuse policy list
- Create/edit/view excuse policy

**Overtime Configuration** (`overtime/`)
- Overtime configuration list
- Create/edit/view overtime config

**Leave Balances** (`leave-balances/`)
- Leave balance list
- Leave entitlement form

**Remote Work Policies** (`remote-work-policy/`)
- Remote work policy list
- Create/edit/view policy

**Public Holidays** (`public-holidays/`)
- Public holiday list
- Create/edit/view holiday

**Workflows** (`workflows/`)
- Workflow definition list
- Workflow form

#### Reports (`pages/reports/`)
- Audit logs with detail modal
- Sessions (active sessions, login history)

#### Platform Management (`pages/tenants/`, `pages/subscription-plans/`)
- **Tenants List** (`tenants/`) - Paginated table with search, status filter, CRUD actions
- **Create Tenant** (`tenants/create-tenant/`) - Modern form with Basic Info (including logo upload) + Company Info + Plan Selection + Default Settings. On submit, validates email domain uniqueness, auto-provisions dedicated DB, seeds SystemAdmin (`tecaxleadmin@{company_email_domain}`, password: `TecAxle@Sys2026!`), and assigns selected plan. Plan assignment is non-fatal — if it fails, tenant is still created Active and plan can be assigned later from the view page.
- **Edit Tenant** (`tenants/edit-tenant/`) - Pre-populated form (subdomain read-only)
- **View Tenant** (`tenants/view-tenant/`) - Overview tab (DefinitionList) + Subscription tab (plan details, enabled modules, limits, assign/change/cancel actions)
- **Subscription Plans** (`subscription-plans/`) - Full plan management UI with CRUD (create, edit, delete) + card-based pricing page showing plans with modules and limits

#### Entitlement Infrastructure (`core/services/`, `core/auth/guards/`)
- **EntitlementService** (`core/services/entitlement.service.ts`) - Signal-based service that loads tenant entitlements on login, provides `isModuleEnabled()`, `isFeatureEnabled()`, `getLimit()`, `getCurrentUsage()`
- **Module Guard** (`core/auth/guards/module.guard.ts`) - `CanMatchFn` that blocks routes for disabled modules
- **Module-Aware Grouped Navigation** - Menu items organized into `MenuGroup` sections tagged with `module` property, sidenav filters groups and items by entitlement

#### Error Pages
- Not Found (404)
- Unauthorized (403)

### Admin Frontend Architecture

#### Project Structure
```
time-attendance-frontend/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── approvals/
│   │   │   ├── attendance/
│   │   │   ├── auth/
│   │   │   ├── branches/
│   │   │   ├── dashboard/
│   │   │   ├── departments/
│   │   │   ├── employee-excuses/
│   │   │   ├── employee-vacations/
│   │   │   ├── employees/
│   │   │   ├── not-found/
│   │   │   ├── remote-work/
│   │   │   ├── reports/
│   │   │   ├── roles/
│   │   │   ├── settings/
│   │   │   ├── shifts/
│   │   │   ├── unauthorized/
│   │   │   ├── users/
│   │   │   └── vacation-types/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── core/
│   │   │   ├── auth/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   └── services/
│   │   └── app.config.ts
│   └── assets/
└── package.json
```

---

## Backend API Architecture

### Controllers (130+ total)

#### Core Management
- **AuthController** - Authentication (login, logout, 2FA, password management)
- **UsersController** - User CRUD operations
- **RolesController** - Role management
- **PermissionsController** - Permission management
- **EmployeesController** - Employee CRUD operations
- **BranchesController** - Branch management
- **DepartmentsController** - Department management

#### Multi-Tenant & Subscription Management
- **TenantsController** - Tenant CRUD (list, create, edit, activate, suspend) + mobile tenant discovery
- **SubscriptionPlansController** - List and view subscription plans with module entitlements and limits
- **TenantSubscriptionsController** - Manage tenant subscriptions (assign plan, change plan, cancel)
- **EntitlementsController** - Get current tenant's entitlements (modules, features, limits, usage)
- **TenantConfigurationController** - Tenant settings CRUD, resolved settings with inheritance, branch overrides, setup status
- **PolicyTemplatesController** - Policy template CRUD (list with region/industry filters, get by ID, create, update, delete) and apply to tenant/branch

#### Time & Attendance
- **AttendanceController** - Attendance records management
- **AttendanceCorrectionRequestsController** - Attendance correction requests
- **ShiftsController** - Shift configuration
- **ShiftAssignmentsController** - Shift assignments

#### Leave & Absence
- **EmployeeVacationsController** - Vacation request management
- **VacationTypesController** - Vacation type configuration
- **LeaveBalancesController** - Leave balance management
- **EmployeeExcusesController** - Excuse management
- **ExcusePoliciesController** - Excuse policy configuration

#### Remote Work
- **RemoteWorkRequestsController** - Remote work requests
- **RemoteWorkPoliciesController** - Remote work policy configuration

#### Self-Service Portal
- **PortalController** - Employee self-service dashboard and features (largest controller, 2300+ lines)
- **NotificationsController** - In-app notification management
- **NotificationBroadcastsController** - Admin broadcast notifications

#### Mobile
- **MobileAttendanceController** - GPS+NFC mobile check-in/check-out
- **MobileScheduleController** - Mobile schedule viewing
- **PushTokensController** - Firebase push notification token management
- **NfcTagsController** - NFC tag management for attendance verification

#### Workflows & Approvals
- **ApprovalsController** - Approval actions
- **WorkflowsController** - Workflow definition and instance management

#### System Administration
- **OvertimeConfigurationController** - Overtime rules
- **PublicHolidaysController** - Public holiday management
- **SessionsController** - Session management
- **SeedController** - Database seeding
- **FingerprintRequestsController** - Fingerprint request management

#### Reporting & Analytics
- **DashboardController** - Dashboard data
- **ReportsController** - Report generation
- **AuditLogsController** - Audit trail

#### Recruitment & Hiring (Phase 2)
- **JobRequisitionsController** - Job requisition CRUD and status management
- **JobPostingsController** - Job posting management and publishing
- **CandidatesController** - Candidate profile management
- **ApplicationsController** - Application pipeline and status advancement
- **InterviewsController** - Interview scheduling and feedback
- **OffersController** - Offer letter generation and lifecycle

#### Onboarding (Phase 2)
- **OnboardingTemplatesController** - Onboarding template CRUD
- **OnboardingProcessesController** - Process management and task tracking
- **OnboardingDashboardController** - Onboarding analytics

#### Performance Management (Phase 2)
- **ReviewCyclesController** - Review cycle management
- **PerformanceReviewsController** - Performance review CRUD
- **GoalsController** - Goal setting and tracking
- **CompetenciesController** - Competency framework management
- **PIPsController** - Performance improvement plans
- **FeedbackController** - 360-degree feedback collection

#### Employee Lifecycle (Phase 2)
- **EmployeeContractsController** - Contract lifecycle management
- **EmployeeSalariesController** - Salary and compensation management
- **SalaryAdjustmentsController** - Salary adjustment requests and approvals
- **EmployeePromotionsController** - Promotion tracking
- **EmployeeTransfersController** - Transfer management
- **JobGradesController** - Job grade structure
- **EmployeeDetailsController** - Extended employee sub-entities (addresses, bank details, dependents, education, etc.)

#### Payroll & Compensation (Phase 2)
- **SalaryStructuresController** - Salary structure and components
- **PayrollPeriodsController** - Payroll period processing. Endpoints:
  - `GET /api/v1/payroll-periods` — list (paginated, filterable by branch/status)
  - `GET /api/v1/payroll-periods/{id}` — get one (returns `LockedAtUtc`, `LockedByUserId`)
  - `POST /api/v1/payroll-periods` — create in Draft
  - `POST /api/v1/payroll-periods/{id}/process` — Draft → Processed, rejected if locked or already Processed
  - `POST /api/v1/payroll-periods/{id}/recalculate` — explicit recalc of Draft/Processed periods (NEW — replaces implicit reprocess via second `/process` call)
  - `POST /api/v1/payroll-periods/{id}/approve` — Processed → Approved
  - `POST /api/v1/payroll-periods/{id}/mark-paid` — Approved → Paid + sets lock fields on period and records + writes Finalization audit row
  - `POST /api/v1/payroll-periods/{id}/admin-unlock` — **SystemAdmin-only**. Body: `{ reason: string }`. Reverts Paid period to Processed + clears all lock fields + records → Calculated. Writes `PayrollRunAudit` with `RunType=Adjustment`. Does NOT auto-recalc.
  - `POST /api/v1/payroll-periods/{id}/cancel` — any non-Paid → Cancelled
  - `GET /api/v1/payroll-periods/{id}/records` — records list (includes `LockedAtUtc`, `CalculationVersion`)
  - `GET /api/v1/payroll-periods/records/{recordId}` — single record with detail line-items
  - `GET /api/v1/payroll-periods/{id}/run-audit` — chronological run history for the period
- **PayrollSettingsController** - Payroll configuration. Tabbed UI backs four entity types:
  - **Tax**: `GET/POST/PUT/DELETE /api/v1/payroll-settings/tax-configs[/{id}]` — configuration + brackets.
  - **Social Insurance**: `GET/POST/PUT/DELETE /api/v1/payroll-settings/social-insurance[/{id}]` — now persists the optional `appliesToNationalityCode` (normalized to uppercase ISO code; null = applies to all nationalities).
  - **Insurance Providers**: `GET/POST/PUT/DELETE /api/v1/payroll-settings/insurance-providers[/{id}]`.
  - **Calendar Policy**: `GET/POST/PUT/DELETE /api/v1/payroll-settings/calendar-policies[/{id}]` — validates `BasisType` ∈ {1,2,3}, requires `FixedBasisDays > 0` when `BasisType = FixedBasis`, requires `StandardHoursPerDay > 0`.
- **AllowanceTypesController** - Allowance type management
- **AllowancePoliciesController** - Allowance policy rules
- **AllowanceAssignmentsController** - Allowance assignment management
- **AllowanceRequestsController** - Allowance request workflow
- **EndOfServiceController** - EOS benefit calculation

#### Offboarding (Phase 2)
- **ResignationRequestsController** - Resignation management
- **TerminationsController** - Termination records
- **ExitInterviewsController** - Exit interview tracking
- **ClearanceController** - Clearance checklist management
- **FinalSettlementsController** - Final settlement calculation

#### File Management (Phase 2)
- **FilesController** - File upload and download

### SignalR Hub
- **NotificationHub** (`/hubs/notifications`) - Real-time notification delivery
  - User connection management
  - Group-based notification targeting
  - WebSocket connection handling

### Domain Entities

#### Multi-Tenant & Subscription (Master DB)
- Tenant (with `EncryptedConnectionString`, `DatabaseName`, `DatabaseCreatedAt`, `DatabaseMigrationVersion`), TenantStatus (enum)
- PlatformUser (`src/Domain/.../Platform/`), PlatformRole (enum: TecAxleAdmin, TecAxleSupport)
- TenantUserEmail (`src/Domain/.../Tenants/`) — maps user emails to tenant IDs for login resolution
- SubscriptionPlan, PlanTier (enum), PlanModuleEntitlement, PlanFeatureFlag, PlanLimit, LimitType (enum)
- TenantSubscription, SubscriptionStatus (enum), BillingCycle (enum), TenantModuleAddOn, TenantFeatureOverride
- EntitlementChangeLog, EntitlementChangeType (enum - 9 types: PlanAssigned, PlanChanged, SubscriptionCancelled, etc.)
- SystemModule (enum - 26 modules), ModuleMetadata (includes WorkflowEntityType→SystemModule mapping), ModuleDependencyRules

#### Tenant Configuration
- TenantSettings (one per tenant, 7 setting categories)
- BranchSettingsOverride (nullable overrides, one per branch)
- DepartmentSettingsOverride (shift + approval overrides, one per department)
- PolicyTemplate (Code, Region, Industry, IsSystemTemplate, TenantId), PolicyTemplateItem (PolicyType, ConfigurationJson, SortOrder)
- SetupStep (per-tenant onboarding tracking)

#### Organization (Tenant DB)
- Branch, Department, Employee, EmployeeUserLink

#### Authentication & Security
- User, Role, Permission, RolePermission, UserRole
- UserBranchScope, UserSession, BlacklistedToken, RefreshToken
- PasswordHistory, LoginAttempt, TwoFactorBackupCode

#### Time & Attendance
- AttendanceRecord, AttendanceTransaction, WorkingDay, AttendanceVerificationLog

#### Leave Management
- VacationType, EmployeeVacation, LeaveBalance
- LeaveTransaction, LeaveEntitlement, LeaveAccrualPolicy

#### Shift Management
- Shift, ShiftPeriod, ShiftAssignment, OffDay

#### Excuse Management
- EmployeeExcuse, ExcusePolicy

#### Remote Work
- RemoteWorkPolicy, RemoteWorkRequest

#### Biometric & NFC
- FingerprintRequest, NfcTag (with EncryptedPayload, VerificationHash, Status, ScanCount)

#### Configuration
- PublicHoliday, OvertimeConfiguration

#### Workflows
- WorkflowDefinition, WorkflowInstance (WorkflowStatus: Pending, InProgress, Approved, Rejected, Cancelled, Expired, **Frozen**), WorkflowStep
- WorkflowStepExecution, ApprovalDelegation

#### Notifications
- Notification

#### Audit
- AuditLog, AuditChange

#### Employee Lifecycle (Phase 2)
- EmployeeContract, EmployeePromotion, EmployeeTransfer, SalaryAdjustment
- EmployeeAddress, EmployeeBankDetail, EmployeeDependent, EmployeeEducation
- EmployeeWorkExperience, EmployeeVisa, EmergencyContact, EmployeeProfileChange
- JobGrade

#### Payroll & Compensation (Phase 2)
- SalaryStructure, SalaryComponent, EmployeeSalary (effective-dated via `EffectiveDate`/`EndDate`), EmployeeSalaryComponent
- PayrollPeriod (now with `LockedAtUtc`, `LockedByUserId`, computed `IsLocked`), PayrollRecord (now with `LockedAtUtc`, `LockedByUserId`, `CalculationVersion`, `LastRunId`, `CalculationBreakdownJson`, computed `IsLocked`), PayrollRecordDetail, PayrollAdjustment
- AllowanceType, AllowancePolicy, AllowanceAssignment (effective-dated via `EffectiveFromDate`/`EffectiveToDate`), AllowanceRequest, AllowanceChangeLog
- TaxConfiguration (effective-dated via `EffectiveDate`), TaxBracket (progressive: `MinAmount`, `MaxAmount`, `Rate`, `FixedAmount`), SocialInsuranceConfig (effective-dated, with optional `AppliesToNationalityCode` for GOSI-style nationality segregation)
- InsuranceProvider, EmployeeInsurance (effective-dated via `StartDate`/`EndDate`), BankTransferFile
- **PayrollCalendarPolicy** (NEW): tenant/branch daily-rate basis policy — `BasisType` (`CalendarDays` / `WorkingDays` / `FixedBasis`), `FixedBasisDays`, `StandardHoursPerDay`, `TreatPublicHolidaysAsPaid`, effective-dated. Eliminates hardcoded 30-day assumption.
- **PayrollRunAudit** + **PayrollRunAuditItem** (NEW): append-only audit of every payroll run — run type (`InitialProcess` / `Recalculation` / `Adjustment` / `Finalization` / `Cancellation`), status, triggering user, employees processed/failed/skipped, `ConfigSnapshotJson`, `WarningsJson`, `ErrorsJson`; per-employee items with calculated totals and status (`Succeeded` / `SkippedNoSalary` / `SkippedInactive` / `FailedWithError` / `CompletedWithWarnings`).
- **New enums** (in `Common/Enums.cs`): `PayrollDailyBasisType`, `PayrollRunType`, `PayrollRunStatus`, `PayrollRunItemStatus`.

#### Offboarding (Phase 2)
- ResignationRequest, TerminationRecord, ExitInterview
- ClearanceChecklist, ClearanceItem
- EndOfServiceBenefit, FinalSettlement

#### File Management (Phase 2)
- FileAttachment

### Application Services

#### Core Services
- AttendanceCalculationService
- DailyAttendanceGeneratorService
- OvertimeConfigurationService (read-path service for `OvertimeConfiguration` — reused by `IOvertimePayCalculator`; the payroll calculator never duplicates OT logic)
- LeaveAccrualService
- InAppNotificationService
- ChangeTrackingService
- NfcTagEncryptionService (HMAC-SHA256 payload signing/verification)

#### Payroll Calculation Services (production-safe pipeline)
All scoped, registered in [DependencyInjection.cs](src/Application/TimeAttendanceSystem.Application/DependencyInjection.cs), injected into `ProcessPayrollPeriodCommandHandler`:
- **`IPayrollCalculationService`** (`PayrollCalculationService`) — per-employee orchestrator: resolver → calculators → `PayrollCalculationResult`.
- **`IPayrollInputResolver`** (`PayrollInputResolver`) — effective-date resolution for salary, allowances, tax config, SI config, employee insurance, OT config (per-date), calendar policy, public holidays. Detects overlap anomalies.
- **`ITaxCalculator`** (`TaxCalculator`) — progressive bracket application using effective `TaxConfiguration`.
- **`ISocialInsuranceCalculator`** (`SocialInsuranceCalculator`) — nationality-aware; caps insurable base at `MaxInsurableSalary`; respects `IsSocialInsurable` flag.
- **`IOvertimePayCalculator`** (`OvertimePayCalculator`) — delegates to `OvertimeConfiguration.GetOvertimeRate` / `RoundOvertimeHours` / `MeetsMinimumThreshold`; day-type classification via `PublicHolidayDates` + `WeekendAsOffDay` flag.
- **`IAbsenceDeductionCalculator`** (`AbsenceDeductionCalculator`) — policy-driven daily rate; no hardcoded 30.
- **`IProrationCalculator`** (`ProrationCalculator`) — overlap-fraction math for any effective-dated input.
- **`IPayrollCalendarResolver`** (`PayrollCalendarResolver`) — resolves `dailyBasisDays` and `StandardHoursPerDay` from `PayrollCalendarPolicy`.

#### Multi-Tenant & Entitlement Services
- **EntitlementService** (`IEntitlementService`) - Cached per-tenant entitlement checking (modules, features, limits). 5-minute TTL. Call `InvalidateCache(tenantId)` after subscription changes.
- **TenantContext** (`ITenantContext`) - Scoped service holding resolved tenant ID. Populated by `TenantResolutionMiddleware`.
- **TenantConnectionResolver** (`ITenantConnectionResolver`) - Resolves and decrypts tenant DB connection strings from master DB. Used by middleware and background jobs.
- **TenantProvisioningService** - Creates tenant database named by company domain (`ta_{domain}`), applies migrations, seeds business data, creates two system admin users (`tecaxleadmin` + `systemadmin`), maps both in master TenantUserEmails. Handles DB name collisions with orphaned databases via numeric suffix. Uses `IMasterDbContext` for all master DB operations.
- **ConnectionStringEncryption** - AES-256 encryption/decryption for tenant connection strings.
- **MasterDbContext** - EF Core DbContext for the master database (`tecaxle_master`). Contains ONLY platform entities: Tenants, PlatformUsers, TenantUserEmails, SubscriptionPlans, PlanModuleEntitlements, PlanFeatureFlags, PlanLimits, TenantSubscriptions, TenantModuleAddOns, TenantFeatureOverrides, EntitlementChangeLogs, PolicyTemplates, PolicyTemplateItems. Has its own migrations in `Persistence/Master/Migrations/`.
- **MasterSeedData** (`Persistence/Master/MasterSeedData.cs`) - Seeds platform admin user and subscription plans into master DB at startup.
- **TecAxleDbContext** - EF Core DbContext for tenant databases. Contains ONLY business entities (no platform entities). Platform entity configurations are excluded via filter in `OnModelCreating`. Has its own migrations in `Persistence/PostgreSql/Migrations/`.
- **ModuleEntitlementBehavior** - MediatR `IPipelineBehavior` that checks `[RequiresModule]` attribute on requests. Supports `AllowReadWhenDisabled` for read-only historical access. 173 commands/queries decorated.
- **UsageLimitBehavior** - MediatR `IPipelineBehavior` that checks `[RequiresLimit]` attribute on creation commands
- **TenantIteratingJob** - Abstract base class for background jobs that iterate all tenants from master DB, connect to each tenant's database, and execute. Replaces the old `ModuleAwareJob`.
- **ModuleDeactivationService** (`IModuleDeactivationService`) - Orchestrates safe module deactivation/reactivation: freezes/unfreezes in-flight workflows, logs entitlement changes, invalidates caches

### Background Jobs (Coravel)
- `DailyAttendanceGenerationJob` - Daily at 2:00 AM
- `EndOfDayAttendanceFinalizationJob` - Daily at 11:59 PM
- `MonthlyLeaveAccrualJob` - Monthly on 1st at 1:00 AM UTC
- `WorkflowTimeoutProcessingJob` - Hourly
- `ContractExpiryAlertJob` - Daily, alerts for expiring employee contracts
- `VisaExpiryAlertJob` - Daily, alerts for expiring employee visas
- `ApplyScheduledProfileChangesJob` - Daily, applies scheduled employee profile changes
- `ExpireTemporaryAllowancesJob` - Daily, expires temporary allowance assignments
- `OnboardingTaskOverdueJob` - Daily at 5:00 AM, marks overdue onboarding tasks
- `ReviewCycleReminderJob` - Daily at 7:00 AM, sends reminders for pending reviews
- `PIPExpiryCheckJob` - Daily at 6:00 AM, checks for expired performance improvement plans
- `FrozenWorkflowCleanupJob` - Daily at 3:00 AM, auto-cancels workflows frozen > 90 days due to module deactivation

### Middleware Pipeline
- CORS → Global Exception Handler → Rate Limiting → Localization → Authentication → **Tenant Resolution** → Authorization → Routing → SignalR Hub
- **Tenant Resolution Middleware**: `src/Api/TecAxle.Hrms.Api/Middleware/TenantResolutionMiddleware.cs`
  - Resolves tenant from JWT `tenant_id` claim (authenticated) or `X-Tenant-Id` header (pre-auth)
  - Uses `ITenantConnectionResolver` to look up and decrypt the tenant's connection string from master DB
  - Sets `ITenantContext.TenantId` and configures `TecAxleDbContext` to connect to the correct tenant database for the request scope
  - Platform admin requests (with `is_platform_user` claim) can operate cross-tenant
  - Unauthenticated endpoints (login, discovery) proceed without tenant context
- **Global Exception Handler**: `src/Api/TecAxle.Hrms.Api/Middleware/GlobalExceptionHandlerMiddleware.cs`
  - Maps `ValidationException` → 400, `UnauthorizedAccessException` → 401, `NotFoundException` → 404, others → 500
  - Returns JSON: `{ statusCode, message, traceId, detail?, stackTrace? }` (detail/stackTrace only in Development)

---

## Feature-Specific Development Guidelines

### Attendance Features
When working with attendance:
- Always recalculate working hours after any modification
- Consider shift periods and break times in calculations
- Validate against core hours compliance
- Check for overlapping transactions
- Ensure proper status updates (Present, Absent, Late, etc.)
- Apply grace periods before marking as late
- Calculate both regular and premium overtime
- Track manual overrides separately from automated calculations

### Mobile Attendance Verification Features
When working with mobile GPS+NFC attendance:
- **Dual Verification**: GPS geofence check AND NFC tag validation required
- **Geofence Calculation**: Uses Haversine formula to calculate distance from branch coordinates (branch GPS coordinates are configured via the interactive map picker in Branch create/edit pages)
- **NFC Tag Validation**: Verify tag UID is registered and active for the branch
- **HMAC Payload Verification**: Validate HMAC-SHA256 signed payload if `RequirePayload` is enabled
- **Audit Every Attempt**: Log all verification attempts (success and failure) to `AttendanceVerificationLogs`
- **Failure Reason Classification**: Use specific enum values:
  - `GpsOutsideGeofence` - Employee too far from branch
  - `NfcTagMismatch` - Scanned tag not registered to branch
  - `NfcTagNotRegistered` - Tag UID not in system
  - `NfcTagInactive` - Tag exists but deactivated
  - `BranchNotConfigured` - GPS/NFC not configured for branch
  - `GpsUnavailable` - Device location unavailable
  - `NfcPayloadInvalid` - Missing/malformed NFC payload
  - `NfcPayloadTampering` - HMAC signature verification failed
- **Device Tracking**: Capture device ID, model, platform, and app version
- **Timezone Awareness**: Convert UTC to branch local time for transaction timestamps
- **Configuration**: NFC encryption settings in `appsettings.json` under `NfcEncryption` section

### Payroll Features
When working with payroll calculation, period lifecycle, or any payroll-adjacent concern:
- **Never hardcode** multipliers, day-counts, rates, or thresholds. All values come from configuration entities (`OvertimeConfiguration`, `TaxConfiguration`/`TaxBracket`, `SocialInsuranceConfig`, `PayrollCalendarPolicy`) resolved by effective date.
- **Reuse `OvertimeConfiguration` entity methods** — `GetOvertimeRate(DayType)`, `RoundOvertimeHours(hours)`, `MeetsMinimumThreshold(minutes)`. Do not reimplement overtime math anywhere else.
- **All new payroll inputs must be effective-dated** (`EffectiveFrom`/`EffectiveTo` or equivalent) and resolved through `IPayrollInputResolver`. Do not add period-window filtering inline in handlers.
- **Add new calculations as calculator services**, not as `if` blocks in the handler. Keep each calculator stateless and context-consuming.
- **Respect the lifecycle lock**: any mutation touching `PayrollRecord` or `PayrollPeriod` must first check `LockedAtUtc.HasValue` and reject when set. Never overwrite a finalized record.
- **Write a `PayrollRunAudit` row** for any new operation that changes payroll records (new run types can be added to `PayrollRunType` enum — currently `InitialProcess`, `Recalculation`, `Adjustment`, `Finalization`, `Cancellation`).
- **Surface warnings, don't fail silently**: missing tax/SI/OT config should produce a `PayrollRunAuditItem` warning, not a zero-valued record with no explanation.
- **Normalize date-keyed lookups** to `DateTime.SpecifyKind(d.Date, DateTimeKind.Unspecified)` at both construction and lookup — `HashSet<DateTime>`/`Dictionary<DateTime,T>` hash the `Kind`, and Postgres `timestamptz` vs `date` columns produce different Kinds for the same day.
- **Proration**: when an input starts or ends mid-period, use `IProrationCalculator.GetFraction` — never DIY ratios.
- **Recalculation is explicit**: trigger via `POST /{id}/recalculate`, never by calling `/process` twice. Recalc soft-deletes previous non-locked records and bumps `CalculationVersion`.
- **Line-itemize every contribution** in `PayrollRecordDetail` with a descriptive `Notes` column — payroll must be explainable line-by-line (Tax, SI Employee, SI Employer informational, OT per day-type bucket, Absence Deduction, Housing Allowance, etc.).
- **Integration side-effects** (loans, advances, expense reimbursements) run in the handler AFTER calculation; they add their own detail lines and adjust totals via `RecomputeTotalsFromDetails`. Never bake these into a calculator.

### Leave Management Features
When working with leave/vacation features:
- Always validate leave balance before approval
- Update leave transactions for all balance changes
- Handle leave accruals based on accrual policies
- Consider carryover rules and expiry dates
- Support both paid and unpaid leave types
- Integrate with approval workflows
- Update attendance records when leave is approved
- Calculate business days vs. calendar days correctly

### Shift Assignment Features
When working with shift assignments:
- Respect assignment priority for overlapping assignments
- Support effective date ranges (from/to dates)
- Handle shift changes with proper history tracking
- Validate shift periods don't overlap
- Apply correct shift based on priority and date
- Support temporary vs. permanent assignments
- Allow assignments at employee, department, or branch level

### Approval Workflow Features
When implementing approval workflows:
- Support multiple approval steps
- Handle different approver types (Role, User, Manager, etc.)
- Implement timeout and escalation logic
- Support approval delegation
- Track approval history and comments
- Send notifications at each step
- Handle workflow cancellation
- Support both parallel and sequential approvals

### Self-Service Portal Features
When adding self-service features:
- Ensure proper authentication and authorization
- Restrict data to current employee only
- Support manager access to team data
- Implement proper request validation
- Integrate with approval workflows
- Provide real-time status updates
- Show balance information before requests
- Allow request cancellation with proper validation

### Notification Features
When implementing notifications:
- Use SignalR for real-time delivery
- Support bilingual content (English/Arabic)
- Include action URLs for navigation
- Track read/unread status
- Send notifications for all workflow events
- Target specific users or user groups

### Reporting Features
When creating reports:
- Support flexible date range filtering
- Allow filtering by branch, department, employee
- Implement pagination for large datasets
- Provide CSV export functionality
- Calculate statistics and summaries
- Consider performance for large data sets
- Cache report results when appropriate
- Show loading states during generation

---

## Backend Architecture Guidelines

### Clean Architecture Layers

1. **Domain Layer** (`TecAxle.Hrms.Domain`)
   - Entities with business logic
   - Enums for constants
   - Domain events (if applicable)
   - No dependencies on other layers
   - Contains: Employee, Attendance, Shift, Vacation, etc.

2. **Application Layer** (`TecAxle.Hrms.Application`)
   - DTOs (Request/Response models)
   - Service interfaces and implementations
   - Business logic and validations
   - Mapping configurations (AutoMapper profiles)
   - CQRS commands and queries (MediatR)
   - Depends only on Domain layer

3. **Infrastructure Layer** (`TecAxle.Hrms.Infrastructure`)
   - Database context (EF Core)
   - Repository implementations
   - External service integrations
   - Background job implementations (Coravel)
   - Depends on Domain and Application layers

4. **API Layer** (`TecAxle.Hrms.Api`)
   - Controllers for HTTP endpoints
   - SignalR hubs for real-time communication
   - Authentication/authorization middleware
   - Swagger/API documentation
   - Depends on all other layers

### Common Backend Patterns

#### Repository Pattern
```csharp
// Use the generic repository for basic operations
var employee = await _employeeRepository.GetByIdAsync(id);
await _employeeRepository.AddAsync(newEmployee);
await _employeeRepository.UpdateAsync(employee);
await _employeeRepository.DeleteAsync(employee);

// Use specific repository methods for complex queries
var activeEmployees = await _employeeRepository.GetActiveEmployeesByBranchAsync(branchId);
```

#### Service Pattern
```csharp
// Services handle business logic
public class AttendanceService
{
    public async Task<AttendanceDto> CalculateAttendanceAsync(int employeeId, DateTime date)
    {
        // 1. Get shift assignment
        // 2. Get transactions for the day
        // 3. Calculate working hours
        // 4. Calculate overtime
        // 5. Determine attendance status
        // 6. Return DTO
    }
}
```

#### DTO Pattern
```csharp
// Request DTOs for incoming data
public class CreateEmployeeRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    // ... validation attributes
}

// Response DTOs for outgoing data
public class EmployeeDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string DepartmentName { get; set; }
    // ... mapped from entity
}
```

---

## Security Guidelines

### Authentication & Authorization
- Always use JWT tokens for API authentication
- **Email-based login** resolves tenant from master DB `TenantUserEmails` table, then authenticates against tenant DB
- **Platform admin fallback**: If email not found in tenants, check `PlatformUsers` in master DB
- Implement token refresh mechanism
- Support 2FA for sensitive accounts
- Track login attempts and implement lockout
- Use role-based and permission-based authorization
- Implement branch-scoped data access
- **Tenant connection strings** are AES-256 encrypted in master DB via `ConnectionStringEncryption`

### NFC Tag Security
- HMAC-SHA256 signed payloads for tamper detection on NFC tags
- Configuration in `appsettings.json`:
  ```json
  "NfcEncryption": {
    "SecretKey": "your-hmac-secret-key",
    "RequirePayload": false
  }
  ```
- `RequirePayload: false` allows graceful degradation (NFC UID-only verification)
- `RequirePayload: true` enforces full payload signature verification
- Payload verification service registered in DI via `DependencyInjection.cs`

### Data Security
- Hash passwords using strong algorithms
- Store password history to prevent reuse
- Blacklist revoked tokens
- Audit all data modifications
- Implement proper data validation
- Sanitize user inputs
- Use parameterized queries (EF Core does this)

### API Security
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production
- Set proper CORS policies (configured for localhost:4200, 4201, 4202)
- Implement request/response logging
- **Global Exception Handler**: `GlobalExceptionHandlerMiddleware` catches all unhandled exceptions and returns standardized JSON responses with `statusCode`, `message`, and `traceId`. In Development mode, includes `detail` and `stackTrace`. Registered in `Program.cs` before `UseRouting`.
- Handle errors without exposing sensitive info (no stack traces in production)

---

## Performance Guidelines

### Backend Performance
- Use async/await for all I/O operations
- Implement pagination for list endpoints
- Use eager loading for related entities when needed
- Avoid N+1 query problems
- Cache frequently accessed data
- Use background jobs for long-running tasks
- Optimize database indexes

### Frontend Performance
- Use lazy loading for routes (all routes use lazy loading)
- Implement virtual scrolling for long lists
- Use OnPush change detection strategy
- Unsubscribe from observables
- Use `track` expression in `@for` loops (e.g., `@for (item of items; track item.id)`)
- Optimize bundle size
- Use Angular signals for reactive state

### Database Performance
- Create appropriate indexes
- Avoid loading unnecessary columns
- Use projection (Select) when possible
- Batch operations when appropriate
- Monitor query performance
- Use connection pooling
- **Per-tenant DB**: Each tenant has its own database — no need for TenantId filtering in queries. Background jobs iterate tenants via `TenantIteratingJob` and connect to each DB sequentially.

---

## Testing Guidelines

### Backend Testing
- Write unit tests for business logic
- Test validation logic thoroughly
- Test authorization rules
- Test error handling
- Mock external dependencies
- Test background jobs
- Use in-memory database for integration tests

### Frontend Testing
- Test component initialization
- Test user interactions
- Test form validations
- Test service calls
- Test error handling
- Test routing and navigation
- Use TestBed for Angular tests

### Manual Testing Checklist
- [ ] Test on different browsers
- [ ] Test on different screen sizes
- [ ] Test with different user roles
- [ ] Test with different branches
- [ ] Test Arabic RTL layout
- [ ] Test form validations
- [ ] Test error scenarios
- [ ] Test loading states
- [ ] Test permission restrictions
- [ ] Test data filtering and pagination
- [ ] Test real-time notifications
- [ ] Test mobile GPS+NFC attendance on real device
- [ ] Test NFC tag scanning and HMAC verification
- [ ] Test geofence boundary (inside and outside radius)

---

## Deployment Guidelines

### Development Environment
- Backend: http://localhost:5099
- Admin Frontend: http://localhost:4200
- Self-Service Frontend: http://localhost:4201
- **Master Database**: PostgreSQL — `tecaxle_master` (local or container)
- **Tenant Databases**: PostgreSQL — `ta_tenant_{id}` (one per tenant, auto-provisioned)
- Use Coravel for background jobs
- **See "Running the Complete System" section for detailed startup instructions**

### Production Environment
- **Backend API + DB**: Ubuntu 24.04 LTS at `https://api.clockn.net`
- **Admin Frontend**: Cloudflare Pages at `https://www.clockn.net`
- **Self-Service Portal**: Cloudflare Pages at `https://portal.clockn.net`
- **Mobile App**: Flutter (iOS/Android) connecting to `https://api.clockn.net`

### Production Considerations
- Use environment-specific configurations
- Configure HTTPS and SSL certificates
- Set up proper database backups
- Configure logging and monitoring
- Set up error tracking
- Use production-optimized builds
- Configure CDN for static assets (Cloudflare Pages for frontends)
- Set up database migrations pipeline
- Configure branch-specific settings
- Review and set CORS policies
- Configure SignalR for load-balanced environments

---

## Documentation Standards

### Code Documentation
- Document complex business logic
- Add XML comments for public APIs
- Document configuration options
- Document background jobs
- Keep README files updated
- Document API endpoints (Swagger)

### Feature Documentation
When adding a new feature:
1. Update this CLAUDE.md if it's a new module
2. Document API endpoints in backend docs
3. Document components in frontend docs
4. Add examples to shared component docs
5. Update test documentation
6. Document any new configuration options

---

## Troubleshooting Guide

### Common Issues

#### Backend Issues
- **Database connection errors**: Check connection string, ensure PostgreSQL is running
- **Migration errors**: Drop database and recreate (dev only), or fix migration conflicts
- **Authentication errors**: Check JWT secret, token expiration, user permissions
- **Background job failures**: Check Coravel configuration, review job logs
- **SignalR connection issues**: Check CORS, verify hub route, check authentication

#### Frontend Issues
- **Compilation errors**: Clear node_modules and reinstall, check TypeScript version
- **API call failures**: Check backend is running, verify CORS settings, check network tab
- **Routing issues**: Verify route configuration, check authentication guards
- **Translation errors**: Ensure translation keys exist in both languages
- **SignalR not connecting**: Check WebSocket support, verify authentication token

#### Mobile App Issues
- **NFC not working**: Verify NFC permission in AndroidManifest, test on real device (emulators don't support NFC)
- **GPS verification failing**: Check branch has `Latitude`, `Longitude`, and `GeofenceRadiusMeters` configured
- **HMAC payload error**: Check `NfcEncryption:SecretKey` in appsettings matches the key used during tag provisioning
- **Tenant discovery fails**: Ensure `/api/v1/tenants/discover` endpoint is accessible and CORS allows mobile origin
- **Push notifications**: Verify Firebase `google-services.json` (Android) / `GoogleService-Info.plist` (iOS) are configured

#### Common Mistakes to Avoid
- Forgetting to validate leave balances before approval
- Not recalculating attendance after shift changes
- Missing branch scope in data queries
- Not handling Arabic RTL layout
- Using inline styles instead of shared components
- Forgetting to update audit logs
- Not implementing proper error handling
- Missing pagination on large datasets
- Not testing with different user roles
- Not sending notifications for workflow events
- Not logging failed verification attempts to `AttendanceVerificationLogs`
- Not configuring branch GPS coordinates before enabling mobile attendance
- Forgetting timezone conversion for mobile transaction timestamps

---

## Sample Data Management Tools

The project includes .NET console tools for managing sample data without requiring `psql` or `sqlcmd` to be installed.

### Tools Overview

#### 1. Sample Data Loader (`tools/RunSampleData.csproj`)
**Purpose**: Loads sample data into the database by executing the SQL script.

**Location**: `d:\Work\TecAxle.Hrms\tools\RunSampleData.cs`

**Usage**:
```bash
cd tools
dotnet run --project RunSampleData.csproj
```

**What it does**:
- Reads `scripts/sample-data-with-users.sql`
- Connects to PostgreSQL database
- Executes the SQL script
- Creates 5 branches, 20 departments, 50 employees with user accounts

**Output**:
```
Reading SQL file...
Connecting to database...
Executing SQL script...
Sample data inserted successfully!
Created: 5 Branches, 20 Departments, 50 Employees with User Accounts
Default password for all employees: Emp@123!
```

#### 2. Sample Data Verifier (`tools/verify/`)
**Purpose**: Verifies that sample data was loaded correctly.

**Location**: `d:\Work\TecAxle.Hrms\tools\verify\Program.cs`

**Usage**:
```bash
cd tools/verify
dotnet run
```

**What it does**:
- Connects to the database
- Counts branches (should be 5)
- Counts departments (should be 20)
- Counts employees (should be 50)
- Counts users (should be 50)
- Displays a sample employee with credentials

**Output**:
```
Branches: 5/5
Departments: 20/20
Employees: 50/50
Users: 50/50

Sample Branch Manager:
   Name: Ahmed Al-Rashid
   Email: ahmed.rashid@company.com
   Username: ahmed.rashid
   Password: Emp@123! (must change on first login)

All sample data verified successfully!
```

### Configuration

Both tools use the same connection string from `appsettings.json`:

```csharp
// Master DB connection:
string masterConnectionString = "Host=localhost;Port=5432;Database=tecaxle_master;Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";
// Tenant DB connection (sample data is loaded into a specific tenant DB):
string tenantConnectionString = "Host=localhost;Port=5432;Database=ta_tenant_{id};Username=postgres;Password=P@ssw0rd@3213;Include Error Detail=true";
```

**Important**: Update the connection string in both tools if your database credentials differ.

### When to Use These Tools

#### Use RunSampleData when:
- Setting up the development environment for the first time
- You don't have `psql` or `sqlcmd` installed
- You want a cross-platform solution
- You've dropped and recreated the database

#### Use VerifySampleData when:
- Confirming sample data was loaded successfully
- Troubleshooting login issues
- Checking employee account credentials
- Verifying database population after restore

### Sample Data Structure

After running the sample data loader, the database will contain:

**5 Branches (IDs: 101-105)**:
- Headquarters - Riyadh
- Jeddah Branch
- Dammam Branch
- Madinah Branch
- Makkah Branch

**20 Departments (IDs: 101-120)**:
- 4 departments per branch: HR, IT, Finance, Operations

**50 Employees (IDs: 1001-1050)**:
- 1 Branch Manager per branch (IDs: 1001, 1011, 1021, 1031, 1041)
- 4 Department Managers per branch (one for each department)
- 5 Regular Employees per branch

**User Accounts**:
- Username: Email prefix (e.g., `ahmed.rashid` for ahmed.rashid@company.com)
- Password: `Emp@123!` (all users must change on first login)
- MustChangePassword flag: `true`

### Troubleshooting Tools

#### RunSampleData Issues:
- **SQL file not found**: Ensure you run from `tools/` directory and `scripts/sample-data-with-users.sql` exists
- **Connection failed**: Check PostgreSQL is running and credentials in the code
- **Timeout**: Increase `CommandTimeout` value (default: 120 seconds)
- **Duplicate key errors**: Sample data already exists, drop and recreate database first

#### VerifySampleData Issues:
- **Connection failed**: Check PostgreSQL is running
- **Count mismatch**: Sample data may not have loaded completely, check for errors
- **No employee found**: Database may not have sample data, run RunSampleData first

### Project Structure

```
tools/
├── RunSampleData.cs          # Main loader script
├── RunSampleData.csproj      # Project file for loader
└── verify/
    ├── Program.cs            # Verification script
    └── Verify.csproj         # Project file for verifier
```

**Note**: Both tools are separate from the main application and can be run independently. They use Npgsql 9.0.2 for PostgreSQL connectivity.

---

## Quick Reference

### Essential Commands

#### Backend
```bash
# Run backend
cd src/Api/TecAxle.Hrms.Api
dotnet run

# Load sample data (first time only, after database creation)
# Option 1: Using .NET tool (recommended - works without psql/sqlcmd installed)
cd tools
dotnet run --project RunSampleData.csproj

# Option 2: Using PostgreSQL command line
psql -U your_username -d TecAxleHRMS -f scripts/sample-data-with-users.sql

# Verify sample data was loaded correctly
cd tools/verify
dotnet run

# Create migration
dotnet ef migrations add MigrationName --project src/Infrastructure/TecAxle.Hrms.Infrastructure --startup-project src/Api/TecAxle.Hrms.Api

# Update database
dotnet ef database update --project src/Infrastructure/TecAxle.Hrms.Infrastructure --startup-project src/Api/TecAxle.Hrms.Api

# Drop database (use with caution - will lose all data)
dotnet ef database drop --project src/Infrastructure/TecAxle.Hrms.Infrastructure --startup-project src/Api/TecAxle.Hrms.Api
```

#### Frontend (Admin)
```bash
# Run admin frontend
cd time-attendance-frontend
npm start

# Build for production
npm run build

# Run tests
npm test
```

#### Frontend (Self-Service)
```bash
# Run self-service portal
cd time-attendance-selfservice-frontend
npm start

# Build for production
npm run build
```

#### Mobile App (Flutter)
```bash
# Navigate to mobile app
cd ess_mobile_app

# Install dependencies
flutter pub get

# Generate code (Riverpod, Freezed, Retrofit)
flutter pub run build_runner build --delete-conflicting-outputs

# Run on device/emulator
flutter run

# Build APK
flutter build apk --debug
flutter build apk --release
```

### Running the Complete System

To run and test the entire TecAxle HRMS, you need to start all three applications:

#### Prerequisites
- Ensure PostgreSQL is running
- Ensure Node.js and .NET SDK are installed
- First-time setup: Install npm dependencies for both frontends

#### Step-by-Step Startup

**1. Start the Backend API** (Terminal 1)
```bash
cd src/Api/TecAxle.Hrms.Api
dotnet run
```
- Backend will run on: **http://localhost:5099**
- Wait for "Application started" message
- Master database (`tecaxle_master`) will be created automatically on first run with platform seed data (subscription plans, system modules)
- Tenant databases (`ta_tenant_{id}`) are auto-provisioned when tenants are created via the admin UI

**1a. Load Sample Data** (First Time Only - After Backend Starts)
```bash
# Open a new terminal and navigate to project root

# Option 1: Using .NET tool (recommended - works without psql/sqlcmd installed)
cd tools
dotnet run --project RunSampleData.csproj

# Option 2: Using PostgreSQL command line
# psql -U your_username -d TecAxleHRMS -f scripts/sample-data-with-users.sql

# Verify the data was loaded successfully
cd tools/verify
dotnet run
```
- This creates 50 employee accounts with user credentials
- Default password for all employees: `Emp@123!` (must change on first login)
- Includes branch managers, department managers, and regular employees
- **Note**: Only run this once after initial database creation
- **See "Sample Data Management Tools" section for detailed documentation**

**2. Start the Admin Frontend** (Terminal 2)
```bash
cd time-attendance-frontend
npm start
```
- Admin portal will run on: **http://localhost:4200**
- Wait for "Application bundle generation complete"
- Access at: [http://localhost:4200](http://localhost:4200)

**3. Start the Self-Service Portal** (Terminal 3)
```bash
cd time-attendance-selfservice-frontend

# First time only: Install dependencies
npm install

# Start the application
npm start
```
- Self-service portal will run on: **http://localhost:4201**
- Wait for "Application bundle generation complete"
- Access at: [http://localhost:4201](http://localhost:4201)

#### Running Applications Summary

| Application | URL | Port | Purpose |
|-------------|-----|------|---------|
| **Backend API** | http://localhost:5099 | 5099 | RESTful API, SignalR Hub, Authentication, Business Logic |
| **Admin Portal** | http://localhost:4200 | 4200 | Full system management for HR/Admins |
| **Self-Service Portal** | http://localhost:4201 | 4201 | Employee self-service and manager approvals |
| **Mobile App** | Device/Emulator | N/A | Flutter app for GPS+NFC attendance (see `ess_mobile_app/`) |

#### Default Login Credentials

**Platform Admin (TecAxle Admin):**
- **Email**: Check the platform user seeder in master DB initialization
- **Role**: `TecAxleAdmin` — has full cross-tenant management access

**Tenant SystemAdmin** (auto-seeded per tenant on provisioning):
- **Email**: `tecaxleadmin@{subdomain}.clockn.net`
- **Password**: Check the seeder class in `Infrastructure/Data/ApplicationDbContextSeed.cs`

**Sample Employee Accounts** (after running sample data script against a tenant DB):
- **Email**: Full email address (e.g., `ahmed.rashid@company.com`) — login uses email, not username
- **Password**: `Emp@123!` (all users must change password on first login)
- **Examples**:
  - Branch Manager: `ahmed.rashid@company.com` / `Emp@123!` (Employee ID: 1001)
  - Department Manager: `sara.fahad@company.com` / `Emp@123!` (Employee ID: 1006)
  - Regular Employee: `salma.khaldi@company.com` / `Emp@123!` (Employee ID: 1026)
- **Total**: 50 employees across 5 branches and 20 departments

#### Quick Testing Checklist
Once all applications are running:
- [ ] Backend: Visit http://localhost:5099/swagger to see API documentation
- [ ] Admin Portal: Log in at http://localhost:4200 with platform admin or tenant SystemAdmin credentials
- [ ] Self-Service Portal: Log in at http://localhost:4201 with employee email credentials (e.g., `salma.khaldi@company.com` / `Emp@123!`)
- [ ] Change password on first login (required for all sample employee accounts)
- [ ] Verify API calls work (check browser console)
- [ ] Test employee features: Create a vacation request in self-service portal
- [ ] Test manager features: Log in as department manager (e.g., `sara.fahad`) and approve requests
- [ ] Test hierarchy: Verify managers can see their team members and pending approvals
- [ ] Test notifications: Verify real-time notifications appear after request submission/approval
- [ ] Mobile App: Test tenant discovery, login, GPS+NFC check-in on real device

#### Troubleshooting Startup Issues
- **Backend won't start**: Check PostgreSQL connection, review appsettings.json
- **Frontend compilation errors**: Delete node_modules and run `npm install` again
- **Port conflicts**: Check if ports 4200, 4201, or 5099 are already in use
- **API connection errors**: Verify backend is running and CORS is configured correctly
- **Self-Service shows different port**: Port is configured in `angular.json` under `serve.options.port`
- **No employees to test with**: Make sure you ran the sample data script `scripts/sample-data-with-users.sql` after first run
- **Can't login with employee account**: Verify you're using the full email address (not just the username prefix) and default password `Emp@123!`. The system resolves the tenant from the email via the master DB.
- **SignalR not connecting**: Check browser console for WebSocket errors, verify JWT token is being sent

### Key File Locations

#### Backend
- Controllers: `src/Api/TecAxle.Hrms.Api/Controllers/`
- SignalR Hubs: `src/Api/TecAxle.Hrms.Api/Hubs/`
- Services: `src/Application/TecAxle.Hrms.Application/Services/`
- Entities: `src/Domain/TecAxle.Hrms.Domain/`
- Module Registry: `src/Domain/TecAxle.Hrms.Domain/Modules/` (SystemModule, ModuleMetadata, ModuleDependencyRules)
- Subscription Entities: `src/Domain/TecAxle.Hrms.Domain/Subscriptions/` (SubscriptionPlan, TenantSubscription, etc.)
- Tenant Entity: `src/Domain/TecAxle.Hrms.Domain/Tenants/` (Tenant, TenantStatus, TenantSettings)
- Tenant Configuration Entities: `src/Domain/TecAxle.Hrms.Domain/Configuration/` (PolicyTemplate, PolicyTemplateItem, SetupStep)
- Branch Settings Override: `src/Domain/TecAxle.Hrms.Domain/Branches/BranchSettingsOverride.cs`
- Department Settings Override: `src/Domain/TecAxle.Hrms.Domain/Departments/DepartmentSettingsOverride.cs`
- Tenant Configuration CQRS: `src/Application/TecAxle.Hrms.Application/TenantConfiguration/` (Commands, Queries, Dtos)
- Policy Templates CQRS: `src/Application/TecAxle.Hrms.Application/PolicyTemplates/` (Commands: Apply, Create, Update, Delete; Queries: GetAll, GetById; Dtos)
- Setup Tracking CQRS: `src/Application/TecAxle.Hrms.Application/SetupTracking/` (Commands, Queries, Dtos)
- Settings Resolver: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Services/TenantSettingsResolver.cs`
- Settings Resolver Interface: `src/Application/TecAxle.Hrms.Application/Abstractions/ITenantSettingsResolver.cs`
- Repositories: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Repositories/`
- DTOs: `src/Application/TecAxle.Hrms.Application/` (within feature folders)
- Tenant CQRS: `src/Application/TecAxle.Hrms.Application/Tenants/` (Commands, Queries, Dtos). `CreateTenantCommand` has FluentValidation validator (`CreateTenantCommandValidator`) with rules for name, subdomain format, email, phone, website, max lengths, language/currency values, and billing cycle. Email domain uniqueness validated in handler against `TenantUserEmails` table.
- Subscription CQRS: `src/Application/TecAxle.Hrms.Application/Subscriptions/` (Commands, Queries, Dtos)
- MediatR Behaviors: `src/Application/TecAxle.Hrms.Application/Common/Behaviors/` (RequiresModuleAttribute with AllowReadWhenDisabled, ModuleEntitlementBehavior, UsageLimitBehavior)
- Entitlement Service: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Services/EntitlementService.cs`
- Module Deactivation Service: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Services/ModuleDeactivationService.cs`
- Tenant Context: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Services/TenantContext.cs`
- Background Jobs: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/`
- Tenant-Iterating Job Base: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/TenantIteratingJob.cs`
- Frozen Workflow Cleanup: `src/Infrastructure/TecAxle.Hrms.Infrastructure/BackgroundJobs/FrozenWorkflowCleanupJob.cs`
- Entitlement Change Log: `src/Domain/TecAxle.Hrms.Domain/Subscriptions/EntitlementChangeLog.cs`
- **Master DbContext**: `src/Infrastructure/TecAxle.Hrms.Infrastructure/Persistence/Master/MasterDbContext.cs`
- **Tenant Connection Resolver**: `src/Infrastructure/TecAxle.Hrms.Infrastructure/MultiTenancy/TenantConnectionResolver.cs`
- **Tenant Provisioning Service**: `src/Infrastructure/TecAxle.Hrms.Infrastructure/MultiTenancy/TenantProvisioningService.cs`
- **Connection String Encryption**: `src/Infrastructure/TecAxle.Hrms.Infrastructure/MultiTenancy/ConnectionStringEncryption.cs`
- **Multi-Tenancy Options**: `src/Infrastructure/TecAxle.Hrms.Infrastructure/MultiTenancy/MultiTenancyOptions.cs`
- **ITenantConnectionResolver**: `src/Application/TecAxle.Hrms.Application/Abstractions/ITenantConnectionResolver.cs`
- **ITenantDbContextFactory**: `src/Application/TecAxle.Hrms.Application/Abstractions/ITenantDbContextFactory.cs`
- **IMasterDbContext**: `src/Application/TecAxle.Hrms.Application/Abstractions/IMasterDbContext.cs`
- **Platform User Entity**: `src/Domain/TecAxle.Hrms.Domain/Platform/PlatformUser.cs`
- **Platform Role Enum**: `src/Domain/TecAxle.Hrms.Domain/Platform/PlatformRole.cs`
- **Tenant User Email Entity**: `src/Domain/TecAxle.Hrms.Domain/Tenants/TenantUserEmail.cs`
- Middleware: `src/Api/TecAxle.Hrms.Api/Middleware/` (GlobalExceptionHandler, TenantResolution, RateLimiting, Localization)
- **Payroll Calculation Services**: `src/Application/TimeAttendanceSystem.Application/Payroll/Services/` — `IPayrollCalculationService`, `IPayrollInputResolver`, `ITaxCalculator`, `ISocialInsuranceCalculator`, `IOvertimePayCalculator`, `IAbsenceDeductionCalculator`, `IProrationCalculator`, `IPayrollCalendarResolver` (interfaces + implementations co-located in each file).
- **Payroll Calculation Models**: `src/Application/TimeAttendanceSystem.Application/Payroll/Models/` (`PayrollCalculationContext`, `PayrollCalculationResult`).
- **Payroll Exception**: `src/Application/TimeAttendanceSystem.Application/Payroll/Exceptions/PayrollCalculationException.cs`.
- **Payroll Handler**: `src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs` — thin orchestrator: validates lock, opens `PayrollRunAudit`, iterates employees, delegates calculation, integrates loans/advances/reimbursements, writes per-employee audit items, closes the audit.
- **Payroll Calendar Policy Entity**: `src/Domain/TecAxle.Hrms.Domain/Payroll/PayrollCalendarPolicy.cs`.
- **Payroll Run Audit Entities**: `src/Domain/TecAxle.Hrms.Domain/Payroll/PayrollRunAudit.cs` (contains both `PayrollRunAudit` and `PayrollRunAuditItem`).
- **Payroll EF Configurations**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/PayrollCalendarPolicyConfiguration.cs`, `PayrollRunAuditConfiguration.cs`.
- **Payroll Migration**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260414191151_AddPayrollCalculationInfrastructure.cs` — additive: new `PayrollCalendarPolicies` / `PayrollRunAudits` / `PayrollRunAuditItems` tables + nullable columns on `PayrollRecords` / `PayrollPeriods` / `SocialInsuranceConfigs`.
- **Payroll Unit Tests**: `tests/TecAxle.Hrms.Payroll.Tests/` — xUnit + FluentAssertions. Covers `ProrationCalculator`, `TaxCalculator`, `PayrollCalendarResolver`, `AbsenceDeductionCalculator` — 27 tests, run via `cd tests/TecAxle.Hrms.Payroll.Tests && dotnet test`. Orchestrator + calculators that require a DbContext (input resolver, SI with DB lookups, OT with day-type resolution across multiple configs) are covered by the E2E smoke workflow in `PAYROLL_PRODUCTION_FIX_REVIEW.md` §17 and have not yet been wired as automated integration tests.

#### Frontend (Admin)
- Pages: `time-attendance-frontend/src/app/pages/`
- Tenant Pages: `time-attendance-frontend/src/app/pages/tenants/` (list, create, edit, view with subscription management)
- Subscription Plans Page: `time-attendance-frontend/src/app/pages/subscription-plans/`
- Shared Components: `time-attendance-frontend/src/app/shared/components/` (30 components, includes `location-picker` for map-based GPS coordinate selection)
- Core Services: `time-attendance-frontend/src/app/core/services/`
- Entitlement Service: `time-attendance-frontend/src/app/core/services/entitlement.service.ts` (isModuleEnabled, isModuleReadOnly, isLoaded)
- Entitlement Models: `time-attendance-frontend/src/app/shared/models/entitlement.model.ts`
- Module Guard: `time-attendance-frontend/src/app/core/auth/guards/module.guard.ts` (read-only default, moduleStrict for create/edit routes)
- Module Status Banner: `time-attendance-frontend/src/app/shared/components/module-status-banner/module-status-banner.component.ts`
- i18n Translations: `time-attendance-frontend/src/app/core/i18n/translations/` (en.json, ar.json)
- Location Picker: `time-attendance-frontend/src/app/shared/components/location-picker/` (Leaflet map for GPS coordinate selection, used in branch create/edit/view)
- Branch Pages: `time-attendance-frontend/src/app/pages/branches/` (list, create-branch, edit-branch, view-branch, branch-table)
- CSS Design System: `time-attendance-frontend/src/styles/` (variables.css, components.css, utilities.css, patterns.css)
- Layout Components: `time-attendance-frontend/src/app/layout/` (sidenav with grouped module-aware filtering, topbar, layout)
- Menu Service: `time-attendance-frontend/src/app/core/menu/menu.service.ts` (`MenuGroup` and `MenuItem` interfaces, 12 navigation groups with module-tagged items)
- Models: `time-attendance-frontend/src/app/shared/models/`
- Guards: `time-attendance-frontend/src/app/core/guards/`
- **Payroll Service**: `time-attendance-frontend/src/app/core/services/payroll.service.ts` — adds `recalculatePeriod(id)` + `getRunAudit(periodId)` + exports `PayrollRunAuditEntry` interface.
- **Payroll Models**: `time-attendance-frontend/src/app/shared/models/payroll.model.ts` — `PayrollPeriod` / `PayrollRecord` include `lockedAtUtc`, `lockedByUserId` / `calculationVersion`.
- **Payroll Settings Page**: `time-attendance-frontend/src/app/pages/payroll/payroll-settings/` — **four tabs**: Tax, Social Insurance, Insurance Providers, and **Calendar Policy**. Social Insurance tab has a **Nationality** column/input bound to `appliesToNationalityCode`. Calendar Policy tab exposes inline CRUD over `BasisType` (CalendarDays / WorkingDays / FixedBasis), fixed-days (gated on FixedBasis), standard hours/day, treat-holidays-as-paid toggle, and effective date range.
- **Payroll Periods Page**: `time-attendance-frontend/src/app/pages/payroll/payroll-periods/` — list exposes a **Recalculate** row action on `Processed`-status periods (calls `POST /{id}/recalculate`). The view page ([view-payroll-period.component](time-attendance-frontend/src/app/pages/payroll/payroll-periods/view-payroll-period/)) shows a **yellow lock banner** + **🔒** icon when the period is Paid/locked, a header-action **Recalculate** button on Processed periods, and a **Payroll Run Audit** section that renders the chronological run history (type / status / timestamps / user / processed / failed / warnings) from `GET /{id}/run-audit`.

#### Frontend (Self-Service)
- Portal Pages: `time-attendance-selfservice-frontend/src/app/pages/portal/`
- Portal Service: `time-attendance-selfservice-frontend/src/app/pages/portal/services/portal.service.ts`
- Portal Models: `time-attendance-selfservice-frontend/src/app/pages/portal/models/`
- i18n Translations: `time-attendance-selfservice-frontend/src/app/core/i18n/translations/` (en.json, ar.json)
- Shared Components: `time-attendance-selfservice-frontend/src/app/shared/components/` (27 components)

#### Mobile App (Flutter)
- Router: `ess_mobile_app/lib/app/router.dart`
- API Service: `ess_mobile_app/lib/core/network/api_service.dart` (Retrofit)
- Auth Interceptor: `ess_mobile_app/lib/core/network/auth_interceptor.dart`
- Theme: `ess_mobile_app/lib/core/theme/app_theme.dart`
- Feature Screens: `ess_mobile_app/lib/features/*/presentation/`
- Shared Models: `ess_mobile_app/lib/shared/models/` (Freezed models)
- Riverpod Providers: `ess_mobile_app/lib/shared/providers/`
- Push Notifications: `ess_mobile_app/lib/shared/services/push_notification_service.dart`

---

## Related Documentation

### Backend Documentation
- [Backend Index](docs/backend/00-INDEX.md) - Complete backend documentation index
- [Quick Reference](docs/backend/01-QUICK-REFERENCE.md) - Backend quick reference guide
- [Domain Layer](docs/backend/02-DOMAIN-LAYER.md) - Domain entities documentation
- [Application Layer](docs/backend/03-APPLICATION-LAYER.md) - Services and DTOs
- [Infrastructure Layer](docs/backend/04-INFRASTRUCTURE-LAYER.md) - Data access and infrastructure
- [API Layer](docs/backend/05-API-LAYER.md) - Controllers and endpoints

### Frontend Documentation
- [Core Architecture](docs/frontend/02-CORE-ARCHITECTURE.md) - Frontend architecture guide
- Shared Components Quick Reference - Component usage guide
- Component Refactoring Documentation - Patterns and best practices

### Business Rules
- [Overtime Business Rules](OVERTIME_BUSINESS_RULES.md) - Overtime calculation rules
- [Workflow Integration Plan](WORKFLOW_INTEGRATION_PLAN.md) - Approval workflow guide
- [Self-Service Implementation Plan](SELFSERVICE_IMPLEMENTATION_PLAN.md) - Self-service portal guide

### Deployment
- [Ubuntu Deployment Guide](UBUNTU_DEPLOYMENT_GUIDE.md) - Linux deployment instructions

### Testing
- [Test Cases Index](TestCases/00_TEST_CASES_INDEX.md) - Master test cases index
- [Test Data Setup](TestCases/TEST_DATA_SETUP_GUIDE.md) - Test data guide

---

**Last Updated**: April 15, 2026
**Version**: 13.1 — Payroll Production-Safety Follow-Ups Completed. Built on top of v13.0: (1) Full CRUD for `PayrollCalendarPolicy` via `/api/v1/payroll-settings/calendar-policies` + new 4th tab on the Payroll Settings admin page; (2) Payroll Run Audit browsing section on the period view page; (3) `PercentageOfGross` allowances now implemented via two-pass resolution (fixed + basic pct → overtime → then gross-based pct) with explicit basis noted on each detail line; (4) SystemAdmin-only `POST /api/v1/payroll-periods/{id}/admin-unlock` for retroactive correction of Paid periods — reverts to Processed, clears all lock fields, writes Adjustment audit with required reason, deliberately does not auto-recalc; (5) Fixed a bug where SI configuration's `AppliesToNationalityCode` field was being sent by the frontend but not persisted by the backend; (6) New xUnit test project `tests/TecAxle.Hrms.Payroll.Tests/` with 27 passing tests covering pure calculators (Proration, Tax, CalendarResolver, AbsenceDeduction). Previous: v13.0 Production-Safe Payroll Calculation Pipeline; v12.1 Grouped Sidebar Navigation; v12.0 Full Per-Tenant Database Isolation.
