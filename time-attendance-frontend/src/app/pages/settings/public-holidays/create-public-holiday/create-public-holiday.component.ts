import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { PublicHolidaysService } from '../public-holidays.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { HolidayType, CreatePublicHolidayRequest } from '../../../../shared/models/public-holiday.model';

@Component({
  selector: 'app-create-public-holiday',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-public-holiday.component.html',
  styleUrls: ['./create-public-holiday.component.css']
})
export class CreatePublicHolidayComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private publicHolidaysService = inject(PublicHolidaysService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  // Holiday type reference for template
  readonly HolidayType = HolidayType;

  // Signals for state management
  loading = signal(false);
  submitting = signal(false);
  selectedHolidayType = signal<HolidayType>(HolidayType.Annual);

  // Form
  holidayForm!: FormGroup;

  // Available options
  holidayTypes = computed(() => this.publicHolidaysService.getHolidayTypes());

  // Field visibility computed signals
  showSpecificDateField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.OneTime;
  });

  showMonthField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Annual || type === HolidayType.Floating;
  });

  showDayField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Annual || type === HolidayType.Monthly;
  });

  showWeekOfMonthField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Floating;
  });

  showDayOfWeekField = computed(() => {
    const type = Number(this.selectedHolidayType());
    return type === HolidayType.Floating;
  });

  ngOnInit(): void {
    this.initializeForm();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  initializeForm(): void {
    this.holidayForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      nameAr: ['', [Validators.maxLength(200)]],
      holidayType: [HolidayType.Annual, [Validators.required]],
      specificDate: [''],
      month: [''],
      day: [''],
      weekOfMonth: [''],
      dayOfWeek: [''],
      isActive: [true],
      isNational: [true],
      branchId: [''],
      description: ['', [Validators.maxLength(1000)]],
      effectiveFromYear: [''],
      effectiveToYear: [''],
      countryCode: ['', [Validators.maxLength(10)]],
      priority: [50, [Validators.min(1), Validators.max(100)]]
    });

    // Watch holiday type changes to update validation and signal
    this.holidayForm.get('holidayType')?.valueChanges.subscribe(type => {
      const numericType = Number(type);
      this.selectedHolidayType.set(numericType);
      this.updateValidationBasedOnType(numericType);
    });

    // Initialize validation for default type and signal
    this.selectedHolidayType.set(HolidayType.Annual);
    this.updateValidationBasedOnType(HolidayType.Annual);
  }

  updateValidationBasedOnType(type: HolidayType): void {
    const specificDateControl = this.holidayForm.get('specificDate');
    const monthControl = this.holidayForm.get('month');
    const dayControl = this.holidayForm.get('day');
    const weekOfMonthControl = this.holidayForm.get('weekOfMonth');
    const dayOfWeekControl = this.holidayForm.get('dayOfWeek');

    // Clear all validators first
    specificDateControl?.clearValidators();
    monthControl?.clearValidators();
    dayControl?.clearValidators();
    weekOfMonthControl?.clearValidators();
    dayOfWeekControl?.clearValidators();

    // Clear values
    specificDateControl?.setValue('');
    monthControl?.setValue('');
    dayControl?.setValue('');
    weekOfMonthControl?.setValue('');
    dayOfWeekControl?.setValue('');

    switch (type) {
      case HolidayType.OneTime:
        specificDateControl?.setValidators([Validators.required]);
        break;

      case HolidayType.Annual:
        monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
        dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
        break;

      case HolidayType.Monthly:
        dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
        break;

      case HolidayType.Floating:
        monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
        weekOfMonthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(5)]);
        dayOfWeekControl?.setValidators([Validators.required, Validators.min(0), Validators.max(6)]);
        break;
    }

    // Update validity
    specificDateControl?.updateValueAndValidity();
    monthControl?.updateValueAndValidity();
    dayControl?.updateValueAndValidity();
    weekOfMonthControl?.updateValueAndValidity();
    dayOfWeekControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.holidayForm.valid) {
      const formValue = this.holidayForm.value;

      // Validate holiday data
      const validationErrors = this.publicHolidaysService.validateHolidayData(formValue);
      if (validationErrors.length > 0) {
        validationErrors.forEach(error => {
          this.notificationService.error(this.t('app.error'), error);
        });
        return;
      }

      const request: CreatePublicHolidayRequest = {
        name: formValue.name,
        nameAr: formValue.nameAr || undefined,
        holidayType: formValue.holidayType,
        specificDate: formValue.specificDate || undefined,
        month: formValue.month || undefined,
        day: formValue.day || undefined,
        weekOfMonth: formValue.weekOfMonth || undefined,
        dayOfWeek: formValue.dayOfWeek || undefined,
        isActive: formValue.isActive,
        isNational: formValue.isNational,
        branchId: formValue.branchId || undefined,
        description: formValue.description || undefined,
        effectiveFromYear: formValue.effectiveFromYear || undefined,
        effectiveToYear: formValue.effectiveToYear || undefined,
        countryCode: formValue.countryCode || undefined,
        priority: formValue.priority || 50
      };

      this.submitting.set(true);

      this.publicHolidaysService.createPublicHoliday(request).subscribe({
        next: () => {
          this.submitting.set(false);
          this.notificationService.success(
            this.t('app.success'),
            this.t('settings.holidays.holidayCreatedSuccessfully')
          );
          this.router.navigate(['/settings/public-holidays']);
        },
        error: (error) => {
          console.error('Failed to create holiday:', error);
          this.submitting.set(false);
          this.notificationService.error(
            this.t('app.error'),
            this.t('errors.server')
          );
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/settings/public-holidays']);
  }

  markFormGroupTouched(): void {
    Object.keys(this.holidayForm.controls).forEach(key => {
      const control = this.holidayForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.holidayForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.holidayForm.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return this.t('validation.required');
      }
      if (field.errors['maxlength']) {
        return this.t('validation.maxLength');
      }
      if (field.errors['min']) {
        return this.t('validation.min');
      }
      if (field.errors['max']) {
        return this.t('validation.max');
      }
    }
    return '';
  }

  getHolidayTypeDescription(): string {
    const selectedValue = this.holidayForm.get('holidayType')?.value;
    const selectedType = this.holidayTypes().find(t => t.value === selectedValue);
    return selectedType?.description || '';
  }

  // Helper methods for template
  getMonthOptions(): { value: number; label: string }[] {
    const months = [];
    for (let i = 1; i <= 12; i++) {
      const date = new Date(2024, i - 1, 1);
      months.push({
        value: i,
        label: date.toLocaleDateString(this.i18n.getCurrentLocale(), { month: 'long' })
      });
    }
    return months;
  }

  getDayOptions(): number[] {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return days;
  }

  getWeekOfMonthOptions(): { value: number; label: string }[] {
    return [
      { value: 1, label: this.t('settings.holidays.firstWeek') },
      { value: 2, label: this.t('settings.holidays.secondWeek') },
      { value: 3, label: this.t('settings.holidays.thirdWeek') },
      { value: 4, label: this.t('settings.holidays.fourthWeek') },
      { value: 5, label: this.t('settings.holidays.lastWeek') }
    ];
  }

  getDayOfWeekOptions(): { value: number; label: string }[] {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, 7 + i); // Start from Sunday
      daysOfWeek.push({
        value: i,
        label: date.toLocaleDateString(this.i18n.getCurrentLocale(), { weekday: 'long' })
      });
    }
    return daysOfWeek;
  }

  getYearOptions(): number[] {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  }

  shouldShowField(fieldName: string): boolean {
    const holidayType = this.selectedHolidayType();

    switch (fieldName) {
      case 'specificDate':
        return holidayType === HolidayType.OneTime;

      case 'month':
        return holidayType === HolidayType.Annual || holidayType === HolidayType.Floating;

      case 'day':
        return holidayType === HolidayType.Annual || holidayType === HolidayType.Monthly;

      case 'weekOfMonth':
      case 'dayOfWeek':
        return holidayType === HolidayType.Floating;

      default:
        return true;
    }
  }
}