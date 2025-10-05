import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { OvertimeConfigurationsService, OvertimeConfiguration } from '../overtime-configurations.service';
import { PermissionActions } from '../../../../shared/utils/permission.utils';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-overtime-configuration',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    DefinitionListComponent,
    SectionCardComponent,
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

  basicInfoItems = computed<DefinitionItem[]>(() => {
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
        label: this.i18n.t('settings.overtime.effectiveFrom'),
        value: config.effectiveFromDate,
        type: 'date'
      },
      {
        label: this.i18n.t('settings.overtime.effectiveTo'),
        value: config.effectiveToDate || this.i18n.t('settings.overtime.indefinite')
      }
    ];
  });

  overtimeSettingsLeftItems = computed<DefinitionItem[]>(() => {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('settings.overtime.enablePreShift'),
        value: config.enablePreShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
        type: 'badge',
        badgeVariant: config.enablePreShiftOvertime ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('settings.overtime.enablePostShift'),
        value: config.enablePostShiftOvertime ? this.i18n.t('common.enabled') : this.i18n.t('common.disabled'),
        type: 'badge',
        badgeVariant: config.enablePostShiftOvertime ? 'success' : 'secondary'
      },
      {
        label: this.i18n.t('settings.overtime.maxPreShiftHours'),
        value: `${config.maxPreShiftOvertimeHours} ${this.i18n.t('common.hours')}`
      },
      {
        label: this.i18n.t('settings.overtime.maxPostShiftHours'),
        value: `${config.maxPostShiftOvertimeHours} ${this.i18n.t('common.hours')}`
      }
    ];
  });

  overtimeSettingsRightItems = computed<DefinitionItem[]>(() => {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('settings.overtime.minimumOvertimeMinutes'),
        value: `${config.minimumOvertimeMinutes} ${this.i18n.t('common.minutes')}`
      },
      {
        label: this.i18n.t('settings.overtime.gracePeriodMinutes'),
        value: `${config.overtimeGracePeriodMinutes} ${this.i18n.t('common.minutes')}`
      },
      {
        label: this.i18n.t('settings.overtime.roundingIntervalMinutes'),
        value: `${config.roundingIntervalMinutes} ${this.i18n.t('common.minutes')}`
      }
    ];
  });

  overtimeRatesItems = computed<DefinitionItem[]>(() => {
    const config = this.overtimeConfig();
    if (!config) return [];

    return [
      {
        label: this.i18n.t('settings.overtime.normalDayRate'),
        value: `${config.normalDayRate}x`
      },
      {
        label: this.i18n.t('settings.overtime.publicHolidayRate'),
        value: `${config.publicHolidayRate}x`
      },
      {
        label: this.i18n.t('settings.overtime.offDayRate'),
        value: `${config.offDayRate}x`
      }
    ];
  });

  policySettingsItems = computed<DefinitionItem[]>(() => {
    const config = this.overtimeConfig();
    if (!config) return [];

    const fields: DefinitionItem[] = [
      {
        label: this.i18n.t('settings.overtime.requireApproval'),
        value: config.requireApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.requireApproval ? 'warning' : 'success'
      },
      {
        label: this.i18n.t('settings.overtime.considerFlexibleTime'),
        value: config.considerFlexibleTime ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.considerFlexibleTime ? 'info' : 'secondary'
      },
      {
        label: this.i18n.t('settings.overtime.weekendAsOffDay'),
        value: config.weekendAsOffDay ? this.i18n.t('common.yes') : this.i18n.t('common.no'),
        type: 'badge',
        badgeVariant: config.weekendAsOffDay ? 'info' : 'secondary'
      }
    ];

    if (config.policyNotes) {
      fields.push({
        label: this.i18n.t('settings.overtime.policyNotes'),
        value: config.policyNotes
      });
    }

    return fields;
  });

  auditItems = computed<DefinitionItem[]>(() => {
    const config = this.overtimeConfig();
    if (!config) return [];

    const fields: DefinitionItem[] = [
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
  });

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
        this.error.set(this.i18n.t('common.errors.load_failed'));
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
        ? this.i18n.t('settings.overtime.activatePolicy')
        : this.i18n.t('settings.overtime.deactivatePolicy'),
      message: isActivating
        ? this.i18n.t('settings.overtime.activatePolicyConfirmation')
        : this.i18n.t('settings.overtime.deactivatePolicyConfirmation'),
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
              ? this.i18n.t('settings.overtime.policyActivatedSuccessfully')
              : this.i18n.t('settings.overtime.policyDeactivatedSuccessfully')
          );
          this.loadOvertimeConfigurationDetails(); // Reload to show updated status
          this.processing.set(false);
        },
        error: (error) => {
          console.error('Failed to toggle overtime configuration status:', error);
          this.notificationService.error(
            this.i18n.t('common.errors.operation_failed')
          );
          this.processing.set(false);
        }
      });
    }
  }

  async deleteOvertimeConfiguration(): Promise<void> {
    if (!this.overtimeConfig()) return;

    const result = await this.confirmationService.confirm({
      title: this.i18n.t('settings.overtime.deletePolicy'),
      message: this.i18n.t('settings.overtime.deletePolicyConfirmation'),
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
            this.i18n.t('settings.overtime.policyDeletedSuccessfully')
          );
          this.router.navigate(['/settings/overtime']);
        },
        error: (error) => {
          console.error('Failed to delete overtime configuration:', error);
          this.notificationService.error(
            this.i18n.t('common.errors.delete_failed')
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

    return `${this.i18n.t('settings.overtime.configuration')} #${config.id}`;
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