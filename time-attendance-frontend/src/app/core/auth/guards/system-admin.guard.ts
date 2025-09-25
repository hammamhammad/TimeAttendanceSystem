import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PermissionService } from '../permission.service';

/**
 * SystemAdmin Guard - Restricts access to routes requiring SystemAdmin role.
 * Provides the highest level of access control for system administration functions.
 *
 * @description
 * This guard implements the SystemAdmin authorization policy from the backend,
 * allowing access only to users with SystemAdmin role or specific system administration permissions.
 * It mirrors the backend's SystemAdministration policy for consistent security across the application.
 *
 * @usage
 * ```typescript
 * {
 *   path: 'system/settings',
 *   component: SystemSettingsComponent,
 *   canMatch: [systemAdminGuard]
 * }
 * ```
 *
 * @security
 * - Validates SystemAdmin role assignment
 * - Checks for system administration permissions as fallback
 * - Redirects unauthorized users to appropriate error page
 * - Logs security events for audit purposes
 *
 * @returns true if user has SystemAdmin access, false otherwise
 */
export const systemAdminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check SystemAdmin authorization using policy-based method
  if (permissionService.canSystemAdministration()) {
    return true;
  }

  // Redirect to unauthorized page
  router.navigate(['/unauthorized']);
  return false;
};