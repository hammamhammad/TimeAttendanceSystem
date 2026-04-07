import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PerformanceReviewCycle, CreatePerformanceCycleRequest, CycleQueryParams,
  PerformanceReview, ReviewQueryParams,
  GoalDefinition, CreateGoalRequest, UpdateGoalProgressRequest, GoalQueryParams,
  CompetencyFramework, CreateCompetencyFrameworkRequest, FrameworkQueryParams,
  PerformanceImprovementPlan, CreatePipRequest, ExtendPipRequest, CompletePipRequest, PipQueryParams,
  FeedbackRequest360, CreateFeedbackRequest360, SubmitFeedback360Request, FeedbackRequest360QueryParams,
  PerformancePagedResult
} from '../../shared/models/performance.model';

@Injectable({ providedIn: 'root' })
export class PerformanceService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;
  private http = inject(HttpClient);

  // --- Cycles ---
  getCycles(params?: CycleQueryParams): Observable<PerformancePagedResult<PerformanceReviewCycle>> {
    return this.http.get<PerformancePagedResult<PerformanceReviewCycle>>(`${this.baseUrl}/performance-cycles`, { params: params as any });
  }
  getCycle(id: number): Observable<PerformanceReviewCycle> {
    return this.http.get<PerformanceReviewCycle>(`${this.baseUrl}/performance-cycles/${id}`);
  }
  createCycle(req: CreatePerformanceCycleRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-cycles`, req);
  }
  updateCycle(id: number, req: CreatePerformanceCycleRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/performance-cycles/${id}`, req);
  }
  activateCycle(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-cycles/${id}/activate`, {});
  }
  completeCycle(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-cycles/${id}/complete`, {});
  }
  cancelCycle(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-cycles/${id}/cancel`, {});
  }

  // --- Reviews ---
  getReviews(params?: ReviewQueryParams): Observable<PerformancePagedResult<PerformanceReview>> {
    return this.http.get<PerformancePagedResult<PerformanceReview>>(`${this.baseUrl}/performance-reviews`, { params: params as any });
  }
  getReview(id: number): Observable<PerformanceReview> {
    return this.http.get<PerformanceReview>(`${this.baseUrl}/performance-reviews/${id}`);
  }
  submitSelfReview(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-reviews/${id}/self-review`, data);
  }
  submitManagerReview(id: number, data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/performance-reviews/${id}/manager-review`, data);
  }

  // --- Goals ---
  getGoals(params?: GoalQueryParams): Observable<PerformancePagedResult<GoalDefinition>> {
    return this.http.get<PerformancePagedResult<GoalDefinition>>(`${this.baseUrl}/goals`, { params: params as any });
  }
  getGoal(id: number): Observable<GoalDefinition> {
    return this.http.get<GoalDefinition>(`${this.baseUrl}/goals/${id}`);
  }
  createGoal(req: CreateGoalRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/goals`, req);
  }
  updateGoal(id: number, req: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/goals/${id}`, req);
  }
  updateProgress(id: number, req: UpdateGoalProgressRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/goals/${id}/update-progress`, req);
  }
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/goals/${id}`);
  }
  getMyGoals(params?: GoalQueryParams): Observable<PerformancePagedResult<GoalDefinition>> {
    return this.http.get<PerformancePagedResult<GoalDefinition>>(`${this.baseUrl}/goals/my-goals`, { params: params as any });
  }

  // --- Competency Frameworks ---
  getFrameworks(params?: FrameworkQueryParams): Observable<PerformancePagedResult<CompetencyFramework>> {
    return this.http.get<PerformancePagedResult<CompetencyFramework>>(`${this.baseUrl}/competency-frameworks`, { params: params as any });
  }
  getFramework(id: number): Observable<CompetencyFramework> {
    return this.http.get<CompetencyFramework>(`${this.baseUrl}/competency-frameworks/${id}`);
  }
  createFramework(req: CreateCompetencyFrameworkRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/competency-frameworks`, req);
  }
  updateFramework(id: number, req: CreateCompetencyFrameworkRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/competency-frameworks/${id}`, req);
  }
  deleteFramework(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/competency-frameworks/${id}`);
  }
  getFrameworkDropdown(): Observable<{ id: number; name: string; nameAr?: string }[]> {
    return this.http.get<{ id: number; name: string; nameAr?: string }[]>(`${this.baseUrl}/competency-frameworks/dropdown`);
  }

  // --- PIPs ---
  getPips(params?: PipQueryParams): Observable<PerformancePagedResult<PerformanceImprovementPlan>> {
    return this.http.get<PerformancePagedResult<PerformanceImprovementPlan>>(`${this.baseUrl}/pips`, { params: params as any });
  }
  getPip(id: number): Observable<PerformanceImprovementPlan> {
    return this.http.get<PerformanceImprovementPlan>(`${this.baseUrl}/pips/${id}`);
  }
  createPip(req: CreatePipRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pips`, req);
  }
  updatePip(id: number, req: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/pips/${id}`, req);
  }
  approvePip(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pips/${id}/approve`, {});
  }
  extendPip(id: number, req: ExtendPipRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pips/${id}/extend`, req);
  }
  completePipSuccessful(id: number, req?: CompletePipRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pips/${id}/complete-successful`, req || {});
  }
  completePipUnsuccessful(id: number, req?: CompletePipRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/pips/${id}/complete-unsuccessful`, req || {});
  }

  // --- 360 Feedback ---
  getFeedbackRequests(params?: FeedbackRequest360QueryParams): Observable<PerformancePagedResult<FeedbackRequest360>> {
    return this.http.get<PerformancePagedResult<FeedbackRequest360>>(`${this.baseUrl}/feedback-requests`, { params: params as any });
  }
  getMyPendingFeedback(params?: { page?: number; pageSize?: number }): Observable<PerformancePagedResult<FeedbackRequest360>> {
    return this.http.get<PerformancePagedResult<FeedbackRequest360>>(`${this.baseUrl}/feedback-requests/my-pending`, { params: params as any });
  }
  createFeedbackRequest(req: CreateFeedbackRequest360): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/feedback-requests`, req);
  }
  submitFeedback360(id: number, req: SubmitFeedback360Request): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/feedback-requests/${id}/submit`, req);
  }
  declineFeedback360(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/feedback-requests/${id}/decline`, {});
  }
}
