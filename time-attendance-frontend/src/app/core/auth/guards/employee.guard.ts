import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PermissionService } from '../permission.service';

/**
 * Employee Guard - Restricts access to routes requiring basic employee access.
 * Provides the most restrictive access level for standard employee functions.
 *
 * @description
 * This guard implements Employee-level authorization allowing access to users with
 * any valid role (SystemAdmin, Admin, Manager, Employee). It provides the base
 * level of access for general employee functions like viewing personal information
 * and basic attendance features.
 *
 * @usage
 * ```typescript
 * {
 *   path: 'employee/profile',
 *   component: EmployeeProfileComponent,
 *   canMatch: [employeeGuard]
 * }
 * ```
 *
 * @authorization
 * Allows access to:
 * - SystemAdmin role (full access)
 * - Admin role (organizational access)
 * - Manager role (departmental access)
 * - Employee role (personal access)
 * - Users with specific employee-level permissions
 *
 * @security
 * - Validates any authenticated user with valid role
 * - Supports permission-based access for specific features
 * - Maintains minimum security baseline
 * - Provides fallback authorization for general features
 *
 * @returns true if user has valid employee access, false otherwise
 */
export const employeeGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Allow access for any authenticated user with a valid role
  const user = authService.currentUser();
  if (user?.roles && user.roles.length > 0) {
    return true;
  }

  // Check for basic employee permissions if no role is assigned
  const basicPermissions = [
    'employee.read',
    'attendance.read',
    'profile.read'
  ];

  if (permissionService.hasAny(basicPermissions)) {
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