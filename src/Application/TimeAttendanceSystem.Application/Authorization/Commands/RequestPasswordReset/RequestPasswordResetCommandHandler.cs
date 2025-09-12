using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using System.Security.Cryptography;

namespace TimeAttendanceSystem.Application.Authorization.Commands.RequestPasswordReset;

public class RequestPasswordResetCommandHandler : BaseHandler<RequestPasswordResetCommand, Result<bool>>
{
    private readonly IEmailService _emailService;

    public RequestPasswordResetCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEmailService emailService)
        : base(context, currentUser)
    {
        _emailService = emailService;
    }

    public override async Task<Result<bool>> Handle(RequestPasswordResetCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        // Always return success to prevent email enumeration attacks
        if (user == null || !user.IsActive)
        {
            // Still simulate processing time to prevent timing attacks
            await Task.Delay(Random.Shared.Next(100, 500), cancellationToken);
            return Result.Success(true);
        }

        // Generate secure reset token
        var resetToken = GenerateSecureToken();
        user.PasswordResetToken = resetToken;
        user.PasswordResetTokenExpiresAtUtc = DateTime.UtcNow.AddHours(1); // Token expires in 1 hour

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = null, // Anonymous request
            Action = AuditAction.PasswordResetRequest,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "System"
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        // Send password reset email
        await _emailService.SendPasswordResetEmailAsync(
            user.Email,
            user.Username,
            resetToken,
            cancellationToken);

        return Result.Success(true);
    }

    private static string GenerateSecureToken()
    {
        var tokenBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(tokenBytes);
        return Convert.ToBase64String(tokenBytes).Replace("+", "-").Replace("/", "_").Replace("=", "");
    }
}