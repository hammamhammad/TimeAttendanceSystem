import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  TenantDto,
  TenantDetailDto,
  TenantsPagedResult,
  CreateTenantRequest,
  UpdateTenantRequest,
  AssignPlanRequest,
  ChangePlanRequest,
  SubscriptionPlanDto,
  TenantSubscriptionDto
} from '../models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/tenants`;
  private plansUrl = `${environment.apiUrl}/api/v1/subscription-plans`;

  // --- Tenant CRUD ---

  getTenants(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    status?: string
  ): Observable<TenantsPagedResult> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<TenantsPagedResult>(this.baseUrl, { params });
  }

  getTenantById(id: number): Observable<TenantDetailDto> {
    return this.http.get<TenantDetailDto>(`${this.baseUrl}/${id}`);
  }

  createTenant(request: CreateTenantRequest): Observable<{ id: number; warning?: string }> {
    return this.http.post<{ id: number; warning?: string }>(this.baseUrl, request);
  }

  updateTenant(id: number, request: UpdateTenantRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }

  activateTenant(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/activate`, {});
  }

  suspendTenant(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/suspend`, {});
  }

  // --- Subscription Plans ---

  getSubscriptionPlans(): Observable<SubscriptionPlanDto[]> {
    return this.http.get<SubscriptionPlanDto[]>(this.plansUrl);
  }

  getSubscriptionPlanById(id: number): Observable<SubscriptionPlanDto> {
    return this.http.get<SubscriptionPlanDto>(`${this.plansUrl}/${id}`);
  }

  createSubscriptionPlan(data: any): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.plansUrl, data);
  }

  updateSubscriptionPlan(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.plansUrl}/${id}`, data);
  }

  deleteSubscriptionPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.plansUrl}/${id}`);
  }

  // --- Tenant Subscription ---

  getTenantSubscription(tenantId: number): Observable<TenantSubscriptionDto> {
    return this.http.get<TenantSubscriptionDto>(`${this.baseUrl}/${tenantId}/subscription`);
  }

  assignPlan(tenantId: number, request: AssignPlanRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${tenantId}/subscription`, request);
  }

  changePlan(tenantId: number, request: ChangePlanRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${tenantId}/subscription/change-plan`, request);
  }

  cancelSubscription(tenantId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${tenantId}/subscription/cancel`, {});
  }
}
