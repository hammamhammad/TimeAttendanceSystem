namespace TimeAttendanceSystem.Application.Features.Portal.EmployeeDashboard.Queries;

/// <summary>
/// Employee dashboard data transfer object for self-service portal
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
    /// Employee code
    /// </summary>
    public string EmployeeCode { get; set; } = string.Empty;

    /// <summary>
    /// Department name
    /// </summary>
    public string? DepartmentName { get; set; }

    /// <summary>
    /// Branch name
    /// </summary>
    public string? BranchName { get; set; }

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
    /// Count of pending requests (vacations + excuses + remote work)
    /// </summary>
    public int PendingRequestsCount { get; set; }

    /// <summary>
    /// Recent activity timeline
    /// </summary>
    public List<ActivityDto> RecentActivity { get; set; } = new();

    /// <summary>
    /// Today's attendance status
    /// </summary>
    public TodayAttendanceDto? TodayAttendance { get; set; }
}

/// <summary>
/// Activity item for timeline display
/// </summary>
public class ActivityDto
{
    /// <summary>
    /// Type of activity (Attendance, Vacation, Excuse, RemoteWork, etc.)
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

/// <summary>
/// Today's attendance status for quick overview
/// </summary>
public class TodayAttendanceDto
{
    /// <summary>
    /// Check-in time
    /// </summary>
    public DateTime? CheckInTime { get; set; }

    /// <summary>
    /// Check-out time
    /// </summary>
    public DateTime? CheckOutTime { get; set; }

    /// <summary>
    /// Attendance status (Present, Late, Absent, etc.)
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Working hours so far today
    /// </summary>
    public decimal WorkingHours { get; set; }

    /// <summary>
    /// Is on remote work today
    /// </summary>
    public bool IsRemoteWork { get; set; }

    /// <summary>
    /// Is on vacation today
    /// </summary>
    public bool IsOnVacation { get; set; }
}
