import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RemoteWorkRequest,
  RemoteWorkRequestStatus,
  CreateRemoteWorkRequest,
  UpdateRemoteWorkRequest,
  ApproveRemoteWorkRequest
} from '../models/remote-work-request.model';

@Injectable({
  providedIn: 'root'
})
export class RemoteWorkRequestsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/v1/remote-work-requests`;
  private readonly portalApiUrl = `${environment.apiUrl}/api/v1/portal`;

  /**
   * Get all remote work requests (admin endpoint - DO NOT USE in self-service portal)
   * @deprecated Use getMyRequests() for self-service portal
   */
  getAll(
    employeeId?: number,
    status?: RemoteWorkRequestStatus,
    startDate?: string,
    endDate?: string
  ): Observable<RemoteWorkRequest[]> {
    let params = new HttpParams();
    if (employeeId) {
      params = params.set('employeeId', employeeId.toString());
    }
    if (status !== undefined) {
      params = params.set('status', status.toString());
    }
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<RemoteWorkRequest[]>(this.apiUrl, { params });
  }

  /**
   * Get current employee's remote work requests (secure portal endpoint).
   * Only returns requests belonging to the authenticated user.
   */
  getMyRequests(page: number = 1, pageSize: number = 20): Observable<{
    items: RemoteWorkRequest[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<{
      items: RemoteWorkRequest[];
      totalCount: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }>(`${this.portalApiUrl}/my-remote-work-requests`, { params });
  }

  getById(id: number): Observable<RemoteWorkRequest> {
    return this.http.get<RemoteWorkRequest>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get a remote work request by ID for the current employee (from portal endpoint).
   * Returns the request with workflow status and approval history.
   */
  getMyById(id: number): Observable<RemoteWorkRequest> {
    return this.http.get<RemoteWorkRequest>(`${this.portalApiUrl}/my-remote-work-requests/${id}`);
  }

  create(request: CreateRemoteWorkRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, request);
  }

  update(id: number, request: UpdateRemoteWorkRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  approve(request: ApproveRemoteWorkRequest): Observable<{ isSuccess: boolean; value?: boolean; error?: string }> {
    return this.http.patch<{ isSuccess: boolean; value?: boolean; error?: string }>(
      `${this.apiUrl}/${request.requestId}/approve`,
      request
    );
  }

  cancel(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/cancel`, {});
  }
}
