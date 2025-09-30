import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeVacationsService } from './employee-vacations.service';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { EmployeeVacationTableComponent } from './employee-vacation-table/employee-vacation-table.component';
import { BulkVacationModalComponent } from './bulk-vacation-modal/bulk-vacation-modal.component';
import { EmployeeVacation, VacationQueryParams } from '../../shared/models/employee-vacation.model';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-employee-vacations',
  standalone: true,
  imports: [
    CommonModule,
    UnifiedFilterComponent,
    EmployeeVacationTableComponent,
    BulkVacationModalComponent,
    PageHeaderComponent
  ],
  templateUrl: './employee-vacations.component.html',
  styleUrls: ['./employee-vacations.component.css']
})
export class EmployeeVacationsComponent {
  private employeeVacationsService = inject(EmployeeVacationsService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);
  readonly permissionService = inject(PermissionService);

  // Signals for state management
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilters = signal<any>({});

  // Service signals
  vacations = this.employeeVacationsService.vacations;
  loading = this.employeeVacationsService.loading;
  pagedResult = this.employeeVacationsService.pagedResult;

  // Computed signals
  totalItems = computed(() => this.pagedResult()?.totalCount ?? 0);
  totalPages = computed(() => {
    const result = this.pagedResult();
    if (!result || result.pageSize === 0) return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  });

  // Permission constants
  readonly PERMISSIONS = {
    VACATION_READ: `${PermissionResources.VACATION}.${PermissionActions.READ}`,
    VACATION_CREATE: `${PermissionResources.VACATION}.${PermissionActions.CREATE}`,
    VACATION_UPDATE: `${PermissionResources.VACATION}.${PermissionActions.UPDATE}`,
    VACATION_DELETE: `${PermissionResources.VACATION}.${PermissionActions.DELETE}`,
    VACATION_BULK_CREATE: `${PermissionResources.VACATION}.${PermissionActions.BULK_CREATE}`
  };


  constructor() {
    this.loadVacations();
  }

  /**
   * Load employee vacations with current filter and pagination
   */
  private loadVacations(): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_READ)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    const queryParams: VacationQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilters()
    };

    this.employeeVacationsService.getVacations(queryParams).subscribe({
      error: (error) => {
        this.notificationService.error(this.i18n.t('employee_vacations.errors.load_failed'));
        console.error('Failed to load employee vacations:', error);
      }
    });
  }

  /**
   * Handle search and filter changes
   */
  onSearchChange(searchTerm: string): void {
    this.currentFilters.update(filters => ({
      ...filters,
      searchTerm: searchTerm || undefined
    }));
    this.currentPage.set(1);
    this.loadVacations();
  }

  onFiltersChange(filters: any): void {
    this.currentFilters.set(filters);
    this.currentPage.set(1);
    this.loadVacations();
  }

  onRefreshData(): void {
    // Reset filters and pagination
    this.currentFilters.set({});
    this.currentPage.set(1);

    // Reload data
    this.loadVacations();
  }

  /**
   * Handle page changes
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadVacations();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadVacations();
  }

  /**
   * Navigate to create employee vacation page
   */
  onAddVacation(): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_CREATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.router.navigate(['/employee-vacations/create']);
  }

  /**
   * Navigate to view employee vacation details
   */
  onViewVacation(vacation: EmployeeVacation): void {
    this.router.navigate(['/employee-vacations', vacation.id, 'view']);
  }

  /**
   * Navigate to edit employee vacation
   */
  onEditVacation(vacation: EmployeeVacation): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.router.navigate(['/employee-vacations', vacation.id, 'edit']);
  }

  /**
   * Toggle vacation approval status
   */
  onToggleStatus(vacation: EmployeeVacation): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    const action = vacation.isApproved ? 'reject' : 'approve';
    const message = this.i18n.t(`employee_vacations.confirm_${action}`)
      .replace('{{employee}}', vacation.employeeName);

    this.confirmationService.confirm({
      title: this.i18n.t(`employee_vacations.${action}_vacation`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: action === 'approve' ? 'btn-success' : 'btn-warning'
    } as ConfirmationConfig).then(result => {
      if (result.confirmed) {
        this.employeeVacationsService.toggleVacationStatus(vacation.id).subscribe({
          next: () => {
            const successMessage = vacation.isApproved
              ? this.i18n.t('employee_vacations.success.rejected')
              : this.i18n.t('employee_vacations.success.approved');
            this.notificationService.success(successMessage);
          },
          error: (error) => {
            console.error('Failed to toggle vacation status:', error);
            this.notificationService.error(this.i18n.t('employee_vacations.errors.status_toggle_failed'));
          }
        });
      }
    });
  }

  /**
   * Delete employee vacation
   */
  onDeleteVacation(vacation: EmployeeVacation): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_DELETE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.confirmationService.confirm({
      title: this.i18n.t('employee_vacations.delete_vacation'),
      message: this.i18n.t('employee_vacations.confirm_delete')
        .replace('{{employee}}', vacation.employeeName),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig).then(result => {
      if (result.confirmed) {
        this.employeeVacationsService.deleteVacation(vacation.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('employee_vacations.success.deleted'));
          },
          error: (error) => {
            console.error('Failed to delete vacation:', error);
            this.notificationService.error(this.i18n.t('employee_vacations.errors.delete_failed'));
          }
        });
      }
    });
  }


  /**
   * Open bulk vacation assignment modal
   */
  onBulkAssignVacation(): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_BULK_CREATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.router.navigate(['/employee-vacations/bulk-create']);
  }

  /**
   * Handle bulk vacation created
   */
  onBulkVacationCreated(): void {
    this.loadVacations();
  }
}