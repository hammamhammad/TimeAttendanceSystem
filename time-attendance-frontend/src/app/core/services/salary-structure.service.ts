import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  SalaryStructure,
  CreateSalaryStructureRequest,
  UpdateSalaryStructureRequest,
  SalaryStructureDropdown
} from '../../shared/models/salary-structure.model';

@Injectable({ providedIn: 'root' })
export class SalaryStructureService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/salary-structures`;
  private http = inject(HttpClient);

  getAll(params?: any): Observable<SalaryStructure[]> {
    return this.http.get<SalaryStructure[]>(this.apiUrl, { params });
  }

  getById(id: number): Observable<SalaryStructure> {
    return this.http.get<SalaryStructure>(`${this.apiUrl}/${id}`);
  }

  create(request: CreateSalaryStructureRequest): Observable<SalaryStructure> {
    return this.http.post<SalaryStructure>(this.apiUrl, request);
  }

  update(id: number, request: UpdateSalaryStructureRequest): Observable<SalaryStructure> {
    return this.http.put<SalaryStructure>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleStatus(id: number): Observable<SalaryStructure> {
    return this.http.patch<SalaryStructure>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  getDropdown(branchId?: number): Observable<SalaryStructureDropdown[]> {
    const params: Record<string, string> = {};
    if (branchId) params['branchId'] = branchId.toString();
    return this.http.get<SalaryStructureDropdown[]>(`${this.apiUrl}/dropdown`, { params });
  }
}
