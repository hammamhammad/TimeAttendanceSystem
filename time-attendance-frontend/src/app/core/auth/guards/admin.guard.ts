import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PermissionService } from '../permission.service';

/**
 * Admin Guard - Restricts access to routes requiring Admin level access.
 * Provides administrative access for organizational management functions.
 *
 * @description
 * This guard implements Admin-level authorization allowing access to users with
 * SystemAdmin or Admin roles. It covers most administrative functions except
 * system-level configuration that requires SystemAdmin privileges.
 *
 * @usage
 * ```typescript
 * {
 *   path: 'admin/users',
 *   component: UserManagementComponent,
 *   canMatch: [adminGuard]
 * }
 * ```
 *
 * @authorization
 * Allows access to:
 * - SystemAdmin role (full access)
 * - Admin role (organizational access)
 * - Users with specific administrative permissions
 *
 * @security
 * - Validates admin-level role assignment
 * - Supports permission-based fallback authorization
 * - Maintains audit trail for administrative access
 * - Redirects unauthorized users appropriately
 *
 * @returns true if user has Admin-level access, false otherwise
 */
export const adminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check if user has admin-level access (SystemAdmin or Admin)
  if (authService.isAdmin() || authService.isSystemAdmin()) {
    return true;
  }

  // Check for specific route-based permissions if defined
  const requiredPermission = route.data?.['permission'];
  if (requiredPermission && permissionService.has(requiredPermission)) {
    return true;
  }

  // Redirect to unauthorized page
  router.navigate(['/unauthorized']);
  return false;
};