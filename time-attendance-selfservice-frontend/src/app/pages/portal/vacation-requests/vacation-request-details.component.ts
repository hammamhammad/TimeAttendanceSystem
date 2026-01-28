import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeVacationsService } from '../../employee-vacations/employee-vacations.service';
import { PortalService } from '../services/portal.service';
import { EmployeeVacation, VacationStatus } from '../../../shared/models/employee-vacation.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';
import { DelegationModalComponent, DelegationResult } from '../../../shared/components/delegation-modal/delegation-modal.component';

/**
 * Portal Vacation Request Details Component
 * Displays detailed information about a specific vacation request
 */
@Component({
  selector: 'app-portal-vacation-request-details',
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
  templateUrl: './vacation-request-details.component.html',
  styleUrl: './vacation-request-details.component.css'
})
export class PortalVacationRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly vacationService = inject(EmployeeVacationsService);
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  vacation = signal<EmployeeVacation | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  processingApproval = signal(false);
  showDelegationModal = signal(false);

  // Computed properties
  statusBadge = computed(() => {
    const vac = this.vacation();
    if (!vac) return { label: '', variant: 'secondary' as const };

    // Check workflow status first - this reflects the actual approval state
    const workflowStatus = vac.workflowStatus?.toLowerCase();

    // If workflow explicitly expired (timed out), show as expired
    if (workflowStatus === 'expired') {
      return { label: this.i18n.t('portal.status_expired'), variant: 'danger' as const };
    }

    // If workflow was rejected
    if (workflowStatus === 'rejected') {
      return { label: this.i18n.t('portal.status_rejected'), variant: 'danger' as const };
    }

    // Check if vacation dates have passed
    const isPastEndDate = vac.isCompleted;

    if (vac.isApproved) {
      // Approved vacation
      if (vac.isCurrentlyActive) {
        return { label: this.i18n.t('portal.status_active'), variant: 'info' as const };
      }
      if (isPastEndDate) {
        return { label: this.i18n.t('portal.status_completed'), variant: 'secondary' as const };
      }
      // Approved and upcoming
      return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
    } else {
      // Not approved - check if workflow is still in progress
      if (workflowStatus === 'inprogress' || workflowStatus === 'pending') {
        // Workflow is still active, show as pending regardless of vacation dates
        return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
      }
      // Fallback for unknown status
      return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
    }
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const vac = this.vacation();
    if (!vac) return [];

    return [
      {
        label: this.i18n.t('portal.vacation_type'),
        value: vac.vacationTypeName
      },
      {
        label: this.i18n.t('portal.start_date'),
        value: this.formatDate(vac.startDate)
      },
      {
        label: this.i18n.t('portal.end_date'),
        value: this.formatDate(vac.endDate)
      },
      {
        label: this.i18n.t('portal.total_days'),
        value: `${vac.totalDays} ${this.i18n.t('common.days_unit')}`
      },
      {
        label: this.i18n.t('portal.business_days'),
        value: `${vac.businessDays} ${this.i18n.t('common.days_unit')}`
      },
      {
        label: this.i18n.t('portal.notes'),
        value: vac.notes || this.i18n.t('common.not_provided')
      }
    ];
  });

  submissionInfoItems = computed<DefinitionItem[]>(() => {
    const vac = this.vacation();
    if (!vac) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('portal.submitted_date'),
        value: this.formatDateTime(vac.createdAtUtc)
      },
      {
        label: this.i18n.t('portal.submitted_by'),
        value: vac.createdBy || this.i18n.t('common.not_available')
      }
    ];

    if (vac.modifiedAtUtc) {
      items.push({
        label: this.i18n.t('portal.last_modified'),
        value: this.formatDateTime(vac.modifiedAtUtc)
      });
    }

    if (vac.modifiedBy) {
      items.push({
        label: this.i18n.t('portal.modified_by'),
        value: vac.modifiedBy
      });
    }

    return items;
  });

  canEdit = computed(() => {
    const vac = this.vacation();
    if (!vac) return false;

    // Can only edit in non-approval view (employee's own request)
    if (this.isApprovalView()) return false;

    // Check for approved, rejected, completed or cancelled status
    const workflowStatus = vac.workflowStatus?.toLowerCase();
    const isNotPending = vac.isApproved ||
                         vac.isCompleted ||
                         workflowStatus === 'approved' ||
                         workflowStatus === 'rejected' ||
                         workflowStatus === 'cancelled';

    return !isNotPending;
  });

  canDelete = computed(() => {
    const vac = this.vacation();
    if (!vac) return false;

    // Check for approved, rejected, completed or cancelled status
    const workflowStatus = vac.workflowStatus?.toLowerCase();
    const isNotPending = vac.isApproved ||
                         vac.isCompleted ||
                         workflowStatus === 'approved' ||
                         workflowStatus === 'rejected' ||
                         workflowStatus === 'cancelled';

    return !isNotPending;
  });

  canCancel = computed(() => {
    const vac = this.vacation();
    if (!vac) return false;

    // Can only cancel pending requests in non-approval view
    if (this.isApprovalView()) return false;

    // Check for approved, rejected, completed or cancelled status
    const workflowStatus = vac.workflowStatus?.toLowerCase();
    const isNotPending = vac.isApproved ||
                         vac.isCompleted ||
                         workflowStatus === 'approved' ||
                         workflowStatus === 'rejected' ||
                         workflowStatus === 'cancelled' ||
                         workflowStatus === 'expired';

    return !isNotPending;
  });

  // Computed property for pending approval information
  pendingApprovalInfo = computed(() => {
    const vac = this.vacation();
    if (!vac || vac.isApproved || vac.isCompleted) return null;

    // Determine who the request is pending with
    let pendingWith: string | null = null;
    if (vac.currentApproverName) {
      pendingWith = vac.currentApproverName;
    } else if (vac.currentApproverRole) {
      pendingWith = vac.currentApproverRole;
    }

    // Build step progress info
    let stepProgress: string | null = null;
    if (vac.currentStepOrder && vac.totalSteps) {
      stepProgress = `${vac.currentStepOrder}/${vac.totalSteps}`;
    }

    return {
      pendingWith,
      stepProgress,
      workflowStatus: vac.workflowStatus
    };
  });

  // Track if viewing for approval purposes
  isApprovalView = signal(false);

  // Computed property to check if approval actions are available
  canApprove = computed(() => {
    const vac = this.vacation();
    // Can approve if: viewing for approval, not already approved, has workflow instance ID, and workflow is in progress
    return this.isApprovalView() &&
           vac &&
           !vac.isApproved &&
           vac.workflowInstanceId &&
           (vac.workflowStatus?.toLowerCase() === 'inprogress' || vac.workflowStatus?.toLowerCase() === 'pending');
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const isApproval = this.route.snapshot.queryParamMap.get('approval') === 'true';
    this.isApprovalView.set(isApproval);

    if (id) {
      this.loadVacation(+id, isApproval);
    }
  }

  private loadVacation(id: number, forApproval: boolean = false): void {
    this.loading.set(true);
    this.error.set(null);

    // Use the appropriate endpoint based on whether this is an approval view
    const request$ = forApproval
      ? this.vacationService.getVacationForApproval(id)
      : this.vacationService.getVacationById(id);

    request$.subscribe({
      next: (vacation) => {
        if (vacation) {
          this.vacation.set(vacation);
        } else {
          this.error.set(this.i18n.t('portal.vacation_not_found'));
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load vacation:', error);
        this.error.set(this.i18n.t('portal.failed_to_load_vacation'));
        this.loading.set(false);
      }
    });
  }

  onEdit(): void {
    const vac = this.vacation();
    if (vac) {
      this.router.navigate(['/vacation-requests', vac.id, 'edit']);
    }
  }

  async onDelete(): Promise<void> {
    const vac = this.vacation();
    if (!vac) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.delete_vacation'),
      message: this.i18n.t('portal.delete_vacation_confirm'),
      confirmText: this.i18n.t('common.yes_delete'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.vacationService.deleteVacation(vac.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.vacation_deleted'));
          this.router.navigate(['/vacation-requests']);
        },
        error: (error) => {
          console.error('Failed to delete vacation:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_delete_vacation'));
        }
      });
    }
  }

  async onCancel(): Promise<void> {
    const vac = this.vacation();
    if (!vac) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_vacation'),
      message: this.i18n.t('portal.cancel_vacation_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.vacationService.deleteVacation(vac.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.vacation_cancelled'));
          this.router.navigate(['/vacation-requests']);
        },
        error: (error) => {
          console.error('Failed to cancel vacation:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_vacation'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/vacation-requests']);
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
   * Checks if the vacation workflow is expired (timed out).
   * Uses the actual workflow status, not vacation dates.
   */
  isVacationExpired(): boolean {
    const vac = this.vacation();
    // Only return true if the workflow itself has expired (timed out)
    return vac?.workflowStatus?.toLowerCase() === 'expired';
  }

  /**
   * Gets the translated label for a workflow step status
   * If the workflow has timed out, show as Expired
   */
  getStepStatusLabel(status: string): string {
    const statusLower = status?.toLowerCase() || 'pending';

    // If workflow has timed out, show as Expired
    if (statusLower === 'pending' && this.isVacationExpired()) {
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
   */
  getStepStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' {
    const statusLower = status?.toLowerCase() || 'pending';

    // If workflow has timed out, show as danger (red)
    if (statusLower === 'pending' && this.isVacationExpired()) {
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
   * Approves the vacation request
   */
  async onApprove(): Promise<void> {
    const vac = this.vacation();
    if (!vac?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_approve'),
      message: this.i18n.t('portal.confirm_approve_message', { name: vac.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'bi-check-circle',
      iconClass: 'text-success'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.approveWorkflowStep(vac.workflowInstanceId, 'Approved via vacation details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.approval_success'));
        // Navigate back to pending approvals or refresh the page
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error approving vacation:', error);
        this.notificationService.error(this.i18n.t('portal.approval_error'));
        this.processingApproval.set(false);
      }
    });
  }

  /**
   * Rejects the vacation request
   */
  async onReject(): Promise<void> {
    const vac = this.vacation();
    if (!vac?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_reject'),
      message: this.i18n.t('portal.confirm_reject_message', { name: vac.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x-circle',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.rejectWorkflowStep(vac.workflowInstanceId, 'Rejected via vacation details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.rejection_success'));
        // Navigate back to pending approvals
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error rejecting vacation:', error);
        this.notificationService.error(this.i18n.t('portal.rejection_error'));
        this.processingApproval.set(false);
      }
    });
  }

  /**
   * Opens the delegation modal
   */
  onDelegate(): void {
    const vac = this.vacation();
    if (!vac?.workflowInstanceId) return;
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
    const vac = this.vacation();
    if (!vac?.workflowInstanceId) return;

    this.showDelegationModal.set(false);
    this.processingApproval.set(true);

    const comments = result.reason
      ? `Delegated to ${result.employeeName}: ${result.reason}`
      : `Delegated to ${result.employeeName} via vacation details`;

    this.portalService.delegateWorkflowStep(vac.workflowInstanceId, result.userId, comments).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.delegation_success'));
        // Navigate back to pending approvals
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error delegating vacation:', error);
        this.notificationService.error(this.i18n.t('portal.delegation_error'));
        this.processingApproval.set(false);
      }
    });
  }
}
