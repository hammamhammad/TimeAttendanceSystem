namespace TecAxle.Hrms.Domain.LeaveManagement;

/// <summary>
/// Enumeration defining the possible statuses for a compensatory off entitlement.
/// Tracks the lifecycle of a comp-off from being earned through consumption or expiry.
/// </summary>
public enum CompensatoryOffStatus
{
    /// <summary>
    /// Compensatory off is available for use by the employee.
    /// </summary>
    Available = 1,

    /// <summary>
    /// Compensatory off has been used against a vacation/leave request.
    /// </summary>
    Used = 2,

    /// <summary>
    /// Compensatory off has expired without being used.
    /// </summary>
    Expired = 3,

    /// <summary>
    /// Compensatory off has been cancelled or revoked.
    /// </summary>
    Cancelled = 4
}
