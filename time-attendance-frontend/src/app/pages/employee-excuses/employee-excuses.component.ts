import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { EmployeeExcusesService } from './employee-excuses.service';
import {
  EmployeeExcuseDto,
  EmployeeExcusesQueryParams,
  EmployeeExcuseFilter,
  ExcuseStatus
} from '../../shared/models/employee-excuse.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionActions } from '../../shared/utils/permission.utils';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
@Component({
  selector: 'app-employee-excuses',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './employee-excuses.component.html',
  styleUrls: ['./employee-excuses.component.css']
})
export class EmployeeExcusesComponent implements OnInit {
  private employeeExcusesService = inject(EmployeeExcusesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants
  readonly PERMISSIONS = {
    EXCUSE_CREATE: `excuse.${PermissionActions.CREATE}`,
    EXCUSE_READ: `excuse.${PermissionActions.READ}`,
    EXCUSE_UPDATE: `excuse.${PermissionActions.UPDATE}`,
    EXCUSE_DELETE: `excuse.${PermissionActions.DELETE}`
  };


  // Signals for state management
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  selectedEmployeeId = signal<number | undefined>(undefined);
  selectedDepartmentId = signal<number | undefined>(undefined);
  selectedBranchId = signal<number | undefined>(undefined);
  selectedStatus = signal<ExcuseStatus | undefined>(undefined);
  fromDate = signal<string | undefined>(undefined);
  toDate = signal<string | undefined>(undefined);
  searchTerm = signal<string | undefined>(undefined);

  // Service signals
  employeeExcuses = this.employeeExcusesService.employeeExcuses;
  pagedResult = this.employeeExcusesService.pagedResult;
  statistics = this.employeeExcusesService.statistics;
  error = this.employeeExcusesService.error;

  // Table configuration
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('employee_excuses.employee'), sortable: true, width: '15%' },
    { key: 'employeeNumber', label: this.i18n.t('employee_excuses.employee_number'), sortable: true, width: '10%' },
    { key: 'departmentName', label: this.i18n.t('employee_excuses.department'), sortable: true, width: '12%' },
    { key: 'excuseDate', label: this.i18n.t('employee_excuses.excuse_date'), sortable: true, width: '10%' },
    { key: 'durationHours', label: this.i18n.t('employee_excuses.duration'), sortable: false, width: '8%' },
    { key: 'reason', label: this.i18n.t('employee_excuses.reason'), sortable: false, width: '15%' },
    { key: 'status', label: this.i18n.t('employee_excuses.status'), sortable: true, width: '10%' },
    { key: 'submissionDate', label: this.i18n.t('employee_excuses.submitted_date'), sortable: true, width: '10%' }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: (item: EmployeeExcuseDto) => {
        return this.permissionService.has(`excuse.${PermissionActions.READ}`) ||
               this.permissionService.hasRole('SystemAdmin');
      }
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (item: EmployeeExcuseDto) => {
        // HR can edit excuses in any status
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.UPDATE}`) ||
                             this.permissionService.hasRole('SystemAdmin');
        const canEditBusiness = this.canEditExcuse(item);

        return hasPermission && canEditBusiness;
      }
    },
    {
      key: 'approve',
      label: this.i18n.t('employee_excuses.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: EmployeeExcuseDto) => {
        // Only pending excuses can be approved
        const canApproveStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) ||
                             this.permissionService.hasRole('SystemAdmin');
        const canReviewBusiness = this.canReviewExcuse(item);

        return canApproveStatus && hasPermission && canReviewBusiness;
      }
    },
    {
      key: 'reject',
      label: this.i18n.t('employee_excuses.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: EmployeeExcuseDto) => {
        // Only pending excuses can be rejected
        const canRejectStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) ||
                             this.permissionService.hasRole('SystemAdmin');
        const canReviewBusiness = this.canReviewExcuse(item);

        return canRejectStatus && hasPermission && canReviewBusiness;
      }
    },
    {
      key: 'cancel',
      label: this.i18n.t('employee_excuses.cancel'),
      icon: 'fa-ban',
      color: 'warning',
      condition: (item: EmployeeExcuseDto) => {
        // Only pending excuses can be cancelled
        const canCancelStatus = item.status === ExcuseStatus.Pending;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.DELETE}`) ||
                             this.permissionService.hasRole('SystemAdmin');
        const canCancelBusiness = this.canCancelExcuse(item);

        return canCancelStatus && hasPermission && canCancelBusiness;
      }
    },
    {
      key: 'reopen',
      label: this.i18n.t('employee_excuses.reopen'),
      icon: 'fa-undo',
      color: 'warning',
      condition: (item: EmployeeExcuseDto) => {
        // SystemAdmin can reopen approved/rejected excuses for modification
        const canReopenStatus = item.status === ExcuseStatus.Approved || item.status === ExcuseStatus.Rejected;
        const isSystemAdmin = this.permissionService.hasRole('SystemAdmin');

        return canReopenStatus && isSystemAdmin;
      }
    },
    {
      key: 'delete',
      label: this.i18n.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (item: EmployeeExcuseDto) => {
        // SystemAdmin can delete any excuse, others can only delete their own pending excuses
        const isSystemAdmin = this.permissionService.hasRole('SystemAdmin');
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.DELETE}`);

        if (isSystemAdmin) {
          return true; // SystemAdmin can delete any excuse
        }

        // Others can only delete their own pending excuses
        return item.status === ExcuseStatus.Pending &&
               hasPermission &&
               this.canCancelExcuse(item);
      }
    },
    {
      key: 'download',
      label: this.i18n.t('employee_excuses.download_attachment'),
      icon: 'fa-download',
      color: 'info',
      condition: (item: EmployeeExcuseDto) => {
        const hasAttachment = !!item.attachmentUrl;
        const hasPermission = this.permissionService.has(`excuse.${PermissionActions.READ}`) ||
                             this.permissionService.hasRole('SystemAdmin');

        return hasAttachment && hasPermission;
      }
    }
  ];

  // Computed values
  currentFilter = computed(() => ({
    employeeId: this.selectedEmployeeId(),
    departmentId: this.selectedDepartmentId(),
    branchId: this.selectedBranchId(),
    status: this.selectedStatus(),
    fromDate: this.fromDate(),
    toDate: this.toDate(),
    searchTerm: this.searchTerm()
  }));


  // Effects
  constructor() {
    // Auto-load data when filter changes
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const pageSize = this.pageSize();

      this.loadEmployeeExcuses({
        page,
        pageSize,
        ...filter
      });
    });

    // Watch for service loading state
    effect(() => {
      this.loading.set(this.employeeExcusesService.loading());
    });
  }

  ngOnInit(): void {
    // Load initial data first, then calculate statistics
    this.loadEmployeeExcuses();
  }

  /**
   * Load employee excuses with current filters
   */
  loadEmployeeExcuses(params: EmployeeExcusesQueryParams = {}): void {
    const queryParams: EmployeeExcusesQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter(),
      ...params
    };

    this.employeeExcusesService.getEmployeeExcuses(queryParams).subscribe({
      next: () => {
        // Calculate statistics after data is loaded
        this.calculateAggregateStatistics();
      },
      error: (error) => {
        this.notificationService.error(
          this.i18n.t('employee_excuses.load_error')
        );
      }
    });
  }

  /**
   * Load statistics - Skip for management view as it requires specific employee
   */
  loadStatistics(): void {
    // For management view, we'll calculate statistics from the loaded data
    // instead of calling the API which requires specific employeeId and year parameters
    this.calculateAggregateStatistics();
  }

  /**
   * Calculate aggregate statistics from loaded data
   */
  private calculateAggregateStatistics(): void {
    const allExcuses = this.employeeExcusesService.employeeExcuses() || [];

    const stats = {
      totalRequests: allExcuses.length,
      pendingRequests: allExcuses.filter(excuse => excuse.status === 'Pending').length,
      approvedRequests: allExcuses.filter(excuse => excuse.status === 'Approved').length,
      rejectedRequests: allExcuses.filter(excuse => excuse.status === 'Rejected').length,
      currentMonthHours: 0, // Not available from current data
      remainingMonthlyHours: 0, // Not available from current data
      monthlyLimit: 0 // Not available from current data
    };

    this.employeeExcusesService.statistics.set(stats);
  }

  /**
   * Navigate to create excuse request page
   */
  navigateToCreate(): void {
    this.router.navigate(['/employee-excuses/create']);
  }

  /**
   * View excuse details
   */
  viewExcuse(excuse: EmployeeExcuseDto): void {
    this.router.navigate(['/employee-excuses', excuse.id, 'view']);
  }

  /**
   * Edit excuse request
   */
  editExcuse(excuse: EmployeeExcuseDto): void {
    this.router.navigate(['/employee-excuses', excuse.id, 'edit']);
  }

  /**
   * Approve excuse request
   */
  approveExcuse(excuse: EmployeeExcuseDto): void {
    const message = this.i18n.t('employee_excuses.confirm_approve');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.approve_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.approve')
    }).then(result => {
      if (result.confirmed) {
        this.employeeExcusesService.reviewEmployeeExcuse(excuse.id, {
          status: ExcuseStatus.Approved,
          reviewerComments: result.comments
        }).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.approve_success')
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t('employee_excuses.approve_error')
            );
          }
        });
      }
    });
  }

  /**
   * Reject excuse request
   */
  rejectExcuse(excuse: EmployeeExcuseDto): void {
    const message = this.i18n.t('employee_excuses.confirm_reject');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.reject_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.reject'),
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.employeeExcusesService.reviewEmployeeExcuse(excuse.id, {
          status: ExcuseStatus.Rejected,
          reviewerComments: result.comments
        }).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.reject_success')
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t('employee_excuses.reject_error')
            );
          }
        });
      }
    });
  }

  /**
   * Cancel excuse request
   */
  cancelExcuse(excuse: EmployeeExcuseDto): void {
    const message = this.i18n.t('employee_excuses.confirm_cancel');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.cancel_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.cancel')
    }).then(result => {
      if (result.confirmed) {
        this.employeeExcusesService.cancelEmployeeExcuse(excuse.id).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.cancel_success')
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t('employee_excuses.cancel_error')
            );
          }
        });
      }
    });
  }

  /**
   * Download attachment
   */
  downloadAttachment(excuse: EmployeeExcuseDto): void {
    this.employeeExcusesService.downloadAttachment(excuse.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `excuse_${excuse.id}_attachment`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.notificationService.error(
          this.i18n.t('employee_excuses.download_error')
        );
      }
    });
  }

  /**
   * Reopen excuse for modification (SystemAdmin only)
   */
  reopenExcuse(excuse: EmployeeExcuseDto): void {
    const message = this.i18n.t('employee_excuses.confirm_reopen');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.reopen_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.reopen')
    }).then(result => {
      if (result.confirmed) {
        // For now, navigate to edit. In the future, this could call a specific API endpoint
        this.editExcuse(excuse);
        this.notificationService.info(
          this.i18n.t('employee_excuses.reopen_info')
        );
      }
    });
  }

  /**
   * Delete excuse (SystemAdmin can delete any, others only their own pending)
   */
  deleteExcuse(excuse: EmployeeExcuseDto): void {
    const message = this.i18n.t('employee_excuses.confirm_delete');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.delete_title'),
      message,
      confirmText: this.i18n.t('common.delete'),
      requireComments: false
    }).then(result => {
      if (result.confirmed) {
        this.employeeExcusesService.cancelEmployeeExcuse(excuse.id).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.delete_success')
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t('employee_excuses.delete_error')
            );
          }
        });
      }
    });
  }

  /**
   * Handle filter changes
   */
  onFilterChange(filter: EmployeeExcuseFilter): void {
    this.selectedEmployeeId.set(filter.employeeId);
    this.selectedDepartmentId.set(filter.departmentId);
    this.selectedBranchId.set(filter.branchId);
    this.selectedStatus.set(filter.status);
    this.fromDate.set(filter.fromDate);
    this.toDate.set(filter.toDate);
    this.searchTerm.set(filter.searchTerm);
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.selectedEmployeeId.set(undefined);
    this.selectedDepartmentId.set(undefined);
    this.selectedBranchId.set(undefined);
    this.selectedStatus.set(undefined);
    this.fromDate.set(undefined);
    this.toDate.set(undefined);
    this.searchTerm.set(undefined);
    this.currentPage.set(1);
  }

  /**
   * Handle page change
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Handle page size change
   */
  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Handle table action clicks
   */
  onTableAction(event: {action: string, item: EmployeeExcuseDto}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewExcuse(item);
        break;
      case 'edit':
        this.editExcuse(item);
        break;
      case 'approve':
        this.approveExcuse(item);
        break;
      case 'reject':
        this.rejectExcuse(item);
        break;
      case 'cancel':
        this.cancelExcuse(item);
        break;
      case 'reopen':
        this.reopenExcuse(item);
        break;
      case 'delete':
        this.deleteExcuse(item);
        break;
      case 'download':
        this.downloadAttachment(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Check if user can create excuse requests
   */
  canCreate(): boolean {
    return this.permissionService.has(`excuse.${PermissionActions.CREATE}`);
  }

  /**
   * Check if user can edit excuse
   */
  canEditExcuse(excuse: EmployeeExcuseDto): boolean {
    const currentUser = this.permissionService.getCurrentUser();
    return this.permissionService.hasRole('Admin') ||
           this.permissionService.hasRole('SystemAdmin') ||
           currentUser?.employeeId === excuse.employeeId;
  }

  /**
   * Check if user can review excuse
   */
  canReviewExcuse(excuse: EmployeeExcuseDto): boolean {
    const currentUser = this.permissionService.getCurrentUser();
    return (this.permissionService.hasRole('Admin') ||
           this.permissionService.hasRole('SystemAdmin') ||
           this.permissionService.hasRole('Manager')) &&
           currentUser?.employeeId !== excuse.employeeId;
  }

  /**
   * Check if user can cancel excuse
   */
  canCancelExcuse(excuse: EmployeeExcuseDto): boolean {
    const currentUser = this.permissionService.getCurrentUser();
    return this.permissionService.hasRole('Admin') ||
           this.permissionService.hasRole('SystemAdmin') ||
           currentUser?.employeeId === excuse.employeeId;
  }

  /**
   * Format duration for display
   */
  formatDuration(hours: number): string {
    if (hours < 1) {
      return `${Math.round(hours * 60)} ${this.i18n.t('common.minutes')}`;
    }
    return `${hours} ${this.i18n.t('common.hours')}`;
  }

  /**
   * Format status for display
   */
  formatStatus(status: ExcuseStatus): string {
    if (!status) {
      return this.i18n.t('employee_excuses.status_pending');
    }
    return this.i18n.t(`employee_excuses.status_${status.toLowerCase()}`);
  }

  /**
   * Get status CSS class
   */
  getStatusClass(status: ExcuseStatus): string {
    switch (status) {
      case ExcuseStatus.Pending:
        return 'badge bg-warning';
      case ExcuseStatus.Approved:
        return 'badge bg-success';
      case ExcuseStatus.Rejected:
        return 'badge bg-danger';
      case ExcuseStatus.Cancelled:
        return 'badge bg-secondary';
      default:
        return 'badge bg-light';
    }
  }

  // New standardized filter methods
  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
  }

  onFiltersChange(filters: any): void {
    this.selectedEmployeeId.set(filters.employeeId ? +filters.employeeId : undefined);
    this.selectedDepartmentId.set(filters.departmentId ? +filters.departmentId : undefined);
    this.selectedBranchId.set(filters.branchId ? +filters.branchId : undefined);
    this.selectedStatus.set(filters.status as ExcuseStatus || undefined);
    this.currentPage.set(1);
  }

  onAddExcuse(): void {
    this.router.navigate(['/employee-excuses/create']);
  }

  onRefreshData(): void {
    this.clearFilters();
    this.loadEmployeeExcuses();
  }
}