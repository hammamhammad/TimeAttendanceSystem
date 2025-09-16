import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift, PagedResult } from '../../shared/models/shift.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/shifts`;

  getShifts(page: number = 1, pageSize: number = 100, search?: string): Observable<PagedResult<Shift>> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      httpParams = httpParams.set('search', search);
    }

    return this.http.get<PagedResult<Shift>>(this.baseUrl, { params: httpParams });
  }

  getShiftById(id: number): Observable<Shift> {
    return this.http.get<Shift>(`${this.baseUrl}/${id}`);
  }

  getActiveShifts(): Observable<PagedResult<Shift>> {
    // Get only active shifts for assignment selection
    return this.getShifts(1, 1000, ''); // Get up to 1000 active shifts
  }
}