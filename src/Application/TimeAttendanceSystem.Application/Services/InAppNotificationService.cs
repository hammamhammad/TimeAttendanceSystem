using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service for managing in-app notifications.
/// Handles notification creation, retrieval, and real-time delivery via SignalR.
/// </summary>
public class InAppNotificationService : IInAppNotificationService
{
    private readonly IApplicationDbContext _context;
    private readonly INotificationHubContext _hubContext;

    public InAppNotificationService(
        IApplicationDbContext context,
        INotificationHubContext hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    /// <inheritdoc />
    public async Task<long> SendNotificationAsync(CreateNotificationRequest notification, CancellationToken cancellationToken = default)
    {
        var entity = new Notification
        {
            UserId = notification.UserId,
            Type = notification.Type,
            TitleEn = notification.TitleEn,
            TitleAr = notification.TitleAr,
            MessageEn = notification.MessageEn,
            MessageAr = notification.MessageAr,
            EntityType = notification.EntityType,
            EntityId = notification.EntityId,
            ActionUrl = notification.ActionUrl,
            IsRead = false
        };

        _context.Notifications.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        // Send real-time notification via SignalR
        var dto = MapToDto(entity);
        await _hubContext.SendNotificationToUserAsync(notification.UserId, dto);

        // Send updated unread count
        var unreadCount = await GetUnreadCountAsync(notification.UserId, cancellationToken);
        await _hubContext.SendUnreadCountUpdateAsync(notification.UserId, unreadCount);

        return entity.Id;
    }

    /// <inheritdoc />
    public async Task SendBulkNotificationsAsync(IEnumerable<CreateNotificationRequest> notifications, CancellationToken cancellationToken = default)
    {
        var entities = notifications.Select(n => new Notification
        {
            UserId = n.UserId,
            Type = n.Type,
            TitleEn = n.TitleEn,
            TitleAr = n.TitleAr,
            MessageEn = n.MessageEn,
            MessageAr = n.MessageAr,
            EntityType = n.EntityType,
            EntityId = n.EntityId,
            ActionUrl = n.ActionUrl,
            IsRead = false
        }).ToList();

        _context.Notifications.AddRange(entities);
        await _context.SaveChangesAsync(cancellationToken);

        // Send real-time notifications via SignalR
        var userNotifications = entities.GroupBy(e => e.UserId);
        foreach (var group in userNotifications)
        {
            foreach (var entity in group)
            {
                var dto = MapToDto(entity);
                await _hubContext.SendNotificationToUserAsync(group.Key, dto);
            }

            // Send updated unread count for each user
            var unreadCount = await GetUnreadCountAsync(group.Key, cancellationToken);
            await _hubContext.SendUnreadCountUpdateAsync(group.Key, unreadCount);
        }
    }

    /// <inheritdoc />
    public async Task<List<NotificationDto>> GetUserNotificationsAsync(long userId, bool unreadOnly = false, int limit = 50, CancellationToken cancellationToken = default)
    {
        var query = _context.Notifications
            .Where(n => n.UserId == userId)
            .OrderByDescending(n => n.CreatedAtUtc);

        if (unreadOnly)
        {
            query = (IOrderedQueryable<Notification>)query.Where(n => !n.IsRead);
        }

        var notifications = await query
            .Take(limit)
            .ToListAsync(cancellationToken);

        return notifications.Select(MapToDto).ToList();
    }

    /// <inheritdoc />
    public async Task<int> GetUnreadCountAsync(long userId, CancellationToken cancellationToken = default)
    {
        return await _context.Notifications
            .CountAsync(n => n.UserId == userId && !n.IsRead, cancellationToken);
    }

    /// <inheritdoc />
    public async Task MarkAsReadAsync(long notificationId, long userId, CancellationToken cancellationToken = default)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId, cancellationToken);

        if (notification != null && !notification.IsRead)
        {
            notification.IsRead = true;
            notification.ReadAt = DateTime.UtcNow;
            await _context.SaveChangesAsync(cancellationToken);

            // Send updated unread count
            var unreadCount = await GetUnreadCountAsync(userId, cancellationToken);
            await _hubContext.SendUnreadCountUpdateAsync(userId, unreadCount);
        }
    }

    /// <inheritdoc />
    public async Task MarkAllAsReadAsync(long userId, CancellationToken cancellationToken = default)
    {
        var unreadNotifications = await _context.Notifications
            .Where(n => n.UserId == userId && !n.IsRead)
            .ToListAsync(cancellationToken);

        if (unreadNotifications.Any())
        {
            var now = DateTime.UtcNow;
            foreach (var notification in unreadNotifications)
            {
                notification.IsRead = true;
                notification.ReadAt = now;
            }
            await _context.SaveChangesAsync(cancellationToken);

            // Send updated unread count (0)
            await _hubContext.SendUnreadCountUpdateAsync(userId, 0);
        }
    }

    /// <inheritdoc />
    public async Task DeleteNotificationAsync(long notificationId, long userId, CancellationToken cancellationToken = default)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == notificationId && n.UserId == userId, cancellationToken);

        if (notification != null)
        {
            notification.IsDeleted = true;
            await _context.SaveChangesAsync(cancellationToken);

            // Send updated unread count if the notification was unread
            if (!notification.IsRead)
            {
                var unreadCount = await GetUnreadCountAsync(userId, cancellationToken);
                await _hubContext.SendUnreadCountUpdateAsync(userId, unreadCount);
            }
        }
    }

    private static NotificationDto MapToDto(Notification entity)
    {
        return new NotificationDto
        {
            Id = entity.Id,
            Type = entity.Type,
            TitleEn = entity.TitleEn,
            TitleAr = entity.TitleAr,
            MessageEn = entity.MessageEn,
            MessageAr = entity.MessageAr,
            IsRead = entity.IsRead,
            ReadAt = entity.ReadAt,
            EntityType = entity.EntityType,
            EntityId = entity.EntityId,
            ActionUrl = entity.ActionUrl,
            CreatedAtUtc = entity.CreatedAtUtc
        };
    }
}
