import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LifecycleAutomationAuditDetail,
  LifecycleAutomationAuditEntry,
  LifecycleAutomationAuditPage,
  LifecycleAutomationStatus,
  LifecycleAutomationType,
} from '../../shared/models/lifecycle-automation.model';

/**
 * Client for GET /api/v1/lifecycle-automation/audit endpoints.
 * Tenant-settings toggles are handled by the existing CompanyConfigurationService — this
 * service only deals with the audit trail.
 */
@Injectable({ providedIn: 'root' })
export class LifecycleAutomationService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/lifecycle-automation`;
  private http = inject(HttpClient);

  getAudits(filters: {
    automationType?: LifecycleAutomationType;
    sourceEntityType?: string;
    sourceEntityId?: number;
    status?: LifecycleAutomationStatus;
    from?: string;
    to?: string;
    page?: number;
    pageSize?: number;
  } = {}): Observable<LifecycleAutomationAuditPage> {
    let params = new HttpParams();
    if (filters.automationType !== undefined) params = params.set('automationType', String(filters.automationType));
    if (filters.sourceEntityType) params = params.set('sourceEntityType', filters.sourceEntityType);
    if (filters.sourceEntityId !== undefined) params = params.set('sourceEntityId', String(filters.sourceEntityId));
    if (filters.status !== undefined) params = params.set('status', String(filters.status));
    if (filters.from) params = params.set('from', filters.from);
    if (filters.to) params = params.set('to', filters.to);
    if (filters.page) params = params.set('page', String(filters.page));
    if (filters.pageSize) params = params.set('pageSize', String(filters.pageSize));
    return this.http.get<LifecycleAutomationAuditPage>(`${this.apiUrl}/audit`, { params });
  }

  getAuditById(id: number): Observable<LifecycleAutomationAuditDetail> {
    return this.http.get<LifecycleAutomationAuditDetail>(`${this.apiUrl}/audit/${id}`);
  }

  /**
   * Returns all audits for a given source entity, newest first. Used by the
   * Automation History card embedded on detail pages.
   */
  getAuditsByEntity(entityType: string, entityId: number): Observable<LifecycleAutomationAuditEntry[]> {
    const params = new HttpParams()
      .set('entityType', entityType)
      .set('entityId', String(entityId));
    return this.http.get<LifecycleAutomationAuditEntry[]>(`${this.apiUrl}/audit/by-entity`, { params });
  }
}
