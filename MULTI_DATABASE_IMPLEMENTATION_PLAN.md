# Multi-Database Support Implementation Plan
## Time Attendance System - PostgreSQL + MySQL Support

**Version:** 1.0
**Date:** October 24, 2025
**Status:** Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current Architecture Analysis](#current-architecture-analysis)
3. [Implementation Phases](#implementation-phases)
4. [Technical Specifications](#technical-specifications)
5. [Migration Strategy](#migration-strategy)
6. [Testing Plan](#testing-plan)
7. [Deployment Guide](#deployment-guide)
8. [Appendix](#appendix)

---

## Executive Summary

### Objective
Transform the Time Attendance System from a PostgreSQL-only solution to a database-agnostic architecture supporting both PostgreSQL and MySQL, with runtime provider selection via configuration.

### Goals
✅ Single codebase for both database providers
✅ Configuration-driven database selection (no recompilation required)
✅ Preserve existing PostgreSQL functionality
✅ Maintain clean architecture principles
✅ Support independent migrations per provider
✅ Zero breaking changes to application code

### Key Benefits
- **Deployment Flexibility**: Choose database provider per environment
- **Client Choice**: Offer PostgreSQL or MySQL based on client infrastructure
- **Future-Proof**: Easy to add additional providers (SQL Server, Oracle, etc.)
- **No Vendor Lock-in**: Switch providers without code changes

### Estimated Effort
- **Files to Modify**: ~15-20 files
- **Files to Create**: ~8-10 files
- **Files to Move**: ~45 files (reorganization)
- **Implementation Time**: 2-3 days
- **Testing Time**: 1-2 days

---

## Current Architecture Analysis

### Existing Database Setup

**Current Provider:** PostgreSQL (Npgsql.EntityFrameworkCore.PostgreSQL)

**Key Components:**
```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/
├── Persistence/
│   ├── Common/
│   │   └── TimeAttendanceDbContext.cs (40+ DbSets)
│   ├── PostgreSql/
│   │   ├── Configurations/ (40+ entity configurations)
│   │   ├── Migrations/ (InitialCreate + snapshot)
│   │   └── PostgreSqlDbContextFactory.cs
│   └── Repositories/ (AttendanceRepository, etc.)
└── DependencyInjection.cs (service registration)
```

**Connection Configuration:**
- **Main**: `appsettings.json` - Production settings
- **Development**: `appsettings.Development.json` - Dev-specific logging
- **Provider-Specific**: `appsettings.PostgreSql.json` - PostgreSQL options

**Current Connection String:**
```
Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true
```

### Database Features Used

**EF Core Features:**
- 40+ entity types with complex relationships
- Soft delete with query filters (`IsDeleted`)
- Optimistic concurrency with row versioning
- Audit logging with automatic change tracking
- Multi-tenancy with branch scoping
- Automatic timestamp management (CreatedAtUtc, ModifiedAtUtc)

**PostgreSQL-Specific Features:**
- Partial indexes (unique constraints with `WHERE IsDeleted = false`)
- `xmin` for row versioning
- UTC timestamp with timezone
- Case-sensitive text comparison
- Efficient JSONB support (if used)

**Critical Entities:**
- Security: Users, Roles, Permissions, RefreshTokens, LoginAttempts
- Employees: Employees, EmployeeUserLinks
- Attendance: AttendanceRecords, AttendanceTransactions, Shifts, ShiftAssignments
- Vacation: VacationTypes, EmployeeVacations
- Excuses: ExcusePolicies, EmployeeExcuses
- Audit: AuditLogs, AuditChanges

---

## Implementation Phases

### Phase 1: Project Structure Reorganization

#### 1.1 New Folder Structure

```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/
├── Persistence/
│   ├── Common/
│   │   ├── TimeAttendanceDbContext.cs (keep existing, make provider-agnostic)
│   │   ├── IApplicationDbContext.cs (keep existing)
│   │   ├── Configurations/
│   │   │   └── [Shared entity configurations - 40+ files]
│   │   └── Repositories/
│   │       ├── AttendanceRepository.cs
│   │       ├── AttendanceTransactionRepository.cs
│   │       └── SettingsRepository.cs
│   ├── PostgreSql/
│   │   ├── PostgreSqlDbContextFactory.cs (design-time factory)
│   │   ├── PostgreSqlMigrationContext.cs (NEW - for migrations)
│   │   ├── Configurations/
│   │   │   └── [PostgreSQL-specific overrides if needed]
│   │   └── Migrations/
│   │       ├── 20251024110451_InitialCreate.cs
│   │       └── TimeAttendanceDbContextModelSnapshot.cs
│   └── MySql/
│       ├── MySqlDbContextFactory.cs (NEW - design-time factory)
│       ├── MySqlMigrationContext.cs (NEW - for migrations)
│       ├── Configurations/
│       │   └── [MySQL-specific overrides if needed]
│       └── Migrations/
│           └── [MySQL migrations - to be generated]
```

#### 1.2 File Movement Tasks

**Move to `Persistence/Common/Configurations/`:**
- All 40+ configuration files from `Persistence/PostgreSql/Configurations/`
- These are provider-agnostic entity mappings

**Keep in `Persistence/PostgreSql/`:**
- Migration files
- PostgreSqlDbContextFactory.cs
- Any PostgreSQL-specific configuration overrides

**Create in `Persistence/MySql/`:**
- MySqlDbContextFactory.cs
- MySqlMigrationContext.cs
- MySQL-specific configuration overrides (if needed)

---

### Phase 2: Configuration System

#### 2.1 Update appsettings.json

**Main Configuration (`appsettings.json`):**
```json
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true",
    "MySqlConnection": "Server=localhost;Port=3306;Database=TimeAttendanceSystem;User=root;Password=P@ssw0rd@321;AllowPublicKeyRetrieval=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  }
}
```

**Development Configuration (`appsettings.Development.json`):**
```json
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=TimeAttendanceSystem_Dev;Username=postgres;Password=P@ssw0rd@321;Include Error Detail=true",
    "MySqlConnection": "Server=localhost;Port=3306;Database=TimeAttendanceSystem_Dev;User=root;Password=P@ssw0rd@321;AllowPublicKeyRetrieval=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

#### 2.2 Create appsettings.MySql.json

**MySQL-Specific Configuration:**
```json
{
  "DatabaseProvider": "MySql",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information",
      "Pomelo.EntityFrameworkCore.MySql": "Information"
    }
  },
  "MySqlOptions": {
    "EnableRetryOnFailure": true,
    "MaxRetryCount": 5,
    "MaxRetryDelay": "00:00:30",
    "CommandTimeout": 30,
    "EnableSensitiveDataLogging": false,
    "EnableDetailedErrors": true,
    "ServerVersion": "8.0.35"
  }
}
```

#### 2.3 Keep appsettings.PostgreSql.json

**PostgreSQL-Specific Configuration (existing):**
```json
{
  "DatabaseProvider": "PostgreSql",
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Information",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information",
      "Npgsql": "Information"
    }
  }
}
```

---

### Phase 3: DbContext Modifications

#### 3.1 Keep TimeAttendanceDbContext Provider-Agnostic

**Location:** `Persistence/Common/TimeAttendanceDbContext.cs`

**Key Points:**
- Keep all 40+ DbSets
- Keep audit logic in `SaveChangesAsync`
- Remove provider-specific `OnConfiguring` (handled in DI)
- Keep `OnModelCreating` for applying configurations

**No changes needed to existing DbContext** - it's already provider-agnostic!

#### 3.2 Create Migration-Specific Contexts

**PostgreSqlMigrationContext.cs:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql;

/// <summary>
/// PostgreSQL-specific context for EF Core migrations
/// Inherits from main DbContext but configures PostgreSQL provider
/// </summary>
public class PostgreSqlMigrationContext : TimeAttendanceDbContext
{
    public PostgreSqlMigrationContext(DbContextOptions<PostgreSqlMigrationContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Load configuration for design-time
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile("appsettings.PostgreSql.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("PostgreSqlConnection");

            optionsBuilder.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
                npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_PostgreSql");
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);
                npgsqlOptions.CommandTimeout(30);
            });
        }

        base.OnConfiguring(optionsBuilder);
    }
}
```

**MySqlMigrationContext.cs:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.MySql;

/// <summary>
/// MySQL-specific context for EF Core migrations
/// Inherits from main DbContext but configures MySQL provider
/// </summary>
public class MySqlMigrationContext : TimeAttendanceDbContext
{
    public MySqlMigrationContext(DbContextOptions<MySqlMigrationContext> options)
        : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            // Load configuration for design-time
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile("appsettings.MySql.json", optional: true)
                .Build();

            var connectionString = configuration.GetConnectionString("MySqlConnection");
            var serverVersion = configuration["MySqlOptions:ServerVersion"] ?? "8.0.35";

            optionsBuilder.UseMySql(connectionString,
                ServerVersion.Parse(serverVersion),
                mysqlOptions =>
                {
                    mysqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
                    mysqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_MySql");
                    mysqlOptions.EnableRetryOnFailure(
                        maxRetryCount: 5,
                        maxRetryDelay: TimeSpan.FromSeconds(30),
                        errorNumbersToAdd: null);
                    mysqlOptions.CommandTimeout(30);
                });
        }

        base.OnConfiguring(optionsBuilder);
    }
}
```

#### 3.3 Update Design-Time Factories

**Update PostgreSqlDbContextFactory.cs:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.PostgreSql;

/// <summary>
/// Design-time factory for creating PostgreSQL DbContext instances
/// Used by EF Core CLI tools for migrations
/// </summary>
public class PostgreSqlDbContextFactory : IDesignTimeDbContextFactory<PostgreSqlMigrationContext>
{
    public PostgreSqlMigrationContext CreateDbContext(string[] args)
    {
        // Build configuration
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.PostgreSql.json", optional: true)
            .Build();

        // Get connection string
        var connectionString = configuration.GetConnectionString("PostgreSqlConnection")
            ?? throw new InvalidOperationException("PostgreSqlConnection not found in configuration");

        // Configure options
        var optionsBuilder = new DbContextOptionsBuilder<PostgreSqlMigrationContext>();
        optionsBuilder.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
            npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_PostgreSql");
        });

        return new PostgreSqlMigrationContext(optionsBuilder.Options);
    }
}
```

**Create MySqlDbContextFactory.cs:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace TimeAttendanceSystem.Infrastructure.Persistence.MySql;

/// <summary>
/// Design-time factory for creating MySQL DbContext instances
/// Used by EF Core CLI tools for migrations
/// </summary>
public class MySqlDbContextFactory : IDesignTimeDbContextFactory<MySqlMigrationContext>
{
    public MySqlMigrationContext CreateDbContext(string[] args)
    {
        // Build configuration
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false)
            .AddJsonFile("appsettings.MySql.json", optional: true)
            .Build();

        // Get connection string
        var connectionString = configuration.GetConnectionString("MySqlConnection")
            ?? throw new InvalidOperationException("MySqlConnection not found in configuration");

        // Get server version
        var serverVersion = configuration["MySqlOptions:ServerVersion"] ?? "8.0.35";

        // Configure options
        var optionsBuilder = new DbContextOptionsBuilder<MySqlMigrationContext>();
        optionsBuilder.UseMySql(connectionString,
            ServerVersion.Parse(serverVersion),
            mysqlOptions =>
            {
                mysqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
                mysqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_MySql");
            });

        return new MySqlMigrationContext(optionsBuilder.Options);
    }
}
```

---

### Phase 4: Dependency Injection Updates

#### 4.1 Update DependencyInjection.cs

**Location:** `src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs`

**Updated Database Registration:**
```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TimeAttendanceSystem.Application.Common.Interfaces;
using TimeAttendanceSystem.Infrastructure.Persistence.Common;

namespace TimeAttendanceSystem.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Get database provider from configuration
        var databaseProvider = configuration["DatabaseProvider"]?.ToLower()
            ?? throw new InvalidOperationException("DatabaseProvider not specified in configuration");

        // Register DbContext based on provider
        services.AddDbContext<TimeAttendanceDbContext>((serviceProvider, options) =>
        {
            switch (databaseProvider)
            {
                case "postgresql":
                case "postgres":
                case "npgsql":
                    ConfigurePostgreSql(options, configuration);
                    break;

                case "mysql":
                case "mariadb":
                    ConfigureMySql(options, configuration);
                    break;

                default:
                    throw new InvalidOperationException(
                        $"Unsupported database provider: {databaseProvider}. " +
                        "Supported providers: PostgreSql, MySql");
            }
        });

        // Register IApplicationDbContext
        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<TimeAttendanceDbContext>());

        // Register repositories
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IAttendanceTransactionRepository, AttendanceTransactionRepository>();
        services.AddScoped<ISettingsRepository, SettingsRepository>();

        // Register other infrastructure services...

        return services;
    }

    private static void ConfigurePostgreSql(
        DbContextOptionsBuilder options,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("PostgreSqlConnection")
            ?? throw new InvalidOperationException("PostgreSqlConnection not found in configuration");

        options.UseNpgsql(connectionString, npgsqlOptions =>
        {
            npgsqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
            npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_PostgreSql");
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
            npgsqlOptions.CommandTimeout(30);
        });

        // Enable sensitive data logging in development
        if (configuration.GetValue<bool>("Logging:EnableSensitiveDataLogging"))
        {
            options.EnableSensitiveDataLogging();
        }

        // Enable detailed errors in development
        if (configuration.GetValue<bool>("Logging:EnableDetailedErrors"))
        {
            options.EnableDetailedErrors();
        }
    }

    private static void ConfigureMySql(
        DbContextOptionsBuilder options,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MySqlConnection")
            ?? throw new InvalidOperationException("MySqlConnection not found in configuration");

        var serverVersion = configuration["MySqlOptions:ServerVersion"] ?? "8.0.35";

        options.UseMySql(connectionString,
            ServerVersion.Parse(serverVersion),
            mysqlOptions =>
            {
                mysqlOptions.MigrationsAssembly("TimeAttendanceSystem.Infrastructure");
                mysqlOptions.MigrationsHistoryTable("__EFMigrationsHistory_MySql");
                mysqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                mysqlOptions.CommandTimeout(30);
            });

        // Enable sensitive data logging in development
        if (configuration.GetValue<bool>("MySqlOptions:EnableSensitiveDataLogging"))
        {
            options.EnableSensitiveDataLogging();
        }

        // Enable detailed errors in development
        if (configuration.GetValue<bool>("MySqlOptions:EnableDetailedErrors"))
        {
            options.EnableDetailedErrors();
        }
    }
}
```

#### 4.2 Update Program.cs (if needed)

**Ensure migration logic supports both providers:**
```csharp
// Apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<TimeAttendanceDbContext>();

        // Apply migrations
        await context.Database.MigrateAsync();

        // Seed data
        await SeedData.SeedAsync(context);

        var logger = services.GetRequiredService<ILogger<Program>>();
        var databaseProvider = app.Configuration["DatabaseProvider"];
        logger.LogInformation("Database migrations applied successfully using {Provider}", databaseProvider);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating or seeding the database");
        throw;
    }
}
```

---

### Phase 5: Package Management

#### 5.1 Update .csproj File

**Add MySQL Package:**
```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <!-- PostgreSQL Provider -->
    <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.0" />

    <!-- MySQL Provider -->
    <PackageReference Include="Pomelo.EntityFrameworkCore.MySql" Version="8.0.0" />

    <!-- EF Core Tools -->
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.0">
      <PrivateAssets>all</PrivateAssets>
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
    </PackageReference>

    <!-- Other packages... -->
  </ItemGroup>

</Project>
```

#### 5.2 Package Installation Commands

```bash
# Navigate to Infrastructure project
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure

# Install MySQL provider
dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.0

# Restore packages
dotnet restore
```

---

### Phase 6: Handle Database-Specific Features

#### 6.1 Row Versioning / Concurrency Tokens

**Problem:** PostgreSQL uses `xmin`, MySQL uses `TIMESTAMP`

**Solution:** Use EF Core's `[Timestamp]` attribute which maps appropriately per provider

**Entity Configuration (Common):**
```csharp
public class BaseEntityConfiguration<T> : IEntityTypeConfiguration<T>
    where T : BaseEntity
{
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
        builder.Property(e => e.Id)
            .ValueGeneratedOnAdd();

        // Row version for optimistic concurrency
        // PostgreSQL: maps to xmin
        // MySQL: maps to TIMESTAMP column
        builder.Property(e => e.RowVersion)
            .IsRowVersion()
            .IsConcurrencyToken();

        builder.Property(e => e.CreatedAtUtc)
            .IsRequired();

        builder.Property(e => e.ModifiedAtUtc);

        builder.Property(e => e.IsDeleted)
            .IsRequired()
            .HasDefaultValue(false);

        // Soft delete query filter
        builder.HasQueryFilter(e => !e.IsDeleted);
    }
}
```

#### 6.2 DateTime Handling

**Problem:** PostgreSQL stores UTC with timezone, MySQL datetime fields don't have timezone

**Solution:** Always use UTC in application code, convert at database boundary

**Entity Configuration:**
```csharp
// Configure DateTime properties to use UTC
builder.Property(e => e.CreatedAtUtc)
    .HasConversion(
        v => v, // Store as-is (assumed UTC)
        v => DateTime.SpecifyKind(v, DateTimeKind.Utc)) // Read as UTC
    .IsRequired();

builder.Property(e => e.ModifiedAtUtc)
    .HasConversion(
        v => v,
        v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : (DateTime?)null);
```

**Application Code Pattern:**
```csharp
// Always use UTC
entity.CreatedAtUtc = DateTime.UtcNow;

// When reading from database, SpecifyKind ensures correct timezone
var createdDate = entity.CreatedAtUtc; // Already UTC via conversion
```

#### 6.3 Partial Indexes (Unique Constraints with Filters)

**Problem:** PostgreSQL supports partial indexes, MySQL has limited support

**PostgreSQL Configuration (works):**
```csharp
builder.HasIndex(e => e.Email)
    .IsUnique()
    .HasFilter("[IsDeleted] = 0"); // PostgreSQL syntax
```

**MySQL Workaround:**

**Option 1: Remove filter (simpler but less efficient)**
```csharp
// Works on both providers, but deleted records block unique constraint
builder.HasIndex(e => e.Email)
    .IsUnique();
```

**Option 2: Include IsDeleted in index (recommended)**
```csharp
// Works on both providers
builder.HasIndex(e => new { e.Email, e.IsDeleted })
    .IsUnique();

// Note: Allows multiple deleted records with same email
// but only one active record per email
```

**Option 3: Provider-specific configuration**
```csharp
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // Common configuration...

        // Provider-specific index configuration
        // Will be handled in provider-specific configurations if needed
        builder.HasIndex(e => e.Email)
            .IsUnique();
    }
}

// In PostgreSql/Configurations/UserConfiguration.cs (override)
public class PostgreSqlUserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // PostgreSQL-specific: Add filter
        builder.HasIndex(e => e.Email)
            .IsUnique()
            .HasFilter("[IsDeleted] = 0");
    }
}
```

**Recommended Approach:** Use Option 2 (composite index) for cross-database compatibility

#### 6.4 String Length and Collation

**Problem:** Different default string lengths and case sensitivity

**Solution:** Explicit length constraints and collation settings

```csharp
builder.Property(e => e.Email)
    .IsRequired()
    .HasMaxLength(255)
    .IsUnicode(false); // ASCII for emails

builder.Property(e => e.Name)
    .IsRequired()
    .HasMaxLength(200)
    .IsUnicode(true); // Support international characters

// For case-insensitive comparisons (if needed)
builder.Property(e => e.Email)
    .HasAnnotation("Collation", "latin1_general_ci"); // MySQL
    // PostgreSQL uses: COLLATE "case_insensitive"
```

#### 6.5 Generated Values

**Problem:** Different syntax for default values and sequences

**Solution:** Use EF Core abstractions

```csharp
// Auto-increment primary key (works on both)
builder.Property(e => e.Id)
    .ValueGeneratedOnAdd();

// Default values (works on both)
builder.Property(e => e.IsDeleted)
    .HasDefaultValue(false);

builder.Property(e => e.CreatedAtUtc)
    .HasDefaultValueSql("CURRENT_TIMESTAMP"); // Both support this
```

---

### Phase 7: Migration Strategy

#### 7.1 Migration Commands Reference

**PostgreSQL Migrations:**
```bash
# Navigate to Infrastructure project
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure

# Add new migration
dotnet ef migrations add MigrationName \
    --context PostgreSqlMigrationContext \
    --output-dir Persistence/PostgreSql/Migrations \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Update database
dotnet ef database update \
    --context PostgreSqlMigrationContext \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Remove last migration (if needed)
dotnet ef migrations remove \
    --context PostgreSqlMigrationContext \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Generate SQL script
dotnet ef migrations script \
    --context PostgreSqlMigrationContext \
    --output Persistence/PostgreSql/Migrations/migration.sql \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj
```

**MySQL Migrations:**
```bash
# Navigate to Infrastructure project
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure

# Add new migration
dotnet ef migrations add MigrationName \
    --context MySqlMigrationContext \
    --output-dir Persistence/MySql/Migrations \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Update database
dotnet ef database update \
    --context MySqlMigrationContext \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Remove last migration (if needed)
dotnet ef migrations remove \
    --context MySqlMigrationContext \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj

# Generate SQL script
dotnet ef migrations script \
    --context MySqlMigrationContext \
    --output Persistence/MySql/Migrations/migration.sql \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj
```

#### 7.2 Generate Initial MySQL Migration

**Step-by-step process:**

1. **Ensure MySQL is running:**
```bash
# Check MySQL status
mysql --version

# Start MySQL if needed
# Windows: net start mysql
# Linux/Mac: sudo systemctl start mysql
```

2. **Update appsettings.json to use MySQL:**
```json
{
  "DatabaseProvider": "MySql",
  "ConnectionStrings": {
    "MySqlConnection": "Server=localhost;Port=3306;Database=TimeAttendanceSystem;User=root;Password=YourPassword;AllowPublicKeyRetrieval=true"
  }
}
```

3. **Create initial migration:**
```bash
cd src/Infrastructure/TimeAttendanceSystem.Infrastructure

dotnet ef migrations add InitialCreate \
    --context MySqlMigrationContext \
    --output-dir Persistence/MySql/Migrations \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj
```

4. **Review generated migration:**
- Check `Persistence/MySql/Migrations/[Timestamp]_InitialCreate.cs`
- Verify all 40+ tables are included
- Check for any MySQL-specific warnings

5. **Apply migration:**
```bash
dotnet ef database update \
    --context MySqlMigrationContext \
    --project TimeAttendanceSystem.Infrastructure.csproj \
    --startup-project ../../Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj
```

6. **Verify database creation:**
```bash
mysql -u root -p
USE TimeAttendanceSystem;
SHOW TABLES;
```

#### 7.3 Migration Workflow for Future Changes

**When adding a new entity or modifying schema:**

1. **Update entity classes** in Domain layer
2. **Update configurations** in `Persistence/Common/Configurations/`
3. **Generate PostgreSQL migration:**
```bash
dotnet ef migrations add AddNewFeature \
    --context PostgreSqlMigrationContext \
    --output-dir Persistence/PostgreSql/Migrations
```
4. **Generate MySQL migration:**
```bash
dotnet ef migrations add AddNewFeature \
    --context MySqlMigrationContext \
    --output-dir Persistence/MySql/Migrations
```
5. **Test both migrations:**
```bash
# Test PostgreSQL
dotnet ef database update --context PostgreSqlMigrationContext

# Test MySQL
dotnet ef database update --context MySqlMigrationContext
```

#### 7.4 Migration Best Practices

**Keep migrations in sync:**
- Always create migrations for both providers
- Use the same migration name for consistency
- Test both before committing

**Handle provider-specific differences:**
- If a migration fails on one provider, create provider-specific configuration
- Document any provider-specific workarounds
- Ensure feature parity between providers

**Version control:**
- Commit both PostgreSQL and MySQL migrations together
- Include migration scripts in deployment packages
- Tag releases with migration versions

---

## Testing Plan

### Phase 8.1: Database Switching Tests

**Test 1: PostgreSQL Configuration**
```bash
# 1. Update appsettings.json
{
  "DatabaseProvider": "PostgreSql"
}

# 2. Start application
dotnet run --project src/Api/TimeAttendanceSystem.Api

# 3. Verify in logs:
# - "Database provider: PostgreSql"
# - "Applying migrations..."
# - "Database migrations applied successfully"

# 4. Verify database connection:
# - Check PostgreSQL logs
# - Query __EFMigrationsHistory_PostgreSql table
# - Verify data seeding completed
```

**Test 2: MySQL Configuration**
```bash
# 1. Update appsettings.json
{
  "DatabaseProvider": "MySql"
}

# 2. Start application
dotnet run --project src/Api/TimeAttendanceSystem.Api

# 3. Verify in logs:
# - "Database provider: MySql"
# - "Applying migrations..."
# - "Database migrations applied successfully"

# 4. Verify database connection:
# - Check MySQL logs
# - Query __EFMigrationsHistory_MySql table
# - Verify data seeding completed
```

**Test 3: Invalid Provider Configuration**
```bash
# 1. Update appsettings.json
{
  "DatabaseProvider": "InvalidProvider"
}

# 2. Start application
# 3. Expected: Exception with message:
#    "Unsupported database provider: InvalidProvider"
```

### Phase 8.2: Feature Parity Testing

**Test Checklist (perform on both PostgreSQL and MySQL):**

- [ ] **User Authentication**
  - [ ] User registration
  - [ ] User login
  - [ ] Password reset
  - [ ] Two-factor authentication
  - [ ] Session management

- [ ] **Employee Management**
  - [ ] Create employee
  - [ ] Update employee
  - [ ] Soft delete employee
  - [ ] View employee details
  - [ ] List employees with pagination

- [ ] **Attendance Tracking**
  - [ ] Clock in/out
  - [ ] View attendance records
  - [ ] Edit attendance (with audit trail)
  - [ ] Attendance reports
  - [ ] Overtime calculations

- [ ] **Shift Management**
  - [ ] Create shift
  - [ ] Assign employees to shifts
  - [ ] Update shift schedules
  - [ ] View shift assignments

- [ ] **Vacation Management**
  - [ ] Submit vacation request
  - [ ] Approve/reject vacation
  - [ ] Check vacation balance
  - [ ] View vacation history

- [ ] **Excuse Management**
  - [ ] Submit excuse
  - [ ] Approve/reject excuse
  - [ ] View excuse history

- [ ] **Audit Logging**
  - [ ] Verify change tracking
  - [ ] View audit logs
  - [ ] Field-level change history

- [ ] **Multi-tenancy**
  - [ ] Branch isolation
  - [ ] User branch scopes
  - [ ] Cross-branch queries (admin)

### Phase 8.3: Data Consistency Tests

**Test 1: Concurrent Operations**
```csharp
// Test optimistic concurrency
var user1 = await context.Users.FindAsync(userId);
var user2 = await context.Users.FindAsync(userId);

user1.Name = "Updated by User 1";
await context.SaveChangesAsync(); // Should succeed

user2.Name = "Updated by User 2";
await context.SaveChangesAsync(); // Should throw DbUpdateConcurrencyException
```

**Test 2: Soft Delete Query Filters**
```csharp
// Create and soft delete
var employee = new Employee { Name = "Test Employee" };
context.Employees.Add(employee);
await context.SaveChangesAsync();

employee.IsDeleted = true;
await context.SaveChangesAsync();

// Verify filtered out
var activeEmployees = await context.Employees.ToListAsync();
Assert.DoesNotContain(activeEmployees, e => e.Id == employee.Id);

// Verify accessible with IgnoreQueryFilters
var allEmployees = await context.Employees.IgnoreQueryFilters().ToListAsync();
Assert.Contains(allEmployees, e => e.Id == employee.Id);
```

**Test 3: DateTime UTC Handling**
```csharp
// Create entity
var now = DateTime.UtcNow;
var entity = new AuditLog { CreatedAtUtc = now };
context.AuditLogs.Add(entity);
await context.SaveChangesAsync();

// Read back
var retrieved = await context.AuditLogs.FindAsync(entity.Id);
Assert.Equal(DateTimeKind.Utc, retrieved.CreatedAtUtc.Kind);
Assert.Equal(now, retrieved.CreatedAtUtc, TimeSpan.FromSeconds(1));
```

**Test 4: Unique Constraints**
```csharp
// Create user
var user1 = new User { Email = "test@example.com" };
context.Users.Add(user1);
await context.SaveChangesAsync();

// Try duplicate (should fail)
var user2 = new User { Email = "test@example.com" };
context.Users.Add(user2);
await Assert.ThrowsAsync<DbUpdateException>(() => context.SaveChangesAsync());

// Soft delete first user
user1.IsDeleted = true;
await context.SaveChangesAsync();

// Try duplicate again (should succeed if using composite index)
var user3 = new User { Email = "test@example.com" };
context.Users.Add(user3);
await context.SaveChangesAsync(); // Should succeed
```

### Phase 8.4: Performance Testing

**Test 1: Query Performance Comparison**
```csharp
// Run same query on both databases
var stopwatch = Stopwatch.StartNew();

var employees = await context.Employees
    .Include(e => e.User)
    .Include(e => e.Branch)
    .Where(e => e.IsActive)
    .OrderBy(e => e.Name)
    .Take(100)
    .ToListAsync();

stopwatch.Stop();
Console.WriteLine($"Query time: {stopwatch.ElapsedMilliseconds}ms");

// Compare: PostgreSQL vs MySQL
// Document any significant performance differences
```

**Test 2: Bulk Insert Performance**
```csharp
var stopwatch = Stopwatch.StartNew();

// Insert 1000 attendance records
var records = Enumerable.Range(1, 1000)
    .Select(i => new AttendanceRecord
    {
        EmployeeId = employeeId,
        ClockIn = DateTime.UtcNow.AddHours(-i),
        ClockOut = DateTime.UtcNow.AddHours(-i + 8)
    })
    .ToList();

context.AttendanceRecords.AddRange(records);
await context.SaveChangesAsync();

stopwatch.Stop();
Console.WriteLine($"Bulk insert time: {stopwatch.ElapsedMilliseconds}ms");
```

### Phase 8.5: Migration Testing

**Test 1: Fresh Database Creation**
```bash
# PostgreSQL
dropdb TimeAttendanceSystem_Test
createdb TimeAttendanceSystem_Test
dotnet ef database update --context PostgreSqlMigrationContext

# MySQL
mysql -u root -p -e "DROP DATABASE IF EXISTS TimeAttendanceSystem_Test; CREATE DATABASE TimeAttendanceSystem_Test;"
dotnet ef database update --context MySqlMigrationContext

# Verify both databases have identical schema
```

**Test 2: Migration Up/Down**
```bash
# Test rollback capability
dotnet ef database update PreviousMigration --context PostgreSqlMigrationContext
dotnet ef database update PreviousMigration --context MySqlMigrationContext

# Reapply
dotnet ef database update --context PostgreSqlMigrationContext
dotnet ef database update --context MySqlMigrationContext
```

---

## Deployment Guide

### Phase 9.1: PostgreSQL Deployment

**Step 1: Prepare Configuration**

Create `appsettings.Production.json`:
```json
{
  "DatabaseProvider": "PostgreSql",
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=production-db.example.com;Port=5432;Database=TimeAttendanceSystem;Username=appuser;Password=${DB_PASSWORD};SSL Mode=Require;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  }
}
```

**Step 2: Build Application**
```bash
dotnet publish -c Release -o ./publish
```

**Step 3: Database Migration**

Option A: Automatic (via Program.cs):
```csharp
// Migrations apply on startup
await context.Database.MigrateAsync();
```

Option B: Manual (recommended for production):
```bash
# Generate SQL script
dotnet ef migrations script \
    --context PostgreSqlMigrationContext \
    --output migration.sql \
    --idempotent

# Review and apply manually
psql -h production-db.example.com -U appuser -d TimeAttendanceSystem -f migration.sql
```

**Step 4: Deploy Application**
```bash
# Copy published files to server
scp -r ./publish user@server:/var/www/timeattendance

# Set environment variables
export ASPNETCORE_ENVIRONMENT=Production
export DB_PASSWORD=SecurePassword123

# Start application
dotnet TimeAttendanceSystem.Api.dll
```

### Phase 9.2: MySQL Deployment

**Step 1: Prepare Configuration**

Create `appsettings.Production.json`:
```json
{
  "DatabaseProvider": "MySql",
  "ConnectionStrings": {
    "MySqlConnection": "Server=production-db.example.com;Port=3306;Database=TimeAttendanceSystem;User=appuser;Password=${DB_PASSWORD};SslMode=Required;"
  },
  "MySqlOptions": {
    "ServerVersion": "8.0.35"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  }
}
```

**Step 2: Build Application**
```bash
dotnet publish -c Release -o ./publish
```

**Step 3: Database Migration**

Option A: Automatic (via Program.cs):
```csharp
// Migrations apply on startup
await context.Database.MigrateAsync();
```

Option B: Manual (recommended for production):
```bash
# Generate SQL script
dotnet ef migrations script \
    --context MySqlMigrationContext \
    --output migration.sql \
    --idempotent

# Review and apply manually
mysql -h production-db.example.com -u appuser -p TimeAttendanceSystem < migration.sql
```

**Step 4: Deploy Application**
```bash
# Copy published files to server
scp -r ./publish user@server:/var/www/timeattendance

# Set environment variables
export ASPNETCORE_ENVIRONMENT=Production
export DB_PASSWORD=SecurePassword123

# Start application
dotnet TimeAttendanceSystem.Api.dll
```

### Phase 9.3: Docker Deployment

**PostgreSQL Docker Compose:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5099:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - DatabaseProvider=PostgreSql
      - ConnectionStrings__PostgreSqlConnection=Host=postgres;Port=5432;Database=TimeAttendanceSystem;Username=appuser;Password=${DB_PASSWORD}
    depends_on:
      - postgres
    networks:
      - app-network

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_USER=appuser
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=TimeAttendanceSystem
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

volumes:
  postgres-data:

networks:
  app-network:
```

**MySQL Docker Compose:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5099:80"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - DatabaseProvider=MySql
      - ConnectionStrings__MySqlConnection=Server=mysql;Port=3306;Database=TimeAttendanceSystem;User=appuser;Password=${DB_PASSWORD}
    depends_on:
      - mysql
    networks:
      - app-network

  mysql:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      - MYSQL_DATABASE=TimeAttendanceSystem
      - MYSQL_USER=appuser
      - MYSQL_PASSWORD=${DB_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
    networks:
      - app-network

volumes:
  mysql-data:

networks:
  app-network:
```

**Dockerfile:**
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["src/Api/TimeAttendanceSystem.Api/TimeAttendanceSystem.Api.csproj", "Api/"]
COPY ["src/Infrastructure/TimeAttendanceSystem.Infrastructure/TimeAttendanceSystem.Infrastructure.csproj", "Infrastructure/"]
COPY ["src/Application/TimeAttendanceSystem.Application/TimeAttendanceSystem.Application.csproj", "Application/"]
COPY ["src/Domain/TimeAttendanceSystem.Domain/TimeAttendanceSystem.Domain.csproj", "Domain/"]
RUN dotnet restore "Api/TimeAttendanceSystem.Api.csproj"

COPY src/ .
WORKDIR "/src/Api/TimeAttendanceSystem.Api"
RUN dotnet build "TimeAttendanceSystem.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TimeAttendanceSystem.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TimeAttendanceSystem.Api.dll"]
```

### Phase 9.4: Environment-Specific Deployment

**Development:**
```bash
# Use local databases
# appsettings.Development.json
{
  "DatabaseProvider": "PostgreSql",  // or "MySql"
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;...",
    "MySqlConnection": "Server=localhost;Port=3306;..."
  }
}
```

**Staging:**
```bash
# Use staging databases
# appsettings.Staging.json
{
  "DatabaseProvider": "PostgreSql",  // or "MySql"
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=staging-db.example.com;...",
    "MySqlConnection": "Server=staging-db.example.com;..."
  }
}
```

**Production:**
```bash
# Use production databases
# appsettings.Production.json
{
  "DatabaseProvider": "PostgreSql",  // or "MySql"
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=production-db.example.com;...",
    "MySqlConnection": "Server=production-db.example.com;..."
  }
}
```

---

## Appendix

### A. Implementation Checklist

**Phase 1: Structure**
- [ ] Create `Persistence/MySql/` folder
- [ ] Move configurations to `Persistence/Common/Configurations/`
- [ ] Move repositories to `Persistence/Common/Repositories/`
- [ ] Update namespace references

**Phase 2: Configuration**
- [ ] Update `appsettings.json` with DatabaseProvider and MySqlConnection
- [ ] Update `appsettings.Development.json`
- [ ] Create `appsettings.MySql.json`
- [ ] Keep `appsettings.PostgreSql.json`

**Phase 3: DbContext**
- [ ] Create `PostgreSqlMigrationContext.cs`
- [ ] Create `MySqlMigrationContext.cs`
- [ ] Update `PostgreSqlDbContextFactory.cs`
- [ ] Create `MySqlDbContextFactory.cs`

**Phase 4: Dependency Injection**
- [ ] Update `DependencyInjection.cs` with provider selection
- [ ] Add `ConfigurePostgreSql` method
- [ ] Add `ConfigureMySql` method
- [ ] Update `Program.cs` if needed

**Phase 5: Packages**
- [ ] Install `Pomelo.EntityFrameworkCore.MySql`
- [ ] Verify `Npgsql.EntityFrameworkCore.PostgreSQL` version
- [ ] Run `dotnet restore`

**Phase 6: Database Features**
- [ ] Review row versioning configuration
- [ ] Review DateTime UTC handling
- [ ] Update unique indexes (composite with IsDeleted)
- [ ] Review string length constraints
- [ ] Test concurrency tokens

**Phase 7: Migrations**
- [ ] Generate initial MySQL migration
- [ ] Test PostgreSQL migrations still work
- [ ] Create migration command scripts
- [ ] Document migration workflow

**Phase 8: Testing**
- [ ] Test PostgreSQL configuration
- [ ] Test MySQL configuration
- [ ] Run feature parity tests
- [ ] Run performance tests
- [ ] Test migrations

**Phase 9: Documentation**
- [ ] Update README.md
- [ ] Document migration commands
- [ ] Create deployment guide
- [ ] Update developer documentation

### B. File Reference

**Files to Create:**
```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/
├── Persistence/
│   ├── MySql/
│   │   ├── MySqlDbContextFactory.cs
│   │   ├── MySqlMigrationContext.cs
│   │   ├── Configurations/ (if needed)
│   │   └── Migrations/ (generated)
│   └── PostgreSql/
│       └── PostgreSqlMigrationContext.cs
└── appsettings.MySql.json
```

**Files to Modify:**
```
src/Infrastructure/TimeAttendanceSystem.Infrastructure/
├── DependencyInjection.cs
├── TimeAttendanceSystem.Infrastructure.csproj
└── Persistence/
    ├── Common/
    │   └── Configurations/ (review for provider compatibility)
    └── PostgreSql/
        └── PostgreSqlDbContextFactory.cs

src/Api/TimeAttendanceSystem.Api/
├── appsettings.json
├── appsettings.Development.json
└── Program.cs (minor updates if needed)
```

**Files to Move:**
```
# Move all entity configurations from:
Persistence/PostgreSql/Configurations/*.cs

# To:
Persistence/Common/Configurations/*.cs

# These are provider-agnostic and should be shared
```

### C. SQL Script Examples

**PostgreSQL - Check Applied Migrations:**
```sql
SELECT * FROM "__EFMigrationsHistory_PostgreSql"
ORDER BY "MigrationId";
```

**MySQL - Check Applied Migrations:**
```sql
SELECT * FROM `__EFMigrationsHistory_MySql`
ORDER BY `MigrationId`;
```

**PostgreSQL - Verify Schema:**
```sql
-- List all tables
SELECT tablename
FROM pg_catalog.pg_tables
WHERE schemaname = 'public';

-- Check specific table structure
\d "Users"
```

**MySQL - Verify Schema:**
```sql
-- List all tables
SHOW TABLES;

-- Check specific table structure
DESCRIBE Users;
```

### D. Troubleshooting Guide

**Problem: Migration fails with "table already exists"**

Solution:
```bash
# Reset migrations
dotnet ef database drop --context MySqlMigrationContext
dotnet ef database update --context MySqlMigrationContext
```

**Problem: DbContext not found for migrations**

Solution:
```bash
# Specify full context name with namespace
dotnet ef migrations add MigrationName \
    --context TimeAttendanceSystem.Infrastructure.Persistence.MySql.MySqlMigrationContext
```

**Problem: Connection string not found**

Solution:
- Verify `appsettings.json` has correct connection string key
- Check `DatabaseProvider` setting matches connection string name
- Ensure factory reads correct configuration file

**Problem: RowVersion not working in MySQL**

Solution:
```csharp
// MySQL uses TIMESTAMP for row versioning
builder.Property(e => e.RowVersion)
    .IsRowVersion()
    .ValueGeneratedOnAddOrUpdate(); // Important for MySQL
```

**Problem: DateTime kind not UTC after reading**

Solution:
```csharp
// Add conversion in entity configuration
builder.Property(e => e.CreatedAtUtc)
    .HasConversion(
        v => v,
        v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
```

**Problem: Unique constraint violations with soft delete**

Solution:
```csharp
// Use composite index instead of partial index
builder.HasIndex(e => new { e.Email, e.IsDeleted })
    .IsUnique();
```

### E. Performance Optimization Tips

**PostgreSQL Optimizations:**
```sql
-- Create indexes for foreign keys
CREATE INDEX idx_attendance_employee ON "AttendanceRecords"("EmployeeId") WHERE "IsDeleted" = false;

-- Analyze tables
ANALYZE "Users";
ANALYZE "AttendanceRecords";

-- Enable query plan caching
SET plan_cache_mode = force_generic_plan;
```

**MySQL Optimizations:**
```sql
-- Create indexes for foreign keys
CREATE INDEX idx_attendance_employee ON AttendanceRecords(EmployeeId, IsDeleted);

-- Analyze tables
ANALYZE TABLE Users;
ANALYZE TABLE AttendanceRecords;

-- Optimize tables
OPTIMIZE TABLE Users;
OPTIMIZE TABLE AttendanceRecords;
```

**EF Core Optimizations:**
```csharp
// Use compiled queries for frequently executed queries
private static readonly Func<TimeAttendanceDbContext, int, Task<User>> GetUserById =
    EF.CompileAsyncQuery((TimeAttendanceDbContext context, int userId) =>
        context.Users.FirstOrDefault(u => u.Id == userId));

// Use AsNoTracking for read-only queries
var users = await context.Users
    .AsNoTracking()
    .ToListAsync();

// Use Select to project only needed columns
var userNames = await context.Users
    .Select(u => new { u.Id, u.Name })
    .ToListAsync();
```

### F. Security Considerations

**Connection String Security:**
```json
// Don't store passwords in appsettings.json
// Use environment variables or secrets manager

// Development:
{
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Database=TimeAttendanceSystem;Username=postgres;Password=${POSTGRES_PASSWORD}"
  }
}

// Production: Use Azure Key Vault, AWS Secrets Manager, etc.
```

**Database User Permissions:**
```sql
-- PostgreSQL: Create limited user
CREATE USER appuser WITH PASSWORD 'SecurePassword123';
GRANT CONNECT ON DATABASE TimeAttendanceSystem TO appuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO appuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO appuser;

-- MySQL: Create limited user
CREATE USER 'appuser'@'%' IDENTIFIED BY 'SecurePassword123';
GRANT SELECT, INSERT, UPDATE, DELETE ON TimeAttendanceSystem.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
```

### G. Monitoring and Logging

**Enable EF Core Logging:**
```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information",
      "Microsoft.EntityFrameworkCore.Infrastructure": "Warning"
    }
  }
}
```

**Query Performance Logging:**
```csharp
// Add to DependencyInjection.cs
options.LogTo(
    Console.WriteLine,
    new[] { DbLoggerCategory.Database.Command.Name },
    LogLevel.Information,
    DbContextLoggerOptions.SingleLine);

// Enable sensitive data logging in development only
if (env.IsDevelopment())
{
    options.EnableSensitiveDataLogging();
}
```

### H. Future Enhancements

**Potential Additional Providers:**
- SQL Server (Microsoft.EntityFrameworkCore.SqlServer)
- Oracle (Oracle.EntityFrameworkCore)
- SQLite (Microsoft.EntityFrameworkCore.Sqlite) - for testing
- MariaDB (compatible with Pomelo.EntityFrameworkCore.MySql)

**Advanced Features:**
- Read replicas configuration
- Database sharding support
- Multi-tenant database isolation (database-per-tenant)
- Automatic failover configuration
- Connection pooling optimization

### I. References

**Documentation:**
- [EF Core Database Providers](https://docs.microsoft.com/en-us/ef/core/providers/)
- [Npgsql EF Core Provider](https://www.npgsql.org/efcore/)
- [Pomelo MySQL Provider](https://github.com/PomeloFoundation/Pomelo.EntityFrameworkCore.MySql)
- [EF Core Migrations](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/)

**Community Resources:**
- [Stack Overflow - EF Core](https://stackoverflow.com/questions/tagged/entity-framework-core)
- [GitHub - EF Core Issues](https://github.com/dotnet/efcore/issues)
- [Reddit - r/dotnet](https://reddit.com/r/dotnet)

---

## Summary

This implementation plan provides a comprehensive guide to making your Time Attendance System database-agnostic with support for both PostgreSQL and MySQL. The key benefits include:

✅ **Single Codebase**: One application supports both database providers
✅ **Configuration-Driven**: Switch providers via appsettings.json
✅ **Clean Architecture**: Maintains separation of concerns
✅ **Independent Migrations**: Each provider has its own migration history
✅ **No Breaking Changes**: Existing functionality preserved
✅ **Production Ready**: Includes deployment and testing strategies

Follow each phase sequentially, testing thoroughly after each step. The estimated implementation time is 2-3 days of development plus 1-2 days of testing.

---

**Document Version:** 1.0
**Last Updated:** October 24, 2025
**Maintained By:** Development Team
**Review Status:** Ready for Implementation
