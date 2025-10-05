using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Users.Commands.UpdateUser;

public class UpdateUserCommandHandler : BaseHandler<UpdateUserCommand, Result<Unit>>
{
    public UpdateUserCommandHandler(IApplicationDbContext context, ICurrentUser currentUser) 
        : base(context, currentUser)
    {
    }

    public override async Task<Result<Unit>> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == request.Id, cancellationToken);

        if (user == null)
        {
            return Result.Failure<Unit>("User not found");
        }

        // Prevent modification of the systemadmin user only
        if (user.Username.Equals("systemadmin", StringComparison.OrdinalIgnoreCase))
        {
            return Result.Failure<Unit>("Cannot modify the systemadmin user");
        }

        // Check if email is already taken by another user
        var existingUser = await Context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.Id != request.Id, cancellationToken);
        
        if (existingUser != null)
        {
            return Result.Failure<Unit>("Email is already taken");
        }

        // Update user properties
        user.Email = request.Email;
        user.Phone = request.Phone;
        user.PreferredLanguage = request.PreferredLanguage;
        user.IsActive = request.IsActive;
        user.MustChangePassword = request.MustChangePassword;
        user.ModifiedAtUtc = DateTime.UtcNow;
        user.ModifiedBy = CurrentUser.Username;

        // Add audit log
        Context.AuditLogs.Add(new AuditLog
        {
            ActorUserId = CurrentUser.UserId,
            Action = AuditAction.UserUpdated,
            EntityName = nameof(Domain.Users.User),
            EntityId = user.Id.ToString(),
            PayloadJson = System.Text.Json.JsonSerializer.Serialize(new
            {
                request.Email,
                request.Phone,
                request.PreferredLanguage,
                request.IsActive,
                request.MustChangePassword
            }),
            CreatedAtUtc = DateTime.UtcNow
        });

        await Context.SaveChangesAsync(cancellationToken);
        
        return Result.Success(Unit.Value);
    }
}