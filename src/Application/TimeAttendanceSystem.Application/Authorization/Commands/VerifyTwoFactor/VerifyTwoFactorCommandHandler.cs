using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Authorization.Commands.Login;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.VerifyTwoFactor;

public class VerifyTwoFactorCommandHandler : BaseHandler<VerifyTwoFactorCommand, Result<LoginResponse>>
{
    private readonly ITwoFactorService _twoFactorService;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public VerifyTwoFactorCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITwoFactorService twoFactorService,
        IJwtTokenGenerator tokenGenerator)
        : base(context, currentUser)
    {
        _twoFactorService = twoFactorService;
        _tokenGenerator = tokenGenerator;
    }

    public override async Task<Result<LoginResponse>> Handle(VerifyTwoFactorCommand request, CancellationToken cancellationToken)
    {
        var clientIp = GetClientIpAddress();

        // Find user
        var user = await Context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
                    .ThenInclude(r => r.RolePermissions)
                        .ThenInclude(rp => rp.Permission)
            .Include(u => u.UserBranchScopes)
                .ThenInclude(ubs => ubs.Branch)
            .Include(u => u.TwoFactorBackupCodes)
            .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);

        if (user == null)
        {
            await LogFailedLoginAttempt(request.Username, clientIp, null, "Invalid username", cancellationToken);
            return Result.Failure<LoginResponse>("Invalid username or verification code.");
        }

        if (!user.IsActive)
        {
            await LogFailedLoginAttempt(request.Username, clientIp, user.Id, "Account disabled", cancellationToken);
            return Result.Failure<LoginResponse>("User account is disabled.");
        }

        if (!user.TwoFactorEnabled || string.IsNullOrEmpty(user.TwoFactorSecretKey))
        {
            await LogFailedLoginAttempt(request.Username, clientIp, user.Id, "2FA not enabled", cancellationToken);
            return Result.Failure<LoginResponse>("Two-factor authentication is not enabled for this account.");
        }

        // Check if it's a backup code
        var isBackupCode = false;
        var backupCode = user.TwoFactorBackupCodes
            .FirstOrDefault(bc => bc.Code == request.Code && !bc.IsUsed);

        if (backupCode != null)
        {
            // Mark backup code as used
            backupCode.IsUsed = true;
            backupCode.UsedAtUtc = DateTime.UtcNow;
            isBackupCode = true;
        }
        else
        {
            // Validate TOTP code
            var validationResult = _twoFactorService.ValidateCode(user.TwoFactorSecretKey, request.Code);
            if (validationResult.IsFailure)
            {
                await LogFailedLoginAttempt(request.Username, clientIp, user.Id, "Invalid 2FA code", cancellationToken);
                return Result.Failure<LoginResponse>("Invalid or expired verification code.");
            }
        }

        // Reset failed login attempts on successful 2FA
        if (user.FailedLoginAttempts > 0)
        {
            user.FailedLoginAttempts = 0;
            user.LockoutEndUtc = null;
            user.LastFailedLoginAtUtc = null;
        }

        // Get user permissions and roles
        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var permissions = user.UserRoles
            .SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Key)
            .Distinct()
            .ToList();

        var branchIds = user.UserBranchScopes.Select(ubs => ubs.BranchId).ToList();

        // Generate tokens
        var accessToken = _tokenGenerator.GenerateAccessToken(user, roles, permissions, branchIds);
        var refreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration();

        // Store refresh token
        var refreshTokenEntity = new TimeAttendanceSystem.Domain.Users.RefreshToken
        {
            UserId = user.Id,
            Token = refreshToken,
            ExpiresAtUtc = expiresAt.AddDays(7),
            DeviceInfo = request.DeviceInfo,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.RefreshTokens.Add(refreshTokenEntity);

        // Log successful 2FA verification
        await LogSuccessfulLoginAttempt(request.Username, clientIp, user.Id, cancellationToken);

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.TwoFactorVerified,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            PayloadJson = $"{{\"method\":\"{(isBackupCode ? "backup_code" : "totp")}\"}}",
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        var userInfo = new UserInfo(
            user.Id,
            user.Username,
            user.Email,
            user.PreferredLanguage,
            roles,
            permissions,
            branchIds
        );

        var response = new LoginResponse(
            accessToken,
            refreshToken,
            expiresAt,
            user.MustChangePassword,
            userInfo
        );

        return Result.Success(response);
    }

    private async Task LogFailedLoginAttempt(string username, string clientIp, long? userId, string failureReason, CancellationToken cancellationToken)
    {
        var loginAttempt = new LoginAttempt
        {
            Username = username,
            IpAddress = clientIp,
            UserId = userId,
            IsSuccessful = false,
            FailureReason = failureReason,
            AttemptedAtUtc = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "System"
        };

        Context.LoginAttempts.Add(loginAttempt);
    }

    private async Task LogSuccessfulLoginAttempt(string username, string clientIp, long userId, CancellationToken cancellationToken)
    {
        var loginAttempt = new LoginAttempt
        {
            Username = username,
            IpAddress = clientIp,
            UserId = userId,
            IsSuccessful = true,
            AttemptedAtUtc = DateTime.UtcNow,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "System"
        };

        Context.LoginAttempts.Add(loginAttempt);
    }

    private string GetClientIpAddress()
    {
        return "127.0.0.1"; // Placeholder
    }
}