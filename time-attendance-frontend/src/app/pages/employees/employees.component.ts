import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';
import { EmployeesService } from './employees.service';
import { 
  EmployeeDto, 
  EmployeesFilter, 
  BranchDto, 
  DepartmentDto,
  EmploymentStatus,
  Gender,
  WorkLocationType,
  CreateEmployeeRequest,
  UpdateEmployeeRequest
} from '../../shared/models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, HasPermissionDirective],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private employeesService = inject(EmployeesService);
  private fb = inject(FormBuilder);
  
  // Signals
  employees = signal<EmployeeDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  
  // Dropdown data
  branches = signal<BranchDto[]>([]);
  departments = signal<DepartmentDto[]>([]);
  managers = signal<EmployeeDto[]>([]);
  
  // Modal states
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedEmployee = signal<EmployeeDto | null>(null);
  
  // Forms
  editForm: FormGroup;
  searchForm: FormGroup;
  
  // Filter
  currentFilter: EmployeesFilter = {};
  
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
    EmploymentStatus.Consultant,
    EmploymentStatus.Terminated
  ];
  
  genderValues = [Gender.Male, Gender.Female];
  
  workLocationValues = [
    WorkLocationType.OnSite,
    WorkLocationType.Remote,
    WorkLocationType.Hybrid
  ];
  
  Array = Array;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    EMPLOYEE_CREATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.CREATE}`,
    EMPLOYEE_READ: `${PermissionResources.EMPLOYEE}.${PermissionActions.READ}`,
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };

  constructor() {
    this.editForm = this.createFormGroup();
    this.searchForm = this.fb.group({
      search: [''],
      branchId: [''],
      departmentId: [''],
      isActive: [''],
      employmentStatus: ['']
    });
  }

  ngOnInit() {
    this.loadEmployees();
    this.loadBranches();
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      branchId: ['', []], // Add validators as needed
      employeeNumber: [''],
      firstName: [''],
      lastName: [''],
      firstNameAr: [''],
      lastNameAr: [''],
      nationalId: [''],
      email: [''],
      phone: [''],
      dateOfBirth: [''],
      gender: [''],
      hireDate: [''],
      employmentStatus: [EmploymentStatus.FullTime],
      jobTitle: [''],
      jobTitleAr: [''],
      departmentId: [''],
      managerEmployeeId: [''],
      workLocationType: [WorkLocationType.OnSite],
      photoUrl: ['']
    });
  }

  loadEmployees() {
    this.loading.set(true);
    const filter: EmployeesFilter = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.employeesService.getEmployees(filter).subscribe({
      next: (result) => {
        this.employees.set(result.items);
        this.totalCount.set(result.totalCount);
        this.totalPages.set(result.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load employees:', error);
        this.loading.set(false);
      }
    });
  }

  loadBranches() {
    this.employeesService.getBranches().subscribe({
      next: (result) => {
        this.branches.set(result.items);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
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
    } else {
      this.departments.set([]);
    }
  }

  onSearch() {
    this.currentFilter = { ...this.searchForm.value };
    this.currentPage.set(1);
    this.loadEmployees();
  }

  onClearFilters() {
    this.searchForm.reset();
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadEmployees();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadEmployees();
  }


  onShowEditModal(employee: EmployeeDto) {
    this.selectedEmployee.set(employee);
    this.editForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      firstNameAr: employee.firstNameAr,
      lastNameAr: employee.lastNameAr,
      email: employee.email,
      phone: employee.phone,
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender,
      employmentStatus: employee.employmentStatus,
      jobTitle: employee.jobTitle,
      jobTitleAr: employee.jobTitleAr,
      departmentId: employee.departmentId,
      managerEmployeeId: employee.managerEmployeeId,
      workLocationType: employee.workLocationType,
      photoUrl: employee.photoUrl
    });
    this.showEditModal.set(true);
  }

  onShowDeleteModal(employee: EmployeeDto) {
    this.selectedEmployee.set(employee);
    this.showDeleteModal.set(true);
  }

  onCloseModals() {
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedEmployee.set(null);
  }


  onUpdateEmployee() {
    const employee = this.selectedEmployee();
    if (this.editForm.valid && employee) {
      const request: UpdateEmployeeRequest = this.editForm.value;
      
      this.employeesService.updateEmployee(employee.id, request).subscribe({
        next: () => {
          this.onCloseModals();
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Failed to update employee:', error);
        }
      });
    }
  }

  onDeleteEmployee() {
    const employee = this.selectedEmployee();
    if (employee) {
      this.employeesService.deleteEmployee(employee.id).subscribe({
        next: () => {
          this.onCloseModals();
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Failed to delete employee:', error);
        }
      });
    }
  }

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

  getPaginationNumbers(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
}