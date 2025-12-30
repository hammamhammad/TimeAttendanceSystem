import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';

import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmployeeDto, EmploymentStatus, Gender, WorkLocationType } from '../../../shared/models/employee.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [DataTableComponent, StatusBadgeComponent],
  template: `
    <app-data-table
      [data]="employees"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="'No employees found'"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">
    
      <ng-template #cellTemplate let-employee let-column="column">
        @switch (column.key) {
          <!-- Employee name with avatar -->
          @case ('name') {
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <div class="avatar-initial bg-primary text-white rounded-circle">
                  {{ getInitials(employee.firstName, employee.lastName) }}
                </div>
              </div>
              <div>
                <div class="fw-medium">{{ employee.firstName }} {{ employee.lastName }}</div>
                <small class="text-muted">{{ employee.email }}</small>
              </div>
            </div>
          }
          <!-- Employee Code -->
          @case ('employeeCode') {
            <span class="fw-medium">
              {{ employee.employeeNumber }}
            </span>
          }
          <!-- Department with branch -->
          @case ('department') {
            <div>
              <div>{{ employee.departmentName }}</div>
              <small class="text-muted">{{ employee.branchName }}</small>
            </div>
          }
          <!-- Employment status with badge -->
          @case ('employmentStatus') {
            <span>
              <app-status-badge
                [status]="getEmploymentStatusBadgeStatus(employee.employmentStatus)"
                [label]="getEmploymentStatusLabel(employee.employmentStatus)">
              </app-status-badge>
            </span>
          }
          <!-- Gender -->
          @case ('gender') {
            <span>
              {{ getGenderLabel(employee.gender) }}
            </span>
          }
          <!-- Work location -->
          @case ('workLocation') {
            <span>
              <app-status-badge
                [status]="'info'"
                [label]="getWorkLocationLabel(employee.workLocationType)">
              </app-status-badge>
            </span>
          }
          <!-- Status -->
          @case ('status') {
            <span>
              <app-status-badge
                [status]="employee.isActive ? 'active' : 'inactive'"
                [label]="employee.isActive ? 'Active' : 'Inactive'"
                [showIcon]="true">
              </app-status-badge>
            </span>
          }
          <!-- Hire date -->
          @case ('hireDate') {
            <span>
              {{ formatDate(employee.hireDate) }}
            </span>
          }
          <!-- Current shift -->
          @case ('shift') {
            <div>
              @if (employee.currentShiftName) {
                <div>{{ employee.currentShiftName }}</div>
              }
              @if (!employee.currentShiftName) {
                <span class="text-muted">No shift assigned</span>
              }
            </div>
          }
        }
      </ng-template>
    </app-data-table>
    `,
  styles: [`
    .avatar-sm {
      width: 2rem;
      height: 2rem;
    }

    .avatar-initial {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 0.875rem;
      font-weight: 600;
    }
  `]
})
export class EmployeeTableComponent {
  private i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() employees: EmployeeDto[] = [];
  @Input() loading = signal(false);
  @Input() currentPage = signal(1);
  @Input() totalPages = signal(1);
  @Input() totalItems = signal(0);
  @Input() pageSize = signal(10);

  @Output() viewEmployee = new EventEmitter<EmployeeDto>();
  @Output() editEmployee = new EventEmitter<EmployeeDto>();
  @Output() deleteEmployee = new EventEmitter<EmployeeDto>();
  @Output() changeShift = new EventEmitter<EmployeeDto>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<EmployeeDto[]>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Employee',
      width: '250px',
      sortable: true,
      priority: 'high',
      mobileLabel: 'Employee'
    },
    {
      key: 'employeeCode',
      label: 'Code',
      width: '100px',
      sortable: true,
      priority: 'high',
      mobileLabel: 'Code'
    },
    {
      key: 'department',
      label: 'Department',
      width: '200px',
      sortable: true,
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: 'Dept'
    },
    {
      key: 'employmentStatus',
      label: 'Employment',
      width: '120px',
      align: 'center',
      sortable: true,
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: 'Status'
    },
    {
      key: 'workLocation',
      label: 'Location',
      width: '100px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: 'Location'
    },
    {
      key: 'shift',
      label: 'Current Shift',
      width: '150px',
      priority: 'medium',
      hideOnMobile: false,
      mobileLabel: 'Shift'
    },
    {
      key: 'hireDate',
      label: 'Hire Date',
      width: '120px',
      sortable: true,
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: 'Hired'
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      align: 'center',
      sortable: true,
      priority: 'high',
      mobileLabel: 'Status'
    }
  ];

  get actions(): TableAction[] {
    const actions: TableAction[] = [];

    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.READ}`)) {
      actions.push({
        key: 'view',
        label: 'View',
        icon: 'fa-eye',
        color: 'info'
      });
    }

    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: 'edit',
        label: 'Edit',
        icon: 'fa-edit',
        color: 'primary'
      });

      actions.push({
        key: 'changeShift',
        label: 'Change Shift',
        icon: 'fa-clock',
        color: 'warning'
      });
    }

    if (this.permissionService.has(`${PermissionResources.EMPLOYEE}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: 'delete',
        label: 'Delete',
        icon: 'fa-trash',
        color: 'danger'
      });
    }

    return actions;
  }

  onActionClick(event: {action: string, item: EmployeeDto}) {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewEmployee.emit(item);
        break;
      case 'edit':
        this.editEmployee.emit(item);
        break;
      case 'delete':
        this.deleteEmployee.emit(item);
        break;
      case 'changeShift':
        this.changeShift.emit(item);
        break;
    }
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onSelectionChange(selectedEmployees: EmployeeDto[]) {
    this.selectionChange.emit(selectedEmployees);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.sortChange.emit(sortEvent);
  }

  getInitials(firstName: string, lastName: string): string {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last;
  }

  getEmploymentStatusLabel(status: EmploymentStatus): string {
    const statusMap: { [key: number]: string } = {
      [EmploymentStatus.Active]: 'Active',
      [EmploymentStatus.FullTime]: 'Full Time',
      [EmploymentStatus.PartTime]: 'Part Time',
      [EmploymentStatus.Contract]: 'Contract',
      [EmploymentStatus.Intern]: 'Intern',
      [EmploymentStatus.Consultant]: 'Consultant',
      [EmploymentStatus.Terminated]: 'Terminated',
      [EmploymentStatus.Inactive]: 'Inactive'
    };
    return statusMap[status] || 'Unknown';
  }

  getEmploymentStatusClass(status: EmploymentStatus): string {
    const classMap: { [key: number]: string } = {
      [EmploymentStatus.Active]: 'bg-success',
      [EmploymentStatus.FullTime]: 'bg-success',
      [EmploymentStatus.PartTime]: 'bg-info',
      [EmploymentStatus.Contract]: 'bg-warning',
      [EmploymentStatus.Intern]: 'bg-primary',
      [EmploymentStatus.Consultant]: 'bg-light text-dark border',
      [EmploymentStatus.Terminated]: 'bg-danger',
      [EmploymentStatus.Inactive]: 'bg-light text-dark border'
    };
    return classMap[status] || 'bg-light text-dark border';
  }

  getEmploymentStatusBadgeStatus(status: EmploymentStatus): 'success' | 'info' | 'warning' | 'primary' | 'danger' | 'secondary' {
    const statusMap: { [key: number]: 'success' | 'info' | 'warning' | 'primary' | 'danger' | 'secondary' } = {
      [EmploymentStatus.Active]: 'success',
      [EmploymentStatus.FullTime]: 'success',
      [EmploymentStatus.PartTime]: 'info',
      [EmploymentStatus.Contract]: 'warning',
      [EmploymentStatus.Intern]: 'primary',
      [EmploymentStatus.Consultant]: 'secondary',
      [EmploymentStatus.Terminated]: 'danger',
      [EmploymentStatus.Inactive]: 'secondary'
    };
    return statusMap[status] || 'secondary';
  }

  getGenderLabel(gender: Gender): string {
    return gender === Gender.Male ? 'Male' : 'Female';
  }

  getWorkLocationLabel(type: WorkLocationType): string {
    const typeMap = {
      [WorkLocationType.OnSite]: 'On-site',
      [WorkLocationType.Remote]: 'Remote',
      [WorkLocationType.Hybrid]: 'Hybrid'
    };
    return typeMap[type] || 'Unknown';
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) return '';

    // Parse date string as "YYYY-MM-DD" without timezone conversion
    // This prevents the date from shifting by one day due to timezone differences
    const dateMatch = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      // Create date using local timezone to prevent shifting
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString();
    }

    // Fallback for other date formats
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}