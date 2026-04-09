using System.Security.Cryptography;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Authorization.Commands.Login;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Platform;

namespace TecAxle.Hrms.Application.Authorization.Commands.PlatformLogin;

/// <summary>
/// Handles platform-level admin authentication against the master database.
/// Generates a JWT with platform_role claim and SystemAdmin privileges.
/// </summary>
public class PlatformLoginCommandHandler : IRequestHandler<PlatformLoginCommand, Result<LoginResponse>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public PlatformLoginCommandHandler(
        IMasterDbContext masterContext,
        IJwtTokenGenerator tokenGenerator)
    {
        _masterContext = masterContext;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<Result<LoginResponse>> Handle(PlatformLoginCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var platformUser = await _masterContext.PlatformUsers
            .FirstOrDefaultAsync(u => u.Email == normalizedEmail && !u.IsDeleted, cancellationToken);

        if (platformUser == null)
            return Result.Failure<LoginResponse>("Invalid credentials.");

        if (!platformUser.IsActive)
            return Result.Failure<LoginResponse>("Account is disabled.");

        if (IsLockedOut(platformUser))
            return Result.Failure<LoginResponse>("Account is locked.");

        if (!VerifyPassword(request.Password, platformUser.PasswordHash, platformUser.PasswordSalt))
        {
            platformUser.FailedLoginAttempts++;
            if (platformUser.FailedLoginAttempts >= 5)
                platformUser.LockoutEndUtc = DateTime.UtcNow.AddMinutes(15);
            await _masterContext.SaveChangesAsync(cancellationToken);
            return Result.Failure<LoginResponse>("Invalid credentials.");
        }

        // Reset failed attempts on success
        if (platformUser.FailedLoginAttempts > 0)
        {
            platformUser.FailedLoginAttempts = 0;
            platformUser.LockoutEndUtc = null;
        }
        platformUser.LastLoginAtUtc = DateTime.UtcNow;

        // Platform users get SystemAdmin role and all permissions
        var roles = new List<string> { "SystemAdmin" };
        var permissions = new List<string> { "*" }; // wildcard = all permissions
        var branchIds = new List<long>(); // empty = access to all branches

        var accessToken = _tokenGenerator.GeneratePlatformAccessToken(
            platformUser, roles, permissions, request.RememberMe);
        var refreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration(request.RememberMe);

        await _masterContext.SaveChangesAsync(cancellationToken);

        var userInfo = new UserInfo(
            platformUser.Id,
            platformUser.Username,
            platformUser.Email,
            platformUser.PreferredLanguage,
            roles,
            permissions,
            branchIds,
            platformUser.FullName,
            platformUser.FullNameAr,
            null,
            false
        );

        return Result.Success(new LoginResponse(
            accessToken,
            refreshToken,
            expiresAt,
            platformUser.MustChangePassword,
            userInfo
        ));
    }

    private static bool IsLockedOut(PlatformUser user)
        => user.LockoutEndUtc.HasValue && user.LockoutEndUtc > DateTime.UtcNow;

    private static bool VerifyPassword(string password, string hash, string salt)
    {
        var saltBytes = Convert.FromBase64String(salt);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        var computedHash = Convert.ToBase64String(pbkdf2.GetBytes(32));
        return computedHash == hash;
    }
}
