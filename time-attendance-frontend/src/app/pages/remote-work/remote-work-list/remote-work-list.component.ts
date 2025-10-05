import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';

@Component({
  selector: 'app-remote-work-list',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    StatusBadgeComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './remote-work-list.component.html',
  styleUrls: ['./remote-work-list.component.css']
})
export class RemoteWorkListComponent implements OnInit {
  private readonly service = inject(RemoteWorkRequestsService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly permissionService = inject(PermissionService);
  readonly i18n = inject(I18nService);

  requests = signal<RemoteWorkRequest[]>([]);
  loading = signal(false);

  // Table configuration
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('remoteWork.request.employee'), sortable: true, width: '25%' },
    { key: 'startDate', label: this.i18n.t('remoteWork.request.startDate'), sortable: true, width: '15%' },
    { key: 'endDate', label: this.i18n.t('remoteWork.request.endDate'), sortable: true, width: '15%' },
    { key: 'workingDaysCount', label: this.i18n.t('remoteWork.request.workingDays'), sortable: true, width: '15%', align: 'center' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, width: '15%', align: 'center' }
  ];

  // Table actions
  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'cancel', label: this.i18n.t('remoteWork.request.cancel'), icon: 'fa-ban', color: 'warning' }
  ];

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (requests) => {
        this.requests.set(requests);
        this.loading.set(false);
      },
      error: (error) => {
        this.notification.error(this.i18n.t('remoteWork.request.loadError'));
        this.loading.set(false);
      }
    });
  }

  onView(request: RemoteWorkRequest): void {
    this.router.navigate(['/remote-work', request.id, 'view']);
  }

  onEdit(request: RemoteWorkRequest): void {
    this.router.navigate(['/remote-work/edit', request.id]);
  }

  onCancel(request: RemoteWorkRequest): void {
    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.request.cancelConfirm'),
      message: this.i18n.t('remoteWork.request.cancelMessage'),
      confirmText: this.i18n.t('common.yes'),
      cancelText: this.i18n.t('common.no')
    }).then(result => {
      if (result.confirmed) {
        this.service.cancel(request.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.request.success.cancelled'));
            this.loadRequests();
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.request.errors.cancel_failed'));
          }
        });
      }
    });
  }

  onCreate(): void {
    this.router.navigate(['/remote-work/create']);
  }

  /**
   * Handle search change from unified filter
   */
  onSearchChange(searchTerm: string): void {
    // Implement search filtering if needed
    console.log('Search term:', searchTerm);
  }

  /**
   * Handle filter changes from unified filter
   */
  onFiltersChange(filters: any): void {
    // Implement custom filtering if needed
    console.log('Filters changed:', filters);
  }

  /**
   * Handle refresh from unified filter
   */
  onRefreshData(): void {
    this.loadRequests();
  }

  /**
   * Handle table actions
   */
  onActionClick(event: { action: string, item: RemoteWorkRequest }): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onView(item);
        break;
      case 'edit':
        this.onEdit(item);
        break;
      case 'cancel':
        this.onCancel(item);
        break;
    }
  }

  /**
   * Get status text for display
   */
  getStatusText(status: RemoteWorkRequestStatus): string {
    const statusMap: Record<RemoteWorkRequestStatus, string> = {
      [RemoteWorkRequestStatus.Pending]: this.i18n.t('remoteWork.status.pending'),
      [RemoteWorkRequestStatus.Approved]: this.i18n.t('remoteWork.status.approved'),
      [RemoteWorkRequestStatus.Rejected]: this.i18n.t('remoteWork.status.rejected'),
      [RemoteWorkRequestStatus.Cancelled]: this.i18n.t('remoteWork.status.cancelled')
    };
    return statusMap[status] || '';
  }

  /**
   * Get status badge variant
   */
  getStatusVariant(status: RemoteWorkRequestStatus): string {
    const statusMap: Record<RemoteWorkRequestStatus, string> = {
      [RemoteWorkRequestStatus.Pending]: 'warning',
      [RemoteWorkRequestStatus.Approved]: 'success',
      [RemoteWorkRequestStatus.Rejected]: 'danger',
      [RemoteWorkRequestStatus.Cancelled]: 'secondary'
    };
    return statusMap[status] || 'secondary';
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString();
  }
}
