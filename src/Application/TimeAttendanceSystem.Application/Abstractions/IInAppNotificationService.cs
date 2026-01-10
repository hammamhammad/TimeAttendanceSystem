using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for managing in-app notifications.
/// Provides functionality to send, retrieve, and manage user notifications
/// with real-time delivery via SignalR.
/// </summary>
public interface IInAppNotificationService
{
    /// <summary>
    /// Sends a notification to a user and delivers it in real-time via SignalR.
    /// </summary>
    /// <param name="notification">The notification details to send.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The created notification ID.</returns>
    Task<long> SendNotificationAsync(CreateNotificationRequest notification, CancellationToken cancellationToken = default);

    /// <summary>
    /// Sends multiple notifications in bulk.
    /// </summary>
    /// <param name="notifications">The notifications to send.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task SendBulkNotificationsAsync(IEnumerable<CreateNotificationRequest> notifications, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves notifications for a specific user.
    /// </summary>
    /// <param name="userId">The user ID.</param>
    /// <param name="unreadOnly">Whether to return only unread notifications.</param>
    /// <param name="limit">Maximum number of notifications to return.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>List of notifications.</returns>
    Task<List<NotificationDto>> GetUserNotificationsAsync(long userId, bool unreadOnly = false, int limit = 50, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the count of unread notifications for a user.
    /// </summary>
    /// <param name="userId">The user ID.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>The unread notification count.</returns>
    Task<int> GetUnreadCountAsync(long userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Marks a specific notification as read.
    /// </summary>
    /// <param name="notificationId">The notification ID.</param>
    /// <param name="userId">The user ID (for validation).</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task MarkAsReadAsync(long notificationId, long userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Marks all notifications for a user as read.
    /// </summary>
    /// <param name="userId">The user ID.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task MarkAllAsReadAsync(long userId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes a notification.
    /// </summary>
    /// <param name="notificationId">The notification ID.</param>
    /// <param name="userId">The user ID (for validation).</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    Task DeleteNotificationAsync(long notificationId, long userId, CancellationToken cancellationToken = default);
}

/// <summary>
/// Request model for creating a new notification.
/// </summary>
public class CreateNotificationRequest
{
    /// <summary>
    /// The ID of the user who will receive the notification.
    /// </summary>
    public long UserId { get; set; }

    /// <summary>
    /// The type of notification.
    /// </summary>
    public NotificationType Type { get; set; }

    /// <summary>
    /// The notification title in English.
    /// </summary>
    public string TitleEn { get; set; } = string.Empty;

    /// <summary>
    /// The notification title in Arabic.
    /// </summary>
    public string TitleAr { get; set; } = string.Empty;

    /// <summary>
    /// The notification message in English.
    /// </summary>
    public string MessageEn { get; set; } = string.Empty;

    /// <summary>
    /// The notification message in Arabic.
    /// </summary>
    public string MessageAr { get; set; } = string.Empty;

    /// <summary>
    /// The type of entity this notification relates to (e.g., "Vacation", "Excuse").
    /// </summary>
    public string? EntityType { get; set; }

    /// <summary>
    /// The ID of the related entity.
    /// </summary>
    public long? EntityId { get; set; }

    /// <summary>
    /// The URL to navigate when the notification is clicked.
    /// </summary>
    public string? ActionUrl { get; set; }
}

/// <summary>
/// DTO for returning notification data.
/// </summary>
public class NotificationDto
{
    public long Id { get; set; }
    public NotificationType Type { get; set; }
    public string TitleEn { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string MessageEn { get; set; } = string.Empty;
    public string MessageAr { get; set; } = string.Empty;
    public bool IsRead { get; set; }
    public DateTime? ReadAt { get; set; }
    public string? EntityType { get; set; }
    public long? EntityId { get; set; }
    public string? ActionUrl { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
