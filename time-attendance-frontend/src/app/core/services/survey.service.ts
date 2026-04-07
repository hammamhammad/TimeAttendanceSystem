import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SurveyTemplateDto, CreateSurveyTemplateRequest, UpdateSurveyTemplateRequest,
  SurveyDistributionDto, CreateSurveyDistributionRequest, UpdateSurveyDistributionRequest,
  SurveyParticipantDto, SurveyResultsDto, SurveyResponseRequest
} from '../../shared/models/survey.model';

@Injectable({ providedIn: 'root' })
export class SurveyService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Survey Templates =====

  getTemplates(params?: any): Observable<{ data: SurveyTemplateDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.surveyType) httpParams = httpParams.set('surveyType', params.surveyType);
    if (params?.isActive !== undefined && params.isActive !== '') httpParams = httpParams.set('isActive', params.isActive);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: SurveyTemplateDto[]; totalCount: number }>(`${this.baseUrl}/survey-templates`, { params: httpParams });
  }

  getTemplate(id: number): Observable<SurveyTemplateDto> {
    return this.http.get<SurveyTemplateDto>(`${this.baseUrl}/survey-templates/${id}`);
  }

  createTemplate(request: CreateSurveyTemplateRequest): Observable<SurveyTemplateDto> {
    return this.http.post<SurveyTemplateDto>(`${this.baseUrl}/survey-templates`, request);
  }

  updateTemplate(id: number, request: UpdateSurveyTemplateRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/survey-templates/${id}`, request);
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/survey-templates/${id}`);
  }

  getTemplateDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/survey-templates/dropdown`);
  }

  duplicateTemplate(id: number): Observable<SurveyTemplateDto> {
    return this.http.post<SurveyTemplateDto>(`${this.baseUrl}/survey-templates/${id}/duplicate`, {});
  }

  // ===== Survey Distributions =====

  getDistributions(params?: any): Observable<{ data: SurveyDistributionDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.surveyType) httpParams = httpParams.set('surveyType', params.surveyType);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: SurveyDistributionDto[]; totalCount: number }>(`${this.baseUrl}/survey-distributions`, { params: httpParams });
  }

  getDistribution(id: number): Observable<SurveyDistributionDto> {
    return this.http.get<SurveyDistributionDto>(`${this.baseUrl}/survey-distributions/${id}`);
  }

  createDistribution(request: CreateSurveyDistributionRequest): Observable<SurveyDistributionDto> {
    return this.http.post<SurveyDistributionDto>(`${this.baseUrl}/survey-distributions`, request);
  }

  updateDistribution(id: number, request: UpdateSurveyDistributionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/survey-distributions/${id}`, request);
  }

  deleteDistribution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/survey-distributions/${id}`);
  }

  activateDistribution(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/survey-distributions/${id}/activate`, {});
  }

  closeDistribution(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/survey-distributions/${id}/close`, {});
  }

  getParticipants(distributionId: number, params?: any): Observable<{ data: SurveyParticipantDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: SurveyParticipantDto[]; totalCount: number }>(`${this.baseUrl}/survey-distributions/${distributionId}/participants`, { params: httpParams });
  }

  getResults(distributionId: number): Observable<SurveyResultsDto> {
    return this.http.get<SurveyResultsDto>(`${this.baseUrl}/survey-distributions/${distributionId}/results`);
  }

  getResultsExport(distributionId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/survey-distributions/${distributionId}/results/export`, { responseType: 'blob' });
  }

  getEnpsScore(distributionId: number): Observable<{ score: number; promoters: number; passives: number; detractors: number }> {
    return this.http.get<{ score: number; promoters: number; passives: number; detractors: number }>(`${this.baseUrl}/survey-distributions/${distributionId}/enps`);
  }

  // ===== Survey Responses =====

  submitResponse(request: SurveyResponseRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/survey-responses`, request);
  }
}
