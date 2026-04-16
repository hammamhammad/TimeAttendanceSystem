# HARDCODED BUSINESS RULES — POST-v13.3 AUDIT

**Date:** 2026-04-15
**Baseline:** `HARDCODED_BUSINESS_RULES_FIX.md` (v13.3 fixed 18 rules)
**Scope:** Find remaining hardcoded business rules still baked into code after v13.3.

---

## 1. Audit scope

- **In scope:** Backend C# under `src/` (Domain, Application, Infrastructure, Api), background jobs, mobile app (`ess_mobile_app/`), admin frontend (`time-attendance-frontend/`), self-service frontend (`time-attendance-selfservice-frontend/`). Excluded: EF migrations, EF `*.Designer.cs`, seed data (`SeedData.cs`, `MasterSeedData.cs`, policy templates), test projects, generated code.
- **Domains:** payroll, tax, SI, attendance, overtime, leave, excuses, workflows, lifecycle (offboarding / recruitment / onboarding / performance), background jobs, system user resolution, country-specific logic, role-name hardcoding, currency defaults.
- **Out of scope:** Pagination defaults (UX), cache TTLs (infra), calendar navigation math (technical), cryptography constants (Earth radius, HMAC keys from config), JWT expiry fallbacks that defer to `appsettings.json`.

## 2. Search methods

- **Parallel Explore agents** on three slices (payroll/tax/attendance, leave/workflow/lifecycle/jobs, frontend/IDs/country).
- **Grep verification** for every "must fix" claim: `MaxRetroactiveDays`, `Role.Name ==`, `/ 30`, `AddDays\(\d+\)`, `AddHours\(\d+\)`, `new\[\]\s*\{\s*\d+`, `const int.*Days`, `Currency.*=.*"SAR"`, `Nationality ==`, `== "SA"`, `== "AE"`, `UserId\s*=\s*1`, `RenewalReminderDays`.
- **File-by-file spot checks** on background jobs (`src/Infrastructure/.../BackgroundJobs/`), lifecycle handlers, authorization commands, tenant configuration resolver, `DeviceService`, `PasswordService`, mobile app `app_config.dart`.
- **Regression check:** confirmed all 18 v13.3 items are actually in the configured-path (e.g. `LoanRepaymentReminderJob` uses `settings.LoanRepaymentReminderDays`, `ContractExpiryAlertJob` uses `settings.ContractExpiryAlertDaysCsv`).

---

## 3. Remaining hardcoded rules

### 3.1 Must fix — business-rule thresholds baked into code

| # | File | Line | Hardcoded value | Flow affected | Severity | Configurable? |
|---|---|---|---|---|---|---|
| 1 | [AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandHandler.cs#L25) | 25, 78-80 | `const int MaxRetroactiveDays = 30` | Employee cannot submit an attendance correction for any day older than 30 days — rigid retroactive window across ALL tenants. Mirrored in [CreateAttendanceCorrectionRequestCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandValidator.cs#L14) and [UpdateAttendanceCorrectionRequestCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/UpdateAttendanceCorrectionRequest/UpdateAttendanceCorrectionRequestCommandValidator.cs#L14) (3 files, same constant). | **High** | Must fix |
| 2 | [DocumentExpiryAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/DocumentExpiryAlertJob.cs#L32) | 32 | `var alertDays = new[] { 30, 15, 7 };` | Employee document (ID / passport / certificate) expiry alerts fire at fixed windows. A tenant that wants 60/30/7 cannot configure it. Parallel to Contract/Visa which **are** configurable — unfinished v13.3 work. | **High** | Must fix |
| 3 | [AssetWarrantyExpiryAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/AssetWarrantyExpiryAlertJob.cs#L53) | 53 | `var alertDays = new[] { 30, 15, 7, 1 };` | Asset warranty expiry alerts. Same pattern as above. | **Medium** | Must fix |
| 4 | [OverdueAssetReturnAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/OverdueAssetReturnAlertJob.cs#L64) | 64 | `var alertDays = new[] { 1, 3, 7, 14, 30 };` | Overdue asset return reminder cadence. | **Medium** | Must fix |
| 5 | [TrainingSessionReminderJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/TrainingSessionReminderJob.cs#L32) | 32 | `var reminderDays = new[] { 7, 3, 1 };` | Training session reminders to enrolled employees. Identical shape to `ReviewReminderDaysCsv` pattern that v13.3 already introduced. | **Medium** | Must fix |
| 6 | [SuccessionPlanReviewReminderJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/SuccessionPlanReviewReminderJob.cs#L34) | 34 | `var reminderDays = new[] { 30, 7, 1 };` | Succession-plan review reminders. | **Medium** | Must fix |
| 7 | [TimesheetSubmissionReminderJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/TimesheetSubmissionReminderJob.cs#L37) | 37 | `var reminderDaysBefore = 2;` | Timesheet-submission reminder lookahead (2 days before deadline). | **Medium** | Must fix |
| 8 | [GrievanceSlaAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/GrievanceSlaAlertJob.cs#L97) | 97 | `var alertDays = new[] { 3, 1 };` | Grievance SLA breach alerts. Compliance-sensitive: some jurisdictions demand faster escalation. | **High** | Must fix |
| 9 | [TimesheetPeriodGenerationJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/TimesheetPeriodGenerationJob.cs#L55) | 55 | `today.AddDays(7)` — generates the next timesheet period when the current one ends within 7 days | Timesheet-period rollover lookahead. | **Low** | Should fix |

**Why these are "Must fix":** they are per-tenant operational policy dressed as code constants. Each one has an exact parallel pattern already configured in v13.3 (`ContractExpiryAlertDaysCsv`, `VisaExpiryAlertDaysCsv`, `ReviewReminderDaysCsv`, `LoanRepaymentReminderDays`). Leaving them hardcoded is incoherent — a tenant can configure contract alerts at 60/30 but not document alerts — and for attendance corrections (item 1) directly blocks employee-facing workflow.

### 3.2 Must fix — role-name inconsistency across 15+ call sites

Two different role names are referenced interchangeably, risking silent "no recipients" failures when only one is seeded:

**Using `"HRManager"`:**
- `ContractExpiryAlertJob:39`, `VisaExpiryAlertJob:39`, `DocumentExpiryAlertJob:35`, `CertificationExpiryAlertJob:35`, `PIPExpiryCheckJob:84`, `OnboardingTaskOverdueJob:54`, `LoanRepaymentReminderJob:56`

**Using `"HR"`:**
- `GrievanceSlaAlertJob:35`, `InvestigationsController:293`, `DisciplinaryActionsController:356`, `PortalController:3602, 3745`

**Mixed (`"HR" | "SystemAdmin" | "Admin"` and `"HRManager" | "SystemAdmin" | "Admin"`):**
- `SuccessionPlanReviewReminderJob:56`, `OverdueAssetReturnAlertJob:37`, `AssetWarrantyExpiryAlertJob:35`

| Severity | Configurable? | Recommended fix |
|---|---|---|
| **High** | Must fix | Standardize on **one** role name (probably `"HRManager"` — most-used). Better: introduce `TenantSettings.NotificationRecipientRolesCsv = "HRManager,SystemAdmin"` and a single helper `ResolveNotificationUserIdsAsync(context, settings, ct)` reused by every job/controller. Eliminates the 15-site duplication + divergence. |

### 3.3 Must fix — `EmployeeDocumentsController` query horizon

| File | Hardcoded | Flow | Severity |
|---|---|---|---|
| [EmployeeDocumentsController.cs:43](src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeDocumentsController.cs#L43) | `DateTime.UtcNow.AddDays(30)` — "expiring soon" query filter | Read endpoint listing docs expiring in the next 30 days. | **Medium** | Must fix — align with the configurable `DocumentExpiryAlertDaysCsv` proposed in §3.1 (use `Max(parsed)` as the horizon). |

---

## 4. Acceptable defaults (verified and accepted as-is)

| Item | File | Value | Classification | Justification |
|---|---|---|---|---|
| DeviceService session expiry | [DeviceService.cs:78, 147](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/DeviceService.cs) | `AddDays(30)` | Acceptable default | Authentication-session lifetime. Security policy is already partly in `TenantSettings.SessionTimeoutMinutes`; making DeviceService read it would be a nice future consolidation but not a compliance gap today. |
| Email verification token TTL | `VerifyEmailCommandHandler.cs:39` | `AddHours(24)` | Acceptable default | Security-infrastructure constant, not HR business rule. Consider moving to `appsettings.json` — not compliance-critical. |
| Password reset token TTL | `RequestPasswordResetCommandHandler.cs:39` | `AddHours(1)` | Acceptable default | Industry-standard security window. |
| 2FA refresh token TTL | `VerifyTwoFactorCommandHandler.cs:113` | `AddDays(7)` | Acceptable default | Matches JWT remember-me; fallback only — primary source is `appsettings.json`. |
| Platform-admin login lockout (5 attempts → 15 min) | `LoginCommandHandler.cs:182` | `5 / 15min` | Acceptable default | Applies to platform admin in master DB — there's **no `TenantSettings` for the platform** to read from. Documented in v13.3 "Left as-is". |
| Certification renewal reminder default | [EmployeeCertification.cs:20](src/Domain/TimeAttendanceSystem.Domain/Training/EmployeeCertification.cs#L20) + [EmployeeCertificationsController.cs:288,305](src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeCertificationsController.cs) | `RenewalReminderDays = 30` | Acceptable default | **Per-certification configurable property** — each cert row stores its own value; the `30` is the entity default for new rows. `CertificationExpiryAlertJob:55` correctly reads `cert.RenewalReminderDays ?? 30`. |
| Excuse policy retroactive days default | [ExcusePolicy.cs:101](src/Domain/TimeAttendanceSystem.Domain/Excuses/ExcusePolicy.cs#L101) | `MaxRetroactiveDays = 7` | Acceptable default | Per-policy configurable entity property, not a coded constant applied at validation. |
| Overtime rate seed defaults | `OvertimeConfigurationService.CreateDefaultConfiguration()` lines 193-195 | `1.5m / 2.0m / 2.5m` | Test/demo seed only | Only used when admin asks to create a default config row; edited freely per tenant thereafter. |
| Employee contract currency fallback `"SAR"` | `CreateEmployeeContractCommandHandler.cs:46`, `AssignEmployeeSalaryCommandHandler.cs:48`, `UpdateEmployeeContractCommandHandler.cs:45`, `ApproveSalaryAdjustmentCommandHandler.cs:56` | `request.Currency ?? "SAR"` | Acceptable default | Region default; tenant can override via DTO. Future polish: fall back to `TenantSettings`-derived currency instead of literal. |
| Subscription plan currency fallback `"USD"` | `CreateSubscriptionPlanCommandHandler.cs:39`, `UpdateSubscriptionPlanCommandHandler.cs:42` | `request.Currency ?? "USD"` | Acceptable default | Platform-level (SaaS pricing) — correct default for platform. |
| Tenant default country `"SA"` | `CreateTenantCommandHandler.cs:90` | `request.Country ?? "SA"` | Acceptable default | Primary market; tenant overrides in UI. |
| Policy template default region `"SA"` | `PolicyTemplateDto.cs:11` | `"SA"` | Acceptable default | DTO initializer; API caller sets explicitly. |
| Mobile geofence fallback | `ess_mobile_app/lib/core/config/app_config.dart:21` | `defaultGeofenceRadiusMeters = 100` | Acceptable default | Client-side safety fallback when branch has null radius; backend is authoritative. |
| Mobile token refresh threshold | `ess_mobile_app/lib/core/config/app_config.dart` | `tokenRefreshThresholdMinutes = 5` | Technical constant | Client-side network behavior, not HR rule. |
| Frontend currency dropdown options `['SAR', 'AED', ...]` | ~10 admin-frontend components | `'SAR'` default + fixed list | UI-only display | User selects in form; backend validates. Future polish: drive from API. |
| Final-settlement `NumberFormat { currency: 'SAR' }` | `final-settlements.component.ts:122` | `'SAR'` | UI-only display | Currency code used for locale-aware formatting only. Should read from tenant config — minor UX polish. |

---

## 5. Technical constants (not business rules — leave alone)

| Item | File | Value | Why technical |
|---|---|---|---|
| Earth radius | `MobileAttendanceController.cs` haversine | `6371000` m | Physics |
| Settings cache TTL | `TenantSettingsResolver.cs` | `5 min` | Performance — not a business rule |
| `SettingsRepository` cache TTL | `SettingsRepository.cs` | `30 min` | Same |
| JWT expiry fallback in `JwtTokenGenerator` | 15 min / 7 days | Safety-net when `appsettings.json` lacks the key — fine |
| `MonthlyLeaveAccrualJob` `.AddMonths(-1)` | calendar navigation | Not a policy |
| `CounselingFollowUpReminderJob:73` `AddDays(1)` | "tomorrow" date for today-anchored check | Not a threshold |
| `GetMonthlyReportQueryHandler:18` `AddMonths(1).AddDays(-1)` | month-end calculation | Not a policy |
| Mobile `apiTimeoutSeconds = 30`, `maxRetryAttempts = 3` | network behavior | Not HR |

---

## 6. Confirmation — areas verified clean

| Area | Evidence |
|---|---|
| **Payroll pipeline** | `IPayrollCalculationService`, `ITaxCalculator`, `ISocialInsuranceCalculator`, `IOvertimePayCalculator`, `IAbsenceDeductionCalculator`, `IProrationCalculator`, `IPayrollCalendarResolver` — every calculator consumes `PayrollCalculationContext` / effective-dated configs. **No hardcoded multipliers, caps, brackets, or `/30` in money math.** Verified by pattern-grep. |
| **`/30m` in `CreateLeaveEncashmentCommandHandler` and `CalculateFinalSettlementCommandHandler`** | Both now call `ITenantPayrollCalendarService.GetMonthlyDailyBasisAsync(branchId, referenceDate, ct)` — confirmed at the exact lines previously flagged. |
| **End-of-service calculation** | Delegated to `IEndOfServiceCalculator`, which resolves a tenant-scoped `EndOfServicePolicy` by effective date + optional country; fallback to seeded formula behind a warning log. No hardcoded `5y threshold` or `0.5/1.0` multipliers in handler. |
| **Tax configuration** | `TaxCalculator` consumes `TaxConfiguration.Brackets` effective-dated — **no** hardcoded bracket boundaries, rates, or fixed amounts. |
| **Social insurance** | `SocialInsuranceCalculator` uses `SocialInsuranceConfig` (branch → tenant fallback, nationality-code aware via `AppliesToNationalityCode`). **No hardcoded rate, cap, or nationality check in handler code.** |
| **Attendance grace periods** | `AttendanceCalculationService` reads `TenantSettings.LateGracePeriodMinutes` / `EarlyLeaveGracePeriodMinutes` / `MinimumWorkingHoursForPresent`. Verified clean. |
| **System-user resolution** | `DailyAttendanceGeneratorService:565` now `await _systemUserResolver.GetSystemUserIdAsync(ct)` — no `UserId = 1`. Grep across all `src/**/*.cs` excluding seeders/migrations found **zero** other `UserId = 1` / `TenantId = 1` / `RoleId = 1` / `BranchId = 1` / `DepartmentId = 1` hardcodes in runtime code. |
| **Country-specific branching in handlers** | Grep for `== "SA"`, `== "AE"`, `"Saudi"`, `"UAE"`, `Nationality ==`, `CountryCode ==` across `src/Application/`, `src/Infrastructure/Services/`, `src/Infrastructure/BackgroundJobs/` — **zero** business-logic branches. All occurrences are in seeders / policy templates / DTO defaults (region = SA), which are data, not logic. |
| **Leave accrual** | `LeaveAccrualService`, `MonthlyLeaveAccrualJob` read `LeaveAccrualPolicy` / `LeaveEntitlement` entities — no hardcoded Saudi 21-day / 30-day annual leave, no hardcoded accrual rate. |
| **Leave carryover / expiry** | `VacationType.EncashmentMaxDays`, `LeaveAccrualPolicy.MaxCarryOverDays / CarryOverExpiryMonths` are configurable per policy. |
| **Workflow timeouts** | `WorkflowTimeoutProcessingJob` delegates to `IWorkflowEngine.ProcessTimeoutsAsync()` which reads per-step `TimeoutHours` from workflow definition. `TenantSettings.DefaultApprovalTimeoutHours = 72` covers the default. |
| **Resignation notice period** | Read from `employee.NoticePeriodDays` (per-contract value), not hardcoded. |
| **PIP / Performance review durations** | Read from entity dates (`ReviewCycle.StartDate/EndDate`, `PerformanceImprovementPlan.EndDate`). No hardcoded durations. |
| **Onboarding task overdue** | Reads `OnboardingTask.DueDate < today`. No hardcoded window. |
| **Frontend vacation / excuse / shift caps** | Backend-enforced via `IValidationSettingsProvider` which reads `TenantSettings.{MaxVacationDaysPerRequest, ExcuseBackwardWindowDays, ExcuseForwardWindowDays, MaxShiftGracePeriodMinutes}`. Frontend forms don't duplicate the numeric cap. |

---

## 7. Recommended fixes (prioritized)

### Priority 1 — mechanical extensions of v13.3 pattern (half a day)
Add to `TenantSettings`, wire into the 8 jobs + 3 validators:
- `DocumentExpiryAlertDaysCsv` (default `"30,15,7"`)
- `AssetWarrantyExpiryAlertDaysCsv` (default `"30,15,7,1"`)
- `AssetOverdueReturnAlertDaysCsv` (default `"1,3,7,14,30"`)
- `TrainingSessionReminderDaysCsv` (default `"7,3,1"`)
- `SuccessionPlanReminderDaysCsv` (default `"30,7,1"`)
- `TimesheetSubmissionReminderDaysBefore` (int, default 2)
- `GrievanceSlaAlertDaysCsv` (default `"3,1"`)
- `AttendanceCorrectionMaxRetroactiveDays` (int, default 30) — replaces the `const int MaxRetroactiveDays = 30` across the 3 AttendanceCorrection files.

Each job consumes via the already-existing `BackgroundJobSettingsHelper.ParseCsvDays`. Same pattern, zero new infrastructure.

### Priority 2 — role-name consolidation (half a day)
One of:
(a) **Normalize to `"HRManager"`**: rename the 4-5 places using `"HR"` / `"Admin"` — one-line changes each.
(b) **Configurable recipients**: add `TenantSettings.NotificationRecipientRolesCsv = "HRManager,SystemAdmin"`; introduce `INotificationRecipientResolver.ResolveUserIdsAsync()`; refactor every `Role.Name == "X"` notification lookup through it. ~15 call sites, roughly 2-3 hours of focused work plus tests.

(b) is the correct answer for a multi-tenant SaaS; (a) is the lower-risk patch if the role-rename is deferred.

### Priority 3 — polish (deferrable)
- Currency fallbacks in 4 handlers: prefer `TenantSettings.PayrollCurrency ?? Tenant.DefaultCurrency` before the `"SAR"` literal.
- `EmployeeDocumentsController:43` — use max of `DocumentExpiryAlertDaysCsv` window rather than fixed 30.
- Frontend currency options: drive the `['SAR','AED',...]` lists from a tenant-config API endpoint.
- Mobile `defaultGeofenceRadiusMeters = 100` — arguably ship from backend, but safety fallback is fine.

---

## 8. Open questions

1. **Is there a canonical HR role?** The codebase ships with both `"HRManager"` and `"HR"` references. Which does `SeedData.SeedRolesAsync` actually create? (If only one exists, the other branch is dead code that silently drops notifications.)
2. **Attendance corrections retroactive window — compliance driver?** Some labor jurisdictions cap retroactive attendance changes at 14 days, others allow 60+. Making this per-tenant configurable is the right shape, but is there a hard regulatory floor we shouldn't allow tenants to exceed?
3. **Platform-admin lockout policy** — should this be exposed to TecAxle operators via `appsettings.json`? Currently hardcoded in `LoginCommandHandler.AuthenticatePlatformUserAsync`.
4. **Succession plan / grievance SLA** — do tenants in regulated industries (e.g. UAE public sector) need finer cadences than `{30,7,1}` / `{3,1}`? If yes, the CSV pattern scales trivially.
5. **Should `ExcusePolicy.MaxRetroactiveDays = 7` (entity default) align with `AttendanceCorrectionMaxRetroactiveDays` (proposed = 30)?** These rules overlap semantically — inconsistency is suspicious.

---

## 9. Summary

| Category | Count | Status |
|---|---|---|
| Must fix — alert/reminder windows not yet configurable | 8 | v13.3 pattern extensions, mechanical |
| Must fix — role-name divergence | 15+ call sites, 2-3 canonical names | Standardize or make configurable |
| Must fix — attendance-correction retroactive cap | 1 constant in 3 files | Add to `TenantSettings` |
| Acceptable defaults (auth tokens, currency, mobile client constants, UI forms) | ~15 | Documented |
| Technical constants (Earth radius, cache TTL, calendar math) | ~10 | Correctly ignored |
| Areas verified clean (payroll money math, EOS, tax/SI, attendance grace, system user, country logic) | 11 domains | ✓ |

**Verdict:** v13.3 was directionally correct and comprehensive for payroll, EOS, and the primary compliance domains. The audit surfaced **9 real residual hardcoded rules** (7 background-job windows + 1 retroactive cap + 1 controller lookahead) plus a **role-name consolidation issue** that spans 15+ sites. Fixing these is a straightforward continuation of the v13.3 pattern — estimated at one engineering day for P1+P2. No business-logic hardcoding was found in the payroll, tax, social insurance, overtime, EOS, or attendance-grace pipelines.
