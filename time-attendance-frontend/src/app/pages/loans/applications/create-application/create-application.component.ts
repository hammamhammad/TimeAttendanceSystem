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
  selector: 'app-create-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css'
})
export class CreateApplicationComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(LoanService);
  private readonly employeeService = inject(EmployeeService);
  private readonly notification = inject(NotificationService);

  form!: FormGroup;
  saving = signal(false);
  employeeOptions: { value: any; label: string }[] = [];
  loanTypeOptions: { value: any; label: string }[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [null, Validators.required],
      loanTypeId: [null, Validators.required],
      requestedAmount: [0, [Validators.required, Validators.min(1)]],
      repaymentMonths: [12, [Validators.required, Validators.min(1)]],
      interestRate: [0, [Validators.required, Validators.min(0)]],
      purpose: [''],
      notes: ['']
    });

    this.employeeService.getDropdown().subscribe({
      next: (list) => { this.employeeOptions = list.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` })); }
    });

    this.service.getTypes({ pageSize: 100 }).subscribe({
      next: (res) => { this.loanTypeOptions = (res.data || []).filter(t => t.isActive).map(t => ({ value: t.id, label: t.name })); }
    });
  }

  onLoanTypeChange(typeId: any): void {
    this.form.get('loanTypeId')?.setValue(typeId);
    const selected = this.loanTypeOptions.find(t => t.value === typeId);
    if (selected) {
      this.service.getType(typeId).subscribe({
        next: (type) => {
          this.form.patchValue({ interestRate: type.interestRate });
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    this.service.createApplication(this.form.value).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('loan_applications.created'));
        this.router.navigate(['/loans/applications']);
        this.saving.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }
}
