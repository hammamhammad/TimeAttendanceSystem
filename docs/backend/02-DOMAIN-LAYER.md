# Time Attendance System - Domain Layer Documentation

**Version**: 1.0
**Last Updated**: November 3, 2025
**Framework**: .NET 9.0 (C# 13)
**Pattern**: Domain-Driven Design (DDD)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Base Infrastructure](#2-base-infrastructure)
3. [Core Aggregates](#3-core-aggregates)
   - [User Aggregate](#31-user-aggregate)
   - [Employee Aggregate](#32-employee-aggregate)
   - [Branch & Department Aggregate](#33-branch--department-aggregate)
   - [Shift Aggregate](#34-shift-aggregate)
   - [Attendance Aggregate](#35-attendance-aggregate)
   - [Settings Aggregate](#36-settings-aggregate)
   - [Vacation Aggregate](#37-vacation-aggregate)
   - [Excuse Aggregate](#38-excuse-aggregate)
   - [Remote Work Aggregate](#39-remote-work-aggregate)
   - [Fingerprint Request Aggregate](#310-fingerprint-request-aggregate)
4. [Domain Patterns](#4-domain-patterns)
5. [Business Rules](#5-business-rules)
6. [Entity Relationships](#6-entity-relationships)
7. [Common Development Tasks](#7-common-development-tasks)

---

## 1. Overview

### 1.1 Domain Layer Purpose

The Domain Layer is the **heart of the application** and contains:
- **Business Entities**: Core domain objects with identity
- **Aggregate Roots**: Entity clusters with transactional boundaries
- **Business Logic**: Validation, calculations, and state management
- **Domain Rules**: Invariants and constraints
- **Enumerations**: Business-specific types

### 1.2 Architecture Principles

```
┌─────────────────────────────────────────────────┐
│           Application Layer                      │
│  (Orchestrates domain objects via CQRS)         │
└────────────────┬────────────────────────────────┘
                 │ Uses
                 ▼
┌─────────────────────────────────────────────────┐
│           Domain Layer                           │
│  ✓ No dependencies on other layers              │
│  ✓ Pure business logic                          │
│  ✓ Rich domain models                           │
│  ✓ Self-validating entities                     │
└─────────────────────────────────────────────────┘
```

**Key Principles**:
- **Persistence Ignorance**: Domain entities don't know about databases
- **Rich Models**: Business logic lives in entities, not services
- **Aggregate Boundaries**: Clear transactional consistency boundaries
- **Ubiquitous Language**: Code reflects business terminology

### 1.3 Project Structure

```
src/Domain/TimeAttendanceSystem.Domain/
├── Common/
│   ├── BaseEntity.cs                    # Base class for all entities
│   ├── ValueObject.cs                   # Base for value objects
│   ├── AuditLog.cs                      # Audit trail
│   ├── AuditChange.cs                   # Field-level changes
│   ├── PermissionBuilder.cs             # Permission helper
│   ├── PermissionResources.cs           # Resource constants
│   └── PermissionActions.cs             # Action constants
├── Users/
│   ├── User.cs                          # User aggregate root
│   ├── Role.cs
│   ├── Permission.cs
│   ├── UserRole.cs                      # Join table
│   ├── RolePermission.cs                # Join table
│   ├── UserBranchScope.cs
│   ├── RefreshToken.cs
│   ├── LoginAttempt.cs
│   ├── PasswordHistory.cs
│   ├── BlacklistedToken.cs
│   ├── TwoFactorBackupCode.cs
│   └── UserSession.cs
├── Employees/
│   ├── Employee.cs                      # Employee aggregate root
│   └── EmployeeUserLink.cs
├── Branches/
│   ├── Branch.cs                        # Branch aggregate root
│   └── Department.cs
├── Shifts/
│   ├── Shift.cs                         # Shift aggregate root
│   ├── ShiftPeriod.cs
│   └── ShiftAssignment.cs
├── Attendance/
│   ├── AttendanceRecord.cs              # Attendance aggregate root
│   ├── AttendanceTransaction.cs
│   └── WorkingDay.cs
├── Settings/
│   ├── OvertimeConfiguration.cs
│   ├── PublicHoliday.cs
│   └── OffDay.cs
├── VacationTypes/
│   └── VacationType.cs
├── Vacations/
│   └── EmployeeVacation.cs
├── Excuses/
│   ├── ExcusePolicy.cs
│   └── EmployeeExcuse.cs
├── RemoteWork/
│   ├── RemoteWorkPolicy.cs
│   └── RemoteWorkRequest.cs
├── FingerprintRequests/
│   └── FingerprintRequest.cs
└── Enums/
    ├── EmploymentStatus.cs
    ├── AttendanceStatus.cs
    ├── ShiftType.cs
    └── [50+ other enums]
```

---

## 2. Base Infrastructure

### 2.1 BaseEntity

**Location**: [Common/BaseEntity.cs](../../src/Domain/TimeAttendanceSystem.Domain/Common/BaseEntity.cs)

**Purpose**: Foundation for all domain entities providing:
- Unique identification
- Audit trail tracking
- Soft delete capability
- Concurrency control

**Implementation**:

```csharp
public abstract class BaseEntity
{
    // Primary Key
    public long Id { get; set; }

    // Audit Trail (immutable after creation)
    public DateTime CreatedAtUtc { get; set; }
    public long? CreatedBy { get; set; }

    // Audit Trail (updated on modification)
    public DateTime? ModifiedAtUtc { get; set; }
    public long? ModifiedBy { get; set; }

    // Soft Delete (logical deletion)
    public bool IsDeleted { get; set; }

    // Concurrency Control (optimistic locking)
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}
```

**Key Features**:

1. **Global Unique Identity**: Every entity has a unique `long Id`
2. **UTC Timestamps**: All times stored in UTC for global consistency
3. **User Attribution**: Tracks who created/modified the entity
4. **Soft Delete**: `IsDeleted` flag preserves data for compliance
5. **Optimistic Locking**: `RowVersion` prevents concurrent update conflicts

**Usage in Queries**:

```csharp
// Always filter out deleted entities
var activeEmployees = dbContext.Employees
    .Where(e => !e.IsDeleted)
    .ToList();

// Include audit information
var user = dbContext.Users
    .Where(u => u.Id == userId)
    .Select(u => new {
        u.Id,
        u.Username,
        CreatedAt = u.CreatedAtUtc,
        LastModified = u.ModifiedAtUtc
    })
    .FirstOrDefault();
```

---

### 2.2 ValueObject

**Location**: [Common/ValueObject.cs](../../src/Domain/TimeAttendanceSystem.Domain/Common/ValueObject.cs)

**Purpose**: Base class for value objects following DDD patterns.

**Characteristics**:
- No identity (defined by their properties)
- Immutable (cannot be changed after creation)
- Structural equality (two value objects with same values are equal)

**Implementation**:

```csharp
public abstract class ValueObject
{
    protected abstract IEnumerable<object?> GetEqualityComponents();

    public override bool Equals(object? obj)
    {
        if (obj == null || obj.GetType() != GetType())
            return false;

        var other = (ValueObject)obj;
        return GetEqualityComponents().SequenceEqual(other.GetEqualityComponents());
    }

    public override int GetHashCode()
    {
        return GetEqualityComponents()
            .Select(x => x?.GetHashCode() ?? 0)
            .Aggregate((x, y) => x ^ y);
    }
}
```

**Example Usage** (if you want to create a value object):

```csharp
public class TimeRange : ValueObject
{
    public TimeOnly Start { get; }
    public TimeOnly End { get; }

    public TimeRange(TimeOnly start, TimeOnly end)
    {
        if (end <= start)
            throw new ArgumentException("End time must be after start time");

        Start = start;
        End = end;
    }

    protected override IEnumerable<object?> GetEqualityComponents()
    {
        yield return Start;
        yield return End;
    }
}
```

---

## 3. Core Aggregates

### 3.1 User Aggregate

**Aggregate Root**: `User`
**Purpose**: Authentication, authorization, and user account management
**Bounded Context**: Security and access control

#### 3.1.1 User (Aggregate Root)

**Location**: [Users/User.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/User.cs)

**Core Properties**:

```csharp
public class User : BaseEntity
{
    // Identity
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Phone { get; set; }

    // Security
    public string PasswordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;

    // Two-Factor Authentication
    public bool TwoFactorEnabled { get; set; }
    public string? TwoFactorSecretKey { get; set; }

    // Account Lockout
    public DateTime? LockoutEndUtc { get; set; }
    public int FailedLoginAttempts { get; set; }

    // Email Verification
    public bool IsEmailVerified { get; set; }
    public string? EmailVerificationToken { get; set; }
    public DateTime? EmailVerificationTokenExpiresAtUtc { get; set; }

    // Password Reset
    public string? PasswordResetToken { get; set; }
    public DateTime? PasswordResetTokenExpiresAtUtc { get; set; }

    // Password Management
    public bool MustChangePassword { get; set; }
    public DateTime? PasswordChangedAtUtc { get; set; }

    // Status & Settings
    public bool IsActive { get; set; }
    public string PreferredLanguage { get; set; } = "en";

    // Navigation Properties
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<UserBranchScope> BranchScopes { get; set; } = new List<UserBranchScope>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public ICollection<LoginAttempt> LoginAttempts { get; set; } = new List<LoginAttempt>();
    public ICollection<PasswordHistory> PasswordHistories { get; set; } = new List<PasswordHistory>();
    public ICollection<TwoFactorBackupCode> TwoFactorBackupCodes { get; set; } = new List<TwoFactorBackupCode>();
    public ICollection<UserSession> Sessions { get; set; } = new List<UserSession>();
    public ICollection<BlacklistedToken> BlacklistedTokens { get; set; } = new List<BlacklistedToken>();
    public EmployeeUserLink? EmployeeLink { get; set; }
}
```

**Security Features**:

1. **Password Hashing**:
   - Algorithm: PBKDF2-SHA256
   - Iterations: 10,000
   - Unique salt per user
   - Salt stored separately

2. **Progressive Lockout**:
   ```
   5 failures  → 15 minutes lockout
   10 failures → 1 hour lockout
   15+ failures → 24 hours lockout
   ```

3. **Two-Factor Authentication**:
   - TOTP-based (Google Authenticator compatible)
   - 10 backup codes for recovery
   - Can be enabled/disabled per user

4. **Email Verification**:
   - Required for password reset
   - Token-based verification
   - Configurable expiration

**Business Rules**:
- Username must be unique (case-insensitive)
- Email must be unique
- Password must meet complexity requirements (handled in application layer)
- Cannot reuse last 5 passwords
- Lockout duration increases with repeated failures
- Must verify email before password reset

---

#### 3.1.2 Role

**Location**: [Users/Role.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/Role.cs)

**Properties**:

```csharp
public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public bool IsSystem { get; set; }      // System-defined roles
    public bool IsEditable { get; set; }    // Can be modified
    public bool IsDeletable { get; set; }   // Can be deleted

    // Navigation Properties
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
```

**Default Roles**:
1. **SystemAdmin** - Full system access (IsSystem=true, IsEditable=false, IsDeletable=false)
2. **Admin** - All permissions except user management
3. **HROperation** - Employee management only
4. **User** - Read-only access

**Business Rules**:
- System roles cannot be deleted or renamed
- Role names must be unique
- At least one SystemAdmin role must exist

---

#### 3.1.3 Permission

**Location**: [Users/Permission.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/Permission.cs)

**Properties**:

```csharp
public class Permission : BaseEntity
{
    public string Key { get; set; } = string.Empty;     // Format: "resource.action"
    public string Group { get; set; } = string.Empty;   // Grouping for UI
    public string Description { get; set; } = string.Empty;

    // Navigation Properties
    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}
```

**Permission Format**: `{resource}.{action}`

**Examples**:
```
employee.read         - View employees
employee.create       - Create employees
employee.update       - Update employees
employee.delete       - Delete employees
employee.export       - Export employee data
attendance.approve    - Approve attendance records
shift.assign          - Assign shifts to employees
```

**Resources** (see [PermissionResources.cs](../../src/Domain/TimeAttendanceSystem.Domain/Common/PermissionResources.cs)):
```
user, role, employee, branch, department, shift, attendance, schedule,
report, settings, dashboard, permission, audit, notification, system,
publicHoliday, vacationType, vacation, excusePolicy, excuse, session
```

**Actions** (see [PermissionActions.cs](../../src/Domain/TimeAttendanceSystem.Domain/Common/PermissionActions.cs)):
```
read, create, update, delete, export, import, approve, reject, lock, unlock,
resetPassword, assignRole, removeRole, assignPermission, removePermission,
view, download, upload, archive, restore, activate, deactivate, assign,
unassign, manage, configure, bulkCreate
```

---

#### 3.1.4 Supporting Entities

**RefreshToken** - [Users/RefreshToken.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/RefreshToken.cs)

```csharp
public class RefreshToken : BaseEntity
{
    public long UserId { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAtUtc { get; set; }
    public DateTime? RevokedAtUtc { get; set; }
    public string? DeviceInfo { get; set; }

    // Computed Properties
    public bool IsExpired => DateTime.UtcNow >= ExpiresAtUtc;
    public bool IsRevoked => RevokedAtUtc.HasValue;
    public bool IsActive => !IsRevoked && !IsExpired;

    // Navigation
    public User User { get; set; } = null!;
}
```

**LoginAttempt** - [Users/LoginAttempt.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/LoginAttempt.cs)

```csharp
public class LoginAttempt : BaseEntity
{
    public long? UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string? UserAgent { get; set; }
    public bool IsSuccessful { get; set; }
    public string? FailureReason { get; set; }

    // Navigation
    public User? User { get; set; }
}
```

**PasswordHistory** - [Users/PasswordHistory.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/PasswordHistory.cs)

```csharp
public class PasswordHistory : BaseEntity
{
    public long UserId { get; set; }
    public string PasswordHash { get; set; } = string.Empty;
    public string PasswordSalt { get; set; } = string.Empty;
    public DateTime ChangedAtUtc { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}
```

**UserSession** - [Users/UserSession.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/UserSession.cs)

```csharp
public class UserSession : BaseEntity
{
    public long UserId { get; set; }
    public string SessionId { get; set; } = string.Empty;
    public string? DeviceFingerprint { get; set; }
    public string? DeviceName { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string? UserAgent { get; set; }
    public string? Platform { get; set; }
    public string? Browser { get; set; }
    public string? Location { get; set; }
    public DateTime LastAccessedAtUtc { get; set; }
    public DateTime ExpiresAtUtc { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}
```

**TwoFactorBackupCode** - [Users/TwoFactorBackupCode.cs](../../src/Domain/TimeAttendanceSystem.Domain/Users/TwoFactorBackupCode.cs)

```csharp
public class TwoFactorBackupCode : BaseEntity
{
    public long UserId { get; set; }
    public string Code { get; set; } = string.Empty;
    public bool IsUsed { get; set; }
    public DateTime? UsedAtUtc { get; set; }

    // Navigation
    public User User { get; set; } = null!;
}
```

---

### 3.2 Employee Aggregate

**Aggregate Root**: `Employee`
**Purpose**: Employee information and organizational hierarchy
**Bounded Context**: Human Resources

#### 3.2.1 Employee (Aggregate Root)

**Location**: [Employees/Employee.cs](../../src/Domain/TimeAttendanceSystem.Domain/Employees/Employee.cs)

**Core Properties**:

```csharp
public class Employee : BaseEntity
{
    // Tenant Boundary
    public long BranchId { get; set; }

    // Identification
    public string EmployeeNumber { get; set; } = string.Empty;  // Unique within branch

    // Personal Information (Bilingual)
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? FirstNameAr { get; set; }
    public string? LastNameAr { get; set; }

    // Identity Documents
    public string? NationalId { get; set; }

    // Contact Information
    public string? Email { get; set; }
    public string? Phone { get; set; }

    // Personal Details
    public DateTime? DateOfBirth { get; set; }
    public Gender Gender { get; set; }

    // Employment Information
    public DateTime HireDate { get; set; }
    public EmploymentStatus EmploymentStatus { get; set; }
    public string? JobTitle { get; set; }
    public string? JobTitleAr { get; set; }
    public WorkLocationType WorkLocationType { get; set; }

    // Organizational Structure
    public long? DepartmentId { get; set; }
    public long? ManagerEmployeeId { get; set; }  // Self-referencing

    // Profile
    public string? PhotoUrl { get; set; }

    // Status
    public bool IsActive { get; set; }  // Active/Inactive (separate from soft delete)

    // Computed Properties
    public string FullName => $"{FirstName} {LastName}";
    public string? FullNameAr => !string.IsNullOrEmpty(FirstNameAr) && !string.IsNullOrEmpty(LastNameAr)
        ? $"{FirstNameAr} {LastNameAr}" : null;

    // Navigation Properties
    public Branch Branch { get; set; } = null!;
    public Department? Department { get; set; }
    public Employee? Manager { get; set; }
    public ICollection<Employee> DirectReports { get; set; } = new List<Employee>();
    public EmployeeUserLink? EmployeeUserLink { get; set; }
    public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
    public ICollection<EmployeeVacation> Vacations { get; set; } = new List<EmployeeVacation>();
    public ICollection<EmployeeExcuse> Excuses { get; set; } = new List<EmployeeExcuse>();
}
```

**Enums**:

```csharp
public enum Gender { Male, Female }

public enum EmploymentStatus
{
    Active,
    FullTime,
    PartTime,
    Contract,
    Intern,
    Consultant,
    Terminated,
    Inactive
}

public enum WorkLocationType
{
    OnSite,
    Remote,
    Hybrid
}
```

**Key Features**:

1. **Bilingual Support**: Arabic and English names/titles
2. **Organizational Hierarchy**: Self-referencing manager relationship
3. **Tenant Isolation**: Every employee belongs to a branch
4. **Flexible Status**: `IsActive` separate from `IsDeleted` for different states

**Business Rules**:
- EmployeeNumber must be unique within a branch
- Email must be unique if provided
- HireDate cannot be in the future
- Manager must be in the same branch
- Department must belong to the same branch

---

#### 3.2.2 EmployeeUserLink

**Location**: [Employees/EmployeeUserLink.cs](../../src/Domain/TimeAttendanceSystem.Domain/Employees/EmployeeUserLink.cs)

**Purpose**: One-to-one link between Employee and User account.

```csharp
public class EmployeeUserLink : BaseEntity
{
    public long EmployeeId { get; set; }
    public long UserId { get; set; }

    // Navigation Properties
    public Employee Employee { get; set; } = null!;
    public User User { get; set; } = null!;
}
```

**Business Rules**:
- One employee can have at most one user account
- One user can be linked to at most one employee
- Not all employees need user accounts (e.g., security guards may not need system access)

---

### 3.3 Branch & Department Aggregate

**Aggregate Root**: `Branch`
**Purpose**: Multi-tenant organizational structure
**Bounded Context**: Organization Management

#### 3.3.1 Branch (Aggregate Root)

**Location**: [Branches/Branch.cs](../../src/Domain/TimeAttendanceSystem.Domain/Branches/Branch.cs)

```csharp
public class Branch : BaseEntity
{
    public string Code { get; set; } = string.Empty;        // Unique identifier (e.g., "HQ", "NY-001")
    public string Name { get; set; } = string.Empty;        // Display name
    public string TimeZone { get; set; } = "UTC";           // IANA timezone (e.g., "America/New_York")
    public bool IsActive { get; set; }

    // Navigation Properties
    public ICollection<Department> Departments { get; set; } = new List<Department>();
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    public ICollection<UserBranchScope> UserBranchScopes { get; set; } = new List<UserBranchScope>();
}
```

**Key Features**:
- **Primary Tenant Boundary**: Data is isolated by branch
- **Timezone Support**: Each branch can operate in a different timezone
- **Unique Code**: Human-readable identifier for UI and reports

**Example TimeZones**:
```
"America/New_York"    - Eastern Time (US)
"America/Chicago"     - Central Time (US)
"Europe/London"       - British Time
"Asia/Dubai"          - Gulf Standard Time
"Asia/Tokyo"          - Japan Standard Time
```

---

#### 3.3.2 Department

**Location**: [Branches/Department.cs](../../src/Domain/TimeAttendanceSystem.Domain/Branches/Department.cs)

```csharp
public class Department : BaseEntity
{
    // Tenant Scope
    public long BranchId { get; set; }

    // Identification (Bilingual)
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }

    // Description (Bilingual)
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }

    // Hierarchy
    public long? ParentDepartmentId { get; set; }  // Self-referencing for tree structure

    // Management
    public long? ManagerEmployeeId { get; set; }

    // Financial
    public string? CostCenter { get; set; }

    // Contact
    public string? Location { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }

    // Display
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }

    // Navigation Properties
    public Branch Branch { get; set; } = null!;
    public Department? ParentDepartment { get; set; }
    public ICollection<Department> SubDepartments { get; set; } = new List<Department>();
    public Employee? Manager { get; set; }
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
```

**Key Features**:

1. **Hierarchical Structure**: Tree of departments using self-reference
   ```
   Engineering (parent)
   ├── Backend Team (child)
   ├── Frontend Team (child)
   └── DevOps Team (child)
   ```

2. **Cost Center Tracking**: Integration with financial systems

3. **Bilingual**: Arabic and English support

**Business Rules**:
- Department must belong to a branch
- Parent department must belong to the same branch
- Manager must be an employee in the same branch
- Cannot be parent of itself
- Cannot create circular hierarchies

---

### 3.4 Shift Aggregate

**Aggregate Root**: `Shift`
**Purpose**: Work schedule definition and assignment
**Bounded Context**: Workforce Planning

#### 3.4.1 Shift (Aggregate Root)

**Location**: [Shifts/Shift.cs](../../src/Domain/TimeAttendanceSystem.Domain/Shifts/Shift.cs)

**Core Properties**:

```csharp
public class Shift : BaseEntity
{
    // Basic Information
    public string Name { get; set; } = string.Empty;        // Must be unique
    public string? Description { get; set; }
    public ShiftType ShiftType { get; set; }
    public ShiftStatus ShiftStatus { get; set; }

    // Hours Configuration (for HoursOnly shifts)
    public decimal? RequiredHours { get; set; }             // Daily required hours
    public decimal? RequiredWeeklyHours { get; set; }       // Weekly required hours

    // Attendance Rules
    public bool IsCheckInRequired { get; set; }
    public bool IsAutoCheckOut { get; set; }
    public bool AllowFlexibleHours { get; set; }

    // Flexible Hours Configuration
    public int? FlexMinutesBefore { get; set; }             // Can start early
    public int? FlexMinutesAfter { get; set; }              // Can start late
    public int? GracePeriodMinutes { get; set; }            // Late arrival grace

    // Core Hours (mandatory working period)
    public bool HasCoreHours { get; set; }
    public TimeOnly? CoreStart { get; set; }
    public TimeOnly? CoreEnd { get; set; }

    // Working Days
    public bool IsSunday { get; set; }
    public bool IsMonday { get; set; }
    public bool IsTuesday { get; set; }
    public bool IsWednesday { get; set; }
    public bool IsThursday { get; set; }
    public bool IsFriday { get; set; }
    public bool IsSaturday { get; set; }

    // Metadata
    public bool IsNightShift { get; set; }                  // Calculated: spans midnight
    public bool IsDefault { get; set; }                     // Only one system-wide default

    // Navigation Properties
    public ICollection<ShiftPeriod> ShiftPeriods { get; set; } = new List<ShiftPeriod>();
    public ICollection<ShiftAssignment> ShiftAssignments { get; set; } = new List<ShiftAssignment>();
}
```

**Enums**:

```csharp
public enum ShiftType
{
    TimeBased,      // Fixed time periods (e.g., 9 AM - 5 PM)
    HoursOnly       // Required hours without fixed times
}

public enum ShiftStatus
{
    Active,
    Inactive,
    Draft,
    Archived
}
```

**Business Logic Methods**:

```csharp
// Calculate total working hours per day
public decimal CalculateTotalHours()
{
    if (ShiftType == ShiftType.HoursOnly && RequiredHours.HasValue)
        return RequiredHours.Value;

    return ShiftPeriods.Sum(p => p.Hours);
}

// Validate shift configuration
public (bool IsValid, List<string> Errors) ValidateShiftRules()
{
    var errors = new List<string>();

    // Time-based shifts must have periods
    if (ShiftType == ShiftType.TimeBased && !ShiftPeriods.Any())
        errors.Add("Time-based shifts must have at least one shift period");

    // Hours-only shifts must specify required hours
    if (ShiftType == ShiftType.HoursOnly && !RequiredHours.HasValue)
        errors.Add("Hours-only shifts must specify required hours");

    // Cannot have both grace period and flexible hours
    if (GracePeriodMinutes.HasValue && (FlexMinutesBefore.HasValue || FlexMinutesAfter.HasValue))
        errors.Add("Cannot have both grace period and flexible hours");

    // Core hours must be within shift periods
    if (HasCoreHours && ShiftType == ShiftType.TimeBased)
    {
        // Validation logic...
    }

    // At least one working day
    if (!GetWorkingDays().Any())
        errors.Add("At least one working day must be selected");

    return (errors.Count == 0, errors);
}

// Get count of working days per week
public int GetWorkingDaysCount()
{
    int count = 0;
    if (IsSunday) count++;
    if (IsMonday) count++;
    if (IsTuesday) count++;
    if (IsWednesday) count++;
    if (IsThursday) count++;
    if (IsFriday) count++;
    if (IsSaturday) count++;
    return count;
}

// Get list of working day names
public List<string> GetWorkingDays()
{
    var days = new List<string>();
    if (IsSunday) days.Add("Sunday");
    if (IsMonday) days.Add("Monday");
    // ... etc
    return days;
}

// Calculate core hours duration
public decimal CalculateCoreHours()
{
    if (!HasCoreHours || !CoreStart.HasValue || !CoreEnd.HasValue)
        return 0;

    var duration = CoreEnd.Value - CoreStart.Value;
    return (decimal)duration.TotalHours;
}
```

**Business Rules**:
- Shift name must be unique
- Time-based shifts require at least one ShiftPeriod
- Hours-only shifts require RequiredHours
- Grace period and flexible hours are mutually exclusive
- Core hours must be within shift periods (for time-based)
- At least one working day must be selected
- Only one default shift allowed system-wide
- Weekly hours require core hours to be enabled

**Example Shift Configurations**:

1. **Fixed 9-5 Shift**:
   ```
   ShiftType: TimeBased
   ShiftPeriods: [09:00-17:00]
   WorkingDays: Monday-Friday
   IsCheckInRequired: true
   ```

2. **Flexible Hours**:
   ```
   ShiftType: TimeBased
   ShiftPeriods: [09:00-17:00]
   AllowFlexibleHours: true
   FlexMinutesBefore: 60
   FlexMinutesAfter: 60
   CoreStart: 10:00
   CoreEnd: 15:00
   ```

3. **Hours-Only Shift**:
   ```
   ShiftType: HoursOnly
   RequiredHours: 8.0
   RequiredWeeklyHours: 40.0
   ```

4. **Split Shift** (Morning + Evening):
   ```
   ShiftType: TimeBased
   ShiftPeriods: [08:00-12:00, 14:00-18:00]
   ```

---

#### 3.4.2 ShiftPeriod

**Location**: [Shifts/ShiftPeriod.cs](../../src/Domain/TimeAttendanceSystem.Domain/Shifts/ShiftPeriod.cs)

```csharp
public class ShiftPeriod : BaseEntity
{
    public long ShiftId { get; set; }
    public int PeriodOrder { get; set; }            // 1 or 2 (for split shifts)
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public decimal Hours { get; set; }              // Calculated
    public bool IsNightPeriod { get; set; }         // EndTime < StartTime

    // Navigation
    public Shift Shift { get; set; } = null!;
}
```

**Business Logic**:

```csharp
// Calculate hours (handles midnight-spanning shifts)
public void CalculateHours()
{
    if (EndTime > StartTime)
    {
        // Normal shift (same day)
        var duration = EndTime - StartTime;
        Hours = (decimal)duration.TotalHours;
        IsNightPeriod = false;
    }
    else
    {
        // Night shift (spans midnight)
        var duration = new TimeSpan(24, 0, 0) - (StartTime - EndTime);
        Hours = (decimal)duration.TotalHours;
        IsNightPeriod = true;
    }
}

// Validate period
public (bool IsValid, string? ErrorMessage) ValidatePeriod()
{
    if (StartTime == EndTime)
        return (false, "Start and end time cannot be the same");

    if (PeriodOrder < 1 || PeriodOrder > 2)
        return (false, "Period order must be 1 or 2");

    return (true, null);
}
```

**Examples**:

1. **Day Shift**: 09:00 → 17:00 = 8 hours (IsNightPeriod = false)
2. **Night Shift**: 22:00 → 06:00 = 8 hours (IsNightPeriod = true)
3. **Split Morning**: 08:00 → 12:00 = 4 hours (PeriodOrder = 1)
4. **Split Afternoon**: 14:00 → 18:00 = 4 hours (PeriodOrder = 2)

---

#### 3.4.3 ShiftAssignment

**Location**: [Shifts/ShiftAssignment.cs](../../src/Domain/TimeAttendanceSystem.Domain/Shifts/ShiftAssignment.cs)

**Purpose**: Assign shifts to employees, departments, or branches with priority-based override.

```csharp
public class ShiftAssignment : BaseEntity
{
    // What shift
    public long ShiftId { get; set; }

    // Assign to whom/what
    public ShiftAssignmentType AssignmentType { get; set; }
    public long? EmployeeId { get; set; }           // If AssignmentType = Employee
    public long? DepartmentId { get; set; }         // If AssignmentType = Department
    public long? BranchId { get; set; }             // If AssignmentType = Branch

    // When
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }  // null = no end date

    // Status
    public ShiftAssignmentStatus Status { get; set; }

    // Priority (for conflict resolution)
    public int Priority { get; set; }               // Higher number = higher priority

    // Metadata
    public string? Notes { get; set; }
    public long AssignedByUserId { get; set; }

    // Navigation Properties
    public Shift Shift { get; set; } = null!;
    public Employee? Employee { get; set; }
    public Department? Department { get; set; }
    public Branch? Branch { get; set; }
    public User AssignedByUser { get; set; } = null!;
}
```

**Enums**:

```csharp
public enum ShiftAssignmentType
{
    Employee,       // Assigned to specific employee (highest priority)
    Department,     // Assigned to entire department (medium priority)
    Branch          // Assigned to entire branch (lowest priority)
}

public enum ShiftAssignmentStatus
{
    Pending,        // Not yet effective
    Active,         // Currently in effect
    Inactive,       // Manually deactivated
    Expired,        // Past EffectiveToDate
    Cancelled       // Cancelled before activation
}
```

**Business Logic**:

```csharp
// Validate assignment
public (bool IsValid, List<string> Errors) ValidateAssignment()
{
    var errors = new List<string>();

    // Must specify exactly one target
    int targetCount = 0;
    if (EmployeeId.HasValue) targetCount++;
    if (DepartmentId.HasValue) targetCount++;
    if (BranchId.HasValue) targetCount++;

    if (targetCount != 1)
        errors.Add("Assignment must have exactly one target");

    // Target must match assignment type
    if (AssignmentType == ShiftAssignmentType.Employee && !EmployeeId.HasValue)
        errors.Add("Employee assignment must have EmployeeId");

    // Date validation
    if (EffectiveToDate.HasValue && EffectiveToDate.Value < EffectiveFromDate)
        errors.Add("Effective to date must be after from date");

    return (errors.Count == 0, errors);
}

// Check if currently active
public bool IsCurrentlyActive()
{
    var now = DateTime.UtcNow.Date;
    return Status == ShiftAssignmentStatus.Active
        && now >= EffectiveFromDate.Date
        && (!EffectiveToDate.HasValue || now <= EffectiveToDate.Value.Date);
}

// Check if active on specific date
public bool IsActiveOnDate(DateTime date)
{
    return Status == ShiftAssignmentStatus.Active
        && date.Date >= EffectiveFromDate.Date
        && (!EffectiveToDate.HasValue || date.Date <= EffectiveToDate.Value.Date);
}

// Get display name of assignment target
public string GetTargetDisplayName()
{
    return AssignmentType switch
    {
        ShiftAssignmentType.Employee => Employee?.FullName ?? "Unknown Employee",
        ShiftAssignmentType.Department => Department?.Name ?? "Unknown Department",
        ShiftAssignmentType.Branch => Branch?.Name ?? "Unknown Branch",
        _ => "Unknown"
    };
}
```

**Priority Resolution**:

When multiple assignments apply to an employee on a date, priority is:
1. **Employee-specific** assignment (always wins)
2. **Department-wide** assignment (if no employee-specific)
3. **Branch-wide** assignment (if no department or employee)

Within same type, higher `Priority` number wins.

**Example**:
```
Branch "HQ" → Shift "9-5 Standard" (Priority: 1)
Department "Engineering" → Shift "Flexible 8h" (Priority: 2)
Employee "John Doe" → Shift "Night Shift" (Priority: 3)

Result: John gets "Night Shift"
If John's assignment is removed, he gets "Flexible 8h"
If both removed, he gets "9-5 Standard"
```

---

### 3.5 Attendance Aggregate

**Aggregate Root**: `AttendanceRecord`
**Purpose**: Daily attendance tracking and calculation
**Bounded Context**: Time Tracking

#### 3.5.1 AttendanceRecord (Aggregate Root)

**Location**: [Attendance/AttendanceRecord.cs](../../src/Domain/TimeAttendanceSystem.Domain/Attendance/AttendanceRecord.cs)

**This is the most complex entity in the domain** - handles all attendance logic.

**Core Properties**:

```csharp
public class AttendanceRecord : BaseEntity
{
    // Who and When
    public long EmployeeId { get; set; }
    public DateTime AttendanceDate { get; set; }         // Date being tracked

    // Shift Assignment
    public long? ShiftAssignmentId { get; set; }

    // Attendance Status
    public AttendanceStatus Status { get; set; }

    // Scheduled Times
    public TimeOnly? ScheduledStartTime { get; set; }
    public TimeOnly? ScheduledEndTime { get; set; }

    // Actual Times
    public DateTime? ActualCheckInTime { get; set; }
    public DateTime? ActualCheckOutTime { get; set; }

    // Hours Calculation
    public decimal ScheduledHours { get; set; }
    public decimal WorkingHours { get; set; }
    public decimal BreakHours { get; set; }

    // Overtime
    public decimal OvertimeHours { get; set; }
    public decimal PreShiftOvertimeHours { get; set; }
    public decimal PostShiftOvertimeHours { get; set; }
    public decimal OvertimeRate { get; set; }
    public decimal OvertimeAmount { get; set; }
    public DayType OvertimeDayType { get; set; }
    public long? OvertimeConfigurationId { get; set; }
    public string? OvertimeCalculationNotes { get; set; }

    // Penalties
    public int LateMinutes { get; set; }
    public int EarlyLeaveMinutes { get; set; }

    // Manual Override
    public bool IsManualOverride { get; set; }
    public long? OverrideByUserId { get; set; }
    public DateTime? OverrideAtUtc { get; set; }
    public string? OverrideNotes { get; set; }

    // Approval
    public bool IsApproved { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAtUtc { get; set; }

    // Finalization
    public bool IsFinalized { get; set; }

    // Notes
    public string? Notes { get; set; }

    // Remote Work
    public WorkLocationType WorkLocation { get; set; }
    public long? RemoteWorkRequestId { get; set; }

    // Navigation Properties
    public Employee Employee { get; set; } = null!;
    public ShiftAssignment? ShiftAssignment { get; set; }
    public OvertimeConfiguration? OvertimeConfiguration { get; set; }
    public RemoteWorkRequest? RemoteWorkRequest { get; set; }
    public User? OverrideByUser { get; set; }
    public User? ApprovedByUser { get; set; }
    public ICollection<AttendanceTransaction> Transactions { get; set; } = new List<AttendanceTransaction>();
    public WorkingDay? WorkingDay { get; set; }
}
```

**Enums**:

```csharp
public enum AttendanceStatus
{
    Present,        // Normal attendance
    Absent,         // Did not show up
    Late,           // Arrived late
    EarlyLeave,     // Left early
    OnLeave,        // Approved vacation
    DayOff,         // Weekend/non-working day
    Overtime,       // Working on off day
    Incomplete,     // Missing check-in or check-out
    Holiday,        // Public holiday
    SickLeave,      // Sick leave
    Pending,        // Awaiting approval
    OnDuty,         // Special duty
    Excused,        // Approved excuse
    RemoteWork      // Working remotely
}

public enum DayType
{
    Normal,         // Regular working day (1.5x overtime)
    PublicHoliday,  // Public holiday (2.0x overtime)
    OffDay          // Weekend/off day (2.5x overtime)
}
```

**Business Logic Methods**:

```csharp
// Calculate total overtime hours
public void CalculateTotalOvertimeHours()
{
    OvertimeHours = PreShiftOvertimeHours + PostShiftOvertimeHours;
}

// Update overtime details
public void UpdateOvertimeDetails(
    decimal preShiftHours,
    decimal postShiftHours,
    decimal rate,
    DayType dayType,
    long? configId,
    string? notes)
{
    PreShiftOvertimeHours = preShiftHours;
    PostShiftOvertimeHours = postShiftHours;
    OvertimeRate = rate;
    OvertimeDayType = dayType;
    OvertimeConfigurationId = configId;
    OvertimeCalculationNotes = notes;
    CalculateTotalOvertimeHours();
    OvertimeAmount = OvertimeHours * rate;
}

// Get overtime summary text
public string GetOvertimeSummary()
{
    if (OvertimeHours == 0)
        return "No overtime";

    return $"{OvertimeHours:F2}h @ {OvertimeRate}x = {OvertimeAmount:F2} " +
           $"(Pre: {PreShiftOvertimeHours:F2}h, Post: {PostShiftOvertimeHours:F2}h)";
}

// Calculate net working hours (excluding breaks)
public decimal CalculateNetWorkingHours()
{
    return WorkingHours - BreakHours;
}

// Check if late arrival
public bool IsLateArrival(int? gracePeriodMinutes = null)
{
    if (!ActualCheckInTime.HasValue || !ScheduledStartTime.HasValue)
        return false;

    var scheduledStart = AttendanceDate.Add(ScheduledStartTime.Value.ToTimeSpan());
    var actualStart = ActualCheckInTime.Value;

    var lateMinutes = (int)(actualStart - scheduledStart).TotalMinutes;
    var threshold = gracePeriodMinutes ?? 0;

    return lateMinutes > threshold;
}

// Check if early departure
public bool IsEarlyDeparture(int toleranceMinutes = 0)
{
    if (!ActualCheckOutTime.HasValue || !ScheduledEndTime.HasValue)
        return false;

    var scheduledEnd = AttendanceDate.Add(ScheduledEndTime.Value.ToTimeSpan());
    var actualEnd = ActualCheckOutTime.Value;

    var earlyMinutes = (int)(scheduledEnd - actualEnd).TotalMinutes;

    return earlyMinutes > toleranceMinutes;
}

// Validate attendance record
public (bool IsValid, List<string> Errors) ValidateRecord()
{
    var errors = new List<string>();

    if (ActualCheckOutTime.HasValue && ActualCheckInTime.HasValue)
    {
        if (ActualCheckOutTime.Value <= ActualCheckInTime.Value)
            errors.Add("Check-out time must be after check-in time");
    }

    if (BreakHours > WorkingHours)
        errors.Add("Break hours cannot exceed working hours");

    if (OvertimeHours < 0)
        errors.Add("Overtime hours cannot be negative");

    return (errors.Count == 0, errors);
}

// Get summary description
public string GetSummaryDescription()
{
    var parts = new List<string>();

    parts.Add($"Status: {Status}");

    if (WorkingHours > 0)
        parts.Add($"Hours: {WorkingHours:F2}");

    if (OvertimeHours > 0)
        parts.Add($"OT: {OvertimeHours:F2}");

    if (LateMinutes > 0)
        parts.Add($"Late: {LateMinutes}min");

    if (EarlyLeaveMinutes > 0)
        parts.Add($"Early: {EarlyLeaveMinutes}min");

    return string.Join(", ", parts);
}

// Check if record is complete
public bool IsComplete()
{
    return ActualCheckInTime.HasValue
        && ActualCheckOutTime.HasValue
        && Status != AttendanceStatus.Incomplete;
}

// Calculate completion percentage
public decimal CalculateCompletionPercentage()
{
    int totalSteps = 4;  // CheckIn, CheckOut, Approval, Finalization
    int completed = 0;

    if (ActualCheckInTime.HasValue) completed++;
    if (ActualCheckOutTime.HasValue) completed++;
    if (IsApproved) completed++;
    if (IsFinalized) completed++;

    return (decimal)completed / totalSteps * 100;
}
```

**Business Rules**:
- Check-out must be after check-in
- Break hours cannot exceed working hours
- Overtime hours cannot be negative
- Manual overrides require user attribution
- Approval locks certain fields from editing
- Finalized records are immutable
- Only one attendance record per employee per date

---

#### 3.5.2 AttendanceTransaction

**Location**: [Attendance/AttendanceTransaction.cs](../../src/Domain/TimeAttendanceSystem.Domain/Attendance/AttendanceTransaction.cs)

**Purpose**: Individual time clock events (check-in, check-out, breaks).

```csharp
public class AttendanceTransaction : BaseEntity
{
    // Who
    public long EmployeeId { get; set; }

    // What
    public TransactionType TransactionType { get; set; }

    // When (UTC and Local)
    public DateTime TransactionTimeUtc { get; set; }
    public DateTime TransactionTimeLocal { get; set; }  // Branch timezone
    public DateTime AttendanceDate { get; set; }        // Grouping key

    // Manual Entry
    public bool IsManual { get; set; }
    public long? EnteredByUserId { get; set; }
    public string? Notes { get; set; }

    // Context
    public string? Location { get; set; }               // GPS coordinates or office
    public string? DeviceId { get; set; }               // Fingerprint reader ID
    public string? IpAddress { get; set; }

    // Verification
    public bool IsVerified { get; set; }
    public long? VerifiedByUserId { get; set; }
    public DateTime? VerifiedAtUtc { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public User? EnteredByUser { get; set; }
    public User? VerifiedByUser { get; set; }
}
```

**Enums**:

```csharp
public enum TransactionType
{
    CheckIn,            // Work start
    CheckOut,           // Work end
    BreakStart,         // Break begins
    BreakEnd,           // Break ends
    ManualAdjustment,   // HR correction
    AutoCheckOut        // System-generated at midnight
}
```

**Business Logic**:

```csharp
// Validate transaction
public (bool IsValid, List<string> Errors) ValidateTransaction()
{
    var errors = new List<string>();

    if (TransactionTimeUtc > DateTime.UtcNow.AddMinutes(5))
        errors.Add("Transaction time cannot be in the future");

    if (IsManual && !EnteredByUserId.HasValue)
        errors.Add("Manual transactions must have EnteredByUserId");

    return (errors.Count == 0, errors);
}

// Check if transaction starts work
public bool IsWorkStartTransaction()
{
    return TransactionType == TransactionType.CheckIn
        || TransactionType == TransactionType.BreakEnd;
}

// Check if transaction ends work
public bool IsWorkEndTransaction()
{
    return TransactionType == TransactionType.CheckOut
        || TransactionType == TransactionType.AutoCheckOut
        || TransactionType == TransactionType.BreakStart;
}

// Get display description
public string GetDisplayDescription()
{
    var desc = TransactionType.ToString();

    if (IsManual)
        desc += " (Manual)";

    if (!string.IsNullOrEmpty(Location))
        desc += $" at {Location}";

    return desc;
}
```

**Transaction Flow Example**:

```
08:55 AM - CheckIn (at Main Office)
12:00 PM - BreakStart
01:00 PM - BreakEnd
05:10 PM - CheckOut (at Main Office)

Total Working Time: 8 hours 15 minutes
Break Time: 1 hour
Net Working Time: 7 hours 15 minutes
```

---

#### 3.5.3 WorkingDay

**Location**: [Attendance/WorkingDay.cs](../../src/Domain/TimeAttendanceSystem.Domain/Attendance/WorkingDay.cs)

**Purpose**: Detailed time period analysis for payroll and reporting.

```csharp
public class WorkingDay : BaseEntity
{
    // Link to attendance record
    public long AttendanceRecordId { get; set; }

    // Time Periods
    public DateTime? WorkStartTime { get; set; }
    public DateTime? WorkEndTime { get; set; }

    // Time Analysis
    public decimal TotalTimeOnPremises { get; set; }
    public decimal ProductiveWorkingTime { get; set; }
    public decimal TotalBreakTime { get; set; }
    public int BreakPeriodCount { get; set; }
    public decimal LongestBreakDuration { get; set; }

    // Core Hours Compliance
    public decimal CoreHoursWorked { get; set; }
    public bool CoreHoursCompliant { get; set; }

    // Overtime Breakdown
    public decimal RegularOvertimeHours { get; set; }
    public decimal PremiumOvertimeHours { get; set; }
    public decimal EarlyStartHours { get; set; }
    public decimal LateEndHours { get; set; }

    // Metrics
    public decimal EfficiencyPercentage { get; set; }   // Productive / Total
    public decimal TrackingGaps { get; set; }           // Unaccounted time

    // Status
    public bool IsCalculationComplete { get; set; }
    public string? CalculationNotes { get; set; }

    // Navigation
    public AttendanceRecord AttendanceRecord { get; set; } = null!;
}
```

**Business Logic**:

```csharp
// Calculate total compensable hours (for payroll)
public decimal CalculateTotalCompensableHours()
{
    return ProductiveWorkingTime + RegularOvertimeHours + PremiumOvertimeHours;
}

// Calculate break compliance
public decimal CalculateBreakCompliance(decimal maxBreakTime)
{
    if (maxBreakTime == 0) return 100;
    return Math.Min(100, (TotalBreakTime / maxBreakTime) * 100);
}

// Check for excessive break time
public bool HasExcessiveBreakTime(decimal maxBreakTime)
{
    return TotalBreakTime > maxBreakTime;
}

// Calculate average break duration
public decimal CalculateAverageBreakDuration()
{
    if (BreakPeriodCount == 0) return 0;
    return TotalBreakTime / BreakPeriodCount;
}

// Validate working day
public (bool IsValid, List<string> Errors) ValidateWorkingDay()
{
    var errors = new List<string>();

    if (ProductiveWorkingTime > TotalTimeOnPremises)
        errors.Add("Productive time cannot exceed total time");

    if (TotalBreakTime > TotalTimeOnPremises)
        errors.Add("Break time cannot exceed total time");

    if (EfficiencyPercentage < 0 || EfficiencyPercentage > 100)
        errors.Add("Efficiency percentage must be between 0 and 100");

    return (errors.Count == 0, errors);
}

// Get time summary
public string GetTimeSummary()
{
    return $"Total: {TotalTimeOnPremises:F2}h, " +
           $"Productive: {ProductiveWorkingTime:F2}h, " +
           $"Breaks: {TotalBreakTime:F2}h, " +
           $"Efficiency: {EfficiencyPercentage:F1}%";
}

// Check if perfect attendance day
public bool IsPerfectAttendanceDay()
{
    return CoreHoursCompliant
        && TrackingGaps == 0
        && EfficiencyPercentage >= 95
        && IsCalculationComplete;
}
```

**Usage**: Primarily for detailed reports and payroll integration.

---

### 3.6 Settings Aggregate

#### 3.6.1 OvertimeConfiguration

**Location**: [Settings/OvertimeConfiguration.cs](../../src/Domain/TimeAttendanceSystem.Domain/Settings/OvertimeConfiguration.cs)

**Purpose**: Organization-wide overtime calculation rules.

```csharp
public class OvertimeConfiguration : BaseEntity
{
    // Feature Toggles
    public bool EnablePreShiftOvertime { get; set; }
    public bool EnablePostShiftOvertime { get; set; }

    // Rate Multipliers
    public decimal NormalDayRate { get; set; } = 1.5m;              // 1.5x normal rate
    public decimal PublicHolidayRate { get; set; } = 2.0m;          // 2.0x normal rate
    public decimal OffDayRate { get; set; } = 2.5m;                 // 2.5x normal rate

    // Thresholds
    public int MinimumOvertimeMinutes { get; set; } = 15;           // Minimum to count as OT
    public decimal MaxPreShiftOvertimeHours { get; set; } = 2.0m;   // Max before shift
    public decimal MaxPostShiftOvertimeHours { get; set; } = 4.0m;  // Max after shift

    // Rules
    public bool ConsiderFlexibleTime { get; set; }                  // Flexible hours count as OT?
    public bool RequireApproval { get; set; }                       // OT needs approval?
    public int OvertimeGracePeriodMinutes { get; set; } = 5;        // Round down threshold
    public bool WeekendAsOffDay { get; set; }
    public int RoundingIntervalMinutes { get; set; } = 0;           // 0, 5, 10, 15, 30

    // Policy
    public string? PolicyNotes { get; set; }
    public bool IsActive { get; set; }

    // Effective Period
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
}
```

**Business Logic**:

```csharp
// Validate configuration
public (bool IsValid, List<string> Errors) ValidateConfiguration()
{
    var errors = new List<string>();

    if (NormalDayRate < 1.0m)
        errors.Add("Normal day rate must be at least 1.0");

    if (PublicHolidayRate < NormalDayRate)
        errors.Add("Public holiday rate should be higher than normal day rate");

    if (OffDayRate < NormalDayRate)
        errors.Add("Off day rate should be higher than normal day rate");

    if (MinimumOvertimeMinutes < 0 || MinimumOvertimeMinutes > 60)
        errors.Add("Minimum overtime minutes must be between 0 and 60");

    if (MaxPreShiftOvertimeHours < 0 || MaxPreShiftOvertimeHours > 12)
        errors.Add("Max pre-shift overtime must be between 0 and 12 hours");

    if (MaxPostShiftOvertimeHours < 0 || MaxPostShiftOvertimeHours > 12)
        errors.Add("Max post-shift overtime must be between 0 and 12 hours");

    var validRoundingIntervals = new[] { 0, 5, 10, 15, 30 };
    if (!validRoundingIntervals.Contains(RoundingIntervalMinutes))
        errors.Add("Rounding interval must be 0, 5, 10, 15, or 30 minutes");

    return (errors.Count == 0, errors);
}

// Get overtime rate for day type
public decimal GetOvertimeRate(DayType dayType)
{
    return dayType switch
    {
        DayType.Normal => NormalDayRate,
        DayType.PublicHoliday => PublicHolidayRate,
        DayType.OffDay => OffDayRate,
        _ => NormalDayRate
    };
}

// Round overtime hours
public decimal RoundOvertimeHours(decimal hours)
{
    if (RoundingIntervalMinutes == 0)
        return hours;

    var totalMinutes = (int)(hours * 60);
    var roundedMinutes = (totalMinutes / RoundingIntervalMinutes) * RoundingIntervalMinutes;

    return (decimal)roundedMinutes / 60;
}

// Check if meets minimum threshold
public bool MeetsMinimumThreshold(int minutes)
{
    return minutes >= MinimumOvertimeMinutes;
}

// Get configuration summary
public string GetConfigurationSummary()
{
    return $"Rates: Normal={NormalDayRate}x, Holiday={PublicHolidayRate}x, OffDay={OffDayRate}x | " +
           $"Min: {MinimumOvertimeMinutes}min | " +
           $"Rounding: {RoundingIntervalMinutes}min | " +
           $"Approval: {(RequireApproval ? "Required" : "Not Required")}";
}
```

**Example Configuration**:

```csharp
var config = new OvertimeConfiguration
{
    EnablePreShiftOvertime = true,
    EnablePostShiftOvertime = true,
    NormalDayRate = 1.5m,           // 150% for normal days
    PublicHolidayRate = 2.0m,       // 200% for holidays
    OffDayRate = 2.5m,              // 250% for weekends
    MinimumOvertimeMinutes = 15,    // Must work at least 15 min OT
    RoundingIntervalMinutes = 15,   // Round to nearest 15 min
    RequireApproval = true,         // Manager approval required
    IsActive = true
};
```

---

#### 3.6.2 PublicHoliday

**Location**: [Settings/PublicHoliday.cs](../../src/Domain/TimeAttendanceSystem.Domain/Settings/PublicHoliday.cs)

**Purpose**: Holiday calendar with flexible recurrence patterns.

```csharp
public class PublicHoliday : BaseEntity
{
    // Name (Bilingual)
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }

    // Date Configuration (depends on HolidayType)
    public DateTime? SpecificDate { get; set; }         // For OneTime
    public int? Month { get; set; }                     // 1-12
    public int? Day { get; set; }                       // 1-31
    public DayOfWeek? DayOfWeek { get; set; }          // For Floating
    public int? WeekOccurrence { get; set; }            // 1-5 or -1 (last)

    // Type
    public HolidayType HolidayType { get; set; }

    // Status & Scope
    public bool IsActive { get; set; }
    public bool IsNational { get; set; }                // vs branch-specific
    public long? BranchId { get; set; }

    // Metadata
    public string? Description { get; set; }
    public int? EffectiveFromYear { get; set; }
    public int? EffectiveToYear { get; set; }
    public string? CountryCode { get; set; }            // ISO 3166-1 alpha-2
    public int Priority { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
}
```

**Enums**:

```csharp
public enum HolidayType
{
    OneTime,    // Specific date (e.g., Company anniversary on 2025-06-15)
    Annual,     // Same month/day every year (e.g., Christmas on 12/25)
    Monthly,    // Same day every month (e.g., 1st of every month)
    Floating    // Relative day (e.g., Thanksgiving = 4th Thursday of November)
}
```

**Business Logic**:

```csharp
// Get holiday date for specific year
public DateTime? GetHolidayDateForYear(int year)
{
    switch (HolidayType)
    {
        case HolidayType.OneTime:
            if (SpecificDate.HasValue && SpecificDate.Value.Year == year)
                return SpecificDate.Value;
            return null;

        case HolidayType.Annual:
            if (Month.HasValue && Day.HasValue)
                return new DateTime(year, Month.Value, Day.Value);
            return null;

        case HolidayType.Floating:
            if (Month.HasValue && DayOfWeek.HasValue && WeekOccurrence.HasValue)
            {
                // Calculate nth occurrence of day in month
                // e.g., 4th Thursday of November
                return CalculateFloatingDate(year, Month.Value, DayOfWeek.Value, WeekOccurrence.Value);
            }
            return null;

        case HolidayType.Monthly:
            // Returns multiple dates (one per month)
            return null;

        default:
            return null;
    }
}

// Get all holiday dates for a month
public IEnumerable<DateTime> GetHolidayDatesForMonth(int year, int month)
{
    var dates = new List<DateTime>();

    switch (HolidayType)
    {
        case HolidayType.OneTime:
            if (SpecificDate.HasValue
                && SpecificDate.Value.Year == year
                && SpecificDate.Value.Month == month)
            {
                dates.Add(SpecificDate.Value);
            }
            break;

        case HolidayType.Annual:
            if (Month == month && Day.HasValue)
                dates.Add(new DateTime(year, month, Day.Value));
            break;

        case HolidayType.Monthly:
            if (Day.HasValue && Day.Value <= DateTime.DaysInMonth(year, month))
                dates.Add(new DateTime(year, month, Day.Value));
            break;

        case HolidayType.Floating:
            var floatingDate = GetHolidayDateForYear(year);
            if (floatingDate.HasValue && floatingDate.Value.Month == month)
                dates.Add(floatingDate.Value);
            break;
    }

    return dates;
}

// Validate holiday configuration
public (bool IsValid, List<string> Errors) ValidateHoliday()
{
    var errors = new List<string>();

    switch (HolidayType)
    {
        case HolidayType.OneTime:
            if (!SpecificDate.HasValue)
                errors.Add("One-time holidays must have a specific date");
            break;

        case HolidayType.Annual:
        case HolidayType.Monthly:
            if (!Month.HasValue || !Day.HasValue)
                errors.Add("Annual/Monthly holidays must have month and day");
            break;

        case HolidayType.Floating:
            if (!Month.HasValue || !DayOfWeek.HasValue || !WeekOccurrence.HasValue)
                errors.Add("Floating holidays must have month, day of week, and occurrence");
            break;
    }

    if (!IsNational && !BranchId.HasValue)
        errors.Add("Branch-specific holidays must have BranchId");

    return (errors.Count == 0, errors);
}

// Check if holiday applies to branch
public bool AppliesTo(long branchId)
{
    if (IsNational)
        return true;

    return BranchId == branchId;
}

// Get pattern description
public string GetPatternDescription()
{
    return HolidayType switch
    {
        HolidayType.OneTime => $"Once on {SpecificDate:yyyy-MM-dd}",
        HolidayType.Annual => $"Every {Month}/{Day}",
        HolidayType.Monthly => $"Day {Day} of every month",
        HolidayType.Floating => $"{GetOrdinal(WeekOccurrence)} {DayOfWeek} of {GetMonthName(Month)}",
        _ => "Unknown pattern"
    };
}

private string GetOrdinal(int? occurrence)
{
    if (!occurrence.HasValue) return "";
    return occurrence.Value switch
    {
        -1 => "Last",
        1 => "1st",
        2 => "2nd",
        3 => "3rd",
        4 => "4th",
        5 => "5th",
        _ => occurrence.Value.ToString()
    };
}
```

**Example Configurations**:

```csharp
// New Year's Day (Annual)
new PublicHoliday
{
    Name = "New Year's Day",
    HolidayType = HolidayType.Annual,
    Month = 1,
    Day = 1,
    IsNational = true
};

// Thanksgiving (Floating)
new PublicHoliday
{
    Name = "Thanksgiving",
    HolidayType = HolidayType.Floating,
    Month = 11,
    DayOfWeek = DayOfWeek.Thursday,
    WeekOccurrence = 4,  // 4th Thursday
    IsNational = true
};

// Company Anniversary (OneTime)
new PublicHoliday
{
    Name = "10th Anniversary Celebration",
    HolidayType = HolidayType.OneTime,
    SpecificDate = new DateTime(2025, 6, 15),
    IsNational = true
};
```

---

#### 3.6.3 OffDay

**Location**: [Settings/OffDay.cs](../../src/Domain/TimeAttendanceSystem.Domain/Settings/OffDay.cs)

**Purpose**: Weekend/off-day configuration (highest overtime rate).

```csharp
public class OffDay : BaseEntity
{
    // Name (Bilingual)
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }

    // Type
    public OffDayType OffDayType { get; set; }

    // Status & Scope
    public bool IsActive { get; set; }
    public bool IsCompanyWide { get; set; }
    public long? BranchId { get; set; }

    // Weekly Pattern (for WeeklyRecurring)
    public bool IsSunday { get; set; }
    public bool IsMonday { get; set; }
    public bool IsTuesday { get; set; }
    public bool IsWednesday { get; set; }
    public bool IsThursday { get; set; }
    public bool IsFriday { get; set; }
    public bool IsSaturday { get; set; }

    // Custom Period (for CustomPeriod)
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    // Configuration
    public string? Description { get; set; }
    public int Priority { get; set; }
    public bool OverridesPublicHolidays { get; set; }

    // Effective Period
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
}
```

**Enums**:

```csharp
public enum OffDayType
{
    WeeklyRecurring,    // Standard weekends (e.g., Saturday-Sunday)
    CustomPeriod        // Specific date range (e.g., year-end shutdown)
}
```

**Business Logic**:

```csharp
// Check if date is an off day
public bool IsOffDay(DateTime date)
{
    switch (OffDayType)
    {
        case OffDayType.WeeklyRecurring:
            return date.DayOfWeek switch
            {
                DayOfWeek.Sunday => IsSunday,
                DayOfWeek.Monday => IsMonday,
                DayOfWeek.Tuesday => IsTuesday,
                DayOfWeek.Wednesday => IsWednesday,
                DayOfWeek.Thursday => IsThursday,
                DayOfWeek.Friday => IsFriday,
                DayOfWeek.Saturday => IsSaturday,
                _ => false
            };

        case OffDayType.CustomPeriod:
            if (StartDate.HasValue && EndDate.HasValue)
                return date.Date >= StartDate.Value.Date
                    && date.Date <= EndDate.Value.Date;
            return false;

        default:
            return false;
    }
}

// Check if applies to branch
public bool AppliesTo(long branchId)
{
    if (IsCompanyWide)
        return true;

    return BranchId == branchId;
}

// Get all off days in date range
public IEnumerable<DateTime> GetOffDaysInRange(DateTime start, DateTime end)
{
    var offDays = new List<DateTime>();

    for (var date = start.Date; date <= end.Date; date = date.AddDays(1))
    {
        if (IsOffDay(date))
            offDays.Add(date);
    }

    return offDays;
}

// Validate configuration
public (bool IsValid, List<string> Errors) ValidateConfiguration()
{
    var errors = new List<string>();

    switch (OffDayType)
    {
        case OffDayType.WeeklyRecurring:
            if (!GetWeeklyOffDays().Any())
                errors.Add("Weekly recurring off days must have at least one day selected");
            break;

        case OffDayType.CustomPeriod:
            if (!StartDate.HasValue || !EndDate.HasValue)
                errors.Add("Custom period must have start and end dates");
            else if (EndDate.Value < StartDate.Value)
                errors.Add("End date must be after start date");
            break;
    }

    if (!IsCompanyWide && !BranchId.HasValue)
        errors.Add("Branch-specific off days must have BranchId");

    return (errors.Count == 0, errors);
}

// Get weekly off days as enumeration
public IEnumerable<DayOfWeek> GetWeeklyOffDays()
{
    var days = new List<DayOfWeek>();

    if (IsSunday) days.Add(DayOfWeek.Sunday);
    if (IsMonday) days.Add(DayOfWeek.Monday);
    if (IsTuesday) days.Add(DayOfWeek.Tuesday);
    if (IsWednesday) days.Add(DayOfWeek.Wednesday);
    if (IsThursday) days.Add(DayOfWeek.Thursday);
    if (IsFriday) days.Add(DayOfWeek.Friday);
    if (IsSaturday) days.Add(DayOfWeek.Saturday);

    return days;
}

// Set weekly off days
public void SetWeeklyOffDays(IEnumerable<DayOfWeek> offDays)
{
    IsSunday = offDays.Contains(DayOfWeek.Sunday);
    IsMonday = offDays.Contains(DayOfWeek.Monday);
    IsTuesday = offDays.Contains(DayOfWeek.Tuesday);
    IsWednesday = offDays.Contains(DayOfWeek.Wednesday);
    IsThursday = offDays.Contains(DayOfWeek.Thursday);
    IsFriday = offDays.Contains(DayOfWeek.Friday);
    IsSaturday = offDays.Contains(DayOfWeek.Saturday);
}

// Get configuration description
public string GetConfigurationDescription()
{
    return OffDayType switch
    {
        OffDayType.WeeklyRecurring => $"Weekly: {string.Join(", ", GetWeeklyOffDays())}",
        OffDayType.CustomPeriod => $"Custom: {StartDate:yyyy-MM-dd} to {EndDate:yyyy-MM-dd}",
        _ => "Unknown"
    };
}

// Get count of weekly off days
public int GetWeeklyOffDayCount()
{
    return GetWeeklyOffDays().Count();
}
```

**Example Configurations**:

```csharp
// Standard Weekend (Saturday-Sunday)
new OffDay
{
    Name = "Weekend",
    OffDayType = OffDayType.WeeklyRecurring,
    IsSaturday = true,
    IsSunday = true,
    IsCompanyWide = true
};

// Middle East Weekend (Friday-Saturday)
new OffDay
{
    Name = "Weekend",
    OffDayType = OffDayType.WeeklyRecurring,
    IsFriday = true,
    IsSaturday = true,
    IsCompanyWide = true
};

// Year-End Shutdown
new OffDay
{
    Name = "Year-End Shutdown",
    OffDayType = OffDayType.CustomPeriod,
    StartDate = new DateTime(2025, 12, 24),
    EndDate = new DateTime(2025, 12, 31),
    IsCompanyWide = true
};
```

---

### 3.7 Vacation Aggregate

#### 3.7.1 VacationType

**Location**: [VacationTypes/VacationType.cs](../../src/Domain/TimeAttendanceSystem.Domain/VacationTypes/VacationType.cs)

**Purpose**: Simplified vacation type categorization.

```csharp
public class VacationType : BaseEntity
{
    // Scope
    public long? BranchId { get; set; }     // null = all branches

    // Name (Bilingual)
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }

    // Status
    public bool IsActive { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<EmployeeVacation> EmployeeVacations { get; set; } = new List<EmployeeVacation>();
}
```

**Example Types**:
- Annual Leave
- Sick Leave
- Maternity Leave
- Paternity Leave
- Unpaid Leave
- Study Leave
- Compassionate Leave

**Business Rules**:
- Vacation type name must be unique within scope
- If branch-specific, must have valid BranchId

---

#### 3.7.2 EmployeeVacation

**Location**: [Vacations/EmployeeVacation.cs](../../src/Domain/TimeAttendanceSystem.Domain/Vacations/EmployeeVacation.cs)

**Purpose**: Employee vacation period tracking.

```csharp
public class EmployeeVacation : BaseEntity
{
    // Who
    public long EmployeeId { get; set; }

    // What Type
    public long VacationTypeId { get; set; }

    // When
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int TotalDays { get; set; }          // Calculated

    // Approval
    public bool IsApproved { get; set; }

    // Notes
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public VacationType VacationType { get; set; } = null!;
}
```

**Business Logic**:

```csharp
// Calculate total days (including weekends)
public void CalculateTotalDays()
{
    TotalDays = (EndDate.Date - StartDate.Date).Days + 1;
}

// Calculate business days (excluding weekends)
public int CalculateBusinessDays()
{
    int businessDays = 0;

    for (var date = StartDate.Date; date <= EndDate.Date; date = date.AddDays(1))
    {
        if (date.DayOfWeek != DayOfWeek.Saturday && date.DayOfWeek != DayOfWeek.Sunday)
            businessDays++;
    }

    return businessDays;
}

// Check if overlaps with another vacation
public bool OverlapsWith(DateTime otherStart, DateTime otherEnd)
{
    return StartDate.Date <= otherEnd.Date && EndDate.Date >= otherStart.Date;
}

// Check if contains specific date
public bool ContainsDate(DateTime date)
{
    return date.Date >= StartDate.Date && date.Date <= EndDate.Date;
}

// Get all vacation dates
public List<DateTime> GetVacationDates()
{
    var dates = new List<DateTime>();

    for (var date = StartDate.Date; date <= EndDate.Date; date = date.AddDays(1))
    {
        dates.Add(date);
    }

    return dates;
}

// Validate vacation
public (bool IsValid, List<string> Errors) ValidateVacation()
{
    var errors = new List<string>();

    if (EndDate < StartDate)
        errors.Add("End date must be after start date");

    if (TotalDays < 1)
        errors.Add("Vacation must be at least 1 day");

    if (StartDate < DateTime.Today.AddDays(-30))
        errors.Add("Cannot create vacation more than 30 days in the past");

    return (errors.Count == 0, errors);
}

// Get summary description
public string GetSummaryDescription()
{
    return $"{StartDate:yyyy-MM-dd} to {EndDate:yyyy-MM-dd} ({TotalDays} days)";
}

// Check if currently active
public bool IsCurrentlyActive()
{
    var today = DateTime.Today;
    return today >= StartDate.Date && today <= EndDate.Date && IsApproved;
}

// Check if upcoming
public bool IsUpcoming()
{
    return StartDate.Date > DateTime.Today && IsApproved;
}

// Check if completed
public bool IsCompleted()
{
    return EndDate.Date < DateTime.Today;
}

// Update dates (recalculates total days)
public void UpdateDates(DateTime start, DateTime end)
{
    StartDate = start;
    EndDate = end;
    CalculateTotalDays();
}

// Update approval status
public void UpdateApprovalStatus(bool approved, string? notes)
{
    IsApproved = approved;
    if (!string.IsNullOrEmpty(notes))
        Notes = notes;
}
```

**Business Rules**:
- End date must be after start date
- Cannot overlap with existing approved vacations
- Only approved vacations affect attendance
- Total days automatically calculated

---

### 3.8 Excuse Aggregate

#### 3.8.1 ExcusePolicy

**Location**: [Excuses/ExcusePolicy.cs](../../src/Domain/TimeAttendanceSystem.Domain/Excuses/ExcusePolicy.cs)

**Purpose**: Organizational policy for personal excuses and official duties.

```csharp
public class ExcusePolicy : BaseEntity
{
    // Scope
    public long? BranchId { get; set; }     // null = organization-wide

    // Personal Excuse Limits
    public int MaxPersonalExcusesPerMonth { get; set; } = 5;
    public decimal MaxPersonalExcuseHoursPerMonth { get; set; } = 8.0m;
    public decimal MaxPersonalExcuseHoursPerDay { get; set; } = 4.0m;
    public decimal MaxHoursPerExcuse { get; set; } = 2.0m;

    // Configuration
    public bool RequiresApproval { get; set; } = true;
    public bool AllowPartialHourExcuses { get; set; } = true;
    public decimal MinimumExcuseDuration { get; set; } = 0.5m;  // 30 minutes
    public bool IsActive { get; set; }
    public int MaxRetroactiveDays { get; set; } = 7;
    public bool AllowSelfServiceRequests { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<EmployeeExcuse> EmployeeExcuses { get; set; } = new List<EmployeeExcuse>();
}
```

**Business Logic**:

```csharp
// Validate policy
public (bool IsValid, List<string> Errors) ValidatePolicy()
{
    var errors = new List<string>();

    if (MaxPersonalExcusesPerMonth < 0)
        errors.Add("Max personal excuses per month cannot be negative");

    if (MaxPersonalExcuseHoursPerMonth < 0)
        errors.Add("Max personal excuse hours per month cannot be negative");

    if (MaxPersonalExcuseHoursPerDay < 0 || MaxPersonalExcuseHoursPerDay > 24)
        errors.Add("Max personal excuse hours per day must be between 0 and 24");

    if (MaxHoursPerExcuse < 0 || MaxHoursPerExcuse > MaxPersonalExcuseHoursPerDay)
        errors.Add("Max hours per excuse must be between 0 and max hours per day");

    if (MinimumExcuseDuration < 0 || MinimumExcuseDuration > MaxHoursPerExcuse)
        errors.Add("Minimum excuse duration must be between 0 and max hours per excuse");

    return (errors.Count == 0, errors);
}

// Check if valid excuse duration
public bool IsValidExcuseDuration(decimal hours)
{
    if (hours < MinimumExcuseDuration)
        return false;

    if (hours > MaxHoursPerExcuse)
        return false;

    if (!AllowPartialHourExcuses && hours != Math.Floor(hours))
        return false;

    return true;
}

// Get remaining allowance for employee in month
public (int RemainingCount, decimal RemainingHours) GetRemainingAllowance(
    int usedCountThisMonth,
    decimal usedHoursThisMonth)
{
    var remainingCount = Math.Max(0, MaxPersonalExcusesPerMonth - usedCountThisMonth);
    var remainingHours = Math.Max(0, MaxPersonalExcuseHoursPerMonth - usedHoursThisMonth);

    return (remainingCount, remainingHours);
}

// Check if within retroactive limit
public bool IsWithinRetroactiveLimit(DateTime date)
{
    var daysDiff = (DateTime.Today - date.Date).Days;
    return daysDiff <= MaxRetroactiveDays;
}

// Get policy summary
public string GetPolicySummary()
{
    return $"Max {MaxPersonalExcusesPerMonth} excuses/month, " +
           $"{MaxPersonalExcuseHoursPerMonth}h total, " +
           $"{MaxHoursPerExcuse}h per excuse, " +
           $"Min {MinimumExcuseDuration}h, " +
           $"Approval: {(RequiresApproval ? "Required" : "Not Required")}";
}
```

---

#### 3.8.2 EmployeeExcuse

**Location**: [Excuses/EmployeeExcuse.cs](../../src/Domain/TimeAttendanceSystem.Domain/Excuses/EmployeeExcuse.cs)

**Purpose**: Employee excuse request (partial day time-off).

```csharp
public class EmployeeExcuse : BaseEntity
{
    // Who
    public long EmployeeId { get; set; }

    // When
    public DateTime ExcuseDate { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public decimal DurationHours { get; set; }      // Calculated

    // What Type
    public ExcuseType ExcuseType { get; set; }
    public string Reason { get; set; } = string.Empty;

    // Approval
    public ApprovalStatus ApprovalStatus { get; set; }
    public long? ApprovedById { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? ProcessingNotes { get; set; }

    // Attachment
    public string? AttachmentPath { get; set; }

    // Salary Impact
    public bool AffectsSalary { get; set; }         // true for PersonalExcuse, false for OfficialDuty

    // Navigation
    public Employee Employee { get; set; } = null!;
    public User? ApprovedBy { get; set; }
}
```

**Enums**:

```csharp
public enum ExcuseType
{
    PersonalExcuse,     // Subject to limits, affects salary
    OfficialDuty        // No limits, doesn't affect salary
}

public enum ApprovalStatus
{
    Pending,
    Approved,
    Rejected
}
```

**Business Logic**:

```csharp
// Calculate duration in hours
public void CalculateDuration()
{
    var duration = EndTime - StartTime;
    DurationHours = (decimal)duration.TotalHours;

    // Set salary impact based on excuse type
    AffectsSalary = ExcuseType == ExcuseType.PersonalExcuse;
}

// Validate excuse
public (bool IsValid, List<string> Errors) ValidateExcuse()
{
    var errors = new List<string>();

    if (EndTime <= StartTime)
        errors.Add("End time must be after start time");

    if (DurationHours <= 0)
        errors.Add("Duration must be positive");

    if (DurationHours > 24)
        errors.Add("Excuse duration cannot exceed 24 hours");

    if (string.IsNullOrWhiteSpace(Reason))
        errors.Add("Reason is required");

    return (errors.Count == 0, errors);
}

// Approve excuse
public void Approve(long approverId, string? notes = null)
{
    ApprovalStatus = ApprovalStatus.Approved;
    ApprovedById = approverId;
    ApprovedAt = DateTime.UtcNow;
    ProcessingNotes = notes;
    RejectionReason = null;
}

// Reject excuse
public void Reject(long approverId, string reason, string? notes = null)
{
    ApprovalStatus = ApprovalStatus.Rejected;
    ApprovedById = approverId;
    ApprovedAt = DateTime.UtcNow;
    RejectionReason = reason;
    ProcessingNotes = notes;
}

// Check if overlaps with time range
public bool OverlapsWith(TimeOnly otherStart, TimeOnly otherEnd)
{
    return StartTime < otherEnd && EndTime > otherStart;
}

// Check if should affect attendance
public bool ShouldAffectAttendance()
{
    return ApprovalStatus == ApprovalStatus.Approved;
}

// Get time range display
public string GetTimeRangeDisplay()
{
    return $"{StartTime:HH:mm} - {EndTime:HH:mm} ({DurationHours:F2}h)";
}

// Get excuse summary
public string GetExcuseSummary()
{
    var typeText = ExcuseType == ExcuseType.PersonalExcuse ? "Personal" : "Official";
    var statusText = ApprovalStatus.ToString();

    return $"{ExcuseDate:yyyy-MM-dd} {GetTimeRangeDisplay()} | {typeText} | {statusText}";
}

// Check if can be modified
public bool CanBeModified()
{
    return ApprovalStatus == ApprovalStatus.Pending
        && ExcuseDate >= DateTime.Today;
}

// Update times (recalculates duration)
public void UpdateTimes(TimeOnly start, TimeOnly end)
{
    StartTime = start;
    EndTime = end;
    CalculateDuration();
}
```

**Business Rules**:
- End time must be after start time
- Personal excuses subject to policy limits
- Official duties exempt from limits
- Only approved excuses affect attendance
- Cannot modify approved/rejected excuses
- Cannot create excuses beyond retroactive limit

---

### 3.9 Remote Work Aggregate

#### 3.9.1 RemoteWorkPolicy

**Location**: [RemoteWork/RemoteWorkPolicy.cs](../../src/Domain/TimeAttendanceSystem.Domain/RemoteWork/RemoteWorkPolicy.cs)

**Purpose**: Remote work quota and rules management.

```csharp
public class RemoteWorkPolicy : BaseEntity
{
    // Scope
    public long? BranchId { get; set; }     // null = company-wide

    // Quotas
    public int? MaxDaysPerWeek { get; set; }
    public int? MaxDaysPerMonth { get; set; }
    public int? MaxDaysPerYear { get; set; }

    // Rules
    public bool RequiresManagerApproval { get; set; } = false;
    public bool AllowConsecutiveDays { get; set; } = true;
    public int? MaxConsecutiveDays { get; set; }
    public int? MinAdvanceNoticeDays { get; set; }
    public string? BlackoutPeriods { get; set; }    // JSON: [{"start":"2025-12-20","end":"2025-12-31"}]

    // Attendance Integration
    public bool CountForOvertime { get; set; } = true;
    public bool EnforceShiftTimes { get; set; } = false;
    public bool IsActive { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<RemoteWorkRequest> RemoteWorkRequests { get; set; } = new List<RemoteWorkRequest>();
}
```

**Business Logic**:

```csharp
// Validate configuration
public (bool IsValid, List<string> Errors) ValidateConfiguration()
{
    var errors = new List<string>();

    if (MaxDaysPerWeek.HasValue && (MaxDaysPerWeek.Value < 0 || MaxDaysPerWeek.Value > 7))
        errors.Add("Max days per week must be between 0 and 7");

    if (MaxDaysPerMonth.HasValue && (MaxDaysPerMonth.Value < 0 || MaxDaysPerMonth.Value > 31))
        errors.Add("Max days per month must be between 0 and 31");

    if (MaxDaysPerYear.HasValue && (MaxDaysPerYear.Value < 0 || MaxDaysPerYear.Value > 365))
        errors.Add("Max days per year must be between 0 and 365");

    if (!AllowConsecutiveDays && MaxConsecutiveDays.HasValue)
        errors.Add("Cannot set max consecutive days when consecutive days are not allowed");

    if (AllowConsecutiveDays && MaxConsecutiveDays.HasValue && MaxConsecutiveDays.Value < 1)
        errors.Add("Max consecutive days must be at least 1");

    return (errors.Count == 0, errors);
}

// Check if date is allowed (not in blackout period)
public bool IsDateAllowed(DateOnly date)
{
    if (string.IsNullOrEmpty(BlackoutPeriods))
        return true;

    // Parse JSON blackout periods and check
    // Implementation would parse JSON and check date ranges
    return true;  // Simplified
}

// Get quota for period type
public int? GetQuotaForPeriod(QuotaPeriod type)
{
    return type switch
    {
        QuotaPeriod.Week => MaxDaysPerWeek,
        QuotaPeriod.Month => MaxDaysPerMonth,
        QuotaPeriod.Year => MaxDaysPerYear,
        _ => null
    };
}
```

**Enums**:

```csharp
public enum QuotaPeriod
{
    Week,
    Month,
    Year
}
```

---

#### 3.9.2 RemoteWorkRequest

**Location**: [RemoteWork/RemoteWorkRequest.cs](../../src/Domain/TimeAttendanceSystem.Domain/RemoteWork/RemoteWorkRequest.cs)

**Purpose**: Employee remote work request (date range based).

```csharp
public class RemoteWorkRequest : BaseEntity
{
    // Who
    public long EmployeeId { get; set; }

    // When
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    // Why
    public string? Reason { get; set; }

    // Created By (can be HR or employee)
    public long CreatedByUserId { get; set; }

    // Approval
    public RemoteWorkRequestStatus Status { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? RejectionReason { get; set; }
    public string? ApprovalComments { get; set; }

    // Policy
    public long RemoteWorkPolicyId { get; set; }

    // Calculated
    public int WorkingDaysCount { get; set; }       // Excludes weekends

    // Navigation
    public Employee Employee { get; set; } = null!;
    public User CreatedByUser { get; set; } = null!;
    public User? ApprovedByUser { get; set; }
    public RemoteWorkPolicy RemoteWorkPolicy { get; set; } = null!;
    public ICollection<AttendanceRecord> AttendanceRecords { get; set; } = new List<AttendanceRecord>();
}
```

**Enums**:

```csharp
public enum RemoteWorkRequestStatus
{
    Pending,
    Approved,
    Rejected,
    Cancelled
}
```

**Business Logic**:

```csharp
// Validate request
public (bool IsValid, List<string> Errors) ValidateRequest()
{
    var errors = new List<string>();

    if (EndDate < StartDate)
        errors.Add("End date must be after start date");

    if (WorkingDaysCount < 1)
        errors.Add("Remote work request must include at least one working day");

    return (errors.Count == 0, errors);
}

// Check if currently active
public bool IsActiveNow()
{
    var today = DateOnly.FromDateTime(DateTime.Today);
    return Status == RemoteWorkRequestStatus.Approved
        && today >= StartDate
        && today <= EndDate;
}

// Check if overlaps with another request
public bool OverlapsWith(DateOnly otherStart, DateOnly otherEnd)
{
    return StartDate <= otherEnd && EndDate >= otherStart;
}

// Approve request
public void Approve(long userId)
{
    Status = RemoteWorkRequestStatus.Approved;
    ApprovedByUserId = userId;
    ApprovedAt = DateTime.UtcNow;
    RejectionReason = null;
}

// Reject request
public void Reject(long userId, string reason)
{
    Status = RemoteWorkRequestStatus.Rejected;
    ApprovedByUserId = userId;
    ApprovedAt = DateTime.UtcNow;
    RejectionReason = reason;
}

// Cancel request
public void Cancel()
{
    Status = RemoteWorkRequestStatus.Cancelled;
}

// Get total days (including weekends)
public int GetTotalDays()
{
    return EndDate.DayNumber - StartDate.DayNumber + 1;
}
```

**Business Rules**:
- End date must be after start date
- Cannot overlap with existing approved requests
- Only approved requests affect attendance location
- Working days count excludes weekends

---

### 3.10 Fingerprint Request Aggregate

#### 3.10.1 FingerprintRequest

**Location**: [FingerprintRequests/FingerprintRequest.cs](../../src/Domain/TimeAttendanceSystem.Domain/FingerprintRequests/FingerprintRequest.cs)

**Purpose**: Employee fingerprint enrollment/update request management.

```csharp
public class FingerprintRequest : BaseEntity
{
    // Who
    public long EmployeeId { get; set; }

    // What Type
    public FingerprintRequestType RequestType { get; set; }

    // Issue Details
    public string IssueDescription { get; set; } = string.Empty;
    public string? AffectedFingers { get; set; }

    // Preferred Schedule
    public DateTime? PreferredDate { get; set; }
    public TimeSpan? PreferredTime { get; set; }

    // Actual Schedule
    public DateTime? ScheduledDate { get; set; }
    public TimeSpan? ScheduledTime { get; set; }

    // Completion
    public DateTime? CompletedDate { get; set; }

    // Status
    public FingerprintRequestStatus Status { get; set; }

    // Technician
    public long? TechnicianId { get; set; }
    public string? TechnicianNotes { get; set; }

    // Navigation
    public Employee? Employee { get; set; }
    public User? Technician { get; set; }
}
```

**Enums**:

```csharp
public enum FingerprintRequestType
{
    NewEnrollment,      // First time enrollment
    Update,             // Update existing fingerprint
    Issue,              // Fingerprint not working
    AdditionalFingers,  // Add more fingers
    LocationChange      // Move to different reader
}

public enum FingerprintRequestStatus
{
    Pending,            // Submitted, not scheduled
    Scheduled,          // Appointment scheduled
    Completed,          // Work completed
    Cancelled,          // Request cancelled
    Rejected            // Request rejected
}
```

**Business Rules**:
- Issue description required for all requests
- Technician must be assigned before scheduling
- Completed requests cannot be modified
- Preferred date/time is optional (employee suggestion)
- Scheduled date/time is required before completion

---

## 4. Domain Patterns

### 4.1 Aggregate Root Identification

**Current Aggregate Roots** (15 total):

1. **User** - Authentication and authorization
2. **Employee** - Employee information
3. **Branch** - Organizational unit
4. **Shift** - Work schedule definition
5. **AttendanceRecord** - Daily attendance summary
6. **OvertimeConfiguration** - System-wide settings
7. **PublicHoliday** - Holiday calendar
8. **OffDay** - Off-day configuration
9. **VacationType** - Vacation categorization
10. **EmployeeVacation** - Vacation period
11. **ExcusePolicy** - Excuse rules
12. **EmployeeExcuse** - Excuse request
13. **RemoteWorkPolicy** - Remote work rules
14. **RemoteWorkRequest** - Remote work request
15. **FingerprintRequest** - Fingerprint enrollment

**Aggregate Characteristics**:
- Have global identity (can be referenced from outside)
- Can exist independently
- Contain business logic and validation
- Control access to child entities
- Enforce invariants

---

### 4.2 Validation Pattern

All aggregate roots implement validation using tuples:

```csharp
public (bool IsValid, List<string> Errors) ValidateXxx()
{
    var errors = new List<string>();

    // Validation logic...

    return (errors.Count == 0, errors);
}
```

**Usage in Application Layer**:

```csharp
var (isValid, errors) = shift.ValidateShiftRules();

if (!isValid)
{
    return Result<ShiftDto>.Failure(string.Join(", ", errors));
}
```

---

### 4.3 Calculation Pattern

Entities contain calculation methods for derived values:

```csharp
// Calculate and store
public void CalculateDuration()
{
    var duration = EndTime - StartTime;
    DurationHours = (decimal)duration.TotalHours;
}

// Calculate and return
public decimal CalculateTotalHours()
{
    return ShiftPeriods.Sum(p => p.Hours);
}
```

---

### 4.4 State Management Pattern

Entities manage their own state transitions:

```csharp
public void Approve(long approverId, string? notes = null)
{
    ApprovalStatus = ApprovalStatus.Approved;
    ApprovedById = approverId;
    ApprovedAt = DateTime.UtcNow;
    ProcessingNotes = notes;
    RejectionReason = null;
}

public void Reject(long approverId, string reason, string? notes = null)
{
    ApprovalStatus = ApprovalStatus.Rejected;
    ApprovedById = approverId;
    ApprovedAt = DateTime.UtcNow;
    RejectionReason = reason;
    ProcessingNotes = notes;
}
```

---

## 5. Business Rules

### 5.1 Shift Assignment Rules

**Hierarchy** (Employee > Department > Branch):
```
1. Employee-specific assignment (highest priority)
2. Department-wide assignment (medium priority)
3. Branch-wide assignment (lowest priority)
```

**Effective Dating**:
- Assignments can be scheduled for future activation
- Can have expiration dates
- Status transitions: Pending → Active → Expired

---

### 5.2 Attendance Rules

**Status Calculation**:
- Check-in + Check-out = Present
- No check-in = Absent
- Late check-in (> grace period) = Late
- Early check-out = EarlyLeave
- Approved vacation = OnLeave
- Approved remote work = RemoteWork

**Overtime Calculation**:
- Pre-shift: Hours worked before scheduled start
- Post-shift: Hours worked after scheduled end
- Rate depends on day type (Normal, PublicHoliday, OffDay)

---

### 5.3 Excuse Rules

**Personal Excuses**:
- Subject to monthly count limit
- Subject to monthly hours limit
- Subject to per-day hours limit
- Subject to per-excuse duration limit
- Affects salary deduction

**Official Duties**:
- No limits
- No salary deduction
- Fully compensated time

---

### 5.4 Multi-Tenancy Rules

**Branch Isolation**:
- Every employee belongs to one branch
- Users can have access to multiple branches via `UserBranchScope`
- Empty `UserBranchScopes` = Super Admin (all branches)

**Policy Application**:
- Branch-specific policies override company-wide
- Higher priority number wins conflicts

---

## 6. Entity Relationships

### 6.1 Core Relationships Diagram

```
Branch (1) ──────────┬────── (*) Department
                     │
                     ├────── (*) Employee
                     │
                     └────── (*) UserBranchScope ────── (*) User

Employee (1) ────────┬────── (*) AttendanceRecord
                     │
                     ├────── (*) EmployeeVacation
                     │
                     ├────── (*) EmployeeExcuse
                     │
                     ├────── (*) RemoteWorkRequest
                     │
                     ├────── (1) EmployeeUserLink ────── (1) User
                     │
                     └────── (*) DirectReports (self-reference)

User (1) ────────────┬────── (*) UserRole ────── (*) Role
                     │
                     ├────── (*) RefreshToken
                     │
                     ├────── (*) LoginAttempt
                     │
                     ├────── (*) PasswordHistory
                     │
                     ├────── (*) TwoFactorBackupCode
                     │
                     └────── (*) UserSession

Role (1) ──────────── (*) RolePermission ────── (*) Permission

Shift (1) ───────────┬────── (*) ShiftPeriod
                     │
                     └────── (*) ShiftAssignment

AttendanceRecord (1) ─┬────── (*) AttendanceTransaction
                     │
                     └────── (1) WorkingDay
```

---

## 7. Common Development Tasks

### 7.1 Adding a New Entity

**Step 1**: Create entity class

```csharp
public class MyEntity : BaseEntity
{
    // Properties
    public string Name { get; set; } = string.Empty;

    // Navigation properties
    public long ParentId { get; set; }
    public Parent Parent { get; set; } = null!;

    // Business logic
    public (bool IsValid, List<string> Errors) Validate()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
            errors.Add("Name is required");

        return (errors.Count == 0, errors);
    }
}
```

**Step 2**: Add to DbContext (Infrastructure layer)

**Step 3**: Create migration

**Step 4**: Add enum if needed

---

### 7.2 Adding Business Logic to Existing Entity

**Example**: Add a new calculated property to `AttendanceRecord`

```csharp
// Add property
public decimal NetCompensableHours { get; set; }

// Add calculation method
public void CalculateNetCompensableHours()
{
    NetCompensableHours = WorkingHours - BreakHours + OvertimeHours;
}
```

---

### 7.3 Adding Validation Rules

```csharp
public (bool IsValid, List<string> Errors) ValidateMyEntity()
{
    var errors = new List<string>();

    // Required field
    if (string.IsNullOrWhiteSpace(Name))
        errors.Add("Name is required");

    // Range validation
    if (Value < 0 || Value > 100)
        errors.Add("Value must be between 0 and 100");

    // Logical validation
    if (EndDate < StartDate)
        errors.Add("End date must be after start date");

    // Cross-entity validation (should be minimal in domain)
    if (ManagerId == EmployeeId)
        errors.Add("Employee cannot be their own manager");

    return (errors.Count == 0, errors);
}
```

---

## Summary

The Domain Layer is well-structured with:

- ✅ **15 Aggregate Roots** with clear boundaries
- ✅ **50+ Domain Entities** including join tables
- ✅ **70+ Enum Values** for business types
- ✅ **200+ Business Logic Methods** embedded in entities
- ✅ **Rich Domain Models** with calculated properties
- ✅ **Comprehensive Validation** patterns
- ✅ **Multi-tenant Architecture** with branch isolation
- ✅ **Temporal Patterns** for scheduling and history
- ✅ **Audit Trail** on all entities via BaseEntity
- ✅ **Soft Delete** for data preservation

**Next Steps**:
- Review [Application Layer Documentation](03-APPLICATION-LAYER.md) for CQRS implementation
- Review [Infrastructure Layer Documentation](04-INFRASTRUCTURE-LAYER.md) for persistence
- Review [API Layer Documentation](05-API-LAYER.md) for endpoints

---

**Document Version**: 1.0
**Last Updated**: November 3, 2025
**Maintained By**: Development Team
