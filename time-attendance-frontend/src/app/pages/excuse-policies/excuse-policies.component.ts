import { Component, OnInit, signal, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { ExcusePoliciesService } from './excuse-policies.service';
import {
  ExcusePolicyDto,
  ExcusePoliciesQueryParams,
  ExcusePolicyFilter
} from '../../shared/models/excuse-policy.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

interface Branch {
  id: number;
  name: string;
}

@Component({
  selector: 'app-excuse-policies',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './excuse-policies.component.html',
  styleUrls: ['./excuse-policies.component.css']
})
export class ExcusePoliciesComponent implements OnInit {
  private excusePoliciesService = inject(ExcusePoliciesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Modal reference handled via template reference variable

  // Signals for state management
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  selectedBranchId = signal<number | undefined>(undefined);
  selectedStatus = signal<boolean | undefined>(undefined);

  // Available options for filters
  availableBranches = signal<Branch[]>([]);

  // Permission constants
  readonly PERMISSIONS = {
    EXCUSE_POLICY_READ: `${PermissionResources.EXCUSE}.${PermissionActions.READ}`,
    EXCUSE_POLICY_CREATE: `${PermissionResources.EXCUSE}.${PermissionActions.CREATE}`,
    EXCUSE_POLICY_UPDATE: `${PermissionResources.EXCUSE}.${PermissionActions.UPDATE}`,
    EXCUSE_POLICY_DELETE: `${PermissionResources.EXCUSE}.${PermissionActions.DELETE}`
  };


  // Service signals
  excusePolicies = this.excusePoliciesService.excusePolicies;
  pagedResult = this.excusePoliciesService.pagedResult;
  error = this.excusePoliciesService.error;

  // Table configuration
  tableColumns: TableColumn[] = [
    { key: 'branchName', label: this.i18n.t('excuse_policies.branch'), sortable: true, width: '20%' },
    { key: 'maxPersonalExcusesPerMonth', label: this.i18n.t('excuse_policies.max_excuses_month'), sortable: true, width: '15%' },
    { key: 'maxPersonalExcuseHoursPerMonth', label: this.i18n.t('excuse_policies.max_hours_month'), sortable: true, width: '15%' },
    { key: 'maxPersonalExcuseHoursPerDay', label: this.i18n.t('excuse_policies.max_hours_day'), sortable: true, width: '15%' },
    { key: 'requiresApproval', label: this.i18n.t('excuse_policies.requires_approval'), sortable: true, width: '12%' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, width: '10%' },
    { key: 'actions', label: this.i18n.t('common.actions'), sortable: false, width: '13%' }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary',
      condition: (item: ExcusePolicyDto) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_READ)
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (item: ExcusePolicyDto) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_UPDATE)
    },
    {
      key: 'toggle',
      label: this.i18n.t('common.toggle_status'),
      icon: 'fa-toggle-on',
      color: 'warning',
      condition: (item: ExcusePolicyDto) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_UPDATE)
    },
    {
      key: 'delete',
      label: this.i18n.t('common.delete'),
      icon: 'fa-trash',
      color: 'danger',
      condition: (item: ExcusePolicyDto) => this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_DELETE)
    }
  ];

  // Computed values
  currentFilter = computed(() => ({
    branchId: this.selectedBranchId(),
    isActive: this.selectedStatus()
  }));

  // Effects
  constructor() {
    // Auto-load data when filter changes
    effect(() => {
      const filter = this.currentFilter();
      const page = this.currentPage();
      const pageSize = this.pageSize();

      this.loadExcusePolicies({
        page,
        pageSize,
        ...filter
      });
    });

    // Watch for service loading state
    effect(() => {
      this.loading.set(this.excusePoliciesService.loading());
    });
  }

  ngOnInit(): void {
    this.loadBranches();
  }


  /**
   * Load excuse policies with current filters
   */
  loadExcusePolicies(params: ExcusePoliciesQueryParams = {}): void {
    const queryParams: ExcusePoliciesQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter(),
      ...params
    };

    this.excusePoliciesService.getExcusePolicies(queryParams).subscribe({
      error: (error) => {
        this.notificationService.error(
          this.i18n.t('excuse_policies.load_error')
        );
      }
    });
  }

  /**
   * Load available branches for filter
   */
  loadBranches(): void {
    // TODO: Implement branch loading
    // For now, using mock data
    this.availableBranches.set([
      { id: 1, name: 'Main Branch' },
      { id: 2, name: 'Secondary Branch' }
    ]);
  }


  /**
   * Navigate to create excuse policy page
   */
  navigateToCreate(): void {
    this.router.navigate(['/settings/excuse-policies/create']);
  }

  /**
   * Navigate to view excuse policy page
   */
  viewExcusePolicy(excusePolicy: ExcusePolicyDto): void {
    this.router.navigate(['/settings/excuse-policies', excusePolicy.id, 'view']);
  }

  /**
   * Navigate to edit excuse policy page
   */
  editExcusePolicy(excusePolicy: ExcusePolicyDto): void {
    this.router.navigate(['/settings/excuse-policies', excusePolicy.id, 'edit']);
  }

  /**
   * Toggle excuse policy status
   */
  toggleStatus(excusePolicy: ExcusePolicyDto): void {
    const action = excusePolicy.isActive ? 'deactivate' : 'activate';
    const policyName = this.formatBranchName(excusePolicy.branchName);
    const message = this.i18n.t(`excuse_policies.confirm_${action}`).replace('{{name}}', policyName);

    this.confirmationService.confirm({
      title: this.i18n.t(`excuse_policies.${action}_title`),
      message,
      confirmText: this.i18n.t(`common.${action}`)
    }).then(result => {
      if (result.confirmed) {
        this.excusePoliciesService.toggleExcusePolicyStatus(excusePolicy.id).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t(`excuse_policies.${action}_success`)
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t(`excuse_policies.${action}_error`)
            );
          }
        });
      }
    });
  }

  /**
   * Delete excuse policy
   */
  deleteExcusePolicy(excusePolicy: ExcusePolicyDto): void {
    const policyName = this.formatBranchName(excusePolicy.branchName);
    const message = this.i18n.t('excuse_policies.confirm_delete').replace('{{name}}', policyName);

    this.confirmationService.confirm({
      title: this.i18n.t('excuse_policies.delete_title'),
      message,
      confirmText: this.i18n.t('common.delete')
    }).then(result => {
      if (result.confirmed) {
        this.excusePoliciesService.deleteExcusePolicy(excusePolicy.id).subscribe({
          next: () => {
            this.notificationService.success(
              this.i18n.t('excuse_policies.delete_success')
            );
          },
          error: () => {
            this.notificationService.error(
              this.i18n.t('excuse_policies.delete_error')
            );
          }
        });
      }
    });
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
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Handle search input changes
   */
  onSearchChange(searchTerm: string): void {
    // Note: This implementation can be extended when search functionality is added
    this.currentPage.set(1); // Reset to first page when searching
  }

  /**
   * Handle search input changes from unified filter
   */
  onSearchTermChange(searchTerm: string): void {
    this.currentPage.set(1);
  }

  /**
   * Handle filters change from unified filter component
   */
  onFiltersChange(filters: any): void {
    if (filters.branchId !== undefined) {
      const branchId = filters.branchId ? parseInt(filters.branchId) : undefined;
      this.selectedBranchId.set(branchId);
    }
    if (filters.isActive !== undefined) {
      const isActive = filters.isActive === 'true' ? true : (filters.isActive === 'false' ? false : undefined);
      this.selectedStatus.set(isActive);
    }
    this.currentPage.set(1); // Reset to first page when filtering
  }

  /**
   * Handle refresh data request
   */
  onRefreshData(): void {
    this.clearFilters();
    this.loadExcusePolicies();
  }

  /**
   * Handle branch filter change
   */
  onBranchFilterChange(branchId: number | undefined): void {
    this.selectedBranchId.set(branchId);
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Handle status filter change
   */
  onStatusFilterChange(isActive: boolean | undefined): void {
    this.selectedStatus.set(isActive);
    this.currentPage.set(1); // Reset to first page
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.selectedBranchId.set(undefined);
    this.selectedStatus.set(undefined);
    this.currentPage.set(1);
  }

  /**
   * Check if user can create excuse policies
   */
  canCreate(): boolean {
    return this.permissionService.has(this.PERMISSIONS.EXCUSE_POLICY_CREATE);
  }

  /**
   * Format branch name for display
   */
  formatBranchName(branchName: string | null): string {
    return branchName || this.i18n.t('excuse_policies.organization_wide');
  }

  /**
   * Format boolean values for display
   */
  formatBoolean(value: boolean): string {
    return value ? this.i18n.t('common.yes') : this.i18n.t('common.no');
  }

  /**
   * Format status for display
   */
  formatStatus(isActive: boolean): string {
    return isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive');
  }

  /**
   * Handle table action clicks
   */
  onTableAction(event: {action: string, item: ExcusePolicyDto}): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.viewExcusePolicy(item);
        break;
      case 'edit':
        this.editExcusePolicy(item);
        break;
      case 'toggle':
        this.toggleStatus(item);
        break;
      case 'delete':
        this.deleteExcusePolicy(item);
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }
}