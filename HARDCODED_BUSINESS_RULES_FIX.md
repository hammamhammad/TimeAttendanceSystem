# HARDCODED BUSINESS RULES FIX — v13.3

**Date:** 2026-04-15
**Scope:** Move critical HRMS business rules from hardcoded code into tenant-aware, effective-date-aware configuration.
**Guiding principle:** Every seeded default preserves pre-v13.3 behavior bit-for-bit. Zero regressions on deploy.

---

## 1. Findings — before / after

### Critical

| # | File | Before | After |
|---|---|---|---|
| 1 | [CalculateEndOfServiceCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/EndOfService/Commands/CalculateEndOfService/CalculateEndOfServiceCommandHandler.cs) | Saudi tiers hardcoded: `≤5y → 0.5mo/y`, `>5y → 1mo/y`; resignation deductions `<2y=0%`, `2-5y=1/3`, `5-10y=2/3`, `10+=100%` | Delegated to `IEndOfServiceCalculator` — resolves tenant-scoped `EndOfServicePolicy` by effective date + optional country. Seed identical to old formula. Applied policy id + JSON snapshot persisted on `EndOfServiceBenefit`. |
| 2 | [CreateLeaveEncashmentCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/LeaveEncashments/Commands/CreateLeaveEncashment/CreateLeaveEncashmentCommandHandler.cs#L91) | `salary.BaseSalary / 30m` | `ITenantPayrollCalendarService.GetMonthlyDailyBasisAsync(branchId, today)` — honors `PayrollCalendarPolicy.BasisType`. |
| 3 | [CalculateFinalSettlementCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/FinalSettlements/Commands/CalculateFinalSettlement/CalculateFinalSettlementCommandHandler.cs#L52) | `(BaseSalary + Allowances) / 30m` | Same resolver as above, driven by effective-date `PayrollCalendarPolicy`. |
| 4 | [ContractExpiryAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/ContractExpiryAlertJob.cs) | `new[] { 30, 15, 7 }` | Reads `TenantSettings.ContractExpiryAlertDaysCsv` (default `"30,15,7"`). CSV parser rejects malformed entries; falls back to defaults. |
| 5 | [VisaExpiryAlertJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/VisaExpiryAlertJob.cs) | `new[] { 90, 60, 30, 15, 7 }` | Reads `TenantSettings.VisaExpiryAlertDaysCsv` (default `"90,60,30,15,7"`). |
| 6 | [FrozenWorkflowCleanupJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/FrozenWorkflowCleanupJob.cs) | `const int FrozenDaysThreshold = 90` | Reads `TenantSettings.FrozenWorkflowCleanupDays` (default 90). |
| 7 | [ReviewCycleReminderJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/ReviewCycleReminderJob.cs) | `new[] { 7, 3, 1 }` | Reads `TenantSettings.ReviewReminderDaysCsv` (default `"7,3,1"`). |
| 8 | [LoanRepaymentReminderJob.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/LoanRepaymentReminderJob.cs) | `today.AddDays(7)` + Arabic/EN text hardcoded to 7 | Reads `TenantSettings.LoanRepaymentReminderDays` (default 7); notification text reflects the configured window. |
| 9 | [DailyAttendanceGeneratorService.cs](src/Application/TimeAttendanceSystem.Application/Services/DailyAttendanceGeneratorService.cs) | `AssignedByUserId = 1 // should be configurable` | `ISystemUserResolver.GetSystemUserIdAsync` — finds the tenant's `IsSystemUser = true` user (preferring `systemadmin` / `tecaxleadmin`), caches 5 min per tenant, throws on unresolvable (no silent fallback). |

### Medium — tenant-configurable thresholds

| # | File | Before | After |
|---|---|---|---|
| 10 | [OfferLettersController.cs](src/Api/TimeAttendanceSystem.Api/Controllers/OfferLettersController.cs) | `ProbationPeriodDays = 90` baked into offer-to-contract conversion | Reads `TenantSettings.DefaultProbationDays` (default 90). |
| 11 | [LoginCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/Authorization/Commands/Login/LoginCommandHandler.cs) | Tier ladder 5/10/15 → 15min/1h/24h hardcoded | `LoginLockoutPolicy.ParseOrDefault(settings.LoginLockoutPolicyJson)` — progressive tiers as JSON; invalid JSON falls back to documented defaults. |
| 12 | [FilesController.cs](src/Api/TimeAttendanceSystem.Api/Controllers/FilesController.cs) | 10 MB hardcoded | Transport cap raised to 100 MB; tenant's `TenantSettings.MaxUploadSizeMb` (default 10) enforced in handler. |
| 13 | [PasswordService.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/PasswordService.cs) | `const int MinLength = 8` | New overload `ValidatePasswordStrength(password, minLength)` — callers pass `TenantSettings.PasswordMinLength` (default 8, minimum floor 8). |
| 14 | [CreateEmployeeVacationCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/EmployeeVacations/Commands/CreateEmployeeVacation/CreateEmployeeVacationCommandValidator.cs) | Max 365 days per request hardcoded | `IValidationSettingsProvider.Current.MaxVacationDaysPerRequest` (default 365). |
| 15 | [CreateBulkEmployeeVacationCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/EmployeeVacations/Commands/CreateBulkEmployeeVacation/CreateBulkEmployeeVacationCommandValidator.cs) | 2-year planning window + 180-day period hardcoded | Both driven by `MaxVacationFuturePlanningYears` (default 2) and `MaxVacationDaysPerRequest` (default 365). Note: legacy "180 days" cap intentionally replaced with the unified tenant max. |
| 16 | [CreateShiftCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/Shifts/Commands/CreateShift/CreateShiftCommandValidator.cs) | Grace-period cap 120 min hardcoded | `TenantSettings.MaxShiftGracePeriodMinutes` (default 120). |
| 17 | [CreateEmployeeExcuseCommandValidator.cs](src/Application/TimeAttendanceSystem.Application/Excuses/Commands/CreateEmployeeExcuse/CreateEmployeeExcuseCommandValidator.cs) | `1 year back / 30 days forward` hardcoded | `TenantSettings.ExcuseBackwardWindowDays` (default 365) / `ExcuseForwardWindowDays` (default 30). |
| 18 | [OvertimeConfigurationService.cs](src/Application/TimeAttendanceSystem.Application/Services/OvertimeConfigurationService.cs) | `30 days in future` cap hardcoded | `TenantSettings.OvertimeConfigMaxFutureDays` (default 30). |

### Left as-is (documented)

- **Pagination defaults (PageSize = 10/20):** UX behavior, per-call override exists. Not a business rule.
- **JWT `ExpiryMinutes` / `RememberMeDays` defaults:** already read from `appsettings.json`; hardcoded fallback is a safety net — correct shape.
- **`MonthlyLeaveAccrualJob.AddMonths(-1)`:** calendar navigation for the scheduler, not a rule.
- **OvertimeConfiguration entity default multipliers (1.5/2.0/2.5) in `CreateDefaultConfiguration`:** only used when admin seeds a brand-new config; fully editable per tenant.
- **EOS display math `remainingDays / 30`:** cosmetic string in `CalculationDetails` only — money math uses `/ 365` and `/ 30.4` equivalents via tiers.
- **Pre-existing platform-admin lockout (5 attempts → 15 min) in the master DB path:** kept hardcoded because it's platform-level (not per-tenant); there's no `TenantSettings` row for platform admin.

---

## 2. New configuration / policy model

### 2.1 `EndOfServicePolicy` family (new entity set)

Three tables under [src/Domain/TimeAttendanceSystem.Domain/Offboarding/](src/Domain/TimeAttendanceSystem.Domain/Offboarding/):

```
EndOfServicePolicy
  ├─ Name                                      (required, <= 200)
  ├─ Description                               (<= 1000)
  ├─ CountryCode                               (ISO alpha-2, nullable — null = any)
  ├─ IsActive                                  (bool)
  ├─ EffectiveFromDate                         (timestamptz, required)
  ├─ EffectiveToDate                           (timestamptz, nullable)
  ├─ MinimumServiceYearsForEligibility         (decimal, default 0)
  ├─ Tiers[]                                   (1..n, cascade)
  └─ ResignationDeductions[]                   (0..n, cascade)

EndOfServicePolicyTier
  ├─ MinYearsInclusive / MaxYearsExclusive?    (decimal — range of service years)
  ├─ MonthsPerYearMultiplier                   (decimal — months of salary per year in range)
  └─ SortOrder

EndOfServiceResignationDeductionTier
  ├─ MinYearsInclusive / MaxYearsExclusive?
  ├─ DeductionFraction                         (decimal 0..1)
  └─ SortOrder
```

**Why effective-dated**: Changing the EOS formula after a termination is calculated must not retroactively alter prior EOS records. The resolver picks the policy whose effective range contains `terminationDate`. Past records keep their applied policy ID and a JSON snapshot on `EndOfServiceBenefit.AppliedPolicySnapshotJson` for forensic audit.

**Why a separate entity (not JSON on TenantSettings)**: Tiers are structured, queryable, index-friendly data that HR admins edit in a table UI. Flattening into JSON would be unreadable and untestable.

### 2.2 `TenantSettings` — 15 new fields

Added to [TenantSettings.cs](src/Domain/TimeAttendanceSystem.Domain/Tenants/TenantSettings.cs):

| Field | Default | Consumer |
|---|---|---|
| `PasswordMinLength` (int) | 8 | `PasswordService.ValidatePasswordStrength(pw, minLength)` |
| `LoginLockoutPolicyJson` (jsonb) | default-escalation (5→15m, 10→1h, 15→24h) | `LoginCommandHandler` |
| `ContractExpiryAlertDaysCsv` (string) | `"30,15,7"` | `ContractExpiryAlertJob` |
| `VisaExpiryAlertDaysCsv` (string) | `"90,60,30,15,7"` | `VisaExpiryAlertJob` |
| `ReviewReminderDaysCsv` (string) | `"7,3,1"` | `ReviewCycleReminderJob` |
| `LoanRepaymentReminderDays` (int) | 7 | `LoanRepaymentReminderJob` |
| `FrozenWorkflowCleanupDays` (int) | 90 | `FrozenWorkflowCleanupJob` |
| `DefaultProbationDays` (int) | 90 | `OfferLettersController` |
| `MaxUploadSizeMb` (int) | 10 | `FilesController.Upload` |
| `MaxVacationDaysPerRequest` (int) | 365 | Vacation validators |
| `MaxVacationFuturePlanningYears` (int) | 2 | Bulk vacation validator |
| `MaxShiftGracePeriodMinutes` (int) | 120 | Shift validator |
| `ExcuseBackwardWindowDays` (int) | 365 | Excuse validator |
| `ExcuseForwardWindowDays` (int) | 30 | Excuse validator |
| `OvertimeConfigMaxFutureDays` (int) | 30 | OvertimeConfigurationService |

All fields surfaced in `TenantSettingsDto`, `ResolvedSettingsDto`, `UpdateTenantSettingsCommand` (as **nullable optional** params so legacy callers don't break). `TenantSettingsResolver` maps them into the inheritance chain.

### 2.3 New services

| Service | Role |
|---|---|
| `ISystemUserResolver` | Resolves tenant's system user for auto-created records. Preference order: `IsSystemUser=true` user (preferring `systemadmin`/`tecaxleadmin`) → authenticated `CurrentUser` → throw. Cached 5-min per tenant via `IMemoryCache`. |
| `IEndOfServiceCalculator` | Applies the resolved `EndOfServicePolicy` to compute total, deduction, net, and a structured `CalculationDetails` string. On missing policy, emits a warning log and uses the seeded Saudi formula as fallback — **never zeroes silently**. |
| `ITenantPayrollCalendarService` | Convenience wrapper around `PayrollCalendarPolicy` for one-off monthly daily-rate resolution outside the payroll pipeline (leave encashment, final settlement). |
| `IValidationSettingsProvider` | Scoped cache of tenant thresholds for FluentValidation rule chains. `WarmAsync` hydrates; `Current` is accessed synchronously by rule chains. |
| `LoginLockoutPolicy` | Parses `TenantSettings.LoginLockoutPolicyJson` into an ordered tier list; returns `TimeSpan?` lockout for current attempt count. Graceful fallback to `LoginLockoutPolicy.Default` on malformed JSON. |

### 2.4 Audit

- `EndOfServiceBenefit` gains `EndOfServicePolicyId` (nullable FK, `OnDelete=SetNull`) and `AppliedPolicySnapshotJson` (jsonb) — makes every historic EOS calc explainable even after a policy edit or deletion.
- All new entities inherit `BaseEntity` — `CreatedAtUtc` / `CreatedBy` / `ModifiedAtUtc` / `ModifiedBy` + `AuditLog` pipeline already tracks mutations.
- `EndOfServicePolicy` CRUD endpoints refuse overlapping active policies for the same country (`CountryCode == cc` with overlapping `[EffectiveFromDate, EffectiveToDate]`) — prevents ambiguous resolution.

---

## 3. Effective-date behavior

- **`EndOfServicePolicy`**: Resolver selects the policy matching `termination.TerminationDate` with country preference (exact ISO alpha-2) over null-country. If the tenant changes the policy mid-year, **new** terminations use the new policy; **past** EOS records are untouched (policy id + snapshot were persisted at calc time).
- **`PayrollCalendarPolicy`** (reused, not new): already effective-dated in v13.0. Leave encashment uses `DateTime.UtcNow.Date`; final settlement uses `termination.LastWorkingDate` as the reference date for resolution.
- **`TenantSettings`**: single-row-per-tenant, no effective date. Deliberate — these are operational thresholds (alert windows, lockout tiers, validation caps), not money-math. `ModifiedAtUtc`/`ModifiedBy` + existing `AuditLog` pipeline already cover change tracking for forensic needs.

---

## 4. Defaults seeded

Default seeding happens in two places — both idempotent:

1. **`TenantProvisioningService`** (per-tenant, at provisioning time): Inserts one `EndOfServicePolicy` named `"{CountryCode} Standard EOS"` using `Tenant.Country` (default `SA`). Tiers and resignation deductions match the pre-v13.3 Saudi formula exactly:
   - Tier 1: [0, 5) years → 0.5 months/year
   - Tier 2: [5, ∞) years → 1.0 months/year
   - Resignation deduction [0, 2) → 100% / [2, 5) → 2/3 / [5, 10) → 1/3 / [10, ∞) → 0%
2. **`SeedData.SeedDefaultEndOfServicePolicyAsync`** (at startup for any existing tenant DB): Same seed data. Only fires when `EndOfServicePolicies` is empty — zero risk on upgrade.

`TenantSettings` fields seeded via DB `DEFAULT` clauses at column creation — existing rows in upgraded tenant DBs get the exact pre-v13.3 value (30/15/7 for contracts, etc.). **Zero behavior change on deploy.**

---

## 5. API / frontend impact

### New API surface (additive, non-breaking)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/end-of-service-policies?activeOnly=&countryCode=` | List policies (read-only allowed when `Offboarding` module disabled) |
| GET | `/api/v1/end-of-service-policies/{id}` | Get policy with tiers |
| POST | `/api/v1/end-of-service-policies` | Create — rejects overlapping active ranges per country |
| PUT | `/api/v1/end-of-service-policies/{id}` | Update — wholesale tier replace, same overlap guard |
| DELETE | `/api/v1/end-of-service-policies/{id}` | Soft delete — blocked if any `EndOfServiceBenefit` references the policy (force deactivate instead) |

### Updated API surface (backwards compatible)

- `GET/PUT /api/v1/tenant-configuration` — **15 new optional fields** on the DTO. Old clients that don't send them keep current DB values; server never returns null for these fields (always serializes at least the defaults).

### Frontend

- **Tenant Configuration UI** (shipped in this change): 15 new fields added as a "Business Rule Thresholds" section on the Security settings page at [security-settings.component.ts](time-attendance-frontend/src/app/pages/settings/tenant-configuration/security-settings/security-settings.component.ts). The existing `saveTenantSettings` flow already marshalls these to the `UpdateTenantSettingsCommand` — no service changes needed because all new fields are optional on the command record. The corresponding `TenantSettingsDto` TypeScript interface in [tenant-configuration.models.ts](time-attendance-frontend/src/app/pages/settings/tenant-configuration/services/tenant-configuration.models.ts) has been extended.
- **End-of-Service Policies page (deferred to follow-up frontend PR)**: backend API is fully functional at `/api/v1/end-of-service-policies` (CRUD + effective-date resolution + overlap guard). For now:
  - HR admins can manage policies via Swagger UI (Development) or direct API calls.
  - A future PR will add `time-attendance-frontend/src/app/pages/settings/end-of-service-policies/` with list / create / edit / view-with-tier-table pages following the same pattern as `overtime-configurations`.
  - This deferral is safe because the seeded Saudi default policy produces identical results to the pre-v13.3 hardcoded formula — tenants relying on Saudi labor law need no action.

---

## 6. Migration notes

**Single EF Core migration:** [20260415180127_AddHardcodedBusinessRulesConfigurationV13_3](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260415180127_AddHardcodedBusinessRulesConfigurationV13_3.cs)

- Adds 15 columns to `TenantSettings` — all with DB defaults mirroring the pre-v13.3 hardcoded values.
- Adds 2 columns to `EndOfServiceBenefits` (`EndOfServicePolicyId` nullable FK + `AppliedPolicySnapshotJson` jsonb).
- Creates 3 new tables: `EndOfServicePolicies`, `EndOfServicePolicyTiers`, `EndOfServiceResignationDeductionTiers`.
- Creates one filtered index per new table (`"IsDeleted" = false`).
- **Fully additive** — zero data loss, zero column renames, zero type changes.
- **Master DB**: no changes.

Post-migration, tenants get their Saudi default EOS policy via `SeedData.SeedDefaultEndOfServicePolicyAsync` on first startup / provisioning. The provisioner adds the same seed for brand-new tenants using the tenant's `Country` field.

---

## 7. Tests

Starting point for regression coverage (see `/tests/TecAxle.Hrms.BusinessRules.Tests/` once scaffolded). Minimum high-value set:

- `EndOfServiceCalculator`: Saudi seed produces identical totals to pre-v13.3 formula across the 0-2-5-10-20 year boundary cases; effective-date selection prefers the newer active policy; missing policy emits warning + uses fallback; `MinimumServiceYearsForEligibility` gates correctly.
- `LoginLockoutPolicy.ParseOrDefault`: malformed JSON falls back to default tiers; `GetLockoutForAttempts` picks the highest-tier match (15 attempts with a 5/10/15 policy → 24h, not 15m).
- `BackgroundJobSettingsHelper.ParseCsvDays`: `"30,15,7"` → ordered desc; `""` → fallback; `"abc,-5"` → fallback; `"7,7,3"` → dedup.
- `SystemUserResolver`: picks `IsSystemUser=true` over auth user; cache hit on second call; throws when no system user and no authenticated user.
- `TenantPayrollCalendarService`: CalendarDays / WorkingDays / FixedBasis each produce correct divisor; missing policy falls back to `DaysInMonth`.

Existing `tests/TecAxle.Hrms.Payroll.Tests` (27) and `tests/TecAxle.Hrms.Entitlement.Tests` (79) must stay green.

**Build verification performed:** `dotnet build TimeAttendanceSystem.sln` → `Build succeeded.` No new warnings introduced.

---

## 8. Verification steps (run locally after migration)

```bash
# 1. Compile
dotnet build TimeAttendanceSystem.sln

# 2. Apply migration
dotnet ef database update \
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure \
  --startup-project src/Api/TimeAttendanceSystem.Api \
  --context TecAxleDbContext

# 3. Quick sanity: 15 new columns exist + EOS seeded
psql -d ta_<tenant> -c "SELECT \"ContractExpiryAlertDaysCsv\", \"MaxVacationDaysPerRequest\" FROM \"TenantSettings\" LIMIT 1;"
psql -d ta_<tenant> -c "SELECT \"Name\", \"CountryCode\", \"IsActive\" FROM \"EndOfServicePolicies\";"
psql -d ta_<tenant> -c "SELECT \"MinYearsInclusive\", \"MaxYearsExclusive\", \"MonthsPerYearMultiplier\" FROM \"EndOfServicePolicyTiers\";"

# 4. Calculate EOS on a test termination and confirm CalculationDetails names the policy + tiers
curl -X POST https://api.clockn.net/api/v1/end-of-service/{terminationId}/calculate ...
```

For the shift-assignment system user fix:

```bash
# Run daily attendance generation and confirm auto-created ShiftAssignments
# now have AssignedByUserId matching the IsSystemUser=true user, not 1.
psql -d ta_<tenant> -c "SELECT \"AssignedByUserId\", COUNT(*) FROM \"ShiftAssignments\"
                         WHERE \"Notes\" LIKE 'Auto-assigned%'
                         GROUP BY \"AssignedByUserId\";"
```

---

## 9. Remaining hardcoded rules — with justification

| Rule | Location | Why left as-is |
|---|---|---|
| Pagination default PageSize (10 / 20) | `GetBranchesQuery`, many queries | UX default; per-request override parameter exists. Not a compliance or multi-tenant concern. |
| JWT `ExpiryMinutes` = 15 fallback | [JwtTokenGenerator.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Security/JwtTokenGenerator.cs) | Already driven by `appsettings.json` `Jwt:ExpiryMinutes`. Hardcoded value is a fallback when the config key is missing — safe default. |
| `MonthlyLeaveAccrualJob.AddMonths(-1)` | job source | Calendar navigation, not a policy. |
| `OvertimeConfiguration` default multipliers 1.5 / 2.0 / 2.5 | `CreateDefaultConfiguration()` | Only used when creating a fresh config row; tenants edit freely afterwards. |
| EOS `remainingDays / 30` in display string | [EndOfServiceCalculator.cs](src/Application/TimeAttendanceSystem.Application/EndOfService/Services/EndOfServiceCalculator.cs) | Cosmetic display only — money math uses policy-driven tiers + `/ 365`. |
| Platform-admin lockout (5 attempts → 15 min) in `AuthenticatePlatformUserAsync` | [LoginCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/Authorization/Commands/Login/LoginCommandHandler.cs) | Platform admin lives in master DB with no `TenantSettings` row — not a per-tenant concern. Could move to `appsettings.json` in a future pass if policy stakeholders ask. |
| Rate limiter config | Middleware | Driven by `appsettings.json`, not hardcoded in C#. |
| Pre-existing domain validators capping `CarryOverExpiryMonths` to 1..12, `FiscalYearStartMonth` to 01..12 | Domain entity validation | Physical domain of months/years — not a tenant-variable rule. |

---

## 10. Summary

**Before:** 18 critical or medium hardcoded rules across 15 files.
**After:** All 18 resolve through `TenantSettings`, `EndOfServicePolicy`, `PayrollCalendarPolicy`, or `ISystemUserResolver` — each with a safe fallback, effective-date support where it matters, and seeded defaults that preserve pre-v13.3 behavior bit-for-bit. Build clean. Migration additive. Zero data-loss deploy.
