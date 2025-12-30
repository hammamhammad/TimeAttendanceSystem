import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { NotificationService } from '../../../core/notifications/notification.service';
import { I18nService } from '../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';

@Component({
  selector: 'app-view-remote-work-assignment',
  standalone: true,
  imports: [
    RouterModule,
    FormHeaderComponent,
    DefinitionListComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent
],
  templateUrl: './view-remote-work-assignment.component.html',
  styleUrls: ['./view-remote-work-assignment.component.css']
})
export class ViewRemoteWorkAssignmentComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  request = signal<RemoteWorkRequest | null>(null);
  loading = signal(false);
  requestId = signal<number | null>(null);

  statusBadge = computed(() => {
    const status = this.request()?.status;
    if (status === undefined) return { label: '', variant: 'secondary' };

    return {
      label: this.getStatusText(status),
      variant: this.getStatusVariant(status)
    };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const request = this.request();
    if (!request) return [];

    return [
      {
        label: this.i18n.t('remoteWork.request.employee'),
        value: request.employeeName || '-'
      },
      {
        label: this.i18n.t('remoteWork.request.startDate'),
        value: this.formatDate(request.startDate)
      },
      {
        label: this.i18n.t('remoteWork.request.endDate'),
        value: this.formatDate(request.endDate)
      },
      {
        label: this.i18n.t('remoteWork.request.workingDays'),
        value: request.workingDaysCount.toString()
      },
      {
        label: this.i18n.t('remoteWork.request.created_by'),
        value: request.createdByUserName || '-'
      }
    ];
  });

  approvalInfoItems = computed<DefinitionItem[]>(() => {
    const request = this.request();
    if (!request) return [];

    const items: DefinitionItem[] = [];

    if (request.approvedByUserName) {
      items.push({
        label: this.i18n.t('remoteWork.request.approved_by'),
        value: request.approvedByUserName
      });
    }

    if (request.approvedAt) {
      items.push({
        label: this.i18n.t('remoteWork.request.approval_date'),
        value: this.formatDateTime(request.approvedAt)
      });
    }

    if (request.rejectionReason) {
      items.push({
        label: this.i18n.t('remoteWork.request.rejection_reason'),
        value: request.rejectionReason
      });
    }

    return items;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.requestId.set(parseInt(id, 10));
      this.loadRequest();
    }
  }

  private loadRequest(): void {
    const id = this.requestId();
    if (!id) return;

    this.loading.set(true);
    this.remoteWorkService.getById(id).subscribe({
      next: (request) => {
        this.request.set(request);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('remoteWork.request.errors.load_failed'));
        this.loading.set(false);
        this.router.navigate(['/remote-work']);
      }
    });
  }

  onEdit(): void {
    const id = this.requestId();
    if (id) {
      this.router.navigate(['/remote-work/edit', id]);
    }
  }

  onApprove(): void {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t('remoteWork.request.errors.cannot_approve'));
      return;
    }

    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.request.approveConfirm'),
      message: this.i18n.t('remoteWork.request.approveMessage'),
      confirmText: this.i18n.t('common.yes'),
      cancelText: this.i18n.t('common.no')
    }).then(result => {
      if (result.confirmed && request) {
        // TODO: Get the actual approver ID from the current user
        const approverId = 1; // Placeholder
        this.remoteWorkService.approve({
          requestId: request.id,
          approverId: approverId,
          decision: RemoteWorkRequestStatus.Approved
        }).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.request.success.approved'));
            this.loadRequest(); // Reload to show updated status
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.request.errors.approve_failed'));
          }
        });
      }
    });
  }

  onReject(): void {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t('remoteWork.request.errors.cannot_reject'));
      return;
    }

    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.request.rejectConfirm'),
      message: this.i18n.t('remoteWork.request.rejectMessage'),
      confirmText: this.i18n.t('common.yes'),
      cancelText: this.i18n.t('common.no')
    }).then(result => {
      if (result.confirmed && request) {
        // TODO: Get the actual approver ID from the current user
        const approverId = 1; // Placeholder
        this.remoteWorkService.approve({
          requestId: request.id,
          approverId: approverId,
          decision: RemoteWorkRequestStatus.Rejected,
          rejectionReason: ''
        }).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.request.success.rejected'));
            this.loadRequest(); // Reload to show updated status
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.request.errors.reject_failed'));
          }
        });
      }
    });
  }

  onCancel(): void {
    const request = this.request();
    if (!request || request.status !== RemoteWorkRequestStatus.Pending) {
      this.notification.warning(this.i18n.t('remoteWork.request.errors.cannot_cancel'));
      return;
    }

    this.confirmation.confirm({
      title: this.i18n.t('remoteWork.request.cancelConfirm'),
      message: this.i18n.t('remoteWork.request.cancelMessage'),
      confirmText: this.i18n.t('common.yes'),
      cancelText: this.i18n.t('common.no')
    }).then(result => {
      if (result.confirmed && request) {
        this.remoteWorkService.cancel(request.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('remoteWork.request.success.cancelled'));
            this.router.navigate(['/remote-work']);
          },
          error: () => {
            this.notification.error(this.i18n.t('remoteWork.request.errors.cancel_failed'));
          }
        });
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/remote-work']);
  }

  private getStatusText(status: RemoteWorkRequestStatus): string {
    const statusMap: Record<RemoteWorkRequestStatus, string> = {
      [RemoteWorkRequestStatus.Pending]: this.i18n.t('remoteWork.status.pending'),
      [RemoteWorkRequestStatus.Approved]: this.i18n.t('remoteWork.status.approved'),
      [RemoteWorkRequestStatus.Rejected]: this.i18n.t('remoteWork.status.rejected'),
      [RemoteWorkRequestStatus.Cancelled]: this.i18n.t('remoteWork.status.cancelled')
    };
    return statusMap[status] || '';
  }

  private getStatusVariant(status: RemoteWorkRequestStatus): string {
    const statusMap: Record<RemoteWorkRequestStatus, string> = {
      [RemoteWorkRequestStatus.Pending]: 'warning',
      [RemoteWorkRequestStatus.Approved]: 'success',
      [RemoteWorkRequestStatus.Rejected]: 'danger',
      [RemoteWorkRequestStatus.Cancelled]: 'secondary'
    };
    return statusMap[status] || 'secondary';
  }

  private formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  private formatDateTime(dateTime: string): string {
    if (!dateTime) return '-';
    return new Date(dateTime).toLocaleString();
  }
}
