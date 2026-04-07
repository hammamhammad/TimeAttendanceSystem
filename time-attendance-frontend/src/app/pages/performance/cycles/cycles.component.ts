import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { PerformanceReviewCycle } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-performance-cycles',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class PerformanceCyclesComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<PerformanceReviewCycle[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(c => ({
    ...c,
    _statusDisplay: this.formatStatus(c.status),
    _reviewsDisplay: `${c.completedReviews || 0}/${c.totalReviews || c.reviewCount || 0}`
  })));

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('performance_cycles.name'), sortable: true, width: '22%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: 'startDate', label: this.i18n.t('fields.start_date'), sortable: true, width: '14%' },
    { key: 'endDate', label: this.i18n.t('fields.end_date'), sortable: true, width: '14%' },
    { key: '_reviewsDisplay', label: this.i18n.t('performance_cycles.reviews_completed'), sortable: false, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'activate', label: this.i18n.t('common.activate'), icon: 'fa-play', color: 'success', condition: (i: PerformanceReviewCycle) => i.status === 'Draft' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getCycles({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('performance_cycles.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: PerformanceReviewCycle }): void {
    if (event.action === 'view') this.router.navigate(['/performance/cycles', event.item.id, 'view']);
    if (event.action === 'activate') this.service.activateCycle(event.item.id).subscribe({ next: () => { this.notification.success(this.i18n.t('performance_cycles.activated_success')); this.loadData(); } });
  }

  navigateToCreate(): void { this.router.navigate(['/performance/cycles/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Draft': 'secondary', 'Active': 'success', 'InReview': 'info', 'Completed': 'primary', 'Cancelled': 'dark' };
    return `<span class="badge bg-${map[s] || 'secondary'}">${s}</span>`;
  }
}
