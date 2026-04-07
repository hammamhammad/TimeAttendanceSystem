import { Component, signal, computed, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { environment } from '../../../../environments/environment';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface LoanApp {
  id: number; applicationNumber: string; loanTypeName: string; requestedAmount: number; approvedAmount?: number;
  monthlyInstallment: number; remainingBalance: number; status: string; createdAtUtc: string;
  repayments?: { id: number; installmentNumber: number; dueDate: string; amount: number; status: string }[];
}

interface SalaryAdvance {
  id: number; requestedAmount: number; approvedAmount?: number; deductionMonth: string; status: string; reason?: string;
}

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, LoadingSpinnerComponent, DataTableComponent, ModalWrapperComponent, EmptyStateComponent],
  templateUrl: './my-loans.component.html',
  styleUrl: './my-loans.component.css'
})
export class MyLoansComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  activeTab = signal<'loans' | 'advances'>('loans');
  loans = signal<LoanApp[]>([]);
  advances = signal<SalaryAdvance[]>([]);
  loanTypes = signal<{ id: number; name: string }[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Loan application form
  showLoanModal = signal(false);
  loanTypeId = signal<number | null>(null);
  loanAmount = signal(0);
  loanTerm = signal(12);
  loanPurpose = signal('');

  // Salary advance form
  showAdvanceModal = signal(false);
  advanceAmount = signal(0);
  advanceReason = signal('');
  advanceMonth = signal('');

  saving = signal(false);
  selectedLoan = signal<LoanApp | null>(null);

  loanColumns: TableColumn[] = [
    { key: 'applicationNumber', label: this.i18n.t('portal.loans.app_number'), sortable: true, priority: 'high' },
    { key: 'loanTypeName', label: this.i18n.t('portal.loans.type'), sortable: true, priority: 'medium' },
    { key: 'requestedAmount', label: this.i18n.t('portal.loans.amount'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  loanActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'bi-eye', color: 'info' }
  ]);

  advanceColumns: TableColumn[] = [
    { key: 'requestedAmount', label: this.i18n.t('portal.loans.requested'), sortable: true, priority: 'high' },
    { key: 'approvedAmount', label: this.i18n.t('portal.loans.approved_amt'), sortable: true, priority: 'medium' },
    { key: 'deductionMonth', label: this.i18n.t('portal.loans.deduction_month'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('portal.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  loanTableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.loans().map(loan => ({
      ...loan,
      requestedAmount: loan.requestedAmount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      status: this.getLoanStatusBadgeHtml(loan.status)
    }));
  });

  advanceTableData = computed(() => {
    const locale = this.i18n.locale() === 'ar' ? 'ar-u-nu-latn' : 'en-US';
    return this.advances().map(adv => ({
      ...adv,
      requestedAmount: adv.requestedAmount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      approvedAmount: adv.approvedAmount != null ? adv.approvedAmount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-',
      status: this.getAdvanceStatusBadgeHtml(adv.status)
    }));
  });

  ngOnInit(): void { this.loadLoans(); this.loadLoanTypes(); }

  setTab(tab: 'loans' | 'advances'): void {
    this.activeTab.set(tab);
    if (tab === 'loans') this.loadLoans();
    else this.loadAdvances();
  }

  refresh(): void {
    if (this.activeTab() === 'loans') this.loadLoans();
    else this.loadAdvances();
  }

  loadLoans(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: LoanApp[]; totalCount: number }>(`${this.baseUrl}/portal/my-loan-applications`).subscribe({
      next: (res) => { this.loans.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadAdvances(): void {
    this.loading.set(true);
    this.error.set(null);
    this.http.get<{ data: SalaryAdvance[]; totalCount: number }>(`${this.baseUrl}/portal/my-salary-advances`).subscribe({
      next: (res) => { this.advances.set(res.data); this.loading.set(false); },
      error: () => { this.error.set(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  loadLoanTypes(): void {
    this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/loan-types/dropdown`).subscribe({ next: (d) => this.loanTypes.set(d), error: () => {} });
  }

  onLoanAction(event: { action: string; item: LoanApp }): void {
    if (event.action === 'view') {
      // Find the original loan with repayments
      const original = this.loans().find(l => l.id === event.item.id);
      if (original) this.selectedLoan.set(original);
    }
  }

  submitLoanApp(): void {
    if (!this.loanTypeId()) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/loan-applications`, { loanTypeId: this.loanTypeId(), requestedAmount: this.loanAmount(), termMonths: this.loanTerm(), purpose: this.loanPurpose() }).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.loans.submitted')); this.showLoanModal.set(false); this.saving.set(false); this.loadLoans(); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  submitAdvance(): void {
    if (!this.advanceAmount()) return;
    this.saving.set(true);
    this.http.post(`${this.baseUrl}/salary-advances`, { requestedAmount: this.advanceAmount(), reason: this.advanceReason(), deductionMonth: this.advanceMonth() }).subscribe({
      next: () => { this.notification.success(this.i18n.t('portal.loans.advance_submitted')); this.showAdvanceModal.set(false); this.saving.set(false); this.loadAdvances(); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  getLoanStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Pending':
      case 'Submitted':
        return `<span class="badge bg-warning">${this.i18n.t('portal.loans.status_' + status.toLowerCase())}</span>`;
      case 'Approved':
      case 'Completed':
        return `<span class="badge bg-success">${this.i18n.t('portal.loans.status_' + status.toLowerCase())}</span>`;
      case 'Disbursed':
      case 'Repaying':
        return `<span class="badge bg-info">${this.i18n.t('portal.loans.status_' + status.toLowerCase())}</span>`;
      case 'Rejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.loans.status_rejected')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }

  getAdvanceStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Pending':
        return `<span class="badge bg-warning">${this.i18n.t('portal.loans.status_pending')}</span>`;
      case 'Approved':
      case 'Disbursed':
        return `<span class="badge bg-success">${this.i18n.t('portal.loans.status_' + status.toLowerCase())}</span>`;
      case 'Rejected':
        return `<span class="badge bg-danger">${this.i18n.t('portal.loans.status_rejected')}</span>`;
      case 'Deducted':
        return `<span class="badge bg-info">${this.i18n.t('portal.loans.status_deducted')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }

  getRepaymentStatusBadgeHtml(status: string): string {
    switch (status) {
      case 'Pending':
        return `<span class="badge bg-warning">${this.i18n.t('portal.loans.status_pending')}</span>`;
      case 'Paid':
        return `<span class="badge bg-success">${this.i18n.t('portal.loans.status_paid')}</span>`;
      case 'Overdue':
        return `<span class="badge bg-danger">${this.i18n.t('portal.loans.status_overdue')}</span>`;
      default:
        return `<span class="badge bg-secondary">${status}</span>`;
    }
  }
}
