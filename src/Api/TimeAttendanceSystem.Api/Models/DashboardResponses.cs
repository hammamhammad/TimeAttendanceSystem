namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Comprehensive dashboard overview response containing system-wide statistics
/// </summary>
public class DashboardOverviewResponse
{
    public OrganizationStatistics Organization { get; set; } = new();
    public HumanResourcesStatistics HumanResources { get; set; } = new();
    public DashboardAttendanceStatistics Attendance { get; set; } = new();
    public LeaveStatistics Leaves { get; set; } = new();
    public ShiftStatistics Shifts { get; set; } = new();
    public SystemStatistics System { get; set; } = new();
}

/// <summary>
/// Organization structure statistics
/// </summary>
public class OrganizationStatistics
{
    public int TotalBranches { get; set; }
    public int TotalDepartments { get; set; }
    public int ActiveBranches { get; set; }
    public int ActiveDepartments { get; set; }
    public List<BranchSummary> BranchSummaries { get; set; } = new();
    public List<DepartmentSummary> DepartmentSummaries { get; set; } = new();
}

/// <summary>
/// Human resources statistics
/// </summary>
public class HumanResourcesStatistics
{
    public int TotalEmployees { get; set; }
    public int ActiveEmployees { get; set; }
    public int InactiveEmployees { get; set; }
    public int TotalUsers { get; set; }
    public int ActiveUsers { get; set; }
    public int InactiveUsers { get; set; }
    public List<RoleDistribution> RoleDistribution { get; set; } = new();
    public List<EmploymentStatusDistribution> EmploymentStatusDistribution { get; set; } = new();
}

/// <summary>
/// Attendance overview statistics for dashboard
/// </summary>
public class DashboardAttendanceStatistics
{
    public int TodayPresent { get; set; }
    public int TodayAbsent { get; set; }
    public int TodayLate { get; set; }
    public double AttendanceRate { get; set; }
    public int TodayOvertime { get; set; }
    public List<DailyAttendanceTrend> WeeklyTrend { get; set; } = new();
    public List<IncompleteAttendanceRecord> IncompleteRecords { get; set; } = new();
}

/// <summary>
/// Leave management statistics
/// </summary>
public class LeaveStatistics
{
    public int PendingRequests { get; set; }
    public int ApprovedToday { get; set; }
    public int OnLeaveToday { get; set; }
    public int RejectedToday { get; set; }
    public List<VacationSummary> UpcomingVacations { get; set; } = new();
    public List<VacationTypeSummary> VacationTypeBreakdown { get; set; } = new();
}

/// <summary>
/// Shift management statistics
/// </summary>
public class ShiftStatistics
{
    public int ActiveShifts { get; set; }
    public int TotalShiftAssignments { get; set; }
    public int TodayCoverage { get; set; }
    public int UnassignedShifts { get; set; }
    public List<ShiftCoverageSummary> ShiftCoverage { get; set; } = new();
}

/// <summary>
/// System health and activity statistics
/// </summary>
public class SystemStatistics
{
    public int ActiveSessions { get; set; }
    public DateTime LastBackup { get; set; }
    public string SystemUptime { get; set; } = string.Empty;
    public List<RecentActivity> RecentActivities { get; set; } = new();
    public int TodayLogins { get; set; }
    public int TodayApiCalls { get; set; }
}

/// <summary>
/// Branch summary information
/// </summary>
public class BranchSummary
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
    public int ActiveEmployees { get; set; }
    public bool IsActive { get; set; }
}

/// <summary>
/// Department summary information
/// </summary>
public class DepartmentSummary
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public int EmployeeCount { get; set; }
    public int ActiveEmployees { get; set; }
    public bool IsActive { get; set; }
}

/// <summary>
/// Role distribution information
/// </summary>
public class RoleDistribution
{
    public string RoleName { get; set; } = string.Empty;
    public int UserCount { get; set; }
    public double Percentage { get; set; }
}

/// <summary>
/// Employment status distribution
/// </summary>
public class EmploymentStatusDistribution
{
    public string Status { get; set; } = string.Empty;
    public int Count { get; set; }
    public double Percentage { get; set; }
}

/// <summary>
/// Daily attendance trend data
/// </summary>
public class DailyAttendanceTrend
{
    public DateTime Date { get; set; }
    public int TotalEmployees { get; set; }
    public int PresentEmployees { get; set; }
    public int AbsentEmployees { get; set; }
    public int LateEmployees { get; set; }
    public double AttendanceRate { get; set; }
}

/// <summary>
/// Incomplete attendance record summary
/// </summary>
public class IncompleteAttendanceRecord
{
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime? CheckInTime { get; set; }
    public DateTime? CheckOutTime { get; set; }
}

/// <summary>
/// Vacation summary information
/// </summary>
public class VacationSummary
{
    public long VacationId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public string VacationType { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int DaysCount { get; set; }
    public string Status { get; set; } = string.Empty;
}

/// <summary>
/// Vacation type breakdown
/// </summary>
public class VacationTypeSummary
{
    public string VacationType { get; set; } = string.Empty;
    public int TotalRequests { get; set; }
    public int PendingRequests { get; set; }
    public int ApprovedRequests { get; set; }
    public int RejectedRequests { get; set; }
}

/// <summary>
/// Shift coverage summary
/// </summary>
public class ShiftCoverageSummary
{
    public long ShiftId { get; set; }
    public string ShiftName { get; set; } = string.Empty;
    public string TimeRange { get; set; } = string.Empty;
    public int RequiredEmployees { get; set; }
    public int AssignedEmployees { get; set; }
    public double CoveragePercentage { get; set; }
}

/// <summary>
/// Recent system activity
/// </summary>
public class RecentActivity
{
    public long Id { get; set; }
    public string ActivityType { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Module { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
}