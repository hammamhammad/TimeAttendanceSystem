import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  JobGrade,
  CreateJobGradeRequest,
  UpdateJobGradeRequest,
  JobGradeQueryParams,
  JobGradePagedResult,
  JobGradeDropdownItem
} from '../../shared/models/job-grade.model';

@Injectable({
  providedIn: 'root'
})
export class JobGradeService {
  private readonly apiUrl = `${environment.apiUrl}/api/v1/job-grades`;
  private http = inject(HttpClient);

  /**
   * Get job grades with filtering and pagination
   */
  getJobGrades(params: JobGradeQueryParams = {}): Observable<JobGradePagedResult> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('pageNumber', params.page.toString());
    if (params.pageSize) httpParams = httpParams.set('pageSize', params.pageSize.toString());
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.isActive !== undefined && params.isActive !== null) httpParams = httpParams.set('isActive', params.isActive.toString());
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortDescending) httpParams = httpParams.set('sortDescending', params.sortDescending.toString());
    return this.http.get<JobGradePagedResult>(this.apiUrl, { params: httpParams });
  }

  /**
   * Get job grade by ID
   */
  getJobGradeById(id: number): Observable<JobGrade> {
    return this.http.get<JobGrade>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new job grade
   */
  createJobGrade(request: CreateJobGradeRequest): Observable<JobGrade> {
    return this.http.post<JobGrade>(this.apiUrl, request);
  }

  /**
   * Update an existing job grade
   */
  updateJobGrade(id: number, request: UpdateJobGradeRequest): Observable<JobGrade> {
    return this.http.put<JobGrade>(`${this.apiUrl}/${id}`, request);
  }

  /**
   * Delete a job grade
   */
  deleteJobGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Get job grades dropdown list for select controls
   */
  getDropdown(): Observable<JobGradeDropdownItem[]> {
    return this.http.get<JobGradeDropdownItem[]>(`${this.apiUrl}/dropdown`);
  }
}
