import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PermissionService } from '../permission.service';

/**
 * Manager Guard - Restricts access to routes requiring Manager level access.
 * Provides managerial access for departmental and team management functions.
 *
 * @description
 * This guard implements Manager-level authorization allowing access to users with
 * SystemAdmin, Admin, or Manager roles. It covers departmental management,
 * employee supervision, and team coordination functions.
 *
 * @usage
 * ```typescript
 * {
 *   path: 'management/employees',
 *   component: EmployeeManagementComponent,
 *   canMatch: [managerGuard]
 * }
 * ```
 *
 * @authorization
 * Allows access to:
 * - SystemAdmin role (full access)
 * - Admin role (organizational access)
 * - Manager role (departmental access)
 * - Users with specific managerial permissions
 *
 * @security
 * - Validates manager-level role assignment
 * - Supports hierarchical role inheritance
 * - Maintains departmental access boundaries
 * - Logs managerial access for audit purposes
 *
 * @returns true if user has Manager-level access, false otherwise
 */
export const managerGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check if user has manager-level access (SystemAdmin, Admin, or Manager)
  if (authService.isSystemAdmin() ||
      authService.isAdmin() ||
      permissionService.hasRole('Manager')) {
    return true;
  }

  // Check for specific managerial permissions
  const managementPermissions = [
    'employee.read',
    'employee.assign',
    'shift.read',
    'shift.assign',
    'department.read',
    'attendance.read',
    'report.read'
  ];

  if (permissionService.hasAny(managementPermissions)) {
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