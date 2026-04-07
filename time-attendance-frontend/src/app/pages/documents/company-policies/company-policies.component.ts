import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DocumentService } from '../../../core/services/document.service';
import { CompanyPolicyDto } from '../../../shared/models/document.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-company-policies',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './company-policies.component.html',
  styleUrl: './company-policies.component.css'
})
export class CompanyPoliciesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<CompanyPolicyDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('company_policies.title_field'), sortable: true, priority: 'high' },
    { key: 'categoryName', label: this.i18n.t('company_policies.category'), sortable: true, priority: 'medium' },
    { key: 'version', label: this.i18n.t('company_policies.version'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'acknowledgmentCount', label: this.i18n.t('company_policies.acknowledged'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => item.status === 'Draft' }
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
  onAdd(): void { this.router.navigate(['/documents/company-policies/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: CompanyPolicyDto }): void {
    if (event.action === 'view') this.router.navigate(['/documents/company-policies', event.item.id, 'view']);
    else if (event.action === 'edit') this.router.navigate(['/documents/company-policies', event.item.id, 'edit']);
  }
}
