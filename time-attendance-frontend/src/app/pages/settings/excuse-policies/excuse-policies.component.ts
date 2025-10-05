import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ExcusePoliciesService } from './excuse-policies.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { ExcusePolicy } from '../../../shared/models/excuse-policy.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-excuse-policies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DataTableComponent,
    UnifiedFilterComponent,
    PageHeaderComponent
  ],
  templateUrl: './excuse-policies.component.html',
  styleUrls: ['./excuse-policies.component.css']
})
export class ExcusePoliciesComponent implements OnInit {
  private excusePoliciesService = inject(ExcusePoliciesService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    POLICY_CREATE: 'settings.excusePolicy.create',
    POLICY_READ: 'settings.excusePolicy.read',
    POLICY_UPDATE: 'settings.excusePolicy.update',
    POLICY_DELETE: 'settings.excusePolicy.delete'
  };

  // Signals for state management
  loading = signal(false);
  policies = signal<ExcusePolicy[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  // Filter signals
  selectedBranchId = signal<number | undefined>(undefined);
  selectedActiveStatus = signal<boolean | undefined>(undefined);

  // Data table configuration
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'scope',
      label: this.t('excuse_policies.branch'),
      sortable: false,
      width: '180px',
      priority: 'high',
      mobileLabel: this.t('excuse_policies.branch'),
      renderHtml: true
    },
    {
      key: 'maxPersonalExcusesPerMonth',
      label: this.t('excuse_policies.max_excuses_month'),
      sortable: true,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('excuse_policies.max_excuses_month')
    },
    {
      key: 'maxPersonalExcuseHoursPerMonth',
      label: this.t('excuse_policies.max_hours_month'),
      sortable: true,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('excuse_policies.max_hours_month')
    },
    {
      key: 'maxPersonalExcuseHoursPerDay',
      label: this.t('excuse_policies.max_hours_day'),
      sortable: true,
      width: '120px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('excuse_policies.max_hours_day')
    },
    {
      key: 'requiresApproval',
      label: this.t('excuse_policies.requires_approval'),
      sortable: false,
      width: '130px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('excuse_policies.requires_approval'),
      renderHtml: true
    },
    {
      key: 'status',
      label: this.t('common.status'),
      sortable: false,
      width: '100px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('common.status'),
      renderHtml: true
    },
    {
      key: 'createdAt',
      label: this.t('common.created'),
      sortable: true,
      width: '150px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('common.created')
    }
  ]);

  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: this.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: () => this.permissionService.has(this.PERMISSIONS.POLICY_READ)
    },
    {
      key: 'edit',
      label: this.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: () => this.permissionService.has(this.PERMISSIONS.POLICY_UPDATE)
    },
    {
      key: 'delete',
      label: this.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: () => this.permissionService.has(this.PERMISSIONS.POLICY_DELETE)
    }
  ]);

  // Transform policies data for data table
  tableData = computed(() => {
    return this.policies().map(policy => ({
      ...policy,
      scope: this.formatScope(policy),
      requiresApproval: this.formatBoolean(policy.requiresApproval),
      status: this.formatStatus(policy),
      createdAt: this.formatDate(policy.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadPolicies();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadPolicies(): void {
    this.loading.set(true);

    this.excusePoliciesService.getExcusePolicies(
      this.currentPage(),
      this.pageSize(),
      this.selectedBranchId(),
      this.selectedActiveStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.items) {
          this.policies.set(response.items);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(response.totalPages);
        } else {
          console.warn('No data received from API:', response);
          this.policies.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load excuse policies:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.t('app.error'),
          this.t('excuse_policies.load_error')
        );
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Format scope badge for display in table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatScope(policy: ExcusePolicy): string {
    const scopeText = policy.branchId === null
      ? this.t('excuse_policies.organization_wide')
      : (policy.branchName || `Branch ${policy.branchId}`);
    const badgeClass = this.getScopeBadgeClass(policy);
    return `<span class="${badgeClass}">${scopeText}</span>`;
  }

  /**
   * Get CSS class for scope badge
   */
  getScopeBadgeClass(policy: ExcusePolicy): string {
    return policy.branchId === null ? 'badge bg-success' : 'badge bg-info';
  }

  /**
   * Format boolean value as badge for table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatBoolean(value: boolean): string {
    const text = value ? this.t('common.yes') : this.t('common.no');
    const badgeClass = this.getBooleanBadgeClass(value);
    return `<span class="${badgeClass}">${text}</span>`;
  }

  /**
   * Get CSS class for boolean badge
   */
  getBooleanBadgeClass(value: boolean): string {
    return value ? 'badge bg-success' : 'badge bg-secondary';
  }

  /**
   * Format status badge for table
   * Uses HTML injection pattern (documented exception for DataTable columns in CLAUDE.md)
   */
  formatStatus(policy: ExcusePolicy): string {
    const statusText = policy.isActive ? this.t('common.active') : this.t('common.inactive');
    const badgeClass = this.getStatusBadgeClass(policy);
    return `<span class="${badgeClass}">${statusText}</span>`;
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(policy: ExcusePolicy): string {
    return policy.isActive ? 'badge bg-success' : 'badge bg-light text-dark border';
  }

  // Data table action handler
  onActionClick(event: {action: string, item: ExcusePolicy}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.onViewPolicy(item);
        break;
      case 'edit':
        this.onEditPolicy(item);
        break;
      case 'delete':
        this.onDeletePolicy(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  // Pagination handlers
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadPolicies();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadPolicies();
  }

  // Filter handlers
  onFiltersChange(filters: any): void {
    if (filters.branchId !== undefined) {
      this.selectedBranchId.set(filters.branchId ? parseInt(filters.branchId) : undefined);
    }
    if (filters.isActive !== undefined) {
      this.selectedActiveStatus.set(filters.isActive === 'true' ? true : filters.isActive === 'false' ? false : undefined);
    }
    this.currentPage.set(1);
    this.loadPolicies();
  }

  onRefreshData(): void {
    this.onClearFilters();
  }

  onClearFilters(): void {
    this.selectedBranchId.set(undefined);
    this.selectedActiveStatus.set(undefined);
    this.currentPage.set(1);
    this.loadPolicies();
  }

  hasActiveFilters(): boolean {
    return !!(
      this.selectedBranchId() !== undefined ||
      this.selectedActiveStatus() !== undefined
    );
  }

  // Policy CRUD operations
  onCreatePolicy(): void {
    this.router.navigate(['/settings/excuse-policies/create']);
  }

  onViewPolicy(policy: ExcusePolicy): void {
    this.router.navigate(['/settings/excuse-policies', policy.id, 'view']);
  }

  onEditPolicy(policy: ExcusePolicy): void {
    this.router.navigate(['/settings/excuse-policies', policy.id, 'edit']);
  }

  async onDeletePolicy(policy: ExcusePolicy): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('excuse_policies.delete_title'),
      message: this.t('excuse_policies.confirm_delete'),
      confirmText: this.t('common.delete'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.excusePoliciesService.deleteExcusePolicy(policy.id).subscribe({
        next: () => {
          this.loadPolicies();
          this.notificationService.success(
            this.t('app.success'),
            this.t('excuse_policies.delete_success')
          );
        },
        error: (error) => {
          console.error('Failed to delete excuse policy:', error);
          this.notificationService.error(
            this.t('app.error'),
            this.t('excuse_policies.delete_error')
          );
        }
      });
    }
  }
}
