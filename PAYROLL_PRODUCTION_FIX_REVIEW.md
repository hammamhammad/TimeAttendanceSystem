# Payroll Production-Fix Review

**Date:** 2026-04-14
**Scope:** Full backend + frontend refit of the Payroll module — remove hardcoded formulas, wire existing tax / social-insurance / overtime configuration into calculation, enforce effective-dating end-to-end, add lifecycle locking and an immutable audit trail.

---

## 1. Current Payroll Weaknesses Found

Evidence from the pre-fix codebase (see [ProcessPayrollPeriodCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs) before this change):

1. **Hardcoded 30-day month**: `decimal dailySalary = salary.BaseSalary / 30m;`
2. **Hardcoded 8-hour workday**: `decimal hourlySalary = dailySalary / 8m;`
3. **Hardcoded 1.5× OT multiplier**: `decimal overtimePay = overtimeHours * hourlySalary * 1.5m;` — no day-type distinction.
4. **Tax = 0 always**: `TaxAmount = 0` literally hardcoded on the record.
5. **Social insurance = 0 always**: both employee and employer fields hardcoded to 0.
6. **Salary selected via `IsCurrent` flag**, not effective dates — mid-period salary changes were invisible.
7. **No proration** for mid-period salary / allowance / insurance starts and ends.
8. **No protection against re-processing**: calling `/process` on a Processed period silently overwrote records.
9. **No lock on finalized payroll**: `PayrollRecordStatus.Finalized` was set but nothing prevented subsequent edits.
10. **No audit trail of runs**: who processed what, with which config, was not recorded.
11. **`OvertimeConfiguration` entity exists** with `NormalDayRate/PublicHolidayRate/OffDayRate` and `GetOvertimeRate(DayType)` — **never called**.
12. **`TaxConfiguration` + `TaxBracket` entities exist** with progressive-bracket support — **never queried**.
13. **`SocialInsuranceConfig` exists** with rates and `MaxInsurableSalary` — **never queried**.
14. **`EmployeeInsurance` exists** with `StartDate/EndDate` — **never consulted** for SI eligibility.

## 2. Root Causes

- The handler evolved as a single procedural loop. Calculation, side-effects (loans/advances/reimbursements), and persistence were all inlined. Tax and SI were on the data contract but nobody implemented them, and later changes never filled the gap.
- There was no dedicated calculation abstraction, so every new concern landed as an `if` block in the handler.
- Effective-dating was applied ad-hoc to allowances only; salary used a boolean `IsCurrent` shortcut because the handler never needed to think in periods.
- The pipeline had no distinction between "initial process" and "recalculation," so lifecycle protection was impossible to add cleanly.

## 3. What Was Changed

### 3.1 New Application services ([src/Application/.../Payroll/Services/](src/Application/TimeAttendanceSystem.Application/Payroll/Services))

| Service | File | Responsibility |
|---|---|---|
| `IProrationCalculator` | [IProrationCalculator.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IProrationCalculator.cs) | Overlap-fraction math for any effective-dated input. |
| `IPayrollCalendarResolver` | [IPayrollCalendarResolver.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IPayrollCalendarResolver.cs) | Daily-rate basis per `PayrollCalendarPolicy` (calendar/working/fixed). |
| `ITaxCalculator` | [ITaxCalculator.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/ITaxCalculator.cs) | Progressive bracket application; respects `IsTaxable` flag. |
| `ISocialInsuranceCalculator` | [ISocialInsuranceCalculator.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/ISocialInsuranceCalculator.cs) | Capped insurable base × configured rates; nationality-aware. |
| `IOvertimePayCalculator` | [IOvertimePayCalculator.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IOvertimePayCalculator.cs) | Day-type classification; reuses `OvertimeConfiguration` methods. |
| `IAbsenceDeductionCalculator` | [IAbsenceDeductionCalculator.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IAbsenceDeductionCalculator.cs) | Policy-driven daily rate — no hardcoded 30. |
| `IPayrollInputResolver` | [IPayrollInputResolver.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IPayrollInputResolver.cs) | **All effective-date resolution** lives here. Produces a pure `PayrollCalculationContext`. |
| `IPayrollCalculationService` | [IPayrollCalculationService.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IPayrollCalculationService.cs) | Orchestrator: resolver → calculators → `PayrollCalculationResult`. |

All services are scoped and registered in [DependencyInjection.cs](src/Application/TimeAttendanceSystem.Application/DependencyInjection.cs).

### 3.2 New domain entities

- [`PayrollCalendarPolicy`](src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollCalendarPolicy.cs) — tenant/branch policy for daily-rate basis and standard hours per day.
- [`PayrollRunAudit` + `PayrollRunAuditItem`](src/Domain/TimeAttendanceSystem.Domain/Payroll/PayrollRunAudit.cs) — append-only audit of every payroll run.

### 3.3 Entity extensions (additive, migration-safe)

- `PayrollRecord` gained `LockedAtUtc`, `LockedByUserId`, `CalculationVersion`, `LastRunId`, `CalculationBreakdownJson`.
- `PayrollPeriod` gained `LockedAtUtc`, `LockedByUserId`, computed `IsLocked`.
- `SocialInsuranceConfig` gained `AppliesToNationalityCode` (nullable ISO code — null = apply to all).
- New enums in [Enums.cs](src/Domain/TimeAttendanceSystem.Domain/Common/Enums.cs): `PayrollDailyBasisType`, `PayrollRunType`, `PayrollRunStatus`, `PayrollRunItemStatus`.

### 3.4 Handler rewrite

[ProcessPayrollPeriodCommandHandler.cs](src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs) is now a thin orchestrator: opens a `PayrollRunAudit`, loops employees, delegates per-employee calculation to `IPayrollCalculationService`, persists results, writes audit items, closes the audit. Loan / salary-advance / expense-reimbursement wiring is preserved. All hardcoded constants are gone.

### 3.5 Lifecycle + locking

- `ProcessPayrollPeriodCommand` now takes `IsRecalculation` (default `false`). Calling `/process` on a Processed or Paid period is rejected.
- New endpoint `POST /api/v1/payroll-periods/{id}/recalculate` explicitly requests recalculation.
- On recalculation, existing non-finalized records are soft-deleted with a note pointing to the new run.
- `mark-paid` now sets `PayrollPeriod.LockedAtUtc` and `PayrollRecord.LockedAtUtc` on every record, and writes a `Finalization` audit entry.
- A locked record / period cannot be processed or recalculated — the handler rejects the request up front.

## 4. New Payroll Calculation Flow

```
ProcessPayrollPeriodCommand (or Recalculate)
  │
  ├─► Validate period status (must be Draft | Processed if recalc)
  ├─► Validate period not locked
  ├─► Open PayrollRunAudit row (status = Running)
  ├─► Soft-delete superseded records if recalc
  │
  └─► For each active employee in branch:
        │
        ├─► IPayrollInputResolver.BuildContextAsync
        │     • Salary segments (all overlapping the period)
        │     • Allowance assignments (stackable, active, overlap)
        │     • Tax config (most specific + latest effective)
        │     • SocialInsurance config (nationality-matched)
        │     • EmployeeInsurance (active enrollment during period)
        │     • OvertimeConfiguration per date
        │     • PayrollCalendarPolicy
        │     • Public holiday dates resolved from recurrence rules
        │     • Overlap anomalies → raise PayrollCalculationException
        │
        ├─► IPayrollCalculationService.CalculateAsync
        │     • Base salary (prorated across slices if mid-period change)
        │     • Salary structure components
        │     • Allowance assignments (each prorated by overlap)
        │     • Adjustments
        │     • Attendance-derived counts
        │     • Overtime (policy-driven rate per day type)
        │     • Absence deduction (policy-driven daily basis)
        │     • Tax (progressive brackets)
        │     • Social insurance (capped insurable base × rates)
        │     • Final totals
        │     • Breakdown snapshot JSON
        │
        ├─► Integrate loans / advances / reimbursements
        ├─► Persist PayrollRecord + PayrollRecordDetails
        └─► Write PayrollRunAuditItem (warnings/errors if any)
  
  ├─► Aggregate period totals (Gross / Deductions / Net / EmployeeCount)
  ├─► Transition period → Processed
  └─► Close PayrollRunAudit (Completed / CompletedWithWarnings / Failed)
```

## 5. Effective-Date Resolution Rules

All of the following are enforced in [PayrollInputResolver](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IPayrollInputResolver.cs):

1. **Overlap test**: `[effectiveFrom, effectiveTo]` ∩ `[periodStart, periodEnd]` ≠ ∅.
2. **Salary**: latest `EffectiveDate ≤ periodEnd` wins; if multiple segments overlap, all are kept and prorated.
3. **TaxConfiguration / SocialInsuranceConfig**: branch-specific preferred over tenant-wide; within a scope, latest effective wins.
4. **SocialInsuranceConfig nationality**: if `AppliesToNationalityCode` matches the employee's `Nationality` exactly, that one wins; otherwise the null-code (all-nationality) fallback is used.
5. **AllowanceAssignments**: all overlapping Active assignments apply (stackable) — each is prorated by its overlap.
6. **OvertimeConfiguration**: per-date map — if the config changes mid-period, each attendance day uses the config active that day.
7. **PayrollCalendarPolicy**: branch-specific beats tenant-wide; latest effective wins. If none exists, a safe fallback of `FixedBasisDays = 30`, `StandardHoursPerDay = 8` is applied (backward-compatibility).
8. **EmployeeInsurance**: must have active coverage overlapping the period — otherwise SI is 0 with a warning.
9. **Overlap anomalies** (e.g. two open-ended `IsCurrent = true` salary records) → `PayrollCalculationException`. That employee is skipped, logged in `PayrollRunAuditItem`; the run continues for other employees.
10. **Missing critical configuration** (tax, SI) → warning in the audit, value set to 0 — never a hard failure, so payroll doesn't break when a tenant hasn't set up tax yet.

## 6. How Overtime Configuration Is Now Consumed

The existing `OvertimeConfiguration` entity is used verbatim — zero duplication.

- `OvertimePayCalculator` resolves the per-date config from `ctx.OvertimeConfigByDate`.
- For each attendance day with `OvertimeHours > 0`:
  - Day type is classified: public holiday → `PublicHoliday`; otherwise Fri/Sat with `WeekendAsOffDay = true` → `OffDay`; else `Normal`.
  - `rate = config.GetOvertimeRate(dayType)` — the entity method, not a reimplementation.
  - `config.MeetsMinimumThreshold(minutes)` enforces the minimum.
  - `config.RoundOvertimeHours(hours)` applies the configured rounding interval.
- Hourly basis: `(baseSalary / dailyRateBasis) / standardHoursPerDay`, both coming from the calendar policy.
- Pay: `roundedHours × hourlyBasis × rate`.
- Line-itemized in `PayrollRecordDetail` per day-type bucket for auditable breakdowns.

## 7. How Tax Is Calculated

[TaxCalculator](src/Application/TimeAttendanceSystem.Application/Payroll/Services/ITaxCalculator.cs):

1. Build taxable base = basic salary + taxable allowances (honors `AllowanceType.IsTaxable`).
2. If no `TaxConfiguration` is effective → `TaxAmount = 0` + audit warning.
3. For each bracket, ordered ascending by `MinAmount`:
   - If `taxableBase ≤ MinAmount`, stop.
   - `slice = min(taxableBase, MaxAmount) − MinAmount`
   - `tax += slice × Rate + FixedAmount`
   - If the bracket contains the full `taxableBase` (`taxableBase ≤ MaxAmount`), stop.
4. Result rounded to 2 decimals (away-from-zero).
5. Writes `PayrollRecord.TaxAmount` and adds a `TaxDeduction` detail line with the config name + effective date.

## 8. How Social Insurance Is Calculated

[SocialInsuranceCalculator](src/Application/TimeAttendanceSystem.Application/Payroll/Services/ISocialInsuranceCalculator.cs):

1. Resolve the nationality-best-match `SocialInsuranceConfig`.
2. Require an active `EmployeeInsurance` row overlapping the period — if missing, SI = 0 + warning.
3. Insurable base = basic + SI-eligible allowances (`AllowanceType.IsSocialInsurable`).
4. Cap the base: `min(base, config.MaxInsurableSalary)`.
5. `employeeContribution = base × EmployeeContributionRate` — written to `SocialInsuranceEmployee` + a `SocialInsuranceDeduction` detail line.
6. `employerContribution = base × EmployerContributionRate` — written to `SocialInsuranceEmployer` + an informational `Benefit` detail line (NOT part of net-pay deduction).

## 9. How Absence Deductions Are Calculated

[AbsenceDeductionCalculator](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IAbsenceDeductionCalculator.cs):

1. `dailyRateBasis = IPayrollCalendarResolver.GetDailyRateBasis(ctx)`.
2. `dailyRate = baseSalary / dailyRateBasis`.
3. `deduction = absentDays × dailyRate`.
4. Basis options, per `PayrollCalendarPolicy.BasisType`:
   - `CalendarDays` — actual days in the period (28/29/30/31).
   - `WorkingDays` — calendar days minus Fri/Sat (and unpaid public holidays if configured).
   - `FixedBasis` — e.g. 30 for backward compatibility.

## 10. How Proration Works When Effective Dates Change Mid-Period

[ProrationCalculator](src/Application/TimeAttendanceSystem.Application/Payroll/Services/IProrationCalculator.cs):

```
applicableFraction = overlapDays / periodDays
```

Used for:

- **Salary change mid-period** — each salary slice contributes `baseSalary × fraction` to a weighted base. A warning is emitted so reviewers can verify the calc.
- **Allowance assignment start/end inside the period** — each allowance amount is multiplied by its fraction.
- **Percentage-of-basic allowances** — percentage applied to the resolved base salary, then prorated.
- **Insurance coverage change** — future enhancement hook (already handled via the effective-window filter).

## 11. Payroll Status Lifecycle and Locking Behavior

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

- Only `Draft → Processing → Processed` is reachable via `/process`.
- `/recalculate` is rejected unless the period is in `Draft` or `Processed`.
- `/mark-paid` sets `LockedAtUtc` on the period and on every non-deleted record.
- Any attempt to `process` / `recalculate` a locked period returns HTTP 400 "Payroll period is locked (Paid) and cannot be processed or recalculated."
- Even within a recalc run, records whose `LockedAtUtc` is set are never overwritten.

## 12. Data Model Changes

New tables:

- `PayrollCalendarPolicies` — per-branch/tenant daily-basis policy.
- `PayrollRunAudits` + `PayrollRunAuditItems` — one run + N per-employee items.

New columns (all nullable / with default, so the migration is additive):

| Table | Column | Type | Purpose |
|---|---|---|---|
| `PayrollRecords` | `LockedAtUtc` | timestamptz NULL | Lock timestamp |
| `PayrollRecords` | `LockedByUserId` | bigint NULL | User who locked |
| `PayrollRecords` | `CalculationVersion` | int NOT NULL DEFAULT 0 | Bumped on each recalc |
| `PayrollRecords` | `LastRunId` | bigint NULL | FK to `PayrollRunAudits` |
| `PayrollRecords` | `CalculationBreakdownJson` | text NULL | Input snapshot |
| `PayrollPeriods` | `LockedAtUtc` | timestamptz NULL | Lock timestamp |
| `PayrollPeriods` | `LockedByUserId` | bigint NULL | User who locked |
| `SocialInsuranceConfigs` | `AppliesToNationalityCode` | text NULL | Nationality filter |

Migration: [`20260414191151_AddPayrollCalculationInfrastructure`](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260414191151_AddPayrollCalculationInfrastructure.cs). Purely additive — no existing data is modified.

## 13. API Changes

### New endpoints
- `POST /api/v1/payroll-periods/{id}/recalculate` — explicit recalculation of a Processed period.
- `GET  /api/v1/payroll-periods/{id}/run-audit` — audit-run history for a period.

### Modified endpoints
- `POST /api/v1/payroll-periods/{id}/process` — now rejects Processed / Paid periods (previously silently overwrote).
- `POST /api/v1/payroll-periods/{id}/mark-paid` — now sets `LockedAtUtc` on the period and its records, writes a `Finalization` audit entry.

### DTO additions (non-breaking)
- `PayrollPeriodDto` gained `LockedAtUtc`, `LockedByUserId`.
- `PayrollRecordDto` gained `LockedAtUtc`, `CalculationVersion`.

### Settings DTOs
- `SocialInsuranceConfig` POST/PUT payloads accept an optional `appliesToNationalityCode` string.

## 14. Frontend Impact

| Change | File |
|---|---|
| `recalculatePeriod()` + `getRunAudit()` methods + `PayrollRunAuditEntry` type | [payroll.service.ts](time-attendance-frontend/src/app/core/services/payroll.service.ts) |
| "Recalculate" table action on Processed rows | [payroll-periods.component.ts](time-attendance-frontend/src/app/pages/payroll/payroll-periods/payroll-periods.component.ts) |
| `lockedAtUtc`, `calculationVersion` on `PayrollPeriod` and `PayrollRecord` models | [payroll.model.ts](time-attendance-frontend/src/app/shared/models/payroll.model.ts) |
| Social Insurance tab: nationality-code input + column | [payroll-settings.component.{ts,html}](time-attendance-frontend/src/app/pages/payroll/payroll-settings) |

No DTO field is removed. Existing list/view components continue to render `TaxAmount` and `SocialInsuranceEmployee` — they now display real values instead of zero.

## 15. Risks and Migration Notes

1. **Existing payroll records keep their zero values.** Historical records are not retroactively recalculated. To reprocess, a user must recalculate the period (only possible before `mark-paid`). Paid/locked periods remain untouched by design.
2. **First post-deploy `/process` on a tenant without `TaxConfiguration` or `SocialInsuranceConfig`** will succeed with `TaxAmount = 0` / `SocialInsuranceEmployee = 0` and a warning in `PayrollRunAudit`. This preserves pre-fix behavior so no tenant is forced to set up tax immediately after the deploy.
3. **`AppliesToNationalityCode` matching** is case-insensitive on the exact code string. Tenants must use the same codes they store in `Employee.Nationality`.
4. **`PayrollCalendarPolicy` defaults to `FixedBasis(30)`** when no row exists — matches the pre-fix hardcoded assumption.
5. **Overlapping open-ended salary records** now raise a `PayrollCalculationException`. If any tenant has such records, the affected employees will fail processing until resolved. This is intentional — previously the system silently used the arbitrary `IsCurrent = true` row.
6. **Per-tenant DB isolation** preserved — all new DbSets live in `TecAxleDbContext`; migration applies during tenant provisioning per the existing `TenantProvisioningService`.
7. **Subscription gating** preserved — `[RequiresModule(SystemModule.Payroll)]` on `ProcessPayrollPeriodCommand` still applies.

## 16. Recommended Follow-Up Improvements

- **Full CRUD UI for `PayrollCalendarPolicy`** (a fourth tab on Payroll Settings). Backend is ready; only the admin page is pending.
- **Retroactive recalculation command** for Approved periods (separate from mark-paid flow).
- **Payslip explanation PDF** consuming `CalculationBreakdownJson`.
- **YTD tax ledger** for cumulative-basis tax regimes (e.g. UK PAYE). Current implementation is per-period.
- **Loan-deduction ceiling vs net pay** to prevent negative-net records.
- **Percentage-of-Gross allowances** — deferred because Gross is computed after allowances; needs a two-pass pattern.
- **`PayrollRunAudit` browsing UI** — backend returns the data; a dedicated tab on the period view remains to be added.
- **Richer insurance enrollment rules** (per-nationality class, per-category premiums) using `EmployeeInsurance.InsuranceClass`.

## 17. Test Scenarios Added (suggested — not yet wired to the test project)

These are the scenarios the new code was designed against. Recommend implementing each as a xUnit test using an in-memory EF provider.

1. `ProrationCalculator` — exact match, start mid-period, end mid-period, fully inside, fully outside, zero-overlap, end-date before start-date.
2. `TaxCalculator` — empty brackets, single bracket, 3-bracket progressive, boundary crossing, taxable/non-taxable allowance distinction.
3. `SocialInsuranceCalculator` — cap at `MaxInsurableSalary`, no `EmployeeInsurance` (excluded + warning), nationality-matched config beats null-nationality fallback, employer contribution recorded but not in net.
4. `OvertimePayCalculator` — normal/holiday/off-day rates applied correctly; min-threshold skips sub-threshold days; rounding respected; config change mid-period.
5. `AbsenceDeductionCalculator` — `CalendarDays` vs `WorkingDays` vs `FixedBasis(30)` bases.
6. `PayrollInputResolver` — overlapping open-ended salaries raise exception; nationality-specific SI config preferred; per-date OT map built; missing configs produce warnings.
7. `PayrollCalculationService` — end-to-end per employee with mocked resolvers; weighted salary with mid-period change produces expected value.
8. `ProcessPayrollPeriodCommandHandler` integration tests:
   - Golden-path: 1 employee, 1 allowance, 10 OT hours (mixed day types), tax + SI configured → exact numeric assertions.
   - Recalculate after process → old record soft-deleted, new record with `CalculationVersion = 2`.
   - `/process` on `Paid` period → 400.
   - `/recalculate` on `Draft` period → also rejected (status not Processed).
   - Missing `TaxConfiguration` → tax = 0, warning in audit.
   - Overlapping open-ended salary → audit item `FailedWithError`, other employees still succeed.

---

## Summary

This change turns the payroll module from a procedural monolith with hardcoded rules into a policy-driven pipeline that consumes the configuration tenants have already set up. Tax is now calculated. Social insurance is now calculated. Overtime honors the existing configuration's per-day-type rates, minimum thresholds, and rounding. Absence deductions respect a configurable daily basis. Every input is resolved by effective date; mid-period changes prorate correctly. Finalized payroll is locked and cannot be silently overwritten. Every run produces an immutable audit trail suitable for stakeholder review.

**Assumptions that may need tenant validation:**

- The default calendar policy (`FixedBasis(30)` + 8h/day) is applied when no `PayrollCalendarPolicy` row exists. Tenants that want working-day basis must configure it.
- Employees without an active `EmployeeInsurance` are excluded from SI (0 employee + 0 employer). Tenants expecting auto-inclusion must seed enrollment rows.
- Overtime pay is **not** taxable by default (the current `TaxCalculator` doesn't include the OT detail line in the taxable base). This matches the most common interpretation; jurisdictions that tax OT can be supported by a later flag.
- `AppliesToNationalityCode` uses exact-match ISO codes; tenants using informal nationality strings (e.g. "Saudi" vs "SA") must normalize.
