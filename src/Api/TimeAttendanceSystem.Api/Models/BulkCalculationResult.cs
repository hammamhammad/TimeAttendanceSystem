namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Result model for bulk attendance calculation operations.
/// </summary>
public class BulkCalculationResult
{
    /// <summary>
    /// Start date of the processed range.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// End date of the processed range.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Total number of employee-date combinations processed.
    /// </summary>
    public int TotalProcessed { get; set; }

    /// <summary>
    /// Total number of successful operations.
    /// </summary>
    public int TotalSuccessful { get; set; }

    /// <summary>
    /// Total number of records generated.
    /// </summary>
    public int TotalGenerated { get; set; }

    /// <summary>
    /// Total number of records recalculated.
    /// </summary>
    public int TotalRecalculated { get; set; }

    /// <summary>
    /// Processing duration in milliseconds.
    /// </summary>
    public long Duration { get; set; }

    /// <summary>
    /// Detailed results for each employee-date combination.
    /// </summary>
    public List<EmployeeCalculationResult> EmployeeResults { get; set; } = new();

    /// <summary>
    /// List of errors that occurred during processing.
    /// </summary>
    public List<string> Errors { get; set; } = new();

    /// <summary>
    /// Indicates if the operation was successful overall.
    /// </summary>
    public bool IsSuccessful => Errors.Count == 0;
}