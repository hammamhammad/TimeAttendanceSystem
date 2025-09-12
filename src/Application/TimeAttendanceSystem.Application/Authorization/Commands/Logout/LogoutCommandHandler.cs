using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Common;
using System.IdentityModel.Tokens.Jwt;

namespace TimeAttendanceSystem.Application.Authorization.Commands.Logout;

public class LogoutCommandHandler : BaseHandler<LogoutCommand, Result<bool>>
{
    public LogoutCommandHandler(
        IApplicationDbContext context,
        ICurrentUser currentUser)
        : base(context, currentUser)
    {
    }

    public override async Task<Result<bool>> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var currentUserId = CurrentUser.UserId;
        if (!currentUserId.HasValue)
            return Result.Failure<bool>("User not authenticated.");

        var user = await Context.Users.FindAsync(currentUserId.Value);
        if (user == null)
            return Result.Failure<bool>("User not found.");

        if (request.LogoutFromAllDevices)
        {
            // Revoke all refresh tokens for the user
            var allRefreshTokens = await Context.RefreshTokens
                .Where(rt => rt.UserId == currentUserId.Value && rt.RevokedAtUtc == null)
                .ToListAsync(cancellationToken);

            foreach (var token in allRefreshTokens)
            {
                token.RevokedAtUtc = DateTime.UtcNow;
            }

            // Blacklist all active access tokens (this would require storing access token JTIs)
            // For now, we'll rely on short access token lifetime
        }
        else if (!string.IsNullOrEmpty(request.RefreshToken))
        {
            // Revoke specific refresh token
            var refreshToken = await Context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken && rt.UserId == currentUserId.Value, cancellationToken);

            if (refreshToken != null && refreshToken.IsActive)
            {
                refreshToken.RevokedAtUtc = DateTime.UtcNow;
            }
        }

        // Optionally blacklist the current access token
        var currentToken = GetCurrentAccessToken();
        if (!string.IsNullOrEmpty(currentToken))
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(currentToken);
            var tokenId = jwtToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Jti)?.Value;
            
            if (!string.IsNullOrEmpty(tokenId))
            {
                var blacklistedToken = new BlacklistedToken
                {
                    TokenId = tokenId,
                    TokenType = "AccessToken",
                    ExpiresAtUtc = jwtToken.ValidTo,
                    UserId = currentUserId.Value,
                    Reason = request.LogoutFromAllDevices ? "Logout from all devices" : "User logout",
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = user.Username
                };

                Context.BlacklistedTokens.Add(blacklistedToken);
            }
        }

        // Log audit entry
        var auditLog = new AuditLog
        {
            ActorUserId = currentUserId.Value,
            Action = request.LogoutFromAllDevices ? AuditAction.LogoutAllDevices : AuditAction.Logout,
            EntityName = "User",
            EntityId = currentUserId.Value.ToString(),
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = user.Username
        };

        Context.AuditLogs.Add(auditLog);
        await Context.SaveChangesAsync(cancellationToken);

        return Result.Success(true);
    }

    private string? GetCurrentAccessToken()
    {
        // This would typically extract the token from HttpContext.Request.Headers
        // For now, return null as we don't have access to HttpContext in the handler
        return null;
    }
}