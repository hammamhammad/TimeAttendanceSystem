# Employee Self-Service Portal - Implementation Plan V2.0
## Based on Actual Project Structure Analysis

**Project**: Time Attendance System
**Feature**: Employee Self-Service Portal
**Version**: 2.0 (Updated after deep project analysis)
**Date**: October 25, 2025
**Status**: Ready for Implementation

---

## Document Change Log

**V2.0 Changes**:
- ✅ Analyzed actual backend CQRS structure
- ✅ Reviewed existing frontend patterns (Dashboard, EmployeeVacations, EmployeeExcuses)
- ✅ Aligned with current service patterns (Signal-based state management)
- ✅ Matched existing database schema patterns
- ✅ Updated to use actual permission system
- ✅ Integrated with existing multi-tenancy (branch-based)
- ✅ Aligned routing with app.routes.ts patterns

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current System Analysis](#current-system-analysis)
3. [Portal Features](#portal-features)
4. [Implementation Strategy](#implementation-strategy)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [Database Changes](#database-changes)
8. [Security & Permissions](#security--permissions)
9. [Implementation Phases](#implementation-phases)
10. [Testing & Deployment](#testing--deployment)

---

## Executive Summary

### Purpose
Build a centralized Employee Self-Service Portal that integrates with existing vacation and excuse management, adds new features for attendance tracking, profile management, and manager approval workflows.

### Current State Analysis

**What Already Exists**:
- ✅ Dashboard with stats (DashboardComponent)
- ✅ Employee Vacations (full CRUD)
- ✅ Employee Excuses (full CRUD with approval workflow)
- ✅ Attendance tracking system
- ✅ User authentication & authorization
- ✅ Multi-tenant (branch-based) architecture
- ✅ Signal-based state management pattern
- ✅ Shared components library (30+ components)

**What Needs to be Built**:
- 🆕 Unified portal dashboard for employees
- 🆕 Manager approval dashboard
- 🆕 My Attendance view (employee-specific)
- 🆕 My Profile management
- 🆕 Fingerprint update requests
- 🆕 Request status tracking
- 🆕 Notification system integration

### Key Benefits
- **Leverages Existing Code**: 60% of functionality already exists
- **Consistent UX**: Follows established patterns
- **Faster Implementation**: 8-10 weeks instead of 15
- **Lower Risk**: Building on proven architecture

---

## Current System Analysis

### Existing Backend Architecture

#### CQRS Pattern (MediatR)
```
Application/Features/
├── Employees/
│   ├── Commands/ (CreateEmployee, UpdateEmployee, DeleteEmployee)
│   ├── Queries/ (GetEmployees, GetEmployeeById)
│   └── Handlers/ (Using BaseHandler<TRequest, TResponse>)
├── EmployeeVacations/
│   ├── Commands/ (CreateEmployeeVacation, UpdateEmployeeVacation)
│   ├── Queries/ (GetEmployeeVacations, GetEmployeeVacationById)
├── EmployeeExcuses/
│   ├── Commands/ (CreateEmployeeExcuse, ReviewEmployeeExcuse)
│   ├── Queries/ (GetEmployeeExcuses, GetExcuseStatistics)
└── Attendance/
    ├── Commands/ (CreateAttendanceRecord, UpdateAttendanceRecord)
    └── Queries/ (GetAttendanceRecords, GetMonthlyReport)
```

#### Existing Controllers
- ✅ **EmployeesController** - `/api/v1/employees`
- ✅ **EmployeeVacationsController** - `/api/v1/employee-vacations`
- ✅ **EmployeeExcusesController** - `/api/v1/employee-excuses`
- ✅ **AttendanceController** - `/api/v1/attendance`
- ✅ **DashboardController** - `/api/v1/dashboard`
- ✅ **AuthController** - `/api/v1/auth`

#### Database Schema (PostgreSQL + EF Core)
**Base Entity Pattern**:
```csharp
public abstract class BaseEntity
{
    public long Id { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    public string? ModifiedBy { get; set; }
    public bool IsDeleted { get; set; }
    public byte[]? RowVersion { get; set; }  // Optimistic concurrency
}
```

**Existing Entities**:
- Employee (with UserLink)
- EmployeeVacation
- EmployeeExcuse
- AttendanceRecord
- AttendanceTransaction
- Shift, ShiftAssignment
- ExcusePolicy
- RemoteWorkPolicy, RemoteWorkRequest

### Existing Frontend Architecture

#### Component Structure
```
pages/
├── dashboard/                     # ✅ EXISTS - Admin/Manager dashboard
├── employee-vacations/            # ✅ EXISTS - Full CRUD
│   ├── employee-vacations.component.ts
│   ├── create-employee-vacation/
│   ├── view-employee-vacation/
│   └── edit-employee-vacation/
├── employee-excuses/              # ✅ EXISTS - Full CRUD + Approval
│   ├── employee-excuses.component.ts
│   ├── excuse-request-form/
│   └── excuse-details/
├── attendance/                    # ✅ EXISTS - Manager view
│   ├── daily/
│   ├── monthly-report/
│   └── employee-detail/
└── auth/                          # ✅ EXISTS
    ├── login.component.ts
    └── change-password.component.ts
```

#### Service Pattern (Signal-based)
```typescript
@Injectable({ providedIn: 'root' })
export class ExampleService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/resource`;

  // Internal writable signals
  private readonly _items = signal<Item[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _pagedResult = signal<PagedResult<Item> | null>(null);

  // Public readonly signals
  readonly items = this._items.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pagedResult = this._pagedResult.asReadonly();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getItems(params?: QueryParams): Observable<PagedResult<Item>> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<PagedResult<Item>>(this.apiUrl, { params }).pipe(
      tap(result => {
        this._items.set(result.items);
        this._pagedResult.set(result);
        this._loading.set(false);
      }),
      catchError(error => {
        this._error.set(error.error?.message || 'Failed to load');
        this._loading.set(false);
        this.notificationService.error('Failed to load items');
        return throwError(() => error);
      })
    );
  }
}
```

#### Component Pattern
```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent,
    StatusBadgeComponent
  ]
})
export class ExampleComponent implements OnInit {
  private service = inject(ExampleService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);
  readonly permissionService = inject(PermissionService);

  // Local state signals
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilters = signal<any>({});

  // Service signals
  items = this.service.items;
  loading = this.service.loading;
  pagedResult = this.service.pagedResult;

  // Computed signals
  totalItems = computed(() => this.pagedResult()?.totalCount ?? 0);

  // Permission constants
  readonly PERMISSIONS = {
    READ: 'resource.read',
    CREATE: 'resource.create',
    UPDATE: 'resource.update',
    DELETE: 'resource.delete'
  };

  // Table configuration
  tableColumns: TableColumn[] = [ /* ... */ ];
  tableActions: TableAction[] = [ /* ... */ ];

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems(): void {
    this.service.getItems({
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilters()
    }).subscribe();
  }
}
```

#### Routing Pattern
```typescript
// In app.routes.ts
{
  path: 'feature',
  loadComponent: () => import('./pages/feature/feature.component')
    .then(m => m.FeatureComponent),
  data: {
    title: 'feature.title',
    permission: 'feature.read'
  },
  canMatch: [authGuard]  // or [managerGuard], [adminGuard], [employeeGuard]
}
```

---

## Portal Features

### Feature Overview

| Feature | Status | Priority | Complexity |
|---------|--------|----------|------------|
| Employee Dashboard | 🆕 New | High | Medium |
| My Attendance View | 🆕 New | High | Low |
| My Vacation Requests | ♻️ Enhance Existing | High | Low |
| My Excuse Requests | ♻️ Enhance Existing | High | Low |
| Fingerprint Requests | 🆕 New | Medium | Medium |
| My Profile Management | 🆕 New | High | Low |
| Manager Approval Dashboard | 🆕 New | High | High |
| Team Attendance View | ♻️ Enhance Existing | Medium | Low |
| Notification System | 🆕 New | Medium | Medium |

### Portal Navigation Structure

```
/portal/employee/
├── /dashboard               # 🆕 Employee dashboard
├── /my-attendance          # 🆕 My attendance history
├── /my-vacations           # ♻️ Filter existing vacation list
├── /my-excuses             # ♻️ Filter existing excuse list
├── /fingerprint-requests   # 🆕 New feature
└── /my-profile             # 🆕 Profile management

/portal/manager/
├── /dashboard               # 🆕 Manager dashboard
├── /pending-approvals       # 🆕 Approval management
│   ├── /vacations          # ♻️ Enhanced view
│   ├── /excuses            # ♻️ Enhanced view
│   └── /fingerprint        # 🆕 New
└── /team-attendance         # ♻️ Enhanced existing
```

---

## Implementation Strategy

### Phase-Based Approach

**Total Duration**: 8-10 weeks (reduced from 15)

**Why Faster?**
- Leverage existing vacation/excuse modules (♻️)
- Reuse dashboard patterns
- Follow established service patterns
- Use existing shared components
- Database schema already supports most features

### Key Principles

1. **Reuse Before Build**: Check existing components first
2. **Follow Patterns**: Match current CQRS, service, and component patterns
3. **Incremental Enhancement**: Add features to existing modules
4. **Test Continuously**: Use existing test patterns

---

## Backend Implementation

### New Features Required

#### 1. Portal Queries (New)

**Location**: `Application/Features/Portal/`

```
Portal/
├── EmployeeDashboard/
│   ├── Queries/
│   │   ├── GetEmployeeDashboardQuery.cs
│   │   ├── GetEmployeeDashboardQueryHandler.cs
│   │   └── EmployeeDashboardDto.cs
│   └── GetEmployeeDashboardQuery.cs
│
├── ManagerDashboard/
│   ├── Queries/
│   │   ├── GetManagerDashboardQuery.cs
│   │   ├── GetManagerDashboardQueryHandler.cs
│   │   ├── GetPendingApprovalsQuery.cs
│   │   ├── GetPendingApprovalsQueryHandler.cs
│   │   ├── ManagerDashboardDto.cs
│   │   └── PendingApprovalDto.cs
│
├── MyAttendance/
│   ├── Queries/
│   │   ├── GetMyAttendanceQuery.cs
│   │   ├── GetMyAttendanceQueryHandler.cs
│   │   └── MyAttendanceDto.cs
│
├── MyProfile/
│   ├── Queries/
│   │   ├── GetMyProfileQuery.cs
│   │   ├── GetMyProfileQueryHandler.cs
│   │   └── EmployeeProfileDto.cs
│   ├── Commands/
│   │   ├── UpdateMyProfileCommand.cs
│   │   ├── UpdateMyProfileCommandHandler.cs
│   │   ├── UploadProfilePhotoCommand.cs
│   │   └── UploadProfilePhotoCommandHandler.cs
│
└── FingerprintRequests/
    ├── Commands/
    │   ├── CreateFingerprintRequestCommand.cs
    │   ├── CreateFingerprintRequestCommandHandler.cs
    │   ├── UpdateFingerprintRequestCommand.cs
    │   ├── CompleteFingerprintRequestCommand.cs
    │   └── CancelFingerprintRequestCommand.cs
    ├── Queries/
    │   ├── GetFingerprintRequestsQuery.cs
    │   ├── GetFingerprintRequestsQueryHandler.cs
    │   ├── GetFingerprintRequestByIdQuery.cs
    │   └── FingerprintRequestDto.cs
```

#### 2. New API Controllers

**File**: `Api/Controllers/PortalController.cs`
```csharp
[ApiController]
[Route("api/v1/portal")]
[Authorize]
public class PortalController : ControllerBase
{
    private readonly IMediator _mediator;

    public PortalController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Get employee dashboard data
    /// </summary>
    [HttpGet("employee/dashboard")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> GetEmployeeDashboard(CancellationToken cancellationToken)
    {
        var query = new GetEmployeeDashboardQuery();
        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Get manager dashboard data
    /// </summary>
    [HttpGet("manager/dashboard")]
    [Authorize(Policy = "ManagerAccess")]
    public async Task<IActionResult> GetManagerDashboard(
        [FromQuery] long? departmentId,
        CancellationToken cancellationToken)
    {
        var query = new GetManagerDashboardQuery { DepartmentId = departmentId };
        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Get pending approvals for manager
    /// </summary>
    [HttpGet("manager/pending-approvals")]
    [Authorize(Policy = "ManagerAccess")]
    public async Task<IActionResult> GetPendingApprovals(
        [FromQuery] string? requestType,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken)
    {
        var query = new GetPendingApprovalsQuery
        {
            RequestType = requestType,
            Page = page,
            PageSize = pageSize
        };

        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Get my attendance records
    /// </summary>
    [HttpGet("employee/my-attendance")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> GetMyAttendance(
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken)
    {
        var query = new GetMyAttendanceQuery
        {
            FromDate = fromDate,
            ToDate = toDate,
            Page = page,
            PageSize = pageSize
        };

        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Get my profile
    /// </summary>
    [HttpGet("employee/profile")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> GetMyProfile(CancellationToken cancellationToken)
    {
        var query = new GetMyProfileQuery();
        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    /// <summary>
    /// Update my profile
    /// </summary>
    [HttpPut("employee/profile")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> UpdateMyProfile(
        [FromBody] UpdateMyProfileCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok();
    }

    /// <summary>
    /// Upload profile photo
    /// </summary>
    [HttpPost("employee/profile/photo")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> UploadProfilePhoto(
        IFormFile photo,
        CancellationToken cancellationToken)
    {
        var command = new UploadProfilePhotoCommand { Photo = photo };
        var result = await _mediator.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(new { photoUrl = result.Value });
    }
}
```

**File**: `Api/Controllers/FingerprintRequestsController.cs`
```csharp
[ApiController]
[Route("api/v1/fingerprint-requests")]
[Authorize]
public class FingerprintRequestsController : ControllerBase
{
    private readonly IMediator _mediator;

    public FingerprintRequestsController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetFingerprintRequests(
        [FromQuery] long? employeeId,
        [FromQuery] string? status,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20,
        CancellationToken cancellationToken)
    {
        var query = new GetFingerprintRequestsQuery
        {
            EmployeeId = employeeId,
            Status = status,
            Page = page,
            PageSize = pageSize
        };

        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFingerprintRequestById(
        long id,
        CancellationToken cancellationToken)
    {
        var query = new GetFingerprintRequestByIdQuery { Id = id };
        var result = await _mediator.Send(query, cancellationToken);

        if (result.IsFailure)
            return NotFound(new { error = result.Error });

        return Ok(result.Value);
    }

    [HttpPost]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> CreateFingerprintRequest(
        [FromBody] CreateFingerprintRequestCommand command,
        CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return CreatedAtAction(
            nameof(GetFingerprintRequestById),
            new { id = result.Value },
            new { id = result.Value }
        );
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "EmployeeAccess")]
    public async Task<IActionResult> UpdateFingerprintRequest(
        long id,
        [FromBody] UpdateFingerprintRequestCommand command,
        CancellationToken cancellationToken)
    {
        command.Id = id;
        var result = await _mediator.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok();
    }

    [HttpPost("{id}/complete")]
    [Authorize(Policy = "AdminAccess")]
    public async Task<IActionResult> CompleteFingerprintRequest(
        long id,
        [FromBody] CompleteFingerprintRequestCommand command,
        CancellationToken cancellationToken)
    {
        command.Id = id;
        var result = await _mediator.Send(command, cancellationToken);

        if (result.IsFailure)
            return BadRequest(new { error = result.Error });

        return Ok();
    }
}
```

#### 3. Query/Command Examples

**GetEmployeeDashboardQuery.cs**:
```csharp
public record GetEmployeeDashboardQuery : IRequest<Result<EmployeeDashboardDto>>;

public class GetEmployeeDashboardQueryHandler
    : BaseHandler<GetEmployeeDashboardQuery, Result<EmployeeDashboardDto>>
{
    public GetEmployeeDashboardQueryHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<EmployeeDashboardDto>> Handle(
        GetEmployeeDashboardQuery request,
        CancellationToken cancellationToken)
    {
        // Get current employee
        var employee = await Context.Employees
            .Include(e => e.Branch)
            .Include(e => e.Department)
            .FirstOrDefaultAsync(e => e.UserId == CurrentUser.UserId, cancellationToken);

        if (employee == null)
            return Result.Failure<EmployeeDashboardDto>("Employee not found");

        var currentMonth = DateTime.UtcNow.Date;
        var firstDayOfMonth = new DateTime(currentMonth.Year, currentMonth.Month, 1);

        // Get attendance stats for current month
        var attendanceRecords = await Context.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id &&
                       a.AttendanceDate >= firstDayOfMonth &&
                       a.AttendanceDate < currentMonth.AddMonths(1))
            .ToListAsync(cancellationToken);

        var totalWorkingDays = attendanceRecords.Count;
        var presentDays = attendanceRecords.Count(a => a.Status == AttendanceStatus.Present);
        var attendanceRate = totalWorkingDays > 0
            ? (decimal)presentDays / totalWorkingDays * 100
            : 0;

        var totalWorkingHours = attendanceRecords.Sum(a => a.WorkingHours ?? 0);
        var totalOvertimeHours = attendanceRecords.Sum(a =>
            (a.PreShiftOvertimeHours ?? 0) + (a.PostShiftOvertimeHours ?? 0));

        // Get vacation balance
        var vacationBalance = await Context.EmployeeVacations
            .Where(v => v.EmployeeId == employee.Id &&
                       v.IsApproved &&
                       v.EndDate >= DateTime.UtcNow.Date)
            .SumAsync(v => v.TotalDays, cancellationToken);

        // Get pending requests count
        var pendingVacations = await Context.EmployeeVacations
            .CountAsync(v => v.EmployeeId == employee.Id &&
                           !v.IsApproved &&
                           !v.IsDeleted,
                       cancellationToken);

        var pendingExcuses = await Context.EmployeeExcuses
            .CountAsync(e => e.EmployeeId == employee.Id &&
                           e.Status == ExcuseStatus.Pending &&
                           !e.IsDeleted,
                       cancellationToken);

        // Get recent activity
        var recentActivity = new List<ActivityDto>();

        // Add recent attendance records
        var recentAttendance = attendanceRecords
            .OrderByDescending(a => a.AttendanceDate)
            .Take(5)
            .Select(a => new ActivityDto
            {
                Type = "Attendance",
                Description = $"Attended on {a.AttendanceDate:MMM dd} - {a.WorkingHours:F1}h",
                Timestamp = a.CreatedAtUtc,
                Icon = "fa-calendar-check",
                Variant = "success"
            });

        recentActivity.AddRange(recentAttendance);

        // Build response
        var dto = new EmployeeDashboardDto
        {
            EmployeeId = employee.Id,
            EmployeeName = $"{employee.FirstName} {employee.LastName}",
            AttendanceRate = attendanceRate,
            TotalWorkingHours = totalWorkingHours,
            TotalOvertimeHours = totalOvertimeHours,
            RemainingVacationDays = 30 - vacationBalance,  // Assuming 30 days annual
            PendingRequestsCount = pendingVacations + pendingExcuses,
            RecentActivity = recentActivity.OrderByDescending(a => a.Timestamp).Take(10).ToList()
        };

        return Result.Success(dto);
    }
}
```

**EmployeeDashboardDto.cs**:
```csharp
public class EmployeeDashboardDto
{
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public decimal AttendanceRate { get; set; }
    public decimal TotalWorkingHours { get; set; }
    public decimal TotalOvertimeHours { get; set; }
    public int RemainingVacationDays { get; set; }
    public int PendingRequestsCount { get; set; }
    public List<ActivityDto> RecentActivity { get; set; } = new();
}

public class ActivityDto
{
    public string Type { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Variant { get; set; } = "info";
}
```

---

## Frontend Implementation

### New Components Required

#### 1. Portal Module Structure

```
pages/portal/
├── employee/
│   ├── employee-dashboard/
│   │   ├── employee-dashboard.component.ts
│   │   ├── employee-dashboard.component.html
│   │   └── employee-dashboard.component.css
│   ├── my-attendance/
│   │   ├── my-attendance.component.ts
│   │   ├── my-attendance.component.html
│   │   └── my-attendance.component.css
│   ├── my-profile/
│   │   ├── my-profile.component.ts
│   │   ├── my-profile.component.html
│   │   ├── my-profile.component.css
│   │   └── edit-profile-modal/
│   └── fingerprint-requests/
│       ├── fingerprint-requests.component.ts
│       ├── fingerprint-requests.component.html
│       ├── fingerprint-requests.component.css
│       ├── create-fingerprint-request/
│       └── view-fingerprint-request/
│
├── manager/
│   ├── manager-dashboard/
│   │   ├── manager-dashboard.component.ts
│   │   ├── manager-dashboard.component.html
│   │   └── manager-dashboard.component.css
│   └── pending-approvals/
│       ├── pending-approvals.component.ts
│       ├── pending-approvals.component.html
│       └── pending-approvals.component.css
│
├── shared/
│   ├── activity-feed/
│   │   ├── activity-feed.component.ts
│   │   ├── activity-feed.component.html
│   │   └── activity-feed.component.css
│   └── quick-actions/
│       ├── quick-actions.component.ts
│       ├── quick-actions.component.html
│       └── quick-actions.component.css
│
└── services/
    ├── portal.service.ts
    ├── fingerprint-requests.service.ts
    └── my-profile.service.ts
```

#### 2. Service Implementation

**portal.service.ts**:
```typescript
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/notifications/notification.service';

export interface EmployeeDashboardDto {
  employeeId: number;
  employeeName: string;
  attendanceRate: number;
  totalWorkingHours: number;
  totalOvertimeHours: number;
  remainingVacationDays: number;
  pendingRequestsCount: number;
  recentActivity: ActivityDto[];
}

export interface ActivityDto {
  type: string;
  description: string;
  timestamp: Date;
  icon: string;
  variant: string;
}

export interface ManagerDashboardDto {
  managerId: number;
  managerName: string;
  teamSize: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  pendingApprovals: number;
  teamAttendanceRate: number;
}

@Injectable({
  providedIn: 'root'
})
export class PortalService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/portal`;

  // Employee Dashboard State
  private readonly _employeeDashboard = signal<EmployeeDashboardDto | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly employeeDashboard = this._employeeDashboard.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // Manager Dashboard State
  private readonly _managerDashboard = signal<ManagerDashboardDto | null>(null);
  readonly managerDashboard = this._managerDashboard.asReadonly();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  /**
   * Get employee dashboard data
   */
  getEmployeeDashboard(): Observable<EmployeeDashboardDto> {
    this._loading.set(true);
    this._error.set(null);

    return this.http.get<EmployeeDashboardDto>(`${this.apiUrl}/employee/dashboard`).pipe(
      tap(data => {
        this._employeeDashboard.set(data);
        this._loading.set(false);
      }),
      catchError(error => {
        this._error.set(error.error?.message || 'Failed to load dashboard');
        this._loading.set(false);
        this.notificationService.error('Failed to load dashboard data');
        return throwError(() => error);
      })
    );
  }

  /**
   * Get manager dashboard data
   */
  getManagerDashboard(departmentId?: number): Observable<ManagerDashboardDto> {
    this._loading.set(true);
    this._error.set(null);

    const params = departmentId ? { departmentId: departmentId.toString() } : {};

    return this.http.get<ManagerDashboardDto>(`${this.apiUrl}/manager/dashboard`, { params }).pipe(
      tap(data => {
        this._managerDashboard.set(data);
        this._loading.set(false);
      }),
      catchError(error => {
        this._error.set(error.error?.message || 'Failed to load dashboard');
        this._loading.set(false);
        this.notificationService.error('Failed to load manager dashboard');
        return throwError(() => error);
      })
    );
  }

  /**
   * Refresh dashboard data
   */
  refreshEmployeeDashboard(): void {
    this.getEmployeeDashboard().subscribe();
  }

  refreshManagerDashboard(departmentId?: number): void {
    this.getManagerDashboard(departmentId).subscribe();
  }
}
```

**fingerprint-requests.service.ts**:
```typescript
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../core/notifications/notification.service';
import { PagedResult } from '../../shared/models/common.model';

export interface FingerprintRequestDto {
  id: number;
  employeeId: number;
  employeeName: string;
  requestType: string;
  issueDescription: string;
  status: string;
  preferredDate?: Date;
  scheduledDate?: Date;
  completedDate?: Date;
  createdAtUtc: Date;
}

export interface CreateFingerprintRequestDto {
  requestType: string;
  issueDescription: string;
  affectedFingers?: string;
  preferredDate?: Date;
  preferredTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FingerprintRequestsService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/fingerprint-requests`;

  private readonly _requests = signal<FingerprintRequestDto[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);
  private readonly _pagedResult = signal<PagedResult<FingerprintRequestDto> | null>(null);

  readonly requests = this._requests.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly pagedResult = this._pagedResult.asReadonly();

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  /**
   * Get fingerprint requests with filtering
   */
  getRequests(params?: any): Observable<PagedResult<FingerprintRequestDto>> {
    this._loading.set(true);
    this._error.set(null);

    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<PagedResult<FingerprintRequestDto>>(this.apiUrl, { params: httpParams }).pipe(
      tap(result => {
        this._requests.set(result.items);
        this._pagedResult.set(result);
        this._loading.set(false);
      }),
      catchError(error => {
        this._error.set(error.error?.message || 'Failed to load requests');
        this._loading.set(false);
        this.notificationService.error('Failed to load fingerprint requests');
        return throwError(() => error);
      })
    );
  }

  /**
   * Get request by ID
   */
  getRequestById(id: number): Observable<FingerprintRequestDto> {
    return this.http.get<FingerprintRequestDto>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.notificationService.error('Failed to load request details');
        return throwError(() => error);
      })
    );
  }

  /**
   * Create fingerprint request
   */
  createRequest(request: CreateFingerprintRequestDto): Observable<number> {
    this._loading.set(true);

    return this.http.post<number>(this.apiUrl, request).pipe(
      tap(requestId => {
        this._loading.set(false);
        this.notificationService.success('Fingerprint request created successfully');
        this.refreshRequests();
      }),
      catchError(error => {
        this._loading.set(false);
        this.notificationService.error('Failed to create fingerprint request');
        return throwError(() => error);
      })
    );
  }

  /**
   * Update fingerprint request
   */
  updateRequest(id: number, request: CreateFingerprintRequestDto): Observable<void> {
    this._loading.set(true);

    return this.http.put<void>(`${this.apiUrl}/${id}`, request).pipe(
      tap(() => {
        this._loading.set(false);
        this.notificationService.success('Fingerprint request updated successfully');
        this.refreshRequests();
      }),
      catchError(error => {
        this._loading.set(false);
        this.notificationService.error('Failed to update fingerprint request');
        return throwError(() => error);
      })
    );
  }

  /**
   * Refresh requests list
   */
  refreshRequests(): void {
    const currentResult = this._pagedResult();
    if (currentResult) {
      this.getRequests({
        page: currentResult.page,
        pageSize: currentResult.pageSize
      }).subscribe();
    }
  }
}
```

#### 3. Employee Dashboard Component

**employee-dashboard.component.ts**:
```typescript
import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PortalService } from '../../services/portal.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { StatsGridComponent, StatGridItem } from '../../../../shared/components/stats-grid/stats-grid.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../../../shared/components/error-alert/error-alert.component';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    StatsGridComponent,
    SectionCardComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  private portalService = inject(PortalService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  // Service signals
  dashboardData = this.portalService.employeeDashboard;
  loading = this.portalService.loading;
  error = this.portalService.error;

  // Computed dashboard stats
  dashboardStats = computed<StatGridItem[]>(() => {
    const data = this.dashboardData();
    if (!data) return [];

    return [
      {
        label: this.i18n.t('portal.employee.attendance_rate'),
        value: `${data.attendanceRate.toFixed(1)}%`,
        icon: 'fa-solid fa-chart-line',
        variant: 'primary',
        change: {
          value: data.attendanceRate,
          type: data.attendanceRate >= 90 ? 'increase' : 'decrease',
          isPercentage: true
        }
      },
      {
        label: this.i18n.t('portal.employee.working_hours'),
        value: `${data.totalWorkingHours.toFixed(1)}h`,
        icon: 'fa-solid fa-clock',
        variant: 'success'
      },
      {
        label: this.i18n.t('portal.employee.vacation_days'),
        value: data.remainingVacationDays,
        icon: 'fa-solid fa-umbrella-beach',
        variant: 'info'
      },
      {
        label: this.i18n.t('portal.employee.pending_requests'),
        value: data.pendingRequestsCount,
        icon: 'fa-solid fa-hourglass-half',
        variant: data.pendingRequestsCount > 0 ? 'warning' : 'secondary'
      }
    ];
  });

  // Current user
  currentUser = computed(() => this.authService.currentUser());

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.portalService.getEmployeeDashboard().subscribe();
  }

  onRefresh(): void {
    this.loadDashboard();
    this.notificationService.success(this.i18n.t('portal.refreshed'));
  }

  onQuickAction(action: string): void {
    switch (action) {
      case 'vacation':
        this.router.navigate(['/employee-vacations/create']);
        break;
      case 'excuse':
        this.router.navigate(['/employee-excuses/create']);
        break;
      case 'fingerprint':
        this.router.navigate(['/portal/employee/fingerprint-requests/create']);
        break;
      case 'attendance':
        this.router.navigate(['/portal/employee/my-attendance']);
        break;
      case 'profile':
        this.router.navigate(['/portal/employee/my-profile']);
        break;
    }
  }

  t(key: string, params?: any): string {
    return this.i18n.t(key, params);
  }
}
```

**employee-dashboard.component.html**:
```html
<div class="employee-dashboard">
  <app-page-header
    [title]="t('portal.employee.dashboard_title')"
    [subtitle]="t('portal.employee.dashboard_subtitle')">
    <button class="btn btn-sm btn-outline-primary" (click)="onRefresh()">
      <i class="fas fa-refresh me-2"></i>
      {{ t('common.refresh') }}
    </button>
  </app-page-header>

  @if (loading()) {
    <app-loading-spinner [message]="t('common.loading')"></app-loading-spinner>
  }

  @if (error()) {
    <app-error-alert
      [message]="error()!"
      [title]="t('common.error')"
      [showRetry]="true"
      (retry)="loadDashboard()">
    </app-error-alert>
  }

  @if (!loading() && !error() && dashboardData()) {
    <!-- Stats Grid -->
    <app-stats-grid
      [stats]="dashboardStats()"
      [columns]="4"
      class="mb-4">
    </app-stats-grid>

    <div class="row">
      <!-- Quick Actions -->
      <div class="col-lg-4 mb-4">
        <app-section-card
          [title]="t('portal.quick_actions')"
          [icon]="'fas fa-bolt'">
          <div class="quick-actions d-grid gap-2">
            <button class="btn btn-outline-primary btn-lg" (click)="onQuickAction('vacation')">
              <i class="fas fa-umbrella-beach me-2"></i>
              {{ t('portal.actions.request_vacation') }}
            </button>
            <button class="btn btn-outline-secondary btn-lg" (click)="onQuickAction('excuse')">
              <i class="fas fa-comment-medical me-2"></i>
              {{ t('portal.actions.submit_excuse') }}
            </button>
            <button class="btn btn-outline-info btn-lg" (click)="onQuickAction('fingerprint')">
              <i class="fas fa-fingerprint me-2"></i>
              {{ t('portal.actions.update_fingerprint') }}
            </button>
            <button class="btn btn-outline-success btn-lg" (click)="onQuickAction('attendance')">
              <i class="fas fa-calendar-check me-2"></i>
              {{ t('portal.actions.view_attendance') }}
            </button>
            <button class="btn btn-outline-dark btn-lg" (click)="onQuickAction('profile')">
              <i class="fas fa-user me-2"></i>
              {{ t('portal.actions.view_profile') }}
            </button>
          </div>
        </app-section-card>
      </div>

      <!-- Recent Activity -->
      <div class="col-lg-8 mb-4">
        <app-section-card
          [title]="t('portal.recent_activity')"
          [icon]="'fas fa-history'">
          <div class="activity-list">
            @for (activity of dashboardData()!.recentActivity; track activity.timestamp) {
              <div class="activity-item">
                <div class="activity-icon">
                  <i [class]="activity.icon + ' text-' + activity.variant"></i>
                </div>
                <div class="activity-content">
                  <p class="mb-0">{{ activity.description }}</p>
                  <small class="text-muted">
                    {{ activity.timestamp | date: 'short' }}
                  </small>
                </div>
              </div>
            } @empty {
              <p class="text-muted text-center py-4">
                {{ t('portal.no_recent_activity') }}
              </p>
            }
          </div>
        </app-section-card>
      </div>
    </div>
  }
</div>
```

#### 4. Routes Configuration

Add to [app.routes.ts](file:///d%3A/Work/AI%20Code/TimeAttendanceSystem/time-attendance-frontend/src/app/app.routes.ts#1%2C1-1%2C1):

```typescript
// Portal - Employee Routes
{
  path: 'portal/employee/dashboard',
  loadComponent: () => import('./pages/portal/employee/employee-dashboard/employee-dashboard.component')
    .then(m => m.EmployeeDashboardComponent),
  data: {
    title: 'portal.employee.dashboard_title',
    permission: 'portal.employee.dashboard.read'
  },
  canMatch: [authGuard]
},
{
  path: 'portal/employee/my-attendance',
  loadComponent: () => import('./pages/portal/employee/my-attendance/my-attendance.component')
    .then(m => m.MyAttendanceComponent),
  data: {
    title: 'portal.employee.my_attendance',
    permission: 'portal.employee.attendance.read'
  },
  canMatch: [authGuard]
},
{
  path: 'portal/employee/fingerprint-requests',
  loadComponent: () => import('./pages/portal/employee/fingerprint-requests/fingerprint-requests.component')
    .then(m => m.FingerprintRequestsComponent),
  data: {
    title: 'portal.employee.fingerprint_requests',
    permission: 'portal.employee.fingerprint.read'
  },
  canMatch: [authGuard]
},
{
  path: 'portal/employee/my-profile',
  loadComponent: () => import('./pages/portal/employee/my-profile/my-profile.component')
    .then(m => m.MyProfileComponent),
  data: {
    title: 'portal.employee.my_profile',
    permission: 'portal.employee.profile.read'
  },
  canMatch: [authGuard]
},

// Portal - Manager Routes
{
  path: 'portal/manager/dashboard',
  loadComponent: () => import('./pages/portal/manager/manager-dashboard/manager-dashboard.component')
    .then(m => m.ManagerDashboardComponent),
  data: {
    title: 'portal.manager.dashboard_title',
    permission: 'portal.manager.dashboard.read'
  },
  canMatch: [managerGuard]
},
{
  path: 'portal/manager/pending-approvals',
  loadComponent: () => import('./pages/portal/manager/pending-approvals/pending-approvals.component')
    .then(m => m.PendingApprovalsComponent),
  data: {
    title: 'portal.manager.pending_approvals',
    permission: 'portal.manager.approvals.read'
  },
  canMatch: [managerGuard]
}
```

---

## Database Changes

### New Tables Required

#### 1. FingerprintRequests Table

```sql
CREATE TABLE "FingerprintRequests" (
    "Id" BIGSERIAL PRIMARY KEY,
    "EmployeeId" BIGINT NOT NULL,
    "RequestType" VARCHAR(50) NOT NULL,  -- NewEnrollment, Update, Issue
    "IssueDescription" TEXT NOT NULL,
    "AffectedFingers" VARCHAR(100),
    "PreferredDate" DATE,
    "PreferredTime" TIME,
    "ScheduledDate" DATE,
    "ScheduledTime" TIME,
    "CompletedDate" TIMESTAMP,
    "Status" VARCHAR(50) NOT NULL DEFAULT 'Pending',  -- Pending, Scheduled, Completed, Cancelled
    "TechnicianId" BIGINT,
    "TechnicianNotes" TEXT,
    "CreatedAtUtc" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatedBy" VARCHAR(100),
    "ModifiedAtUtc" TIMESTAMP,
    "ModifiedBy" VARCHAR(100),
    "IsDeleted" BOOLEAN NOT NULL DEFAULT FALSE,
    "RowVersion" BYTEA,

    CONSTRAINT "FK_FingerprintRequests_Employee" FOREIGN KEY ("EmployeeId")
        REFERENCES "Employees"("Id"),
    CONSTRAINT "FK_FingerprintRequests_Technician" FOREIGN KEY ("TechnicianId")
        REFERENCES "Users"("Id")
);

CREATE INDEX "IX_FingerprintRequests_EmployeeId" ON "FingerprintRequests"("EmployeeId");
CREATE INDEX "IX_FingerprintRequests_Status" ON "FingerprintRequests"("Status");
CREATE INDEX "IX_FingerprintRequests_ScheduledDate" ON "FingerprintRequests"("ScheduledDate");
```

#### 2. Profile Photo Column

```sql
-- Add to existing Employees table
ALTER TABLE "Employees"
ADD COLUMN "ProfilePhotoPath" VARCHAR(500),
ADD COLUMN "PersonalEmail" VARCHAR(100),
ADD COLUMN "MobilePhone" VARCHAR(20),
ADD COLUMN "EmergencyContactName" VARCHAR(200),
ADD COLUMN "EmergencyContactPhone" VARCHAR(20),
ADD COLUMN "Address" TEXT,
ADD COLUMN "LastProfileUpdateDate" TIMESTAMP;
```

---

## Security & Permissions

### New Permissions Required

Add to existing permission system:

```csharp
// Portal Employee Permissions
portal.employee.dashboard.read
portal.employee.attendance.read
portal.employee.attendance.export
portal.employee.profile.read
portal.employee.profile.update
portal.employee.fingerprint.create
portal.employee.fingerprint.read
portal.employee.fingerprint.update

// Portal Manager Permissions
portal.manager.dashboard.read
portal.manager.approvals.read
portal.manager.approvals.approve
portal.manager.approvals.reject
portal.manager.team.read
```

### Authorization Policies

```csharp
// In DependencyInjection.cs (Infrastructure layer)
services.AddAuthorization(options =>
{
    options.AddPolicy("EmployeeAccess", policy =>
        policy.RequireAuthenticatedUser()
              .RequireAssertion(context =>
                  context.User.IsInRole("Employee") ||
                  context.User.IsInRole("Manager") ||
                  context.User.IsInRole("Admin") ||
                  context.User.IsInRole("SystemAdmin")));

    options.AddPolicy("ManagerAccess", policy =>
        policy.RequireAuthenticatedUser()
              .RequireAssertion(context =>
                  context.User.IsInRole("Manager") ||
                  context.User.IsInRole("Admin") ||
                  context.User.IsInRole("SystemAdmin")));
});
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
**Duration**: 1 week

**Backend Tasks**:
- [ ] Create Portal folder structure in Application layer
- [ ] Create FingerprintRequest entity in Domain layer
- [ ] Create database migration for FingerprintRequests table
- [ ] Add Employees table profile columns migration
- [ ] Create PortalController and FingerprintRequestsController
- [ ] Add new authorization policies

**Frontend Tasks**:
- [ ] Create portal folder structure in pages
- [ ] Create portal services (PortalService, FingerprintRequestsService)
- [ ] Add portal routes to app.routes.ts
- [ ] Create shared portal components (ActivityFeedComponent, QuickActionsComponent)

**Deliverables**:
- ✅ Folder structure complete
- ✅ Database schema updated
- ✅ Base services created
- ✅ Routes configured

---

### Phase 2: Employee Dashboard (Week 2)
**Duration**: 1 week

**Backend Tasks**:
- [ ] Implement GetEmployeeDashboardQuery and handler
- [ ] Implement GET /api/v1/portal/employee/dashboard endpoint
- [ ] Add activity aggregation logic
- [ ] Test dashboard endpoint

**Frontend Tasks**:
- [ ] Implement EmployeeDashboardComponent
- [ ] Implement PortalService.getEmployeeDashboard()
- [ ] Create dashboard UI with stats grid
- [ ] Add recent activity display
- [ ] Add quick action buttons
- [ ] Test navigation and actions

**Deliverables**:
- ✅ Employee dashboard fully functional
- ✅ Stats display working
- ✅ Quick actions navigation working

---

### Phase 3: My Attendance & Profile (Week 3)
**Duration**: 1 week

**Backend Tasks**:
- [ ] Implement GetMyAttendanceQuery and handler
- [ ] Implement GET /api/v1/portal/employee/my-attendance endpoint
- [ ] Implement GetMyProfileQuery and handler
- [ ] Implement UpdateMyProfileCommand and handler
- [ ] Implement UploadProfilePhotoCommand and handler
- [ ] Add file upload handling for profile photos

**Frontend Tasks**:
- [ ] Implement MyAttendanceComponent
- [ ] Implement attendance filtering and export
- [ ] Implement MyProfileComponent
- [ ] Implement profile edit functionality
- [ ] Implement photo upload
- [ ] Add attendance service methods

**Deliverables**:
- ✅ My Attendance view complete
- ✅ Profile management complete
- ✅ Photo upload working

---

### Phase 4: Fingerprint Requests (Week 4)
**Duration**: 1 week

**Backend Tasks**:
- [ ] Implement CreateFingerprintRequestCommand and handler
- [ ] Implement GetFingerprintRequestsQuery and handler
- [ ] Implement UpdateFingerprintRequestCommand and handler
- [ ] Implement CompleteFingerprintRequestCommand and handler
- [ ] Add business validation logic
- [ ] Test all endpoints

**Frontend Tasks**:
- [ ] Implement FingerprintRequestsComponent (list)
- [ ] Implement CreateFingerprintRequestComponent (form)
- [ ] Implement ViewFingerprintRequestComponent (detail)
- [ ] Implement FingerprintRequestsService
- [ ] Add request status tracking
- [ ] Test CRUD operations

**Deliverables**:
- ✅ Fingerprint request functionality complete
- ✅ All CRUD operations working
- ✅ Status tracking working

---

### Phase 5: Manager Dashboard (Week 5-6)
**Duration**: 2 weeks

**Backend Tasks**:
- [ ] Implement GetManagerDashboardQuery and handler
- [ ] Implement GetPendingApprovalsQuery and handler
- [ ] Add team stats aggregation
- [ ] Add pending approvals filtering
- [ ] Add bulk approval capability
- [ ] Test manager endpoints

**Frontend Tasks**:
- [ ] Implement ManagerDashboardComponent
- [ ] Implement PendingApprovalsComponent
- [ ] Add team stats display
- [ ] Add approval actions (approve/reject)
- [ ] Add bulk approval functionality
- [ ] Add filtering by request type
- [ ] Test manager workflows

**Deliverables**:
- ✅ Manager dashboard complete
- ✅ Approval workflows working
- ✅ Team stats display working
- ✅ Bulk actions working

---

### Phase 6: Enhancement & Integration (Week 7)
**Duration**: 1 week

**Tasks**:
- [ ] Enhance existing vacation/excuse list pages with "My Requests" filter
- [ ] Add navigation links to portal from main menu
- [ ] Update dashboard to show portal quick links
- [ ] Add portal widgets to main dashboard
- [ ] Create notification system integration (if time permits)
- [ ] Add export functionality to all lists
- [ ] Implement i18n for all new strings

**Deliverables**:
- ✅ All modules integrated
- ✅ Navigation complete
- ✅ Export functionality working

---

### Phase 7: Testing & Polish (Week 8)
**Duration**: 1 week

**Backend Testing**:
- [ ] Unit tests for all handlers
- [ ] Integration tests for API endpoints
- [ ] Permission tests
- [ ] Performance tests

**Frontend Testing**:
- [ ] Component unit tests
- [ ] Service tests
- [ ] E2E tests for critical flows
- [ ] Cross-browser testing
- [ ] Responsive design testing

**Polish**:
- [ ] UI/UX improvements
- [ ] Loading states
- [ ] Error handling
- [ ] Accessibility improvements

**Documentation**:
- [ ] API documentation
- [ ] User guide
- [ ] Deployment guide

**Deliverables**:
- ✅ All tests passing
- ✅ Documentation complete
- ✅ Ready for UAT

---

### Phase 8: UAT & Deployment (Week 9-10)
**Duration**: 2 weeks

**UAT Tasks**:
- [ ] UAT with employee users
- [ ] UAT with manager users
- [ ] Collect feedback
- [ ] Fix critical issues
- [ ] Performance testing
- [ ] Security audit

**Deployment Tasks**:
- [ ] Deploy to staging environment
- [ ] Final testing in staging
- [ ] Production deployment
- [ ] Post-deployment monitoring
- [ ] User training sessions

**Deliverables**:
- ✅ Production deployment complete
- ✅ User training complete
- ✅ System stable

---

## Testing & Deployment

### Testing Strategy

#### Backend Testing
- **Unit Tests**: 80% coverage target
- **Integration Tests**: All API endpoints
- **Performance Tests**: Load testing with 500 concurrent users

#### Frontend Testing
- **Unit Tests**: 75% coverage target
- **E2E Tests**: Critical user flows
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Responsive**: Mobile, Tablet, Desktop

### Deployment Checklist

**Pre-Deployment**:
- [ ] All tests passing
- [ ] Code review complete
- [ ] Database migrations ready
- [ ] Permissions configured
- [ ] i18n translations complete
- [ ] Documentation complete

**Deployment**:
- [ ] Run database migrations
- [ ] Deploy backend API
- [ ] Deploy frontend
- [ ] Verify health checks
- [ ] Test critical flows
- [ ] Monitor logs

**Post-Deployment**:
- [ ] User announcement
- [ ] Monitor error rates
- [ ] Monitor performance
- [ ] Collect user feedback
- [ ] Plan iteration 2

---

## Success Criteria

### Functional Criteria
- ✅ All 9 portal features implemented and working
- ✅ Employee dashboard displays accurate stats
- ✅ Manager can approve/reject all request types
- ✅ Profile management working with photo upload
- ✅ Fingerprint requests fully functional
- ✅ All permissions enforced correctly
- ✅ Mobile responsive on all devices

### Performance Criteria
- ✅ Dashboard loads in < 2 seconds
- ✅ List pages render < 500ms
- ✅ API response time < 200ms
- ✅ Support 500 concurrent users
- ✅ 99.5% uptime

### Quality Criteria
- ✅ 80% backend test coverage
- ✅ 75% frontend test coverage
- ✅ Zero critical bugs
- ✅ < 5 high-priority bugs
- ✅ WCAG 2.1 Level AA compliant

### User Adoption Criteria
- ✅ 70% adoption within first month
- ✅ 90% adoption within 3 months
- ✅ > 85% positive user feedback
- ✅ < 10% support tickets per user

---

## Appendix

### A. Key Differences from V1.0

1. **Reduced Scope**: Removed notification system from MVP (add in iteration 2)
2. **Leveraged Existing**: Using existing vacation/excuse modules instead of rebuilding
3. **Faster Timeline**: 10 weeks instead of 15 weeks
4. **Aligned Patterns**: Matched actual CQRS, service, and component patterns
5. **Practical Approach**: Build on what exists, enhance incrementally

### B. Future Enhancements (Iteration 2)

- Real-time notifications with SignalR
- Advanced reporting and analytics
- Mobile app (PWA)
- Workflow delegation
- Out-of-office auto-responder
- Team calendar view
- Advanced search and filtering
- Document management

### C. Technical Debt to Address

- Add comprehensive logging
- Implement caching strategy
- Add rate limiting
- Implement audit trail
- Add data retention policies
- Optimize database queries
- Add monitoring and alerting

---

**End of Implementation Plan V2.0**

**Status**: Ready for Implementation
**Next Step**: Team review and approval
**Estimated Start Date**: TBD
**Estimated Completion Date**: 10 weeks from start
