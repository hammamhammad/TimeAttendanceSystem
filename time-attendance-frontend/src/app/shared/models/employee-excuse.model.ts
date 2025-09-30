import { PagedResult } from './employee.model';

export interface EmployeeExcuseDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  departmentName: string;
  branchName: string;
  excuseDate: string;
  excuseType: ExcuseType;
  startTime: string;
  endTime: string;
  durationHours: number;
  reason: string;
  status: ExcuseStatus;
  submissionDate: string;
  reviewDate?: string;
  reviewerId?: number;
  reviewerName?: string;
  reviewerComments?: string;
  attachmentUrl?: string;
  isWithinPolicy: boolean;
  policyViolationReason?: string;
}

export enum ExcuseStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancelled = 'Cancelled'
}

export enum ExcuseType {
  PersonalExcuse = 'PersonalExcuse',
  OfficialDuty = 'OfficialDuty'
}

export interface CreateEmployeeExcuseRequest {
  employeeId: number;
  excuseDate: string;
  startTime: string;
  endTime: string;
  reason: string;
  excuseType?: ExcuseType;
  attachmentFile?: File;
}

export interface UpdateEmployeeExcuseRequest {
  excuseDate: string;
  excuseType?: ExcuseType;
  startTime: string;
  endTime: string;
  reason: string;
  approvalStatus?: ExcuseStatus;
  reviewerComments?: string;
  attachmentFile?: File;
}

export interface ReviewExcuseRequest {
  status: ExcuseStatus.Approved | ExcuseStatus.Rejected;
  reviewerComments?: string;
}

export interface EmployeeExcusesQueryParams {
  page?: number;
  pageSize?: number;
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  status?: ExcuseStatus;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface EmployeeExcuseFilter {
  employeeId?: number;
  departmentId?: number;
  branchId?: number;
  status?: ExcuseStatus;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}

export interface EmployeeExcuseStatistics {
  totalRequests: number;
  pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  currentMonthHours: number;
  remainingMonthlyHours: number;
  monthlyLimit: number;
}

export type EmployeeExcusesPagedResult = PagedResult<EmployeeExcuseDto>;