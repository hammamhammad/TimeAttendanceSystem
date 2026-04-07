import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AnalyticsQueryParams,
  ExecutiveSummaryResponse,
  HeadcountResponse,
  HeadcountDemographicsResponse,
  AttritionResponse,
  RecruitmentResponse,
  TrainingResponse,
  LeaveResponse,
  OvertimeResponse,
  PayrollResponse,
  EngagementResponse,
  SavedDashboard,
  CreateSavedDashboardRequest,
  UpdateSavedDashboardRequest
} from '../../shared/models/analytics.model';


@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1/analytics`;
  private http = inject(HttpClient);

  private buildParams(params?: AnalyticsQueryParams): HttpParams {
    let httpParams = new HttpParams();
    if (params?.startDate) httpParams = httpParams.set('startDate', params.startDate);
    if (params?.endDate) httpParams = httpParams.set('endDate', params.endDate);
    if (params?.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params?.departmentId) httpParams = httpParams.set('departmentId', params.departmentId.toString());
    return httpParams;
  }

  // --- Analytics Endpoints ---
  getExecutiveSummary(params?: AnalyticsQueryParams): Observable<ExecutiveSummaryResponse> {
    return this.http.get<ExecutiveSummaryResponse>(`${this.baseUrl}/executive-summary`, { params: this.buildParams(params) });
  }

  getHeadcount(params?: AnalyticsQueryParams): Observable<HeadcountResponse> {
    return this.http.get<HeadcountResponse>(`${this.baseUrl}/headcount`, { params: this.buildParams(params) });
  }

  getHeadcountDemographics(params?: AnalyticsQueryParams): Observable<HeadcountDemographicsResponse> {
    return this.http.get<HeadcountDemographicsResponse>(`${this.baseUrl}/headcount/demographics`, { params: this.buildParams(params) });
  }

  getAttrition(params?: AnalyticsQueryParams): Observable<AttritionResponse> {
    return this.http.get<AttritionResponse>(`${this.baseUrl}/attrition`, { params: this.buildParams(params) });
  }

  getRecruitment(params?: AnalyticsQueryParams): Observable<RecruitmentResponse> {
    return this.http.get<RecruitmentResponse>(`${this.baseUrl}/recruitment`, { params: this.buildParams(params) });
  }

  getTraining(params?: AnalyticsQueryParams): Observable<TrainingResponse> {
    return this.http.get<TrainingResponse>(`${this.baseUrl}/training`, { params: this.buildParams(params) });
  }

  getLeave(params?: AnalyticsQueryParams): Observable<LeaveResponse> {
    return this.http.get<LeaveResponse>(`${this.baseUrl}/leave`, { params: this.buildParams(params) });
  }

  getOvertime(params?: AnalyticsQueryParams): Observable<OvertimeResponse> {
    return this.http.get<OvertimeResponse>(`${this.baseUrl}/overtime`, { params: this.buildParams(params) });
  }

  getPayroll(params?: AnalyticsQueryParams): Observable<PayrollResponse> {
    return this.http.get<PayrollResponse>(`${this.baseUrl}/payroll`, { params: this.buildParams(params) });
  }

  getEngagement(params?: AnalyticsQueryParams): Observable<EngagementResponse> {
    return this.http.get<EngagementResponse>(`${this.baseUrl}/engagement`, { params: this.buildParams(params) });
  }

  // --- Saved Dashboards ---
  getSavedDashboards(): Observable<SavedDashboard[]> {
    return this.http.get<SavedDashboard[]>(`${this.baseUrl}/saved-dashboards`);
  }

  getSavedDashboard(id: number): Observable<SavedDashboard> {
    return this.http.get<SavedDashboard>(`${this.baseUrl}/saved-dashboards/${id}`);
  }

  createSavedDashboard(req: CreateSavedDashboardRequest): Observable<SavedDashboard> {
    return this.http.post<SavedDashboard>(`${this.baseUrl}/saved-dashboards`, req);
  }

  updateSavedDashboard(id: number, req: UpdateSavedDashboardRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/saved-dashboards/${id}`, req);
  }

  deleteSavedDashboard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/saved-dashboards/${id}`);
  }

  setDefaultDashboard(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/saved-dashboards/${id}/set-default`, {});
  }
}
