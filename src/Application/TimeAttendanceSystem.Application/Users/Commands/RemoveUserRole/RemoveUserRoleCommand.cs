using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.RemoveUserRole;

public record RemoveUserRoleCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long RoleId { get; init; }
}