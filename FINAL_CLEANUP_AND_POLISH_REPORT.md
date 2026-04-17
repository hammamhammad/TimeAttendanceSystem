# Final Cleanup & Polish Report (v14.7)

**Status**: Delivered
**Date**: 2026-04-17
**Scope**: one disciplined consolidated cleanup pass across legacy compatibility,
CI/test reliability, frontend test debt, route/label polish, dead metadata,
and post-v14 naming consistency. Closes the outstanding follow-ups recorded
after Phases 1–6.

---

## 1. `SalaryAdvance.DeductionMonth` — **FULLY REMOVED**

Phase 6 sign-off left the field write-frozen with a legacy back-compat read
path. Phase 7 finishes the job: the field is gone from code *and* schema.

### Audit outcome (before removal)
- **9 active C# read sites** — all pure legacy-fallback branches (executor
  back-fill, two payroll-handler matching fallbacks, one portal projection, one
  admin-controller projection, one EF-config index).
- **5 frontend usages** — one model interface, two occurrences; one create form,
  one view component, one list column.
- **1 EF index** (`IX_SalaryAdvances_DeductionMonth`).
- **0 new writes** in the whole codebase — confirmed after Phase 6.

### What shipped
- **Entity**: `DeductionMonth` property removed from
  [src/Domain/TimeAttendanceSystem.Domain/Loans/SalaryAdvance.cs](src/Domain/TimeAttendanceSystem.Domain/Loans/SalaryAdvance.cs).
- **EF config**: dropped the `IX_SalaryAdvances_DeductionMonth` single-column
  index; replaced with a composite `IX_SalaryAdvances_DeductionRange` over
  `(DeductionStartDate, DeductionEndDate)` in
  [SalaryAdvanceConfiguration.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/SalaryAdvanceConfiguration.cs).
- **Executor**: legacy-YYYYMM back-fill path removed from
  [SalaryAdvanceExecutor.cs](src/Application/TimeAttendanceSystem.Application/Features/ApprovalExecution/SalaryAdvanceExecutor.cs).
  When a caller omits the date range, the executor now defaults to the first
  calendar month after `ApprovedAt`.
- **Payroll handler**: the two YYYYMM fallback branches in
  [ProcessPayrollPeriodCommandHandler.IntegrateSalaryAdvancesAsync](src/Application/TimeAttendanceSystem.Application/PayrollPeriods/Commands/ProcessPayrollPeriod/ProcessPayrollPeriodCommandHandler.cs)
  and `LinkIntegrationsAsync` are gone. The unused `periodMonth` computation is
  gone too.
- **Controllers**: `CreateSalaryAdvanceRequest.DeductionMonth` already removed
  in Phase 6 (input); Phase 7 also dropped the projection from
  [SalaryAdvancesController](src/Api/TimeAttendanceSystem.Api/Controllers/SalaryAdvancesController.cs)
  response DTOs and from the portal read handler at
  [PortalController.cs:2998](src/Api/TimeAttendanceSystem.Api/Controllers/PortalController.cs).
- **Frontend**: `deductionMonth` removed from
  [loan.model.ts](time-attendance-frontend/src/app/shared/models/loan.model.ts)
  (`SalaryAdvanceDto` and `CreateSalaryAdvanceRequest`), the create form
  replaced with a date-range pair in
  [create-advance.component.ts/.html](time-attendance-frontend/src/app/pages/loans/salary-advances/create-advance),
  the list column updated in
  [salary-advances.component.ts](time-attendance-frontend/src/app/pages/loans/salary-advances/salary-advances.component.ts),
  the view page updated in
  [view-advance.component.ts](time-attendance-frontend/src/app/pages/loans/salary-advances/view-advance/view-advance.component.ts)
  to render the range instead of the integer.
- **i18n**: `deduction_start_date`, `deduction_end_date`, `deduction_range`
  keys added in English and Arabic.

### Data-preserving schema migration
[20260417152940_RemoveDeductionMonth.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260417152940_RemoveDeductionMonth.cs)
has three ordered steps:

1. **Back-fill** — a single `UPDATE` materialises `DeductionStartDate` /
   `DeductionEndDate` from any remaining DeductionMonth-only rows using
   `MAKE_TIMESTAMPTZ((YYYYMM / 100), (YYYYMM % 100), 1, 0, 0, 0, 'UTC')`,
   defensively guarded against invalid YYYYMM values. After this step, **every
   pre-Phase-7 row has a valid date range**.
2. **DropIndex** `IX_SalaryAdvances_DeductionMonth`.
3. **DropColumn** `DeductionMonth`; create the new
   `IX_SalaryAdvances_DeductionRange` composite index.

`Down` reverses all three in the opposite order (re-adds column and index;
note it cannot re-populate the legacy YYYYMM — that's acceptable because the
column drops only after back-fill).

Applied to the dev DB:
```sql
SELECT column_name FROM information_schema.columns
WHERE table_name='SalaryAdvances' AND column_name LIKE 'Deduction%';
-- DeductionStartDate, DeductionEndDate   (no DeductionMonth)

SELECT indexname FROM pg_indexes WHERE tablename='SalaryAdvances' AND indexname LIKE 'IX_SalaryAdvances_Deduction%';
-- IX_SalaryAdvances_DeductionRange
```

### Tests
- **Rewrote** [Phase6DeprecationTests.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase6DeprecationTests.cs):
  - `SalaryAdvance_entity_has_no_DeductionMonth_property` (reflection pin)
  - `SalaryAdvanceExecutor_defaults_to_month_after_approval_when_dates_missing`
  - `SalaryAdvanceExecutor_preserves_caller_supplied_date_range`
- **Updated** [Phase4Tests.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase4Tests.cs)
  and [Phase2Tests.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase2Tests.cs)
  to use the date-range fields.
- **Deleted** the obsolete `SalaryAdvance_executor_backfills_date_range_from_legacy_yyyymm`
  test from [Phase1ApprovalExecutionTests.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase1ApprovalExecutionTests.cs)
  with an explanatory comment.

**Sign-off**: `DeductionMonth` is **fully removed** — no code reads or writes
it, the schema column is dropped, no migration or admin UI or DTO carries it.

---

## 2. CI-ready Postgres integration path

### Diagnosed issues in pre-existing CI
- [.github/workflows/ci.yml](.github/workflows/ci.yml) referenced
  `./src/TimeAttendanceSystem.sln` — a path that **does not exist** (the sln is
  at repo root). The test step was silently broken.
- The single `backend-build` job mixed unit and integration tests with no
  Postgres service container, so Phase 6's `PostgresRequiredFact` tests always
  skipped.

### What shipped
Rewrote CI with three jobs and fixed the sln path:

| Job | Postgres? | What it runs |
|---|---|---|
| **backend-unit** | no | `dotnet test ./TimeAttendanceSystem.sln` — Postgres-gated tests auto-skip because `HRMS_INTEGRATION_DB` is unset. |
| **backend-integration** | **yes** — Postgres 18 service container | `dotnet test ... --filter "FullyQualifiedName~PayrollTransactionRollbackTests"` with `HRMS_INTEGRATION_DB` set to the service container. |
| **frontend** | no | `npm ci` + `npm run build` + `npm run test -- --watch=false --browsers=ChromeHeadless`. |

The Postgres job uses the official `postgres:18` image with `pg_isready` health
checks so the test runner doesn't race the server startup.

### Dev scripts
New in [scripts/](scripts/) — executable bash wrappers with PowerShell
companions so Windows contributors aren't stuck:

| Script | Purpose |
|---|---|
| [scripts/test-backend-unit.sh](scripts/test-backend-unit.sh) | Unit tests, force-unsets `HRMS_INTEGRATION_DB` for predictable skip. |
| [scripts/test-backend-integration.sh](scripts/test-backend-integration.sh) | Postgres-backed tests, honors env-var, falls back to dev Postgres. |
| [scripts/test-frontend.sh](scripts/test-frontend.sh) | Karma headless. |
| [scripts/test-all.sh](scripts/test-all.sh) | All three in sequence. |
| [scripts/test-all.ps1](scripts/test-all.ps1) | PowerShell equivalent. |

### Documentation
Added a dedicated **🧪 Testing** section to [README.md](README.md) explaining
the three layers, which scripts to run, what `HRMS_INTEGRATION_DB` does, and
how CI wires them up. Kept the pre-existing manual-smoke checklist as a
sub-section.

---

## 3. Pre-existing frontend spec failures — **FIXED**

Both failing specs predated Phase 6. They are now both green.

### `StatusBadgeComponent`
The original spec queried `.badge` (Bootstrap); the actual component renders
`.erp-badge` (the ERP design system). It also asserted the textContent contained
`"Approved"` literally — but the component runs the status name through
`I18nService.t(i18nKey)` to get a localized label, so the raw string never
appears. Fixed by:
- Injecting an `I18nService` stub whose `t(key)` echoes the key back.
- Querying the correct selector `.erp-badge`.
- Expanding the spec: 4 assertions now cover known-status render, raw-string
  fallback, and the explicit-label override.

[status-badge.component.spec.ts](time-attendance-frontend/src/app/shared/components/status-badge/status-badge.component.spec.ts)

### `App` component
The spec expected `querySelector('h1')?.textContent === 'Hello, time-attendance-frontend'`
— leftover from `ng new`. The real `App` template is a single
`<router-outlet />`. Fixed by:
- Providing `provideRouter([])` and an `I18nService` stub.
- Clearing `localStorage.app_locale` in `beforeEach`.
- Replacing the Hello-World assertion with three meaningful checks:
  the component instantiates, the `<router-outlet>` renders, and the locale
  defaults to `'en'` when localStorage is empty.

[app.spec.ts](time-attendance-frontend/src/app/app.spec.ts)

### Frontend spec status

```
Chrome Headless 146.0.0.0 (Windows 10): Executed 12 of 12 SUCCESS
TOTAL: 12 SUCCESS
```

12 passing specs across 3 files (status-badge: 4, App: 3, topbar omnibox: 5).

---

## 4. Company-config route polish

Canonical route is now `/settings/company-config`; the legacy
`/settings/tenant-config` path becomes a permanent redirect preserving child
segments and bookmarks.

### What shipped
- [app.routes.ts](time-attendance-frontend/src/app/app.routes.ts):
  - New parent route `settings/company-config` with the same component and
    7 child routes (general, attendance, leave, approval, notification, mobile,
    security).
  - Legacy-alias line `{ path: 'settings/tenant-config', redirectTo: 'settings/company-config' }`
    — Angular's prefix-redirect preserves sub-paths (e.g.
    `/settings/tenant-config/attendance` → `/settings/company-config/attendance`).
- [menu.service.ts](time-attendance-frontend/src/app/core/menu/menu.service.ts):
  menu entry now points at `/settings/company-config`.
- CSS class renamed `tenant-config-page` → `company-config-page` in the
  configuration component's [template](time-attendance-frontend/src/app/pages/settings/company-configuration/company-configuration.component.html)
  and [styles](time-attendance-frontend/src/app/pages/settings/company-configuration/company-configuration.component.css).

### Deliberately kept
The i18n key block `tenant_configuration.*` was **not** renamed — it holds 60+
keys used across 8 child components; renaming would be a pure cosmetic churn
that doesn't improve the operator-visible label (which is already "Company
Configuration"). The key-name is invisible to users.

---

## 5. Dead metadata removal

### Route `module:` entries — **fully swept**
The Phase 6 report flagged `module: 'TimeAttendance'` + `moduleStrict: true`
metadata as pure remnants of the v14.0-removed entitlement layer. Final count
before cleanup: **304 lines** of dead metadata in
[time-attendance-frontend/src/app/app.routes.ts](time-attendance-frontend/src/app/app.routes.ts).

Cleaned in three targeted passes:
1. Delete standalone `module: 'XXX',` lines.
2. Strip inline `module: 'XXX', moduleStrict: true,` segments from combined lines.
3. Delete standalone `moduleStrict: true,` lines.

**After cleanup**: `grep -c "module:" app.routes.ts` → `0`;
`grep -c "moduleStrict" app.routes.ts` → `0`. Frontend build stays green.

### Dead `cardModuleMap` in dashboard
[dashboard.component.ts](time-attendance-frontend/src/app/pages/dashboard/dashboard.component.ts:40-48)
contained a `cardModuleMap` that referenced the removed `SystemModule`
entitlement names. Zero readers. Removed — replaced with a one-line comment
explaining the history.

---

## 6. Small UX polish

### Omnibox: URL sync + Escape-to-clear
- The topbar's omnibox now **mirrors the `?q=` query-param** of the currently
  active route when it's the global-search page. Navigating from a result row
  back to the search page keeps the query visible in the omnibox.
- **Escape key** on the omnibox clears the input — small but noticeable.
- Implementation: [topbar.component.ts](time-attendance-frontend/src/app/layout/topbar/topbar.component.ts)
  subscribes to `Router.events.NavigationEnd` with a type-narrowed filter and
  reads `queryParamMap.get('q')` from the deepest matched route when the URL
  starts with `/global-search`. Template: `(keydown.escape)="searchQuery.set('')"`.

### Preserved
The global-search page already has loading, empty, and error states (Phase 4).
No redesign needed.

---

## 7. Final consistency pass

- **`ITenantPayrollCalendarService` → `ICompanyPayrollCalendarService`**:
  interface + implementation + file + DI registration + two call sites
  (`CalculateFinalSettlementCommandHandler`,
  `CreateLeaveEncashmentCommandHandler`) all renamed consistently. Doc comment
  updated ("tenant-wide fallback" → "company-wide fallback") in
  [ICompanyPayrollCalendarService.cs](src/Application/TimeAttendanceSystem.Application/Payroll/Services/ICompanyPayrollCalendarService.cs).
- The remaining "multi-tenant" comments in controllers/handlers (~30 occurrences)
  describe **branch-scoped** data-access patterns and are still technically
  accurate; I did not churn those because the mass-rewrite is low value and
  high noise. Anyone new to the codebase gets the right mental model from
  [CLAUDE.md](CLAUDE.md) (single-company architecture section).

---

## 8. Tests + verification

### Final suite status

| Project | Passed | Failed | Skipped | Total |
|---|---|---|---|---|
| `TecAxle.Hrms.Payroll.Tests` | 27 | 0 | 0 | 27 |
| `TecAxle.Hrms.BusinessRules.Tests` | 31 | 0 | 0 | 31 |
| `TecAxle.Hrms.LifecycleAutomation.Tests` | **91** | 0 | 0 | 91 |
| &nbsp;&nbsp;↳ `PayrollTransactionRollbackTests` (real Postgres) | 3 | 0 | 0 | 3 |
| `TecAxle.Hrms.Workflow.Tests` | 18 | 0 | 0 | 18 |
| **Backend total** | **167** | **0** | **0** | **167** |
| Frontend Karma | **12** | **0** | **0** | **12** |

### Tests added / updated in this phase

| File | Change |
|---|---|
| `Phase6DeprecationTests.cs` | Rewritten for Phase 7 — entity-shape pin + 2 runtime tests for new default-window behavior. |
| `Phase4Tests.cs` | Legacy YYYYMM back-fill test replaced with the new default-window test. |
| `Phase1ApprovalExecutionTests.cs` | Obsolete back-fill test deleted with explanatory comment. |
| `Phase2Tests.cs` | Seed uses date range instead of `DeductionMonth`. |
| `status-badge.component.spec.ts` | Selector + i18n fix; expanded to 4 assertions. |
| `app.spec.ts` | Rewritten against the real `<router-outlet />` shell + i18n init. |

---

## 9. Schema changes summary

| Migration | Up | Down |
|---|---|---|
| `20260417152940_RemoveDeductionMonth` | Back-fill `DeductionStartDate`/`EndDate` from legacy YYYYMM → DropIndex `IX_SalaryAdvances_DeductionMonth` → DropColumn `DeductionMonth` → CreateIndex composite `IX_SalaryAdvances_DeductionRange` | Drop composite index → AddColumn `DeductionMonth` (int default 0) → CreateIndex single-column |

Applied cleanly to the dev DB. `__EFMigrationsHistory` now has:

```
20260416163539_Initial
20260417121022_RenameTenantSettingsToCompanySettings
20260417131611_RemoveLegacyAutoCheckoutSettings
20260417152940_RemoveDeductionMonth
```

---

## 10. Verification checklist

| Objective | Status | Notes |
|---|---|---|
| 1. Fully retire `SalaryAdvance.DeductionMonth` | **Fully completed** | Code, entity, index, schema, frontend, tests — all cleaned. Data-preserving migration back-fills first. |
| 2. CI-ready Postgres integration path | **Fully completed** | Three-job workflow, fixed sln path, dev scripts (bash + PowerShell), README documentation. |
| 3. Fix pre-existing frontend spec failures | **Fully completed** | Both specs rewritten to match real component APIs. 12/12 passing. |
| 4. Company-config route polish | **Fully completed** | Canonical path is `/settings/company-config`, legacy path redirects. i18n keys deliberately left untouched (documented). |
| 5. Dead metadata removal | **Fully completed** | 304 `module:`/`moduleStrict:` entries and `cardModuleMap` gone. |
| 6. Small UX polish | **Fully completed** | Omnibox URL sync + Escape-to-clear. |
| 7. Final consistency pass | **Partially completed — intentional** | `ITenantPayrollCalendarService` renamed. ~30 "multi-tenant" comments in handlers intentionally left; they describe branch-scoping accurately and a sweep would be high-noise/low-value. |
| 8. Tests + verification | **Fully completed** | 167 backend passing + 12 frontend passing, all green. Integration tests gated by `PostgresRequiredFact` auto-skip behavior. |

---

## 11. Sign-off language

- **`DeductionMonth` is FULLY REMOVED.** No C# code reads or writes it, no
  frontend model or template references it, the `DeductionMonth` column and
  `IX_SalaryAdvances_DeductionMonth` index are dropped from the database,
  and the migration's back-fill step ensures no historical row loses its
  deduction window. Reintroducing the field would require a new migration
  and a compile-failing entity change — pinned by
  `Phase6DeprecationTests.SalaryAdvance_entity_has_no_DeductionMonth_property`.
- **Integration coverage** (real-Postgres): 3 tests in
  `PayrollTransactionRollbackTests` run against a per-test disposable
  database with real transactions, FK constraints, and the full migration chain.
- **Unit coverage** (no Postgres): 164 tests across all 4 test projects. The
  `PostgresRequiredFact` attribute auto-skips the 3 integration tests when
  neither `HRMS_INTEGRATION_DB` nor the dev cluster is reachable.
- **Frontend coverage**: 12 Karma specs passing — 5 for the topbar omnibox,
  4 for status-badge, 3 for the App shell. Not a broad frontend suite; only
  the specs needed to keep the known-working surface area tested.
- **What remains** (not blockers, not this phase):
  - Physical rename of the i18n key block `tenant_configuration.*` —
    cosmetic churn across ~60 keys, zero user-visible gain (title already
    renders as "Company Configuration"). Deliberately deferred.
  - Final AutoMapper 13.0.1 CVE upgrade (NU1903) — waiting on upstream.
  - ~30 "multi-tenant" / "per-tenant" comments in backend handlers that
    describe branch-scoping. Accurate as-is; deliberately deferred.

---

## 12. Known limitations

- **Legacy route redirect**: Angular's prefix redirect handles
  `/settings/tenant-config/<child>` forwarding via URL matching. If a static
  non-Angular consumer references the old path outside the SPA (e.g. an
  email notification's deep-link), it will still land at the correct new
  path thanks to the redirect. No such external consumers were identified.
- **Postgres integration tests require either the dev cluster or a CI
  service container**. If a contributor has neither, the 3 rollback tests
  auto-skip with a precise message; the 164 other tests still run. This is
  explicit and documented, not a silent gap.
- The pre-existing CI `./src/TimeAttendanceSystem.sln` path was broken for
  an unknown duration — no data-loss risk but means CI has been
  "green-while-skipping-tests" on main. With the Phase 7 fix the backend-unit
  job now actually runs all unit tests; some pre-existing tests that never
  ran in CI may surface new environment-dependent failures on first run
  (none found locally).

---

## 13. Recommended next-phase items (optional)

Nothing blocks current deployability. Potential future polish:

1. **i18n key rename** `tenant_configuration.*` → `company_configuration.*`
   as part of any broader translation overhaul.
2. **Docstring sweep** for `multi-tenant` / `per-tenant` phrases in backend
   handlers, swapping them for the accurate "branch-scoped" wording. Mass
   safe edit via the usual bulk-sed + compile pattern.
3. **Selfservice frontend Karma setup** — currently the admin frontend has
   12 specs; the selfservice app has none. If selfservice develops
   regression-sensitive UI (approval flows, balance widgets), bring the same
   minimum practical setup there.
4. **Direct URL deep-link to specific company-config sub-tab** — e.g.
   `/settings/company-config/attendance` from the Attendance module. Already
   supported by the route structure; no consumers wire to it yet.
