import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface MyTimesheetDto {
  id: number;
  timesheetPeriodId: number;
  periodName: string;
  periodStartDate: string;
  periodEndDate: string;
  status: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  submittedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  notes: string | null;
  entryCount: number;
  createdAtUtc: string;
}

@Component({
  selector: 'app-my-timesheets',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './my-timesheets.component.html',
  styleUrl: './my-timesheets.component.css'
})
export class MyTimesheetsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  timesheets = signal<MyTimesheetDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'periodName', label: this.i18n.t('portal.timesheets.period'), sortable: true, priority: 'high' },
    { key: 'dateRange', label: this.i18n.t('portal.timesheets.date_range'), sortable: false, priority: 'medium' },
    { key: 'totalHours', label: this.i18n.t('portal.timesheets.total_hours'), sortable: true, priority: 'high' },
    { key: 'entryCount', label: this.i18n.t('portal.timesheets.entries'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'bi-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'bi-pencil', color: 'primary',
      condition: (item: any) => item._status === 'Draft' || item._status === 'Rejected' || item._status === 'Recalled' }
  ]);

  tableData = computed(() => this.timesheets().map(t => ({
    ...t,
    _status: t.status,
    dateRange: `${new Date(t.periodStartDate).toLocaleDateString()} - ${new Date(t.periodEndDate).toLocaleDateString()}`,
    status: this.getStatusBadgeHtml(t.status)
  })));

  ngOnInit(): void { this.loadData(); }

  refresh(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    let params = new HttpParams()
      .set('pageNumber', this.currentPage())
      .set('pageSize', this.pageSize());
    this.http.get<{ data: MyTimesheetDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-timesheets`, { params }).subscribe({
      next: (res) => { this.timesheets.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  createTimesheet(): void { this.router.navigate(['/my-timesheets/new']); }

  onActionClick(event: { action: string; item: any }): void {
    const original = this.timesheets().find(t => t.id === event.item.id);
    if (!original) return;
    if (event.action === 'view') this.router.navigate(['/my-timesheets', original.id]);
    else if (event.action === 'edit') this.router.navigate(['/my-timesheets', original.id, 'edit']);
  }

  getStatusBadgeHtml(status: string): string {
    const map: Record<string, { bg: string; key: string }> = {
      Draft: { bg: 'secondary', key: 'portal.timesheets.status_draft' },
      Submitted: { bg: 'primary', key: 'portal.timesheets.status_submitted' },
      Approved: { bg: 'success', key: 'portal.timesheets.status_approved' },
      Rejected: { bg: 'danger', key: 'portal.timesheets.status_rejected' },
      Recalled: { bg: 'warning', key: 'portal.timesheets.status_recalled' }
    };
    const info = map[status] || { bg: 'secondary', key: status };
    return `<span class="badge bg-${info.bg}">${this.i18n.t(info.key)}</span>`;
  }
}
