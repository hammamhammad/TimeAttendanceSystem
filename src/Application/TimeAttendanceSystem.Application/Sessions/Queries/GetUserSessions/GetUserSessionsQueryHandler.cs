using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Sessions.Queries.GetUserSessions;

public class GetUserSessionsQueryHandler : BaseHandler<GetUserSessionsQuery, Result<GetUserSessionsResponse>>
{
    public GetUserSessionsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<GetUserSessionsResponse>> Handle(GetUserSessionsQuery request, CancellationToken cancellationToken)
    {
        var currentUserId = CurrentUser.UserId;
        if (!currentUserId.HasValue)
            return Result.Failure<GetUserSessionsResponse>("User not authenticated.");

        var sessions = await Context.UserSessions
            .Include(s => s.User)
            .Where(s => s.UserId == currentUserId.Value)
            .OrderByDescending(s => s.LastAccessedAtUtc)
            .Select(s => new UserSessionDto(
                s.SessionId,
                s.User.Username,
                s.User.Email,
                s.DeviceName,
                s.Platform,
                s.Browser,
                s.IpAddress,
                s.Location,
                s.LastAccessedAtUtc,
                s.CreatedAtUtc,
                s.IsCurrentSession,
                s.IsActive
            ))
            .ToListAsync(cancellationToken);

        var response = new GetUserSessionsResponse(sessions);
        return Result.Success(response);
    }
}