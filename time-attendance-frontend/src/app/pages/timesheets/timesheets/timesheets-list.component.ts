import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { TimesheetListDto } from '../../../shared/models/timesheet.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-timesheets-list',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './timesheets-list.component.html',
  styleUrl: './timesheets-list.component.css'
})
export class TimesheetsListComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<TimesheetListDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('timesheets.timesheets.employee'), sortable: true, priority: 'high' },
    { key: 'periodName', label: this.i18n.t('timesheets.timesheets.period'), sortable: true, priority: 'medium' },
    { key: 'totalHours', label: this.i18n.t('timesheets.timesheets.total_hours'), sortable: true, priority: 'high' },
    { key: 'regularHours', label: this.i18n.t('timesheets.timesheets.regular_hours'), sortable: true, priority: 'medium' },
    { key: 'overtimeHours', label: this.i18n.t('timesheets.timesheets.overtime_hours'), sortable: true, priority: 'medium' },
    { key: 'entryCount', label: this.i18n.t('timesheets.timesheets.entries'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getTimesheets({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  tableData = computed(() => this.data().map(item => ({
    ...item,
    status: this.getStatusBadge(item.status)
  })));

  onActionClick(event: { action: string; item: any }): void {
    if (event.action === 'view') this.router.navigate(['/timesheets/timesheets', event.item.id, 'view']);
  }

  private getStatusBadge(status: string): string {
    const map: Record<string, string> = { Draft: 'secondary', Submitted: 'primary', Approved: 'success', Rejected: 'danger', Recalled: 'warning' };
    return `<span class="badge bg-${map[status] || 'secondary'}">${this.i18n.t(`timesheets.timesheets.status_${status.toLowerCase()}`)}</span>`;
  }
}
