import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  RemoteWorkPolicy,
  CreateRemoteWorkPolicyRequest,
  UpdateRemoteWorkPolicyRequest
} from '../models/remote-work-policy.model';

@Injectable({
  providedIn: 'root'
})
export class RemoteWorkPoliciesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/v1/RemoteWorkPolicies`;

  getAll(branchId?: number, isActive?: boolean): Observable<RemoteWorkPolicy[]> {
    let params = new HttpParams();
    if (branchId) {
      params = params.set('branchId', branchId.toString());
    }
    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }
    return this.http.get<RemoteWorkPolicy[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<RemoteWorkPolicy> {
    return this.http.get<RemoteWorkPolicy>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateRemoteWorkPolicyRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, request);
  }

  update(id: number, request: UpdateRemoteWorkPolicyRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleStatus(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/toggle-status`, {});
  }
}
