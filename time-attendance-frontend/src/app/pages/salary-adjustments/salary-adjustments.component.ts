import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { SalaryAdjustmentService } from '../../core/services/salary-adjustment.service';
import {
  SalaryAdjustment,
  AdjustmentStatus,
  AdjustmentType,
  SalaryAdjustmentQueryParams
} from '../../shared/models/salary-adjustment.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-salary-adjustments',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './salary-adjustments.component.html',
  styleUrls: ['./salary-adjustments.component.css']
})
export class SalaryAdjustmentsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SalaryAdjustmentService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  // State
  adjustments = signal<SalaryAdjustment[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  // Computed display data
  displayData = computed(() => {
    return this.adjustments().map(a => ({
      ...a,
      _statusDisplay: this.formatStatus(a.status),
      _typeDisplay: this.formatType(a.adjustmentType),
      _currentSalaryDisplay: `${a.currentSalary.toLocaleString()} ${a.currency}`,
      _newSalaryDisplay: `${a.newSalary.toLocaleString()} ${a.currency}`,
      _percentageDisplay: `${a.percentageChange >= 0 ? '+' : ''}${a.percentageChange.toFixed(1)}%`,
      _effectiveDateDisplay: a.effectiveDate ? new Date(a.effectiveDate).toLocaleDateString() : '--'
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('salary_adjustments.employee'), sortable: true, width: '15%' },
    { key: '_typeDisplay', label: this.i18n.t('salary_adjustments.adjustment_type'), sortable: true, width: '13%' },
    { key: '_currentSalaryDisplay', label: this.i18n.t('salary_adjustments.current_salary'), sortable: true, width: '13%', align: 'right' },
    { key: '_newSalaryDisplay', label: this.i18n.t('salary_adjustments.new_salary'), sortable: true, width: '13%', align: 'right' },
    { key: '_percentageDisplay', label: this.i18n.t('salary_adjustments.percentage_change'), sortable: true, width: '10%', align: 'right' },
    { key: '_effectiveDateDisplay', label: this.i18n.t('salary_adjustments.effective_date'), sortable: true, width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('salary_adjustments.status'), sortable: true, width: '10%', renderHtml: true }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'primary'
    },
    {
      key: 'edit',
      label: this.i18n.t('common.edit'),
      icon: 'fa-edit',
      color: 'secondary',
      condition: (item: SalaryAdjustment) => item.status === AdjustmentStatus.Draft
    },
    {
      key: 'submit',
      label: this.i18n.t('salary_adjustments.submit'),
      icon: 'fa-paper-plane',
      color: 'info',
      condition: (item: SalaryAdjustment) => item.status === AdjustmentStatus.Draft
    },
    {
      key: 'approve',
      label: this.i18n.t('salary_adjustments.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: SalaryAdjustment) => item.status === AdjustmentStatus.Pending
    },
    {
      key: 'reject',
      label: this.i18n.t('salary_adjustments.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: SalaryAdjustment) => item.status === AdjustmentStatus.Pending
    },
    {
      key: 'cancel',
      label: this.i18n.t('common.cancel'),
      icon: 'fa-ban',
      color: 'warning',
      condition: (item: SalaryAdjustment) => item.status === AdjustmentStatus.Draft || item.status === AdjustmentStatus.Pending
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: SalaryAdjustmentQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.service.getAdjustments(params).subscribe({
      next: (result) => {
        this.adjustments.set(result.items || []);
        this.totalCount.set(result.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('salary_adjustments.load_error'));
        this.loading.set(false);
      }
    });
  }

  onTableAction(event: { action: string; item: SalaryAdjustment }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/salary-adjustments', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/salary-adjustments', item.id, 'edit']);
        break;
      case 'submit':
        this.submitAdjustment(item);
        break;
      case 'approve':
        this.approveAdjustment(item);
        break;
      case 'reject':
        this.rejectAdjustment(item);
        break;
      case 'cancel':
        this.cancelAdjustment(item);
        break;
    }
  }

  submitAdjustment(adjustment: SalaryAdjustment): void {
    this.confirmation.confirm({
      title: this.i18n.t('salary_adjustments.submit_title'),
      message: this.i18n.t('salary_adjustments.confirm_submit'),
      confirmText: this.i18n.t('salary_adjustments.submit'),
      confirmButtonClass: 'btn-info'
    }).then(result => {
      if (result.confirmed) {
        this.service.submitAdjustment(adjustment.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('salary_adjustments.submit_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('salary_adjustments.submit_error'))
        });
      }
    });
  }

  approveAdjustment(adjustment: SalaryAdjustment): void {
    this.confirmation.confirm({
      title: this.i18n.t('salary_adjustments.approve_title'),
      message: this.i18n.t('salary_adjustments.confirm_approve'),
      confirmText: this.i18n.t('salary_adjustments.approve'),
      confirmButtonClass: 'btn-success'
    }).then(result => {
      if (result.confirmed) {
        this.service.approveAdjustment(adjustment.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('salary_adjustments.approve_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('salary_adjustments.approve_error'))
        });
      }
    });
  }

  rejectAdjustment(adjustment: SalaryAdjustment): void {
    this.confirmation.confirm({
      title: this.i18n.t('salary_adjustments.reject_title'),
      message: this.i18n.t('salary_adjustments.confirm_reject'),
      confirmText: this.i18n.t('salary_adjustments.reject'),
      confirmButtonClass: 'btn-danger',
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.service.rejectAdjustment(adjustment.id, result.comments || '').subscribe({
          next: () => {
            this.notification.success(this.i18n.t('salary_adjustments.reject_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('salary_adjustments.reject_error'))
        });
      }
    });
  }

  cancelAdjustment(adjustment: SalaryAdjustment): void {
    this.confirmation.confirm({
      title: this.i18n.t('salary_adjustments.cancel_title'),
      message: this.i18n.t('salary_adjustments.confirm_cancel'),
      confirmText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning'
    }).then(result => {
      if (result.confirmed) {
        this.service.cancelAdjustment(adjustment.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('salary_adjustments.cancel_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('salary_adjustments.cancel_error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/salary-adjustments/create']);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadData();
  }

  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, searchTerm };
    this.currentPage.set(1);
    this.loadData();
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadData();
  }

  private formatStatus(status: AdjustmentStatus): string {
    const statusMap: Record<string, { label: string; class: string }> = {
      [AdjustmentStatus.Draft]: { label: this.i18n.t('salary_adjustments.status_draft'), class: 'badge bg-secondary' },
      [AdjustmentStatus.Pending]: { label: this.i18n.t('salary_adjustments.status_pending'), class: 'badge bg-info' },
      [AdjustmentStatus.Approved]: { label: this.i18n.t('salary_adjustments.status_approved'), class: 'badge bg-success' },
      [AdjustmentStatus.Rejected]: { label: this.i18n.t('salary_adjustments.status_rejected'), class: 'badge bg-danger' },
      [AdjustmentStatus.Applied]: { label: this.i18n.t('salary_adjustments.status_applied'), class: 'badge bg-primary' },
      [AdjustmentStatus.Cancelled]: { label: this.i18n.t('salary_adjustments.status_cancelled'), class: 'badge bg-dark' }
    };
    const info = statusMap[status] || { label: String(status), class: 'badge bg-light text-dark' };
    return `<span class="${info.class}">${info.label}</span>`;
  }

  private formatType(type: AdjustmentType): string {
    const typeMap: Record<string, string> = {
      [AdjustmentType.AnnualIncrement]: this.i18n.t('salary_adjustments.type_annual_increment'),
      [AdjustmentType.PerformanceBonus]: this.i18n.t('salary_adjustments.type_performance_bonus'),
      [AdjustmentType.MarketAdjustment]: this.i18n.t('salary_adjustments.type_market_adjustment'),
      [AdjustmentType.PromotionIncrease]: this.i18n.t('salary_adjustments.type_promotion_increase'),
      [AdjustmentType.CostOfLivingAdjustment]: this.i18n.t('salary_adjustments.type_cost_of_living_adjustment'),
      [AdjustmentType.ContractRenewal]: this.i18n.t('salary_adjustments.type_contract_renewal'),
      [AdjustmentType.TransferAdjustment]: this.i18n.t('salary_adjustments.type_transfer_adjustment'),
      [AdjustmentType.Correction]: this.i18n.t('salary_adjustments.type_correction'),
      [AdjustmentType.Demotion]: this.i18n.t('salary_adjustments.type_demotion'),
      [AdjustmentType.AllowanceChange]: this.i18n.t('salary_adjustments.type_allowance_change'),
      [AdjustmentType.Other]: this.i18n.t('salary_adjustments.type_other')
    };
    return typeMap[type] || String(type);
  }
}
