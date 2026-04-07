export interface Resignation {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeNumber: string;
  departmentName?: string;
  branchName?: string;
  resignationDate: string;
  lastWorkingDate: string;
  noticePeriodDays: number;
  reason?: string;
  status: ResignationStatus;
  approvedByName?: string;
  approvedAtUtc?: string;
  rejectionReason?: string;
  createdAtUtc: string;
}

export interface CreateResignationRequest {
  employeeId: number;
  resignationDate: string;
  lastWorkingDate: string;
  reason?: string;
}

export interface ApproveResignationRequest {
  lastWorkingDate?: string;
  comments?: string;
}

export interface RejectResignationRequest {
  rejectionReason: string;
}

export type ResignationStatus = 'Pending' | 'Approved' | 'Rejected' | 'Withdrawn';
