import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EmployeePromotion,
  CreateEmployeePromotionRequest,
  UpdateEmployeePromotionRequest,
  PromotionQueryParams,
  PromotionPagedResult
} from '../../shared/models/employee-promotion.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeePromotionService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-promotions`;
  private http = inject(HttpClient);

  /**
   * Get promotions with filtering and pagination
   */
  getPromotions(params: PromotionQueryParams = {}): Observable<PromotionPagedResult> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.departmentId) httpParams = httpParams.set('departmentId', params.departmentId.toString());
    if (params.status !== undefined && params.status !== null) httpParams = httpParams.set('status', params.status.toString());
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDescending) httpParams = httpParams.set('sortDescending', params.sortDescending.toString());
    return this.http.get<PromotionPagedResult>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get promotion by ID
   */
  getPromotionById(id: number): Observable<EmployeePromotion> {
    return this.http.get<EmployeePromotion>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new promotion
   */
  createPromotion(request: CreateEmployeePromotionRequest): Observable<EmployeePromotion> {
    return this.http.post<EmployeePromotion>(this.apiUrl, request);
  }

  /**
   * Update an existing promotion
   */
  updatePromotion(id: number, request: UpdateEmployeePromotionRequest): Observable<EmployeePromotion> {
    return this.http.put<EmployeePromotion>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a promotion
   */
  deletePromotion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Approve a pending promotion
   */
  approvePromotion(id: number, comments?: string): Observable<EmployeePromotion> {
    return this.http.post<EmployeePromotion>(`${this.apiUrl}/${id}/approve`, { comments });
  }

  /**
   * Reject a pending promotion
   */
  rejectPromotion(id: number, comments: string): Observable<EmployeePromotion> {
    return this.http.post<EmployeePromotion>(`${this.apiUrl}/${id}/reject`, { comments });
  }

  /**
   * Cancel a promotion
   */
  cancelPromotion(id: number, reason?: string): Observable<EmployeePromotion> {
    return this.http.post<EmployeePromotion>(`${this.apiUrl}/${id}/cancel`, { reason });
  }
}
