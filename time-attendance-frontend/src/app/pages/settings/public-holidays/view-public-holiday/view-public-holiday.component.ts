import { Component, signal, inject, OnInit, computed } from '@angular/core';

import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { PublicHolidaysService } from '../public-holidays.service';
import { PublicHoliday, HolidayType } from '../../../../shared/models/public-holiday.model';
import { PermissionActions } from '../../../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-public-holiday',
  standalone: true,
  imports: [
    RouterModule,
    LoadingSpinnerComponent,
    SectionCardComponent,
    DefinitionListComponent,
    StatusBadgeComponent,
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

  // Computed properties for reactive data
  basicInfoItems = computed<DefinitionItem[]>(() => {
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
        label: this.i18n.t('fields.scope'),
        value: holiday.isNational
          ? this.i18n.t('settings.holidays.national')
          : holiday.branchId
            ? (holiday.branchName || `Branch ${holiday.branchId}`)
            : this.i18n.t('common.company_wide')
      }
    ];
  });

  dateInfoItems = computed<DefinitionItem[]>(() => {
    const holiday = this.holiday();
    if (!holiday) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('settings.holidays.pattern_description'),
        value: holiday.patternDescription
      }
    ];

    if (holiday.nextOccurrence) {
      items.push({
        label: this.i18n.t('settings.holidays.nextOccurrence'),
        value: this.formatDate(holiday.nextOccurrence)
      });
    }

    if (holiday.effectiveFromYear || holiday.effectiveToYear) {
      let effectivePeriod = '';
      if (holiday.effectiveFromYear && holiday.effectiveToYear) {
        effectivePeriod = `${holiday.effectiveFromYear} - ${holiday.effectiveToYear}`;
      } else if (holiday.effectiveFromYear) {
        effectivePeriod = `${this.i18n.t('common.from')} ${holiday.effectiveFromYear}`;
      } else if (holiday.effectiveToYear) {
        effectivePeriod = `${this.i18n.t('settings.holidays.until')} ${holiday.effectiveToYear}`;
      }

      if (effectivePeriod) {
        items.push({
          label: this.i18n.t('settings.holidays.effective_period'),
          value: effectivePeriod
        });
      }
    }

    items.push({
      label: this.i18n.t('fields.priority'),
      value: holiday.priority.toString()
    });

    if (holiday.hasConflicts) {
      items.push({
        label: this.i18n.t('settings.holidays.conflicts'),
        value: this.i18n.t('common.yes')
      });
    }

    return items;
  });

  additionalInfoItems = computed<DefinitionItem[]>(() => {
    const holiday = this.holiday();
    if (!holiday) return [];

    const items: DefinitionItem[] = [];

    if (holiday.description) {
      items.push({
        label: this.i18n.t('fields.description'),
        value: holiday.description
      });
    }

    if (holiday.countryCode) {
      items.push({
        label: this.i18n.t('fields.countryCode'),
        value: holiday.countryCode.toUpperCase()
      });
    }

    return items;
  });

  auditItems = computed<DefinitionItem[]>(() => {
    const holiday = this.holiday();
    if (!holiday) return [];

    const items: DefinitionItem[] = [
      {
        label: this.i18n.t('fields.createdAt'),
        value: this.formatDateTime(holiday.createdAt)
      }
    ];

    if (holiday.updatedAt) {
      items.push({
        label: this.i18n.t('fields.updatedAt'),
        value: this.formatDateTime(holiday.updatedAt)
      });
    }

    return items;
  });

  // Status badge computed properties
  statusBadge = computed<{ label: string; variant: StatusVariant }>(() => ({
    label: this.holiday()?.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
    variant: this.holiday()?.isActive ? 'success' : 'secondary'
  }));

  scopeBadge = computed<{ label: string; variant: StatusVariant }>(() => {
    const holiday = this.holiday();
    if (!holiday) return { label: '', variant: 'secondary' };

    return {
      label: holiday.isNational
        ? this.i18n.t('settings.holidays.national')
        : holiday.branchId
          ? (holiday.branchName || `Branch ${holiday.branchId}`)
          : this.i18n.t('common.company_wide'),
      variant: holiday.isNational ? 'primary' : 'info'
    };
  });

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
        this.error.set(this.i18n.t('common.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async deleteHoliday(): Promise<void> {
    if (!this.holiday()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('settings.holidays.deleteHoliday'),
      message: this.i18n.t('settings.holidays.deleteHolidayConfirmation'),
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
            this.i18n.t('settings.holidays.holidayDeletedSuccessfully')
          );
          this.router.navigate(['/settings/public-holidays']);
        },
        error: (error) => {
          console.error('Failed to delete holiday:', error);
          this.notificationService.error(
            this.i18n.t('common.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Helper methods
  getHolidayTypeLabel(holidayType: HolidayType): string {
    const types = this.publicHolidaysService.getHolidayTypes();
    const type = types.find(t => t.value === holidayType);
    return type ? type.label : holidayType.toString();
  }

  private formatDate(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  }

  private formatDateTime(dateTime: string | Date): string {
    if (!dateTime) return '';
    const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
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