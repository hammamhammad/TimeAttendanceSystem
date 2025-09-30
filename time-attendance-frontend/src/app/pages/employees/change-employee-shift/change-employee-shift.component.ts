import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeesService } from '../employees.service';
import { ShiftsService } from '../../../core/services/shifts.service';
import { EmployeeDto } from '../../../shared/models/employee.model';
import { Shift } from '../../../shared/models/shift.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-change-employee-shift',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    FormSectionComponent
  ],
  templateUrl: './change-employee-shift.component.html',
  styleUrls: ['./change-employee-shift.component.css']
})
export class ChangeEmployeeShiftComponent implements OnInit {
  public i18n = inject(I18nService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private employeesService = inject(EmployeesService);
  private shiftsService = inject(ShiftsService);
  private notificationService = inject(NotificationService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  employee = signal<EmployeeDto | null>(null);
  availableShifts = signal<Shift[]>([]);
  error = signal<string | null>(null);

  changeShiftForm: FormGroup;

  constructor() {
    // Set effective date to tomorrow to meet validation requirement
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.changeShiftForm = this.fb.group({
      shiftId: ['', Validators.required],
      effectiveDate: [tomorrow.toISOString().split('T')[0], this.futureDateValidator()],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  private loadEmployeeDetails(): void {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if (!employeeId) {
      this.router.navigate(['/employees']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.employeesService.getEmployeeById(+employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        this.loadShifts();
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load employee details:', error);
        this.error.set(this.i18n.t('employees.errors.load_failed'));
        this.loading.set(false);
      }
    });
  }

  private loadShifts(): void {
    this.shiftsService.getActiveShifts().subscribe({
      next: (response) => {
        // Filter out the current shift if employee has one
        let shifts = response.items;
        const currentEmployee = this.employee();
        if (currentEmployee?.currentShiftId) {
          shifts = shifts.filter(shift => shift.id !== currentEmployee.currentShiftId);
        }
        this.availableShifts.set(shifts);
      },
      error: (error) => {
        console.error('Failed to load shifts:', error);
        this.notificationService.error(this.i18n.t('shifts.errors.load_failed'));
      }
    });
  }

  private futureDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(control.value);
      selectedDate.setHours(0, 0, 0, 0);

      return selectedDate > today ? null : { futureDate: true };
    };
  }

  onSubmit(): void {
    if (this.changeShiftForm.invalid || !this.employee()) {
      this.changeShiftForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set(null);

    const formValue = this.changeShiftForm.value;
    const currentEmployee = this.employee()!;

    const shiftData = {
      employeeId: currentEmployee.id,
      shiftId: +formValue.shiftId,
      effectiveDate: formValue.effectiveDate,
      notes: formValue.notes || undefined
    };

    this.employeesService.changeEmployeeShift(shiftData).subscribe({
      next: () => {
        this.notificationService.success(
          this.i18n.t('employees.success.shift_changed')
        );
        this.router.navigate(['/employees']);
      },
      error: (error: any) => {
        console.error('Failed to change employee shift:', error);
        this.error.set(this.i18n.t('employees.errors.shift_change_failed'));
        this.saving.set(false);
      }
    });
  }

  onReset(): void {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.changeShiftForm.reset({
      shiftId: '',
      effectiveDate: tomorrow.toISOString().split('T')[0],
      notes: ''
    });

    this.error.set(null);
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }

  // Helper methods
  getEmployeeInitials(): string {
    const emp = this.employee();
    if (!emp) return '';
    const first = emp.firstName ? emp.firstName.charAt(0).toUpperCase() : '';
    const last = emp.lastName ? emp.lastName.charAt(0).toUpperCase() : '';
    return first + last;
  }

  getCurrentShiftDisplay(): string {
    const emp = this.employee();
    if (!emp?.currentShiftName) {
      return this.i18n.t('employees.no_current_shift');
    }

    if (emp.currentShift?.startTime && emp.currentShift?.endTime) {
      return `${emp.currentShift.startTime} - ${emp.currentShift.endTime}`;
    }

    return emp.currentShiftName;
  }

  getShiftTimeDisplay(shift: any): string {
    if (shift.shiftPeriods && shift.shiftPeriods.length > 0) {
      const firstPeriod = shift.shiftPeriods[0];
      const lastPeriod = shift.shiftPeriods[shift.shiftPeriods.length - 1];
      return `${firstPeriod.startTime} - ${lastPeriod.endTime}`;
    }
    return this.i18n.t('shifts.time_not_specified');
  }

  // Form validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.changeShiftForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  hasError(fieldName: string): boolean {
    return this.isFieldInvalid(fieldName);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.changeShiftForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) {
      return this.i18n.t('validation.required');
    }

    if (field.errors['futureDate']) {
      return this.i18n.t('employees.validation.future_date_required');
    }

    return '';
  }
}