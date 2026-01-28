import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { AttendanceCorrectionsService } from './attendance-corrections.service';
import {
  AttendanceCorrectionRequestDto,
  ApprovalStatus,
  AttendanceCorrectionType
} from '../../shared/models/attendance-correction.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

/**
 * Attendance Corrections List Component
 * Displays employee attendance correction requests in a data table
 */
@Component({
  selector: 'app-attendance-corrections-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent
  ],
  templateUrl: './attendance-corrections-list.component.html',
  styleUrl: './attendance-corrections-list.component.css'
})
export class AttendanceCorrectionsListComponent implements OnInit, OnDestroy {
  private readonly correctionService = inject(AttendanceCorrectionsService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // State
  corrections = signal<AttendanceCorrectionRequestDto[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Sorting state
  sortColumn = signal<string>('correctionDate');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Table columns
  columns: TableColumn[] = [];

  initColumns(): void {
    this.columns = [
      { key: 'id', label: 'ID', sortable: true, width: '80px' },
      { key: 'correctionDate', label: this.i18n.t('portal.correction_date'), sortable: true },
      { key: 'correctionTime', label: this.i18n.t('portal.correction_time'), sortable: false },
      { key: 'correctionType', label: this.i18n.t('portal.correction_type'), sortable: true },
      { key: 'reason', label: this.i18n.t('portal.reason'), sortable: false, width: '200px' },
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
   * Check if a correction request can be edited or cancelled.
   * Only pending requests that haven't been finalized can be modified.
   */
  canEditOrCancel(item: any): boolean {
    // Get the original correction to check workflow status
    const correction = this.corrections().find(c => c.id === item.id);
    if (!correction) return false;

    const workflowStatus = correction.workflowStatus?.toLowerCase();
    const approvalStatus = correction.approvalStatusDisplay?.toLowerCase() || correction.approvalStatus?.toLowerCase();

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
  getStatusSortOrder(correction: AttendanceCorrectionRequestDto): number {
    const workflowStatus = correction.workflowStatus?.toLowerCase();
    const approvalStatus = correction.approvalStatusDisplay || correction.approvalStatus;

    if (workflowStatus === 'rejected' || approvalStatus === 'Rejected') return 1;
    if (workflowStatus === 'expired') return 2;
    if (approvalStatus === 'Pending' || workflowStatus === 'pending' || workflowStatus === 'inprogress') return 3;
    if (approvalStatus === 'Approved' || workflowStatus === 'approved' || workflowStatus === 'completed') return 4;
    if (approvalStatus === 'Cancelled') return 5;
    return 6;
  }

  // Computed table data with sorting
  tableData = computed(() => {
    const corrs = this.corrections();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    // Sort the data
    const sorted = [...corrs].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (column) {
        case 'id':
          aVal = a.id;
          bVal = b.id;
          break;
        case 'correctionDate':
          aVal = new Date(a.correctionDate).getTime();
          bVal = new Date(b.correctionDate).getTime();
          break;
        case 'correctionType':
          aVal = a.correctionType;
          bVal = b.correctionType;
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
    return sorted.map(correction => ({
      ...correction,
      correctionDate: this.formatDate(correction.correctionDate),
      correctionTime: this.formatTime(correction.correctionTime),
      correctionType: this.getCorrectionTypeLabel(correction.correctionType),
      reason: this.truncateReason(correction.reason),
      createdAtUtc: this.formatDate(correction.createdAtUtc),
      status: this.getStatusBadgeHtml(correction)
    }));
  });

  ngOnInit(): void {
    this.initColumns();
    this.initTableActions();
    this.loadCorrections();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  /**
   * Load correction requests from the service (self-service)
   */
  loadCorrections(): void {
    this.loading.set(true);
    this.error.set(null);

    // Use portal endpoint for self-service (my-attendance-corrections)
    this.correctionService.getMyCorrectionRequests(1, 50).subscribe({
      next: (result) => {
        if (result) {
          this.corrections.set(result.items);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load correction requests:', error);
        this.error.set('Failed to load correction requests');
        this.notificationService.error(this.i18n.t('portal.failed_to_load_corrections'));
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
    const correction = this.corrections().find(c => c.id === event.item.id);
    if (!correction) return;

    switch (event.action) {
      case 'view':
        this.viewCorrection(correction);
        break;
      case 'edit':
        this.editCorrection(correction);
        break;
      case 'cancel':
        this.cancelCorrection(correction);
        break;
    }
  }

  /**
   * Navigate to correction request details
   */
  viewCorrection(correction: AttendanceCorrectionRequestDto): void {
    this.router.navigate(['/attendance-corrections', correction.id]);
  }

  /**
   * Navigate to edit correction request
   */
  editCorrection(correction: AttendanceCorrectionRequestDto): void {
    this.router.navigate(['/attendance-corrections', correction.id, 'edit']);
  }

  /**
   * Navigate to create new correction request
   */
  createCorrection(): void {
    this.router.navigate(['/attendance-corrections/new']);
  }

  /**
   * Cancel a correction request
   */
  async cancelCorrection(correction: AttendanceCorrectionRequestDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_correction'),
      message: this.i18n.t('portal.cancel_correction_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi bi-x-circle',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.correctionService.cancelMyCorrectionRequest(correction.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.correction_cancelled'));
          this.loadCorrections();
        },
        error: (error) => {
          console.error('Failed to cancel correction:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_correction'));
        }
      });
    }
  }

  /**
   * Refresh the correction list
   */
  refresh(): void {
    this.loadCorrections();
  }

  /**
   * Format time for display
   */
  private formatTime(timeString: string): string {
    if (!timeString) return '';
    // Handle both "HH:mm:ss" and "HH:mm" formats
    return timeString.substring(0, 5); // HH:mm
  }

  /**
   * Get correction type label
   */
  private getCorrectionTypeLabel(type: AttendanceCorrectionType): string {
    switch (type) {
      case AttendanceCorrectionType.CheckIn:
        return this.i18n.t('portal.check_in');
      case AttendanceCorrectionType.CheckOut:
        return this.i18n.t('portal.check_out');
      default:
        return String(type);
    }
  }

  /**
   * Truncate reason for table display
   */
  private truncateReason(reason: string): string {
    if (!reason) return '';
    const maxLength = 50;
    return reason.length > maxLength ? reason.substring(0, maxLength) + '...' : reason;
  }

  /**
   * Get status badge HTML for table display
   */
  getStatusBadgeHtml(correction: AttendanceCorrectionRequestDto): string {
    // Prioritize the actual approval status from the correction entity
    const approvalStatus = correction.approvalStatus || correction.approvalStatusDisplay;

    // Check for Cancelled first - this is the entity's actual state
    if (approvalStatus === 'Cancelled' || approvalStatus === ApprovalStatus.Cancelled) {
      return `<span class="badge bg-secondary">${this.i18n.t('portal.status_cancelled')}</span>`;
    }

    if (approvalStatus === 'Rejected' || approvalStatus === ApprovalStatus.Rejected) {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_rejected')}</span>`;
    }

    if (approvalStatus === 'Approved' || approvalStatus === ApprovalStatus.Approved) {
      return `<span class="badge bg-success">${this.i18n.t('portal.status_approved')}</span>`;
    }

    // Check workflow status for expired
    const workflowStatus = correction.workflowStatus?.toLowerCase();
    if (workflowStatus === 'expired') {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_expired')}</span>`;
    }

    // Pending or in progress
    return `<span class="badge bg-warning">${this.i18n.t('portal.status_pending')}</span>`;
  }

  formatDate(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
