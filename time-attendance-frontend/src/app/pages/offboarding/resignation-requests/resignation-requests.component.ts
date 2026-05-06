import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { ResignationService } from '../../../core/services/resignation.service';
import { Resignation, ResignationStatus } from '../../../shared/models/resignation.model';

@Component({
  selector: 'app-resignation-requests',
  standalone: true,
  imports: [DataTableComponent, PageHeaderComponent, StatusBadgeComponent, UnifiedFilterComponent],
  templateUrl: './resignation-requests.component.html',
  styleUrls: ['./resignation-requests.component.css']
})
export class ResignationRequestsComponent implements OnInit {
  private resignationService = inject(ResignationService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  readonly i18n = inject(I18nService);

  items = signal<Resignation[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), sortable: true, priority: 'high' },
    { key: 'resignationDate', label: this.i18n.t('offboarding.resignations.resignation_date'), sortable: true, priority: 'high' },
    { key: 'lastWorkingDate', label: this.i18n.t('offboarding.resignations.last_working_date'), sortable: true, priority: 'medium' },
    { key: 'noticePeriodDays', label: this.i18n.t('offboarding.resignations.notice_period'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions: TableAction[] = [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-solid fa-eye', color: 'info' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-solid fa-check', color: 'success', condition: (item) => item.status === 'Pending' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-solid fa-times', color: 'danger', condition: (item) => item.status === 'Pending' }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.resignationService.getAll({ page: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (data) => {
        this.items.set(data);
        this.totalCount.set(data.length);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_loading'));
        this.loading.set(false);
      }
    });
  }

  onActionClick(event: { action: string; item: Resignation }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/offboarding/resignations', event.item.id, 'edit']);
        break;
      case 'approve':
        this.approveResignation(event.item);
        break;
      case 'reject':
        this.rejectResignation(event.item);
        break;
    }
  }

  approveResignation(item: Resignation): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_approve'),
      message: this.i18n.t('offboarding.resignations.confirm_approve_message'),
      confirmText: this.i18n.t('common.approve'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.resignationService.approve(item.id, {}).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('offboarding.resignations.approved_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_approving'))
        });
      }
    });
  }

  rejectResignation(item: Resignation): void {
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_reject'),
      message: this.i18n.t('offboarding.resignations.confirm_reject_message'),
      confirmText: this.i18n.t('common.reject'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.resignationService.reject(item.id, { rejectionReason: this.i18n.t('common.rejected_by_admin') }).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('offboarding.resignations.rejected_successfully'));
            this.loadData();
          },
          error: () => this.notificationService.error(this.i18n.t('common.error_rejecting'))
        });
      }
    });
  }

  getStatusVariant(status: ResignationStatus): string {
    const map: Record<ResignationStatus, string> = {
      'Pending': 'warning', 'Approved': 'success', 'Rejected': 'danger',
      'Withdrawn': 'secondary'
    };
    return map[status] || 'secondary';
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
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
}
