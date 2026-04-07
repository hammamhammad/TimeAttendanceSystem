import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Grievance, CreateGrievanceRequest, UpdateGrievanceRequest, GrievanceQueryParams, AddGrievanceNoteRequest,
  DisciplinaryAction, CreateDisciplinaryActionRequest, UpdateDisciplinaryActionRequest, DisciplinaryActionQueryParams,
  AppealRequest, ResolveAppealRequest, DisciplinaryEmployeeSummary,
  Investigation, CreateInvestigationRequest, UpdateInvestigationRequest, InvestigationQueryParams,
  AddInvestigationNoteRequest, CompleteInvestigationRequest,
  CounselingRecord, CreateCounselingRecordRequest, UpdateCounselingRecordRequest, CounselingRecordQueryParams,
  EmployeeRelationsPagedResult
} from '../../shared/models/employee-relations.model';

@Injectable({ providedIn: 'root' })
export class EmployeeRelationsService {
  private readonly baseUrl = `${environment.apiUrl}/api/v1`;
  private http = inject(HttpClient);

  // ============================================================
  // Grievances
  // ============================================================

  getGrievances(params?: GrievanceQueryParams): Observable<EmployeeRelationsPagedResult<Grievance>> {
    return this.http.get<EmployeeRelationsPagedResult<Grievance>>(`${this.baseUrl}/grievances`, { params: params as any });
  }

  getGrievance(id: number): Observable<Grievance> {
    return this.http.get<Grievance>(`${this.baseUrl}/grievances/${id}`);
  }

  createGrievance(req: CreateGrievanceRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances`, req);
  }

  updateGrievance(id: number, req: UpdateGrievanceRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/grievances/${id}`, req);
  }

  deleteGrievance(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/grievances/${id}`);
  }

  assignGrievance(id: number, assignedToEmployeeId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances/${id}/assign`, { assignedToEmployeeId });
  }

  escalateGrievance(id: number, reason?: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances/${id}/escalate`, { reason });
  }

  resolveGrievance(id: number, resolutionNotes: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances/${id}/resolve`, { resolutionNotes });
  }

  closeGrievance(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances/${id}/close`, {});
  }

  addGrievanceNote(id: number, req: AddGrievanceNoteRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/grievances/${id}/notes`, req);
  }

  // ============================================================
  // Disciplinary Actions
  // ============================================================

  getDisciplinaryActions(params?: DisciplinaryActionQueryParams): Observable<EmployeeRelationsPagedResult<DisciplinaryAction>> {
    return this.http.get<EmployeeRelationsPagedResult<DisciplinaryAction>>(`${this.baseUrl}/disciplinary-actions`, { params: params as any });
  }

  getDisciplinaryAction(id: number): Observable<DisciplinaryAction> {
    return this.http.get<DisciplinaryAction>(`${this.baseUrl}/disciplinary-actions/${id}`);
  }

  createDisciplinaryAction(req: CreateDisciplinaryActionRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions`, req);
  }

  updateDisciplinaryAction(id: number, req: UpdateDisciplinaryActionRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/disciplinary-actions/${id}`, req);
  }

  deleteDisciplinaryAction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/disciplinary-actions/${id}`);
  }

  submitDisciplinaryAction(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions/${id}/submit`, {});
  }

  approveDisciplinaryAction(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions/${id}/approve`, {});
  }

  acknowledgeDisciplinaryAction(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions/${id}/acknowledge`, {});
  }

  appealDisciplinaryAction(id: number, req: AppealRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions/${id}/appeal`, req);
  }

  resolveAppeal(id: number, req: ResolveAppealRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/disciplinary-actions/${id}/resolve-appeal`, req);
  }

  getEmployeeDisciplinarySummary(employeeId: number): Observable<DisciplinaryEmployeeSummary> {
    return this.http.get<DisciplinaryEmployeeSummary>(`${this.baseUrl}/disciplinary-actions/employee/${employeeId}/summary`);
  }

  // ============================================================
  // Investigations
  // ============================================================

  getInvestigations(params?: InvestigationQueryParams): Observable<EmployeeRelationsPagedResult<Investigation>> {
    return this.http.get<EmployeeRelationsPagedResult<Investigation>>(`${this.baseUrl}/investigations`, { params: params as any });
  }

  getInvestigation(id: number): Observable<Investigation> {
    return this.http.get<Investigation>(`${this.baseUrl}/investigations/${id}`);
  }

  createInvestigation(req: CreateInvestigationRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/investigations`, req);
  }

  updateInvestigation(id: number, req: UpdateInvestigationRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/investigations/${id}`, req);
  }

  deleteInvestigation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/investigations/${id}`);
  }

  assignInvestigation(id: number, assignedToEmployeeId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/investigations/${id}/assign`, { assignedToEmployeeId });
  }

  completeInvestigation(id: number, req: CompleteInvestigationRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/investigations/${id}/complete`, req);
  }

  addInvestigationNote(id: number, req: AddInvestigationNoteRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/investigations/${id}/notes`, req);
  }

  // ============================================================
  // Counseling Records
  // ============================================================

  getCounselingRecords(params?: CounselingRecordQueryParams): Observable<EmployeeRelationsPagedResult<CounselingRecord>> {
    return this.http.get<EmployeeRelationsPagedResult<CounselingRecord>>(`${this.baseUrl}/counseling-records`, { params: params as any });
  }

  getCounselingRecord(id: number): Observable<CounselingRecord> {
    return this.http.get<CounselingRecord>(`${this.baseUrl}/counseling-records/${id}`);
  }

  createCounselingRecord(req: CreateCounselingRecordRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/counseling-records`, req);
  }

  updateCounselingRecord(id: number, req: UpdateCounselingRecordRequest): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/counseling-records/${id}`, req);
  }

  deleteCounselingRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/counseling-records/${id}`);
  }

  completeFollowUp(id: number, followUpNotes: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/counseling-records/${id}/follow-up-complete`, { followUpNotes });
  }
}
