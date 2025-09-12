using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.CreateRole;

public record CreateRoleCommand : IRequest<Result<long>>
{
    public string Name { get; init; } = string.Empty;
    public long[] PermissionIds { get; init; } = Array.Empty<long>();
}