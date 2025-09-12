using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.AssignPermissionToRole;

public record AssignPermissionToRoleCommand : IRequest<Result<Unit>>
{
    public long RoleId { get; init; }
    public long PermissionId { get; init; }
}