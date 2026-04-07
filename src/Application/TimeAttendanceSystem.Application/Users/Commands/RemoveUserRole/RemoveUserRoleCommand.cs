using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Users.Commands.RemoveUserRole;

public record RemoveUserRoleCommand : IRequest<Result<Unit>>
{
    public long UserId { get; init; }
    public long RoleId { get; init; }
}