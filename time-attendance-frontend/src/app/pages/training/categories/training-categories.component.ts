import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService } from '../../../core/confirmation/confirmation.service';
import { TrainingService } from '../../../core/services/training.service';
import { TrainingCategoryDto } from '../../../shared/models/training.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-training-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PageHeaderComponent, UnifiedFilterComponent, DataTableComponent],
  templateUrl: './training-categories.component.html',
  styleUrl: './training-categories.component.css'
})
export class TrainingCategoriesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly service = inject(TrainingService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);

  data = signal<TrainingCategoryDto[]>([]);
  loading = signal(false);
  totalCount = signal(0);
  currentPage = signal(1);
  pageSize = signal(10);
  searchTerm = signal('');
  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()) || 1);

  showModal = signal(false);
  editingId = signal<number | null>(null);
  saving = signal(false);
  form!: FormGroup;

  columns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('training_categories.name'), sortable: true, priority: 'high' },
    { key: 'nameAr', label: this.i18n.t('training_categories.name_ar'), sortable: false, priority: 'medium' },
    { key: 'courseCount', label: this.i18n.t('training_categories.course_count'), sortable: true, priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => [
    { key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' },
    { key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' }
  ]);

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nameAr: [''],
      description: [''],
      isActive: [true]
    });
    this.loadData();
  }

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

  openCreateModal(): void {
    this.editingId.set(null);
    this.form.reset({ isActive: true });
    this.showModal.set(true);
  }

  openEditModal(item: TrainingCategoryDto): void {
    this.editingId.set(item.id);
    this.form.patchValue({ name: item.name, nameAr: item.nameAr, description: item.description, isActive: item.isActive });
    this.showModal.set(true);
  }

  closeModal(): void { this.showModal.set(false); }

  onSave(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);
    const val = this.form.value;
    const obs$ = this.editingId()
      ? this.service.updateCategory(this.editingId()!, val)
      : this.service.createCategory(val);
    (obs$ as any).subscribe({
      next: () => {
        this.notification.success(this.i18n.t(this.editingId() ? 'training_categories.updated' : 'training_categories.created'));
        this.closeModal(); this.saving.set(false); this.loadData();
      },
      error: () => { this.notification.error(this.i18n.t('common.error')); this.saving.set(false); }
    });
  }

  async onDelete(item: TrainingCategoryDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('training_categories.delete'),
      message: this.i18n.t('training_categories.confirm_delete'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    });
    if (result.confirmed) {
      this.service.deleteCategory(item.id).subscribe({
        next: () => { this.notification.success(this.i18n.t('training_categories.deleted')); this.loadData(); },
        error: () => this.notification.error(this.i18n.t('common.error'))
      });
    }
  }

  onActionClick(event: { action: string; item: TrainingCategoryDto }): void {
    if (event.action === 'edit') this.openEditModal(event.item);
    else if (event.action === 'delete') this.onDelete(event.item);
  }
}
