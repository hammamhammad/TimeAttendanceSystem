import { Component, OnInit, signal, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { BranchesService } from './branches.service';
import { Branch, BranchesResponse, CreateBranchRequest, UpdateBranchRequest } from '../../shared/models/branch.model';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { BranchFiltersComponent } from './branch-filters/branch-filters.component';
import { BranchTableComponent } from './branch-table/branch-table.component';
import { BranchFormModalComponent } from './branch-form-modal/branch-form-modal.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, BranchFiltersComponent, BranchTableComponent, BranchFormModalComponent],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  private branchesService = inject(BranchesService);
  private notificationService = inject(NotificationService);
  private confirmationService = inject(ConfirmationService);
  private router = inject(Router);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  @ViewChild(BranchFormModalComponent) branchFormModal!: BranchFormModalComponent;

  // Permission constants for use in template
  readonly PERMISSIONS = {
    BRANCH_CREATE: `${PermissionResources.BRANCH}.${PermissionActions.CREATE}`,
    BRANCH_READ: `${PermissionResources.BRANCH}.${PermissionActions.READ}`,
    BRANCH_UPDATE: `${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`,
    BRANCH_DELETE: `${PermissionResources.BRANCH}.${PermissionActions.DELETE}`,
    BRANCH_MANAGE: `${PermissionResources.BRANCH}.${PermissionActions.MANAGE}`
  };

  // Signals for state management
  loading = signal(false);
  branches = signal<Branch[]>([]);

  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);

  // Filter state
  currentFilter: any = {};

  // Modal state
  showBranchForm = signal(false);
  selectedBranch = signal<Branch | null>(null);

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.loading.set(true);

    this.branchesService.getBranches(
      this.currentPage(),
      this.pageSize(),
      this.currentFilter.search,
      this.currentFilter.isActive
    ).subscribe({
      next: (response: BranchesResponse) => {
        this.branches.set(response.items);
        this.totalCount.set(response.totalCount);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load branches:', error);
        this.loading.set(false);
        this.notificationService.error(
          this.i18n.t('app.error'),
          this.i18n.t('errors.server')
        );
      }
    });
  }

  // Filter event handlers
  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, search: searchTerm };
    this.currentPage.set(1);
    this.loadBranches();
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    this.currentPage.set(1);
    this.loadBranches();
  }

  onAddBranch(): void {
    this.selectedBranch.set(null);
    this.showBranchForm.set(true);
  }

  // Table event handlers
  onViewBranch(branch: Branch): void {
    this.router.navigate(['/branches', branch.id, 'view']);
  }

  onEditBranch(branch: Branch): void {
    this.selectedBranch.set(branch);
    this.showBranchForm.set(true);
  }

  async onDeleteBranch(branch: Branch): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: this.i18n.t('branches.delete_branch'),
      message: `Are you sure you want to delete "${branch.name}"? This action cannot be undone.`,
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });

    if (result.confirmed) {
      this.branchesService.deleteBranch(branch.id).subscribe({
        next: () => {
          this.loadBranches();
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('branches.branch_deleted')
          );
        },
        error: (error) => {
          console.error('Failed to delete branch:', error);
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('errors.server')
          );
        }
      });
    }
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadBranches();
  }

  onPageSizeChange(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
    this.loadBranches();
  }

  onSelectionChange(selectedBranches: Branch[]): void {
    // Handle bulk selection for future bulk operations
    console.log('Selected branches:', selectedBranches);
  }

  onSortChange(sortEvent: {column: string, direction: 'asc' | 'desc'}): void {
    this.currentFilter = {
      ...this.currentFilter,
      sortBy: sortEvent.column,
      sortDirection: sortEvent.direction
    };
    this.currentPage.set(1);
    this.loadBranches();
  }

  // Modal event handlers
  onBranchSave(branchData: CreateBranchRequest | UpdateBranchRequest): void {
    const isEdit = !!this.selectedBranch();

    if (isEdit) {
      this.branchesService.updateBranch(this.selectedBranch()!.id, branchData as UpdateBranchRequest).subscribe({
        next: () => {
          this.showBranchForm.set(false);
          this.selectedBranch.set(null);
          this.loadBranches();
          this.branchFormModal?.resetSubmitting();
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('branches.branch_updated')
          );
        },
        error: (error: any) => {
          console.error('Failed to update branch:', error);
          this.branchFormModal?.resetSubmitting();
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('errors.server')
          );
        }
      });
    } else {
      this.branchesService.createBranch(branchData as CreateBranchRequest).subscribe({
        next: () => {
          this.showBranchForm.set(false);
          this.selectedBranch.set(null);
          this.loadBranches();
          this.branchFormModal?.resetSubmitting();
          this.notificationService.success(
            this.i18n.t('app.success'),
            this.i18n.t('branches.branch_created')
          );
        },
        error: (error: any) => {
          console.error('Failed to create branch:', error);
          this.branchFormModal?.resetSubmitting();
          this.notificationService.error(
            this.i18n.t('app.error'),
            this.i18n.t('errors.server')
          );
        }
      });
    }
  }

  onCloseBranchForm(): void {
    this.showBranchForm.set(false);
    this.selectedBranch.set(null);
  }
}