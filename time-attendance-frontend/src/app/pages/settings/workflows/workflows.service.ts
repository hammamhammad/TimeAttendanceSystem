import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  WorkflowDefinition,
  WorkflowEntityType,
  CreateWorkflowDefinitionRequest,
  UpdateWorkflowDefinitionRequest,
  PagedWorkflowResponse
} from '../../../shared/models/workflow.model';

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

    // Backend returns PagedResult directly (not wrapped in ApiResponse)
    return this.http.get<PagedWorkflowResponse<WorkflowDefinition>>(this.baseUrl, { params });
  }

  /**
   * Get a single workflow definition by ID
   */
  getWorkflowDefinitionById(id: number): Observable<WorkflowDefinition> {
    // Backend returns WorkflowDefinitionDto directly
    return this.http.get<WorkflowDefinition>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new workflow definition
   */
  createWorkflowDefinition(request: CreateWorkflowDefinitionRequest): Observable<{ id: number }> {
    // Backend returns { id: number } directly
    return this.http.post<{ id: number }>(this.baseUrl, request);
  }

  /**
   * Update an existing workflow definition
   */
  updateWorkflowDefinition(id: number, request: UpdateWorkflowDefinitionRequest): Observable<void> {
    // Backend returns NoContent (204)
    return this.http.put<void>(`${this.baseUrl}/${id}`, request);
  }

  /**
   * Delete a workflow definition (soft delete)
   */
  deleteWorkflowDefinition(id: number): Observable<void> {
    // Backend returns NoContent (204)
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Activate a workflow definition
   */
  activateWorkflowDefinition(id: number): Observable<void> {
    // Backend returns NoContent (204)
    return this.http.post<void>(`${this.baseUrl}/${id}/activate`, {});
  }

  /**
   * Deactivate a workflow definition
   */
  deactivateWorkflowDefinition(id: number): Observable<void> {
    // Backend returns NoContent (204)
    return this.http.post<void>(`${this.baseUrl}/${id}/deactivate`, {});
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
   * Limited to entity types that have default workflows with direct manager approval
   */
  getEntityTypes(): { value: WorkflowEntityType; label: string }[] {
    return [
      { value: 'Vacation', label: 'Vacation Request' },
      { value: 'Excuse', label: 'Excuse Request' },
      { value: 'RemoteWork', label: 'Remote Work Request' },
      { value: 'AttendanceCorrection', label: 'Attendance Correction' }
    ];
  }
}
