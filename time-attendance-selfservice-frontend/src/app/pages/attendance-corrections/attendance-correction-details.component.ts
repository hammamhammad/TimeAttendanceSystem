import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { AttendanceCorrectionsService } from './attendance-corrections.service';
import { PortalService } from '../portal/services/portal.service';
import {
  AttendanceCorrectionRequestDto,
  ApprovalStatus,
  AttendanceCorrectionType
} from '../../shared/models/attendance-correction.model';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../shared/components/detail-card/detail-card.component';
import { DelegationModalComponent, DelegationResult } from '../../shared/components/delegation-modal/delegation-modal.component';

/**
 * Attendance Correction Details Component
 * Displays detailed information about a specific attendance correction request
 */
@Component({
  selector: 'app-attendance-correction-details',
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
  templateUrl: './attendance-correction-details.component.html',
  styleUrl: './attendance-correction-details.component.css'
})
export class AttendanceCorrectionDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly correctionService = inject(AttendanceCorrectionsService);
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  correction = signal<AttendanceCorrectionRequestDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  processingApproval = signal(false);
  isApprovalView = signal(false);
  showDelegationModal = signal(false);

  // Computed properties
  statusBadge = computed(() => {
    const corr = this.correction();
    if (!corr) return { label: '', variant: 'secondary' as const };

    const approvalStatus = corr.approvalStatus || corr.approvalStatusDisplay;

    if (approvalStatus === ApprovalStatus.Cancelled || approvalStatus === 'Cancelled') {
      return { label: this.i18n.t('portal.status_cancelled'), variant: 'secondary' as const };
    }

    if (approvalStatus === ApprovalStatus.Rejected || approvalStatus === 'Rejected') {
      return { label: this.i18n.t('portal.status_rejected'), variant: 'danger' as const };
    }

    if (approvalStatus === ApprovalStatus.Approved || approvalStatus === 'Approved') {
      return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
    }

    return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
  });

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const corr = this.correction();
    if (!corr) return [];

    return [
      {
        label: this.i18n.t('portal.correction_date'),
        value: this.formatDate(corr.correctionDate)
      },
      {
        label: this.i18n.t('portal.correction_time'),
        value: corr.correctionTime?.substring(0, 5) || ''
      },
      {
        label: this.i18n.t('portal.correction_type'),
        value: this.getCorrectionTypeLabel(corr.correctionType)
      },
      {
        label: this.i18n.t('portal.reason'),
        value: corr.reason || this.i18n.t('common.not_provided')
      }
    ];
  });

  employeeInfoItems = computed<DefinitionItem[]>(() => {
    const corr = this.correction();
    if (!corr) return [];

    return [
      {
        label: this.i18n.t('portal.employee_name'),
        value: corr.employeeName || this.i18n.t('common.not_available')
      },
      {
        label: this.i18n.t('portal.employee_number'),
        value: corr.employeeNumber || this.i18n.t('common.not_available')
      },
      {
        label: this.i18n.t('portal.department'),
        value: corr.departmentName || this.i18n.t('common.not_available')
      },
      {
        label: this.i18n.t('portal.branch'),
        value: corr.branchName || this.i18n.t('common.not_available')
      }
    ];
  });

  submissionInfoItems = computed<DefinitionItem[]>(() => {
    const corr = this.correction();
    if (!corr) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('portal.submitted_date'),
        value: this.formatDateTime(corr.createdAtUtc)
      },
      {
        label: this.i18n.t('portal.submitted_by'),
        value: corr.createdBy || this.i18n.t('common.not_available')
      }
    ];

    if (corr.modifiedAtUtc) {
      items.push({
        label: this.i18n.t('portal.last_modified'),
        value: this.formatDateTime(corr.modifiedAtUtc)
      });
    }

    return items;
  });

  canEdit = computed(() => {
    const corr = this.correction();
    if (!corr) return false;

    // Check approval status directly - only allow edit if pending
    const status = corr.approvalStatus || corr.approvalStatusDisplay;
    const isPending = status === ApprovalStatus.Pending || status === 'Pending';

    // Only allow edit if pending and canBeModified is not explicitly false
    return isPending && corr.canBeModified !== false;
  });

  canCancel = computed(() => {
    const corr = this.correction();
    if (!corr) return false;

    // Check approval status directly - only allow cancel if pending
    const status = corr.approvalStatus || corr.approvalStatusDisplay;
    const isPending = status === ApprovalStatus.Pending || status === 'Pending';

    // Only allow cancel if pending and canBeModified is not explicitly false
    return isPending && corr.canBeModified !== false;
  });

  pendingApprovalInfo = computed(() => {
    const corr = this.correction();
    if (!corr || !corr.workflowStatus) return null;

    const status = corr.approvalStatusDisplay || corr.approvalStatus;
    if (status === 'Approved' || status === 'Rejected' || status === 'Cancelled') return null;

    let pendingWith: string | null = null;
    if (corr.currentApproverName) {
      pendingWith = corr.currentApproverName;
    } else if (corr.currentApproverRole) {
      pendingWith = corr.currentApproverRole;
    }

    let stepProgress: string | null = null;
    if (corr.currentStepOrder && corr.totalSteps) {
      stepProgress = `${corr.currentStepOrder}/${corr.totalSteps}`;
    }

    return {
      pendingWith,
      stepProgress,
      workflowStatus: corr.workflowStatus
    };
  });

  canApprove = computed(() => {
    const corr = this.correction();
    return this.isApprovalView() &&
           corr &&
           corr.workflowInstanceId &&
           (corr.workflowStatus?.toLowerCase() === 'inprogress' || corr.workflowStatus?.toLowerCase() === 'pending');
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const isApproval = this.route.snapshot.queryParamMap.get('approval') === 'true';
    this.isApprovalView.set(isApproval);

    if (id) {
      this.loadCorrection(+id, isApproval);
    }
  }

  private loadCorrection(id: number, forApproval: boolean = false): void {
    this.loading.set(true);
    this.error.set(null);

    const request$ = forApproval
      ? this.correctionService.getCorrectionRequestForApproval(id)
      : this.correctionService.getMyCorrectionRequestById(id);

    request$.subscribe({
      next: (correction) => {
        if (correction) {
          this.correction.set(correction);
        } else {
          this.error.set(this.i18n.t('portal.correction_not_found'));
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load correction:', error);
        this.error.set(this.i18n.t('portal.failed_to_load_correction'));
        this.loading.set(false);
      }
    });
  }

  onEdit(): void {
    const corr = this.correction();
    if (corr) {
      this.router.navigate(['/attendance-corrections', corr.id, 'edit']);
    }
  }

  async onCancel(): Promise<void> {
    const corr = this.correction();
    if (!corr) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.cancel_correction'),
      message: this.i18n.t('portal.cancel_correction_confirm'),
      confirmText: this.i18n.t('common.yes_cancel'),
      cancelText: this.i18n.t('common.no'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.correctionService.cancelMyCorrectionRequest(corr.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.correction_cancelled'));
          this.router.navigate(['/attendance-corrections']);
        },
        error: (error) => {
          console.error('Failed to cancel correction:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_correction'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/attendance-corrections']);
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(date: Date | string): string {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString(this.i18n.getCurrentLocale() === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  isCorrectionExpired(): boolean {
    const corr = this.correction();
    return corr?.workflowStatus?.toLowerCase() === 'expired';
  }

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

  isCorrectionCancelled(): boolean {
    const corr = this.correction();
    const approvalStatus = corr?.approvalStatus || corr?.approvalStatusDisplay;
    return approvalStatus === ApprovalStatus.Cancelled || approvalStatus === 'Cancelled';
  }

  getStepStatusLabel(status: string): string {
    const statusLower = status?.toLowerCase() || 'pending';

    if ((statusLower === 'pending' || statusLower === 'skipped') && this.isCorrectionCancelled()) {
      return this.i18n.t('portal.status_cancelled');
    }

    if (statusLower === 'pending' && this.isCorrectionExpired()) {
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

  getStepStatusVariant(status: string): 'success' | 'danger' | 'warning' | 'info' | 'secondary' | 'primary' {
    const statusLower = status?.toLowerCase() || 'pending';

    if ((statusLower === 'pending' || statusLower === 'skipped') && this.isCorrectionCancelled()) {
      return 'secondary';
    }

    if (statusLower === 'pending' && this.isCorrectionExpired()) {
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

  async onApprove(): Promise<void> {
    const corr = this.correction();
    if (!corr?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_approve'),
      message: this.i18n.t('portal.confirm_approve_correction_message', { name: corr.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.approve'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'bi-check-circle',
      iconClass: 'text-success'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.approveWorkflowStep(corr.workflowInstanceId, 'Approved via correction details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.approval_success'));
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error approving correction:', error);
        this.notificationService.error(this.i18n.t('portal.approval_error'));
        this.processingApproval.set(false);
      }
    });
  }

  async onReject(): Promise<void> {
    const corr = this.correction();
    if (!corr?.workflowInstanceId) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('portal.confirm_reject'),
      message: this.i18n.t('portal.confirm_reject_correction_message', { name: corr.employeeName || 'Unknown' }),
      confirmText: this.i18n.t('portal.reject'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'bi-x-circle',
      iconClass: 'text-danger'
    });

    if (!result.confirmed) return;

    this.processingApproval.set(true);

    this.portalService.rejectWorkflowStep(corr.workflowInstanceId, 'Rejected via correction details').subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.rejection_success'));
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error rejecting correction:', error);
        this.notificationService.error(this.i18n.t('portal.rejection_error'));
        this.processingApproval.set(false);
      }
    });
  }

  onDelegate(): void {
    const corr = this.correction();
    if (!corr?.workflowInstanceId) return;
    this.showDelegationModal.set(true);
  }

  onCloseDelegationModal(): void {
    this.showDelegationModal.set(false);
  }

  onDelegateConfirmed(result: DelegationResult): void {
    const corr = this.correction();
    if (!corr?.workflowInstanceId) return;

    this.showDelegationModal.set(false);
    this.processingApproval.set(true);

    const comments = result.reason
      ? `Delegated to ${result.employeeName}: ${result.reason}`
      : `Delegated to ${result.employeeName} via correction details`;

    this.portalService.delegateWorkflowStep(corr.workflowInstanceId, result.userId, comments).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('portal.delegation_success'));
        this.router.navigate(['/pending-approvals']);
      },
      error: (error) => {
        console.error('Error delegating correction:', error);
        this.notificationService.error(this.i18n.t('portal.delegation_error'));
        this.processingApproval.set(false);
      }
    });
  }
}
