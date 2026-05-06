import { Component, signal, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { PayrollService } from '../../../../core/services/payroll.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../../shared/components/searchable-select/searchable-select.component';
import { PayrollPeriodType } from '../../../../shared/models/payroll.model';
import { environment } from '../../../../../environments/environment';

import { PermissionService } from '../../../../core/auth/permission.service';
@Component({
  selector: 'app-create-payroll-period',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormHeaderComponent, FormSectionComponent, SearchableSelectComponent],
  templateUrl: './create-payroll-period.component.html',
  styleUrls: ['./create-payroll-period.component.css']
})
export class CreatePayrollPeriodComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private payrollService = inject(PayrollService);
  private notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('payroll.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  form!: FormGroup;
  branchOptions: SearchableSelectOption[] = [];

  periodTypes: PayrollPeriodType[] = ['Monthly', 'BiWeekly'];

  ngOnInit(): void {
    this.form = this.fb.group({
      branchId: [null, Validators.required],
      name: ['', Validators.required],
      periodType: ['Monthly', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.loadBranches();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.payrollService.getPeriodById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          branchId: data.branchId,
          name: data.name,
          periodType: data.periodType,
          startDate: data.startDate?.substring(0, 10),
          endDate: data.endDate?.substring(0, 10)
        });
        if (!this.canEdit()) {
          this.form.disable();
        }
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
      }
    });
  }

  private loadBranches(): void {
    this.loading.set(true);
    this.http.get<any[]>(`${environment.apiUrl}/api/v1/branches/dropdown`).subscribe({
      next: (data) => {
        const items = Array.isArray(data) ? data : [];
        this.branchOptions = items.map(b => ({ value: b.id, label: b.name }));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const action$ = this.isEditMode()
      ? this.http.put<any>(`${environment.apiUrl}/api/v1/payroll-periods/${this.editId()}`, this.form.value)
      : this.payrollService.createPeriod(this.form.value);

    action$.subscribe({
      next: (result: any) => {
        this.notificationService.success(this.i18n.t(this.isEditMode() ? 'payroll.periods.updated_successfully' : 'payroll.periods.created_successfully'));
        this.router.navigate(['/payroll/periods']);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_saving'));
        this.submitting.set(false);
      }
    });
  }
}
