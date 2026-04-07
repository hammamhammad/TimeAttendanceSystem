import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { PerformanceService } from '../../../core/services/performance.service';
import { GoalDefinition } from '../../../shared/models/performance.model';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [CommonModule, DataTableComponent, PageHeaderComponent, UnifiedFilterComponent],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})
export class GoalsComponent implements OnInit {
  i18n = inject(I18nService);
  private service = inject(PerformanceService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  private confirmation = inject(ConfirmationService);

  items = signal<GoalDefinition[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  currentFilter: any = {};

  displayData = computed(() => this.items().map(g => ({
    ...g,
    _statusDisplay: `<span class="badge bg-${g.status === 'Completed' ? 'success' : g.status === 'Active' || g.status === 'InProgress' ? 'info' : g.status === 'Cancelled' ? 'danger' : 'secondary'}">${g.status}</span>`,
    _progressDisplay: `${g.progressPercentage}%`
  })));

  tableColumns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('goals.goal_title'), sortable: true, width: '22%' },
    { key: 'employeeName', label: this.i18n.t('fields.employee'), sortable: true, width: '16%' },
    { key: 'category', label: this.i18n.t('goals.category'), sortable: true, width: '10%' },
    { key: '_statusDisplay', label: this.i18n.t('fields.status'), sortable: true, width: '10%', renderHtml: true },
    { key: '_progressDisplay', label: this.i18n.t('goals.progress'), sortable: true, width: '10%' },
    { key: 'weight', label: this.i18n.t('goals.weight'), sortable: true, width: '8%' },
    { key: 'targetDate', label: this.i18n.t('goals.target_date'), sortable: true, width: '12%' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'primary' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'info', condition: (item: any) => item.status === 'Draft' || item.status === 'Active' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item.status === 'Draft' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getGoals({ page: this.currentPage(), pageSize: this.pageSize(), ...this.currentFilter }).subscribe({
      next: (res) => { this.items.set(res.data || []); this.totalCount.set(res.totalCount || 0); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('goals.load_error')); this.loading.set(false); }
    });
  }

  onTableAction(event: { action: string; item: GoalDefinition }): void {
    if (event.action === 'view') this.router.navigate(['/performance/goals', event.item.id, 'view']);
    if (event.action === 'edit') this.router.navigate(['/performance/goals', event.item.id, 'edit']);
    if (event.action === 'delete') this.deleteGoal(event.item);
  }

  async deleteGoal(goal: GoalDefinition): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('common.delete'),
      message: this.i18n.t('goals.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      confirmButtonClass: 'btn-danger'
    });
    if (!result.confirmed) return;
    this.service.deleteGoal(goal.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('goals.deleted_success')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('goals.delete_error'))
    });
  }

  navigateToCreate(): void { this.router.navigate(['/performance/goals/create']); }
  onPageChange(p: number): void { this.currentPage.set(p); this.loadData(); }
  onPageSizeChange(s: number): void { this.pageSize.set(s); this.currentPage.set(1); this.loadData(); }
  onSearchChange(t: string): void { this.currentFilter = { ...this.currentFilter, searchTerm: t }; this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.currentFilter = {}; this.currentPage.set(1); this.loadData(); }
}
