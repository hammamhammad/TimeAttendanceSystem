import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../core/i18n/i18n.service';
import { BranchesService } from './branches.service';
import { Branch, BranchesResponse, CreateBranchRequest, UpdateBranchRequest } from '../../shared/models/branch.model';
import { TIMEZONE_OPTIONS, TimezoneOption } from '../../shared/constants/timezone.constants';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

@Component({
  selector: 'app-branches',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective],
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  private branchesService = inject(BranchesService);
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    BRANCH_CREATE: `${PermissionResources.BRANCH}.${PermissionActions.CREATE}`,
    BRANCH_READ: `${PermissionResources.BRANCH}.${PermissionActions.READ}`,
    BRANCH_UPDATE: `${PermissionResources.BRANCH}.${PermissionActions.UPDATE}`,
    BRANCH_DELETE: `${PermissionResources.BRANCH}.${PermissionActions.DELETE}`,
    BRANCH_MANAGE: `${PermissionResources.BRANCH}.${PermissionActions.MANAGE}`
  };
  
  // Timezone options
  timezoneOptions = TIMEZONE_OPTIONS;

  // Signals for state management
  loading = signal(false);
  branches = signal<Branch[]>([]);
  
  // Pagination
  currentPage = signal(1);
  pageSize = signal(10);
  totalCount = signal(0);
  totalPages = signal(0);
  
  // Filters
  searchTerm = '';
  activeFilter: boolean | undefined = undefined;

  // Modal state
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedBranch = signal<Branch | null>(null);
  
  // Form state
  branchForm = {
    code: '',
    name: '',
    timeZone: '',
    isActive: true
  };
  
  submitting = signal(false);

  ngOnInit(): void {
    this.loadBranches();
  }

  t(key: string): string {
    return this.i18n.t(key);
  }

  loadBranches(): void {
    this.loading.set(true);
    
    const search = this.searchTerm.trim() || undefined;
    
    this.branchesService.getBranches(
      this.currentPage(), 
      this.pageSize(), 
      search, 
      this.activeFilter
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
      }
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadBranches();
  }

  onFilterChange(): void {
    this.currentPage.set(1);
    this.loadBranches();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadBranches();
  }

  onPageSizeChange(): void {
    this.currentPage.set(1);
    this.loadBranches();
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'text-success' : 'text-danger';
  }

  getStatusIcon(isActive: boolean): string {
    return isActive ? 'fa-check-circle' : 'fa-times-circle';
  }

  getStatusText(isActive: boolean): string {
    return isActive ? this.t('common.active') : this.t('common.inactive');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getPaginationArray(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    
    let start = Math.max(1, current - delta);
    let end = Math.min(total, current + delta);
    
    if (end - start < 4 && total > 4) {
      if (start === 1) {
        end = Math.min(total, start + 4);
      } else if (end === total) {
        start = Math.max(1, end - 4);
      }
    }
    
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  getEndCount(): number {
    return Math.min(this.currentPage() * this.pageSize(), this.totalCount());
  }

  // CRUD Operations
  onCreateBranch(): void {
    this.resetForm();
    this.showCreateModal.set(true);
  }

  onEditBranch(branch: Branch): void {
    this.selectedBranch.set(branch);
    this.branchForm = {
      code: branch.code,
      name: branch.name,
      timeZone: branch.timeZone,
      isActive: branch.isActive
    };
    this.showEditModal.set(true);
  }

  onDeleteBranch(branch: Branch): void {
    this.selectedBranch.set(branch);
    this.showDeleteModal.set(true);
  }

  onSubmitCreate(): void {
    if (!this.isFormValid()) return;

    this.submitting.set(true);
    const request: CreateBranchRequest = {
      code: this.branchForm.code.trim(),
      name: this.branchForm.name.trim(),
      timeZone: this.branchForm.timeZone.trim(),
      isActive: this.branchForm.isActive
    };

    this.branchesService.createBranch(request).subscribe({
      next: () => {
        this.showCreateModal.set(false);
        this.loadBranches();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to create branch:', error);
        this.submitting.set(false);
      }
    });
  }

  onSubmitEdit(): void {
    if (!this.isFormValid() || !this.selectedBranch()) return;

    this.submitting.set(true);
    const request: UpdateBranchRequest = {
      code: this.branchForm.code.trim(),
      name: this.branchForm.name.trim(),
      timeZone: this.branchForm.timeZone.trim(),
      isActive: this.branchForm.isActive
    };

    this.branchesService.updateBranch(this.selectedBranch()!.id, request).subscribe({
      next: () => {
        this.showEditModal.set(false);
        this.loadBranches();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to update branch:', error);
        this.submitting.set(false);
      }
    });
  }

  onConfirmDelete(): void {
    if (!this.selectedBranch()) return;

    this.submitting.set(true);
    this.branchesService.deleteBranch(this.selectedBranch()!.id).subscribe({
      next: () => {
        this.showDeleteModal.set(false);
        this.loadBranches();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Failed to delete branch:', error);
        this.submitting.set(false);
      }
    });
  }

  onCloseModal(): void {
    this.showCreateModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedBranch.set(null);
    this.submitting.set(false);
  }

  private resetForm(): void {
    this.branchForm = {
      code: '',
      name: '',
      timeZone: 'UTC',
      isActive: true
    };
  }

  isFormValid(): boolean {
    return this.branchForm.code.trim().length > 0 &&
           this.branchForm.name.trim().length > 0 &&
           this.branchForm.timeZone.trim().length > 0;
  }
}