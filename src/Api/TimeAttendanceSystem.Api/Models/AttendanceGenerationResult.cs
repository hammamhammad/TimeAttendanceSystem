namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// API response model for attendance generation operations.
/// </summary>
public class AttendanceGenerationResult
{
    /// <summary>
    /// Date for which attendance was generated
    /// </summary>
    public DateTime Date { get; set; }

    /// <summary>
    /// Total number of employees processed
    /// </summary>
    public int TotalEmployees { get; set; }

    /// <summary>
    /// Number of new attendance records generated
    /// </summary>
    public int RecordsGenerated { get; set; }

    /// <summary>
    /// Number of records that were skipped (already existed)
    /// </summary>
    public int RecordsSkipped { get; set; }

    /// <summary>
    /// Number of existing records that were updated
    /// </summary>
    public int RecordsUpdated { get; set; }

    /// <summary>
    /// Number of errors encountered during generation
    /// </summary>
    public int ErrorCount { get; set; }

    /// <summary>
    /// List of error messages encountered
    /// </summary>
    public List<string> Errors { get; set; } = new();

    /// <summary>
    /// Duration of the operation in milliseconds
    /// </summary>
    public long Duration { get; set; }

    /// <summary>
    /// Whether the operation completed successfully (no errors)
    /// </summary>
    public bool IsSuccessful => ErrorCount == 0;
}