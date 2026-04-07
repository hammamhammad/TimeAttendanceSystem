import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { SuccessionService } from '../../../core/services/succession.service';
import { SuccessionPlan } from '../../../shared/models/succession.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-succession-plans',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './succession-plans.component.html',
  styleUrls: ['./succession-plans.component.css']
})
export class SuccessionPlansComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(SuccessionService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<SuccessionPlan[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(item => ({
    ...item,
    _statusDisplay: this.formatStatus(item.status),
    _effectiveDateDisplay: item.effectiveDate?.split('T')[0] || '-'
  })));

  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('succession.plans.name'), sortable: true, width: '20%' },
    { key: 'keyPositionTitle', label: this.i18n.t('succession.plans.key_position'), sortable: true, width: '18%' },
    { key: 'branchName', label: this.i18n.t('fields.branch'), sortable: true, width: '14%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), width: '12%', renderHtml: true },
    { key: '_effectiveDateDisplay', label: this.i18n.t('succession.plans.effective_date'), sortable: true, width: '12%' },
    { key: 'candidateCount', label: this.i18n.t('succession.plans.candidates'), width: '10%' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getSuccessionPlans({ pageNumber: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('succession.plans.load_error')); this.loading.set(false); }
    });
  }

  async onTableAction(event: { action: string; item: SuccessionPlan }): Promise<void> {
    if (event.action === 'view') this.router.navigate(['/succession/plans', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/succession/plans', event.item.id, 'edit']);
    if (event.action === 'delete') {
      const result = await this.confirmation.confirm({
        title: this.i18n.t('common.delete'),
        message: this.i18n.t('succession.plans.confirm_delete'),
        confirmText: this.i18n.t('common.delete'),
        confirmButtonClass: 'btn-danger'
      });
      if (!result.confirmed) return;
      this.service.deleteSuccessionPlan(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('succession.plans.deleted_success')); this.loadData(); },
        error: (err) => this.notification.error(err?.error?.error || this.i18n.t('succession.plans.delete_error'))
      });
    }
  }

  navigateToCreate(): void { this.router.navigate(['/succession/plans/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, search: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }

  private formatStatus(s: string): string {
    const map: Record<string, string> = { 'Draft': 'secondary', 'Active': 'success', 'UnderReview': 'info', 'Approved': 'primary', 'Archived': 'dark' };
    const key = `succession.enums.${s}`;
    const label = this.i18n.t(key) !== key ? this.i18n.t(key) : s;
    return `<span class="badge bg-${map[s] || 'secondary'}">${label}</span>`;
  }
}
