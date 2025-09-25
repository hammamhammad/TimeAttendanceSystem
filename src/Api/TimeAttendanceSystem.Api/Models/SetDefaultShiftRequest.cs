namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for setting a shift as the default for newly created employees.
/// </summary>
public class SetDefaultShiftRequest
{
    /// <summary>
    /// Gets or sets whether to force replacement of an existing default shift.
    /// If false and a default shift already exists, the operation will fail.
    /// </summary>
    public bool ForceReplace { get; set; } = false;
}