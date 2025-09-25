import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/auth/permission.service';
import { AuthService } from '../../core/auth/auth.service';

/**
 * Angular structural directive for conditional template rendering based on user roles.
 * Provides declarative role-based access control in templates with reactive role updates
 * and seamless integration with the hierarchical role system.
 *
 * @example
 * ```html
 * <!-- Show content only for SystemAdmin -->
 * <div *appHasRole="'SystemAdmin'">
 *   <app-system-settings></app-system-settings>
 * </div>
 *
 * <!-- Show navigation item for Admins and above -->
 * <nav-item *appHasRole="'Admin'">User Management</nav-item>
 *
 * <!-- Manager-only features -->
 * <button *appHasRole="'Manager'">Assign Shifts</button>
 * ```
 *
 * @remarks
 * Role-Based Access Control Features:
 * - Direct role checking without permission granularity
 * - Supports hierarchical role inheritance
 * - Reactive role updates with Angular Signals integration
 * - Automatic template re-evaluation on user authentication changes
 * - Clean separation between role-based and permission-based access
 *
 * Role Hierarchy (implicit inheritance):
 * - SystemAdmin: Full system access
 * - Admin: Organizational management access
 * - Manager: Departmental supervision access
 * - Employee: Basic employee access
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private role = '';
  private hasView = false;

  /**
   * Sets the required role for template visibility.
   * Updates the view immediately when role requirement changes.
   *
   * @param role - The role string to check (e.g., 'SystemAdmin', 'Admin', 'Manager', 'Employee')
   */
  @Input() set appHasRole(role: string) {
    this.role = role;
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
   * Updates the template visibility based on current user role.
   * Efficiently manages view creation and destruction.
   */
  private updateView(): void {
    if (!this.role) return;

    const hasRole = this.permissionService.hasRole(this.role);

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}