namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for generating attendance reports with filtering options.
/// </summary>
public class AttendanceReportRequest
{
    /// <summary>
    /// Gets or sets the start date for the report period.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the end date for the report period.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Gets or sets the branch filter. If null, includes all branches user has access to.
    /// </summary>
    public long? BranchId { get; set; }

    /// <summary>
    /// Gets or sets the department filter. If null, includes all departments.
    /// </summary>
    public long? DepartmentId { get; set; }

    /// <summary>
    /// Gets or sets the specific employee filter. If provided, only this employee's attendance.
    /// </summary>
    public long? EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets whether to include detailed transaction information.
    /// </summary>
    public bool IncludeTransactions { get; set; } = false;

    /// <summary>
    /// Gets or sets whether to include working day analysis.
    /// </summary>
    public bool IncludeWorkingDayAnalysis { get; set; } = false;

    /// <summary>
    /// Gets or sets the page number for pagination (1-based).
    /// </summary>
    public int PageNumber { get; set; } = 1;

    /// <summary>
    /// Gets or sets the page size for pagination.
    /// </summary>
    public int PageSize { get; set; } = 50;
}