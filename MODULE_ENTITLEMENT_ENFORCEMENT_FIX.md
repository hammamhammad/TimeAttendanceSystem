# Module Entitlement Enforcement Fix

**Status:** Implemented — 2026-04-15
**Scope:** Backend-only (API + Application layers). Zero frontend changes.

## TL;DR

Prior to this change, 22 controllers in paid modules (Recruitment, Onboarding, Performance, Offboarding, EmployeeLifecycle, Payroll) injected `IApplicationDbContext` directly and bypassed MediatR — which meant they also bypassed the `ModuleEntitlementBehavior` pipeline, leaving ~180 endpoints reachable by tenants whose subscription did not include the module. The frontend `moduleGuard` (304 protected routes) was correct but cannot be the security boundary. This change closes every gap by introducing an HTTP-layer filter that mirrors the MediatR-side `[RequiresModule]` contract and applying it wherever MediatR is bypassed.

---

## Current Gaps Found (pre-fix)

### 1. Controllers bypassing MediatR (22)

| Module | Controllers |
|---|---|
| **Recruitment** | JobRequisitions, JobPostings, Candidates, JobApplications, InterviewSchedules, InterviewFeedbacks, OfferLetters |
| **Onboarding** | OnboardingTemplates, OnboardingProcesses, OnboardingTasks |
| **Performance** | PerformanceReviewCycles, PerformanceReviews, PerformanceImprovementPlans, GoalDefinitions, CompetencyFrameworks, FeedbackRequests |
| **Offboarding** | ExitInterviews, Clearance |
| **EmployeeLifecycle** | JobGrades, EmployeeDetails *(29 endpoints, including salary/contracts/PII)* |
| **Payroll** | PayrollSettings *(20 endpoints — tax, SI, providers, calendar policies)*, SalaryAdvances |

### 2. Inconsistent pattern in `ReportsController`
`ReportsController` performed a manual `IEntitlementService.IsModuleEnabledAsync` check in each endpoint — correct behavior but duplicated logic that the pipeline behavior already owns. Every new report endpoint needed the check re-added manually — a known source of drift.

### 3. PortalController (2300+ lines) mixed modules
Self-service endpoints covering Leave, RemoteWork, Payroll, Offboarding, Training, Benefits, etc. were behind one flat `[Authorize]` attribute. A manager on a plan without RemoteWork could still hit `POST /approval-remote-work/{id}` directly.

### 4. Direct-DB mobile schedule controller
`MobileScheduleController` uses `IApplicationDbContext` (not MediatR) to serve GET endpoints for the TimeAttendance module with no entitlement check.

### 5. Subscription plan updates did not invalidate entitlement cache
`UpdateSubscriptionPlanCommandHandler` mutated a plan's modules but never called `IEntitlementService.InvalidateCache(tenantId)` for the tenants on that plan. Changes to a plan's module set were invisible to those tenants for up to 5 minutes (cache TTL).

### 6. `RequiresLimit` infrastructure unused
The `[RequiresLimit]` attribute and `UsageLimitBehavior` pipeline existed but had zero real usages. Plan limits (`MaxEmployees`, `MaxBranches`) were not enforced.

---

## Enforcement Strategy

**One contract, two enforcement paths, one source of truth.**

| Path | Used by | Attribute | Check runs in |
|---|---|---|---|
| MediatR pipeline (existing) | Commands/queries that dispatch through `IMediator.Send` | `[RequiresModule(SystemModule.X, AllowReadWhenDisabled = bool)]` on the request class | `ModuleEntitlementBehavior<TRequest, TResponse>` |
| HTTP filter (new in this change) | Controllers that use `IApplicationDbContext` directly, or mix modules per-method | `[RequiresModuleEndpoint(SystemModule.X)]` + optional `[AllowModuleReadOnly]` on action | `RequiresModuleEndpointAttribute` (implements `IAsyncAuthorizationFilter`) |

Both paths:
- Resolve the same `IEntitlementService` → same cache → same `IsModuleEnabledAsync` logic.
- Bypass when `ICurrentUser.IsSystemAdmin == true`.
- Bypass when no tenant is resolved (platform admin w/o `X-Tenant-Id`, unauthenticated endpoints).
- Return the same human-readable message: `"The '{Module}' module is not available in your current subscription plan."`
- MediatR path returns `Result.Failure(...)` for `Result`-returning requests; HTTP path returns `403 Forbidden` with `{ statusCode, message, traceId }` — matching `GlobalExceptionHandlerMiddleware`.

**Read-only semantics.** Queries decorated with `AllowReadWhenDisabled = true` (MediatR) or actions decorated with `[AllowModuleReadOnly]` (HTTP) allow safe-method (`GET`/`HEAD`) access when the module is disabled — preserving read access to historical data after a plan downgrade. Writes are always blocked for disabled modules. The HTTP filter explicitly refuses to allow read-only bypass for non-safe methods even if the marker is present, so an accidental `[AllowModuleReadOnly]` on a `POST` does not weaken enforcement.

---

## What Was Changed

### New files

| File | Purpose |
|---|---|
| `src/Api/TimeAttendanceSystem.Api/Filters/RequiresModuleEndpointAttribute.cs` | HTTP-layer filter + `[AllowModuleReadOnly]` marker |
| `tests/TecAxle.Hrms.Entitlement.Tests/TecAxle.Hrms.Entitlement.Tests.csproj` | Test project (net9.0, xUnit, FluentAssertions, Moq) |
| `tests/TecAxle.Hrms.Entitlement.Tests/RequiresModuleEndpointAttributeTests.cs` | 10 tests covering every branch of the filter |
| `tests/TecAxle.Hrms.Entitlement.Tests/UsageLimitBehaviorTests.cs` | 6 tests for `UsageLimitBehavior` + attribute-presence assertions |
| `tests/TecAxle.Hrms.Entitlement.Tests/ControllerCoverageTests.cs` | Reflection regression test pinning the 23 controllers that must carry the filter |

### Modified files (summary)

- **23 controllers decorated with the HTTP filter** (§ _Modules and Endpoints Protected_ below).
- **`ReportsController.cs`** — removed manual `IsModuleAccessibleAsync` helper; consolidated onto `[RequiresModuleEndpoint]` + `[AllowModuleReadOnly]` per-endpoint.
- **`PortalController.cs`** — 63 per-method `[RequiresModuleEndpoint]` decorations + 46 `[AllowModuleReadOnly]` markers, grouped by module mapping. 8 Core methods (dashboards, profile, team, approvals, delegation search) intentionally left unenforced.
- **`MobileScheduleController.cs`** — class-level `[RequiresModuleEndpoint(SystemModule.TimeAttendance)]` + `[AllowModuleReadOnly]` on its 3 GET endpoints.
- **`UpdateSubscriptionPlanCommandHandler.cs`** — now injects `IEntitlementService` and invalidates cache for every tenant on the updated plan.
- **`CreateEmployeeCommand.cs`** — decorated with `[RequiresLimit(LimitType.MaxEmployees)]`.
- **`CreateBranchCommand.cs`** — decorated with `[RequiresLimit(LimitType.MaxBranches)]`.

### Reused (unchanged)

- `ModuleEntitlementBehavior`, `RequiresModuleAttribute`, `UsageLimitBehavior`, `RequiresLimitAttribute`, `IEntitlementService`, `EntitlementService` (incl. its `GetCurrentUsageAsync` counts for `MaxEmployees`/`MaxBranches`/`MaxUsers`), `CurrentUser.IsSystemAdmin`/`TenantId`, `TenantResolutionMiddleware`.

---

## Modules and Endpoints Protected

### HTTP filter applied (23 controllers)

| Controller | Module | Action policy |
|---|---|---|
| `JobRequisitionsController` | Recruitment | 2 GET `[AllowModuleReadOnly]` · 7 writes blocked |
| `JobPostingsController` | Recruitment | 3 GET · 4 writes blocked |
| `CandidatesController` | Recruitment | 2 GET · 3 writes blocked |
| `JobApplicationsController` | Recruitment | 3 GET · 4 writes blocked |
| `InterviewSchedulesController` | Recruitment | 2 GET · 4 writes blocked |
| `InterviewFeedbacksController` | Recruitment | 1 GET · 2 writes blocked |
| `OfferLettersController` | Recruitment | 2 GET · 7 writes blocked |
| `OnboardingTemplatesController` | Onboarding | 3 GET · 4 writes blocked |
| `OnboardingProcessesController` | Onboarding | 3 GET · 3 writes blocked |
| `OnboardingTasksController` | Onboarding | 2 GET · 3 writes blocked |
| `PerformanceReviewCyclesController` | Performance | 2 GET · 5 writes blocked |
| `PerformanceReviewsController` | Performance | 4 GET · 8 writes blocked |
| `PerformanceImprovementPlansController` | Performance | 2 GET · 6 writes blocked |
| `GoalDefinitionsController` | Performance | 3 GET · 4 writes blocked |
| `CompetencyFrameworksController` | Performance | 3 GET · 3 writes blocked |
| `FeedbackRequestsController` | Performance | 2 GET · 3 writes blocked |
| `ExitInterviewsController` | Offboarding | 1 GET · 2 writes blocked |
| `ClearanceController` | Offboarding | 2 GET · 3 writes blocked |
| `JobGradesController` | EmployeeLifecycle | 3 GET · 3 writes blocked |
| `EmployeeDetailsController` | EmployeeLifecycle | 8 GET · 21 writes blocked |
| `PayrollSettingsController` | Payroll | 8 GET · 12 writes blocked |
| `SalaryAdvancesController` | Payroll | 2 GET · 4 writes blocked |
| `MobileScheduleController` | TimeAttendance | 3 GET (direct-DB controller) |
| **Subtotal** | | **62 GET · 115 writes = 177 endpoints now enforced** |

### `ReportsController` consolidated (8 endpoints)

| Endpoint | Module |
|---|---|
| `GET /api/v1/reports/attendance` + `/export` | TimeAttendance |
| `GET /api/v1/reports/leaves` | LeaveManagement |
| `GET /api/v1/reports/salary-register` | Payroll |
| `GET /api/v1/reports/department-cost` | Payroll |
| `GET /api/v1/reports/ytd-earnings` | Payroll |
| `GET /api/v1/reports/contract-expiry` | EmployeeLifecycle |
| `GET /api/v1/reports/document-expiry` | Documents |
| `GET /api/v1/reports/certification-expiry` | Training |
| `GET /api/v1/reports/compliance-summary` | EmployeeLifecycle |

All reports carry `[AllowModuleReadOnly]` — reports are historical by nature and remain accessible after a downgrade.

### `PortalController` per-method enforcement (63 methods)

| Module | GET (read-only) | Write |
|---|---|---|
| TimeAttendance | 4 | 1 DELETE |
| LeaveManagement | 5 | 1 DELETE |
| RemoteWork | 3 | 0 |
| Allowances | 2 | 0 |
| Payroll | 3 | 0 |
| Offboarding | 1 | 1 POST |
| Documents | 3 | 0 |
| Expenses | 1 | 0 |
| Loans | 1 | 0 |
| Announcements | 1 | 1 POST |
| Training | 3 | 0 |
| EmployeeRelations | 2 | 2 POST |
| Assets | 1 | 0 |
| Surveys | 2 | 1 POST |
| Timesheets | 5 | 4 |
| SuccessionPlanning | 3 | 0 |
| Benefits | 5 | 6 |
| **Total** | **45** | **18** |

Left Core (no enforcement): `employee-dashboard`, `manager-dashboard`, `my-profile` (GET/PUT), `team-members` (list + detail), `pending-approvals`, `delegation-employees` search.

### Usage limits wired

| Command | Limit type |
|---|---|
| `CreateEmployeeCommand` | `LimitType.MaxEmployees` |
| `CreateBranchCommand` | `LimitType.MaxBranches` |

Enforcement runs through the existing `UsageLimitBehavior` MediatR pipeline. `EntitlementService.GetCurrentUsageAsync` already counts active (non-deleted) employees, branches, users against the plan limit — no stub needed.

---

## Frontend Impact

**None.** The 304 `moduleGuard`-protected routes and the module-tagged sidenav navigation continue to work exactly as today — and the backend now makes what the UI already hides actually unreachable. The only user-visible behavior change: a user who somehow crafts a direct API call to a disabled module now gets `403` (previously the request would have succeeded). Because the frontend already refuses to route to pages for disabled modules, this only affects direct-API access, which is the intended scope.

No API shape, route, DTO, or error-response schema changed. The `403` body `{ statusCode, message, traceId }` matches the existing `GlobalExceptionHandlerMiddleware` shape.

---

## Platform-Admin / SystemAdmin Behavior

**Preserved identically in both enforcement paths.**

- `ICurrentUser.IsSystemAdmin` (JWT role claim `SystemAdmin`) bypasses both `ModuleEntitlementBehavior` and `RequiresModuleEndpointAttribute`.
- `TenantId == null` (platform admin w/o selected tenant, unauthenticated pre-auth traffic) short-circuits both paths — the request is allowed to proceed. This matches the prior `ModuleEntitlementBehavior` behavior and preserves platform-admin workflows.
- Platform admin operating cross-tenant via `X-Tenant-Id` header: the selected tenant's subscription is enforced. This is intentional — platform admin should not access module data the tenant hasn't subscribed to.

---

## Tests Added

`tests/TecAxle.Hrms.Entitlement.Tests/` contains:

### `RequiresModuleEndpointAttributeTests` — 10 tests covering every branch
- SystemAdmin bypass (no entitlement call made).
- No-tenant bypass (no entitlement call made).
- Enabled module → pass.
- Disabled module + write → 403.
- Disabled module + GET w/o marker → 403.
- Disabled module + GET + `[AllowModuleReadOnly]` → pass.
- Disabled module + POST + `[AllowModuleReadOnly]` → still 403 (marker only applies to safe methods).
- Disabled module + HEAD + `[AllowModuleReadOnly]` → pass.
- Disabled module + DELETE + `[AllowModuleReadOnly]` → still 403.
- Disabled module + GET + `AllowReadWhenDisabled = true` flag (attribute property alternative) → pass.
- 403 response body carries `statusCode`, `message` containing the module name, and `traceId`.

### `UsageLimitBehaviorTests` — 6 tests
- Limit reached → `Result.Failure` with limit message.
- Under limit → pass through.
- SystemAdmin bypasses limit check entirely.
- Request without `[RequiresLimit]` passes through untouched.
- `CreateEmployeeCommand` carries `[RequiresLimit(LimitType.MaxEmployees)]` (reflection check).
- `CreateBranchCommand` carries `[RequiresLimit(LimitType.MaxBranches)]` (reflection check).

### `ControllerCoverageTests` — regression pinning
- Parametrised test over the 23 controllers that must carry `[RequiresModuleEndpoint]`. Fails fast if any loses the attribute.
- Cross-check: every GET action on a guarded controller has `[AllowModuleReadOnly]` (enforces the read-only-by-default policy).

### End-to-end HTTP tests

`tests/TecAxle.Hrms.Entitlement.Tests/EndToEnd/` spins up the full ASP.NET Core pipeline via `WebApplicationFactory<Program>` and sends real HTTP requests against the real controllers and middleware:

- `EntitlementTestWebApplicationFactory` — swaps `IEntitlementService` (→ `FakeEntitlementService`), `ITenantConnectionResolver` (→ stub, avoids real master DB), and the default auth scheme (→ `TestAuthHandler`). Everything else — routing, middleware, filters, controller activation, global exception handler — runs as-in-production.
- `TestAuthHandler` — header-driven auth (`X-Test-User-Id`, `X-Test-Tenant-Id`, `X-Test-Roles`, `X-Test-Platform-User`) so tests can impersonate any user shape without real JWTs.
- `ModuleEntitlementEndToEndTests` — 54 parameterised test rows covering:
  - 23 write endpoints across Recruitment, Onboarding, Performance, Offboarding, EmployeeLifecycle, Payroll — all return 403 with the correct subscription-plan message when the tenant's plan does not include the module.
  - 6 GET endpoints (including reports, payroll-settings, mobile-schedule) — prove `[AllowModuleReadOnly]` permits safe reads when the module is disabled.
  - SystemAdmin bypass on a disabled module.
  - Platform-admin (no tenant context) bypass.
  - Exact 403 body shape: `{ statusCode, message, traceId }`.
  - PortalController per-method enforcement: `POST /my-resignation` blocked when Offboarding is disabled; `POST /my-grievances` blocked when EmployeeRelations is disabled; `GET /my-profile` remains accessible (Core).

### Run

```bash
cd tests/TecAxle.Hrms.Entitlement.Tests
dotnet test
```

**Current status:** All 79 tests pass (10 filter-unit + 6 limit-unit + 23 controller-reflection + 54 end-to-end HTTP). Run time ~6 s.

### Bonus fix uncovered by the tests

While wiring `UsageLimitBehaviorTests`, a pre-existing reflection bug surfaced in both `UsageLimitBehavior` and `ModuleEntitlementBehavior` — when `TResponse` was `Result<T>`, the fallback call to `responseType.GetMethod("Failure", ..., string)` returned `null` (the factory lives on the non-generic `Result` as a generic method and can't be resolved that way). Both behaviors fell through to `throw new UnauthorizedAccessException(...)` instead of returning `Result<T>.Failure(...)`. The production effect was that any `Result<T>`-returning command hitting a disabled module got a thrown exception mapped to 401 by the global exception handler, rather than a clean `Result.Failure` at the command boundary. Both behaviors are now fixed to resolve the factory via `typeof(Result).GetMethods(...).First(...IsGenericMethodDefinition).MakeGenericMethod(valueType)`. The existing 178 `[RequiresModule]` decorations on `Result<T>`-returning queries and commands now return proper failure results.

---

## Remaining Risks

All four follow-up items from the plan were rolled in (mobile sweep, PortalController audit, cache-invalidation sweep, `RequiresLimit` wiring). Genuinely remaining risks:

1. **`IMemoryCache` is per-instance.** In a horizontally-scaled deployment, `InvalidateCache(tenantId)` only clears the local app-instance cache. Other instances keep stale entitlement data for up to 5 minutes. Acceptable under the current single-instance deployment; flag as a **distributed-cache TODO** for when horizontal scaling lands (Redis-backed `IDistributedCache` with pub/sub invalidation).
2. **SystemAdmin bypass is purely JWT-claim-based.** A forged JWT or misassigned role grants full entitlement bypass. Mitigation lives at the auth layer (JWT signing + validation). No change here.
3. **Developer discipline on new endpoints.** A future direct-DB controller in a paid module that forgets `[RequiresModuleEndpoint]` will be silently unprotected. `ControllerCoverageTests` pins known controllers but does not discover new ones. Recommended follow-up: a **Roslyn analyzer** that flags any `ControllerBase`-derived class that (a) injects `IApplicationDbContext` or `DbContext` and (b) lacks a class-level `[RequiresModuleEndpoint]` or an opt-out `[CoreController]` marker.
4. **Plan edits that DELETE modules from a plan.** `UpdateSubscriptionPlanCommandHandler` now invalidates cache for tenants on the plan, but *in-flight* workflows on removed modules are not automatically frozen. That path already exists via `IModuleDeactivationService` for per-tenant module disable; extending it to plan-level module removal is a separate concern.
5. **PortalController is a long file.** The 63 per-method decorations are correct but hard to maintain at this density. A structural follow-up would split PortalController by module-area (LeavePortal, PayrollPortal, BenefitsPortal, TimesheetsPortal, etc.), letting each controller class carry a single class-level `[RequiresModuleEndpoint]`.

---

## Verification Recipe

### Automated
```bash
# From repo root
dotnet build src/Api/TimeAttendanceSystem.Api     # stop the running API first if DLLs are locked
dotnet test tests/TecAxle.Hrms.Entitlement.Tests
```

### Manual (end-to-end)
1. As a tenant whose plan does **not** include Recruitment:
   - `GET /api/v1/job-requisitions` → `403`, body mentions "Recruitment".
   - `POST /api/v1/performance-reviews` → `403`, body mentions "Performance".
2. As the same tenant's **SystemAdmin**, repeat → both succeed.
3. As **platform admin** with `X-Tenant-Id` pointing at that tenant → still `403` (intentional).
4. Re-enable the module on the tenant's plan → call `EntitlementService.InvalidateCache(tenantId)` (or wait 5 min TTL) → calls succeed.
5. Attempt `POST /api/v1/employees` on a plan with `MaxEmployees = 3` at capacity → `Result.Failure` with `"maximum limit of 3 for 'MaxEmployees'"`.
6. In the admin portal: confirm sidenav still hides disabled-module groups; confirm `moduleGuard` still redirects on direct URL access — UI behavior unchanged.
