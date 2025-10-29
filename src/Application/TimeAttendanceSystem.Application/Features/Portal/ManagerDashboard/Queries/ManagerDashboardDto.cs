namespace TimeAttendanceSystem.Application.Features.Portal.ManagerDashboard.Queries;

/// <summary>
/// Manager dashboard data transfer object
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
    /// Total number of team members
    /// </summary>
    public int TeamSize { get; set; }

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
    /// Pending fingerprint requests
    /// </summary>
    public int PendingFingerprintRequests { get; set; }

    /// <summary>
    /// Pending remote work requests
    /// </summary>
    public int PendingRemoteWorkRequests { get; set; }
}
