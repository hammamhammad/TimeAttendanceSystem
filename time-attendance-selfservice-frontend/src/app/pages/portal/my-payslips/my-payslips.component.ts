import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

export interface Payslip {
  id: number;
  month: number;
  year: number;
  periodLabel: string;
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  status: string;
  paidDate?: string;
  generatedDate?: string;
}

/**
 * My Payslips Component
 * Displays employee payslips list with download capability
 */
@Component({
  selector: 'app-my-payslips',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    DataTableComponent,
    EmptyStateComponent
  ],
  templateUrl: './my-payslips.component.html',
  styleUrl: './my-payslips.component.css'
})
export class MyPayslipsComponent implements OnInit, OnDestroy {
  private readonly portalService = inject(PortalService);
  private readonly notificationService = inject(NotificationService);
  readonly i18n = inject(I18nService);

  // State
  payslips = signal<Payslip[]>([]);
  loading = signal<boolean>(false);
  downloading = signal<number | null>(null);
  error = signal<string | null>(null);

  // Year filter
  selectedYear = signal<number>(new Date().getFullYear());
  availableYears = computed(() => {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];
    for (let y = currentYear; y >= currentYear - 5; y--) {
      years.push(y);
    }
    return years;
  });

  // Sorting state
  sortColumn = signal<string>('year');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Table columns
  columns: TableColumn[] = [];

  initColumns(): void {
    this.columns = [
      { key: 'periodLabel', label: this.i18n.t('portal.payslips.period'), sortable: true },
      { key: 'grossSalary', label: this.i18n.t('portal.payslips.gross_salary'), sortable: true },
      { key: 'totalDeductions', label: this.i18n.t('portal.payslips.total_deductions'), sortable: true },
      { key: 'netSalary', label: this.i18n.t('portal.payslips.net_salary'), sortable: true },
      { key: 'status', label: this.i18n.t('portal.status'), sortable: true, renderHtml: true }
    ];
  }

  // Table actions
  tableActions: TableAction[] = [];

  initTableActions(): void {
    this.tableActions = [
      {
        key: 'view',
        label: this.i18n.t('portal.actions.view'),
        icon: 'bi-eye',
        color: 'primary'
      },
      {
        key: 'download',
        label: this.i18n.t('portal.payslips.download_pdf'),
        icon: 'bi-download',
        color: 'success',
        condition: (item: any) => item.statusRaw === 'Paid' || item.statusRaw === 'Generated'
      }
    ];
  }

  // Computed table data with sorting
  tableData = computed(() => {
    const slips = this.payslips();
    const column = this.sortColumn();
    const direction = this.sortDirection();

    // Sort the data
    const sorted = [...slips].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (column) {
        case 'periodLabel':
        case 'year':
          aVal = a.year * 100 + a.month;
          bVal = b.year * 100 + b.month;
          break;
        case 'grossSalary':
          aVal = a.grossSalary;
          bVal = b.grossSalary;
          break;
        case 'totalDeductions':
          aVal = a.totalDeductions;
          bVal = b.totalDeductions;
          break;
        case 'netSalary':
          aVal = a.netSalary;
          bVal = b.netSalary;
          break;
        case 'status':
          aVal = a.status;
          bVal = b.status;
          break;
        default:
          aVal = a.year * 100 + a.month;
          bVal = b.year * 100 + b.month;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    // Map to display format
    return sorted.map(slip => ({
      ...slip,
      periodLabel: this.getMonthLabel(slip.month, slip.year),
      grossSalary: this.formatCurrency(slip.grossSalary),
      totalDeductions: this.formatCurrency(slip.totalDeductions),
      netSalary: this.formatCurrency(slip.netSalary),
      statusRaw: slip.status,
      status: this.getStatusBadgeHtml(slip.status)
    }));
  });

  ngOnInit(): void {
    this.initColumns();
    this.initTableActions();
    this.loadPayslips();
  }

  ngOnDestroy(): void {
    // Clean up if needed
  }

  loadPayslips(): void {
    this.loading.set(true);
    this.error.set(null);

    this.portalService.getMyPayslips(this.selectedYear()).subscribe({
      next: (result) => {
        // Transform backend response to match Payslip interface
        const mapped = (result || []).map((r: any) => ({
          id: r.id,
          month: r.periodStart ? new Date(r.periodStart).getMonth() + 1 : 0,
          year: r.periodStart ? new Date(r.periodStart).getFullYear() : 0,
          periodLabel: r.periodName || '',
          grossSalary: r.grossEarnings ?? r.grossSalary ?? 0,
          totalDeductions: r.totalDeductions ?? 0,
          netSalary: r.netSalary ?? 0,
          status: r.status ?? 'Draft',
          paidDate: r.paySlipGeneratedAt,
          generatedDate: r.paySlipGeneratedAt
        }));
        this.payslips.set(mapped);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load payslips:', err);
        this.error.set(this.i18n.t('portal.payslips.failed_to_load'));
        this.notificationService.error(this.i18n.t('portal.payslips.failed_to_load'));
        this.loading.set(false);
      }
    });
  }

  onYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedYear.set(parseInt(target.value, 10));
    this.loadPayslips();
  }

  onSort(event: { column: string; direction: 'asc' | 'desc' }): void {
    this.sortColumn.set(event.column);
    this.sortDirection.set(event.direction);
  }

  onActionClick(event: { action: string; item: any }): void {
    const payslip = this.payslips().find(p => p.id === event.item.id);
    if (!payslip) return;

    switch (event.action) {
      case 'view':
        this.viewPayslip(payslip);
        break;
      case 'download':
        this.downloadPayslip(payslip);
        break;
    }
  }

  viewPayslip(payslip: Payslip): void {
    // For now, download also serves as view
    this.downloadPayslip(payslip);
  }

  downloadPayslip(payslip: Payslip): void {
    this.downloading.set(payslip.id);

    this.portalService.downloadPayslipPdf(payslip.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payslip-${payslip.year}-${String(payslip.month).padStart(2, '0')}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.downloading.set(null);
        this.notificationService.success(this.i18n.t('portal.payslips.download_success'));
      },
      error: (err) => {
        console.error('Failed to download payslip:', err);
        this.downloading.set(null);
        this.notificationService.error(this.i18n.t('portal.payslips.download_failed'));
      }
    });
  }

  refresh(): void {
    this.loadPayslips();
  }

  getMonthLabel(month: number, year: number): string {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    const date = new Date(year, month - 1, 1);
    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  }

  formatCurrency(amount: number): string {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  getStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Paid':
        return `<span class="badge bg-success">${this.i18n.t('portal.payslips.status_paid')}</span>`;
      case 'Generated':
        return `<span class="badge bg-info">${this.i18n.t('portal.payslips.status_generated')}</span>`;
      case 'Processing':
        return `<span class="badge bg-warning">${this.i18n.t('portal.payslips.status_processing')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
