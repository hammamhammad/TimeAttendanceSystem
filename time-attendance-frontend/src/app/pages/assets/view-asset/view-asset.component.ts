import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AssetService } from '../../../core/services/asset.service';
import {
  AssetDto, AssetAssignmentDto, AssetMaintenanceDto,
  AssetStatus, AssetAssignmentStatus, MaintenanceStatus
} from '../../../shared/models/asset.model';
import { FormHeaderComponent } from '../../../shared/components/form-header/form-header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent, StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { DefinitionListComponent, DefinitionItem } from '../../../shared/components/definition-list/definition-list.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { AuditHistoryComponent } from '../../../shared/components/audit-history/audit-history.component';
import { SectionCardComponent } from '../../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-view-asset',
  standalone: true,
  imports: [
    CommonModule,
    FormHeaderComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    DefinitionListComponent,
    DataTableComponent,
    AuditHistoryComponent,
    SectionCardComponent
  ],
  templateUrl: './view-asset.component.html',
  styleUrl: './view-asset.component.css'
})
export class ViewAssetComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  readonly permissionService = inject(PermissionService);

  loading = signal(false);
  asset = signal<AssetDto | null>(null);
  assignments = signal<AssetAssignmentDto[]>([]);
  maintenanceRecords = signal<AssetMaintenanceDto[]>([]);
  activeTab = signal('details');
  error = signal<string | null>(null);

  // Status badge
  statusBadge = computed(() => {
    const a = this.asset();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    return {
      label: this.i18n.t('assets.status_' + a.status),
      variant: this.getStatusVariant(a.status) as StatusVariant
    };
  });

  conditionBadge = computed(() => {
    const a = this.asset();
    if (!a) return { label: '', variant: 'secondary' as StatusVariant };
    return {
      label: this.i18n.t('assets.condition_' + a.condition),
      variant: this.getConditionVariant(a.condition) as StatusVariant
    };
  });

  // Definition list items
  basicInfoColumn1 = computed<DefinitionItem[]>(() => {
    const a = this.asset();
    if (!a) return [];
    return [
      { label: this.i18n.t('assets.asset_tag'), value: a.assetTag },
      { label: this.i18n.t('assets.name'), value: a.name },
      { label: this.i18n.t('assets.name_ar'), value: a.nameAr || '-' },
      { label: this.i18n.t('assets.category'), value: a.categoryName || '-' },
      { label: this.i18n.t('assets.branch'), value: a.branchName || '-' }
    ];
  });

  basicInfoColumn2 = computed<DefinitionItem[]>(() => {
    const a = this.asset();
    if (!a) return [];
    return [
      { label: this.i18n.t('assets.serial_number'), value: a.serialNumber || '-' },
      { label: this.i18n.t('assets.model'), value: a.model || '-' },
      { label: this.i18n.t('assets.manufacturer'), value: a.manufacturer || '-' },
      { label: this.i18n.t('assets.location'), value: a.location || '-' }
    ];
  });

  financialInfo = computed<DefinitionItem[]>(() => {
    const a = this.asset();
    if (!a) return [];
    return [
      { label: this.i18n.t('assets.purchase_date'), value: a.purchaseDate ? new Date(a.purchaseDate).toLocaleDateString() : '-' },
      { label: this.i18n.t('assets.purchase_price'), value: a.purchasePrice ? `${a.purchasePrice} ${a.currency || ''}` : '-' },
      { label: this.i18n.t('assets.warranty_expiry'), value: a.warrantyExpiryDate ? new Date(a.warrantyExpiryDate).toLocaleDateString() : '-' }
    ];
  });

  // Assignment table columns
  assignmentColumns: TableColumn[] = [
    { key: 'employeeName', label: this.i18n.t('assets.assignments.employee'), sortable: true, priority: 'high' },
    { key: 'assignedDate', label: this.i18n.t('assets.assignments.assigned_date'), sortable: true, priority: 'high' },
    { key: 'returnDate', label: this.i18n.t('assets.assignments.return_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high' }
  ];

  assignmentActions = computed<TableAction[]>(() => []);

  // Maintenance table columns
  maintenanceColumns: TableColumn[] = [
    { key: 'maintenanceType', label: this.i18n.t('assets.maintenance.type'), sortable: true, priority: 'high' },
    { key: 'description', label: this.i18n.t('common.description'), priority: 'medium' },
    { key: 'scheduledDate', label: this.i18n.t('assets.maintenance.scheduled_date'), sortable: true, priority: 'high' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high' },
    { key: 'cost', label: this.i18n.t('assets.maintenance.cost'), align: 'right', priority: 'medium' }
  ];

  maintenanceActions = computed<TableAction[]>(() => []);

  ngOnInit(): void {
    this.loadAsset();
  }

  private loadAsset(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) { this.router.navigate(['/assets']); return; }

    this.loading.set(true);
    this.assetService.getAsset(+id).subscribe({
      next: (asset) => {
        this.asset.set(asset);
        this.loading.set(false);
        this.loadAssignments(+id);
        this.loadMaintenance(+id);
      },
      error: () => {
        this.error.set(this.i18n.t('assets.load_failed'));
        this.loading.set(false);
      }
    });
  }

  private loadAssignments(assetId: number): void {
    this.assetService.getAssetAssignments(assetId).subscribe({
      next: (data) => this.assignments.set(data),
      error: () => {}
    });
  }

  private loadMaintenance(assetId: number): void {
    this.assetService.getAssetMaintenanceRecords(assetId).subscribe({
      next: (data) => this.maintenanceRecords.set(data),
      error: () => {}
    });
  }

  setTab(tab: string): void {
    this.activeTab.set(tab);
  }

  navigateToEdit(): void {
    const a = this.asset();
    if (a) this.router.navigate(['/assets', a.id, 'edit']);
  }

  async deleteAsset(): Promise<void> {
    const a = this.asset();
    if (!a) return;

    const result = await this.confirmation.confirm({
      title: this.i18n.t('assets.delete_title'),
      message: this.i18n.t('assets.delete_confirm').replace('{{name}}', a.name),
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger'
    } as ConfirmationConfig);

    if (result.confirmed) {
      this.assetService.deleteAsset(a.id).subscribe({
        next: () => {
          this.notification.success(this.i18n.t('assets.deleted'));
          this.router.navigate(['/assets']);
        },
        error: () => {
          this.notification.error(this.i18n.t('assets.delete_failed'));
        }
      });
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

  getAssignmentStatusVariant(status: string): StatusVariant {
    switch (status) {
      case AssetAssignmentStatus.Active: return 'success';
      case AssetAssignmentStatus.Returned: return 'secondary';
      case AssetAssignmentStatus.Lost: return 'danger';
      case AssetAssignmentStatus.Damaged: return 'warning';
      default: return 'secondary';
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

  getFormMode(): 'view' { return 'view'; }
  getAssetId(): number | undefined { return this.asset()?.id; }
}
