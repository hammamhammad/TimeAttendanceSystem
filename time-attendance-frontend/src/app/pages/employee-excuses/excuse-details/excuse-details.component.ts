import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { EmployeeExcusesService } from '../employee-excuses.service';
import { EmployeeExcuseDto, ExcuseStatus } from '../../../shared/models/employee-excuse.model';
import { PermissionActions } from '../../../shared/utils/permission.utils';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-excuse-details',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent
  ],
  templateUrl: './excuse-details.component.html',
  styleUrls: ['./excuse-details.component.css']
})
export class ExcuseDetailsComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeeExcusesService = inject(EmployeeExcusesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  excuse = signal<EmployeeExcuseDto | null>(null);
  error = signal<string | null>(null);

  // Enum reference for template
  ExcuseStatus = ExcuseStatus;

  ngOnInit(): void {
    this.loadExcuseDetails();
  }

  private loadExcuseDetails(): void {
    const excuseId = this.route.snapshot.paramMap.get('id');
    if (!excuseId) {
      this.router.navigate(['/employee-excuses']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeeExcusesService.getEmployeeExcuseById(+excuseId).subscribe({
      next: (excuse) => {
        this.excuse.set(excuse);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse details:', error);
        this.error.set(this.i18n.t('employee_excuses.load_error'));
        this.loading.set(false);
      }
    });
  }

  navigateBack(): void {
    this.router.navigate(['/employee-excuses']);
  }

  navigateToEdit(): void {
    if (this.excuse()) {
      this.router.navigate(['/employee-excuses', this.excuse()!.id, 'edit']);
    }
  }

  approveExcuse(): void {
    if (!this.excuse()) return;

    const message = this.i18n.t('employee_excuses.confirm_approve');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.approve_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.approve')
    }).then(result => {
      if (result.confirmed) {
        this.processing.set(true);

        this.employeeExcusesService.reviewEmployeeExcuse(this.excuse()!.id, {
          status: ExcuseStatus.Approved,
          reviewerComments: result.comments
        }).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.approve_success')
            );
            this.loadExcuseDetails(); // Reload to show updated status
            this.processing.set(false);
          },
          error: (error) => {
            console.error('Failed to approve excuse:', error);
            this.notificationService.error(
              this.i18n.t('employee_excuses.approve_error')
            );
            this.processing.set(false);
          }
        });
      }
    });
  }

  rejectExcuse(): void {
    if (!this.excuse()) return;

    const message = this.i18n.t('employee_excuses.confirm_reject');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.reject_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.reject'),
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.processing.set(true);

        this.employeeExcusesService.reviewEmployeeExcuse(this.excuse()!.id, {
          status: ExcuseStatus.Rejected,
          reviewerComments: result.comments
        }).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.reject_success')
            );
            this.loadExcuseDetails(); // Reload to show updated status
            this.processing.set(false);
          },
          error: (error) => {
            console.error('Failed to reject excuse:', error);
            this.notificationService.error(
              this.i18n.t('employee_excuses.reject_error')
            );
            this.processing.set(false);
          }
        });
      }
    });
  }

  cancelExcuse(): void {
    if (!this.excuse()) return;

    const message = this.i18n.t('employee_excuses.confirm_cancel');

    this.confirmationService.confirm({
      title: this.i18n.t('employee_excuses.cancel_title'),
      message,
      confirmText: this.i18n.t('employee_excuses.cancel')
    }).then(result => {
      if (result.confirmed) {
        this.processing.set(true);

        this.employeeExcusesService.cancelEmployeeExcuse(this.excuse()!.id).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('employee_excuses.cancel_success')
            );
            this.loadExcuseDetails(); // Reload to show updated status
            this.processing.set(false);
          },
          error: (error) => {
            console.error('Failed to cancel excuse:', error);
            this.notificationService.error(
              this.i18n.t('employee_excuses.cancel_error')
            );
            this.processing.set(false);
          }
        });
      }
    });
  }

  downloadAttachment(): void {
    if (!this.excuse() || !this.excuse()!.attachmentUrl) return;

    this.employeeExcusesService.downloadAttachment(this.excuse()!.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `excuse_${this.excuse()!.id}_attachment`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Failed to download attachment:', error);
        this.notificationService.error(
          this.i18n.t('employee_excuses.download_error')
        );
      }
    });
  }

  // Permission checks
  canEdit(): boolean {
    const excuse = this.excuse();
    if (!excuse) return false;

    // HR can edit excuses in any status
    return this.permissionService.has(`excuse.${PermissionActions.UPDATE}`) &&
           this.canEditExcuse(excuse);
  }

  canApprove(): boolean {
    const excuse = this.excuse();
    if (!excuse) return false;

    return excuse.status === ExcuseStatus.Pending &&
           this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) &&
           this.canReviewExcuse(excuse);
  }

  canReject(): boolean {
    const excuse = this.excuse();
    if (!excuse) return false;

    return excuse.status === ExcuseStatus.Pending &&
           this.permissionService.has(`excuse.${PermissionActions.APPROVE}`) &&
           this.canReviewExcuse(excuse);
  }

  canCancel(): boolean {
    const excuse = this.excuse();
    if (!excuse) return false;

    return excuse.status === ExcuseStatus.Pending &&
           this.permissionService.has(`excuse.${PermissionActions.DELETE}`) &&
           this.canCancelExcuse(excuse);
  }

  canDownload(): boolean {
    const excuse = this.excuse();
    if (!excuse) return false;

    return !!excuse.attachmentUrl &&
           this.permissionService.has(`excuse.${PermissionActions.READ}`);
  }

  private canEditExcuse(excuse: EmployeeExcuseDto): boolean {
    return this.permissionService.hasRole('Admin') ||
           this.permissionService.getCurrentUser()?.employeeId === excuse.employeeId;
  }

  private canReviewExcuse(excuse: EmployeeExcuseDto): boolean {
    return (this.permissionService.hasRole('Admin') || this.permissionService.hasRole('Manager')) &&
           this.permissionService.getCurrentUser()?.employeeId !== excuse.employeeId;
  }

  private canCancelExcuse(excuse: EmployeeExcuseDto): boolean {
    return this.permissionService.hasRole('Admin') ||
           this.permissionService.getCurrentUser()?.employeeId === excuse.employeeId;
  }

  // Display helpers
  formatDuration(hours: number): string {
    if (hours < 1) {
      return `${Math.round(hours * 60)} ${this.i18n.t('common.minutes')}`;
    }
    return `${hours} ${this.i18n.t('common.hours')}`;
  }

  formatStatus(status: ExcuseStatus): string {
    if (!status) {
      return this.i18n.t('employee_excuses.status_pending');
    }
    return this.i18n.t(`employee_excuses.status_${status.toLowerCase()}`);
  }

  getStatusClass(status: ExcuseStatus): string {
    switch (status) {
      case ExcuseStatus.Pending:
        return 'badge bg-warning';
      case ExcuseStatus.Approved:
        return 'badge bg-success';
      case ExcuseStatus.Rejected:
        return 'badge bg-danger';
      case ExcuseStatus.Cancelled:
        return 'badge bg-secondary';
      default:
        return 'badge bg-light';
    }
  }

  getStatusIcon(status: ExcuseStatus): string {
    switch (status) {
      case ExcuseStatus.Pending:
        return 'fas fa-hourglass-half';
      case ExcuseStatus.Approved:
        return 'fas fa-check-circle';
      case ExcuseStatus.Rejected:
        return 'fas fa-times-circle';
      case ExcuseStatus.Cancelled:
        return 'fas fa-ban';
      default:
        return 'fas fa-question-circle';
    }
  }

  getStatusVariant(status: ExcuseStatus): 'success' | 'warning' | 'danger' | 'secondary' {
    switch (status) {
      case ExcuseStatus.Approved:
        return 'success';
      case ExcuseStatus.Pending:
        return 'warning';
      case ExcuseStatus.Rejected:
        return 'danger';
      case ExcuseStatus.Cancelled:
        return 'secondary';
      default:
        return 'warning';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }

  formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canApprove() || this.canReject() || this.canCancel() || this.canDownload();
  }

  getExcuseId(): number | undefined {
    return this.excuse()?.id;
  }

  // Computed properties for definition lists
  basicInfoColumn1 = computed<DefinitionItem[]>(() => {
    const excuse = this.excuse();
    if (!excuse) return [];

    return [
      {
        label: this.i18n.t('employee_excuses.employee'),
        value: `${excuse.employeeName} (${excuse.employeeNumber})`
      },
      {
        label: this.i18n.t('employee_excuses.department'),
        value: excuse.departmentName || '-'
      },
      {
        label: this.i18n.t('employee_excuses.excuse_date'),
        value: excuse.excuseDate,
        type: 'date' as const
      },
      {
        label: this.i18n.t('employee_excuses.excuse_type'),
        value: excuse.excuseType === 'PersonalExcuse'
          ? this.i18n.t('employee_excuses.personal')
          : this.i18n.t('employee_excuses.official')
      }
    ];
  });

  basicInfoColumn2 = computed<DefinitionItem[]>(() => {
    const excuse = this.excuse();
    if (!excuse) return [];

    return [
      {
        label: this.i18n.t('employee_excuses.time_range'),
        value: `${excuse.startTime} - ${excuse.endTime}`
      },
      {
        label: this.i18n.t('employee_excuses.duration'),
        value: this.formatDuration(excuse.durationHours)
      },
      {
        label: this.i18n.t('employee_excuses.submission_date'),
        value: excuse.submissionDate,
        type: 'date' as const
      },
      {
        label: this.i18n.t('employee_excuses.policy_compliance'),
        value: excuse.isWithinPolicy
          ? this.i18n.t('employee_excuses.compliant')
          : this.i18n.t('employee_excuses.violation'),
        type: 'badge' as const,
        badgeVariant: excuse.isWithinPolicy ? 'success' : 'warning',
        icon: excuse.isWithinPolicy ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'
      }
    ];
  });

  reviewInfo = computed<DefinitionItem[]>(() => {
    const excuse = this.excuse();
    if (!excuse) return [];

    const items: DefinitionItem[] = [];

    if (excuse.reviewerName) {
      items.push({
        label: this.i18n.t('employee_excuses.reviewer'),
        value: excuse.reviewerName
      });
    }

    if (excuse.reviewDate) {
      items.push({
        label: this.i18n.t('employee_excuses.review_date'),
        value: excuse.reviewDate,
        type: 'date' as const
      });
    }

    return items;
  });
}