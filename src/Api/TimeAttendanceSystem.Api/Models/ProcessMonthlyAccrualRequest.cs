namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for processing monthly leave accrual.
/// </summary>
public class ProcessMonthlyAccrualRequest
{
    /// <summary>
    /// Calendar year for accrual processing (required).
    /// </summary>
    public int Year { get; set; }

    /// <summary>
    /// Month number (1-12) for accrual processing (required).
    /// </summary>
    public int Month { get; set; }

    /// <summary>
    /// Optional employee ID to process specific employee only.
    /// If null, processes all eligible employees.
    /// </summary>
    public long? EmployeeId { get; set; }
}
