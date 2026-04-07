import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../core/services/succession.service';
import { TalentProfile } from '../../../shared/models/succession.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-talent-profiles',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './talent-profiles.component.html',
  styleUrls: ['./talent-profiles.component.css']
})
export class TalentProfilesComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SuccessionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<TalentProfile[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _nineBoxDisplay: this.formatBadge(item.nineBoxPosition),
    _readinessDisplay: this.formatReadiness(item.readinessLevel),
    _retentionDisplay: this.formatRisk(item.retentionRisk),
    _highPotentialDisplay: item.isHighPotential
      ? `<span class="badge bg-success">${this.i18n.t('common.yes')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.no')}</span>`
  })));

  tableColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('succession.talent_profiles.employee'), sortable: true, width: '18%' },
    { key: 'employeeNumber', label: this.i18n.t('employees.employee_number'), sortable: true, width: '10%' },
    { key: '_nineBoxDisplay', label: this.i18n.t('succession.talent_profiles.nine_box'), width: '14%', renderHtml: true },
    { key: '_readinessDisplay', label: this.i18n.t('succession.talent_profiles.readiness'), width: '12%', renderHtml: true },
    { key: '_retentionDisplay', label: this.i18n.t('succession.talent_profiles.retention_risk'), width: '12%', renderHtml: true },
    { key: '_highPotentialDisplay', label: this.i18n.t('succession.talent_profiles.high_potential'), width: '10%', renderHtml: true },
    { key: 'skillCount', label: this.i18n.t('succession.talent_profiles.skills'), width: '8%' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getTalentProfiles({ pageNumber: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('succession.talent_profiles.load_error')); this.loading.set(false); }
    });
  }

  async onTableAction(event: { action: string; item: TalentProfile }): Promise<void> {
    if (event.action === 'view') this.router.navigate(['/succession/talent-profiles', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/succession/talent-profiles', event.item.id, 'edit']);
    if (event.action === 'delete') {
      const result = await this.confirmation.confirm({
        title: this.i18n.t('common.delete'),
        message: this.i18n.t('succession.talent_profiles.confirm_delete'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      });
      if (!result.confirmed) return;
      this.service.deleteTalentProfile(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.talent_profiles.deleted_success')); this.loadData(); },
        error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.talent_profiles.delete_error'))
      });
    }
  }

  navigateToCreate(): void { this.router.navigate(['/succession/talent-profiles/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

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
