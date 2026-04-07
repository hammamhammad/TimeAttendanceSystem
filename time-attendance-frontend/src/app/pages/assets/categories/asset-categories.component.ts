import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AssetService } from '../../../core/services/asset.service';
import { AssetCategoryDto, CreateAssetCategoryRequest, UpdateAssetCategoryRequest } from '../../../shared/models/asset.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-asset-categories',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    UnifiedFilterComponent,
    DataTableComponent,
    StatusBadgeComponent,
    ModalWrapperComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './asset-categories.component.html',
  styleUrl: './asset-categories.component.css'
})
export class AssetCategoriesComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  readonly permissionService = inject(PermissionService);

  // State
  categories = signal<AssetCategoryDto[]>([]);
  loading = signal(false);
  saving = signal(false);
  showModal = signal(false);
  editingCategory = signal<AssetCategoryDto | null>(null);
  searchTerm = signal('');

  // Form fields
  formName = signal('');
  formNameAr = signal('');
  formDescription = signal('');
  formParentCategoryId = signal<number | null>(null);
  formIsActive = signal(true);

  // Dropdown for parent categories
  parentOptions = signal<{ id: number; name: string }[]>([]);

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'name', label: this.i18n.t('assets.categories.name'), sortable: true, priority: 'high' },
    { key: 'nameAr', label: this.i18n.t('assets.categories.name_ar'), sortable: true, priority: 'medium' },
    { key: 'parentCategoryName', label: this.i18n.t('assets.categories.parent_category'), sortable: true, priority: 'medium' },
    { key: 'assetCount', label: this.i18n.t('assets.categories.asset_count'), sortable: true, align: 'center', priority: 'medium' },
    { key: 'isActive', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high' }
  ];

  // Table actions
  tableActions = computed<TableAction[]>(() => {
    const actions: TableAction[] = [];
    if (this.permissionService.has('assetCategory.read')) {
      actions.push({ key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' });
    }
    if (this.permissionService.has('assetCategory.read')) {
      actions.push({ key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' });
    }
    return actions;
  });

  // Filtered data
  filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) return this.categories();
    return this.categories().filter(c =>
      c.name.toLowerCase().includes(term) ||
      (c.nameAr && c.nameAr.toLowerCase().includes(term)) ||
      (c.description && c.description.toLowerCase().includes(term))
    );
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.assetService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.parentOptions.set(data.map(c => ({ id: c.id, name: c.name })));
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.categories.load_failed'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  onRefresh(): void {
    this.searchTerm.set('');
    this.loadCategories();
  }

  openCreate(): void {
    this.editingCategory.set(null);
    this.formName.set('');
    this.formNameAr.set('');
    this.formDescription.set('');
    this.formParentCategoryId.set(null);
    this.formIsActive.set(true);
    this.showModal.set(true);
  }

  openEdit(category: AssetCategoryDto): void {
    this.editingCategory.set(category);
    this.formName.set(category.name);
    this.formNameAr.set(category.nameAr || '');
    this.formDescription.set(category.description || '');
    this.formParentCategoryId.set(category.parentCategoryId || null);
    this.formIsActive.set(category.isActive);
    this.showModal.set(true);
  }

  saveCategory(): void {
    if (!this.formName()) return;
    this.saving.set(true);

    const editing = this.editingCategory();
    if (editing) {
      const request: UpdateAssetCategoryRequest = {
        name: this.formName(),
        nameAr: this.formNameAr() || undefined,
        description: this.formDescription() || undefined,
        parentCategoryId: this.formParentCategoryId() || undefined,
        isActive: this.formIsActive()
      };
      this.assetService.updateCategory(editing.id, request).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.categories.updated'));
          this.showModal.set(false);
          this.saving.set(false);
          this.loadCategories();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.categories.update_failed'));
          this.saving.set(false);
        }
      });
    } else {
      const request: CreateAssetCategoryRequest = {
        name: this.formName(),
        nameAr: this.formNameAr() || undefined,
        description: this.formDescription() || undefined,
        parentCategoryId: this.formParentCategoryId() || undefined,
        isActive: this.formIsActive()
      };
      this.assetService.createCategory(request).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.categories.created'));
          this.showModal.set(false);
          this.saving.set(false);
          this.loadCategories();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.categories.create_failed'));
          this.saving.set(false);
        }
      });
    }
  }

  async deleteCategory(category: AssetCategoryDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('assets.categories.delete_title'),
      message: this.i18n.t('assets.categories.delete_confirm').replace('{{name}}', category.name),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig);

    if (result.confirmed) {
      this.assetService.deleteCategory(category.id).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.categories.deleted'));
          this.loadCategories();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.categories.delete_failed'));
        }
      });
    }
  }

  onActionClick(event: { action: string; item: AssetCategoryDto }): void {
    switch (event.action) {
      case 'edit':
        this.openEdit(event.item);
        break;
      case 'delete':
        this.deleteCategory(event.item);
        break;
    }
  }

  get modalTitle(): string {
    return this.editingCategory()
      ? this.i18n.t('assets.categories.edit')
      : this.i18n.t('assets.categories.create');
  }
}
