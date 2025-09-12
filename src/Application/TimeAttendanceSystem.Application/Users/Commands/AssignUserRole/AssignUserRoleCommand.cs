using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.AssignUserRole;

public record AssignUserRoleCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long RoleId { get; init; }
}