import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { ExpenseService } from '../../../../core/services/expense.service';
import { ExpenseClaimDto } from '../../../../shared/models/expense.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-claim',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-claim.component.html',
  styleUrl: './view-claim.component.css'
})
export class ViewClaimComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(ExpenseService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  claim = signal<ExpenseClaimDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const c = this.claim();
    if (!c) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('expense_claims.status_Draft'), variant: 'secondary' },
      Submitted: { label: this.i18n.t('expense_claims.status_Submitted'), variant: 'primary' },
      UnderReview: { label: this.i18n.t('expense_claims.status_UnderReview'), variant: 'info' },
      Approved: { label: this.i18n.t('expense_claims.status_Approved'), variant: 'success' },
      Rejected: { label: this.i18n.t('expense_claims.status_Rejected'), variant: 'danger' },
      Reimbursed: { label: this.i18n.t('expense_claims.status_Reimbursed'), variant: 'success' },
      Cancelled: { label: this.i18n.t('expense_claims.status_Cancelled'), variant: 'warning' }
    };
    return map[c.status] ?? { label: c.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const c = this.claim();
    if (!c) return [];
    return [
      { label: this.i18n.t('expense_claims.claim_number'), value: c.claimNumber },
      { label: this.i18n.t('expense_claims.employee'), value: c.employeeName },
      { label: this.i18n.t('expense_claims.title_field'), value: c.title },
      { label: this.i18n.t('expense_claims.total_amount'), value: c.totalAmount.toFixed(2) },
      { label: this.i18n.t('common.description'), value: c.description ?? '-' },
      { label: this.i18n.t('expense_claims.approved_by'), value: c.approvedByName ?? '-' },
      { label: this.i18n.t('expense_claims.rejection_reason'), value: c.rejectionReason ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/expenses/claims']); return; }
    this.loading.set(true);
    this.service.getClaim(+id).subscribe({
      next: (c) => { this.claim.set(c); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  async approveClaim(): Promise<void> {
    const c = this.claim();
    if (!c) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('expense_claims.approve'), message: this.i18n.t('expense_claims.confirm_approve'), confirmText: this.i18n.t('common.approve'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-success' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.approveClaim(c.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('expense_claims.approved')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  async rejectClaim(): Promise<void> {
    const c = this.claim();
    if (!c) return;
    const result = await this.confirmation.confirm({ title: this.i18n.t('expense_claims.reject'), message: this.i18n.t('expense_claims.confirm_reject'), confirmText: this.i18n.t('common.reject'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.processing.set(true);
    this.service.rejectClaim(c.id, '').subscribe({
      next: () => { this.notification.success(this.i18n.t('expense_claims.rejected')); this.ngOnInit(); this.processing.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }
}
