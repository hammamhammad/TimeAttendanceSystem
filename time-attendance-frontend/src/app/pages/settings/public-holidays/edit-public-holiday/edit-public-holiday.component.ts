import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PublicHolidaysService } from '../public-holidays.service';
import { PublicHoliday, UpdatePublicHolidayRequest, HolidayType } from '../../../../shared/models/public-holiday.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-edit-public-holiday',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchableSelectComponent,
    FormHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './edit-public-holiday.component.html',
  styleUrls: ['./edit-public-holiday.component.css']
})
export class EditPublicHolidayComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private publicHolidaysService = inject(PublicHolidaysService);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  saving = signal(false);
  currentHoliday = signal<PublicHoliday | null>(null);
  holidayId: number | null = null;

  // Form
  holidayForm: FormGroup;

  // Available options
  branches = signal<Array<{id: number, name: string}>>([]);

  // Form field signals for reactive behavior
  selectedHolidayType = signal<number>(HolidayType.Annual);

  // Holiday types enum access
  HolidayType = HolidayType;

  // Computed properties
  get isFloatingHoliday() {
    return computed(() => {
      const type = Number(this.selectedHolidayType());
      return type === HolidayType.Floating;
    });
  }

  get holidayTypeOptions(): SearchableSelectOption[] {
    return this.publicHolidaysService.getHolidayTypes().map(type => ({
      value: type.value,
      label: type.label,
      description: type.description
    }));
  }

  get branchOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: null, label: this.i18n.t('public_holidays.national_holiday') }
    ];
    return options.concat(
      this.branches().map(branch => ({
        value: branch.id,
        label: branch.name
      }))
    );
  }

  constructor() {
    this.holidayForm = this.createForm();

    // Subscribe to holiday type changes
    this.holidayForm.get('holidayType')?.valueChanges.subscribe(value => {
      this.selectedHolidayType.set(Number(value));
      this.updateFormValidation();
    });
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadHoliday();
  }

  /**
   * Create reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
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
      branchId: [null],
      description: ['', [Validators.maxLength(1000)]],
      effectiveFromYear: [''],
      effectiveToYear: [''],
      countryCode: ['', [Validators.maxLength(10)]],
      priority: [50, [Validators.min(1), Validators.max(100)]]
    });
  }

  /**
   * Load branches for dropdown
   */
  private loadBranches(): void {
    this.publicHolidaysService.getBranches().subscribe({
      next: (branches) => {
        this.branches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.notificationService.error(this.i18n.t('public_holidays.errors.load_branches_failed'));
      }
    });
  }

  /**
   * Load holiday for editing
   */
  private loadHoliday(): void {
    const holidayIdParam = this.route.snapshot.paramMap.get('id');
    if (!holidayIdParam) {
      this.router.navigate(['/settings/public-holidays']);
      return;
    }

    this.holidayId = +holidayIdParam;
    this.loading.set(true);

    this.publicHolidaysService.getPublicHolidayById(this.holidayId, false).subscribe({
      next: (holiday) => {
        this.currentHoliday.set(holiday);
        this.populateForm(holiday);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load holiday:', error);
        this.notificationService.error(this.i18n.t('public_holidays.errors.load_failed'));
        this.loading.set(false);
        this.router.navigate(['/settings/public-holidays']);
      }
    });
  }

  /**
   * Populate form with holiday data
   */
  private populateForm(holiday: PublicHoliday): void {
    // Set holiday type first to ensure proper form validation
    this.selectedHolidayType.set(holiday.holidayType);

    this.holidayForm.patchValue({
      name: holiday.name,
      nameAr: holiday.nameAr || '',
      holidayType: holiday.holidayType,
      isActive: holiday.isActive,
      isNational: holiday.isNational,
      branchId: holiday.branchId,
      description: holiday.description || '',
      effectiveFromYear: holiday.effectiveFromYear || '',
      effectiveToYear: holiday.effectiveToYear || '',
      countryCode: holiday.countryCode || '',
      priority: holiday.priority
    });

    // Update form validation after populating values
    this.updateFormValidation();
  }

  /**
   * Update form validation based on holiday type
   */
  private updateFormValidation(): void {
    const holidayType = Number(this.holidayForm.get('holidayType')?.value);
    const specificDateControl = this.holidayForm.get('specificDate');
    const monthControl = this.holidayForm.get('month');
    const dayControl = this.holidayForm.get('day');
    const weekOfMonthControl = this.holidayForm.get('weekOfMonth');
    const dayOfWeekControl = this.holidayForm.get('dayOfWeek');

    // Clear existing validators
    specificDateControl?.clearValidators();
    monthControl?.clearValidators();
    dayControl?.clearValidators();
    weekOfMonthControl?.clearValidators();
    dayOfWeekControl?.clearValidators();

    if (holidayType === HolidayType.OneTime) {
      specificDateControl?.setValidators([Validators.required]);
    } else if (holidayType === HolidayType.Annual) {
      monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    } else if (holidayType === HolidayType.Monthly) {
      dayControl?.setValidators([Validators.required, Validators.min(1), Validators.max(31)]);
    } else if (holidayType === HolidayType.Floating) {
      monthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(12)]);
      weekOfMonthControl?.setValidators([Validators.required, Validators.min(1), Validators.max(5)]);
      dayOfWeekControl?.setValidators([Validators.required, Validators.min(0), Validators.max(6)]);
    }

    // Update form controls
    specificDateControl?.updateValueAndValidity();
    monthControl?.updateValueAndValidity();
    dayControl?.updateValueAndValidity();
    weekOfMonthControl?.updateValueAndValidity();
    dayOfWeekControl?.updateValueAndValidity();
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.holidayForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const holiday = this.currentHoliday();
    if (!holiday) return;

    this.saving.set(true);
    const formValue = this.holidayForm.value;

    const request: UpdatePublicHolidayRequest = {
      name: formValue.name,
      nameAr: formValue.nameAr || undefined,
      holidayType: Number(formValue.holidayType),
      specificDate: formValue.specificDate || undefined,
      month: formValue.month ? Number(formValue.month) : undefined,
      day: formValue.day ? Number(formValue.day) : undefined,
      weekOfMonth: formValue.weekOfMonth ? Number(formValue.weekOfMonth) : undefined,
      dayOfWeek: formValue.dayOfWeek ? Number(formValue.dayOfWeek) : undefined,
      isActive: formValue.isActive,
      isNational: formValue.isNational,
      branchId: formValue.branchId || undefined,
      description: formValue.description || undefined,
      effectiveFromYear: formValue.effectiveFromYear ? Number(formValue.effectiveFromYear) : undefined,
      effectiveToYear: formValue.effectiveToYear ? Number(formValue.effectiveToYear) : undefined,
      countryCode: formValue.countryCode || undefined,
      priority: Number(formValue.priority)
    };

    this.publicHolidaysService.updatePublicHoliday(holiday.id, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('public_holidays.success.updated'));
        this.router.navigate(['/settings/public-holidays', holiday.id, 'view']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to update holiday:', error);
        this.notificationService.error(this.i18n.t('public_holidays.errors.update_failed'));
      }
    });
  }

  /**
   * Cancel and navigate back
   */
  onCancel(): void {
    const holiday = this.currentHoliday();
    if (holiday) {
      this.router.navigate(['/settings/public-holidays', holiday.id, 'view']);
    } else {
      this.router.navigate(['/settings/public-holidays']);
    }
  }

  /**
   * Reset form to original values
   */
  onReset(): void {
    const holiday = this.currentHoliday();
    if (holiday) {
      this.populateForm(holiday);
    }
  }

  /**
   * Mark all form fields as touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.holidayForm.controls).forEach(key => {
      const control = this.holidayForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string): boolean {
    const field = this.holidayForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.holidayForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.i18n.t('validation.required');
    }

    if (field.errors['maxlength']) {
      return this.i18n.t('validation.max_length') + ' ' + field.errors['maxlength'].requiredLength;
    }

    if (field.errors['min']) {
      return this.i18n.t('validation.min_value') + ' ' + field.errors['min'].min;
    }

    if (field.errors['max']) {
      return this.i18n.t('validation.max_value') + ' ' + field.errors['max'].max;
    }

    return '';
  }

  /**
   * Check if field is invalid for styling
   */
  isFieldInvalid(fieldName: string): boolean {
    return this.hasError(fieldName);
  }

  /**
   * Get holiday name for display
   */
  getHolidayName(): string {
    return this.currentHoliday()?.name || '';
  }
}