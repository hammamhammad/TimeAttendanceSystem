using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Roles.Commands.RemovePermissionFromRole;

public class RemovePermissionFromRoleCommandHandler : BaseHandler<RemovePermissionFromRoleCommand, Result<Unit>>
{
    public RemovePermissionFromRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(RemovePermissionFromRoleCommand request, CancellationToken cancellationToken)
    {
        // Only system admins can remove permissions
        if (!CurrentUser.IsSystemAdmin)
        {
            return Result.Failure<Unit>("Only system administrators can remove permissions from roles");
        }

        var role = await Context.Roles
            .Include(r => r.RolePermissions)
                .ThenInclude(rp => rp.Permission)
            .FirstOrDefaultAsync(r => r.Id == request.RoleId, cancellationToken);

        if (role == null)
        {
            return Result.Failure<Unit>("Role not found");
        }

        var rolePermission = role.RolePermissions
            .FirstOrDefault(rp => rp.PermissionId == request.PermissionId);

        if (rolePermission == null)
        {
            return Result.Failure<Unit>("Role does not have this permission");
        }

        // Remove the permission assignment
        Context.RolePermissions.Remove(rolePermission);

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.Deleted,
            EntityName = nameof(Domain.Users.RolePermission),
            EntityId = $"{request.RoleId}-{request.PermissionId}",
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleId = request.RoleId,
                RoleName = role.Name,
                PermissionId = request.PermissionId,
                PermissionKey = rolePermission.Permission.Key,
                RemovedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}