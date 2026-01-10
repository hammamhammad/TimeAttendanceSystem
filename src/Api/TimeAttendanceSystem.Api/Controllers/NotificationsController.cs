using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TimeAttendanceSystem.Application.Abstractions;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// Controller for managing user notifications.
/// Provides endpoints for retrieving, reading, and managing in-app notifications.
/// </summary>
[ApiController]
[Route("api/v1/notifications")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly IInAppNotificationService _notificationService;

    public NotificationsController(IInAppNotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    /// <summary>
    /// Get notifications for the current user.
    /// </summary>
    /// <param name="unreadOnly">If true, only return unread notifications.</param>
    /// <param name="limit">Maximum number of notifications to return (default: 50).</param>
    [HttpGet]
    public async Task<IActionResult> GetNotifications(
        [FromQuery] bool unreadOnly = false,
        [FromQuery] int limit = 50)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var notifications = await _notificationService.GetUserNotificationsAsync(
            userId.Value,
            unreadOnly,
            limit);

        return Ok(notifications);
    }

    /// <summary>
    /// Get the count of unread notifications for the current user.
    /// </summary>
    [HttpGet("unread-count")]
    public async Task<IActionResult> GetUnreadCount()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        var count = await _notificationService.GetUnreadCountAsync(userId.Value);

        return Ok(new { count });
    }

    /// <summary>
    /// Mark a specific notification as read.
    /// </summary>
    /// <param name="id">The notification ID.</param>
    [HttpPost("{id}/mark-read")]
    public async Task<IActionResult> MarkAsRead(long id)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        await _notificationService.MarkAsReadAsync(id, userId.Value);

        return NoContent();
    }

    /// <summary>
    /// Mark all notifications as read for the current user.
    /// </summary>
    [HttpPost("mark-all-read")]
    public async Task<IActionResult> MarkAllAsRead()
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        await _notificationService.MarkAllAsReadAsync(userId.Value);

        return NoContent();
    }

    /// <summary>
    /// Delete a specific notification.
    /// </summary>
    /// <param name="id">The notification ID.</param>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNotification(long id)
    {
        var userId = GetCurrentUserId();
        if (userId == null)
        {
            return Unauthorized(new { error = "User not authenticated." });
        }

        await _notificationService.DeleteNotificationAsync(id, userId.Value);

        return NoContent();
    }

    private long? GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")?.Value
            ?? User.FindFirst("userId")?.Value;

        if (string.IsNullOrEmpty(userIdClaim) || !long.TryParse(userIdClaim, out var userId))
        {
            return null;
        }

        return userId;
    }
}
