import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { TerminationService } from '../../../../core/services/termination.service';
import { OffboardingService } from '../../../../core/services/offboarding.service';
import {
  Termination, ClearanceItem, EndOfServiceCalculation,
  FinalSettlement, ExitInterview, ClearanceStatus, FinalSettlementStatus
} from '../../../../shared/models/termination.model';
import { FormHeaderComponent } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-termination',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, AuditHistoryComponent
  ],
  templateUrl: './view-termination.component.html',
  styleUrls: ['./view-termination.component.css']
})
export class ViewTerminationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private terminationService = inject(TerminationService);
  private offboardingService = inject(OffboardingService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  termination = signal<Termination | null>(null);
  clearanceItems = signal<ClearanceItem[]>([]);
  eosCalculation = signal<EndOfServiceCalculation | null>(null);
  finalSettlement = signal<FinalSettlement | null>(null);
  exitInterview = signal<ExitInterview | null>(null);
  activeTab = signal<'details' | 'clearance' | 'eos' | 'settlement' | 'interview' | 'history'>('details');
  processing = signal(false);

  // Exit interview form
  interviewForm = {
    interviewDate: '',
    interviewerName: '',
    overallRating: 3,
    reasonForLeaving: '',
    feedback: '',
    wouldRecommend: false,
    suggestions: ''
  };

  basicInfoItems = computed<DefinitionItem[]>(() => {
    const t = this.termination();
    if (!t) return [];
    return [
      { label: this.i18n.t('common.employee'), value: t.employeeName },
      { label: this.i18n.t('employees.employee_number'), value: t.employeeNumber },
      { label: this.i18n.t('common.department'), value: t.departmentName || '-' },
      { label: this.i18n.t('common.branch'), value: t.branchName || '-' },
      { label: this.i18n.t('offboarding.terminations.type'), value: this.i18n.t('offboarding.termination_types.' + t.terminationType) },
      { label: this.i18n.t('offboarding.terminations.termination_date'), value: t.terminationDate, type: 'date' },
      { label: this.i18n.t('offboarding.terminations.last_working_date'), value: t.lastWorkingDate, type: 'date' },
      { label: this.i18n.t('common.reason'), value: t.reason },
      { label: this.i18n.t('offboarding.terminations.clearance_status'), value: this.i18n.t('offboarding.clearance_statuses.' + t.clearanceStatus), type: 'badge', badgeVariant: this.getClearanceVariant(t.clearanceStatus) as any },
      { label: this.i18n.t('common.created_by'), value: t.createdByName || '-' },
      { label: this.i18n.t('common.created_at'), value: t.createdAtUtc, type: 'date' }
    ];
  });

  eosInfoItems = computed<DefinitionItem[]>(() => {
    const e = this.eosCalculation();
    if (!e) return [];
    return [
      { label: this.i18n.t('common.employee'), value: e.employeeName },
      { label: this.i18n.t('offboarding.eos.hire_date'), value: e.hireDate, type: 'date' },
      { label: this.i18n.t('offboarding.eos.termination_date'), value: e.terminationDate, type: 'date' },
      { label: this.i18n.t('offboarding.eos.years_of_service'), value: e.yearsOfService },
      { label: this.i18n.t('offboarding.eos.basic_salary'), value: this.formatCurrency(e.basicSalary) },
      { label: this.i18n.t('offboarding.eos.total_amount'), value: this.formatCurrency(e.totalAmount), type: 'badge', badgeVariant: 'success' }
    ];
  });

  settlementInfoItems = computed<DefinitionItem[]>(() => {
    const s = this.finalSettlement();
    if (!s) return [];
    return [
      { label: this.i18n.t('offboarding.settlement.eos_amount'), value: this.formatCurrency(s.endOfServiceAmount) },
      { label: this.i18n.t('offboarding.settlement.leave_amount'), value: this.formatCurrency(s.remainingLeaveAmount) },
      { label: this.i18n.t('offboarding.settlement.pending_expenses'), value: this.formatCurrency(s.pendingExpensesAmount) },
      { label: this.i18n.t('offboarding.settlement.deductions'), value: this.formatCurrency(s.deductionsAmount) },
      { label: this.i18n.t('offboarding.settlement.total'), value: this.formatCurrency(s.totalAmount), type: 'badge', badgeVariant: 'success' },
      { label: this.i18n.t('common.status'), value: this.i18n.t('offboarding.settlement_statuses.' + s.status), type: 'badge', badgeVariant: this.getSettlementVariant(s.status) as any }
    ];
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.loadData(id);
  }

  setTab(tab: 'details' | 'clearance' | 'eos' | 'settlement' | 'interview' | 'history'): void {
    this.activeTab.set(tab);
    const t = this.termination();
    if (!t) return;
    if (tab === 'clearance' && this.clearanceItems().length === 0) this.loadClearance(t.id);
    if (tab === 'eos' && !this.eosCalculation()) this.loadEos(t.id);
    if (tab === 'settlement' && !this.finalSettlement()) this.loadSettlement(t.id);
    if (tab === 'interview' && !this.exitInterview()) this.loadExitInterview(t.id);
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.terminationService.getById(id).subscribe({
      next: (data) => { this.termination.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  loadClearance(terminationId: number): void {
    this.offboardingService.getClearanceItems(terminationId).subscribe({
      next: (data) => this.clearanceItems.set(data),
      error: () => {}
    });
  }

  loadEos(terminationId: number): void {
    this.offboardingService.getEndOfService(terminationId).subscribe({
      next: (data) => this.eosCalculation.set(data),
      error: () => {}
    });
  }

  loadSettlement(terminationId: number): void {
    this.offboardingService.getFinalSettlement(terminationId).subscribe({
      next: (data) => this.finalSettlement.set(data),
      error: () => {}
    });
  }

  loadExitInterview(terminationId: number): void {
    this.offboardingService.getExitInterview(terminationId).subscribe({
      next: (data) => {
        this.exitInterview.set(data);
        if (data && data.isCompleted) {
          this.interviewForm = {
            interviewDate: data.interviewDate || '',
            interviewerName: data.interviewerName || '',
            overallRating: data.overallRating || 3,
            reasonForLeaving: data.reasonForLeaving || '',
            feedback: data.feedback || '',
            wouldRecommend: data.wouldRecommend || false,
            suggestions: data.suggestions || ''
          };
        }
      },
      error: () => {}
    });
  }

  completeClearanceItem(item: ClearanceItem): void {
    const t = this.termination();
    if (!t) return;
    this.offboardingService.completeClearanceItem(t.id, item.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('offboarding.clearance.completed_successfully'));
        this.loadClearance(t.id);
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
    });
  }

  uncompleteClearanceItem(item: ClearanceItem): void {
    const t = this.termination();
    if (!t) return;
    this.offboardingService.uncompleteClearanceItem(t.id, item.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('common.updated_successfully'));
        this.loadClearance(t.id);
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
    });
  }

  calculateEos(): void {
    const t = this.termination();
    if (!t) return;
    this.processing.set(true);
    this.offboardingService.calculateEndOfService(t.id).subscribe({
      next: (data) => {
        this.eosCalculation.set(data);
        this.notificationService.success(this.i18n.t('offboarding.eos.calculated_successfully'));
        this.processing.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_processing'));
        this.processing.set(false);
      }
    });
  }

  calculateSettlement(): void {
    const t = this.termination();
    if (!t) return;
    this.processing.set(true);
    this.offboardingService.calculateFinalSettlement({ terminationId: t.id }).subscribe({
      next: (data) => {
        this.finalSettlement.set(data);
        this.notificationService.success(this.i18n.t('offboarding.settlement.calculated_successfully'));
        this.processing.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_processing'));
        this.processing.set(false);
      }
    });
  }

  approveSettlement(): void {
    const t = this.termination();
    if (!t) return;
    this.offboardingService.approveFinalSettlement(t.id, {}).subscribe({
      next: (data) => {
        this.finalSettlement.set(data);
        this.notificationService.success(this.i18n.t('offboarding.settlement.approved_successfully'));
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_approving'))
    });
  }

  markSettlementPaid(): void {
    const t = this.termination();
    if (!t) return;
    this.offboardingService.markFinalSettlementPaid(t.id).subscribe({
      next: (data) => {
        this.finalSettlement.set(data);
        this.notificationService.success(this.i18n.t('offboarding.settlement.marked_paid_successfully'));
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
    });
  }

  saveExitInterview(): void {
    const t = this.termination();
    if (!t) return;
    this.processing.set(true);
    this.offboardingService.saveExitInterview(t.id, this.interviewForm).subscribe({
      next: (data) => {
        this.exitInterview.set(data);
        this.notificationService.success(this.i18n.t('offboarding.interview.saved_successfully'));
        this.processing.set(false);
      },
      error: () => {
        this.notificationService.error(this.i18n.t('common.error_saving'));
        this.processing.set(false);
      }
    });
  }

  getClearanceVariant(status: ClearanceStatus): string {
    const map: Record<ClearanceStatus, string> = { 'Pending': 'warning', 'InProgress': 'info', 'Completed': 'success' };
    return map[status] || 'secondary';
  }

  getSettlementVariant(status: FinalSettlementStatus): string {
    const map: Record<FinalSettlementStatus, string> = { 'Draft': 'secondary', 'Calculated': 'info', 'PendingApproval': 'warning', 'Approved': 'primary', 'Paid': 'success', 'Cancelled': 'danger' };
    return map[status] || 'secondary';
  }

  formatCurrency(value: number): string {
    return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  }
}
