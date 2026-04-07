import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { LeaveEncashmentService } from '../../../core/services/leave-encashment.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LeaveEncashment } from '../../../shared/models/leave-encashment.model';

@Component({
  selector: 'app-leave-encashments',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './leave-encashments.component.html',
  styleUrls: ['./leave-encashments.component.css']
})
export class LeaveEncashmentsComponent implements OnInit {
  private service = inject(LeaveEncashmentService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  items = signal<LeaveEncashment[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '170px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'vacationTypeName', label: this.t('leave_encashments.leave_type'), sortable: false, width: '140px', priority: 'medium', mobileLabel: this.t('leave_encashments.leave_type') },
    { key: 'year', label: this.t('leave_encashments.year'), sortable: true, width: '80px', align: 'center', priority: 'medium', mobileLabel: this.t('leave_encashments.year') },
    { key: 'daysEncashed', label: this.t('leave_encashments.days'), sortable: false, width: '80px', align: 'center', priority: 'medium', mobileLabel: this.t('leave_encashments.days') },
    { key: 'amountDisplay', label: this.t('leave_encashments.amount'), sortable: true, width: '120px', align: 'right', priority: 'high', mobileLabel: this.t('leave_encashments.amount') },
    { key: 'statusBadge', label: this.t('common.status'), sortable: false, width: '120px', align: 'center', priority: 'high', mobileLabel: this.t('common.status'), renderHtml: true }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'approve', label: this.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: any) => item.status === 'Pending' },
    { key: 'reject', label: this.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: any) => item.status === 'Pending' }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    amountDisplay: item.totalAmount?.toFixed(2) || '-',
    statusBadge: this.formatStatus(item.status)
  })));

  ngOnInit(): void { this.loadData(); }
  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm()) params.search = this.searchTerm();
    this.service.getAll(params).subscribe({
      next: (res: any) => { this.items.set(res?.items || res?.data || []); this.totalCount.set(res?.totalCount || 0); this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize())); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('leave_encashments.load_error')); }
    });
  }

  formatStatus(status: string): string {
    const map: Record<string, string> = { Pending: 'bg-warning text-dark', Approved: 'bg-success', Rejected: 'bg-danger', Processed: 'bg-info', Cancelled: 'bg-secondary' };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${this.t('leave_encashments.status_' + status.toLowerCase())}</span>`;
  }

  async onActionClick(event: { action: string; item: any }): Promise<void> {
    if (event.action === 'view') {
      this.router.navigate(['/leave-management/leave-encashments', event.item.id, 'view']);
    } else if (event.action === 'approve') {
      const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('leave_encashments.approve_confirm'), confirmText: this.t('common.approve'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-check', iconClass: 'text-success' });
      if (result.confirmed) {
        this.service.approve(event.item.id).subscribe({
          next: () => { this.notificationService.success(this.t('app.success'), this.t('leave_encashments.approved_successfully')); this.loadData(); },
          error: () => this.notificationService.error(this.t('app.error'), this.t('leave_encashments.approve_error'))
        });
      }
    } else if (event.action === 'reject') {
      const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('leave_encashments.reject_confirm'), confirmText: this.t('common.reject'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-danger', icon: 'fa-times', iconClass: 'text-danger' });
      if (result.confirmed) {
        this.service.reject(event.item.id, '').subscribe({
          next: () => { this.notificationService.success(this.t('app.success'), this.t('leave_encashments.rejected_successfully')); this.loadData(); },
          error: () => this.notificationService.error(this.t('app.error'), this.t('leave_encashments.reject_error'))
        });
      }
    }
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
}
