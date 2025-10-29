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
  attendanceRate: number;
  attendanceTrend: number;
  totalWorkingHours: number;
  overtimeHours: number;
  remainingVacationDays: number;
  pendingRequestsCount: number;
  recentActivity: Activity[];
}

/**
 * Activity timeline item (attendance, vacations, excuses)
 */
export interface Activity {
  activityType: ActivityType;
  date: Date;
  title: string;
  description: string;
  status: string;
  statusVariant: StatusVariant;
  icon: string;
  iconColor: string;
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
