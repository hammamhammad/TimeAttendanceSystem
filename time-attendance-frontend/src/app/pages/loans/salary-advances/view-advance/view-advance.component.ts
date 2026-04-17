import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { LoanService } from '../../../../core/services/loan.service';
import { SalaryAdvanceDto } from '../../../../shared/models/loan.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-advance',
  standalone: true,
  imports: [CommonModule, FormHeaderComponent, LoadingSpinnerComponent, StatusBadgeComponent, DefinitionListComponent, AuditHistoryComponent, SectionCardComponent],
  templateUrl: './view-advance.component.html',
  styleUrl: './view-advance.component.css'
})
export class ViewAdvanceComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(LoanService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  loading = signal(false);
  processing = signal(false);
  advance = signal<SalaryAdvanceDto | null>(null);
  error = signal<string | null>(null);

  statusBadge = computed(() => {
    const a = this.advance();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    const map: Record<string, { label: string; variant: StatusVariant }> = {
      Pending: { label: this.i18n.t('salary_advances.status_Pending'), variant: 'warning' },
      Approved: { label: this.i18n.t('salary_advances.status_Approved'), variant: 'success' },
      Rejected: { label: this.i18n.t('salary_advances.status_Rejected'), variant: 'danger' },
      Disbursed: { label: this.i18n.t('salary_advances.status_Disbursed'), variant: 'info' },
      Deducted: { label: this.i18n.t('salary_advances.status_Deducted'), variant: 'primary' }
    };
    return map[a.status] ?? { label: a.status, variant: 'secondary' as StatusVariant };
  });

  detailItems = computed<DefinitionItem[]>(() => {
    const a = this.advance();
    if (!a) return [];
    return [
      { label: this.i18n.t('salary_advances.employee'), value: a.employeeName },
      { label: this.i18n.t('salary_advances.employee_number'), value: a.employeeNumber ?? '-' },
      { label: this.i18n.t('salary_advances.requested_amount'), value: a.requestedAmount != null ? a.requestedAmount.toFixed(2) : '-' },
      { label: this.i18n.t('salary_advances.approved_amount'), value: a.approvedAmount != null ? a.approvedAmount.toFixed(2) : '-' },
      { label: this.i18n.t('salary_advances.deduction_range'),
        value: a.deductionStartDate && a.deductionEndDate
          ? `${new Date(a.deductionStartDate).toLocaleDateString()} → ${new Date(a.deductionEndDate).toLocaleDateString()}`
          : '-' },
      { label: this.i18n.t('salary_advances.reason'), value: a.reason ?? '-' },
      { label: this.i18n.t('salary_advances.approved_by'), value: a.approvedByName ?? '-' },
      { label: this.i18n.t('salary_advances.approved_at'), value: a.approvedAtUtc ? new Date(a.approvedAtUtc).toLocaleDateString() : '-' },
      { label: this.i18n.t('salary_advances.rejection_reason'), value: a.rejectionReason ?? '-' },
      { label: this.i18n.t('common.created_date'), value: a.createdAtUtc ? new Date(a.createdAtUtc).toLocaleDateString() : '-' }
    ];
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/loans/salary-advances']); return; }
    this.loadData(+id);
  }

  private loadData(id: number): void {
    this.loading.set(true);
    this.service.getSalaryAdvance(id).subscribe({
      next: (a) => { this.advance.set(a); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  approve(): void {
    const a = this.advance();
    if (!a) return;
    this.processing.set(true);
    this.service.approveSalaryAdvance(a.id).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('salary_advances.approved'));
        this.loadData(a.id);
        this.processing.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }

  reject(): void {
    const a = this.advance();
    if (!a) return;
    this.processing.set(true);
    this.service.rejectSalaryAdvance(a.id, '').subscribe({
      next: () => {
        this.notification.success(this.i18n.t('salary_advances.rejected'));
        this.loadData(a.id);
        this.processing.set(false);
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.processing.set(false); }
    });
  }
}
