using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Sessions.Queries.GetUserSessions;

public record GetUserSessionsQuery : IRequest<Result<GetUserSessionsResponse>>;