import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { EmployeesService } from './employees.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import {
  EmployeeDto,
  EmployeesFilter
} from '../../shared/models/employee.model';
import { EmployeeFiltersComponent } from './employee-filters/employee-filters.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { ChangeShiftModalComponent } from './change-shift-modal/change-shift-modal.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, EmployeeFiltersComponent, EmployeeTableComponent, ChangeShiftModalComponent],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);
  private employeesService = inject(EmployeesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);

  // Signals
  employees = signal<EmployeeDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Modal states
  showChangeShiftModal = signal(false);
  selectedEmployee = signal<EmployeeDto | null>(null);

  // Filter
  currentFilter: EmployeesFilter = {};

  // Permission constants for use in template
  readonly PERMISSIONS = {
    EMPLOYEE_CREATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.CREATE}`,
    EMPLOYEE_READ: `${PermissionResources.EMPLOYEE}.${PermissionActions.READ}`,
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`
  };

  ngOnInit() {
    this.loadEmployees();
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

  // Filter event handlers
  onSearchChange(searchTerm: string) {
    this.currentFilter = { ...this.currentFilter, search: searchTerm };
    this.currentPage.set(1);
    this.loadEmployees();
  }

  onFiltersChange(filters: any) {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadEmployees();
  }

  onAddEmployee() {
    this.router.navigate(['/employees/create']);
  }

  // Table event handlers
  onViewEmployee(employee: EmployeeDto) {
    this.router.navigate(['/employees', employee.id, 'view']);
  }

  onEditEmployee(employee: EmployeeDto) {
    this.router.navigate(['/employees', employee.id, 'edit']);
  }

  async onDeleteEmployee(employee: EmployeeDto) {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('employees.delete_employee'),
      message: `Are you sure you want to delete "${employee.firstName} ${employee.lastName}"? This action cannot be undone.`,
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.employeesService.deleteEmployee(employee.id).subscribe({
        next: () => {
          this.loadEmployees();
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('employees.employee_deleted')
          );
        },
        error: (error) => {
          console.error('Failed to delete employee:', error);
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('errors.server')
          );
        }
      });
    }
  }

  onChangeShift(employee: EmployeeDto) {
    this.selectedEmployee.set(employee);
    this.showChangeShiftModal.set(true);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    this.loadEmployees();
  }

  onPageSizeChange(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadEmployees();
  }

  onSelectionChange(selectedEmployees: EmployeeDto[]) {
    // Handle bulk selection for future bulk operations
    console.log('Selected employees:', selectedEmployees);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.currentFilter = {
      ...this.currentFilter,
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    };
    this.currentPage.set(1);
    this.loadEmployees();
  }

  // Modal event handlers
  onShiftChanged(event: {employee: EmployeeDto, shiftData: any}) {
    this.employeesService.updateEmployeeShift(event.employee.id, event.shiftData).subscribe({
      next: () => {
        this.showChangeShiftModal.set(false);
        this.selectedEmployee.set(null);
        this.loadEmployees();
        this.notificationService.success(
          this.i18n.t('app.success'),
          'Employee shift updated successfully'
        );
      },
      error: (error) => {
        console.error('Failed to update employee shift:', error);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('errors.server')
        );
      }
    });
  }

  onCloseChangeShiftModal() {
    this.showChangeShiftModal.set(false);
    this.selectedEmployee.set(null);
  }
}