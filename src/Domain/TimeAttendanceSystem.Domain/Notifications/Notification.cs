using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Domain.Notifications;

/// <summary>
/// Represents an in-app notification sent to a user.
/// Notifications are used to inform users about workflow events such as
/// request submissions, approvals, rejections, and delegations.
/// </summary>
public class Notification : BaseEntity
{
    /// <summary>
    /// Gets or sets the ID of the user who receives this notification.
    /// </summary>
    public long UserId { get; set; }

    /// <summary>
    /// Gets or sets the type of notification.
    /// </summary>
    public NotificationType Type { get; set; }

    /// <summary>
    /// Gets or sets the notification title in English.
    /// </summary>
    public string TitleEn { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification title in Arabic.
    /// </summary>
    public string TitleAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification message in English.
    /// </summary>
    public string MessageEn { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the notification message in Arabic.
    /// </summary>
    public string MessageAr { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets whether the notification has been read by the user.
    /// </summary>
    public bool IsRead { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the notification was read.
    /// </summary>
    public DateTime? ReadAt { get; set; }

    /// <summary>
    /// Gets or sets the type of entity this notification relates to.
    /// Examples: "Vacation", "Excuse", "RemoteWork"
    /// </summary>
    public string? EntityType { get; set; }

    /// <summary>
    /// Gets or sets the ID of the related entity.
    /// </summary>
    public long? EntityId { get; set; }

    /// <summary>
    /// Gets or sets the URL to navigate when the notification is clicked.
    /// </summary>
    public string? ActionUrl { get; set; }

    /// <summary>
    /// Navigation property to the user who receives this notification.
    /// </summary>
    public virtual User User { get; set; } = null!;
}
