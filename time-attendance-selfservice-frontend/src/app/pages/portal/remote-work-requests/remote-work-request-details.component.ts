import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { RemoteWorkRequestsService } from '../../../core/services/remote-work-requests.service';
import { PortalService } from '../services/portal.service';
import { RemoteWorkRequest, RemoteWorkRequestStatus } from '../../../core/models/remote-work-request.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { DelegationModalComponent } from '../../../shared/components/delegation-modal/delegation-modal.component';

/**
 * Portal Remote Work Request Details Component
 * Displays detailed information about a specific remote work request
 * Supports both employee view and manager approval view
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
    DetailCardComponent,
    DelegationModalComponent
  ],
  templateUrl: './remote-work-request-details.component.html',
  styleUrl: './remote-work-request-details.component.css'
})
export class PortalRemoteWorkRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly remoteWorkService = inject(RemoteWorkRequestsService);
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  request = signal<RemoteWorkRequest | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  isApprovalView = signal(false);
  showDelegationModal = signal(false);
  processingApproval = signal(false);

  // Computed properties
  statusBadge = computed(() => {
    const req = this.request();
    if (!req) return { label: '', variant: 'secondary' as const };

    // Check workflow status first for more accurate display
    const workflowStatus = req.workflowStatus?.toLowerCase();

    if (workflowStatus === 'expired') {
      return { label: this.i18n.t('portal.status_expired'), variant: 'danger' as const };
    }

    if (workflowStatus === 'rejected' || req.status === RemoteWorkRequestStatus.Rejected) {
      return { label: this.i18n.t('portal.status_rejected'), variant: 'danger' as const };
    }

    if (req.status === RemoteWorkRequestStatus.Cancelled) {
      return { label: this.i18n.t('portal.status_cancelled'), variant: 'secondary' as const };
    }

    if (req.isApproved || req.status === RemoteWorkRequestStatus.Approved) {
      if (req.isCurrentlyActive) {
        return { label: this.i18n.t('portal.status_active'), variant: 'info' as const };
      }
      if (req.isCompleted) {
        return { label: this.i18n.t('portal.status_completed'), variant: 'secondary' as const };
      }
      if (req.isUpcoming) {
        return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
      }
      return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
    }

    return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const req = this.request();
    if (!req) return [];

    return [
      {
        label: this.i18n.t('portal.employee'),
        value: req.employeeName || this.i18n.t('common.unknown')
      },
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
        value: `${req.workingDaysCount} ${req.workingDaysCount === 1 ? this.i18n.t('common.dayUnit') : this.i18n.t('common.days_text')}`
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
        label: this.i18n.t('portal.submitted_date'),
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

  pendingApprovalInfo = computed(() => {
    const req = this.request();
    if (!req || req.isApproved || req.status === RemoteWorkRequestStatus.Approved) {
      return null;
    }

    let pendingWith = req.currentApproverName || req.currentApproverRole;
    let stepProgress: string | null = null;

    if (req.currentStepOrder && req.totalSteps) {
      stepProgress = `${req.currentStepOrder}/${req.totalSteps}`;
    }

    return {
      pendingWith,
      stepProgress
    };
  });

  canEdit = computed(() => {
    const req = this.request();
    if (!req) return false;

    // Can only edit pending requests in non-approval view
    if (this.isApprovalView()) return false;

    const workflowStatus = req.workflowStatus?.toLowerCase();
    return req.status === RemoteWorkRequestStatus.Pending &&
           workflowStatus !== 'approved' &&
           workflowStatus !== 'rejected' &&
           workflowStatus !== 'expired';
  });

  canCancel = computed(() => {
    const req = this.request();
    if (!req) return false;

    // Can only cancel pending requests in non-approval view
    if (this.isApprovalView()) return false;

    const workflowStatus = req.workflowStatus?.toLowerCase();
    return req.status === RemoteWorkRequestStatus.Pending &&
           workflowStatus !== 'approved' &&
           workflowStatus !== 'rejected' &&
           workflowStatus !== 'expired';
  });

  canApprove = computed(() => {
    const req = this.request();
    // Can approve if: viewing for approval, not already approved, has workflow instance ID, and workflow is in progress
    return this.isApprovalView() &&
           req &&
           !req.isApproved &&
           req.workflowInstanceId &&
           (req.workflowStatus?.toLowerCase() === 'inprogress' || req.workflowStatus?.toLowerCase() === 'pending');
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const isApproval = this.route.snapshot.queryParamMap.get('approval') === 'true';
    this.isApprovalView.set(isApproval);

    if (id) {
      this.loadRequest(+id);
    }
  }

  private loadRequest(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    // Use appropriate service method based on view type
    // - Approval view: Use portal service to get request for manager approval
    // - Employee view: Use getMyById to get request with workflow data from portal endpoint
    const request$ = this.isApprovalView()
      ? this.portalService.getRemoteWorkForApproval(id)
      : this.remoteWorkService.getMyById(id);

    request$.subscribe({
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

  isRequestExpired(): boolean {
    const req = this.request();
    if (!req) return false;

    const workflowStatus = req.workflowStatus?.toLowerCase();
    return workflowStatus === 'expired';
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

  async onApprove(): Promise<void> {
    const req = this.request();
    if (!req || !req.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.approve_request'),
      message: this.i18n.t('portal.approve_remote_work_confirm'),
      confirmText: this.i18n.t('portal.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'bi-check-circle',
      iconClass: 'text-success',
      requireComments: false
    });

    if (result.confirmed) {
      this.processingApproval.set(true);
      this.portalService.approveWorkflowStep(req.workflowInstanceId, result.comments).subscribe({
        next: () => {
          this.processingApproval.set(false);
          this.notificationService.success(this.i18n.t('portal.remote_work_approved'));
          this.router.navigate(['/pending-approvals']);
        },
        error: (error) => {
          console.error('Failed to approve request:', error);
          this.processingApproval.set(false);
          this.notificationService.error(this.i18n.t('portal.failed_to_approve_remote_work'));
        }
      });
    }
  }

  async onReject(): Promise<void> {
    const req = this.request();
    if (!req || !req.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.reject_request'),
      message: this.i18n.t('portal.reject_remote_work_confirm'),
      confirmText: this.i18n.t('portal.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x-circle',
      iconClass: 'text-danger',
      requireComments: true
    });

    if (result.confirmed) {
      this.processingApproval.set(true);
      this.portalService.rejectWorkflowStep(req.workflowInstanceId, result.comments).subscribe({
        next: () => {
          this.processingApproval.set(false);
          this.notificationService.success(this.i18n.t('portal.remote_work_rejected'));
          this.router.navigate(['/pending-approvals']);
        },
        error: (error) => {
          console.error('Failed to reject request:', error);
          this.processingApproval.set(false);
          this.notificationService.error(this.i18n.t('portal.failed_to_reject_remote_work'));
        }
      });
    }
  }

  onDelegate(): void {
    this.showDelegationModal.set(true);
  }

  onCloseDelegationModal(): void {
    this.showDelegationModal.set(false);
  }

  onDelegateConfirmed(event: { userId: number; comments?: string }): void {
    const req = this.request();
    if (!req || !req.workflowInstanceId) return;

    this.processingApproval.set(true);
    this.showDelegationModal.set(false);

    this.portalService.delegateWorkflowStep(req.workflowInstanceId, event.userId, event.comments).subscribe({
      next: () => {
        this.processingApproval.set(false);
        this.notificationService.success(this.i18n.t('portal.remote_work_delegated'));
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Failed to delegate request:', error);
        this.processingApproval.set(false);
        this.notificationService.error(this.i18n.t('portal.failed_to_delegate_remote_work'));
      }
    });
  }

  onBack(): void {
    if (this.isApprovalView()) {
      this.router.navigate(['/pending-approvals']);
    } else {
      this.router.navigate(['/remote-work-requests']);
    }
  }

  getStepStatusLabel(status: string): string {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'approved':
        return this.i18n.t('portal.approved');
      case 'rejected':
        return this.i18n.t('portal.rejected');
      case 'pending':
        return this.i18n.t('portal.pending');
      case 'skipped':
        return this.i18n.t('portal.skipped');
      case 'delegated':
        return this.i18n.t('portal.delegated');
      default:
        return status;
    }
  }

  getStepStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'secondary' | 'info' | 'primary' {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'pending':
        return 'warning';
      case 'skipped':
        return 'secondary';
      case 'delegated':
        return 'info';
      default:
        return 'secondary';
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const locale = this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    const locale = this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US';
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
