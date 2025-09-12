using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;

namespace TimeAttendanceSystem.Application.Users.Commands.AssignUserRole;

public class AssignUserRoleCommandHandler : BaseHandler<AssignUserRoleCommand, Result<Unit>>
{
    public AssignUserRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(AssignUserRoleCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>("User not found");
        }

        // Prevent modification of the systemadmin user only
        if (user.Username.Equals("systemadmin", StringComparison.OrdinalIgnoreCase))
        {
            return Result.Failure<Unit>("Cannot modify roles for the systemadmin user");
        }

        var role = await Context.Roles
            .FirstOrDefaultAsync(r => r.Id == request.RoleId, cancellationToken);

        if (role == null)
        {
            return Result.Failure<Unit>("Role not found");
        }

        // Check if user already has this role
        if (user.UserRoles.Any(ur => ur.RoleId == request.RoleId))
        {
            return Result.Failure<Unit>("User already has this role");
        }

        // Add the role assignment
        var userRole = new UserRole
        {
            UserId = request.UserId,
            RoleId = request.RoleId
        };

        Context.UserRoles.Add(userRole);

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.UserRoleAssigned,
            EntityName = nameof(Domain.Users.User),
            EntityId = user.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleId = request.RoleId,
                RoleName = role.Name,
                AssignedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}