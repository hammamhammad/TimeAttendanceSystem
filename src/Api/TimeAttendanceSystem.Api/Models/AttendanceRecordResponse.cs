using TimeAttendanceSystem.Domain.Attendance;

namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Response model for attendance record information.
/// </summary>
public class AttendanceRecordResponse
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime AttendanceDate { get; set; }
    public AttendanceStatus Status { get; set; }
    public string StatusText { get; set; } = string.Empty;
    public TimeOnly? ScheduledStartTime { get; set; }
    public TimeOnly? ScheduledEndTime { get; set; }
    public DateTime? ActualCheckInTime { get; set; }
    public DateTime? ActualCheckOutTime { get; set; }
    public decimal ScheduledHours { get; set; }
    public decimal WorkingHours { get; set; }
    public decimal BreakHours { get; set; }
    public decimal OvertimeHours { get; set; }
    public int LateMinutes { get; set; }
    public int EarlyLeaveMinutes { get; set; }
    public bool IsManualOverride { get; set; }
    public bool IsApproved { get; set; }
    public bool IsFinalized { get; set; }
    public string? Notes { get; set; }
    public List<AttendanceTransactionResponse> Transactions { get; set; } = new();
    public WorkingDayAnalysisResponse? WorkingDayAnalysis { get; set; }
}

/// <summary>
/// Response model for attendance transaction information.
/// </summary>
public class AttendanceTransactionResponse
{
    public long Id { get; set; }
    public TransactionType TransactionType { get; set; }
    public string TransactionTypeText { get; set; } = string.Empty;
    public DateTime TransactionTimeUtc { get; set; }
    public DateTime TransactionTimeLocal { get; set; }
    public bool IsManual { get; set; }
    public string? EnteredByUserName { get; set; }
    public string? Notes { get; set; }
    public string? Location { get; set; }
    public string? DeviceId { get; set; }
    public bool IsVerified { get; set; }
}

/// <summary>
/// Response model for working day analysis information.
/// </summary>
public class WorkingDayAnalysisResponse
{
    public DateTime? WorkStartTime { get; set; }
    public DateTime? WorkEndTime { get; set; }
    public decimal TotalTimeOnPremises { get; set; }
    public decimal ProductiveWorkingTime { get; set; }
    public decimal TotalBreakTime { get; set; }
    public int BreakPeriodCount { get; set; }
    public decimal LongestBreakDuration { get; set; }
    public decimal CoreHoursWorked { get; set; }
    public bool CoreHoursCompliant { get; set; }
    public decimal RegularOvertimeHours { get; set; }
    public decimal PremiumOvertimeHours { get; set; }
    public decimal EfficiencyPercentage { get; set; }
    public bool IsCalculationComplete { get; set; }
}