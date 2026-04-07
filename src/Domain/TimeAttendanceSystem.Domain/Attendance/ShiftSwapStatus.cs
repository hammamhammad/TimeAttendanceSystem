namespace TecAxle.Hrms.Domain.Attendance;

/// <summary>
/// Enumeration defining the possible statuses for a shift swap request.
/// Tracks the lifecycle of a shift swap from initial request through resolution.
/// </summary>
public enum ShiftSwapStatus
{
    /// <summary>
    /// Shift swap request has been submitted and is awaiting approval.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// The target employee has accepted the swap request.
    /// </summary>
    AcceptedByPeer = 2,

    /// <summary>
    /// The target employee has declined the swap request.
    /// </summary>
    DeclinedByPeer = 3,

    /// <summary>
    /// The swap request has been approved by a manager or workflow.
    /// </summary>
    Approved = 4,

    /// <summary>
    /// The swap request has been rejected by a manager or workflow.
    /// </summary>
    Rejected = 5,

    /// <summary>
    /// The swap request has been cancelled by the requesting employee.
    /// </summary>
    Cancelled = 6
}
