import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PortalService } from '../../services/portal.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';

@Component({
  selector: 'app-shift-swap-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent],
  templateUrl: './shift-swap-detail.component.html',
  styleUrl: './shift-swap-detail.component.css'
})
export class ShiftSwapDetailComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly portalService = inject(PortalService);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  item = signal<any>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  actionLoading = signal(false);

  statusBadge = computed(() => {
    const s = this.item();
    if (!s) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = {
      Pending: 'warning', PendingPartnerApproval: 'info', PendingApproval: 'info',
      Approved: 'success', Rejected: 'danger', Cancelled: 'secondary',
      Completed: 'success', Expired: 'secondary'
    };
    return { label: s.status || '-', variant: map[s.status] || 'secondary' };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const s = this.item();
    if (!s) return [];
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return [
      { label: this.i18n.t('portal.shift_swaps.original_date'), value: s.originalDate ? new Date(s.originalDate).toLocaleDateString(locale) : '-' },
      { label: this.i18n.t('portal.shift_swaps.swap_date'), value: s.swapDate ? new Date(s.swapDate).toLocaleDateString(locale) : '-' },
      { label: this.i18n.t('portal.shift_swaps.swap_with'), value: s.swapWithEmployeeName || s.targetEmployeeName || '-' },
      { label: this.i18n.t('portal.shift_swaps.reason'), value: s.reason || '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/shift-swap-requests']); return; }
    this.loadDetail(+id);
  }

  loadDetail(id: number): void {
    this.loading.set(true);
    this.portalService.getShiftSwapRequestById(id).subscribe({
      next: (res) => {
        const data = res?.value ?? res;
        this.item.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.i18n.t('common.error'));
        this.loading.set(false);
      }
    });
  }

  async partnerApprove(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.shift_swaps.partner_approve_success'),
      message: this.i18n.t('common.confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-success'
    });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.portalService.partnerApproveShiftSwap(this.item().id).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.shift_swaps.partner_approve_success'));
        this.loadDetail(this.item().id);
        this.actionLoading.set(false);
      },
      error: () => { this.actionLoading.set(false); }
    });
  }

  async partnerReject(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('portal.shift_swaps.partner_reject_success'),
      message: this.i18n.t('common.confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.portalService.partnerRejectShiftSwap(this.item().id, '').subscribe({
      next: () => {
        this.notification.success(this.i18n.t('portal.shift_swaps.partner_reject_success'));
        this.loadDetail(this.item().id);
        this.actionLoading.set(false);
      },
      error: () => { this.actionLoading.set(false); }
    });
  }

  async cancelRequest(): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.cancel'),
      message: this.i18n.t('common.confirm'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.actionLoading.set(true);
    this.portalService.cancelShiftSwapRequest(this.item().id).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('common.success'));
        this.router.navigate(['/shift-swap-requests']);
        this.actionLoading.set(false);
      },
      error: () => { this.actionLoading.set(false); }
    });
  }

  goBack(): void {
    this.router.navigate(['/shift-swap-requests']);
  }
}
