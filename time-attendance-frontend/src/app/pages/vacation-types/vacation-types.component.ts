import { Component, OnInit, signal, computed, inject, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { VacationTypesService } from './vacation-types.service';
import {
  VacationTypeDto,
  VacationTypesQueryParams,
  VacationTypeFilter,
  VacationTypeDetailDto
} from '../../shared/models/vacation-type.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { VacationTypeModalComponent } from './vacation-type-modal/vacation-type-modal.component';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';

interface Branch {
  id: number;
  name: string;
}


@Component({
  selector: 'app-vacation-types',
  standalone: true,
  imports: [CommonModule, VacationTypeModalComponent, DataTableComponent],
  templateUrl: './vacation-types.component.html',
  styleUrls: ['./vacation-types.component.css']
})
export class VacationTypesComponent implements OnInit {
  private vacationTypesService = inject(VacationTypesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  @ViewChild(VacationTypeModalComponent) vacationTypeModal!: VacationTypeModalComponent;

  // Signals for state management
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  selectedBranchId = signal<number | null>(null);
  selectedStatus = signal<boolean | null>(null);

  // Available options for filters
  availableBranches = signal<Branch[]>([]);

  // Service signals
  vacationTypes = this.vacationTypesService.vacationTypes;
  pagedResult = this.vacationTypesService.pagedResult;
  error = this.vacationTypesService.error;

  // Table configuration
  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('vacation_types.name'), sortable: true, width: '30%' },
    { key: 'branchName', label: this.i18n.t('vacation_types.branch'), sortable: true, width: '25%' },
    { key: 'isActive', label: this.i18n.t('vacation_types.column_status'), width: '15%' },
    { key: 'createdAtUtc', label: this.i18n.t('vacation_types.created_at'), sortable: true, width: '20%' }
  ];

  // Table actions configuration
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary'
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (item: VacationTypeDto) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)
    },
    {
      key: 'toggle',
      label: this.i18n.t('common.activate'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: VacationTypeDto) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE) && !item.isActive
    },
    {
      key: 'toggle',
      label: this.i18n.t('common.deactivate'),
      icon: 'fa-ban',
      color: 'warning',
      condition: (item: VacationTypeDto) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE) && item.isActive
    },
    {
      key: 'delete',
      label: this.i18n.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (item: VacationTypeDto) => this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE)
    }
  ];

  // Computed signals
  totalItems = computed(() => this.pagedResult()?.totalCount ?? 0);
  totalPages = computed(() => {
    const result = this.pagedResult();
    if (!result || result.pageSize === 0) return 1;
    return Math.ceil(result.totalCount / result.pageSize);
  });

  // Current filter as computed signal
  currentFilter = computed((): VacationTypeFilter => ({
    search: this.searchTerm() || undefined,
    branchId: this.selectedBranchId() ?? undefined,
    isActive: this.selectedStatus() ?? undefined
  }));


  // Permission constants
  readonly PERMISSIONS = {
    VACATION_TYPE_READ: `${PermissionResources.VACATION_TYPE}.${PermissionActions.READ}`,
    VACATION_TYPE_CREATE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.CREATE}`,
    VACATION_TYPE_UPDATE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.UPDATE}`,
    VACATION_TYPE_DELETE: `${PermissionResources.VACATION_TYPE}.${PermissionActions.DELETE}`
  };

  // Math reference for template use
  protected readonly Math = Math;

  constructor() {
    // Effect to reload data when filter changes
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const size = this.pageSize();

      this.loadVacationTypes({
        page,
        pageSize: size,
        ...filter
      });
    });
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadVacationTypes();
  }

  /**
   * Load vacation types with current filter and pagination
   */
  loadVacationTypes(params?: VacationTypesQueryParams): void {
    this.loading.set(true);

    const queryParams: VacationTypesQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter(),
      ...params
    };

    this.vacationTypesService.getVacationTypes(queryParams).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.notificationService.error(this.i18n.t('vacation_types.errors.load_failed'));
        console.error('Failed to load vacation types:', error);
      }
    });
  }

  /**
   * Load available branches for filtering
   */
  private loadBranches(): void {
    this.vacationTypesService.getBranches().subscribe({
      next: (branches) => {
        this.availableBranches.set(branches);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.notificationService.error(this.i18n.t('branches.errors.load_failed'));
      }
    });
  }

  /**
   * Handle search input changes
   */
  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1); // Reset to first page when searching
  }

  /**
   * Handle branch filter change
   */
  onBranchChange(branchId: number | null): void {
    this.selectedBranchId.set(branchId);
    this.currentPage.set(1);
  }

  /**
   * Handle status filter change
   */
  onStatusChange(isActive: boolean | null): void {
    this.selectedStatus.set(isActive);
    this.currentPage.set(1);
  }


  /**
   * Clear all filters
   */
  onClearFilters(): void {
    this.searchTerm.set('');
    this.selectedBranchId.set(null);
    this.selectedStatus.set(null);
    this.currentPage.set(1);
  }

  /**
   * Handle page change
   */
  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  /**
   * Handle page size change
   */
  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
  }

  /**
   * Open create vacation type modal
   */
  onCreateVacationType(): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_CREATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.vacationTypeModal.openModal(undefined, 'create');
  }

  /**
   * View vacation type details
   */
  onViewVacationType(vacationType: VacationTypeDto): void {
    // Convert VacationTypeDto to VacationTypeDetailDto for viewing
    const vacationTypeDetail: VacationTypeDetailDto = {
      ...vacationType,
      canBeModified: true,
      canBeDeleted: true
    };

    this.vacationTypeModal.openModal(vacationTypeDetail, 'view');
  }

  /**
   * Edit vacation type
   */
  onEditVacationType(vacationType: VacationTypeDto): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    // Convert VacationTypeDto to VacationTypeDetailDto for editing
    const vacationTypeDetail: VacationTypeDetailDto = {
      ...vacationType,
      canBeModified: true,
      canBeDeleted: true
    };

    this.vacationTypeModal.openModal(vacationTypeDetail, 'edit');
  }

  /**
   * Toggle vacation type status
   */
  onToggleStatus(vacationType: VacationTypeDto): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_UPDATE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    const action = vacationType.isActive ? 'deactivate' : 'activate';
    const message = this.i18n.t(`vacation_types.confirm_${action}`).replace('{{name}}', vacationType.name);

    this.confirmationService.confirm({
      title: this.i18n.t(`vacation_types.${action}_vacation_type`),
      message,
      confirmText: this.i18n.t(`common.${action}`),
      cancelText: this.i18n.t('common.cancel')
    }).then(result => {
      if (result.confirmed) {
        this.vacationTypesService.toggleVacationTypeStatus(vacationType.id).subscribe({
          next: () => {
            const successMessage = vacationType.isActive
              ? this.i18n.t('vacation_types.success.deactivated')
              : this.i18n.t('vacation_types.success.activated');
            this.notificationService.success(successMessage);
          },
          error: (error) => {
            console.error('Failed to toggle vacation type status:', error);
            this.notificationService.error(this.i18n.t('vacation_types.errors.status_toggle_failed'));
          }
        });
      }
    });
  }

  /**
   * Delete vacation type
   */
  onDeleteVacationType(vacationType: VacationTypeDto): void {
    if (!this.permissionService.has(this.PERMISSIONS.VACATION_TYPE_DELETE)) {
      this.notificationService.error(this.i18n.t('common.errors.insufficient_permissions'));
      return;
    }

    this.confirmationService.confirm({
      title: this.i18n.t('vacation_types.delete_vacation_type'),
      message: this.i18n.t('vacation_types.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    }).then(result => {
      if (result.confirmed) {
        this.vacationTypesService.deleteVacationType(vacationType.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('vacation_types.success.deleted'));
          },
          error: (error) => {
            console.error('Failed to delete vacation type:', error);
            this.notificationService.error(this.i18n.t('vacation_types.errors.delete_failed'));
          }
        });
      }
    });
  }

  /**
   * Handle table actions
   */
  onTableAction(event: {action: string, item: VacationTypeDto}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewVacationType(item);
        break;
      case 'edit':
        this.onEditVacationType(item);
        break;
      case 'toggle':
        this.onToggleStatus(item);
        break;
      case 'delete':
        this.onDeleteVacationType(item);
        break;
    }
  }

  /**
   * Get badge class for status
   */
  getStatusBadgeClass(isActive: boolean): string {
    return isActive ? 'bg-success' : 'bg-secondary';
  }

  /**
   * Get status text
   */
  getStatusText(isActive: boolean): string {
    return isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive');
  }

  /**
   * Handle vacation type created
   */
  onVacationTypeCreated(): void {
    this.loadVacationTypes();
  }

  /**
   * Handle vacation type updated
   */
  onVacationTypeUpdated(): void {
    this.loadVacationTypes();
  }

}