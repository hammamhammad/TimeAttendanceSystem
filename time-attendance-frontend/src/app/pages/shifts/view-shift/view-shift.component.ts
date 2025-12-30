import { Component, signal, inject, OnInit, computed } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { ShiftsService } from '../shifts.service';
import { Shift, ShiftType, ShiftStatus, ShiftPeriod } from '../../../shared/models/shift.model';
import { PermissionActions } from '../../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../shared/components/detail-card/detail-card.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent, FormHeaderAction } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-shift',
  standalone: true,
  imports: [
    LoadingSpinnerComponent,
    DetailCardComponent,
    FormHeaderComponent,
    StatusBadgeComponent
],
  templateUrl: './view-shift.component.html',
  styleUrls: ['./view-shift.component.css']
})
export class ViewShiftComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private shiftsService = inject(ShiftsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  shift = signal<Shift | null>(null);
  error = signal<string | null>(null);

  // Expose enums for template
  ShiftType = ShiftType;
  ShiftStatus = ShiftStatus;

  get basicInfoFields(): DetailField[] {
    const shift = this.shift();
    if (!shift) return [];

    return [
      {
        label: this.i18n.t('shifts.name'),
        value: shift.name
      },
      {
        label: this.i18n.t('shifts.description'),
        value: shift.description || this.i18n.t('common.not_specified')
      },
      {
        label: this.i18n.t('shifts.type'),
        value: this.getShiftTypeLabel(shift.shiftType),
        type: 'badge',
        badgeVariant: shift.shiftType === ShiftType.TimeBased ? 'info' : 'secondary'
      },
      {
        label: this.i18n.t('common.status'),
        value: this.getShiftStatusLabel(shift.status),
        type: 'badge',
        badgeVariant: this.getStatusBadgeVariant(shift.status) as 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
      },
      {
        label: this.i18n.t('shifts.night_shift'),
        value: shift.isNightShift ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: shift.isNightShift ? 'warning' : 'secondary'
      }
    ];
  }

  get workingHoursFields(): DetailField[] {
    const shift = this.shift();
    if (!shift) return [];

    const fields: DetailField[] = [];

    if (shift.requiredHours !== undefined) {
      fields.push({
        label: this.i18n.t('shifts.required_hours'),
        value: `${shift.requiredHours} ${this.i18n.t('fields.hoursUnit')}`
      });
    }

    if (shift.requiredWeeklyHours !== undefined) {
      fields.push({
        label: this.i18n.t('shifts.required_weekly_hours'),
        value: `${shift.requiredWeeklyHours} ${this.i18n.t('fields.hoursUnit')}`
      });
    }

    if (shift.hasCoreHours && shift.coreStart && shift.coreEnd) {
      fields.push({
        label: this.i18n.t('shifts.core_hours'),
        value: `${shift.coreStart} - ${shift.coreEnd}`
      });
    }

    return fields;
  }

  get workingDaysFields(): DetailField[] {
    const shift = this.shift();
    if (!shift) return [];

    const workingDays = [];
    if (shift.isSunday) workingDays.push(this.i18n.t('days.sunday'));
    if (shift.isMonday) workingDays.push(this.i18n.t('days.monday'));
    if (shift.isTuesday) workingDays.push(this.i18n.t('days.tuesday'));
    if (shift.isWednesday) workingDays.push(this.i18n.t('days.wednesday'));
    if (shift.isThursday) workingDays.push(this.i18n.t('days.thursday'));
    if (shift.isFriday) workingDays.push(this.i18n.t('days.friday'));
    if (shift.isSaturday) workingDays.push(this.i18n.t('days.saturday'));

    return [
      {
        label: this.i18n.t('shifts.working_days'),
        value: workingDays.length > 0 ? workingDays.join(', ') : this.i18n.t('shifts.no_working_days')
      },
      {
        label: this.i18n.t('shifts.total_working_days'),
        value: `${workingDays.length} ${workingDays.length === 1 ? this.i18n.t('fields.dayUnit') : this.i18n.t('fields.daysUnit')}`
      }
    ];
  }

  get settingsFields(): DetailField[] {
    const shift = this.shift();
    if (!shift) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('shifts.check_in_required'),
        value: shift.isCheckInRequired ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: shift.isCheckInRequired ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('shifts.auto_check_out'),
        value: shift.isAutoCheckOut ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: shift.isAutoCheckOut ? 'info' : 'secondary'
      },
      {
        label: this.i18n.t('shifts.flexible_hours'),
        value: shift.allowFlexibleHours ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
        type: 'badge',
        badgeVariant: shift.allowFlexibleHours ? 'success' : 'secondary'
      }
    ];

    if (shift.allowFlexibleHours) {
      if (shift.flexMinutesBefore !== undefined) {
        fields.push({
          label: this.i18n.t('shifts.flex_minutes_before'),
          value: `${shift.flexMinutesBefore} ${this.i18n.t('fields.minutesUnit')}`
        });
      }
      if (shift.flexMinutesAfter !== undefined) {
        fields.push({
          label: this.i18n.t('shifts.flex_minutes_after'),
          value: `${shift.flexMinutesAfter} ${this.i18n.t('fields.minutesUnit')}`
        });
      }
    }

    if (shift.gracePeriodMinutes !== undefined) {
      fields.push({
        label: this.i18n.t('shifts.grace_period'),
        value: `${shift.gracePeriodMinutes} ${this.i18n.t('fields.minutesUnit')}`
      });
    }

    return fields;
  }

  get auditFields(): DetailField[] {
    const shift = this.shift();
    if (!shift) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('fields.createdAt'),
        value: shift.createdAtUtc,
        type: 'datetime'
      },
      {
        label: this.i18n.t('fields.createdBy'),
        value: shift.createdBy
      }
    ];

    if (shift.modifiedAtUtc && shift.modifiedBy) {
      fields.push(
        {
          label: this.i18n.t('fields.modifiedAt'),
          value: shift.modifiedAtUtc,
          type: 'datetime'
        },
        {
          label: this.i18n.t('fields.modifiedBy'),
          value: shift.modifiedBy
        }
      );
    }

    return fields;
  }

  get shiftPeriods(): ShiftPeriod[] {
    return this.shift()?.shiftPeriods || [];
  }

  ngOnInit(): void {
    this.loadShiftDetails();
  }

  private loadShiftDetails(): void {
    const shiftId = this.route.snapshot.paramMap.get('id');
    if (!shiftId) {
      this.router.navigate(['/shifts']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.shiftsService.getShiftById(+shiftId).subscribe({
      next: (shift) => {
        this.shift.set(shift);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load shift details:', error);
        this.error.set(this.i18n.t('shifts.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async setAsDefault(): Promise<void> {
    if (!this.shift()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('shifts.set_default_shift'),
      message: this.i18n.t('shifts.confirm_set_default'),
      confirmText: this.i18n.t('shifts.set_default'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-star',
      iconClass: 'text-warning'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.shiftsService.setDefaultShift(this.shift()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('shifts.success.defaultSet')
          );
          this.processing.set(false);
        },
        error: (error) => {
          console.error('Failed to set default shift:', error);
          this.notificationService.error(
            this.i18n.t('shifts.errors.set_default_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  async deleteShift(): Promise<void> {
    if (!this.shift()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('shifts.delete_shift'),
      message: this.i18n.t('shifts.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.shiftsService.deleteShift(this.shift()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('shifts.success.deleted')
          );
          this.router.navigate(['/shifts']);
        },
        error: (error) => {
          console.error('Failed to delete shift:', error);
          this.notificationService.error(
            this.i18n.t('shifts.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Helper methods
  public getShiftName(): string {
    const shift = this.shift();
    return shift ? shift.name : '';
  }

  public getShiftTypeLabel(shiftType: ShiftType): string {
    switch (shiftType) {
      case ShiftType.TimeBased:
        return this.i18n.t('shifts.time_based');
      case ShiftType.HoursOnly:
        return this.i18n.t('shifts.hours_only');
      default:
        return (shiftType as any).toString();
    }
  }

  public getShiftStatusLabel(status: ShiftStatus): string {
    switch (status) {
      case ShiftStatus.Active:
        return this.i18n.t('common.active');
      case ShiftStatus.Inactive:
        return this.i18n.t('common.inactive');
      case ShiftStatus.Draft:
        return this.i18n.t('shifts.draft');
      case ShiftStatus.Archived:
        return this.i18n.t('shifts.archived');
      default:
        return (status as any).toString();
    }
  }

  public getStatusBadgeVariant(status: ShiftStatus): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' {
    switch (status) {
      case ShiftStatus.Active:
        return 'success';
      case ShiftStatus.Inactive:
        return 'secondary';
      case ShiftStatus.Draft:
        return 'warning';
      case ShiftStatus.Archived:
        return 'dark';
      default:
        return 'secondary';
    }
  }

  // Permission checks
  canEdit(): boolean {
    return this.permissionService.has(`shift.${PermissionActions.UPDATE}`);
  }

  canSetDefault(): boolean {
    return this.permissionService.has(`shift.${PermissionActions.UPDATE}`);
  }

  canDelete(): boolean {
    return this.permissionService.has(`shift.${PermissionActions.DELETE}`);
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canSetDefault() || this.canDelete();
  }


  formatTime(time: string): string {
    // Assuming time is in HH:mm format
    return time;
  }

  calculatePeriodHours(period: ShiftPeriod): string {
    return `${period.hours} ${this.i18n.t('fields.hoursUnit')}`;
  }

  getTotalShiftHours(): string {
    const periods = this.shiftPeriods;
    if (periods.length === 0) return '0';

    const totalHours = periods.reduce((sum, period) => sum + period.hours, 0);
    return `${totalHours} ${this.i18n.t('fields.hoursUnit')}`;
  }

  // Computed properties for summary badges
  shiftTypeBadge = computed(() => {
    const shift = this.shift();
    if (!shift) return { label: '', variant: 'secondary' as const };

    const variant: 'info' | 'secondary' = shift.shiftType === ShiftType.TimeBased ? 'info' : 'secondary';
    return {
      label: this.getShiftTypeLabel(shift.shiftType),
      variant
    };
  });

  statusBadge = computed(() => {
    const shift = this.shift();
    if (!shift) return { label: '', variant: 'secondary' as const };

    return {
      label: this.getShiftStatusLabel(shift.status),
      variant: this.getStatusBadgeVariant(shift.status)
    };
  });

  flexibilityBadge = computed(() => {
    const shift = this.shift();
    if (!shift) return { label: '', variant: 'secondary' as const };

    const variant: 'success' | 'secondary' = shift.allowFlexibleHours ? 'success' : 'secondary';
    return {
      label: shift.allowFlexibleHours ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
      variant
    };
  });

  nightShiftBadge = computed(() => {
    const shift = this.shift();
    return {
      label: this.i18n.t('common.yes'),
      variant: 'warning' as const,
      visible: shift?.isNightShift || false
    };
  });

  // Header actions computed property
  headerActions = computed<FormHeaderAction[]>(() => {
    const shift = this.shift();
    if (!shift) return [];

    const actions: FormHeaderAction[] = [];

    // Edit action
    if (this.canEdit()) {
      actions.push({
        label: this.i18n.t('common.edit'),
        icon: 'fas fa-edit',
        route: `/shifts/edit/${shift.id}`,
        type: 'primary',
        action: () => {}
      });
    }

    return actions;
  });
}