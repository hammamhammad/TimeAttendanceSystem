import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { BenefitService } from '../../../core/services/benefit.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { OpenEnrollmentPeriod } from '../../../shared/models/benefit.model';

@Component({
  selector: 'app-enrollment-periods',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './enrollment-periods.component.html',
  styleUrls: ['./enrollment-periods.component.css']
})
export class EnrollmentPeriodsComponent implements OnInit {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    CREATE: 'openEnrollmentPeriod.create',
    READ: 'openEnrollmentPeriod.read',
    UPDATE: 'openEnrollmentPeriod.update'
  };

  loading = signal(false);
  items = signal<OpenEnrollmentPeriod[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'name', label: this.t('common.name'), sortable: true, width: '200px', priority: 'high', mobileLabel: this.t('common.name') },
    { key: 'planYear', label: this.t('benefits.periods.plan_year'), sortable: true, width: '100px', align: 'center', priority: 'medium', mobileLabel: this.t('benefits.periods.plan_year') },
    { key: 'branchDisplay', label: this.t('common.branch'), sortable: false, width: '150px', priority: 'medium', mobileLabel: this.t('common.branch') },
    { key: 'startDateDisplay', label: this.t('benefits.periods.start_date'), sortable: true, width: '130px', priority: 'medium', mobileLabel: this.t('benefits.periods.start_date') },
    { key: 'endDateDisplay', label: this.t('benefits.periods.end_date'), sortable: true, width: '130px', priority: 'medium', hideOnMobile: true, mobileLabel: this.t('benefits.periods.end_date') },
    { key: 'statusBadge', label: this.t('common.status'), sortable: false, width: '120px', align: 'center', priority: 'high', mobileLabel: this.t('common.status'), renderHtml: true }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info', condition: () => this.permissionService.has(this.PERMISSIONS.READ) },
    { key: 'edit', label: this.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status !== 'Closed' },
    { key: 'open', label: this.t('benefits.periods.open_action'), icon: 'fa-door-open', color: 'success', condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status === 'Upcoming' },
    { key: 'close', label: this.t('benefits.periods.close_action'), icon: 'fa-door-closed', color: 'warning', condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status === 'Open' },
    { key: 'delete', label: this.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => this.permissionService.has(this.PERMISSIONS.UPDATE) && item.status !== 'Open' }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    branchDisplay: item.branchName || this.t('common.all'),
    startDateDisplay: this.formatDate(item.startDate),
    endDateDisplay: this.formatDate(item.endDate),
    statusBadge: this.formatStatus(item.status)
  })));

  ngOnInit(): void { this.loadData(); }
  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    this.benefitService.getOpenEnrollmentPeriods(this.currentPage(), this.pageSize(), undefined, undefined, undefined, this.searchTerm() || undefined).subscribe({
      next: (res) => { this.items.set(res?.data || []); this.totalCount.set(res?.totalCount || 0); this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize())); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('benefits.periods.load_error')); }
    });
  }

  formatDate(d: string): string {
    if (!d) return '-';
    return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatStatus(status: string): string {
    const map: Record<string, string> = { Upcoming: 'bg-info', Open: 'bg-success', Closed: 'bg-secondary', Cancelled: 'bg-danger' };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${this.t('benefits.periods.status_' + status.toLowerCase())}</span>`;
  }

  onActionClick(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'view': this.router.navigate(['/benefits/enrollment-periods', event.item.id, 'view']); break;
      case 'edit': this.router.navigate(['/benefits/enrollment-periods', event.item.id, 'edit']); break;
      case 'open': this.onOpenPeriod(event.item); break;
      case 'close': this.onClosePeriod(event.item); break;
      case 'delete': this.onDelete(event.item); break;
    }
  }

  async onOpenPeriod(item: OpenEnrollmentPeriod): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'), message: this.t('benefits.periods.open_confirm'),
      confirmText: this.t('benefits.periods.open_action'), cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-success', icon: 'fa-door-open', iconClass: 'text-success'
    });
    if (result.confirmed) {
      this.benefitService.openEnrollmentPeriod(item.id).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.opened_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.open_error'))
      });
    }
  }

  async onClosePeriod(item: OpenEnrollmentPeriod): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'), message: this.t('benefits.periods.close_confirm'),
      confirmText: this.t('benefits.periods.close_action'), cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-warning', icon: 'fa-door-closed', iconClass: 'text-warning'
    });
    if (result.confirmed) {
      this.benefitService.closeEnrollmentPeriod(item.id).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.closed_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.close_error'))
      });
    }
  }

  async onDelete(item: OpenEnrollmentPeriod): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'), message: this.t('benefits.periods.delete_confirm'),
      confirmText: this.t('common.delete'), cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger', icon: 'fa-trash', iconClass: 'text-danger'
    });
    if (result.confirmed) {
      this.benefitService.deleteOpenEnrollmentPeriod(item.id).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.periods.deleted_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.periods.delete_error'))
      });
    }
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/benefits/enrollment-periods/create']); }
}
