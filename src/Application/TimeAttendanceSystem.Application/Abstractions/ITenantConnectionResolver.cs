namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Resolves and caches database connection strings for tenant databases.
/// Used by the dynamic TenantDbContext factory to connect to the correct database per request.
/// </summary>
public interface ITenantConnectionResolver
{
    /// <summary>
    /// Gets the decrypted connection string for a tenant's dedicated database.
    /// Results are cached in memory for performance.
    /// </summary>
    Task<string> GetConnectionStringAsync(long tenantId, CancellationToken ct = default);

    /// <summary>
    /// Invalidates the cached connection string for a tenant.
    /// Call this after changing a tenant's connection string or database assignment.
    /// </summary>
    void InvalidateCache(long tenantId);
}
