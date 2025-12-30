/**
 * Employee Dashboard Data Models
 * Matches backend DTOs from Phase 1 implementation
 */

/**
 * Employee dashboard summary with attendance stats, vacation balance, and activity
 */
export interface EmployeeDashboard {
  employeeId: number;
  employeeName: string;
  employeeCode?: string;
  departmentName?: string;
  branchName?: string;
  attendanceRate: number;
  attendanceTrend: number;
  totalWorkingHours: number;
  totalOvertimeHours: number;
  remainingVacationDays: number;
  pendingRequestsCount: number;
  recentActivity: Activity[];
  todayAttendance?: TodayAttendance;
}

/**
 * Today's attendance status for quick overview
 */
export interface TodayAttendance {
  checkInTime?: Date;
  checkOutTime?: Date;
  status: string;
  workingHours: number;
  isRemoteWork: boolean;
  isOnVacation: boolean;
}

/**
 * Activity timeline item (attendance, vacations, excuses)
 * Matches backend ActivityDto
 */
export interface Activity {
  type: string;
  description: string;
  timestamp: Date;
  icon: string;
  variant: StatusVariant;
}

/**
 * Activity types for timeline
 */
export enum ActivityType {
  Attendance = 'Attendance',
  Vacation = 'Vacation',
  Excuse = 'Excuse',
  FingerprintRequest = 'FingerprintRequest'
}

/**
 * Status badge variants matching Bootstrap colors
 */
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'primary';

/**
 * Quick action button configuration
 */
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  enabled: boolean;
}

/**
 * Stats card configuration for dashboard
 */
export interface StatsCard {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  iconColor: string;
  trend?: number;
  trendLabel?: string;
  route?: string;
}
