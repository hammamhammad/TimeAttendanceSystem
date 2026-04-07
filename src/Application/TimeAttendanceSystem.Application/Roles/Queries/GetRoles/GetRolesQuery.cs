using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Roles.Queries.GetRoles;

public record GetRolesQuery(
    bool IncludePermissions = false
) : IRequest<Result<List<RoleDto>>>;