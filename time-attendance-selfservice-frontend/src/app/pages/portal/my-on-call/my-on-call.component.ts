import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-my-on-call',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-on-call.component.html',
  styleUrl: './my-on-call.component.css'
})
export class MyOnCallComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);

  items = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'type', label: this.i18n.t('portal.on_call.type'), sortable: true, priority: 'high' },
    { key: 'startDate', label: this.i18n.t('portal.on_call.start_date'), sortable: true, priority: 'high' },
    { key: 'endDate', label: this.i18n.t('portal.on_call.end_date'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => []);

  tableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.items().map(item => ({
      ...item,
      type: item.onCallType || item.type || '-',
      startDate: item.startDate ? new Date(item.startDate).toLocaleDateString(locale) : '-',
      endDate: item.endDate ? new Date(item.endDate).toLocaleDateString(locale) : '-',
      status: `<span class="badge ${item.isActive || item.status === 'Active' ? 'bg-success' : 'bg-secondary'}">${item.status || (item.isActive ? 'Active' : 'Inactive')}</span>`
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.portalService.getMyOnCallSchedules().subscribe({
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
}
