import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ShiftSwapService } from '../../../../core/services/shift-swap.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { ShiftSwapRequest } from '../../../../shared/models/shift-swap.model';

@Component({
  selector: 'app-view-shift-swap',
  standalone: true,
  imports: [DefinitionListComponent, StatusBadgeComponent],
  templateUrl: './view-shift-swap.component.html',
  styleUrls: ['./view-shift-swap.component.css']
})
export class ViewShiftSwapComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ShiftSwapService);
  private notification = inject(NotificationService);
  public i18n = inject(I18nService);

  swap = signal<ShiftSwapRequest | null>(null);
  loading = signal(false);

  statusBadge = computed(() => {
    const s = this.swap();
    if (!s) return { label: '', variant: 'secondary' as any };
    const variantMap: Record<string, string> = {
      'Pending': 'warning', 'AcceptedByPeer': 'info', 'Approved': 'success',
      'DeclinedByPeer': 'danger', 'Rejected': 'danger', 'Cancelled': 'secondary'
    };
    return {
      label: this.i18n.t(`shiftSwaps.statuses.${s.status}`) || s.status,
      variant: (variantMap[s.status] || 'secondary') as any
    };
  });

  infoItems = computed<DefinitionItem[]>(() => {
    const s = this.swap();
    if (!s) return [];
    return [
      { label: this.i18n.t('shiftSwaps.employee'), value: s.employeeName },
      { label: this.i18n.t('shiftSwaps.swap_with'), value: s.swapWithEmployeeName },
      { label: this.i18n.t('shiftSwaps.original_date'), value: s.originalDate ? new Date(s.originalDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('shiftSwaps.swap_date'), value: s.swapDate ? new Date(s.swapDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('shiftSwaps.original_shift'), value: s.originalShiftName || '-' },
      { label: this.i18n.t('shiftSwaps.swap_shift'), value: s.swapShiftName || '-' },
      { label: this.i18n.t('shiftSwaps.reason'), value: s.reason || '-' },
      { label: this.i18n.t('shiftSwaps.rejection_reason'), value: s.rejectionReason || '-' },
    ];
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadSwap(+id);
  }

  loadSwap(id: number) {
    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (data: any) => { this.swap.set(data); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.load_error')); this.loading.set(false); }
    });
  }

  goBack() { this.router.navigate(['/attendance/shift-swaps']); }
}
