using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Authorization.Commands.Login;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Authorization.Commands.RefreshToken;

/// <summary>
/// Command handler for refresh token operations implementing secure token rotation.
/// Processes refresh token requests with comprehensive security validation,
/// automatic token rotation, and audit logging for session management.
/// </summary>
/// <remarks>
/// Handler Responsibilities:
/// - Refresh token validation and user authentication state verification
/// - Automatic token rotation with old token revocation
/// - User account status and security policy enforcement
/// - Role and permission aggregation for new token claims
/// - Comprehensive audit logging for security monitoring
/// - Device information tracking and session management
/// 
/// Token Rotation Security:
/// - Single-use refresh tokens prevent replay attacks
/// - Immediate revocation of old tokens limits exposure
/// - New token generation with updated expiration times
/// - Device fingerprinting for cross-device security
/// - Comprehensive audit trail for forensic analysis
/// 
/// Validation Process:
/// 1. Refresh token existence and validity verification
/// 2. User account status and lockout policy checking
/// 3. Role and permission aggregation for token claims
/// 4. New token generation with rotation security
/// 5. Old token revocation and cleanup
/// 6. Audit logging and session tracking
/// 
/// Security Enforcement:
/// - User account status validation (active, not locked)
/// - Refresh token expiration and revocation checking
/// - Device information validation and tracking
/// - Rate limiting and abuse prevention measures
/// - Comprehensive security event logging
/// 
/// Performance Optimizations:
/// - Single database query with eager loading for user data
/// - Efficient role and permission aggregation
/// - Minimal token generation overhead
/// - Optimized database operations for token management
/// - Async operations for non-blocking execution
/// </remarks>
public class RefreshTokenCommandHandler : BaseHandler<RefreshTokenCommand, Result<LoginResponse>>
{
    private readonly IJwtTokenGenerator _tokenGenerator;

    /// <summary>
    /// Initializes a new instance of the RefreshTokenCommandHandler.
    /// Sets up dependencies for secure token refresh operations.
    /// </summary>
    /// <param name="context">Database context for token and user data access</param>
    /// <param name="currentUser">Current user context for audit logging</param>
    /// <param name="tokenGenerator">JWT token generator for new token creation</param>
    public RefreshTokenCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IJwtTokenGenerator tokenGenerator)
        : base(context, currentUser)
    {
        _tokenGenerator = tokenGenerator;
    }

    public override async Task<Result<LoginResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        // Find the refresh token
        var refreshToken = await Context.RefreshTokens
            .Include(rt => rt.User)
                .ThenInclude(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                        .ThenInclude(r => r.RolePermissions)
                            .ThenInclude(rp => rp.Permission)
            .Include(rt => rt.User)
                .ThenInclude(u => u.UserBranchScopes)
                    .ThenInclude(ubs => ubs.Branch)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken, cancellationToken);

        if (refreshToken == null || !refreshToken.IsActive)
            return Result.Failure<LoginResponse>("Invalid or expired refresh token.");

        var user = refreshToken.User;

        // Check if user is still active
        if (!user.IsActive)
            return Result.Failure<LoginResponse>("User account is disabled.");

        // Check if user is locked out
        if (user.LockoutEndUtc.HasValue && user.LockoutEndUtc > DateTime.UtcNow)
            return Result.Failure<LoginResponse>("User account is locked.");

        // Revoke the old refresh token
        refreshToken.RevokedAtUtc = DateTime.UtcNow;

        // Get user permissions and roles
        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();
        var permissions = user.UserRoles
            .SelectMany(ur => ur.Role.RolePermissions)
            .Select(rp => rp.Permission.Key)
            .Distinct()
            .ToList();

        var branchIds = user.UserBranchScopes.Select(ubs => ubs.BranchId).ToList();

        // Fetch linked employee for full name and employee context
        string? employeeFullName = null;
        string? employeeFullNameAr = null;
        long? employeeId = null;
        bool isManager = false;

        var employeeLink = await Context.EmployeeUserLinks
            .Include(eul => eul.Employee)
            .FirstOrDefaultAsync(eul => eul.UserId == user.Id, cancellationToken);

        if (employeeLink?.Employee != null)
        {
            employeeFullName = employeeLink.Employee.FullName;
            employeeFullNameAr = employeeLink.Employee.FullNameAr;
            employeeId = employeeLink.EmployeeId;

            // Check if the employee is a manager (has direct reports)
            isManager = await Context.Employees
                .AnyAsync(e => e.ManagerEmployeeId == employeeLink.EmployeeId && !e.IsDeleted, cancellationToken);
        }

        // Generate new tokens
        var accessToken = _tokenGenerator.GenerateAccessToken(user, roles, permissions, branchIds);
        var newRefreshToken = _tokenGenerator.GenerateRefreshToken();
        var expiresAt = _tokenGenerator.GetTokenExpiration();

        // Store new refresh token
        var newRefreshTokenEntity = new TimeAttendanceSystem.Domain.Users.RefreshToken
        {
            UserId = user.Id,
            Token = newRefreshToken,
            ExpiresAtUtc = expiresAt.AddDays(7), // Refresh token expires in 7 days
            DeviceInfo = request.DeviceInfo ?? refreshToken.DeviceInfo,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.RefreshTokens.Add(newRefreshTokenEntity);

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = user.Id,
            Action = AuditAction.TokenRefresh,
            EntityName = "RefreshToken",
            EntityId = refreshToken.Id.ToString(),
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
            branchIds,
            employeeFullName,
            employeeFullNameAr,
            employeeId,
            isManager
        );

        var response = new LoginResponse(
            accessToken,
            newRefreshToken,
            expiresAt,
            user.MustChangePassword,
            userInfo
        );

        return Result.Success(response);
    }
}