export enum AttendanceStatus {
  Present = 1,
  Absent = 2,
  Late = 3,
  EarlyLeave = 4,
  OnLeave = 5,
  DayOff = 6,
  Overtime = 7,
  Incomplete = 8,
  Holiday = 9,
  SickLeave = 10,
  Pending = 11
}

export enum TransactionType {
  CheckIn = 1,
  CheckOut = 2,
  BreakStart = 3,
  BreakEnd = 4,
  ManualAdjustment = 5,
  AutoCheckOut = 6
}

export enum AttendanceReportType {
  Daily = 0,
  Weekly = 1,
  Monthly = 2,
  Custom = 3
}

export interface AttendanceRecord {
  id: number;
  employeeId: number;
  employeeNumber: string;
  employeeName: string;
  attendanceDate: string;
  status: AttendanceStatus;
  statusText: string;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  actualCheckInTime: string | null;
  actualCheckOutTime: string | null;
  checkInTime: string | null;
  checkOutTime: string | null;
  department: string | null;
  scheduledHours: number;
  workingHours: number;
  breakHours: number;
  overtimeHours: number;
  totalBreakMinutes?: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  isManualOverride: boolean;
  isApproved: boolean;
  isFinalized: boolean;
  notes?: string;
  transactions: AttendanceTransaction[];
  workingDayAnalysis?: WorkingDayAnalysis;
}

export interface AttendanceTransaction {
  id: number;
  transactionType: TransactionType;
  transactionTypeText: string;
  transactionTimeUtc: string;
  transactionTimeLocal: string;
  isManual: boolean;
  enteredByUserName?: string;
  notes?: string;
  location?: string;
  deviceId?: string;
  isVerified: boolean;
}

export interface WorkingDayAnalysis {
  workStartTime?: string;
  workEndTime?: string;
  totalTimeOnPremises: number;
  productiveWorkingTime: number;
  totalBreakTime: number;
  breakPeriodCount: number;
  longestBreakDuration: number;
  coreHoursWorked: number;
  coreHoursCompliant: boolean;
  regularOvertimeHours: number;
  premiumOvertimeHours: number;
  efficiencyPercentage: number;
  isCalculationComplete: boolean;
}

export interface AttendanceStatistics {
  totalEmployees: number;
  presentEmployees: number;
  absentEmployees: number;
  lateEmployees: number;
  overtimeEmployees: number;
  averageWorkingHours: number;
  totalOvertimeHours: number;
  attendanceRate: number;
  period: {
    startDate: string;
    endDate: string;
  };
}

export interface AttendanceReportRequest {
  startDate: string;
  endDate: string;
  branchId?: number;
  branchIds?: number[];
  departmentId?: number;
  departmentIds?: number[];
  employeeId?: number;
  employeeIds?: number[];
  statusFilter?: AttendanceStatus;
  includeAnalysis?: boolean;
  includeTransactions: boolean;
  includeWorkingDayAnalysis: boolean;
  pageNumber?: number;
  pageSize?: number;
  groupBy?: string[];
  reportType?: AttendanceReportType;
}

export interface CreateAttendanceTransactionRequest {
  employeeId: number;
  transactionType: TransactionType;
  transactionTimeUtc?: string;
  attendanceDate?: string;
  notes?: string;
  location?: string;
  deviceId?: string;
}

export interface AttendanceGenerationResult {
  date: string;
  totalEmployees: number;
  recordsGenerated: number;
  recordsSkipped: number;
  recordsUpdated: number;
  errorCount: number;
  errors: string[];
  duration: number; // Duration in milliseconds
  isSuccessful: boolean;
}

export interface DailyAttendanceStatistics {
  date: string;
  totalEmployees: number;
  presentEmployees: number;
  absentEmployees: number;
  lateEmployees: number;
}

export interface RecentTransaction {
  id: number;
  employeeId: number;
  employeeNumber: string;
  employeeName: string;
  transactionType: number;
  transactionTypeText: string;
  transactionTimeUtc: string;
  transactionTimeLocal: string;
  isManual: boolean;
  enteredByUserName?: string;
  notes?: string;
  location?: string;
  deviceId?: string;
}

export interface AttendanceDashboardData {
  todayStats: AttendanceStatistics;
  weeklyTrend: DailyAttendanceStatistics[];
  incompleteRecords: AttendanceRecord[];
  recentTransactions: RecentTransaction[];
  topLateEmployees?: {
    employeeId: number;
    employeeName: string;
    lateCount: number;
    totalLateMinutes: number;
  }[];
}

export interface UpdateAttendanceRecordRequest {
  status?: AttendanceStatus;
  actualCheckInTime?: string;
  actualCheckOutTime?: string;
  workingHours?: number;
  breakHours?: number;
  overtimeHours?: number;
  lateMinutes?: number;
  earlyLeaveMinutes?: number;
  isApproved?: boolean;
  notes?: string;
  overrideNotes?: string;
}

export interface BulkAttendanceUpdateRequest {
  id: number;
  updates: UpdateAttendanceRecordRequest;
}

export interface BulkUpdateResult {
  id: number;
  success: boolean;
  message: string;
  errors: string[];
}

// New interfaces for manual calculation features
export interface BulkCalculationRequest {
  startDate: string;
  endDate: string;
  employeeIds?: number[];
  forceRecalculate?: boolean;
}

export interface EmployeeCalculationResult {
  employeeId: number;
  date: string;
  action: string;
  success: boolean;
  errorMessage?: string;
}

export interface BulkCalculationResult {
  startDate: string;
  endDate: string;
  totalProcessed: number;
  totalSuccessful: number;
  totalGenerated: number;
  totalRecalculated: number;
  duration: number;
  employeeResults: EmployeeCalculationResult[];
  errors: string[];
  isSuccessful: boolean;
}