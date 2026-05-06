import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { EmployeeTransferService } from '../../../core/services/employee-transfer.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { BranchesService } from '../../branches/branches.service';
import { DepartmentsService } from '../../departments/departments.service';
import { CreateEmployeeTransferRequest } from '../../../shared/models/employee-transfer.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

import { PermissionService } from '../../../core/auth/permission.service';
@Component({
  selector: 'app-create-transfer',
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
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private transferService = inject(EmployeeTransferService);
  private employeeService = inject(EmployeeService);
  private branchesService = inject(BranchesService);
  private departmentsService = inject(DepartmentsService);

  private route = inject(ActivatedRoute);

  private permissionService = inject(PermissionService);

  canEdit(): boolean {
    // In create mode (no isEditMode signal or it's false), always allow.
    // In edit mode, require update permission.
    const editMode = (this as any).isEditMode;
    if (!editMode) return true;
    const inEdit = typeof editMode === 'function' ? editMode() : editMode;
    return !inEdit || this.permissionService.has('transfer.manage');
  }
  submitting = signal(false);
  loading = signal(false);
  isEditMode = signal(false);
  editId = signal<number | null>(null);
  employeeOptions: SearchableSelectOption[] = [];
  branchOptions: SearchableSelectOption[] = [];
  departmentOptions: SearchableSelectOption[] = [];

  form = this.fb.group({
    employeeId: [null as number | null, Validators.required],
    toBranchId: [null as number | null, Validators.required],
    toDepartmentId: [null as number | null],
    toJobTitle: [''],
    toJobTitleAr: [''],
    effectiveDate: ['', Validators.required],
    reason: [''],
    reasonAr: [''],
    notes: ['']
  });

  ngOnInit(): void {
    this.loadData();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.editId.set(+id);
      this.loadExistingData(+id);
    }
  }

  private loadExistingData(id: number): void {
    this.transferService.getTransferById(id).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          employeeId: data.employeeId,
          toBranchId: data.toBranchId,
          toDepartmentId: data.toDepartmentId,
          toJobTitle: data.toJobTitle,
          toJobTitleAr: data.toJobTitleAr,
          effectiveDate: data.effectiveDate?.substring(0, 10),
          reason: data.reason,
          reasonAr: data.reasonAr,
          notes: data.notes
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

  private loadData(): void {
    this.loading.set(true);
    let loaded = 0;
    const checkDone = () => { loaded++; if (loaded >= 3) this.loading.set(false); };

    this.employeeService.getDropdown().subscribe({
      next: (employees) => {
        this.employeeOptions = employees.map(e => ({
          value: e.id,
          label: `${e.name} (${e.employeeNumber})`
        }));
        checkDone();
      },
      error: () => { this.notification.error(this.i18n.t('common.error_loading_data')); checkDone(); }
    });

    this.branchesService.getBranches(1, 1000).subscribe({
      next: (res) => {
        this.branchOptions = res.items.map(b => ({ value: b.id, label: b.name }));
        checkDone();
      },
      error: () => { checkDone(); }
    });

    this.departmentsService.getDepartments({}).subscribe({
      next: (departments) => {
        this.departmentOptions = departments.map(d => ({ value: d.id, label: d.name }));
        checkDone();
      },
      error: () => { checkDone(); }
    });
  }

  onBranchChange(branchId: any): void {
    this.form.get('toBranchId')?.setValue(branchId);
    if (branchId) {
      this.departmentsService.getDepartments({ branchId }).subscribe({
        next: (departments) => {
          this.departmentOptions = departments.map(d => ({ value: d.id, label: d.name }));
        }
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.submitting.set(true);

    const v = this.form.getRawValue();
    const request: CreateEmployeeTransferRequest = {
      employeeId: v.employeeId!,
      toBranchId: v.toBranchId!,
      toDepartmentId: v.toDepartmentId || undefined,
      toJobTitle: v.toJobTitle || undefined,
      toJobTitleAr: v.toJobTitleAr || undefined,
      effectiveDate: v.effectiveDate!,
      reason: v.reason || undefined,
      reasonAr: v.reasonAr || undefined,
      notes: v.notes || undefined
    };

    const action$ = this.isEditMode()
      ? this.transferService.updateTransfer(this.editId()!, request as any)
      : this.transferService.createTransfer(request);

    action$.subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.isEditMode() ? 'employee_transfers.updated_successfully' : 'employee_transfers.created_successfully'));
        this.router.navigate(['/employee-transfers']);
      },
      error: () => {
        this.notification.error(this.i18n.t(this.isEditMode() ? 'employee_transfers.update_error' : 'employee_transfers.create_error'));
        this.submitting.set(false);
      }
    });
  }
}
