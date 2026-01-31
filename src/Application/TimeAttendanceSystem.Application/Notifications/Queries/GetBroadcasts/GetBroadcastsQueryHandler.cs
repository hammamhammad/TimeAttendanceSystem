using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Notifications.Queries.GetBroadcasts;

/// <summary>
/// Handler for getting paginated notification broadcasts.
/// </summary>
public class GetBroadcastsQueryHandler : BaseHandler<GetBroadcastsQuery, Result<PagedResult<BroadcastDto>>>
{
    public GetBroadcastsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<PagedResult<BroadcastDto>>> Handle(GetBroadcastsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.NotificationBroadcasts
            .Include(b => b.SentByUser)
            .OrderByDescending(b => b.SentAt);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(b => new BroadcastDto(
                b.Id,
                b.Title,
                b.TitleAr,
                b.Message,
                b.MessageAr,
                b.TargetType.ToString(),
                b.Channel.ToString(),
                b.SentByUser.Username,
                b.SentAt,
                b.TotalRecipients,
                b.DeliveredCount,
                b.ActionUrl
            ))
            .ToListAsync(cancellationToken);

        var result = new PagedResult<BroadcastDto>(items, totalCount, request.Page, request.PageSize);
        return Result.Success(result);
    }
}
