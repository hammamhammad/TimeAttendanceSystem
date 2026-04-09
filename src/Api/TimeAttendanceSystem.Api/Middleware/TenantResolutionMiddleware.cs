using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.Api.Middleware;

/// <summary>
/// Middleware that resolves the current tenant from the request context.
/// Supports three user types:
/// 1. Regular tenant users: tenant_id from JWT claim
/// 2. Platform admin users (TecAxle Admin): tenant_id from X-Tenant-Id header (tenant switching)
/// 3. Unauthenticated requests: no tenant context (login, discovery endpoints)
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
        var isPlatformUser = context.User?.FindFirst("is_platform_user")?.Value == "true";

        if (isPlatformUser)
        {
            // Platform users (TecAxle Admin) have no tenant_id in JWT.
            // They select a tenant via X-Tenant-Id header to switch context.
            if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var headerValue)
                && long.TryParse(headerValue.FirstOrDefault(), out var headerTenantId))
            {
                tenantContext.SetTenant(headerTenantId);
            }
            // If no X-Tenant-Id header, tenant context stays unresolved.
            // Platform users can access master-only endpoints without a tenant.
        }
        else
        {
            // Regular tenant users: resolve from JWT claim
            var tenantClaim = context.User?.FindFirst("tenant_id")?.Value;
            if (!string.IsNullOrEmpty(tenantClaim) && long.TryParse(tenantClaim, out var tenantId))
            {
                tenantContext.SetTenant(tenantId);
            }
            // Fallback: X-Tenant-Id header (for pre-auth or service-to-service calls)
            else if (context.Request.Headers.TryGetValue("X-Tenant-Id", out var fallbackHeader)
                     && long.TryParse(fallbackHeader.FirstOrDefault(), out var fallbackTenantId))
            {
                tenantContext.SetTenant(fallbackTenantId);
            }
        }

        // If tenant is not resolved, that's acceptable for:
        // - Unauthenticated endpoints (login, tenant discovery)
        // - Platform admin accessing master-only endpoints
        // - Background jobs (set tenant per iteration)

        await _next(context);
    }
}
