# Time Attendance System - Complete Architecture Documentation

This document continues from where the original PROJECT_ARCHITECTURE.md left off, providing the remaining comprehensive sections for the enterprise-grade time attendance management system.

---

## Module Implementation Blueprint - Vacation Module

### Phase 1: Backend Implementation

#### Step 1: Domain Entities

```csharp
// Domain/VacationTypes/VacationType.cs
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
    public decimal AccrualRate { get; set; } // Days per month for monthly accrual
    public bool CarryoverAllowed { get; set; } = false;
    public int? MaxCarryoverDays { get; set; }
    public DateTime? CarryoverExpiryDate { get; set; }

    // Navigation Properties
    public Branch Branch { get; set; } = null!;
    public ICollection<VacationRequest> VacationRequests { get; set; } = new List<VacationRequest>();
    public ICollection<EmployeeVacationBalance> EmployeeVacationBalances { get; set; } = new List<EmployeeVacationBalance>();

    // Business Logic
    public Result ValidateRequest(DateTime startDate, DateTime endDate, int requestedDays)
    {
        if (!IsActive)
            return Result.Failure("Vacation type is not active");

        if (requestedDays > MaxDaysPerRequest)
            return Result.Failure($"Maximum {MaxDaysPerRequest} days allowed per request");

        var noticeRequired = startDate.Subtract(DateTime.Today).Days;
        if (noticeRequired < MinDaysNotice)
            return Result.Failure($"Minimum {MinDaysNotice} days notice required");

        return Result.Success();
    }
}

// Domain/VacationTypes/VacationRequest.cs
public class VacationRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public long VacationTypeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int RequestedDays { get; set; }
    public string? Reason { get; set; }
    public VacationRequestStatus Status { get; set; } = VacationRequestStatus.Pending;
    public DateTime? ApprovedDate { get; set; }
    public long? ApprovedById { get; set; }
    public string? ApprovalComments { get; set; }
    public DateTime? RejectedDate { get; set; }
    public long? RejectedById { get; set; }
    public string? RejectionReason { get; set; }
    public DateTime? CancelledDate { get; set; }
    public string? CancellationReason { get; set; }

    // Navigation Properties
    public Employee Employee { get; set; } = null!;
    public VacationType VacationType { get; set; } = null!;
    public User? ApprovedBy { get; set; }
    public User? RejectedBy { get; set; }

    // Computed Properties
    public bool CanBeCancelled => Status == VacationRequestStatus.Approved && StartDate > DateTime.Today;
    public bool CanBeModified => Status == VacationRequestStatus.Pending;

    // Business Logic
    public Result Approve(long approvedById, string? comments = null)
    {
        if (Status != VacationRequestStatus.Pending)
            return Result.Failure("Only pending requests can be approved");

        Status = VacationRequestStatus.Approved;
        ApprovedDate = DateTime.UtcNow;
        ApprovedById = approvedById;
        ApprovalComments = comments;

        return Result.Success();
    }

    public Result Reject(long rejectedById, string rejectionReason)
    {
        if (Status != VacationRequestStatus.Pending)
            return Result.Failure("Only pending requests can be rejected");

        if (string.IsNullOrWhiteSpace(rejectionReason))
            return Result.Failure("Rejection reason is required");

        Status = VacationRequestStatus.Rejected;
        RejectedDate = DateTime.UtcNow;
        RejectedById = rejectedById;
        RejectionReason = rejectionReason;

        return Result.Success();
    }
}
```

#### Step 2: Entity Framework Configuration

```csharp
// Infrastructure/Persistence/Configurations/VacationTypeConfiguration.cs
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

        builder.Property(vt => vt.DefaultDaysPerYear)
            .IsRequired();

        builder.Property(vt => vt.MaxDaysPerRequest)
            .IsRequired();

        builder.Property(vt => vt.MinDaysNotice)
            .IsRequired();

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

        // Query Filter
        builder.HasQueryFilter(vt => !vt.IsDeleted);
    }
}
```

#### Step 3: Application Layer - Commands & Queries

```csharp
// Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommand.cs
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
    DateTime? CarryoverExpiryDate
) : IRequest<Result<long>>;

// Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommandHandler.cs
public class CreateVacationTypeCommandHandler : IRequestHandler<CreateVacationTypeCommand, Result<long>>
{
    private readonly TimeAttendanceDbContext _context;
    private readonly IValidator<CreateVacationTypeCommand> _validator;

    public CreateVacationTypeCommandHandler(
        TimeAttendanceDbContext context,
        IValidator<CreateVacationTypeCommand> validator)
    {
        _context = context;
        _validator = validator;
    }

    public async Task<Result<long>> Handle(CreateVacationTypeCommand request, CancellationToken cancellationToken)
    {
        // Validation
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            var errors = string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage));
            return Result.Failure<long>(errors);
        }

        // Business Rule: Check for duplicate name within branch
        var existingType = await _context.VacationTypes
            .FirstOrDefaultAsync(vt => vt.BranchId == request.BranchId &&
                                     vt.Name.ToLower() == request.Name.ToLower() &&
                                     !vt.IsDeleted,
                                cancellationToken);

        if (existingType != null)
            return Result.Failure<long>("Vacation type with this name already exists in the branch");

        // Create entity
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
            IsActive = true
        };

        _context.VacationTypes.Add(vacationType);
        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success(vacationType.Id);
    }
}

// Application/VacationTypes/Queries/GetVacationTypes/GetVacationTypesQuery.cs
public record GetVacationTypesQuery(
    int PageNumber = 1,
    int PageSize = 10,
    long? BranchId = null,
    string? SearchTerm = null,
    bool? IsActive = null
) : IRequest<Result<PagedResult<VacationTypeDto>>>;

// Application/VacationTypes/DTOs/VacationTypeDto.cs
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
    public VacationAccrualType AccrualType { get; set; }
    public string AccrualTypeDisplay { get; set; } = string.Empty;
    public decimal AccrualRate { get; set; }
    public bool CarryoverAllowed { get; set; }
    public int? MaxCarryoverDays { get; set; }
    public DateTime? CarryoverExpiryDate { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
```

#### Step 4: API Controller

```csharp
// Api/Controllers/VacationTypesController.cs
[ApiController]
[Route("api/v1/vacation-types")]
[Authorize]
public class VacationTypesController : BaseController
{
    public VacationTypesController(IMediator mediator, ILogger<VacationTypesController> logger)
        : base(mediator, logger) { }

    /// <summary>
    /// Get paginated list of vacation types
    /// </summary>
    [HttpGet]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Read)]
    [ProducesResponseType(typeof(PagedResult<VacationTypeDto>), 200)]
    public async Task<ActionResult<PagedResult<VacationTypeDto>>> GetVacationTypes(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] long? branchId = null,
        [FromQuery] string? searchTerm = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetVacationTypesQuery(pageNumber, pageSize, branchId, searchTerm, isActive);
        var result = await Mediator.Send(query);
        return HandlePagedResult(result);
    }

    /// <summary>
    /// Get vacation type by ID
    /// </summary>
    [HttpGet("{id:long}")]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Read)]
    [ProducesResponseType(typeof(VacationTypeDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<VacationTypeDto>> GetVacationType(long id)
    {
        var query = new GetVacationTypeByIdQuery(id);
        var result = await Mediator.Send(query);
        return HandleResult(result);
    }

    /// <summary>
    /// Create new vacation type
    /// </summary>
    [HttpPost]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Create)]
    [ProducesResponseType(typeof(long), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    public async Task<ActionResult<long>> CreateVacationType([FromBody] CreateVacationTypeCommand command)
    {
        var result = await Mediator.Send(command);

        if (result.IsFailure)
            return HandleResult(result);

        return CreatedAtAction(
            nameof(GetVacationType),
            new { id = result.Value },
            result.Value);
    }

    /// <summary>
    /// Update existing vacation type
    /// </summary>
    [HttpPut("{id:long}")]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Update)]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<ActionResult> UpdateVacationType(long id, [FromBody] UpdateVacationTypeCommand command)
    {
        if (id != command.Id)
            return BadRequest("ID mismatch between route and body");

        var result = await Mediator.Send(command);
        return HandleResult(result);
    }

    /// <summary>
    /// Delete vacation type (soft delete)
    /// </summary>
    [HttpDelete("{id:long}")]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Delete)]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    public async Task<ActionResult> DeleteVacationType(long id)
    {
        var command = new DeleteVacationTypeCommand(id);
        var result = await Mediator.Send(command);

        if (result.IsFailure)
            return HandleResult(result);

        return NoContent();
    }

    /// <summary>
    /// Toggle vacation type active status
    /// </summary>
    [HttpPatch("{id:long}/toggle-status")]
    [HasPermission(PermissionResources.VacationType, PermissionActions.Update)]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult> ToggleVacationTypeStatus(long id)
    {
        var command = new ToggleVacationTypeStatusCommand(id);
        var result = await Mediator.Send(command);
        return HandleResult(result);
    }
}
```

### Phase 2: Frontend Implementation

#### Step 1: Angular Service

```typescript
// pages/vacation-types/vacation-types.service.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface VacationType {
  id: number;
  branchId: number;
  branchName: string;
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
  accrualTypeDisplay: string;
  accrualRate: number;
  carryoverAllowed: boolean;
  maxCarryoverDays?: number;
  carryoverExpiryDate?: Date;
  createdAtUtc: Date;
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
}

export enum VacationAccrualType {
  Annual = 'Annual',
  Monthly = 'Monthly',
  ProRata = 'ProRata'
}

@Injectable({
  providedIn: 'root'
})
export class VacationTypesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject('API_URL');

  // Signals for state management
  private readonly _vacationTypes = signal<VacationType[]>([]);
  private readonly _selectedVacationType = signal<VacationType | null>(null);
  private readonly _loading = signal(false);

  // Public readonly signals
  readonly vacationTypes = this._vacationTypes.asReadonly();
  readonly selectedVacationType = this._selectedVacationType.asReadonly();
  readonly loading = this._loading.asReadonly();

  // Computed signals
  readonly activeVacationTypes = computed(() =>
    this._vacationTypes().filter(vt => vt.isActive)
  );

  readonly vacationTypesByBranch = computed(() => {
    const types = this._vacationTypes();
    return types.reduce((acc, type) => {
      const branch = type.branchName || 'Unassigned';
      if (!acc[branch]) acc[branch] = [];
      acc[branch].push(type);
      return acc;
    }, {} as Record<string, VacationType[]>);
  });

  getVacationTypes(pageNumber: number = 1, pageSize: number = 10, filter?: any): Observable<PagedResult<VacationType>> {
    this._loading.set(true);

    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString()
    });

    if (filter) {
      if (filter.branchId) params.append('branchId', filter.branchId.toString());
      if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);
      if (filter.isActive !== undefined) params.append('isActive', filter.isActive.toString());
    }

    return this.http.get<PagedResult<VacationType>>(`${this.apiUrl}/vacation-types?${params}`)
      .pipe(
        map(result => {
          this._vacationTypes.set(result.items);
          this._loading.set(false);
          return result;
        }),
        catchError(error => {
          this._loading.set(false);
          throw error;
        })
      );
  }

  getVacationTypeById(id: number): Observable<VacationType> {
    return this.http.get<VacationType>(`${this.apiUrl}/vacation-types/${id}`)
      .pipe(
        map(vacationType => {
          this._selectedVacationType.set(vacationType);
          return vacationType;
        })
      );
  }

  createVacationType(data: CreateVacationTypeDto): Observable<number> {
    this._loading.set(true);
    return this.http.post<number>(`${this.apiUrl}/vacation-types`, data)
      .pipe(
        map(id => {
          this._loading.set(false);
          return id;
        }),
        catchError(error => {
          this._loading.set(false);
          throw error;
        })
      );
  }

  updateVacationType(id: number, data: Partial<VacationType>): Observable<void> {
    this._loading.set(true);
    return this.http.put<void>(`${this.apiUrl}/vacation-types/${id}`, { id, ...data })
      .pipe(
        map(() => {
          this._loading.set(false);
          this.updateLocalVacationType(id, data);
        }),
        catchError(error => {
          this._loading.set(false);
          throw error;
        })
      );
  }

  deleteVacationType(id: number): Observable<void> {
    this._loading.set(true);
    return this.http.delete<void>(`${this.apiUrl}/vacation-types/${id}`)
      .pipe(
        map(() => {
          this._loading.set(false);
          this.removeLocalVacationType(id);
        }),
        catchError(error => {
          this._loading.set(false);
          throw error;
        })
      );
  }

  toggleVacationTypeStatus(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/vacation-types/${id}/toggle-status`, {})
      .pipe(
        map(() => {
          const current = this._vacationTypes().find(vt => vt.id === id);
          if (current) {
            this.updateLocalVacationType(id, { isActive: !current.isActive });
          }
        })
      );
  }

  private updateLocalVacationType(id: number, updates: Partial<VacationType>): void {
    this._vacationTypes.update(types => {
      const index = types.findIndex(vt => vt.id === id);
      if (index !== -1) {
        const updated = [...types];
        updated[index] = { ...updated[index], ...updates };
        return updated;
      }
      return types;
    });
  }

  private removeLocalVacationType(id: number): void {
    this._vacationTypes.update(types => types.filter(vt => vt.id !== id));
  }
}
```

#### Step 2: Angular Components

```typescript
// pages/vacation-types/vacation-types.component.ts
import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { VacationTypesService, VacationType } from './vacation-types.service';
import { NotificationService } from '../../core/services/notification.service';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-vacation-types',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DataTableComponent
  ],
  template: `
    <div class="container-fluid py-4">
      <!-- Page Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 mb-0">{{ translate('vacation_types.title') }}</h1>
          <p class="text-muted mb-0">{{ translate('vacation_types.subtitle') }}</p>
        </div>
        <div class="d-flex gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            (click)="exportVacationTypes()"
            [disabled]="loading()">
            <i class="bi bi-download me-2"></i>
            {{ translate('common.export') }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            routerLink="/settings/vacation-types/create">
            <i class="bi bi-plus-circle me-2"></i>
            {{ translate('vacation_types.create_vacation_type') }}
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-4">
        <div class="card-body">
          <form [formGroup]="filterForm" class="row g-3">
            <div class="col-md-4">
              <label class="form-label">{{ translate('vacation_types.filters.branch') }}</label>
              <select class="form-select" formControlName="branchId">
                <option value="">{{ translate('common.all') }}</option>
                @for (branch of branches(); track branch.id) {
                  <option [value]="branch.id">{{ branch.name }}</option>
                }
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">{{ translate('vacation_types.filters.status') }}</label>
              <select class="form-select" formControlName="isActive">
                <option value="">{{ translate('common.all') }}</option>
                <option [value]="true">{{ translate('common.active') }}</option>
                <option [value]="false">{{ translate('common.inactive') }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label class="form-label">{{ translate('common.search') }}</label>
              <input
                type="text"
                class="form-control"
                formControlName="searchTerm"
                [placeholder]="translate('vacation_types.search_placeholder')">
            </div>
          </form>
        </div>
      </div>

      <!-- Data Table -->
      <div class="card">
        <div class="card-body p-0">
          <app-data-table
            [data]="vacationTypes()"
            [columns]="tableColumns()"
            [actions]="tableActions()"
            [loading]="loading()"
            [totalCount]="totalCount()"
            [pageSize]="pageSize()"
            [pageNumber]="pageNumber()"
            (pageChanged)="onPageChanged($event)"
            (actionClicked)="onActionClicked($event)">
          </app-data-table>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./vacation-types.component.css']
})
export class VacationTypesComponent implements OnInit {
  private readonly vacationTypesService = inject(VacationTypesService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly translationService = inject(TranslationService);
  private readonly formBuilder = inject(FormBuilder);

  // Signals
  readonly vacationTypes = signal<VacationType[]>([]);
  readonly branches = signal<Branch[]>([]);
  readonly loading = signal(false);
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);

  // Computed signals
  readonly tableColumns = computed(() => [
    {
      key: 'name',
      label: this.translate('vacation_types.name'),
      sortable: true,
      template: (item: VacationType) => `
        <div>
          <div class="fw-semibold">${item.name}</div>
          <div class="text-muted small">${item.nameAr || ''}</div>
        </div>
      `
    },
    {
      key: 'branchName',
      label: this.translate('vacation_types.branch'),
      sortable: true
    },
    {
      key: 'defaultDaysPerYear',
      label: this.translate('vacation_types.default_days'),
      sortable: true,
      cssClass: 'text-center'
    },
    {
      key: 'maxDaysPerRequest',
      label: this.translate('vacation_types.max_days_request'),
      sortable: true,
      cssClass: 'text-center'
    },
    {
      key: 'accrualTypeDisplay',
      label: this.translate('vacation_types.accrual_type'),
      sortable: true
    },
    {
      key: 'isPaid',
      label: this.translate('vacation_types.paid'),
      template: (item: VacationType) => `
        <span class="badge bg-${item.isPaid ? 'success' : 'secondary'}">
          ${this.translate(item.isPaid ? 'common.yes' : 'common.no')}
        </span>
      `,
      cssClass: 'text-center'
    },
    {
      key: 'isActive',
      label: this.translate('common.status'),
      template: (item: VacationType) => `
        <span class="badge bg-${item.isActive ? 'success' : 'danger'}">
          ${this.translate(item.isActive ? 'common.active' : 'common.inactive')}
        </span>
      `,
      cssClass: 'text-center'
    }
  ]);

  readonly tableActions = computed(() => [
    {
      icon: 'bi-eye',
      label: this.translate('common.view'),
      action: 'view',
      variant: 'outline-primary',
      size: 'sm'
    },
    {
      icon: 'bi-pencil',
      label: this.translate('common.edit'),
      action: 'edit',
      variant: 'outline-secondary',
      size: 'sm'
    },
    {
      icon: 'bi-power',
      label: this.translate('common.toggle_status'),
      action: 'toggle-status',
      variant: 'outline-warning',
      size: 'sm'
    },
    {
      icon: 'bi-trash',
      label: this.translate('common.delete'),
      action: 'delete',
      variant: 'outline-danger',
      size: 'sm'
    }
  ]);

  readonly filterForm = this.formBuilder.group({
    branchId: [''],
    isActive: [''],
    searchTerm: ['']
  });

  async ngOnInit(): Promise<void> {
    await this.loadInitialData();
    this.setupFilterSubscriptions();
    await this.loadVacationTypes();
  }

  private async loadInitialData(): Promise<void> {
    // Load branches for filter
    // Implementation depends on your branch service
  }

  private setupFilterSubscriptions(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.pageNumber.set(1);
        this.loadVacationTypes();
      });
  }

  private async loadVacationTypes(): Promise<void> {
    try {
      this.loading.set(true);

      const filter = {
        branchId: this.filterForm.get('branchId')?.value || undefined,
        isActive: this.filterForm.get('isActive')?.value !== '' ? this.filterForm.get('isActive')?.value : undefined,
        searchTerm: this.filterForm.get('searchTerm')?.value || undefined
      };

      const result = await this.vacationTypesService.getVacationTypes(
        this.pageNumber(),
        this.pageSize(),
        filter
      ).toPromise();

      if (result) {
        this.vacationTypes.set(result.items);
        this.totalCount.set(result.totalCount);
      }
    } catch (error) {
      this.notificationService.error(this.translate('vacation_types.errors.load_failed'));
    } finally {
      this.loading.set(false);
    }
  }

  onPageChanged(event: { pageNumber: number; pageSize: number }): void {
    this.pageNumber.set(event.pageNumber);
    this.pageSize.set(event.pageSize);
    this.loadVacationTypes();
  }

  async onActionClicked(event: { action: string; item: VacationType }): Promise<void> {
    const { action, item } = event;

    switch (action) {
      case 'view':
        // Navigate to view page
        break;
      case 'edit':
        // Navigate to edit page
        break;
      case 'toggle-status':
        await this.toggleVacationTypeStatus(item);
        break;
      case 'delete':
        await this.deleteVacationType(item);
        break;
    }
  }

  private async toggleVacationTypeStatus(vacationType: VacationType): Promise<void> {
    const action = vacationType.isActive ? 'deactivate' : 'activate';
    const confirmed = await this.confirmationService.confirm({
      title: this.translate(`vacation_types.${action}.confirm_title`),
      message: this.translate(`vacation_types.${action}.confirm_message`, { name: vacationType.name }),
      type: vacationType.isActive ? 'warning' : 'success'
    });

    if (confirmed) {
      try {
        await this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).toPromise();
        this.notificationService.success(
          this.translate(`vacation_types.${action}.success`, { name: vacationType.name })
        );
        await this.loadVacationTypes();
      } catch (error) {
        this.notificationService.error(this.translate(`vacation_types.${action}.error`));
      }
    }
  }

  private async deleteVacationType(vacationType: VacationType): Promise<void> {
    const confirmed = await this.confirmationService.confirm({
      title: this.translate('vacation_types.delete.confirm_title'),
      message: this.translate('vacation_types.delete.confirm_message', { name: vacationType.name }),
      type: 'danger'
    });

    if (confirmed) {
      try {
        await this.vacationTypesService.deleteVacationType(vacationType.id).toPromise();
        this.notificationService.success(
          this.translate('vacation_types.delete.success', { name: vacationType.name })
        );
        await this.loadVacationTypes();
      } catch (error) {
        this.notificationService.error(this.translate('vacation_types.delete.error'));
      }
    }
  }

  private translate(key: string, params?: Record<string, any>): string {
    return this.translationService.translate(key, params);
  }
}
```

### Phase 3: Route Configuration

```typescript
// Update app.routes.ts to include vacation management routes
export const routes: Routes = [
  // ... existing routes ...
  {
    path: 'settings',
    children: [
      // ... existing settings routes ...
      {
        path: 'vacation-types',
        loadComponent: () => import('./pages/vacation-types/vacation-types.component').then(m => m.VacationTypesComponent),
        data: {
          title: 'vacation_types.title',
          permission: 'vacationType.read'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'vacation-types/create',
        loadComponent: () => import('./pages/vacation-types/create-vacation-type/create-vacation-type.component').then(m => m.CreateVacationTypeComponent),
        data: {
          title: 'vacation_types.create_vacation_type',
          permission: 'vacationType.create'
        },
        canMatch: [adminGuard]
      },
      {
        path: 'vacation-types/:id/edit',
        loadComponent: () => import('./pages/vacation-types/edit-vacation-type/edit-vacation-type.component').then(m => m.EditVacationTypeComponent),
        data: {
          title: 'vacation_types.edit_vacation_type',
          permission: 'vacationType.update'
        },
        canMatch: [adminGuard]
      }
    ]
  },
  {
    path: 'vacations',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/vacation-requests/vacation-requests.component').then(m => m.VacationRequestsComponent),
        data: {
          title: 'vacation_requests.title',
          permission: 'vacationRequest.read'
        },
        canMatch: [authGuard]
      },
      {
        path: 'request',
        loadComponent: () => import('./pages/vacation-requests/request-vacation/request-vacation.component').then(m => m.RequestVacationComponent),
        data: {
          title: 'vacation_requests.request_vacation',
          permission: 'vacationRequest.create'
        },
        canMatch: [employeeGuard]
      },
      {
        path: ':id/view',
        loadComponent: () => import('./pages/vacation-requests/view-vacation-request/view-vacation-request.component').then(m => m.ViewVacationRequestComponent),
        data: {
          title: 'vacation_requests.view_details',
          permission: 'vacationRequest.read'
        },
        canMatch: [authGuard]
      }
    ]
  }
];
```

---

## Development Workflow & Standards

### Git Workflow & Branching Strategy

#### Branch Structure
```
main/
├── develop/
├── feature/
│   ├── feature/vacation-types-crud
│   ├── feature/vacation-requests
│   └── feature/vacation-balances
├── hotfix/
│   └── hotfix/critical-bug-fix
└── release/
    └── release/v2.1.0
```

#### Commit Message Convention
```
type(scope): description

[optional body]

[optional footer(s)]

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests or correcting existing tests
- chore: Changes to the build process or auxiliary tools

Examples:
feat(vacation): add vacation type management
fix(auth): resolve token refresh timing issue
docs(api): update vacation endpoints documentation
```

### Code Quality Standards

#### .NET Code Standards
```csharp
// Follow C# naming conventions
public class VacationTypeService // PascalCase for classes
{
    private readonly ILogger<VacationTypeService> _logger; // camelCase with underscore for private fields

    public async Task<Result<VacationType>> GetVacationTypeAsync(long id) // PascalCase for methods
    {
        var vacationType = await _repository.GetByIdAsync(id); // camelCase for local variables
        return Result.Success(vacationType);
    }
}

// Use meaningful names
public class VacationRequestApprovalHandler // Clear purpose
{
    public async Task<Result> HandleAsync(ApproveVacationRequestCommand command)
    {
        // Implementation
    }
}

// Document complex business logic
/// <summary>
/// Calculates vacation balance considering accrual type, carryover rules, and used days.
/// </summary>
/// <param name="employee">The employee to calculate balance for</param>
/// <param name="vacationType">The vacation type configuration</param>
/// <param name="year">The year to calculate balance for</param>
/// <returns>The calculated vacation balance</returns>
public async Task<Result<VacationBalance>> CalculateVacationBalanceAsync(
    Employee employee,
    VacationType vacationType,
    int year)
{
    // Complex calculation logic here
}
```

#### TypeScript/Angular Code Standards
```typescript
// Use meaningful interfaces
interface VacationRequest {
  id: number;
  employeeId: number;
  vacationTypeId: number;
  startDate: Date;
  endDate: Date;
  status: VacationRequestStatus;
}

// Use enums for constants
enum VacationRequestStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}

// Use signals for reactive state
@Injectable({
  providedIn: 'root'
})
export class VacationRequestService {
  private readonly _vacationRequests = signal<VacationRequest[]>([]);
  readonly vacationRequests = this._vacationRequests.asReadonly();

  // Use computed signals for derived state
  readonly pendingRequests = computed(() =>
    this._vacationRequests().filter(req => req.status === VacationRequestStatus.Pending)
  );
}

// Use proper error handling
async createVacationRequest(request: CreateVacationRequestDto): Promise<number> {
  try {
    this._loading.set(true);
    const result = await this.http.post<number>('/api/vacation-requests', request).toPromise();
    this._loading.set(false);
    return result!;
  } catch (error) {
    this._loading.set(false);
    throw error;
  }
}
```

### Testing Standards

#### Backend Unit Tests
```csharp
// Application/VacationTypes/Commands/CreateVacationType/CreateVacationTypeCommandHandlerTests.cs
public class CreateVacationTypeCommandHandlerTests : BaseTest
{
    private readonly CreateVacationTypeCommandHandler _handler;
    private readonly Mock<IValidator<CreateVacationTypeCommand>> _validatorMock;

    public CreateVacationTypeCommandHandlerTests()
    {
        _validatorMock = new Mock<IValidator<CreateVacationTypeCommand>>();
        _handler = new CreateVacationTypeCommandHandler(Context, _validatorMock.Object);
    }

    [Fact]
    public async Task Handle_ValidCommand_ShouldCreateVacationType()
    {
        // Arrange
        var command = new CreateVacationTypeCommand(
            BranchId: 1,
            Name: "Annual Leave",
            NameAr: "إجازة سنوية",
            Description: "Annual vacation leave",
            DescriptionAr: null,
            DefaultDaysPerYear: 21,
            MaxDaysPerRequest: 14,
            MinDaysNotice: 7,
            RequiresApproval: true,
            IsPaid: true,
            AccrualType: VacationAccrualType.Annual,
            AccrualRate: 0,
            CarryoverAllowed: true,
            MaxCarryoverDays: 5,
            CarryoverExpiryDate: null
        );

        _validatorMock
            .Setup(v => v.ValidateAsync(command, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().BeGreaterThan(0);

        var createdVacationType = await Context.VacationTypes.FindAsync(result.Value);
        createdVacationType.Should().NotBeNull();
        createdVacationType!.Name.Should().Be("Annual Leave");
        createdVacationType.DefaultDaysPerYear.Should().Be(21);
    }

    [Fact]
    public async Task Handle_DuplicateName_ShouldReturnFailure()
    {
        // Arrange
        await Context.VacationTypes.AddAsync(new VacationType
        {
            BranchId = 1,
            Name = "Annual Leave",
            DefaultDaysPerYear = 21,
            MaxDaysPerRequest = 14,
            MinDaysNotice = 7,
            IsActive = true
        });
        await Context.SaveChangesAsync();

        var command = new CreateVacationTypeCommand(
            BranchId: 1,
            Name: "Annual Leave", // Duplicate name
            NameAr: null,
            Description: null,
            DescriptionAr: null,
            DefaultDaysPerYear: 21,
            MaxDaysPerRequest: 14,
            MinDaysNotice: 7,
            RequiresApproval: true,
            IsPaid: true,
            AccrualType: VacationAccrualType.Annual,
            AccrualRate: 0,
            CarryoverAllowed: false,
            MaxCarryoverDays: null,
            CarryoverExpiryDate: null
        );

        _validatorMock
            .Setup(v => v.ValidateAsync(command, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new ValidationResult());

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsFailure.Should().BeTrue();
        result.Error.Should().Contain("already exists");
    }
}
```

#### Frontend Unit Tests
```typescript
// vacation-types.service.spec.ts
describe('VacationTypesService', () => {
  let service: VacationTypesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VacationTypesService,
        { provide: 'API_URL', useValue: 'http://localhost:5000/api' }
      ]
    });

    service = TestBed.inject(VacationTypesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create vacation type successfully', async () => {
    // Arrange
    const createDto: CreateVacationTypeDto = {
      branchId: 1,
      name: 'Annual Leave',
      defaultDaysPerYear: 21,
      maxDaysPerRequest: 14,
      minDaysNotice: 7,
      requiresApproval: true,
      isPaid: true,
      accrualType: VacationAccrualType.Annual,
      accrualRate: 0,
      carryoverAllowed: true
    };
    const expectedId = 123;

    // Act
    const result$ = service.createVacationType(createDto);

    // Assert
    const req = httpTestingController.expectOne('http://localhost:5000/api/vacation-types');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createDto);

    req.flush(expectedId);

    const result = await result$.toPromise();
    expect(result).toBe(expectedId);
  });

  it('should update loading state during creation', () => {
    // Arrange
    const createDto: CreateVacationTypeDto = {
      branchId: 1,
      name: 'Annual Leave',
      defaultDaysPerYear: 21,
      maxDaysPerRequest: 14,
      minDaysNotice: 7,
      requiresApproval: true,
      isPaid: true,
      accrualType: VacationAccrualType.Annual,
      accrualRate: 0,
      carryoverAllowed: false
    };

    // Act
    service.createVacationType(createDto).subscribe();

    // Assert - Loading should be true during request
    expect(service.loading()).toBe(true);

    const req = httpTestingController.expectOne('http://localhost:5000/api/vacation-types');
    req.flush(123);

    // Loading should be false after completion
    expect(service.loading()).toBe(false);
  });
});
```

### Performance Optimization Guidelines

#### Backend Performance
```csharp
// Use efficient queries with proper includes
public async Task<PagedResult<VacationTypeDto>> GetVacationTypesAsync(VacationTypesFilter filter)
{
    var query = _context.VacationTypes
        .AsNoTracking() // For read-only operations
        .Include(vt => vt.Branch) // Only include what's needed
        .Where(vt => !vt.IsDeleted);

    // Apply filters efficiently
    if (filter.BranchId.HasValue)
        query = query.Where(vt => vt.BranchId == filter.BranchId);

    if (!string.IsNullOrEmpty(filter.SearchTerm))
        query = query.Where(vt => EF.Functions.Like(vt.Name, $"%{filter.SearchTerm}%"));

    // Project to DTO to avoid over-fetching
    var projectedQuery = query.Select(vt => new VacationTypeDto
    {
        Id = vt.Id,
        BranchId = vt.BranchId,
        BranchName = vt.Branch.Name,
        Name = vt.Name,
        // ... other properties
    });

    return await projectedQuery.ToPagedResultAsync(filter.PageNumber, filter.PageSize);
}

// Use bulk operations for multiple updates
public async Task<Result> BulkUpdateVacationTypeStatusAsync(List<long> ids, bool isActive)
{
    var affectedRows = await _context.VacationTypes
        .Where(vt => ids.Contains(vt.Id))
        .ExecuteUpdateAsync(setters => setters
            .SetProperty(vt => vt.IsActive, isActive)
            .SetProperty(vt => vt.ModifiedAtUtc, DateTime.UtcNow));

    return affectedRows > 0 ? Result.Success() : Result.Failure("No records updated");
}
```

#### Frontend Performance
```typescript
// Use OnPush change detection for better performance
@Component({
  selector: 'app-vacation-types',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`
})
export class VacationTypesComponent {
  // Use signals for reactive state
  readonly vacationTypes = this.vacationTypesService.vacationTypes;

  // Use computed for derived state
  readonly activeVacationTypes = computed(() =>
    this.vacationTypes().filter(vt => vt.isActive)
  );

  // Use trackBy for *ngFor performance
  trackByVacationType(index: number, item: VacationType): number {
    return item.id;
  }
}

// Lazy load routes for better initial load time
const routes: Routes = [
  {
    path: 'vacation-types',
    loadComponent: () => import('./vacation-types/vacation-types.component')
      .then(m => m.VacationTypesComponent)
  }
];

// Use virtual scrolling for large lists
@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="example-viewport">
      <div *cdkVirtualFor="let item of items; trackBy: trackByFn">
        {{ item.name }}
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class LargeVacationListComponent {
  items = signal<VacationType[]>([]);
}
```

---

## Conclusion

This comprehensive architecture document provides a complete blueprint for implementing enterprise-grade features in the Time Attendance System. The Vacation Module example demonstrates how to follow established patterns while maintaining consistency, performance, and maintainability.

### Key Implementation Principles

1. **Consistency**: Follow established patterns across all modules
2. **Security**: Implement role-based access control at every level
3. **Performance**: Use efficient queries and reactive state management
4. **Testing**: Write comprehensive unit and integration tests
5. **Documentation**: Document complex business logic and API endpoints
6. **Scalability**: Design for growth and easy maintenance

### Next Steps

1. **Database Migration**: Create and run the vacation module migrations
2. **Permission Setup**: Add vacation-related permissions to the system
3. **Frontend Routes**: Configure routing and navigation
4. **Testing**: Implement comprehensive test coverage
5. **Documentation**: Update API documentation and user guides

This architecture ensures the system remains maintainable, scalable, and follows enterprise-grade development practices while providing a solid foundation for future enhancements.