import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';

import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmployeeVacation } from '../../../shared/models/employee-vacation.model';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';

@Component({
  selector: 'app-employee-vacation-table',
  standalone: true,
  imports: [DataTableComponent],
  template: `
    <app-data-table
      [data]="vacations"
      [columns]="columns"
      [actions]="actions"
      [loading]="loading"
      [currentPage]="currentPage"
      [totalPages]="totalPages"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [emptyMessage]="i18n.t('employee_vacations.no_vacations_found')"
      (actionClick)="onActionClick($event)"
      (pageChange)="onPageChange($event)"
      (pageSizeChange)="onPageSizeChange($event)"
      (selectionChange)="onSelectionChange($event)"
      (sortChange)="onSortChange($event)">

      <ng-template #cellTemplate let-vacation let-column="column">
        @switch (column.key) {
          <!-- Employee name with avatar -->
          @case ('employee') {
            <div class="d-flex align-items-center">
              <div class="avatar-sm me-2">
                <div class="avatar-initial bg-primary text-white rounded-circle">
                  {{ getInitials(vacation.employeeName) }}
                </div>
              </div>
              <div>
                <div class="fw-medium">{{ vacation.employeeName }}</div>
                <small class="text-muted">{{ vacation.employeeNumber }}</small>
              </div>
            </div>
          }
          <!-- Vacation Type -->
          @case ('vacationType') {
            <span class="fw-medium">
              {{ vacation.vacationTypeName }}
            </span>
          }
          <!-- Start Date -->
          @case ('startDate') {
            <span>
              {{ formatDate(vacation.startDate) }}
            </span>
          }
          <!-- End Date -->
          @case ('endDate') {
            <span>
              {{ formatDate(vacation.endDate) }}
            </span>
          }
          <!-- Total Days -->
          @case ('totalDays') {
            <span class="badge bg-secondary">
              {{ vacation.totalDays }}
              {{ vacation.totalDays === 1 ? i18n.t('common.dayUnit') : i18n.t('common.days_text') }}
            </span>
          }
          <!-- Approval Status -->
          @case ('status') {
            <span
              class="badge"
              [class.bg-success]="vacation.isApproved"
              [class.bg-warning]="!vacation.isApproved">
              <i class="fas"
                [class.fa-check-circle]="vacation.isApproved"
              [class.fa-clock]="!vacation.isApproved"></i>
              {{ vacation.isApproved ? i18n.t('employee_vacations.approved') : i18n.t('employee_vacations.pending') }}
            </span>
          }
          <!-- Current Status -->
          @case ('currentStatus') {
            <span class="badge"
              [class]="getCurrentStatusClass(vacation)">
              {{ getCurrentStatusLabel(vacation) }}
            </span>
          }
          <!-- Notes -->
          @case ('notes') {
            <div>
              @if (vacation.notes) {
                <span>{{ vacation.notes }}</span>
              }
              @if (!vacation.notes) {
                <span class="text-muted">-</span>
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
export class EmployeeVacationTableComponent {
  i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() vacations: EmployeeVacation[] = [];
  @Input() loading: any;
  @Input() currentPage: any;
  @Input() totalPages: any;
  @Input() totalItems: any;
  @Input() pageSize: any;

  @Output() viewVacation = new EventEmitter<EmployeeVacation>();
  @Output() editVacation = new EventEmitter<EmployeeVacation>();
  @Output() deleteVacation = new EventEmitter<EmployeeVacation>();
  @Output() toggleStatus = new EventEmitter<EmployeeVacation>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() selectionChange = new EventEmitter<EmployeeVacation[]>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  columns: TableColumn[] = [];

  ngOnInit() {
    this.columns = [
      {
        key: 'employee',
        label: this.i18n.t('employee_vacations.employee'),
        width: '200px',
        sortable: true,
        priority: 'high',
        mobileLabel: this.i18n.t('employee_vacations.employee')
      },
      {
        key: 'vacationType',
        label: this.i18n.t('employee_vacations.vacation_type'),
        width: '150px',
        sortable: true,
        priority: 'high',
        mobileLabel: this.i18n.t('common.type')
      },
      {
        key: 'startDate',
        label: this.i18n.t('employee_vacations.start_date'),
        width: '120px',
        sortable: true,
        priority: 'medium',
        hideOnMobile: false,
        mobileLabel: this.i18n.t('employee_vacations.start_date')
      },
      {
        key: 'endDate',
        label: this.i18n.t('employee_vacations.end_date'),
        width: '120px',
        sortable: true,
        priority: 'medium',
        hideOnMobile: false,
        mobileLabel: this.i18n.t('employee_vacations.end_date')
      },
      {
        key: 'totalDays',
        label: this.i18n.t('employee_vacations.total_days'),
        width: '100px',
        align: 'center',
        sortable: true,
        priority: 'medium',
        hideOnMobile: true,
        mobileLabel: this.i18n.t('common.days_text')
      },
      {
        key: 'status',
        label: this.i18n.t('common.status'),
        width: '100px',
        align: 'center',
        sortable: true,
        priority: 'high',
        mobileLabel: this.i18n.t('common.status')
      },
      {
        key: 'currentStatus',
        label: this.i18n.t('employee_vacations.current_status'),
        width: '120px',
        align: 'center',
        priority: 'medium',
        hideOnMobile: true,
        mobileLabel: this.i18n.t('employee_vacations.current_status')
      },
      {
        key: 'notes',
        label: this.i18n.t('employee_vacations.notes'),
        width: '150px',
        priority: 'low',
        hideOnMobile: true,
        mobileLabel: this.i18n.t('employee_vacations.notes')
      }
    ];
  }

  get actions(): TableAction[] {
    const actions: TableAction[] = [];

    if (this.permissionService.has(`${PermissionResources.VACATION}.${PermissionActions.READ}`)) {
      actions.push({
        key: 'view',
        label: this.i18n.t('common.view'),
        icon: 'fa-eye',
        color: 'info'
      });
    }

    if (this.permissionService.has(`${PermissionResources.VACATION}.${PermissionActions.UPDATE}`)) {
      actions.push({
        key: 'edit',
        label: this.i18n.t('common.edit'),
        icon: 'fa-edit',
        color: 'primary'
      });

      actions.push({
        key: 'toggleStatus',
        label: this.i18n.t('employee_vacations.toggle_status'),
        icon: 'fa-toggle-on',
        color: 'warning'
      });
    }

    if (this.permissionService.has(`${PermissionResources.VACATION}.${PermissionActions.DELETE}`)) {
      actions.push({
        key: 'delete',
        label: this.i18n.t('common.delete'),
        icon: 'fa-trash',
        color: 'danger'
      });
    }

    return actions;
  }

  onActionClick(event: {action: string, item: EmployeeVacation}) {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewVacation.emit(item);
        break;
      case 'edit':
        this.editVacation.emit(item);
        break;
      case 'delete':
        this.deleteVacation.emit(item);
        break;
      case 'toggleStatus':
        this.toggleStatus.emit(item);
        break;
    }
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number) {
    this.pageSizeChange.emit(size);
  }

  onSelectionChange(selectedVacations: EmployeeVacation[]) {
    this.selectionChange.emit(selectedVacations);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}) {
    this.sortChange.emit(sortEvent);
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length >= 2) {
      return nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  }

  getCurrentStatusLabel(vacation: EmployeeVacation): string {
    if (vacation.isCurrentlyActive) {
      return this.i18n.t('employee_vacations.active');
    } else if (vacation.isUpcoming) {
      return this.i18n.t('employee_vacations.upcoming');
    } else if (this.isVacationPeriodActive(vacation) && !vacation.isApproved) {
      return this.i18n.t('employee_vacations.pending');
    } else {
      return this.i18n.t('employee_vacations.past');
    }
  }

  getCurrentStatusClass(vacation: EmployeeVacation): string {
    if (vacation.isCurrentlyActive) {
      return 'bg-success';
    } else if (vacation.isUpcoming) {
      return 'bg-info';
    } else if (this.isVacationPeriodActive(vacation) && !vacation.isApproved) {
      return 'bg-warning';
    } else {
      return 'bg-light text-dark border';
    }
  }

  private isVacationPeriodActive(vacation: EmployeeVacation): boolean {
    const today = new Date();
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);

    // Set time to beginning of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    return startDate <= today && endDate >= today;
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
