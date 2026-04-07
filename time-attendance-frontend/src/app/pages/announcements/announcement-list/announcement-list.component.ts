import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { AnnouncementService } from '../../../core/services/announcement.service';
import { AnnouncementDto, AnnouncementStatus, AnnouncementPriority } from '../../../shared/models/announcement.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-announcement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './announcement-list.component.html',
  styleUrl: './announcement-list.component.css'
})
export class AnnouncementListComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(AnnouncementService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);

  data = signal<AnnouncementDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  statusFilter = signal('');
  categoryFilter = signal('');
  priorityFilter = signal('');

  categoryOptions = signal<{ id: number; name: string }[]>([]);

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  statusOptions = Object.values(AnnouncementStatus);
  priorityOptions = Object.values(AnnouncementPriority);

  columns: TableColumn[] = [
    { key: 'title', label: this.i18n.t('announcements.title_field'), sortable: true, priority: 'high' },
    { key: 'categoryName', label: this.i18n.t('announcements.category'), sortable: true, priority: 'medium' },
    { key: 'priority', label: this.i18n.t('announcements.priority'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('announcements.status'), sortable: true, priority: 'high' },
    { key: 'targetAudience', label: this.i18n.t('announcements.target_audience'), sortable: true, priority: 'medium' },
    { key: 'createdAtUtc', label: this.i18n.t('common.created_date'), sortable: true, priority: 'low' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' },
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary', condition: (item: any) => item.status === 'Draft' || item.status === 'Scheduled' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger', condition: (item: any) => item.status === 'Draft' }
  ]);

  ngOnInit(): void {
    this.loadData();
    this.service.getCategoryDropdown().subscribe({
      next: (res) => this.categoryOptions.set(res)
    });
  }

  loadData(): void {
    this.loading.set(true);
    this.service.getAnnouncements({
      search: this.searchTerm(),
      status: this.statusFilter() || undefined,
      categoryId: this.categoryFilter() || undefined,
      priority: this.priorityFilter() || undefined,
      pageNumber: this.currentPage(),
      pageSize: this.pageSize()
    }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onAdd(): void { this.router.navigate(['/announcements/create']); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onStatusChange(value: string): void { this.statusFilter.set(value); this.currentPage.set(1); this.loadData(); }
  onCategoryChange(value: string): void { this.categoryFilter.set(value); this.currentPage.set(1); this.loadData(); }
  onPriorityChange(value: string): void { this.priorityFilter.set(value); this.currentPage.set(1); this.loadData(); }

  onActionClick(event: { action: string; item: AnnouncementDto }): void {
    if (event.action === 'view') {
      this.router.navigate(['/announcements', event.item.id, 'view']);
    } else if (event.action === 'edit') {
      this.router.navigate(['/announcements', event.item.id, 'edit']);
    } else if (event.action === 'delete') {
      this.deleteItem(event.item);
    }
  }

  async deleteItem(item: AnnouncementDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('announcements.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteAnnouncement(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('announcements.deleted')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  getStatusBadgeClass(status: string): string {
    const map: Record<string, string> = { Draft: 'bg-secondary', Scheduled: 'bg-info', Published: 'bg-success', Expired: 'bg-warning', Archived: 'bg-dark' };
    return 'badge ' + (map[status] ?? 'bg-secondary');
  }

  getPriorityBadgeClass(priority: string): string {
    const map: Record<string, string> = { Low: 'bg-secondary', Normal: 'bg-primary', High: 'bg-warning', Urgent: 'bg-danger' };
    return 'badge ' + (map[priority] ?? 'bg-secondary');
  }
}
