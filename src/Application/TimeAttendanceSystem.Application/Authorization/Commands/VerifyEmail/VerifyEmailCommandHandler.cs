using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.VerifyEmail;

public class VerifyEmailCommandHandler : BaseHandler<VerifyEmailCommand, Result<bool>>
{
    public VerifyEmailCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<bool>> Handle(VerifyEmailCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Token))
        {
            return Result.Failure<bool>("Email and token are required.");
        }

        // Find user by email and confirmation token
        var user = await Context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.EmailConfirmationToken == request.Token, cancellationToken);

        if (user == null)
        {
            return Result.Failure<bool>("Invalid email or verification token.");
        }

        if (user.EmailConfirmed)
        {
            return Result.Failure<bool>("Email has already been verified.");
        }

        // Check if token has expired (24 hours)
        if (user.CreatedAtUtc.AddHours(24) < DateTime.UtcNow)
        {
            return Result.Failure<bool>("Verification token has expired. Please request a new verification email.");
        }

        // Confirm email and activate user
        user.EmailConfirmed = true;
        user.EmailConfirmationToken = null;
        user.IsActive = true;
        user.ModifiedAtUtc = DateTime.UtcNow;
        user.ModifiedBy = "EmailVerification";

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.UserActivated,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            PayloadJson = $"{{\"email\":\"{request.Email}\"}}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "EmailVerification"
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}