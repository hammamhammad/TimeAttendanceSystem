using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace TimeAttendanceSystem.Api.Hubs;

/// <summary>
/// SignalR hub for real-time notification delivery.
/// Handles user connection management and notification broadcasting.
/// </summary>
[Authorize]
public class NotificationHub : Hub
{
    private readonly ILogger<NotificationHub> _logger;

    public NotificationHub(ILogger<NotificationHub> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Called when a client connects to the hub.
    /// Adds the user to their personal notification group.
    /// </summary>
    public override async Task OnConnectedAsync()
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrEmpty(userId))
        {
            // Add user to their personal group for targeted notifications
            await Groups.AddToGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} connected to notification hub with connection {ConnectionId}",
                userId, Context.ConnectionId);
        }
        else
        {
            _logger.LogWarning("Unauthenticated connection attempt to notification hub");
        }

        await base.OnConnectedAsync();
    }

    /// <summary>
    /// Called when a client disconnects from the hub.
    /// </summary>
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var userId = Context.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (!string.IsNullOrEmpty(userId))
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, $"user_{userId}");
            _logger.LogInformation("User {UserId} disconnected from notification hub", userId);
        }

        if (exception != null)
        {
            _logger.LogError(exception, "Notification hub connection error for user {UserId}", userId);
        }

        await base.OnDisconnectedAsync(exception);
    }
}
