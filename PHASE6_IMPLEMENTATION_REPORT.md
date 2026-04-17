# Phase 6 (v14.6) — Implementation Report

**Status**: Delivered
**Date**: 2026-04-17
**Scope**: final cleanup + reliability pass. Replaces broken transactional test
infrastructure with real-Postgres integration testing, retires two entrenched
deprecations (`SalaryAdvance.DeductionMonth`, `CompanySettings.AutoCheckOut*`),
adds the first working Angular component spec, and ships the top-nav omnibox.

---

## 1. Real-Postgres transactional test harness

### Why it mattered
Phase 5 sign-off explicitly quarantined the three `PayrollTransactionRollbackTests`.
They had never actually executed — the Phase 1 `SqliteTestHarness.EnsureCreated()`
choked on the Postgres-configured `TecAxleDbContext` (`jsonb`, `timestamp with time
zone`, `defaultValueSql: "NOW()"`, `HasComment`). That meant the payroll
commit/rollback/rerun logic was unverified for real transaction semantics despite
being one of the system's highest-risk paths.

### What was built
- **`PostgresTestHarness`** ([tests/TecAxle.Hrms.LifecycleAutomation.Tests/PostgresTestHarness.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/PostgresTestHarness.cs)):
  provisions a disposable `tecaxle_test_{guid30}` database on the Postgres cluster
  pointed to by the `HRMS_INTEGRATION_DB` env-var (falls back to the default dev
  connection), applies the full EF migration chain via `db.Database.Migrate()`,
  and drops the database on dispose (`ClearAllPools` + `pg_terminate_backend` +
  `DROP DATABASE … WITH (FORCE)`). Each test class gets its own DB — no
  cross-test pollution.
- **`PostgresRequiredFactAttribute`** ([PostgresRequiredFactAttribute.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/PostgresRequiredFactAttribute.cs)):
  a `[Fact]` subclass that probes the cluster at type-init and auto-skips with a
  precise reason when Postgres isn't reachable. No CI flapping on
  offline-developer environments.
- **SQLite harness removed**: [SqliteTestHarness.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/SqliteTestHarness.cs) deleted.
- **Packages added** (Lifecycle tests project):
  `Npgsql 9.0.2` and `Npgsql.EntityFrameworkCore.PostgreSQL 9.0.2`. **No
  Testcontainers dependency** — the repo already runs against a live dev
  Postgres 18, so an explicit-connection harness is simpler, faster (no Docker
  spin-up), and matches the deploy target exactly.

### Why not Testcontainers?
Testcontainers would have pulled in Docker.DotNet + a Postgres image at every
test run and added 5–10 s per test class. The repo already requires a
Postgres-reachable dev environment to run the backend at all. A plain
explicit-connection harness is the closest-to-production shape with no new heavy
infrastructure. CI config (a Postgres service container + `HRMS_INTEGRATION_DB`
env-var) is the same amount of work either way.

### Tests migrated
[PayrollTransactionRollbackTests.cs](tests/TecAxle.Hrms.LifecycleAutomation.Tests/PayrollTransactionRollbackTests.cs):

| Test | Coverage |
|---|---|
| `Commit_path_persists_payroll_record_and_marks_loan_paid` | A real Postgres transaction commits the full per-employee write sequence (PayrollRecord → LoanRepayment Paid → balance decrement); a fresh DbContext sees all three writes. |
| `Rollback_path_leaves_no_payroll_record_and_loan_remains_scheduled` | Same sequence inside a transaction that's rolled back — PayrollRecord doesn't exist; `LoanRepayment.Status == Scheduled` with null `PayrollRecordId`; `OutstandingBalance` unchanged. |
| `Rerun_after_rollback_re_links_same_loan_idempotently` | Failed/rolled-back attempt followed by `ChangeTracker.Clear()` + retry commits cleanly. Exactly one `PayrollRecord` for the employee, no duplicates. |

Seed helper (`SeedBaseAsync`) fixed for real Postgres:
- All `DateTime` values forced to `Kind.Utc` (Npgsql's `timestamp with time zone`
  rejects `Unspecified`).
- A real `Branch` row is created before the `Employee` row so the
  `FK_Employees_Branches_BranchId` constraint is honored (the InMemory/SQLite
  harness silently ignored FKs).

### How to run
```bash
# Default — uses dev Postgres at localhost:5432/postgres
dotnet test tests/TecAxle.Hrms.LifecycleAutomation.Tests

# Custom cluster (e.g. CI service container)
HRMS_INTEGRATION_DB="Host=db;Username=postgres;Password=..." dotnet test ...
```

If Postgres is unreachable, the three tests auto-skip with:
> Postgres integration cluster not reachable. Set `HRMS_INTEGRATION_DB` or start the local Postgres 18 dev instance.

---

## 2. Legacy deprecation retirements

### 2.1 `SalaryAdvance.DeductionMonth` — **WRITE-FROZEN**

**What moved**:
- **API input removed**: [SalaryAdvancesController.cs](src/Api/TimeAttendanceSystem.Api/Controllers/SalaryAdvancesController.cs) —
  `CreateSalaryAdvanceRequest.DeductionMonth: int` replaced with
  `DeductionStartDate / DeductionEndDate: DateTime?`. Query filter switched
  from `int? deductionMonth` to `DateTime? deductionFrom / deductionTo`.
- **Response projection removed**: `GetAll` / `GetById` no longer select
  `DeductionMonth`. Responses now expose the date range only.
- **Executor writes to `DeductionMonth` deleted**:
  [SalaryAdvanceExecutor.cs](src/Application/TimeAttendanceSystem.Application/Features/ApprovalExecution/SalaryAdvanceExecutor.cs) —
  the fallback path previously wrote `adv.DeductionMonth = nextMonth.Year * 100 + nextMonth.Month`.
  That write is gone. The executor now only **reads** `DeductionMonth` as a
  back-fill hint for pre-Phase-6 rows.
- **Entity doc strengthened**: [SalaryAdvance.cs](src/Domain/TimeAttendanceSystem.Domain/Loans/SalaryAdvance.cs) —
  doc-comment now declares the field WRITE-FROZEN and describes the exact
  conditions under which the column may still be read.

**What stayed**:
- The DB column is still present. Historical rows created before Phase 6 that
  only have `DeductionMonth` set are still correctly matched by
  `ProcessPayrollPeriodCommandHandler.cs:350–353` via the legacy fallback.
  Physical column drop is tracked for a later major-version migration once
  reporting consumers confirm they don't read it.

### 2.2 `CompanySettings.AutoCheckOutEnabled` / `AutoCheckOutTime` — **REMOVED**

Shift-driven auto-checkout has been the source of truth since Phase 3
(`ShiftDrivenAutoCheckOutJob`). Company-wide flags had no non-legacy reader and
only surfaced through the admin UI. Full retirement.

**Backend changes**:
- Entity properties removed from [CompanySettings.cs](src/Domain/TimeAttendanceSystem.Domain/Company/CompanySettings.cs)
  and [BranchSettingsOverride.cs](src/Domain/TimeAttendanceSystem.Domain/Branches/BranchSettingsOverride.cs).
- DTOs cleaned: [CompanySettingsDto.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Dtos/CompanySettingsDto.cs),
  [ResolvedSettingsDto.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Dtos/ResolvedSettingsDto.cs),
  [BranchSettingsOverrideDto.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Dtos/BranchSettingsOverrideDto.cs).
- Commands cleaned: [UpdateCompanySettingsCommand.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Commands/UpdateCompanySettings/UpdateCompanySettingsCommand.cs)
  and handler, [UpdateBranchSettingsOverrideCommand.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Commands/UpdateBranchSettingsOverride/UpdateBranchSettingsOverrideCommand.cs)
  and handler.
- Queries cleaned: [GetCompanySettingsQueryHandler.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Queries/GetCompanySettings/GetCompanySettingsQueryHandler.cs),
  [GetBranchSettingsOverrideQueryHandler.cs](src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/Queries/GetBranchSettingsOverride/GetBranchSettingsOverrideQueryHandler.cs).
- Resolver cleaned: [CompanySettingsResolver.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/CompanySettingsResolver.cs).

**Migration applied** — [20260417131611_RemoveLegacyAutoCheckoutSettings.cs](src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260417131611_RemoveLegacyAutoCheckoutSettings.cs):
- `DropColumn AutoCheckOutEnabled` + `DropColumn AutoCheckOutTime` from
  `CompanySettings` and `BranchSettingsOverrides`.
- `Down` reverses with `AddColumn` + defaults.
- Applied to the dev DB; confirmed zero columns remain:
  ```sql
  SELECT column_name FROM information_schema.columns
  WHERE table_name IN ('CompanySettings','BranchSettingsOverrides')
    AND column_name LIKE 'AutoCheckOut%';
  -- 0 rows
  ```

**Admin UI changes**:
- [attendance-settings.component.html](time-attendance-frontend/src/app/pages/settings/company-configuration/attendance-settings/attendance-settings.component.html):
  removed the `<app-form-section>` for the auto-checkout toggle/time picker.
  Replaced with a comment explaining that shift-driven config is authoritative.
- [company-configuration.models.ts](time-attendance-frontend/src/app/pages/settings/company-configuration/services/company-configuration.models.ts):
  `autoCheckOutEnabled` / `autoCheckOutTime` removed from both
  `CompanySettings` and `BranchSettingsOverride` interfaces.

### 2.3 Sign-off language for deprecations

| Item | Status | What that means |
|---|---|---|
| `SalaryAdvance.DeductionMonth` | Write-frozen, read-for-back-compat | API no longer accepts it; no code writes to it; pre-Phase-6 rows still readable. DB column present. |
| `CompanySettings.AutoCheckOutEnabled` / `AutoCheckOutTime` | **Fully removed** | Entity properties, DTOs, commands, handlers, UI, and DB columns are gone. Reversible only via `Down` migration. |

---

## 3. Frontend testing (minimum practical setup)

Karma + Jasmine were already wired in `package.json` and `angular.json` but the
project only had 2 trivial specs (`StatusBadgeComponent`, `App`), and both were
in a failing state before Phase 6 — unrelated to this phase.

### What was added
[topbar.component.spec.ts](time-attendance-frontend/src/app/layout/topbar/topbar.component.spec.ts):
a full 5-assertion spec for the new Phase 6 omnibox (see §4).

**Key setup points** (documented for future specs to reuse):
- The component imports `NotificationBellComponent` (transitively pulls
  `HttpClient`) — providers must include `provideHttpClient()` +
  `provideHttpClientTesting()`.
- Minimal stubs for `AuthService` (must expose `getAccessToken()` returning
  null to short-circuit the SignalR startup path) and `I18nService`.
- The fixture's native element must be explicitly appended to
  `document.body` for any `@HostListener('document:...')` assertion to work;
  teardown removes it.

**Result**: 5 new specs passing. Karma headless run:

```
Chrome Headless 146.0.0.0 (Windows 10): Executed 5 of 5 SUCCESS
```

### Known limitation (not Phase 6-caused)
The two pre-existing specs (`StatusBadgeComponent should render default status`,
`App should render title`) were already failing before Phase 6 and are unrelated
to this phase's changes. Tracked separately.

---

## 4. UX polish — top-nav omnibox

### What ships
A compact search input in the admin topbar, centered between the page-title and
the right-hand user menu.

- **Location**: [topbar.component.html](time-attendance-frontend/src/app/layout/topbar/topbar.component.html)
- **Component**: [topbar.component.ts](time-attendance-frontend/src/app/layout/topbar/topbar.component.ts)
- **Styles**: [topbar.component.css](time-attendance-frontend/src/app/layout/topbar/topbar.component.css) (RTL-safe via `inset-inline-*`)

### Behaviors
- **Enter** on a 2+ character query navigates to `/global-search?q=<trimmed>`.
  The existing dedicated search page (Phase 4) already reads `?q=` and
  auto-searches, so the omnibox flow is plumbed end-to-end with zero changes to
  the search service or backend.
- **< 2 chars** is a no-op (mirrors the backend minimum; the backend returns an
  empty response for shorter queries anyway).
- **Ctrl / ⌘ + K** focuses the omnibox from anywhere in the admin app.
- **Visible keyboard hint**: a `<kbd>Ctrl+K</kbd>` badge is shown on screens ≥ md.
- **i18n**: `search.placeholder` added to both English (`Search everything… (Ctrl+K)`)
  and Arabic (`ابحث في كل شيء… (Ctrl+K)`).
- **Permissions**: untouched — the backend `/api/v1/search` endpoint already
  enforces branch-scope/auth policies; the omnibox is just a shortcut into the
  same route.

### Deliberately not done
- **Dropdown suggestions in the topbar** — adding debounced fetch-as-you-type
  results over the shared layout was higher-risk for very little gain over the
  dedicated page (which already does live search with grouped results).
  Kept the contract minimal.

---

## 5. Final consistency cleanup

### User-visible cleanup
- Dead `tenants.*` translation block (40 keys for the removed
  Tenant-Management page) removed from both
  [en.json](time-attendance-frontend/src/app/core/i18n/translations/en.json)
  and [ar.json](time-attendance-frontend/src/app/core/i18n/translations/ar.json).
  They had zero code references — pure dead weight from the v14.0 collapse.
- `CompanySettings.cs`: "tenant settings" → "company settings" in comments.
- `BranchSettingsOverride.cs`: "inherited from tenant" → "inherited from
  company" wording.
- `UpdateCompanySettingsCommand.cs`: docstring updated.

### Deliberately NOT renamed (stability over cosmetics)
- URL path `/settings/tenant-config` and i18n key `tenant_configuration.*` are
  stable. The page title is already rendered as "Company Configuration" (key
  value, not key name); changing the paths/keys would churn ~60 routes + every
  component template for zero user gain and the risk of breaking audit-log
  references and operator bookmarks. A comment at [app.routes.ts](time-attendance-frontend/src/app/app.routes.ts:439-443)
  records this decision.

---

## 6. Schema changes

| Migration | Up | Down |
|---|---|---|
| `20260417131611_RemoveLegacyAutoCheckoutSettings` | DropColumn ×4 (`CompanySettings` + `BranchSettingsOverrides` — `AutoCheckOutEnabled` + `AutoCheckOutTime`) | AddColumn ×4 with defaults |

Applied to the dev DB. `__EFMigrationsHistory` now:

```
20260416163539_Initial
20260417121022_RenameTenantSettingsToCompanySettings
20260417131611_RemoveLegacyAutoCheckoutSettings
```

---

## 7. Tests added / migrated

| File | Kind | Count |
|---|---|---|
| `tests/TecAxle.Hrms.LifecycleAutomation.Tests/PostgresTestHarness.cs` | Harness | (3 tests unblocked) |
| `tests/TecAxle.Hrms.LifecycleAutomation.Tests/PostgresRequiredFactAttribute.cs` | Harness | — |
| `tests/TecAxle.Hrms.LifecycleAutomation.Tests/PayrollTransactionRollbackTests.cs` | Unskipped + real Postgres + UTC-coerced seeds + FK-safe Branch | **3 (real-Postgres integration)** |
| `tests/TecAxle.Hrms.LifecycleAutomation.Tests/Phase6DeprecationTests.cs` | NEW — pins the boundary of the retirements | **5** |
| `time-attendance-frontend/src/app/layout/topbar/topbar.component.spec.ts` | NEW — omnibox behavior | **5** |

### Final test suite status

| Project | Passed | Failed | Skipped | Total |
|---|---|---|---|---|
| `TecAxle.Hrms.Payroll.Tests` | 27 | 0 | 0 | 27 |
| `TecAxle.Hrms.BusinessRules.Tests` | 31 | 0 | 0 | 31 |
| `TecAxle.Hrms.LifecycleAutomation.Tests` | **91** | 0 | **0** | **91** |
| `TecAxle.Hrms.Workflow.Tests` | 18 | 0 | 0 | 18 |
| **Backend total** | **167** | **0** | **0** | **167** |
| `time-attendance-frontend` (Phase 6 specs only) | **5** | 0 | 0 | 5 |

> Backend is +5 passing vs Phase 5 sign-off (the 5 new Phase 6 deprecation
> tests) and 3 previously skipped tests are now actually running in-harness
> against real Postgres.

### Frontend full test suite
2 pre-existing specs (`StatusBadgeComponent`, `App`) fail — **not caused by
Phase 6**, confirmed by `git log` showing both files untouched in this phase.
Tracked as pre-existing debt.

---

## 8. Verification checklist

| Objective | Status | Notes |
|---|---|---|
| 1. Postgres integration harness replacing SQLite | **Fully completed** | `PostgresTestHarness` + `PostgresRequiredFactAttribute`; SQLite harness deleted. |
| 2. Migrate 3 skipped rollback tests | **Fully completed** | All 3 now green against real Postgres with transactions, FK constraints, UTC semantics. |
| 3. Retire `SalaryAdvance.DeductionMonth` | **Partially completed** — intentional | Write-frozen at the API + executor; legacy back-compat read retained; DB column preserved. Full column drop is documented as a future-version task. |
| 4. Retire `CompanySettings.AutoCheckOut*` | **Fully completed** | Entity, DTOs, commands, handlers, UI, and DB columns all removed. Migration applied. |
| 5. Minimal Angular component test setup | **Fully completed** | 5 passing specs for `TopbarComponent` omnibox; reusable setup documented. |
| 6. Top-nav omnibox polish | **Fully completed** | Enter + Ctrl/⌘+K behavior, i18n in both languages, RTL-safe CSS. |
| 7. Final consistency cleanup | **Fully completed** (for user-visible) | Dead `tenants.*` i18n block deleted; comments updated; paths/keys stable by design. |
| 8. Phase 6 tests + verification | **Fully completed** | 13 new/migrated tests (5 deprecation + 3 real-Postgres + 5 frontend). |
| 9. Final report | **Fully completed** | This document. |

---

## 9. Sign-off language (precise)

- **Real Postgres integration coverage**: 3 tests (`Commit_path_…`,
  `Rollback_path_…`, `Rerun_after_rollback_…`) run against a live Postgres
  cluster provisioned per-harness with the full EF migration chain. They
  auto-skip with a precise reason if Postgres isn't reachable (dev-offline or
  CI without a service container).
- **Backend unit/smoke coverage**: 91 tests in `LifecycleAutomation.Tests`
  (including 5 new Phase 6 deprecation-boundary tests) + 76 in the other
  three projects, all passing, 0 skipped.
- **Frontend component coverage**: 5 passing specs for the new omnibox
  behavior. Not a broad frontend test-harness investment — only the minimum
  needed to prove (a) Karma works in this repo, (b) the new Phase 6
  component behavior is pinned.
- **Legacy field removal**: one field was *write-frozen with back-compat
  read preserved* (`DeductionMonth`), one pair was *fully removed from code
  AND schema* (`AutoCheckOut*`). The distinction is enforced in code comments
  on the entities and by the dedicated retirement tests.

---

## 10. Recommended next-phase items

These are genuine follow-ups — not Phase 6 blockers:

1. **Drop the `DeductionMonth` column** once reporting/BI consumers confirm
   they don't read it. The entity property and the one legacy-compat read in
   `ProcessPayrollPeriodCommandHandler.cs:350–353` + `SalaryAdvanceExecutor.cs`
   will be removable at the same time.
2. **CI wiring for Postgres integration tests**: add a Postgres service
   container to the build pipeline with `HRMS_INTEGRATION_DB` configured. The
   current harness will then run in CI with zero code change.
3. **Fix the 2 pre-existing failing frontend specs** (`StatusBadgeComponent`,
   `App`) — trivial, unrelated to Phase 6.
4. **AutoMapper 13.0.1 CVE** (NU1903) — upgrade when a fixed version ships.
5. **Dead `module:` data key** — a few routes still carry a `module:
   'TimeAttendance'` data property that no longer has any consumer since the
   v14.0 entitlement layer was removed. Pure dead metadata; safe sweep candidate.
6. **Rename URL paths `/settings/tenant-config` → `/settings/company-config`**
   in a dedicated polish phase if operator-bookmark stability is OK to
   disturb. A redirect from the old path would keep existing links working.
