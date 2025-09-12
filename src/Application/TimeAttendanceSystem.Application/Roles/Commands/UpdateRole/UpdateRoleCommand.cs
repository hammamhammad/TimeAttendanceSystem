using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.UpdateRole;

public record UpdateRoleCommand : IRequest<Result>
{
    public long Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public long[] PermissionIds { get; init; } = Array.Empty<long>();
}