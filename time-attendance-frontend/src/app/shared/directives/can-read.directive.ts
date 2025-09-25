import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/auth/permission.service';
import { AuthService } from '../../core/auth/auth.service';

/**
 * Angular structural directive for conditional template rendering based on read access capabilities.
 * Provides declarative policy-based access control for viewing operations,
 * mirroring the backend's read authorization policies.
 *
 * @example
 * ```html
 * <!-- Show employee list if user can read employees -->
 * <div *appCanRead="'employees'">
 *   <app-employee-list></app-employee-list>
 * </div>
 *
 * <!-- Show reports menu item -->
 * <nav-item *appCanRead="'reports'">Reports</nav-item>
 *
 * <!-- Show attendance data -->
 * <section *appCanRead="'attendance'">
 *   <app-attendance-summary></app-attendance-summary>
 * </section>
 * ```
 *
 * @remarks
 * Policy-Based Read Access Features:
 * - Maps to backend read authorization policies
 * - Supports resource-specific read capabilities
 * - Reactive policy updates with Angular Signals integration
 * - Hierarchical role-based access (SystemAdmin > Admin > Manager > Employee)
 * - Permission-based fallback for granular control
 *
 * Supported Resources:
 * - 'employees': Employee data viewing
 * - 'users': User account viewing
 * - 'roles': Role and permission viewing
 * - 'branches': Branch information viewing
 * - 'departments': Department data viewing
 * - 'shifts': Shift information viewing
 * - 'attendance': Attendance record viewing
 * - 'settings': System settings viewing
 * - 'reports': Report access
 */
@Directive({
  selector: '[appCanRead]',
  standalone: true
})
export class CanReadDirective {
  private resource = '';
  private hasView = false;

  /**
   * Sets the resource type for read capability checking.
   * Updates the view immediately when resource requirement changes.
   *
   * @param resource - The resource to check read access for
   */
  @Input() set appCanRead(resource: string) {
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
   * Updates the template visibility based on read capabilities.
   * Uses policy-based methods from PermissionService that mirror backend policies.
   */
  private updateView(): void {
    if (!this.resource) return;

    let canRead = false;

    // Map resource to appropriate policy-based method
    switch (this.resource.toLowerCase()) {
      case 'employees':
        canRead = this.permissionService.canReadEmployees();
        break;
      case 'users':
        canRead = this.permissionService.canReadUsers();
        break;
      case 'roles':
        canRead = this.permissionService.canReadRoles();
        break;
      case 'branches':
        canRead = this.permissionService.canReadBranches();
        break;
      case 'departments':
        canRead = this.permissionService.canReadDepartments();
        break;
      case 'shifts':
        canRead = this.permissionService.canReadShifts();
        break;
      case 'attendance':
        canRead = this.permissionService.canReadAttendance();
        break;
      case 'settings':
        canRead = this.permissionService.canReadSettings();
        break;
      case 'reports':
        canRead = this.permissionService.canAccessReports();
        break;
      default:
        // Fallback to generic permission checking
        canRead = this.permissionService.canRead(this.resource);
        break;
    }

    if (canRead && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!canRead && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}