import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { TableActionsComponent, TableActionItem } from '../../../shared/components/table-actions/table-actions.component';
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
    TableActionsComponent,
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
  readonly columns: TableColumn[] = [
    { key: 'startDate', label: 'Start Date', sortable: true },
    { key: 'endDate', label: 'End Date', sortable: true },
    { key: 'workingDaysCount', label: 'Days', sortable: true },
    { key: 'reason', label: 'Reason', sortable: false },
    { key: 'status', label: 'Status', sortable: true, renderHtml: true },
    { key: 'createdAtUtc', label: 'Requested', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false }
  ];

  readonly actions: TableActionItem[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'fa-eye',
      variant: 'primary'
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'fa-times',
      variant: 'danger',
      visible: (item: RemoteWorkRequest) => item.status === RemoteWorkRequestStatus.Pending
    }
  ];

  // Computed table data with formatted values
  tableData = computed(() => {
    return this.requests().map(request => ({
      ...request,
      startDate: this.formatDate(request.startDate),
      endDate: this.formatDate(request.endDate),
      workingDaysCount: `${request.workingDaysCount} days`,
      status: this.getStatusBadgeHtml(request),
      createdAtUtc: this.formatDateTime(request.createdAtUtc),
      actions: request
    }));
  });

  ngOnInit(): void {
    this.loadRequests();
  }

  /**
   * Load remote work requests from the service
   */
  loadRequests(): void {
    this.loading.set(true);
    this.error.set(null);

    this.remoteWorkService.getAll().subscribe({
      next: (requests) => {
        this.requests.set(requests);
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
  onActionClick(event: { action: TableActionItem; item: any }): void {
    const request = event.item as RemoteWorkRequest;

    switch (event.action.id) {
      case 'view':
        this.viewRequest(request);
        break;
      case 'cancel':
        this.cancelRequest(request);
        break;
    }
  }

  /**
   * Navigate to request details
   */
  viewRequest(request: RemoteWorkRequest): void {
    this.router.navigate(['/portal/remote-work-requests', request.id]);
  }

  /**
   * Navigate to create new request
   */
  createRequest(): void {
    this.router.navigate(['/portal/remote-work-requests', 'new']);
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
      icon: 'fa-times',
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
   * Format date for display
   */
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format date and time for display
   */
  private formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  /**
   * Get status badge HTML for table display
   */
  private getStatusBadgeHtml(request: RemoteWorkRequest): string {
    switch (request.status) {
      case RemoteWorkRequestStatus.Pending:
        return '<span class="badge bg-warning">Pending</span>';
      case RemoteWorkRequestStatus.Approved:
        return '<span class="badge bg-success">Approved</span>';
      case RemoteWorkRequestStatus.Rejected:
        return '<span class="badge bg-danger">Rejected</span>';
      case RemoteWorkRequestStatus.Cancelled:
        return '<span class="badge bg-secondary">Cancelled</span>';
      default:
        return `<span class="badge bg-secondary">${request.status}</span>`;
    }
  }
}
