using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Roles.Commands.UpdateRole;

public record UpdateRoleCommand : IRequest<Result>
{
    public long Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public long[] PermissionIds { get; init; } = Array.Empty<long>();
}