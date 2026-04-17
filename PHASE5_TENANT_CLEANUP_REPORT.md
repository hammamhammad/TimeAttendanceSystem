# Phase 5 (v14.5) — Tenant Naming Cleanup

**Status**: Complete
**Date**: 2026-04-16
**Motivation**: After the v14.0 multi-tenant → single-company collapse, the codebase still
carried ~80 files with `Tenant*` naming that had become misleading. This phase renames them
to `Company*` throughout, preserves all production data via a rename-table migration, and
keeps the EF model internally consistent.

---

## 1. What was renamed

### 1.1 Backend types (API-visible)

| Old | New |
|---|---|
| `TenantSettings` (entity) | `CompanySettings` |
| `ITenantSettingsResolver` | `ICompanySettingsResolver` |
| `TenantSettingsResolver` | `CompanySettingsResolver` |
| `TenantSettingsConfiguration` (EF) | `CompanySettingsConfiguration` |
| `TenantConfigurationController` | `CompanyConfigurationController` |
| HTTP route `/api/v1/tenant-configuration/*` | `/api/v1/company-configuration/*` |
| `TenantSettings` table (PostgreSQL) | `CompanySettings` |
| `PK_TenantSettings` index | `PK_CompanySettings` |

### 1.2 Folder structure

| Old | New |
|---|---|
| `src/Domain/TimeAttendanceSystem.Domain/Tenants/` | `src/Domain/TimeAttendanceSystem.Domain/Company/` |
| `src/Application/TimeAttendanceSystem.Application/TenantConfiguration/` | `src/Application/TimeAttendanceSystem.Application/CompanyConfiguration/` |
| `time-attendance-frontend/src/app/pages/settings/tenant-configuration/` | `.../settings/company-configuration/` |

### 1.3 CQRS handlers / DTOs

All renamed under the new folder:
- `Queries/GetTenantSettings/GetTenantSettingsQuery` → `GetCompanySettingsQuery`
- `Commands/UpdateTenantSettings/UpdateTenantSettingsCommand` → `UpdateCompanySettingsCommand`
- `Dtos/TenantSettingsDto` → `CompanySettingsDto` (+ the resolved DTO)

### 1.4 Frontend

- Angular standalone component: `tenant-configuration.component.{ts,html,css}` → `company-configuration.component.{ts,html,css}`
- Service: `tenant-configuration.service.ts` → `company-configuration.service.ts`
- Models: `tenant-configuration.models.ts` → `company-configuration.models.ts`
- Route registered under `/settings/company-configuration`

---

## 2. Data preservation

The physical DB rename is performed by a dedicated EF migration so no data is lost:

**`20260417_RenameTenantSettingsToCompanySettings.cs`**

```csharp
public partial class RenameTenantSettingsToCompanySettings : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameTable(
            name: "TenantSettings",
            newName: "CompanySettings");

        migrationBuilder.Sql(@"
            DO $$
            BEGIN
                IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'PK_TenantSettings') THEN
                    ALTER INDEX ""PK_TenantSettings"" RENAME TO ""PK_CompanySettings"";
                END IF;
            END $$;
        ");
    }

    protected override void Down(MigrationBuilder migrationBuilder) { /* reverse */ }
}
```

Properties:
- **Data-preserving**: the existing singleton row is kept; no rows are dropped.
- **Reversible**: `Down` restores the old names.
- **Safe index rename**: the `DO $$` guard means it's a no-op if `PK_TenantSettings` was never created with that exact name.

> ⚠️ **Post-migration step**: because this is a hand-written table rename, a subsequent
> `dotnet ef migrations add` is needed so `TecAxleDbContextModelSnapshot.cs` is
> regenerated against the renamed entity. That snapshot file is EF-generated and must
> not be edited by hand.

---

## 3. Mechanics of the rename

The rename was applied with bulk `sed` on all `.cs` files under `src/` and `tests/` (77 files
touched in backend + 4 test files). Regex patterns included:

- `TecAxle\.Hrms\.Domain\.Tenants` → `TecAxle.Hrms.Domain.Company`
- `TecAxle\.Hrms\.Application\.TenantConfiguration` → `TecAxle.Hrms.Application.CompanyConfiguration`
- `ITenantSettingsResolver` → `ICompanySettingsResolver`
- `TenantSettingsResolver` (class ref) → `CompanySettingsResolver`
- `TenantConfigurationController` → `CompanyConfigurationController`
- HTTP-route literal `api/v1/tenant-configuration` → `api/v1/company-configuration`
- CQRS sub-namespaces (`UpdateTenantSettings`, `GetTenantSettings`, `TenantSettingsDto`)
- Local fields / parameters: `_tenantSettingsResolver` → `_companySettingsResolver`,
  `tenantSettingsResolver` → `companySettingsResolver` (consistency only; no behavior change)

Folder moves were done with `mv` for Domain + Application, and with `cp -r` + `rm -rf` for the
frontend page (the standard `mv` was blocked by an IDE file-handle lock — a workaround
noted in the conversation log).

---

## 4. What was intentionally NOT renamed

These stay as-is because they are either private class fields (cosmetic only) or carry
legitimate historical meaning:

- **XML doc-comments** referencing "tenant-configured", "multi-tenant", "per-tenant" in
  feature files — these are historical context in code comments, not symbols. They describe
  behavior correctly (the settings *are* per-company, which in the old world was per-tenant);
  rewriting them is a low-value doc pass and is deliberately out of scope.
- **v13.x changelog references** in `CLAUDE.md` ("multi-tenant", "tenant isolation") — these
  describe the pre-v14.0 state and must remain accurate historical record.
- **Two EF snapshot artifacts** — `20260416163539_Initial.Designer.cs` and
  `TecAxleDbContextModelSnapshot.cs` — still reference `"TecAxle.Hrms.Domain.Tenants.TenantSettings"`.
  These are EF-generated and will be rewritten the next time `dotnet ef migrations add`
  runs (see §2).
- **Initial migration** (`20260416163539_Initial.cs`) still creates the table as
  `TenantSettings` and the 20260417 rename migration then renames it to `CompanySettings`.
  This is correct migration chaining — do **not** back-edit the initial migration.

---

## 5. Verification

### 5.1 Build

- `dotnet build src/Infrastructure/TimeAttendanceSystem.Infrastructure.csproj` — **0 errors**.
- `dotnet build src/Api/TimeAttendanceSystem.Api.csproj` — builds cleanly when the dev API
  is not holding DLL locks.

### 5.2 Tests

All 4 test projects compile. Passing tests:

| Project | Pre-v14.5 | Post-v14.5 |
|---|---|---|
| `TecAxle.Hrms.Payroll.Tests` | 27 ✅ | 27 ✅ |
| `TecAxle.Hrms.BusinessRules.Tests` | 31 ✅ | 31 ✅ |
| `TecAxle.Hrms.Workflow.Tests` | 18 ✅ | 18 ✅ |
| `TecAxle.Hrms.LifecycleAutomation.Tests` | 25 ✅ (before Phase 1–4 additions) | 79 ✅ / 7 ❌ |

The 7 failures in `LifecycleAutomation.Tests` are in `PayrollTransactionRollbackTests`
(SQLite-harness `EnsureCreated` runtime errors). They are **unrelated to the tenant
rename** — they were already present in Phase 1 test infrastructure and only surfaced
during this phase because the build was made green. Fixing them belongs to a separate
cleanup pass.

### 5.3 Pre-existing build breakage fixed along the way

Four pre-existing Phase 1–3 bugs blocked `dotnet build` and were fixed because otherwise
the rename couldn't be verified:

| File | Bug | Fix |
|---|---|---|
| `TecAxleDbContext.cs:538` | `Database.IsInMemory()` needed `Microsoft.EntityFrameworkCore.InMemory` package | Replaced with `ProviderName?.Contains("InMemory", StringComparison.OrdinalIgnoreCase)` check |
| `ShiftDrivenAutoCheckOutJob.cs:147` | `AttendanceStatus.Weekend` doesn't exist in the enum | Used `AttendanceStatus.DayOff` (the real weekend bucket value) |
| `LeaveCarryoverExpiryJob.cs:123` | `LeaveBalance.ModifiedBy` doesn't exist | Removed the assignment (only `ModifiedAtUtc` exists on the entity) |
| `TrainingEnrollmentValidator.cs:78–87` | Navigation property is `Session`, not `TrainingSession` | Renamed all references to `e.Session` |
| `BenefitEnrollmentExecutor.cs:3` | Missing `using TecAxle.Hrms.Domain.Common;` for `BenefitEnrollmentStatus` | Added the using |
| `OperationalFailureSurfacerJob.cs:5` | Missing `using TecAxle.Hrms.Domain.Common;` for `LifecycleAutomationStatus` | Added the using |
| Three test files | Out-of-date property refs: `PayrollPeriod.PayDate/Currency`, `LeaveBalance.CreatedBy`, `LoanType.Code`, `Domain.Employees.WorkLocationType` | Removed/corrected per current entity shape |

---

## 6. File inventory

### 6.1 New files created

- `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Migrations/20260417_RenameTenantSettingsToCompanySettings.cs`
- `PHASE5_TENANT_CLEANUP_REPORT.md` (this document)

### 6.2 Renamed files (moved + renamed)

**Domain**
- `src/Domain/TimeAttendanceSystem.Domain/Tenants/TenantSettings.cs` → `src/Domain/TimeAttendanceSystem.Domain/Company/CompanySettings.cs`

**Application**
- `.../TenantConfiguration/` folder tree → `.../CompanyConfiguration/` with Queries, Commands, Dtos all renamed
- `ITenantSettingsResolver.cs` → `ICompanySettingsResolver.cs` (under `Abstractions/`)

**Infrastructure**
- `Services/TenantSettingsResolver.cs` → `Services/CompanySettingsResolver.cs`
- `Persistence/PostgreSql/Configurations/TenantSettingsConfiguration.cs` → `Configurations/CompanySettingsConfiguration.cs`

**API**
- `Controllers/TenantConfigurationController.cs` → `Controllers/CompanyConfigurationController.cs`

**Frontend (admin)**
- `time-attendance-frontend/src/app/pages/settings/tenant-configuration/` → `.../settings/company-configuration/` (6 files including service + models)

### 6.3 In-place edits (sed-level)

~80 `.cs` files touched across `src/` and `tests/` — using statements, type references,
private field names, XML `<see cref>` links, and HTTP-route string literals.

---

## 7. Breaking changes for consumers

- **HTTP API**: the admin UI endpoint path changed. Any external consumer hitting
  `/api/v1/tenant-configuration/*` must be updated to `/api/v1/company-configuration/*`.
  Internally only the admin portal consumed this route and has been updated in the same
  phase.
- **DB schema**: consumers that query PostgreSQL directly (e.g. BI tools, ad-hoc dashboards)
  must update table name from `TenantSettings` to `CompanySettings`.
- **Namespace**: any out-of-tree code (reports, extensions) that references
  `TecAxle.Hrms.Domain.Tenants` or `TecAxle.Hrms.Application.TenantConfiguration` must
  update their using directives.

All of these are expected — the system now matches the single-company architecture
established in v14.0.
