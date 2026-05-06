import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { SalaryAdjustmentService } from '../../../core/services/salary-adjustment.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { AdjustmentType, CreateSalaryAdjustmentRequest } from '../../../shared/models/salary-adjustment.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-adjustment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormHeaderComponent,
    FormSectionComponent,
    SearchableSelectComponent,
    LoadingSpinnerComponent,
    FileUploadComponent
  ],
  templateUrl: './create-adjustment.component.html',
  styleUrls: ['./create-adjustment.component.css']
})
export class CreateAdjustmentComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private adjustmentService = inject(SalaryAdjustmentService);
  private employeeService = inject(EmployeeService);

  private route = inject(ActivatedRoute);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('salaryAdjustment.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions: SearchableSelectOption[] = [];

  adjustmentTypeOptions = computed<SearchableSelectOption[]>(() => [
    { value: AdjustmentType.AnnualIncrement, label: this.i18n.t('salary_adjustments.type_annual_increment') },
    { value: AdjustmentType.PromotionIncrease, label: this.i18n.t('salary_adjustments.type_promotion_increase') },
    { value: AdjustmentType.MarketAdjustment, label: this.i18n.t('salary_adjustments.type_market_adjustment') },
    { value: AdjustmentType.PerformanceBonus, label: this.i18n.t('salary_adjustments.type_performance_bonus') },
    { value: AdjustmentType.CostOfLivingAdjustment, label: this.i18n.t('salary_adjustments.type_cost_of_living_adjustment') },
    { value: AdjustmentType.ContractRenewal, label: this.i18n.t('salary_adjustments.type_contract_renewal') },
    { value: AdjustmentType.TransferAdjustment, label: this.i18n.t('salary_adjustments.type_transfer_adjustment') },
    { value: AdjustmentType.Correction, label: this.i18n.t('salary_adjustments.type_correction') },
    { value: AdjustmentType.Demotion, label: this.i18n.t('salary_adjustments.type_demotion') },
    { value: AdjustmentType.AllowanceChange, label: this.i18n.t('salary_adjustments.type_allowance_change') },
    { value: AdjustmentType.Other, label: this.i18n.t('salary_adjustments.type_other') }
  ]);

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    adjustmentType: [AdjustmentType.AnnualIncrement, Validators.required],
    newBaseSalary: [null as number | null, [Validators.required, Validators.min(0)]],
    effectiveDate: ['', Validators.required],
    reason: [''],
    reasonAr: [''],
    justification: [''],
    documentUrl: ['']
  });

  ngOnInit(): void {
    this.loadEmployees();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.adjustmentService.getAdjustmentById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          employeeId: data.employeeId,
          adjustmentType: data.adjustmentType,
          newBaseSalary: data.newSalary ?? data.newBaseSalary,
          effectiveDate: data.effectiveDate?.substring(0, 10),
          reason: data.reason,
          reasonAr: data.reasonAr,
          justification: data.justification,
          documentUrl: data.documentUrl
        });
        if (!this.canEdit()) {
          this.form.disable();
        }
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading'));
      }
    });
  }

  private loadEmployees(): void {
    this.loading.set(true);
    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('common.error_loading_data'));
        this.loading.set(false);
      }
    });
  }

  onFileUploaded(field: string, event: FileUploadedEvent): void {
    this.form.patchValue({ [field]: event.fileUrl });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const request: CreateSalaryAdjustmentRequest = {
      employeeId: v.employeeId!,
      adjustmentType: v.adjustmentType!,
      newBaseSalary: v.newBaseSalary!,
      effectiveDate: v.effectiveDate!,
      reason: v.reason || undefined,
      reasonAr: v.reasonAr || undefined,
      justification: v.justification || undefined,
      documentUrl: v.documentUrl || undefined
    };

    const action$ = this.isEditMode()
      ? this.adjustmentService.updateAdjustment(this.editId()!, request as any)
      : this.adjustmentService.createAdjustment(request);

    action$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'salary_adjustments.updated_successfully' : 'salary_adjustments.created_successfully'));
        this.router.navigate(['/salary-adjustments']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'salary_adjustments.update_error' : 'salary_adjustments.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
