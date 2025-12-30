import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Employee Guard for Self-Service Portal
 * Simplified guard - all authenticated users have access
 */
export const employeeGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // In self-service portal, any authenticated user has access
  return true;
};