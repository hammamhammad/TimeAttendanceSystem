import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AllowanceType,
  CreateAllowanceTypeRequest,
  UpdateAllowanceTypeRequest,
  AllowancePolicy,
  CreateAllowancePolicyRequest,
  UpdateAllowancePolicyRequest,
  AllowanceAssignment,
  CreateAllowanceAssignmentRequest,
  AllowanceRequest
} from '../../shared/models/allowance.model';



interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/v1`;

  // =====================
  // Allowance Types
  // =====================

  getAllowanceTypes(
    pageNumber: number = 1,
    pageSize: number = 10,
    branchId?: number,
    isActive?: boolean,
    search?: string
  ): Observable<PagedResponse<AllowanceType>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    if (isActive !== null && isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PagedResponse<AllowanceType>>(`${this.apiUrl}/allowance-types`, { params })
      ;
  }

  getAllowanceType(id: number): Observable<AllowanceType> {
    return this.http.get<AllowanceType>(`${this.apiUrl}/allowance-types/${id}`)
      ;
  }

  createAllowanceType(data: CreateAllowanceTypeRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/allowance-types`, data)
      ;
  }

  updateAllowanceType(id: number, data: UpdateAllowanceTypeRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/allowance-types/${id}`, data)
      ;
  }

  deleteAllowanceType(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/allowance-types/${id}`)
      ;
  }

  toggleAllowanceTypeStatus(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-types/${id}/toggle-status`, {})
      ;
  }

  getAllowanceTypeDropdown(): Observable<{ id: number; name: string; code: string }[]> {
    return this.http.get<{ id: number; name: string; code: string }[]>(`${this.apiUrl}/allowance-types/dropdown`);
  }

  // =====================
  // Allowance Policies
  // =====================

  getAllowancePolicies(
    pageNumber: number = 1,
    pageSize: number = 10,
    branchId?: number,
    allowanceTypeId?: number,
    isActive?: boolean
  ): Observable<PagedResponse<AllowancePolicy>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }
    if (allowanceTypeId !== null && allowanceTypeId !== undefined) {
      params = params.set('allowanceTypeId', allowanceTypeId.toString());
    }
    if (isActive !== null && isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<PagedResponse<AllowancePolicy>>(`${this.apiUrl}/allowance-policies`, { params })
      ;
  }

  getAllowancePolicy(id: number): Observable<AllowancePolicy> {
    return this.http.get<AllowancePolicy>(`${this.apiUrl}/allowance-policies/${id}`)
      ;
  }

  createAllowancePolicy(data: CreateAllowancePolicyRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/allowance-policies`, data)
      ;
  }

  updateAllowancePolicy(id: number, data: UpdateAllowancePolicyRequest): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/allowance-policies/${id}`, data)
      ;
  }

  deleteAllowancePolicy(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/allowance-policies/${id}`)
      ;
  }

  toggleAllowancePolicyStatus(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-policies/${id}/toggle-status`, {})
      ;
  }

  // =====================
  // Allowance Assignments
  // =====================

  getAllowanceAssignments(
    pageNumber: number = 1,
    pageSize: number = 10,
    employeeId?: number,
    allowanceTypeId?: number,
    status?: string
  ): Observable<PagedResponse<AllowanceAssignment>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (employeeId !== null && employeeId !== undefined) {
      params = params.set('employeeId', employeeId.toString());
    }
    if (allowanceTypeId !== null && allowanceTypeId !== undefined) {
      params = params.set('allowanceTypeId', allowanceTypeId.toString());
    }
    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<PagedResponse<AllowanceAssignment>>(`${this.apiUrl}/allowance-assignments`, { params })
      ;
  }

  getAllowanceAssignment(id: number): Observable<AllowanceAssignment> {
    return this.http.get<AllowanceAssignment>(`${this.apiUrl}/allowance-assignments/${id}`)
      ;
  }

  getEmployeeAllowances(employeeId: number): Observable<AllowanceAssignment[]> {
    return this.http.get<AllowanceAssignment[]>(`${this.apiUrl}/allowance-assignments/employee/${employeeId}`)
      ;
  }

  assignAllowance(data: CreateAllowanceAssignmentRequest): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/allowance-assignments`, data)
      ;
  }

  suspendAllowance(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-assignments/${id}/suspend`, {})
      ;
  }

  resumeAllowance(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-assignments/${id}/resume`, {})
      ;
  }

  cancelAllowance(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-assignments/${id}/cancel`, {})
      ;
  }

  getEmployeeAllowanceSummary(employeeId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/allowance-assignments/employee/${employeeId}/summary`)
      ;
  }

  // =====================
  // Allowance Requests
  // =====================

  getAllowanceRequests(
    pageNumber: number = 1,
    pageSize: number = 10,
    employeeId?: number,
    status?: string,
    requestType?: string
  ): Observable<PagedResponse<AllowanceRequest>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (employeeId !== null && employeeId !== undefined) {
      params = params.set('employeeId', employeeId.toString());
    }
    if (status) {
      params = params.set('status', status);
    }
    if (requestType) {
      params = params.set('requestType', requestType);
    }

    return this.http.get<PagedResponse<AllowanceRequest>>(`${this.apiUrl}/allowance-requests`, { params })
      ;
  }

  getAllowanceRequest(id: number): Observable<AllowanceRequest> {
    return this.http.get<AllowanceRequest>(`${this.apiUrl}/allowance-requests/${id}`)
      ;
  }

  createAllowanceRequest(data: any): Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/allowance-requests`, data)
      ;
  }

  approveAllowanceRequest(id: number, comments?: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-requests/${id}/approve`, { comments })
      ;
  }

  rejectAllowanceRequest(id: number, reason: string): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-requests/${id}/reject`, { reason })
      ;
  }

  withdrawAllowanceRequest(id: number): Observable<boolean> {
    return this.http.patch<boolean>(`${this.apiUrl}/allowance-requests/${id}/withdraw`, {})
      ;
  }

  getMyAllowanceRequests(): Observable<AllowanceRequest[]> {
    return this.http.get<AllowanceRequest[]>(`${this.apiUrl}/allowance-requests/my-requests`)
      ;
  }

  getPendingAllowanceRequests(): Observable<AllowanceRequest[]> {
    return this.http.get<AllowanceRequest[]>(`${this.apiUrl}/allowance-requests/pending`)
      ;
  }
}
