using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Commands.AssignUserRole;

public record AssignUserRoleCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long RoleId { get; init; }
}