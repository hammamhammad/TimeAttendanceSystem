namespace TimeAttendanceSystem.Api.Models;

/// <summary>
/// Request model for bulk updating attendance records.
/// Contains the record ID and the updates to apply.
/// </summary>
public class BulkAttendanceUpdateRequest
{
    /// <summary>
    /// Gets or sets the attendance record ID to update.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets the updates to apply to this record.
    /// </summary>
    public UpdateAttendanceRecordRequest Updates { get; set; } = new();
}

/// <summary>
/// Result of a bulk update operation for a single record.
/// </summary>
public class BulkUpdateResult
{
    /// <summary>
    /// Gets or sets the attendance record ID that was processed.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Gets or sets whether the update was successful.
    /// </summary>
    public bool Success { get; set; }

    /// <summary>
    /// Gets or sets the result message (success confirmation or error details).
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets any validation errors that occurred.
    /// </summary>
    public List<string> Errors { get; set; } = new();
}