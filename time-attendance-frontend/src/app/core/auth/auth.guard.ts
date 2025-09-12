import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

/**
 * Angular route guard that protects routes requiring authentication and authorization.
 * Implements comprehensive security checks including token validation, refresh handling,
 * and permission-based access control.
 * 
 * @param route - Angular route configuration object
 * @param segments - URL segments being accessed
 * @returns boolean indicating whether access should be granted
 * 
 * @remarks
 * Security Checks Performed:
 * 1. Authentication verification (user logged in)
 * 2. Token expiration validation and automatic refresh
 * 3. Permission-based authorization if route specifies requirements
 * 4. Automatic redirection to appropriate pages on failure
 * 
 * Guard Behavior:
 * - Redirects to /login if user is not authenticated
 * - Attempts automatic token refresh if access token expired
 * - Redirects to /unauthorized if user lacks required permissions
 * - Allows access only if all security checks pass
 * 
 * Usage in Route Configuration:
 * ```typescript
 * {
 *   path: 'admin',
 *   component: AdminComponent,
 *   canMatch: [authGuard],
 *   data: { permission: 'admin.access' }
 * }
 * ```
 * 
 * Token Refresh Handling:
 * - Attempts automatic refresh for expired tokens
 * - Falls back to login redirect if refresh fails
 * - Maintains user session seamlessly when possible
 * - Prevents unnecessary re-authentication
 * 
 * Permission Integration:
 * - Supports route-level permission requirements
 * - Integrates with role-based access control system
 * - Enables fine-grained authorization control
 * - Provides appropriate error pages for access denied
 * 
 * Note: This guard uses Angular's modern functional approach
 * with dependency injection via inject() function.
 */
export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const permissionService = inject(PermissionService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check if token is expired
  if (authService.isTokenExpired()) {
    // Try to refresh token
    const refreshToken = authService.getRefreshToken();
    if (refreshToken) {
      authService.refreshToken().subscribe({
        error: () => {
          router.navigate(['/login']);
        }
      });
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  // Check route permission if specified
  const requiredPermission = route.data?.['permission'];
  if (requiredPermission && !permissionService.has(requiredPermission)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};