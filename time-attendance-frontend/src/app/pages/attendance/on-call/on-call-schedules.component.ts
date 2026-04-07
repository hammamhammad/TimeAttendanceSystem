import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { OnCallScheduleService } from '../../../core/services/on-call-schedule.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { OnCallSchedule } from '../../../shared/models/on-call-schedule.model';

@Component({
  selector: 'app-on-call-schedules',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './on-call-schedules.component.html',
  styleUrls: ['./on-call-schedules.component.css']
})
export class OnCallSchedulesComponent implements OnInit {
  private service = inject(OnCallScheduleService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);

  loading = signal(false);
  items = signal<OnCallSchedule[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.i18n.t('onCall.employee'), sortable: true },
    { key: 'onCallTypeName', label: this.i18n.t('onCall.on_call_type'), sortable: true },
    { key: 'startDateDisplay', label: this.i18n.t('onCall.start_date') },
    { key: 'endDateDisplay', label: this.i18n.t('onCall.end_date') },
    { key: 'isActiveBadge', label: this.i18n.t('onCall.is_active'), renderHtml: true },
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' },
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    startDateDisplay: this.formatDate(item.startDate),
    endDateDisplay: this.formatDate(item.endDate),
    isActiveBadge: item.isActive
      ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`
  })));

  ngOnInit() { this.loadData(); }

  formatDate(d: string): string {
    if (!d) return '-';
    return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' });
  }

  loadData() {
    this.loading.set(true);
    this.service.getAll({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res: any) => {
        this.items.set(res.items || []);
        this.totalCount.set(res.totalCount || 0);
        this.loading.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.load_error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string) { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData() { this.currentPage.set(1); this.loadData(); }
  navigateToCreate() { this.router.navigate(['/attendance/on-call/create']); }
  onPageChange(page: number) { this.currentPage.set(page); this.loadData(); }

  onTableAction(event: { action: string; item: any }) {
    switch (event.action) {
      case 'view': this.router.navigate(['/attendance/on-call', event.item.id, 'view']); break;
      case 'edit': this.router.navigate(['/attendance/on-call', event.item.id, 'edit']); break;
      case 'delete':
        this.confirmationService.confirm({
          title: this.i18n.t('common.delete'),
          message: this.i18n.t('common.confirm_delete'),
          confirmText: this.i18n.t('common.delete')
        }).then(result => {
          if (result.confirmed) {
            this.service.delete(event.item.id).subscribe({
              next: () => { this.notification.success(this.i18n.t('common.deleted')); this.loadData(); },
              error: () => this.notification.error(this.i18n.t('common.delete_error'))
            });
          }
        });
        break;
    }
  }
}
