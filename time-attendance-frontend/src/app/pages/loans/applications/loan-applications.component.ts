import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { LoanService } from '../../../core/services/loan.service';
import { LoanApplicationDto } from '../../../shared/models/loan.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-loan-applications',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './loan-applications.component.html',
  styleUrl: './loan-applications.component.css'
})
export class LoanApplicationsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(LoanService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<LoanApplicationDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'applicationNumber', label: this.i18n.t('loan_applications.application_number'), sortable: true, priority: 'high' },
    { key: 'employeeName', label: this.i18n.t('loan_applications.employee'), sortable: true, priority: 'high' },
    { key: 'loanTypeName', label: this.i18n.t('loan_applications.loan_type'), sortable: true, priority: 'medium' },
    { key: 'requestedAmount', label: this.i18n.t('loan_applications.requested_amount'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: any) => item.status === 'Submitted' || item.status === 'UnderReview' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: any) => item.status === 'Submitted' || item.status === 'UnderReview' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getApplications({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/loans/applications/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: LoanApplicationDto }): void {
    if (event.action === 'view') this.router.navigate(['/loans/applications', event.item.id, 'edit']);
    else if (event.action === 'approve') { this.service.approveApplication(event.item.id).subscribe({ next: () => { this.notification.success(this.i18n.t('loan_applications.approved')); this.loadData(); }, error: () => this.notification.error(this.i18n.t('common.error')) }); }
    else if (event.action === 'reject') { this.service.rejectApplication(event.item.id, '').subscribe({ next: () => { this.notification.success(this.i18n.t('loan_applications.rejected')); this.loadData(); }, error: () => this.notification.error(this.i18n.t('common.error')) }); }
  }
}
