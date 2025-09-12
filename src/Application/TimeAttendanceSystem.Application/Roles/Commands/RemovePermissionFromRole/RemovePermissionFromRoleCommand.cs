using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.RemovePermissionFromRole;

public record RemovePermissionFromRoleCommand : IRequest<Result<Unit>>
{
    public long RoleId { get; init; }
    public long PermissionId { get; init; }
}