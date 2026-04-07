import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ExpenseCategoryDto, CreateExpenseCategoryRequest, UpdateExpenseCategoryRequest,
  ExpensePolicyDto, CreateExpensePolicyRequest, UpdateExpensePolicyRequest,
  ExpenseClaimDto, CreateExpenseClaimRequest
} from '../../shared/models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Expense Categories =====

  getCategories(params?: any): Observable<{ data: ExpenseCategoryDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ExpenseCategoryDto[]; totalCount: number }>(`${this.baseUrl}/expense-categories`, { params: httpParams });
  }

  getCategory(id: number): Observable<ExpenseCategoryDto> {
    return this.http.get<ExpenseCategoryDto>(`${this.baseUrl}/expense-categories/${id}`);
  }

  createCategory(request: CreateExpenseCategoryRequest): Observable<ExpenseCategoryDto> {
    return this.http.post<ExpenseCategoryDto>(`${this.baseUrl}/expense-categories`, request);
  }

  updateCategory(id: number, request: UpdateExpenseCategoryRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/expense-categories/${id}`, request);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/expense-categories/${id}`);
  }

  getCategoryDropdown(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${this.baseUrl}/expense-categories/dropdown`);
  }

  // ===== Expense Policies =====

  getPolicies(params?: any): Observable<{ data: ExpensePolicyDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ExpensePolicyDto[]; totalCount: number }>(`${this.baseUrl}/expense-policies`, { params: httpParams });
  }

  getPolicy(id: number): Observable<ExpensePolicyDto> {
    return this.http.get<ExpensePolicyDto>(`${this.baseUrl}/expense-policies/${id}`);
  }

  createPolicy(request: CreateExpensePolicyRequest): Observable<ExpensePolicyDto> {
    return this.http.post<ExpensePolicyDto>(`${this.baseUrl}/expense-policies`, request);
  }

  updatePolicy(id: number, request: UpdateExpensePolicyRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/expense-policies/${id}`, request);
  }

  deletePolicy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/expense-policies/${id}`);
  }

  // ===== Expense Claims =====

  getClaims(params?: any): Observable<{ data: ExpenseClaimDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.employeeId) httpParams = httpParams.set('employeeId', params.employeeId);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ExpenseClaimDto[]; totalCount: number }>(`${this.baseUrl}/expense-claims`, { params: httpParams });
  }

  getClaim(id: number): Observable<ExpenseClaimDto> {
    return this.http.get<ExpenseClaimDto>(`${this.baseUrl}/expense-claims/${id}`);
  }

  createClaim(request: CreateExpenseClaimRequest): Observable<ExpenseClaimDto> {
    return this.http.post<ExpenseClaimDto>(`${this.baseUrl}/expense-claims`, request);
  }

  submitClaim(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/expense-claims/${id}/submit`, {});
  }

  approveClaim(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/expense-claims/${id}/approve`, {});
  }

  rejectClaim(id: number, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/expense-claims/${id}/reject`, { reason });
  }

  reimburseClaim(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/expense-claims/${id}/reimburse`, {});
  }

  uploadReceipt(claimId: number, itemId: number, file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<void>(`${this.baseUrl}/expense-claims/${claimId}/items/${itemId}/receipt`, formData);
  }

  deleteClaim(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/expense-claims/${id}`);
  }

  // ===== My Expenses (Portal) =====

  getMyClaims(params?: any): Observable<{ data: ExpenseClaimDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ExpenseClaimDto[]; totalCount: number }>(`${this.baseUrl}/portal/my-expense-claims`, { params: httpParams });
  }
}
