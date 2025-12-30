import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';

/**
 * Portal Remote Work Request Details Component
 * Displays detailed information about a specific remote work request
 */
@Component({
  selector: 'app-portal-remote-work-request-details',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    DetailCardComponent
  ],
  templateUrl: './remote-work-request-details.component.html',
  styleUrl: './remote-work-request-details.component.css'
})
export class PortalRemoteWorkRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  request = signal<RemoteWorkRequest | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed properties
  statusBadge = computed(() => {
    const req = this.request();
    if (!req) return { label: '', variant: 'secondary' as const };

    switch (req.status) {
      case RemoteWorkRequestStatus.Pending:
        return { label: 'Pending', variant: 'warning' as const };
      case RemoteWorkRequestStatus.Approved:
        return { label: 'Approved', variant: 'success' as const };
      case RemoteWorkRequestStatus.Rejected:
        return { label: 'Rejected', variant: 'danger' as const };
      case RemoteWorkRequestStatus.Cancelled:
        return { label: 'Cancelled', variant: 'secondary' as const };
      default:
        return { label: String(req.status), variant: 'secondary' as const };
    }
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const req = this.request();
    if (!req) return [];

    return [
      {
        label: this.i18n.t('portal.start_date'),
        value: this.formatDate(req.startDate)
      },
      {
        label: this.i18n.t('portal.end_date'),
        value: this.formatDate(req.endDate)
      },
      {
        label: this.i18n.t('portal.working_days'),
        value: `${req.workingDaysCount} ${req.workingDaysCount === 1 ? this.i18n.t('common.day') : this.i18n.t('common.days')}`
      },
      {
        label: this.i18n.t('portal.reason'),
        value: req.reason || this.i18n.t('common.not_provided')
      }
    ];
  });

  submissionInfoItems = computed<DefinitionItem[]>(() => {
    const req = this.request();
    if (!req) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('portal.submitted_by'),
        value: req.createdByUserName || this.i18n.t('common.unknown')
      },
      {
        label: this.i18n.t('portal.submission_date'),
        value: this.formatDateTime(req.createdAtUtc)
      }
    ];

    if (req.modifiedAtUtc) {
      items.push({
        label: this.i18n.t('portal.last_modified'),
        value: this.formatDateTime(req.modifiedAtUtc)
      });
    }

    return items;
  });

  approvalInfoItems = computed<DefinitionItem[]>(() => {
    const req = this.request();
    if (!req) return [];

    const items: DefinitionItem[] = [];

    if (req.approvedByUserName) {
      items.push({
        label: this.i18n.t('portal.approved_by'),
        value: req.approvedByUserName
      });
    }

    if (req.approvedAt) {
      items.push({
        label: this.i18n.t('portal.approval_date'),
        value: this.formatDateTime(req.approvedAt)
      });
    }

    if (req.approvalComments) {
      items.push({
        label: this.i18n.t('portal.approval_comments'),
        value: req.approvalComments
      });
    }

    if (req.rejectionReason) {
      items.push({
        label: this.i18n.t('portal.rejection_reason'),
        value: req.rejectionReason
      });
    }

    return items;
  });

  canEdit = computed(() => {
    const req = this.request();
    return req && req.status === RemoteWorkRequestStatus.Pending;
  });

  canCancel = computed(() => {
    const req = this.request();
    return req && req.status === RemoteWorkRequestStatus.Pending;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRequest(+id);
    }
  }

  private loadRequest(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.remoteWorkService.getById(id).subscribe({
      next: (request) => {
        this.request.set(request);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load remote work request:', error);
        this.error.set(this.i18n.t('portal.failed_to_load_remote_work'));
        this.loading.set(false);
      }
    });
  }

  onEdit(): void {
    const req = this.request();
    if (req) {
      this.router.navigate(['/remote-work-requests', req.id, 'edit']);
    }
  }

  async onCancel(): Promise<void> {
    const req = this.request();
    if (!req) return;

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
      this.remoteWorkService.cancel(req.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.remote_work_cancelled'));
          this.router.navigate(['/remote-work-requests']);
        },
        error: (error) => {
          console.error('Failed to cancel request:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_remote_work'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/remote-work-requests']);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
