import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ProjectDto, ProjectDropdownDto, CreateProjectRequest, UpdateProjectRequest,
  ProjectTaskDto, ProjectTaskDropdownDto, CreateProjectTaskRequest, UpdateProjectTaskRequest,
  TimesheetPeriodDto, CreateTimesheetPeriodRequest, UpdateTimesheetPeriodRequest,
  TimesheetListDto, TimesheetDetailDto, CreateTimesheetRequest, UpdateTimesheetRequest,
  ApproveTimesheetRequest, RejectTimesheetRequest, AutoPopulateTimesheetRequest
} from '../../shared/models/timesheet.model';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  // ===== Projects =====

  getProjects(params?: any): Observable<{ data: ProjectDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.branchId) httpParams = httpParams.set('branchId', params.branchId);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.isActive !== undefined && params?.isActive !== null) httpParams = httpParams.set('isActive', params.isActive);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ProjectDto[]; totalCount: number }>(`${this.baseUrl}/projects`, { params: httpParams });
  }

  getProject(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.baseUrl}/projects/${id}`);
  }

  createProject(request: CreateProjectRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.baseUrl}/projects`, request);
  }

  updateProject(id: number, request: UpdateProjectRequest): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(`${this.baseUrl}/projects/${id}`, request);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/projects/${id}`);
  }

  getProjectDropdown(branchId?: number): Observable<ProjectDropdownDto[]> {
    let httpParams = new HttpParams();
    if (branchId) httpParams = httpParams.set('branchId', branchId);
    return this.http.get<ProjectDropdownDto[]>(`${this.baseUrl}/projects/dropdown`, { params: httpParams });
  }

  // ===== Project Tasks =====

  getProjectTasks(params?: any): Observable<{ data: ProjectTaskDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.projectId) httpParams = httpParams.set('projectId', params.projectId);
    if (params?.isActive !== undefined && params?.isActive !== null) httpParams = httpParams.set('isActive', params.isActive);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: ProjectTaskDto[]; totalCount: number }>(`${this.baseUrl}/project-tasks`, { params: httpParams });
  }

  getProjectTask(id: number): Observable<ProjectTaskDto> {
    return this.http.get<ProjectTaskDto>(`${this.baseUrl}/project-tasks/${id}`);
  }

  createProjectTask(request: CreateProjectTaskRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.baseUrl}/project-tasks`, request);
  }

  updateProjectTask(id: number, request: UpdateProjectTaskRequest): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(`${this.baseUrl}/project-tasks/${id}`, request);
  }

  deleteProjectTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/project-tasks/${id}`);
  }

  getProjectTaskDropdown(projectId?: number): Observable<ProjectTaskDropdownDto[]> {
    let httpParams = new HttpParams();
    if (projectId) httpParams = httpParams.set('projectId', projectId);
    return this.http.get<ProjectTaskDropdownDto[]>(`${this.baseUrl}/project-tasks/dropdown`, { params: httpParams });
  }

  // ===== Timesheet Periods =====

  getTimesheetPeriods(params?: any): Observable<{ data: TimesheetPeriodDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.branchId) httpParams = httpParams.set('branchId', params.branchId);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.periodType) httpParams = httpParams.set('periodType', params.periodType);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: TimesheetPeriodDto[]; totalCount: number }>(`${this.baseUrl}/timesheet-periods`, { params: httpParams });
  }

  getTimesheetPeriod(id: number): Observable<TimesheetPeriodDto> {
    return this.http.get<TimesheetPeriodDto>(`${this.baseUrl}/timesheet-periods/${id}`);
  }

  createTimesheetPeriod(request: CreateTimesheetPeriodRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.baseUrl}/timesheet-periods`, request);
  }

  updateTimesheetPeriod(id: number, request: UpdateTimesheetPeriodRequest): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(`${this.baseUrl}/timesheet-periods/${id}`, request);
  }

  deleteTimesheetPeriod(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/timesheet-periods/${id}`);
  }

  closeTimesheetPeriod(id: number): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheet-periods/${id}/close`, {});
  }

  lockTimesheetPeriod(id: number): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheet-periods/${id}/lock`, {});
  }

  // ===== Timesheets =====

  getTimesheets(params?: any): Observable<{ data: TimesheetListDto[]; totalCount: number }> {
    let httpParams = new HttpParams();
    if (params?.timesheetPeriodId) httpParams = httpParams.set('timesheetPeriodId', params.timesheetPeriodId);
    if (params?.employeeId) httpParams = httpParams.set('employeeId', params.employeeId);
    if (params?.status) httpParams = httpParams.set('status', params.status);
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.pageNumber) httpParams = httpParams.set('pageNumber', params.pageNumber);
    if (params?.pageSize) httpParams = httpParams.set('pageSize', params.pageSize);
    return this.http.get<{ data: TimesheetListDto[]; totalCount: number }>(`${this.baseUrl}/timesheets`, { params: httpParams });
  }

  getTimesheet(id: number): Observable<TimesheetDetailDto> {
    return this.http.get<TimesheetDetailDto>(`${this.baseUrl}/timesheets/${id}`);
  }

  createTimesheet(request: CreateTimesheetRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(`${this.baseUrl}/timesheets`, request);
  }

  updateTimesheet(id: number, request: UpdateTimesheetRequest): Observable<{ id: number }> {
    return this.http.put<{ id: number }>(`${this.baseUrl}/timesheets/${id}`, request);
  }

  deleteTimesheet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/timesheets/${id}`);
  }

  submitTimesheet(id: number): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheets/${id}/submit`, {});
  }

  approveTimesheet(id: number, request?: ApproveTimesheetRequest): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheets/${id}/approve`, request ?? {});
  }

  rejectTimesheet(id: number, request: RejectTimesheetRequest): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheets/${id}/reject`, request);
  }

  recallTimesheet(id: number): Observable<{ id: number; status: string }> {
    return this.http.post<{ id: number; status: string }>(`${this.baseUrl}/timesheets/${id}/recall`, {});
  }

  autoPopulateTimesheet(id: number, request: AutoPopulateTimesheetRequest): Observable<{ id: number; entriesCreated: number }> {
    return this.http.post<{ id: number; entriesCreated: number }>(`${this.baseUrl}/timesheets/${id}/auto-populate`, request);
  }
}
