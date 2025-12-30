import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

/**
 * Manager Guard for Self-Service Portal
 * Restricts access to manager-only routes
 */
export const managerGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Check if user is a manager
  if (!authService.isManager()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
