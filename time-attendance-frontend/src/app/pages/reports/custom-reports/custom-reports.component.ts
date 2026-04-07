import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CustomReportService } from '../../../core/services/custom-report.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CustomReportDefinition } from '../../../shared/models/custom-report.model';

@Component({
  selector: 'app-custom-reports',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './custom-reports.component.html',
  styleUrls: ['./custom-reports.component.css']
})
export class CustomReportsComponent implements OnInit {
  private service = inject(CustomReportService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  items = signal<CustomReportDefinition[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'name', label: this.t('custom_reports.name'), sortable: true, width: '200px', priority: 'high', mobileLabel: this.t('custom_reports.name') },
    { key: 'dataSource', label: this.t('custom_reports.data_source'), sortable: false, width: '150px', priority: 'medium', mobileLabel: this.t('custom_reports.data_source') },
    { key: 'publicBadge', label: this.t('custom_reports.is_public'), sortable: false, width: '100px', align: 'center', priority: 'medium', mobileLabel: this.t('custom_reports.is_public'), renderHtml: true },
    { key: 'scheduledReportCount', label: this.t('custom_reports.schedules'), sortable: false, width: '100px', align: 'center', priority: 'medium', mobileLabel: this.t('custom_reports.schedules') },
    { key: 'createdByUsername', label: this.t('fields.createdBy'), sortable: false, width: '140px', priority: 'medium', mobileLabel: this.t('fields.createdBy') }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    publicBadge: item.isPublic
      ? `<span class="badge bg-success">${this.t('common.yes')}</span>`
      : `<span class="badge bg-secondary">${this.t('common.no')}</span>`
  })));

  ngOnInit(): void { this.loadData(); }
  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm()) params.search = this.searchTerm();
    this.service.getAll(params).subscribe({
      next: (res: any) => { this.items.set(res?.items || res?.data || []); this.totalCount.set(res?.totalCount || 0); this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize())); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('custom_reports.load_error')); }
    });
  }

  async onActionClick(event: { action: string; item: any }): Promise<void> {
    if (event.action === 'view') {
      this.router.navigate(['/reports/custom-reports', event.item.id, 'view']);
    } else if (event.action === 'edit') {
      this.router.navigate(['/reports/custom-reports', event.item.id, 'edit']);
    } else if (event.action === 'delete') {
      const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('custom_reports.delete_confirm'), confirmText: this.t('common.delete'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-danger', icon: 'fa-trash', iconClass: 'text-danger' });
      if (result.confirmed) {
        this.service.delete(event.item.id).subscribe({
          next: () => { this.notificationService.success(this.t('app.success'), this.t('custom_reports.deleted_successfully')); this.loadData(); },
          error: () => this.notificationService.error(this.t('app.error'), this.t('custom_reports.delete_error'))
        });
      }
    }
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/reports/custom-reports/create']); }
}
