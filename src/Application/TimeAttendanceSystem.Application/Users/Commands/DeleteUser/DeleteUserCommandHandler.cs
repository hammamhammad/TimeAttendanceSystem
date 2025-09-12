using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.DeleteUser;

public class DeleteUserCommandHandler : BaseHandler<DeleteUserCommand, Result<Unit>>
{
    public DeleteUserCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>("User not found");
        }

        // Prevent deletion of the systemadmin user only
        if (user.Username.Equals("systemadmin", StringComparison.OrdinalIgnoreCase))
        {
            return Result.Failure<Unit>("Cannot delete the systemadmin user");
        }

        // Check if user is linked to any employees
        var hasEmployeeLink = await Context.EmployeeUserLinks
            .AnyAsync(eul => eul.UserId == request.UserId, cancellationToken);

        if (hasEmployeeLink)
        {
            return Result.Failure<Unit>("Cannot delete user linked to employee records. Unlink employee first.");
        }

        // Soft delete
        user.IsDeleted = true;
        user.ModifiedAtUtc = DateTime.UtcNow;
        user.ModifiedBy = CurrentUser.Username;

        // Revoke all active refresh tokens
        var activeTokens = await Context.RefreshTokens
            .Where(rt => rt.UserId == request.UserId && rt.RevokedAtUtc == null)
            .ToListAsync(cancellationToken);

        foreach (var token in activeTokens)
        {
            token.RevokedAtUtc = DateTime.UtcNow;
        }

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.UserDeleted,
            EntityName = nameof(Domain.Users.User),
            EntityId = user.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                Username = user.Username,
                Email = user.Email,
                DeletedBy = CurrentUser.Username
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}