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
import { AllowancePolicy } from '../../../shared/models/allowance.model';

@Component({
  selector: 'app-allowance-policies',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    UnifiedFilterComponent,
    PageHeaderComponent
  ],
  templateUrl: './allowance-policies.component.html',
  styleUrls: ['./allowance-policies.component.css']
})
export class AllowancePoliciesComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    CREATE: 'allowancePolicy.create',
    READ: 'allowancePolicy.read',
    UPDATE: 'allowancePolicy.update',
    DELETE: 'allowancePolicy.delete'
  };

  loading = signal(false);
  policies = signal<AllowancePolicy[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  selectedBranchId = signal<number | undefined>(undefined);
  selectedActiveStatus = signal<boolean | undefined>(undefined);

  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'name',
      label: this.t('common.name'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('common.name')
    },
    {
      key: 'allowanceTypeName',
      label: this.t('allowance_policies.allowance_type'),
      sortable: true,
      width: '180px',
      priority: 'high',
      mobileLabel: this.t('allowance_policies.allowance_type')
    },
    {
      key: 'branchDisplay',
      label: this.t('common.branch'),
      sortable: false,
      width: '150px',
      priority: 'medium',
      mobileLabel: this.t('common.branch'),
      renderHtml: true
    },
    {
      key: 'requiresApprovalBadge',
      label: this.t('allowance_policies.requires_approval'),
      sortable: false,
      width: '140px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('allowance_policies.requires_approval'),
      renderHtml: true
    },
    {
      key: 'effectiveDateDisplay',
      label: this.t('common.effective_date'),
      sortable: true,
      width: '140px',
      priority: 'medium',
      mobileLabel: this.t('common.effective_date')
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
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.has(this.PERMISSIONS.DELETE)
    }
  ]);

  tableData = computed(() => {
    return this.policies().map(item => ({
      ...item,
      branchDisplay: this.formatBranch(item),
      requiresApprovalBadge: this.formatBoolean(item.requiresApproval),
      effectiveDateDisplay: this.formatDate(item.effectiveDate),
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

    this.allowanceService.getAllowancePolicies(
      this.currentPage(),
      this.pageSize(),
      this.selectedBranchId(),
      undefined,
      this.selectedActiveStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.policies.set(response.data);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(Math.ceil((response.totalCount || 0) / this.pageSize()));
        } else {
          this.policies.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load allowance policies:', error);
        this.loading.set(false);
        this.notificationService.error(this.t('app.error'), this.t('allowance_policies.load_error'));
      }
    });
  }

  formatBranch(item: AllowancePolicy): string {
    const text = item.branchName || this.t('common.all_branches');
    const cls = item.branchId ? 'badge bg-info' : 'badge bg-success';
    return `<span class="${cls}">${text}</span>`;
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

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  onActionClick(event: { action: string; item: any }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/settings/allowance-policies', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/settings/allowance-policies', item.id, 'edit']);
        break;
      case 'delete':
        this.onDelete(item);
        break;
    }
  }

  async onDelete(item: AllowancePolicy): Promise<void> {
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
      this.allowanceService.deleteAllowancePolicy(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_policies.deleted_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to delete allowance policy:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_policies.deleted_success'));
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

  onCreatePolicy(): void {
    this.router.navigate(['/settings/allowance-policies/create']);
  }
}
