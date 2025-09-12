using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Roles.Commands.UpdateRole;

public class UpdateRoleCommandHandler : BaseHandler<UpdateRoleCommand, Result>
{
    public UpdateRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
    {
        // Only system admins can update roles
        if (!CurrentUser.IsSystemAdmin)
        {
            return Result.Failure("Only system administrators can update roles");
        }

        // Validate role name
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return Result.Failure("Role name is required");
        }

        if (request.Name.Length > 100)
        {
            return Result.Failure("Role name cannot exceed 100 characters");
        }

        // Get the role to update
        var role = await Context.Roles.FirstOrDefaultAsync(r => r.Id == request.Id, cancellationToken);
        if (role == null)
        {
            return Result.Failure("Role not found");
        }

        // Check if it's a system role and prevent name changes for system roles
        if (role.IsSystem)
        {
            return Result.Failure("System roles cannot be modified");
        }

        // Check if another role with the same name exists (excluding current role)
        var existingRole = await Context.Roles
            .FirstOrDefaultAsync(r => r.Name.ToLower() == request.Name.Trim().ToLower() && r.Id != request.Id, cancellationToken);

        if (existingRole != null)
        {
            return Result.Failure("A role with this name already exists");
        }

        // Update role name
        role.Name = request.Name.Trim();
        role.ModifiedAtUtc = DateTime.UtcNow;

        // Update permissions
        if (request.PermissionIds.Length > 0)
        {
            // Validate that all permission IDs exist
            var existingPermissions = await Context.Permissions
                .Where(p => request.PermissionIds.Contains(p.Id))
                .Select(p => p.Id)
                .ToListAsync(cancellationToken);

            var invalidPermissionIds = request.PermissionIds.Except(existingPermissions).ToList();
            if (invalidPermissionIds.Any())
            {
                return Result.Failure($"Invalid permission IDs: {string.Join(", ", invalidPermissionIds)}");
            }
        }

        // Remove existing role permissions
        var existingRolePermissions = await Context.RolePermissions
            .Where(rp => rp.RoleId == role.Id)
            .ToListAsync(cancellationToken);

        Context.RolePermissions.RemoveRange(existingRolePermissions);

        // Add new role permissions
        if (request.PermissionIds.Length > 0)
        {
            var newRolePermissions = request.PermissionIds.Select(permissionId => new RolePermission
            {
                RoleId = role.Id,
                PermissionId = permissionId
            }).ToList();

            Context.RolePermissions.AddRange(newRolePermissions);
        }

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.Updated,
            EntityName = nameof(Role),
            EntityId = role.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleName = role.Name,
                PermissionCount = request.PermissionIds.Length,
                UpdatedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success();
    }
}