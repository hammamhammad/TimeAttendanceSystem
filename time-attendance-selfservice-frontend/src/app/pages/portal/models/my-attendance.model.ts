/**
 * My Attendance Data Models
 * For employee self-service attendance viewing
 */

/**
 * Attendance record for employee
 */
export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeName: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: AttendanceStatus;
  workingHours: number;
  preShiftOvertimeHours: number;
  postShiftOvertimeHours: number;
  lateMinutes?: number;
  earlyLeaveMinutes?: number;
  shiftId?: number;
  shiftName?: string;
  notes?: string;
  branchName?: string;
  departmentName?: string;
  isManuallyAdjusted: boolean;
}

/**
 * Attendance status enum
 */
export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Late = 'Late',
  EarlyLeave = 'EarlyLeave',
  Holiday = 'Holiday',
  Weekend = 'Weekend',
  OnLeave = 'OnLeave',
  RemoteWork = 'RemoteWork'
}

/**
 * Query parameters for attendance report
 */
export interface AttendanceQueryParams {
  employeeId?: number;
  startDate?: Date;
  endDate?: Date;
  status?: AttendanceStatus;
  branchId?: number;
  departmentId?: number;
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Attendance summary statistics
 */
export interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  earlyLeaveDays: number;
  totalWorkingHours: number;
  totalOvertimeHours: number;
  attendanceRate: number;
  averageWorkingHours: number;
}

/**
 * Calendar day for calendar view
 */
export interface CalendarDay {
  date: Date;
  status?: AttendanceStatus;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  isCurrentMonth: boolean;
  attendance?: AttendanceRecord;
}

/**
 * Month view for calendar
 */
export interface CalendarMonth {
  year: number;
  month: number;
  monthName: string;
  weeks: CalendarWeek[];
}

/**
 * Week in calendar
 */
export interface CalendarWeek {
  days: CalendarDay[];
}

/**
 * Attendance report request
 */
export interface AttendanceReportRequest {
  startDate: Date;
  endDate: Date;
  employeeId?: number;
  branchId?: number;
  departmentId?: number;
  status?: AttendanceStatus;
}

/**
 * Attendance report response
 */
export interface AttendanceReportResponse {
  records: AttendanceRecord[];
  summary: AttendanceSummary;
  totalCount: number;
}
