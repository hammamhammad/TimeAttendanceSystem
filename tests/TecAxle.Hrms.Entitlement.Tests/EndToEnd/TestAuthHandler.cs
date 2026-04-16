using System.Security.Claims;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace TecAxle.Hrms.Entitlement.Tests.EndToEnd;

/// <summary>
/// Authentication handler used by <see cref="EntitlementTestWebApplicationFactory"/> that builds the
/// user principal from a few request headers. This lets tests impersonate tenant users, SystemAdmin,
/// or platform admin without issuing real JWTs.
///
/// Headers:
/// <list type="bullet">
///   <item><c>X-Test-User-Id</c> — numeric user id (optional)</item>
///   <item><c>X-Test-Tenant-Id</c> — numeric tenant id to include as the <c>tenant_id</c> claim</item>
///   <item><c>X-Test-Roles</c> — comma-separated role claims (e.g. <c>SystemAdmin</c>, <c>HRManager</c>)</item>
///   <item><c>X-Test-Platform-User</c> — <c>true</c> to mark the caller as platform admin (<c>is_platform_user</c>)</item>
/// </list>
/// Absence of <c>X-Test-User-Id</c> yields an unauthenticated identity (anonymous).
/// </summary>
public class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    public const string SchemeName = "TestAuth";

    public TestAuthHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder)
        : base(options, logger, encoder) { }

    protected override Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var req = Request;
        if (!req.Headers.TryGetValue("X-Test-User-Id", out var userIdValue))
        {
            // No test-auth header → treat as anonymous, but succeed (endpoints may still allow anonymous).
            return Task.FromResult(AuthenticateResult.NoResult());
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, userIdValue.ToString()),
            new(ClaimTypes.Name, $"test-user-{userIdValue}")
        };

        if (req.Headers.TryGetValue("X-Test-Tenant-Id", out var tenantIdValue))
        {
            claims.Add(new Claim("tenant_id", tenantIdValue.ToString()));
        }

        if (req.Headers.TryGetValue("X-Test-Roles", out var rolesValue))
        {
            foreach (var role in rolesValue.ToString().Split(',', StringSplitOptions.RemoveEmptyEntries))
                claims.Add(new Claim(ClaimTypes.Role, role.Trim()));
        }

        if (req.Headers.TryGetValue("X-Test-Platform-User", out var platformValue)
            && string.Equals(platformValue.ToString(), "true", StringComparison.OrdinalIgnoreCase))
        {
            claims.Add(new Claim("is_platform_user", "true"));
        }

        var identity = new ClaimsIdentity(claims, SchemeName);
        var principal = new ClaimsPrincipal(identity);
        var ticket = new AuthenticationTicket(principal, SchemeName);
        return Task.FromResult(AuthenticateResult.Success(ticket));
    }
}
