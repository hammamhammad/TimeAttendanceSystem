import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { LoanService } from '../../../../core/services/loan.service';
import { LoanApplicationDto } from '../../../../shared/models/loan.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-application',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.css'
})
export class ViewApplicationComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(LoanService);
  private readonly notification = inject(NotificationService);

  loading = signal(false);
  app = signal<LoanApplicationDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const a = this.app();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Draft: { label: this.i18n.t('loan_applications.status_Draft'), variant: 'secondary' },
      Submitted: { label: this.i18n.t('loan_applications.status_Submitted'), variant: 'primary' },
      UnderReview: { label: this.i18n.t('loan_applications.status_UnderReview'), variant: 'info' },
      Approved: { label: this.i18n.t('loan_applications.status_Approved'), variant: 'success' },
      Rejected: { label: this.i18n.t('loan_applications.status_Rejected'), variant: 'danger' },
      Disbursed: { label: this.i18n.t('loan_applications.status_Disbursed'), variant: 'info' },
      Repaying: { label: this.i18n.t('loan_applications.status_Repaying'), variant: 'warning' },
      Completed: { label: this.i18n.t('loan_applications.status_Completed'), variant: 'success' }
    };
    return map[a.status] ?? { label: a.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const a = this.app();
    if (!a) return [];
    return [
      { label: this.i18n.t('loan_applications.application_number'), value: a.applicationNumber },
      { label: this.i18n.t('loan_applications.employee'), value: a.employeeName },
      { label: this.i18n.t('loan_applications.loan_type'), value: a.loanTypeName },
      { label: this.i18n.t('loan_applications.requested_amount'), value: a.requestedAmount.toFixed(2) },
      { label: this.i18n.t('loan_applications.approved_amount'), value: a.approvedAmount?.toFixed(2) ?? '-' },
      { label: this.i18n.t('loan_applications.term_months'), value: `${a.termMonths} ${this.i18n.t('common.months')}` },
      { label: this.i18n.t('loan_applications.interest_rate'), value: `${a.interestRate}%` },
      { label: this.i18n.t('loan_applications.monthly_installment'), value: a.monthlyInstallment.toFixed(2) },
      { label: this.i18n.t('loan_applications.remaining_balance'), value: a.remainingBalance.toFixed(2) },
      { label: this.i18n.t('loan_applications.purpose'), value: a.purpose ?? '-' },
      { label: this.i18n.t('loan_applications.approved_by'), value: a.approvedByName ?? '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/loans/applications']); return; }
    this.loading.set(true);
    this.service.getApplication(+id).subscribe({
      next: (a) => { this.app.set(a); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }
}
