import { Component, OnInit, signal, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { OvertimeConfigurationsService, CreateOvertimeConfigurationRequest } from '../overtime-configurations.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-create-overtime-configuration',
  standalone: true,
  imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './create-overtime-configuration.component.html',
  styleUrls: ['./create-overtime-configuration.component.css']
})
export class CreateOvertimeConfigurationComponent implements OnInit {
  private overtimeService = inject(OvertimeConfigurationsService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  error = signal<string | null>(null);

  // Form state with default values
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
    // Component initialization
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
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

    const request: CreateOvertimeConfigurationRequest = {
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

    this.overtimeService.createOvertimeConfiguration(request).subscribe({
      next: () => {
        this.notificationService.success(
          this.t('app.success'),
          this.t('settings.overtime.policyCreatedSuccessfully')
        );
        this.router.navigate(['/settings/overtime']);
      },
      error: (error) => {
        console.error('Failed to create overtime configuration:', error);
        this.submitting.set(false);

        if (error.status === 400 && error.error?.errors) {
          // Handle validation errors from server
          this.validationErrors.set(error.error.errors);
          this.error.set(this.t('settings.overtime.validation.serverErrors'));
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
    // Check if any form values have changed from defaults
    const defaults = {
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

    return JSON.stringify(this.configForm) !== JSON.stringify(defaults);
  }

  onReset(): void {
    this.configForm = {
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
    this.validationErrors.set({});
    this.error.set(null);
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
}