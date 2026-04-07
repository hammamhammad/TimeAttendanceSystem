import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { EntitlementService } from '../../services/entitlement.service';

/**
 * Module Guard - Restricts access to routes based on tenant module entitlements.
 *
 * @description
 * This guard checks whether the required module (specified in route data)
 * is enabled for the current tenant.
 *
 * Behavior:
 * - If module is enabled: allows access (full read/write)
 * - If module is disabled: allows access (read-only — backend blocks writes via [RequiresModule])
 *   Pages should use <app-module-status-banner> to show a read-only warning.
 * - If route has data.moduleStrict = true: blocks access and redirects to /module-disabled
 *
 * @usage
 * ```typescript
 * // Read-only when disabled (default)
 * { path: 'payroll', data: { module: 'Payroll' }, canMatch: [moduleGuard] }
 *
 * // Fully blocked when disabled
 * { path: 'payroll/create', data: { module: 'Payroll', moduleStrict: true }, canMatch: [moduleGuard] }
 * ```
 */
export const moduleGuard: CanMatchFn = (route, segments) => {
  const entitlementService = inject(EntitlementService);
  const router = inject(Router);

  const module = route.data?.['module'] as string | undefined;

  // If no module specified, allow access
  if (!module) {
    return true;
  }

  // If module is enabled, allow full access
  if (entitlementService.isModuleEnabled(module)) {
    return true;
  }

  // Module is disabled — check if strict mode
  const isStrict = route.data?.['moduleStrict'] === true;

  if (isStrict) {
    // Strict mode: block access entirely (for create/edit routes)
    router.navigate(['/module-disabled'], { queryParams: { module } });
    return false;
  }

  // Non-strict: allow read-only access (pages show read-only banner)
  return true;
};
