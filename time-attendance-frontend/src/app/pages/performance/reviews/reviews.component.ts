import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { PerformanceReview } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-performance-reviews',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class PerformanceReviewsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<PerformanceReview[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(r => ({
    ...r,
    _statusDisplay: `<span class="badge bg-${r.status === 'Completed' ? 'success' : r.status === 'SelfReview' || r.status === 'ManagerReview' ? 'info' : 'secondary'}">${r.status}</span>`,
    _ratingDisplay: r.finalRating != null ? String(r.finalRating) : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('fields.employee'), sortable: true, width: '18%' },
    { key: 'cycleName', label: this.i18n.t('performance_reviews.cycle'), sortable: true, width: '16%' },
    { key: 'reviewerName', label: this.i18n.t('performance_reviews.reviewer'), sortable: true, width: '16%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_ratingDisplay', label: this.i18n.t('performance_reviews.final_rating'), sortable: true, width: '10%' },
    { key: 'departmentName', label: this.i18n.t('fields.department'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [{ key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' }];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getReviews({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('performance_reviews.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: PerformanceReview }): void {
    if (event.action === 'view') this.router.navigate(['/performance/reviews', event.item.id, 'edit']);
  }

  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
