import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  WorkflowDefinition,
  WorkflowEntityType,
  CreateWorkflowDefinitionRequest,
  UpdateWorkflowDefinitionRequest,
  PagedWorkflowResponse
} from '../../../shared/models/workflow.model';

/**
 * API response wrapper (matches backend Result<T> structure)
 */
interface ApiResponse<T> {
  value: T;
  isSuccess: boolean;
  isFailure: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api/v1/workflows`;

  /**
   * Get workflow definitions with pagination and filtering
   */
  getWorkflowDefinitions(
    page: number = 1,
    pageSize: number = 10,
    entityType?: WorkflowEntityType | null,
    branchId?: number | null,
    isActive?: boolean | null
  ): Observable<PagedWorkflowResponse<WorkflowDefinition>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (entityType !== null && entityType !== undefined) {
      params = params.set('entityType', entityType);
    }

    if (branchId !== null && branchId !== undefined) {
      params = params.set('branchId', branchId.toString());
    }

    if (isActive !== null && isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }

    return this.http.get<ApiResponse<PagedWorkflowResponse<WorkflowDefinition>>>(this.baseUrl, { params })
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Get a single workflow definition by ID
   */
  getWorkflowDefinitionById(id: number): Observable<WorkflowDefinition> {
    return this.http.get<ApiResponse<WorkflowDefinition>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Create a new workflow definition
   */
  createWorkflowDefinition(request: CreateWorkflowDefinitionRequest): Observable<number> {
    return this.http.post<ApiResponse<number>>(this.baseUrl, request)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Update an existing workflow definition
   */
  updateWorkflowDefinition(id: number, request: UpdateWorkflowDefinitionRequest): Observable<boolean> {
    return this.http.put<ApiResponse<boolean>>(`${this.baseUrl}/${id}`, request)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Delete a workflow definition (soft delete)
   */
  deleteWorkflowDefinition(id: number): Observable<boolean> {
    return this.http.delete<ApiResponse<boolean>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Activate a workflow definition
   */
  activateWorkflowDefinition(id: number): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/${id}/activate`, {})
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Deactivate a workflow definition
   */
  deactivateWorkflowDefinition(id: number): Observable<boolean> {
    return this.http.post<ApiResponse<boolean>>(`${this.baseUrl}/${id}/deactivate`, {})
      .pipe(
        map(response => response.value)
      );
  }

  /**
   * Get entity type display name
   */
  getEntityTypeDisplayName(entityType: WorkflowEntityType): string {
    const displayNames: Record<WorkflowEntityType, string> = {
      'Vacation': 'Vacation Request',
      'Excuse': 'Excuse Request',
      'RemoteWork': 'Remote Work Request',
      'Overtime': 'Overtime Request',
      'Timesheet': 'Timesheet',
      'AttendanceCorrection': 'Attendance Correction'
    };
    return displayNames[entityType] || entityType;
  }

  /**
   * Get all entity types for dropdown
   */
  getEntityTypes(): { value: WorkflowEntityType; label: string }[] {
    return [
      { value: 'Vacation', label: 'Vacation Request' },
      { value: 'Excuse', label: 'Excuse Request' },
      { value: 'RemoteWork', label: 'Remote Work Request' },
      { value: 'Overtime', label: 'Overtime Request' },
      { value: 'Timesheet', label: 'Timesheet' },
      { value: 'AttendanceCorrection', label: 'Attendance Correction' }
    ];
  }
}
