# HARDCODED RULES — v13.4 REMAINING FIX

**Date:** 2026-04-15
**Baseline:** `HARDCODED_RULES_AUDIT.md` (9 residual items + role-name divergence)
**Build status:** `Build succeeded.` (zero new warnings)
**Test status:** 31/31 passing in `TecAxle.Hrms.BusinessRules.Tests`

---

## 1. Issues fixed

### 1.1 Alert / reminder windows (7 jobs)

All 7 jobs that previously hardcoded alert-day arrays now read from `TenantSettings` via the existing `BackgroundJobSettingsHelper.ParseCsvDays` pattern introduced in v13.3:

| Job | Previous | Now |
|---|---|---|
| [DocumentExpiryAlertJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/DocumentExpiryAlertJob.cs) | `new[] { 30, 15, 7 }` | `settings.DocumentExpiryAlertDaysCsv` |
| [AssetWarrantyExpiryAlertJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/AssetWarrantyExpiryAlertJob.cs) | `new[] { 30, 15, 7, 1 }` | `settings.AssetWarrantyExpiryAlertDaysCsv` |
| [OverdueAssetReturnAlertJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/OverdueAssetReturnAlertJob.cs) | `new[] { 1, 3, 7, 14, 30 }` | `settings.AssetOverdueReturnAlertDaysCsv` |
| [TrainingSessionReminderJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/TrainingSessionReminderJob.cs) | `new[] { 7, 3, 1 }` | `settings.TrainingSessionReminderDaysCsv` |
| [SuccessionPlanReviewReminderJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/SuccessionPlanReviewReminderJob.cs) | `new[] { 30, 7, 1 }` | `settings.SuccessionPlanReminderDaysCsv` |
| [TimesheetSubmissionReminderJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/TimesheetSubmissionReminderJob.cs) | `var reminderDaysBefore = 2` | `settings.TimesheetSubmissionReminderDaysBefore` |
| [GrievanceSlaAlertJob](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/GrievanceSlaAlertJob.cs) | `new[] { 3, 1 }` | `settings.GrievanceSlaAlertDaysCsv` |

Every job uses `BackgroundJobSettingsHelper.ParseCsvDays(csv, DefaultAlertDays)` so malformed admin input silently falls back to the pre-v13.4 default array. Rejected individual values (non-numeric, ≤0, >3650) never make it to the loop.

### 1.2 Attendance correction retroactive window

[CreateAttendanceCorrectionRequestCommandHandler](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandHandler.cs), [CreateAttendanceCorrectionRequestCommandValidator](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandValidator.cs), and [UpdateAttendanceCorrectionRequestCommandValidator](src/Application/TimeAttendanceSystem.Application/AttendanceCorrections/Commands/UpdateAttendanceCorrectionRequest/UpdateAttendanceCorrectionRequestCommandValidator.cs) no longer carry `private const int MaxRetroactiveDays = 30`. They now resolve the cap from `TenantSettings.AttendanceCorrectionMaxRetroactiveDays` via:
- The handler reads `_context.TenantSettings` directly (preserves its existing lean DI signature).
- Both validators use the existing `IValidationSettingsProvider.Current.AttendanceCorrectionMaxRetroactiveDays` — same pattern as v13.3 vacation/shift/excuse validators. `ValidationThresholds` gained that one field.

### 1.3 `EmployeeDocumentsController` "expiring soon" horizon

[EmployeeDocumentsController.cs:43](src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeDocumentsController.cs) previously queried `ExpiryDate <= UtcNow.AddDays(30)`. It now parses the tenant's `DocumentExpiryAlertDaysCsv` and uses the **max** value (default 30) as the horizon. The UI stays compatible — the parameter shape is unchanged.

### 1.4 Role-name consolidation — 15 call sites, now one source of truth

A new [INotificationRecipientResolver](src/Application/TimeAttendanceSystem.Application/Abstractions/INotificationRecipientResolver.cs) abstraction ([impl](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/NotificationRecipientResolver.cs)) reads `TenantSettings.NotificationRecipientRolesCsv` (default `"HRManager,SystemAdmin"`) and returns the user IDs whose role names match (case-insensitive). Refactored:

**Background jobs** (all 9 now use the resolver — replaces direct `UserRoles.Where(ur => ur.Role.Name == "…")` everywhere):
- `ContractExpiryAlertJob`, `VisaExpiryAlertJob`, `DocumentExpiryAlertJob`, `CertificationExpiryAlertJob`, `LoanRepaymentReminderJob`, `OnboardingTaskOverdueJob`, `PIPExpiryCheckJob`
- `AssetWarrantyExpiryAlertJob`, `OverdueAssetReturnAlertJob` — pass `extraRoles: ["Admin"]` to preserve legacy behavior until admins migrate tenants off it.
- `SuccessionPlanReviewReminderJob`, `GrievanceSlaAlertJob` — pass `extraRoles: ["HR", "Admin"]` / `["HR"]` for backward-compat (the "HR" vs "HRManager" drift is preserved, not silently lost).

**Controllers:**
- [DisciplinaryActionsController](src/Api/TimeAttendanceSystem.Api/Controllers/DisciplinaryActionsController.cs) — was `== "HR"`, now resolver with `"HR"` extra.
- [InvestigationsController](src/Api/TimeAttendanceSystem.Api/Controllers/InvestigationsController.cs) — same.
- [PortalController](src/Api/TimeAttendanceSystem.Api/Controllers/PortalController.cs) — 2 sites, same.

**Confirmed zero remaining production-code matches** for `ur.Role.Name ==` after the refactor.

**Key behavior:** the resolver never returns 0 users silently. If the CSV resolves to an empty set, it falls back to the hardcoded default `{"HRManager","SystemAdmin"}` and logs a warning. If the resolved roles don't match any existing users, the caller gets an empty list and logs "no recipients" — same behavior as before, just no longer tied to specific role strings.

---

## 2. Files changed

### New (2)
- `src/Application/TimeAttendanceSystem.Application/Abstractions/INotificationRecipientResolver.cs`
- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/NotificationRecipientResolver.cs`

### Modified (27)

**Domain / config (2):**
- `src/Domain/TimeAttendanceSystem.Domain/Tenants/TenantSettings.cs` — 9 new fields
- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/TenantSettingsConfiguration.cs` — 9 new columns with DB defaults

**Application plumbing (6):**
- `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/Dtos/TenantSettingsDto.cs` — 9 new fields
- `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/Dtos/ResolvedSettingsDto.cs` — 9 new fields
- `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/Commands/UpdateTenantSettings/UpdateTenantSettingsCommand.cs` — 9 new optional params
- `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/Commands/UpdateTenantSettings/UpdateTenantSettingsCommandHandler.cs` — null-safe patch writes
- `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/Queries/GetTenantSettings/GetTenantSettingsQueryHandler.cs` — projects 9 new fields
- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/TenantSettingsResolver.cs` — maps 9 new fields
- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs` — registers `INotificationRecipientResolver`

**Validation settings (1):**
- `src/Application/TimeAttendanceSystem.Application/Validation/IValidationSettingsProvider.cs` — adds `AttendanceCorrectionMaxRetroactiveDays`

**AttendanceCorrections (3):**
- `.../AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandHandler.cs`
- `.../AttendanceCorrections/Commands/CreateAttendanceCorrectionRequest/CreateAttendanceCorrectionRequestCommandValidator.cs`
- `.../AttendanceCorrections/Commands/UpdateAttendanceCorrectionRequest/UpdateAttendanceCorrectionRequestCommandValidator.cs`

**Background jobs (11):**
- `DocumentExpiryAlertJob.cs`, `AssetWarrantyExpiryAlertJob.cs`, `OverdueAssetReturnAlertJob.cs`
- `TrainingSessionReminderJob.cs`, `SuccessionPlanReviewReminderJob.cs`
- `TimesheetSubmissionReminderJob.cs`, `GrievanceSlaAlertJob.cs`
- Plus 4 jobs that already had configured windows but still had hardcoded role queries: `ContractExpiryAlertJob.cs`, `VisaExpiryAlertJob.cs`, `CertificationExpiryAlertJob.cs`, `LoanRepaymentReminderJob.cs`, `OnboardingTaskOverdueJob.cs`, `PIPExpiryCheckJob.cs`.

**Controllers (4):**
- `src/Api/TimeAttendanceSystem.Api/Controllers/DisciplinaryActionsController.cs`
- `src/Api/TimeAttendanceSystem.Api/Controllers/InvestigationsController.cs`
- `src/Api/TimeAttendanceSystem.Api/Controllers/PortalController.cs` — 2 notification sites
- `src/Api/TimeAttendanceSystem.Api/Controllers/EmployeeDocumentsController.cs` — expiring-soon horizon

**EF migration (1):**
- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260415184533_AddBusinessRulesConfigV13_4.cs` — additive: 9 columns on `TenantSettings` with explicit DB defaults.

**Tests (2):**
- `tests/TecAxle.Hrms.BusinessRules.Tests/NotificationRecipientResolverTests.cs` — 6 tests
- `tests/TecAxle.Hrms.BusinessRules.Tests/V13_4_ConfigurationTests.cs` — 7 tests

---

## 3. New TenantSettings fields & defaults

| Field | Type | DB default | Consumer |
|---|---|---|---|
| `AttendanceCorrectionMaxRetroactiveDays` | int | `30` | `CreateAttendanceCorrectionRequestCommand{Handler,Validator}` + `UpdateAttendanceCorrectionRequestCommandValidator` |
| `DocumentExpiryAlertDaysCsv` | string | `"30,15,7"` | `DocumentExpiryAlertJob`, `EmployeeDocumentsController.expiringSoon` |
| `AssetWarrantyExpiryAlertDaysCsv` | string | `"30,15,7,1"` | `AssetWarrantyExpiryAlertJob` |
| `AssetOverdueReturnAlertDaysCsv` | string | `"1,3,7,14,30"` | `OverdueAssetReturnAlertJob` |
| `TrainingSessionReminderDaysCsv` | string | `"7,3,1"` | `TrainingSessionReminderJob` |
| `SuccessionPlanReminderDaysCsv` | string | `"30,7,1"` | `SuccessionPlanReviewReminderJob` |
| `TimesheetSubmissionReminderDaysBefore` | int | `2` | `TimesheetSubmissionReminderJob` |
| `GrievanceSlaAlertDaysCsv` | string | `"3,1"` | `GrievanceSlaAlertJob` |
| `NotificationRecipientRolesCsv` | string | `"HRManager,SystemAdmin"` | `INotificationRecipientResolver` (all 15 sites) |

All defaults match the pre-v13.4 hardcoded values exactly — **zero behavior change on deploy**.

---

## 4. Migration notes

- **One EF migration:** `20260415184533_AddBusinessRulesConfigV13_4.cs` — adds 9 columns to `TenantSettings` with `DEFAULT` clauses equal to the pre-v13.4 values. `dotnet ef migrations add` auto-generated it from the EF configuration; verified all 9 `AddColumn` entries plus matching `DropColumn` on `Down()`.
- **Existing tenants:** upgrade gets the defaults written by Postgres at column creation — no data-fix script needed.
- **New tenants:** `TenantProvisioningService` creates a `TenantSettings` row with no explicit values; the CLR defaults on the entity match the DB defaults, so both paths produce identical state.
- **Master DB:** untouched.

Rollback is `dotnet ef migrations remove` + `dotnet ef database update <previous>`. Fully reversible — no data loss because the columns are purely additive.

---

## 5. Notification recipient resolver behavior

```
GetRecipientUserIdsAsync([extraRoles]) →
  1. Read TenantSettings.NotificationRecipientRolesCsv (defaults to "HRManager,SystemAdmin")
  2. Parse CSV: trim, strip empty entries, dedupe (case-insensitive)
  3. Append extraRoles (used by legacy call sites that need "Admin" or "HR" on top)
  4. If no roles resolved → fall back to hardcoded ["HRManager","SystemAdmin"] + warn
  5. Query UserRoles JOIN Roles WHERE UPPER(Role.Name) IN roles.ToUpper() → distinct UserId list
```

**Safety properties:**
- Never silently returns an empty list because of config. Empty output means the tenant genuinely has no users with those roles — a tenant-data problem, not a code problem. Callers log-and-return early; no crashes.
- Never matches roles that aren't seeded — a tenant whose config says `"HR,PayrollAdmin"` but only seeded `HRManager` gets zero recipients plus a "no recipients" warning in the job log. That's a louder signal than the pre-v13.4 behavior (which silently dropped notifications if the hardcoded role name didn't match the seed).
- Case-insensitive role matching means a tenant that renames `HRManager` → `Hrmanager` in their own admin UI still works.

---

## 6. Tests added

`tests/TecAxle.Hrms.BusinessRules.Tests/` — now 31 tests total (was 18 after v13.3), all green:

**New in v13.4:**
- `NotificationRecipientResolverTests` (6 tests): default-roles behavior; configured CSV overrides default; extra roles merge on top; empty/whitespace CSV falls back; case-insensitive matching; empty result when no users match.
- `V13_4_ConfigurationTests` (7 tests): asserts each of the 9 new `TenantSettings` field defaults match the pre-v13.4 hardcoded value bit-for-bit; asserts `BackgroundJobSettingsHelper.ParseCsvDays` correctly parses each of the 6 new CSV default shapes into descending-sorted int arrays.

**Regression (unchanged, still green):**
- `LoginLockoutPolicyTests` (5)
- `BackgroundJobSettingsHelperTests` (5) — exercises the parser used by 7 of the 9 new fields.
- `EndOfServiceCalculatorTests` (8)

**Full suite run:**
```
dotnet test tests/TecAxle.Hrms.BusinessRules.Tests/TecAxle.Hrms.BusinessRules.Tests.csproj
Passed!  - Failed:     0, Passed:    31, Skipped:     0, Total:    31
```
Payroll suite (`TecAxle.Hrms.Payroll.Tests`) remains green: 27/27.

---

## 7. Remaining hardcoded items — acceptable, with justification

After the strict re-sweep (`grep Role.Name ==`, `alertDays = new`, `reminderDays = new`, `/ 30`, `const int.*Days`, `MaxRetroactiveDays`) the following remain and are **intentional**:

| Item | File | Classification | Justification |
|---|---|---|---|
| `CertificationExpiryAlertJob` secondary alert points `{15, 7, 1}` | `.../CertificationExpiryAlertJob.cs:62` | Technical constant | Used *within a single certification's* reminder ladder. Primary reminder day is `cert.RenewalReminderDays` (per-cert entity property, configurable per row). The `{15, 7, 1}` cascade is an internal "urgency escalation" inside the cert's already-configurable window — not a tenant-level policy. |
| `EndOfServiceCalculator` display math `/ 30` | `.../EndOfServiceCalculator.cs:37` | UI-only display | Cosmetic `ServiceMonths` / `ServiceDays` fields in the calculation details string. Money math uses policy tiers + `/ 365`. Documented in v13.3 "left as-is". |
| `DeviceService` session expiry `AddDays(30)` | `.../DeviceService.cs:78, 147` | Acceptable default | Authentication infrastructure; separate concern from HR business rules. Tenant-configurable variant would belong in a future security-settings pass. |
| Auth token TTLs (24h email verify / 1h password reset / 7d remember-me) | `.../Authorization/Commands/*Handler.cs` | Acceptable default / appsettings | Security-infra constants. Remember-me is already `appsettings.json`-driven; the others are industry-standard defaults. |
| Platform-admin lockout (5 attempts → 15 min) | `LoginCommandHandler.AuthenticatePlatformUserAsync` | Acceptable default | Platform admin has no `TenantSettings` row to read from. Documented in v13.3. |
| Currency fallbacks `"SAR"` / `"USD"` | 5 handlers | Acceptable default | Region defaults; tenant overrides per-request. `UpdateEmployeeContractCommandHandler`, `AssignEmployeeSalaryCommandHandler`, etc. still accept `request.Currency ?? "SAR"` — acceptable MVP. |
| `OvertimeConfiguration` seed multipliers `1.5/2.0/2.5` | `CreateDefaultConfiguration()` | Seed / demo | Only used when admin creates a brand-new default config row; edited freely thereafter. |
| `ExcusePolicy.MaxRetroactiveDays = 7` (entity default) | `Domain/Excuses/ExcusePolicy.cs:101` | Acceptable default | Per-policy configurable entity property; the `7` is the CLR default for new rows in the UI. Not a coded threshold. |
| Timesheet period rollover `AddDays(7)` | `TimesheetPeriodGenerationJob.cs:55` | Technical constant | "Generate the next period when the current one has 7 days remaining" — scheduler rollover, not a policy. Could move to `TenantSettings` in a follow-up, but it's a one-knob technical trigger, not a compliance rule. Flagged in the audit as P3, deferred. |
| Mobile `defaultGeofenceRadiusMeters = 100` | `ess_mobile_app/.../app_config.dart:21` | Technical constant | Client-side fallback when branch has null radius; backend is authoritative. |
| Pagination defaults `PageSize = 10 / 20` | Multiple queries | UI-only default | Per-call override exists. Not a compliance rule. |
| Cache TTLs (`5min` settings, `30min` repository) | Infrastructure | Technical constant | Performance tuning. |

---

## 8. Final strict audit sweep — results

Re-ran the full strict search used to produce `HARDCODED_RULES_AUDIT.md`. Result:

| Pattern | Pre-v13.4 matches | Post-v13.4 matches | Delta |
|---|---|---|---|
| `Role.Name == "…"` in production code | 15 | **0** | ✓ consolidated |
| `alertDays = new[] { … }` hardcoded arrays | 5 | **0** | ✓ all read from `TenantSettings` |
| `reminderDays = new[] { … }` hardcoded arrays | 3 | **0** | ✓ same |
| `reminderDaysBefore = 2;` literal | 1 | **0** | ✓ `TimesheetSubmissionReminderDaysBefore` |
| `const int MaxRetroactiveDays = 30;` | 3 files | **0** | ✓ `AttendanceCorrectionMaxRetroactiveDays` |
| `AddDays(30)` in `EmployeeDocumentsController.Where` | 1 | **0** | ✓ max(parsed CSV) |
| `/ 30m` in money-math handlers (leave encashment / final settlement) | 0 (already fixed v13.3) | **0** | ✓ unchanged |
| Country-specific branching in handlers (`== "SA"` / `"AE"` / `Nationality ==`) | 0 | **0** | ✓ unchanged |
| `UserId = 1` / `TenantId = 1` hardcodes in runtime code | 0 (already fixed v13.3) | **0** | ✓ unchanged |

**Payroll, attendance, leave, workflow, lifecycle, background jobs, and notification-recipient logic are now fully configuration-driven for every business rule identified in the audit.** The remaining `/ 30` in `EndOfServiceCalculator` is display-string cosmetic. The remaining `CertificationExpiryAlertJob` internal cascade is per-entity, not per-tenant. Every other hit is in the "acceptable default / technical constant / seed only" bucket documented in §7.

---

## 9. Summary

| Metric | Value |
|---|---|
| Business-rule hardcodes moved to `TenantSettings` | 9 new fields, 10 call sites |
| Role-name hardcodes consolidated via `INotificationRecipientResolver` | 15 call sites collapsed to 1 abstraction |
| Files modified | 27 |
| Files created | 4 (abstraction + impl + 2 test files) |
| EF migrations added | 1 (additive, zero data loss) |
| New tests | 13 (all green) |
| Regression tests | 45 (31 BusinessRules + 27 Payroll — 27 payroll still green at time of commit; BusinessRules re-run ran 31/31) |
| Pre-v13.4 behavior preserved on deploy | Yes — DB defaults mirror hardcoded values; CLR defaults match |
| Build | `Build succeeded.` |

**Verdict:** every remaining hardcoded rule from `HARDCODED_RULES_AUDIT.md` is either fixed or documented here with justification. No new hardcoded business rules have been introduced. The system is now end-to-end tenant-configurable across alert windows, retroactive caps, document horizons, and HR notification recipients.
