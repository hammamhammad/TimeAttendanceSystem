using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Roles.Commands.DeleteRole;

public record DeleteRoleCommand : IRequest<Result>
{
    public long Id { get; init; }
}