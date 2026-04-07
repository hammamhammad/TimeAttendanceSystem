import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  OnboardingTemplate, CreateOnboardingTemplateRequest, TemplateQueryParams,
  OnboardingProcess, ProcessQueryParams,
  OnboardingTask, UpdateTaskStatusRequest,
  OnboardingDashboardStats,
  OnboardingPagedResult
} from '../../shared/models/onboarding.model';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/onboarding-templates`;
  private http = inject(HttpClient);

  // --- Templates ---
  getTemplates(params?: TemplateQueryParams): Observable<OnboardingPagedResult<OnboardingTemplate>> {
    return this.http.get<OnboardingPagedResult<OnboardingTemplate>>(this.baseUrl, { params: params as any });
  }
  getTemplate(id: number): Observable<OnboardingTemplate> {
    return this.http.get<OnboardingTemplate>(`${this.baseUrl}/${id}`);
  }
  createTemplate(req: CreateOnboardingTemplateRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl, req);
  }
  updateTemplate(id: number, req: CreateOnboardingTemplateRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, req);
  }
  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  toggleTemplateStatus(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/toggle-status`, {});
  }
  getTemplateDropdown(departmentId?: number, branchId?: number): Observable<{ id: number; name: string; nameAr?: string; isDefault: boolean }[]> {
    const params: any = {};
    if (departmentId) params.departmentId = departmentId;
    if (branchId) params.branchId = branchId;
    return this.http.get<{ id: number; name: string; nameAr?: string; isDefault: boolean }[]>(`${this.baseUrl}/dropdown`, { params });
  }

  // --- Processes (onboarding-processes endpoint if it exists) ---
  // Note: Processes are auto-created by offer acceptance. These methods are stubs for future use.
  getProcesses(params?: ProcessQueryParams): Observable<OnboardingPagedResult<OnboardingProcess>> {
    return this.http.get<OnboardingPagedResult<OnboardingProcess>>(`${environment.apiUrl}/api/v1/onboarding-processes`, { params: params as any });
  }
  getProcess(id: number): Observable<OnboardingProcess> {
    return this.http.get<OnboardingProcess>(`${environment.apiUrl}/api/v1/onboarding-processes/${id}`);
  }
  cancelProcess(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/v1/onboarding-processes/${id}/cancel`, {});
  }

  // --- Tasks ---
  updateTaskStatus(processId: number, taskId: number, req: UpdateTaskStatusRequest): Observable<OnboardingTask> {
    return this.http.put<OnboardingTask>(`${environment.apiUrl}/api/v1/onboarding-processes/${processId}/tasks/${taskId}`, req);
  }

  // --- Dashboard ---
  getDashboardStats(): Observable<OnboardingDashboardStats> {
    return this.http.get<OnboardingDashboardStats>(`${environment.apiUrl}/api/v1/onboarding/dashboard`);
  }
}
