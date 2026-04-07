namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Provides access to the current tenant context within a request scope.
/// Populated by middleware from JWT claims or request headers.
/// </summary>
public interface ITenantContext
{
    /// <summary>
    /// The ID of the resolved tenant. Null if tenant has not been resolved
    /// (e.g., unauthenticated endpoints, background jobs without tenant scope).
    /// </summary>
    long? TenantId { get; }

    /// <summary>
    /// Whether a tenant has been resolved for the current scope.
    /// </summary>
    bool IsResolved { get; }
}
