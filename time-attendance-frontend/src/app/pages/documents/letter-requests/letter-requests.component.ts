import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { DocumentService } from '../../../core/services/document.service';
import { LetterRequestDto } from '../../../shared/models/document.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-letter-requests',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './letter-requests.component.html',
  styleUrl: './letter-requests.component.css'
})
export class LetterRequestsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(DocumentService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  data = signal<LetterRequestDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('letter_requests.employee'), sortable: true, priority: 'high' },
    { key: 'templateName', label: this.i18n.t('letter_requests.template'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, priority: 'high' },
    { key: 'requestedAtUtc', label: this.i18n.t('letter_requests.requested_at'), sortable: true, priority: 'medium' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'approve', label: this.i18n.t('common.approve'), icon: 'fa-check', color: 'success', condition: (item: any) => item.status === 'Pending' },
    { key: 'reject', label: this.i18n.t('common.reject'), icon: 'fa-times', color: 'danger', condition: (item: any) => item.status === 'Pending' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getLetterRequests({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }
  navigateToCreate(): void { this.router.navigate(['/documents/letter-requests/create']); }

  onActionClick(event: { action: string; item: LetterRequestDto }): void {
    if (event.action === 'view') this.router.navigate(['/documents/letter-requests', event.item.id, 'edit']);
    else if (event.action === 'approve') {
      this.service.approveLetterRequest(event.item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('letter_requests.approved')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    } else if (event.action === 'reject') {
      this.service.rejectLetterRequest(event.item.id, '').subscribe({
        next: () => { this.notification.success(this.i18n.t('letter_requests.rejected')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  formatDate(date?: string): string { return date ? new Date(date).toLocaleDateString() : '-'; }
}
