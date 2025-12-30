import { Component, signal, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { I18nService } from '../../core/i18n/i18n.service';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from '../../shared/models/department.model';
import { BranchDto } from '../../shared/models/employee.model';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { UnifiedFilterComponent } from '../../shared/components/unified-filter/unified-filter.component';
import { DepartmentInfoPanelComponent } from './department-info-panel/department-info-panel.component';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { SearchableSelectOption } from '../../shared/components/searchable-select/searchable-select.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

type ViewMode = 'table' | 'tree';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    FormsModule,
    DepartmentTableComponent,
    DepartmentTreeComponent,
    UnifiedFilterComponent,
    DepartmentInfoPanelComponent,
    PageHeaderComponent
],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  public i18n = inject(I18nService);
  private departmentsService = inject(DepartmentsService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);
  private router = inject(Router);

  // Permission constants for use in template
  readonly PERMISSIONS = {
    DEPARTMENT_CREATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.CREATE}`,
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`,
    DEPARTMENT_MANAGE: `${PermissionResources.DEPARTMENT}.${PermissionActions.MANAGE}`
  };


  // Signals
  viewMode = signal<ViewMode>('table');
  selectedBranch = signal<BranchDto | null>(null);
  selectedDepartment = signal<DepartmentDto | null>(null);
  branchesLoading = signal(false);
  branches = signal<BranchDto[]>([]);
  currentFilter: any = {};


  ngOnInit() {
    // Component initialization if needed
  }


  onViewModeChange(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  onBranchChange(branchId: number) {
    if (!branchId || branchId === 0) {
      this.selectedBranch.set(null);
      return;
    }

    const branch = this.branches().find(b => b.id === branchId);
    this.selectedBranch.set(branch || null);
  }

  onBranchSelectionChange(branchIdStr: string) {
    const branchId = branchIdStr ? parseInt(branchIdStr) : 0;
    this.onBranchChange(branchId);
  }

  onCloseInfoPanel() {
    this.selectedDepartment.set(null);
  }

  onDepartmentSelected(department: DepartmentDto) {
    this.selectedDepartment.set(department);
  }

  onDepartmentView(department: DepartmentDto) {
    this.router.navigate(['/departments', department.id, 'view']);
  }

  onDepartmentEdit(department: DepartmentDto) {
    this.router.navigate(['/departments', department.id, 'edit']);
  }

  async onDepartmentDelete(department: DepartmentDto): Promise<void> {
    const result = await this.confirmationService.confirm({
      title: 'Delete Department',
      message: `Are you sure you want to delete "${department.name}"? This action cannot be undone.`,
      confirmText: this.i18n.t('common.delete'),
      cancelText: this.i18n.t('common.cancel'),
      confirmButtonClass: 'btn-danger',
      icon: 'fa-trash',
      iconClass: 'text-danger'
    });
    
    if (result.confirmed) {
      this.deleteDepartment(department.id);
    }
  }

  onDepartmentAdd(data?: { parentId?: number }) {
    if (data?.parentId) {
      this.router.navigate(['/departments/create'], { queryParams: { parentId: data.parentId } });
    } else {
      this.router.navigate(['/departments/create']);
    }
  }

  // Unified filter event handlers
  onSearchChange(searchTerm: string): void {
    this.currentFilter = { ...this.currentFilter, search: searchTerm };
    // Handle search functionality if needed
  }

  onFiltersChange(filters: any): void {
    this.currentFilter = { ...filters };
    // Handle branch filter changes
    if (filters.branchId) {
      this.onBranchChange(parseInt(filters.branchId));
    } else {
      this.selectedBranch.set(null);
    }
  }

  onRefreshData(): void {
    // Reset filters
    this.currentFilter = {};
    this.selectedBranch.set(null);
    this.refreshData();
  }


  private async deleteDepartment(id: number) {
    try {
      await this.departmentsService.deleteDepartment(id).toPromise();
      this.refreshData();
    } catch (error) {
      console.error('Failed to delete department:', error);
    }
  }

  private refreshData() {
    // Trigger refresh in child components
    // This could be improved with a shared state management solution
    window.location.reload();
  }
}