namespace TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;

/// <summary>
/// Employee dashboard data transfer object
/// </summary>
public class EmployeeDashboardDto
{
    /// <summary>
    /// Employee ID
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Employee full name
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Current month attendance rate (percentage)
    /// </summary>
    public decimal AttendanceRate { get; set; }

    /// <summary>
    /// Attendance rate trend compared to last month (percentage)
    /// </summary>
    public decimal AttendanceTrend { get; set; }

    /// <summary>
    /// Total working hours for current month
    /// </summary>
    public decimal TotalWorkingHours { get; set; }

    /// <summary>
    /// Total overtime hours for current month
    /// </summary>
    public decimal TotalOvertimeHours { get; set; }

    /// <summary>
    /// Remaining vacation days available
    /// </summary>
    public int RemainingVacationDays { get; set; }

    /// <summary>
    /// Count of pending requests (vacations + excuses)
    /// </summary>
    public int PendingRequestsCount { get; set; }

    /// <summary>
    /// Recent activity timeline
    /// </summary>
    public List<ActivityDto> RecentActivity { get; set; } = new();
}

/// <summary>
/// Activity item for timeline display
/// </summary>
public class ActivityDto
{
    /// <summary>
    /// Type of activity (Attendance, Vacation, Excuse, etc.)
    /// </summary>
    public string Type { get; set; } = string.Empty;

    /// <summary>
    /// Activity description
    /// </summary>
    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Activity timestamp
    /// </summary>
    public DateTime Timestamp { get; set; }

    /// <summary>
    /// Font Awesome icon class
    /// </summary>
    public string Icon { get; set; } = string.Empty;

    /// <summary>
    /// Bootstrap variant (success, info, warning, danger)
    /// </summary>
    public string Variant { get; set; } = "info";
}
