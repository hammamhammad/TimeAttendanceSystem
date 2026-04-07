import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { NotificationService } from '../../../core/notifications/notification.service';
import { ConfirmationService, ConfirmationConfig } from '../../../core/confirmation/confirmation.service';
import { PermissionService } from '../../../core/auth/permission.service';
import { AssetService } from '../../../core/services/asset.service';
import { AssetAssignmentDto, AssignmentQueryParams, AssetAssignmentStatus, AssetCondition, ReturnAssetRequest } from '../../../shared/models/asset.model';
import { StatusVariant } from '../../../shared/components/status-badge/status-badge.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';
import { UnifiedFilterComponent } from '../../../shared/components/unified-filter/unified-filter.component';
import { DataTableComponent, TableColumn, TableAction } from '../../../shared/components/data-table/data-table.component';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ModalWrapperComponent } from '../../../shared/components/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-asset-assignments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    UnifiedFilterComponent,
    DataTableComponent,
    StatusBadgeComponent,
    ModalWrapperComponent
  ],
  templateUrl: './asset-assignments.component.html',
  styleUrl: './asset-assignments.component.css'
})
export class AssetAssignmentsComponent implements OnInit {
  readonly i18n = inject(I18nService);
  private readonly assetService = inject(AssetService);
  private readonly notification = inject(NotificationService);
  private readonly confirmation = inject(ConfirmationService);
  private readonly router = inject(Router);
  readonly permissionService = inject(PermissionService);

  assignments = signal<AssetAssignmentDto[]>([]);
  loading = signal(false);
  currentPage = signal(1);
  pageSize = signal(10);
  totalItems = signal(0);
  currentFilters = signal<any>({});

  // Return modal
  showReturnModal = signal(false);
  returningAssignment = signal<AssetAssignmentDto | null>(null);
  returnDate = signal(new Date().toISOString().substring(0, 10));
  returnCondition = signal<string>(AssetCondition.Good);
  returnNotes = signal('');
  returning = signal(false);

  readonly conditionOptions = [
    { value: AssetCondition.New, label: 'assets.condition_New' },
    { value: AssetCondition.Good, label: 'assets.condition_Good' },
    { value: AssetCondition.Fair, label: 'assets.condition_Fair' },
    { value: AssetCondition.Poor, label: 'assets.condition_Poor' },
    { value: AssetCondition.Damaged, label: 'assets.condition_Damaged' }
  ];

  totalPages = computed(() => {
    const total = this.totalItems();
    const size = this.pageSize();
    return size === 0 ? 1 : Math.ceil(total / size);
  });

  tableColumns: TableColumn[] = [
    { key: 'assetName', label: this.i18n.t('assets.assignments.asset'), sortable: true, priority: 'high' },
    { key: 'assetTag', label: this.i18n.t('assets.asset_tag'), sortable: true, priority: 'medium' },
    { key: 'employeeName', label: this.i18n.t('assets.assignments.employee'), sortable: true, priority: 'high' },
    { key: 'assignedDate', label: this.i18n.t('assets.assignments.assigned_date'), sortable: true, priority: 'high' },
    { key: 'expectedReturnDate', label: this.i18n.t('assets.assignments.expected_return'), sortable: true, priority: 'medium' },
    { key: 'returnDate', label: this.i18n.t('assets.assignments.return_date'), sortable: true, priority: 'medium' },
    { key: 'status', label: this.i18n.t('common.status'), sortable: true, align: 'center', priority: 'high' }
  ];

  tableActions = computed<TableAction[]>(() => {
    const actions: TableAction[] = [];
    if (this.permissionService.has('assetAssignment.create')) {
      actions.push({
        key: 'return', label: this.i18n.t('assets.assignments.return'), icon: 'fa-undo', color: 'warning',
        condition: (item: AssetAssignmentDto) => item.status === AssetAssignmentStatus.Active
      });
    }
    return actions;
  });

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.loading.set(true);
    const params: AssignmentQueryParams = {
      page: this.currentPage(),
      pageSize: this.pageSize(),
      ...this.currentFilters()
    };
    this.assetService.getAssignments(params).subscribe({
      next: (result) => {
        this.assignments.set(result.data);
        this.totalItems.set(result.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.assignments.load_failed'));
        this.loading.set(false);
      }
    });
  }

  onSearchChange(term: string): void {
    this.currentFilters.update(f => ({ ...f, searchTerm: term || undefined }));
    this.currentPage.set(1);
    this.loadAssignments();
  }

  onRefresh(): void {
    this.currentFilters.set({});
    this.currentPage.set(1);
    this.loadAssignments();
  }

  navigateToCreate(): void {
    this.router.navigate(['/assets/assignments/create']);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadAssignments();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadAssignments();
  }

  openReturnModal(assignment: AssetAssignmentDto): void {
    this.returningAssignment.set(assignment);
    this.returnDate.set(new Date().toISOString().substring(0, 10));
    this.returnCondition.set(AssetCondition.Good);
    this.returnNotes.set('');
    this.showReturnModal.set(true);
  }

  submitReturn(): void {
    const assignment = this.returningAssignment();
    if (!assignment) return;

    this.returning.set(true);
    const request: ReturnAssetRequest = {
      returnDate: this.returnDate(),
      condition: this.returnCondition() as AssetCondition,
      notes: this.returnNotes() || undefined
    };

    this.assetService.returnAsset(assignment.id, request).subscribe({
      next: () => {
        this.notification.success(this.i18n.t('assets.assignments.returned'));
        this.showReturnModal.set(false);
        this.returning.set(false);
        this.loadAssignments();
      },
      error: () => {
        this.notification.error(this.i18n.t('assets.assignments.return_failed'));
        this.returning.set(false);
      }
    });
  }

  onActionClick(event: { action: string; item: AssetAssignmentDto }): void {
    if (event.action === 'return') {
      this.openReturnModal(event.item);
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

  formatDate(date: string): string {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  }
}
