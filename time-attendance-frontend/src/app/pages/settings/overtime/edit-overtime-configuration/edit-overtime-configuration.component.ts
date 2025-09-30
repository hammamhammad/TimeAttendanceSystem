import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { OvertimeConfigurationsService, UpdateOvertimeConfigurationRequest, OvertimeConfiguration } from '../overtime-configurations.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';

@Component({
  selector: 'app-edit-overtime-configuration',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FormHeaderComponent],
  templateUrl: './edit-overtime-configuration.component.html',
  styleUrls: ['./edit-overtime-configuration.component.css']
})
export class EditOvertimeConfigurationComponent implements OnInit {
  private overtimeService = inject(OvertimeConfigurationsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);

  // Configuration ID and original data
  configurationId: number = 0;
  originalConfig: OvertimeConfiguration | null = null;

  // Form state
  configForm = {
    enablePreShiftOvertime: false,
    enablePostShiftOvertime: true,
    normalDayRate: 1.5,
    publicHolidayRate: 2.0,
    offDayRate: 1.5,
    minimumOvertimeMinutes: 15,
    considerFlexibleTime: true,
    maxPreShiftOvertimeHours: 2.0,
    maxPostShiftOvertimeHours: 4.0,
    requireApproval: false,
    overtimeGracePeriodMinutes: 5,
    weekendAsOffDay: true,
    roundingIntervalMinutes: 15,
    policyNotes: '',
    effectiveFromDate: this.getTodayDate(),
    effectiveToDate: ''
  };

  // Validation errors
  validationErrors = signal<{[key: string]: string}>({});

  ngOnInit(): void {
    // Get configuration ID from route
    this.route.params.subscribe(params => {
      this.configurationId = +params['id'];
      if (this.configurationId) {
        this.loadConfiguration();
      }
    });
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  private loadConfiguration(): void {
    this.loading.set(true);
    this.error.set(null);

    this.overtimeService.getOvertimeConfigurationById(this.configurationId).subscribe({
      next: (config) => {
        this.originalConfig = config;
        this.populateForm(config);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load overtime configuration:', error);
        this.loading.set(false);

        if (error.status === 404) {
          this.error.set(this.t('settings.overtime.errors.configurationNotFound'));
          this.notificationService.error(
            this.t('app.error'),
            this.t('settings.overtime.errors.configurationNotFound')
          );
        } else {
          this.error.set(this.t('errors.server'));
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      }
    });
  }

  private populateForm(config: OvertimeConfiguration): void {
    this.configForm = {
      enablePreShiftOvertime: config.enablePreShiftOvertime,
      enablePostShiftOvertime: config.enablePostShiftOvertime,
      normalDayRate: config.normalDayRate,
      publicHolidayRate: config.publicHolidayRate,
      offDayRate: config.offDayRate,
      minimumOvertimeMinutes: config.minimumOvertimeMinutes,
      considerFlexibleTime: config.considerFlexibleTime,
      maxPreShiftOvertimeHours: config.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: config.maxPostShiftOvertimeHours,
      requireApproval: config.requireApproval,
      overtimeGracePeriodMinutes: config.overtimeGracePeriodMinutes,
      weekendAsOffDay: config.weekendAsOffDay,
      roundingIntervalMinutes: config.roundingIntervalMinutes,
      policyNotes: config.policyNotes || '',
      effectiveFromDate: config.effectiveFromDate.split('T')[0], // Convert to date input format
      effectiveToDate: config.effectiveToDate ? config.effectiveToDate.split('T')[0] : ''
    };
  }

  validateForm(): boolean {
    const errors: {[key: string]: string} = {};

    // Validate required fields
    if (!this.configForm.effectiveFromDate) {
      errors['effectiveFromDate'] = this.t('settings.overtime.validation.effectiveFromRequired');
    }

    // Validate rates
    if (this.configForm.normalDayRate <= 0) {
      errors['normalDayRate'] = this.t('settings.overtime.validation.ratePositive');
    }
    if (this.configForm.publicHolidayRate <= 0) {
      errors['publicHolidayRate'] = this.t('settings.overtime.validation.ratePositive');
    }
    if (this.configForm.offDayRate <= 0) {
      errors['offDayRate'] = this.t('settings.overtime.validation.ratePositive');
    }

    // Validate minimum overtime minutes
    if (this.configForm.minimumOvertimeMinutes < 0) {
      errors['minimumOvertimeMinutes'] = this.t('settings.overtime.validation.minimumOvertimePositive');
    }

    // Validate grace period
    if (this.configForm.overtimeGracePeriodMinutes < 0) {
      errors['overtimeGracePeriodMinutes'] = this.t('settings.overtime.validation.gracePeriodPositive');
    }

    // Validate rounding interval
    if (this.configForm.roundingIntervalMinutes <= 0) {
      errors['roundingIntervalMinutes'] = this.t('settings.overtime.validation.roundingIntervalPositive');
    }

    // Validate max hours
    if (this.configForm.maxPreShiftOvertimeHours < 0) {
      errors['maxPreShiftOvertimeHours'] = this.t('settings.overtime.validation.maxHoursPositive');
    }
    if (this.configForm.maxPostShiftOvertimeHours < 0) {
      errors['maxPostShiftOvertimeHours'] = this.t('settings.overtime.validation.maxHoursPositive');
    }

    // Validate effective dates
    if (this.configForm.effectiveToDate && this.configForm.effectiveFromDate) {
      const fromDate = new Date(this.configForm.effectiveFromDate);
      const toDate = new Date(this.configForm.effectiveToDate);
      if (toDate <= fromDate) {
        errors['effectiveToDate'] = this.t('settings.overtime.validation.effectiveToAfterFrom');
      }
    }

    // Check if at least one overtime type is enabled
    if (!this.configForm.enablePreShiftOvertime && !this.configForm.enablePostShiftOvertime) {
      errors['general'] = this.t('settings.overtime.validation.atLeastOneOvertimeType');
    }

    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  hasError(field: string): boolean {
    return !!this.validationErrors()[field];
  }

  getError(field: string): string {
    return this.validationErrors()[field] || '';
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.error.set(this.t('settings.overtime.validation.pleaseFix'));
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    const request: UpdateOvertimeConfigurationRequest = {
      enablePreShiftOvertime: this.configForm.enablePreShiftOvertime,
      enablePostShiftOvertime: this.configForm.enablePostShiftOvertime,
      normalDayRate: this.configForm.normalDayRate,
      publicHolidayRate: this.configForm.publicHolidayRate,
      offDayRate: this.configForm.offDayRate,
      minimumOvertimeMinutes: this.configForm.minimumOvertimeMinutes,
      considerFlexibleTime: this.configForm.considerFlexibleTime,
      maxPreShiftOvertimeHours: this.configForm.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: this.configForm.maxPostShiftOvertimeHours,
      requireApproval: this.configForm.requireApproval,
      overtimeGracePeriodMinutes: this.configForm.overtimeGracePeriodMinutes,
      weekendAsOffDay: this.configForm.weekendAsOffDay,
      roundingIntervalMinutes: this.configForm.roundingIntervalMinutes,
      policyNotes: this.configForm.policyNotes.trim(),
      effectiveFromDate: this.configForm.effectiveFromDate,
      effectiveToDate: this.configForm.effectiveToDate || undefined
    };

    this.overtimeService.updateOvertimeConfiguration(this.configurationId, request).subscribe({
      next: () => {
        this.notificationService.success(
          this.t('app.success'),
          this.t('settings.overtime.policyUpdatedSuccessfully')
        );
        this.router.navigate(['/settings/overtime']);
      },
      error: (error) => {
        console.error('Failed to update overtime configuration:', error);
        this.submitting.set(false);

        if (error.status === 400 && error.error?.errors) {
          // Handle validation errors from server
          this.validationErrors.set(error.error.errors);
          this.error.set(this.t('settings.overtime.validation.serverErrors'));
        } else if (error.status === 404) {
          this.error.set(this.t('settings.overtime.errors.configurationNotFound'));
          this.notificationService.error(
            this.t('app.error'),
            this.t('settings.overtime.errors.configurationNotFound')
          );
        } else {
          this.error.set(this.t('errors.server'));
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      }
    });
  }

  async onCancel(): Promise<void> {
    // Check if form has been modified
    const hasChanges = this.hasFormChanges();

    if (hasChanges) {
      const result = await this.confirmationService.confirm({
        title: this.t('common.unsavedChanges'),
        message: this.t('common.unsavedChangesMessage'),
        confirmText: this.t('common.discard'),
        cancelText: this.t('common.stay'),
        confirmButtonClass: 'btn-warning',
        icon: 'fa-exclamation-triangle',
        iconClass: 'text-warning'
      });

      if (!result.confirmed) {
        return;
      }
    }

    this.router.navigate(['/settings/overtime']);
  }

  private hasFormChanges(): boolean {
    if (!this.originalConfig) {
      return false;
    }

    // Compare current form with original data
    const original = {
      enablePreShiftOvertime: this.originalConfig.enablePreShiftOvertime,
      enablePostShiftOvertime: this.originalConfig.enablePostShiftOvertime,
      normalDayRate: this.originalConfig.normalDayRate,
      publicHolidayRate: this.originalConfig.publicHolidayRate,
      offDayRate: this.originalConfig.offDayRate,
      minimumOvertimeMinutes: this.originalConfig.minimumOvertimeMinutes,
      considerFlexibleTime: this.originalConfig.considerFlexibleTime,
      maxPreShiftOvertimeHours: this.originalConfig.maxPreShiftOvertimeHours,
      maxPostShiftOvertimeHours: this.originalConfig.maxPostShiftOvertimeHours,
      requireApproval: this.originalConfig.requireApproval,
      overtimeGracePeriodMinutes: this.originalConfig.overtimeGracePeriodMinutes,
      weekendAsOffDay: this.originalConfig.weekendAsOffDay,
      roundingIntervalMinutes: this.originalConfig.roundingIntervalMinutes,
      policyNotes: this.originalConfig.policyNotes || '',
      effectiveFromDate: this.originalConfig.effectiveFromDate.split('T')[0],
      effectiveToDate: this.originalConfig.effectiveToDate ? this.originalConfig.effectiveToDate.split('T')[0] : ''
    };

    return JSON.stringify(this.configForm) !== JSON.stringify(original);
  }

  onReset(): void {
    if (this.originalConfig) {
      this.populateForm(this.originalConfig);
      this.validationErrors.set({});
      this.error.set(null);
    }
  }

  // Helper method to check if input is valid
  isFieldInvalid(field: string): boolean {
    return this.hasError(field);
  }

  // Helper method to get input classes
  getFieldClasses(field: string): string {
    const baseClasses = 'form-control';
    return this.isFieldInvalid(field)
      ? `${baseClasses} is-invalid`
      : baseClasses;
  }

  // Helper method to check if configuration is active (for UI warnings)
  isConfigurationActive(): boolean {
    return this.originalConfig?.isActive || false;
  }
}