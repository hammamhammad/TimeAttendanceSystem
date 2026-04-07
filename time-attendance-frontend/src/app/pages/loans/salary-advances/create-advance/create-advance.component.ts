import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { LoanService } from '../../../../core/services/loan.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent } from '../../../../shared/components/searchable-select/searchable-select.component';

@Component({
  selector: 'app-create-advance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-advance.component.html',
  styleUrl: './create-advance.component.css'
})
export class CreateAdvanceComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(LoanService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  employeeOptions: { value: any; label: string }[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      currency: ['SAR'],
      deductionMonth: [null, Validators.required],
      reason: [''],
      reasonAr: ['']
    });

    this.employeeService.getDropdown().subscribe({
      next: (list) => {
        this.employeeOptions = list.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }));
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    this.service.createSalaryAdvance({
      employeeId: val.employeeId,
      amount: val.amount,
      currency: val.currency || 'SAR',
      deductionMonth: val.deductionMonth,
      reason: val.reason,
      reasonAr: val.reasonAr
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('salary_advances.created'));
        this.router.navigate(['/loans/salary-advances']);
        this.saving.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  cancel(): void {
    this.router.navigate(['/loans/salary-advances']);
  }
}
