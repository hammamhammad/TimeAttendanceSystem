export enum RemoteWorkRequestStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
  Cancelled = 3
}

export interface RemoteWorkApprovalStep {
  stepOrder: number;
  stepName: string;
  status: string;
  assignedToName: string;
  actionByName?: string;
  assignedAt: string;
  actionAt?: string;
  comments?: string;
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

  // Workflow information
  workflowInstanceId?: number;
  workflowStatus?: string;
  currentApproverName?: string;
  currentApproverRole?: string;
  currentStepOrder?: number;
  totalSteps?: number;

  // Computed status flags
  isApproved?: boolean;
  isCurrentlyActive?: boolean;
  isUpcoming?: boolean;
  isCompleted?: boolean;

  // Approval history
  approvalHistory?: RemoteWorkApprovalStep[];
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
