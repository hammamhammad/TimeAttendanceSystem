namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Abstraction for SignalR notification hub context.
/// Allows the Application layer to send real-time notifications without depending on SignalR directly.
/// </summary>
public interface INotificationHubContext
{
    /// <summary>
    /// Sends a notification to a specific user.
    /// </summary>
    /// <param name="userId">The user ID to send the notification to.</param>
    /// <param name="notification">The notification data to send.</param>
    Task SendNotificationToUserAsync(long userId, NotificationDto notification);

    /// <summary>
    /// Sends an unread count update to a specific user.
    /// </summary>
    /// <param name="userId">The user ID to send the update to.</param>
    /// <param name="unreadCount">The current unread notification count.</param>
    Task SendUnreadCountUpdateAsync(long userId, int unreadCount);
}
