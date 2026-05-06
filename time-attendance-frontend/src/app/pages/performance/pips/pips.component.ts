import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { PerformanceImprovementPlan } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-pips',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './pips.component.html',
  styleUrls: ['./pips.component.css']
})
export class PipsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<PerformanceImprovementPlan[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(p => ({
    ...p,
    _statusDisplay: `<span class="badge bg-${p.status === 'Active' ? 'warning text-dark' : p.status === 'Completed' ? 'success' : p.status === 'Failed' ? 'danger' : 'secondary'}">${p.status}</span>`
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('fields.employee'), sortable: true, width: '18%' },
    { key: 'managerName', label: this.i18n.t('pips.manager'), sortable: true, width: '16%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: 'startDate', label: this.i18n.t('fields.start_date'), sortable: true, width: '12%' },
    { key: 'endDate', label: this.i18n.t('fields.end_date'), sortable: true, width: '12%' },
    { key: 'departmentName', label: this.i18n.t('fields.department'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [{ key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' }];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPips({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('pips.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: PerformanceImprovementPlan }): void {
    if (event.action === 'view') this.router.navigate(['/performance/pips', event.item.id, 'edit']);
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
