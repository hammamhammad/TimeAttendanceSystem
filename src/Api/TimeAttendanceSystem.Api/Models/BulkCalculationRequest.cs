namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for bulk attendance calculation operations.
/// </summary>
public class BulkCalculationRequest
{
    /// <summary>
    /// Start date for the calculation range.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// End date for the calculation range.
    /// </summary>
    public DateTime EndDate { get; set; }

    /// <summary>
    /// Optional list of specific employee IDs to process.
    /// If not provided, all active employees will be processed.
    /// </summary>
    public List<long>? EmployeeIds { get; set; }

    /// <summary>
    /// Whether to force recalculation of existing records.
    /// </summary>
    public bool ForceRecalculate { get; set; } = false;
}