# Time Attendance System - Application Layer Documentation

**Version**: 1.0
**Last Updated**: November 3, 2025
**Framework**: .NET 9.0 (C# 13)
**Pattern**: CQRS + MediatR

---

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [CQRS Implementation](#3-cqrs-implementation)
4. [MediatR Pipeline](#4-mediatr-pipeline)
5. [Result Pattern](#5-result-pattern)
6. [Common Components](#6-common-components)
7. [Feature Modules](#7-feature-modules)
8. [Validation Strategy](#8-validation-strategy)
9. [DTOs and Mapping](#9-dtos-and-mapping)
10. [Security Implementation](#10-security-implementation)
11. [Best Practices](#11-best-practices)
12. [Development Guide](#12-development-guide)

---

## 1. Overview

### 1.1 Purpose

The Application Layer orchestrates business workflows and use cases using **CQRS** (Command Query Responsibility Segregation) pattern with **MediatR** library. It sits between the API Layer and the Domain/Infrastructure layers.

### 1.2 Key Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **MediatR** | 12.4.1 | CQRS/Mediator pattern implementation |
| **FluentValidation** | 11.11.0 | Input validation framework |
| **AutoMapper** | 13.0.1 | Object-to-object mapping |
| **Entity Framework Core** | 9.0.0 | Database access abstraction |
| **.NET** | 9.0 | Target framework |

### 1.3 Architecture Principles

```
┌─────────────────────────────────────────────────┐
│              API Layer (Controllers)            │
│  - HTTP Request/Response                        │
│  - Authentication/Authorization                 │
└───────────────────┬─────────────────────────────┘
                    │ Send Command/Query
                    ▼
┌─────────────────────────────────────────────────┐
│           Application Layer (CQRS)              │
│  ┌───────────────┐      ┌──────────────────┐   │
│  │   Commands    │      │     Queries      │   │
│  │  (Write Ops)  │      │   (Read Ops)     │   │
│  └───────────────┘      └──────────────────┘   │
│           │                      │              │
│           ├──────────────────────┤              │
│           │   FluentValidation   │              │
│           └──────────────────────┘              │
└───────────────────┬─────────────────────────────┘
                    │ Uses
                    ▼
┌─────────────────────────────────────────────────┐
│  Domain Layer (Entities) + Infrastructure       │
│  - Business Logic                               │
│  - Database Access (EF Core)                    │
│  - External Services                            │
└─────────────────────────────────────────────────┘
```

**Key Principles**:
- **CQRS**: Separate models for read and write operations
- **Mediator Pattern**: Decoupled request handling
- **Clean Architecture**: Application layer independent of infrastructure details
- **Result Pattern**: Functional error handling without exceptions
- **Dependency Inversion**: Depends on abstractions (interfaces)

---

## 2. Project Structure

### 2.1 Folder Organization

**Location**: `src/Application/TimeAttendanceSystem.Application/`

```
TimeAttendanceSystem.Application/
│
├── Abstractions/                           # Interface definitions
│   ├── IApplicationDbContext.cs            # Database context abstraction
│   ├── ICurrentUser.cs                     # Current user context
│   ├── IEmailService.cs                    # Email service abstraction
│   ├── IPasswordService.cs                 # Password hashing
│   ├── IJwtTokenGenerator.cs               # JWT token generation
│   ├── ITwoFactorService.cs                # Two-factor authentication
│   ├── IDeviceService.cs                   # Device fingerprinting
│   ├── IAttendanceCalculationService.cs    # Attendance calculations
│   ├── IDailyAttendanceGeneratorService.cs # Daily attendance generation
│   ├── IOvertimeConfigurationService.cs    # Overtime configuration
│   └── IPublicHolidayService.cs            # Public holiday logic
│
├── Common/                                 # Shared application components
│   ├── Result.cs                           # Result pattern implementation
│   ├── PagedResult.cs                      # Pagination wrapper
│   └── BaseHandler.cs                      # Base handler for all handlers
│
├── Services/                               # Application services
│   ├── AttendanceCalculationService.cs
│   ├── DailyAttendanceGeneratorService.cs
│   ├── OvertimeConfigurationService.cs
│   └── ChangeTrackingService.cs            # Audit change tracking
│
├── [Feature Modules]/                      # Organized by business domain
│   │
│   ├── Commands/                           # Write operations
│   │   ├── Create[Entity]/
│   │   │   ├── Create[Entity]Command.cs
│   │   │   ├── Create[Entity]CommandHandler.cs
│   │   │   └── Create[Entity]CommandValidator.cs
│   │   ├── Update[Entity]/
│   │   ├── Delete[Entity]/
│   │   └── Toggle[Entity]Status/
│   │
│   └── Queries/                            # Read operations
│       ├── Get[Entity]ById/
│       │   ├── Get[Entity]ByIdQuery.cs
│       │   ├── Get[Entity]ByIdQueryHandler.cs
│       │   └── [Entity]DetailDto.cs
│       └── Get[Entity]s/
│           ├── Get[Entity]sQuery.cs
│           ├── Get[Entity]sQueryHandler.cs
│           └── [Entity]Dto.cs
│
└── DependencyInjection.cs                  # Service registration
```

### 2.2 Feature Modules (20+ Modules)

| Module | Purpose | Commands | Queries |
|--------|---------|----------|---------|
| **Employees** | Employee management | Create, Update, Delete, ToggleStatus | GetById, GetEmployees |
| **Users** | User account management | CreateUser, UpdateUser, DeleteUser, AssignRole, AssignBranch | GetUserById, GetUsers |
| **Authorization** | Authentication & security | Login, Logout, Register, RefreshToken, ChangePassword, ResetPassword, EnableTwoFactor, VerifyTwoFactor | - |
| **Roles** | Role management | CreateRole, UpdateRole, DeleteRole, AssignPermission, RemovePermission | GetRoleById, GetRoles |
| **Permissions** | Permission system | - | GetPermissions |
| **Branches** | Branch management | CreateBranch, UpdateBranch, DeleteBranch | GetBranches |
| **Departments** | Department management | CreateDepartment, UpdateDepartment, DeleteDepartment | GetDepartmentById, GetDepartments |
| **Shifts** | Shift configuration | CreateShift, UpdateShift, DeleteShift, SetDefaultShift, AssignEmployeeToShift | GetShiftById, GetShifts, GetDefaultShift, GetShiftAssignments |
| **ShiftAssignments** | Shift assignment | CreateShiftAssignment, UpdateShiftAssignment, DeleteShiftAssignment, UpdateEmployeeShift | GetShiftAssignmentById, GetShiftAssignments |
| **Attendance** | Attendance tracking | - | GetMonthlyReport, GetLeaveExcuseDetails |
| **VacationTypes** | Vacation types | CreateVacationType, UpdateVacationType, DeleteVacationType, ToggleStatus | GetVacationTypeById, GetVacationTypes |
| **EmployeeVacations** | Vacation requests | CreateEmployeeVacation, UpdateEmployeeVacation, CreateBulkVacation, ToggleStatus | GetEmployeeVacations |
| **Excuses** | Excuse policy & requests | CreateExcusePolicy, UpdateExcusePolicy, DeleteExcusePolicy, CreateEmployeeExcuse, ApproveEmployeeExcuse, ValidateExcuse | GetExcusePolicyById, GetExcusePolicies, GetEmployeeExcuses, GetExcuseStatistics |
| **PublicHolidays** | Public holidays | CreatePublicHoliday, UpdatePublicHoliday, DeletePublicHoliday | GetPublicHolidayById, GetPublicHolidays, GetHolidayCalendar |
| **RemoteWorkPolicies** | Remote work policy | CreateRemoteWorkPolicy, UpdateRemoteWorkPolicy, DeleteRemoteWorkPolicy, ToggleStatus | GetRemoteWorkPolicyById, GetRemoteWorkPolicies |
| **RemoteWorkRequests** | Remote work requests | CreateRemoteWorkRequest, UpdateRemoteWorkRequest, CancelRemoteWorkRequest, ApproveRemoteWorkRequest | GetRemoteWorkRequestById, GetRemoteWorkRequests |
| **RemoteWorkAssignments** | Remote work assignments | AssignRemoteWork, CancelRemoteWorkAssignment | GetRemoteWorkAssignments |
| **Sessions** | User session management | TerminateSession | GetUserSessions |
| **AuditLogs** | Audit trail | - | GetAuditLogs |
| **Settings** | System configuration | CreateOvertimeConfiguration, UpdateOvertimeConfiguration, ActivateOvertimeConfiguration | GetOvertimeConfigurations |
| **Features/Portal** | Employee self-service | UpdateMyProfile, CreateFingerprintRequest, CancelFingerprintRequest, ApproveFingerprintRequest | GetEmployeeDashboard, GetManagerDashboard, GetMyProfile, GetMyAttendance, GetFingerprintRequests |

---

## 3. CQRS Implementation

### 3.1 CQRS Overview

**CQRS** (Command Query Responsibility Segregation) separates:

- **Commands**: Modify system state (Create, Update, Delete)
  - Return `Result<T>` with operation status
  - Validated by FluentValidation
  - Execute business logic
  - May trigger side effects (emails, notifications)

- **Queries**: Retrieve data without side effects (GetById, GetList)
  - Return `Result<DTO>` with data
  - Optimized for read performance
  - Can use different models than domain entities
  - Support filtering, sorting, pagination

### 3.2 Command Pattern

#### Command Definition (Record)

**Location**: `[Feature]/Commands/Create[Entity]/Create[Entity]Command.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Enums;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// Command to create a new employee in the system.
/// Implements IRequest from MediatR returning Result with created entity ID.
/// </summary>
public record CreateEmployeeCommand(
    // Required: Tenant boundary
    long BranchId,

    // Required: Identity
    string EmployeeNumber,
    string FirstName,
    string LastName,

    // Optional: Bilingual support
    string? FirstNameAr,
    string? LastNameAr,

    // Optional: Personal information
    string? NationalId,
    string? Email,
    string? Phone,
    DateTime? DateOfBirth,
    Gender? Gender,

    // Required: Employment details
    DateTime HireDate,
    EmploymentStatus EmploymentStatus,
    string JobTitle,
    string? JobTitleAr,

    // Optional: Organizational structure
    long? DepartmentId,
    long? ManagerEmployeeId,

    // Required: Work location
    WorkLocationType WorkLocationType
) : IRequest<Result<long>>;  // Returns Result with created employee ID
```

**Key Points**:
- **Record type**: Immutable, concise syntax (C# 9+)
- **IRequest<Result<T>>**: MediatR marker interface
- **Result<long>**: Functional result pattern, returns ID on success
- **XML comments**: Document purpose and behavior

#### Command Handler

**Location**: `[Feature]/Commands/Create[Entity]/Create[Entity]CommandHandler.cs`

```csharp
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// Handler for CreateEmployeeCommand.
/// Validates business rules, creates employee entity, and persists to database.
/// </summary>
public class CreateEmployeeCommandHandler : BaseHandler<CreateEmployeeCommand, Result<long>>
{
    public CreateEmployeeCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        // ──────────────────────────────────────────────────────────
        // 1. VALIDATE BRANCH EXISTS AND USER HAS ACCESS
        // ──────────────────────────────────────────────────────────
        var branch = await Context.Branches
            .FirstOrDefaultAsync(b => b.Id == request.BranchId, cancellationToken);

        if (branch == null)
            return Result.Failure<long>("Branch does not exist.");

        // ──────────────────────────────────────────────────────────
        // 2. MULTI-TENANT SECURITY CHECK
        // ──────────────────────────────────────────────────────────
        // System admins have unrestricted access (empty BranchIds)
        // Other users can only access their assigned branches
        if (!CurrentUser.IsSystemAdmin &&
            CurrentUser.BranchIds.Any() &&
            !CurrentUser.BranchIds.Contains(request.BranchId))
        {
            return Result.Failure<long>("Access denied to this branch.");
        }

        // ──────────────────────────────────────────────────────────
        // 3. BUSINESS RULE: EMPLOYEE NUMBER UNIQUENESS
        // ──────────────────────────────────────────────────────────
        var existingEmployee = await Context.Employees
            .FirstOrDefaultAsync(
                e => e.BranchId == request.BranchId &&
                     e.EmployeeNumber == request.EmployeeNumber,
                cancellationToken);

        if (existingEmployee != null)
            return Result.Failure<long>("Employee number already exists in this branch.");

        // ──────────────────────────────────────────────────────────
        // 4. VALIDATE RELATED ENTITIES (DEPARTMENT, MANAGER)
        // ──────────────────────────────────────────────────────────
        if (request.DepartmentId.HasValue)
        {
            var department = await Context.Departments
                .FirstOrDefaultAsync(
                    d => d.Id == request.DepartmentId &&
                         d.BranchId == request.BranchId,
                    cancellationToken);

            if (department == null)
                return Result.Failure<long>(
                    "Department does not exist in the specified branch.");
        }

        if (request.ManagerEmployeeId.HasValue)
        {
            var manager = await Context.Employees
                .FirstOrDefaultAsync(
                    e => e.Id == request.ManagerEmployeeId &&
                         e.BranchId == request.BranchId,
                    cancellationToken);

            if (manager == null)
                return Result.Failure<long>(
                    "Manager does not exist in the specified branch.");
        }

        // ──────────────────────────────────────────────────────────
        // 5. CREATE EMPLOYEE ENTITY
        // ──────────────────────────────────────────────────────────
        var employee = new Employee
        {
            // Tenant boundary
            BranchId = request.BranchId,

            // Identity
            EmployeeNumber = request.EmployeeNumber,
            FirstName = request.FirstName,
            LastName = request.LastName,
            FirstNameAr = request.FirstNameAr,
            LastNameAr = request.LastNameAr,

            // Personal information
            NationalId = request.NationalId,
            Email = request.Email,
            Phone = request.Phone,
            DateOfBirth = request.DateOfBirth,
            Gender = request.Gender ?? Gender.Male,

            // Employment details
            HireDate = request.HireDate,
            EmploymentStatus = request.EmploymentStatus,
            JobTitle = request.JobTitle,
            JobTitleAr = request.JobTitleAr,

            // Organizational structure
            DepartmentId = request.DepartmentId,
            ManagerEmployeeId = request.ManagerEmployeeId,

            // Work location
            WorkLocationType = request.WorkLocationType,

            // Status
            IsActive = true,

            // Audit trail (from BaseEntity)
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.UserId ?? 0
        };

        // ──────────────────────────────────────────────────────────
        // 6. PERSIST TO DATABASE
        // ──────────────────────────────────────────────────────────
        Context.Employees.Add(employee);
        await Context.SaveChangesAsync(cancellationToken);

        // ──────────────────────────────────────────────────────────
        // 7. RETURN SUCCESS WITH CREATED ID
        // ──────────────────────────────────────────────────────────
        return Result.Success(employee.Id);
    }
}
```

**Handler Responsibilities**:
1. ✅ **Validation**: Business rules (uniqueness, relationships)
2. ✅ **Authorization**: Multi-tenant security checks
3. ✅ **Entity Creation**: Map command to domain entity
4. ✅ **Persistence**: Save changes to database
5. ✅ **Audit Trail**: Track creator and timestamp
6. ✅ **Result**: Return success/failure with created ID

#### Command Validator

**Location**: `[Feature]/Commands/Create[Entity]/Create[Entity]CommandValidator.cs`

```csharp
using FluentValidation;

namespace TimeAttendanceSystem.Application.Employees.Commands.CreateEmployee;

/// <summary>
/// Validates CreateEmployeeCommand input before handler execution.
/// Uses FluentValidation for declarative validation rules.
/// </summary>
public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        // ──────────────────────────────────────────────────────────
        // BRANCH VALIDATION
        // ──────────────────────────────────────────────────────────
        RuleFor(x => x.BranchId)
            .GreaterThan(0)
            .WithMessage("Branch ID must be a valid positive number");

        // ──────────────────────────────────────────────────────────
        // REQUIRED STRING FIELDS
        // ──────────────────────────────────────────────────────────
        RuleFor(x => x.EmployeeNumber)
            .NotEmpty()
            .WithMessage("Employee number is required for identification")
            .MaximumLength(50)
            .WithMessage("Employee number cannot exceed 50 characters");

        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required for employee identity")
            .MaximumLength(100)
            .WithMessage("First name cannot exceed 100 characters");

        RuleFor(x => x.LastName)
            .NotEmpty()
            .WithMessage("Last name is required for employee identity")
            .MaximumLength(100)
            .WithMessage("Last name cannot exceed 100 characters");

        // ──────────────────────────────────────────────────────────
        // OPTIONAL STRING FIELDS
        // ──────────────────────────────────────────────────────────
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email address must be in valid format")
            .MaximumLength(200)
            .WithMessage("Email address cannot exceed 200 characters")
            .When(x => !string.IsNullOrEmpty(x.Email));

        RuleFor(x => x.Phone)
            .MaximumLength(20)
            .WithMessage("Phone number cannot exceed 20 characters")
            .When(x => !string.IsNullOrEmpty(x.Phone));

        // ──────────────────────────────────────────────────────────
        // DATE VALIDATIONS WITH BUSINESS RULES
        // ──────────────────────────────────────────────────────────
        RuleFor(x => x.DateOfBirth)
            .NotEmpty()
            .WithMessage("Date of birth is required")
            .LessThan(DateTime.Today)
            .WithMessage("Date of birth must be in the past")
            .Must(dob => dob.HasValue && CalculateAge(dob.Value) >= 16)
            .WithMessage("Employee must be at least 16 years old");

        RuleFor(x => x.HireDate)
            .NotEmpty()
            .WithMessage("Hire date is required")
            .LessThanOrEqualTo(DateTime.Today)
            .WithMessage("Hire date cannot be in the future");

        // ──────────────────────────────────────────────────────────
        // JOB TITLE VALIDATION
        // ──────────────────────────────────────────────────────────
        RuleFor(x => x.JobTitle)
            .NotEmpty()
            .WithMessage("Job title is required")
            .MaximumLength(200)
            .WithMessage("Job title cannot exceed 200 characters");
    }

    /// <summary>
    /// Calculate age from date of birth.
    /// </summary>
    private static int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;

        // Adjust if birthday hasn't occurred yet this year
        if (dateOfBirth.Date > today.AddYears(-age))
            age--;

        return age;
    }
}
```

**Validation Features**:
- ✅ **Declarative Rules**: Readable validation logic
- ✅ **Custom Messages**: User-friendly error messages
- ✅ **Conditional Validation**: `.When()` for optional fields
- ✅ **Complex Rules**: `.Must()` for custom logic
- ✅ **Early Execution**: Runs before handler (MediatR pipeline)

---

### 3.3 Query Pattern

#### Query Definition

**Location**: `[Feature]/Queries/Get[Entity]s/Get[Entity]sQuery.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

/// <summary>
/// Query to retrieve paginated list of employees with filtering.
/// Supports search, branch filter, department filter, and status filter.
/// </summary>
public record GetEmployeesQuery(
    // Pagination
    int Page = 1,
    int PageSize = 10,

    // Search (full-text across multiple fields)
    string? Search = null,

    // Filters
    long? BranchId = null,
    long? DepartmentId = null,
    long? ManagerId = null,
    bool? IsActive = null,
    string? EmploymentStatus = null
) : IRequest<Result<PagedResult<EmployeeDto>>>;
```

#### Query Handler

**Location**: `[Feature]/Queries/Get[Entity]s/Get[Entity]sQueryHandler.cs`

```csharp
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

/// <summary>
/// Handler for GetEmployeesQuery.
/// Retrieves paginated employee list with filtering and projection to DTO.
/// </summary>
public class GetEmployeesQueryHandler
    : BaseHandler<GetEmployeesQuery, Result<PagedResult<EmployeeDto>>>
{
    public GetEmployeesQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<PagedResult<EmployeeDto>>> Handle(
        GetEmployeesQuery request,
        CancellationToken cancellationToken)
    {
        // ──────────────────────────────────────────────────────────
        // 1. BUILD BASE QUERY WITH EAGER LOADING
        // ──────────────────────────────────────────────────────────
        var query = Context.Employees
            .Include(e => e.Branch)
            .Include(e => e.Department)
            .Include(e => e.Manager)
            .Where(e => !e.IsDeleted)  // Soft delete filter
            .AsQueryable();

        // ──────────────────────────────────────────────────────────
        // 2. APPLY MULTI-TENANT SECURITY
        // ──────────────────────────────────────────────────────────
        if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
        {
            query = query.Where(e => CurrentUser.BranchIds.Contains(e.BranchId));
        }

        // ──────────────────────────────────────────────────────────
        // 3. APPLY SEARCH FILTER (FULL-TEXT)
        // ──────────────────────────────────────────────────────────
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var searchTerm = request.Search.ToLower();

            query = query.Where(e =>
                e.FirstName.ToLower().Contains(searchTerm) ||
                e.LastName.ToLower().Contains(searchTerm) ||
                e.EmployeeNumber.ToLower().Contains(searchTerm) ||
                (e.Email != null && e.Email.ToLower().Contains(searchTerm)) ||
                (e.Phone != null && e.Phone.Contains(searchTerm)));
        }

        // ──────────────────────────────────────────────────────────
        // 4. APPLY FILTERS
        // ──────────────────────────────────────────────────────────
        if (request.BranchId.HasValue)
            query = query.Where(e => e.BranchId == request.BranchId.Value);

        if (request.DepartmentId.HasValue)
            query = query.Where(e => e.DepartmentId == request.DepartmentId.Value);

        if (request.ManagerId.HasValue)
            query = query.Where(e => e.ManagerEmployeeId == request.ManagerId.Value);

        if (request.IsActive.HasValue)
            query = query.Where(e => e.IsActive == request.IsActive.Value);

        if (!string.IsNullOrWhiteSpace(request.EmploymentStatus))
        {
            if (Enum.TryParse<EmploymentStatus>(request.EmploymentStatus, out var status))
                query = query.Where(e => e.EmploymentStatus == status);
        }

        // ──────────────────────────────────────────────────────────
        // 5. GET TOTAL COUNT FOR PAGINATION
        // ──────────────────────────────────────────────────────────
        var totalCount = await query.CountAsync(cancellationToken);

        // ──────────────────────────────────────────────────────────
        // 6. APPLY SORTING
        // ──────────────────────────────────────────────────────────
        query = query
            .OrderBy(e => e.LastName)
            .ThenBy(e => e.FirstName);

        // ──────────────────────────────────────────────────────────
        // 7. APPLY PAGINATION AND PROJECT TO DTO
        // ──────────────────────────────────────────────────────────
        var employees = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new EmployeeDto
            {
                // Identity
                Id = e.Id,
                EmployeeNumber = e.EmployeeNumber,

                // Personal information
                FirstName = e.FirstName,
                LastName = e.LastName,
                FirstNameAr = e.FirstNameAr ?? string.Empty,
                LastNameAr = e.LastNameAr ?? string.Empty,
                Email = e.Email,
                Phone = e.Phone,

                // Employment
                HireDate = e.HireDate,
                EmploymentStatus = e.EmploymentStatus,
                JobTitle = e.JobTitle,
                JobTitleAr = e.JobTitleAr,
                WorkLocationType = e.WorkLocationType,

                // Organizational relationships (navigation properties)
                BranchId = e.BranchId,
                BranchName = e.Branch.Name,
                DepartmentId = e.DepartmentId,
                DepartmentName = e.Department != null ? e.Department.Name : null,
                ManagerEmployeeId = e.ManagerEmployeeId,
                ManagerName = e.Manager != null
                    ? $"{e.Manager.FirstName} {e.Manager.LastName}"
                    : null,

                // Current shift (subquery)
                CurrentShiftId = Context.ShiftAssignments
                    .Where(sa => sa.EmployeeId == e.Id &&
                                sa.Status == ShiftAssignmentStatus.Active &&
                                sa.AssignmentType == ShiftAssignmentType.Employee)
                    .OrderByDescending(sa => sa.Priority)
                    .Select(sa => (long?)sa.ShiftId)
                    .FirstOrDefault(),

                CurrentShiftName = Context.ShiftAssignments
                    .Where(sa => sa.EmployeeId == e.Id &&
                                sa.Status == ShiftAssignmentStatus.Active &&
                                sa.AssignmentType == ShiftAssignmentType.Employee)
                    .OrderByDescending(sa => sa.Priority)
                    .Select(sa => sa.Shift.Name)
                    .FirstOrDefault(),

                // Status
                IsActive = e.IsActive,

                // User account status (subquery)
                HasUserAccount = Context.EmployeeUserLinks
                    .Any(eul => eul.EmployeeId == e.Id),

                // Audit
                CreatedAtUtc = e.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        // ──────────────────────────────────────────────────────────
        // 8. CREATE PAGED RESULT
        // ──────────────────────────────────────────────────────────
        var result = new PagedResult<EmployeeDto>(
            employees,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(result);
    }
}
```

**Query Optimization Techniques**:
1. ✅ **Eager Loading**: `.Include()` for related entities
2. ✅ **Projection**: `.Select()` directly to DTO (no AutoMapper needed)
3. ✅ **Pagination**: `.Skip()` and `.Take()` for performance
4. ✅ **Filtering**: Early filtering reduces dataset
5. ✅ **Subqueries**: Efficient for calculated properties
6. ✅ **Multi-tenant**: Automatic branch filtering

#### Query DTO

**Location**: `[Feature]/Queries/Get[Entity]s/[Entity]Dto.cs`

```csharp
namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployees;

/// <summary>
/// Data Transfer Object for employee list view.
/// Lightweight DTO optimized for list display.
/// </summary>
public class EmployeeDto
{
    // ──────────────────────────────────────────────────────────
    // IDENTITY
    // ──────────────────────────────────────────────────────────
    public long Id { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;

    // ──────────────────────────────────────────────────────────
    // PERSONAL INFORMATION (BILINGUAL)
    // ──────────────────────────────────────────────────────────
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FirstNameAr { get; set; } = string.Empty;
    public string LastNameAr { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Phone { get; set; }

    // ──────────────────────────────────────────────────────────
    // COMPUTED PROPERTIES
    // ──────────────────────────────────────────────────────────
    public string FullName => $"{FirstName} {LastName}";
    public string FullNameAr => $"{FirstNameAr} {LastNameAr}";

    // ──────────────────────────────────────────────────────────
    // EMPLOYMENT
    // ──────────────────────────────────────────────────────────
    public DateTime? HireDate { get; set; }
    public EmploymentStatus EmploymentStatus { get; set; }
    public string? JobTitle { get; set; }
    public string? JobTitleAr { get; set; }
    public WorkLocationType WorkLocationType { get; set; }

    // ──────────────────────────────────────────────────────────
    // ORGANIZATIONAL RELATIONSHIPS
    // ──────────────────────────────────────────────────────────
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;

    public long? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }

    public long? ManagerEmployeeId { get; set; }
    public string? ManagerName { get; set; }

    // ──────────────────────────────────────────────────────────
    // SHIFT INFORMATION
    // ──────────────────────────────────────────────────────────
    public long? CurrentShiftId { get; set; }
    public string? CurrentShiftName { get; set; }

    // ──────────────────────────────────────────────────────────
    // STATUS
    // ──────────────────────────────────────────────────────────
    public bool IsActive { get; set; }
    public bool HasUserAccount { get; set; }

    // ──────────────────────────────────────────────────────────
    // AUDIT
    // ──────────────────────────────────────────────────────────
    public DateTime CreatedAtUtc { get; set; }
}
```

---

## 4. MediatR Pipeline

### 4.1 MediatR Configuration

**Location**: `DependencyInjection.cs`

```csharp
using System.Reflection;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace TimeAttendanceSystem.Application;

/// <summary>
/// Extension methods for registering application layer services.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // ──────────────────────────────────────────────────────────
        // REGISTER MEDIATR WITH ALL HANDLERS
        // ──────────────────────────────────────────────────────────
        // Scans assembly for all IRequestHandler implementations
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        // ──────────────────────────────────────────────────────────
        // REGISTER FLUENTVALIDATION VALIDATORS
        // ──────────────────────────────────────────────────────────
        // Scans assembly for all AbstractValidator implementations
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // ──────────────────────────────────────────────────────────
        // REGISTER AUTOMAPPER PROFILES
        // ──────────────────────────────────────────────────────────
        services.AddAutoMapper(Assembly.GetExecutingAssembly());

        // ──────────────────────────────────────────────────────────
        // REGISTER APPLICATION SERVICES
        // ──────────────────────────────────────────────────────────
        services.AddScoped<IAttendanceCalculationService, AttendanceCalculationService>();
        services.AddScoped<IDailyAttendanceGeneratorService, DailyAttendanceGeneratorService>();
        services.AddScoped<IOvertimeConfigurationService, OvertimeConfigurationService>();
        services.AddScoped<ChangeTrackingService>();

        return services;
    }
}
```

### 4.2 Request/Response Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    API Controller                            │
│  var result = await _mediator.Send(command);                 │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                MediatR IMediator.Send()                      │
│  - Resolves handler from DI container                        │
│  - Creates pipeline                                          │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│             Validation Pipeline (Optional)                   │
│  - FluentValidation validators execute                       │
│  - If validation fails, return error                         │
│  - If validation passes, continue                            │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                   Command/Query Handler                      │
│  1. Authorize (check permissions, branch access)             │
│  2. Validate business rules                                  │
│  3. Execute business logic                                   │
│  4. Persist changes (commands only)                          │
│  5. Return Result<T>                                         │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                      Result<T>                               │
│  - IsSuccess/IsFailure flag                                  │
│  - Value (T) if successful                                   │
│  - Error message if failed                                   │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                   API Controller                             │
│  if (result.IsFailure)                                       │
│      return BadRequest(new { error = result.Error });        │
│  return Ok(result.Value);                                    │
└──────────────────────────────────────────────────────────────┘
```

### 4.3 Handler Registration

MediatR automatically registers handlers by convention:

```csharp
// Handler implements IRequestHandler<TRequest, TResponse>
public class CreateEmployeeCommandHandler
    : IRequestHandler<CreateEmployeeCommand, Result<long>>
{
    public async Task<Result<long>> Handle(
        CreateEmployeeCommand request,
        CancellationToken cancellationToken)
    {
        // Implementation
    }
}

// MediatR will automatically find and register this handler
// when AddMediatR() scans the assembly
```

---

## 5. Result Pattern

### 5.1 Result Class

**Location**: `Common/Result.cs`

```csharp
namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Represents the result of an operation without a return value.
/// Provides functional error handling without exceptions.
/// </summary>
public class Result
{
    public bool IsSuccess { get; }
    public bool IsFailure => !IsSuccess;
    public string Error { get; }

    protected Result(bool isSuccess, string error)
    {
        // Invariant: Success cannot have error message
        if (isSuccess && !string.IsNullOrEmpty(error))
            throw new InvalidOperationException(
                "Successful result cannot have an error message.");

        // Invariant: Failure must have error message
        if (!isSuccess && string.IsNullOrEmpty(error))
            throw new InvalidOperationException(
                "Failed result must have an error message.");

        IsSuccess = isSuccess;
        Error = error;
    }

    /// <summary>
    /// Creates a successful result without a value.
    /// </summary>
    public static Result Success() => new(true, string.Empty);

    /// <summary>
    /// Creates a failed result with an error message.
    /// </summary>
    public static Result Failure(string error) => new(false, error);

    /// <summary>
    /// Creates a successful result with a value.
    /// </summary>
    public static Result<T> Success<T>(T value) => new(value, true, string.Empty);

    /// <summary>
    /// Creates a failed result with an error message.
    /// </summary>
    public static Result<T> Failure<T>(string error) => new(default!, false, error);
}

/// <summary>
/// Represents the result of an operation with a return value of type T.
/// </summary>
public class Result<T> : Result
{
    public T Value { get; }

    protected internal Result(T value, bool isSuccess, string error)
        : base(isSuccess, error)
    {
        Value = value;
    }
}
```

### 5.2 Usage Examples

**Command Handler (Success)**:
```csharp
// Return success with created entity ID
var employee = new Employee { /* ... */ };
Context.Employees.Add(employee);
await Context.SaveChangesAsync(cancellationToken);

return Result.Success(employee.Id);  // Result<long>
```

**Command Handler (Failure)**:
```csharp
// Business rule violation
if (existingEmployee != null)
    return Result.Failure<long>("Employee number already exists in this branch.");

// Authorization failure
if (!CurrentUser.BranchIds.Contains(request.BranchId))
    return Result.Failure<long>("Access denied to this branch.");

// Entity not found
if (employee == null)
    return Result.Failure<long>("Employee not found.");
```

**Query Handler**:
```csharp
// Success with data
var employees = await query.ToListAsync(cancellationToken);
var pagedResult = new PagedResult<EmployeeDto>(employees, totalCount, page, pageSize);

return Result.Success(pagedResult);  // Result<PagedResult<EmployeeDto>>
```

**Controller Usage**:
```csharp
[HttpPost]
public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(new { id = result.Value });
}

[HttpGet]
public async Task<IActionResult> GetEmployees([FromQuery] GetEmployeesQuery query)
{
    var result = await _mediator.Send(query);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(result.Value);  // Returns PagedResult<EmployeeDto>
}
```

### 5.3 PagedResult Class

**Location**: `Common/PagedResult.cs`

```csharp
namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Represents a paginated result set.
/// </summary>
public class PagedResult<T>
{
    public IReadOnlyList<T> Items { get; }
    public int TotalCount { get; }
    public int Page { get; }
    public int PageSize { get; }
    public int TotalPages { get; }
    public bool HasPrevious { get; }
    public bool HasNext { get; }

    public PagedResult(
        IReadOnlyList<T> items,
        int totalCount,
        int page,
        int pageSize)
    {
        Items = items;
        TotalCount = totalCount;
        Page = page;
        PageSize = pageSize;
        TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
        HasPrevious = page > 1;
        HasNext = page < TotalPages;
    }
}
```

**Usage**:
```csharp
var pagedResult = new PagedResult<EmployeeDto>(
    items: employees,         // List of DTOs
    totalCount: 250,          // Total records in database
    page: 2,                  // Current page (1-indexed)
    pageSize: 10              // Records per page
);

// Properties:
// Items: [10 employee DTOs]
// TotalCount: 250
// Page: 2
// PageSize: 10
// TotalPages: 25
// HasPrevious: true
// HasNext: true
```

---

## 6. Common Components

### 6.1 BaseHandler

**Location**: `Common/BaseHandler.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Application.Common;

/// <summary>
/// Base class for all command and query handlers.
/// Provides common dependencies (database context, current user).
/// </summary>
public abstract class BaseHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse>
    where TRequest : IRequest<TResponse>
{
    /// <summary>
    /// Database context for entity access.
    /// </summary>
    protected readonly IApplicationDbContext Context;

    /// <summary>
    /// Current user context for authorization and audit.
    /// </summary>
    protected readonly ICurrentUser CurrentUser;

    protected BaseHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        Context = context;
        CurrentUser = currentUser;
    }

    /// <summary>
    /// Handle the request.
    /// Implemented by derived handler classes.
    /// </summary>
    public abstract Task<TResponse> Handle(
        TRequest request,
        CancellationToken cancellationToken);
}
```

**Benefits**:
- ✅ Reduces boilerplate code
- ✅ Consistent dependency injection
- ✅ Standardized database access
- ✅ Centralized user context

**Usage**:
```csharp
public class CreateEmployeeCommandHandler
    : BaseHandler<CreateEmployeeCommand, Result<long>>
{
    public CreateEmployeeCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(...)
    {
        // Access Context and CurrentUser from base class
        var branch = await Context.Branches.FindAsync(request.BranchId);

        if (!CurrentUser.BranchIds.Contains(request.BranchId))
            return Result.Failure<long>("Access denied.");

        // ...
    }
}
```

---

### 6.2 IApplicationDbContext

**Location**: `Abstractions/IApplicationDbContext.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Domain.Employees;
using TimeAttendanceSystem.Domain.Users;
// ... other entity namespaces

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Database context abstraction providing access to all entities.
/// Allows application layer to be independent of Entity Framework implementation.
/// </summary>
public interface IApplicationDbContext
{
    // ──────────────────────────────────────────────────────────
    // ORGANIZATIONAL ENTITIES
    // ──────────────────────────────────────────────────────────
    DbSet<Branch> Branches { get; }
    DbSet<Department> Departments { get; }

    // ──────────────────────────────────────────────────────────
    // IDENTITY & ACCESS
    // ──────────────────────────────────────────────────────────
    DbSet<User> Users { get; }
    DbSet<Role> Roles { get; }
    DbSet<Permission> Permissions { get; }
    DbSet<RolePermission> RolePermissions { get; }
    DbSet<UserRole> UserRoles { get; }
    DbSet<UserBranchScope> UserBranchScopes { get; }

    // ──────────────────────────────────────────────────────────
    // HR & EMPLOYEES
    // ──────────────────────────────────────────────────────────
    DbSet<Employee> Employees { get; }
    DbSet<EmployeeUserLink> EmployeeUserLinks { get; }

    // ──────────────────────────────────────────────────────────
    // SECURITY
    // ──────────────────────────────────────────────────────────
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<LoginAttempt> LoginAttempts { get; }
    DbSet<PasswordHistory> PasswordHistory { get; }
    DbSet<BlacklistedToken> BlacklistedTokens { get; }
    DbSet<TwoFactorBackupCode> TwoFactorBackupCodes { get; }
    DbSet<UserSession> UserSessions { get; }

    // ──────────────────────────────────────────────────────────
    // AUDIT
    // ──────────────────────────────────────────────────────────
    DbSet<AuditLog> AuditLogs { get; }
    DbSet<AuditChange> AuditChanges { get; }

    // ──────────────────────────────────────────────────────────
    // TIME & ATTENDANCE
    // ──────────────────────────────────────────────────────────
    DbSet<Shift> Shifts { get; }
    DbSet<ShiftPeriod> ShiftPeriods { get; }
    DbSet<ShiftAssignment> ShiftAssignments { get; }
    DbSet<AttendanceRecord> AttendanceRecords { get; }
    DbSet<AttendanceTransaction> AttendanceTransactions { get; }
    DbSet<WorkingDay> WorkingDays { get; }

    // ──────────────────────────────────────────────────────────
    // LEAVE & ABSENCE
    // ──────────────────────────────────────────────────────────
    DbSet<VacationType> VacationTypes { get; }
    DbSet<EmployeeVacation> EmployeeVacations { get; }
    DbSet<ExcusePolicy> ExcusePolicies { get; }
    DbSet<EmployeeExcuse> EmployeeExcuses { get; }

    // ──────────────────────────────────────────────────────────
    // REMOTE WORK
    // ──────────────────────────────────────────────────────────
    DbSet<RemoteWorkPolicy> RemoteWorkPolicies { get; }
    DbSet<RemoteWorkRequest> RemoteWorkRequests { get; }

    // ──────────────────────────────────────────────────────────
    // CONFIGURATION
    // ──────────────────────────────────────────────────────────
    DbSet<OvertimeConfiguration> OvertimeConfigurations { get; }
    DbSet<PublicHoliday> PublicHolidays { get; }
    DbSet<OffDay> OffDays { get; }
    DbSet<FingerprintRequest> FingerprintRequests { get; }

    /// <summary>
    /// Save all changes to the database.
    /// </summary>
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
```

**Purpose**:
- ✅ **Abstraction**: Application layer doesn't depend on EF Core directly
- ✅ **Testability**: Easy to mock for unit tests
- ✅ **Clean Architecture**: Maintains layer separation
- ✅ **Centralized Access**: Single point for all entity sets

---

### 6.3 ICurrentUser

**Location**: `Abstractions/ICurrentUser.cs`

```csharp
namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Provides information about the currently authenticated user.
/// Used for authorization and audit trail.
/// </summary>
public interface ICurrentUser
{
    /// <summary>
    /// Current user ID (from JWT claims).
    /// Null if not authenticated.
    /// </summary>
    long? UserId { get; }

    /// <summary>
    /// Current username.
    /// Null if not authenticated.
    /// </summary>
    string? Username { get; }

    /// <summary>
    /// Whether the user is authenticated.
    /// </summary>
    bool IsAuthenticated { get; }

    /// <summary>
    /// Whether the user has SystemAdmin role.
    /// System admins have unrestricted access to all branches.
    /// </summary>
    bool IsSystemAdmin { get; }

    /// <summary>
    /// List of role names assigned to the user.
    /// </summary>
    IReadOnlyList<string> Roles { get; }

    /// <summary>
    /// List of permission keys assigned to the user.
    /// Format: "resource.action" (e.g., "employee.create")
    /// </summary>
    IReadOnlyList<string> Permissions { get; }

    /// <summary>
    /// List of branch IDs the user has access to.
    /// Empty list = System Admin (access to all branches).
    /// </summary>
    IReadOnlyList<long> BranchIds { get; }

    /// <summary>
    /// User's preferred language ("en" or "ar").
    /// </summary>
    string PreferredLanguage { get; }
}
```

**Usage in Handlers**:

```csharp
// Multi-tenant security check
if (!CurrentUser.IsSystemAdmin &&
    CurrentUser.BranchIds.Any() &&
    !CurrentUser.BranchIds.Contains(request.BranchId))
{
    return Result.Failure<long>("Access denied to this branch.");
}

// Permission check
if (!CurrentUser.Permissions.Contains("employee.create"))
{
    return Result.Failure<long>("Insufficient permissions.");
}

// Audit trail
var employee = new Employee
{
    // ... properties
    CreatedBy = CurrentUser.UserId ?? 0,
    CreatedAtUtc = DateTime.UtcNow
};

// Query filtering by user's branch access
var query = Context.Employees.AsQueryable();

if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
{
    query = query.Where(e => CurrentUser.BranchIds.Contains(e.BranchId));
}
```

---

## 7. Feature Modules

### 7.1 Authorization Module (Login Example)

**LoginCommand**:
```csharp
public record LoginCommand(
    string Username,
    string Password,
    string? DeviceInfo,
    bool RememberMe = false
) : IRequest<Result<LoginResponse>>;
```

**LoginCommandHandler** (Simplified):
```csharp
public override async Task<Result<LoginResponse>> Handle(
    LoginCommand request,
    CancellationToken cancellationToken)
{
    // 1. Find user with all relationships
    var user = await Context.Users
        .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .ThenInclude(r => r.RolePermissions).ThenInclude(rp => rp.Permission)
        .Include(u => u.UserBranchScopes).ThenInclude(ubs => ubs.Branch)
        .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

    // 2. Validate user exists (generic error to prevent enumeration)
    if (user == null)
        return Result.Failure<LoginResponse>("Invalid username or password.");

    // 3. Check account status
    if (!user.IsActive)
        return Result.Failure<LoginResponse>("User account is disabled.");

    // 4. Check lockout
    if (user.LockoutEndUtc.HasValue && user.LockoutEndUtc.Value > DateTime.UtcNow)
        return Result.Failure<LoginResponse>($"Account is locked until {user.LockoutEndUtc.Value}.");

    // 5. Verify password
    var isPasswordValid = _passwordService.VerifyPassword(
        request.Password,
        user.PasswordHash,
        user.PasswordSalt);

    if (!isPasswordValid)
    {
        // Increment failed login attempts
        user.FailedLoginAttempts++;
        await ApplyProgressiveLockout(user);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Failure<LoginResponse>("Invalid username or password.");
    }

    // 6. Check 2FA requirement
    if (user.TwoFactorEnabled)
    {
        // Return response indicating 2FA required
        return Result.Failure<LoginResponse>("Two-factor authentication required.");
    }

    // 7. Aggregate roles and permissions
    var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
    var permissions = user.UserRoles
        .SelectMany(ur => ur.Role.RolePermissions)
        .Select(rp => rp.Permission.Key)
        .Distinct()
        .ToList();
    var branchIds = user.UserBranchScopes.Select(ubs => ubs.BranchId).ToList();

    // 8. Generate JWT tokens
    var accessToken = _jwtTokenGenerator.GenerateAccessToken(
        user,
        roles,
        permissions,
        branchIds,
        request.RememberMe);

    var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();

    // 9. Store refresh token
    var refreshTokenEntity = new RefreshToken
    {
        UserId = user.Id,
        Token = refreshToken,
        ExpiresAtUtc = DateTime.UtcNow.AddDays(30),
        DeviceInfo = request.DeviceInfo,
        CreatedAtUtc = DateTime.UtcNow
    };

    Context.RefreshTokens.Add(refreshTokenEntity);

    // 10. Reset failed login attempts
    user.FailedLoginAttempts = 0;
    user.LockoutEndUtc = null;

    // 11. Create session
    await _deviceService.CreateSessionAsync(
        user.Id,
        request.DeviceInfo,
        GetClientIpAddress(),
        cancellationToken);

    // 12. Save all changes
    await Context.SaveChangesAsync(cancellationToken);

    // 13. Return success response
    return Result.Success(new LoginResponse(
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        ExpiresAt: DateTime.UtcNow.AddMinutes(request.RememberMe ? 60 : 15),
        MustChangePassword: user.MustChangePassword,
        UserInfo: new UserInfoDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            Roles = roles,
            PreferredLanguage = user.PreferredLanguage
        }
    ));
}
```

**Progressive Lockout Implementation**:
```csharp
private async Task ApplyProgressiveLockout(User user)
{
    user.LastFailedLoginAtUtc = DateTime.UtcNow;

    // Progressive lockout policy
    if (user.FailedLoginAttempts >= 15)
        user.LockoutEndUtc = DateTime.UtcNow.AddHours(24);
    else if (user.FailedLoginAttempts >= 10)
        user.LockoutEndUtc = DateTime.UtcNow.AddHours(1);
    else if (user.FailedLoginAttempts >= 5)
        user.LockoutEndUtc = DateTime.UtcNow.AddMinutes(15);
}
```

---

### 7.2 Shifts Module

**CreateShiftCommand**:
```csharp
public record CreateShiftCommand(
    string Name,
    string? Description,
    ShiftType ShiftType,
    decimal? RequiredHours,
    bool IsCheckInRequired,
    bool IsAutoCheckOut,
    bool AllowFlexibleHours,
    int? FlexMinutesBefore,
    int? FlexMinutesAfter,
    int? GracePeriodMinutes,
    bool HasCoreHours,
    TimeOnly? CoreStart,
    TimeOnly? CoreEnd,
    bool IsSunday,
    bool IsMonday,
    bool IsTuesday,
    bool IsWednesday,
    bool IsThursday,
    bool IsFriday,
    bool IsSaturday,
    List<ShiftPeriodDto> ShiftPeriods
) : IRequest<Result<long>>;
```

**CreateShiftCommandHandler** validates shift rules from domain:
```csharp
var shift = new Shift
{
    Name = request.Name,
    // ... map properties
};

// Call domain validation
var (isValid, errors) = shift.ValidateShiftRules();
if (!isValid)
    return Result.Failure<long>(string.Join(", ", errors));

// Create shift periods
foreach (var periodDto in request.ShiftPeriods)
{
    var period = new ShiftPeriod
    {
        StartTime = periodDto.StartTime,
        EndTime = periodDto.EndTime,
        PeriodOrder = periodDto.PeriodOrder
    };

    period.CalculateHours();  // Domain method
    shift.ShiftPeriods.Add(period);
}

Context.Shifts.Add(shift);
await Context.SaveChangesAsync(cancellationToken);

return Result.Success(shift.Id);
```

---

### 7.3 Excuses Module

**ApproveEmployeeExcuseCommand**:
```csharp
public record ApproveEmployeeExcuseCommand(
    long ExcuseId,
    string? ApprovalNotes
) : IRequest<Result>;
```

**ApproveEmployeeExcuseCommandHandler**:
```csharp
public override async Task<Result> Handle(
    ApproveEmployeeExcuseCommand request,
    CancellationToken cancellationToken)
{
    var excuse = await Context.EmployeeExcuses
        .Include(e => e.Employee)
        .FirstOrDefaultAsync(e => e.Id == request.ExcuseId, cancellationToken);

    if (excuse == null)
        return Result.Failure("Excuse not found.");

    // Check if user has permission to approve
    // (handled by authorization in API layer)

    // Call domain method
    excuse.Approve(CurrentUser.UserId!.Value, request.ApprovalNotes);

    await Context.SaveChangesAsync(cancellationToken);

    // TODO: Send notification to employee

    return Result.Success();
}
```

---

## 8. Validation Strategy

### 8.1 FluentValidation Integration

All commands have corresponding validators using FluentValidation.

**Example Validator**:
```csharp
public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        // Required field
        RuleFor(x => x.FirstName)
            .NotEmpty()
            .WithMessage("First name is required")
            .MaximumLength(100)
            .WithMessage("First name cannot exceed 100 characters");

        // Conditional validation
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email must be in valid format")
            .When(x => !string.IsNullOrEmpty(x.Email));

        // Complex validation with custom logic
        RuleFor(x => x.DateOfBirth)
            .NotEmpty()
            .LessThan(DateTime.Today)
            .Must(dob => dob.HasValue && CalculateAge(dob.Value) >= 16)
            .WithMessage("Employee must be at least 16 years old");

        // Cross-property validation
        RuleFor(x => x)
            .Must(x => x.ManagerEmployeeId != x.DepartmentId)
            .WithMessage("Manager cannot be the same as department")
            .When(x => x.ManagerEmployeeId.HasValue && x.DepartmentId.HasValue);
    }

    private static int CalculateAge(DateTime dateOfBirth)
    {
        var today = DateTime.Today;
        var age = today.Year - dateOfBirth.Year;
        if (dateOfBirth.Date > today.AddYears(-age))
            age--;
        return age;
    }
}
```

### 8.2 Validation Layers

**Layer 1: Input Validation (FluentValidation)**
- Format validation (email, phone, etc.)
- Length validation (max characters)
- Required field validation
- Type validation

**Layer 2: Business Rule Validation (Handler)**
- Uniqueness checks (employee number, username, etc.)
- Relationship validation (branch exists, department exists)
- State validation (cannot delete active entity)

**Layer 3: Authorization (Handler)**
- Permission checks
- Multi-tenant branch access
- Role-based validation

**Layer 4: Domain Validation (Entity)**
- Domain invariants
- Entity-specific business rules
- Complex calculations

### 8.3 Validation Pipeline

Validation executes **before** handler:

```
Request
   ↓
FluentValidation Validators
   ├─ If validation fails → Return 400 Bad Request
   └─ If validation passes → Continue
   ↓
Handler Business Logic
   ├─ Business rule validation
   ├─ Authorization checks
   └─ Domain validation
   ↓
Result<T>
```

---

## 9. DTOs and Mapping

### 9.1 DTO Naming Conventions

- **List DTOs**: `[Entity]Dto` - Lightweight for lists
- **Detail DTOs**: `[Entity]DetailDto` - Complete for single entity
- **Response DTOs**: `[Operation]Response` - Operation-specific

### 9.2 Projection Pattern

**Direct Projection** (Preferred):
```csharp
var employees = await query
    .Select(e => new EmployeeDto
    {
        Id = e.Id,
        FullName = $"{e.FirstName} {e.LastName}",
        BranchName = e.Branch.Name,
        DepartmentName = e.Department != null ? e.Department.Name : null,
        // Subquery for current shift
        CurrentShiftName = Context.ShiftAssignments
            .Where(sa => sa.EmployeeId == e.Id && sa.Status == Active)
            .Select(sa => sa.Shift.Name)
            .FirstOrDefault()
    })
    .ToListAsync(cancellationToken);
```

**Benefits**:
- ✅ Minimal data transfer
- ✅ Compiled to efficient SQL
- ✅ No need for AutoMapper
- ✅ Type-safe at compile time

### 9.3 AutoMapper (Minimal Usage)

AutoMapper is configured but **not heavily used** in favor of direct projection.

When to use AutoMapper:
- Complex nested mappings
- Reusable mapping profiles
- Bidirectional mappings

---

## 10. Security Implementation

### 10.1 Multi-Tenant Security

**Branch Scoping Pattern**:
```csharp
// Apply in all queries
var query = Context.Employees.AsQueryable();

if (!CurrentUser.IsSystemAdmin && CurrentUser.BranchIds.Any())
{
    query = query.Where(e => CurrentUser.BranchIds.Contains(e.BranchId));
}

// Apply in all commands
if (!CurrentUser.IsSystemAdmin &&
    CurrentUser.BranchIds.Any() &&
    !CurrentUser.BranchIds.Contains(request.BranchId))
{
    return Result.Failure<long>("Access denied to this branch.");
}
```

**Branch Access Rules**:
- **System Admins**: Empty `BranchIds` list = access to all branches
- **Branch Users**: Non-empty `BranchIds` list = access only to those branches
- **Validation**: Every operation must validate branch access

### 10.2 Password Security (PBKDF2-SHA256)

**Password Hashing**:
```csharp
public interface IPasswordService
{
    (string Hash, string Salt) HashPassword(string password);
    bool VerifyPassword(string password, string hash, string salt);
}

// Implementation uses PBKDF2-SHA256 with 10,000 iterations
```

**Features**:
- 10,000 iterations (OWASP recommended minimum)
- SHA256 hash algorithm
- Unique salt per password
- 32-byte key length

### 10.3 Audit Logging

**Audit Trail Pattern**:
```csharp
// Create
entity.CreatedBy = CurrentUser.UserId ?? 0;
entity.CreatedAtUtc = DateTime.UtcNow;

// Update
entity.ModifiedBy = CurrentUser.UserId ?? 0;
entity.ModifiedAtUtc = DateTime.UtcNow;

// Soft Delete
entity.IsDeleted = true;
entity.DeletedBy = CurrentUser.UserId ?? 0;
entity.DeletedAtUtc = DateTime.UtcNow;
```

**Audit Logs**:
```csharp
var auditLog = new AuditLog
{
    ActorUserId = CurrentUser.UserId,
    Action = AuditAction.Login,
    EntityName = "User",
    EntityId = user.Id.ToString(),
    IpAddress = GetClientIpAddress(),
    UserAgent = GetUserAgent(),
    CreatedAtUtc = DateTime.UtcNow
};

Context.AuditLogs.Add(auditLog);
```

---

## 11. Best Practices

### 11.1 Naming Conventions

**Commands** (Imperative):
- `CreateEmployeeCommand`
- `UpdateEmployeeCommand`
- `DeleteEmployeeCommand`
- `ToggleEmployeeStatusCommand`
- `AssignEmployeeToShiftCommand`

**Queries** (Descriptive):
- `GetEmployeeByIdQuery`
- `GetEmployeesQuery`
- `GetUserSessionsQuery`
- `GetMonthlyReportQuery`

### 11.2 Error Handling

**Business Logic Errors** (Specific):
```csharp
if (existingEmployee != null)
    return Result.Failure<long>("Employee number already exists in this branch.");
```

**Security Errors** (Generic to prevent enumeration):
```csharp
if (user == null || !isPasswordValid)
    return Result.Failure<LoginResponse>("Invalid username or password.");
```

**Validation Errors** (FluentValidation):
```csharp
RuleFor(x => x.Email)
    .EmailAddress()
    .WithMessage("Email address must be in valid format");
```

### 11.3 Performance Optimization

**Eager Loading**:
```csharp
var user = await Context.Users
    .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
    .Include(u => u.UserBranchScopes).ThenInclude(ubs => ubs.Branch)
    .FirstOrDefaultAsync(u => u.Username == username);
```

**Projection**:
```csharp
.Select(e => new EmployeeDto { ... })
.ToListAsync();
```

**Pagination**:
```csharp
.Skip((page - 1) * pageSize)
.Take(pageSize)
```

### 11.4 Async/Await

**Always use async methods**:
```csharp
// ✅ Good
await Context.SaveChangesAsync(cancellationToken);

// ❌ Bad
Context.SaveChanges();
```

---

## 12. Development Guide

### 12.1 Adding a New Command

**Step 1**: Create command record
```csharp
// Employees/Commands/CreateEmployee/CreateEmployeeCommand.cs
public record CreateEmployeeCommand(...) : IRequest<Result<long>>;
```

**Step 2**: Create validator
```csharp
// Employees/Commands/CreateEmployee/CreateEmployeeCommandValidator.cs
public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty();
        // ... other rules
    }
}
```

**Step 3**: Create handler
```csharp
// Employees/Commands/CreateEmployee/CreateEmployeeCommandHandler.cs
public class CreateEmployeeCommandHandler
    : BaseHandler<CreateEmployeeCommand, Result<long>>
{
    public CreateEmployeeCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
        : base(context, currentUser) { }

    public override async Task<Result<long>> Handle(...)
    {
        // 1. Validate business rules
        // 2. Create entity
        // 3. Persist
        // 4. Return result
    }
}
```

**Step 4**: Use in controller
```csharp
[HttpPost]
public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeCommand command)
{
    var result = await _mediator.Send(command);

    if (result.IsFailure)
        return BadRequest(new { error = result.Error });

    return Ok(new { id = result.Value });
}
```

### 12.2 Adding a New Query

**Step 1**: Create query record
```csharp
// Employees/Queries/GetEmployees/GetEmployeesQuery.cs
public record GetEmployeesQuery(...) : IRequest<Result<PagedResult<EmployeeDto>>>;
```

**Step 2**: Create DTO
```csharp
// Employees/Queries/GetEmployees/EmployeeDto.cs
public class EmployeeDto
{
    public long Id { get; set; }
    public string FullName { get; set; }
    // ... other properties
}
```

**Step 3**: Create handler
```csharp
// Employees/Queries/GetEmployees/GetEmployeesQueryHandler.cs
public class GetEmployeesQueryHandler
    : BaseHandler<GetEmployeesQuery, Result<PagedResult<EmployeeDto>>>
{
    public override async Task<Result<PagedResult<EmployeeDto>>> Handle(...)
    {
        // 1. Build query with filters
        // 2. Project to DTO
        // 3. Paginate
        // 4. Return result
    }
}
```

---

## Summary

The Application Layer implements:

✅ **CQRS Architecture** - Clear separation of read/write operations
✅ **MediatR Pipeline** - Decoupled request handling
✅ **Result Pattern** - Functional error handling
✅ **FluentValidation** - Comprehensive input validation
✅ **Multi-Tenant Security** - Branch-scoped access control
✅ **Audit Logging** - Comprehensive change tracking
✅ **DTOs** - Lightweight data transfer with projection
✅ **BaseHandler** - Standardized handler pattern
✅ **Performance Optimization** - Efficient queries with pagination

**Next Steps**:
- Review [Infrastructure Layer Documentation](04-INFRASTRUCTURE-LAYER.md) for EF Core and services
- Review [API Layer Documentation](05-API-LAYER.md) for controllers and middleware
- Review [Domain Layer Documentation](02-DOMAIN-LAYER.md) for entities and business logic

---

**Document Version**: 1.0
**Last Updated**: November 3, 2025
**Maintained By**: Development Team
