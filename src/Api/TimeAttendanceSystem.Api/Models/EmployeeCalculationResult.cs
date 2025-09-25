namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Result model for individual employee calculation operations.
/// </summary>
public class EmployeeCalculationResult
{
    /// <summary>
    /// Employee identifier.
    /// </summary>
    public long EmployeeId { get; set; }

    /// <summary>
    /// Date of the attendance calculation.
    /// </summary>
    public DateTime Date { get; set; }

    /// <summary>
    /// Action performed (Generated, Recalculated, Existed, Skipped, Error).
    /// </summary>
    public string Action { get; set; } = string.Empty;

    /// <summary>
    /// Whether the operation was successful.
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Optional error message if the operation failed.
    /// </summary>
    public string? ErrorMessage { get; set; }
}