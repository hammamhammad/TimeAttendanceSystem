namespace TimeAttendanceSystem.Domain.Excuses;

/// <summary>
/// Enumeration defining the approval status of employee excuses.
/// Tracks the workflow state of excuse requests through the approval process.
/// </summary>
public enum ApprovalStatus
{
    /// <summary>
    /// Excuse request is pending approval from authorized personnel.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// Excuse request has been approved and will be applied to attendance calculations.
    /// </summary>
    Approved = 2,

    /// <summary>
    /// Excuse request has been rejected and will not affect attendance.
    /// </summary>
    Rejected = 3
}