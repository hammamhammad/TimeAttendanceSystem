using System.Security.Cryptography;
using MediatR;
using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Platform;
using TecAxle.Hrms.Domain.Users;

namespace TecAxle.Hrms.Application.Authorization.Commands.Login;

/// <summary>
/// Unified login handler — authenticates both tenant users and platform admins via email.
///
/// Flow:
/// 1. Query TenantUserEmails in master DB by email
/// 2. If 1 tenant match → authenticate against that tenant's DB
/// 3. If multiple matches → return tenant selection list
/// 4. If 0 matches → check PlatformUsers → authenticate as platform admin
/// </summary>
public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<LoginResult>>
{
    private readonly IMasterDbContext _masterContext;
    private readonly ITenantDbContextFactory _tenantDbFactory;
    private readonly IJwtTokenGenerator _tokenGenerator;
    private readonly IDeviceService _deviceService;

    public LoginCommandHandler(
        IMasterDbContext masterContext,
        ITenantDbContextFactory tenantDbFactory,
        IJwtTokenGenerator tokenGenerator,
        IDeviceService deviceService)
    {
        _masterContext = masterContext;
        _tenantDbFactory = tenantDbFactory;
        _tokenGenerator = tokenGenerator;
        _deviceService = deviceService;
    }

    public async Task<Result<LoginResult>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim().ToLowerInvariant();

        // Step 1: Look up email in TenantUserEmails (master DB)
        var tenantMappings = await _masterContext.TenantUserEmails
            .AsNoTracking()
            .Where(tue => tue.Email == normalizedEmail)
            .Include(tue => tue.Tenant)
            .Where(tue => tue.Tenant.IsActive && !tue.Tenant.IsDeleted)
            .Select(tue => new { tue.TenantId, tue.Tenant.Name, tue.Tenant.NameAr, tue.Tenant.LogoUrl })
            .ToListAsync(cancellationToken);

        // Step 2: If specific tenant selected (multi-tenant case)
        if (request.TenantId.HasValue)
        {
            var match = tenantMappings.FirstOrDefault(t => t.TenantId == request.TenantId.Value);
            if (match == null)
                return Result.Failure<LoginResult>("Invalid credentials.");

            return await AuthenticateTenantUserAsync(normalizedEmail, request, match.TenantId, cancellationToken);
        }

        // Step 3: Single tenant → authenticate directly
        if (tenantMappings.Count == 1)
            return await AuthenticateTenantUserAsync(normalizedEmail, request, tenantMappings[0].TenantId, cancellationToken);

        // Step 4: Multiple tenants → return selection
        if (tenantMappings.Count > 1)
        {
            var options = tenantMappings.Select(t => new TenantOption(t.TenantId, t.Name, t.NameAr, t.LogoUrl)).ToList();
            return Result.Success(new LoginResult(false, null, true, options));
        }

        // Step 5: Not found in tenants → check PlatformUsers
        return await AuthenticatePlatformUserAsync(normalizedEmail, request, cancellationToken);
    }

    private async Task<Result<LoginResult>> AuthenticateTenantUserAsync(
        string email, LoginCommand request, long tenantId, CancellationToken ct)
    {
        var tenantDb = await _tenantDbFactory.CreateForTenantAsync(tenantId, ct);

        var user = await tenantDb.Users
            .Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
                .ThenInclude(r => r.RolePermissions).ThenInclude(rp => rp.Permission)
            .Include(u => u.UserBranchScopes).ThenInclude(ubs => ubs.Branch)
            .FirstOrDefaultAsync(u => u.Email == email, ct);

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
            if (user.FailedLoginAttempts >= 15) user.LockoutEndUtc = DateTime.UtcNow.AddHours(24);
            else if (user.FailedLoginAttempts >= 10) user.LockoutEndUtc = DateTime.UtcNow.AddHours(1);
            else if (user.FailedLoginAttempts >= 5) user.LockoutEndUtc = DateTime.UtcNow.AddMinutes(15);
            await tenantDb.SaveChangesAsync(ct);
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

        // Employee info
        string? employeeFullName = null, employeeFullNameAr = null;
        long? employeeId = null;
        bool isManager = false;
        var link = await tenantDb.EmployeeUserLinks.Include(l => l.Employee)
            .FirstOrDefaultAsync(l => l.UserId == user.Id, ct);
        if (link?.Employee != null)
        {
            employeeFullName = link.Employee.FullName;
            employeeFullNameAr = link.Employee.FullNameAr;
            employeeId = link.EmployeeId;
            isManager = await tenantDb.Employees.AnyAsync(e => e.ManagerEmployeeId == link.EmployeeId && !e.IsDeleted, ct);
        }

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var permissions = user.UserRoles.SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Key).Distinct().ToList();
        var branchIds = user.UserBranchScopes.Select(ubs => ubs.BranchId).ToList();

        var accessToken = _tokenGenerator.GenerateAccessToken(user, roles, permissions, branchIds, tenantId, request.RememberMe);
        var refreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration(request.RememberMe);

        tenantDb.RefreshTokens.Add(new Domain.Users.RefreshToken
        {
            UserId = user.Id, Token = refreshToken,
            ExpiresAtUtc = expiresAt.AddDays(7), DeviceInfo = request.DeviceInfo,
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = user.Username
        });

        tenantDb.AuditLogs.Add(new AuditLog
        {
            ActorUserId = user.Id, Action = AuditAction.Login,
            EntityName = "User", EntityId = user.Id.ToString(),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = user.Username
        });

        await tenantDb.SaveChangesAsync(ct);

        var userInfo = new UserInfo(user.Id, user.Username, user.Email, user.PreferredLanguage,
            roles, permissions, branchIds, employeeFullName, employeeFullNameAr, employeeId, isManager);

        return Result.Success(new LoginResult(true, new LoginResponse(accessToken, refreshToken, expiresAt, user.MustChangePassword, userInfo, false)));
    }

    private async Task<Result<LoginResult>> AuthenticatePlatformUserAsync(
        string email, LoginCommand request, CancellationToken ct)
    {
        var platformUser = await _masterContext.PlatformUsers
            .FirstOrDefaultAsync(u => u.Email == email && !u.IsDeleted, ct);

        if (platformUser == null)
            return Result.Failure<LoginResult>("Invalid credentials.");

        if (!platformUser.IsActive)
            return Result.Failure<LoginResult>("Account is disabled.");

        if (platformUser.LockoutEndUtc.HasValue && platformUser.LockoutEndUtc > DateTime.UtcNow)
            return Result.Failure<LoginResult>("Account is locked.");

        if (!VerifyPassword(request.Password, platformUser.PasswordHash, platformUser.PasswordSalt))
        {
            platformUser.FailedLoginAttempts++;
            if (platformUser.FailedLoginAttempts >= 5) platformUser.LockoutEndUtc = DateTime.UtcNow.AddMinutes(15);
            await _masterContext.SaveChangesAsync(ct);
            return Result.Failure<LoginResult>("Invalid credentials.");
        }

        if (platformUser.FailedLoginAttempts > 0) { platformUser.FailedLoginAttempts = 0; platformUser.LockoutEndUtc = null; }
        platformUser.LastLoginAtUtc = DateTime.UtcNow;

        var roles = new List<string> { "SystemAdmin" };
        var permissions = new List<string> { "*" };
        var accessToken = _tokenGenerator.GeneratePlatformAccessToken(platformUser, roles, permissions, request.RememberMe);
        var refreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration(request.RememberMe);

        await _masterContext.SaveChangesAsync(ct);

        var userInfo = new UserInfo(platformUser.Id, platformUser.Username, platformUser.Email,
            platformUser.PreferredLanguage, roles, permissions, new List<long>(),
            platformUser.FullName, platformUser.FullNameAr, null, false);

        return Result.Success(new LoginResult(true, new LoginResponse(accessToken, refreshToken, expiresAt, platformUser.MustChangePassword, userInfo, true)));
    }

    private static bool VerifyPassword(string password, string hash, string salt)
    {
        var saltBytes = Convert.FromBase64String(salt);
        using var pbkdf2 = new Rfc2898DeriveBytes(password, saltBytes, 10000, HashAlgorithmName.SHA256);
        return Convert.ToBase64String(pbkdf2.GetBytes(32)) == hash;
    }
}
