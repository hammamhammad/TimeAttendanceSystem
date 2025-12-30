namespace TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;

/// <summary>
/// Manager dashboard data transfer object for self-service portal
/// </summary>
public class ManagerDashboardDto
{
    /// <summary>
    /// Manager employee ID
    /// </summary>
    public long ManagerId { get; set; }

    /// <summary>
    /// Manager full name
    /// </summary>
    public string ManagerName { get; set; } = string.Empty;

    /// <summary>
    /// Total number of team members (full hierarchy - recursive)
    /// </summary>
    public int TeamSize { get; set; }

    /// <summary>
    /// Number of direct reports
    /// </summary>
    public int DirectReportsCount { get; set; }

    /// <summary>
    /// Number of employees present today
    /// </summary>
    public int PresentToday { get; set; }

    /// <summary>
    /// Number of employees absent today
    /// </summary>
    public int AbsentToday { get; set; }

    /// <summary>
    /// Number of employees late today
    /// </summary>
    public int LateToday { get; set; }

    /// <summary>
    /// Number of employees on vacation today
    /// </summary>
    public int OnVacationToday { get; set; }

    /// <summary>
    /// Number of employees working remote today
    /// </summary>
    public int RemoteWorkToday { get; set; }

    /// <summary>
    /// Number of pending approval requests
    /// </summary>
    public int PendingApprovals { get; set; }

    /// <summary>
    /// Team attendance rate for current month (percentage)
    /// </summary>
    public decimal TeamAttendanceRate { get; set; }

    /// <summary>
    /// Team overtime hours for current month
    /// </summary>
    public decimal TeamOvertimeHours { get; set; }

    /// <summary>
    /// Breakdown of pending approvals by type
    /// </summary>
    public PendingApprovalsSummaryDto PendingApprovalsSummary { get; set; } = new();

    /// <summary>
    /// List of recent pending approvals for quick action
    /// </summary>
    public List<RecentPendingApprovalDto> RecentPendingApprovals { get; set; } = new();

    /// <summary>
    /// Team members with attendance issues today
    /// </summary>
    public List<TeamMemberStatusDto> TeamStatusToday { get; set; } = new();
}

/// <summary>
/// Summary of pending approvals by type
/// </summary>
public class PendingApprovalsSummaryDto
{
    /// <summary>
    /// Pending vacation requests
    /// </summary>
    public int PendingVacations { get; set; }

    /// <summary>
    /// Pending excuse requests
    /// </summary>
    public int PendingExcuses { get; set; }

    /// <summary>
    /// Pending remote work requests
    /// </summary>
    public int PendingRemoteWorkRequests { get; set; }

    /// <summary>
    /// Overdue approvals
    /// </summary>
    public int OverdueApprovals { get; set; }
}

/// <summary>
/// Recent pending approval item
/// </summary>
public class RecentPendingApprovalDto
{
    /// <summary>
    /// Workflow instance ID for approval action
    /// </summary>
    public long WorkflowInstanceId { get; set; }

    /// <summary>
    /// Type of request (Vacation, Excuse, RemoteWork)
    /// </summary>
    public string RequestType { get; set; } = string.Empty;

    /// <summary>
    /// Employee name who made the request
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Brief description of the request
    /// </summary>
    public string Summary { get; set; } = string.Empty;

    /// <summary>
    /// When the request was submitted
    /// </summary>
    public DateTime SubmittedAt { get; set; }

    /// <summary>
    /// Is the approval overdue
    /// </summary>
    public bool IsOverdue { get; set; }
}

/// <summary>
/// Team member status for today
/// </summary>
public class TeamMemberStatusDto
{
    /// <summary>
    /// Employee ID
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Employee name
    /// </summary>
    public string EmployeeName { get; set; } = string.Empty;

    /// <summary>
    /// Employee code
    /// </summary>
    public string EmployeeCode { get; set; } = string.Empty;

    /// <summary>
    /// Status (Present, Absent, Late, OnVacation, RemoteWork, etc.)
    /// </summary>
    public string Status { get; set; } = string.Empty;

    /// <summary>
    /// Check-in time if applicable
    /// </summary>
    public DateTime? CheckInTime { get; set; }

    /// <summary>
    /// Late minutes if late
    /// </summary>
    public int? LateMinutes { get; set; }
}
