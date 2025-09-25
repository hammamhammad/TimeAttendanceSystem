namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for changing the shift assignment for a specific attendance record.
/// This allows changing the shift for a specific date without modifying future assignments.
/// </summary>
public class ChangeAttendanceShiftRequest
{
    /// <summary>
    /// The ID of the new shift to assign for this attendance record.
    /// </summary>
    public long ShiftId { get; set; }

    /// <summary>
    /// Optional notes explaining the reason for the shift change.
    /// </summary>
    public string? Notes { get; set; }
}