import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Termination,
  CreateTerminationRequest
} from '../../shared/models/termination.model';

@Injectable({ providedIn: 'root' })
export class TerminationService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/terminations`;
  private http = inject(HttpClient);

  getAll(params?: any): Observable<Termination[]> {
    return this.http.get<Termination[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Termination> {
    return this.http.get<Termination>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateTerminationRequest): Observable<Termination> {
    return this.http.post<Termination>(this.apiUrl, request);
  }
}
