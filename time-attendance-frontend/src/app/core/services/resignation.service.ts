import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Resignation,
  CreateResignationRequest,
  ApproveResignationRequest,
  RejectResignationRequest
} from '../../shared/models/resignation.model';

@Injectable({ providedIn: 'root' })
export class ResignationService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/resignations`;
  private http = inject(HttpClient);

  getAll(params?: any): Observable<Resignation[]> {
    return this.http.get<Resignation[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Resignation> {
    return this.http.get<Resignation>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateResignationRequest): Observable<Resignation> {
    return this.http.post<Resignation>(this.apiUrl, request);
  }

  approve(id: number, request: ApproveResignationRequest): Observable<Resignation> {
    return this.http.post<Resignation>(`${this.apiUrl}/${id}/approve`, request);
  }

  reject(id: number, request: RejectResignationRequest): Observable<Resignation> {
    return this.http.post<Resignation>(`${this.apiUrl}/${id}/reject`, request);
  }

  withdraw(id: number): Observable<Resignation> {
    return this.http.post<Resignation>(`${this.apiUrl}/${id}/withdraw`, {});
  }
}
