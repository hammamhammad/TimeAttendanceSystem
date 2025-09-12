using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.ConfirmTwoFactor;

public class ConfirmTwoFactorCommandHandler : BaseHandler<ConfirmTwoFactorCommand, Result<bool>>
{
    private readonly ITwoFactorService _twoFactorService;

    public ConfirmTwoFactorCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITwoFactorService twoFactorService)
        : base(context, currentUser)
    {
        _twoFactorService = twoFactorService;
    }

    public override async Task<Result<bool>> Handle(ConfirmTwoFactorCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = CurrentUser.UserId;
        if (!currentUserId.HasValue)
            return Result.Failure<bool>("User not authenticated.");

        var user = await Context.Users.FindAsync(currentUserId.Value);
        if (user == null)
            return Result.Failure<bool>("User not found.");

        if (string.IsNullOrEmpty(user.TwoFactorSecretKey))
            return Result.Failure<bool>("Two-factor authentication setup not initiated.");

        if (user.TwoFactorEnabled)
            return Result.Failure<bool>("Two-factor authentication is already confirmed and enabled.");

        // Validate the TOTP code
        var validationResult = _twoFactorService.ValidateCode(user.TwoFactorSecretKey, request.Code);
        if (validationResult.IsFailure)
            return Result.Failure<bool>(validationResult.Error);

        // Enable 2FA for the user
        user.TwoFactorEnabled = true;

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = currentUserId.Value,
            Action = AuditAction.TwoFactorVerified,
            EntityName = "User",
            EntityId = currentUserId.Value.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }
}