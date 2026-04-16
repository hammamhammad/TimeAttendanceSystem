import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../../core/i18n/i18n.service';
import {
  WorkflowDefinition,
  WorkflowEntityType,
  CreateWorkflowDefinitionRequest,
  UpdateWorkflowDefinitionRequest,
  PagedWorkflowResponse,
  WorkflowSystemAction,
  WorkflowSystemActionType,
  WorkflowValidationRuleInfo,
  RoleAssignmentStats
} from '../../../shared/models/workflow.model';

@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {
  private http = inject(HttpClient);
  private i18n = inject(I18nService);
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
      'Vacation': this.i18n.t('workflows.entity_type_vacation'),
      'Excuse': this.i18n.t('workflows.entity_type_excuse'),
      'RemoteWork': this.i18n.t('workflows.entity_type_remote_work'),
      'Overtime': this.i18n.t('workflows.entity_type_overtime'),
      'Timesheet': this.i18n.t('workflows.entity_type_timesheet'),
      'AttendanceCorrection': this.i18n.t('workflows.entity_type_attendance_correction')
    };
    return displayNames[entityType] || entityType;
  }

  /**
   * Get all entity types for dropdown
   * Limited to entity types that have default workflows with direct manager approval
   */
  getEntityTypes(): { value: WorkflowEntityType; label: string }[] {
    return [
      { value: 'Vacation', label: this.i18n.t('workflows.entity_type_vacation') },
      { value: 'Excuse', label: this.i18n.t('workflows.entity_type_excuse') },
      { value: 'RemoteWork', label: this.i18n.t('workflows.entity_type_remote_work') },
      { value: 'AttendanceCorrection', label: this.i18n.t('workflows.entity_type_attendance_correction') }
    ];
  }

  // =====================================================================
  // v13.6 — Workflow Routing Hardening
  // =====================================================================

  /** List of registered IWorkflowValidationRule codes, for the step-config form. */
  getValidationRules(): Observable<WorkflowValidationRuleInfo[]> {
    return this.http.get<WorkflowValidationRuleInfo[]>(`${this.baseUrl}/validation-rules`);
  }

  /** Browse the system-action audit trail (timeouts, escalations, fallback routing). */
  getSystemActions(
    workflowInstanceId?: number,
    actionType?: WorkflowSystemActionType,
    fromDate?: string,
    toDate?: string,
    page: number = 1,
    pageSize: number = 50
  ): Observable<{ total: number; page: number; pageSize: number; items: WorkflowSystemAction[] }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    if (workflowInstanceId !== undefined) params = params.set('workflowInstanceId', workflowInstanceId.toString());
    if (actionType !== undefined) params = params.set('actionType', actionType);
    if (fromDate) params = params.set('fromDate', fromDate);
    if (toDate) params = params.set('toDate', toDate);
    return this.http.get<{ total: number; page: number; pageSize: number; items: WorkflowSystemAction[] }>(
      `${this.baseUrl}/system-actions`, { params });
  }

  /** Cursor state + per-candidate pending counts for a role. Operational debugging. */
  getRoleAssignmentStats(roleId: number): Observable<RoleAssignmentStats> {
    const params = new HttpParams().set('roleId', roleId.toString());
    return this.http.get<RoleAssignmentStats>(`${this.baseUrl}/role-assignment-stats`, { params });
  }
}
