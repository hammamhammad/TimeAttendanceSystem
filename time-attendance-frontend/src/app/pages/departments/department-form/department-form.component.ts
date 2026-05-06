import { Component, signal, computed, inject, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';
import { DepartmentsService } from '../departments.service';
import { EmployeesService } from '../../employees/employees.service';
import { BranchesService } from '../../branches/branches.service';
import { DepartmentDto, CreateDepartmentRequest, UpdateDepartmentRequest } from '../../../shared/models/department.model';
import { EmployeeSelectOption, BranchDto } from '../../../shared/models/employee.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [ReactiveFormsModule, SearchableSelectComponent, FormSectionComponent, LoadingSpinnerComponent],
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit, OnChanges {
  @Input() department: DepartmentDto | null = null;
  @Input() branchId: number | null = null;
  @Input() parentId: number | null = null;
  @Input() isEditMode = false;
  @Input() readonly: boolean = false;
  @Input() externalSaving: boolean = false;
  @Output() save = new EventEmitter<CreateDepartmentRequest | UpdateDepartmentRequest>();
  @Output() cancel = new EventEmitter<void>();

  public i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private departmentsService = inject(DepartmentsService);
  private employeesService = inject(EmployeesService);
  private branchesService = inject(BranchesService);

  // Signals
  loading = signal(false);
  saving = signal(false);
  departments = signal<DepartmentDto[]>([]);
  branches = signal<BranchDto[]>([]);
  managers = signal<EmployeeSelectOption[]>([]);
  loadingBranches = signal(false);
  loadingManagers = signal(false);

  // Computed signal for saving state (either internal or external)
  isSaving = computed(() => this.saving() || this.externalSaving);
  
  // Form
  form: FormGroup;

  constructor() {
    this.form = this.createForm();
  }

  ngOnInit() {
    // Managers are loaded globally (not branch-scoped), so we can fetch them
    // up front in both create and edit mode.
    this.loadManagers();

    if (!this.isEditMode) {
      this.loadBranches();
    } else {
      this.loadDepartments();
    }

    if (this.readonly) {
      this.form.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['department'] && this.department) {
      this.populateForm();
    }
    if (changes['readonly']) {
      if (this.readonly) {
        this.form?.disable();
      } else {
        this.form?.enable();
      }
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      branchId: [this.branchId, this.isEditMode ? [] : [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      nameAr: ['', [Validators.maxLength(100)]],
      code: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(500)]],
      descriptionAr: ['', [Validators.maxLength(500)]],
      parentDepartmentId: [null],
      managerEmployeeId: [null],
      costCenter: ['', [Validators.maxLength(50)]],
      location: ['', [Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.maxLength(100)]],
      sortOrder: [0, [Validators.min(0)]],
      isActive: [true]
    });
  }

  private populateForm() {
    if (!this.department) return;

    this.form.patchValue({
      branchId: this.department.branchId,
      name: this.department.name,
      nameAr: this.department.nameAr,
      code: this.department.code,
      description: this.department.description,
      descriptionAr: this.department.descriptionAr,
      parentDepartmentId: this.department.parentDepartmentId,
      managerEmployeeId: this.department.managerEmployeeId,
      costCenter: this.department.costCenter,
      location: this.department.location,
      phone: this.department.phone,
      email: this.department.email,
      sortOrder: this.department.sortOrder,
      isActive: this.department.isActive
    });

    // Reload departments for the department's branch in edit mode (managers
    // are loaded globally in ngOnInit, no need to reload them on branch change).
    if (this.isEditMode) {
      this.loadDepartments();
    }
  }

  private loadBranches() {
    this.loadingBranches.set(true);

    this.employeesService.getBranches().subscribe({
      next: (result) => {
        this.branches.set(result.items);
        this.loadingBranches.set(false);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.loadingBranches.set(false);
      }
    });
  }

  private loadDepartments() {
    const selectedBranchId = this.branchId || this.form.get('branchId')?.value;
    if (!selectedBranchId) {
      this.departments.set([]);
      return;
    }

    this.loading.set(true);

    this.departmentsService.getDepartments({
      branchId: selectedBranchId,
      includeInactive: false
    }).subscribe({
      next: (departments) => {
        // Filter out current department and its children to prevent circular references
        const filtered = this.isEditMode && this.department
          ? departments.filter(d => d.id !== this.department!.id && !d.path.includes(this.department!.name))
          : departments;

        this.departments.set(filtered);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load departments:', error);
        this.loading.set(false);
      }
    });
  }

  private loadManagers() {
    this.loadingManagers.set(true);

    // Load all active employees as candidate managers — branch is no longer
    // required because a department may legitimately be managed by an
    // employee from a different branch (regional managers, shared services,
    // etc.). The user can search the full list via the dropdown.
    this.employeesService.getManagers().subscribe({
      next: (managers) => {
        this.managers.set(managers);
        this.loadingManagers.set(false);
      },
      error: (error) => {
        console.error('Failed to load managers:', error);
        this.loadingManagers.set(false);
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.form.value;

    const data = {
      ...formValue,
      branchId: formValue.branchId || this.branchId,
      parentDepartmentId: this.parentId || formValue.parentDepartmentId || null,
    };

    this.save.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }

  onReset() {
    if (this.isEditMode && this.department) {
      this.populateForm();
    } else {
      this.form.reset({
        branchId: null,
        isActive: true,
        sortOrder: 0,
        parentDepartmentId: this.parentId
      });
    }
  }

  onBranchChange() {
    // When branch changes, reset the parent department since it's branch-scoped.
    // Manager stays selected because manager candidates are no longer
    // branch-scoped (a department in any branch can be managed by any employee).
    this.form.patchValue({
      parentDepartmentId: null
    });

    this.loadDepartments();
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    const errors = field.errors;
    if (errors['required']) return this.i18n.t('validation.required');
    if (errors['maxlength']) return this.i18n.t('validation.maxLength');
    if (errors['email']) return this.i18n.t('validation.email');
    if (errors['min']) return this.i18n.t('validation.min');

    return '';
  }

  onManagerSelectionChange(managerIdStr: string) {
    const managerId = managerIdStr ? parseInt(managerIdStr) : null;
    this.form.patchValue({ managerEmployeeId: managerId });
  }

  get managerSelectOptions(): SearchableSelectOption[] {
    return this.managers().map(manager => ({
      value: manager.id.toString(),
      label: manager.name,
      subLabel: manager.employeeNumber
    }));
  }

  // Searchable select options
  get branchSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('branch.select') }
    ];

    this.branches().forEach(branch => {
      options.push({
        value: branch.id.toString(),
        label: `${branch.name} (${branch.code})`,
        subLabel: branch.location
      });
    });

    return options;
  }

  get departmentSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('department.selectParent') }
    ];

    this.departments().forEach(dept => {
      options.push({
        value: dept.id.toString(),
        label: dept.path || dept.name,
        subLabel: dept.code
      });
    });

    return options;
  }

  onBranchSelectionChange(branchIdStr: string) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : null;
    this.form.patchValue({ branchId });
    this.onBranchChange();
  }

  onParentDepartmentSelectionChange(departmentIdStr: string) {
    const departmentId = departmentIdStr ? parseInt(departmentIdStr) : null;
    this.form.patchValue({ parentDepartmentId: departmentId });
  }
}