using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Roles.Commands.DeleteRole;

public class DeleteRoleCommandHandler : BaseHandler<DeleteRoleCommand, Result>
{
    public DeleteRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(DeleteRoleCommand request, CancellationToken cancellationToken)
    {
        // Only system admins can delete roles
        if (!CurrentUser.IsSystemAdmin)
        {
            return Result.Failure("Only system administrators can delete roles");
        }

        // Find the role
        var role = await Context.Roles
            .Include(r => r.RolePermissions)
            .Include(r => r.UserRoles)
            .FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);

        if (role == null)
        {
            return Result.Failure("Role not found");
        }

        // Check if role is deletable
        if (!role.IsDeletable)
        {
            return Result.Failure("This role cannot be deleted");
        }

        // Check if role is a system role
        if (role.IsSystem)
        {
            return Result.Failure("System roles cannot be deleted");
        }

        // Explicitly protect critical roles
        var protectedRoles = new[] { "systemadmin", "admin", "superadmin" };
        if (protectedRoles.Contains(role.Name.ToLower()))
        {
            return Result.Failure("This role is protected and cannot be deleted");
        }

        // Check if role has users assigned
        if (role.UserRoles.Any())
        {
            var userCount = role.UserRoles.Count;
            return Result.Failure($"Cannot delete role because it is assigned to {userCount} user(s). Please remove all users from this role first");
        }

        // Store role information for audit log before deletion
        var roleInfo = new
        {
            RoleName = role.Name,
            IsSystem = role.IsSystem,
            PermissionCount = role.RolePermissions.Count,
            DeletedBy = CurrentUser.Username
        };

        // Remove role permissions first
        if (role.RolePermissions.Any())
        {
            Context.RolePermissions.RemoveRange(role.RolePermissions);
        }

        // Soft delete the role
        role.IsDeleted = true;
        role.ModifiedAtUtc = DateTime.UtcNow;
        role.ModifiedBy = CurrentUser.Username;

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.Deleted,
            EntityName = nameof(Role),
            EntityId = role.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(roleInfo),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = CurrentUser.Username
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success();
    }
}