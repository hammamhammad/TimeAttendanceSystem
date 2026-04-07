import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PayrollService } from '../../../core/services/payroll.service';
import { PayrollPeriod, PayrollStatus } from '../../../shared/models/payroll.model';

@Component({
  selector: 'app-payroll-periods',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './payroll-periods.component.html',
  styleUrls: ['./payroll-periods.component.css']
})
export class PayrollPeriodsComponent implements OnInit {
  private payrollService = inject(PayrollService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<PayrollPeriod[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('common.name'), sortable: true, priority: 'high' },
    { key: 'branchName', label: this.i18n.t('common.branch'), sortable: true, priority: 'medium' },
    { key: 'periodType', label: this.i18n.t('payroll.periods.period_type'), sortable: true, priority: 'medium' },
    { key: 'startDate', label: this.i18n.t('common.start_date'), sortable: true, priority: 'high' },
    { key: 'endDate', label: this.i18n.t('common.end_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'totalNetSalary', label: this.i18n.t('payroll.periods.total_net'), sortable: true, priority: 'medium' },
    { key: 'employeeCount', label: this.i18n.t('payroll.periods.employee_count'), sortable: true, priority: 'low' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-solid fa-edit', color: 'secondary', condition: (item) => item.status === 'Draft' },
    { key: 'process', label: this.i18n.t('payroll.periods.process'), icon: 'fa-solid fa-cog', color: 'primary', condition: (item) => item.status === 'Draft' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-solid fa-check', color: 'success', condition: (item) => item.status === 'Processed' },
    { key: 'markPaid', label: this.i18n.t('payroll.periods.mark_paid'), icon: 'fa-solid fa-money-bill', color: 'success', condition: (item) => item.status === 'Approved' },
    { key: 'cancel', label: this.i18n.t('common.cancel'), icon: 'fa-solid fa-ban', color: 'danger', condition: (item) => item.status === 'Draft' || item.status === 'Processed' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.payrollService.getPeriods({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (response: any) => {
        const items = Array.isArray(response) ? response : (response.data || response.items || []);
        this.items.set(items);
        this.totalCount.set(response.totalCount || items.length);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  create(): void {
    this.router.navigate(['/payroll/periods/create']);
  }

  onActionClick(event: { action: string; item: PayrollPeriod }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/payroll/periods', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/payroll/periods', event.item.id, 'edit']);
        break;
      case 'process':
        this.processPeriod(event.item);
        break;
      case 'approve':
        this.approvePeriod(event.item);
        break;
      case 'markPaid':
        this.markPaid(event.item);
        break;
      case 'cancel':
        this.cancelPeriod(event.item);
        break;
    }
  }

  processPeriod(item: PayrollPeriod): void {
    this.confirmationService.confirm({
      title: this.i18n.t('payroll.periods.confirm_process'),
      message: this.i18n.t('payroll.periods.confirm_process_message'),
      confirmText: this.i18n.t('payroll.periods.process'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.payrollService.processPeriod(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('payroll.periods.processed_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_processing'))
        });
      }
    });
  }

  approvePeriod(item: PayrollPeriod): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_approve'),
      message: this.i18n.t('payroll.periods.confirm_approve_message'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.payrollService.approvePeriod(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('payroll.periods.approved_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_approving'))
        });
      }
    });
  }

  markPaid(item: PayrollPeriod): void {
    this.confirmationService.confirm({
      title: this.i18n.t('payroll.periods.confirm_mark_paid'),
      message: this.i18n.t('payroll.periods.confirm_mark_paid_message'),
      confirmText: this.i18n.t('payroll.periods.mark_paid'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.payrollService.markPaid(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('payroll.periods.marked_paid_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
        });
      }
    });
  }

  cancelPeriod(item: PayrollPeriod): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_cancel'),
      message: this.i18n.t('payroll.periods.confirm_cancel_message'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.payrollService.cancelPeriod(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('payroll.periods.cancelled_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_cancelling'))
        });
      }
    });
  }

  getStatusVariant(status: PayrollStatus): string {
    const map: Record<PayrollStatus, string> = {
      'Draft': 'secondary',
      'Processing': 'info',
      'Processed': 'primary',
      'PendingApproval': 'warning',
      'Approved': 'success',
      'Paid': 'success',
      'Cancelled': 'danger'
    };
    return map[status] || 'secondary';
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }

  formatCurrency(value: number): string {
    return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }
}
