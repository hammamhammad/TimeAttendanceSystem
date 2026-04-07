// ============================================================
// Employee Relations Models
// ============================================================

// --- Enums (string values matching backend serialization) ---

export type GrievanceType = 'Workplace' | 'Harassment' | 'Discrimination' | 'Compensation' | 'WorkConditions' | 'Management' | 'Policy' | 'Other';
export type GrievancePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type GrievanceStatus = 'Draft' | 'Submitted' | 'UnderReview' | 'Assigned' | 'Investigating' | 'Escalated' | 'Resolved' | 'Closed' | 'Withdrawn';
export type DisciplinaryActionType = 'VerbalWarning' | 'WrittenWarning' | 'FinalWarning' | 'Suspension' | 'Demotion' | 'Termination' | 'Probation' | 'Other';
export type DisciplinarySeverity = 'Minor' | 'Moderate' | 'Major' | 'Severe' | 'Critical';
export type DisciplinaryActionStatus = 'Draft' | 'Pending' | 'Approved' | 'Acknowledged' | 'Appealed' | 'AppealResolved' | 'Completed' | 'Cancelled';
export type InvestigationStatus = 'Open' | 'InProgress' | 'OnHold' | 'Completed' | 'Closed' | 'Cancelled';
export type CounselingType = 'Performance' | 'Behavioral' | 'Attendance' | 'Conflict' | 'Career' | 'Personal' | 'Other';

// --- Grievance ---

export interface Grievance {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  departmentName?: string;
  branchName?: string;
  grievanceType: GrievanceType;
  priority: GrievancePriority;
  status: GrievanceStatus;
  subject: string;
  description: string;
  desiredResolution?: string;
  assignedToEmployeeId?: number;
  assignedToName?: string;
  investigationId?: number;
  resolutionNotes?: string;
  resolvedAtUtc?: string;
  closedAtUtc?: string;
  notes?: GrievanceNote[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface GrievanceNote {
  id: number;
  grievanceId: number;
  note: string;
  isInternal: boolean;
  createdByName?: string;
  createdAtUtc: string;
}

export interface CreateGrievanceRequest {
  employeeId: number;
  grievanceType: GrievanceType;
  priority: GrievancePriority;
  subject: string;
  description: string;
  desiredResolution?: string;
}

export interface UpdateGrievanceRequest extends CreateGrievanceRequest {}

export interface GrievanceQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: GrievanceStatus;
  grievanceType?: GrievanceType;
  priority?: GrievancePriority;
  employeeId?: number;
}

export interface AddGrievanceNoteRequest {
  note: string;
  isInternal?: boolean;
}

// --- Disciplinary Action ---

export interface DisciplinaryAction {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  departmentName?: string;
  branchName?: string;
  actionType: DisciplinaryActionType;
  severity: DisciplinarySeverity;
  status: DisciplinaryActionStatus;
  reason: string;
  description: string;
  incidentDate: string;
  effectiveDate?: string;
  expiryDate?: string;
  issuedByEmployeeId?: number;
  issuedByName?: string;
  investigationId?: number;
  appealReason?: string;
  appealDate?: string;
  appealResolution?: string;
  appealResolvedAtUtc?: string;
  acknowledgedAtUtc?: string;
  employeeSummary?: DisciplinaryEmployeeSummary;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface DisciplinaryEmployeeSummary {
  totalActions: number;
  verbalWarnings: number;
  writtenWarnings: number;
  finalWarnings: number;
  suspensions: number;
  activeActions: number;
}

export interface CreateDisciplinaryActionRequest {
  employeeId: number;
  actionType: DisciplinaryActionType;
  severity: DisciplinarySeverity;
  reason: string;
  description: string;
  incidentDate: string;
  effectiveDate?: string;
  expiryDate?: string;
  investigationId?: number;
}

export interface UpdateDisciplinaryActionRequest extends CreateDisciplinaryActionRequest {}

export interface DisciplinaryActionQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: DisciplinaryActionStatus;
  actionType?: DisciplinaryActionType;
  severity?: DisciplinarySeverity;
  employeeId?: number;
}

export interface AppealRequest {
  appealReason: string;
}

export interface ResolveAppealRequest {
  resolution: string;
}

// --- Investigation ---

export interface Investigation {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  departmentName?: string;
  branchName?: string;
  subject: string;
  description: string;
  status: InvestigationStatus;
  assignedToEmployeeId?: number;
  assignedToName?: string;
  startDate: string;
  completedDate?: string;
  findings?: string;
  recommendations?: string;
  relatedGrievanceId?: number;
  notes?: InvestigationNote[];
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface InvestigationNote {
  id: number;
  investigationId: number;
  note: string;
  isInternal: boolean;
  createdByName?: string;
  createdAtUtc: string;
}

export interface CreateInvestigationRequest {
  employeeId: number;
  subject: string;
  description: string;
  startDate: string;
  relatedGrievanceId?: number;
}

export interface UpdateInvestigationRequest extends CreateInvestigationRequest {}

export interface InvestigationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: InvestigationStatus;
  employeeId?: number;
}

export interface AddInvestigationNoteRequest {
  note: string;
  isInternal?: boolean;
}

export interface CompleteInvestigationRequest {
  findings: string;
  recommendations?: string;
}

// --- Counseling Record ---

export interface CounselingRecord {
  id: number;
  employeeId: number;
  employeeName?: string;
  employeeNumber?: string;
  departmentName?: string;
  branchName?: string;
  counselorEmployeeId?: number;
  counselorName?: string;
  counselingType: CounselingType;
  sessionDate: string;
  subject: string;
  description: string;
  outcome?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  followUpCompleted: boolean;
  followUpNotes?: string;
  isConfidential: boolean;
  createdAtUtc: string;
  createdBy?: string;
  modifiedAtUtc?: string;
}

export interface CreateCounselingRecordRequest {
  employeeId: number;
  counselorEmployeeId?: number;
  counselingType: CounselingType;
  sessionDate: string;
  subject: string;
  description: string;
  outcome?: string;
  followUpRequired: boolean;
  followUpDate?: string;
  isConfidential?: boolean;
}

export interface UpdateCounselingRecordRequest extends CreateCounselingRecordRequest {}

export interface CounselingRecordQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  counselingType?: CounselingType;
  employeeId?: number;
  followUpRequired?: boolean;
}

// --- Paged Result ---

export interface EmployeeRelationsPagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
