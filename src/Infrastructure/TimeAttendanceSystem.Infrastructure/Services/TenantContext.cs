using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Scoped service that holds the resolved tenant context for the current request.
/// Populated by TenantResolutionMiddleware.
/// </summary>
public class TenantContext : ITenantContext
{
    public long? TenantId { get; private set; }
    public bool IsResolved => TenantId.HasValue;

    /// <summary>
    /// Sets the tenant for the current scope. Called by middleware or background job infrastructure.
    /// </summary>
    public void SetTenant(long tenantId)
    {
        TenantId = tenantId;
    }

    /// <summary>
    /// Clears the tenant context. Used between tenant iterations in background jobs.
    /// </summary>
    public void Clear()
    {
        TenantId = null;
    }
}
