import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LoanService } from '../../../core/services/loan.service';
import { SalaryAdvanceDto } from '../../../shared/models/loan.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-salary-advances',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './salary-advances.component.html',
  styleUrl: './salary-advances.component.css'
})
export class SalaryAdvancesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(LoanService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<SalaryAdvanceDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('salary_advances.employee'), sortable: true, priority: 'high' },
    { key: 'requestedAmount', label: this.i18n.t('salary_advances.requested_amount'), sortable: true, priority: 'high' },
    { key: 'approvedAmount', label: this.i18n.t('salary_advances.approved_amount'), sortable: true, priority: 'medium' },
    { key: 'deductionStartDate', label: this.i18n.t('salary_advances.deduction_start_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: any) => item.status === 'Pending' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: any) => item.status === 'Pending' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getSalaryAdvances({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/loans/salary-advances/create']); }

  onActionClick(event: { action: string; item: SalaryAdvanceDto }): void {
    if (event.action === 'view') {
      this.router.navigate(['/loans/salary-advances', event.item.id, 'view']);
    } else if (event.action === 'approve') {
      this.service.approveSalaryAdvance(event.item.id).subscribe({ next: () => { this.notification.success(this.i18n.t('salary_advances.approved')); this.loadData(); }, error: () => this.notification.error(this.i18n.t('common.error')) });
    } else if (event.action === 'reject') {
      this.service.rejectSalaryAdvance(event.item.id, '').subscribe({ next: () => { this.notification.success(this.i18n.t('salary_advances.rejected')); this.loadData(); }, error: () => this.notification.error(this.i18n.t('common.error')) });
    }
  }
}
