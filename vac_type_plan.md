# Vacation Types Management Module - Implementation Plan

## Overview
This document provides a comprehensive implementation plan for the **Vacation Types Management** module following the established patterns in the Time Attendance System. The module will be part of the Settings section and will provide complete CRUD operations with role-based security.

## Architecture Alignment
Following the PROJECT_ARCHITECTURE.md guidelines:
- **Backend**: Clean Architecture with .NET 9, CQRS with MediatR
- **Frontend**: Angular 18 with standalone components and signals
- **Database**: Entity Framework Core 9.0 with Code-First approach
- **Security**: Role-based access control with granular permissions

---

## Phase 1: Backend Implementation

### 1.1 Domain Layer

#### Create Domain Entity
**File**: `src/Domain/TimeAttendanceSystem.Domain/VacationTypes/VacationType.cs`

```csharp
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Branches;

namespace TimeAttendanceSystem.Domain.VacationTypes;

/// <summary>
/// Domain entity representing a vacation type configuration within the organization.
/// Manages vacation policies, accrual rules, and business logic for employee time-off management.
/// </summary>
public class VacationType : BaseEntity
{
    public long BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public int DefaultDaysPerYear { get; set; }
    public int MaxDaysPerRequest { get; set; }
    public int MinDaysNotice { get; set; }
    public bool RequiresApproval { get; set; } = true;
    public bool IsPaid { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public VacationAccrualType AccrualType { get; set; } = VacationAccrualType.Annual;
    public decimal AccrualRate { get; set; }
    public bool CarryoverAllowed { get; set; } = false;
    public int? MaxCarryoverDays { get; set; }
    public DateTime? CarryoverExpiryDate { get; set; }
    public string? Color { get; set; } // For calendar display

    // Navigation Properties
    public Branch Branch { get; set; } = null!;

    // Business Logic Methods
    public Result ValidateConfiguration()
    {
        if (DefaultDaysPerYear <= 0)
            return Result.Failure("Default days per year must be greater than zero");

        if (MaxDaysPerRequest > DefaultDaysPerYear)
            return Result.Failure("Maximum days per request cannot exceed default days per year");

        if (CarryoverAllowed && MaxCarryoverDays <= 0)
            return Result.Failure("Maximum carryover days must be specified when carryover is allowed");

        return Result.Success();
    }

    public Result CanBeDeleted()
    {
        // Add logic to check if vacation type is in use
        return Result.Success();
    }
}

public enum VacationAccrualType
{
    Annual,
    Monthly,
    ProRata,
    Fixed
}
```

### 1.2 Infrastructure Layer

#### Entity Configuration
**File**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Configurations/VacationTypeConfiguration.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Configurations;

public class VacationTypeConfiguration : IEntityTypeConfiguration<VacationType>
{
    public void Configure(EntityTypeBuilder<VacationType> builder)
    {
        builder.ToTable("VacationTypes");

        builder.HasKey(vt => vt.Id);

        builder.Property(vt => vt.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(vt => vt.NameAr)
            .HasMaxLength(100);

        builder.Property(vt => vt.Description)
            .HasMaxLength(500);

        builder.Property(vt => vt.DescriptionAr)
            .HasMaxLength(500);

        builder.Property(vt => vt.Color)
            .HasMaxLength(7); // For hex color codes

        builder.Property(vt => vt.AccrualType)
            .HasConversion<string>()
            .HasMaxLength(20);

        builder.Property(vt => vt.AccrualRate)
            .HasColumnType("decimal(5,2)");

        // Relationships
        builder.HasOne(vt => vt.Branch)
            .WithMany()
            .HasForeignKey(vt => vt.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

        // Indexes
        builder.HasIndex(vt => new { vt.BranchId, vt.Name })
            .IsUnique()
            .HasFilter("IsDeleted = 0");

        builder.HasIndex(vt => vt.IsActive);

        // Query Filter for soft delete
        builder.HasQueryFilter(vt => !vt.IsDeleted);
    }
}
```

#### Update DbContext
**File**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/TimeAttendanceDbContext.cs`
- Add: `public DbSet<VacationType> VacationTypes => Set<VacationType>();`

### 1.3 Application Layer

#### Commands

**File**: `src/Application/TimeAttendanceSystem.Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommand.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.VacationTypes;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;

public record CreateVacationTypeCommand(
    long BranchId,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    int DefaultDaysPerYear,
    int MaxDaysPerRequest,
    int MinDaysNotice,
    bool RequiresApproval,
    bool IsPaid,
    VacationAccrualType AccrualType,
    decimal AccrualRate,
    bool CarryoverAllowed,
    int? MaxCarryoverDays,
    DateTime? CarryoverExpiryDate,
    string? Color
) : IRequest<Result<long>>;
```

**File**: `src/Application/TimeAttendanceSystem.Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommandHandler.cs`

```csharp
using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.VacationTypes;
using TimeAttendanceSystem.Infrastructure.Persistence;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;

public class CreateVacationTypeCommandHandler : IRequestHandler<CreateVacationTypeCommand, Result<long>>
{
    private readonly TimeAttendanceDbContext _context;

    public CreateVacationTypeCommandHandler(TimeAttendanceDbContext context)
    {
        _context = context;
    }

    public async Task<Result<long>> Handle(CreateVacationTypeCommand request, CancellationToken cancellationToken)
    {
        // Check for duplicate name within branch
        var existingType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.BranchId == request.BranchId &&
                                     vt.Name.ToLower() == request.Name.ToLower(),
                                cancellationToken);

        if (existingType != null)
            return Result.Failure<long>("Vacation type with this name already exists in the branch");

        var vacationType = new VacationType
        {
            BranchId = request.BranchId,
            Name = request.Name,
            NameAr = request.NameAr,
            Description = request.Description,
            DescriptionAr = request.DescriptionAr,
            DefaultDaysPerYear = request.DefaultDaysPerYear,
            MaxDaysPerRequest = request.MaxDaysPerRequest,
            MinDaysNotice = request.MinDaysNotice,
            RequiresApproval = request.RequiresApproval,
            IsPaid = request.IsPaid,
            AccrualType = request.AccrualType,
            AccrualRate = request.AccrualRate,
            CarryoverAllowed = request.CarryoverAllowed,
            MaxCarryoverDays = request.MaxCarryoverDays,
            CarryoverExpiryDate = request.CarryoverExpiryDate,
            Color = request.Color,
            IsActive = true
        };

        var validationResult = vacationType.ValidateConfiguration();
        if (validationResult.IsFailure)
            return Result.Failure<long>(validationResult.Error);

        _context.VacationTypes.Add(vacationType);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(vacationType.Id);
    }
}
```

**File**: `src/Application/TimeAttendanceSystem.Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommandValidator.cs`

```csharp
using FluentValidation;

namespace TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;

public class CreateVacationTypeCommandValidator : AbstractValidator<CreateVacationTypeCommand>
{
    public CreateVacationTypeCommandValidator()
    {
        RuleFor(x => x.BranchId)
            .GreaterThan(0).WithMessage("Branch ID is required");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters");

        RuleFor(x => x.NameAr)
            .MaximumLength(100).WithMessage("Arabic name must not exceed 100 characters");

        RuleFor(x => x.DefaultDaysPerYear)
            .GreaterThan(0).WithMessage("Default days per year must be greater than zero")
            .LessThanOrEqualTo(365).WithMessage("Default days cannot exceed 365");

        RuleFor(x => x.MaxDaysPerRequest)
            .GreaterThan(0).WithMessage("Maximum days per request must be greater than zero")
            .LessThanOrEqualTo(x => x.DefaultDaysPerYear)
            .WithMessage("Maximum days per request cannot exceed default days per year");

        RuleFor(x => x.MinDaysNotice)
            .GreaterThanOrEqualTo(0).WithMessage("Minimum days notice cannot be negative");

        RuleFor(x => x.AccrualRate)
            .GreaterThanOrEqualTo(0).WithMessage("Accrual rate cannot be negative");

        RuleFor(x => x.MaxCarryoverDays)
            .GreaterThan(0)
            .When(x => x.CarryoverAllowed)
            .WithMessage("Maximum carryover days must be specified when carryover is allowed");

        RuleFor(x => x.Color)
            .Matches(@"^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
            .When(x => !string.IsNullOrEmpty(x.Color))
            .WithMessage("Color must be a valid hex color code");
    }
}
```

#### Similar implementation for:
- `UpdateVacationTypeCommand` and handler
- `DeleteVacationTypeCommand` and handler
- `ToggleVacationTypeStatusCommand` and handler

#### Queries

**File**: `src/Application/TimeAttendanceSystem.Application/VacationTypes/Queries/GetVacationTypes/GetVacationTypesQuery.cs`

```csharp
using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Common.Models;

namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;

public record GetVacationTypesQuery(
    int Page = 1,
    int PageSize = 10,
    long? BranchId = null,
    string? SearchTerm = null,
    bool? IsActive = null
) : IRequest<Result<PagedResult<VacationTypeDto>>>;
```

**File**: `src/Application/TimeAttendanceSystem.Application/VacationTypes/Queries/GetVacationTypes/VacationTypeDto.cs`

```csharp
namespace TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;

public class VacationTypeDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public int DefaultDaysPerYear { get; set; }
    public int MaxDaysPerRequest { get; set; }
    public int MinDaysNotice { get; set; }
    public bool RequiresApproval { get; set; }
    public bool IsPaid { get; set; }
    public bool IsActive { get; set; }
    public string AccrualType { get; set; } = string.Empty;
    public decimal AccrualRate { get; set; }
    public bool CarryoverAllowed { get; set; }
    public int? MaxCarryoverDays { get; set; }
    public DateTime? CarryoverExpiryDate { get; set; }
    public string? Color { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
```

### 1.4 API Controller

**File**: `src/Api/TimeAttendanceSystem.Api/Controllers/VacationTypesController.cs`

```csharp
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.VacationTypes.Commands.CreateVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.UpdateVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.DeleteVacationType;
using TimeAttendanceSystem.Application.VacationTypes.Commands.ToggleVacationTypeStatus;
using TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypes;
using TimeAttendanceSystem.Application.VacationTypes.Queries.GetVacationTypeById;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// REST API controller for vacation type management operations.
/// </summary>
[ApiController]
[Route("api/v1/vacation-types")]
[Authorize]
public class VacationTypesController : ControllerBase
{
    private readonly IMediator _mediator;

    public VacationTypesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    /// <summary>
    /// Retrieves a paginated list of vacation types with filtering.
    /// </summary>
    [HttpGet]
    [HasPermission("vacationType", "read")]
    public async Task<ActionResult<PagedResult<VacationTypeDto>>> GetVacationTypes(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] long? branchId = null,
        [FromQuery] string? searchTerm = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetVacationTypesQuery(page, pageSize, branchId, searchTerm, isActive);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a single vacation type by ID.
    /// </summary>
    [HttpGet("{id}")]
    [HasPermission("vacationType", "read")]
    public async Task<ActionResult<VacationTypeDto>> GetVacationType(long id)
    {
        var query = new GetVacationTypeByIdQuery(id);
        var result = await _mediator.Send(query);

        if (result.IsFailure)
            return NotFound(result.Error);

        return Ok(result.Value);
    }

    /// <summary>
    /// Creates a new vacation type.
    /// </summary>
    [HttpPost]
    [HasPermission("vacationType", "create")]
    public async Task<ActionResult<long>> CreateVacationType([FromBody] CreateVacationTypeCommand command)
    {
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return CreatedAtAction(nameof(GetVacationType), new { id = result.Value }, result.Value);
    }

    /// <summary>
    /// Updates an existing vacation type.
    /// </summary>
    [HttpPut("{id}")]
    [HasPermission("vacationType", "update")]
    public async Task<ActionResult> UpdateVacationType(long id, [FromBody] UpdateVacationTypeCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch");

        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return NoContent();
    }

    /// <summary>
    /// Deletes a vacation type (soft delete).
    /// </summary>
    [HttpDelete("{id}")]
    [HasPermission("vacationType", "delete")]
    public async Task<ActionResult> DeleteVacationType(long id)
    {
        var command = new DeleteVacationTypeCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return NoContent();
    }

    /// <summary>
    /// Toggles the active status of a vacation type.
    /// </summary>
    [HttpPatch("{id}/toggle-status")]
    [HasPermission("vacationType", "update")]
    public async Task<ActionResult> ToggleVacationTypeStatus(long id)
    {
        var command = new ToggleVacationTypeStatusCommand(id);
        var result = await _mediator.Send(command);

        if (result.IsFailure)
            return BadRequest(result.Error);

        return NoContent();
    }
}
```

### 1.5 Permission Attribute

**File**: `src/Api/TimeAttendanceSystem.Api/Attributes/HasPermissionAttribute.cs`
- Add support for "vacationType" resource if not already present

---

## Phase 2: Frontend Implementation

### 2.1 Model Definition

**File**: `time-attendance-frontend/src/app/shared/models/vacation-type.model.ts`

```typescript
export interface VacationType {
  id: number;
  branchId: number;
  branchName?: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  defaultDaysPerYear: number;
  maxDaysPerRequest: number;
  minDaysNotice: number;
  requiresApproval: boolean;
  isPaid: boolean;
  isActive: boolean;
  accrualType: VacationAccrualType;
  accrualRate: number;
  carryoverAllowed: boolean;
  maxCarryoverDays?: number;
  carryoverExpiryDate?: Date;
  color?: string;
  createdAtUtc: Date;
}

export enum VacationAccrualType {
  Annual = 'Annual',
  Monthly = 'Monthly',
  ProRata = 'ProRata',
  Fixed = 'Fixed'
}

export interface VacationTypeFilter {
  branchId?: number;
  searchTerm?: string;
  isActive?: boolean;
}

export interface CreateVacationTypeDto {
  branchId: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  defaultDaysPerYear: number;
  maxDaysPerRequest: number;
  minDaysNotice: number;
  requiresApproval: boolean;
  isPaid: boolean;
  accrualType: VacationAccrualType;
  accrualRate: number;
  carryoverAllowed: boolean;
  maxCarryoverDays?: number;
  carryoverExpiryDate?: Date;
  color?: string;
}

export interface UpdateVacationTypeDto extends CreateVacationTypeDto {
  id: number;
}
```

### 2.2 Service

**File**: `time-attendance-frontend/src/app/pages/settings/vacation-types/vacation-types.service.ts`

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { VacationType, VacationTypeFilter, CreateVacationTypeDto, UpdateVacationTypeDto } from '../../../shared/models/vacation-type.model';

@Injectable({
  providedIn: 'root'
})
export class VacationTypesService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/vacation-types`;

  // Signals for state management
  private vacationTypesSignal = signal<VacationType[]>([]);
  private loadingSignal = signal(false);
  private totalCountSignal = signal(0);

  // Public signals
  public vacationTypes = this.vacationTypesSignal.asReadonly();
  public loading = this.loadingSignal.asReadonly();
  public totalCount = this.totalCountSignal.asReadonly();

  // Computed signals
  public activeVacationTypes = computed(() =>
    this.vacationTypesSignal().filter(vt => vt.isActive)
  );

  getVacationTypes(page: number, pageSize: number, filter?: VacationTypeFilter): Observable<any> {
    this.loadingSignal.set(true);

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (filter?.branchId) params = params.set('branchId', filter.branchId.toString());
    if (filter?.searchTerm) params = params.set('searchTerm', filter.searchTerm);
    if (filter?.isActive !== undefined) params = params.set('isActive', filter.isActive.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  getVacationTypeById(id: number): Observable<VacationType> {
    return this.http.get<VacationType>(`${this.apiUrl}/${id}`);
  }

  createVacationType(dto: CreateVacationTypeDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, dto);
  }

  updateVacationType(id: number, dto: UpdateVacationTypeDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  deleteVacationType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleVacationTypeStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  updateLocalData(vacationTypes: VacationType[], totalCount: number) {
    this.vacationTypesSignal.set(vacationTypes);
    this.totalCountSignal.set(totalCount);
    this.loadingSignal.set(false);
  }
}
```

### 2.3 Components

#### Vacation Types List Component

**File**: `time-attendance-frontend/src/app/pages/settings/vacation-types/vacation-types.component.ts`

```typescript
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { VacationTypesService } from './vacation-types.service';
import { VacationType, VacationTypeFilter } from '../../../shared/models/vacation-type.model';
import { DataTableComponent } from '../../../shared/components/data-table/data-table.component';
import { SearchFilterComponent } from '../../../shared/components/search-filter/search-filter.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-vacation-types',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DataTableComponent,
    SearchFilterComponent,
    PaginationComponent
  ],
  templateUrl: './vacation-types.component.html',
  styleUrls: ['./vacation-types.component.css']
})
export class VacationTypesComponent implements OnInit {
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private vacationTypesService = inject(VacationTypesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  // Signals
  vacationTypes = signal<VacationType[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Filter
  currentFilter: VacationTypeFilter = {};
  searchTerm = '';

  // Permission checks
  canCreate = this.permissionService.has('vacationType.create');
  canUpdate = this.permissionService.has('vacationType.update');
  canDelete = this.permissionService.has('vacationType.delete');

  ngOnInit() {
    this.loadVacationTypes();
  }

  loadVacationTypes() {
    this.loading.set(true);

    this.vacationTypesService.getVacationTypes(
      this.currentPage(),
      this.pageSize(),
      this.currentFilter
    ).subscribe({
      next: (response) => {
        this.vacationTypes.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(Math.ceil(response.totalCount / this.pageSize()));
        this.loading.set(false);
      },
      error: (error) => {
        this.notificationService.error(this.i18n.t('vacationType.errors.loadFailed'));
        this.loading.set(false);
      }
    });
  }

  onSearch(searchTerm: string) {
    this.currentFilter.searchTerm = searchTerm;
    this.currentPage.set(1);
    this.loadVacationTypes();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadVacationTypes();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadVacationTypes();
  }

  createVacationType() {
    this.router.navigate(['/settings/vacation-types/create']);
  }

  editVacationType(id: number) {
    this.router.navigate(['/settings/vacation-types', id, 'edit']);
  }

  async deleteVacationType(vacationType: VacationType) {
    const confirmed = await this.confirmationService.confirm({
      title: this.i18n.t('vacationType.delete.title'),
      message: this.i18n.t('vacationType.delete.message', { name: vacationType.name }),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      type: 'danger'
    });

    if (confirmed) {
      this.loading.set(true);
      this.vacationTypesService.deleteVacationType(vacationType.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('vacationType.delete.success', { name: vacationType.name })
          );
          this.loadVacationTypes();
        },
        error: (error) => {
          this.notificationService.error(this.i18n.t('vacationType.delete.error'));
          this.loading.set(false);
        }
      });
    }
  }

  toggleStatus(vacationType: VacationType) {
    this.loading.set(true);
    this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).subscribe({
      next: () => {
        const action = vacationType.isActive ? 'deactivated' : 'activated';
        this.notificationService.success(
          this.i18n.t(`vacationType.${action}`, { name: vacationType.name })
        );
        this.loadVacationTypes();
      },
      error: (error) => {
        this.notificationService.error(this.i18n.t('vacationType.toggleError'));
        this.loading.set(false);
      }
    });
  }
}
```

#### Create/Edit Vacation Type Component

**File**: `time-attendance-frontend/src/app/pages/settings/vacation-types/create-vacation-type/create-vacation-type.component.ts`

```typescript
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { VacationTypesService } from '../vacation-types.service';
import { BranchesService } from '../../../../shared/services/branches.service';
import { CreateVacationTypeDto, VacationAccrualType } from '../../../../shared/models/vacation-type.model';

@Component({
  selector: 'app-create-vacation-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-vacation-type.component.html',
  styleUrls: ['./create-vacation-type.component.css']
})
export class CreateVacationTypeComponent implements OnInit {
  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private vacationTypesService = inject(VacationTypesService);
  private branchesService = inject(BranchesService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  loading = signal(false);
  branches = signal<any[]>([]);
  isEditMode = signal(false);
  vacationTypeId = signal<number | null>(null);

  accrualTypes = Object.values(VacationAccrualType);

  ngOnInit() {
    this.initializeForm();
    this.loadBranches();
    this.checkEditMode();
  }

  initializeForm() {
    this.form = this.fb.group({
      branchId: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nameAr: ['', Validators.maxLength(100)],
      description: ['', Validators.maxLength(500)],
      descriptionAr: ['', Validators.maxLength(500)],
      defaultDaysPerYear: [21, [Validators.required, Validators.min(1), Validators.max(365)]],
      maxDaysPerRequest: [14, [Validators.required, Validators.min(1)]],
      minDaysNotice: [7, [Validators.required, Validators.min(0)]],
      requiresApproval: [true],
      isPaid: [true],
      accrualType: [VacationAccrualType.Annual, Validators.required],
      accrualRate: [0, [Validators.min(0)]],
      carryoverAllowed: [false],
      maxCarryoverDays: [null],
      carryoverExpiryDate: [null],
      color: ['#28a745']
    });

    // Add conditional validation
    this.form.get('carryoverAllowed')?.valueChanges.subscribe(allowed => {
      const maxCarryoverControl = this.form.get('maxCarryoverDays');
      if (allowed) {
        maxCarryoverControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        maxCarryoverControl?.clearValidators();
      }
      maxCarryoverControl?.updateValueAndValidity();
    });
  }

  loadBranches() {
    this.branchesService.getBranches().subscribe({
      next: (branches) => this.branches.set(branches),
      error: (error) => console.error('Failed to load branches', error)
    });
  }

  checkEditMode() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode.set(true);
      this.vacationTypeId.set(+id);
      this.loadVacationType(+id);
    }
  }

  loadVacationType(id: number) {
    this.loading.set(true);
    this.vacationTypesService.getVacationTypeById(id).subscribe({
      next: (vacationType) => {
        this.form.patchValue(vacationType);
        this.loading.set(false);
      },
      error: (error) => {
        this.notificationService.error(this.i18n.t('vacationType.errors.loadFailed'));
        this.loading.set(false);
        this.router.navigate(['/settings/vacation-types']);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading.set(true);
    const formValue = this.form.value;

    if (this.isEditMode()) {
      const updateDto = { ...formValue, id: this.vacationTypeId() };
      this.vacationTypesService.updateVacationType(this.vacationTypeId()!, updateDto).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('vacationType.update.success'));
          this.router.navigate(['/settings/vacation-types']);
        },
        error: (error) => {
          this.notificationService.error(this.i18n.t('vacationType.update.error'));
          this.loading.set(false);
        }
      });
    } else {
      this.vacationTypesService.createVacationType(formValue).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('vacationType.create.success'));
          this.router.navigate(['/settings/vacation-types']);
        },
        error: (error) => {
          this.notificationService.error(this.i18n.t('vacationType.create.error'));
          this.loading.set(false);
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/settings/vacation-types']);
  }
}
```

### 2.4 Templates

#### Vacation Types List Template

**File**: `time-attendance-frontend/src/app/pages/settings/vacation-types/vacation-types.component.html`

```html
<div class="container-fluid">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="mb-1">{{ i18n.t('vacationType.title') }}</h2>
      <p class="text-muted mb-0">{{ i18n.t('vacationType.subtitle') }}</p>
    </div>
    <div>
      @if (canCreate) {
        <button class="btn btn-primary" (click)="createVacationType()">
          <i class="bi bi-plus-circle me-2"></i>
          {{ i18n.t('vacationType.create') }}
        </button>
      }
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <!-- Search and Filter -->
      <div class="row mb-3">
        <div class="col-md-4">
          <app-search-filter
            [placeholder]="i18n.t('vacationType.searchPlaceholder')"
            (search)="onSearch($event)">
          </app-search-filter>
        </div>
      </div>

      <!-- Table -->
      @if (loading()) {
        <div class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      } @else if (vacationTypes().length === 0) {
        <div class="text-center py-4">
          <p class="text-muted">{{ i18n.t('vacationType.noData') }}</p>
        </div>
      } @else {
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>{{ i18n.t('vacationType.fields.name') }}</th>
                <th>{{ i18n.t('vacationType.fields.branch') }}</th>
                <th>{{ i18n.t('vacationType.fields.defaultDays') }}</th>
                <th>{{ i18n.t('vacationType.fields.maxDaysPerRequest') }}</th>
                <th>{{ i18n.t('vacationType.fields.accrualType') }}</th>
                <th>{{ i18n.t('vacationType.fields.requiresApproval') }}</th>
                <th>{{ i18n.t('vacationType.fields.isPaid') }}</th>
                <th>{{ i18n.t('vacationType.fields.status') }}</th>
                <th>{{ i18n.t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              @for (vacationType of vacationTypes(); track vacationType.id) {
                <tr>
                  <td>
                    <div>
                      @if (vacationType.color) {
                        <span class="badge me-2" [style.background-color]="vacationType.color">&nbsp;</span>
                      }
                      {{ vacationType.name }}
                      @if (vacationType.nameAr) {
                        <br>
                        <small class="text-muted">{{ vacationType.nameAr }}</small>
                      }
                    </div>
                  </td>
                  <td>{{ vacationType.branchName }}</td>
                  <td>{{ vacationType.defaultDaysPerYear }}</td>
                  <td>{{ vacationType.maxDaysPerRequest }}</td>
                  <td>
                    <span class="badge bg-info">{{ vacationType.accrualType }}</span>
                  </td>
                  <td>
                    @if (vacationType.requiresApproval) {
                      <span class="badge bg-warning">{{ i18n.t('common.yes') }}</span>
                    } @else {
                      <span class="badge bg-secondary">{{ i18n.t('common.no') }}</span>
                    }
                  </td>
                  <td>
                    @if (vacationType.isPaid) {
                      <span class="badge bg-success">{{ i18n.t('common.yes') }}</span>
                    } @else {
                      <span class="badge bg-danger">{{ i18n.t('common.no') }}</span>
                    }
                  </td>
                  <td>
                    @if (vacationType.isActive) {
                      <span class="badge bg-success">{{ i18n.t('common.active') }}</span>
                    } @else {
                      <span class="badge bg-danger">{{ i18n.t('common.inactive') }}</span>
                    }
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group">
                      @if (canUpdate) {
                        <button class="btn btn-outline-primary"
                                (click)="editVacationType(vacationType.id)"
                                [title]="i18n.t('common.edit')">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-warning"
                                (click)="toggleStatus(vacationType)"
                                [title]="i18n.t('common.toggleStatus')">
                          <i class="bi bi-toggles"></i>
                        </button>
                      }
                      @if (canDelete) {
                        <button class="btn btn-outline-danger"
                                (click)="deleteVacationType(vacationType)"
                                [title]="i18n.t('common.delete')">
                          <i class="bi bi-trash"></i>
                        </button>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <app-pagination
          [currentPage]="currentPage()"
          [totalPages]="totalPages()"
          [pageSize]="pageSize()"
          [totalItems]="totalCount()"
          (pageChange)="onPageChange($event)"
          (pageSizeChange)="onPageSizeChange($event)">
        </app-pagination>
      }
    </div>
  </div>
</div>
```

### 2.5 Routing Configuration

**File**: `time-attendance-frontend/src/app/app.routes.ts`

Add the following routes to the settings children:

```typescript
{
  path: 'settings/vacation-types',
  loadComponent: () => import('./pages/settings/vacation-types/vacation-types.component')
    .then(m => m.VacationTypesComponent),
  data: {
    title: 'vacationType.title',
    permission: 'vacationType.read'
  },
  canMatch: [adminGuard]
},
{
  path: 'settings/vacation-types/create',
  loadComponent: () => import('./pages/settings/vacation-types/create-vacation-type/create-vacation-type.component')
    .then(m => m.CreateVacationTypeComponent),
  data: {
    title: 'vacationType.create',
    permission: 'vacationType.create'
  },
  canMatch: [adminGuard]
},
{
  path: 'settings/vacation-types/:id/edit',
  loadComponent: () => import('./pages/settings/vacation-types/create-vacation-type/create-vacation-type.component')
    .then(m => m.CreateVacationTypeComponent),
  data: {
    title: 'vacationType.edit',
    permission: 'vacationType.update'
  },
  canMatch: [adminGuard]
}
```

### 2.6 Update Settings Component

Add vacation types card to the settings component template:

```html
<div class="col-lg-4 col-md-6 mb-3">
  <div class="card h-100 border-hover">
    <div class="card-body d-flex flex-column">
      <div class="d-flex align-items-center mb-3">
        <div class="bg-primary bg-gradient rounded-3 p-2 me-3">
          <i class="bi bi-calendar-check text-white" style="font-size: 1.5rem;"></i>
        </div>
        <div>
          <h6 class="mb-0">{{ t('vacationType.title') }}</h6>
          <small class="text-muted">{{ t('vacationType.subtitle') }}</small>
        </div>
      </div>
      <p class="text-muted flex-grow-1">{{ t('vacationType.description') }}</p>
      <div class="mt-auto">
        <a routerLink="/settings/vacation-types" class="btn btn-outline-primary btn-sm w-100">
          <i class="bi bi-gear me-1"></i>
          {{ t('settings.configure') }}
        </a>
      </div>
    </div>
  </div>
</div>
```

### 2.7 Translations

**File**: `time-attendance-frontend/src/assets/i18n/en.json`

Add the following translations:

```json
{
  "vacationType": {
    "title": "Vacation Types",
    "subtitle": "Manage vacation types and policies",
    "description": "Configure vacation types, accrual rules, and leave policies",
    "create": "Create Vacation Type",
    "edit": "Edit Vacation Type",
    "searchPlaceholder": "Search vacation types...",
    "noData": "No vacation types found",
    "fields": {
      "name": "Name",
      "nameAr": "Arabic Name",
      "description": "Description",
      "descriptionAr": "Arabic Description",
      "branch": "Branch",
      "defaultDays": "Default Days/Year",
      "maxDaysPerRequest": "Max Days/Request",
      "minDaysNotice": "Min Days Notice",
      "requiresApproval": "Requires Approval",
      "isPaid": "Paid Leave",
      "accrualType": "Accrual Type",
      "accrualRate": "Accrual Rate",
      "carryoverAllowed": "Allow Carryover",
      "maxCarryoverDays": "Max Carryover Days",
      "carryoverExpiryDate": "Carryover Expiry",
      "color": "Display Color",
      "status": "Status"
    },
    "create": {
      "title": "Create Vacation Type",
      "success": "Vacation type created successfully",
      "error": "Failed to create vacation type"
    },
    "update": {
      "title": "Update Vacation Type",
      "success": "Vacation type updated successfully",
      "error": "Failed to update vacation type"
    },
    "delete": {
      "title": "Delete Vacation Type",
      "message": "Are you sure you want to delete '{name}'?",
      "success": "Vacation type deleted successfully",
      "error": "Failed to delete vacation type"
    },
    "activated": "'{name}' has been activated",
    "deactivated": "'{name}' has been deactivated",
    "toggleError": "Failed to toggle status",
    "errors": {
      "loadFailed": "Failed to load vacation types",
      "saveFailed": "Failed to save vacation type"
    }
  }
}
```

### 2.8 Permission Updates

**File**: `time-attendance-frontend/src/app/shared/utils/permission.utils.ts`

Add vacation type resource:

```typescript
export const PermissionResources = {
  // ... existing resources ...
  VACATION_TYPE: 'vacationType',
  // ... rest ...
} as const;

export const ResourceDescriptions: Record<string, string> = {
  // ... existing descriptions ...
  [PermissionResources.VACATION_TYPE]: 'Vacation types and leave policies',
  // ... rest ...
};

export const ResourceIcons: Record<string, string> = {
  // ... existing icons ...
  [PermissionResources.VACATION_TYPE]: 'fa-calendar-check',
  // ... rest ...
};
```

---

## Phase 3: Database & Configuration

### 3.1 Database Migration

Create migration for VacationTypes table:

```bash
dotnet ef migrations add AddVacationTypesTable -p src/Infrastructure/TimeAttendanceSystem.Infrastructure -s src/Api/TimeAttendanceSystem.Api
```

### 3.2 Seed Data

**File**: `src/Infrastructure/TimeAttendanceSystem.Infrastructure/Persistence/Seed/VacationTypesSeed.cs`

```csharp
public static class VacationTypesSeed
{
    public static async Task SeedVacationTypes(TimeAttendanceDbContext context)
    {
        if (await context.VacationTypes.AnyAsync()) return;

        var branches = await context.Branches.ToListAsync();

        foreach (var branch in branches)
        {
            var vacationTypes = new List<VacationType>
            {
                new VacationType
                {
                    BranchId = branch.Id,
                    Name = "Annual Leave",
                    NameAr = "إجازة سنوية",
                    Description = "Regular annual vacation leave",
                    DefaultDaysPerYear = 21,
                    MaxDaysPerRequest = 14,
                    MinDaysNotice = 7,
                    RequiresApproval = true,
                    IsPaid = true,
                    AccrualType = VacationAccrualType.Annual,
                    AccrualRate = 0,
                    CarryoverAllowed = true,
                    MaxCarryoverDays = 5,
                    Color = "#28a745",
                    IsActive = true
                },
                new VacationType
                {
                    BranchId = branch.Id,
                    Name = "Sick Leave",
                    NameAr = "إجازة مرضية",
                    Description = "Medical sick leave",
                    DefaultDaysPerYear = 10,
                    MaxDaysPerRequest = 5,
                    MinDaysNotice = 0,
                    RequiresApproval = true,
                    IsPaid = true,
                    AccrualType = VacationAccrualType.Annual,
                    AccrualRate = 0,
                    CarryoverAllowed = false,
                    Color = "#ffc107",
                    IsActive = true
                },
                new VacationType
                {
                    BranchId = branch.Id,
                    Name = "Emergency Leave",
                    NameAr = "إجازة طارئة",
                    Description = "Emergency personal leave",
                    DefaultDaysPerYear = 3,
                    MaxDaysPerRequest = 3,
                    MinDaysNotice = 0,
                    RequiresApproval = false,
                    IsPaid = true,
                    AccrualType = VacationAccrualType.Annual,
                    AccrualRate = 0,
                    CarryoverAllowed = false,
                    Color = "#dc3545",
                    IsActive = true
                }
            };

            await context.VacationTypes.AddRangeAsync(vacationTypes);
        }

        await context.SaveChangesAsync();
    }
}
```

### 3.3 Permission Seed

Add vacation type permissions to the permission seed:

```csharp
var vacationTypePermissions = new[]
{
    "vacationType.read",
    "vacationType.create",
    "vacationType.update",
    "vacationType.delete"
};
```

---

## Phase 4: Testing

### 4.1 Backend Unit Tests

Create unit tests for:
- CreateVacationTypeCommandHandler
- UpdateVacationTypeCommandHandler
- DeleteVacationTypeCommandHandler
- GetVacationTypesQueryHandler
- VacationTypeConfiguration validation

### 4.2 Frontend Unit Tests

Create unit tests for:
- VacationTypesService
- VacationTypesComponent
- CreateVacationTypeComponent

### 4.3 Integration Tests

Create integration tests for:
- API endpoints
- Permission validation
- Database operations

---

## Phase 5: Deployment

### 5.1 Build Steps

1. **Backend**:
   ```bash
   dotnet build
   dotnet ef database update
   ```

2. **Frontend**:
   ```bash
   npm install
   ng build --configuration=production
   ```

### 5.2 Configuration

Ensure the following are configured:
- Database connection string
- JWT settings
- CORS configuration
- API base URL in frontend environment

---

## Summary

This implementation plan provides a complete guide for implementing the Vacation Types Management module following the established patterns in the Time Attendance System. The module includes:

1. **Complete CRUD operations** with validation
2. **Role-based security** at all levels
3. **Bilingual support** (English/Arabic)
4. **Multi-tenant architecture** with branch-based isolation
5. **Reactive state management** using Angular signals
6. **Clean Architecture** with CQRS pattern
7. **Comprehensive error handling** and validation
8. **Reusable components** from the shared library

The implementation follows all patterns established in PROJECT_ARCHITECTURE.md and maintains consistency with existing modules like Employees and Shifts.