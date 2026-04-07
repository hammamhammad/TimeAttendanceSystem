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
import { AllowanceRequest } from '../../shared/models/allowance.model';

@Component({
  selector: 'app-allowance-requests',
  standalone: true,
  imports: [
    FormsModule,
    DataTableComponent,
    UnifiedFilterComponent,
    PageHeaderComponent
  ],
  templateUrl: './allowance-requests.component.html',
  styleUrls: ['./allowance-requests.component.css']
})
export class AllowanceRequestsComponent implements OnInit {
  private allowanceService = inject(AllowanceService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    READ: 'allowanceRequest.read',
    APPROVE: 'allowanceRequest.approve'
  };

  loading = signal(false);
  requests = signal<AllowanceRequest[]>([]);
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
      key: 'allowanceTypeName',
      label: this.t('allowance_policies.allowance_type'),
      sortable: true,
      width: '180px',
      priority: 'high',
      mobileLabel: this.t('allowance_policies.allowance_type')
    },
    {
      key: 'requestTypeBadge',
      label: this.t('allowance_requests.request_type'),
      sortable: false,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('allowance_requests.request_type'),
      renderHtml: true
    },
    {
      key: 'requestedAmountDisplay',
      label: this.t('allowance_requests.requested_amount'),
      sortable: true,
      width: '140px',
      align: 'center',
      priority: 'medium',
      mobileLabel: this.t('allowance_requests.requested_amount')
    },
    {
      key: 'statusBadge',
      label: this.t('common.status'),
      sortable: false,
      width: '120px',
      align: 'center',
      priority: 'high',
      mobileLabel: this.t('common.status'),
      renderHtml: true
    },
    {
      key: 'effectiveFromDisplay',
      label: this.t('allowance_assignments.effective_from'),
      sortable: true,
      width: '140px',
      priority: 'low',
      hideOnMobile: true,
      mobileLabel: this.t('allowance_assignments.effective_from')
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
      key: 'approve',
      label: this.t('common.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: any) => this.permissionService.has(this.PERMISSIONS.APPROVE) && item.status === 'Pending'
    },
    {
      key: 'reject',
      label: this.t('common.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: any) => this.permissionService.has(this.PERMISSIONS.APPROVE) && item.status === 'Pending'
    }
  ]);

  tableData = computed(() => {
    return this.requests().map(item => ({
      ...item,
      requestTypeBadge: this.formatRequestType(item.requestType),
      requestedAmountDisplay: this.formatRequestedAmount(item),
      statusBadge: this.formatRequestStatus(item.status),
      effectiveFromDisplay: this.formatDate(item.effectiveFromDate)
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

    this.allowanceService.getAllowanceRequests(
      this.currentPage(),
      this.pageSize(),
      undefined,
      this.selectedStatus()
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.requests.set(response.data);
          this.totalCount.set(response.totalCount);
          this.totalPages.set(Math.ceil((response.totalCount || 0) / this.pageSize()));
        } else {
          this.requests.set([]);
          this.totalCount.set(0);
          this.totalPages.set(0);
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load allowance requests:', error);
        this.loading.set(false);
        this.notificationService.error(this.t('app.error'), this.t('allowance_requests.load_error'));
      }
    });
  }

  formatRequestType(type: string): string {
    const key = `allowance_requests.type_${type.toLowerCase()}`;
    return `<span class="badge bg-info">${this.t(key)}</span>`;
  }

  formatRequestedAmount(item: AllowanceRequest): string {
    if (item.requestedAmount != null) return item.requestedAmount.toFixed(2);
    if (item.requestedPercentage != null) return `${item.requestedPercentage}%`;
    return '-';
  }

  formatRequestStatus(status: string): string {
    let cls = 'badge bg-secondary';
    let key = 'allowance_requests.status_' + status.toLowerCase();

    switch (status) {
      case 'Pending':
        cls = 'badge bg-warning text-dark';
        break;
      case 'Approved':
        cls = 'badge bg-success';
        break;
      case 'Rejected':
        cls = 'badge bg-danger';
        break;
      case 'Applied':
        cls = 'badge bg-primary';
        break;
      case 'Withdrawn':
        cls = 'badge bg-secondary';
        break;
      case 'Cancelled':
        cls = 'badge bg-dark';
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
        this.router.navigate(['/allowance-requests', item.id, 'view']);
        break;
      case 'approve':
        this.onApprove(item);
        break;
      case 'reject':
        this.onReject(item);
        break;
    }
  }

  async onApprove(item: AllowanceRequest): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('allowance_requests.approve_confirm'),
      confirmText: this.t('common.approve'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-success',
      icon: 'fa-check',
      iconClass: 'text-success'
    });

    if (result.confirmed) {
      this.allowanceService.approveAllowanceRequest(item.id).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_requests.approved_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to approve request:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_requests.approved_success'));
        }
      });
    }
  }

  async onReject(item: AllowanceRequest): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'),
      message: this.t('allowance_requests.reject_confirm'),
      confirmText: this.t('common.reject'),
      cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-times',
      iconClass: 'text-danger',
      requireComments: true
    });

    if (result.confirmed && result.comments) {
      this.allowanceService.rejectAllowanceRequest(item.id, result.comments).subscribe({
        next: () => {
          this.notificationService.success(this.t('app.success'), this.t('allowance_requests.rejected_success'));
          this.loadData();
        },
        error: (error) => {
          console.error('Failed to reject request:', error);
          this.notificationService.error(this.t('app.error'), this.t('allowance_requests.rejected_success'));
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
}
