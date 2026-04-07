import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CompensatoryOff } from '../../shared/models/compensatory-off.model';

interface PagedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompensatoryOffService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/compensatory-offs`;

  getAll(params?: any): Observable<PagedResponse<CompensatoryOff>> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<PagedResponse<CompensatoryOff>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<CompensatoryOff> {
    return this.http.get<CompensatoryOff>(`${this.baseUrl}/${id}`);
  }

  getAvailable(employeeId: number): Observable<CompensatoryOff[]> {
    return this.http.get<CompensatoryOff[]>(`${this.baseUrl}/available/${employeeId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  cancel(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/cancel`, {});
  }
}
