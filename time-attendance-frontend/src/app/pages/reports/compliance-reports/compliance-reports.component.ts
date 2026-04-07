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
  selector: 'app-compliance-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './compliance-reports.component.html',
  styleUrls: ['./compliance-reports.component.css']
})
export class ComplianceReportsComponent implements OnInit {
  private reportService = inject(PayrollReportService);
  private notificationService = inject(NotificationService);
  public i18n = inject(I18nService);

  activeTab = signal<'contracts' | 'documents' | 'certifications' | 'summary'>('contracts');
  loading = signal(false);
  daysThreshold = signal(30);

  contractData = signal<any[]>([]);
  documentData = signal<any[]>([]);
  certificationData = signal<any[]>([]);
  summaryData = signal<any | null>(null);

  thresholdOptions = [7, 15, 30, 60, 90];

  contractColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'employeeNumber', label: this.t('common.employee_number'), sortable: false, width: '120px', priority: 'medium', mobileLabel: this.t('common.employee_number') },
    { key: 'departmentName', label: this.t('common.department'), sortable: false, width: '140px', priority: 'medium', mobileLabel: this.t('common.department') },
    { key: 'contractType', label: this.t('compliance_reports.contract_type'), sortable: false, width: '130px', priority: 'medium', mobileLabel: this.t('compliance_reports.contract_type') },
    { key: 'expiryDate', label: this.t('compliance_reports.expiry_date'), sortable: true, width: '130px', priority: 'high', mobileLabel: this.t('compliance_reports.expiry_date') },
    { key: 'daysRemaining', label: this.t('compliance_reports.days_remaining'), sortable: true, width: '120px', align: 'center', priority: 'high', mobileLabel: this.t('compliance_reports.days_remaining') }
  ]);

  documentColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'documentType', label: this.t('compliance_reports.document_type'), sortable: false, width: '150px', priority: 'medium', mobileLabel: this.t('compliance_reports.document_type') },
    { key: 'documentNumber', label: this.t('compliance_reports.document_number'), sortable: false, width: '140px', priority: 'medium', mobileLabel: this.t('compliance_reports.document_number') },
    { key: 'expiryDate', label: this.t('compliance_reports.expiry_date'), sortable: true, width: '130px', priority: 'high', mobileLabel: this.t('compliance_reports.expiry_date') },
    { key: 'daysRemaining', label: this.t('compliance_reports.days_remaining'), sortable: true, width: '120px', align: 'center', priority: 'high', mobileLabel: this.t('compliance_reports.days_remaining') }
  ]);

  certificationColumns = computed<TableColumn[]>(() => [
    { key: 'employeeName', label: this.t('common.employee'), sortable: true, width: '180px', priority: 'high', mobileLabel: this.t('common.employee') },
    { key: 'certificationName', label: this.t('compliance_reports.certification_name'), sortable: false, width: '180px', priority: 'medium', mobileLabel: this.t('compliance_reports.certification_name') },
    { key: 'issuingBody', label: this.t('compliance_reports.issuing_body'), sortable: false, width: '150px', priority: 'medium', mobileLabel: this.t('compliance_reports.issuing_body') },
    { key: 'expiryDate', label: this.t('compliance_reports.expiry_date'), sortable: true, width: '130px', priority: 'high', mobileLabel: this.t('compliance_reports.expiry_date') },
    { key: 'daysRemaining', label: this.t('compliance_reports.days_remaining'), sortable: true, width: '120px', align: 'center', priority: 'high', mobileLabel: this.t('compliance_reports.days_remaining') }
  ]);

  ngOnInit(): void { }
  t(key: string): string { return this.i18n.t(key); }

  setTab(tab: 'contracts' | 'documents' | 'certifications' | 'summary'): void { this.activeTab.set(tab); }

  loadContracts(): void {
    this.loading.set(true);
    this.reportService.getContractExpiry(this.daysThreshold()).subscribe({
      next: (data) => { this.contractData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('compliance_reports.load_error')); }
    });
  }

  loadDocuments(): void {
    this.loading.set(true);
    this.reportService.getDocumentExpiry(this.daysThreshold()).subscribe({
      next: (data) => { this.documentData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('compliance_reports.load_error')); }
    });
  }

  loadCertifications(): void {
    this.loading.set(true);
    this.reportService.getCertificationExpiry(this.daysThreshold()).subscribe({
      next: (data) => { this.certificationData.set(Array.isArray(data) ? data : data?.data || []); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('compliance_reports.load_error')); }
    });
  }

  loadSummary(): void {
    this.loading.set(true);
    this.reportService.getComplianceSummary().subscribe({
      next: (data) => { this.summaryData.set(data); this.loading.set(false); },
      error: () => { this.loading.set(false); this.notificationService.error(this.t('app.error'), this.t('compliance_reports.load_error')); }
    });
  }
}
