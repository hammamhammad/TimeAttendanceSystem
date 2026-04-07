import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AssetService } from '../../../core/services/asset.service';
import {
  AssetMaintenanceDto, MaintenanceQueryParams,
  MaintenanceType, MaintenanceStatus,
  CreateAssetMaintenanceRequest, UpdateAssetMaintenanceRequest
} from '../../../shared/models/asset.model';
import { StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';
import { SearchableSelectComponent, SearchableSelectOption } from '../../../shared/components/searchable-select/searchable-select.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-asset-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    UnifiedFilterComponent,
    DataTableComponent,
    StatusBadgeComponent,
    ModalWrapperComponent,
    SearchableSelectComponent
  ],
  templateUrl: './asset-maintenance.component.html',
  styleUrl: './asset-maintenance.component.css'
})
export class AssetMaintenanceComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly assetService = inject(AssetService);
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  readonly permissionService = inject(PermissionService);

  records = signal<AssetMaintenanceDto[]>([]);
  loading = signal(false);
  saving = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  currentFilters = signal<any>({});

  // Modal
  showModal = signal(false);
  editingRecord = signal<AssetMaintenanceDto | null>(null);

  // Form fields
  formAssetId = signal<number | null>(null);
  formMaintenanceType = signal<string>(MaintenanceType.Preventive);
  formStatus = signal<string>(MaintenanceStatus.Scheduled);
  formDescription = signal('');
  formScheduledDate = signal('');
  formCompletedDate = signal('');
  formCost = signal<number | null>(null);
  formCurrency = signal('SAR');
  formVendor = signal('');
  formNotes = signal('');

  // Dropdowns
  assetsDropdown = signal<{ id: number; name: string; assetTag: string }[]>([]);

  readonly typeOptions = [
    { value: MaintenanceType.Preventive, label: 'assets.maintenance.type_Preventive' },
    { value: MaintenanceType.Corrective, label: 'assets.maintenance.type_Corrective' },
    { value: MaintenanceType.Emergency, label: 'assets.maintenance.type_Emergency' },
    { value: MaintenanceType.Upgrade, label: 'assets.maintenance.type_Upgrade' },
    { value: MaintenanceType.Inspection, label: 'assets.maintenance.type_Inspection' }
  ];

  readonly statusOptions = [
    { value: MaintenanceStatus.Scheduled, label: 'assets.maintenance.status_Scheduled' },
    { value: MaintenanceStatus.InProgress, label: 'assets.maintenance.status_InProgress' },
    { value: MaintenanceStatus.Completed, label: 'assets.maintenance.status_Completed' },
    { value: MaintenanceStatus.Cancelled, label: 'assets.maintenance.status_Cancelled' }
  ];

  readonly currencyOptions = ['SAR', 'USD', 'EUR', 'GBP', 'AED'];

  get assetOptions(): SearchableSelectOption[] {
    return this.assetsDropdown().map(a => ({ value: a.id, label: `${a.assetTag} - ${a.name}` }));
  }

  totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return size === 0 ? 1 : Math.ceil(total / size);
  });

  tableColumns: TableColumn[] = [
    { key: 'assetName', label: this.i18n.t('assets.maintenance.asset'), sortable: true, priority: 'high' },
    { key: 'assetTag', label: this.i18n.t('assets.asset_tag'), sortable: true, priority: 'medium' },
    { key: 'maintenanceType', label: this.i18n.t('assets.maintenance.type'), sortable: true, priority: 'high' },
    { key: 'scheduledDate', label: this.i18n.t('assets.maintenance.scheduled_date'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high' },
    { key: 'cost', label: this.i18n.t('assets.maintenance.cost'), align: 'right', priority: 'medium' },
    { key: 'vendor', label: this.i18n.t('assets.maintenance.vendor'), priority: 'low' }
  ];

  tableActions = computed<TableAction[]>(() => {
    const actions: TableAction[] = [];
    if (this.permissionService.has('assetMaintenance.update')) {
      actions.push({ key: 'edit', label: this.i18n.t('common.edit'), icon: 'fa-edit', color: 'primary' });
    }
    if (this.permissionService.has('assetMaintenance.update')) {
      actions.push({ key: 'delete', label: this.i18n.t('common.delete'), icon: 'fa-trash', color: 'danger' });
    }
    return actions;
  });

  ngOnInit(): void {
    this.loadRecords();
    this.loadAssetsDropdown();
  }

  loadRecords(): void {
    this.loading.set(true);
    const params: MaintenanceQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilters()
    };
    this.assetService.getMaintenanceRecords(params).subscribe({
      next: (result) => {
        this.records.set(result.data);
        this.totalItems.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.maintenance.load_failed'));
        this.loading.set(false);
      }
    });
  }

  private loadAssetsDropdown(): void {
    this.http.get<{ id: number; name: string; assetTag: string }[]>(`${environment.apiUrl}/api/v1/assets/dropdown/available`).subscribe({
      next: (data) => this.assetsDropdown.set(data),
      error: () => {}
    });
  }

  onSearchChange(term: string): void {
    this.currentFilters.update(f => ({ ...f, searchTerm: term || undefined }));
    this.currentPage.set(1);
    this.loadRecords();
  }

  onRefresh(): void {
    this.currentFilters.set({});
    this.currentPage.set(1);
    this.loadRecords();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadRecords();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadRecords();
  }

  openCreate(): void {
    this.editingRecord.set(null);
    this.formAssetId.set(null);
    this.formMaintenanceType.set(MaintenanceType.Preventive);
    this.formStatus.set(MaintenanceStatus.Scheduled);
    this.formDescription.set('');
    this.formScheduledDate.set('');
    this.formCompletedDate.set('');
    this.formCost.set(null);
    this.formCurrency.set('SAR');
    this.formVendor.set('');
    this.formNotes.set('');
    this.showModal.set(true);
  }

  openEdit(record: AssetMaintenanceDto): void {
    this.editingRecord.set(record);
    this.formAssetId.set(record.assetId);
    this.formMaintenanceType.set(record.maintenanceType);
    this.formStatus.set(record.status);
    this.formDescription.set(record.description);
    this.formScheduledDate.set(record.scheduledDate ? record.scheduledDate.substring(0, 10) : '');
    this.formCompletedDate.set(record.completedDate ? record.completedDate.substring(0, 10) : '');
    this.formCost.set(record.cost || null);
    this.formCurrency.set(record.currency || 'SAR');
    this.formVendor.set(record.vendor || '');
    this.formNotes.set(record.notes || '');
    this.showModal.set(true);
  }

  saveRecord(): void {
    if (!this.formDescription() || !this.formScheduledDate()) return;

    this.saving.set(true);
    const editing = this.editingRecord();

    if (editing) {
      const request: UpdateAssetMaintenanceRequest = {
        maintenanceType: this.formMaintenanceType() as MaintenanceType,
        status: this.formStatus() as MaintenanceStatus,
        description: this.formDescription(),
        scheduledDate: this.formScheduledDate(),
        completedDate: this.formCompletedDate() || undefined,
        cost: this.formCost() || undefined,
        currency: this.formCurrency() || undefined,
        vendor: this.formVendor() || undefined,
        notes: this.formNotes() || undefined
      };
      this.assetService.updateMaintenance(editing.id, request).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.maintenance.updated'));
          this.showModal.set(false);
          this.saving.set(false);
          this.loadRecords();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.maintenance.update_failed'));
          this.saving.set(false);
        }
      });
    } else {
      if (!this.formAssetId()) return;
      const request: CreateAssetMaintenanceRequest = {
        assetId: this.formAssetId()!,
        maintenanceType: this.formMaintenanceType() as MaintenanceType,
        status: this.formStatus() as MaintenanceStatus,
        description: this.formDescription(),
        scheduledDate: this.formScheduledDate(),
        completedDate: this.formCompletedDate() || undefined,
        cost: this.formCost() || undefined,
        currency: this.formCurrency() || undefined,
        vendor: this.formVendor() || undefined,
        notes: this.formNotes() || undefined
      };
      this.assetService.createMaintenance(request).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.maintenance.created'));
          this.showModal.set(false);
          this.saving.set(false);
          this.loadRecords();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.maintenance.create_failed'));
          this.saving.set(false);
        }
      });
    }
  }

  async deleteRecord(record: AssetMaintenanceDto): Promise<void> {
    const result = await this.confirmation.confirm({
      title: this.i18n.t('assets.maintenance.delete_title'),
      message: this.i18n.t('assets.maintenance.delete_confirm'),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig);

    if (result.confirmed) {
      this.assetService.deleteMaintenance(record.id).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.maintenance.deleted'));
          this.loadRecords();
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.maintenance.delete_failed'));
        }
      });
    }
  }

  onActionClick(event: { action: string; item: AssetMaintenanceDto }): void {
    switch (event.action) {
      case 'edit':
        this.openEdit(event.item);
        break;
      case 'delete':
        this.deleteRecord(event.item);
        break;
    }
  }

  getMaintenanceStatusVariant(status: string): StatusVariant {
    switch (status) {
      case MaintenanceStatus.Scheduled: return 'info';
      case MaintenanceStatus.InProgress: return 'warning';
      case MaintenanceStatus.Completed: return 'success';
      case MaintenanceStatus.Cancelled: return 'secondary';
      default: return 'secondary';
    }
  }

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }

  get modalTitle(): string {
    return this.editingRecord()
      ? this.i18n.t('assets.maintenance.edit')
      : this.i18n.t('assets.maintenance.create');
  }

  get isFormValid(): boolean {
    if (!this.formDescription() || !this.formScheduledDate()) return false;
    if (!this.editingRecord() && !this.formAssetId()) return false;
    return true;
  }
}
