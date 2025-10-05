import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { EmployeeVacation, UpdateEmployeeVacationRequest } from '../../../shared/models/employee-vacation.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-edit-employee-vacation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchableSelectComponent,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent
  ],
  templateUrl: './edit-employee-vacation.component.html',
  styleUrls: ['./edit-employee-vacation.component.css']
})
export class EditEmployeeVacationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private employeeVacationsService = inject(EmployeeVacationsService);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  saving = signal(false);
  currentVacation = signal<EmployeeVacation | null>(null);
  vacationId: number | null = null;

  // Form
  vacationForm: FormGroup;

  // Available options
  vacationTypes = signal<Array<{id: number, name: string}>>([]);

  // Computed properties for searchable select options
  get vacationTypeOptions(): SearchableSelectOption[] {
    return this.vacationTypes().map(vacationType => ({
      value: vacationType.id,
      label: vacationType.name
    }));
  }

  constructor() {
    this.vacationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadVacationTypes();
    this.loadVacation();
  }

  /**
   * Create reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      vacationTypeId: [null, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      isApproved: [false],
      notes: ['']
    });
  }

  /**
   * Load vacation types for dropdown
   */
  private loadVacationTypes(): void {
    this.employeeVacationsService.getVacationTypes().subscribe({
      next: (vacationTypes) => {
        this.vacationTypes.set(vacationTypes);
      },
      error: (error) => {
        console.error('Failed to load vacation types:', error);
        this.notificationService.error(this.i18n.t('employee_vacations.errors.load_vacation_types_failed'));
      }
    });
  }

  /**
   * Load vacation for editing
   */
  private loadVacation(): void {
    const vacationIdParam = this.route.snapshot.paramMap.get('id');
    if (!vacationIdParam) {
      this.router.navigate(['/employee-vacations']);
      return;
    }

    this.vacationId = +vacationIdParam;
    this.loading.set(true);

    this.employeeVacationsService.getVacationById(this.vacationId).subscribe({
      next: (vacation) => {
        this.currentVacation.set(vacation);
        this.populateForm(vacation);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load vacation:', error);
        this.notificationService.error(this.i18n.t('employee_vacations.errors.load_failed'));
        this.loading.set(false);
        this.router.navigate(['/employee-vacations']);
      }
    });
  }

  /**
   * Populate form with vacation data
   */
  private populateForm(vacation: EmployeeVacation): void {
    this.vacationForm.patchValue({
      vacationTypeId: vacation.vacationTypeId,
      startDate: this.formatDateForInput(vacation.startDate),
      endDate: this.formatDateForInput(vacation.endDate),
      isApproved: vacation.isApproved,
      notes: vacation.notes || ''
    });
  }

  /**
   * Format date for HTML input
   */
  private formatDateForInput(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.vacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const vacation = this.currentVacation();
    if (!vacation) return;

    this.saving.set(true);
    const formValue = this.vacationForm.value;

    const request: UpdateEmployeeVacationRequest = {
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      isApproved: formValue.isApproved,
      notes: formValue.notes || undefined
    };

    this.employeeVacationsService.updateVacation(vacation.id, request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('employee_vacations.success.updated'));
        this.router.navigate(['/employee-vacations', vacation.id, 'view']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to update vacation:', error);
        this.notificationService.error(this.i18n.t('employee_vacations.errors.update_failed'));
      }
    });
  }

  /**
   * Cancel and navigate back
   */
  onCancel(): void {
    const vacation = this.currentVacation();
    if (vacation) {
      this.router.navigate(['/employee-vacations', vacation.id, 'view']);
    } else {
      this.router.navigate(['/employee-vacations']);
    }
  }

  /**
   * Reset form to original values
   */
  onReset(): void {
    const vacation = this.currentVacation();
    if (vacation) {
      this.populateForm(vacation);
    }
  }

  /**
   * Mark all form fields as touched
   */
  private markFormGroupTouched(): void {
    Object.keys(this.vacationForm.controls).forEach(key => {
      const control = this.vacationForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string): boolean {
    const field = this.vacationForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.vacationForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.i18n.t('validation.required');
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
   * Get employee name for display
   */
  getEmployeeName(): string {
    return this.currentVacation()?.employeeName || '';
  }

  /**
   * Get form mode for FormHeaderComponent
   */
  getFormMode(): 'create' | 'edit' {
    return 'edit';
  }

  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId(): number | undefined {
    return this.vacationId || undefined;
  }
}