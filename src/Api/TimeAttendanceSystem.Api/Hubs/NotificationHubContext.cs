using Microsoft.AspNetCore.SignalR;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Api.Hubs;

/// <summary>
/// Adapter that implements INotificationHubContext using SignalR's IHubContext.
/// Enables the Application layer to send real-time notifications without direct SignalR dependency.
/// </summary>
public class NotificationHubContext : INotificationHubContext
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public NotificationHubContext(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    /// <inheritdoc />
    public async Task SendNotificationToUserAsync(long userId, NotificationDto notification)
    {
        await _hubContext.Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notification);
    }

    /// <inheritdoc />
    public async Task SendUnreadCountUpdateAsync(long userId, int unreadCount)
    {
        await _hubContext.Clients.Group($"user_{userId}").SendAsync("UnreadCountUpdated", unreadCount);
    }
}
