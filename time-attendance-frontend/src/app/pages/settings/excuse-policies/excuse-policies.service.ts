import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ExcusePolicy, CreateExcusePolicyRequest, UpdateExcusePolicyRequest } from '../../../shared/models/excuse-policy.model';

@Injectable({
  providedIn: 'root'
})
export class ExcusePoliciesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/excuse-policies`;

  /**
   * Get excuse policies with pagination and filtering
   */
  getExcusePolicies(
    pageNumber: number = 1,
    pageSize: number = 10,
    branchId?: number | null,
    isActive?: boolean | null
  ): Observable<PagedResponse<ExcusePolicy>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }

    if (isActive !== null && isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<ApiResponse<PagedResponse<ExcusePolicy>>>(this.baseUrl, { params })
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Get a single excuse policy by ID
   */
  getExcusePolicyById(id: number): Observable<ExcusePolicy> {
    return this.http.get<ApiResponse<ExcusePolicy>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Create a new excuse policy
   */
  createExcusePolicy(request: CreateExcusePolicyRequest): Observable<number> {
    return this.http.post<ApiResponse<number>>(this.baseUrl, request)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Update an existing excuse policy
   */
  updateExcusePolicy(id: number, request: UpdateExcusePolicyRequest): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/${id}`, request)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Toggle the active status of an excuse policy
   */
  toggleExcusePolicyStatus(id: number): Observable<boolean> {
    return this.http.patch<ApiResponse<boolean>>(`${this.baseUrl}/${id}/toggle-status`, {})
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Delete an excuse policy (soft delete)
   */
  deleteExcusePolicy(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.value)
      );
  }
}

/**
 * API response wrapper (matches backend Result<T> structure)
 */
export interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  error?: string;
}

/**
 * Paged response structure
 */
export interface PagedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
