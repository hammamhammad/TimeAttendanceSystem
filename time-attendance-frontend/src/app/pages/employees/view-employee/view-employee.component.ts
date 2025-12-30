import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { EmployeesService } from '../employees.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { EmployeeDto, Gender, EmploymentStatus, WorkLocationType } from '../../../shared/models/employee.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { LeaveBalanceSummaryComponent } from '../../../shared/components/leave-balance-summary/leave-balance-summary.component';
import { LeaveTransactionHistoryComponent } from '../../../shared/components/leave-transaction-history/leave-transaction-history.component';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [FormsModule, HasPermissionDirective, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, EmptyStateComponent, DefinitionListComponent, LeaveBalanceSummaryComponent, LeaveTransactionHistoryComponent],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private employeesService = inject(EmployeesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  error = signal<string | null>(null);
  employee = signal<EmployeeDto | null>(null);
  employeeId: number = 0;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    EMPLOYEE_UPDATE: `${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`,
    EMPLOYEE_DELETE: `${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`,
    EMPLOYEE_MANAGE: `${PermissionResources.EMPLOYEE}.${PermissionActions.MANAGE}`,
    LEAVE_BALANCE_READ: `${PermissionResources.LEAVE_BALANCE}.${PermissionActions.READ}`
  };

  // Tab state for employee details
  activeTab = signal<'info' | 'leave-balance'>('info');

  ngOnInit() {
    this.employeeId = +this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.loadEmployee();
    } else {
      this.router.navigate(['/employees']);
    }
  }

  private loadEmployee() {
    this.loading.set(true);
    this.employeesService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        this.employee.set(employee);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set('Failed to load employee');
        this.loading.set(false);
        console.error('Error loading employee:', error);
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
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

  t(key: string): string {
    return this.i18n.t(key);
  }

  /**
   * Toggle employee active/inactive status
   */
  async toggleEmployeeStatus(): Promise<void> {
    const employee = this.employee();
    if (!employee) return;

    const isActive = employee.isActive;
    const actionKey = isActive ? 'employees.deactivate' : 'employees.activate';
    const confirmKey = isActive ? 'employees.confirm_deactivate' : 'employees.confirm_activate';

    const iconClass = isActive ? 'text-danger' : 'text-success';
    const confirmButtonClass = isActive ? 'btn-danger' : 'btn-success';

    const result = await this.confirmationService.confirm({
      title: this.t(actionKey),
      message: this.t(confirmKey),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: confirmButtonClass,
      icon: 'fa-user',
      iconClass: iconClass
    });

    if (result.confirmed) {
      this.employeesService.toggleEmployeeStatus(employee.id).subscribe({
        next: (response) => {
          this.notificationService.success(response.message);
          // Reload employee data to reflect the change
          this.loadEmployee();
        },
        error: (error) => {
          console.error('Error toggling employee status:', error);
          this.notificationService.error(
            error.error?.error || this.t('common.error_occurred')
          );
        }
      });
    }
  }

  async deleteEmployee() {
    const result = await this.confirmationService.confirm({
      title: this.t('employees.confirm_delete_title'),
      message: this.t('employees.confirm_delete_message'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.employeesService.deleteEmployee(this.employeeId).subscribe({
        next: () => {
          this.notificationService.success(this.t('employees.delete_success'));
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.notificationService.error(
            error.error?.error || this.t('common.error_occurred')
          );
        }
      });
    }
  }

  // Computed properties for definition lists
  basicInfoItems = computed<DefinitionItem[]>(() => {
    const employee = this.employee();
    if (!employee) return [];

    return [
      { label: this.t('employees.employee_number'), value: employee.employeeNumber },
      { label: this.t('employees.first_name'), value: employee.firstName },
      { label: this.t('employees.last_name'), value: employee.lastName },
      { label: this.t('employees.email'), value: employee.email || '-' },
      { label: this.t('employees.phone'), value: employee.phone || '-' },
      { label: this.t('employees.national_id'), value: employee.nationalId || '-' }
    ];
  });

  employmentInfoItems = computed<DefinitionItem[]>(() => {
    const employee = this.employee();
    if (!employee) return [];

    const items: DefinitionItem[] = [
      { label: this.t('employees.job_title'), value: employee.jobTitle },
      { label: this.t('employees.branch'), value: employee.branchName },
      { label: this.t('employees.department'), value: employee.departmentName || '-' },
      { label: this.t('employees.manager'), value: employee.managerName || '-' },
      { label: this.t('employees.hire_date'), value: this.formatDate(employee.hireDate), type: 'date' as const }
    ];

    if (employee.dateOfBirth) {
      items.push({
        label: this.t('employees.date_of_birth'),
        value: this.formatDate(employee.dateOfBirth),
        type: 'date' as const
      });
    }

    return items;
  });

}