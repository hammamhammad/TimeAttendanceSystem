# Database-Agnostic Architecture Implementation Plan
## Time Attendance System - PostgreSQL & MS SQL Server Support

**Document Version:** 1.0
**Created:** October 23, 2025
**Status:** Planning Phase
**Target Completion:** 3-5 Business Days

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Current System Analysis](#current-system-analysis)
3. [Target Architecture](#target-architecture)
4. [Implementation Phases](#implementation-phases)
5. [Technical Details](#technical-details)
6. [Testing Strategy](#testing-strategy)
7. [Deployment Guide](#deployment-guide)
8. [Decision Matrix](#decision-matrix)
9. [Timeline & Resources](#timeline--resources)

---

## Executive Summary

### Objective
Transform the Time Attendance System into a **database-agnostic application** that supports both PostgreSQL and MS SQL Server, selectable via configuration at deployment time, while maintaining the existing SQL Server functionality without breaking changes.

### Key Benefits
- ✅ **Deployment Flexibility:** Choose database engine based on environment requirements
- ✅ **Cost Optimization:** Use PostgreSQL for cost-sensitive deployments
- ✅ **Cloud Agnostic:** Support Azure SQL, AWS RDS PostgreSQL, Google Cloud SQL
- ✅ **Zero Breaking Changes:** Existing SQL Server setup remains fully functional
- ✅ **Future-Proof:** Architecture supports adding more database providers
- ✅ **Compliance Ready:** Select database based on regional/regulatory requirements

### Architecture Principles
1. **Single Codebase:** One application supporting multiple database engines
2. **Configuration-Driven:** Database selection via `appsettings.json` or environment variables
3. **Provider Isolation:** Separate configurations and migrations per database provider
4. **Shared Business Logic:** Database-agnostic repositories and services
5. **Maintainability:** Clean folder structure with clear separation of concerns

---

## Current System Analysis

### Technology Stack
- **Framework:** .NET 9.0
- **ORM:** Entity Framework Core 9.0.0
- **Current Database:** MS SQL Server (latest)
- **Database Provider:** `Microsoft.EntityFrameworkCore.SqlServer` v9.0.0
- **Background Jobs:** Coravel v6.0.2
- **Authentication:** JWT Bearer tokens

### Database Schema Overview
- **Total Tables:** 33 entities
- **Migrations:** 15 migration files (September-October 2025)
- **Configuration Files:** 29 entity configuration classes
- **Seed Data:** SystemAdmin user, default shift, comprehensive permissions

### SQL Server-Specific Features in Use

#### 1. Identity Columns
```csharp
SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<long>("Id"));
```
**Impact:** PostgreSQL uses SERIAL or IDENTITY - compatible with minor migration changes

#### 2. RowVersion (Timestamp) for Concurrency Control
```csharp
builder.Property(x => x.RowVersion).IsRowVersion();
```
**SQL Server Type:** `rowversion` (auto-generated binary)
**Challenge:** PostgreSQL doesn't have equivalent - needs alternative strategy

#### 3. Filtered Indexes for Soft-Delete
```csharp
builder.HasIndex(x => x.Code)
    .IsUnique()
    .HasFilter("[IsDeleted] = 0");
```
**Challenge:** SQL Server uses `[Column] = 0` syntax, PostgreSQL uses `"Column" = false`

#### 4. Data Type Mappings

| SQL Server Type | Current Usage | PostgreSQL Equivalent | Compatibility |
|-----------------|---------------|----------------------|---------------|
| `datetime2` | Timestamps | `timestamp` | ✅ Auto-mapped |
| `date` | Date-only fields | `date` | ✅ Auto-mapped |
| `time` | Time-only fields | `time` | ✅ Auto-mapped |
| `decimal(x,y)` | Numeric precision | `numeric(x,y)` | ✅ Auto-mapped |
| `nvarchar(max)` | Large text | `text` | ✅ Auto-mapped |
| `varbinary(max)` | Binary data | `bytea` | ✅ Auto-mapped |
| `rowversion` | Concurrency token | `xmin` or custom | ⚠️ Needs strategy |
| `bit` | Boolean | `boolean` | ✅ Auto-mapped |
| `bigint` | Identity IDs | `bigint` SERIAL | ✅ Auto-mapped |

#### 5. Query Features
- **Multiple Active Result Sets (MARS):** Enabled in connection string
- **Transaction Isolation:** Default SQL Server isolation levels
- **Case Sensitivity:** Case-insensitive by default in SQL Server

### Entities and Configuration Files

#### Core Domain Entities (33 Tables)
1. **Organizational:** Branches, Departments
2. **Security:** Users, Roles, Permissions, RolePermissions, UserRoles, UserBranchScopes
3. **Authentication:** RefreshTokens, LoginAttempts, PasswordHistory, BlacklistedTokens, TwoFactorBackupCodes, UserSessions
4. **HR:** Employees, EmployeeUserLinks
5. **Audit:** AuditLogs, AuditChanges
6. **Shifts:** Shifts, ShiftPeriods, ShiftAssignments
7. **Attendance:** AttendanceRecords, AttendanceTransactions, WorkingDays
8. **Configuration:** OvertimeConfigurations, PublicHolidays, OffDays
9. **Leave Management:** VacationTypes, EmployeeVacations, ExcusePolicies, EmployeeExcuses
10. **Remote Work:** RemoteWorkPolicies, RemoteWorkRequests

#### Entity Configuration Files (29 Configurations)
Located in `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Configurations/`:

- AuditChangeConfiguration.cs
- AuditLogConfiguration.cs
- AttendanceRecordConfiguration.cs
- AttendanceTransactionConfiguration.cs
- BlacklistedTokenConfiguration.cs
- BranchConfiguration.cs
- DepartmentConfiguration.cs
- EmployeeConfiguration.cs
- EmployeeExcuseConfiguration.cs
- EmployeeUserLinkConfiguration.cs
- EmployeeVacationConfiguration.cs
- ExcusePolicyConfiguration.cs
- LoginAttemptConfiguration.cs
- OffDayConfiguration.cs
- OvertimeConfigurationConfiguration.cs
- PasswordHistoryConfiguration.cs
- PermissionConfiguration.cs
- PublicHolidayConfiguration.cs
- RefreshTokenConfiguration.cs
- RemoteWorkPolicyConfiguration.cs
- RemoteWorkRequestConfiguration.cs
- RoleConfiguration.cs
- RolePermissionConfiguration.cs
- ShiftAssignmentConfiguration.cs
- ShiftConfiguration.cs
- ShiftPeriodConfiguration.cs
- UserBranchScopeConfiguration.cs
- UserConfiguration.cs
- UserRoleConfiguration.cs
- VacationTypeConfiguration.cs
- WorkingDayConfiguration.cs

### Connection Strings Analysis

#### Current Configuration Files
1. `appsettings.json` - Base configuration
2. `appsettings.Development.json` - Development overrides
3. `appsettings.Production.json` - Production template
4. `appsettings.Docker.json` - Docker container config

#### Current SQL Server Connection String Pattern
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TimeAttendanceSystem;User Id=sa;Password=P@ssw0rd@321;TrustServerCertificate=true;MultipleActiveResultSets=true;Encrypt=false;"
  }
}
```

---

## Target Architecture

### Design Principles

#### 1. Provider Abstraction Layer
```
┌─────────────────────────────────────────────────┐
│         Application Layer (Business Logic)      │
│              Domain Services & Handlers         │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│      IApplicationDbContext (Interface)          │
│         Database-Agnostic Abstraction           │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│       TimeAttendanceDbContext (Shared)          │
│         DbSets, SaveChanges, Common Logic       │
└─────────────────────────────────────────────────┘
               ↙                    ↘
┌──────────────────────┐    ┌──────────────────────┐
│  SQL Server          │    │  PostgreSQL          │
│  Provider Layer      │    │  Provider Layer      │
│  - Configurations    │    │  - Configurations    │
│  - Migrations        │    │  - Migrations        │
│  - Specific Features │    │  - Specific Features │
└──────────────────────┘    └──────────────────────┘
```

#### 2. Configuration-Based Selection
```
Runtime → appsettings.json → DatabaseProvider → Load Correct Provider → Apply Configurations
```

### Folder Structure (New Organization)

```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/
│
├── Persistence/
│   │
│   ├── Common/                                    # ← NEW: Shared components
│   │   ├── TimeAttendanceDbContext.cs            # Shared DbContext (base)
│   │   ├── ApplicationDbContextAdapter.cs        # Adapter implementation
│   │   ├── SeedData.cs                           # Database-agnostic seeding
│   │   └── README.md                             # Documentation
│   │
│   ├── SqlServer/                                # ← NEW: SQL Server specific
│   │   ├── Configurations/                       # 29 entity configurations (existing)
│   │   │   ├── AuditLogConfiguration.cs
│   │   │   ├── BranchConfiguration.cs
│   │   │   └── ... (all 29 configs)
│   │   │
│   │   ├── Migrations/                           # SQL Server migrations (existing)
│   │   │   ├── 20250917064751_InitialCreateWithFixedCascades.cs
│   │   │   └── ... (all 15 migrations)
│   │   │
│   │   ├── SqlServerDbContextFactory.cs          # Design-time factory
│   │   └── README.md                             # SQL Server specific notes
│   │
│   ├── PostgreSql/                               # ← NEW: PostgreSQL specific
│   │   ├── Configurations/                       # 29 entity configurations (modified)
│   │   │   ├── AuditLogConfiguration.cs
│   │   │   ├── BranchConfiguration.cs
│   │   │   └── ... (all 29 configs adapted)
│   │   │
│   │   ├── Migrations/                           # PostgreSQL migrations (new)
│   │   │   └── (will be generated)
│   │   │
│   │   ├── PostgreSqlDbContextFactory.cs         # Design-time factory
│   │   └── README.md                             # PostgreSQL specific notes
│   │
│   └── Repositories/                             # Database-agnostic repositories
│       ├── AttendanceRepository.cs
│       ├── AttendanceTransactionRepository.cs
│       └── SettingsRepository.cs
│
├── DependencyInjection.cs                        # ← MODIFIED: Provider selection
├── TimeAttendanceSystem.Infrastructure.csproj    # ← MODIFIED: Add Npgsql package
└── README.md                                     # Infrastructure documentation
```

### Configuration Strategy

#### Enhanced appsettings.json Structure
```json
{
  "DatabaseProvider": "SqlServer",               // ← NEW: Provider selector

  "ConnectionStrings": {
    "SqlServerConnection": "Server=localhost;Database=TimeAttendanceSystem;User Id=sa;Password=P@ssw0rd@321;TrustServerCertificate=true;MultipleActiveResultSets=true;Encrypt=false;",

    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true;Trust Server Certificate=true"
  },

  // ... rest of configuration (JWT, CORS, etc.)
}
```

#### Environment-Specific Configurations

**appsettings.Development.json** (SQL Server)
```json
{
  "DatabaseProvider": "SqlServer",
  "ConnectionStrings": {
    "SqlServerConnection": "Server=localhost;Database=TimeAttendanceSystem_Dev;..."
  }
}
```

**appsettings.PostgreSql.json** (New file for PostgreSQL testing)
```json
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem_Dev;..."
  }
}
```

**appsettings.Production.json** (Flexible)
```json
{
  "DatabaseProvider": "SqlServer",  // Can be changed at deployment
  "ConnectionStrings": {
    "SqlServerConnection": "Server=prod-server;...",
    "PostgreSqlConnection": "Host=prod-postgres;..."
  }
}
```

#### Environment Variable Override
```bash
# Override provider at runtime
export DatabaseProvider="PostgreSql"

# Or via Docker
docker run -e DatabaseProvider=PostgreSql ...

# Or in Azure App Service / AWS Elastic Beanstalk
DatabaseProvider=SqlServer
```

---

## Implementation Phases

### Phase 1: Project Setup & Reorganization

#### 1.1 Add NuGet Packages
**File:** `src/Infrastructure/TimeAttendanceSystem.Infrastructure/TimeAttendanceSystem.Infrastructure.csproj`

**Add package:**
```xml
<ItemGroup>
  <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.0" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="9.0.0" />
  <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="9.0.0" />  ← NEW
  <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.0" />
  <!-- ... other packages ... -->
</ItemGroup>
```

**Commands:**
```bash
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 9.0.0
dotnet restore
```

#### 1.2 Create New Folder Structure
**Commands:**
```bash
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence

# Create new folders
mkdir Common
mkdir SqlServer
mkdir SqlServer/Configurations
mkdir SqlServer/Migrations
mkdir PostgreSql
mkdir PostgreSql/Configurations
mkdir PostgreSql/Migrations

# Move existing files
mv Configurations/* SqlServer/Configurations/
mv Migrations/* SqlServer/Migrations/
mv TimeAttendanceDbContext.cs Common/
mv ApplicationDbContextAdapter.cs Common/
mv SeedData.cs Common/
```

#### 1.3 Update Namespaces After Move
**Files to update:**
- `Common/TimeAttendanceDbContext.cs` → Keep namespace as `TimeAttendanceSystem.Infrastructure.Persistence`
- `SqlServer/Configurations/*.cs` → Update namespace to include `.SqlServer`
- Update any using statements in other files that reference moved classes

---

### Phase 2: Shared DbContext Refactoring

#### 2.1 Modify TimeAttendanceDbContext for Provider Support

**File:** `Persistence/Common/TimeAttendanceDbContext.cs`

**Key Changes:**

1. **Keep all DbSet properties** (database-agnostic)
2. **Update OnModelCreating** to load provider-specific configurations
3. **Keep SaveChangesAsync** logic (already database-agnostic)

**Modified OnModelCreating Method:**
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Detect which provider is being used
    var provider = Database.ProviderName;

    if (provider == "Microsoft.EntityFrameworkCore.SqlServer")
    {
        // Apply SQL Server specific configurations
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TimeAttendanceDbContext).Assembly,
            type => type.Namespace?.Contains("Persistence.SqlServer.Configurations") == true
        );
    }
    else if (provider == "Npgsql.EntityFrameworkCore.PostgreSQL")
    {
        // Apply PostgreSQL specific configurations
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TimeAttendanceDbContext).Assembly,
            type => type.Namespace?.Contains("Persistence.PostgreSql.Configurations") == true
        );
    }
    else
    {
        throw new NotSupportedException($"Database provider '{provider}' is not supported.");
    }

    base.OnModelCreating(modelBuilder);
}
```

#### 2.2 Design-Time DbContext Factories

**File:** `Persistence/SqlServer/SqlServerDbContextFactory.cs` (NEW)
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer;

/// <summary>
/// Design-time factory for SQL Server DbContext to support EF Core tooling (migrations, etc.)
/// </summary>
public class SqlServerDbContextFactory : IDesignTimeDbContextFactory<TimeAttendanceDbContext>
{
    public TimeAttendanceDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<TimeAttendanceDbContext>();
        var connectionString = configuration.GetConnectionString("SqlServerConnection");

        optionsBuilder.UseSqlServer(connectionString,
            options => options.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName));

        return new TimeAttendanceDbContext(optionsBuilder.Options);
    }
}
```

**File:** `Persistence/PostgreSql/PostgreSqlDbContextFactory.cs` (NEW)
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql;

/// <summary>
/// Design-time factory for PostgreSQL DbContext to support EF Core tooling (migrations, etc.)
/// </summary>
public class PostgreSqlDbContextFactory : IDesignTimeDbContextFactory<TimeAttendanceDbContext>
{
    public TimeAttendanceDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<TimeAttendanceDbContext>();
        var connectionString = configuration.GetConnectionString("PostgreSqlConnection");

        optionsBuilder.UseNpgsql(connectionString,
            options => options.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName));

        return new TimeAttendanceDbContext(optionsBuilder.Options);
    }
}
```

---

### Phase 3: Dependency Injection Configuration

#### 3.1 Update DependencyInjection.cs

**File:** `Infrastructure/DependencyInjection.cs`

**Replace DbContext registration:**

**OLD CODE:**
```csharp
services.AddDbContext<TimeAttendanceDbContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
```

**NEW CODE:**
```csharp
// Get database provider from configuration
var databaseProvider = configuration["DatabaseProvider"] ?? "SqlServer";

services.AddDbContext<TimeAttendanceDbContext>(options =>
{
    ConfigureDatabase(options, configuration, databaseProvider);
});

// ... rest of services ...

// Helper method for database configuration
private static void ConfigureDatabase(
    DbContextOptionsBuilder options,
    IConfiguration configuration,
    string provider)
{
    switch (provider.ToLowerInvariant())
    {
        case "sqlserver":
            var sqlConnectionString = configuration.GetConnectionString("SqlServerConnection")
                ?? configuration.GetConnectionString("DefaultConnection"); // Backward compatibility

            options.UseSqlServer(sqlConnectionString, sqlOptions =>
            {
                sqlOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
            });
            break;

        case "postgresql":
        case "postgres":
        case "npgsql":
            var pgConnectionString = configuration.GetConnectionString("PostgreSqlConnection");

            if (string.IsNullOrEmpty(pgConnectionString))
            {
                throw new InvalidOperationException(
                    "PostgreSQL connection string 'PostgreSqlConnection' is required when DatabaseProvider is PostgreSql.");
            }

            options.UseNpgsql(pgConnectionString, pgOptions =>
            {
                pgOptions.MigrationsAssembly(typeof(TimeAttendanceDbContext).Assembly.FullName);
                pgOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);
            });
            break;

        default:
            throw new InvalidOperationException(
                $"Unsupported database provider: '{provider}'. Supported providers: SqlServer, PostgreSql");
    }

    // Common options for all providers
    options.EnableSensitiveDataLogging(configuration.GetValue<bool>("Logging:EnableSensitiveDataLogging"));
    options.EnableDetailedErrors(configuration.GetValue<bool>("Logging:EnableDetailedErrors"));
}
```

#### 3.2 Add Configuration Logging
```csharp
public static IServiceCollection AddInfrastructure(
    this IServiceCollection services,
    IConfiguration configuration)
{
    var databaseProvider = configuration["DatabaseProvider"] ?? "SqlServer";
    var logger = services.BuildServiceProvider().GetService<ILogger<Program>>();
    logger?.LogInformation("Configuring database provider: {Provider}", databaseProvider);

    services.AddDbContext<TimeAttendanceDbContext>(options =>
    {
        ConfigureDatabase(options, configuration, databaseProvider);
    });

    // ... rest of infrastructure setup ...
}
```

---

### Phase 4: Entity Configuration Adaptation

#### 4.1 SQL Server Configurations (Keep Existing)

**Location:** `Persistence/SqlServer/Configurations/`

**Action:** Move existing configurations here with updated namespace

**Example - BranchConfiguration.cs:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Infrastructure.Persistence.SqlServer.Configurations;  // ← Updated namespace

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable("Branches");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        builder.Property(x => x.RowVersion)
            .IsRowVersion();  // SQL Server specific

        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");  // SQL Server syntax

        builder.HasQueryFilter(x => !x.IsDeleted);

        // ... rest of configuration
    }
}
```

#### 4.2 PostgreSQL Configurations (Create Adapted Versions)

**Location:** `Persistence/PostgreSql/Configurations/`

**Action:** Copy from SqlServer and modify provider-specific features

**Example - BranchConfiguration.cs (PostgreSQL version):**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql.Configurations;  // ← PostgreSQL namespace

public class BranchConfiguration : IEntityTypeConfiguration<Branch>
{
    public void Configure(EntityTypeBuilder<Branch> builder)
    {
        builder.ToTable("Branches");
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Code)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(x => x.Name)
            .HasMaxLength(200)
            .IsRequired();

        // PostgreSQL concurrency approach
        builder.Property(x => x.RowVersion)
            .IsConcurrencyToken()
            .ValueGeneratedOnAddOrUpdate();

        // PostgreSQL filtered index syntax
        builder.HasIndex(x => x.Code)
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");  // ← PostgreSQL syntax

        builder.HasQueryFilter(x => !x.IsDeleted);

        // ... rest of configuration (same as SQL Server)
    }
}
```

#### 4.3 Key Differences in PostgreSQL Configurations

##### A. RowVersion/Concurrency Token

**SQL Server (existing):**
```csharp
builder.Property(x => x.RowVersion)
    .IsRowVersion();
```

**PostgreSQL Option 1 - Use xmin system column:**
```csharp
builder.Property(x => x.RowVersion)
    .HasColumnName("xmin")
    .HasColumnType("xid")
    .ValueGeneratedOnAddOrUpdate()
    .IsConcurrencyToken();
```

**PostgreSQL Option 2 - Manual version field (RECOMMENDED):**
```csharp
// Keep RowVersion as byte[] in domain, but treat as manual version
builder.Property(x => x.RowVersion)
    .IsConcurrencyToken()
    .ValueGeneratedOnAddOrUpdate();
```

##### B. Filtered Indexes

**SQL Server:**
```csharp
builder.HasIndex(x => x.Code)
    .IsUnique()
    .HasFilter("[IsDeleted] = 0");
```

**PostgreSQL:**
```csharp
builder.HasIndex(x => x.Code)
    .IsUnique()
    .HasFilter("\"IsDeleted\" = false");  // Note: double quotes and = false
```

##### C. Column Type Specifications

**SQL Server (AuditLogConfiguration.cs):**
```csharp
builder.Property(x => x.PayloadJson)
    .HasColumnType("nvarchar(max)");
```

**PostgreSQL:**
```csharp
builder.Property(x => x.PayloadJson)
    .HasColumnType("text");  // Or let EF Core map automatically
```

#### 4.4 Configuration Migration Script

**Create a helper script to generate PostgreSQL configs from SQL Server:**

**File:** `Persistence/PostgreSql/GenerateConfigurations.ps1`
```powershell
# PowerShell script to adapt SQL Server configurations to PostgreSQL

$sqlServerConfigPath = "../SqlServer/Configurations"
$postgresConfigPath = "./Configurations"

Get-ChildItem "$sqlServerConfigPath/*.cs" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw

    # Update namespace
    $content = $content -replace "Persistence\.SqlServer\.Configurations", "Persistence.PostgreSql.Configurations"

    # Update filtered indexes
    $content = $content -replace '\[(\w+)\] = 0', '\"$1\" = false'
    $content = $content -replace '\[(\w+)\] = 1', '\"$1\" = true'

    # Update RowVersion (simple approach - manual version)
    $content = $content -replace '\.IsRowVersion\(\)', '.IsConcurrencyToken().ValueGeneratedOnAddOrUpdate()'

    # Optionally update nvarchar(max) to text
    $content = $content -replace 'nvarchar\(max\)', 'text'

    # Write to PostgreSQL config folder
    $outputFile = Join-Path $postgresConfigPath $_.Name
    Set-Content -Path $outputFile -Value $content

    Write-Host "Generated: $($_.Name)"
}

Write-Host "PostgreSQL configurations generated successfully!"
```

---

### Phase 5: Migration Management

#### 5.1 Migration Commands for Each Provider

##### SQL Server Migrations (Existing)
```bash
# Set environment to use SQL Server
$env:DatabaseProvider="SqlServer"

# Navigate to project root
cd "d:\Work\AI Code\TimeAttendanceSystem"

# Add new migration
dotnet ef migrations add MigrationName `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext `
    --output-dir Persistence/SqlServer/Migrations

# Update database
dotnet ef database update `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext

# Remove last migration (if needed)
dotnet ef migrations remove `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext
```

##### PostgreSQL Migrations (New)
```bash
# Set environment to use PostgreSQL
$env:DatabaseProvider="PostgreSql"

# Ensure PostgreSQL connection string is configured
# Modify appsettings.json temporarily or use appsettings.PostgreSql.json

# Add new migration
dotnet ef migrations add MigrationName `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext `
    --output-dir Persistence/PostgreSql/Migrations

# Update database
dotnet ef database update `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext
```

#### 5.2 Create Initial PostgreSQL Migration

**Steps:**
1. **Configure PostgreSQL connection** in `appsettings.json`
2. **Set DatabaseProvider** to "PostgreSql"
3. **Run migration command:**

```bash
# Ensure PostgreSQL server is running
# Create database first: CREATE DATABASE TimeAttendanceSystem;

cd "d:\Work\AI Code\TimeAttendanceSystem"

$env:DatabaseProvider="PostgreSql"

dotnet ef migrations add InitialPostgreSQL `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext `
    --output-dir Persistence/PostgreSql/Migrations `
    --verbose
```

4. **Review generated migration** for PostgreSQL-specific syntax
5. **Apply migration:**

```bash
dotnet ef database update `
    --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
    --startup-project src/Api/TimeAttendanceSystem.Api `
    --context TimeAttendanceDbContext `
    --verbose
```

#### 5.3 Migration History Management

**Approach:** Use separate migration history tables per provider

**SQL Server:** `__EFMigrationsHistory` (default)
**PostgreSQL:** `__EFMigrationsHistory` (default, separate database)

**No conflicts because:**
- Each provider uses its own database
- Migration history is stored in the target database
- Switching providers doesn't affect migration history

---

### Phase 6: Configuration Files Update

#### 6.1 Update appsettings.json

**File:** `src/Api/TimeAttendanceSystem.Api/appsettings.json`

**Changes:**
```json
{
  "DatabaseProvider": "SqlServer",  // ← NEW: Default provider

  "ConnectionStrings": {
    "SqlServerConnection": "Server=localhost;Database=TimeAttendanceSystem;User Id=sa;Password=P@ssw0rd@321;TrustServerCertificate=true;MultipleActiveResultSets=true;Encrypt=false;",

    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true",

    // Keep backward compatibility
    "DefaultConnection": "Server=localhost;Database=TimeAttendanceSystem;User Id=sa;Password=P@ssw0rd@321;TrustServerCertificate=true;MultipleActiveResultSets=true;Encrypt=false;"
  },

  "Jwt": {
    // ... existing JWT config ...
  },

  "Cors": {
    // ... existing CORS config ...
  },

  "AttendanceScheduling": {
    // ... existing scheduling config ...
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information",  // ← Helpful for debugging
      "TimeAttendanceSystem.Infrastructure.Services.AttendanceSchedulingService": "Information"
    },
    "EnableSensitiveDataLogging": false,  // ← NEW: For development debugging
    "EnableDetailedErrors": false         // ← NEW: For development debugging
  },

  "AllowedHosts": "*"
}
```

#### 6.2 Update appsettings.Development.json

```json
{
  "DatabaseProvider": "SqlServer",  // ← Can switch to PostgreSql for testing

  "ConnectionStrings": {
    "SqlServerConnection": "Server=localhost;Database=TimeAttendanceSystem_Dev;User Id=sa;Password=P@ssw0rd@321;TrustServerCertificate=true;",

    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem_Dev;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    },
    "EnableSensitiveDataLogging": true,   // ← Enable in development
    "EnableDetailedErrors": true          // ← Enable in development
  }
}
```

#### 6.3 Create appsettings.PostgreSql.json (New File)

**File:** `src/Api/TimeAttendanceSystem.Api/appsettings.PostgreSql.json`

```json
{
  "DatabaseProvider": "PostgreSql",

  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true;Trust Server Certificate=true"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Information",
      "Npgsql": "Information"  // ← PostgreSQL provider logging
    },
    "EnableSensitiveDataLogging": true,
    "EnableDetailedErrors": true
  }
}
```

**Usage:**
```bash
# Run with PostgreSQL configuration
dotnet run --environment PostgreSql

# Or set environment variable
$env:ASPNETCORE_ENVIRONMENT="PostgreSql"
dotnet run
```

#### 6.4 Update appsettings.Production.json

```json
{
  "DatabaseProvider": "SqlServer",  // ← Set based on production requirements

  "ConnectionStrings": {
    "SqlServerConnection": "Server=your-production-server;Database=TimeAttendanceSystem;User Id=your-user;Password=your-secure-password;TrustServerCertificate=true;",

    "PostgreSqlConnection": "Host=your-postgres-server;Port=5432;Database=TimeAttendanceSystem;Username=your-user;Password=your-secure-password;SSL Mode=Require;"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    },
    "EnableSensitiveDataLogging": false,  // ← Disable in production
    "EnableDetailedErrors": false         // ← Disable in production
  },

  "AllowedHosts": "yourdomain.com;*.yourdomain.com"
}
```

#### 6.5 Update appsettings.Docker.json

```json
{
  "DatabaseProvider": "SqlServer",  // ← Can be overridden by env variable

  "ConnectionStrings": {
    "SqlServerConnection": "Server=sqlserver;Database=TimeAttendanceSystem;User Id=sa;Password=YourStrong@Password;TrustServerCertificate=true;",

    "PostgreSqlConnection": "Host=postgres;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=YourStrong@Password"
  },

  "Cors": {
    "PolicyName": "DefaultCorsPolicy",
    "AllowedOrigins": [
      "http://frontend:80",
      "http://frontend:3000",
      "http://localhost:4200",
      "https://localhost:4200"
    ],
    // ... rest of CORS config ...
  },

  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  },

  "AllowedHosts": "*"
}
```

---

### Phase 7: Domain Model Considerations

#### 7.1 RowVersion Property Strategy

**Current Domain Entity (BaseEntity):**
```csharp
public abstract class BaseEntity
{
    public long Id { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string CreatedBy { get; set; } = string.Empty;
    public DateTime? ModifiedAtUtc { get; set; }
    public string? ModifiedBy { get; set; }
    public bool IsDeleted { get; set; }
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();  // ← Concurrency token
}
```

**Recommendations:**

**Option A: Keep byte[] RowVersion (Recommended)**
- Works with both SQL Server and PostgreSQL
- SQL Server: Uses `rowversion` type automatically
- PostgreSQL: Uses manual versioning with `ValueGeneratedOnAddOrUpdate()`
- No domain model changes required

**Option B: Add separate Version property**
```csharp
public abstract class BaseEntity
{
    // ... existing properties ...

    public byte[] RowVersion { get; set; } = Array.Empty<byte>();  // SQL Server

    [Timestamp]  // For PostgreSQL
    public long Version { get; set; }
}
```

**Option C: Use xmin for PostgreSQL**
- Requires configuration in PostgreSQL configs
- No domain changes needed
- PostgreSQL automatically manages xmin

**Decision:** Stick with **Option A** for simplicity and compatibility.

---

## Technical Details

### Database Provider Feature Comparison

| Feature | SQL Server | PostgreSQL | Compatibility Strategy |
|---------|-----------|------------|----------------------|
| **Identity Columns** | IDENTITY(1,1) | SERIAL / GENERATED ALWAYS | ✅ EF Core handles automatically |
| **Concurrency Control** | rowversion | xmin or manual | ⚠️ Manual version recommended |
| **Filtered Indexes** | [Col] = 0 | "Col" = false | ⚠️ Separate configs per provider |
| **Case Sensitivity** | Case-insensitive | Case-sensitive | ⚠️ Use ILIKE or LOWER() in queries |
| **String Types** | nvarchar(max) | text | ✅ EF Core maps automatically |
| **Date/Time** | datetime2 | timestamp | ✅ EF Core maps automatically |
| **Decimal** | decimal(p,s) | numeric(p,s) | ✅ Compatible |
| **Boolean** | bit | boolean | ✅ EF Core maps automatically |
| **GUID** | uniqueidentifier | uuid | ✅ EF Core maps automatically |
| **Binary** | varbinary(max) | bytea | ✅ EF Core maps automatically |
| **Transactions** | Yes | Yes | ✅ Both support ACID |
| **Sequences** | Yes | Yes | ✅ Both supported |
| **Full-Text Search** | Yes | Yes | ⚠️ Different syntax |
| **JSON Support** | JSON/JSONB | JSONB | ⚠️ Different functions |

### PostgreSQL Connection String Options

```
Host=localhost;
Port=5432;
Database=TimeAttendanceSystem;
Username=postgres;
Password=YourPassword;
SSL Mode=Prefer;                    # Prefer, Require, Disable
Trust Server Certificate=true;
Include Error Detail=true;          # Helpful for debugging
Timeout=30;
Command Timeout=30;
Pooling=true;
Minimum Pool Size=0;
Maximum Pool Size=100;
```

### SQL Server Connection String Options

```
Server=localhost;
Database=TimeAttendanceSystem;
User Id=sa;
Password=YourPassword;
TrustServerCertificate=true;
MultipleActiveResultSets=true;
Encrypt=false;                      # Or true for encrypted connections
Connection Timeout=30;
Max Pool Size=100;
Min Pool Size=0;
```

---

## Testing Strategy

### Unit Testing Approach

#### 1. Provider-Agnostic Repository Tests
**Location:** `tests/Infrastructure.Tests/Repositories/`

**Strategy:** Test repositories with both providers using parameterized tests

**Example:**
```csharp
[Theory]
[InlineData("SqlServer")]
[InlineData("PostgreSql")]
public async Task GetByIdAsync_ShouldReturnEmployee_WhenExists(string provider)
{
    // Arrange
    var context = CreateTestContext(provider);
    var repository = new EmployeeRepository(context);
    var employee = CreateTestEmployee();
    await context.Employees.AddAsync(employee);
    await context.SaveChangesAsync();

    // Act
    var result = await repository.GetByIdAsync(employee.Id);

    // Assert
    Assert.NotNull(result);
    Assert.Equal(employee.Id, result.Id);
}

private TimeAttendanceDbContext CreateTestContext(string provider)
{
    var options = provider switch
    {
        "SqlServer" => new DbContextOptionsBuilder<TimeAttendanceDbContext>()
            .UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=TestDb;Trusted_Connection=true")
            .Options,

        "PostgreSql" => new DbContextOptionsBuilder<TimeAttendanceDbContext>()
            .UseNpgsql("Host=localhost;Database=TestDb;Username=postgres;Password=test")
            .Options,

        _ => throw new ArgumentException($"Unknown provider: {provider}")
    };

    return new TimeAttendanceDbContext(options);
}
```

#### 2. Migration Tests
**Verify:**
- All migrations apply successfully
- Schema matches expected structure
- Indexes are created correctly
- Foreign keys are enforced

```csharp
[Fact]
public async Task SqlServer_Migrations_ShouldApplySuccessfully()
{
    var context = CreateTestContext("SqlServer");
    await context.Database.MigrateAsync();

    // Verify tables exist
    var tables = await context.Database.SqlQueryRaw<string>(
        "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'")
        .ToListAsync();

    Assert.Contains("Branches", tables);
    Assert.Contains("Users", tables);
    // ... verify all 33 tables
}

[Fact]
public async Task PostgreSql_Migrations_ShouldApplySuccessfully()
{
    var context = CreateTestContext("PostgreSql");
    await context.Database.MigrateAsync();

    // Verify tables exist
    var tables = await context.Database.SqlQueryRaw<string>(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
        .ToListAsync();

    Assert.Contains("Branches", tables);
    Assert.Contains("Users", tables);
    // ... verify all 33 tables
}
```

#### 3. Concurrency Tests
```csharp
[Theory]
[InlineData("SqlServer")]
[InlineData("PostgreSql")]
public async Task SaveChanges_ShouldThrowConcurrencyException_WhenRowVersionMismatch(string provider)
{
    var context1 = CreateTestContext(provider);
    var context2 = CreateTestContext(provider);

    var employee = CreateTestEmployee();
    await context1.Employees.AddAsync(employee);
    await context1.SaveChangesAsync();

    // Load in both contexts
    var emp1 = await context1.Employees.FindAsync(employee.Id);
    var emp2 = await context2.Employees.FindAsync(employee.Id);

    // Update in context1
    emp1.Name = "Updated Name";
    await context1.SaveChangesAsync();

    // Try to update in context2 - should fail
    emp2.Name = "Another Name";
    await Assert.ThrowsAsync<DbUpdateConcurrencyException>(
        async () => await context2.SaveChangesAsync()
    );
}
```

### Integration Testing

#### 1. Full Application Tests
**Location:** `tests/Integration.Tests/`

**Test scenarios:**
- API endpoints work with both providers
- Authentication/authorization works correctly
- Background jobs execute properly
- Data integrity maintained
- Performance benchmarks

**Example:**
```csharp
public class IntegrationTestFactory : WebApplicationFactory<Program>
{
    private readonly string _provider;

    public IntegrationTestFactory(string provider)
    {
        _provider = provider;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((context, config) =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string>
            {
                ["DatabaseProvider"] = _provider,
                // ... test connection strings
            });
        });
    }
}

[Theory]
[InlineData("SqlServer")]
[InlineData("PostgreSql")]
public async Task Login_ShouldReturnToken_WithBothProviders(string provider)
{
    // Arrange
    var factory = new IntegrationTestFactory(provider);
    var client = factory.CreateClient();

    // Act
    var response = await client.PostAsJsonAsync("/api/auth/login", new
    {
        Username = "systemadmin",
        Password = "TempP@ssw0rd123!"
    });

    // Assert
    response.EnsureSuccessStatusCode();
    var result = await response.Content.ReadFromJsonAsync<LoginResponse>();
    Assert.NotNull(result?.Token);
}
```

#### 2. Data Migration Tests
**Test scenarios:**
- Export data from SQL Server
- Import data to PostgreSQL
- Verify data integrity
- Check foreign key relationships

### Manual Testing Checklist

#### Phase 1: SQL Server Testing (Regression)
- [ ] Application starts successfully
- [ ] Database migrations apply correctly
- [ ] Login with systemadmin works
- [ ] Create new user
- [ ] Create new branch
- [ ] Create new employee
- [ ] Record attendance transaction
- [ ] Generate attendance records
- [ ] Create vacation request
- [ ] Approve vacation request
- [ ] Background jobs execute
- [ ] Audit logs created
- [ ] Concurrency control works

#### Phase 2: PostgreSQL Testing (New)
- [ ] Application starts with PostgreSql provider
- [ ] Database migrations apply correctly
- [ ] All seed data created
- [ ] Login with systemadmin works
- [ ] All CRUD operations work
- [ ] Complex queries execute correctly
- [ ] Filtered indexes work correctly
- [ ] Concurrency control works
- [ ] Background jobs execute
- [ ] Performance acceptable

#### Phase 3: Switching Testing
- [ ] Switch from SQL Server to PostgreSQL
- [ ] Application restarts successfully
- [ ] Switch back to SQL Server
- [ ] No data loss or corruption

### Performance Testing

#### Baseline Metrics (SQL Server)
- Login response time: < 200ms
- List employees (100 records): < 300ms
- Attendance report (1 month): < 500ms
- Background job execution: < 30s

#### PostgreSQL Comparison
- Measure same operations
- Compare performance
- Optimize if needed

---

## Deployment Guide

### Development Environment Setup

#### 1. Install PostgreSQL
**Windows:**
```powershell
# Download from https://www.postgresql.org/download/windows/
# Or use Chocolatey
choco install postgresql

# Or use Docker
docker run -d `
  --name postgres-dev `
  -e POSTGRES_PASSWORD=P@ssw0rd@321 `
  -p 5432:5432 `
  postgres:17
```

**Linux/Mac:**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql-17

# macOS
brew install postgresql@17

# Or use Docker
docker run -d \
  --name postgres-dev \
  -e POSTGRES_PASSWORD=P@ssw0rd@321 \
  -p 5432:5432 \
  postgres:17
```

#### 2. Create Database
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE "TimeAttendanceSystem";

-- Create user (optional, if not using postgres superuser)
CREATE USER tas_admin WITH PASSWORD 'P@ssw0rd@321';
GRANT ALL PRIVILEGES ON DATABASE "TimeAttendanceSystem" TO tas_admin;

-- Connect to database
\c TimeAttendanceSystem

-- Verify
SELECT version();
```

#### 3. Configure Application
```bash
# Update appsettings.Development.json
code src/Api/TimeAttendanceSystem.Api/appsettings.Development.json

# Set DatabaseProvider to PostgreSql
# Update PostgreSqlConnection string

# Apply migrations
cd "d:\Work\AI Code\TimeAttendanceSystem"
$env:DatabaseProvider="PostgreSql"

dotnet ef database update `
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
  --startup-project src/Api/TimeAttendanceSystem.Api
```

#### 4. Run Application
```bash
cd src/Api/TimeAttendanceSystem.Api

# Run with PostgreSQL
$env:DatabaseProvider="PostgreSql"
dotnet run

# Or run with SQL Server (default)
$env:DatabaseProvider="SqlServer"
dotnet run
```

### Docker Deployment

#### docker-compose.yml (Multi-Database Support)
```yaml
version: '3.8'

services:
  # SQL Server service
  sqlserver:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: tas-sqlserver
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong@Password
    ports:
      - "1433:1433"
    volumes:
      - sqlserver-data:/var/opt/mssql
    networks:
      - tas-network

  # PostgreSQL service
  postgres:
    image: postgres:17
    container_name: tas-postgres
    environment:
      - POSTGRES_PASSWORD=YourStrong@Password
      - POSTGRES_DB=TimeAttendanceSystem
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - tas-network

  # Backend API
  api:
    build:
      context: .
      dockerfile: src/Api/TimeAttendanceSystem.Api/Dockerfile
    container_name: tas-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Docker
      - DatabaseProvider=SqlServer  # or PostgreSql
      - ConnectionStrings__SqlServerConnection=Server=sqlserver;Database=TimeAttendanceSystem;User Id=sa;Password=YourStrong@Password;TrustServerCertificate=true;
      - ConnectionStrings__PostgreSqlConnection=Host=postgres;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=YourStrong@Password;
    ports:
      - "5099:8080"
    depends_on:
      - sqlserver
      - postgres
    networks:
      - tas-network

  # Frontend (Angular)
  frontend:
    build:
      context: ./time-attendance-frontend
      dockerfile: Dockerfile
    container_name: tas-frontend
    ports:
      - "4200:80"
    depends_on:
      - api
    networks:
      - tas-network

volumes:
  sqlserver-data:
  postgres-data:

networks:
  tas-network:
    driver: bridge
```

### Cloud Deployment

#### Azure Deployment (SQL Server)
```bash
# Azure SQL Database
az sql server create --name tas-sql-server --resource-group tas-rg --location eastus --admin-user tas_admin --admin-password YourSecurePassword

az sql db create --resource-group tas-rg --server tas-sql-server --name TimeAttendanceSystem --service-objective S0

# Update App Service configuration
az webapp config appsettings set --resource-group tas-rg --name tas-app --settings \
  DatabaseProvider=SqlServer \
  ConnectionStrings__SqlServerConnection="Server=tas-sql-server.database.windows.net;Database=TimeAttendanceSystem;User Id=tas_admin;Password=YourSecurePassword;"
```

#### AWS Deployment (PostgreSQL)
```bash
# RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier tas-postgres \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version 17 \
  --master-username tas_admin \
  --master-user-password YourSecurePassword \
  --allocated-storage 20

# Update Elastic Beanstalk environment
aws elasticbeanstalk update-environment \
  --environment-name tas-prod \
  --option-settings \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=DatabaseProvider,Value=PostgreSql \
    Namespace=aws:elasticbeanstalk:application:environment,OptionName=ConnectionStrings__PostgreSqlConnection,Value="Host=tas-postgres.xxx.us-east-1.rds.amazonaws.com;Database=TimeAttendanceSystem;Username=tas_admin;Password=YourSecurePassword;"
```

### Data Migration Between Providers

#### Scenario: Migrate from SQL Server to PostgreSQL

**Step 1: Export SQL Server Data**
```bash
# Using SQL Server Management Studio (SSMS)
# Right-click database → Tasks → Generate Scripts → Select all objects

# Or use bcp utility
bcp TimeAttendanceSystem.dbo.Users out users.csv -c -T

# Or use custom C# export script
dotnet run --project DataExportTool
```

**Step 2: Prepare PostgreSQL Database**
```bash
# Apply migrations
$env:DatabaseProvider="PostgreSql"
dotnet ef database update
```

**Step 3: Import Data**
```bash
# Using pgLoader (recommended)
pgloader sqlserver://sa:password@localhost/TimeAttendanceSystem \
         postgresql://postgres:password@localhost/TimeAttendanceSystem

# Or use COPY command
\COPY users FROM 'users.csv' WITH CSV HEADER;

# Or use custom C# import script
dotnet run --project DataImportTool
```

**Step 4: Verify Data Integrity**
```sql
-- Check row counts match
SELECT COUNT(*) FROM Users;
SELECT COUNT(*) FROM Branches;
-- ... check all tables

-- Verify foreign keys
SELECT * FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY';

-- Test application
```

---

## Decision Matrix

### ✅ APPROVED DECISIONS (Selected Recommendations)

All decisions below have been **APPROVED** and will be implemented as specified.

| # | Decision | Selected Option | Rationale | Impact |
|---|----------|-----------------|-----------|---------|
| **1** | **RowVersion Strategy** | ✅ **Option B: Manual version field** | Works consistently across both providers without domain model changes | Medium - affects all 29 entity configs |
| **2** | **Default Provider** | ✅ **Option A: SQL Server** | Maintains backward compatibility with existing deployments | Low - no breaking changes |
| **3** | **Configuration Priority** | ✅ **Option C: Both (env overrides appsettings)** | Maximum flexibility for different environments | Low - standard .NET pattern |
| **4** | **Migration History** | ✅ **Option A: Separate per provider** | Natural separation, no conflicts, cleaner organization | Low - each DB has own history |
| **5** | **DbContext Design** | ✅ **Option A: Single context with conditional config** | Simpler maintenance, less code duplication | Low - easier to maintain |
| **6** | **Testing Strategy** | ✅ **Option A: Parameterized tests for both** | Ensures both providers are tested equally | Medium - comprehensive coverage |
| **7** | **Filtered Index Syntax** | ✅ **Option A: Provider-specific configs** | Clearest, most maintainable approach | High - critical for correctness |
| **8** | **Case Sensitivity** | ✅ **Option A: Handle in code** | More portable, doesn't rely on DB config | Medium - affects query patterns |

---

### Implementation Details for Approved Decisions

#### ✅ Decision 1: RowVersion Strategy - Manual Version Field

**Implementation:**
```csharp
// SQL Server Configuration
builder.Property(x => x.RowVersion)
    .IsRowVersion();  // Uses SQL Server rowversion type

// PostgreSQL Configuration
builder.Property(x => x.RowVersion)
    .IsConcurrencyToken()
    .ValueGeneratedOnAddOrUpdate();  // Manual versioning
```

**Action Items:**
- Keep existing `byte[] RowVersion` property in `BaseEntity`
- Update all 29 PostgreSQL configurations to use `IsConcurrencyToken()`
- Keep SQL Server configurations unchanged with `.IsRowVersion()`

---

#### ✅ Decision 2: Default Provider - SQL Server

**Implementation:**
```json
{
  "DatabaseProvider": "SqlServer"  // Default in appsettings.json
}
```

**Action Items:**
- Set `DatabaseProvider` to "SqlServer" in all base appsettings files
- Document how to switch to PostgreSQL in README
- Ensure backward compatibility with existing deployments

---

#### ✅ Decision 3: Configuration Priority - Environment Variables Override

**Implementation:**
```csharp
// Configuration order (later overrides earlier):
// 1. appsettings.json
// 2. appsettings.{Environment}.json
// 3. Environment variables
// 4. Command-line arguments

var databaseProvider = configuration["DatabaseProvider"] ?? "SqlServer";
```

**Environment Variable Examples:**
```bash
# Windows
$env:DatabaseProvider="PostgreSql"

# Linux/Mac
export DatabaseProvider=PostgreSql

# Docker
-e DatabaseProvider=PostgreSql
```

**Action Items:**
- Use standard .NET configuration builder (already in place)
- Document environment variable override in deployment guide
- Add examples for all deployment scenarios

---

#### ✅ Decision 4: Migration History - Separate Per Provider

**Folder Structure:**
```
Persistence/
├── SqlServer/
│   └── Migrations/
│       ├── 20250917064751_InitialCreate.cs
│       └── __EFMigrationsHistory (in SQL Server DB)
│
└── PostgreSql/
    └── Migrations/
        ├── 20251023000000_InitialPostgreSQL.cs
        └── __EFMigrationsHistory (in PostgreSQL DB)
```

**Benefits:**
- No conflicts between providers
- Each database maintains its own history
- Clean separation of concerns
- Easy to manage independently

**Action Items:**
- Use `--output-dir` parameter when creating migrations
- Keep existing SQL Server migrations in `SqlServer/Migrations/`
- Create new PostgreSQL migrations in `PostgreSql/Migrations/`

---

#### ✅ Decision 5: DbContext Design - Single Context with Conditional Config

**Implementation:**
```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    var provider = Database.ProviderName;

    if (provider == "Microsoft.EntityFrameworkCore.SqlServer")
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TimeAttendanceDbContext).Assembly,
            t => t.Namespace?.Contains("Persistence.SqlServer.Configurations") == true
        );
    }
    else if (provider == "Npgsql.EntityFrameworkCore.PostgreSQL")
    {
        modelBuilder.ApplyConfigurationsFromAssembly(
            typeof(TimeAttendanceDbContext).Assembly,
            t => t.Namespace?.Contains("Persistence.PostgreSql.Configurations") == true
        );
    }

    base.OnModelCreating(modelBuilder);
}
```

**Benefits:**
- Single DbContext class to maintain
- DbSets defined once
- SaveChangesAsync logic shared
- Provider-specific configs loaded automatically

**Action Items:**
- Modify `OnModelCreating` in `TimeAttendanceDbContext.cs`
- Organize configurations by provider in separate namespaces
- Test configuration loading for both providers

---

#### ✅ Decision 6: Testing Strategy - Parameterized Tests

**Implementation:**
```csharp
[Theory]
[InlineData("SqlServer")]
[InlineData("PostgreSql")]
public async Task Repository_Should_Work_With_BothProviders(string provider)
{
    // Arrange
    var context = CreateTestContext(provider);
    var repository = new Repository(context);

    // Act & Assert
    // Same test code for both providers
}
```

**Benefits:**
- Both providers tested equally
- Single test maintenance
- Catches provider-specific issues
- Confidence in both implementations

**Action Items:**
- Create parameterized test base class
- Update existing tests to support both providers
- Add new tests for provider-specific features
- Set up CI/CD to run tests for both providers

---

#### ✅ Decision 7: Filtered Index Syntax - Provider-Specific Configs

**SQL Server Configuration:**
```csharp
builder.HasIndex(x => x.Code)
    .IsUnique()
    .HasFilter("[IsDeleted] = 0");  // SQL Server T-SQL syntax
```

**PostgreSQL Configuration:**
```csharp
builder.HasIndex(x => x.Code)
    .IsUnique()
    .HasFilter("\"IsDeleted\" = false");  // PostgreSQL SQL syntax
```

**Benefits:**
- Clearest intent - no magic or runtime detection
- Easiest to maintain and debug
- Works reliably for both providers
- No performance overhead

**Action Items:**
- Update all filtered indexes in PostgreSQL configurations (11 occurrences)
- Keep SQL Server configurations unchanged
- Document syntax differences in README

---

#### ✅ Decision 8: Case Sensitivity - Handle in Code

**Implementation:**
```csharp
// For case-insensitive searches in PostgreSQL
public async Task<User?> GetByUsernameAsync(string username)
{
    // SQL Server: case-insensitive by default
    // PostgreSQL: use ILIKE or LOWER()

    if (Database.ProviderName.Contains("Npgsql"))
    {
        return await Users
            .FirstOrDefaultAsync(u => EF.Functions.ILike(u.Username, username));
    }

    return await Users
        .FirstOrDefaultAsync(u => u.Username == username);
}
```

**Or use ToLower() approach:**
```csharp
return await Users
    .FirstOrDefaultAsync(u => u.Username.ToLower() == username.ToLower());
```

**Benefits:**
- Works across both providers
- No database collation changes needed
- Portable code
- Explicit behavior

**Action Items:**
- Review all string comparison queries
- Add provider-specific handling where needed
- Document case sensitivity behavior
- Consider adding extension methods for common patterns

---

### Decision Summary Checklist

- ✅ **Decision 1:** Manual version field for concurrency
- ✅ **Decision 2:** SQL Server as default provider
- ✅ **Decision 3:** Environment variables can override config
- ✅ **Decision 4:** Separate migration folders per provider
- ✅ **Decision 5:** Single DbContext with conditional configs
- ✅ **Decision 6:** Parameterized tests for both providers
- ✅ **Decision 7:** Provider-specific filtered index syntax
- ✅ **Decision 8:** Handle case sensitivity in code

**Status:** All decisions approved and documented ✅

**Ready to proceed:** YES - Implementation can begin following Phase 1

---

## Timeline & Resources

### Estimated Timeline

| Phase | Task | Duration | Dependencies |
|-------|------|----------|--------------|
| **Phase 1** | Project Setup & Reorganization | 3-4 hours | None |
| **Phase 2** | Shared DbContext Refactoring | 2-3 hours | Phase 1 |
| **Phase 3** | Dependency Injection Config | 2-3 hours | Phase 2 |
| **Phase 4** | Entity Configuration Adaptation | 6-8 hours | Phase 1 |
| **Phase 5** | Migration Management | 3-4 hours | Phase 4 |
| **Phase 6** | Configuration Files Update | 1-2 hours | Phase 3 |
| **Phase 7** | Testing & Validation | 8-12 hours | All previous |
| **Documentation** | Update docs, create guides | 3-4 hours | Ongoing |
| **Deployment** | Deploy to staging/prod | 2-4 hours | Phase 7 complete |
| **Buffer** | Contingency for issues | 4-6 hours | - |
| **Total** | **34-50 hours** | **5-7 business days** | - |

### Resource Requirements

#### Human Resources
- **Backend Developer:** 1 person, full-time for implementation
- **DevOps Engineer:** 1 person, part-time for deployment setup
- **QA Tester:** 1 person, part-time for testing
- **DBA:** 1 person, part-time for PostgreSQL setup

#### Infrastructure Resources
- **Development:**
  - PostgreSQL 17+ instance (local or cloud)
  - SQL Server instance (existing)
  - Development workstation

- **Testing:**
  - Test SQL Server database
  - Test PostgreSQL database
  - CI/CD pipeline updates

- **Production:**
  - PostgreSQL production instance (if deploying)
  - Backup storage for both providers
  - Monitoring tools

### Milestones

| Milestone | Date | Deliverable |
|-----------|------|-------------|
| M1: Planning Complete | Day 0 | This document finalized |
| M2: Code Structure Ready | Day 1 | Folders reorganized, packages added |
| M3: PostgreSQL Configs Created | Day 2 | All 29 configurations adapted |
| M4: Initial PostgreSQL Migration | Day 3 | Database schema created in PostgreSQL |
| M5: Testing Complete | Day 5 | All tests passing for both providers |
| M6: Documentation Complete | Day 6 | All docs updated |
| M7: Production Ready | Day 7 | Deployed to staging, ready for prod |

---

## Appendix

### A. Quick Reference Commands

#### Switch to SQL Server
```bash
$env:DatabaseProvider="SqlServer"
dotnet run
```

#### Switch to PostgreSQL
```bash
$env:DatabaseProvider="PostgreSql"
dotnet run
```

#### Create SQL Server Migration
```bash
$env:DatabaseProvider="SqlServer"
dotnet ef migrations add MigrationName `
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
  --startup-project src/Api/TimeAttendanceSystem.Api `
  --output-dir Persistence/SqlServer/Migrations
```

#### Create PostgreSQL Migration
```bash
$env:DatabaseProvider="PostgreSql"
dotnet ef migrations add MigrationName `
  --project src/Infrastructure/TimeAttendanceSystem.Infrastructure `
  --startup-project src/Api/TimeAttendanceSystem.Api `
  --output-dir Persistence/PostgreSql/Migrations
```

### B. Troubleshooting Guide

#### Issue: "Provider not found" error
**Solution:** Ensure NuGet package is installed and restored
```bash
dotnet restore
```

#### Issue: Migration fails with syntax error
**Solution:** Check that correct provider-specific configurations are being loaded
```bash
# Enable detailed EF Core logging
$env:Logging__LogLevel__Microsoft.EntityFrameworkCore="Debug"
dotnet run
```

#### Issue: Concurrency exception not working
**Solution:** Verify RowVersion configuration in both provider configs

#### Issue: Filtered index not created
**Solution:** Check syntax matches provider requirements (SQL Server vs PostgreSQL)

### C. PostgreSQL Connection String Parameters

```
# Basic
Host=localhost
Port=5432
Database=TimeAttendanceSystem
Username=postgres
Password=YourPassword

# Security
SSL Mode=Prefer|Require|Disable
Trust Server Certificate=true

# Performance
Pooling=true
Minimum Pool Size=0
Maximum Pool Size=100
Connection Idle Lifetime=300
Connection Pruning Interval=10

# Debugging
Include Error Detail=true
Log Parameters=true

# Timeout
Timeout=30
Command Timeout=30
Cancellation Timeout=3
```

### D. Performance Optimization Tips

#### SQL Server
- Enable MARS for concurrent queries
- Use appropriate isolation levels
- Index maintenance (rebuild/reorganize)
- Update statistics regularly

#### PostgreSQL
- Configure shared_buffers (25% of RAM)
- Set effective_cache_size (50-75% of RAM)
- Enable query planning cache
- Use EXPLAIN ANALYZE for slow queries
- Run VACUUM regularly

### E. Backup Strategies

#### SQL Server Backup
```sql
BACKUP DATABASE TimeAttendanceSystem
TO DISK = 'C:\Backups\TimeAttendanceSystem.bak'
WITH FORMAT, COMPRESSION;
```

#### PostgreSQL Backup
```bash
pg_dump -U postgres -F c -b -v -f "TimeAttendanceSystem.backup" TimeAttendanceSystem
```

#### Restore
```sql
-- SQL Server
RESTORE DATABASE TimeAttendanceSystem
FROM DISK = 'C:\Backups\TimeAttendanceSystem.bak'
WITH REPLACE;

-- PostgreSQL
pg_restore -U postgres -d TimeAttendanceSystem -v "TimeAttendanceSystem.backup"
```

---

## Next Steps

### Immediate Actions
1. ✅ Review this plan with team
2. ✅ Approve key decisions in Decision Matrix
3. ✅ Set up PostgreSQL development environment
4. ✅ Schedule development sprint (5-7 days)
5. ✅ Create project tasks in tracking system

### Implementation Order
1. Start with Phase 1 (Project Setup)
2. Proceed sequentially through phases
3. Test after each phase
4. Document as you go
5. Deploy to staging before production

### Success Criteria
- ✅ Both SQL Server and PostgreSQL work correctly
- ✅ Zero breaking changes to existing SQL Server setup
- ✅ All 33 tables created correctly in both providers
- ✅ Migrations work for both providers
- ✅ All tests pass for both providers
- ✅ Performance meets baseline metrics
- ✅ Documentation complete and accurate

---

**Document Status:** Ready for Implementation
**Approval Required:** Yes
**Risk Level:** Low-Medium
**Business Impact:** High (Increased deployment flexibility)

---

**End of Document**
