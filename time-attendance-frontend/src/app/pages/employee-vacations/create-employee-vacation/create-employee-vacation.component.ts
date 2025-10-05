import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { CreateEmployeeVacationRequest } from '../../../shared/models/employee-vacation.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-employee-vacation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SearchableSelectComponent,
    FormHeaderComponent,
    FormSectionComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-employee-vacation.component.html',
  styleUrls: ['./create-employee-vacation.component.css']
})
export class CreateEmployeeVacationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private employeeVacationsService = inject(EmployeeVacationsService);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  saving = signal(false);

  // Form
  vacationForm: FormGroup;

  // Available options
  employees = signal<Array<{id: number, name: string}>>([]);
  vacationTypes = signal<Array<{id: number, name: string}>>([]);

  // Computed properties for searchable select options
  get employeeOptions(): SearchableSelectOption[] {
    return this.employees().map(employee => ({
      value: employee.id,
      label: employee.name
    }));
  }

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
    this.loadEmployees();
    this.loadVacationTypes();
  }

  /**
   * Create reactive form
   */
  private createForm(): FormGroup {
    return this.fb.group({
      employeeId: [null, [Validators.required]],
      vacationTypeId: [null, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      notes: ['']
    });
  }

  /**
   * Load employees for dropdown
   */
  private loadEmployees(): void {
    this.loading.set(true);
    this.employeeVacationsService.getEmployees().subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load employees:', error);
        this.notificationService.error(this.i18n.t('employee_vacations.errors.load_employees_failed'));
        this.loading.set(false);
      }
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
   * Handle form submission
   */
  onSubmit(): void {
    if (this.vacationForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.vacationForm.value;

    const request: CreateEmployeeVacationRequest = {
      employeeId: formValue.employeeId,
      vacationTypeId: formValue.vacationTypeId,
      startDate: new Date(formValue.startDate),
      endDate: new Date(formValue.endDate),
      notes: formValue.notes || undefined
    };

    this.employeeVacationsService.createVacation(request).subscribe({
      next: () => {
        this.saving.set(false);
        this.notificationService.success(this.i18n.t('employee_vacations.success.created'));
        this.router.navigate(['/employee-vacations']);
      },
      error: (error) => {
        this.saving.set(false);
        console.error('Failed to create vacation:', error);
        this.notificationService.error(this.i18n.t('employee_vacations.errors.create_failed'));
      }
    });
  }

  /**
   * Cancel and navigate back
   */
  onCancel(): void {
    this.router.navigate(['/employee-vacations']);
  }

  /**
   * Reset form
   */
  onReset(): void {
    this.vacationForm.reset();
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
   * Get form mode for FormHeaderComponent
   */
  getFormMode(): 'create' | 'edit' {
    return 'create';
  }

  /**
   * Get vacation ID for FormHeaderComponent
   */
  getVacationId(): number | undefined {
    return undefined;
  }
}