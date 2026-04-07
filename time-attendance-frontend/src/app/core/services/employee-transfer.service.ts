import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  EmployeeTransfer,
  CreateEmployeeTransferRequest,
  UpdateEmployeeTransferRequest,
  TransferQueryParams,
  TransferPagedResult
} from '../../shared/models/employee-transfer.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTransferService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/employee-transfers`;
  private http = inject(HttpClient);

  /**
   * Get transfers with filtering and pagination
   */
  getTransfers(params: TransferQueryParams = {}): Observable<TransferPagedResult> {
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
    return this.http.get<TransferPagedResult>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get transfer by ID
   */
  getTransferById(id: number): Observable<EmployeeTransfer> {
    return this.http.get<EmployeeTransfer>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new transfer
   */
  createTransfer(request: CreateEmployeeTransferRequest): Observable<EmployeeTransfer> {
    return this.http.post<EmployeeTransfer>(this.apiUrl, request);
  }

  /**
   * Update an existing transfer
   */
  updateTransfer(id: number, request: UpdateEmployeeTransferRequest): Observable<EmployeeTransfer> {
    return this.http.put<EmployeeTransfer>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a transfer
   */
  deleteTransfer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Approve a pending transfer
   */
  approveTransfer(id: number, comments?: string): Observable<EmployeeTransfer> {
    return this.http.post<EmployeeTransfer>(`${this.apiUrl}/${id}/approve`, { comments });
  }

  /**
   * Reject a pending transfer
   */
  rejectTransfer(id: number, comments: string): Observable<EmployeeTransfer> {
    return this.http.post<EmployeeTransfer>(`${this.apiUrl}/${id}/reject`, { comments });
  }

  /**
   * Complete an approved transfer
   */
  completeTransfer(id: number): Observable<EmployeeTransfer> {
    return this.http.post<EmployeeTransfer>(`${this.apiUrl}/${id}/complete`, {});
  }

  /**
   * Cancel a transfer
   */
  cancelTransfer(id: number, reason?: string): Observable<EmployeeTransfer> {
    return this.http.post<EmployeeTransfer>(`${this.apiUrl}/${id}/cancel`, { reason });
  }
}
