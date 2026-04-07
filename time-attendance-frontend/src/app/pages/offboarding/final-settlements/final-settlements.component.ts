import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { OffboardingService } from '../../../core/services/offboarding.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-final-settlements',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './final-settlements.component.html',
  styleUrls: ['./final-settlements.component.css']
})
export class FinalSettlementsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(OffboardingService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<any[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _grossDisplay: this.formatCurrency(item.grossSettlement || item.totalAmount || 0),
    _deductionsDisplay: this.formatCurrency(item.totalDeductions || item.deductionsAmount || 0),
    _netDisplay: this.formatCurrency(item.netSettlement || (item.totalAmount - item.deductionsAmount) || 0),
    _statusDisplay: this.formatStatus(item.status),
    _dateDisplay: item.createdAtUtc ? new Date(item.createdAtUtc).toLocaleDateString() : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('offboarding.final_settlements.employee'), sortable: true, width: '20%' },
    { key: '_grossDisplay', label: this.i18n.t('offboarding.final_settlements.gross'), sortable: true, width: '14%' },
    { key: '_deductionsDisplay', label: this.i18n.t('offboarding.final_settlements.deductions'), sortable: true, width: '14%' },
    { key: '_netDisplay', label: this.i18n.t('offboarding.final_settlements.net'), sortable: true, width: '14%' },
    { key: '_statusDisplay', label: this.i18n.t('offboarding.final_settlements.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_dateDisplay', label: this.i18n.t('offboarding.final_settlements.date'), sortable: true, width: '12%' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'approve', label: this.i18n.t('offboarding.final_settlements.approve'), icon: 'fa-check', color: 'success',
      condition: (item: any) => item.status === 'Calculated' || item.status === 'PendingApproval' },
    { key: 'markPaid', label: this.i18n.t('offboarding.final_settlements.mark_paid'), icon: 'fa-money-bill', color: 'primary',
      condition: (item: any) => item.status === 'Approved' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getFinalSettlements({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => {
        const data = res.data || res;
        this.items.set(Array.isArray(data) ? data : []);
        this.totalCount.set(res.totalCount || (Array.isArray(data) ? data.length : 0));
        this.loading.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('offboarding.final_settlements.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: any }): void {
    if (event.action === 'view') {
      this.router.navigate(['/offboarding/terminations', event.item.terminationRecordId || event.item.terminationId, 'view']);
    } else if (event.action === 'approve') {
      this.approveSettlement(event.item);
    } else if (event.action === 'markPaid') {
      this.markPaid(event.item);
    }
  }

  async approveSettlement(item: any): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('offboarding.final_settlements.approve'),
      message: this.i18n.t('offboarding.final_settlements.confirm_approve'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });
    if (result.confirmed) {
      const terminationId = item.terminationRecordId || item.terminationId;
      this.service.approveFinalSettlement(terminationId, { comments: result.comments }).subscribe({
        next: () => { this.notification.success(this.i18n.t('offboarding.final_settlements.approved_success')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('offboarding.final_settlements.load_error'))
      });
    }
  }

  async markPaid(item: any): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('offboarding.final_settlements.mark_paid'),
      message: this.i18n.t('offboarding.final_settlements.confirm_paid'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-primary'
    });
    if (result.confirmed) {
      const terminationId = item.terminationRecordId || item.terminationId;
      this.service.markFinalSettlementPaid(terminationId).subscribe({
        next: () => { this.notification.success(this.i18n.t('offboarding.final_settlements.paid_success')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('offboarding.final_settlements.load_error'))
      });
    }
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentPage.set(1); this.loadData(); }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'SAR', maximumFractionDigits: 0 }).format(amount);
  }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Draft': 'secondary', 'Calculated': 'info', 'PendingApproval': 'warning', 'Approved': 'primary', 'Paid': 'success', 'Cancelled': 'danger' };
    const label = this.i18n.t('offboarding.settlement_statuses.' + s) || s;
    return `<span class="badge bg-${map[s] || 'secondary'}">${label}</span>`;
  }
}
