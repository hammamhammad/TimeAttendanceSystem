import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FilterDescriptor } from '../../shared/utils/filter-engine/types';

export interface GridSort {
  field: string;
  descending: boolean;
}

export interface GridPageQuery {
  page: number;
  pageSize: number;
  search?: string;
  sort?: GridSort;
  filter?: {
    filters: Array<{
      field: string;
      operator: string;
      value?: string;
      value2?: string;
    }>;
  };
}

export interface GridPageResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

/**
 * Generic paged-query client for any list endpoint that implements the ERP
 * grid contract (`POST /{entity}/query` accepting PageQuery).
 *
 * Usage (in a list-page service):
 *   this.grid.query<EmployeeDto>('employees', {
 *     page: 1, pageSize: 25,
 *     sort: { field: 'fullName', descending: false },
 *     filter: { filters: [...] }
 *   }).subscribe(...)
 */
@Injectable({ providedIn: 'root' })
export class GridQueryService {
  private http = inject(HttpClient);

  query<T>(entity: string, q: GridPageQuery): Observable<GridPageResult<T>> {
    const url = `${environment.apiUrl}/api/v1/${entity}/query`;
    return this.http.post<GridPageResult<T>>(url, this.toApiShape(q));
  }

  getFilterOptions(entity: string, field: string, search?: string, limit = 50) {
    const qs = new URLSearchParams({ entity, field, limit: String(limit) });
    if (search) qs.set('search', search);
    return this.http.get<Array<{ label: string; value: string }>>(
      `${environment.apiUrl}/api/v1/filter-options?${qs.toString()}`
    );
  }

  /** Maps FilterDescriptor[] → the backend's FilterSpec shape. */
  static toFilterSpec(filters: FilterDescriptor[]) {
    return {
      filters: filters.map(f => ({
        field: f.field,
        operator: this.operatorToEnum(f.operator),
        value: f.value == null ? undefined : String(f.value),
        value2: f.value2 == null ? undefined : String(f.value2),
      }))
    };
  }

  private toApiShape(q: GridPageQuery) {
    return {
      page: q.page,
      pageSize: q.pageSize,
      search: q.search,
      sort: q.sort ? { field: q.sort.field, descending: q.sort.descending } : undefined,
      filter: q.filter
    };
  }

  private static operatorToEnum(op: string): string {
    // Map camelCase → PascalCase enum value expected by ASP.NET JSON binding
    return op.charAt(0).toUpperCase() + op.slice(1);
  }
}
