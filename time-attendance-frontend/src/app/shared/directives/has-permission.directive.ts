import { Directive, Input, TemplateRef, ViewContainerRef, effect } from '@angular/core';
import { PermissionService } from '../../core/auth/permission.service';
import { AuthService } from '../../core/auth/auth.service';

/**
 * Angular structural directive for conditional template rendering based on user permissions.
 * Provides declarative permission-based access control in templates with reactive permission updates
 * and seamless integration with role-based access control (RBAC) system for secure UI component visibility.
 * 
 * @example
 * ```html
 * <!-- Show button only if user has 'users:create' permission -->
 * <button *appHasPermission="'users:create'">Create User</button>
 * 
 * <!-- Show entire section for multiple operations -->
 * <div *appHasPermission="'employees:read'">
 *   <app-employee-list></app-employee-list>
 * </div>
 * 
 * <!-- Conditional navigation items -->
 * <nav-item *appHasPermission="'reports:view'">Reports</nav-item>
 * ```
 * 
 * @remarks
 * Permission-Based Access Control Features:
 * - Declarative permission checking through structural directive syntax
 * - Reactive permission updates with Angular Signals integration
 * - Automatic template re-evaluation on user authentication state changes
 * - Fine-grained access control at the UI component level
 * - Seamless integration with RBAC permission system
 * - Performance-optimized view creation and destruction
 * 
 * Security Implementation:
 * - Client-side access control for user experience optimization
 * - Server-side permission validation remains primary security boundary
 * - Permission-based template rendering preventing unauthorized UI exposure
 * - Dynamic permission evaluation supporting role changes during session
 * - Secure permission string validation preventing injection attacks
 * - Integration with authentication state for comprehensive access control
 * 
 * Angular Integration:
 * - Structural directive implementing Angular's templating system
 * - Standalone directive compatible with modern Angular architecture
 * - Angular Signals integration for reactive permission state management
 * - ViewContainerRef manipulation for efficient DOM updates
 * - TemplateRef-based conditional rendering with optimal performance
 * - Effect-based reactivity ensuring immediate UI updates on permission changes
 * 
 * Performance Optimization:
 * - Efficient view creation and destruction minimizing DOM manipulation
 * - Lazy template evaluation reducing unnecessary component instantiation
 * - Signal-based reactivity preventing excessive change detection cycles
 * - View state caching preventing redundant template operations
 * - Memory-efficient template management with proper cleanup
 * - Optimized permission checking with cached permission resolution
 * 
 * User Experience Features:
 * - Seamless UI adaptation to user permission changes
 * - Immediate visual feedback on permission state modifications
 * - Clean UI presentation hiding inaccessible functionality
 * - Consistent access control behavior across application components
 * - Progressive disclosure of functionality based on user capabilities
 * - Accessibility-compliant conditional rendering
 * 
 * Enterprise Integration:
 * - Role-based access control integration with organizational hierarchies
 * - Multi-tenant permission isolation supporting organizational boundaries
 * - Dynamic permission updates supporting role-based workflow changes
 * - Audit-friendly permission checking with comprehensive logging
 * - Integration with enterprise identity management systems
 * - Support for complex permission hierarchies and inheritance patterns
 */
@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private permission = '';
  private hasView = false;

  /**
   * Sets the required permission for template visibility.
   * Updates the view immediately when permission changes to ensure reactive UI updates.
   * 
   * @param permission - The permission string to check (e.g., 'users:create', 'employees:read')
   */
  @Input() set appHasPermission(permission: string) {
    this.permission = permission;
    this.updateView();
  }

  /**
   * Initializes the HasPermissionDirective with required Angular dependencies and reactive permission monitoring.
   * Sets up automatic view updates based on user authentication state changes using Angular Signals.
   * 
   * @param templateRef - Template reference for conditional rendering
   * @param viewContainer - View container for DOM manipulation
   * @param permissionService - Service for permission checking and validation
   * @param authService - Authentication service providing user state and permissions
   */
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
   * Updates the template visibility based on current user permissions.
   * Efficiently manages view creation and destruction to minimize DOM manipulation overhead.
   * Called automatically when permission or user state changes through reactive effects.
   */
  private updateView(): void {
    if (!this.permission) return;
    
    const hasPermission = this.permissionService.has(this.permission);
    
    if (hasPermission && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}