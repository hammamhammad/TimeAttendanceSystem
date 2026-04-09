namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Creates IApplicationDbContext instances for specific tenant databases.
/// Used by the login handler to authenticate against a specific tenant's DB.
/// </summary>
public interface ITenantDbContextFactory
{
    /// <summary>
    /// Creates a new IApplicationDbContext connected to the specified tenant's database.
    /// Caller is responsible for disposing.
    /// </summary>
    Task<IApplicationDbContext> CreateForTenantAsync(long tenantId, CancellationToken ct = default);
}
