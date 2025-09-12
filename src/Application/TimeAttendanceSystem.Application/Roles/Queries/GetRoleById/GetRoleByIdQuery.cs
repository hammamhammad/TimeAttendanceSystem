using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Roles.Queries.GetRoles;

namespace TimeAttendanceSystem.Application.Roles.Queries.GetRoleById;

public record GetRoleByIdQuery(long Id) : IRequest<Result<RoleDto>>;