import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { OvertimeConfigurationsService, OvertimeConfiguration } from '../overtime-configurations.service';
import { PermissionActions } from '../../../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DetailCardComponent, DetailField } from '../../../../shared/components/detail-card/detail-card.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-view-overtime-configuration',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    DetailCardComponent,
    FormHeaderComponent,
    StatusBadgeComponent
  ],
  templateUrl: './view-overtime-configuration.component.html',
  styleUrls: ['./view-overtime-configuration.component.css']
})
export class ViewOvertimeConfigurationComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private overtimeConfigurationsService = inject(OvertimeConfigurationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

  // Signals
  loading = signal(false);
  processing = signal(false);
  overtimeConfig = signal<OvertimeConfiguration | null>(null);
  error = signal<string | null>(null);

  get basicInfoFields(): DetailField[] {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('fields.status'),
        value: config.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
        type: 'badge',
        badgeVariant: config.isActive ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('overtime_configs.effective_from'),
        value: config.effectiveFromDate,
        type: 'date'
      },
      {
        label: this.i18n.t('overtime_configs.effective_to'),
        value: config.effectiveToDate || this.i18n.t('common.ongoing'),
        type: config.effectiveToDate ? 'date' : undefined
      }
    ];
  }

  get overtimeSettingsFields(): DetailField[] {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('overtime_configs.enable_pre_shift'),
        value: config.enablePreShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
        type: 'badge',
        badgeVariant: config.enablePreShiftOvertime ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('overtime_configs.enable_post_shift'),
        value: config.enablePostShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
        type: 'badge',
        badgeVariant: config.enablePostShiftOvertime ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('overtime_configs.max_pre_shift_hours'),
        value: `${config.maxPreShiftOvertimeHours} ${this.i18n.t('fields.hoursUnit')}`
      },
      {
        label: this.i18n.t('overtime_configs.max_post_shift_hours'),
        value: `${config.maxPostShiftOvertimeHours} ${this.i18n.t('fields.hoursUnit')}`
      },
      {
        label: this.i18n.t('overtime_configs.minimum_overtime_minutes'),
        value: `${config.minimumOvertimeMinutes} ${this.i18n.t('fields.minutesUnit')}`
      },
      {
        label: this.i18n.t('overtime_configs.grace_period_minutes'),
        value: `${config.overtimeGracePeriodMinutes} ${this.i18n.t('fields.minutesUnit')}`
      },
      {
        label: this.i18n.t('overtime_configs.rounding_interval'),
        value: `${config.roundingIntervalMinutes} ${this.i18n.t('fields.minutesUnit')}`
      }
    ];
  }

  get overtimeRatesFields(): DetailField[] {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('overtime_configs.normal_day_rate'),
        value: `${config.normalDayRate}x`
      },
      {
        label: this.i18n.t('overtime_configs.public_holiday_rate'),
        value: `${config.publicHolidayRate}x`
      },
      {
        label: this.i18n.t('overtime_configs.off_day_rate'),
        value: `${config.offDayRate}x`
      }
    ];
  }

  get policySettingsFields(): DetailField[] {
    const config = this.overtimeConfig();
    if (!config) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('overtime_configs.require_approval'),
        value: config.requireApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.requireApproval ? 'warning' : 'success'
      },
      {
        label: this.i18n.t('overtime_configs.consider_flexible_time'),
        value: config.considerFlexibleTime ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.considerFlexibleTime ? 'info' : 'secondary'
      },
      {
        label: this.i18n.t('overtime_configs.weekend_as_off_day'),
        value: config.weekendAsOffDay ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.weekendAsOffDay ? 'info' : 'secondary'
      }
    ];

    if (config.policyNotes) {
      fields.push({
        label: this.i18n.t('overtime_configs.policy_notes'),
        value: config.policyNotes
      });
    }

    return fields;
  }

  get auditFields(): DetailField[] {
    const config = this.overtimeConfig();
    if (!config) return [];

    const fields: DetailField[] = [
      {
        label: this.i18n.t('fields.createdAt'),
        value: config.createdAtUtc,
        type: 'datetime'
      },
      {
        label: this.i18n.t('fields.createdBy'),
        value: config.createdBy
      }
    ];

    if (config.updatedAtUtc && config.updatedBy) {
      fields.push(
        {
          label: this.i18n.t('fields.updatedAt'),
          value: config.updatedAtUtc,
          type: 'datetime'
        },
        {
          label: this.i18n.t('fields.updatedBy'),
          value: config.updatedBy
        }
      );
    }

    return fields;
  }

  ngOnInit(): void {
    this.loadOvertimeConfigurationDetails();
  }

  private loadOvertimeConfigurationDetails(): void {
    const configId = this.route.snapshot.paramMap.get('id');
    if (!configId) {
      this.router.navigate(['/settings/overtime']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.overtimeConfigurationsService.getOvertimeConfigurationById(+configId).subscribe({
      next: (config) => {
        this.overtimeConfig.set(config);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load overtime configuration details:', error);
        this.error.set(this.i18n.t('overtime_configs.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }


  async toggleStatus(): Promise<void> {
    if (!this.overtimeConfig()) return;

    const config = this.overtimeConfig()!;
    const isActivating = !config.isActive;

    const result = await this.confirmationService.confirm({
      title: isActivating
        ? this.i18n.t('overtime_configs.activate_configuration')
        : this.i18n.t('overtime_configs.deactivate_configuration'),
      message: isActivating
        ? this.i18n.t('overtime_configs.confirm_activate')
        : this.i18n.t('overtime_configs.confirm_deactivate'),
      confirmText: isActivating
        ? this.i18n.t('common.activate')
        : this.i18n.t('common.deactivate'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: isActivating ? 'btn-success' : 'btn-warning',
      icon: isActivating ? 'fa-check' : 'fa-pause',
      iconClass: isActivating ? 'text-success' : 'text-warning'
    });

    if (result.confirmed) {
      this.processing.set(true);

      const action = isActivating
        ? this.overtimeConfigurationsService.activateOvertimeConfiguration(config.id)
        : this.overtimeConfigurationsService.deactivateOvertimeConfiguration(config.id);

      action.subscribe({
        next: () => {
          this.notificationService.success(
            isActivating
              ? this.i18n.t('overtime_configs.success.activated')
              : this.i18n.t('overtime_configs.success.deactivated')
          );
          this.loadOvertimeConfigurationDetails(); // Reload to show updated status
          this.processing.set(false);
        },
        error: (error) => {
          console.error('Failed to toggle overtime configuration status:', error);
          this.notificationService.error(
            this.i18n.t('overtime_configs.errors.toggle_status_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  async deleteOvertimeConfiguration(): Promise<void> {
    if (!this.overtimeConfig()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('overtime_configs.delete_configuration'),
      message: this.i18n.t('overtime_configs.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.processing.set(true);

      this.overtimeConfigurationsService.deleteOvertimeConfiguration(this.overtimeConfig()!.id).subscribe({
        next: () => {
          this.notificationService.success(
            this.i18n.t('overtime_configs.success.deleted')
          );
          this.router.navigate(['/settings/overtime']);
        },
        error: (error) => {
          console.error('Failed to delete overtime configuration:', error);
          this.notificationService.error(
            this.i18n.t('overtime_configs.errors.delete_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  // Permission checks
  canEdit(): boolean {
    return this.permissionService.has(`overtime-config.${PermissionActions.UPDATE}`);
  }

  canToggleStatus(): boolean {
    return this.permissionService.has(`overtime-config.${PermissionActions.UPDATE}`);
  }

  canDelete(): boolean {
    return this.permissionService.has(`overtime-config.${PermissionActions.DELETE}`);
  }

  hasActiveActions(): boolean {
    return this.canEdit() || this.canToggleStatus() || this.canDelete();
  }

  getConfigurationDisplayName(): string {
    const config = this.overtimeConfig();
    if (!config) return '';

    return `${this.i18n.t('overtime_configs.configuration')} #${config.id}`;
  }

  // Computed properties for status badges
  preShiftOvertimeBadge = computed<{ label: string; variant: 'success' | 'secondary' }>(() => {
    const config = this.overtimeConfig();
    if (!config) return { label: '', variant: 'secondary' };

    return {
      label: config.enablePreShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
      variant: config.enablePreShiftOvertime ? 'success' : 'secondary'
    };
  });

  postShiftOvertimeBadge = computed<{ label: string; variant: 'success' | 'secondary' }>(() => {
    const config = this.overtimeConfig();
    if (!config) return { label: '', variant: 'secondary' };

    return {
      label: config.enablePostShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
      variant: config.enablePostShiftOvertime ? 'success' : 'secondary'
    };
  });

  requiresApprovalBadge = computed<{ label: string; variant: 'warning' | 'success' }>(() => {
    const config = this.overtimeConfig();
    if (!config) return { label: '', variant: 'success' };

    return {
      label: config.requireApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
      variant: config.requireApproval ? 'warning' : 'success'
    };
  });
}