/**
 * Workflow entity types that can use the workflow system
 */
export type WorkflowEntityType =
  | 'Vacation'
  | 'Excuse'
  | 'RemoteWork'
  | 'Overtime'
  | 'Timesheet'
  | 'AttendanceCorrection'
  | 'FingerprintRequest';

/**
 * Workflow step types
 */
export type WorkflowStepType =
  | 'Approval'
  | 'Notification'
  | 'Validation'
  | 'Condition';

/**
 * Approver types for workflow steps
 */
export type ApproverType =
  | 'DirectManager'
  | 'DepartmentHead'
  | 'Role'
  | 'SpecificUser';

/**
 * Timeout action types - determines what happens when a step times out
 */
export type TimeoutAction =
  | 'Expire'
  | 'Escalate'
  | 'AutoApprove'
  | 'AutoReject';

/**
 * Workflow instance status
 */
export type WorkflowStatus =
  | 'Pending'
  | 'InProgress'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

/**
 * Approval action types
 */
export type ApprovalAction =
  | 'Approved'
  | 'Rejected'
  | 'Delegated'
  | 'Skipped'
  | 'TimedOut';

/**
 * Workflow step definition
 */
export interface WorkflowStep {
  id?: number;
  workflowDefinitionId?: number;
  stepOrder: number;
  name: string;
  nameAr?: string;
  stepType: WorkflowStepType;
  approverType: ApproverType;
  approverRoleId?: number;
  approverUserId?: number;
  conditionJson?: string;
  timeoutHours?: number;
  timeoutAction?: TimeoutAction;
  timeoutActionName?: string;
  escalationStepId?: number;
  onApproveNextStepId?: number;
  onRejectNextStepId?: number;
  allowDelegation: boolean;
  notifyOnAction: boolean;
  notifyRequesterOnReach: boolean;
  approverInstructions?: string;
  approverInstructionsAr?: string;
  requireCommentsOnApprove: boolean;
  requireCommentsOnReject: boolean;

  // Navigation properties for display
  approverRoleName?: string;
  approverUserName?: string;
}

/**
 * Workflow definition
 */
export interface WorkflowDefinition {
  id: number;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  entityType: WorkflowEntityType;
  branchId?: number;
  branchName?: string;
  isActive: boolean;
  isDefault: boolean;
  version: number;
  steps: WorkflowStep[];
  stepCount?: number;
  createdAt: string;
  createdBy?: string;
  modifiedAt?: string;
  modifiedBy?: string;
}

/**
 * Workflow instance representing a running workflow
 */
export interface WorkflowInstance {
  id: number;
  workflowDefinitionId: number;
  workflowDefinitionName?: string;
  entityType: WorkflowEntityType;
  entityId: number;
  currentStepId?: number;
  currentStepName?: string;
  currentStepOrder?: number;
  status: WorkflowStatus;
  requestedById: number;
  requestedByName?: string;
  requestedAt: string;
  completedAt?: string;
  finalOutcome?: string;
  contextJson?: string;

  // Navigation properties
  stepExecutions?: WorkflowStepExecution[];
  workflowDefinition?: WorkflowDefinition;
}

/**
 * Workflow step execution record
 */
export interface WorkflowStepExecution {
  id: number;
  workflowInstanceId: number;
  stepId: number;
  stepName?: string;
  stepOrder: number;
  assignedToUserId: number;
  assignedToUserName?: string;
  assignedAt: string;
  actionTakenById?: number;
  actionTakenByName?: string;
  actionTakenAt?: string;
  action?: ApprovalAction;
  comments?: string;
  delegatedToUserId?: number;
  delegatedToUserName?: string;
  dueAt?: string;
  isOverdue: boolean;
}

/**
 * Pending approval item
 */
export interface PendingApproval {
  workflowInstanceId: number;
  workflowDefinitionName: string;
  entityType: WorkflowEntityType;
  entityId: number;
  entityDescription?: string;
  currentStepName: string;
  requestedByName: string;
  requestedAt: string;
  assignedAt: string;
  dueAt?: string;
  isOverdue: boolean;
  allowDelegation: boolean;

  // Entity-specific details
  employeeName?: string;
  startDate?: string;
  endDate?: string;
  reason?: string;
}

/**
 * Approval history item
 */
export interface ApprovalHistoryItem {
  workflowInstanceId: number;
  workflowDefinitionName: string;
  entityType: WorkflowEntityType;
  entityId: number;
  entityDescription?: string;
  stepName: string;
  action: ApprovalAction;
  actionTakenAt: string;
  comments?: string;
  requestedByName: string;

  // Entity-specific details
  employeeName?: string;
}

/**
 * Approval delegation
 */
export interface ApprovalDelegation {
  id: number;
  delegatorUserId: number;
  delegatorUserName?: string;
  delegateUserId: number;
  delegateUserName?: string;
  entityTypes: WorkflowEntityType[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

// Request DTOs

/**
 * Request to create a workflow definition
 */
export interface CreateWorkflowDefinitionRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  entityType: WorkflowEntityType;
  branchId?: number;
  isDefault: boolean;
  steps: CreateWorkflowStepRequest[];
}

/**
 * Request to create a workflow step
 */
export interface CreateWorkflowStepRequest {
  stepOrder: number;
  name: string;
  nameAr?: string;
  stepType: WorkflowStepType;
  approverType: ApproverType;
  approverRoleId?: number;
  approverUserId?: number;
  conditionJson?: string;
  timeoutHours?: number;
  timeoutAction: TimeoutAction;
  allowDelegation: boolean;
  notifyOnAction: boolean;
  notifyRequesterOnReach: boolean;
  approverInstructions?: string;
  approverInstructionsAr?: string;
  requireCommentsOnApprove: boolean;
  requireCommentsOnReject: boolean;
}

/**
 * Request to update a workflow definition
 */
export interface UpdateWorkflowDefinitionRequest {
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  isDefault: boolean;
  steps: CreateWorkflowStepRequest[];
}

/**
 * Request for approval action (approve/reject)
 */
export interface ApprovalActionRequest {
  comments?: string;
}

/**
 * Request to delegate approval
 */
export interface DelegateApprovalRequest {
  delegateToUserId: number;
  comments?: string;
}

/**
 * Request to create approval delegation
 */
export interface CreateDelegationRequest {
  delegateUserId: number;
  entityTypes?: WorkflowEntityType[];
  startDate: string;
  endDate: string;
}

/**
 * Paged response for workflow queries
 */
export interface PagedWorkflowResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
