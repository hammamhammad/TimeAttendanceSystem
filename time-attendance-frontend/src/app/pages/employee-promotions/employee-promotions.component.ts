import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { EmployeePromotionService } from '../../core/services/employee-promotion.service';
import {
  EmployeePromotion,
  PromotionStatus,
  PromotionQueryParams
} from '../../shared/models/employee-promotion.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-employee-promotions',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './employee-promotions.component.html',
  styleUrls: ['./employee-promotions.component.css']
})
export class EmployeePromotionsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(EmployeePromotionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  // State
  promotions = signal<EmployeePromotion[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  // Computed display data
  displayData = computed(() => {
    return this.promotions().map(p => ({
      ...p,
      _statusDisplay: this.formatStatus(p.status),
      _jobTitleChange: `${p.oldJobTitle} → ${p.newJobTitle}`,
      _gradeChange: (p.oldGradeName || p.newGradeName) ? `${p.oldGradeName || '--'} → ${p.newGradeName || '--'}` : '--',
      _effectiveDateDisplay: p.effectiveDate ? new Date(p.effectiveDate).toLocaleDateString() : '--'
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('employee_promotions.employee'), sortable: true, width: '16%' },
    { key: '_jobTitleChange', label: this.i18n.t('employee_promotions.job_title_change'), sortable: false, width: '22%' },
    { key: '_gradeChange', label: this.i18n.t('employee_promotions.grade_change'), sortable: false, width: '18%' },
    { key: '_effectiveDateDisplay', label: this.i18n.t('employee_promotions.effective_date'), sortable: true, width: '13%' },
    { key: '_statusDisplay', label: this.i18n.t('employee_promotions.status'), sortable: true, width: '11%', renderHtml: true }
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
      condition: (item: EmployeePromotion) => item.status === PromotionStatus.Pending
    },
    {
      key: 'approve',
      label: this.i18n.t('employee_promotions.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: EmployeePromotion) => item.status === PromotionStatus.Pending
    },
    {
      key: 'reject',
      label: this.i18n.t('employee_promotions.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: EmployeePromotion) => item.status === PromotionStatus.Pending
    },
    {
      key: 'cancel',
      label: this.i18n.t('common.cancel'),
      icon: 'fa-ban',
      color: 'warning',
      condition: (item: EmployeePromotion) => item.status === PromotionStatus.Pending
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: PromotionQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.service.getPromotions(params).subscribe({
      next: (result) => {
        this.promotions.set(result.items || []);
        this.totalCount.set(result.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('employee_promotions.load_error'));
        this.loading.set(false);
      }
    });
  }

  onTableAction(event: { action: string; item: EmployeePromotion }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/employee-promotions', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-promotions', item.id, 'edit']);
        break;
      case 'approve':
        this.approvePromotion(item);
        break;
      case 'reject':
        this.rejectPromotion(item);
        break;
      case 'cancel':
        this.cancelPromotion(item);
        break;
    }
  }

  approvePromotion(promotion: EmployeePromotion): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_promotions.approve_title'),
      message: this.i18n.t('employee_promotions.confirm_approve'),
      confirmText: this.i18n.t('employee_promotions.approve'),
      confirmButtonClass: 'btn-success'
    }).then(result => {
      if (result.confirmed) {
        this.service.approvePromotion(promotion.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_promotions.approve_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_promotions.approve_error'))
        });
      }
    });
  }

  rejectPromotion(promotion: EmployeePromotion): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_promotions.reject_title'),
      message: this.i18n.t('employee_promotions.confirm_reject'),
      confirmText: this.i18n.t('employee_promotions.reject'),
      confirmButtonClass: 'btn-danger',
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.service.rejectPromotion(promotion.id, result.comments || '').subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_promotions.reject_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_promotions.reject_error'))
        });
      }
    });
  }

  cancelPromotion(promotion: EmployeePromotion): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_promotions.cancel_title'),
      message: this.i18n.t('employee_promotions.confirm_cancel'),
      confirmText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning'
    }).then(result => {
      if (result.confirmed) {
        this.service.cancelPromotion(promotion.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_promotions.cancel_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_promotions.cancel_error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-promotions/create']);
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

  private formatStatus(status: PromotionStatus): string {
    const statusMap: Record<string, { label: string; class: string }> = {
      [PromotionStatus.Pending]: { label: this.i18n.t('employee_promotions.status_pending'), class: 'badge bg-warning text-dark' },
      [PromotionStatus.Approved]: { label: this.i18n.t('employee_promotions.status_approved'), class: 'badge bg-success' },
      [PromotionStatus.Rejected]: { label: this.i18n.t('employee_promotions.status_rejected'), class: 'badge bg-danger' },
      [PromotionStatus.Effective]: { label: this.i18n.t('employee_promotions.status_effective'), class: 'badge bg-primary' },
      [PromotionStatus.Cancelled]: { label: this.i18n.t('employee_promotions.status_cancelled'), class: 'badge bg-secondary' }
    };
    const info = statusMap[status] || { label: String(status), class: 'badge bg-light text-dark' };
    return `<span class="${info.class}">${info.label}</span>`;
  }
}
