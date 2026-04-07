import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { EntitlementService } from '../../services/entitlement.service';

/**
 * Module Guard - Restricts access to routes based on tenant module entitlements.
 *
 * @usage
 * ```typescript
 * {
 *   path: 'vacation-requests',
 *   component: VacationRequestsComponent,
 *   canMatch: [moduleGuard],
 *   data: { module: 'LeaveManagement' }
 * }
 * ```
 *
 * @returns true if no module is specified or if the module is enabled, false otherwise
 */
export const moduleGuard: CanMatchFn = (route, segments) => {
  const entitlementService = inject(EntitlementService);
  const router = inject(Router);

  const module = route.data?.['module'] as string | undefined;

  // If no module specified, allow access
  if (!module) {
    return true;
  }

  // If module is not enabled, redirect to module-disabled page
  if (!entitlementService.isModuleEnabled(module)) {
    router.navigate(['/module-disabled'], { queryParams: { module } });
    return false;
  }

  return true;
};
