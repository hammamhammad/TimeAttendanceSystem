using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Service for checking module/feature/limit entitlements for a tenant's subscription.
/// Results are cached per-tenant for performance.
/// </summary>
public interface IEntitlementService
{
    /// <summary>
    /// Checks whether a specific module is enabled for the given tenant.
    /// Core modules always return true.
    /// </summary>
    Task<bool> IsModuleEnabledAsync(long tenantId, SystemModule module, CancellationToken ct = default);

    /// <summary>
    /// Checks whether a specific feature flag is enabled for the given tenant.
    /// </summary>
    Task<bool> IsFeatureEnabledAsync(long tenantId, string featureKey, CancellationToken ct = default);

    /// <summary>
    /// Gets the limit value for a given limit type. Returns -1 for unlimited.
    /// </summary>
    Task<int> GetLimitAsync(long tenantId, LimitType limitType, CancellationToken ct = default);

    /// <summary>
    /// Gets the current usage count for a given limit type (e.g., current employee count).
    /// </summary>
    Task<int> GetCurrentUsageAsync(long tenantId, LimitType limitType, CancellationToken ct = default);

    /// <summary>
    /// Checks whether the tenant can add more items of a given type without exceeding the plan limit.
    /// </summary>
    Task<bool> CanAddMoreAsync(long tenantId, LimitType limitType, int count = 1, CancellationToken ct = default);

    /// <summary>
    /// Gets a complete entitlement summary for a tenant including all modules, features, and limits.
    /// </summary>
    Task<TenantEntitlementSummary> GetEntitlementSummaryAsync(long tenantId, CancellationToken ct = default);

    /// <summary>
    /// Gets the list of all enabled modules for the tenant.
    /// </summary>
    Task<IReadOnlyList<SystemModule>> GetEnabledModulesAsync(long tenantId, CancellationToken ct = default);

    /// <summary>
    /// Invalidates the cached entitlement data for a tenant. Call after subscription changes.
    /// </summary>
    void InvalidateCache(long tenantId);
}

/// <summary>
/// Complete entitlement summary for a tenant.
/// </summary>
public record TenantEntitlementSummary(
    long TenantId,
    string PlanCode,
    string PlanName,
    string? PlanNameAr,
    string PlanTier,
    IReadOnlyList<SystemModule> EnabledModules,
    IReadOnlyDictionary<string, bool> FeatureFlags,
    IReadOnlyDictionary<LimitType, LimitInfo> Limits
);

public record LimitInfo(int Limit, int Current);
