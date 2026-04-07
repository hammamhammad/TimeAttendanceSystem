import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ExpenseService } from '../../../core/services/expense.service';
import { ExpensePolicyDto } from '../../../shared/models/expense.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-expense-policies',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './expense-policies.component.html',
  styleUrl: './expense-policies.component.css'
})
export class ExpensePoliciesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(ExpenseService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<ExpensePolicyDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('expense_policies.name'), sortable: true, priority: 'high' },
    { key: 'maxClaimAmount', label: this.i18n.t('expense_policies.max_claim_amount'), sortable: true, priority: 'medium' },
    { key: 'maxMonthlyAmount', label: this.i18n.t('expense_policies.max_monthly_amount'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getPolicies({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/expenses/policies/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: ExpensePolicyDto }): void {
    if (event.action === 'view') this.router.navigate(['/expenses/policies', event.item.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/expenses/policies', event.item.id, 'edit']);
    else if (event.action === 'delete') {
      this.service.deletePolicy(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('expense_policies.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }
}
