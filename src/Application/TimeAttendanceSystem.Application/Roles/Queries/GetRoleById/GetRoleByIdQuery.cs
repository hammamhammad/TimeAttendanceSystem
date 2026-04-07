using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Roles.Queries.GetRoles;

namespace TecAxle.Hrms.Application.Roles.Queries.GetRoleById;

public record GetRoleByIdQuery(long Id) : IRequest<Result<RoleDto>>;