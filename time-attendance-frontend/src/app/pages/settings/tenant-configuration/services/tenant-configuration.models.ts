// ── Tenant Settings ──────────────────────────────────────────
export interface TenantSettingsDto {
  id: number;
  tenantId: number;
  // General
  fiscalYearStartMonth: string;
  weekStartDay: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;
  // Attendance
  enableGpsAttendance: boolean;
  enableNfcAttendance: boolean;
  enableBiometricAttendance: boolean;
  enableManualAttendance: boolean;
  autoCheckOutEnabled: boolean;
  autoCheckOutTime: string | null;
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
  enablePushNotifications: boolean;
  enableSmsNotifications: boolean;
  notifyManagerOnLeaveRequest: boolean;
  notifyEmployeeOnApproval: boolean;
  dailyAttendanceSummaryEnabled: boolean;
  // Mobile
  mobileCheckInEnabled: boolean;
  requireNfcForMobile: boolean;
  requireGpsForMobile: boolean;
  allowMockLocation: boolean;
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
  enableGpsAttendance: boolean | null;
  enableNfcAttendance: boolean | null;
  enableBiometricAttendance: boolean | null;
  enableManualAttendance: boolean | null;
  autoCheckOutEnabled: boolean | null;
  autoCheckOutTime: string | null;
  lateGracePeriodMinutes: number | null;
  earlyLeaveGracePeriodMinutes: number | null;
  trackBreakTime: boolean | null;
  minimumWorkingHoursForPresent: number | null;
  mobileCheckInEnabled: boolean | null;
  requireNfcForMobile: boolean | null;
  requireGpsForMobile: boolean | null;
}

// ── Resolved Settings ────────────────────────────────────────
export interface ResolvedSettingsDto extends TenantSettingsDto {
  branchId: number | null;
  departmentId: number | null;
  defaultShiftId: number | null;
  sources: Record<string, string>;
}

