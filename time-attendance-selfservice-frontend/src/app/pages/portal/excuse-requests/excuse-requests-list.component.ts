import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { EmployeeExcuseDto, ExcuseStatus, ExcuseType, ApprovalStatus } from '../../../shared/models/employee-excuse.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

/**
 * Excuse Requests List Component
 * Displays employee excuse requests in a data table
 */
@Component({
  selector: 'app-excuse-requests-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent
  ],
  templateUrl: './excuse-requests-list.component.html',
  styleUrl: './excuse-requests-list.component.css'
})
export class ExcuseRequestsListComponent implements OnInit, OnDestroy {
  private readonly excuseService = inject(EmployeeExcusesService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // State
  excuses = signal<EmployeeExcuseDto[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Sorting state
  sortColumn = signal<string>('excuseDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Table columns
  columns: TableColumn[] = [];

  initColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true, width: '80px' },
      { key: 'excuseDate', label: this.i18n.t('portal.excuse_date'), sortable: true },
      { key: 'excuseType', label: this.i18n.t('portal.excuse_type'), sortable: true },
      { key: 'startTime', label: this.i18n.t('portal.start_time'), sortable: false },
      { key: 'endTime', label: this.i18n.t('portal.end_time'), sortable: false },
      { key: 'durationHours', label: this.i18n.t('portal.duration'), sortable: true, width: '100px' },
      { key: 'createdAtUtc', label: this.i18n.t('portal.submitted_date'), sortable: true },
      { key: 'status', label: this.i18n.t('portal.status'), sortable: true, renderHtml: true }
    ];
  }

  // Table actions - using DataTableComponent's TableAction interface
  tableActions: TableAction[] = [];

  initTableActions(): void {
    this.tableActions = [
      {
        key: 'view',
        label: 'View',
        icon: 'bi-eye',
        color: 'primary'
      },
      {
        key: 'edit',
        label: 'Edit',
        icon: 'bi-pencil',
        color: 'warning',
        // Only allow edit for pending requests that haven't been finalized
        condition: (item: any) => this.canEditOrCancel(item)
      },
      {
        key: 'cancel',
        label: 'Cancel',
        icon: 'bi-x-circle',
        color: 'danger',
        // Only allow cancel for pending requests
        condition: (item: any) => this.canEditOrCancel(item)
      }
    ];
  }

  /**
   * Check if an excuse request can be edited or cancelled.
   * Only pending requests that haven't been finalized can be modified.
   */
  canEditOrCancel(item: any): boolean {
    // Get the original excuse to check workflow status
    const excuse = this.excuses().find(e => e.id === item.id);
    if (!excuse) return false;

    const workflowStatus = excuse.workflowStatus?.toLowerCase();
    const approvalStatus = excuse.approvalStatusDisplay?.toLowerCase() || excuse.status?.toLowerCase();

    // Cannot edit/cancel if already approved, rejected, or cancelled
    if (approvalStatus === 'approved') return false;
    if (approvalStatus === 'rejected') return false;
    if (approvalStatus === 'cancelled') return false;
    if (workflowStatus === 'approved' || workflowStatus === 'completed') return false;
    if (workflowStatus === 'rejected') return false;
    if (workflowStatus === 'expired') return false;

    // Can edit/cancel if workflow is pending or in progress
    return workflowStatus === 'pending' || workflowStatus === 'inprogress' || !workflowStatus;
  }

  // Helper to get status sort order
  getStatusSortOrder(excuse: EmployeeExcuseDto): number {
    const workflowStatus = excuse.workflowStatus?.toLowerCase();
    const approvalStatus = excuse.approvalStatusDisplay || excuse.status;

    if (workflowStatus === 'rejected' || approvalStatus === 'Rejected') return 1;
    if (workflowStatus === 'expired') return 2;
    if (approvalStatus === 'Pending' || workflowStatus === 'pending' || workflowStatus === 'inprogress') return 3;
    if (approvalStatus === 'Approved' || workflowStatus === 'approved' || workflowStatus === 'completed') return 4;
    if (approvalStatus === 'Cancelled') return 5;
    return 6;
  }

  // Computed table data with sorting
  tableData = computed(() => {
    const excs = this.excuses();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    // Sort the data
    const sorted = [...excs].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (column) {
        case 'id':
          aVal = a.id;
          bVal = b.id;
          break;
        case 'excuseDate':
          aVal = new Date(a.excuseDate).getTime();
          bVal = new Date(b.excuseDate).getTime();
          break;
        case 'excuseType':
          aVal = a.excuseType?.toLowerCase() || '';
          bVal = b.excuseType?.toLowerCase() || '';
          break;
        case 'durationHours':
          aVal = a.durationHours;
          bVal = b.durationHours;
          break;
        case 'createdAtUtc':
          aVal = new Date(a.createdAtUtc).getTime();
          bVal = new Date(b.createdAtUtc).getTime();
          break;
        case 'status':
          aVal = this.getStatusSortOrder(a);
          bVal = this.getStatusSortOrder(b);
          break;
        default:
          aVal = a.id;
          bVal = b.id;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Map to display format
    return sorted.map(excuse => ({
      ...excuse,
      excuseDate: this.formatDate(excuse.excuseDate),
      excuseType: this.getExcuseTypeLabel(excuse.excuseType),
      startTime: this.formatTime(excuse.startTime),
      endTime: this.formatTime(excuse.endTime),
      durationHours: this.formatDuration(excuse.durationHours),
      createdAtUtc: this.formatDate(excuse.createdAtUtc),
      status: this.getStatusBadgeHtml(excuse)
    }));
  });

  ngOnInit(): void {
    this.initColumns();
    this.initTableActions();
    this.loadExcuses();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  /**
   * Load excuse requests from the portal service (self-service)
   */
  loadExcuses(): void {
    this.loading.set(true);
    this.error.set(null);

    // Use portal endpoint for self-service (my-excuses)
    this.excuseService.getMyExcuses(1, 50).subscribe({
      next: (result) => {
        if (result) {
          this.excuses.set(result.items);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse requests:', error);
        this.error.set('Failed to load excuse requests');
        this.notificationService.error(this.i18n.t('portal.failed_to_load_excuses'));
        this.loading.set(false);
      }
    });
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
  }

  /**
   * Handle action clicks from table
   */
  onActionClick(event: { action: string; item: any }): void {
    const excuse = this.excuses().find(e => e.id === event.item.id);
    if (!excuse) return;

    switch (event.action) {
      case 'view':
        this.viewExcuse(excuse);
        break;
      case 'edit':
        this.editExcuse(excuse);
        break;
      case 'cancel':
        this.cancelExcuse(excuse);
        break;
    }
  }

  /**
   * Navigate to excuse request details
   */
  viewExcuse(excuse: EmployeeExcuseDto): void {
    this.router.navigate(['/excuse-requests', excuse.id]);
  }

  /**
   * Navigate to edit excuse request
   */
  editExcuse(excuse: EmployeeExcuseDto): void {
    this.router.navigate(['/excuse-requests', excuse.id, 'edit']);
  }

  /**
   * Navigate to create new excuse request
   */
  createExcuse(): void {
    this.router.navigate(['/excuse-requests/new']);
  }

  /**
   * Cancel an excuse request
   */
  async cancelExcuse(excuse: EmployeeExcuseDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_excuse'),
      message: this.i18n.t('portal.cancel_excuse_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi bi-x-circle',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.excuseService.cancelMyExcuse(excuse.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.excuse_cancelled'));
          this.loadExcuses();
        },
        error: (error) => {
          console.error('Failed to cancel excuse:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_excuse'));
        }
      });
    }
  }

  /**
   * Refresh the excuse list
   */
  refresh(): void {
    this.loadExcuses();
  }

  /**
   * Format time for display
   */
  private formatTime(timeString: string): string {
    return timeString.substring(0, 5); // HH:mm
  }

  /**
   * Get excuse type label
   */
  private getExcuseTypeLabel(type: ExcuseType): string {
    switch (type) {
      case ExcuseType.PersonalExcuse:
        return this.i18n.t('portal.personal_excuse');
      case ExcuseType.OfficialDuty:
        return this.i18n.t('portal.official_duty');
      default:
        return type;
    }
  }

  /**
   * Get status badge HTML for table display
   */
  getStatusBadgeHtml(excuse: EmployeeExcuseDto): string {
    // Prioritize the actual approval status from the excuse entity
    const approvalStatus = excuse.approvalStatus || excuse.approvalStatusDisplay || excuse.status;

    // Check for Cancelled first - this is the entity's actual state
    if (approvalStatus === 'Cancelled' || approvalStatus === ExcuseStatus.Cancelled) {
      return `<span class="badge bg-secondary">${this.i18n.t('portal.status_cancelled')}</span>`;
    }

    if (approvalStatus === 'Rejected' || approvalStatus === ExcuseStatus.Rejected) {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_rejected')}</span>`;
    }

    if (approvalStatus === 'Approved' || approvalStatus === ExcuseStatus.Approved) {
      return `<span class="badge bg-success">${this.i18n.t('portal.status_approved')}</span>`;
    }

    // Check workflow status for expired
    const workflowStatus = excuse.workflowStatus?.toLowerCase();
    if (workflowStatus === 'expired') {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_expired')}</span>`;
    }

    // Pending or in progress
    return `<span class="badge bg-warning">${this.i18n.t('portal.status_pending')}</span>`;
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  /**
   * Format duration hours as hours and minutes string
   * e.g., 1.5 hours -> "1 h 30 m", 2.25 hours -> "2 h 15 m"
   */
  private formatDuration(durationHours: number): string {
    const totalMinutes = Math.round(durationHours * 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) {
      return `${minutes} m`;
    } else if (minutes === 0) {
      return `${hours} h`;
    } else {
      return `${hours} h ${minutes} m`;
    }
  }
}
