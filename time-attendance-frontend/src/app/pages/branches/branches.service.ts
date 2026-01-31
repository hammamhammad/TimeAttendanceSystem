import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Branch, BranchesResponse, CreateBranchRequest, UpdateBranchRequest, UpdateBranchCoordinatesRequest } from '../../shared/models/branch.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/branches`;

  getBranches(
    page: number = 1, 
    pageSize: number = 10, 
    search?: string, 
    isActive?: boolean
  ): Observable<BranchesResponse> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      httpParams = httpParams.set('search', search);
    }

    if (isActive !== undefined) {
      httpParams = httpParams.set('isActive', isActive.toString());
    }

    return this.http.get<BranchesResponse>(this.baseUrl, { params: httpParams });
  }

  createBranch(branch: CreateBranchRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.baseUrl, branch);
  }

  updateBranch(id: number, branch: UpdateBranchRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getBranchesForDropdown(): Observable<Branch[]> {
    return this.http.get<BranchesResponse>(`${this.baseUrl}?pageSize=100&isActive=true`)
      .pipe(
        map(response => response.items)
      );
  }

  getBranchById(id: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/${id}`);
  }

  updateBranchCoordinates(id: number, coordinates: UpdateBranchCoordinatesRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/coordinates`, coordinates);
  }
}