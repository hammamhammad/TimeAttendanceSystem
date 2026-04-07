import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-leave-encashments',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-leave-encashments.component.html',
  styleUrl: './my-leave-encashments.component.css'
})
export class MyLeaveEncashmentsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);

  items = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'leaveType', label: this.i18n.t('portal.leave_encashments.leave_type'), sortable: true, priority: 'high' },
    { key: 'days', label: this.i18n.t('portal.leave_encashments.days'), sortable: true, priority: 'high' },
    { key: 'amount', label: this.i18n.t('portal.leave_encashments.amount'), sortable: true, priority: 'high' },
    { key: 'year', label: this.i18n.t('portal.leave_encashments.year'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.leave_encashments.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => []);

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.items().map(item => ({
      ...item,
      leaveType: item.leaveTypeName || item.vacationTypeName || '-',
      days: item.daysEncashed ?? item.days ?? '-',
      amount: item.totalAmount != null ? item.totalAmount.toLocaleString(locale, { minimumFractionDigits: 2 }) : '-',
      year: item.year ?? '-',
      status: this.getStatusBadgeHtml(item.status)
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.portalService.getMyLeaveEncashments().subscribe({
      next: (res) => {
        const data = res?.data ?? res?.value?.items ?? res?.value ?? res?.items ?? (Array.isArray(res) ? res : []);
        this.items.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  navigateToRequest(): void {
    this.router.navigate(['/my-leave-encashments/request']);
  }

  getStatusBadgeHtml(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-warning', PendingApproval: 'bg-info', Approved: 'bg-success',
      Rejected: 'bg-danger', Paid: 'bg-success', Cancelled: 'bg-secondary',
      Processed: 'bg-success'
    };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${status || '-'}</span>`;
  }
}
