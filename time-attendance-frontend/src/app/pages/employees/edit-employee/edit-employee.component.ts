import { Component, OnInit, signal, inject } from '@angular/core';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Employee, Gender, EmploymentStatus, WorkLocationType, DepartmentDto, EmployeeSelectOption } from '../../../shared/models/employee.model';
import { Branch } from '../../../shared/models/branch.model';
import { Department } from '../../../shared/models/department.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { FormSectionComponent } from '../../../shared/components/form-section/form-section.component';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, SearchableSelectComponent, FormSectionComponent],
  template: `
    <div class="container-fluid app-modern-form">
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
        <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
          @if (error()) {
            <div class="alert alert-danger" role="alert">
              <i class="fa-solid fa-exclamation-triangle me-2"></i>
              {{ error() }}
            </div>
          }

          <!-- Required Information Section -->
          <app-form-section [title]="i18n.t('employees.required_information')" variant="modern">
            <div class="row g-3">
              <!-- Employee Number (Read-only for edit) -->
              <div class="col-md-6">
                <div class="app-modern-field">
                  <label class="app-modern-label">{{ i18n.t('employees.employee_number') }}</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    [value]="employee()?.employeeNumber"
                    readonly>
                </div>
                <div class="form-text">{{ i18n.t('employees.employee_number_readonly') }}</div>
              </div>

              <!-- Branch (Read-only for edit) -->
              <div class="col-md-6">
                <div class="app-modern-field">
                  <label class="app-modern-label">{{ i18n.t('employees.branch') }}</label>
                  <input
                    type="text"
                    class="form-control-plaintext"
                    [value]="employee()?.branchName"
                    readonly>
                </div>
                <div class="form-text">{{ i18n.t('employees.branch_readonly') }}</div>
              </div>

              <!-- First Name -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="firstName"
                    formControlName="firstName"
                    [class.is-invalid]="isFieldInvalid('firstName')"
                    placeholder="{{ i18n.t('employees.first_name') }}">
                  <label for="firstName">
                    {{ i18n.t('employees.first_name') }}
                    <span class="text-danger">*</span>
                  </label>
                </div>
                @if (isFieldInvalid('firstName')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('firstName') }}</div>
                }
              </div>

              <!-- Last Name -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    formControlName="lastName"
                    [class.is-invalid]="isFieldInvalid('lastName')"
                    placeholder="{{ i18n.t('employees.last_name') }}">
                  <label for="lastName">
                    {{ i18n.t('employees.last_name') }}
                    <span class="text-danger">*</span>
                  </label>
                </div>
                @if (isFieldInvalid('lastName')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('lastName') }}</div>
                }
              </div>

              <!-- Job Title -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="jobTitle"
                    formControlName="jobTitle"
                    [class.is-invalid]="isFieldInvalid('jobTitle')"
                    placeholder="{{ i18n.t('employees.job_title') }}">
                  <label for="jobTitle">
                    {{ i18n.t('employees.job_title') }}
                    <span class="text-danger">*</span>
                  </label>
                </div>
                @if (isFieldInvalid('jobTitle')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('jobTitle') }}</div>
                }
              </div>

              <!-- Employment Status -->
              <div class="col-md-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="employmentStatus"
                    formControlName="employmentStatus"
                    [class.is-invalid]="isFieldInvalid('employmentStatus')">
                    <option value="">{{ i18n.t('common.select') }}</option>
                    <option value="1">{{ i18n.t('employees.employment_status.active') }}</option>
                    <option value="2">{{ i18n.t('employees.employment_status.fulltime') }}</option>
                    <option value="3">{{ i18n.t('employees.employment_status.parttime') }}</option>
                    <option value="4">{{ i18n.t('employees.employment_status.contract') }}</option>
                    <option value="5">{{ i18n.t('employees.employment_status.intern') }}</option>
                    <option value="6">{{ i18n.t('employees.employment_status.consultant') }}</option>
                    <option value="7">{{ i18n.t('employees.employment_status.terminated') }}</option>
                    <option value="8">{{ i18n.t('employees.employment_status.inactive') }}</option>
                  </select>
                  <label for="employmentStatus">
                    {{ i18n.t('employees.employment_status.title') }}
                    <span class="text-danger">*</span>
                  </label>
                </div>
                @if (isFieldInvalid('employmentStatus')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('employmentStatus') }}</div>
                }
              </div>

              <!-- Work Location -->
              <div class="col-md-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="workLocationType"
                    formControlName="workLocationType"
                    [class.is-invalid]="isFieldInvalid('workLocationType')">
                    <option value="">{{ i18n.t('common.select') }}</option>
                    <option value="1">{{ i18n.t('employees.work_location.onsite') }}</option>
                    <option value="2">{{ i18n.t('employees.work_location.remote') }}</option>
                    <option value="3">{{ i18n.t('employees.work_location.hybrid') }}</option>
                  </select>
                  <label for="workLocationType">
                    {{ i18n.t('employees.work_location.title') }}
                    <span class="text-danger">*</span>
                  </label>
                </div>
                @if (isFieldInvalid('workLocationType')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('workLocationType') }}</div>
                }
              </div>
            </div>
          </app-form-section>

          <!-- Additional Information Section -->
          <app-form-section [title]="i18n.t('employees.additional_information')" variant="modern">
            <div class="row g-3">
              <!-- Arabic Names -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="firstNameAr"
                    formControlName="firstNameAr"
                    [class.is-invalid]="isFieldInvalid('firstNameAr')"
                    placeholder="{{ i18n.t('employees.first_name_ar') }}">
                  <label for="firstNameAr">{{ i18n.t('employees.first_name_ar') }}</label>
                </div>
                @if (isFieldInvalid('firstNameAr')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('firstNameAr') }}</div>
                }
              </div>

              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="lastNameAr"
                    formControlName="lastNameAr"
                    [class.is-invalid]="isFieldInvalid('lastNameAr')"
                    placeholder="{{ i18n.t('employees.last_name_ar') }}">
                  <label for="lastNameAr">{{ i18n.t('employees.last_name_ar') }}</label>
                </div>
                @if (isFieldInvalid('lastNameAr')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('lastNameAr') }}</div>
                }
              </div>

              <!-- Job Title Arabic -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="jobTitleAr"
                    formControlName="jobTitleAr"
                    [class.is-invalid]="isFieldInvalid('jobTitleAr')"
                    placeholder="{{ i18n.t('employees.job_title_ar') }}">
                  <label for="jobTitleAr">{{ i18n.t('employees.job_title_ar') }}</label>
                </div>
                @if (isFieldInvalid('jobTitleAr')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('jobTitleAr') }}</div>
                }
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    formControlName="email"
                    [class.is-invalid]="isFieldInvalid('email')"
                    placeholder="{{ i18n.t('employees.email') }}">
                  <label for="email">{{ i18n.t('employees.email') }}</label>
                </div>
                @if (isFieldInvalid('email')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('email') }}</div>
                }
              </div>

              <!-- Phone -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    formControlName="phone"
                    [class.is-invalid]="isFieldInvalid('phone')"
                    placeholder="{{ i18n.t('employees.phone') }}">
                  <label for="phone">{{ i18n.t('employees.phone') }}</label>
                </div>
                @if (isFieldInvalid('phone')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('phone') }}</div>
                }
              </div>

              <!-- National ID -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="nationalId"
                    formControlName="nationalId"
                    [class.is-invalid]="isFieldInvalid('nationalId')"
                    placeholder="{{ i18n.t('employees.national_id') }}">
                  <label for="nationalId">{{ i18n.t('employees.national_id') }}</label>
                </div>
                @if (isFieldInvalid('nationalId')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('nationalId') }}</div>
                }
              </div>

              <!-- Date of Birth -->
              <div class="col-md-6">
                <div class="form-floating">
                  <input
                    type="date"
                    class="form-control"
                    id="dateOfBirth"
                    formControlName="dateOfBirth"
                    [class.is-invalid]="isFieldInvalid('dateOfBirth')"
                    placeholder="{{ i18n.t('employees.date_of_birth') }}">
                  <label for="dateOfBirth">{{ i18n.t('employees.date_of_birth') }}</label>
                </div>
                @if (isFieldInvalid('dateOfBirth')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('dateOfBirth') }}</div>
                }
              </div>

              <!-- Gender -->
              <div class="col-md-6">
                <div class="form-floating">
                  <select
                    class="form-select"
                    id="gender"
                    formControlName="gender"
                    [class.is-invalid]="isFieldInvalid('gender')">
                    <option value="">{{ i18n.t('common.select') }}</option>
                    <option value="1">{{ i18n.t('employees.gender.male') }}</option>
                    <option value="2">{{ i18n.t('employees.gender.female') }}</option>
                  </select>
                  <label for="gender">{{ i18n.t('employees.gender.title') }}</label>
                </div>
                @if (isFieldInvalid('gender')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('gender') }}</div>
                }
              </div>

              <!-- Department -->
              <div class="col-md-6">
                <div class="app-modern-field">
                  <label class="app-modern-label">{{ i18n.t('employees.department') }}</label>
                  <app-searchable-select
                    [options]="departmentSelectOptions"
                    formControlName="departmentId"
                    [placeholder]="i18n.t('common.select_department')"
                    [searchable]="true"
                    [clearable]="false"
                    [class.is-invalid]="isFieldInvalid('departmentId')"
                  ></app-searchable-select>
                </div>
                @if (isFieldInvalid('departmentId')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('departmentId') }}</div>
                }
              </div>

              <!-- Manager -->
              <div class="col-md-6">
                <div class="app-modern-field">
                  <label class="app-modern-label">{{ i18n.t('employees.manager') }}</label>
                  <app-searchable-select
                    [options]="managerSelectOptions"
                    formControlName="managerEmployeeId"
                    [placeholder]="i18n.t('common.select_manager')"
                    [searchable]="true"
                    [clearable]="false"
                    [class.is-invalid]="isFieldInvalid('managerEmployeeId')"
                  ></app-searchable-select>
                </div>
                @if (isFieldInvalid('managerEmployeeId')) {
                  <div class="invalid-feedback d-block">{{ getFieldError('managerEmployeeId') }}</div>
                }
              </div>
            </div>
          </app-form-section>

          <!-- Form Actions -->
          <div class="app-form-actions">
            <button type="button" class="btn btn-outline-secondary" (click)="onCancel()" [disabled]="saving()">
              <i class="fa-solid fa-times me-2"></i>
              {{ i18n.t('common.cancel') }}
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="employeeForm.invalid || saving()">
              @if (saving()) {
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              } @else {
                <i class="fa-solid fa-save me-2"></i>
              }
              {{ saving() ? i18n.t('common.saving') : i18n.t('employees.update_employee') }}
            </button>
          </div>
        </form>
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
  departments = signal<DepartmentDto[]>([]);
  managers = signal<EmployeeSelectOption[]>([]);
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  employeeForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();

    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      // Load departments first, then load employee and populate form
      this.loadDepartmentsAndEmployee(employeeId);
    } else {
      this.error.set(this.i18n.t('employees.invalid_employee_id'));
      this.loading.set(false);
    }
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      branchId: [''], // Add branchId field for department loading logic
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
      employmentStatus: ['', Validators.required],
      workLocationType: ['', Validators.required],
      departmentId: [''],
      managerEmployeeId: ['']
    });
  }

  loadDepartmentsAndEmployee(employeeId: string): void {
    // First load all departments
    this.employeesService.getDepartments().subscribe({
      next: (departments) => {
        this.departments.set(departments);

        // Then load the employee
        this.employeesService.getEmployeeById(+employeeId).subscribe({
          next: (employee) => {
            this.employee.set(employee);

            // Load managers for the employee's branch
            this.employeesService.getManagers(employee.branchId).subscribe({
              next: (managers) => {
                this.managers.set(managers);

                // Finally populate the form with all data loaded
                this.populateForm(employee);
                this.loading.set(false);
              },
              error: (error) => {
                console.error('Error loading managers:', error);
                this.managers.set([]);
                // Still populate form even if managers fail to load
                this.populateForm(employee);
                this.loading.set(false);
              }
            });
          },
          error: (error) => {
            this.error.set(this.getErrorMessage(error));
            this.loading.set(false);
          }
        });
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.departments.set([]);
        // Still try to load employee even if departments fail
        this.loadEmployee(employeeId);
      }
    });
  }

  loadEmployee(employeeId: string): void {
    this.employeesService.getEmployeeById(+employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        // Load managers for the employee's branch
        this.loadManagers(employee.branchId.toString());
        this.populateForm(employee);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(this.getErrorMessage(error));
        this.loading.set(false);
      }
    });
  }


  loadManagers(branchId: string): void {
    this.employeesService.getManagers(+branchId).subscribe({
      next: (managers) => {
        this.managers.set(managers);
      },
      error: (error) => {
        console.error('Error loading managers:', error);
        this.managers.set([]);
      }
    });
  }

  populateForm(employee: Employee): void {
    // Parse dateOfBirth without timezone conversion to prevent date shifting
    let dateOfBirthValue = '';
    if (employee.dateOfBirth) {
      const dateMatch = employee.dateOfBirth.toString().match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (dateMatch) {
        dateOfBirthValue = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
      }
    }

    this.employeeForm.patchValue({
      branchId: employee.branchId, // Set branchId for department loading logic
      firstName: employee.firstName,
      lastName: employee.lastName,
      firstNameAr: employee.firstNameAr || '',
      lastNameAr: employee.lastNameAr || '',
      jobTitle: employee.jobTitle,
      jobTitleAr: employee.jobTitleAr || '',
      email: employee.email || '',
      phone: employee.phone || '',
      nationalId: employee.nationalId || '',
      dateOfBirth: dateOfBirthValue,
      gender: employee.gender || '',
      employmentStatus: employee.employmentStatus,
      workLocationType: employee.workLocationType,
      departmentId: employee.departmentId ? employee.departmentId.toString() : '',
      managerEmployeeId: employee.managerEmployeeId ? employee.managerEmployeeId.toString() : ''
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
      firstNameAr: formValue.firstNameAr || null,
      lastNameAr: formValue.lastNameAr || null,
      jobTitle: formValue.jobTitle,
      jobTitleAr: formValue.jobTitleAr || null,
      email: formValue.email || null,
      phone: formValue.phone || null,
      nationalId: formValue.nationalId || null,
      dateOfBirth: formValue.dateOfBirth || null,
      gender: formValue.gender ? +formValue.gender : null,
      employmentStatus: +formValue.employmentStatus,
      workLocationType: +formValue.workLocationType,
      departmentId: formValue.departmentId ? +formValue.departmentId : null,
      managerEmployeeId: formValue.managerEmployeeId ? +formValue.managerEmployeeId : null,
      photoUrl: null
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

  // Searchable select options
  get departmentSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.select_department') }
    ];

    this.departments().forEach(dept => {
      options.push({
        value: dept.id.toString(),
        label: dept.name,
        subLabel: dept.nameAr || ''
      });
    });

    return options;
  }

  get managerSelectOptions(): SearchableSelectOption[] {
    const options: SearchableSelectOption[] = [
      { value: '', label: this.i18n.t('common.select_manager') }
    ];

    this.managers().forEach(manager => {
      options.push({
        value: manager.id.toString(),
        label: manager.name,
        subLabel: manager.employeeNumber
      });
    });

    return options;
  }



  private getErrorMessage(error: any): string {
    if (error?.error?.error) {
      return error.error.error;
    }
    return this.i18n.t('errors.unknown');
  }
}