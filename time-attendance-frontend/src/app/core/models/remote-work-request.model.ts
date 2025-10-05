export enum RemoteWorkRequestStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3
}

export interface RemoteWorkRequest {
  id: number;
  employeeId: number;
  employeeName?: string;
  startDate: string;
  endDate: string;
  reason?: string;
  createdByUserId: number;
  createdByUserName?: string;
  status: RemoteWorkRequestStatus;
  approvedByUserId?: number;
  approvedByUserName?: string;
  approvedAt?: string;
  rejectionReason?: string;
  approvalComments?: string;
  remoteWorkPolicyId: number;
  workingDaysCount: number;
  createdAtUtc: string;
  modifiedAtUtc?: string;
}

export interface CreateRemoteWorkRequest {
  employeeId: number;
  startDate: string;
  endDate: string;
  reason?: string;
  createdByUserId: number;
  remoteWorkPolicyId?: number;
  status?: RemoteWorkRequestStatus;
  approvalComments?: string;
}

export interface UpdateRemoteWorkRequest {
  startDate: string;
  endDate: string;
  reason?: string;
  status: RemoteWorkRequestStatus;
  rejectionReason?: string;
  approvalComments?: string;
}

export interface ApproveRemoteWorkRequest {
  requestId: number;
  approverId: number;
  decision: RemoteWorkRequestStatus;
  rejectionReason?: string;
}
