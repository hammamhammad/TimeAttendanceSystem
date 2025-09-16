import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Shift,
  ShiftsResponse,
  CreateShiftRequest,
  UpdateShiftRequest
} from '../../shared/models/shift.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/shifts`;

  getShifts(
    page: number = 1,
    pageSize: number = 10,
    search?: string
  ): Observable<ShiftsResponse> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      httpParams = httpParams.set('search', search);
    }

    return this.http.get<ShiftsResponse>(this.baseUrl, { params: httpParams });
  }

  getShiftById(id: number): Observable<Shift> {
    return this.http.get<Shift>(`${this.baseUrl}/${id}`);
  }

  createShift(shift: CreateShiftRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, shift);
  }

  updateShift(id: number, shift: UpdateShiftRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, shift);
  }

  deleteShift(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}