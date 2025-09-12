import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../../core/i18n/i18n.service';
import { DepartmentsService } from './departments.service';
import { DepartmentDto } from '../../shared/models/department.model';
import { BranchDto } from '../../shared/models/employee.model';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { DepartmentTreeComponent } from './department-tree/department-tree.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ConfirmationService } from '../../core/confirmation/confirmation.service';
import { PermissionService } from '../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';

type ViewMode = 'table' | 'tree';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    DepartmentTableComponent, 
    DepartmentTreeComponent,
    DepartmentFormComponent,
    HasPermissionDirective
  ],
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  public i18n = inject(I18nService);
  private departmentsService = inject(DepartmentsService);
  private confirmationService = inject(ConfirmationService);
  public permissionService = inject(PermissionService);

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
  showForm = signal(false);
  isEditMode = signal(false);

  // Mock branches - replace with actual service call
  branches = signal<BranchDto[]>([
    { id: 1, name: 'Main Branch', code: 'MAIN', location: 'Headquarters', isActive: true },
    { id: 2, name: 'Branch 2', code: 'BR02', location: 'Downtown', isActive: true }
  ]);

  ngOnInit() {
    // Set default branch if available
    const branches = this.branches();
    if (branches.length > 0) {
      this.selectedBranch.set(branches[0]);
    }
  }

  onViewModeChange(mode: ViewMode) {
    this.viewMode.set(mode);
  }

  onBranchChange(branchId: number) {
    const branch = this.branches().find(b => b.id === branchId);
    this.selectedBranch.set(branch || null);
  }

  onDepartmentSelected(department: DepartmentDto) {
    this.selectedDepartment.set(department);
  }

  onDepartmentEdit(department: DepartmentDto) {
    this.selectedDepartment.set(department);
    this.isEditMode.set(true);
    this.showForm.set(true);
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
    this.selectedDepartment.set(null);
    this.isEditMode.set(false);
    this.showForm.set(true);
    
    // If parentId is provided, we could pre-fill parent department
    if (data?.parentId) {
      // Handle parent department selection
      console.log('Adding department with parent:', data.parentId);
    }
  }

  onFormClose() {
    this.showForm.set(false);
    this.selectedDepartment.set(null);
    this.isEditMode.set(false);
  }

  onFormSave(department: any) {
    if (this.isEditMode()) {
      this.updateDepartment(department);
    } else {
      this.createDepartment(department);
    }
  }

  private async createDepartment(department: any) {
    try {
      await this.departmentsService.createDepartment({
        ...department,
        branchId: this.selectedBranch()?.id
      }).toPromise();
      
      this.onFormClose();
      this.refreshData();
    } catch (error) {
      console.error('Failed to create department:', error);
    }
  }

  private async updateDepartment(department: any) {
    if (!this.selectedDepartment()?.id) return;
    
    try {
      await this.departmentsService.updateDepartment(
        this.selectedDepartment()!.id, 
        department
      ).toPromise();
      
      this.onFormClose();
      this.refreshData();
    } catch (error) {
      console.error('Failed to update department:', error);
    }
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