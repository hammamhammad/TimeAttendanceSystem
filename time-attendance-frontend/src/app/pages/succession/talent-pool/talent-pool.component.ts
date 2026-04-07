import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { SuccessionService } from '../../../core/services/succession.service';
import { TalentProfile, KeyPositionRiskSummary } from '../../../shared/models/succession.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-talent-pool',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './talent-pool.component.html',
  styleUrls: ['./talent-pool.component.css']
})
export class TalentPoolComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SuccessionService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  items = signal<TalentProfile[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  riskSummary = signal<KeyPositionRiskSummary | null>(null);
  riskLoading = signal(false);

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _readinessDisplay: this.formatReadiness(item.readinessLevel),
    _retentionDisplay: this.formatRisk(item.retentionRisk),
    _nineBoxDisplay: this.formatBadge(item.nineBoxPosition)
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('succession.talent_profiles.employee'), sortable: true, width: '20%' },
    { key: 'employeeNumber', label: this.i18n.t('employees.employee_number'), width: '10%' },
    { key: 'departmentName', label: this.i18n.t('fields.department'), width: '14%' },
    { key: '_nineBoxDisplay', label: this.i18n.t('succession.talent_profiles.nine_box'), width: '14%', renderHtml: true },
    { key: '_readinessDisplay', label: this.i18n.t('succession.talent_profiles.readiness'), width: '12%', renderHtml: true },
    { key: '_retentionDisplay', label: this.i18n.t('succession.talent_profiles.retention_risk'), width: '12%', renderHtml: true },
    { key: 'careerAspiration', label: this.i18n.t('succession.talent_profiles.career_aspiration'), width: '16%' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' }
  ]);

  ngOnInit(): void {
    this.loadData();
    this.loadRiskSummary();
  }

  loadData(): void {
    this.loading.set(true);
    this.service.getTalentPool({ pageSize: 50 }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('succession.talent_pool.load_error')); this.loading.set(false); }
    });
  }

  loadRiskSummary(): void {
    this.riskLoading.set(true);
    this.service.getKeyPositionRiskSummary().subscribe({
      next: (d) => { this.riskSummary.set(d); this.riskLoading.set(false); },
      error: () => this.riskLoading.set(false)
    });
  }

  onTableAction(event: { action: string; item: TalentProfile }): void {
    if (event.action === 'view') this.router.navigate(['/succession/talent-profiles', event.item.id, 'view']);
  }

  private formatBadge(v: string): string {
    const key = `succession.enums.${v}`;
    const label = this.i18n.t(key) !== key ? this.i18n.t(key) : v;
    return `<span class="badge bg-info">${label}</span>`;
  }
  private formatReadiness(v: string): string {
    const map: Record<string, string> = { 'NotReady': 'danger', 'DevelopmentNeeded': 'warning', 'ReadyWithDevelopment': 'info', 'ReadyNow': 'success' };
    const key = `succession.enums.${v}`;
    const label = this.i18n.t(key) !== key ? this.i18n.t(key) : v;
    return `<span class="badge bg-${map[v] || 'secondary'}">${label}</span>`;
  }
  private formatRisk(v: string): string {
    const map: Record<string, string> = { 'Low': 'success', 'Medium': 'warning', 'High': 'danger', 'Critical': 'danger' };
    const key = `succession.enums.${v}`;
    const label = this.i18n.t(key) !== key ? this.i18n.t(key) : v;
    return `<span class="badge bg-${map[v] || 'secondary'}">${label}</span>`;
  }
}
