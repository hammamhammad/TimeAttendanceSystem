import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AssetService } from '../../../core/services/asset.service';
import { AssetDto, AssetQueryParams, AssetStatus } from '../../../shared/models/asset.model';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    UnifiedFilterComponent,
    DataTableComponent,
    StatusBadgeComponent
  ],
  templateUrl: './asset-list.component.html',
  styleUrl: './asset-list.component.css'
})
export class AssetListComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);
  readonly permissionService = inject(PermissionService);

  // State
  assets = signal<AssetDto[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  currentFilters = signal<any>({});

  totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    if (size === 0) return 1;
    return Math.ceil(total / size);
  });

  // Table columns
  tableColumns: TableColumn[] = [
    { key: 'assetTag', label: this.i18n.t('assets.asset_tag'), sortable: true, priority: 'high', width: '12%' },
    { key: 'name', label: this.i18n.t('assets.name'), sortable: true, priority: 'high', width: '18%' },
    { key: 'categoryName', label: this.i18n.t('assets.category'), sortable: true, priority: 'medium', width: '12%' },
    { key: 'branchName', label: this.i18n.t('assets.branch'), sortable: true, priority: 'medium', width: '12%' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high', width: '12%' },
    { key: 'condition', label: this.i18n.t('assets.condition'), sortable: true, align: 'center', priority: 'medium', width: '10%' },
    { key: 'purchaseDate', label: this.i18n.t('assets.purchase_date'), sortable: true, priority: 'low', width: '12%' },
    { key: 'serialNumber', label: this.i18n.t('assets.serial_number'), priority: 'low', width: '12%' }
  ];

  // Table actions
  tableActions = computed<TableAction[]>(() => {
    const actions: TableAction[] = [];
    if (this.permissionService.has('asset.read')) {
      actions.push({ key: 'view', label: this.i18n.t('common.view'), icon: 'fa-eye', color: 'info' });
    }
    if (this.permissionService.has('asset.update')) {
      actions.push({ key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' });
    }
    if (this.permissionService.has('asset.update')) {
      actions.push({ key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.loading.set(true);
    const params: AssetQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilters()
    };
    this.assetService.getAssets(params).subscribe({
      next: (result) => {
        this.assets.set(result.data);
        this.totalItems.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.load_failed'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.currentFilters.update(f => ({ ...f, searchTerm: term || undefined }));
    this.currentPage.set(1);
    this.loadAssets();
  }

  onRefresh(): void {
    this.currentFilters.set({});
    this.currentPage.set(1);
    this.loadAssets();
  }

  navigateToCreate(): void {
    this.router.navigate(['/assets/create']);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadAssets();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAssets();
  }

  async onDelete(asset: AssetDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('assets.delete_title'),
      message: this.i18n.t('assets.delete_confirm').replace('{{name}}', asset.name),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig);

    if (result.confirmed) {
      this.assetService.deleteAsset(asset.id).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.deleted'));
          this.loadAssets();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.delete_failed'));
        }
      });
    }
  }

  onActionClick(event: { action: string; item: AssetDto }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/assets', event.item.id, 'view']);
        break;
      case 'edit':
        this.router.navigate(['/assets', event.item.id, 'edit']);
        break;
      case 'delete':
        this.onDelete(event.item);
        break;
    }
  }

  getStatusVariant(status: string): StatusVariant {
    switch (status) {
      case AssetStatus.Available: return 'success';
      case AssetStatus.Assigned: return 'primary';
      case AssetStatus.UnderMaintenance: return 'warning';
      case AssetStatus.Retired: return 'secondary';
      case AssetStatus.Lost: return 'danger';
      case AssetStatus.Disposed: return 'dark';
      default: return 'secondary';
    }
  }

  getConditionVariant(condition: string): StatusVariant {
    switch (condition) {
      case 'New': return 'success';
      case 'Good': return 'info';
      case 'Fair': return 'warning';
      case 'Poor': return 'danger';
      case 'Damaged': return 'danger';
      default: return 'secondary';
    }
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }
}
