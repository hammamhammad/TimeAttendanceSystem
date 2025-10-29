import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeExcusesService } from '../../employee-excuses/employee-excuses.service';
import { EmployeeExcuseDto, ExcuseStatus, ExcuseType } from '../../../shared/models/employee-excuse.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';

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
    DetailCardComponent
  ],
  templateUrl: './excuse-request-details.component.html',
  styleUrl: './excuse-request-details.component.css'
})
export class PortalExcuseRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly excuseService = inject(EmployeeExcusesService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  excuse = signal<EmployeeExcuseDto | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed properties
  statusBadge = computed(() => {
    const exc = this.excuse();
    if (!exc) return { label: '', variant: 'secondary' as const };

    switch (exc.status) {
      case ExcuseStatus.Pending:
        return { label: 'Pending', variant: 'warning' as const };
      case ExcuseStatus.Approved:
        return { label: 'Approved', variant: 'success' as const };
      case ExcuseStatus.Rejected:
        return { label: 'Rejected', variant: 'danger' as const };
      case ExcuseStatus.Cancelled:
        return { label: 'Cancelled', variant: 'secondary' as const };
      default:
        return { label: exc.status, variant: 'secondary' as const };
    }
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
        value: `${exc.durationHours.toFixed(1)} hours`
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
        label: this.i18n.t('portal.submission_date'),
        value: this.formatDateTime(exc.submissionDate)
      }
    ];

    if (exc.reviewDate) {
      items.push({
        label: this.i18n.t('portal.review_date'),
        value: this.formatDateTime(exc.reviewDate)
      });
    }

    if (exc.reviewerName) {
      items.push({
        label: this.i18n.t('portal.reviewed_by'),
        value: exc.reviewerName
      });
    }

    if (exc.reviewerComments) {
      items.push({
        label: this.i18n.t('portal.reviewer_comments'),
        value: exc.reviewerComments
      });
    }

    return items;
  });

  canEdit = computed(() => {
    const exc = this.excuse();
    return exc && exc.status === ExcuseStatus.Pending;
  });

  canCancel = computed(() => {
    const exc = this.excuse();
    return exc && exc.status === ExcuseStatus.Pending;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExcuse(+id);
    }
  }

  private loadExcuse(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.excuseService.getEmployeeExcuseById(id).subscribe({
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
      this.router.navigate(['/portal/excuse-requests', exc.id, 'edit']);
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
      icon: 'fa-times',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.excuseService.cancelEmployeeExcuse(exc.id).subscribe({
        next: () => {
          this.notificationService.success(this.i18n.t('portal.excuse_cancelled'));
          this.router.navigate(['/portal/excuse-requests']);
        },
        error: (error) => {
          console.error('Failed to cancel excuse:', error);
          this.notificationService.error(this.i18n.t('portal.failed_to_cancel_excuse'));
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/portal/excuse-requests']);
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
}
