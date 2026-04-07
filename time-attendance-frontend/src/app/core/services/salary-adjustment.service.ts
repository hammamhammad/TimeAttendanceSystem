import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SalaryAdjustment,
  CreateSalaryAdjustmentRequest,
  UpdateSalaryAdjustmentRequest,
  SalaryAdjustmentQueryParams,
  SalaryAdjustmentPagedResult
} from '../../shared/models/salary-adjustment.model';

@Injectable({
  providedIn: 'root'
})
export class SalaryAdjustmentService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/salary-adjustments`;
  private http = inject(HttpClient);

  /**
   * Get salary adjustments with filtering and pagination
   */
  getAdjustments(params: SalaryAdjustmentQueryParams = {}): Observable<SalaryAdjustmentPagedResult> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.employeeId) httpParams = httpParams.set('employeeId', params.employeeId.toString());
    if (params.branchId) httpParams = httpParams.set('branchId', params.branchId.toString());
    if (params.departmentId) httpParams = httpParams.set('departmentId', params.departmentId.toString());
    if (params.status !== undefined && params.status !== null) httpParams = httpParams.set('status', params.status.toString());
    if (params.adjustmentType !== undefined && params.adjustmentType !== null) httpParams = httpParams.set('adjustmentType', params.adjustmentType.toString());
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDescending) httpParams = httpParams.set('sortDescending', params.sortDescending.toString());
    return this.http.get<SalaryAdjustmentPagedResult>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get salary adjustment by ID
   */
  getAdjustmentById(id: number): Observable<SalaryAdjustment> {
    return this.http.get<SalaryAdjustment>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new salary adjustment
   */
  createAdjustment(request: CreateSalaryAdjustmentRequest): Observable<SalaryAdjustment> {
    return this.http.post<SalaryAdjustment>(this.apiUrl, request);
  }

  /**
   * Update an existing salary adjustment
   */
  updateAdjustment(id: number, request: UpdateSalaryAdjustmentRequest): Observable<SalaryAdjustment> {
    return this.http.put<SalaryAdjustment>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a salary adjustment
   */
  deleteAdjustment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Submit a draft adjustment for approval
   */
  submitAdjustment(id: number): Observable<SalaryAdjustment> {
    return this.http.post<SalaryAdjustment>(`${this.apiUrl}/${id}/submit`, {});
  }

  /**
   * Approve a submitted salary adjustment
   */
  approveAdjustment(id: number, comments?: string): Observable<SalaryAdjustment> {
    return this.http.post<SalaryAdjustment>(`${this.apiUrl}/${id}/approve`, { comments });
  }

  /**
   * Reject a submitted salary adjustment
   */
  rejectAdjustment(id: number, comments: string): Observable<SalaryAdjustment> {
    return this.http.post<SalaryAdjustment>(`${this.apiUrl}/${id}/reject`, { comments });
  }

  /**
   * Cancel a salary adjustment
   */
  cancelAdjustment(id: number, reason?: string): Observable<SalaryAdjustment> {
    return this.http.post<SalaryAdjustment>(`${this.apiUrl}/${id}/cancel`, { reason });
  }
}
