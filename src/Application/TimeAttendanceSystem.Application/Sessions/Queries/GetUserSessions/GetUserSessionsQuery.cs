using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Sessions.Queries.GetUserSessions;

public record GetUserSessionsQuery : IRequest<Result<GetUserSessionsResponse>>;