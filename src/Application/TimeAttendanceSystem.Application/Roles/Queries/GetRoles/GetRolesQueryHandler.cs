using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Roles.Queries.GetRoles;

public class GetRolesQueryHandler : BaseHandler<GetRolesQuery, Result<List<RoleDto>>>
{
    public GetRolesQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<List<RoleDto>>> Handle(GetRolesQuery request, CancellationToken cancellationToken)
    {
        var query = Context.Roles.AsQueryable();

        if (request.IncludePermissions)
        {
            query = query
                .Include(r => r.RolePermissions)
                    .ThenInclude(rp => rp.Permission);
        }

        var roles = await query
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name,
                IsSystem = r.IsSystem,
                IsEditable = r.IsEditable,
                IsDeletable = r.IsDeletable,
                UserCount = Context.UserRoles.Count(ur => ur.RoleId == r.Id),
                CreatedAtUtc = r.CreatedAtUtc,
                Permissions = request.IncludePermissions 
                    ? r.RolePermissions.Select(rp => new PermissionDto
                    {
                        Id = rp.Permission.Id,
                        Key = rp.Permission.Key,
                        Group = rp.Permission.Group,
                        Description = rp.Permission.Description
                    }).ToList()
                    : new List<PermissionDto>()
            })
            .OrderBy(r => r.Name)
            .ToListAsync(cancellationToken);

        return Result.Success(roles);
    }
}