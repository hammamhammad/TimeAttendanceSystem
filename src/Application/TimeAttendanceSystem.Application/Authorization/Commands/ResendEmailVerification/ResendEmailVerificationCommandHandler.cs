using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.ResendEmailVerification;

public class ResendEmailVerificationCommandHandler : BaseHandler<ResendEmailVerificationCommand, Result<bool>>
{
    private readonly IEmailService _emailService;

    public ResendEmailVerificationCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IEmailService emailService)
        : base(context, currentUser)
    {
        _emailService = emailService;
    }

    public override async Task<Result<bool>> Handle(ResendEmailVerificationCommand request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Email))
        {
            return Result.Failure<bool>("Email is required.");
        }

        // Find user by email
        var user = await Context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email, cancellationToken);

        if (user == null)
        {
            // Don't reveal if email exists for security
            return Result.Success(true);
        }

        if (user.EmailConfirmed)
        {
            return Result.Failure<bool>("Email has already been verified.");
        }

        // Generate new confirmation token
        var confirmationToken = GenerateEmailConfirmationToken();
        user.EmailConfirmationToken = confirmationToken;
        user.ModifiedAtUtc = DateTime.UtcNow;
        user.ModifiedBy = "ResendVerification";

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.UserUpdated,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            PayloadJson = $"{{\"action\":\"resend_email_verification\",\"email\":\"{request.Email}\"}}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "ResendVerification"
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        // Send new confirmation email
        await SendConfirmationEmail(user.Email, user.Username, confirmationToken);

        return Result.Success(true);
    }

    private string GenerateEmailConfirmationToken()
    {
        using var rng = RandomNumberGenerator.Create();
        var tokenBytes = new byte[32];
        rng.GetBytes(tokenBytes);
        return Convert.ToBase64String(tokenBytes).Replace("+", "-").Replace("/", "_").Replace("=", "");
    }

    private async Task SendConfirmationEmail(string email, string username, string token)
    {
        await _emailService.SendEmailVerificationAsync(email, username, token);
    }
}