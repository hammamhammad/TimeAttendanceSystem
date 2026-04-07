import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { AllowanceService } from '../../../core/services/allowance.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { AllowanceType } from '../../../shared/models/allowance.model';

@Component({
  selector: 'app-allowance-types',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    UnifiedFilterComponent,
    PageHeaderComponent
  ],
  templateUrl: './allowance-types.component.html',
  styleUrls: ['./allowance-types.component.css']
})
export class AllowanceTypesComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    CREATE: 'allowanceType.create',
    READ: 'allowanceType.read',
    UPDATE: 'allowanceType.update',
    DELETE: 'allowanceType.delete'
  };

  loading = signal(false);
  allowanceTypes = signal<AllowanceType[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  selectedBranchId = signal<number | undefined>(undefined);
  selectedActiveStatus = signal<boolean | undefined>(undefined);

  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'code',
      label: this.t('allowance_types.code'),
      sortable: true,
      width: '120px',
      priority: 'high',
      mobileLabel: this.t('allowance_types.code')
    },
    {
      key: 'name',
      label: this.t('common.name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('common.name')
    },
    {
      key: 'categoryBadge',
      label: this.t('allowance_types.category'),
      sortable: false,
      width: '140px',
      priority: 'medium',
      mobileLabel: this.t('allowance_types.category'),
      renderHtml: true
    },
    {
      key: 'calcTypeBadge',
      label: this.t('allowance_types.default_calculation_type'),
      sortable: false,
      width: '160px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('allowance_types.default_calculation_type'),
      renderHtml: true
    },
    {
      key: 'defaultAmountDisplay',
      label: this.t('allowance_types.default_amount'),
      sortable: true,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('allowance_types.default_amount')
    },
    {
      key: 'taxableBadge',
      label: this.t('allowance_types.is_taxable'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('allowance_types.is_taxable'),
      renderHtml: true
    },
    {
      key: 'statusBadge',
      label: this.t('common.status'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('common.status'),
      renderHtml: true
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => this.permissionService.has(this.PERMISSIONS.READ)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.has(this.PERMISSIONS.UPDATE)
    },
    {
      key: 'toggleStatus',
      label: this.t('common.toggle_status'),
      icon: 'fa-toggle-on',
      color: 'warning',
      condition: () => this.permissionService.has(this.PERMISSIONS.UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.has(this.PERMISSIONS.DELETE)
    }
  ]);

  tableData = computed(() => {
    return this.allowanceTypes().map(item => ({
      ...item,
      categoryBadge: this.formatCategory(item.category),
      calcTypeBadge: this.formatCalcType(item.defaultCalculationType),
      defaultAmountDisplay: this.formatDefaultAmount(item),
      taxableBadge: this.formatBoolean(item.isTaxable),
      statusBadge: this.formatStatus(item.isActive)
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadData(): void {
    this.loading.set(true);

    this.allowanceService.getAllowanceTypes(
      this.currentPage(),
      this.pageSize(),
      this.selectedBranchId(),
      this.selectedActiveStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.allowanceTypes.set(response.data);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(Math.ceil((response.totalCount || 0) / this.pageSize()));
        } else {
          this.allowanceTypes.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load allowance types:', error);
        this.loading.set(false);
        this.notificationService.error(this.t('app.error'), this.t('allowance_types.load_error'));
      }
    });
  }

  formatCategory(category: string): string {
    const key = `allowance_types.category_${category.toLowerCase()}`;
    const label = this.t(key);
    let badgeClass = 'badge bg-primary';
    if (category === 'Deduction') badgeClass = 'badge bg-danger';
    else if (category === 'Benefit') badgeClass = 'badge bg-info';
    return `<span class="${badgeClass}">${label}</span>`;
  }

  formatCalcType(calcType: string): string {
    let key = 'allowance_types.calc_fixed';
    if (calcType === 'PercentageOfBasic') key = 'allowance_types.calc_percent_basic';
    else if (calcType === 'PercentageOfGross') key = 'allowance_types.calc_percent_gross';
    return `<span class="badge bg-secondary">${this.t(key)}</span>`;
  }

  formatDefaultAmount(item: AllowanceType): string {
    if (item.defaultCalculationType === 'Fixed') {
      return item.defaultAmount != null ? item.defaultAmount.toFixed(2) : '-';
    }
    return item.defaultPercentage != null ? `${item.defaultPercentage}%` : '-';
  }

  formatBoolean(value: boolean): string {
    const text = value ? this.t('common.yes') : this.t('common.no');
    const cls = value ? 'badge bg-success' : 'badge bg-secondary';
    return `<span class="${cls}">${text}</span>`;
  }

  formatStatus(isActive: boolean): string {
    const text = isActive ? this.t('common.active') : this.t('common.inactive');
    const cls = isActive ? 'badge bg-success' : 'badge bg-light text-dark border';
    return `<span class="${cls}">${text}</span>`;
  }

  onActionClick(event: { action: string; item: any }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/settings/allowance-types', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/settings/allowance-types', item.id, 'edit']);
        break;
      case 'toggleStatus':
        this.onToggleStatus(item);
        break;
      case 'delete':
        this.onDelete(item);
        break;
    }
  }

  async onToggleStatus(item: AllowanceType): Promise<void> {
    const action = item.isActive ? 'deactivate' : 'activate';
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t(`common.confirm_${action}`),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-primary',
      icon: 'fa-toggle-on',
      iconClass: 'text-primary'
    });

    if (result.confirmed) {
      this.allowanceService.toggleAllowanceTypeStatus(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_types.status_toggled'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to toggle status:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_types.status_toggled'));
        }
      });
    }
  }

  async onDelete(item: AllowanceType): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.delete'),
      message: this.t('common.confirm_delete'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.allowanceService.deleteAllowanceType(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_types.deleted_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to delete allowance type:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_types.deleted_success'));
        }
      });
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadData();
  }

  onFiltersChange(filters: any): void {
    if (filters.branchId !== undefined) {
      this.selectedBranchId.set(filters.branchId ? parseInt(filters.branchId) : undefined);
    }
    if (filters.isActive !== undefined) {
      this.selectedActiveStatus.set(filters.isActive === 'true' ? true : filters.isActive === 'false' ? false : undefined);
    }
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.onClearFilters();
  }

  onClearFilters(): void {
    this.selectedBranchId.set(undefined);
    this.selectedActiveStatus.set(undefined);
    this.currentPage.set(1);
    this.loadData();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedBranchId() !== undefined ||
      this.selectedActiveStatus() !== undefined
    );
  }

  onCreateAllowanceType(): void {
    this.router.navigate(['/settings/allowance-types/create']);
  }
}
