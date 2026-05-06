import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { ShiftSwapService } from '../../../core/services/shift-swap.service';
import { ShiftSwapRequest } from '../../../shared/models/shift-swap.model';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-shift-swaps',
  standalone: true,
  imports: [
    CommonModule,
    DataTableComponent,
    PageHeaderComponent,
    UnifiedFilterComponent
  ],
  templateUrl: './shift-swaps.component.html',
  styleUrls: ['./shift-swaps.component.css']
})
export class ShiftSwapsComponent implements OnInit {
  private shiftSwapService = inject(ShiftSwapService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);

  // Signals
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  searchTerm = signal('');
  selectedStatus = signal<string>('');

  private rawData = signal<ShiftSwapRequest[]>([]);

  // Transform data for display
  shiftSwaps = computed(() => {
    const data = this.rawData();
    if (!data) return [];
    return data.map(item => ({
      ...item,
      _statusDisplay: this.i18n.t(`shiftSwaps.statuses.${item.status}`) || item.status,
      _originalDateDisplay: item.originalDate
        ? new Date(item.originalDate).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' })
        : '--',
      _swapDateDisplay: item.swapDate
        ? new Date(item.swapDate).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' })
        : '--',
      _createdDateDisplay: item.createdAtUtc
        ? new Date(item.createdAtUtc).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'short', day: 'numeric' })
        : '--'
    }));
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('shiftSwaps.employee'), sortable: true, width: '15%' },
    { key: 'swapWithEmployeeName', label: this.i18n.t('shiftSwaps.swap_with'), sortable: true, width: '15%' },
    { key: '_originalDateDisplay', label: this.i18n.t('shiftSwaps.original_date'), sortable: true, width: '12%' },
    { key: '_swapDateDisplay', label: this.i18n.t('shiftSwaps.swap_date'), sortable: true, width: '12%' },
    { key: '_statusDisplay', label: this.i18n.t('shiftSwaps.status'), sortable: true, width: '12%' },
    { key: '_createdDateDisplay', label: this.i18n.t('shiftSwaps.created_date'), sortable: true, width: '12%' }
  ];

  // Table actions
  tableActions: TableAction[] = [
    {
      key: 'view',
      label: this.i18n.t('common.view'),
      icon: 'fa-eye',
      color: 'info'
    },
    {
      key: 'partner_approve',
      label: this.i18n.t('shiftSwaps.partner_approve'),
      icon: 'fa-check',
      color: 'success',
      condition: (item: ShiftSwapRequest) => item.status === 'Pending'
    },
    {
      key: 'partner_reject',
      label: this.i18n.t('shiftSwaps.partner_reject'),
      icon: 'fa-times',
      color: 'danger',
      condition: (item: ShiftSwapRequest) => item.status === 'Pending'
    }
  ];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    const params: any = {
      page: this.currentPage(),
      pageSize: this.pageSize()
    };
    if (this.searchTerm()) {
      params.search = this.searchTerm();
    }
    if (this.selectedStatus()) {
      params.status = this.selectedStatus();
    }

    this.shiftSwapService.getAll(params).subscribe({
      next: (response) => {
        this.rawData.set((response as any).items || (response as any).data || []);
        this.totalCount.set(response.totalCount || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('shiftSwaps.load_error'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.currentPage.set(1);
    this.loadData();
  }

  onRefreshData(): void {
    this.searchTerm.set('');
    this.selectedStatus.set('');
    this.currentPage.set(1);
    this.loadData();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadData();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.currentPage.set(1);
    this.loadData();
  }

  onTableAction(event: { action: string; item: ShiftSwapRequest }): void {
    const { action, item } = event;

    switch (action) {
      case 'view':
        this.router.navigate(['/attendance/shift-swaps', item.id, 'edit']);
        break;
      case 'partner_approve':
        this.partnerApprove(item);
        break;
      case 'partner_reject':
        this.partnerReject(item);
        break;
    }
  }

  private partnerApprove(item: ShiftSwapRequest): void {
    this.confirmationService.confirm({
      title: this.i18n.t('shiftSwaps.partner_approve'),
      message: this.i18n.t('shiftSwaps.confirm_partner_approve'),
      confirmText: this.i18n.t('common.approve')
    }).then(result => {
      if (result.confirmed) {
        this.shiftSwapService.partnerApprove(item.id).subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('shiftSwaps.partner_approve_success'));
            this.loadData();
          },
          error: () => {
            this.notificationService.error(this.i18n.t('shiftSwaps.partner_approve_error'));
          }
        });
      }
    });
  }

  private partnerReject(item: ShiftSwapRequest): void {
    this.confirmationService.confirm({
      title: this.i18n.t('shiftSwaps.partner_reject'),
      message: this.i18n.t('shiftSwaps.confirm_partner_reject'),
      confirmText: this.i18n.t('common.reject'),
      requireComments: true
    }).then(result => {
      if (result.confirmed) {
        this.shiftSwapService.partnerReject(item.id, result.comments || '').subscribe({
          next: () => {
            this.notificationService.success(this.i18n.t('shiftSwaps.partner_reject_success'));
            this.loadData();
          },
          error: () => {
            this.notificationService.error(this.i18n.t('shiftSwaps.partner_reject_error'));
          }
        });
      }
    });
  }
}
