import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { PublicHolidaysService } from '../public-holidays.service';
import { PublicHoliday, HolidayType } from '../../../../shared/models/public-holiday.model';
import { PermissionActions } from '../../../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../../shared/components/detail-card/detail-card.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-public-holiday',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    DetailCardComponent,
    FormHeaderComponent
  ],
  templateUrl: './view-public-holiday.component.html',
  styleUrls: ['./view-public-holiday.component.css']
})
export class ViewPublicHolidayComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private publicHolidaysService = inject(PublicHolidaysService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  holiday = signal<PublicHoliday | null>(null);
  error = signal<string | null>(null);

  get basicInfoFields(): DetailField[] {
    const holiday = this.holiday();
    if (!holiday) return [];

    return [
      {
        label: this.i18n.t('fields.name'),
        value: holiday.name
      },
      {
        label: this.i18n.t('fields.nameAr'),
        value: holiday.nameAr || this.i18n.t('common.not_specified')
      },
      {
        label: this.i18n.t('fields.holidayType'),
        value: this.getHolidayTypeLabel(holiday.holidayType)
      },
      {
        label: this.i18n.t('fields.status'),
        value: holiday.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
        type: 'badge',
        badgeVariant: holiday.isActive ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('fields.scope'),
        value: holiday.isNational
          ? this.i18n.t('public_holidays.national')
          : (holiday.branchName || this.i18n.t('public_holidays.branch_specific')),
        type: 'badge',
        badgeVariant: holiday.isNational ? 'primary' : 'info'
      }
    ];
  }

  get dateInfoFields(): DetailField[] {
    const holiday = this.holiday();
    if (!holiday) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('public_holidays.pattern_description'),
        value: holiday.patternDescription
      }
    ];

    if (holiday.nextOccurrence) {
      fields.push({
        label: this.i18n.t('public_holidays.next_occurrence'),
        value: holiday.nextOccurrence,
        type: 'date'
      });
    }

    if (holiday.effectiveFromYear || holiday.effectiveToYear) {
      let effectivePeriod = '';
      if (holiday.effectiveFromYear && holiday.effectiveToYear) {
        effectivePeriod = `${holiday.effectiveFromYear} - ${holiday.effectiveToYear}`;
      } else if (holiday.effectiveFromYear) {
        effectivePeriod = `${this.i18n.t('public_holidays.from')} ${holiday.effectiveFromYear}`;
      } else if (holiday.effectiveToYear) {
        effectivePeriod = `${this.i18n.t('public_holidays.until')} ${holiday.effectiveToYear}`;
      }

      if (effectivePeriod) {
        fields.push({
          label: this.i18n.t('public_holidays.effective_period'),
          value: effectivePeriod
        });
      }
    }

    fields.push({
      label: this.i18n.t('fields.priority'),
      value: holiday.priority.toString()
    });

    if (holiday.hasConflicts) {
      fields.push({
        label: this.i18n.t('public_holidays.conflicts'),
        value: this.i18n.t('common.yes'),
        type: 'badge',
        badgeVariant: 'warning'
      });
    }

    return fields;
  }

  get additionalInfoFields(): DetailField[] {
    const holiday = this.holiday();
    if (!holiday) return [];

    const fields: DetailField[] = [];

    if (holiday.description) {
      fields.push({
        label: this.i18n.t('fields.description'),
        value: holiday.description
      });
    }

    if (holiday.countryCode) {
      fields.push({
        label: this.i18n.t('fields.countryCode'),
        value: holiday.countryCode.toUpperCase()
      });
    }

    fields.push(
      {
        label: this.i18n.t('fields.createdAt'),
        value: holiday.createdAt,
        type: 'datetime'
      }
    );

    if (holiday.updatedAt) {
      fields.push({
        label: this.i18n.t('fields.updatedAt'),
        value: holiday.updatedAt,
        type: 'datetime'
      });
    }

    return fields;
  }

  ngOnInit(): void {
    this.loadHolidayDetails();
  }

  private loadHolidayDetails(): void {
    const holidayId = this.route.snapshot.paramMap.get('id');
    if (!holidayId) {
      this.router.navigate(['/settings/public-holidays']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.publicHolidaysService.getPublicHolidayById(+holidayId, true).subscribe({
      next: (holiday) => {
        this.holiday.set(holiday);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load holiday details:', error);
        this.error.set(this.i18n.t('public_holidays.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async deleteHoliday(): Promise<void> {
    if (!this.holiday()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('public_holidays.delete_holiday'),
      message: this.i18n.t('public_holidays.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.publicHolidaysService.deletePublicHoliday(this.holiday()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('public_holidays.success.deleted')
          );
          this.router.navigate(['/settings/public-holidays']);
        },
        error: (error) => {
          console.error('Failed to delete holiday:', error);
          this.notificationService.error(
            this.i18n.t('public_holidays.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Helper methods
  private getHolidayTypeLabel(holidayType: HolidayType): string {
    const types = this.publicHolidaysService.getHolidayTypes();
    const type = types.find(t => t.value === holidayType);
    return type ? type.label : holidayType.toString();
  }

  // Permission checks
  canEdit(): boolean {
    return this.permissionService.has(`public-holiday.${PermissionActions.UPDATE}`);
  }

  canDelete(): boolean {
    return this.permissionService.has(`public-holiday.${PermissionActions.DELETE}`);
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canDelete();
  }

  getHolidayName(): string {
    return this.holiday()?.name || '';
  }
}