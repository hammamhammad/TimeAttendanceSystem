namespace TecAxle.Hrms.Application.TenantConfiguration.Dtos;

public class TenantSettingsDto
{
    public long Id { get; set; }

    // General
    public string FiscalYearStartMonth { get; set; } = "01";
    public string WeekStartDay { get; set; } = "Sunday";
    public string DateFormat { get; set; } = "dd/MM/yyyy";
    public string TimeFormat { get; set; } = "HH:mm";
    public string NumberFormat { get; set; } = "en-US";

    // Attendance
    public bool EnableGpsAttendance { get; set; }
    public bool EnableNfcAttendance { get; set; }
    public bool EnableBiometricAttendance { get; set; }
    public bool EnableManualAttendance { get; set; }
    public bool AutoCheckOutEnabled { get; set; }
    public string? AutoCheckOutTime { get; set; }
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

    // Reminder / Alert Windows (v13.3)
    public string ContractExpiryAlertDaysCsv { get; set; } = "30,15,7";
    public string VisaExpiryAlertDaysCsv { get; set; } = "90,60,30,15,7";
    public string ReviewReminderDaysCsv { get; set; } = "7,3,1";
    public int LoanRepaymentReminderDays { get; set; } = 7;
    public int FrozenWorkflowCleanupDays { get; set; } = 90;

    // Default values
    public int DefaultProbationDays { get; set; } = 90;

    // Validation / limit overrides
    public int MaxUploadSizeMb { get; set; } = 10;
    public int MaxVacationDaysPerRequest { get; set; } = 365;
    public int MaxVacationFuturePlanningYears { get; set; } = 2;
    public int MaxShiftGracePeriodMinutes { get; set; } = 120;
    public int ExcuseBackwardWindowDays { get; set; } = 365;
    public int ExcuseForwardWindowDays { get; set; } = 30;
    public int OvertimeConfigMaxFutureDays { get; set; } = 30;

    // v13.4: Reminder windows + notification recipients
    public int AttendanceCorrectionMaxRetroactiveDays { get; set; } = 30;
    public string DocumentExpiryAlertDaysCsv { get; set; } = "30,15,7";
    public string AssetWarrantyExpiryAlertDaysCsv { get; set; } = "30,15,7,1";
    public string AssetOverdueReturnAlertDaysCsv { get; set; } = "1,3,7,14,30";
    public string TrainingSessionReminderDaysCsv { get; set; } = "7,3,1";
    public string SuccessionPlanReminderDaysCsv { get; set; } = "30,7,1";
    public int TimesheetSubmissionReminderDaysBefore { get; set; } = 2;
    public string GrievanceSlaAlertDaysCsv { get; set; } = "3,1";
    public string NotificationRecipientRolesCsv { get; set; } = "HRManager,SystemAdmin";
}
