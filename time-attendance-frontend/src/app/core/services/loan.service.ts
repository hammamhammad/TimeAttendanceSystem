import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  LoanTypeDto, CreateLoanTypeRequest, UpdateLoanTypeRequest,
  LoanPolicyDto, CreateLoanPolicyRequest, UpdateLoanPolicyRequest,
  LoanApplicationDto, CreateLoanApplicationRequest,
  SalaryAdvanceDto, CreateSalaryAdvanceRequest
} from '../../shared/models/loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Loan Types =====

  getTypes(params?: any): Observable<{ data: LoanTypeDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LoanTypeDto[]; totalCount: number }>(`${this.baseUrl}/loan-types`, { params: httpParams });
  }

  getType(id: number): Observable<LoanTypeDto> {
    return this.http.get<LoanTypeDto>(`${this.baseUrl}/loan-types/${id}`);
  }

  createType(request: CreateLoanTypeRequest): Observable<LoanTypeDto> {
    return this.http.post<LoanTypeDto>(`${this.baseUrl}/loan-types`, request);
  }

  updateType(id: number, request: UpdateLoanTypeRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/loan-types/${id}`, request);
  }

  deleteType(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/loan-types/${id}`);
  }

  getTypeDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/loan-types/dropdown`);
  }

  // ===== Loan Policies =====

  getPolicies(params?: any): Observable<{ data: LoanPolicyDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LoanPolicyDto[]; totalCount: number }>(`${this.baseUrl}/loan-policies`, { params: httpParams });
  }

  getPolicy(id: number): Observable<LoanPolicyDto> {
    return this.http.get<LoanPolicyDto>(`${this.baseUrl}/loan-policies/${id}`);
  }

  createPolicy(request: CreateLoanPolicyRequest): Observable<LoanPolicyDto> {
    return this.http.post<LoanPolicyDto>(`${this.baseUrl}/loan-policies`, request);
  }

  updatePolicy(id: number, request: UpdateLoanPolicyRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/loan-policies/${id}`, request);
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/loan-policies/${id}`);
  }

  // ===== Loan Applications =====

  getApplications(params?: any): Observable<{ data: LoanApplicationDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.employeeId) httpParams = httpParams.set('employeeId', params.employeeId);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LoanApplicationDto[]; totalCount: number }>(`${this.baseUrl}/loan-applications`, { params: httpParams });
  }

  getApplication(id: number): Observable<LoanApplicationDto> {
    return this.http.get<LoanApplicationDto>(`${this.baseUrl}/loan-applications/${id}`);
  }

  createApplication(request: CreateLoanApplicationRequest): Observable<LoanApplicationDto> {
    return this.http.post<LoanApplicationDto>(`${this.baseUrl}/loan-applications`, request);
  }

  approveApplication(id: number, approvedAmount?: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/loan-applications/${id}/approve`, { approvedAmount });
  }

  rejectApplication(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/loan-applications/${id}/reject`, { reason });
  }

  disburseApplication(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/loan-applications/${id}/disburse`, {});
  }

  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/loan-applications/${id}`);
  }

  // ===== Salary Advances =====

  getSalaryAdvances(params?: any): Observable<{ data: SalaryAdvanceDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: SalaryAdvanceDto[]; totalCount: number }>(`${this.baseUrl}/salary-advances`, { params: httpParams });
  }

  getSalaryAdvance(id: number): Observable<SalaryAdvanceDto> {
    return this.http.get<SalaryAdvanceDto>(`${this.baseUrl}/salary-advances/${id}`);
  }

  createSalaryAdvance(request: CreateSalaryAdvanceRequest): Observable<SalaryAdvanceDto> {
    return this.http.post<SalaryAdvanceDto>(`${this.baseUrl}/salary-advances`, request);
  }

  approveSalaryAdvance(id: number, approvedAmount?: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/salary-advances/${id}/approve`, { approvedAmount });
  }

  rejectSalaryAdvance(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/salary-advances/${id}/reject`, { reason });
  }

  // ===== My Loans (Portal) =====

  getMyApplications(params?: any): Observable<{ data: LoanApplicationDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: LoanApplicationDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-loan-applications`, { params: httpParams });
  }

  getMySalaryAdvances(params?: any): Observable<{ data: SalaryAdvanceDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: SalaryAdvanceDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-salary-advances`, { params: httpParams });
  }
}
