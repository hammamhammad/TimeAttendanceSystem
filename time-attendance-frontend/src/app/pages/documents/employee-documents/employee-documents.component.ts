import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DocumentService } from '../../../core/services/document.service';
import { EmployeeDocumentDto } from '../../../shared/models/document.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-employee-documents',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './employee-documents.component.html',
  styleUrl: './employee-documents.component.css'
})
export class EmployeeDocumentsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<EmployeeDocumentDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('employee_documents.employee'), sortable: true, priority: 'high' },
    { key: 'title', label: this.i18n.t('employee_documents.title_field'), sortable: true, priority: 'high' },
    { key: 'categoryName', label: this.i18n.t('employee_documents.category'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'expiryDate', label: this.i18n.t('employee_documents.expiry_date'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getEmployeeDocuments({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/documents/employee-documents/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: EmployeeDocumentDto }): void {
    if (event.action === 'view') {
      this.router.navigate(['/documents/employee-documents', event.item.id, 'view']);
    } else if (event.action === 'delete') {
      this.service.deleteDocument(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('employee_documents.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  formatDate(date?: string): string {
    return date ? new Date(date).toLocaleDateString() : '-';
  }
}
