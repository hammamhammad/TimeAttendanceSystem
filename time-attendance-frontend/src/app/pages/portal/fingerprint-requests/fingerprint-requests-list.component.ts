import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { TableActionsComponent, TableActionItem } from '../../../shared/components/table-actions/table-actions.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { FingerprintRequest, FingerprintRequestStatus, FingerprintRequestType } from '../models/fingerprint-request.model';

/**
 * Fingerprint Requests List Component
 * Displays all fingerprint requests for the current employee
 */
@Component({
  selector: 'app-fingerprint-requests-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    DataTableComponent,
    TableActionsComponent,
    EmptyStateComponent,
    StatusBadgeComponent
  ],
  templateUrl: './fingerprint-requests-list.component.html',
  styleUrl: './fingerprint-requests-list.component.css'
})
export class FingerprintRequestsListComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  // State from service
  requests = this.portalService.fingerprintRequests;
  loading = this.portalService.fingerprintRequestsLoading;
  error = this.portalService.fingerprintRequestsError;

  // Table columns
  readonly columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'requestType', label: 'Request Type', sortable: true },
    { key: 'issueDescription', label: 'Description', sortable: false },
    { key: 'preferredDate', label: 'Preferred Date', sortable: true },
    { key: 'status', label: 'Status', sortable: true, renderHtml: true },
    { key: 'createdAtUtc', label: 'Created', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false, width: '120px' }
  ];

  // Table actions
  readonly actions: TableActionItem[] = [
    {
      id: 'view',
      label: 'View',
      icon: 'fa-eye',
      variant: 'primary'
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: 'fa-edit',
      variant: 'warning',
      visible: (item: any) => item.status === FingerprintRequestStatus.Pending
    },
    {
      id: 'cancel',
      label: 'Cancel',
      icon: 'fa-times',
      variant: 'danger',
      visible: (item: any) => item.status === FingerprintRequestStatus.Pending || item.status === FingerprintRequestStatus.Scheduled
    }
  ];

  // Computed properties for table data
  tableData = computed(() => {
    const reqs = this.requests();
    return reqs.map(req => ({
      ...req,
      requestType: this.formatRequestType(req.requestType),
      preferredDate: req.preferredDate ? this.formatDate(req.preferredDate) : '-',
      status: this.getStatusBadgeHtml(req.status),
      createdAtUtc: this.formatDate(req.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadRequests();
  }

  ngOnDestroy(): void {
    this.portalService.clearFingerprintRequests();
  }

  loadRequests(): void {
    this.portalService.loadFingerprintRequests().subscribe({
      error: (error) => {
        console.error('Failed to load fingerprint requests:', error);
        this.notificationService.error(
          this.i18n.t('portal.failed_to_load_requests')
        );
      }
    });
  }

  refresh(): void {
    this.loadRequests();
  }

  createRequest(): void {
    this.router.navigate(['/portal/fingerprint-requests/new']);
  }

  onActionClick(event: { action: TableActionItem; item: any }): void {
    const request = this.requests().find(r => r.id === event.item.id);
    if (!request) return;

    switch (event.action.id) {
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

  viewRequest(request: FingerprintRequest): void {
    this.router.navigate(['/portal/fingerprint-requests', request.id]);
  }

  editRequest(request: FingerprintRequest): void {
    this.router.navigate(['/portal/fingerprint-requests', request.id, 'edit']);
  }

  async cancelRequest(request: FingerprintRequest): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_request'),
      message: this.i18n.t('portal.cancel_request_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.portalService.cancelFingerprintRequest(request.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('portal.request_cancelled_successfully')
          );
          this.loadRequests();
        },
        error: (error) => {
          console.error('Failed to cancel request:', error);
          this.notificationService.error(
            this.i18n.t('portal.failed_to_cancel_request')
          );
        }
      });
    }
  }

  formatRequestType(type: FingerprintRequestType): string {
    const typeMap: Record<FingerprintRequestType, string> = {
      [FingerprintRequestType.NewEnrollment]: 'New Enrollment',
      [FingerprintRequestType.Update]: 'Update',
      [FingerprintRequestType.Issue]: 'Issue/Problem',
      [FingerprintRequestType.AdditionalFingers]: 'Additional Fingers',
      [FingerprintRequestType.LocationChange]: 'Location Change'
    };
    return typeMap[type] || type;
  }

  getStatusBadgeHtml(status: FingerprintRequestStatus): string {
    const variants: Record<FingerprintRequestStatus, string> = {
      [FingerprintRequestStatus.Pending]: 'warning',
      [FingerprintRequestStatus.Scheduled]: 'info',
      [FingerprintRequestStatus.Completed]: 'success',
      [FingerprintRequestStatus.Cancelled]: 'secondary',
      [FingerprintRequestStatus.Rejected]: 'danger'
    };
    const variant = variants[status] || 'secondary';
    return `<span class="badge bg-${variant}">${status}</span>`;
  }

  formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
