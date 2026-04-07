using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.Api.Middleware;

/// <summary>
/// Middleware that resolves the current tenant from the request context.
/// Reads tenant_id from JWT claims for authenticated requests,
/// or from X-Tenant-Id header for pre-authentication scenarios.
/// </summary>
public class TenantResolutionMiddleware
{
    private readonly RequestDelegate _next;

    public TenantResolutionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, TenantContext tenantContext)
    {
        // Try to resolve from JWT claim first (authenticated requests)
        var tenantClaim = context.User?.FindFirst("tenant_id")?.Value;
        if (!string.IsNullOrEmpty(tenantClaim) && long.TryParse(tenantClaim, out var tenantId))
        {
            tenantContext.SetTenant(tenantId);
        }
        // Fallback: X-Tenant-Id header (for pre-auth or service-to-service calls)
        else if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var headerValue)
                 && long.TryParse(headerValue.FirstOrDefault(), out var headerTenantId))
        {
            tenantContext.SetTenant(headerTenantId);
        }

        // If tenant is not resolved, that's acceptable for:
        // - Unauthenticated endpoints (login, tenant discovery)
        // - System admin operations (cross-tenant)
        // - Background jobs (set tenant per iteration)

        await _next(context);
    }
}
