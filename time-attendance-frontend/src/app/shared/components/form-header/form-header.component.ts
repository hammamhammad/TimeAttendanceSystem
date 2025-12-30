import { Component, Input, Output, EventEmitter, inject } from '@angular/core';

import { RouterModule } from '@angular/router';
import { I18nService } from '../../../core/i18n/i18n.service';
import { PermissionService } from '../../../core/auth/permission.service';

export interface FormHeaderBreadcrumb {
  label: string;
  route?: string;
}

export interface FormHeaderAction {
  label: string;
  icon: string;
  action: () => void;
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'outline-primary' | 'outline-secondary' | 'outline-info';
  permission?: string;
  disabled?: boolean;
  route?: string;
  routeParams?: any;
}

export type FormHeaderMode = 'create' | 'edit' | 'view';

@Component({
  selector: 'app-form-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent {
  private i18n = inject(I18nService);
  private permissionService = inject(PermissionService);

  @Input() mode: FormHeaderMode = 'create';
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() breadcrumbs: FormHeaderBreadcrumb[] = [];
  @Input() actions: FormHeaderAction[] = [];
  @Input() loading = false;
  @Input() entityId?: string | number;
  @Input() moduleName!: string;
  @Input() moduleRoute!: string;

  @Output() actionClicked = new EventEmitter<string>();

  get t() {
    return this.i18n.t.bind(this.i18n);
  }

  get visibleActions(): FormHeaderAction[] {
    return this.actions.filter(action => {
      if (action.permission) {
        return this.permissionService.has(action.permission);
      }
      return true;
    });
  }

  get defaultActions(): FormHeaderAction[] {
    const actions: FormHeaderAction[] = [];

    // Add mode-specific default actions
    if (this.mode === 'edit' && this.entityId) {
      actions.push({
        label: this.t('common.view_details'),
        icon: 'fa-solid fa-eye',
        type: 'outline-info',
        route: `/${this.moduleRoute}/${this.entityId}/view`,
        action: () => {}
      });
    }

    if (this.mode === 'view' && this.entityId) {
      const editPermission = this.getEditPermission();
      if (!editPermission || this.permissionService.has(editPermission)) {
        actions.push({
          label: this.t('common.edit'),
          icon: 'fa-solid fa-edit',
          type: 'primary',
          route: `/${this.moduleRoute}/${this.entityId}/edit`,
          action: () => {}
        });
      }
    }

    // Always add back button
    actions.push({
      label: this.t('common.back'),
      icon: 'fa-solid fa-arrow-left',
      type: 'outline-secondary',
      route: `/${this.moduleRoute}`,
      action: () => {}
    });

    return actions;
  }

  get allActions(): FormHeaderAction[] {
    return [...this.visibleActions, ...this.defaultActions];
  }

  get defaultBreadcrumbs(): FormHeaderBreadcrumb[] {
    const breadcrumbs: FormHeaderBreadcrumb[] = [
      { label: this.t('dashboard.title'), route: '/dashboard' }
    ];

    if (this.moduleName && this.moduleRoute) {
      breadcrumbs.push({
        label: this.t(`${this.moduleName}.title`),
        route: `/${this.moduleRoute}`
      });
    }

    // Add current page breadcrumb
    let currentLabel = '';
    switch (this.mode) {
      case 'create':
        currentLabel = this.t(`${this.moduleName}.create`);
        break;
      case 'edit':
        currentLabel = this.t(`${this.moduleName}.edit`);
        break;
      case 'view':
        currentLabel = this.t(`${this.moduleName}.view_details`);
        break;
    }

    if (currentLabel) {
      breadcrumbs.push({ label: currentLabel });
    }

    return breadcrumbs;
  }

  get allBreadcrumbs(): FormHeaderBreadcrumb[] {
    return this.breadcrumbs.length > 0 ? this.breadcrumbs : this.defaultBreadcrumbs;
  }

  onActionClick(action: FormHeaderAction, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    if (action.disabled || this.loading) {
      return;
    }

    if (action.action) {
      action.action();
    }

    this.actionClicked.emit(action.label);
  }

  getButtonClass(action: FormHeaderAction): string {
    const baseClass = 'btn';
    const typeClass = action.type ? `btn-${action.type}` : 'btn-secondary';
    const disabledClass = (action.disabled || this.loading) ? 'disabled' : '';

    return `${baseClass} ${typeClass} ${disabledClass}`.trim();
  }

  private getEditPermission(): string | null {
    // Map common module names to their edit permissions
    const permissionMap: { [key: string]: string } = {
      'employees': 'employee.update',
      'users': 'user.update',
      'roles': 'role.update',
      'branches': 'branch.update',
      'departments': 'department.update',
      'shifts': 'shift.update',
      'vacation-types': 'vacationType.update',
      'public-holidays': 'publicHoliday.update',
      'overtime-configurations': 'settings.update',
      'employee-vacations': 'vacation.update',
      'employee-excuses': 'excuse.update'
    };

    return permissionMap[this.moduleRoute] || null;
  }
}