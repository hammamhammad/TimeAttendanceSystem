import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { I18nService } from '../../../../core/i18n/i18n.service';
import { NotificationService } from '../../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../../core/confirmation/confirmation.service';
import { PayrollService } from '../../../../core/services/payroll.service';
import { PayrollPeriod, PayrollRecord, PayrollStatus } from '../../../../shared/models/payroll.model';
import { FormHeaderComponent, FormHeaderAction } from '../../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { SectionCardComponent } from '../../../../shared/components/section-card/section-card.component';
import { DefinitionListComponent, DefinitionItem } from '../../../../shared/components/definition-list/definition-list.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DataTableComponent, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { AuditHistoryComponent } from '../../../../shared/components/audit-history/audit-history.component';

@Component({
  selector: 'app-view-payroll-period',
  standalone: true,
  imports: [
    RouterModule, FormHeaderComponent, LoadingSpinnerComponent,
    SectionCardComponent, DefinitionListComponent, StatusBadgeComponent, DataTableComponent,
    AuditHistoryComponent
  ],
  templateUrl: './view-payroll-period.component.html',
  styleUrls: ['./view-payroll-period.component.css']
})
export class ViewPayrollPeriodComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private payrollService = inject(PayrollService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  readonly i18n = inject(I18nService);

  loading = signal(false);
  period = signal<PayrollPeriod | null>(null);
  records = signal<PayrollRecord[]>([]);
  processing = signal(false);

  periodInfoItems = computed<DefinitionItem[]>(() => {
    const p = this.period();
    if (!p) return [];
    return [
      { label: this.i18n.t('common.name'), value: p.name },
      { label: this.i18n.t('common.branch'), value: p.branchName },
      { label: this.i18n.t('payroll.periods.period_type'), value: this.i18n.t('payroll.period_types.' + p.periodType) },
      { label: this.i18n.t('common.start_date'), value: p.startDate, type: 'date' },
      { label: this.i18n.t('common.end_date'), value: p.endDate, type: 'date' },
      { label: this.i18n.t('common.status'), value: this.i18n.t('payroll.statuses.' + p.status), type: 'badge', badgeVariant: this.getStatusVariant(p.status) as any }
    ];
  });

  financialItems = computed<DefinitionItem[]>(() => {
    const p = this.period();
    if (!p) return [];
    return [
      { label: this.i18n.t('payroll.periods.total_gross'), value: this.formatCurrency(p.totalGrossSalary) },
      { label: this.i18n.t('payroll.periods.total_deductions'), value: this.formatCurrency(p.totalDeductions) },
      { label: this.i18n.t('payroll.periods.total_allowances'), value: this.formatCurrency(p.totalAllowances) },
      { label: this.i18n.t('payroll.periods.total_net'), value: this.formatCurrency(p.totalNetSalary) },
      { label: this.i18n.t('payroll.periods.employee_count'), value: p.employeeCount }
    ];
  });

  headerActions = computed<FormHeaderAction[]>(() => {
    const p = this.period();
    if (!p) return [];
    const actions: FormHeaderAction[] = [];
    if (p.status === 'Draft') {
      actions.push({ label: this.i18n.t('payroll.periods.process'), icon: 'fa-solid fa-cog', type: 'primary', action: () => this.processPeriod() });
    }
    if (p.status === 'Processed') {
      actions.push({ label: this.i18n.t('common.approve'), icon: 'fa-solid fa-check', type: 'success', action: () => this.approvePeriod() });
    }
    if (p.status === 'Approved') {
      actions.push({ label: this.i18n.t('payroll.periods.mark_paid'), icon: 'fa-solid fa-money-bill', type: 'success', action: () => this.markPaid() });
    }
    if (p.status === 'Draft' || p.status === 'Processed') {
      actions.push({ label: this.i18n.t('common.cancel'), icon: 'fa-solid fa-ban', type: 'danger', action: () => this.cancelPeriod() });
    }
    return actions;
  });

  recordColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('common.employee'), priority: 'high' },
    { key: 'employeeNumber', label: this.i18n.t('employees.employee_number'), priority: 'medium' },
    { key: 'departmentName', label: this.i18n.t('common.department'), priority: 'medium' },
    { key: 'basicSalary', label: this.i18n.t('payroll.records.basic_salary'), priority: 'medium' },
    { key: 'grossSalary', label: this.i18n.t('payroll.records.gross_salary'), priority: 'medium' },
    { key: 'totalDeductions', label: this.i18n.t('payroll.records.deductions'), priority: 'low' },
    { key: 'netSalary', label: this.i18n.t('payroll.records.net_salary'), priority: 'high' },
    { key: 'workingDays', label: this.i18n.t('payroll.records.working_days'), priority: 'low' },
    { key: 'overtimeHours', label: this.i18n.t('payroll.records.overtime_hours'), priority: 'low' }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadData(id);
      this.loadRecords(id);
    }
  }

  loadData(id: number): void {
    this.loading.set(true);
    this.payrollService.getPeriodById(id).subscribe({
      next: (data) => { this.period.set(data); this.loading.set(false); },
      error: () => { this.notificationService.error(this.i18n.t('common.error_loading')); this.loading.set(false); }
    });
  }

  loadRecords(periodId: number): void {
    this.payrollService.getRecords(periodId).subscribe({
      next: (response: any) => this.records.set(Array.isArray(response) ? response : (response.data || response.items || [])),
      error: () => {}
    });
  }

  processPeriod(): void {
    const p = this.period();
    if (!p) return;
    this.processing.set(true);
    this.payrollService.processPeriod(p.id).subscribe({
      next: () => {
        this.notificationService.success(this.i18n.t('payroll.periods.processed_successfully'));
        this.loadData(p.id);
        this.loadRecords(p.id);
        this.processing.set(false);
      },
      error: () => { this.notificationService.error(this.i18n.t('common.error_processing')); this.processing.set(false); }
    });
  }

  approvePeriod(): void {
    const p = this.period();
    if (!p) return;
    this.payrollService.approvePeriod(p.id).subscribe({
      next: () => { this.notificationService.success(this.i18n.t('payroll.periods.approved_successfully')); this.loadData(p.id); },
      error: () => this.notificationService.error(this.i18n.t('common.error_approving'))
    });
  }

  markPaid(): void {
    const p = this.period();
    if (!p) return;
    this.payrollService.markPaid(p.id).subscribe({
      next: () => { this.notificationService.success(this.i18n.t('payroll.periods.marked_paid_successfully')); this.loadData(p.id); },
      error: () => this.notificationService.error(this.i18n.t('common.error_updating'))
    });
  }

  cancelPeriod(): void {
    const p = this.period();
    if (!p) return;
    this.confirmationService.confirm({
      title: this.i18n.t('common.confirm_cancel'),
      message: this.i18n.t('payroll.periods.confirm_cancel_message'),
      confirmText: this.i18n.t('common.confirm'),
      cancelText: this.i18n.t('common.cancel')
    }).then((confirmed) => {
      if (confirmed) {
        this.payrollService.cancelPeriod(p.id).subscribe({
          next: () => { this.notificationService.success(this.i18n.t('payroll.periods.cancelled_successfully')); this.loadData(p.id); },
          error: () => this.notificationService.error(this.i18n.t('common.error_cancelling'))
        });
      }
    });
  }

  exportCsv(): void {
    const p = this.period();
    if (!p) return;
    this.payrollService.exportToCsv(p.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `payroll-${p.name}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.notificationService.error(this.i18n.t('common.error_exporting'))
    });
  }

  getStatusVariant(status: PayrollStatus): string {
    const map: Record<PayrollStatus, string> = {
      'Draft': 'secondary', 'Processing': 'info', 'Processed': 'primary',
      'PendingApproval': 'warning', 'Approved': 'success', 'Paid': 'success', 'Cancelled': 'danger'
    };
    return map[status] || 'secondary';
  }

  formatCurrency(value: number): string {
    return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00';
  }
}
