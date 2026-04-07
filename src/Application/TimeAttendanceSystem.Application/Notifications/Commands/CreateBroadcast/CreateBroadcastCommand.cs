using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Notifications;

namespace TecAxle.Hrms.Application.Notifications.Commands.CreateBroadcast;

/// <summary>
/// Command to create and send a notification broadcast to targeted recipients.
/// </summary>
public record CreateBroadcastCommand(
    string Title,
    string TitleAr,
    string Message,
    string MessageAr,
    BroadcastTargetType TargetType,
    List<long>? TargetIds,
    NotificationChannel Channel,
    string? ActionUrl
) : IRequest<Result<BroadcastCreatedResult>>;

public record BroadcastCreatedResult(
    long BroadcastId,
    int TotalRecipients,
    string Message
);
