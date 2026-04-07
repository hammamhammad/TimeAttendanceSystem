import { Component, OnInit, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AllowanceService } from '../../../core/services/allowance.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import {
  AllowanceCalculationType,
  CreateAllowanceAssignmentRequest
} from '../../../shared/models/allowance.model';

@Component({
  selector: 'app-assign-allowance',
  standalone: true,
  imports: [FormsModule, RouterModule, FormHeaderComponent, FormSectionComponent],
  templateUrl: './assign-allowance.component.html',
  styleUrls: ['./assign-allowance.component.css']
})
export class AssignAllowanceComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  submitting = signal(false);
  employees = signal<{ id: number; name: string; employeeNumber: string }[]>([]);
  allowanceTypes = signal<any[]>([]);

  calculationTypes = Object.values(AllowanceCalculationType);
  currencies = ['SAR', 'USD', 'EUR', 'GBP', 'AED'];

  form = {
    employeeId: null as number | null,
    allowanceTypeId: null as number | null,
    amount: null as number | null,
    calculationType: AllowanceCalculationType.Fixed as string,
    percentage: null as number | null,
    currency: 'SAR',
    effectiveFromDate: '',
    effectiveToDate: '',
    reason: '',
    notes: ''
  };

  validationErrors = signal<{ [key: string]: string }>({});

  ngOnInit(): void {
    this.loadEmployees();
    this.loadAllowanceTypes();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadEmployees(): void {
    this.employeeService.getDropdown().subscribe({
      next: (data) => this.employees.set(data),
      error: (error) => console.error('Failed to load employees:', error)
    });
  }

  loadAllowanceTypes(): void {
    this.allowanceService.getAllowanceTypeDropdown().subscribe({
      next: (data) => this.allowanceTypes.set(data),
      error: (error) => console.error('Failed to load allowance types:', error)
    });
  }

  getCalcTypeLabel(calcType: string): string {
    if (calcType === 'Fixed') return this.t('allowance_types.calc_fixed');
    if (calcType === 'PercentageOfBasic') return this.t('allowance_types.calc_percent_basic');
    if (calcType === 'PercentageOfGross') return this.t('allowance_types.calc_percent_gross');
    return calcType;
  }

  isPercentageType(): boolean {
    return this.form.calculationType === 'PercentageOfBasic' || this.form.calculationType === 'PercentageOfGross';
  }

  validateForm(): boolean {
    const errors: { [key: string]: string } = {};

    if (!this.form.employeeId) {
      errors['employeeId'] = this.t('validation.required');
    }
    if (!this.form.allowanceTypeId) {
      errors['allowanceTypeId'] = this.t('validation.required');
    }
    if (!this.form.effectiveFromDate) {
      errors['effectiveFromDate'] = this.t('validation.required');
    }

    if (this.form.calculationType === 'Fixed') {
      if (this.form.amount == null || this.form.amount <= 0) {
        errors['amount'] = this.t('validation.required');
      }
    } else {
      if (this.form.percentage == null || this.form.percentage <= 0 || this.form.percentage > 100) {
        errors['percentage'] = this.t('validation.range');
      }
    }

    if (this.form.effectiveFromDate && this.form.effectiveToDate) {
      if (new Date(this.form.effectiveToDate) <= new Date(this.form.effectiveFromDate)) {
        errors['effectiveToDate'] = this.t('validation.date_range');
      }
    }

    this.validationErrors.set(errors);
    return Object.keys(errors).length === 0;
  }

  onSubmit(): void {
    if (!this.validateForm()) {
      this.notificationService.error(this.t('app.validationError'), this.t('app.checkForm'));
      return;
    }

    this.submitting.set(true);

    const request: CreateAllowanceAssignmentRequest = {
      employeeId: this.form.employeeId!,
      allowanceTypeId: this.form.allowanceTypeId!,
      amount: this.form.calculationType === 'Fixed' ? this.form.amount! : (this.form.percentage || 0),
      calculationType: this.form.calculationType,
      percentage: this.isPercentageType() ? this.form.percentage ?? undefined : undefined,
      currency: this.form.currency,
      effectiveFromDate: this.form.effectiveFromDate,
      effectiveToDate: this.form.effectiveToDate || undefined,
      reason: this.form.reason?.trim() || undefined,
      notes: this.form.notes?.trim() || undefined
    };

    this.allowanceService.assignAllowance(request).subscribe({
      next: (id) => {
        this.submitting.set(false);
        this.notificationService.success(this.t('app.success'), this.t('allowance_assignments.assigned_success'));
        this.router.navigate(['/allowances', id, 'view']);
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Failed to assign allowance:', error);
        const errorMessage = error?.error?.error || error?.message || this.t('app.error');
        this.notificationService.error(this.t('app.error'), errorMessage);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/allowances']);
  }
}
