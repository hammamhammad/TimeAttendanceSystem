import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  KeyPosition, CreateKeyPositionRequest, UpdateKeyPositionRequest, KeyPositionQueryParams,
  TalentProfile, CreateTalentProfileRequest, UpdateTalentProfileRequest, TalentProfileQueryParams,
  SuccessionPlan, CreateSuccessionPlanRequest, UpdateSuccessionPlanRequest, AddSuccessionCandidateRequest, SuccessionPlanQueryParams,
  CareerPath, CreateCareerPathRequest, UpdateCareerPathRequest, CareerPathQueryParams, CareerPathStepRequest,
  SuccessionPagedResult, KeyPositionRiskSummary, KeyPositionDropdown, TalentProfileDropdown
} from '../../shared/models/succession.model';

@Injectable({ providedIn: 'root' })
export class SuccessionService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;
  private http = inject(HttpClient);

  // ===== Key Positions =====
  getKeyPositions(params?: KeyPositionQueryParams): Observable<SuccessionPagedResult<KeyPosition>> {
    return this.http.get<SuccessionPagedResult<KeyPosition>>(`${this.baseUrl}/key-positions`, { params: params as any });
  }
  getKeyPosition(id: number): Observable<KeyPosition> {
    return this.http.get<KeyPosition>(`${this.baseUrl}/key-positions/${id}`);
  }
  getKeyPositionDropdown(): Observable<KeyPositionDropdown[]> {
    return this.http.get<KeyPositionDropdown[]>(`${this.baseUrl}/key-positions/dropdown`);
  }
  getKeyPositionRiskSummary(): Observable<KeyPositionRiskSummary> {
    return this.http.get<KeyPositionRiskSummary>(`${this.baseUrl}/key-positions/risk-summary`);
  }
  createKeyPosition(req: CreateKeyPositionRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/key-positions`, req);
  }
  updateKeyPosition(id: number, req: UpdateKeyPositionRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/key-positions/${id}`, req);
  }
  deleteKeyPosition(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/key-positions/${id}`);
  }

  // ===== Talent Profiles =====
  getTalentProfiles(params?: TalentProfileQueryParams): Observable<SuccessionPagedResult<TalentProfile>> {
    return this.http.get<SuccessionPagedResult<TalentProfile>>(`${this.baseUrl}/talent-profiles`, { params: params as any });
  }
  getTalentProfile(id: number): Observable<TalentProfile> {
    return this.http.get<TalentProfile>(`${this.baseUrl}/talent-profiles/${id}`);
  }
  getTalentProfileDropdown(): Observable<TalentProfileDropdown[]> {
    return this.http.get<TalentProfileDropdown[]>(`${this.baseUrl}/talent-profiles/dropdown`);
  }
  getNineBoxGrid(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/talent-profiles/nine-box-grid`);
  }
  getTalentPool(params?: any): Observable<SuccessionPagedResult<TalentProfile>> {
    return this.http.get<SuccessionPagedResult<TalentProfile>>(`${this.baseUrl}/talent-profiles/talent-pool`, { params });
  }
  createTalentProfile(req: CreateTalentProfileRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/talent-profiles`, req);
  }
  updateTalentProfile(id: number, req: UpdateTalentProfileRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/talent-profiles/${id}`, req);
  }
  deleteTalentProfile(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/talent-profiles/${id}`);
  }

  // ===== Succession Plans =====
  getSuccessionPlans(params?: SuccessionPlanQueryParams): Observable<SuccessionPagedResult<SuccessionPlan>> {
    return this.http.get<SuccessionPagedResult<SuccessionPlan>>(`${this.baseUrl}/succession-plans`, { params: params as any });
  }
  getSuccessionPlan(id: number): Observable<SuccessionPlan> {
    return this.http.get<SuccessionPlan>(`${this.baseUrl}/succession-plans/${id}`);
  }
  createSuccessionPlan(req: CreateSuccessionPlanRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/succession-plans`, req);
  }
  updateSuccessionPlan(id: number, req: UpdateSuccessionPlanRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/succession-plans/${id}`, req);
  }
  deleteSuccessionPlan(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/succession-plans/${id}`);
  }
  addCandidate(planId: number, req: AddSuccessionCandidateRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/succession-plans/${planId}/candidates`, req);
  }
  removeCandidate(planId: number, candidateId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/succession-plans/${planId}/candidates/${candidateId}`);
  }

  // ===== Career Paths =====
  getCareerPaths(params?: CareerPathQueryParams): Observable<SuccessionPagedResult<CareerPath>> {
    return this.http.get<SuccessionPagedResult<CareerPath>>(`${this.baseUrl}/career-paths`, { params: params as any });
  }
  getCareerPath(id: number): Observable<CareerPath> {
    return this.http.get<CareerPath>(`${this.baseUrl}/career-paths/${id}`);
  }
  getCareerPathDropdown(): Observable<{ id: number; name: string; nameAr?: string }[]> {
    return this.http.get<{ id: number; name: string; nameAr?: string }[]>(`${this.baseUrl}/career-paths/dropdown`);
  }
  createCareerPath(req: CreateCareerPathRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/career-paths`, req);
  }
  updateCareerPath(id: number, req: UpdateCareerPathRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/career-paths/${id}`, req);
  }
  deleteCareerPath(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/career-paths/${id}`);
  }
  addCareerPathStep(pathId: number, req: CareerPathStepRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/career-paths/${pathId}/steps`, req);
  }
  updateCareerPathStep(pathId: number, stepId: number, req: CareerPathStepRequest): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/career-paths/${pathId}/steps/${stepId}`, req);
  }
  deleteCareerPathStep(pathId: number, stepId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/career-paths/${pathId}/steps/${stepId}`);
  }
}
