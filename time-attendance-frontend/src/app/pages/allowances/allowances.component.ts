import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { AllowanceService } from '../../core/services/allowance.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { AllowanceAssignment } from '../../shared/models/allowance.model';

@Component({
  selector: 'app-allowances',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    UnifiedFilterComponent,
    PageHeaderComponent
  ],
  templateUrl: './allowances.component.html',
  styleUrls: ['./allowances.component.css']
})
export class AllowancesComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    CREATE: 'allowanceAssignment.create',
    READ: 'allowanceAssignment.read',
    UPDATE: 'allowanceAssignment.update',
    DELETE: 'allowanceAssignment.delete'
  };

  loading = signal(false);
  assignments = signal<AllowanceAssignment[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);

  selectedStatus = signal<string | undefined>(undefined);

  tableColumns = computed<TableColumn[]>(() => [
    {
      key: 'employeeName',
      label: this.t('common.employee'),
      sortable: true,
      width: '200px',
      priority: 'high',
      mobileLabel: this.t('common.employee')
    },
    {
      key: 'employeeNumber',
      label: this.t('common.employee_number'),
      sortable: true,
      width: '120px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('common.employee_number')
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
      key: 'amountDisplay',
      label: this.t('allowance_assignments.amount'),
      sortable: true,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('allowance_assignments.amount')
    },
    {
      key: 'statusBadge',
      label: this.t('allowance_assignments.status'),
      sortable: false,
      width: '120px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('allowance_assignments.status'),
      renderHtml: true
    },
    {
      key: 'effectiveFromDisplay',
      label: this.t('allowance_assignments.effective_from'),
      sortable: true,
      width: '140px',
      priority: 'medium',
      mobileLabel: this.t('allowance_assignments.effective_from')
    },
    {
      key: 'effectiveToDisplay',
      label: this.t('allowance_assignments.effective_to'),
      sortable: true,
      width: '140px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('allowance_assignments.effective_to')
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
      key: 'suspend',
      label: this.t('common.suspend'),
      icon: 'fa-pause',
      color: 'warning',
      condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status === 'Active'
    },
    {
      key: 'resume',
      label: this.t('common.resume'),
      icon: 'fa-play',
      color: 'success',
      condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status === 'Suspended'
    },
    {
      key: 'cancel',
      label: this.t('common.cancel'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && (item.status === 'Active' || item.status === 'Suspended')
    }
  ]);

  tableData = computed(() => {
    return this.assignments().map(item => ({
      ...item,
      amountDisplay: this.formatAmount(item),
      statusBadge: this.formatAssignmentStatus(item.status),
      effectiveFromDisplay: this.formatDate(item.effectiveFromDate),
      effectiveToDisplay: item.effectiveToDate ? this.formatDate(item.effectiveToDate) : '-'
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

    this.allowanceService.getAllowanceAssignments(
      this.currentPage(),
      this.pageSize(),
      undefined,
      undefined,
      this.selectedStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.assignments.set(response.data);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(Math.ceil((response.totalCount || 0) / this.pageSize()));
        } else {
          this.assignments.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load allowance assignments:', error);
        this.loading.set(false);
        this.notificationService.error(this.t('app.error'), this.t('allowance_assignments.load_error'));
      }
    });
  }

  formatAmount(item: AllowanceAssignment): string {
    if (item.calculationType === 'Fixed') {
      return `${item.amount.toFixed(2)} ${item.currency}`;
    }
    return item.percentage != null ? `${item.percentage}%` : `${item.amount.toFixed(2)} ${item.currency}`;
  }

  formatAssignmentStatus(status: string): string {
    let cls = 'badge bg-secondary';
    let key = 'allowance_assignments.status_' + status.toLowerCase();

    switch (status) {
      case 'Active':
        cls = 'badge bg-success';
        break;
      case 'Suspended':
        cls = 'badge bg-warning text-dark';
        break;
      case 'Expired':
        cls = 'badge bg-secondary';
        break;
      case 'Cancelled':
        cls = 'badge bg-danger';
        break;
    }

    return `<span class="${cls}">${this.t(key)}</span>`;
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
        this.router.navigate(['/allowances', item.id, 'edit']);
        break;
      case 'suspend':
        this.onSuspend(item);
        break;
      case 'resume':
        this.onResume(item);
        break;
      case 'cancel':
        this.onCancel(item);
        break;
    }
  }

  async onSuspend(item: AllowanceAssignment): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('allowance_assignments.suspend_confirm'),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-warning',
      icon: 'fa-pause',
      iconClass: 'text-warning'
    });

    if (result.confirmed) {
      this.allowanceService.suspendAllowance(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_assignments.suspended_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to suspend allowance:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_assignments.suspended_success'));
        }
      });
    }
  }

  async onResume(item: AllowanceAssignment): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('allowance_assignments.resume_confirm'),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-play',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.allowanceService.resumeAllowance(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_assignments.resumed_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to resume allowance:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_assignments.resumed_success'));
        }
      });
    }
  }

  async onCancel(item: AllowanceAssignment): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('allowance_assignments.cancel_confirm'),
      confirmText: this.t('common.confirm'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.allowanceService.cancelAllowance(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_assignments.cancelled_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to cancel allowance:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_assignments.cancelled_success'));
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
    if (filters.status !== undefined) {
      this.selectedStatus.set(filters.status || undefined);
    }
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.onClearFilters();
  }

  onClearFilters(): void {
    this.selectedStatus.set(undefined);
    this.currentPage.set(1);
    this.loadData();
  }

  hasActiveFilters(): boolean {
    return this.selectedStatus() !== undefined;
  }

  onAssignAllowance(): void {
    this.router.navigate(['/allowances/assign']);
  }
}
