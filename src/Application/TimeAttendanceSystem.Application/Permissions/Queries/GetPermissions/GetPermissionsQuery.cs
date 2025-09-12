using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Permissions.Queries.GetPermissions;

public record GetPermissionsQuery(
    string? Group = null
) : IRequest<Result<List<PermissionGroupDto>>>;