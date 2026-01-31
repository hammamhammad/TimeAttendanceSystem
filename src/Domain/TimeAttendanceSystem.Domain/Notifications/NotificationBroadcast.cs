using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Notifications;

/// <summary>
/// Domain entity representing a notification broadcast sent by an administrator.
/// Allows sending notifications to multiple recipients based on targeting criteria
/// such as all employees, specific branches, departments, or selected individuals.
/// </summary>
/// <remarks>
/// Broadcast Features:
/// - Multiple targeting options (All, Branch, Department, Employees)
/// - Dual-channel delivery (In-App, Push, or Both)
/// - Bilingual content support (English and Arabic)
/// - Delivery tracking and statistics
/// 
/// Targeting Types:
/// - All: Send to all active employees in the system
/// - Branch: Send to all employees in specified branch(es)
/// - Department: Send to all employees in specified department(s)
/// - Employees: Send to specific selected employee(s)
/// 
/// Delivery Channels:
/// - InApp: Notification appears in the notification center via SignalR
/// - Push: Push notification sent to mobile devices via FCM
/// - Both: Sent through both channels for maximum visibility
/// </remarks>
public class NotificationBroadcast : BaseEntity
{
    /// <summary>
    /// Gets or sets the notification title in English.
    /// </summary>
    public string Title { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification title in Arabic.
    /// </summary>
    public string TitleAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification message/body in English.
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification message/body in Arabic.
    /// </summary>
    public string MessageAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the targeting type for this broadcast.
    /// Determines how the recipient list is built.
    /// </summary>
    public BroadcastTargetType TargetType { get; set; }

    /// <summary>
    /// Gets or sets the JSON array of target IDs based on TargetType.
    /// - For Branch: array of branch IDs
    /// - For Department: array of department IDs
    /// - For Employees: array of employee IDs
    /// - For All: this field is ignored
    /// </summary>
    public string? TargetIds { get; set; }

    /// <summary>
    /// Gets or sets the delivery channel for this broadcast.
    /// </summary>
    public NotificationChannel Channel { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user/admin who sent this broadcast.
    /// </summary>
    public long SentByUserId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the broadcast was initiated.
    /// </summary>
    public DateTime SentAt { get; set; }

    /// <summary>
    /// Gets or sets the total number of intended recipients.
    /// </summary>
    public int TotalRecipients { get; set; }

    /// <summary>
    /// Gets or sets the count of successfully delivered notifications.
    /// Includes both in-app and push delivery confirmations.
    /// </summary>
    public int DeliveredCount { get; set; }

    /// <summary>
    /// Gets or sets an optional URL to navigate when notification is tapped.
    /// </summary>
    public string? ActionUrl { get; set; }

    /// <summary>
    /// Navigation property to the user who sent this broadcast.
    /// </summary>
    public virtual User SentByUser { get; set; } = null!;

    /// <summary>
    /// Navigation property to individual notifications created from this broadcast.
    /// </summary>
    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}

/// <summary>
/// Represents the targeting type for a notification broadcast.
/// </summary>
public enum BroadcastTargetType
{
    /// <summary>Send to all active employees</summary>
    All = 1,
    /// <summary>Send to employees in specified branches</summary>
    Branch = 2,
    /// <summary>Send to employees in specified departments</summary>
    Department = 3,
    /// <summary>Send to specific selected employees</summary>
    Employees = 4
}

/// <summary>
/// Represents the delivery channel for notifications.
/// </summary>
public enum NotificationChannel
{
    /// <summary>In-app notification only (via SignalR)</summary>
    InApp = 1,
    /// <summary>Push notification only (via FCM)</summary>
    Push = 2,
    /// <summary>Both in-app and push notification</summary>
    Both = 3
}
