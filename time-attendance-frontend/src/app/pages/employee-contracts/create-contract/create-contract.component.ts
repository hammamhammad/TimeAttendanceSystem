import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeContractService } from '../../../core/services/employee-contract.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ContractType, ProbationStatus, CreateEmployeeContractRequest } from '../../../shared/models/employee-contract.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { FileUploadComponent, FileUploadedEvent } from '../../../shared/components/file-upload/file-upload.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-contract',
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
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css']
})
export class CreateContractComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private notification = inject(NotificationService);
  private contractService = inject(EmployeeContractService);
  private employeeService = inject(EmployeeService);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('contract.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions: SearchableSelectOption[] = [];

  contractTypeOptions = computed<SearchableSelectOption[]>(() => [
    { value: ContractType.Permanent, label: this.i18n.t('employee_contracts.type_permanent') },
    { value: ContractType.FixedTerm, label: this.i18n.t('employee_contracts.type_fixed_term') },
    { value: ContractType.Probation, label: this.i18n.t('employee_contracts.type_probation') },
    { value: ContractType.Internship, label: this.i18n.t('employee_contracts.type_internship') },
    { value: ContractType.Consultancy, label: this.i18n.t('employee_contracts.type_consultancy') }
  ]);

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    contractNumber: ['', Validators.required],
    contractType: [ContractType.Permanent, Validators.required],
    startDate: ['', Validators.required],
    endDate: [''],
    basicSalary: [0, [Validators.required, Validators.min(0)]],
    currency: ['SAR', Validators.required],
    probationPeriodDays: [null as number | null],
    probationEndDate: [''],
    probationStatus: [ProbationStatus.NotApplicable],
    noticePeriodDays: [null as number | null],
    terms: [''],
    autoRenew: [false],
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
    this.contractService.getContractById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          employeeId: data.employeeId,
          contractNumber: data.contractNumber,
          contractType: data.contractType,
          startDate: data.startDate?.substring(0, 10),
          endDate: data.endDate?.substring(0, 10),
          basicSalary: data.basicSalary,
          currency: data.currency,
          probationPeriodDays: data.probationPeriodDays,
          probationEndDate: data.probationEndDate?.substring(0, 10),
          probationStatus: data.probationStatus,
          noticePeriodDays: data.noticePeriodDays,
          terms: data.terms,
          autoRenew: data.autoRenew,
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

    const formValue = this.form.getRawValue();
    const request: CreateEmployeeContractRequest = {
      employeeId: formValue.employeeId!,
      contractNumber: formValue.contractNumber!,
      contractType: formValue.contractType!,
      startDate: formValue.startDate!,
      endDate: formValue.endDate || undefined,
      basicSalary: formValue.basicSalary!,
      currency: formValue.currency!,
      probationPeriodDays: formValue.probationPeriodDays || undefined,
      probationEndDate: formValue.probationEndDate || undefined,
      probationStatus: formValue.probationStatus!,
      noticePeriodDays: formValue.noticePeriodDays || undefined,
      terms: formValue.terms || undefined,
      autoRenew: formValue.autoRenew!,
      documentUrl: formValue.documentUrl || undefined
    };

    const action$ = this.isEditMode()
      ? this.contractService.updateContract(this.editId()!, request as any)
      : this.contractService.createContract(request);

    action$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'employee_contracts.updated_successfully' : 'employee_contracts.created_successfully'));
        this.router.navigate(['/employee-contracts']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'employee_contracts.update_error' : 'employee_contracts.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
