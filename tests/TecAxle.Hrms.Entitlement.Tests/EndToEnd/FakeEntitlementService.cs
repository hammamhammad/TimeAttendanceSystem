using System.Collections.Concurrent;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Entitlement.Tests.EndToEnd;

/// <summary>
/// In-memory <see cref="IEntitlementService"/> for HTTP-pipeline tests. Tests call
/// <see cref="SetTenantModules"/> to declare which modules a tenant has, and the filter/behavior reads
/// those values exactly as they would read from the real cached service in production.
/// </summary>
public class FakeEntitlementService : IEntitlementService
{
    private readonly ConcurrentDictionary<long, HashSet<SystemModule>> _enabledByTenant = new();
    private readonly ConcurrentDictionary<long, Dictionary<LimitType, int>> _limitsByTenant = new();
    private readonly ConcurrentDictionary<long, Dictionary<LimitType, int>> _usageByTenant = new();

    public void SetTenantModules(long tenantId, params SystemModule[] enabledModules)
        => _enabledByTenant[tenantId] = new HashSet<SystemModule>(enabledModules);

    public void SetTenantLimit(long tenantId, LimitType limit, int limitValue, int currentUsage)
    {
        _limitsByTenant.GetOrAdd(tenantId, _ => new Dictionary<LimitType, int>())[limit] = limitValue;
        _usageByTenant.GetOrAdd(tenantId, _ => new Dictionary<LimitType, int>())[limit] = currentUsage;
    }

    public Task<bool> IsModuleEnabledAsync(long tenantId, SystemModule module, CancellationToken ct = default)
    {
        var moduleInfo = ModuleMetadata.Get(module);
        if (moduleInfo.IsCore) return Task.FromResult(true);

        return Task.FromResult(_enabledByTenant.TryGetValue(tenantId, out var modules) && modules.Contains(module));
    }

    public Task<bool> IsFeatureEnabledAsync(long tenantId, string featureKey, CancellationToken ct = default)
        => Task.FromResult(false);

    public Task<int> GetLimitAsync(long tenantId, LimitType limitType, CancellationToken ct = default)
        => Task.FromResult(_limitsByTenant.TryGetValue(tenantId, out var limits) && limits.TryGetValue(limitType, out var v) ? v : -1);

    public Task<int> GetCurrentUsageAsync(long tenantId, LimitType limitType, CancellationToken ct = default)
        => Task.FromResult(_usageByTenant.TryGetValue(tenantId, out var usage) && usage.TryGetValue(limitType, out var v) ? v : 0);

    public async Task<bool> CanAddMoreAsync(long tenantId, LimitType limitType, int count = 1, CancellationToken ct = default)
    {
        var limit = await GetLimitAsync(tenantId, limitType, ct);
        if (limit == -1) return true;
        var current = await GetCurrentUsageAsync(tenantId, limitType, ct);
        return current + count <= limit;
    }

    public Task<TenantEntitlementSummary> GetEntitlementSummaryAsync(long tenantId, CancellationToken ct = default)
    {
        var modules = _enabledByTenant.TryGetValue(tenantId, out var m) ? m.ToList() : new List<SystemModule>();
        foreach (var core in ModuleMetadata.GetCoreModules())
            if (!modules.Contains(core)) modules.Add(core);

        return Task.FromResult(new TenantEntitlementSummary(
            TenantId: tenantId,
            PlanCode: "test-plan",
            PlanName: "Test Plan",
            PlanNameAr: "خطة اختبارية",
            PlanTier: "Custom",
            EnabledModules: modules.AsReadOnly(),
            FeatureFlags: new Dictionary<string, bool>(),
            Limits: new Dictionary<LimitType, LimitInfo>()));
    }

    public Task<IReadOnlyList<SystemModule>> GetEnabledModulesAsync(long tenantId, CancellationToken ct = default)
    {
        var modules = _enabledByTenant.TryGetValue(tenantId, out var m) ? m.ToList() : new List<SystemModule>();
        foreach (var core in ModuleMetadata.GetCoreModules())
            if (!modules.Contains(core)) modules.Add(core);
        return Task.FromResult<IReadOnlyList<SystemModule>>(modules.AsReadOnly());
    }

    public void InvalidateCache(long tenantId) { /* no-op — fake always reads live */ }
}
