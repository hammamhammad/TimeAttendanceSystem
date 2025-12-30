namespace TimeAttendanceSystem.Application.Features.Portal.Team.Queries;

/// <summary>
/// Team member data transfer object
/// </summary>
public class TeamMemberDto
{
    /// <summary>
    /// Employee ID
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Employee code
    /// </summary>
    public string EmployeeCode { get; set; } = string.Empty;

    /// <summary>
    /// Employee full name
    /// </summary>
    public string FullName { get; set; } = string.Empty;

    /// <summary>
    /// First name
    /// </summary>
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// Last name
    /// </summary>
    public string LastName { get; set; } = string.Empty;

    /// <summary>
    /// Email address
    /// </summary>
    public string? Email { get; set; }

    /// <summary>
    /// Phone number
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// Department ID
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Department name
    /// </summary>
    public string? DepartmentName { get; set; }

    /// <summary>
    /// Branch ID
    /// </summary>
    public long BranchId { get; set; }

    /// <summary>
    /// Branch name
    /// </summary>
    public string? BranchName { get; set; }

    /// <summary>
    /// Job title
    /// </summary>
    public string? JobTitle { get; set; }

    /// <summary>
    /// Direct manager employee ID
    /// </summary>
    public long? ManagerEmployeeId { get; set; }

    /// <summary>
    /// Direct manager name
    /// </summary>
    public string? ManagerName { get; set; }

    /// <summary>
    /// Hierarchy level from the requesting manager (0 = direct report)
    /// </summary>
    public int HierarchyLevel { get; set; }

    /// <summary>
    /// Is this a direct report of the requesting manager
    /// </summary>
    public bool IsDirectReport { get; set; }

    /// <summary>
    /// Is the employee currently active
    /// </summary>
    public bool IsActive { get; set; }

    /// <summary>
    /// Hire date
    /// </summary>
    public DateTime? HireDate { get; set; }

    /// <summary>
    /// Profile photo URL
    /// </summary>
    public string? PhotoUrl { get; set; }

    /// <summary>
    /// Today's attendance status (if available)
    /// </summary>
    public string? TodayStatus { get; set; }

    /// <summary>
    /// Count of pending requests from this employee
    /// </summary>
    public int PendingRequestsCount { get; set; }

    /// <summary>
    /// Number of direct reports (sub-team size)
    /// </summary>
    public int DirectReportsCount { get; set; }
}

/// <summary>
/// Paginated response for team members
/// </summary>
public class TeamMembersPagedResult
{
    /// <summary>
    /// List of team members
    /// </summary>
    public List<TeamMemberDto> Items { get; set; } = new();

    /// <summary>
    /// Total count of all team members
    /// </summary>
    public int TotalCount { get; set; }

    /// <summary>
    /// Current page number (1-based)
    /// </summary>
    public int Page { get; set; }

    /// <summary>
    /// Page size
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total number of pages
    /// </summary>
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);

    /// <summary>
    /// Has more pages
    /// </summary>
    public bool HasNextPage => Page < TotalPages;

    /// <summary>
    /// Has previous pages
    /// </summary>
    public bool HasPreviousPage => Page > 1;
}
