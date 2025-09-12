import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { 
  DepartmentDto, 
  CreateDepartmentRequest, 
  UpdateDepartmentRequest, 
  DepartmentFilter 
} from '../../shared/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/v1/departments`;

  getDepartments(filter: DepartmentFilter = {}): Observable<DepartmentDto[]> {
    let params = new HttpParams();
    
    if (filter.branchId !== undefined) {
      params = params.set('branchId', filter.branchId.toString());
    }
    if (filter.includeTree !== undefined) {
      params = params.set('includeTree', filter.includeTree.toString());
    }
    if (filter.isActive !== undefined) {
      params = params.set('isActive', filter.isActive.toString());
    }
    if (filter.search) {
      params = params.set('search', filter.search);
    }
    if (filter.parentDepartmentId !== undefined) {
      params = params.set('parentDepartmentId', filter.parentDepartmentId.toString());
    }
    if (filter.includeInactive !== undefined) {
      params = params.set('includeInactive', filter.includeInactive.toString());
    }

    return this.http.get<DepartmentDto[]>(this.baseUrl, { params });
  }

  getDepartmentTree(branchId?: number): Observable<DepartmentDto[]> {
    return this.getDepartments({
      branchId,
      includeTree: true,
      isActive: true
    });
  }

  getDepartmentById(id: number): Observable<DepartmentDto> {
    return this.http.get<DepartmentDto>(`${this.baseUrl}/${id}`);
  }

  createDepartment(department: CreateDepartmentRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, department);
  }

  updateDepartment(id: number, department: UpdateDepartmentRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, department);
  }

  deleteDepartment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Helper method to flatten tree structure for table view
  flattenDepartmentTree(departments: DepartmentDto[]): DepartmentDto[] {
    const result: DepartmentDto[] = [];
    
    const flatten = (items: DepartmentDto[], level: number = 0) => {
      for (const item of items) {
        result.push({ ...item, level });
        if (item.children && item.children.length > 0) {
          flatten(item.children, level + 1);
        }
      }
    };
    
    flatten(departments);
    return result;
  }

  // Helper method to build department path
  buildDepartmentPath(departmentId: number, allDepartments: DepartmentDto[]): string {
    const department = allDepartments.find(d => d.id === departmentId);
    if (!department) return '';
    
    if (!department.parentDepartmentId) {
      return department.name;
    }
    
    const parentPath = this.buildDepartmentPath(department.parentDepartmentId, allDepartments);
    return `${parentPath} > ${department.name}`;
  }
}