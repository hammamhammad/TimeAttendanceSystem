import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

/**
 * Remote Work Requests List Component
 * Displays employee remote work requests in a data table
 */
@Component({
  selector: 'app-remote-work-requests-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    EmptyStateComponent,
    LoadingSpinnerComponent,
    PageHeaderComponent
  ],
  templateUrl: './remote-work-requests-list.component.html',
  styleUrl: './remote-work-requests-list.component.css'
})
export class RemoteWorkRequestsListComponent implements OnInit {
  readonly i18n = inject(I18nService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  readonly confirmationService = inject(ConfirmationService);
  readonly remoteWorkService = inject(RemoteWorkRequestsService);

  // State
  requests = signal<RemoteWorkRequest[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Table configuration
  columns: TableColumn[] = [];

  initColumns(): void {
    this.columns = [
      { key: 'startDate', label: this.i18n.t('portal.start_date'), sortable: true },
      { key: 'endDate', label: this.i18n.t('portal.end_date'), sortable: true },
      { key: 'workingDaysCount', label: this.i18n.t('portal.days_column'), sortable: true },
      { key: 'reason', label: this.i18n.t('portal.reason'), sortable: false },
      { key: 'status', label: this.i18n.t('portal.status'), sortable: true, renderHtml: true },
      { key: 'createdAtUtc', label: this.i18n.t('portal.requested_column'), sortable: true }
    ];
  }

  // Table actions - using DataTableComponent's TableAction interface
  tableActions: TableAction[] = [];

  initTableActions(): void {
    this.tableActions = [
      {
        key: 'view',
        label: this.i18n.t('common.view'),
        icon: 'bi-eye',
        color: 'primary'
      },
      {
        key: 'edit',
        label: this.i18n.t('common.edit'),
        icon: 'bi-pencil',
        color: 'warning',
        condition: (item: any) => this.canEdit(item)
      },
      {
        key: 'cancel',
        label: this.i18n.t('common.cancel'),
        icon: 'bi-x-circle',
        color: 'danger',
        condition: (item: any) => this.canCancel(item)
      }
    ];
  }

  // Computed table data with formatted values
  tableData = computed(() => {
    return this.requests().map(request => ({
      ...request,
      startDate: this.formatDate(request.startDate),
      endDate: this.formatDate(request.endDate),
      workingDaysCount: `${request.workingDaysCount} ${request.workingDaysCount === 1 ? this.i18n.t('common.dayUnit') : this.i18n.t('common.days_text')}`,
      status: this.getStatusBadgeHtml(request),
      createdAtUtc: this.formatDateTime(request.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.initColumns();
    this.initTableActions();
    this.loadRequests();
  }

  /**
   * Load remote work requests from the service (secure endpoint - only current user's requests)
   */
  loadRequests(): void {
    this.loading.set(true);
    this.error.set(null);

    this.remoteWorkService.getMyRequests().subscribe({
      next: (response) => {
        this.requests.set(response.items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load remote work requests:', error);
        this.error.set('Failed to load remote work requests');
        this.notificationService.error(this.i18n.t('portal.failed_to_load_remote_work'));
        this.loading.set(false);
      }
    });
  }

  /**
   * Handle action clicks from table
   */
  onActionClick(event: { action: string; item: any }): void {
    const request = this.requests().find(r => r.id === event.item.id);
    if (!request) return;

    switch (event.action) {
      case 'view':
        this.viewRequest(request);
        break;
      case 'edit':
        this.editRequest(request);
        break;
      case 'cancel':
        this.cancelRequest(request);
        break;
    }
  }

  /**
   * Check if request can be edited
   */
  canEdit(item: any): boolean {
    const request = this.requests().find(r => r.id === item.id);
    if (!request) return false;

    const workflowStatus = request.workflowStatus?.toLowerCase();
    return request.status === RemoteWorkRequestStatus.Pending &&
           workflowStatus !== 'approved' &&
           workflowStatus !== 'rejected' &&
           workflowStatus !== 'expired';
  }

  /**
   * Check if request can be cancelled
   */
  canCancel(item: any): boolean {
    const request = this.requests().find(r => r.id === item.id);
    if (!request) return false;

    const workflowStatus = request.workflowStatus?.toLowerCase();
    return request.status === RemoteWorkRequestStatus.Pending &&
           workflowStatus !== 'approved' &&
           workflowStatus !== 'rejected' &&
           workflowStatus !== 'expired';
  }

  /**
   * Navigate to request details
   */
  viewRequest(request: RemoteWorkRequest): void {
    this.router.navigate(['/remote-work-requests', request.id]);
  }

  /**
   * Navigate to edit request
   */
  editRequest(request: RemoteWorkRequest): void {
    this.router.navigate(['/remote-work-requests', request.id, 'edit']);
  }

  /**
   * Navigate to create new request
   */
  createRequest(): void {
    this.router.navigate(['/remote-work-requests', 'new']);
  }

  /**
   * Cancel a remote work request
   */
  async cancelRequest(request: RemoteWorkRequest): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_remote_work'),
      message: this.i18n.t('portal.cancel_remote_work_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.loading.set(true);
      this.remoteWorkService.cancel(request.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.remote_work_cancelled'));
          this.loadRequests();
        },
        error: (error) => {
          console.error('Failed to cancel request:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_remote_work'));
          this.loading.set(false);
        }
      });
    }
  }

  /**
   * Refresh the requests list
   */
  refresh(): void {
    this.loadRequests();
  }

  /**
   * Get status badge HTML for table display
   * Uses workflow status when available for more accurate display
   */
  private getStatusBadgeHtml(request: RemoteWorkRequest): string {
    const workflowStatus = request.workflowStatus?.toLowerCase();

    // Check workflow status first
    if (workflowStatus === 'expired') {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_expired')}</span>`;
    }

    if (workflowStatus === 'rejected' || request.status === RemoteWorkRequestStatus.Rejected) {
      return `<span class="badge bg-danger">${this.i18n.t('portal.status_rejected')}</span>`;
    }

    if (request.status === RemoteWorkRequestStatus.Cancelled) {
      return `<span class="badge bg-secondary">${this.i18n.t('portal.status_cancelled')}</span>`;
    }

    // Check for approved with active/completed/upcoming states
    if (request.isApproved || request.status === RemoteWorkRequestStatus.Approved) {
      if (request.isCurrentlyActive) {
        return `<span class="badge bg-info">${this.i18n.t('portal.status_active')}</span>`;
      }
      if (request.isCompleted) {
        return `<span class="badge bg-secondary">${this.i18n.t('portal.status_completed')}</span>`;
      }
      if (request.isUpcoming) {
        return `<span class="badge bg-success">${this.i18n.t('portal.status_approved')}</span>`;
      }
      return `<span class="badge bg-success">${this.i18n.t('portal.status_approved')}</span>`;
    }

    // Default to pending
    return `<span class="badge bg-warning">${this.i18n.t('portal.status_pending')}</span>`;
  }

  /**
   * Format date for display with locale support
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const locale = this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format date and time for display with locale support
   */
  private formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const locale = this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
