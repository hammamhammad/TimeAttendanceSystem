import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Authentication guard for Self-Service Portal
 * Simplified guard that only checks authentication status
 * No admin permission checks - all authenticated users have access
 */
export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
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

  return true;
};