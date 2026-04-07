import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { AnnouncementService } from '../../../core/services/announcement.service';
import { AnnouncementCategoryDto, CreateAnnouncementCategoryRequest } from '../../../shared/models/announcement.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-announcement-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent, ModalWrapperComponent],
  templateUrl: './announcement-categories.component.html',
  styleUrl: './announcement-categories.component.css'
})
export class AnnouncementCategoriesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(AnnouncementService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);

  data = signal<AnnouncementCategoryDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');

  showModal = signal(false);
  editingItem = signal<AnnouncementCategoryDto | null>(null);
  formData = signal<CreateAnnouncementCategoryRequest>({ name: '', isActive: true });
  saving = signal(false);

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('announcement_categories.name'), sortable: true, priority: 'high' },
    { key: 'nameAr', label: this.i18n.t('announcement_categories.name_ar'), sortable: true, priority: 'medium' },
    { key: 'icon', label: this.i18n.t('announcement_categories.icon'), sortable: false, priority: 'medium' },
    { key: 'sortOrder', label: this.i18n.t('announcement_categories.sort_order'), sortable: true, priority: 'medium' },
    { key: 'announcementCount', label: this.i18n.t('announcements.title'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high', renderHtml: true }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void { this.loadData(); }

  loadData(): void {
    this.loading.set(true);
    this.service.getCategories({ search: this.searchTerm(), pageNumber: this.currentPage(), pageSize: this.pageSize() }).subscribe({
      next: (res) => { this.data.set(res.data); this.totalCount.set(res.totalCount); this.loading.set(false); },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.loading.set(false); }
    });
  }

  onSearchChange(term: string): void { this.searchTerm.set(term); this.currentPage.set(1); this.loadData(); }
  onRefreshData(): void { this.loadData(); }
  onPageChange(page: number): void { this.currentPage.set(page); this.loadData(); }
  onPageSizeChange(size: number): void { this.pageSize.set(size); this.currentPage.set(1); this.loadData(); }

  onAdd(): void {
    this.editingItem.set(null);
    this.formData.set({ name: '', isActive: true });
    this.showModal.set(true);
  }

  onActionClick(event: { action: string; item: AnnouncementCategoryDto }): void {
    if (event.action === 'edit') {
      this.editingItem.set(event.item);
      this.formData.set({ name: event.item.name, nameAr: event.item.nameAr, description: event.item.description, icon: event.item.icon, sortOrder: event.item.sortOrder, isActive: event.item.isActive });
      this.showModal.set(true);
    } else if (event.action === 'delete') {
      this.deleteItem(event.item);
    }
  }

  async deleteItem(item: AnnouncementCategoryDto): Promise<void> {
    const result = await this.confirmation.confirm({ title: this.i18n.t('common.confirm_delete'), message: this.i18n.t('announcement_categories.confirm_delete'), confirmText: this.i18n.t('common.delete'), cancelText: this.i18n.t('common.cancel'), confirmButtonClass: 'btn-danger' });
    if (!result.confirmed) return;
    this.service.deleteCategory(item.id).subscribe({
      next: () => { this.notification.success(this.i18n.t('announcement_categories.deleted')); this.loadData(); },
      error: () => this.notification.error(this.i18n.t('common.error'))
    });
  }

  saveItem(): void {
    this.saving.set(true);
    const data = this.formData();
    const editing = this.editingItem();
    const handler = { next: () => { this.notification.success(this.i18n.t(editing ? 'announcement_categories.updated' : 'announcement_categories.created')); this.showModal.set(false); this.saving.set(false); this.loadData(); }, error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); } };
    if (editing) { this.service.updateCategory(editing.id, data).subscribe(handler); } else { this.service.createCategory(data).subscribe(handler); }
  }

  updateField(field: string, value: any): void {
    this.formData.update(d => ({ ...d, [field]: value }));
  }
}
