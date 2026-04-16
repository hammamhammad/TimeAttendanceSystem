using System.Security.Cryptography;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<LoginResult>>
{
    private readonly IApplicationDbContext _db;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public LoginCommandHandler(
        IApplicationDbContext db,
        IJwtTokenGenerator tokenGenerator)
    {
        _db = db;
        _tokenGenerator = tokenGenerator;
    }

    public async Task<Result<LoginResult>> Handle(LoginCommand request, CancellationToken ct)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        var user = await _db.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .ThenInclude(r => r.RolePermissions).ThenInclude(rp => rp.Permission)
            .Include(u => u.UserBranchScopes).ThenInclude(ubs => ubs.Branch)
            .FirstOrDefaultAsync(u => u.Email == normalizedEmail, ct);

        if (user == null)
            return Result.Failure<LoginResult>("Invalid credentials.");

        if (!user.IsActive)
            return Result.Failure<LoginResult>("User account is disabled.");

        if (user.LockoutEndUtc.HasValue && user.LockoutEndUtc > DateTime.UtcNow)
            return Result.Failure<LoginResult>("User account is locked.");

        if (!VerifyPassword(request.Password, user.PasswordHash, user.PasswordSalt))
        {
            user.FailedLoginAttempts++;
            user.LastFailedLoginAtUtc = DateTime.UtcNow;

            var settings = await _db.TenantSettings.AsNoTracking().FirstOrDefaultAsync(ct);
            var policy = Services.LoginLockoutPolicy.ParseOrDefault(settings?.LoginLockoutPolicyJson);
            var lockoutDuration = policy.GetLockoutForAttempts(user.FailedLoginAttempts);
            if (lockoutDuration.HasValue)
                user.LockoutEndUtc = DateTime.UtcNow.Add(lockoutDuration.Value);

            await _db.SaveChangesAsync(ct);
            return Result.Failure<LoginResult>("Invalid credentials.");
        }

        if (user.TwoFactorEnabled)
            return Result.Failure<LoginResult>("Two-factor authentication required.");

        if (user.FailedLoginAttempts > 0)
        {
            user.FailedLoginAttempts = 0;
            user.LockoutEndUtc = null;
            user.LastFailedLoginAtUtc = null;
        }

        string? employeeFullName = null, employeeFullNameAr = null;
        long? employeeId = null;
        bool isManager = false;
        var link = await _db.EmployeeUserLinks.Include(l => l.Employee)
            .FirstOrDefaultAsync(l => l.UserId == user.Id, ct);
        if (link?.Employee != null)
        {
            employeeFullName = link.Employee.FullName;
            employeeFullNameAr = link.Employee.FullNameAr;
            employeeId = link.EmployeeId;
            isManager = await _db.Employees.AnyAsync(e => e.ManagerEmployeeId == link.EmployeeId && !e.IsDeleted, ct);
        }

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var permissions = user.UserRoles.SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Key).Distinct().ToList();
        var branchIds = user.UserBranchScopes.Select(ubs => ubs.BranchId).ToList();

        var accessToken = _tokenGenerator.GenerateAccessToken(user, roles, permissions, branchIds, request.RememberMe);
        var refreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration(request.RememberMe);

        _db.RefreshTokens.Add(new Domain.Users.RefreshToken
        {
            UserId = user.Id,
            Token = refreshToken,
            ExpiresAtUtc = expiresAt.AddDays(7),
            DeviceInfo = request.DeviceInfo,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        });

        _db.AuditLogs.Add(new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.Login,
            EntityName = "User",
            EntityId = user.Id.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        });

        await _db.SaveChangesAsync(ct);

        var userInfo = new UserInfo(user.Id, user.Username, user.Email, user.PreferredLanguage,
            roles, permissions, branchIds, employeeFullName, employeeFullNameAr, employeeId, isManager);

        return Result.Success(new LoginResult(true, new LoginResponse(
            accessToken, refreshToken, expiresAt, user.MustChangePassword, userInfo)));
    }

    private static bool VerifyPassword(string password, string hash, string salt)
    {
        var saltBytes = Convert.FromBase64String(salt);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        return Convert.ToBase64String(pbkdf2.GetBytes(32)) == hash;
    }
}
