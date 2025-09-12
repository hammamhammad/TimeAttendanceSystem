import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Employee } from '../../../shared/models/employee.model';
import { Branch } from '../../../shared/models/branch.model';
import { Department } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="container-fluid">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{{ i18n.t('employees.edit_employee') }}</h2>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/dashboard">{{ i18n.t('dashboard.title') }}</a>
              </li>
              <li class="breadcrumb-item">
                <a routerLink="/employees">{{ i18n.t('employees.title') }}</a>
              </li>
              <li class="breadcrumb-item active">{{ i18n.t('employees.edit_employee') }}</li>
            </ol>
          </nav>
        </div>
        <button 
          type="button" 
          class="btn btn-outline-secondary"
          (click)="onCancel()"
          [disabled]="saving()">
          <i class="fa-solid fa-arrow-left me-2"></i>
          {{ i18n.t('common.back') }}
        </button>
      </div>

      @if (loading()) {
        <div class="d-flex justify-content-center py-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">{{ i18n.t('common.loading') }}</span>
          </div>
        </div>
      } @else if (employee()) {
        <!-- Main Form Card -->
        <div class="card">
          <div class="card-header">
            <h5 class="card-title mb-0">
              <i class="fa-solid fa-user me-2"></i>
              {{ i18n.t('employees.employee_information') }}
            </h5>
          </div>
          <div class="card-body">
            <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
              @if (error()) {
                <div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-exclamation-triangle me-2"></i>
                  {{ error() }}
                </div>
              }

              <!-- Required Information Section -->
              <div class="mb-4">
                <h6 class="text-primary mb-3">
                  <i class="fa-solid fa-asterisk me-2"></i>
                  {{ i18n.t('employees.required_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Employee Number (Read-only for edit) -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.employee_number') }}</label>
                    <input 
                      type="text" 
                      class="form-control-plaintext" 
                      [value]="employee()?.employeeNumber"
                      readonly>
                    <div class="form-text">{{ i18n.t('employees.employee_number_readonly') }}</div>
                  </div>

                  <!-- Branch (Read-only for edit) -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.branch') }}</label>
                    <input 
                      type="text" 
                      class="form-control-plaintext" 
                      [value]="employee()?.branchName"
                      readonly>
                    <div class="form-text">{{ i18n.t('employees.branch_readonly') }}</div>
                  </div>

                  <!-- First Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.first_name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="firstName"
                      [class.is-invalid]="isFieldInvalid('firstName')"
                      [placeholder]="i18n.t('employees.first_name_placeholder')">
                    @if (isFieldInvalid('firstName')) {
                      <div class="invalid-feedback">{{ getFieldError('firstName') }}</div>
                    }
                  </div>

                  <!-- Last Name -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.last_name') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="lastName"
                      [class.is-invalid]="isFieldInvalid('lastName')"
                      [placeholder]="i18n.t('employees.last_name_placeholder')">
                    @if (isFieldInvalid('lastName')) {
                      <div class="invalid-feedback">{{ getFieldError('lastName') }}</div>
                    }
                  </div>

                  <!-- Job Title -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.job_title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="jobTitle"
                      [class.is-invalid]="isFieldInvalid('jobTitle')"
                      [placeholder]="i18n.t('employees.job_title_placeholder')">
                    @if (isFieldInvalid('jobTitle')) {
                      <div class="invalid-feedback">{{ getFieldError('jobTitle') }}</div>
                    }
                  </div>

                  <!-- Employment Status -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.employment_status.title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select 
                      class="form-select" 
                      formControlName="employmentStatus"
                      [class.is-invalid]="isFieldInvalid('employmentStatus')">
                      <option value="Active">{{ i18n.t('employees.employment_status.active') }}</option>
                      <option value="Inactive">{{ i18n.t('employees.employment_status.inactive') }}</option>
                      <option value="OnLeave">{{ i18n.t('employees.employment_status.on_leave') }}</option>
                      <option value="Terminated">{{ i18n.t('employees.employment_status.terminated') }}</option>
                    </select>
                    @if (isFieldInvalid('employmentStatus')) {
                      <div class="invalid-feedback">{{ getFieldError('employmentStatus') }}</div>
                    }
                  </div>

                  <!-- Work Location -->
                  <div class="col-md-6">
                    <label class="form-label">
                      {{ i18n.t('employees.work_location.title') }}
                      <span class="text-danger">*</span>
                    </label>
                    <select 
                      class="form-select" 
                      formControlName="workLocationType"
                      [class.is-invalid]="isFieldInvalid('workLocationType')">
                      <option value="Office">{{ i18n.t('employees.work_location.office') }}</option>
                      <option value="Remote">{{ i18n.t('employees.work_location.remote') }}</option>
                      <option value="Hybrid">{{ i18n.t('employees.work_location.hybrid') }}</option>
                      <option value="Field">{{ i18n.t('employees.work_location.field') }}</option>
                    </select>
                    @if (isFieldInvalid('workLocationType')) {
                      <div class="invalid-feedback">{{ getFieldError('workLocationType') }}</div>
                    }
                  </div>
                </div>
              </div>

              <hr>

              <!-- Optional Information Section -->
              <div class="mb-4">
                <h6 class="text-secondary mb-3">
                  <i class="fa-solid fa-info-circle me-2"></i>
                  {{ i18n.t('employees.additional_information') }}
                </h6>
                <div class="row g-3">
                  <!-- Arabic Names -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.first_name_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="firstNameAr"
                      [class.is-invalid]="isFieldInvalid('firstNameAr')"
                      [placeholder]="i18n.t('employees.first_name_ar_placeholder')">
                    @if (isFieldInvalid('firstNameAr')) {
                      <div class="invalid-feedback">{{ getFieldError('firstNameAr') }}</div>
                    }
                  </div>

                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.last_name_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="lastNameAr"
                      [class.is-invalid]="isFieldInvalid('lastNameAr')"
                      [placeholder]="i18n.t('employees.last_name_ar_placeholder')">
                    @if (isFieldInvalid('lastNameAr')) {
                      <div class="invalid-feedback">{{ getFieldError('lastNameAr') }}</div>
                    }
                  </div>

                  <!-- Job Title Arabic -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.job_title_ar') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="jobTitleAr"
                      [class.is-invalid]="isFieldInvalid('jobTitleAr')"
                      [placeholder]="i18n.t('employees.job_title_ar_placeholder')">
                    @if (isFieldInvalid('jobTitleAr')) {
                      <div class="invalid-feedback">{{ getFieldError('jobTitleAr') }}</div>
                    }
                  </div>

                  <!-- Email -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.email') }}</label>
                    <input 
                      type="email" 
                      class="form-control" 
                      formControlName="email"
                      [class.is-invalid]="isFieldInvalid('email')"
                      [placeholder]="i18n.t('employees.email_placeholder')">
                    @if (isFieldInvalid('email')) {
                      <div class="invalid-feedback">{{ getFieldError('email') }}</div>
                    }
                  </div>

                  <!-- Phone -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.phone') }}</label>
                    <input 
                      type="tel" 
                      class="form-control" 
                      formControlName="phone"
                      [class.is-invalid]="isFieldInvalid('phone')"
                      [placeholder]="i18n.t('employees.phone_placeholder')">
                    @if (isFieldInvalid('phone')) {
                      <div class="invalid-feedback">{{ getFieldError('phone') }}</div>
                    }
                  </div>

                  <!-- National ID -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.national_id') }}</label>
                    <input 
                      type="text" 
                      class="form-control" 
                      formControlName="nationalId"
                      [class.is-invalid]="isFieldInvalid('nationalId')"
                      [placeholder]="i18n.t('employees.national_id_placeholder')">
                    @if (isFieldInvalid('nationalId')) {
                      <div class="invalid-feedback">{{ getFieldError('nationalId') }}</div>
                    }
                  </div>

                  <!-- Date of Birth -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.date_of_birth') }}</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      formControlName="dateOfBirth"
                      [class.is-invalid]="isFieldInvalid('dateOfBirth')">
                    @if (isFieldInvalid('dateOfBirth')) {
                      <div class="invalid-feedback">{{ getFieldError('dateOfBirth') }}</div>
                    }
                  </div>

                  <!-- Gender -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.gender.title') }}</label>
                    <select 
                      class="form-select" 
                      formControlName="gender"
                      [class.is-invalid]="isFieldInvalid('gender')">
                      <option value="">{{ i18n.t('common.select') }}</option>
                      <option value="Male">{{ i18n.t('employees.gender.male') }}</option>
                      <option value="Female">{{ i18n.t('employees.gender.female') }}</option>
                    </select>
                    @if (isFieldInvalid('gender')) {
                      <div class="invalid-feedback">{{ getFieldError('gender') }}</div>
                    }
                  </div>

                  <!-- Department -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.department') }}</label>
                    <select 
                      class="form-select" 
                      formControlName="departmentId"
                      [class.is-invalid]="isFieldInvalid('departmentId')">
                      <option value="">{{ i18n.t('common.select_department') }}</option>
                      @for (dept of departments(); track dept.id) {
                        <option [value]="dept.id">{{ dept.name }}</option>
                      }
                    </select>
                    @if (isFieldInvalid('departmentId')) {
                      <div class="invalid-feedback">{{ getFieldError('departmentId') }}</div>
                    }
                  </div>

                  <!-- Manager -->
                  <div class="col-md-6">
                    <label class="form-label">{{ i18n.t('employees.manager') }}</label>
                    <select 
                      class="form-select" 
                      formControlName="managerEmployeeId"
                      [class.is-invalid]="isFieldInvalid('managerEmployeeId')">
                      <option value="">{{ i18n.t('common.select_manager') }}</option>
                      @for (manager of managers(); track manager.id) {
                        <option [value]="manager.id">{{ manager.name }} ({{ manager.employeeNumber }})</option>
                      }
                    </select>
                    @if (isFieldInvalid('managerEmployeeId')) {
                      <div class="invalid-feedback">{{ getFieldError('managerEmployeeId') }}</div>
                    }
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
                  <i class="fa-solid fa-times me-2"></i>
                  {{ i18n.t('common.cancel') }}
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary" 
                  [disabled]="employeeForm.invalid || saving()"
                >
                  @if (saving()) {
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  } @else {
                    <i class="fa-solid fa-save me-2"></i>
                  }
                  {{ saving() ? i18n.t('common.saving') : i18n.t('employees.update_employee') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      } @else {
        <div class="alert alert-danger">
          <i class="fa-solid fa-exclamation-triangle me-2"></i>
          {{ error() || i18n.t('employees.employee_not_found') }}
        </div>
      }
    </div>
  `
})
export class EditEmployeeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeesService = inject(EmployeesService);
  private fb = inject(FormBuilder);
  public i18n = inject(I18nService);

  employee = signal<Employee | null>(null);
  departments = signal<Department[]>([]);
  managers = signal<{id: string, name: string, employeeNumber: string}[]>([]);
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
    
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.loadEmployee(employeeId);
    } else {
      this.error.set('Invalid employee ID');
      this.loading.set(false);
    }
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstNameAr: [''],
      lastNameAr: [''],
      jobTitle: ['', Validators.required],
      jobTitleAr: [''],
      email: ['', Validators.email],
      phone: [''],
      nationalId: [''],
      dateOfBirth: [''],
      gender: [''],
      employmentStatus: ['Active', Validators.required],
      workLocationType: ['Office', Validators.required],
      departmentId: [''],
      managerEmployeeId: ['']
    });
  }

  loadEmployee(employeeId: string): void {
    this.employeesService.getEmployeeById(+employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        this.populateForm(employee);
        this.loadDepartments(employee.branchId.toString());
        this.loadManagers(employee.branchId.toString());
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }

  loadDepartments(branchId: string): void {
    // Mock departments for now
    this.departments.set([]);
  }

  loadManagers(branchId: string): void {
    // Mock managers for now
    this.managers.set([]);
  }

  populateForm(employee: Employee): void {
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      firstNameAr: employee.firstNameAr || '',
      lastNameAr: employee.lastNameAr || '',
      jobTitle: employee.jobTitle,
      jobTitleAr: employee.jobTitleAr || '',
      email: employee.email || '',
      phone: employee.phone || '',
      nationalId: employee.nationalId || '',
      dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split('T')[0] : '',
      gender: employee.gender || '',
      employmentStatus: employee.employmentStatus,
      workLocationType: employee.workLocationType,
      departmentId: employee.departmentId || '',
      managerEmployeeId: employee.managerEmployeeId || ''
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.error.set('');

    const formValue = this.employeeForm.value;
    const updateRequest = {
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      firstNameAr: formValue.firstNameAr || undefined,
      lastNameAr: formValue.lastNameAr || undefined,
      jobTitle: formValue.jobTitle,
      jobTitleAr: formValue.jobTitleAr || undefined,
      email: formValue.email || undefined,
      phone: formValue.phone || undefined,
      nationalId: formValue.nationalId || undefined,
      dateOfBirth: formValue.dateOfBirth || undefined,
      gender: formValue.gender || undefined,
      employmentStatus: formValue.employmentStatus,
      workLocationType: formValue.workLocationType,
      departmentId: formValue.departmentId || undefined,
      managerEmployeeId: formValue.managerEmployeeId || undefined
    };

    this.employeesService.updateEmployee(this.employee()!.id, updateRequest).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/employees', this.employee()!.id, 'view']);
      },
      error: (error) => {
        this.saving.set(false);
        this.error.set(this.getErrorMessage(error));
      }
    });
  }

  onCancel(): void {
    if (this.employee()) {
      this.router.navigate(['/employees', this.employee()!.id, 'view']);
    } else {
      this.router.navigate(['/employees']);
    }
  }

  // Form field helpers
  getFieldError(fieldName: string): string {
    const field = this.employeeForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return this.i18n.t('validation.required');
      }
      if (field.errors['email']) {
        return this.i18n.t('validation.email');
      }
      if (field.errors['minlength']) {
        return this.i18n.t('validation.minlength').replace('{{min}}', field.errors['minlength'].requiredLength);
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.employeeForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}