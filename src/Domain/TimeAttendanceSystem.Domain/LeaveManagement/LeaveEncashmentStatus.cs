namespace TecAxle.Hrms.Domain.LeaveManagement;

/// <summary>
/// Enumeration defining the possible statuses for a leave encashment request.
/// Tracks the lifecycle of a leave encashment from submission through payment.
/// </summary>
public enum LeaveEncashmentStatus
{
    /// <summary>
    /// Leave encashment request has been submitted and is awaiting approval.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// Leave encashment request has been approved by the authorized approver.
    /// </summary>
    Approved = 2,

    /// <summary>
    /// Leave encashment request has been rejected.
    /// </summary>
    Rejected = 3,

    /// <summary>
    /// Leave encashment has been processed and included in payroll.
    /// </summary>
    Processed = 4,

    /// <summary>
    /// Leave encashment has been paid out to the employee.
    /// </summary>
    Paid = 5,

    /// <summary>
    /// Leave encashment request has been cancelled.
    /// </summary>
    Cancelled = 6
}
