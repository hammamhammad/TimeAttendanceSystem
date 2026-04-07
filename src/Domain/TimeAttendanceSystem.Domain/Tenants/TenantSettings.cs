using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Tenants;

/// <summary>
/// Centralized operational settings for a tenant (company).
/// One row per tenant. Covers cross-cutting configuration that doesn't belong to a specific policy entity.
/// Branch-level overrides are handled by BranchSettingsOverride; department-level by DepartmentSettingsOverride.
/// </summary>
public class TenantSettings : BaseEntity
{
    public long TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;

    // ── General Settings ─────────────────────────────────

    /// <summary>Month number "01"–"12" when the fiscal year starts.</summary>
    public string FiscalYearStartMonth { get; set; } = "01";

    /// <summary>First day of the work week: "Sunday", "Monday", etc.</summary>
    public string WeekStartDay { get; set; } = "Sunday";

    /// <summary>Display date format, e.g. "dd/MM/yyyy".</summary>
    public string DateFormat { get; set; } = "dd/MM/yyyy";

    /// <summary>"HH:mm" (24-hour) or "hh:mm a" (12-hour).</summary>
    public string TimeFormat { get; set; } = "HH:mm";

    /// <summary>Locale tag for number formatting, e.g. "en-US", "ar-SA".</summary>
    public string NumberFormat { get; set; } = "en-US";

    // ── Attendance Settings ──────────────────────────────

    public bool EnableGpsAttendance { get; set; } = false;
    public bool EnableNfcAttendance { get; set; } = false;
    public bool EnableBiometricAttendance { get; set; } = true;
    public bool EnableManualAttendance { get; set; } = true;
    public bool AutoCheckOutEnabled { get; set; } = false;
    public TimeOnly? AutoCheckOutTime { get; set; }
    public int LateGracePeriodMinutes { get; set; } = 15;
    public int EarlyLeaveGracePeriodMinutes { get; set; } = 15;
    public bool TrackBreakTime { get; set; } = false;
    public int MinimumWorkingHoursForPresent { get; set; } = 4;

    // ── Leave Settings ───────────────────────────────────

    public bool AllowNegativeLeaveBalance { get; set; } = false;
    public bool RequireAttachmentForSickLeave { get; set; } = true;
    public int MinDaysBeforeLeaveRequest { get; set; } = 1;
    public bool AllowHalfDayLeave { get; set; } = true;
    public bool AllowLeaveEncashment { get; set; } = false;

    /// <summary>"MM-dd" pattern for leave year start, null = calendar year.</summary>
    public string? LeaveYearStart { get; set; }

    // ── Payroll Settings ─────────────────────────────────

    public int PayrollCutOffDay { get; set; } = 25;

    /// <summary>ISO 4217 currency code override; null = use Tenant.DefaultCurrency.</summary>
    public string? PayrollCurrency { get; set; }

    public bool EnableEndOfServiceCalc { get; set; } = true;

    /// <summary>"Calendar" or "WorkingDays".</summary>
    public string SalaryCalculationBasis { get; set; } = "Calendar";

    // ── Approval Settings ────────────────────────────────

    public bool AutoApproveAfterTimeout { get; set; } = false;
    public int DefaultApprovalTimeoutHours { get; set; } = 72;
    public bool AllowSelfApproval { get; set; } = false;
    public bool RequireApprovalComments { get; set; } = false;

    // ── Notification Settings ────────────────────────────

    public bool EnableEmailNotifications { get; set; } = true;
    public bool EnablePushNotifications { get; set; } = true;
    public bool EnableSmsNotifications { get; set; } = false;
    public bool NotifyManagerOnLeaveRequest { get; set; } = true;
    public bool NotifyEmployeeOnApproval { get; set; } = true;
    public bool DailyAttendanceSummaryEnabled { get; set; } = false;

    // ── Mobile App Settings ──────────────────────────────

    public bool MobileCheckInEnabled { get; set; } = true;
    public bool RequireNfcForMobile { get; set; } = false;
    public bool RequireGpsForMobile { get; set; } = true;
    public bool AllowMockLocation { get; set; } = false;

    // ── Security Settings ────────────────────────────────

    public int PasswordExpiryDays { get; set; } = 90;
    public int MaxLoginAttempts { get; set; } = 5;
    public int SessionTimeoutMinutes { get; set; } = 480;
    public bool Require2FA { get; set; } = false;
    public int PasswordHistoryCount { get; set; } = 3;
}
