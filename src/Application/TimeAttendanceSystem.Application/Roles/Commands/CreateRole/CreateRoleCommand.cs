using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Roles.Commands.CreateRole;

public record CreateRoleCommand : IRequest<Result<long>>
{
    public string Name { get; init; } = string.Empty;
    public long[] PermissionIds { get; init; } = Array.Empty<long>();
}