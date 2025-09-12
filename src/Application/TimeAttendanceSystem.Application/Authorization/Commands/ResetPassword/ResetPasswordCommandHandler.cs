using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using System.Security.Cryptography;

namespace TimeAttendanceSystem.Application.Authorization.Commands.ResetPassword;

public class ResetPasswordCommandHandler : BaseHandler<ResetPasswordCommand, Result<bool>>
{
    private readonly IPasswordService _passwordService;

    public ResetPasswordCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IPasswordService passwordService)
        : base(context, currentUser)
    {
        _passwordService = passwordService;
    }

    public override async Task<Result<bool>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await Context.Users
            .Include(u => u.PasswordHistory)
            .FirstOrDefaultAsync(u => u.Email == request.Email && 
                                    u.PasswordResetToken == request.Token, 
                                cancellationToken);

        if (user == null)
            return Result.Failure<bool>("Invalid reset token or email.");

        if (!user.IsActive)
            return Result.Failure<bool>("User account is disabled.");

        // Check if token has expired
        if (!user.PasswordResetTokenExpiresAtUtc.HasValue || 
            user.PasswordResetTokenExpiresAtUtc < DateTime.UtcNow)
            return Result.Failure<bool>("Reset token has expired.");

        // Validate password strength
        var passwordValidationResult = _passwordService.ValidatePasswordStrength(request.NewPassword);
        if (passwordValidationResult.IsFailure)
            return Result.Failure<bool>(passwordValidationResult.Error);

        // Check password history (prevent reuse of last 5 passwords)
        var lastPasswords = user.PasswordHistory
            .OrderByDescending(ph => ph.ChangedAtUtc)
            .Take(5)
            .ToList();

        foreach (var oldPassword in lastPasswords)
        {
            if (VerifyPassword(request.NewPassword, oldPassword.PasswordHash, oldPassword.PasswordSalt))
            {
                return Result.Failure<bool>("Cannot reuse a previously used password.");
            }
        }

        // Store current password in history before changing
        if (!string.IsNullOrEmpty(user.PasswordHash))
        {
            var passwordHistory = new PasswordHistory
            {
                UserId = user.Id,
                PasswordHash = user.PasswordHash,
                PasswordSalt = user.PasswordSalt,
                ChangedAtUtc = DateTime.UtcNow,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = user.Username
            };

            Context.PasswordHistory.Add(passwordHistory);
        }

        // Hash new password
        var (hash, salt) = HashPassword(request.NewPassword);
        
        // Update user password and clear reset token
        user.PasswordHash = hash;
        user.PasswordSalt = salt;
        user.PasswordResetToken = null;
        user.PasswordResetTokenExpiresAtUtc = null;
        user.PasswordChangedAtUtc = DateTime.UtcNow;
        user.MustChangePassword = false;
        
        // Reset lockout if user was locked
        user.FailedLoginAttempts = 0;
        user.LockoutEndUtc = null;
        user.LastFailedLoginAtUtc = null;

        // Revoke all refresh tokens to force re-authentication
        var refreshTokens = await Context.RefreshTokens
            .Where(rt => rt.UserId == user.Id && rt.RevokedAtUtc == null)
            .ToListAsync(cancellationToken);

        foreach (var token in refreshTokens)
        {
            token.RevokedAtUtc = DateTime.UtcNow;
        }

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.PasswordReset,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }

    private static (string hash, string salt) HashPassword(string password)
    {
        var saltBytes = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(saltBytes);
        
        var salt = Convert.ToBase64String(saltBytes);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        var hash = Convert.ToBase64String(pbkdf2.GetBytes(32));
        
        return (hash, salt);
    }

    private static bool VerifyPassword(string password, string hash, string salt)
    {
        var saltBytes = Convert.FromBase64String(salt);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        var computedHash = Convert.ToBase64String(pbkdf2.GetBytes(32));
        return computedHash == hash;
    }
}