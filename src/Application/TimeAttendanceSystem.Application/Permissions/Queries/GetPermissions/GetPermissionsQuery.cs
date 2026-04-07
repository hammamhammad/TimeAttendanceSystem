using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Permissions.Queries.GetPermissions;

public record GetPermissionsQuery(
    string? Group = null
) : IRequest<Result<List<PermissionGroupDto>>>;