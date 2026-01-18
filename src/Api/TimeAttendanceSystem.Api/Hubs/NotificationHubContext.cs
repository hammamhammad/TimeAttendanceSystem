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
    private readonly ILogger<NotificationHubContext> _logger;
    private static readonly TimeSpan SendTimeout = TimeSpan.FromSeconds(3);

    public NotificationHubContext(IHubContext<NotificationHub> hubContext, ILogger<NotificationHubContext> logger)
    {
        _hubContext = hubContext;
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task SendNotificationToUserAsync(long userId, NotificationDto notification)
    {
        try
        {
            using var cts = new CancellationTokenSource(SendTimeout);
            await _hubContext.Clients.Group($"user_{userId}").SendAsync("ReceiveNotification", notification, cts.Token);
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("SignalR SendNotificationToUserAsync timed out for user {UserId}", userId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "SignalR SendNotificationToUserAsync failed for user {UserId}", userId);
        }
    }

    /// <inheritdoc />
    public async Task SendUnreadCountUpdateAsync(long userId, int unreadCount)
    {
        try
        {
            using var cts = new CancellationTokenSource(SendTimeout);
            await _hubContext.Clients.Group($"user_{userId}").SendAsync("UnreadCountUpdated", unreadCount, cts.Token);
        }
        catch (OperationCanceledException)
        {
            _logger.LogWarning("SignalR SendUnreadCountUpdateAsync timed out for user {UserId}", userId);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "SignalR SendUnreadCountUpdateAsync failed for user {UserId}", userId);
        }
    }
}
