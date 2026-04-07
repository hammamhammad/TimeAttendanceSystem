import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { ExpenseService } from '../../../../core/services/expense.service';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-expense-policy',
  standalone: true,
  imports: [FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-expense-policy.component.html',
  styleUrl: './view-expense-policy.component.css'
})
export class ViewExpensePolicyComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  private readonly service = inject(ExpenseService);

  loading = signal(false);
  policy = signal<any>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const p = this.policy();
    if (!p) return { label: '', variant: 'secondary' as StatusVariant };
    return {
      label: p.isActive ? this.i18n.t('common.active') : this.i18n.t('common.inactive'),
      variant: (p.isActive ? 'success' : 'secondary') as StatusVariant
    };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const p = this.policy();
    if (!p) return [];
    return [
      { label: this.i18n.t('expense_policies.name'), value: p.name },
      { label: this.i18n.t('expense_policies.name_ar'), value: p.nameAr ?? '-' },
      { label: this.i18n.t('common.description'), value: p.description ?? '-' },
      { label: this.i18n.t('expense_policies.branch'), value: p.branchName ?? this.i18n.t('expense_policies.all_branches') },
      { label: this.i18n.t('expense_policies.max_claim_amount'), value: p.maxClaimPerMonth != null ? p.maxClaimPerMonth.toFixed(2) : (p.maxClaimAmount != null ? p.maxClaimAmount.toFixed(2) : '-') },
      { label: this.i18n.t('expense_policies.max_monthly_amount'), value: p.maxClaimPerYear != null ? p.maxClaimPerYear.toFixed(2) : (p.maxMonthlyAmount != null ? p.maxMonthlyAmount.toFixed(2) : '-') },
      { label: this.i18n.t('expense_policies.requires_approval'), value: p.requiresApproval ? this.i18n.t('common.yes') : this.i18n.t('common.no') },
      { label: this.i18n.t('expense_policies.receipt_required_above'), value: p.receiptRequiredAbove != null ? p.receiptRequiredAbove.toFixed(2) : '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/expenses/policies']); return; }
    this.loading.set(true);
    this.service.getPolicy(+id).subscribe({
      next: (p) => { this.policy.set(p); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
