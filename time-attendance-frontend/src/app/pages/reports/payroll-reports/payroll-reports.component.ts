import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PayrollReportService } from '../../../core/services/payroll-report.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-payroll-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './payroll-reports.component.html',
  styleUrls: ['./payroll-reports.component.css']
})
export class PayrollReportsComponent implements OnInit {
  private reportService = inject(PayrollReportService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  activeTab = signal<'salary' | 'department' | 'ytd'>('salary');
  loading = signal(false);
  currentYear = signal(new Date().getFullYear());
  currentMonth = signal(new Date().getMonth() + 1);
  periodId = signal<number | null>(null);

  salaryData = signal<any[]>([]);
  departmentData = signal<any[]>([]);
  ytdData = signal<any[]>([]);

  salaryColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'employeeNumber', label: this.t('common.employee_number'), sortable: false, width: '120px', priority: 'medium', mobileLabel: this.t('common.employee_number') },
    { key: 'departmentName', label: this.t('common.department'), sortable: false, width: '140px', priority: 'medium', mobileLabel: this.t('common.department') },
    { key: 'basicSalary', label: this.t('payroll_reports.basic_salary'), sortable: true, width: '120px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.basic_salary') },
    { key: 'totalAllowances', label: this.t('payroll_reports.allowances'), sortable: false, width: '120px', align: 'right', priority: 'medium', mobileLabel: this.t('payroll_reports.allowances') },
    { key: 'totalDeductions', label: this.t('payroll_reports.deductions'), sortable: false, width: '120px', align: 'right', priority: 'medium', mobileLabel: this.t('payroll_reports.deductions') },
    { key: 'netSalary', label: this.t('payroll_reports.net_salary'), sortable: true, width: '120px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.net_salary') }
  ]);

  departmentColumns = computed<TableColumn[]>(() => [
    { key: 'departmentName', label: this.t('common.department'), sortable: true, width: '200px', priority: 'high', mobileLabel: this.t('common.department') },
    { key: 'employeeCount', label: this.t('payroll_reports.employee_count'), sortable: true, width: '120px', align: 'center', priority: 'medium', mobileLabel: this.t('payroll_reports.employee_count') },
    { key: 'totalBasicSalary', label: this.t('payroll_reports.total_basic'), sortable: true, width: '140px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.total_basic') },
    { key: 'totalAllowances', label: this.t('payroll_reports.allowances'), sortable: false, width: '140px', align: 'right', priority: 'medium', mobileLabel: this.t('payroll_reports.allowances') },
    { key: 'totalCost', label: this.t('payroll_reports.total_cost'), sortable: true, width: '140px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.total_cost') }
  ]);

  ytdColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'employeeNumber', label: this.t('common.employee_number'), sortable: false, width: '120px', priority: 'medium', mobileLabel: this.t('common.employee_number') },
    { key: 'ytdBasicSalary', label: this.t('payroll_reports.ytd_basic'), sortable: true, width: '130px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.ytd_basic') },
    { key: 'ytdAllowances', label: this.t('payroll_reports.ytd_allowances'), sortable: false, width: '130px', align: 'right', priority: 'medium', mobileLabel: this.t('payroll_reports.ytd_allowances') },
    { key: 'ytdDeductions', label: this.t('payroll_reports.ytd_deductions'), sortable: false, width: '130px', align: 'right', priority: 'medium', mobileLabel: this.t('payroll_reports.ytd_deductions') },
    { key: 'ytdNetSalary', label: this.t('payroll_reports.ytd_net'), sortable: true, width: '130px', align: 'right', priority: 'high', mobileLabel: this.t('payroll_reports.ytd_net') }
  ]);

  ngOnInit(): void { }
  t(key: string): string { return this.i18n.t(key); }

  setTab(tab: 'salary' | 'department' | 'ytd'): void { this.activeTab.set(tab); }

  loadSalaryRegister(): void {
    if (!this.periodId()) return;
    this.loading.set(true);
    this.reportService.getSalaryRegister(this.periodId()!).subscribe({
      next: (data) => { this.salaryData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('payroll_reports.load_error')); }
    });
  }

  loadDepartmentCost(): void {
    this.loading.set(true);
    this.reportService.getDepartmentCost(this.currentYear(), this.currentMonth()).subscribe({
      next: (data) => { this.departmentData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('payroll_reports.load_error')); }
    });
  }

  loadYtdEarnings(): void {
    this.loading.set(true);
    this.reportService.getYtdEarnings(this.currentYear()).subscribe({
      next: (data) => { this.ytdData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('payroll_reports.load_error')); }
    });
  }
}
