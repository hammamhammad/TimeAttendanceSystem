import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { EmployeesService } from '../employees.service';
import { 
  BranchDto, 
  DepartmentDto,
  EmploymentStatus,
  Gender,
  WorkLocationType,
  CreateEmployeeRequest,
  EmployeeSelectOption
} from '../../../shared/models/employee.model';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  public i18n = inject(I18nService);
  private employeesService = inject(EmployeesService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  
  // Signals
  loading = signal(false);
  submitting = signal(false);
  
  // Dropdown data
  branches = signal<BranchDto[]>([]);
  departments = signal<DepartmentDto[]>([]);
  managers = signal<EmployeeSelectOption[]>([]);
  
  // Form
  createForm: FormGroup;
  
  // Enums for templates
  EmploymentStatus = EmploymentStatus;
  Gender = Gender;
  WorkLocationType = WorkLocationType;
  
  // Enum arrays for templates
  employmentStatusValues = [
    EmploymentStatus.FullTime,
    EmploymentStatus.PartTime,
    EmploymentStatus.Contract,
    EmploymentStatus.Intern,
    EmploymentStatus.Consultant
  ];
  
  genderValues = [Gender.Male, Gender.Female];
  
  workLocationValues = [
    WorkLocationType.OnSite,
    WorkLocationType.Remote,
    WorkLocationType.Hybrid
  ];

  // Validation patterns
  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
  private readonly nationalIdPattern = /^[0-9]{10,14}$/;
  private readonly employeeNumberPattern = /^[A-Z0-9\-]{3,20}$/;

  constructor() {
    this.createForm = this.createFormGroup();
  }

  ngOnInit() {
    this.loadBranches();
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      // Required fields
      branchId: ['', [Validators.required]],
      employeeNumber: ['', [
        Validators.required,
        Validators.pattern(this.employeeNumberPattern)
      ]],
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      hireDate: ['', [Validators.required, this.dateValidator]],
      jobTitle: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      employmentStatus: [EmploymentStatus.FullTime, [Validators.required]],
      workLocationType: [WorkLocationType.OnSite, [Validators.required]],
      
      // Optional fields with validation
      firstNameAr: ['', [Validators.maxLength(50)]],
      lastNameAr: ['', [Validators.maxLength(50)]],
      jobTitleAr: ['', [Validators.maxLength(100)]],
      nationalId: ['', [Validators.pattern(this.nationalIdPattern)]],
      email: ['', [Validators.email, Validators.pattern(this.emailPattern)]],
      phone: ['', [Validators.pattern(this.phonePattern)]],
      dateOfBirth: ['', [this.dateValidator, this.minAgeValidator(16)]],
      gender: [''],
      departmentId: [''],
      managerEmployeeId: ['']
    });
  }

  // Custom validators
  private dateValidator(control: any) {
    if (!control.value) return null;
    const date = new Date(control.value);
    const today = new Date();
    return date > today ? { futureDate: true } : null;
  }

  private minAgeValidator(minAge: number) {
    return (control: any) => {
      if (!control.value) return null;
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 < minAge ? { minAge: { requiredAge: minAge, actualAge: age - 1 } } : null;
      }
      
      return age < minAge ? { minAge: { requiredAge: minAge, actualAge: age } } : null;
    };
  }

  loadBranches() {
    this.loading.set(true);
    this.employeesService.getBranches().subscribe({
      next: (result) => {
        this.branches.set(result.items);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.loading.set(false);
      }
    });
  }

  onBranchChange(branchId: number) {
    if (branchId) {
      this.employeesService.getDepartments(branchId).subscribe({
        next: (departments) => {
          this.departments.set(departments);
        },
        error: (error) => {
          console.error('Failed to load departments:', error);
        }
      });

      this.employeesService.getManagers(branchId).subscribe({
        next: (managers: EmployeeSelectOption[]) => {
          this.managers.set(managers);
        },
        error: (error: any) => {
          console.error('Failed to load managers:', error);
        }
      });
    } else {
      this.departments.set([]);
      this.managers.set([]);
    }
  }

  onSubmit() {
    if (this.createForm.valid) {
      this.submitting.set(true);
      const formValue = this.createForm.value;
      
      // Clean up the data - convert empty strings to null for optional fields
      const request: CreateEmployeeRequest = {
        ...formValue,
        branchId: +formValue.branchId, // Ensure it's a number
        departmentId: formValue.departmentId ? +formValue.departmentId : null,
        managerEmployeeId: formValue.managerEmployeeId ? +formValue.managerEmployeeId : null,
        dateOfBirth: formValue.dateOfBirth || null,
        gender: formValue.gender || null,
        firstNameAr: formValue.firstNameAr || null,
        lastNameAr: formValue.lastNameAr || null,
        jobTitleAr: formValue.jobTitleAr || null,
        nationalId: formValue.nationalId || null,
        email: formValue.email || null,
        phone: formValue.phone || null
      };
      
      this.employeesService.createEmployee(request).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Failed to create employee:', error);
          this.handleSubmissionError(error);
          this.submitting.set(false);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }

  private markFormGroupTouched() {
    Object.keys(this.createForm.controls).forEach(key => {
      this.createForm.get(key)?.markAsTouched();
    });
  }

  private handleSubmissionError(error: any) {
    if (error.error) {
      // Handle validation errors from backend
      if (error.error.errors) {
        // Model state validation errors
        Object.keys(error.error.errors).forEach(field => {
          const formField = this.getFormFieldName(field);
          if (formField) {
            const control = this.createForm.get(formField);
            if (control) {
              control.setErrors({ serverError: error.error.errors[field][0] });
            }
          }
        });
      } else if (error.error.error) {
        // General error message
        console.error('Server error:', error.error.error);
      }
    }
  }

  private getFormFieldName(backendFieldName: string): string | null {
    // Map backend field names to frontend form field names
    const fieldMap: { [key: string]: string } = {
      'BranchId': 'branchId',
      'EmployeeNumber': 'employeeNumber',
      'FirstName': 'firstName',
      'LastName': 'lastName',
      'HireDate': 'hireDate',
      'JobTitle': 'jobTitle',
      'EmploymentStatus': 'employmentStatus',
      'WorkLocationType': 'workLocationType',
      'DateOfBirth': 'dateOfBirth',
      'Email': 'email',
      'Phone': 'phone',
      'NationalId': 'nationalId'
    };
    
    return fieldMap[backendFieldName] || null;
  }

  // Helper methods for template
  t(key: string): string {
    return this.i18n.t(key);
  }

  getEmploymentStatusLabel(status: EmploymentStatus): string {
    return this.t(`employees.employment_status.${EmploymentStatus[status].toLowerCase()}`);
  }

  getGenderLabel(gender: Gender): string {
    return this.t(`employees.gender.${Gender[gender].toLowerCase()}`);
  }

  getWorkLocationTypeLabel(type: WorkLocationType): string {
    return this.t(`employees.work_location.${WorkLocationType[type].toLowerCase()}`);
  }

  // Validation helper methods
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.createForm.get(fieldName);
    if (!field) return false;
    
    if (errorType) {
      return field.hasError(errorType) && (field.dirty || field.touched);
    }
    
    return field.invalid && (field.dirty || field.touched);
  }

  getError(fieldName: string): string {
    const field = this.createForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;
    
    // Server-side validation errors have priority
    if (errors['serverError']) return errors['serverError'];
    
    if (errors['required']) return this.t('validation.required');
    if (errors['email']) return this.t('validation.invalid_email');
    if (errors['pattern']) {
      if (fieldName === 'employeeNumber') return this.t('validation.invalid_employee_number');
      if (fieldName === 'nationalId') return this.t('validation.invalid_national_id');
      if (fieldName === 'phone') return this.t('validation.invalid_phone');
      if (fieldName === 'firstName' || fieldName === 'lastName') return this.t('validation.letters_only');
      return this.t('validation.invalid_format');
    }
    if (errors['minlength']) return this.t('validation.min_length') + ': ' + errors['minlength'].requiredLength;
    if (errors['maxlength']) return this.t('validation.max_length') + ': ' + errors['maxlength'].requiredLength;
    if (errors['futureDate']) return this.t('validation.future_date_not_allowed');
    if (errors['minAge']) return this.t('validation.minimum_age') + ': ' + errors['minAge'].requiredAge;

    return this.t('validation.invalid');
  }
}