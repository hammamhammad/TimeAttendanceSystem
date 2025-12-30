import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';

import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeVacationsService } from '../employee-vacations.service';
import { CreateEmployeeVacationRequest } from '../../../shared/models/employee-vacation.model';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { LeaveBalanceService } from '../../settings/leave-balances/leave-balance.service';
import { VacationTypeBalance } from '../../../shared/models/leave-balance.model';

@Component({
  selector: 'app-create-employee-vacation',
  standalone: true,
  imports: [
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
export class CreateEmployeeVacationComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private employeeVacationsService = inject(EmployeeVacationsService);
  private leaveBalanceService = inject(LeaveBalanceService);
  public i18n = inject(I18nService);

  // Destroy subject for unsubscribing
  private destroy$ = new Subject<void>();

  // State
  loading = signal(false);
  saving = signal(false);
  loadingBalance = signal(false);

  // Form
  vacationForm: FormGroup;

  // Available options
  employees = signal<Array<{id: number, name: string}>>([]);
  vacationTypes = signal<Array<{id: number, name: string}>>([]);

  // Leave balance for selected employee/vacation type
  currentBalance = signal<VacationTypeBalance | null>(null);
  currentYear = new Date().getFullYear();

  // Computed: Check if balance is available
  hasBalance = computed(() => this.currentBalance() !== null);

  // Computed: Check if requested days exceed balance
  requestedDays = signal<number>(0);
  exceedsBalance = computed(() => {
    const balance = this.currentBalance();
    const days = this.requestedDays();
    if (!balance || days <= 0) return false;
    return days > balance.currentBalance;
  });

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
    this.setupFormWatchers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Setup form value change watchers to fetch balance
   */
  private setupFormWatchers(): void {
    // Watch for employee and vacation type changes
    this.vacationForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged((prev, curr) =>
          prev.employeeId === curr.employeeId &&
          prev.vacationTypeId === curr.vacationTypeId &&
          prev.startDate === curr.startDate &&
          prev.endDate === curr.endDate
        )
      )
      .subscribe(value => {
        // Update requested days calculation
        if (value.startDate && value.endDate) {
          const days = this.calculateDays(value.startDate, value.endDate);
          this.requestedDays.set(days);
        } else {
          this.requestedDays.set(0);
        }

        // Fetch balance if both employee and vacation type are selected
        if (value.employeeId && value.vacationTypeId) {
          this.fetchLeaveBalance(value.employeeId, value.vacationTypeId);
        } else {
          this.currentBalance.set(null);
        }
      });
  }

  /**
   * Calculate the number of days between two dates
   */
  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    return diffDays > 0 ? diffDays : 0;
  }

  /**
   * Fetch leave balance for selected employee and vacation type
   */
  private fetchLeaveBalance(employeeId: number, vacationTypeId: number): void {
    this.loadingBalance.set(true);
    this.leaveBalanceService.getLeaveBalanceSummary(employeeId, this.currentYear)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (summary) => {
          // Find the balance for the selected vacation type
          const typeBalance = summary.vacationTypeBalances.find(
            vtb => vtb.vacationTypeId === vacationTypeId
          );
          this.currentBalance.set(typeBalance || null);
          this.loadingBalance.set(false);
        },
        error: () => {
          this.currentBalance.set(null);
          this.loadingBalance.set(false);
        }
      });
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