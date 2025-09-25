namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for daily attendance generation operations.
/// Provides automated attendance record generation for all employees based on their shift assignments.
/// </summary>
public interface IDailyAttendanceGeneratorService
{
    /// <summary>
    /// Generates attendance records for all employees for a specific date.
    /// Creates default attendance records based on assigned shifts.
    /// </summary>
    /// <param name="date">The date to generate attendance records for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of attendance records generated</returns>
    Task<int> GenerateAttendanceRecordsAsync(DateTime date, CancellationToken cancellationToken = default);

    /// <summary>
    /// Generates attendance records for a specific branch for a date.
    /// </summary>
    /// <param name="branchId">The branch identifier</param>
    /// <param name="date">The date to generate attendance records for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of attendance records generated</returns>
    Task<int> GenerateAttendanceRecordsForBranchAsync(long branchId, DateTime date, CancellationToken cancellationToken = default);

    /// <summary>
    /// Generates attendance records for a specific employee for a date.
    /// </summary>
    /// <param name="employeeId">The employee identifier</param>
    /// <param name="date">The date to generate attendance record for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if attendance record was generated</returns>
    Task<bool> GenerateAttendanceRecordForEmployeeAsync(long employeeId, DateTime date, CancellationToken cancellationToken = default);

    /// <summary>
    /// Runs the daily attendance generation for the current date.
    /// This method is called by the scheduled background job.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Generation result with statistics</returns>
    Task<AttendanceGenerationResult> RunDailyGenerationAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Recalculates attendance records that have new transactions.
    /// Updates existing records when transactions are added or modified.
    /// </summary>
    /// <param name="date">The date to recalculate attendance for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of records recalculated</returns>
    Task<int> RecalculateAttendanceRecordsAsync(DateTime date, CancellationToken cancellationToken = default);

    /// <summary>
    /// Generates missing attendance records for a date range.
    /// Useful for backfilling attendance data.
    /// </summary>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Total number of records generated</returns>
    Task<int> GenerateMissingAttendanceRecordsAsync(DateTime startDate, DateTime endDate, long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Finalizes attendance records for a completed date.
    /// Marks records as finalized and runs final calculations.
    /// </summary>
    /// <param name="date">The date to finalize attendance for</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of records finalized</returns>
    Task<int> FinalizeAttendanceRecordsAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default);
}

/// <summary>
/// Result of attendance generation operation.
/// </summary>
public class AttendanceGenerationResult
{
    public DateTime Date { get; set; }
    public int TotalEmployees { get; set; }
    public int RecordsGenerated { get; set; }
    public int RecordsSkipped { get; set; }
    public int RecordsUpdated { get; set; }
    public int ErrorCount { get; set; }
    public List<string> Errors { get; set; } = new();
    public TimeSpan Duration { get; set; }
    public bool IsSuccessful => ErrorCount == 0;
}