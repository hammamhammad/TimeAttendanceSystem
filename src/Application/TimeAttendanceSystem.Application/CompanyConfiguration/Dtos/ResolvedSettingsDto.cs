namespace TecAxle.Hrms.Application.CompanyConfiguration.Dtos;

/// <summary>
/// Fully resolved settings for the company/branch/department with source tracking.
/// Each field value is the final resolved value after applying the inheritance chain:
/// CompanySettings → BranchOverride → DepartmentOverride.
/// </summary>
public class ResolvedSettingsDto
{
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }

    // General
    public string FiscalYearStartMonth { get; set; } = "01";
    public string WeekStartDay { get; set; } = "Sunday";
    public string DateFormat { get; set; } = "dd/MM/yyyy";
    public string TimeFormat { get; set; } = "HH:mm";
    public string NumberFormat { get; set; } = "en-US";

    /// <summary>
    /// Phase 2: Company-wide default timezone (IANA or Windows id).
    /// Used by <c>ITimezoneService</c> when a branch has no <c>TimeZone</c> set.
    /// Falls back to "UTC" if unset.
    /// </summary>
    public string DefaultTimeZoneId { get; set; } = "UTC";

    /// <summary>Phase 2: attendance dedup window for rapid duplicate punches (seconds).</summary>
    public int AttendanceDuplicateSuppressionSeconds { get; set; } = 30;

    // Attendance
    public bool EnableGpsAttendance { get; set; }
    public bool EnableNfcAttendance { get; set; }
    public bool EnableBiometricAttendance { get; set; }
    public bool EnableManualAttendance { get; set; }
    // Phase 6: AutoCheckOutEnabled / AutoCheckOutTime removed.
    public int LateGracePeriodMinutes { get; set; }
    public int EarlyLeaveGracePeriodMinutes { get; set; }
    public bool TrackBreakTime { get; set; }
    public int MinimumWorkingHoursForPresent { get; set; }

    // Leave
    public bool AllowNegativeLeaveBalance { get; set; }
    public bool RequireAttachmentForSickLeave { get; set; }
    public int MinDaysBeforeLeaveRequest { get; set; }
    public bool AllowHalfDayLeave { get; set; }
    public bool AllowLeaveEncashment { get; set; }
    public string? LeaveYearStart { get; set; }

    // Payroll
    public int PayrollCutOffDay { get; set; }
    public string? PayrollCurrency { get; set; }
    public bool EnableEndOfServiceCalc { get; set; }
    public string SalaryCalculationBasis { get; set; } = "Calendar";

    // Approval
    public bool AutoApproveAfterTimeout { get; set; }
    public int DefaultApprovalTimeoutHours { get; set; }
    public bool AllowSelfApproval { get; set; }
    public bool RequireApprovalComments { get; set; }

    // Notification
    public bool EnableEmailNotifications { get; set; }
    public bool EnablePushNotifications { get; set; }
    public bool EnableSmsNotifications { get; set; }
    public bool NotifyManagerOnLeaveRequest { get; set; }
    public bool NotifyEmployeeOnApproval { get; set; }
    public bool DailyAttendanceSummaryEnabled { get; set; }

    // Mobile
    public bool MobileCheckInEnabled { get; set; }
    public bool RequireNfcForMobile { get; set; }
    public bool RequireGpsForMobile { get; set; }
    public bool AllowMockLocation { get; set; }

    // Security
    public int PasswordExpiryDays { get; set; }
    public int MaxLoginAttempts { get; set; }
    public int SessionTimeoutMinutes { get; set; }
    public bool Require2FA { get; set; }
    public int PasswordHistoryCount { get; set; }
    public int PasswordMinLength { get; set; } = 8;
    public string? LoginLockoutPolicyJson { get; set; }

    // v13.3: Reminder windows / limits / defaults
    public string ContractExpiryAlertDaysCsv { get; set; } = "30,15,7";
    public string VisaExpiryAlertDaysCsv { get; set; } = "90,60,30,15,7";
    public string ReviewReminderDaysCsv { get; set; } = "7,3,1";
    public int LoanRepaymentReminderDays { get; set; } = 7;
    public int FrozenWorkflowCleanupDays { get; set; } = 90;
    public int DefaultProbationDays { get; set; } = 90;
    public int MaxUploadSizeMb { get; set; } = 10;
    public int MaxVacationDaysPerRequest { get; set; } = 365;
    public int MaxVacationFuturePlanningYears { get; set; } = 2;
    public int MaxShiftGracePeriodMinutes { get; set; } = 120;
    public int ExcuseBackwardWindowDays { get; set; } = 365;
    public int ExcuseForwardWindowDays { get; set; } = 30;
    public int OvertimeConfigMaxFutureDays { get; set; } = 30;

    // v13.4
    public int AttendanceCorrectionMaxRetroactiveDays { get; set; } = 30;
    public string DocumentExpiryAlertDaysCsv { get; set; } = "30,15,7";
    public string AssetWarrantyExpiryAlertDaysCsv { get; set; } = "30,15,7,1";
    public string AssetOverdueReturnAlertDaysCsv { get; set; } = "1,3,7,14,30";
    public string TrainingSessionReminderDaysCsv { get; set; } = "7,3,1";
    public string SuccessionPlanReminderDaysCsv { get; set; } = "30,7,1";
    public int TimesheetSubmissionReminderDaysBefore { get; set; } = 2;
    public string GrievanceSlaAlertDaysCsv { get; set; } = "3,1";
    public string NotificationRecipientRolesCsv { get; set; } = "HRManager,SystemAdmin";

    // Department overrides
    public long? DefaultShiftId { get; set; }

    /// <summary>
    /// Source of each setting value: "tenant", "branch", or "department".
    /// Key is the property name in camelCase.
    /// </summary>
    public Dictionary<string, string> Sources { get; set; } = new();
}
