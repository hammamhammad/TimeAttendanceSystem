import { Component, OnInit, signal, inject, computed } from '@angular/core';

import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn, TableAction } from '../../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { LeaveEntitlement } from '../../../../shared/models/leave-balance.model';
import { EmployeesService } from '../../../employees/employees.service';
import { VacationTypesService } from '../../../vacation-types/vacation-types.service';

/**
 * Component for displaying and managing leave entitlements list.
 * Shows annual leave allocations per employee per vacation type.
 */
@Component({
  selector: 'app-leave-entitlements-list',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    PageHeaderComponent
],
  templateUrl: './leave-entitlements-list.component.html',
  styleUrls: ['./leave-entitlements-list.component.css']
})
export class LeaveEntitlementsListComponent implements OnInit {
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private notificationService = inject(NotificationService);
  private employeesService = inject(EmployeesService);
  private vacationTypesService = inject(VacationTypesService);
  public permissionService = inject(PermissionService);
  public i18n = inject(I18nService);

  // Permission constants
  readonly PERMISSIONS = {
    LEAVE_BALANCE_CREATE: 'leaveBalance.create',
    LEAVE_BALANCE_READ: 'leaveBalance.read',
    LEAVE_BALANCE_UPDATE: 'leaveBalance.update',
    LEAVE_BALANCE_DELETE: 'leaveBalance.delete'
  };

  // State signals
  entitlements = signal<LeaveEntitlement[]>([]);
  loading = signal<boolean>(false);
  totalCount = signal<number>(0);
  currentPage = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = signal<number>(0);

  selectedYear = signal<number>(new Date().getFullYear());
  selectedEmployeeId = signal<number | null>(null);
  selectedVacationTypeId = signal<number | null>(null);

  // Filter options
  employees = signal<Array<{id: number, name: string}>>([]);
  vacationTypes = signal<Array<{id: number, name: string}>>([]);
  availableYears = signal<number[]>([]);

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'employeeCode',
      label: this.t('employees.employeeCode'),
      sortable: true,
      width: '120px',
      priority: 'high',
      mobileLabel: this.t('employees.employeeCode')
    },
    {
      key: 'employeeName',
      label: this.t('employees.employeeName'),
      sortable: true,
      width: '180px',
      priority: 'high',
      mobileLabel: this.t('employees.employeeName')
    },
    {
      key: 'vacationTypeName',
      label: this.t('vacationTypes.vacationType'),
      sortable: false,
      width: '150px',
      priority: 'high',
      mobileLabel: this.t('vacationTypes.vacationType')
    },
    {
      key: 'year',
      label: this.t('leaveBalance.year'),
      sortable: true,
      width: '80px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('leaveBalance.year')
    },
    {
      key: 'annualDays',
      label: this.t('leaveBalance.annualDays'),
      sortable: false,
      width: '110px',
      align: 'right',
      priority: 'medium',
      mobileLabel: this.t('leaveBalance.annualDays')
    },
    {
      key: 'carryOverDays',
      label: this.t('leaveBalance.carryOverDays'),
      sortable: false,
      width: '120px',
      align: 'right',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('leaveBalance.carryOverDays')
    },
    {
      key: 'expiresStatus',
      label: this.t('leaveBalance.expiresAtYearEnd'),
      sortable: false,
      width: '130px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('leaveBalance.expiresAtYearEnd'),
      renderHtml: true
    },
    {
      key: 'notes',
      label: this.t('common.notes'),
      sortable: false,
      width: '150px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('common.notes')
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-pencil',
      color: 'primary',
      condition: () => this.permissionService.has(this.PERMISSIONS.LEAVE_BALANCE_UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.has(this.PERMISSIONS.LEAVE_BALANCE_DELETE)
    }
  ]);

  // Transform entitlements data for data table
  tableData = computed(() => {
    return this.entitlements().map(entitlement => ({
      ...entitlement,
      expiresStatus: this.formatExpiresStatus(entitlement.expiresAtYearEnd),
      notes: entitlement.notes || '-'
    }));
  });

  ngOnInit(): void {
    this.loadFilterOptions();
    this.loadEntitlements();
    this.generateAvailableYears();
  }

  /**
   * Loads filter options (employees and vacation types).
   */
  private loadFilterOptions(): void {
    // Load employees dropdown
    this.employeesService.getEmployees({ pageSize: 1000 }).subscribe({
      next: (result) => {
        this.employees.set(result.items.map(emp => ({
          id: emp.id,
          name: emp.fullName
        })));
      },
      error: (error) => {
        console.error('Failed to load employees', error);
      }
    });

    // Load vacation types dropdown
    this.vacationTypesService.getVacationTypes({ pageSize: 1000 }).subscribe({
      next: (result) => {
        this.vacationTypes.set(result.items.map(vt => ({
          id: vt.id,
          name: vt.name
        })));
      },
      error: (error) => {
        console.error('Failed to load vacation types', error);
      }
    });
  }

  /**
   * Generates list of available years (current year ± 2 years).
   */
  private generateAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = -2; i <= 2; i++) {
      years.push(currentYear + i);
    }
    this.availableYears.set(years);
  }

  /**
   * Loads leave entitlements based on current filters.
   */
  loadEntitlements(): void {
    this.loading.set(true);

    // TODO: Replace with actual API call when backend endpoint is ready
    // For now, using mock data for demonstration
    setTimeout(() => {
      const mockEntitlements: LeaveEntitlement[] = [
        {
          id: 1,
          employeeId: 1,
          employeeName: 'John Doe',
          employeeCode: 'EMP001',
          vacationTypeId: 1,
          vacationTypeName: 'Annual Leave',
          year: this.selectedYear(),
          annualDays: 30,
          carryOverDays: 5,
          maxCarryOverDays: 10,
          expiresAtYearEnd: false,
          effectiveStartDate: `${this.selectedYear()}-01-01`,
          effectiveEndDate: `${this.selectedYear()}-12-31`,
          notes: 'Standard annual leave entitlement'
        },
        {
          id: 2,
          employeeId: 1,
          employeeName: 'John Doe',
          employeeCode: 'EMP001',
          vacationTypeId: 2,
          vacationTypeName: 'Sick Leave',
          year: this.selectedYear(),
          annualDays: 15,
          carryOverDays: 0,
          maxCarryOverDays: null,
          expiresAtYearEnd: true,
          effectiveStartDate: `${this.selectedYear()}-01-01`,
          effectiveEndDate: `${this.selectedYear()}-12-31`,
          notes: null
        }
      ];

      // Apply filters
      let filtered = mockEntitlements.filter(e => e.year === this.selectedYear());

      if (this.selectedEmployeeId()) {
        filtered = filtered.filter(e => e.employeeId === this.selectedEmployeeId());
      }

      if (this.selectedVacationTypeId()) {
        filtered = filtered.filter(e => e.vacationTypeId === this.selectedVacationTypeId());
      }

      this.entitlements.set(filtered);
      this.loading.set(false);
    }, 500);
  }

  /**
   * Navigates to create entitlement form.
   */
  createEntitlement(): void {
    this.router.navigate(['/settings/leave-entitlements/create']);
  }

  /**
   * Navigates to edit entitlement form.
   */
  editEntitlement(entitlement: LeaveEntitlement): void {
    this.router.navigate(['/settings/leave-entitlements/edit', entitlement.id]);
  }

  /**
   * Deletes a leave entitlement after confirmation.
   */
  async deleteEntitlement(entitlement: LeaveEntitlement): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('leaveBalance.deleteEntitlementTitle'),
      message: this.i18n.t('leaveBalance.deleteEntitlementMessage', {
        employee: entitlement.employeeName,
        vacationType: entitlement.vacationTypeName,
        year: entitlement.year.toString()
      }),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });

    if (result.confirmed) {
      // TODO: Implement actual delete API call
      this.notificationService.success(this.i18n.t('leaveBalance.entitlementDeleted'));
      this.loadEntitlements();
    }
  }

  /**
   * Filters entitlements by year.
   */
  onYearChange(): void {
    this.loadEntitlements();
  }

  /**
   * Filters entitlements by employee.
   */
  onEmployeeChange(): void {
    this.loadEntitlements();
  }

  /**
   * Filters entitlements by vacation type.
   */
  onVacationTypeChange(): void {
    this.loadEntitlements();
  }

  /**
   * Clears all filters.
   */
  clearFilters(): void {
    this.selectedYear.set(new Date().getFullYear());
    this.selectedEmployeeId.set(null);
    this.selectedVacationTypeId.set(null);
    this.loadEntitlements();
  }

  /**
   * Opens bulk upload modal.
   */
  openBulkUpload(): void {
    // TODO: Implement bulk upload modal
    this.notificationService.info('Bulk upload feature coming soon');
  }

  /**
   * Translation helper method.
   */
  t(key: string): string {
    return this.i18n.t(key);
  }

  /**
   * Formats expires at year end status.
   */
  formatExpiresStatus(expiresAtYearEnd: boolean): string {
    const text = expiresAtYearEnd ? this.t('common.yes') : this.t('common.no');
    const badgeClass = expiresAtYearEnd ? 'badge bg-warning' : 'badge bg-success';
    return `<span class="${badgeClass}">${text}</span>`;
  }

  /**
   * Data table action handler.
   */
  onActionClick(event: { action: string, item: LeaveEntitlement }): void {
    const { action, item } = event;

    switch (action) {
      case 'edit':
        this.editEntitlement(item);
        break;
      case 'delete':
        this.deleteEntitlement(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Pagination handlers.
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadEntitlements();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadEntitlements();
  }

  /**
   * Check if any filters are active.
   */
  hasActiveFilters(): boolean {
    return !!(
      this.selectedEmployeeId() !== null ||
      this.selectedVacationTypeId() !== null
    );
  }
}
