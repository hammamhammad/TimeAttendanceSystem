using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Queries.GetUserById;

public record GetUserByIdQuery(long UserId) : IRequest<Result<UserDetailDto>>;