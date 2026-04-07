import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ShiftSwapRequest } from '../../shared/models/shift-swap.model';

interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ShiftSwapService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/shift-swap-requests`;

  getAll(params?: any): Observable<PagedResponse<ShiftSwapRequest>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PagedResponse<ShiftSwapRequest>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ShiftSwapRequest> {
    return this.http.get<ShiftSwapRequest>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  partnerApprove(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/partner-approve`, {});
  }

  partnerReject(id: number, rejectionReason: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/partner-reject`, { rejectionReason });
  }
}
