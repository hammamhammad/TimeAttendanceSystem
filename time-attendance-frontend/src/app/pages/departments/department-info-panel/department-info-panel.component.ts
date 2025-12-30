import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { I18nService } from '../../../core/i18n/i18n.service';
import { DepartmentDto } from '../../../shared/models/department.model';
import { PermissionService } from '../../../core/auth/permission.service';
import { PermissionResources, PermissionActions } from '../../../shared/utils/permission.utils';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-department-info-panel',
  standalone: true,
  imports: [
    HasPermissionDirective,
    StatusBadgeComponent
],
  templateUrl: './department-info-panel.component.html',
  styleUrls: ['./department-info-panel.component.css']
})
export class DepartmentInfoPanelComponent {
  public i18n = inject(I18nService);
  public permissionService = inject(PermissionService);

  @Input() selectedDepartment: DepartmentDto | null = null;

  @Output() departmentView = new EventEmitter<DepartmentDto>();
  @Output() departmentEdit = new EventEmitter<DepartmentDto>();
  @Output() departmentDelete = new EventEmitter<DepartmentDto>();
  @Output() closePanel = new EventEmitter<void>();

  // Permission constants for use in template
  readonly PERMISSIONS = {
    DEPARTMENT_READ: `${PermissionResources.DEPARTMENT}.${PermissionActions.READ}`,
    DEPARTMENT_UPDATE: `${PermissionResources.DEPARTMENT}.${PermissionActions.UPDATE}`,
    DEPARTMENT_DELETE: `${PermissionResources.DEPARTMENT}.${PermissionActions.DELETE}`
  };

  onDepartmentView() {
    if (this.selectedDepartment) {
      this.departmentView.emit(this.selectedDepartment);
    }
  }

  onDepartmentEdit() {
    if (this.selectedDepartment) {
      this.departmentEdit.emit(this.selectedDepartment);
    }
  }

  onDepartmentDelete() {
    if (this.selectedDepartment) {
      this.departmentDelete.emit(this.selectedDepartment);
    }
  }

  onClosePanel() {
    this.closePanel.emit();
  }
}