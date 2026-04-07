// ===== Enums (string values matching backend JSON serialization) =====

export enum ProjectStatus {
  Active = 'Active',
  OnHold = 'OnHold',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Archived = 'Archived'
}

export enum TimesheetPeriodType {
  Weekly = 'Weekly',
  BiWeekly = 'BiWeekly',
  Monthly = 'Monthly'
}

export enum TimesheetPeriodStatus {
  Open = 'Open',
  Closed = 'Closed',
  Locked = 'Locked'
}

export enum TimesheetStatus {
  Draft = 'Draft',
  Submitted = 'Submitted',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Recalled = 'Recalled'
}

// ===== Project DTOs (match backend field names exactly) =====

export interface ProjectDto {
  id: number;
  code: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  clientName: string | null;
  clientNameAr: string | null;
  managerEmployeeId: number | null;
  managerEmployeeName: string | null;
  branchId: number;
  branchName: string;
  startDate: string | null;
  endDate: string | null;
  budgetHours: number | null;
  status: string;
  isActive: boolean;
  isChargeable: boolean;
  createdAtUtc: string;
  taskCount?: number;
}

export interface ProjectDropdownDto {
  id: number;
  code: string;
  name: string;
  nameAr: string | null;
  branchId: number;
}

export interface CreateProjectRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  clientName?: string;
  clientNameAr?: string;
  managerEmployeeId?: number;
  branchId: number;
  startDate?: string;
  endDate?: string;
  budgetHours?: number;
  status?: string;
  isActive?: boolean;
  isChargeable?: boolean;
}

export interface UpdateProjectRequest {
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  clientName?: string;
  clientNameAr?: string;
  managerEmployeeId?: number;
  branchId: number;
  startDate?: string;
  endDate?: string;
  budgetHours?: number;
  status: string;
  isActive: boolean;
  isChargeable: boolean;
}

// ===== Project Task DTOs =====

export interface ProjectTaskDto {
  id: number;
  projectId: number;
  projectName: string;
  projectCode: string;
  code: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  budgetHours: number | null;
  isActive: boolean;
  displayOrder: number;
  createdAtUtc: string;
}

export interface ProjectTaskDropdownDto {
  id: number;
  code: string;
  name: string;
  nameAr: string | null;
  projectId: number;
}

export interface CreateProjectTaskRequest {
  projectId: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  budgetHours?: number;
  isActive?: boolean;
  displayOrder: number;
}

export interface UpdateProjectTaskRequest {
  projectId: number;
  code: string;
  name: string;
  nameAr?: string;
  description?: string;
  budgetHours?: number;
  isActive: boolean;
  displayOrder: number;
}

// ===== Timesheet Period DTOs =====

export interface TimesheetPeriodDto {
  id: number;
  branchId: number;
  branchName: string;
  name: string;
  periodType: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  status: string;
  isActive: boolean;
  timesheetCount: number;
  submittedCount?: number;
  approvedCount?: number;
  createdAtUtc: string;
}

export interface CreateTimesheetPeriodRequest {
  branchId: number;
  name: string;
  periodType: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
}

export interface UpdateTimesheetPeriodRequest {
  name: string;
  periodType: string;
  startDate: string;
  endDate: string;
  submissionDeadline: string;
  isActive: boolean;
}

// ===== Timesheet DTOs =====

export interface TimesheetListDto {
  id: number;
  timesheetPeriodId: number;
  periodName: string;
  periodStartDate: string;
  periodEndDate: string;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  status: string;
  totalHours: number;
  regularHours: number;
  overtimeHours: number;
  submittedAt: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  notes: string | null;
  entryCount: number;
  createdAtUtc: string;
}

export interface TimesheetDetailDto extends TimesheetListDto {
  periodStatus: string;
  submittedByUserId: number | null;
  approvedByUserId: number | null;
  workflowInstanceId: number | null;
  entries: TimesheetEntryDto[];
}

export interface TimesheetEntryDto {
  id: number;
  projectId: number;
  projectName: string;
  projectCode: string;
  projectTaskId: number | null;
  projectTaskName: string | null;
  entryDate: string;
  hours: number;
  overtimeHours: number;
  notes: string | null;
  isAutoPopulated: boolean;
  attendanceRecordId: number | null;
}

export interface CreateTimesheetRequest {
  timesheetPeriodId: number;
  employeeId: number;
  notes?: string;
}

export interface UpdateTimesheetRequest {
  notes?: string;
  entries?: TimesheetEntryRequest[];
}

export interface TimesheetEntryRequest {
  projectId: number;
  projectTaskId?: number;
  entryDate: string;
  hours: number;
  overtimeHours: number;
  notes?: string;
  attendanceRecordId?: number;
}

export interface ApproveTimesheetRequest {
  notes?: string;
}

export interface RejectTimesheetRequest {
  reason: string;
}

export interface AutoPopulateTimesheetRequest {
  defaultProjectId: number;
  defaultProjectTaskId?: number;
}
