import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../core/services/succession.service';
import { KeyPosition } from '../../../shared/models/succession.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-key-positions',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './key-positions.component.html',
  styleUrls: ['./key-positions.component.css']
})
export class KeyPositionsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SuccessionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<KeyPosition[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _criticalityDisplay: this.formatBadge(item.criticalityLevel, { 'Low': 'secondary', 'Medium': 'info', 'High': 'warning', 'Critical': 'danger' }),
    _vacancyRiskDisplay: this.formatBadge(item.vacancyRisk, { 'Low': 'success', 'Medium': 'warning', 'High': 'danger', 'Imminent': 'danger' }),
    _statusDisplay: item.isActive
      ? `<span class="badge bg-success">${this.i18n.t('common.active')}</span>`
      : `<span class="badge bg-secondary">${this.i18n.t('common.inactive')}</span>`
  })));

  tableColumns: TableColumn[] = [
    { key: 'jobTitle', label: this.i18n.t('succession.key_positions.job_title'), sortable: true, width: '20%' },
    { key: 'branchName', label: this.i18n.t('fields.branch'), sortable: true, width: '14%' },
    { key: 'departmentName', label: this.i18n.t('fields.department'), sortable: true, width: '14%' },
    { key: '_criticalityDisplay', label: this.i18n.t('succession.key_positions.criticality'), sortable: true, width: '12%', renderHtml: true },
    { key: '_vacancyRiskDisplay', label: this.i18n.t('succession.key_positions.vacancy_risk'), sortable: true, width: '12%', renderHtml: true },
    { key: 'currentHolderName', label: this.i18n.t('succession.key_positions.current_holder'), sortable: true, width: '16%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), width: '10%', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getKeyPositions({ pageNumber: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('succession.key_positions.load_error')); this.loading.set(false); }
    });
  }

  async onTableAction(event: { action: string; item: KeyPosition }): Promise<void> {
    if (event.action === 'view') this.router.navigate(['/succession/key-positions', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/succession/key-positions', event.item.id, 'edit']);
    if (event.action === 'delete') {
      const result = await this.confirmation.confirm({
        title: this.i18n.t('common.delete'),
        message: this.i18n.t('succession.key_positions.confirm_delete'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      });
      if (!result.confirmed) return;
      this.service.deleteKeyPosition(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.key_positions.deleted_success')); this.loadData(); },
        error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.key_positions.delete_error'))
      });
    }
  }

  navigateToCreate(): void { this.router.navigate(['/succession/key-positions/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatBadge(value: string, colorMap: Record<string, string>): string {
    const color = colorMap[value] || 'secondary';
    const key = `succession.enums.${value}`;
    const label = this.i18n.t(key) !== key ? this.i18n.t(key) : value;
    return `<span class="badge bg-${color}">${label}</span>`;
  }
}
