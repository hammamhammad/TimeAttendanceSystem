import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { PortalService } from '../services/portal.service';
import { EmployeeExcuseDto, ExcuseStatus, ExcuseType, ApprovalStatus } from '../../../shared/models/employee-excuse.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { DelegationModalComponent, DelegationResult } from '../../../shared/components/delegation-modal/delegation-modal.component';

/**
 * Portal Excuse Request Details Component
 * Displays detailed information about a specific excuse request
 */
@Component({
  selector: 'app-portal-excuse-request-details',
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
  templateUrl: './excuse-request-details.component.html',
  styleUrl: './excuse-request-details.component.css'
})
export class PortalExcuseRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly excuseService = inject(EmployeeExcusesService);
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  excuse = signal<EmployeeExcuseDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  processingApproval = signal(false);
  isApprovalView = signal(false);
  showDelegationModal = signal(false);

  // Computed properties
  statusBadge = computed(() => {
    const exc = this.excuse();
    if (!exc) return { label: '', variant: 'secondary' as const };

    // Prioritize the actual approval status from the excuse entity
    const approvalStatus = exc.approvalStatus || exc.approvalStatusDisplay || exc.status;

    // Check for Cancelled first - this is the entity's actual state
    if (approvalStatus === ApprovalStatus.Cancelled || approvalStatus === 'Cancelled' || approvalStatus === ExcuseStatus.Cancelled) {
      return { label: this.i18n.t('portal.status_cancelled'), variant: 'secondary' as const };
    }

    if (approvalStatus === ApprovalStatus.Rejected || approvalStatus === 'Rejected' || approvalStatus === ExcuseStatus.Rejected) {
      return { label: this.i18n.t('portal.status_rejected'), variant: 'danger' as const };
    }

    if (approvalStatus === ApprovalStatus.Approved || approvalStatus === 'Approved' || approvalStatus === ExcuseStatus.Approved) {
      return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
    }

    // Pending or in progress
    return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const exc = this.excuse();
    if (!exc) return [];

    return [
      {
        label: this.i18n.t('portal.excuse_date'),
        value: this.formatDate(exc.excuseDate)
      },
      {
        label: this.i18n.t('portal.excuse_type'),
        value: this.getExcuseTypeLabel(exc.excuseType)
      },
      {
        label: this.i18n.t('portal.start_time'),
        value: exc.startTime.substring(0, 5)
      },
      {
        label: this.i18n.t('portal.end_time'),
        value: exc.endTime.substring(0, 5)
      },
      {
        label: this.i18n.t('portal.duration'),
        value: this.formatDuration(exc.durationHours)
      },
      {
        label: this.i18n.t('portal.reason'),
        value: exc.reason || this.i18n.t('common.not_provided')
      }
    ];
  });

  submissionInfoItems = computed<DefinitionItem[]>(() => {
    const exc = this.excuse();
    if (!exc) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('portal.submitted_date'),
        value: this.formatDateTime(exc.createdAtUtc || exc.submissionDate)
      },
      {
        label: this.i18n.t('portal.submitted_by'),
        value: exc.createdBy || this.i18n.t('common.not_available')
      }
    ];

    // Add last modified if available
    if (exc.modifiedAtUtc) {
      items.push({
        label: this.i18n.t('portal.last_modified'),
        value: this.formatDateTime(exc.modifiedAtUtc)
      });
    }

    return items;
  });

  canEdit = computed(() => {
    const exc = this.excuse();
    return exc && exc.canBeModified;
  });

  canCancel = computed(() => {
    const exc = this.excuse();
    return exc && exc.canBeModified;
  });

  // Computed property for pending approval information
  pendingApprovalInfo = computed(() => {
    const exc = this.excuse();
    if (!exc || !exc.workflowStatus) return null;

    const status = exc.approvalStatusDisplay || exc.status;
    if (status === 'Approved' || status === 'Rejected' || status === 'Cancelled') return null;

    // Determine who the request is pending with
    let pendingWith: string | null = null;
    if (exc.currentApproverName) {
      pendingWith = exc.currentApproverName;
    } else if (exc.currentApproverRole) {
      pendingWith = exc.currentApproverRole;
    }

    // Build step progress info
    let stepProgress: string | null = null;
    if (exc.currentStepOrder && exc.totalSteps) {
      stepProgress = `${exc.currentStepOrder}/${exc.totalSteps}`;
    }

    return {
      pendingWith,
      stepProgress,
      workflowStatus: exc.workflowStatus
    };
  });

  // Computed property to check if approval actions are available
  canApprove = computed(() => {
    const exc = this.excuse();
    // Can approve if: viewing for approval, has workflow instance ID, and workflow is in progress
    return this.isApprovalView() &&
           exc &&
           exc.workflowInstanceId &&
           (exc.workflowStatus?.toLowerCase() === 'inprogress' || exc.workflowStatus?.toLowerCase() === 'pending');
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const isApproval = this.route.snapshot.queryParamMap.get('approval') === 'true';
    this.isApprovalView.set(isApproval);

    if (id) {
      this.loadExcuse(+id, isApproval);
    }
  }

  private loadExcuse(id: number, forApproval: boolean = false): void {
    this.loading.set(true);
    this.error.set(null);

    // Use the appropriate endpoint based on whether this is an approval view
    const request$ = forApproval
      ? this.excuseService.getExcuseForApproval(id)
      : this.excuseService.getMyExcuseById(id);

    request$.subscribe({
      next: (excuse) => {
        if (excuse) {
          this.excuse.set(excuse);
        } else {
          this.error.set(this.i18n.t('portal.excuse_not_found'));
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse:', error);
        this.error.set(this.i18n.t('portal.failed_to_load_excuse'));
        this.loading.set(false);
      }
    });
  }

  onEdit(): void {
    const exc = this.excuse();
    if (exc) {
      this.router.navigate(['/excuse-requests', exc.id, 'edit']);
    }
  }

  async onCancel(): Promise<void> {
    const exc = this.excuse();
    if (!exc) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_excuse'),
      message: this.i18n.t('portal.cancel_excuse_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.excuseService.cancelMyExcuse(exc.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.excuse_cancelled'));
          this.router.navigate(['/excuse-requests']);
        },
        error: (error) => {
          console.error('Failed to cancel excuse:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_excuse'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/excuse-requests']);
  }

  private formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    // Use toLocaleString with locale from i18n service for consistent display
    return d.toLocaleString(this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  /**
   * Checks if the excuse workflow is expired (timed out).
   * Uses the actual workflow status, not excuse dates.
   */
  isExcuseExpired(): boolean {
    const exc = this.excuse();
    // Only return true if the workflow itself has expired (timed out)
    return exc?.workflowStatus?.toLowerCase() === 'expired';
  }

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
   * Checks if the excuse itself is cancelled.
   */
  isExcuseCancelled(): boolean {
    const exc = this.excuse();
    const approvalStatus = exc?.approvalStatus || exc?.approvalStatusDisplay || exc?.status;
    return approvalStatus === ApprovalStatus.Cancelled || approvalStatus === 'Cancelled' || approvalStatus === ExcuseStatus.Cancelled;
  }

  /**
   * Gets the translated label for a workflow step status
   * If the workflow has timed out, show as Expired
   * If the excuse is cancelled, show pending steps as Cancelled
   */
  getStepStatusLabel(status: string): string {
    const statusLower = status?.toLowerCase() || 'pending';

    // If excuse is cancelled, show pending/skipped steps as Cancelled
    if ((statusLower === 'pending' || statusLower === 'skipped') && this.isExcuseCancelled()) {
      return this.i18n.t('portal.status_cancelled');
    }

    // If workflow has timed out, show as Expired
    if (statusLower === 'pending' && this.isExcuseExpired()) {
      return this.i18n.t('portal.status_expired');
    }

    switch (statusLower) {
      case 'approved':
        return this.i18n.t('portal.workflow_approved');
      case 'rejected':
        return this.i18n.t('portal.workflow_rejected');
      case 'delegated':
        return this.i18n.t('portal.workflow_delegated');
      case 'timedout':
      case 'timed_out':
        return this.i18n.t('portal.workflow_timed_out');
      case 'skipped':
        return this.i18n.t('portal.workflow_skipped');
      case 'pending':
      default:
        return this.i18n.t('portal.workflow_pending');
    }
  }

  /**
   * Gets the badge variant for a workflow step status
   * If the workflow has timed out, show as danger (red)
   * If the excuse is cancelled, show as secondary (grey)
   */
  getStepStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' {
    const statusLower = status?.toLowerCase() || 'pending';

    // If excuse is cancelled, show pending/skipped steps as secondary (grey)
    if ((statusLower === 'pending' || statusLower === 'skipped') && this.isExcuseCancelled()) {
      return 'secondary';
    }

    // If workflow has timed out, show as danger (red)
    if (statusLower === 'pending' && this.isExcuseExpired()) {
      return 'danger';
    }

    switch (statusLower) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'delegated':
        return 'info';
      case 'timedout':
      case 'timed_out':
        return 'danger';
      case 'skipped':
        return 'secondary';
      case 'pending':
      default:
        return 'warning';
    }
  }

  /**
   * Approves the excuse request
   */
  async onApprove(): Promise<void> {
    const exc = this.excuse();
    if (!exc?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_approve'),
      message: this.i18n.t('portal.confirm_approve_excuse_message', { name: exc.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'bi-check-circle',
      iconClass: 'text-success'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.approveWorkflowStep(exc.workflowInstanceId, 'Approved via excuse details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.approval_success'));
        // Navigate back to pending approvals
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error approving excuse:', error);
        this.notificationService.error(this.i18n.t('portal.approval_error'));
        this.processingApproval.set(false);
      }
    });
  }

  /**
   * Rejects the excuse request
   */
  async onReject(): Promise<void> {
    const exc = this.excuse();
    if (!exc?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_reject'),
      message: this.i18n.t('portal.confirm_reject_excuse_message', { name: exc.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x-circle',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.rejectWorkflowStep(exc.workflowInstanceId, 'Rejected via excuse details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.rejection_success'));
        // Navigate back to pending approvals
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error rejecting excuse:', error);
        this.notificationService.error(this.i18n.t('portal.rejection_error'));
        this.processingApproval.set(false);
      }
    });
  }

  /**
   * Opens the delegation modal
   */
  onDelegate(): void {
    const exc = this.excuse();
    if (!exc?.workflowInstanceId) return;
    this.showDelegationModal.set(true);
  }

  /**
   * Closes the delegation modal
   */
  onCloseDelegationModal(): void {
    this.showDelegationModal.set(false);
  }

  /**
   * Handles the delegation result from the modal
   */
  onDelegateConfirmed(result: DelegationResult): void {
    const exc = this.excuse();
    if (!exc?.workflowInstanceId) return;

    this.showDelegationModal.set(false);
    this.processingApproval.set(true);

    const comments = result.reason
      ? `Delegated to ${result.employeeName}: ${result.reason}`
      : `Delegated to ${result.employeeName} via excuse details`;

    this.portalService.delegateWorkflowStep(exc.workflowInstanceId, result.userId, comments).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.delegation_success'));
        // Navigate back to pending approvals
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error delegating excuse:', error);
        this.notificationService.error(this.i18n.t('portal.delegation_error'));
        this.processingApproval.set(false);
      }
    });
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
