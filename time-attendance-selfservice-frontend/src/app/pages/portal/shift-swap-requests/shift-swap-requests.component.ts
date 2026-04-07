import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { PortalService } from '../services/portal.service';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-shift-swap-requests',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, EmptyStateComponent],
  templateUrl: './shift-swap-requests.component.html',
  styleUrl: './shift-swap-requests.component.css'
})
export class ShiftSwapRequestsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  items = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  columns: TableColumn[] = [
    { key: 'originalDate', label: this.i18n.t('portal.shift_swaps.original_date'), sortable: true, priority: 'high' },
    { key: 'swapDate', label: this.i18n.t('portal.shift_swaps.swap_date'), sortable: true, priority: 'high' },
    { key: 'swapWithName', label: this.i18n.t('portal.shift_swaps.swap_with'), sortable: true, priority: 'high' },
    { key: 'reason', label: this.i18n.t('portal.shift_swaps.reason'), sortable: false, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.shift_swaps.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' }
  ]);

  tableData = computed(() => {
    return this.items().map(item => ({
      ...item,
      originalDate: item.originalDate ? new Date(item.originalDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-',
      swapDate: item.swapDate ? new Date(item.swapDate).toLocaleDateString(this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US') : '-',
      swapWithName: item.swapWithEmployeeName || item.targetEmployeeName || '-',
      reason: item.reason || '-',
      status: this.getStatusBadgeHtml(item.status)
    }));
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set(null);
    this.portalService.getMyShiftSwapRequests().subscribe({
      next: (res) => {
        const data = res?.data ?? res?.value?.items ?? res?.value ?? res?.items ?? (Array.isArray(res) ? res : []);
        this.items.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/shift-swap-requests/create']);
  }

  onAction(event: { action: string; item: any }): void {
    if (event.action === 'view') {
      this.router.navigate(['/shift-swap-requests', event.item.id]);
    }
  }

  getStatusBadgeHtml(status: string): string {
    const map: Record<string, string> = {
      Pending: 'bg-warning', PendingPartnerApproval: 'bg-info', PendingApproval: 'bg-info',
      Approved: 'bg-success', Rejected: 'bg-danger', Cancelled: 'bg-secondary',
      Completed: 'bg-success', Expired: 'bg-secondary'
    };
    return `<span class="badge ${map[status] || 'bg-secondary'}">${status}</span>`;
  }
}
