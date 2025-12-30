export enum ShiftType {
  TimeBased = 1,
  HoursOnly = 2
}

export enum ShiftStatus {
  Active = 1,
  Inactive = 2,
  Draft = 3,
  Archived = 4
}

export interface ShiftPeriod {
  id: number;
  periodOrder: number;
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
  hours: number;
  isNightPeriod: boolean;
}

export interface Shift {
  id: number;
  name: string;
  description?: string;
  shiftType: ShiftType;
  status: ShiftStatus;
  requiredHours?: number;
  isCheckInRequired: boolean;
  isAutoCheckOut: boolean;
  allowFlexibleHours: boolean;
  flexMinutesBefore?: number;
  flexMinutesAfter?: number;
  gracePeriodMinutes?: number;
  // Extended Business Rules
  requiredWeeklyHours?: number;
  hasCoreHours: boolean;
  coreStart?: string; // "HH:mm" format
  coreEnd?: string; // "HH:mm" format
  // Working Days
  isSunday: boolean;
  isMonday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  isThursday: boolean;
  isFriday: boolean;
  isSaturday: boolean;
  isNightShift: boolean;
  shiftPeriods: ShiftPeriod[];
  createdAtUtc: string;
  createdBy: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface ShiftsResponse extends PagedResult<Shift> {}

export interface CreateShiftPeriodRequest {
  periodOrder: number;
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
}

export interface CreateShiftRequest {
  name: string;
  description?: string;
  shiftType: ShiftType;
  status?: ShiftStatus;
  requiredHours?: number;
  isCheckInRequired?: boolean;
  isAutoCheckOut?: boolean;
  allowFlexibleHours?: boolean;
  flexMinutesBefore?: number;
  flexMinutesAfter?: number;
  gracePeriodMinutes?: number;
  // Extended Business Rules
  requiredWeeklyHours?: number;
  hasCoreHours?: boolean;
  coreStart?: string; // "HH:mm" format
  coreEnd?: string; // "HH:mm" format
  // Working Days
  isSunday?: boolean;
  isMonday?: boolean;
  isTuesday?: boolean;
  isWednesday?: boolean;
  isThursday?: boolean;
  isFriday?: boolean;
  isSaturday?: boolean;
  isNightShift?: boolean;
  shiftPeriods?: CreateShiftPeriodRequest[];
}

export interface UpdateShiftPeriodRequest {
  id?: number;
  periodOrder: number;
  startTime: string; // "HH:mm" format
  endTime: string; // "HH:mm" format
}

export interface UpdateShiftRequest {
  name: string;
  description?: string;
  shiftType: ShiftType;
  status?: ShiftStatus;
  requiredHours?: number;
  isCheckInRequired?: boolean;
  isAutoCheckOut?: boolean;
  allowFlexibleHours?: boolean;
  flexMinutesBefore?: number;
  flexMinutesAfter?: number;
  gracePeriodMinutes?: number;
  // Extended Business Rules
  requiredWeeklyHours?: number;
  hasCoreHours?: boolean;
  coreStart?: string; // "HH:mm" format
  coreEnd?: string; // "HH:mm" format
  // Working Days
  isSunday?: boolean;
  isMonday?: boolean;
  isTuesday?: boolean;
  isWednesday?: boolean;
  isThursday?: boolean;
  isFriday?: boolean;
  isSaturday?: boolean;
  isNightShift?: boolean;
  shiftPeriods?: UpdateShiftPeriodRequest[];
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Shift Assignment Enums and Models
export enum ShiftAssignmentType {
  Employee = 1,
  Department = 2,
  Branch = 3
}

export enum ShiftAssignmentStatus {
  Pending = 1,
  Active = 2,
  Inactive = 3,
  Expired = 4,
  Cancelled = 5
}

export interface ShiftAssignment {
  id: number;
  shiftId: number;
  shiftName: string;
  shiftType: string;
  shiftStatus: string;
  assignmentType: ShiftAssignmentType;
  assignmentTypeDisplay: string;
  employeeId?: number;
  employeeName?: string;
  employeeNumber?: string;
  departmentId?: number;
  departmentName?: string;
  branchId?: number;
  branchName?: string;
  branchCode?: string;
  targetDisplayName: string;
  effectiveDate: string;
  endDate?: string;
  status: ShiftAssignmentStatus;
  statusDisplay: string;
  priority: number;
  notes?: string;
  assignedByUserId: number;
  assignedByUsername: string;
  createdAtUtc: string;
  createdBy: string;
  modifiedAtUtc?: string;
  modifiedBy?: string;
}

export interface ShiftAssignmentsResponse extends PagedResult<ShiftAssignment> {}

export interface CreateShiftAssignmentRequest {
  shiftId: number;
  assignmentType: ShiftAssignmentType;
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  effectiveDate: string;
  endDate?: string;
  status?: ShiftAssignmentStatus;
  priority?: number;
  notes?: string;
}

export interface UpdateShiftAssignmentRequest {
  shiftId: number;
  assignmentType: ShiftAssignmentType;
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  effectiveDate: string;
  endDate?: string;
  status?: ShiftAssignmentStatus;
  priority?: number;
  notes?: string;
}

export interface ShiftAssignmentOptions {
  assignmentTypes: Array<{value: number, label: string}>;
  statuses: Array<{value: number, label: string}>;
}

export interface UpdateEmployeeShiftRequest {
  shiftId: number;
  effectiveDate?: string;
  notes?: string;
}