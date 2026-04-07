import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { CompensatoryOffService } from '../../../core/services/compensatory-off.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { CompensatoryOff } from '../../../shared/models/compensatory-off.model';

@Component({
  selector: 'app-compensatory-offs',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './compensatory-offs.component.html',
  styleUrls: ['./compensatory-offs.component.css']
})
export class CompensatoryOffsComponent implements OnInit {
  private service = inject(CompensatoryOffService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  items = signal<CompensatoryOff[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');
  statusFilter = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'earnedDateDisplay', label: this.t('compensatory_offs.earned_date'), sortable: true, width: '130px', priority: 'high', mobileLabel: this.t('compensatory_offs.earned_date') },
    { key: 'expiryDateDisplay', label: this.t('compensatory_offs.expiry_date'), sortable: true, width: '130px', priority: 'medium', mobileLabel: this.t('compensatory_offs.expiry_date') },
    { key: 'hoursWorked', label: this.t('compensatory_offs.hours_worked'), sortable: false, width: '110px', align: 'center', priority: 'medium', mobileLabel: this.t('compensatory_offs.hours_worked') },
    { key: 'statusBadge', label: this.t('common.status'), sortable: false, width: '130px', align: 'center', priority: 'high', mobileLabel: this.t('common.status'), renderHtml: true }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info' }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    earnedDateDisplay: this.formatDate(item.earnedDate),
    expiryDateDisplay: this.formatDate(item.expiryDate),
    statusBadge: this.formatStatus(item.status)
  })));

  ngOnInit(): void { this.loadData(); }
  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    const params: any = { page: this.currentPage(), pageSize: this.pageSize() };
    if (this.searchTerm()) params.search = this.searchTerm();
    if (this.statusFilter()) params.status = this.statusFilter();
    this.service.getAll(params).subscribe({
      next: (res: any) => { this.items.set(res?.items || res?.data || []); this.totalCount.set(res?.totalCount || 0); this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize())); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('compensatory_offs.load_error')); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' }); }

  formatStatus(status: string): string {
    const map: Record<string, string> = { Available: 'bg-success', Used: 'bg-info', Expired: 'bg-secondary', Cancelled: 'bg-danger' };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${this.t('compensatory_offs.status_' + status.toLowerCase())}</span>`;
  }

  onActionClick(event: { action: string; item: any }): void {
    if (event.action === 'view') this.router.navigate(['/leave-management/compensatory-offs', event.item.id, 'view']);
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/leave-management/compensatory-offs/create']); }
}
