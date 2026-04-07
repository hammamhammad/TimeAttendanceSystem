import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, Observable } from 'rxjs';
import { TenantEntitlementSummary } from '../../shared/models/entitlement.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntitlementService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/entitlements`;
  private http = inject(HttpClient);

  private entitlements = signal<TenantEntitlementSummary | null>(null);

  /**
   * Load entitlements from the backend and store in the signal.
   */
  loadEntitlements(): Observable<TenantEntitlementSummary> {
    return this.http.get<TenantEntitlementSummary>(this.apiUrl).pipe(
      tap(result => this.entitlements.set(result))
    );
  }

  /**
   * Check if a module is enabled in the current tenant's entitlements.
   * Returns true if no entitlements are loaded yet (fail-open during loading).
   */
  isModuleEnabled(module: string): boolean {
    const ent = this.entitlements();
    if (!ent) return true; // fail-open during loading
    return ent.enabledModules.includes(module);
  }

  /**
   * Check if a feature flag is enabled.
   */
  isFeatureEnabled(featureKey: string): boolean {
    const ent = this.entitlements();
    if (!ent) return true; // fail-open during loading
    return ent.featureFlags[featureKey] ?? false;
  }

  /**
   * Get the limit value for a given limit type.
   * Returns -1 if not found.
   */
  getLimit(limitType: string): number {
    const ent = this.entitlements();
    if (!ent) return -1;
    return ent.limits[limitType]?.limit ?? -1;
  }

  /**
   * Get the current usage for a given limit type.
   * Returns 0 if not found.
   */
  getCurrentUsage(limitType: string): number {
    const ent = this.entitlements();
    if (!ent) return 0;
    return ent.limits[limitType]?.current ?? 0;
  }
}
