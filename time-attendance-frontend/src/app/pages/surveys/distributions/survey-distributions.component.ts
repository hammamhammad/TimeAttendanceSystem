import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SurveyService } from '../../../core/services/survey.service';
import { SurveyDistributionDto, SurveyDistributionStatus, SurveyType } from '../../../shared/models/survey.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-survey-distributions',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './survey-distributions.component.html',
  styleUrl: './survey-distributions.component.css'
})
export class SurveyDistributionsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(SurveyService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<SurveyDistributionDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  statusFilter = signal('');
  typeFilter = signal('');

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  statusOptions = Object.values(SurveyDistributionStatus);
  typeOptions = Object.values(SurveyType);

  columns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('surveys.dist_title'), sortable: true, priority: 'high' },
    { key: 'templateName', label: this.i18n.t('surveys.template'), sortable: true, priority: 'medium' },
    { key: '_statusDisplay', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: '_completionDisplay', label: this.i18n.t('surveys.completion_rate'), sortable: true, priority: 'medium', renderHtml: true },
    { key: '_endDateDisplay', label: this.i18n.t('surveys.end_date'), sortable: true, priority: 'low' }
  ];

  tableData = computed(() => {
    return this.data().map(item => ({
      ...item,
      _statusDisplay: this.getStatusBadgeHtml(item.status),
      _completionDisplay: `<div class="d-flex align-items-center gap-2"><div class="progress flex-grow-1" style="height: 6px; max-width: 100px;"><div class="progress-bar" style="width: ${item.completionRate}%"></div></div><small>${item.completionRate}%</small></div>`,
      _endDateDisplay: item.endDate ? new Date(item.endDate).toLocaleDateString() : '-'
    }));
  });

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'results', label: this.i18n.t('surveys.results'), icon: 'fa-chart-bar', color: 'success', condition: (item: any) => item.status === 'Active' || item.status === 'Closed' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => item.status === 'Draft' || item.status === 'Scheduled' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item.status === 'Draft' }
  ]);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.service.getDistributions({
      search: this.searchTerm(),
      status: this.statusFilter() || undefined,
      surveyType: this.typeFilter() || undefined,
      pageNumber: this.currentPage(),
      pageSize: this.pageSize()
    }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/surveys/distributions/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onStatusChange(value: string): void { this.statusFilter.set(value); this.currentPage.set(1); this.loadData(); }
  onTypeChange(value: string): void { this.typeFilter.set(value); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: SurveyDistributionDto }): void {
    if (event.action === 'view') {
      this.router.navigate(['/surveys/distributions', event.item.id, 'view']);
    } else if (event.action === 'edit') {
      this.router.navigate(['/surveys/distributions', event.item.id, 'edit']);
    } else if (event.action === 'results') {
      this.router.navigate(['/surveys/distributions', event.item.id, 'results']);
    } else if (event.action === 'delete') {
      this.deleteDistribution(event.item);
    }
  }

  async deleteDistribution(item: SurveyDistributionDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('surveys.confirm_delete_distribution'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteDistribution(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('surveys.distribution_deleted')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  getStatusBadgeHtml(status: string): string {
    const map: Record<string, string> = { Draft: 'bg-secondary', Scheduled: 'bg-info', Active: 'bg-success', Closed: 'bg-dark', Cancelled: 'bg-danger' };
    const cls = 'badge ' + (map[status] ?? 'bg-secondary');
    return `<span class="${cls}">${this.i18n.t('surveys.status_' + status)}</span>`;
  }
}
