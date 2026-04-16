using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.TenantConfiguration.Commands.UpdateTenantSettings;

/// <summary>
/// Updates a tenant's operational settings. Fields added in v13.3 are nullable/optional — when omitted
/// by the caller (e.g. legacy frontend), their current DB value is preserved.
/// </summary>
public record UpdateTenantSettingsCommand(
    // General
    string? FiscalYearStartMonth,
    string? WeekStartDay,
    string? DateFormat,
    string? TimeFormat,
    string? NumberFormat,
    // Attendance
    bool EnableGpsAttendance,
    bool EnableNfcAttendance,
    bool EnableBiometricAttendance,
    bool EnableManualAttendance,
    bool AutoCheckOutEnabled,
    string? AutoCheckOutTime,
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
    bool EnablePushNotifications,
    bool EnableSmsNotifications,
    bool NotifyManagerOnLeaveRequest,
    bool NotifyEmployeeOnApproval,
    bool DailyAttendanceSummaryEnabled,
    // Mobile
    bool MobileCheckInEnabled,
    bool RequireNfcForMobile,
    bool RequireGpsForMobile,
    bool AllowMockLocation,
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
