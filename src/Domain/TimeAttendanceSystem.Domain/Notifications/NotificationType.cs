namespace TimeAttendanceSystem.Domain.Notifications;

/// <summary>
/// Defines the types of in-app notifications that can be sent to users.
/// </summary>
public enum NotificationType
{
    /// <summary>
    /// Notification sent to requester when their request is submitted.
    /// </summary>
    RequestSubmitted = 1,

    /// <summary>
    /// Notification sent to requester when their request is approved.
    /// </summary>
    RequestApproved = 2,

    /// <summary>
    /// Notification sent to requester when their request is rejected.
    /// </summary>
    RequestRejected = 3,

    /// <summary>
    /// Notification sent when an approval is delegated to another user.
    /// </summary>
    RequestDelegated = 4,

    /// <summary>
    /// Notification sent when a request is escalated due to timeout.
    /// </summary>
    RequestEscalated = 5,

    /// <summary>
    /// Notification sent to approver when a new request is pending their approval.
    /// </summary>
    ApprovalPending = 6,

    /// <summary>
    /// Notification sent when approval responsibility is delegated to the user.
    /// </summary>
    DelegationReceived = 7,

    /// <summary>
    /// Reminder notification for pending approvals approaching timeout.
    /// </summary>
    ApprovalReminder = 8,

    /// <summary>
    /// Admin broadcast notification sent to multiple recipients.
    /// </summary>
    Broadcast = 9
}
