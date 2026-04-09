import { Component, OnInit, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { BranchesService } from './branches.service';
import { Branch, BranchesResponse } from '../../shared/models/branch.model';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { NotificationService } from '../../core/notifications/notification.service';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { BranchTableComponent } from './branch-table/branch-table.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [
    UnifiedFilterComponent,
    BranchTableComponent,
    PageHeaderComponent
  ],
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

  readonly PERMISSIONS = {
    BRANCH_CREATE: `${PermissionResources.BRANCH}.${PermissionActions.CREATE}`,
    BRANCH_READ: `${PermissionResources.BRANCH}.${PermissionActions.READ}`,
    BRANCH_UPDATE: `${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`,
    BRANCH_DELETE: `${PermissionResources.BRANCH}.${PermissionActions.DELETE}`,
    BRANCH_MANAGE: `${PermissionResources.BRANCH}.${PermissionActions.MANAGE}`
  };

  loading = signal(false);
  branches = signal<Branch[]>([]);

  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);

  currentFilter: any = {};

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
    this.router.navigate(['/branches/create']);
  }

  onRefreshData(): void {
    this.currentFilter = {};
    this.currentPage.set(1);
    this.loadBranches();
  }

  onViewBranch(branch: Branch): void {
    this.router.navigate(['/branches', branch.id, 'view']);
  }

  onEditBranch(branch: Branch): void {
    this.router.navigate(['/branches', branch.id, 'edit']);
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
}
