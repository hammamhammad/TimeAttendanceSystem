import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  BenefitPlan,
  CreateBenefitPlanRequest,
  UpdateBenefitPlanRequest,
  BenefitPlanOption,
  CreateBenefitPlanOptionRequest,
  UpdateBenefitPlanOptionRequest,
  BenefitEligibilityRule,
  CreateBenefitEligibilityRuleRequest,
  UpdateBenefitEligibilityRuleRequest,
  OpenEnrollmentPeriod,
  CreateOpenEnrollmentPeriodRequest,
  UpdateOpenEnrollmentPeriodRequest,
  BenefitEnrollment,
  CreateBenefitEnrollmentRequest,
  BenefitClaim,
  CreateBenefitClaimRequest,
  ApproveBenefitClaimRequest,
  RejectBenefitClaimRequest
} from '../../shared/models/benefit.model';

interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1`;

  // =====================
  // Benefit Plans
  // =====================

  getBenefitPlans(
    pageNumber: number = 1,
    pageSize: number = 10,
    benefitType?: string,
    isActive?: boolean,
    planYear?: number,
    insuranceProviderId?: number,
    search?: string
  ): Observable<PagedResponse<BenefitPlan>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (benefitType) params = params.set('benefitType', benefitType);
    if (isActive !== null && isActive !== undefined) params = params.set('isActive', isActive.toString());
    if (planYear) params = params.set('planYear', planYear.toString());
    if (insuranceProviderId) params = params.set('insuranceProviderId', insuranceProviderId.toString());
    if (search) params = params.set('search', search);

    return this.http.get<PagedResponse<BenefitPlan>>(`${this.apiUrl}/benefit-plans`, { params });
  }

  getBenefitPlan(id: number): Observable<BenefitPlan> {
    return this.http.get<BenefitPlan>(`${this.apiUrl}/benefit-plans/${id}`);
  }

  createBenefitPlan(data: CreateBenefitPlanRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/benefit-plans`, data);
  }

  updateBenefitPlan(id: number, data: UpdateBenefitPlanRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/benefit-plans/${id}`, data);
  }

  deleteBenefitPlan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/benefit-plans/${id}`);
  }

  getBenefitPlansDropdown(benefitType?: string): Observable<any[]> {
    let params = new HttpParams();
    if (benefitType) params = params.set('benefitType', benefitType);
    return this.http.get<any[]>(`${this.apiUrl}/benefit-plans/dropdown`, { params });
  }

  // =====================
  // Benefit Plan Options
  // =====================

  getPlanOptions(planId: number): Observable<{ data: BenefitPlanOption[]; totalCount: number }> {
    return this.http.get<{ data: BenefitPlanOption[]; totalCount: number }>(`${this.apiUrl}/benefit-plans/${planId}/options`);
  }

  createPlanOption(planId: number, data: CreateBenefitPlanOptionRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/benefit-plans/${planId}/options`, data);
  }

  updatePlanOption(planId: number, optionId: number, data: UpdateBenefitPlanOptionRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/benefit-plans/${planId}/options/${optionId}`, data);
  }

  deletePlanOption(planId: number, optionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/benefit-plans/${planId}/options/${optionId}`);
  }

  // =====================
  // Eligibility Rules
  // =====================

  getEligibilityRules(planId: number): Observable<{ data: BenefitEligibilityRule[]; totalCount: number }> {
    return this.http.get<{ data: BenefitEligibilityRule[]; totalCount: number }>(`${this.apiUrl}/benefit-plans/${planId}/eligibility-rules`);
  }

  createEligibilityRule(planId: number, data: CreateBenefitEligibilityRuleRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/benefit-plans/${planId}/eligibility-rules`, data);
  }

  updateEligibilityRule(planId: number, ruleId: number, data: UpdateBenefitEligibilityRuleRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/benefit-plans/${planId}/eligibility-rules/${ruleId}`, data);
  }

  deleteEligibilityRule(planId: number, ruleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/benefit-plans/${planId}/eligibility-rules/${ruleId}`);
  }

  // =====================
  // Open Enrollment Periods
  // =====================

  getOpenEnrollmentPeriods(
    pageNumber: number = 1,
    pageSize: number = 10,
    status?: string,
    planYear?: number,
    branchId?: number,
    search?: string
  ): Observable<PagedResponse<OpenEnrollmentPeriod>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (status) params = params.set('status', status);
    if (planYear) params = params.set('planYear', planYear.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    if (search) params = params.set('search', search);

    return this.http.get<PagedResponse<OpenEnrollmentPeriod>>(`${this.apiUrl}/open-enrollment-periods`, { params });
  }

  getOpenEnrollmentPeriod(id: number): Observable<OpenEnrollmentPeriod> {
    return this.http.get<OpenEnrollmentPeriod>(`${this.apiUrl}/open-enrollment-periods/${id}`);
  }

  createOpenEnrollmentPeriod(data: CreateOpenEnrollmentPeriodRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/open-enrollment-periods`, data);
  }

  updateOpenEnrollmentPeriod(id: number, data: UpdateOpenEnrollmentPeriodRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/open-enrollment-periods/${id}`, data);
  }

  deleteOpenEnrollmentPeriod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/open-enrollment-periods/${id}`);
  }

  openEnrollmentPeriod(id: number): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/open-enrollment-periods/${id}/open`, {});
  }

  closeEnrollmentPeriod(id: number): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/open-enrollment-periods/${id}/close`, {});
  }

  // =====================
  // Benefit Enrollments
  // =====================

  getBenefitEnrollments(
    pageNumber: number = 1,
    pageSize: number = 10,
    employeeId?: number,
    benefitPlanId?: number,
    status?: string,
    openEnrollmentPeriodId?: number,
    search?: string
  ): Observable<PagedResponse<BenefitEnrollment>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (employeeId) params = params.set('employeeId', employeeId.toString());
    if (benefitPlanId) params = params.set('benefitPlanId', benefitPlanId.toString());
    if (status) params = params.set('status', status);
    if (openEnrollmentPeriodId) params = params.set('openEnrollmentPeriodId', openEnrollmentPeriodId.toString());
    if (search) params = params.set('search', search);

    return this.http.get<PagedResponse<BenefitEnrollment>>(`${this.apiUrl}/benefit-enrollments`, { params });
  }

  getBenefitEnrollment(id: number): Observable<BenefitEnrollment> {
    return this.http.get<BenefitEnrollment>(`${this.apiUrl}/benefit-enrollments/${id}`);
  }

  createBenefitEnrollment(data: CreateBenefitEnrollmentRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/benefit-enrollments`, data);
  }

  deleteBenefitEnrollment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/benefit-enrollments/${id}`);
  }

  approveBenefitEnrollment(id: number, comments?: string): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/benefit-enrollments/${id}/approve`, { comments });
  }

  rejectBenefitEnrollment(id: number, comments: string): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/benefit-enrollments/${id}/reject`, { comments });
  }

  // =====================
  // Benefit Claims
  // =====================

  getBenefitClaims(
    pageNumber: number = 1,
    pageSize: number = 10,
    employeeId?: number,
    benefitEnrollmentId?: number,
    status?: string,
    claimType?: string,
    fromDate?: string,
    toDate?: string,
    search?: string
  ): Observable<PagedResponse<BenefitClaim>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (employeeId) params = params.set('employeeId', employeeId.toString());
    if (benefitEnrollmentId) params = params.set('benefitEnrollmentId', benefitEnrollmentId.toString());
    if (status) params = params.set('status', status);
    if (claimType) params = params.set('claimType', claimType);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);
    if (search) params = params.set('search', search);

    return this.http.get<PagedResponse<BenefitClaim>>(`${this.apiUrl}/benefit-claims`, { params });
  }

  getBenefitClaim(id: number): Observable<BenefitClaim> {
    return this.http.get<BenefitClaim>(`${this.apiUrl}/benefit-claims/${id}`);
  }

  createBenefitClaim(data: CreateBenefitClaimRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.apiUrl}/benefit-claims`, data);
  }

  deleteBenefitClaim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/benefit-claims/${id}`);
  }

  approveBenefitClaim(id: number, data: ApproveBenefitClaimRequest): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/benefit-claims/${id}/approve`, data);
  }

  rejectBenefitClaim(id: number, data: RejectBenefitClaimRequest): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/benefit-claims/${id}/reject`, data);
  }

  processClaimPayment(id: number): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.apiUrl}/benefit-claims/${id}/process-payment`, {});
  }
}
