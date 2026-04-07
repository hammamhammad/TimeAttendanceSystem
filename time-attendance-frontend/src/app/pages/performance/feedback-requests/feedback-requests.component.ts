import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { FeedbackRequest360 } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-feedback-requests',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './feedback-requests.component.html',
  styleUrls: ['./feedback-requests.component.css']
})
export class FeedbackRequestsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<FeedbackRequest360[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _statusDisplay: this.formatStatus(item.status),
    _deadlineDisplay: item.deadline ? new Date(item.deadline).toLocaleDateString() : '-',
    _submittedDisplay: item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'revieweeName', label: this.i18n.t('feedback_360.reviewee'), sortable: true, width: '18%' },
    { key: 'requestedFromName', label: this.i18n.t('feedback_360.reviewer'), sortable: true, width: '18%' },
    { key: 'cycleName', label: this.i18n.t('feedback_360.cycle'), sortable: true, width: '16%' },
    { key: '_deadlineDisplay', label: this.i18n.t('feedback_360.deadline'), sortable: true, width: '14%' },
    { key: '_statusDisplay', label: this.i18n.t('feedback_360.status'), sortable: true, width: '12%', renderHtml: true },
    { key: '_submittedDisplay', label: this.i18n.t('feedback_360.submitted_at'), sortable: true, width: '14%' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' }
  ];

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getFeedbackRequests({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('feedback_360.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: FeedbackRequest360 }): void {
    if (event.action === 'view') this.router.navigate(['/performance/feedback-requests', event.item.id, 'view']);
  }

  navigateToCreate(): void { this.router.navigate(['/performance/feedback-requests/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Requested': 'warning', 'Submitted': 'success', 'Expired': 'dark', 'Declined': 'danger' };
    return `<span class="badge bg-${map[s] || 'secondary'}">${this.i18n.t('feedback_360.status_' + s)}</span>`;
  }
}
