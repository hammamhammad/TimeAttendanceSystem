using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Notifications;

namespace TimeAttendanceSystem.Application.Notifications.Commands.CreateBroadcast;

/// <summary>
/// Handler for creating notification broadcasts.
/// Determines recipients based on target type and creates individual notifications.
/// </summary>
public class CreateBroadcastCommandHandler : BaseHandler<CreateBroadcastCommand, Result<BroadcastCreatedResult>>
{
    public CreateBroadcastCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<BroadcastCreatedResult>> Handle(CreateBroadcastCommand request, CancellationToken cancellationToken)
    {
        if (!CurrentUser.UserId.HasValue)
        {
            return Result.Failure<BroadcastCreatedResult>("User not authenticated");
        }

        // Get recipient user IDs based on target type
        var recipientUserIds = await GetRecipientUserIds(request.TargetType, request.TargetIds, cancellationToken);

        if (!recipientUserIds.Any())
        {
            return Result.Failure<BroadcastCreatedResult>("No recipients found for the specified target");
        }

        // Create the broadcast record
        var broadcast = new NotificationBroadcast
        {
            Title = request.Title,
            TitleAr = request.TitleAr,
            Message = request.Message,
            MessageAr = request.MessageAr,
            TargetType = request.TargetType,
            TargetIds = request.TargetIds != null ? JsonSerializer.Serialize(request.TargetIds) : null,
            Channel = request.Channel,
            SentByUserId = CurrentUser.UserId.Value,
            SentAt = DateTime.UtcNow,
            TotalRecipients = recipientUserIds.Count,
            DeliveredCount = 0,
            ActionUrl = request.ActionUrl,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        };

        Context.NotificationBroadcasts.Add(broadcast);
        await Context.SaveChangesAsync(cancellationToken);

        // Create individual notifications for each recipient
        var notifications = recipientUserIds.Select(userId => new Notification
        {
            UserId = userId,
            Type = NotificationType.Broadcast,
            TitleEn = request.Title,
            TitleAr = request.TitleAr,
            MessageEn = request.Message,
            MessageAr = request.MessageAr,
            IsRead = false,
            Channel = request.Channel,
            BroadcastId = broadcast.Id,
            DeepLink = request.ActionUrl,
            ActionUrl = request.ActionUrl,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username ?? "System"
        }).ToList();

        foreach (var notification in notifications)
        {
            Context.Notifications.Add(notification);
        }

        await Context.SaveChangesAsync(cancellationToken);

        // TODO: Send push notifications via Firebase Cloud Messaging for push channel
        // This would be handled by a separate service/background job

        return Result.Success(new BroadcastCreatedResult(
            BroadcastId: broadcast.Id,
            TotalRecipients: recipientUserIds.Count,
            Message: $"Broadcast sent to {recipientUserIds.Count} recipients"
        ));
    }

    private async Task<List<long>> GetRecipientUserIds(
        BroadcastTargetType targetType, 
        List<long>? targetIds,
        CancellationToken cancellationToken)
    {
        return targetType switch
        {
            BroadcastTargetType.All => await GetAllActiveUserIds(cancellationToken),
            BroadcastTargetType.Branch => await GetUserIdsByBranches(targetIds ?? new List<long>(), cancellationToken),
            BroadcastTargetType.Department => await GetUserIdsByDepartments(targetIds ?? new List<long>(), cancellationToken),
            BroadcastTargetType.Employees => await GetUserIdsByEmployees(targetIds ?? new List<long>(), cancellationToken),
            _ => new List<long>()
        };
    }

    private async Task<List<long>> GetAllActiveUserIds(CancellationToken cancellationToken)
    {
        return await Context.Users
            .Where(u => u.IsActive)
            .Select(u => u.Id)
            .ToListAsync(cancellationToken);
    }

    private async Task<List<long>> GetUserIdsByBranches(List<long> branchIds, CancellationToken cancellationToken)
    {
        // Get users who have access to the specified branches
        return await Context.UserBranchScopes
            .Where(ubs => branchIds.Contains(ubs.BranchId))
            .Select(ubs => ubs.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);
    }

    private async Task<List<long>> GetUserIdsByDepartments(List<long> departmentIds, CancellationToken cancellationToken)
    {
        // Get employees in the specified departments, then their linked user IDs
        var employeeIds = await Context.Employees
            .Where(e => e.DepartmentId.HasValue && departmentIds.Contains(e.DepartmentId.Value) && !e.IsDeleted)
            .Select(e => e.Id)
            .ToListAsync(cancellationToken);

        return await Context.EmployeeUserLinks
            .Where(eul => employeeIds.Contains(eul.EmployeeId))
            .Select(eul => eul.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);
    }

    private async Task<List<long>> GetUserIdsByEmployees(List<long> employeeIds, CancellationToken cancellationToken)
    {
        return await Context.EmployeeUserLinks
            .Where(eul => employeeIds.Contains(eul.EmployeeId))
            .Select(eul => eul.UserId)
            .Distinct()
            .ToListAsync(cancellationToken);
    }
}
