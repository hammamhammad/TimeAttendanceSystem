using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Roles.Commands.CreateRole;

public class CreateRoleCommandHandler : BaseHandler<CreateRoleCommand, Result<long>>
{
    public CreateRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<long>> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
    {
        // Only system admins can create roles
        if (!CurrentUser.IsSystemAdmin)
        {
            return Result.Failure<long>("Only system administrators can create roles");
        }

        // Validate role name
        if (string.IsNullOrWhiteSpace(request.Name))
        {
            return Result.Failure<long>("Role name is required");
        }

        if (request.Name.Length > 100)
        {
            return Result.Failure<long>("Role name cannot exceed 100 characters");
        }

        // Check if role with same name already exists
        var existingRole = await Context.Roles
            .FirstOrDefaultAsync(r => r.Name.ToLower() == request.Name.Trim().ToLower(), cancellationToken);

        if (existingRole != null)
        {
            return Result.Failure<long>("A role with this name already exists");
        }

        // Create the role
        var role = new Role
        {
            Name = request.Name.Trim(),
            IsSystem = false,
            IsEditable = true,
            IsDeletable = true,
            CreatedAtUtc = DateTime.UtcNow
        };

        Context.Roles.Add(role);
        await Context.SaveChangesAsync(cancellationToken);

        // Assign permissions to the role if any are provided
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
                return Result.Failure<long>($"Invalid permission IDs: {string.Join(", ", invalidPermissionIds)}");
            }

            // Create role-permission associations
            var rolePermissions = request.PermissionIds.Select(permissionId => new RolePermission
            {
                RoleId = role.Id,
                PermissionId = permissionId
            }).ToList();

            Context.RolePermissions.AddRange(rolePermissions);
            await Context.SaveChangesAsync(cancellationToken);
        }
        
        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.Created,
            EntityName = nameof(Role),
            EntityId = role.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleName = role.Name,
                IsSystem = role.IsSystem,
                PermissionCount = request.PermissionIds.Length,
                CreatedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(role.Id);
    }
}