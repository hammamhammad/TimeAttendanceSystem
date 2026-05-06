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
import { BenefitPlan } from '../../../shared/models/benefit.model';

@Component({
  selector: 'app-benefit-plans',
  standalone: true,
  imports: [FormsModule, DataTableComponent, UnifiedFilterComponent, PageHeaderComponent],
  templateUrl: './benefit-plans.component.html',
  styleUrls: ['./benefit-plans.component.css']
})
export class BenefitPlansComponent implements OnInit {
  private benefitService = inject(BenefitService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  readonly PERMISSIONS = {
    CREATE: 'benefitPlan.create',
    READ: 'benefitPlan.read',
    UPDATE: 'benefitPlan.update',
    DELETE: 'benefitPlan.update'
  };

  loading = signal(false);
  items = signal<BenefitPlan[]>([]);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  searchTerm = signal('');

  tableColumns = computed<TableColumn[]>(() => [
    { key: 'code', label: this.t('benefits.plans.code'), sortable: true, width: '100px', priority: 'high', mobileLabel: this.t('benefits.plans.code') },
    { key: 'name', label: this.t('common.name'), sortable: true, width: '200px', priority: 'high', mobileLabel: this.t('common.name') },
    { key: 'benefitTypeBadge', label: this.t('benefits.plans.benefit_type'), sortable: false, width: '120px', align: 'center', priority: 'medium', mobileLabel: this.t('benefits.plans.benefit_type'), renderHtml: true },
    { key: 'planYear', label: this.t('benefits.plans.plan_year'), sortable: true, width: '100px', align: 'center', priority: 'medium', mobileLabel: this.t('benefits.plans.plan_year') },
    { key: 'premiumDisplay', label: this.t('benefits.plans.employee_premium'), sortable: false, width: '140px', align: 'center', priority: 'medium', hideOnMobile: true, mobileLabel: this.t('benefits.plans.employee_premium') },
    { key: 'statusBadge', label: this.t('common.status'), sortable: false, width: '100px', align: 'center', priority: 'high', mobileLabel: this.t('common.status'), renderHtml: true }
  ]);

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.t('common.view'), icon: 'fa-eye', color: 'info', condition: () => this.permissionService.has(this.PERMISSIONS.READ) },
    { key: 'edit', label: this.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: () => this.permissionService.has(this.PERMISSIONS.UPDATE) },
    { key: 'delete', label: this.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: () => this.permissionService.has(this.PERMISSIONS.DELETE) }
  ]);

  tableData = computed(() => this.items().map(item => ({
    ...item,
    benefitTypeBadge: `<span class="badge bg-primary">${this.t('benefits.types.' + item.benefitType.toLowerCase())}</span>`,
    premiumDisplay: `${item.employeePremiumAmount?.toFixed(2)} ${item.currency}`,
    statusBadge: item.isActive
      ? `<span class="badge bg-success">${this.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.t('common.inactive')}</span>`
  })));

  ngOnInit(): void { this.loadData(); }

  t(key: string): string { return this.i18n.t(key); }

  loadData(): void {
    this.loading.set(true);
    this.benefitService.getBenefitPlans(this.currentPage(), this.pageSize(), undefined, undefined, undefined, undefined, this.searchTerm() || undefined).subscribe({
      next: (res) => {
        this.items.set(res?.data || []);
        this.totalCount.set(res?.totalCount || 0);
        this.totalPages.set(Math.ceil((res?.totalCount || 0) / this.pageSize()));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notificationService.error(this.t('app.error'), this.t('benefits.plans.load_error'));
      }
    });
  }

  onActionClick(event: { action: string; item: any }): void {
    switch (event.action) {
      case 'view': this.router.navigate(['/benefits/plans', event.item.id, 'view']); break;
      case 'edit': this.router.navigate(['/benefits/plans', event.item.id, 'edit']); break;
      case 'delete': this.onDelete(event.item); break;
    }
  }

  async onDelete(item: BenefitPlan): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.t('common.confirm'), message: this.t('benefits.plans.delete_confirm'),
      confirmText: this.t('common.delete'), cancelText: this.t('common.cancel'),
      confirmButtonClass: 'btn-danger', icon: 'fa-trash', iconClass: 'text-danger'
    });
    if (result.confirmed) {
      this.benefitService.deleteBenefitPlan(item.id).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.plans.deleted_success')); this.loadData(); },
        error: (err) => { this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.plans.delete_error')); }
      });
    }
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.searchTerm.set(''); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/benefits/plans/create']); }
}
