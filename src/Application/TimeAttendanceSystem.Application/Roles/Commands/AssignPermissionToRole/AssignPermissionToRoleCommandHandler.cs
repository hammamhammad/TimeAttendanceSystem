using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Roles.Commands.AssignPermissionToRole;

public class AssignPermissionToRoleCommandHandler : BaseHandler<AssignPermissionToRoleCommand, Result<Unit>>
{
    public AssignPermissionToRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(AssignPermissionToRoleCommand request, CancellationToken cancellationToken)
    {
        // Only system admins can assign permissions
        if (!CurrentUser.IsSystemAdmin)
        {
            return Result.Failure<Unit>("Only system administrators can assign permissions to roles");
        }

        var role = await Context.Roles
            .Include(r => r.RolePermissions)
            .FirstOrDefaultAsync(r => r.Id == request.RoleId, cancellationToken);

        if (role == null)
        {
            return Result.Failure<Unit>("Role not found");
        }

        var permission = await Context.Permissions
            .FirstOrDefaultAsync(p => p.Id == request.PermissionId, cancellationToken);

        if (permission == null)
        {
            return Result.Failure<Unit>("Permission not found");
        }

        // Check if role already has this permission
        if (role.RolePermissions.Any(rp => rp.PermissionId == request.PermissionId))
        {
            return Result.Failure<Unit>("Role already has this permission");
        }

        // Add the permission assignment
        var rolePermission = new RolePermission
        {
            RoleId = request.RoleId,
            PermissionId = request.PermissionId
        };

        Context.RolePermissions.Add(rolePermission);

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.Created,
            EntityName = nameof(RolePermission),
            EntityId = $"{request.RoleId}-{request.PermissionId}",
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleId = request.RoleId,
                RoleName = role.Name,
                PermissionId = request.PermissionId,
                PermissionKey = permission.Key,
                AssignedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}