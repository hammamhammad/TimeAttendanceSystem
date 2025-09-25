import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/auth/permission.service';
import { AuthService } from '../../core/auth/auth.service';

/**
 * Angular structural directive for conditional template rendering based on management capabilities.
 * Provides declarative policy-based access control for management operations,
 * mirroring the backend's management authorization policies.
 *
 * @example
 * ```html
 * <!-- Show employee management features -->
 * <div *appCanManage="'employees'">
 *   <button>Create Employee</button>
 *   <button>Edit Employee</button>
 * </div>
 *
 * <!-- Show user management section -->
 * <nav-item *appCanManage="'users'">User Management</nav-item>
 *
 * <!-- Show shift management tools -->
 * <section *appCanManage="'shifts'">
 *   <app-shift-assignment></app-shift-assignment>
 * </section>
 * ```
 *
 * @remarks
 * Policy-Based Management Features:
 * - Maps to backend management authorization policies
 * - Supports resource-specific management capabilities
 * - Reactive policy updates with Angular Signals integration
 * - Hierarchical role-based access with permission fallback
 * - Clean separation of read vs management access
 *
 * Supported Resources:
 * - 'employees': Employee management (create, update, delete, assign)
 * - 'users': User account management
 * - 'roles': Role and permission management
 * - 'branches': Branch management
 * - 'departments': Department management
 * - 'shifts': Shift management
 * - 'attendance': Attendance record management
 * - 'settings': System settings management
 */
@Directive({
  selector: '[appCanManage]',
  standalone: true
})
export class CanManageDirective {
  private resource = '';
  private hasView = false;

  /**
   * Sets the resource type for management capability checking.
   * Updates the view immediately when resource requirement changes.
   *
   * @param resource - The resource to check management access for
   */
  @Input() set appCanManage(resource: string) {
    this.resource = resource;
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionService: PermissionService,
    private authService: AuthService
  ) {
    // Use signals effect to watch for user changes
    effect(() => {
      // Access the current user signal to trigger effect
      this.authService.currentUser();
      this.updateView();
    });
  }

  /**
   * Updates the template visibility based on management capabilities.
   * Uses policy-based methods from PermissionService that mirror backend policies.
   */
  private updateView(): void {
    if (!this.resource) return;

    let canManage = false;

    // Map resource to appropriate policy-based method
    switch (this.resource.toLowerCase()) {
      case 'employees':
        canManage = this.permissionService.canManageEmployeesPolicy();
        break;
      case 'users':
        canManage = this.permissionService.canManageUsersPolicy();
        break;
      case 'roles':
        canManage = this.permissionService.canManageRolesPolicy();
        break;
      case 'branches':
        canManage = this.permissionService.canManageBranches();
        break;
      case 'departments':
        canManage = this.permissionService.canManageDepartments();
        break;
      case 'shifts':
        canManage = this.permissionService.canManageShiftsPolicy();
        break;
      case 'attendance':
        canManage = this.permissionService.canManageAttendance();
        break;
      case 'settings':
        canManage = this.permissionService.canManageSettings();
        break;
      default:
        // Fallback to generic permission checking
        canManage = this.permissionService.canManage(this.resource);
        break;
    }

    if (canManage && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!canManage && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}