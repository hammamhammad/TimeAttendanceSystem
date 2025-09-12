using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.RemoveUserRole;

public class RemoveUserRoleCommandHandler : BaseHandler<RemoveUserRoleCommand, Result<Unit>>
{
    public RemoveUserRoleCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(RemoveUserRoleCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>("User not found");
        }

        var userRole = user.UserRoles.FirstOrDefault(ur => ur.RoleId == request.RoleId);
        
        if (userRole == null)
        {
            return Result.Failure<Unit>("User does not have this role");
        }

        // Prevent removal of roles from the systemadmin user only
        if (user.Username.Equals("systemadmin", StringComparison.OrdinalIgnoreCase))
        {
            return Result.Failure<Unit>("Cannot modify roles for the systemadmin user");
        }

        // Remove the role assignment
        Context.UserRoles.Remove(userRole);

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.UserRoleRevoked,
            EntityName = nameof(Domain.Users.User),
            EntityId = user.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                RoleId = request.RoleId,
                RoleName = userRole.Role.Name,
                RemovedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}