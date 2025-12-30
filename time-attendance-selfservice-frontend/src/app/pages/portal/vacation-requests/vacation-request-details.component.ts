import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeVacationsService } from '../../employee-vacations/employee-vacations.service';
import { EmployeeVacation, VacationStatus } from '../../../shared/models/employee-vacation.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DetailCardComponent } from '../../../shared/components/detail-card/detail-card.component';

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
    DetailCardComponent
  ],
  templateUrl: './vacation-request-details.component.html',
  styleUrl: './vacation-request-details.component.css'
})
export class PortalVacationRequestDetailsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly vacationService = inject(EmployeeVacationsService);
  private readonly notificationService = inject(NotificationService);
  private readonly confirmationService = inject(ConfirmationService);

  // State
  vacation = signal<EmployeeVacation | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Computed properties
  statusBadge = computed(() => {
    const vac = this.vacation();
    if (!vac) return { label: '', variant: 'secondary' as const };

    if (vac.isCurrentlyActive) {
      return { label: this.i18n.t('portal.status_active'), variant: 'info' as const };
    }
    if (vac.isCompleted) {
      return { label: this.i18n.t('portal.status_completed'), variant: 'secondary' as const };
    }
    if (vac.isUpcoming) {
      if (vac.isApproved) {
        return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
      }
      return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
    }
    if (vac.isApproved) {
      return { label: this.i18n.t('portal.status_approved'), variant: 'success' as const };
    }
    return { label: this.i18n.t('portal.status_pending'), variant: 'warning' as const };
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
        value: `${vac.totalDays} ${this.i18n.t('common.days')}`
      },
      {
        label: this.i18n.t('portal.business_days'),
        value: `${vac.businessDays} ${this.i18n.t('common.days')}`
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
    return vac && !vac.isApproved && !vac.isCompleted;
  });

  canDelete = computed(() => {
    const vac = this.vacation();
    return vac && !vac.isApproved && !vac.isCompleted;
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVacation(+id);
    }
  }

  private loadVacation(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.vacationService.getVacationById(id).subscribe({
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

  private formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
