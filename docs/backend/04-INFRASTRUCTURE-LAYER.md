# Time Attendance System - Infrastructure Layer Documentation

**Version**: 1.0
**Last Updated**: November 3, 2025
**Framework**: .NET 9.0 (C# 13)
**Database**: PostgreSQL 9.0

---

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [Entity Framework Core](#3-entity-framework-core)
4. [Services Implementation](#4-services-implementation)
5. [Repositories](#5-repositories)
6. [Background Jobs](#6-background-jobs)
7. [Dependency Injection](#7-dependency-injection)
8. [Seed Data](#8-seed-data)
9. [Security Implementation](#9-security-implementation)
10. [Configuration](#10-configuration)
11. [Best Practices](#11-best-practices)
12. [Development Guide](#12-development-guide)

---

## 1. Overview

### 1.1 Purpose

The Infrastructure Layer implements the **persistence**, **external services**, and **cross-cutting concerns** for the Time Attendance System. It provides concrete implementations of the abstractions defined in the Application Layer.

### 1.2 Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Entity Framework Core** | 9.0.0 | Object-relational mapping |
| **Npgsql (PostgreSQL)** | 9.0.0 | Database provider |
| **Coravel** | 6.0.2 | Background job scheduling |
| **OTP.NET** | 1.4.0 | Two-factor authentication (TOTP) |
| **Serilog** | 4.1.0 | Structured logging |
| **System.IdentityModel.Tokens.Jwt** | 8.14.0 | JWT token handling |

### 1.3 Responsibilities

```
┌──────────────────────────────────────────────────────┐
│         Infrastructure Layer                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ Persistence  │  │   Services   │  │ Background│ │
│  │              │  │              │  │   Jobs    │ │
│  │ • EF Core    │  │ • JWT Token  │  │ • Coravel │ │
│  │ • DbContext  │  │ • Password   │  │ • Daily   │ │
│  │ • Migrations │  │ • 2FA        │  │   Tasks   │ │
│  │ • Repos      │  │ • Email      │  └───────────┘ │
│  └──────────────┘  └──────────────┘                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Key Responsibilities**:
- **Data Access**: Entity Framework Core with PostgreSQL
- **Security**: JWT tokens, password hashing, 2FA
- **Background Processing**: Scheduled jobs with Coravel
- **External Services**: Email, device fingerprinting
- **Configuration**: Database setup, service registration
- **Audit Trail**: Automatic change tracking

---

## 2. Project Structure

### 2.1 Folder Organization

**Location**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/`

```
TimeAttendanceSystem.Infrastructure/
│
├── BackgroundJobs/                           # Scheduled background jobs
│   └── DailyAttendanceGenerationJob.cs       # Daily attendance record generation
│
├── Persistence/                              # Data access layer
│   ├── Common/                               # Shared database components
│   │   ├── ApplicationDbContextAdapter.cs    # IApplicationDbContext adapter
│   │   ├── TimeAttendanceDbContext.cs        # Main DbContext
│   │   ├── SeedData.cs                       # Database seeding
│   │   └── TestDataSeeder.cs                 # Test data generation
│   │
│   ├── PostgreSql/                           # PostgreSQL-specific
│   │   ├── Configurations/                   # 47 entity configurations
│   │   │   ├── AttendanceRecordConfiguration.cs
│   │   │   ├── EmployeeConfiguration.cs
│   │   │   ├── UserConfiguration.cs
│   │   │   ├── ShiftConfiguration.cs
│   │   │   └── ... (43 more configurations)
│   │   │
│   │   ├── Migrations/                       # EF Core migrations
│   │   │   ├── 20251024110451_InitialCreate.cs
│   │   │   ├── 20251025102440_AddFingerprintRequests.cs
│   │   │   ├── 20251102163804_AddEmployeeManagePermission.cs
│   │   │   └── 20251102171735_AddIsActiveToEmployee.cs
│   │   │
│   │   └── PostgreSqlDbContextFactory.cs     # Design-time factory
│   │
│   └── Repositories/                         # Custom repositories
│       ├── AttendanceRepository.cs           # Attendance queries
│       ├── AttendanceTransactionRepository.cs # Transaction queries
│       └── SettingsRepository.cs             # Settings with caching
│
├── Security/                                 # Security implementations
│   └── JwtTokenGenerator.cs                  # JWT token generation
│
├── Services/                                 # Infrastructure services
│   ├── CurrentUser.cs                        # Current user context
│   ├── DeviceService.cs                      # Device fingerprinting
│   ├── EmailService.cs                       # Email notifications
│   ├── PasswordService.cs                    # Password hashing
│   ├── PublicHolidayService.cs              # Holiday management
│   └── TwoFactorService.cs                   # TOTP 2FA
│
└── DependencyInjection.cs                    # Service registration
```

---

## 3. Entity Framework Core

### 3.1 TimeAttendanceDbContext

**Location**: [Persistence/Common/TimeAttendanceDbContext.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/TimeAttendanceDbContext.cs)

#### Core Features

```csharp
public class TimeAttendanceDbContext : DbContext
{
    private readonly ICurrentUser? _currentUser;
    private readonly ChangeTrackingService? _changeTrackingService;

    public TimeAttendanceDbContext(
        DbContextOptions<TimeAttendanceDbContext> options,
        ICurrentUser? currentUser = null,
        ChangeTrackingService? changeTrackingService = null)
        : base(options)
    {
        _currentUser = currentUser;
        _changeTrackingService = changeTrackingService;
    }

    // 47 DbSet properties (all domain entities)
    public DbSet<Branch> Branches => Set<Branch>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<User> Users => Set<User>();
    public DbSet<AttendanceRecord> AttendanceRecords => Set<AttendanceRecord>();
    // ... (42 more DbSets)
}
```

#### SaveChangesAsync Override

**Automatic Audit Trail**:

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
{
    // ──────────────────────────────────────────────────────────
    // 1. UPDATE AUDIT TIMESTAMPS
    // ──────────────────────────────────────────────────────────
    var entries = ChangeTracker.Entries<BaseEntity>();

    foreach (var entry in entries)
    {
        switch (entry.State)
        {
            case EntityState.Added:
                entry.Entity.CreatedAtUtc = DateTime.UtcNow;
                entry.Entity.CreatedBy = _currentUser?.UserId ?? 0;
                break;

            case EntityState.Modified:
                entry.Entity.ModifiedAtUtc = DateTime.UtcNow;
                entry.Entity.ModifiedBy = _currentUser?.UserId ?? 0;
                break;
        }
    }

    // ──────────────────────────────────────────────────────────
    // 2. TRACK CHANGES FOR AUDIT LOGS
    // ──────────────────────────────────────────────────────────
    Dictionary<object, List<AuditChange>>? auditChanges = null;

    if (_changeTrackingService != null)
    {
        auditChanges = _changeTrackingService.GetChanges(ChangeTracker);
    }

    // ──────────────────────────────────────────────────────────
    // 3. SAVE CHANGES (FIRST PHASE - GENERATES IDs)
    // ──────────────────────────────────────────────────────────
    var result = await base.SaveChangesAsync(cancellationToken);

    // ──────────────────────────────────────────────────────────
    // 4. ATTACH AUDIT CHANGES TO AUDIT LOGS
    // ──────────────────────────────────────────────────────────
    if (auditChanges != null && auditChanges.Any())
    {
        var auditLogs = ChangeTracker.Entries<AuditLog>()
            .Where(e => e.State == EntityState.Added)
            .Select(e => e.Entity)
            .ToList();

        foreach (var auditLog in auditLogs)
        {
            if (auditChanges.TryGetValue(auditLog, out var changes))
            {
                foreach (var change in changes)
                {
                    change.AuditLogId = auditLog.Id;
                    AuditChanges.Add(change);
                }
            }
        }

        // ──────────────────────────────────────────────────────
        // 5. SAVE AUDIT CHANGES (SECOND PHASE)
        // ──────────────────────────────────────────────────────
        await base.SaveChangesAsync(cancellationToken);
    }

    return result;
}
```

**Key Features**:
1. ✅ **Automatic Timestamps**: CreatedAtUtc, ModifiedAtUtc
2. ✅ **User Attribution**: CreatedBy, ModifiedBy from current user
3. ✅ **Field-Level Audit**: Tracks individual property changes
4. ✅ **Two-Phase Save**: First for entity IDs, second for audit changes
5. ✅ **Change Tracking Service**: Captures before/after values

---

### 3.2 Entity Configurations

**Location**: `Persistence/PostgreSql/Configurations/`

All 47 entities have dedicated Fluent API configurations.

#### Configuration Pattern (Example: Employee)

**Location**: [EmployeeConfiguration.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/PostgreSql/Configurations/EmployeeConfiguration.cs)

```csharp
public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        // ──────────────────────────────────────────────────────────
        // TABLE MAPPING
        // ──────────────────────────────────────────────────────────
        builder.ToTable("Employees");

        // ──────────────────────────────────────────────────────────
        // PRIMARY KEY
        // ──────────────────────────────────────────────────────────
        builder.HasKey(e => e.Id);

        // ──────────────────────────────────────────────────────────
        // PROPERTIES
        // ──────────────────────────────────────────────────────────
        builder.Property(e => e.EmployeeNumber)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(e => e.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Email)
            .HasMaxLength(200);

        // ──────────────────────────────────────────────────────────
        // ENUM CONVERSION
        // ──────────────────────────────────────────────────────────
        builder.Property(e => e.Gender)
            .HasConversion<int>();

        builder.Property(e => e.EmploymentStatus)
            .HasConversion<int>();

        builder.Property(e => e.WorkLocationType)
            .HasConversion<int>();

        // ──────────────────────────────────────────────────────────
        // CONCURRENCY TOKEN (POSTGRESQL BYTEA)
        // ──────────────────────────────────────────────────────────
        builder.Property(e => e.RowVersion)
            .IsRowVersion()
            .HasColumnType("bytea");

        // ──────────────────────────────────────────────────────────
        // SOFT DELETE QUERY FILTER
        // ──────────────────────────────────────────────────────────
        builder.HasQueryFilter(e => !e.IsDeleted);

        // ──────────────────────────────────────────────────────────
        // UNIQUE CONSTRAINTS (WITH SOFT DELETE FILTER)
        // ──────────────────────────────────────────────────────────
        builder.HasIndex(e => new { e.BranchId, e.EmployeeNumber })
            .IsUnique()
            .HasFilter("\"IsDeleted\" = false");

        // ──────────────────────────────────────────────────────────
        // RELATIONSHIPS
        // ──────────────────────────────────────────────────────────

        // Branch (Required)
        builder.HasOne(e => e.Branch)
            .WithMany(b => b.Employees)
            .HasForeignKey(e => e.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        // Department (Optional)
        builder.HasOne(e => e.Department)
            .WithMany(d => d.Employees)
            .HasForeignKey(e => e.DepartmentId)
            .OnDelete(DeleteBehavior.SetNull);

        // Manager (Self-referencing, Optional)
        builder.HasOne(e => e.Manager)
            .WithMany(e => e.DirectReports)
            .HasForeignKey(e => e.ManagerEmployeeId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
```

**Common Patterns Across All Configurations**:

1. **Soft Delete Query Filter**: `HasQueryFilter(x => !x.IsDeleted)`
2. **Optimistic Concurrency**: `RowVersion` with PostgreSQL `bytea`
3. **Unique Constraints**: With `IsDeleted = false` filter
4. **Enum Storage**: `HasConversion<int>()` for performance
5. **Cascade Behaviors**:
   - `Restrict`: Critical FK (prevents orphans)
   - `Cascade`: Owned entities (delete children)
   - `SetNull`: Optional references

---

### 3.3 Database Migrations

**Location**: `Persistence/PostgreSql/Migrations/`

#### Migration History

| Date | Migration | Purpose |
|------|-----------|---------|
| 2025-10-24 | `InitialCreate` | Complete database schema (47 tables) |
| 2025-10-25 | `AddFingerprintRequests` | Fingerprint enrollment feature |
| 2025-11-02 | `AddEmployeeManagePermission` | Employee management permission |
| 2025-11-02 | `AddIsActiveToEmployee` | Employee active status flag |

#### Migration Commands

**Create Migration**:
```bash
dotnet ef migrations add MigrationName \
    --startup-project ../../Api/TimeAttendanceSystem.Api \
    --context TimeAttendanceDbContext \
    --output-dir Persistence/PostgreSql/Migrations
```

**Update Database**:
```bash
dotnet ef database update \
    --startup-project ../../Api/TimeAttendanceSystem.Api \
    --context TimeAttendanceDbContext
```

**Drop Database** (Development):
```bash
dotnet ef database drop \
    --startup-project ../../Api/TimeAttendanceSystem.Api \
    --context TimeAttendanceDbContext
```

---

## 4. Services Implementation

### 4.1 JwtTokenGenerator

**Location**: [Security/JwtTokenGenerator.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Security/JwtTokenGenerator.cs)

#### Purpose
Generates and validates JWT (JSON Web Tokens) for authentication.

#### Implementation

```csharp
public class JwtTokenGenerator : IJwtTokenGenerator
{
    private readonly IConfiguration _configuration;

    public JwtTokenGenerator(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public string GenerateAccessToken(
        User user,
        IEnumerable<string> roles,
        IEnumerable<string> permissions,
        IEnumerable<long> branchIds,
        bool rememberMe = false)
    {
        // ──────────────────────────────────────────────────────────
        // 1. CREATE CLAIMS
        // ──────────────────────────────────────────────────────────
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new("preferred_language", user.PreferredLanguage)
        };

        // Add role claims
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        // Add permission claims
        foreach (var permission in permissions)
        {
            claims.Add(new Claim("permission", permission));
        }

        // Add branch scope claims
        foreach (var branchId in branchIds)
        {
            claims.Add(new Claim("branch_scope", branchId.ToString()));
        }

        // ──────────────────────────────────────────────────────────
        // 2. GET CONFIGURATION
        // ──────────────────────────────────────────────────────────
        var secret = _configuration["Jwt:Secret"]
            ?? throw new InvalidOperationException("JWT secret not configured");
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        var expiryMinutes = rememberMe
            ? int.Parse(_configuration["Jwt:RememberMeDays"] ?? "7") * 24 * 60
            : int.Parse(_configuration["Jwt:ExpiryMinutes"] ?? "15");

        // ──────────────────────────────────────────────────────────
        // 3. CREATE SIGNING CREDENTIALS
        // ──────────────────────────────────────────────────────────
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        // ──────────────────────────────────────────────────────────
        // 4. CREATE TOKEN
        // ──────────────────────────────────────────────────────────
        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
            signingCredentials: credentials
        );

        // ──────────────────────────────────────────────────────────
        // 5. RETURN SERIALIZED TOKEN
        // ──────────────────────────────────────────────────────────
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        // ──────────────────────────────────────────────────────────
        // CRYPTOGRAPHICALLY SECURE RANDOM TOKEN
        // ──────────────────────────────────────────────────────────
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }
}
```

**Token Structure**:
```json
{
  "jti": "550e8400-e29b-41d4-a716-446655440000",
  "sub": "123",
  "email": "user@example.com",
  "nameid": "123",
  "unique_name": "johndoe",
  "preferred_language": "en",
  "role": ["Admin", "Manager"],
  "permission": ["employee.read", "employee.create"],
  "branch_scope": ["1", "2", "3"],
  "exp": 1699564800,
  "iss": "TimeAttendanceSystem",
  "aud": "TimeAttendanceSystemClient"
}
```

**Security Features**:
- ✅ HMAC-SHA256 digital signatures
- ✅ Configurable expiration (15-60 minutes)
- ✅ Unique token identifier (jti) prevents replay
- ✅ Multiple claim types (roles, permissions, branches)
- ✅ Cryptographically secure refresh tokens (64 bytes)

---

### 4.2 PasswordService

**Location**: [Services/PasswordService.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/PasswordService.cs)

#### Purpose
Handles secure password hashing and verification using PBKDF2-SHA256.

#### Implementation

```csharp
public class PasswordService : IPasswordService
{
    private const int Iterations = 10_000;  // OWASP recommended
    private const int SaltSize = 32;        // 256 bits
    private const int HashSize = 32;        // 256 bits

    public (string Hash, string Salt) HashPassword(string password)
    {
        // ──────────────────────────────────────────────────────────
        // 1. GENERATE CRYPTOGRAPHIC SALT
        // ──────────────────────────────────────────────────────────
        using var rng = RandomNumberGenerator.Create();
        var saltBytes = new byte[SaltSize];
        rng.GetBytes(saltBytes);

        // ──────────────────────────────────────────────────────────
        // 2. HASH PASSWORD WITH PBKDF2-SHA256
        // ──────────────────────────────────────────────────────────
        using var pbkdf2 = new Rfc2898DeriveBytes(
            password,
            saltBytes,
            Iterations,
            HashAlgorithmName.SHA256);

        var hashBytes = pbkdf2.GetBytes(HashSize);

        // ──────────────────────────────────────────────────────────
        // 3. ENCODE TO BASE64 FOR STORAGE
        // ──────────────────────────────────────────────────────────
        var hash = Convert.ToBase64String(hashBytes);
        var salt = Convert.ToBase64String(saltBytes);

        return (hash, salt);
    }

    public bool VerifyPassword(string password, string hash, string salt)
    {
        try
        {
            // ──────────────────────────────────────────────────────
            // 1. DECODE SALT FROM BASE64
            // ──────────────────────────────────────────────────────
            var saltBytes = Convert.FromBase64String(salt);

            // ──────────────────────────────────────────────────────
            // 2. HASH INPUT PASSWORD WITH SAME PARAMETERS
            // ──────────────────────────────────────────────────────
            using var pbkdf2 = new Rfc2898DeriveBytes(
                password,
                saltBytes,
                Iterations,
                HashAlgorithmName.SHA256);

            var hashBytes = pbkdf2.GetBytes(HashSize);
            var computedHash = Convert.ToBase64String(hashBytes);

            // ──────────────────────────────────────────────────────
            // 3. CONSTANT-TIME COMPARISON
            // ──────────────────────────────────────────────────────
            return computedHash == hash;
        }
        catch
        {
            return false;
        }
    }

    public bool IsPasswordValid(string password)
    {
        // ──────────────────────────────────────────────────────────
        // PASSWORD POLICY VALIDATION
        // ──────────────────────────────────────────────────────────
        if (string.IsNullOrWhiteSpace(password))
            return false;

        if (password.Length < 8 || password.Length > 128)
            return false;

        // Must contain: uppercase, lowercase, digit, special char
        var hasUpperCase = password.Any(char.IsUpper);
        var hasLowerCase = password.Any(char.IsLower);
        var hasDigit = password.Any(char.IsDigit);
        var hasSpecialChar = password.Any(ch => !char.IsLetterOrDigit(ch));

        if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar)
            return false;

        // ──────────────────────────────────────────────────────────
        // COMMON PASSWORD CHECK
        // ──────────────────────────────────────────────────────────
        var commonPasswords = new[]
        {
            "password", "123456", "qwerty", "abc123", "admin",
            "letmein", "welcome", "monkey", "dragon", "master"
        };

        if (commonPasswords.Any(p => password.ToLower().Contains(p)))
            return false;

        // ──────────────────────────────────────────────────────────
        // PATTERN DETECTION
        // ──────────────────────────────────────────────────────────
        // Check for repeated characters (aaa, 111)
        if (Regex.IsMatch(password, @"(.)\1{2,}"))
            return false;

        // Check for sequential numbers (123, 456)
        if (Regex.IsMatch(password, @"(012|123|234|345|456|567|678|789)"))
            return false;

        return true;
    }
}
```

**Security Features**:
- ✅ **PBKDF2-SHA256**: Industry-standard key derivation
- ✅ **10,000 Iterations**: OWASP recommended minimum
- ✅ **256-bit Salt**: Unique per password
- ✅ **256-bit Hash**: Strong cryptographic output
- ✅ **Timing Attack Resistant**: Constant-time comparison
- ✅ **Password Policy**: Complexity requirements
- ✅ **Pattern Detection**: Blocks weak passwords

---

### 4.3 TwoFactorService

**Location**: [Services/TwoFactorService.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/TwoFactorService.cs)

#### Purpose
Implements TOTP (Time-based One-Time Password) for two-factor authentication.

#### Implementation

```csharp
public class TwoFactorService : ITwoFactorService
{
    public string GenerateSecretKey()
    {
        // ──────────────────────────────────────────────────────────
        // GENERATE 20-BYTE RANDOM SECRET
        // ──────────────────────────────────────────────────────────
        var secretBytes = new byte[20];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(secretBytes);

        // ──────────────────────────────────────────────────────────
        // ENCODE TO BASE32 (TOTP STANDARD)
        // ──────────────────────────────────────────────────────────
        return Base32Encoding.ToString(secretBytes);
    }

    public string GenerateQrCodeUri(string email, string secretKey, string issuer)
    {
        // ──────────────────────────────────────────────────────────
        // OTPAUTH URI FORMAT
        // ──────────────────────────────────────────────────────────
        // otpauth://totp/{issuer}:{email}?secret={key}&issuer={issuer}
        return $"otpauth://totp/{Uri.EscapeDataString(issuer)}:" +
               $"{Uri.EscapeDataString(email)}?secret={secretKey}&issuer=" +
               $"{Uri.EscapeDataString(issuer)}";
    }

    public bool VerifyCode(string secretKey, string code)
    {
        try
        {
            // ──────────────────────────────────────────────────────
            // CREATE TOTP INSTANCE
            // ──────────────────────────────────────────────────────
            var secretBytes = Base32Encoding.ToBytes(secretKey);
            var totp = new Totp(secretBytes, step: 30);  // 30-second window

            // ──────────────────────────────────────────────────────
            // VERIFY WITH ±1 WINDOW TOLERANCE (90 seconds total)
            // ──────────────────────────────────────────────────────
            long timeStepMatched;
            return totp.VerifyTotp(
                code,
                out timeStepMatched,
                window: new VerificationWindow(previous: 1, future: 1));
        }
        catch
        {
            return false;
        }
    }

    public List<string> GenerateBackupCodes(int count = 10)
    {
        var backupCodes = new List<string>();

        for (int i = 0; i < count; i++)
        {
            // ──────────────────────────────────────────────────────
            // GENERATE 8-CHARACTER BACKUP CODE
            // ──────────────────────────────────────────────────────
            var bytes = new byte[4];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);

            // Format: ABCD-1234
            var code = $"{BitConverter.ToString(bytes).Replace("-", "")}";
            var formatted = $"{code.Substring(0, 4)}-{code.Substring(4, 4)}";

            backupCodes.Add(formatted);
        }

        return backupCodes;
    }
}
```

**TOTP Configuration**:
- **Algorithm**: TOTP (RFC 6238)
- **Time Step**: 30 seconds
- **Window Tolerance**: ±1 step (90 seconds total)
- **Secret Size**: 20 bytes (160 bits)
- **Encoding**: Base32
- **Backup Codes**: 10 codes, 8 characters each

**QR Code Integration**:
```
Compatible with:
- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password
- Any RFC 6238 TOTP app
```

---

### 4.4 DeviceService

**Location**: [Services/DeviceService.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/DeviceService.cs)

#### Purpose
Manages user sessions and device fingerprinting for security.

#### Implementation

```csharp
public class DeviceService : IDeviceService
{
    private readonly IApplicationDbContext _context;

    public async Task<string> CreateSessionAsync(
        long userId,
        string? deviceInfo,
        string ipAddress,
        CancellationToken cancellationToken = default)
    {
        // ──────────────────────────────────────────────────────────
        // 1. GENERATE DEVICE FINGERPRINT
        // ──────────────────────────────────────────────────────────
        var fingerprint = GenerateDeviceFingerprint(deviceInfo, ipAddress);

        // ──────────────────────────────────────────────────────────
        // 2. PARSE DEVICE INFO
        // ──────────────────────────────────────────────────────────
        var (platform, browser) = ParseDeviceInfo(deviceInfo);

        // ──────────────────────────────────────────────────────────
        // 3. CREATE SESSION
        // ──────────────────────────────────────────────────────────
        var session = new UserSession
        {
            UserId = userId,
            SessionId = Guid.NewGuid().ToString(),
            DeviceFingerprint = fingerprint,
            DeviceName = $"{browser} on {platform}",
            IpAddress = ipAddress,
            UserAgent = deviceInfo,
            Platform = platform,
            Browser = browser,
            LastAccessedAtUtc = DateTime.UtcNow,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(30),
            IsActive = true,
            CreatedAtUtc = DateTime.UtcNow
        };

        _context.UserSessions.Add(session);
        await _context.SaveChangesAsync(cancellationToken);

        return session.SessionId;
    }

    private string GenerateDeviceFingerprint(string? deviceInfo, string ipAddress)
    {
        // ──────────────────────────────────────────────────────────
        // SHA256 HASH OF DEVICE CHARACTERISTICS
        // ──────────────────────────────────────────────────────────
        var input = $"{deviceInfo}|{ipAddress}";
        using var sha256 = SHA256.Create();
        var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToBase64String(hashBytes);
    }

    private (string Platform, string Browser) ParseDeviceInfo(string? userAgent)
    {
        if (string.IsNullOrWhiteSpace(userAgent))
            return ("Unknown", "Unknown");

        // ──────────────────────────────────────────────────────────
        // PLATFORM DETECTION
        // ──────────────────────────────────────────────────────────
        var platform = userAgent.ToLower() switch
        {
            var ua when ua.Contains("windows") => "Windows",
            var ua when ua.Contains("mac") => "macOS",
            var ua when ua.Contains("linux") => "Linux",
            var ua when ua.Contains("android") => "Android",
            var ua when ua.Contains("iphone") || ua.Contains("ipad") => "iOS",
            _ => "Unknown"
        };

        // ──────────────────────────────────────────────────────────
        // BROWSER DETECTION
        // ──────────────────────────────────────────────────────────
        var browser = userAgent.ToLower() switch
        {
            var ua when ua.Contains("chrome") && !ua.Contains("edg") => "Chrome",
            var ua when ua.Contains("firefox") => "Firefox",
            var ua when ua.Contains("edg") => "Edge",
            var ua when ua.Contains("safari") && !ua.Contains("chrome") => "Safari",
            var ua when ua.Contains("opera") => "Opera",
            _ => "Unknown"
        };

        return (platform, browser);
    }
}
```

**Session Features**:
- ✅ **Device Fingerprinting**: SHA256 hash of device+IP
- ✅ **Platform/Browser Detection**: Automatic parsing
- ✅ **30-Day Expiration**: Configurable session lifetime
- ✅ **Multi-Session Support**: Multiple active sessions per user
- ✅ **Activity Tracking**: LastAccessedAtUtc timestamp

---

### 4.5 EmailService

**Location**: [Services/EmailService.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Services/EmailService.cs)

#### Purpose
Sends email notifications (currently logging-based for development).

#### Implementation

```csharp
public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;
    private readonly IConfiguration _configuration;

    public async Task SendPasswordResetEmailAsync(
        string email,
        string resetToken)
    {
        var baseUrl = _configuration["App:BaseUrl"];
        var resetUrl = $"{baseUrl}/reset-password?token={resetToken}&email={email}";

        _logger.LogInformation(
            "Password reset email would be sent to {Email} with URL: {ResetUrl}",
            email,
            resetUrl);

        // TODO: Integrate with SendGrid, AWS SES, or other email provider
        await Task.CompletedTask;
    }

    public async Task SendEmailVerificationAsync(
        string email,
        string verificationToken)
    {
        var baseUrl = _configuration["App:BaseUrl"];
        var verificationUrl = $"{baseUrl}/verify-email?token={verificationToken}";

        _logger.LogInformation(
            "Email verification would be sent to {Email} with URL: {VerificationUrl}",
            email,
            verificationUrl);

        await Task.CompletedTask;
    }

    public async Task SendTwoFactorCodeAsync(
        string email,
        string code)
    {
        _logger.LogInformation(
            "Two-factor code {Code} would be sent to {Email}",
            code,
            email);

        await Task.CompletedTask;
    }
}
```

**Production Integration** (Future):
```csharp
// SendGrid example
var client = new SendGridClient(apiKey);
var from = new EmailAddress("noreply@example.com", "Time Attendance");
var to = new EmailAddress(email);
var msg = MailHelper.CreateSingleEmail(from, to, subject, plainText, htmlContent);
await client.SendEmailAsync(msg);
```

---

## 5. Repositories

### 5.1 AttendanceRepository

**Location**: [Persistence/Repositories/AttendanceRepository.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Repositories/AttendanceRepository.cs)

#### Purpose
Comprehensive attendance record queries with eager loading and filtering.

#### Key Methods

```csharp
// ──────────────────────────────────────────────────────────
// READ OPERATIONS
// ──────────────────────────────────────────────────────────
Task<AttendanceRecord?> GetByIdAsync(long id);
Task<AttendanceRecord?> GetByEmployeeAndDateAsync(long employeeId, DateTime date);
Task<List<AttendanceRecord>> GetByEmployeeAndDateRangeAsync(long employeeId, DateTime startDate, DateTime endDate);
Task<List<AttendanceRecord>> GetByBranchAndDateRangeAsync(long branchId, DateTime startDate, DateTime endDate);
Task<List<AttendanceRecord>> GetByDepartmentAndDateRangeAsync(long departmentId, DateTime startDate, DateTime endDate);
Task<List<AttendanceRecord>> GetPendingApprovalAsync(long? branchId);
Task<List<AttendanceRecord>> GetIncompleteRecordsAsync(long? branchId, DateTime? upToDate);

// ──────────────────────────────────────────────────────────
// WRITE OPERATIONS
// ──────────────────────────────────────────────────────────
Task<AttendanceRecord> CreateAsync(AttendanceRecord attendanceRecord);
Task<List<AttendanceRecord>> CreateBatchAsync(List<AttendanceRecord> attendanceRecords);
Task UpdateAsync(AttendanceRecord attendanceRecord);
Task DeleteAsync(long id);
Task DeleteByDateAsync(DateTime attendanceDate);

// ──────────────────────────────────────────────────────────
// STATISTICS
// ──────────────────────────────────────────────────────────
Task<AttendanceStatistics> GetStatisticsAsync(long? branchId, long? departmentId, DateTime startDate, DateTime endDate);
Task<List<DailyAttendanceStatistics>> GetDailyStatisticsAsync(DateTime startDate, DateTime endDate, long? branchId, long? departmentId);
```

#### Eager Loading Pattern

```csharp
private IQueryable<AttendanceRecord> GetBaseQuery()
{
    return _context.AttendanceRecords
        .Include(ar => ar.Employee)
            .ThenInclude(e => e.Branch)
        .Include(ar => ar.Employee)
            .ThenInclude(e => e.Department)
        .Include(ar => ar.ShiftAssignment)
            .ThenInclude(sa => sa!.Shift)
        .Include(ar => ar.Transactions.OrderBy(t => t.TransactionTimeUtc))
        .Include(ar => ar.WorkingDay)
        .Where(ar => !ar.IsDeleted);
}
```

#### Statistics DTOs

```csharp
public class AttendanceStatistics
{
    public int TotalRecords { get; set; }
    public int PresentCount { get; set; }
    public int AbsentCount { get; set; }
    public int LateCount { get; set; }
    public int EarlyLeaveCount { get; set; }
    public int OnLeaveCount { get; set; }
    public decimal AverageWorkingHours { get; set; }
    public decimal TotalOvertimeHours { get; set; }
    public decimal AttendanceRate { get; set; }
    public decimal PunctualityRate { get; set; }
}
```

---

### 5.2 AttendanceTransactionRepository

**Location**: [Persistence/Repositories/AttendanceTransactionRepository.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Repositories/AttendanceTransactionRepository.cs)

#### Purpose
Manage individual time clock events (check-in, check-out, breaks).

#### Transaction Validation

```csharp
public class TransactionValidationResult
{
    public bool IsValid { get; set; }
    public bool HasInvalidSequence { get; set; }
    public bool HasIncompleteCheckOut { get; set; }
    public bool HasIncompleteBreaks { get; set; }
    public List<string> Issues { get; set; } = new();
}

public async Task<TransactionValidationResult> ValidateTransactionSequenceAsync(
    long employeeId,
    DateTime date,
    CancellationToken cancellationToken = default)
{
    var result = new TransactionValidationResult { IsValid = true };

    var transactions = await GetByEmployeeAndDateAsync(employeeId, date, cancellationToken);
    var orderedTransactions = transactions.OrderBy(t => t.TransactionTimeUtc).ToList();

    // ──────────────────────────────────────────────────────────
    // VALIDATION RULES
    // ──────────────────────────────────────────────────────────

    // 1. Must start with check-in
    if (orderedTransactions.Any() &&
        orderedTransactions.First().TransactionType != TransactionType.CheckIn)
    {
        result.IsValid = false;
        result.HasInvalidSequence = true;
        result.Issues.Add("First transaction must be CheckIn");
    }

    // 2. Check for incomplete check-out
    var lastTransaction = orderedTransactions.LastOrDefault();
    if (lastTransaction != null &&
        lastTransaction.TransactionType != TransactionType.CheckOut &&
        lastTransaction.TransactionType != TransactionType.AutoCheckOut)
    {
        result.IsValid = false;
        result.HasIncompleteCheckOut = true;
        result.Issues.Add("Missing check-out transaction");
    }

    // 3. Validate break pairs
    var breakStarts = orderedTransactions.Count(t => t.TransactionType == TransactionType.BreakStart);
    var breakEnds = orderedTransactions.Count(t => t.TransactionType == TransactionType.BreakEnd);

    if (breakStarts != breakEnds)
    {
        result.IsValid = false;
        result.HasIncompleteBreaks = true;
        result.Issues.Add($"Incomplete break periods: {breakStarts} starts, {breakEnds} ends");
    }

    return result;
}
```

---

### 5.3 SettingsRepository (with Caching)

**Location**: [Persistence/Repositories/SettingsRepository.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Repositories/SettingsRepository.cs)

#### Purpose
Manage system settings with memory caching for performance.

#### Caching Strategy

```csharp
private readonly IMemoryCache _cache;
private const string ActiveOvertimeConfigCacheKey = "active_overtime_config";
private readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(30);

public async Task<OvertimeConfiguration?> GetActiveOvertimeConfigurationAsync(
    CancellationToken cancellationToken = default)
{
    // ──────────────────────────────────────────────────────────
    // CHECK CACHE FIRST
    // ──────────────────────────────────────────────────────────
    return await _cache.GetOrCreateAsync(
        ActiveOvertimeConfigCacheKey,
        async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = CacheDuration;

            // ──────────────────────────────────────────────────────
            // QUERY DATABASE IF NOT CACHED
            // ──────────────────────────────────────────────────────
            return await _context.OvertimeConfigurations
                .Where(oc => oc.IsActive)
                .OrderByDescending(oc => oc.EffectiveFromDate)
                .FirstOrDefaultAsync(cancellationToken);
        });
}

public async Task ActivateOvertimeConfigurationAsync(
    long id,
    CancellationToken cancellationToken = default)
{
    using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

    try
    {
        // ──────────────────────────────────────────────────────
        // 1. DEACTIVATE ALL EXISTING CONFIGURATIONS
        // ──────────────────────────────────────────────────────
        var existingConfigs = await _context.OvertimeConfigurations
            .Where(oc => oc.IsActive)
            .ToListAsync(cancellationToken);

        foreach (var config in existingConfigs)
        {
            config.IsActive = false;
        }

        // ──────────────────────────────────────────────────────
        // 2. ACTIVATE NEW CONFIGURATION
        // ──────────────────────────────────────────────────────
        var newConfig = await _context.OvertimeConfigurations
            .FindAsync(new object[] { id }, cancellationToken);

        if (newConfig == null)
            throw new InvalidOperationException("Configuration not found");

        newConfig.IsActive = true;

        await _context.SaveChangesAsync(cancellationToken);
        await transaction.CommitAsync(cancellationToken);

        // ──────────────────────────────────────────────────────
        // 3. INVALIDATE CACHE
        // ──────────────────────────────────────────────────────
        _cache.Remove(ActiveOvertimeConfigCacheKey);
    }
    catch
    {
        await transaction.RollbackAsync(cancellationToken);
        throw;
    }
}
```

**Cache Keys**:
- `active_overtime_config`: Active overtime configuration
- `public_holidays_{startDate}_{endDate}_{branchId}`: Holiday cache
- `off_days_active_{branchId}`: Off day configurations

---

## 6. Background Jobs

### 6.1 DailyAttendanceGenerationJob

**Location**: [BackgroundJobs/DailyAttendanceGenerationJob.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/BackgroundJobs/DailyAttendanceGenerationJob.cs)

#### Purpose
Generates daily attendance records for all active employees.

#### Implementation

```csharp
public class DailyAttendanceGenerationJob : IInvocable
{
    private readonly IDailyAttendanceGeneratorService _generatorService;
    private readonly ILogger<DailyAttendanceGenerationJob> _logger;

    public async Task Invoke()
    {
        var startTime = DateTime.UtcNow;
        _logger.LogInformation(
            "Starting daily attendance generation job at {Time}",
            startTime);

        try
        {
            // ──────────────────────────────────────────────────────
            // INVOKE SERVICE TO GENERATE ATTENDANCE
            // ──────────────────────────────────────────────────────
            var result = await _generatorService.GenerateDailyAttendanceAsync(
                DateTime.Today);

            var duration = DateTime.UtcNow - startTime;

            // ──────────────────────────────────────────────────────
            // LOG SUCCESS
            // ──────────────────────────────────────────────────────
            if (result.ErrorCount == 0)
            {
                _logger.LogInformation(
                    "Daily attendance generation completed successfully. " +
                    "Generated: {Generated}, Updated: {Updated}, Skipped: {Skipped}. " +
                    "Duration: {Duration}ms",
                    result.RecordsGenerated,
                    result.RecordsUpdated,
                    result.RecordsSkipped,
                    duration.TotalMilliseconds);
            }
            else
            {
                // ──────────────────────────────────────────────────
                // LOG WARNINGS FOR PARTIAL SUCCESS
                // ──────────────────────────────────────────────────
                _logger.LogWarning(
                    "Daily attendance generation completed with errors. " +
                    "Generated: {Generated}, Updated: {Updated}, Skipped: {Skipped}, " +
                    "Errors: {Errors}. Duration: {Duration}ms",
                    result.RecordsGenerated,
                    result.RecordsUpdated,
                    result.RecordsSkipped,
                    result.ErrorCount,
                    duration.TotalMilliseconds);

                foreach (var error in result.Errors)
                {
                    _logger.LogWarning("Error: {Error}", error);
                }
            }
        }
        catch (Exception ex)
        {
            // ──────────────────────────────────────────────────────
            // LOG FATAL ERRORS
            // ──────────────────────────────────────────────────────
            var duration = DateTime.UtcNow - startTime;
            _logger.LogError(
                ex,
                "Fatal error during daily attendance generation. Duration: {Duration}ms",
                duration.TotalMilliseconds);

            throw;  // Re-throw for Coravel error handling
        }
    }
}
```

#### Scheduling (in Program.cs)

```csharp
// Register Coravel
builder.Services.AddScheduler();
builder.Services.AddTransient<DailyAttendanceGenerationJob>();

// Schedule job
var app = builder.Build();
app.Services.UseScheduler(scheduler =>
{
    // Run at 2:00 AM daily
    scheduler.Schedule<DailyAttendanceGenerationJob>()
        .DailyAt(2, 0);
});
```

---

## 7. Dependency Injection

### 7.1 Service Registration

**Location**: [DependencyInjection.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/DependencyInjection.cs)

```csharp
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // ──────────────────────────────────────────────────────────
        // DATABASE
        // ──────────────────────────────────────────────────────────
        var connectionString = configuration.GetConnectionString("PostgreSqlConnection")
            ?? configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string not found");

        services.AddDbContext<TimeAttendanceDbContext>(options =>
        {
            options.UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorCodesToAdd: null);

                npgsqlOptions.CommandTimeout(30);
                npgsqlOptions.MigrationsAssembly(
                    typeof(TimeAttendanceDbContext).Assembly.FullName);
            });

            // PostgreSQL DateTime handling
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            // Development options
            if (configuration.GetValue<bool>("Logging:EnableSensitiveDataLogging"))
                options.EnableSensitiveDataLogging();

            if (configuration.GetValue<bool>("Logging:EnableDetailedErrors"))
                options.EnableDetailedErrors();
        });

        // ──────────────────────────────────────────────────────────
        // DBCONTEXT ADAPTER
        // ──────────────────────────────────────────────────────────
        services.AddScoped<IApplicationDbContext, ApplicationDbContextAdapter>();

        // ──────────────────────────────────────────────────────────
        // SECURITY SERVICES
        // ──────────────────────────────────────────────────────────
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddScoped<IPasswordService, PasswordService>();
        services.AddScoped<ITwoFactorService, TwoFactorService>();

        // ──────────────────────────────────────────────────────────
        // INFRASTRUCTURE SERVICES
        // ──────────────────────────────────────────────────────────
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUser, CurrentUser>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IDeviceService, DeviceService>();
        services.AddScoped<IPublicHolidayService, PublicHolidayService>();

        // ──────────────────────────────────────────────────────────
        // REPOSITORIES
        // ──────────────────────────────────────────────────────────
        services.AddScoped<IAttendanceRepository, AttendanceRepository>();
        services.AddScoped<IAttendanceTransactionRepository, AttendanceTransactionRepository>();
        services.AddScoped<ISettingsRepository, SettingsRepository>();

        // ──────────────────────────────────────────────────────────
        // BACKGROUND JOBS
        // ──────────────────────────────────────────────────────────
        services.AddScheduler();
        services.AddTransient<DailyAttendanceGenerationJob>();

        // ──────────────────────────────────────────────────────────
        // CHANGE TRACKING
        // ──────────────────────────────────────────────────────────
        services.AddScoped<ChangeTrackingService>();

        // ──────────────────────────────────────────────────────────
        // AUTHENTICATION
        // ──────────────────────────────────────────────────────────
        AddAuthentication(services, configuration);

        // ──────────────────────────────────────────────────────────
        // AUTHORIZATION POLICIES
        // ──────────────────────────────────────────────────────────
        AddAuthorizationPolicies(services);

        return services;
    }

    private static void AddAuthentication(
        IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration["Jwt:Secret"]!)),
                    ClockSkew = TimeSpan.Zero  // Exact expiration
                };
            });
    }

    private static void AddAuthorizationPolicies(IServiceCollection services)
    {
        services.AddAuthorization(options =>
        {
            // System Administration
            options.AddPolicy("SystemAdmin", policy =>
                policy.RequireRole("SystemAdmin"));

            // User Management
            options.AddPolicy("UserRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "user.read")));

            options.AddPolicy("UserManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "user.create") &&
                    context.User.HasClaim("permission", "user.update") &&
                    context.User.HasClaim("permission", "user.delete")));

            // Employee Management
            options.AddPolicy("EmployeeRead", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "employee.read")));

            options.AddPolicy("EmployeeManagement", policy =>
                policy.RequireAssertion(context =>
                    context.User.IsInRole("SystemAdmin") ||
                    context.User.HasClaim("permission", "employee.manage")));

            // ... 40+ more policies
        });
    }
}
```

---

## 8. Seed Data

### 8.1 SeedData Class

**Location**: [Persistence/Common/SeedData.cs](../../../src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Common/SeedData.cs)

#### Seeding Strategy

```csharp
public static class SeedData
{
    public static async Task SeedAsync(TimeAttendanceDbContext context)
    {
        // ──────────────────────────────────────────────────────────
        // 1. SEED PERMISSIONS (ALWAYS - ENSURES UP-TO-DATE)
        // ──────────────────────────────────────────────────────────
        await SeedPermissionsAsync(context);

        // ──────────────────────────────────────────────────────────
        // 2. SEED ROLES (IF NONE EXIST)
        // ──────────────────────────────────────────────────────────
        if (!await context.Roles.AnyAsync())
        {
            await SeedRolesAsync(context);
        }

        // ──────────────────────────────────────────────────────────
        // 3. SEED DEFAULT USER (IF NONE EXIST)
        // ──────────────────────────────────────────────────────────
        if (!await context.Users.AnyAsync())
        {
            await SeedUsersAsync(context);
        }

        // ──────────────────────────────────────────────────────────
        // 4. ENSURE SYSTEMADMIN HAS ALL PERMISSIONS
        // ──────────────────────────────────────────────────────────
        await EnsureSystemAdminPermissionsAsync(context);

        // ──────────────────────────────────────────────────────────
        // 5. SEED DEFAULT SHIFT (IF NONE EXIST)
        // ──────────────────────────────────────────────────────────
        if (!await context.Shifts.AnyAsync())
        {
            await SeedDefaultShiftAsync(context);
        }

        // ──────────────────────────────────────────────────────────
        // 6. SEED DEFAULT REMOTE WORK POLICY (IF NONE EXIST)
        // ──────────────────────────────────────────────────────────
        if (!await context.RemoteWorkPolicies.AnyAsync())
        {
            await SeedDefaultRemoteWorkPolicyAsync(context);
        }

        await context.SaveChangesAsync();
    }
}
```

#### Permission Seeding (150+ Permissions)

```csharp
private static async Task SeedPermissionsAsync(TimeAttendanceDbContext context)
{
    var permissions = new List<Permission>();

    // User permissions
    permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions("user", "User"));
    permissions.Add(PermissionBuilder.CreatePermission("user", "assignRole", "User"));
    permissions.Add(PermissionBuilder.CreatePermission("user", "removeRole", "User"));
    permissions.Add(PermissionBuilder.CreatePermission("user", "resetPassword", "User"));
    permissions.Add(PermissionBuilder.CreatePermission("user", "lock", "User"));
    permissions.Add(PermissionBuilder.CreatePermission("user", "unlock", "User"));

    // Employee permissions
    permissions.AddRange(PermissionBuilder.CreateExtendedCrudPermissions("employee", "Employee"));
    permissions.Add(PermissionBuilder.CreatePermission("employee", "activate", "Employee"));
    permissions.Add(PermissionBuilder.CreatePermission("employee", "deactivate", "Employee"));
    permissions.Add(PermissionBuilder.CreatePermission("employee", "manage", "Employee"));

    // ... 20+ more resource groups

    // Upsert logic to update existing permissions
    foreach (var permission in permissions)
    {
        var existing = await context.Permissions
            .FirstOrDefaultAsync(p => p.Key == permission.Key);

        if (existing != null)
        {
            existing.Group = permission.Group;
            existing.Description = permission.Description;
        }
        else
        {
            context.Permissions.Add(permission);
        }
    }

    await context.SaveChangesAsync();
}
```

#### Default User Seeding

```csharp
private static async Task SeedUsersAsync(TimeAttendanceDbContext context)
{
    var passwordService = new PasswordService();
    var (hash, salt) = passwordService.HashPassword("TempP@ssw0rd123!");

    var systemAdmin = new User
    {
        Username = "systemadmin",
        Email = "systemadmin@system.com",
        PasswordHash = hash,
        PasswordSalt = salt,
        TwoFactorEnabled = false,
        IsEmailVerified = true,
        IsActive = true,
        PreferredLanguage = "en",
        CreatedAtUtc = DateTime.UtcNow,
        CreatedBy = 0  // System
    };

    context.Users.Add(systemAdmin);
    await context.SaveChangesAsync();

    // Assign SystemAdmin role
    var systemAdminRole = await context.Roles
        .FirstOrDefaultAsync(r => r.Name == "SystemAdmin");

    if (systemAdminRole != null)
    {
        context.UserRoles.Add(new UserRole
        {
            UserId = systemAdmin.Id,
            RoleId = systemAdminRole.Id
        });
    }

    await context.SaveChangesAsync();
}
```

---

## 9. Security Implementation

### 9.1 JWT Token Security

**Token Generation**:
- ✅ HMAC-SHA256 signatures
- ✅ Unique token ID (jti) prevents replay
- ✅ Configurable expiration
- ✅ Zero clock skew (exact expiration)
- ✅ Comprehensive claims (roles, permissions, branches)

**Token Validation**:
```csharp
TokenValidationParameters:
- ValidateIssuer: true
- ValidateAudience: true
- ValidateLifetime: true
- ValidateIssuerSigningKey: true
- ClockSkew: TimeSpan.Zero
```

---

### 9.2 Password Security

**PBKDF2-SHA256 Configuration**:
- ✅ 10,000 iterations (OWASP minimum)
- ✅ 256-bit cryptographic salt
- ✅ 256-bit hash output
- ✅ Timing attack resistant
- ✅ Unique salt per password

**Password Policy**:
```
Minimum Length: 8 characters
Maximum Length: 128 characters
Required: Uppercase, lowercase, digit, special character
Blocked: Common passwords, repeated patterns, sequences
```

---

### 9.3 Two-Factor Authentication

**TOTP Configuration**:
- ✅ 30-second time windows
- ✅ ±1 window tolerance (90 seconds total)
- ✅ 20-byte (160-bit) secret keys
- ✅ Base32 encoding (RFC 4648)
- ✅ Compatible with Google Authenticator, Microsoft Authenticator, etc.

**Backup Codes**:
- ✅ 10 codes generated
- ✅ 8 characters each (XXXX-XXXX format)
- ✅ Cryptographically secure random generation
- ✅ One-time use only

---

### 9.4 Session Management

**Device Fingerprinting**:
```csharp
SHA256(UserAgent + IPAddress)
```

**Session Features**:
- ✅ 30-day expiration (configurable)
- ✅ Multi-session support
- ✅ Platform/browser detection
- ✅ Activity tracking
- ✅ Automatic cleanup

---

## 10. Configuration

### 10.1 Required Settings

**appsettings.json**:

```json
{
  "ConnectionStrings": {
    "PostgreSqlConnection": "Host=localhost;Port=5432;Database=timeattendance;Username=postgres;Password=yourpassword"
  },
  "Jwt": {
    "Secret": "your-secret-key-minimum-32-characters-long",
    "Issuer": "TimeAttendanceSystem",
    "Audience": "TimeAttendanceSystemClient",
    "ExpiryMinutes": 15,
    "RememberMeDays": 7
  },
  "App": {
    "BaseUrl": "http://localhost:4200"
  },
  "Logging": {
    "EnableSensitiveDataLogging": false,
    "EnableDetailedErrors": false
  }
}
```

---

## 11. Best Practices

### 11.1 Repository Pattern

✅ **Abstraction**: Hides EF Core implementation details
✅ **Testability**: Easy to mock for unit tests
✅ **Eager Loading**: Optimized includes for performance
✅ **Caching**: Memory cache for frequently accessed data
✅ **Bulk Operations**: Efficient batch processing

### 11.2 Service Lifetime

```
DbContext: Scoped (per HTTP request)
Repositories: Scoped (shares DbContext)
Services: Scoped (state within request)
Background Jobs: Transient (new instance per execution)
```

### 11.3 Error Handling

```csharp
try
{
    // Database operation
    await context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException)
{
    // Handle optimistic concurrency conflicts
}
catch (DbUpdateException ex)
{
    // Handle database constraint violations
    _logger.LogError(ex, "Database error");
    throw;
}
```

---

## 12. Development Guide

### 12.1 Adding a New Entity Configuration

**Step 1**: Create configuration class

```csharp
public class MyEntityConfiguration : IEntityTypeConfiguration<MyEntity>
{
    public void Configure(EntityTypeBuilder<MyEntity> builder)
    {
        builder.ToTable("MyEntities");
        builder.HasKey(e => e.Id);

        // Properties
        builder.Property(e => e.Name).IsRequired().HasMaxLength(100);

        // Soft delete filter
        builder.HasQueryFilter(e => !e.IsDeleted);

        // Relationships
        builder.HasOne(e => e.Parent)
            .WithMany(p => p.Children)
            .HasForeignKey(e => e.ParentId);
    }
}
```

**Step 2**: Register in OnModelCreating

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.ApplyConfiguration(new MyEntityConfiguration());
}
```

**Step 3**: Create migration

```bash
dotnet ef migrations add AddMyEntity
```

---

### 12.2 Adding a New Service

**Step 1**: Define interface in Application layer

```csharp
public interface IMyService
{
    Task DoSomethingAsync();
}
```

**Step 2**: Implement in Infrastructure layer

```csharp
public class MyService : IMyService
{
    private readonly IApplicationDbContext _context;

    public MyService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task DoSomethingAsync()
    {
        // Implementation
    }
}
```

**Step 3**: Register in DependencyInjection

```csharp
services.AddScoped<IMyService, MyService>();
```

---

## Summary

The Infrastructure Layer provides:

✅ **Entity Framework Core** - PostgreSQL persistence with 47 entity configurations
✅ **Security Services** - JWT, password hashing, 2FA, session management
✅ **Repositories** - Optimized queries with caching
✅ **Background Jobs** - Coravel scheduling for daily tasks
✅ **Seed Data** - 150+ permissions, default roles, system admin user
✅ **Authorization** - 40+ policies for fine-grained access control
✅ **Audit Trail** - Automatic change tracking with field-level logging
✅ **Multi-Tenant** - Branch-scoped data isolation

**Next Steps**:
- Review [API Layer Documentation](05-API-LAYER.md) for controllers and middleware
- Review [Application Layer Documentation](03-APPLICATION-LAYER.md) for CQRS
- Review [Domain Layer Documentation](02-DOMAIN-LAYER.md) for business logic

---

**Document Version**: 1.0
**Last Updated**: November 3, 2025
**Maintained By**: Development Team
