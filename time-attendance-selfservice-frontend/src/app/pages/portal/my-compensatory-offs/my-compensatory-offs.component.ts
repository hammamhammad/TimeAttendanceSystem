import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-compensatory-offs',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-compensatory-offs.component.html',
  styleUrl: './my-compensatory-offs.component.css'
})
export class MyCompensatoryOffsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);

  items = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'earnedDate', label: this.i18n.t('portal.compensatory_offs.earned_date'), sortable: true, priority: 'high' },
    { key: 'expiryDate', label: this.i18n.t('portal.compensatory_offs.expiry_date'), sortable: true, priority: 'high' },
    { key: 'hoursWorked', label: this.i18n.t('portal.compensatory_offs.hours_worked'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('portal.compensatory_offs.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => []);

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.items().map(item => ({
      ...item,
      earnedDate: item.earnedDate ? new Date(item.earnedDate).toLocaleDateString(locale) : '-',
      expiryDate: item.expiryDate ? new Date(item.expiryDate).toLocaleDateString(locale) : '-',
      hoursWorked: item.hoursWorked ?? item.hours ?? '-',
      status: this.getStatusBadgeHtml(item.status)
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.portalService.getMyCompensatoryOffs().subscribe({
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

  getStatusBadgeHtml(status: string): string {
    const map: Record<string, string> = {
      Available: 'bg-success', Pending: 'bg-warning', Used: 'bg-secondary', Expired: 'bg-danger',
      Active: 'bg-success', Approved: 'bg-success', Rejected: 'bg-danger'
    };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${status || '-'}</span>`;
  }
}
