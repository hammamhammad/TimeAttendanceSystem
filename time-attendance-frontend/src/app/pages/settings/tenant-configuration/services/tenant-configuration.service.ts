import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  TenantSettingsDto,
  BranchSettingsOverrideDto,
  ResolvedSettingsDto,
  PolicyTemplateDto,
  SetupStatusDto,
  CreatePolicyTemplateRequest,
  UpdatePolicyTemplateRequest
} from './tenant-configuration.models';

@Injectable({
  providedIn: 'root'
})
export class TenantConfigurationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/tenant-configuration`;
  private templatesUrl = `${environment.apiUrl}/api/v1/policy-templates`;

  // ── Tenant Settings ────────────────────────────────────

  getTenantSettings(): Observable<TenantSettingsDto> {
    return this.http.get<TenantSettingsDto>(this.baseUrl);
  }

  updateTenantSettings(settings: Partial<TenantSettingsDto>): Observable<void> {
    return this.http.put<void>(this.baseUrl, settings);
  }

  // ── Resolved Settings ──────────────────────────────────

  getResolvedSettings(branchId?: number, departmentId?: number): Observable<ResolvedSettingsDto> {
    let params = new HttpParams();
    if (branchId) params = params.set('branchId', branchId.toString());
    if (departmentId) params = params.set('departmentId', departmentId.toString());
    return this.http.get<ResolvedSettingsDto>(`${this.baseUrl}/resolved`, { params });
  }

  // ── Branch Overrides ───────────────────────────────────

  getBranchOverrides(branchId: number): Observable<BranchSettingsOverrideDto> {
    return this.http.get<BranchSettingsOverrideDto>(`${this.baseUrl}/branches/${branchId}`);
  }

  updateBranchOverrides(branchId: number, overrides: Partial<BranchSettingsOverrideDto>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/branches/${branchId}`, { ...overrides, branchId });
  }

  resetBranchOverrides(branchId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/branches/${branchId}`);
  }

  // ── Setup Status ───────────────────────────────────────

  getSetupStatus(): Observable<SetupStatusDto> {
    return this.http.get<SetupStatusDto>(`${this.baseUrl}/setup-status`);
  }

  recalculateSetupStatus(): Observable<SetupStatusDto> {
    return this.http.post<SetupStatusDto>(`${this.baseUrl}/setup-status/recalculate`, {});
  }

  // ── Policy Templates ───────────────────────────────────

  getPolicyTemplates(region?: string, industry?: string): Observable<PolicyTemplateDto[]> {
    let params = new HttpParams();
    if (region) params = params.set('region', region);
    if (industry) params = params.set('industry', industry);
    return this.http.get<PolicyTemplateDto[]>(this.templatesUrl, { params });
  }

  getPolicyTemplateById(id: number): Observable<PolicyTemplateDto> {
    return this.http.get<PolicyTemplateDto>(`${this.templatesUrl}/${id}`);
  }

  createPolicyTemplate(request: CreatePolicyTemplateRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.templatesUrl, request);
  }

  updatePolicyTemplate(id: number, request: UpdatePolicyTemplateRequest): Observable<void> {
    return this.http.put<void>(`${this.templatesUrl}/${id}`, request);
  }

  deletePolicyTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.templatesUrl}/${id}`);
  }

  applyPolicyTemplate(templateId: number, branchId?: number): Observable<void> {
    let params = new HttpParams();
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.post<void>(`${this.templatesUrl}/${templateId}/apply`, {}, { params });
  }
}
