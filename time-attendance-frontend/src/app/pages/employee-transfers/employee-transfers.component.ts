import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { EmployeeTransferService } from '../../core/services/employee-transfer.service';
import {
  EmployeeTransfer,
  TransferStatus,
  TransferQueryParams
} from '../../shared/models/employee-transfer.model';
import { DataTableComponent, TableColumn, TableAction } from '../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-employee-transfers',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './employee-transfers.component.html',
  styleUrls: ['./employee-transfers.component.css']
})
export class EmployeeTransfersComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(EmployeeTransferService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  // State
  transfers = signal<EmployeeTransfer[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  // Computed display data
  displayData = computed(() => {
    return this.transfers().map(t => ({
      ...t,
      _statusDisplay: this.formatStatus(t.status),
      _branchTransfer: `${t.fromBranchName} → ${t.toBranchName}`,
      _deptTransfer: `${t.fromDepartmentName} → ${t.toDepartmentName}`,
      _effectiveDateDisplay: t.effectiveDate ? new Date(t.effectiveDate).toLocaleDateString() : '--'
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('employee_transfers.employee'), sortable: true, width: '15%' },
    { key: '_branchTransfer', label: this.i18n.t('employee_transfers.branch_transfer'), sortable: false, width: '20%' },
    { key: '_deptTransfer', label: this.i18n.t('employee_transfers.department_transfer'), sortable: false, width: '20%' },
    { key: '_effectiveDateDisplay', label: this.i18n.t('employee_transfers.effective_date'), sortable: true, width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('employee_transfers.status'), sortable: true, width: '10%', renderHtml: true }
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
      condition: (item: EmployeeTransfer) => item.status === TransferStatus.Pending
    },
    {
      key: 'approve',
      label: this.i18n.t('employee_transfers.approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: EmployeeTransfer) => item.status === TransferStatus.Pending
    },
    {
      key: 'reject',
      label: this.i18n.t('employee_transfers.reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: EmployeeTransfer) => item.status === TransferStatus.Pending
    },
    {
      key: 'complete',
      label: this.i18n.t('employee_transfers.complete'),
      icon: 'fa-check-double',
      color: 'info',
      condition: (item: EmployeeTransfer) => item.status === TransferStatus.Approved || item.status === TransferStatus.InProgress
    },
    {
      key: 'cancel',
      label: this.i18n.t('common.cancel'),
      icon: 'fa-ban',
      color: 'warning',
      condition: (item: EmployeeTransfer) => item.status === TransferStatus.Pending || item.status === TransferStatus.Approved
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: TransferQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilter
    };

    this.service.getTransfers(params).subscribe({
      next: (result) => {
        this.transfers.set(result.items || []);
        this.totalCount.set(result.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('employee_transfers.load_error'));
        this.loading.set(false);
      }
    });
  }

  onTableAction(event: { action: string; item: EmployeeTransfer }): void {
    const { action, item } = event;
    switch (action) {
      case 'view':
        this.router.navigate(['/employee-transfers', item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/employee-transfers', item.id, 'edit']);
        break;
      case 'approve':
        this.approveTransfer(item);
        break;
      case 'reject':
        this.rejectTransfer(item);
        break;
      case 'complete':
        this.completeTransfer(item);
        break;
      case 'cancel':
        this.cancelTransfer(item);
        break;
    }
  }

  approveTransfer(transfer: EmployeeTransfer): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_transfers.approve_title'),
      message: this.i18n.t('employee_transfers.confirm_approve'),
      confirmText: this.i18n.t('employee_transfers.approve'),
      confirmButtonClass: 'btn-success'
    }).then(result => {
      if (result.confirmed) {
        this.service.approveTransfer(transfer.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_transfers.approve_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_transfers.approve_error'))
        });
      }
    });
  }

  rejectTransfer(transfer: EmployeeTransfer): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_transfers.reject_title'),
      message: this.i18n.t('employee_transfers.confirm_reject'),
      confirmText: this.i18n.t('employee_transfers.reject'),
      confirmButtonClass: 'btn-danger',
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.service.rejectTransfer(transfer.id, result.comments || '').subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_transfers.reject_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_transfers.reject_error'))
        });
      }
    });
  }

  completeTransfer(transfer: EmployeeTransfer): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_transfers.complete_title'),
      message: this.i18n.t('employee_transfers.confirm_complete'),
      confirmText: this.i18n.t('employee_transfers.complete'),
      confirmButtonClass: 'btn-info'
    }).then(result => {
      if (result.confirmed) {
        this.service.completeTransfer(transfer.id).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_transfers.complete_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_transfers.complete_error'))
        });
      }
    });
  }

  cancelTransfer(transfer: EmployeeTransfer): void {
    this.confirmation.confirm({
      title: this.i18n.t('employee_transfers.cancel_title'),
      message: this.i18n.t('employee_transfers.confirm_cancel'),
      confirmText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-warning'
    }).then(result => {
      if (result.confirmed) {
        this.service.cancelTransfer(transfer.id, result.comments).subscribe({
          next: () => {
            this.notification.success(this.i18n.t('employee_transfers.cancel_success'));
            this.loadData();
          },
          error: () => this.notification.error(this.i18n.t('employee_transfers.cancel_error'))
        });
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/employee-transfers/create']);
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

  private formatStatus(status: TransferStatus): string {
    const statusMap: Record<string, { label: string; class: string }> = {
      [TransferStatus.Pending]: { label: this.i18n.t('employee_transfers.status_pending'), class: 'badge bg-warning text-dark' },
      [TransferStatus.Approved]: { label: this.i18n.t('employee_transfers.status_approved'), class: 'badge bg-success' },
      [TransferStatus.Rejected]: { label: this.i18n.t('employee_transfers.status_rejected'), class: 'badge bg-danger' },
      [TransferStatus.InProgress]: { label: this.i18n.t('employee_transfers.status_in_progress'), class: 'badge bg-info' },
      [TransferStatus.Completed]: { label: this.i18n.t('employee_transfers.status_completed'), class: 'badge bg-primary' },
      [TransferStatus.Cancelled]: { label: this.i18n.t('employee_transfers.status_cancelled'), class: 'badge bg-secondary' }
    };
    const info = statusMap[status] || { label: String(status), class: 'badge bg-light text-dark' };
    return `<span class="${info.class}">${info.label}</span>`;
  }
}
