using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Roles.Commands.AssignPermissionToRole;

public record AssignPermissionToRoleCommand : IRequest<Result<Unit>>
{
    public long RoleId { get; init; }
    public long PermissionId { get; init; }
}