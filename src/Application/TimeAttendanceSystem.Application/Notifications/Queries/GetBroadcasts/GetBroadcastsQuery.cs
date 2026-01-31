using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Notifications.Queries.GetBroadcasts;

/// <summary>
/// Query to get a paginated list of notification broadcasts.
/// </summary>
public record GetBroadcastsQuery(
    int Page = 1,
    int PageSize = 10
) : IRequest<Result<PagedResult<BroadcastDto>>>;

public record BroadcastDto(
    long Id,
    string Title,
    string TitleAr,
    string Message,
    string MessageAr,
    string TargetType,
    string Channel,
    string SentByUserName,
    DateTime SentAt,
    int TotalRecipients,
    int DeliveredCount,
    string? ActionUrl
);
