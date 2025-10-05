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

  getById(id: number): Observable<RemoteWorkRequest> {
    return this.http.get<RemoteWorkRequest>(`${this.apiUrl}/${id}`);
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
