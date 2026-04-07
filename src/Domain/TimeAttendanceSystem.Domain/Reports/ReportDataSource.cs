namespace TecAxle.Hrms.Domain.Reports;

/// <summary>
/// Enumeration defining the available data sources for custom report definitions.
/// Determines which domain data is queried when generating a report.
/// </summary>
public enum ReportDataSource
{
    /// <summary>
    /// Report data sourced from attendance records.
    /// </summary>
    Attendance = 1,

    /// <summary>
    /// Report data sourced from employee information.
    /// </summary>
    Employees = 2,

    /// <summary>
    /// Report data sourced from vacation and leave records.
    /// </summary>
    Vacations = 3,

    /// <summary>
    /// Report data sourced from excuse records.
    /// </summary>
    Excuses = 4,

    /// <summary>
    /// Report data sourced from remote work requests.
    /// </summary>
    RemoteWork = 5,

    /// <summary>
    /// Report data sourced from overtime records.
    /// </summary>
    Overtime = 6,

    /// <summary>
    /// Report data sourced from payroll records.
    /// </summary>
    Payroll = 7,

    /// <summary>
    /// Report data sourced from shift assignments and schedules.
    /// </summary>
    Shifts = 8,

    /// <summary>
    /// Report data sourced from leave balance information.
    /// </summary>
    LeaveBalances = 9
}
