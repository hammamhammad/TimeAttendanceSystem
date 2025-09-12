using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Queries.GetRoles;

public record GetRolesQuery(
    bool IncludePermissions = false
) : IRequest<Result<List<RoleDto>>>;