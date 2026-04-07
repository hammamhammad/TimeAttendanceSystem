using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Roles.Queries.GetRoles;

namespace TecAxle.Hrms.Application.Roles.Queries.GetRoleById;

public class GetRoleByIdQueryHandler : BaseHandler<GetRoleByIdQuery, Result<RoleDto>>
{
    public GetRoleByIdQueryHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<RoleDto>> Handle(GetRoleByIdQuery request, CancellationToken cancellationToken)
    {
        var role = await Context.Roles
            .Include(r => r.RolePermissions)
                .ThenInclude(rp => rp.Permission)
            .Where(r => r.Id == request.Id)
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name,
                IsSystem = r.IsSystem,
                IsEditable = r.IsEditable,
                IsDeletable = r.IsDeletable,
                UserCount = Context.UserRoles.Count(ur => ur.RoleId == r.Id),
                CreatedAtUtc = r.CreatedAtUtc,
                Permissions = r.RolePermissions.Select(rp => new PermissionDto
                {
                    Id = rp.Permission.Id,
                    Key = rp.Permission.Key,
                    Group = rp.Permission.Group,
                    Description = rp.Permission.Description
                }).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (role == null)
        {
            return Result.Failure<RoleDto>("Role not found");
        }

        return Result.Success(role);
    }
}