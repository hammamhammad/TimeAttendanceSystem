using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Permissions.Queries.GetPermissions;

public class GetPermissionsQueryHandler : BaseHandler<GetPermissionsQuery, Result<List<PermissionGroupDto>>>
{
    public GetPermissionsQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<PermissionGroupDto>>> Handle(GetPermissionsQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Permissions.AsQueryable();

        if (!string.IsNullOrEmpty(request.Group))
        {
            query = query.Where(p => p.Group == request.Group);
        }

        var permissions = await query
            .Select(p => new PermissionDto
            {
                Id = p.Id,
                Key = p.Key,
                Group = p.Group,
                Description = p.Description,
                CreatedAtUtc = p.CreatedAtUtc
            })
            .OrderBy(p => p.Group)
            .ThenBy(p => p.Key)
            .ToListAsync(cancellationToken);

        var groupedPermissions = permissions
            .GroupBy(p => p.Group)
            .Select(g => new PermissionGroupDto
            {
                Group = g.Key,
                Permissions = g.ToList()
            })
            .OrderBy(g => g.Group)
            .ToList();

        return Result.Success(groupedPermissions);
    }
}