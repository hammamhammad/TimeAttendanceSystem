import { Component, signal, inject, OnInit, OnDestroy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, switchMap } from 'rxjs';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../../core/auth/permission.service';
import { BenefitService } from '../../../../core/services/benefit.service';
import { BenefitClaim } from '../../../../shared/models/benefit.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-claim',
  standalone: true,
  imports: [CommonModule, FormsModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-claim.component.html',
  styleUrls: ['./view-claim.component.css']
})
export class ViewClaimComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private benefitService = inject(BenefitService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private destroy$ = new Subject<void>();
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  loading = signal(false);
  claim = signal<BenefitClaim | null>(null);
  entityId = signal<number | null>(null);
  approvedAmount = signal<number | null>(null);
  rejectionReason = signal('');

  statusBadge = computed(() => {
    const item = this.claim();
    if (!item) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, StatusVariant> = { Submitted: 'info', UnderReview: 'warning', Approved: 'success', PartiallyApproved: 'primary', Rejected: 'danger', Paid: 'success', Cancelled: 'secondary' };
    return { label: this.i18n.t('benefits.claims.status_' + item.status.toLowerCase()), variant: map[item.status] || 'secondary' };
  });

  claimInfoItems = computed<DefinitionItem[]>(() => {
    const item = this.claim();
    if (!item) return [];
    return [
      { label: this.i18n.t('common.employee'), value: item.employeeName },
      { label: this.i18n.t('common.employee_number'), value: item.employeeNumber || '-' },
      { label: this.i18n.t('benefits.claims.plan'), value: item.benefitPlanName || '-' },
      { label: this.i18n.t('benefits.claims.claim_type'), value: this.i18n.t('benefits.claim_types.' + item.claimType.toLowerCase()) },
      { label: this.i18n.t('benefits.claims.claim_date'), value: this.formatDate(item.claimDate) },
      { label: this.i18n.t('benefits.claims.claim_amount'), value: `${item.claimAmount?.toFixed(2)} ${item.currency}` },
      { label: this.i18n.t('benefits.claims.approved_amount'), value: item.approvedAmount != null ? `${item.approvedAmount.toFixed(2)} ${item.currency}` : '-' },
      { label: this.i18n.t('common.description'), value: item.description || '-' },
      { label: this.i18n.t('benefits.claims.processed_at'), value: item.processedAt ? this.formatDate(item.processedAt) : '-' },
      { label: this.i18n.t('benefits.claims.rejection_reason'), value: item.rejectionReason || '-' },
      { label: this.i18n.t('common.notes'), value: item.notes || '-' },
      { label: this.i18n.t('fields.createdBy'), value: item.createdBy || '-' },
      { label: this.i18n.t('fields.createdAt'), value: item.createdAtUtc ? this.formatDate(item.createdAtUtc) : '-' }
    ];
  });

  ngOnInit(): void { this.loadData(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
  t(key: string): string { return this.i18n.t(key); }

  private loadData(): void {
    this.loading.set(true);
    this.route.paramMap.pipe(takeUntil(this.destroy$), switchMap(params => {
      const id = Number(params.get('id'));
      if (!id) { this.router.navigate(['/benefits/claims']); throw new Error('Invalid ID'); }
      this.entityId.set(id);
      return this.benefitService.getBenefitClaim(id);
    })).subscribe({
      next: (data) => { this.loading.set(false); this.claim.set(data); this.approvedAmount.set(data.claimAmount); },
      error: () => { this.loading.set(false); this.router.navigate(['/benefits/claims']); }
    });
  }

  formatDate(d: string): string { if (!d) return '-'; return new Date(d).toLocaleDateString(this.i18n.getDateLocale(), { year: 'numeric', month: 'long', day: 'numeric' }); }

  canApprove(): boolean { const s = this.claim()?.status; return (s === 'Submitted' || s === 'UnderReview') && this.permissionService.has('benefitClaim.create'); }
  canReject(): boolean { return this.canApprove(); }
  canProcess(): boolean { return this.claim()?.status === 'Approved' && this.permissionService.has('benefitClaim.create'); }

  async onApprove(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.claims.approve_confirm'), confirmText: this.t('common.approve'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-check', iconClass: 'text-success' });
    if (result.confirmed) {
      this.benefitService.approveBenefitClaim(this.entityId()!, { approvedAmount: this.approvedAmount() ?? undefined }).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.claims.approved_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.claims.approve_error'))
      });
    }
  }

  async onReject(): Promise<void> {
    if (!this.rejectionReason()) { this.notificationService.warning(this.t('app.warning'), this.t('benefits.claims.rejection_reason_required')); return; }
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.claims.reject_confirm'), confirmText: this.t('common.reject'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-danger', icon: 'fa-times', iconClass: 'text-danger' });
    if (result.confirmed) {
      this.benefitService.rejectBenefitClaim(this.entityId()!, { rejectionReason: this.rejectionReason() }).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.claims.rejected_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.claims.reject_error'))
      });
    }
  }

  async onProcessPayment(): Promise<void> {
    const result = await this.confirmationService.confirm({ title: this.t('common.confirm'), message: this.t('benefits.claims.process_confirm'), confirmText: this.t('benefits.claims.process_payment'), cancelText: this.t('common.cancel'), confirmButtonClass: 'btn-success', icon: 'fa-money-bill', iconClass: 'text-success' });
    if (result.confirmed) {
      this.benefitService.processClaimPayment(this.entityId()!).subscribe({
        next: () => { this.notificationService.success(this.t('app.success'), this.t('benefits.claims.processed_success')); this.loadData(); },
        error: (err) => this.notificationService.error(this.t('app.error'), err?.error?.error || this.t('benefits.claims.process_error'))
      });
    }
  }
}
