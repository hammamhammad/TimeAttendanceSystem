import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { CompensatoryOffService } from '../../../../core/services/compensatory-off.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-create-compensatory-off',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './create-compensatory-off.component.html',
  styleUrls: ['./create-compensatory-off.component.css']
})
export class CreateCompensatoryOffComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private compOffService = inject(CompensatoryOffService);
  private employeeService = inject(EmployeeService);

  submitting = signal(false);
  loading = signal(false);
  employeeOptions: SearchableSelectOption[] = [];

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    earnedDate: ['', Validators.required],
    expiryDate: ['', Validators.required],
    reason: ['', Validators.required],
    reasonAr: [''],
    hoursWorked: [null as number | null, [Validators.required, Validators.min(0.5)]],
    notes: ['']
  });

  ngOnInit(): void { this.loadEmployees(); }

  private loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({ value: e.id, label: `${e.name} (${e.employeeNumber})` }));
        this.loading.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error_loading_data')); this.loading.set(false); }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);
    const v = this.form.getRawValue();
    this.compOffService.create({
      employeeId: v.employeeId,
      earnedDate: v.earnedDate,
      expiryDate: v.expiryDate,
      reason: v.reason,
      reasonAr: v.reasonAr || undefined,
      hoursWorked: v.hoursWorked,
      notes: v.notes || undefined
    }).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('compensatory_offs.created_successfully'));
        this.router.navigate(['/leave-management/compensatory-offs']);
      },
      error: (err: any) => {
        this.notification.error(err?.error?.error || this.i18n.t('compensatory_offs.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
