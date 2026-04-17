// ── Tenant Settings ──────────────────────────────────────────
export interface CompanySettingsDto {
  id: number;
  tenantId: number;
  // General
  fiscalYearStartMonth: string;
  weekStartDay: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  // Attendance
  enableBiometricAttendance: boolean;
  enableManualAttendance: boolean;
  // Phase 6: autoCheckOutEnabled / autoCheckOutTime removed.
  lateGracePeriodMinutes: number;
  earlyLeaveGracePeriodMinutes: number;
  trackBreakTime: boolean;
  minimumWorkingHoursForPresent: number;
  // Leave
  allowNegativeLeaveBalance: boolean;
  requireAttachmentForSickLeave: boolean;
  minDaysBeforeLeaveRequest: number;
  allowHalfDayLeave: boolean;
  allowLeaveEncashment: boolean;
  leaveYearStart: string | null;
  // Payroll
  payrollCutOffDay: number;
  payrollCurrency: string | null;
  enableEndOfServiceCalc: boolean;
  salaryCalculationBasis: string;
  // Approval
  autoApproveAfterTimeout: boolean;
  defaultApprovalTimeoutHours: number;
  allowSelfApproval: boolean;
  requireApprovalComments: boolean;
  // Notification
  enableEmailNotifications: boolean;
  enableSmsNotifications: boolean;
  notifyManagerOnLeaveRequest: boolean;
  notifyEmployeeOnApproval: boolean;
  dailyAttendanceSummaryEnabled: boolean;
  // Security
  passwordExpiryDays: number;
  maxLoginAttempts: number;
  sessionTimeoutMinutes: number;
  require2FA: boolean;
  passwordHistoryCount: number;
  passwordMinLength?: number;
  loginLockoutPolicyJson?: string | null;
  // v13.3: Tenant-configurable business rules (previously hardcoded)
  contractExpiryAlertDaysCsv?: string;
  visaExpiryAlertDaysCsv?: string;
  reviewReminderDaysCsv?: string;
  loanRepaymentReminderDays?: number;
  frozenWorkflowCleanupDays?: number;
  defaultProbationDays?: number;
  maxUploadSizeMb?: number;
  maxVacationDaysPerRequest?: number;
  maxVacationFuturePlanningYears?: number;
  maxShiftGracePeriodMinutes?: number;
  excuseBackwardWindowDays?: number;
  excuseForwardWindowDays?: number;
  overtimeConfigMaxFutureDays?: number;
}

// ── Branch Settings Override ─────────────────────────────────
export interface BranchSettingsOverrideDto {
  id: number;
  branchId: number;
  enableBiometricAttendance: boolean | null;
  enableManualAttendance: boolean | null;
  // Phase 6: autoCheckOutEnabled / autoCheckOutTime removed.
  lateGracePeriodMinutes: number | null;
  earlyLeaveGracePeriodMinutes: number | null;
  trackBreakTime: boolean | null;
  minimumWorkingHoursForPresent: number | null;
}

// ── Resolved Settings ────────────────────────────────────────
export interface ResolvedSettingsDto extends CompanySettingsDto {
  branchId: number | null;
  departmentId: number | null;
  defaultShiftId: number | null;
  sources: Record<string, string>;
}

