import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TimesheetService } from '../../../core/services/timesheet.service';
import { TimesheetPeriodDto } from '../../../shared/models/timesheet.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-periods',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './periods.component.html',
  styleUrl: './periods.component.css'
})
export class PeriodsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TimesheetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<TimesheetPeriodDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('timesheets.periods.name'), sortable: true, priority: 'high' },
    { key: 'branchName', label: this.i18n.t('timesheets.periods.branch'), sortable: true, priority: 'medium' },
    { key: 'periodType', label: this.i18n.t('timesheets.periods.period_type'), sortable: true, priority: 'medium', renderHtml: true },
    { key: 'startDate', label: this.i18n.t('timesheets.periods.start_date'), sortable: true, priority: 'high' },
    { key: 'endDate', label: this.i18n.t('timesheets.periods.end_date'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true },
    { key: 'timesheetCount', label: this.i18n.t('timesheets.periods.timesheet_count'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => item._status !== 'Locked' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item._timesheetCount === 0 }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getTimesheetPeriods({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/timesheets/periods/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  tableData = computed(() => this.data().map(item => ({
    ...item,
    _status: item.status,
    _timesheetCount: item.timesheetCount,
    startDate: new Date(item.startDate).toLocaleDateString(),
    endDate: new Date(item.endDate).toLocaleDateString(),
    periodType: `<span class="badge bg-info">${this.i18n.t(`timesheets.periods.type_${item.periodType.toLowerCase()}`)}</span>`,
    status: this.getStatusBadge(item.status)
  })));

  onActionClick(event: { action: string; item: any }): void {
    const original = this.data().find(d => d.id === event.item.id);
    if (!original) return;
    if (event.action === 'view') this.router.navigate(['/timesheets/periods', original.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/timesheets/periods', original.id, 'edit']);
    else if (event.action === 'delete') this.deleteItem(original);
  }

  async deleteItem(item: TimesheetPeriodDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('timesheets.periods.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteTimesheetPeriod(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('timesheets.periods.deleted')); this.loadData(); },
      error: (err) => this.notification.error(err?.error?.error || this.i18n.t('common.error'))
    });
  }

  private getStatusBadge(status: string): string {
    const map: Record<string, string> = { Open: 'success', Closed: 'warning', Locked: 'secondary' };
    const variant = map[status] || 'secondary';
    const label = this.i18n.t(`timesheets.periods.status_${status.toLowerCase()}`);
    return `<span class="badge bg-${variant}">${label}</span>`;
  }
}
