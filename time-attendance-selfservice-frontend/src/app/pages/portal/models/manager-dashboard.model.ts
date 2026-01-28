/**
 * Manager Dashboard Data Models
 * Supports manager features: team overview, pending approvals, and team stats
 */

/**
 * Manager dashboard summary with team stats and pending approvals
 */
export interface ManagerDashboard {
  managerId: number;
  managerName: string;
  teamSize: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  onLeaveToday: number;
  remoteWorkToday: number;
  pendingApprovals: PendingApprovalsSummary;
  teamAttendanceRate: number;
  teamOvertimeHours: number;
  recentTeamActivity: TeamActivity[];
}

/**
 * Summary of pending approvals by type
 */
export interface PendingApprovalsSummary {
  vacations: number;
  excuses: number;
  remoteWork: number;
  attendanceCorrection: number;
  total: number;
}

/**
 * Individual pending approval item
 */
export interface PendingApprovalItem {
  workflowInstanceId: number;
  stepExecutionId: number;
  entityType: ApprovalEntityType;
  entityId: number;
  employeeId: number;
  employeeName: string;
  employeeCode: string;
  requestSummary: string;
  requestedAt: Date;
  dueAt?: Date;
  isDelegated: boolean;
  delegatedFrom?: string;
  currentStep: number;
  totalSteps: number;
}

/**
 * Entity types for approvals
 */
export enum ApprovalEntityType {
  Vacation = 'Vacation',
  Excuse = 'Excuse',
  RemoteWork = 'RemoteWork',
  AttendanceCorrection = 'AttendanceCorrection'
}

/**
 * Team activity item for manager view
 */
export interface TeamActivity {
  activityType: TeamActivityType;
  date: Date;
  employeeName: string;
  title: string;
  description: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'primary';
  icon: string;
  iconColor: string;
}

/**
 * Team activity types
 */
export enum TeamActivityType {
  Attendance = 'Attendance',
  Vacation = 'Vacation',
  Excuse = 'Excuse',
  RemoteWork = 'RemoteWork',
  AttendanceCorrection = 'AttendanceCorrection'
}

/**
 * Team member summary
 */
export interface TeamMember {
  id: number;
  employeeCode: string;
  name: string;
  department?: string;
  position?: string;
  email?: string;
  phone?: string;
  photo?: string;
  isActive: boolean;
  hierarchyLevel: number; // 1 = direct report, 2 = indirect, etc.
  pendingRequests: {
    vacations: number;
    excuses: number;
    remoteWork: number;
  };
  status: TeamMemberStatus;
}

/**
 * Team member current status
 */
export enum TeamMemberStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  OnLeave = 'OnLeave',
  RemoteWork = 'RemoteWork',
  NotCheckedIn = 'NotCheckedIn'
}

/**
 * Manager quick actions
 */
export interface ManagerQuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  enabled: boolean;
  badge?: number;
}

/**
 * Manager stats card
 */
export interface ManagerStatsCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor: string;
  route?: string;
}

/**
 * Approval action request
 */
export interface ApprovalActionRequest {
  workflowInstanceId: number;
  comments?: string;
}

/**
 * Approval action response
 */
export interface ApprovalActionResponse {
  success: boolean;
  message: string;
  newStatus?: string;
}
