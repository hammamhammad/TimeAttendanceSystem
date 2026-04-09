import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { TenantService } from './services/tenant.service';
import { TenantDto } from './models/tenant.model';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-tenants',
  standalone: true,
  imports: [
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent,
    PaginationComponent
  ],
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.css']
})
export class TenantsComponent implements OnInit {
  private tenantService = inject(TenantService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  // State
  loading = signal(false);
  tenants = signal<TenantDto[]>([]);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);

  // Filter state
  searchTerm = '';
  statusFilter = '';

  // Table columns
  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      priority: 'high',
      renderHtml: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      width: '120px',
      align: 'center',
      priority: 'high',
      renderHtml: true
    },
    {
      key: 'subscriptionPlanName',
      label: 'Plan',
      sortable: false,
      width: '140px',
      priority: 'medium',
      renderHtml: true
    },
    {
      key: 'employeeCount',
      label: 'Employees',
      sortable: true,
      width: '110px',
      align: 'center',
      priority: 'medium',
      hideOnMobile: true
    },
    {
      key: 'branchCount',
      label: 'Branches',
      sortable: true,
      width: '100px',
      align: 'center',
      priority: 'low',
      hideOnMobile: true
    },
    {
      key: 'createdAtUtc',
      label: 'Created',
      sortable: true,
      width: '130px',
      priority: 'low',
      hideOnMobile: true
    }
  ]);

  // Table actions
  tableActions = computed<TableAction[]>(() => [
    {
      key: 'view',
      label: 'View',
      icon: 'fa-eye',
      color: 'info'
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: 'fa-edit',
      color: 'primary'
    },
    {
      key: 'activate',
      label: 'Activate',
      icon: 'fa-check-circle',
      color: 'success',
      condition: (item: any) => item._raw?.status !== 'Active'
    },
    {
      key: 'suspend',
      label: 'Suspend',
      icon: 'fa-ban',
      color: 'danger',
      condition: (item: any) => item._raw?.status === 'Active'
    }
  ]);

  // Transformed table data
  tableData = computed(() => {
    return this.tenants().map(tenant => ({
      ...tenant,
      _raw: tenant,
      name: this.formatTenantName(tenant),
      status: this.formatStatus(tenant.status),
      subscriptionPlanName: this.formatPlan(tenant.subscriptionPlanName),
      createdAtUtc: this.formatDate(tenant.createdAtUtc)
    }));
  });

  ngOnInit(): void {
    this.loadTenants();
  }

  loadTenants(): void {
    this.loading.set(true);
    this.tenantService.getTenants(
      this.currentPage(),
      this.pageSize(),
      this.searchTerm || undefined,
      this.statusFilter || undefined
    ).subscribe({
      next: (response) => {
        this.tenants.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load tenants:', error);
        this.loading.set(false);
        this.notificationService.error('Error', 'Failed to load tenants');
      }
    });
  }

  // Filter handlers
  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage.set(1);
    this.loadTenants();
  }

  onRefreshData(): void {
    this.searchTerm = '';
    this.statusFilter = '';
    this.currentPage.set(1);
    this.loadTenants();
  }

  onAddTenant(): void {
    this.router.navigate(['/tenants/create']);
  }

  // Pagination
  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadTenants();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadTenants();
  }

  // Table action handler
  onActionClick(event: { action: string; item: any }): void {
    const tenant = event.item._raw as TenantDto;
    switch (event.action) {
      case 'view':
        this.router.navigate(['/tenants', tenant.id]);
        break;
      case 'edit':
        this.router.navigate(['/tenants', tenant.id, 'edit']);
        break;
      case 'activate':
        this.onActivateTenant(tenant);
        break;
      case 'suspend':
        this.onSuspendTenant(tenant);
        break;
    }
  }

  async onActivateTenant(tenant: TenantDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Activate Tenant',
      message: `Are you sure you want to activate "${tenant.name}"?`,
      confirmText: 'Activate',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-success',
      icon: 'fa-check-circle',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.tenantService.activateTenant(tenant.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Tenant activated successfully');
          this.loadTenants();
        },
        error: (error) => {
          console.error('Failed to activate tenant:', error);
          this.notificationService.error('Error', 'Failed to activate tenant');
        }
      });
    }
  }

  async onSuspendTenant(tenant: TenantDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Suspend Tenant',
      message: `Are you sure you want to suspend "${tenant.name}"? This will disable access for all users.`,
      confirmText: 'Suspend',
      cancelText: 'Cancel',
      confirmButtonClass: 'btn-danger',
      icon: 'fa-ban',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.tenantService.suspendTenant(tenant.id).subscribe({
        next: () => {
          this.notificationService.success('Success', 'Tenant suspended successfully');
          this.loadTenants();
        },
        error: (error) => {
          console.error('Failed to suspend tenant:', error);
          this.notificationService.error('Error', 'Failed to suspend tenant');
        }
      });
    }
  }

  // Formatting helpers
  private formatTenantName(tenant: TenantDto): string {
    let html = `<div><strong>${this.escapeHtml(tenant.name)}</strong>`;
    if (tenant.nameAr) {
      html += `<br><small class="text-muted">${this.escapeHtml(tenant.nameAr)}</small>`;
    }
    html += '</div>';
    return html;
  }

  private formatStatus(status: string): string {
    const variantMap: Record<string, string> = {
      'Active': 'success',
      'Suspended': 'danger',
      'Trial': 'warning',
      'PendingSetup': 'info',
      'Cancelled': 'secondary'
    };
    const variant = variantMap[status] || 'secondary';
    return `<span class="erp-badge erp-badge-${variant}">${this.escapeHtml(status)}</span>`;
  }

  private formatPlan(planName: string | null): string {
    if (!planName) {
      return `<span class="text-muted">No Plan</span>`;
    }
    return `<span class="badge bg-primary-subtle text-primary">${this.escapeHtml(planName)}</span>`;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.i18n.getDateLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
