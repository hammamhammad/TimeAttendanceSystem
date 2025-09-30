import { ExcuseType, ExcuseStatus } from './employee-excuse.model';

export interface LeaveExcuseDetailsResponse {
  vacations: EmployeeVacationDetail[];
  excuses: EmployeeExcuseDetail[];
  remoteWork: RemoteWorkDetail[];
  hasLeaveExcuseData: boolean;
}

export interface EmployeeVacationDetail {
  id: number;
  employeeName: string;
  vacationTypeName: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  isApproved: boolean;
  notes?: string;
  createdAtUtc: Date;
}

export interface EmployeeExcuseDetail {
  id: number;
  employeeName: string;
  excuseDate: Date;
  excuseType: ExcuseType;
  excuseTypeDisplay: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  reason: string;
  approvalStatus: ExcuseStatus;
  approvalStatusDisplay: string;
  approvedByName?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  hasAttachment: boolean;
  attachmentPath?: string;
  processingNotes?: string;
  createdAtUtc: Date;
  timeRangeDisplay: string;
  durationDisplay: string;
}

export interface RemoteWorkDetail {
  id: number;
  employeeName: string;
  workDate: Date;
  workLocation: string;
  workType: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
  isApproved: boolean;
  approvedByName?: string;
  approvedAt?: Date;
  createdAtUtc: Date;
}