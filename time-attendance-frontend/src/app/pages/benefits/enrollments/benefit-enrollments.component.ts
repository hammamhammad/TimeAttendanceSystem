import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { BenefitService } from '../../../core/services/benefit.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { BenefitEnrollment } from '../../../shared/models/benefit.model';

@Component({
  selector: 'app-benefit-enrollments',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './benefit-enrollments.component.html',
  styleUrls: ['./benefit-enrollments.component.css']
})
export class BenefitEnrollmentsComponent implements OnInit {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = { READ: 'benefitEnrollment.read', CREATE: 'benefitEnrollment.create' };

  loading = signal(false);
  items = signal<BenefitEnrollment[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'benefitPlanName', label: this.t('benefits.enrollments.plan'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('benefits.enrollments.plan') },
    { key: 'benefitTypeBadge', label: this.t('benefits.plans.benefit_type'), sortable: false, width: '110px', align: 'center', priority: 'medium', mobileLabel: this.t('benefits.plans.benefit_type'), renderHtml: true },
    { key: 'contributionDisplay', label: this.t('benefits.enrollments.employee_contribution'), sortable: false, width: '140px', align: 'center', priority: 'medium', hideOnMobile: true, mobileLabel: this.t('benefits.enrollments.employee_contribution') },
    { key: 'effectiveDateDisplay', label: this.t('benefits.enrollments.effective_date'), sortable: true, width: '130px', priority: 'medium', mobileLabel: this.t('benefits.enrollments.effective_date') },
    { key: 'statusBadge', label: this.t('common.status'), sortable: false, width: '130px', align: 'center', priority: 'high', mobileLabel: this.t('common.status'), renderHtml: true }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info', condition: () => this.permissionService.has(this.PERMISSIONS.READ) }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    benefitTypeBadge: `<span class="badge bg-primary">${this.t('benefits.types.' + (item.benefitType || 'other').toLowerCase())}</span>`,
    contributionDisplay: `${item.employeeMonthlyContribution?.toFixed(2)} ${item.currency}`,
    effectiveDateDisplay: this.formatDate(item.effectiveDate),
    statusBadge: this.formatEnrollmentStatus(item.status)
  })));

  ngOnInit(): void { this.loadData(); }
  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    this.benefitService.getBenefitEnrollments(this.currentPage(), this.pageSize(), undefined, undefined, undefined, undefined, this.searchTerm() || undefined).subscribe({
      next: (res) => { this.items.set(res?.data || []); this.totalCount.set(res?.totalCount || 0); this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize())); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('benefits.enrollments.load_error')); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' }); }

  formatEnrollmentStatus(status: string): string {
    const map: Record<string, string> = { Pending: 'bg-secondary', Active: 'bg-success', Suspended: 'bg-warning text-dark', Terminated: 'bg-danger', Cancelled: 'bg-danger', PendingApproval: 'bg-info' };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${this.t('benefits.enrollments.status_' + status.toLowerCase())}</span>`;
  }

  onActionClick(event: { action: string; item: any }): void {
    if (event.action === 'view') this.router.navigate(['/benefits/enrollments', event.item.id, 'edit']);
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
}
