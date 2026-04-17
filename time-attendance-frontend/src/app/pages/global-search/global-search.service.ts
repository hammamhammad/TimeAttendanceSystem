import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface GlobalSearchItem {
  entityType: 'Employee' | 'LoanApplication' | 'ExpenseClaim' | 'BenefitEnrollment' | 'LetterRequest' | 'OperationalFailureAlert';
  entityId: number;
  title: string;
  subtitle: string | null;
  employeeId: number | null;
  branchId: number | null;
  status: string | null;
}

export interface GlobalSearchResponse {
  query: string;
  totalCount: number;
  items: GlobalSearchItem[];
}

/**
 * Phase 4 (v14.4): HTTP client for the Phase 3 GET /api/v1/search endpoint.
 */
@Injectable({ providedIn: 'root' })
export class GlobalSearchService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/api/v1/search`;

  search(q: string, types?: string[] | null, perType: number = 10): Observable<GlobalSearchResponse> {
    let params = new HttpParams().set('q', q).set('perType', String(perType));
    if (types && types.length > 0) params = params.set('types', types.join(','));
    return this.http.get<GlobalSearchResponse>(this.url, { params });
  }
}
