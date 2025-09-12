using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.DeleteRole;

public record DeleteRoleCommand : IRequest<Result>
{
    public long Id { get; init; }
}