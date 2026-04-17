using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.CompanyConfiguration.Commands.UpdateCompanySettings;

/// <summary>
/// Updates the company's operational settings. Fields added in v13.3 are nullable/optional — when omitted
/// by the caller (e.g. legacy frontend), their current DB value is preserved.
/// Phase 6 (v14.6): <c>AutoCheckOutEnabled</c> / <c>AutoCheckOutTime</c> removed.
/// </summary>
public record UpdateCompanySettingsCommand(
    // General
    string? FiscalYearStartMonth,
    string? WeekStartDay,
    string? DateFormat,
    string? TimeFormat,
    string? NumberFormat,
    // Attendance
    bool EnableBiometricAttendance,
    bool EnableManualAttendance,
    int LateGracePeriodMinutes,
    int EarlyLeaveGracePeriodMinutes,
    bool TrackBreakTime,
    int MinimumWorkingHoursForPresent,
    // Leave
    bool AllowNegativeLeaveBalance,
    bool RequireAttachmentForSickLeave,
    int MinDaysBeforeLeaveRequest,
    bool AllowHalfDayLeave,
    bool AllowLeaveEncashment,
    string? LeaveYearStart,
    // Payroll
    int PayrollCutOffDay,
    string? PayrollCurrency,
    bool EnableEndOfServiceCalc,
    string? SalaryCalculationBasis,
    // Approval
    bool AutoApproveAfterTimeout,
    int DefaultApprovalTimeoutHours,
    bool AllowSelfApproval,
    bool RequireApprovalComments,
    // Notification
    bool EnableEmailNotifications,
    bool EnableSmsNotifications,
    bool NotifyManagerOnLeaveRequest,
    bool NotifyEmployeeOnApproval,
    bool DailyAttendanceSummaryEnabled,
    // Security
    int PasswordExpiryDays,
    int MaxLoginAttempts,
    int SessionTimeoutMinutes,
    bool Require2FA,
    int PasswordHistoryCount,
    // v13.3 (all optional, preserve existing when null)
    int? PasswordMinLength = null,
    string? LoginLockoutPolicyJson = null,
    string? ContractExpiryAlertDaysCsv = null,
    string? VisaExpiryAlertDaysCsv = null,
    string? ReviewReminderDaysCsv = null,
    int? LoanRepaymentReminderDays = null,
    int? FrozenWorkflowCleanupDays = null,
    int? DefaultProbationDays = null,
    int? MaxUploadSizeMb = null,
    int? MaxVacationDaysPerRequest = null,
    int? MaxVacationFuturePlanningYears = null,
    int? MaxShiftGracePeriodMinutes = null,
    int? ExcuseBackwardWindowDays = null,
    int? ExcuseForwardWindowDays = null,
    int? OvertimeConfigMaxFutureDays = null,
    // v13.4 batch: all optional for backwards-compat
    int? AttendanceCorrectionMaxRetroactiveDays = null,
    string? DocumentExpiryAlertDaysCsv = null,
    string? AssetWarrantyExpiryAlertDaysCsv = null,
    string? AssetOverdueReturnAlertDaysCsv = null,
    string? TrainingSessionReminderDaysCsv = null,
    string? SuccessionPlanReminderDaysCsv = null,
    int? TimesheetSubmissionReminderDaysBefore = null,
    string? GrievanceSlaAlertDaysCsv = null,
    string? NotificationRecipientRolesCsv = null
) : ICommand<Result>;
