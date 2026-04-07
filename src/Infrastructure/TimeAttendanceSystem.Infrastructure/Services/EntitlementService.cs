using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;

namespace TecAxle.Hrms.Infrastructure.Services;

public class EntitlementService : IEntitlementService
{
    private readonly IApplicationDbContext _context;
    private readonly IMemoryCache _cache;
    private readonly ILogger<EntitlementService> _logger;
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

    public EntitlementService(
        IApplicationDbContext context,
        IMemoryCache cache,
        ILogger<EntitlementService> logger)
    {
        _context = context;
        _cache = cache;
        _logger = logger;
    }

    public async Task<bool> IsModuleEnabledAsync(long tenantId, SystemModule module, CancellationToken ct = default)
    {
        // Core modules are always enabled
        var moduleInfo = ModuleMetadata.Get(module);
        if (moduleInfo.IsCore) return true;

        var enabledModules = await GetEnabledModulesAsync(tenantId, ct);
        return enabledModules.Contains(module);
    }

    public async Task<bool> IsFeatureEnabledAsync(long tenantId, string featureKey, CancellationToken ct = default)
    {
        var summary = await GetEntitlementSummaryAsync(tenantId, ct);
        return summary.FeatureFlags.TryGetValue(featureKey, out var enabled) && enabled;
    }

    public async Task<int> GetLimitAsync(long tenantId, LimitType limitType, CancellationToken ct = default)
    {
        var summary = await GetEntitlementSummaryAsync(tenantId, ct);
        return summary.Limits.TryGetValue(limitType, out var info) ? info.Limit : 0;
    }

    public async Task<int> GetCurrentUsageAsync(long tenantId, LimitType limitType, CancellationToken ct = default)
    {
        return limitType switch
        {
            LimitType.MaxEmployees => await _context.Employees
                .CountAsync(e => e.Branch.TenantId == tenantId && !e.IsDeleted, ct),
            LimitType.MaxBranches => await _context.Branches
                .CountAsync(b => b.TenantId == tenantId && !b.IsDeleted, ct),
            LimitType.MaxUsers => await _context.Users
                .CountAsync(u => u.UserBranchScopes.Any(ubs => ubs.Branch.TenantId == tenantId) && !u.IsDeleted, ct),
            _ => 0
        };
    }

    public async Task<bool> CanAddMoreAsync(long tenantId, LimitType limitType, int count = 1, CancellationToken ct = default)
    {
        var limit = await GetLimitAsync(tenantId, limitType, ct);
        if (limit == -1) return true; // Unlimited

        var current = await GetCurrentUsageAsync(tenantId, limitType, ct);
        return current + count <= limit;
    }

    public async Task<TenantEntitlementSummary> GetEntitlementSummaryAsync(long tenantId, CancellationToken ct = default)
    {
        var cacheKey = $"entitlement:{tenantId}";

        if (_cache.TryGetValue<TenantEntitlementSummary>(cacheKey, out var cached) && cached != null)
            return cached;

        var summary = await BuildEntitlementSummaryAsync(tenantId, ct);

        _cache.Set(cacheKey, summary, CacheDuration);
        return summary;
    }

    public async Task<IReadOnlyList<SystemModule>> GetEnabledModulesAsync(long tenantId, CancellationToken ct = default)
    {
        var summary = await GetEntitlementSummaryAsync(tenantId, ct);
        return summary.EnabledModules;
    }

    public void InvalidateCache(long tenantId)
    {
        _cache.Remove($"entitlement:{tenantId}");
    }

    private async Task<TenantEntitlementSummary> BuildEntitlementSummaryAsync(long tenantId, CancellationToken ct)
    {
        // Get the active subscription for this tenant
        var subscription = await _context.TenantSubscriptions
            .Include(s => s.Plan)
                .ThenInclude(p => p.ModuleEntitlements)
                    .ThenInclude(me => me.FeatureFlags)
            .Include(s => s.Plan)
                .ThenInclude(p => p.Limits)
            .Include(s => s.AddOns)
            .Include(s => s.FeatureOverrides)
            .FirstOrDefaultAsync(s =>
                s.TenantId == tenantId &&
                !s.IsDeleted &&
                (s.Status == SubscriptionStatus.Active || s.Status == SubscriptionStatus.Trial),
                ct);

        if (subscription == null)
        {
            _logger.LogWarning("No active subscription found for tenant {TenantId}. Returning core-only entitlements.", tenantId);
            return BuildCoreOnlySummary(tenantId);
        }

        // Collect enabled modules from plan
        var enabledModules = new HashSet<SystemModule>();

        // Always add core modules
        foreach (var coreModule in ModuleMetadata.GetCoreModules())
            enabledModules.Add(coreModule);

        // Add plan-included modules
        foreach (var entitlement in subscription.Plan.ModuleEntitlements.Where(e => e.IsIncluded && !e.IsDeleted))
            enabledModules.Add(entitlement.Module);

        // Add active add-on modules
        foreach (var addOn in subscription.AddOns.Where(a => a.IsActive && !a.IsDeleted))
            enabledModules.Add(addOn.Module);

        // Collect feature flags from plan
        var featureFlags = new Dictionary<string, bool>();
        foreach (var entitlement in subscription.Plan.ModuleEntitlements.Where(e => !e.IsDeleted))
        {
            foreach (var flag in entitlement.FeatureFlags.Where(f => !f.IsDeleted))
            {
                featureFlags[flag.FeatureKey] = flag.IsEnabled;
            }
        }

        // Apply tenant-specific overrides
        foreach (var overrideEntry in subscription.FeatureOverrides.Where(o => !o.IsDeleted))
        {
            featureFlags[overrideEntry.FeatureKey] = overrideEntry.IsEnabled;
        }

        // Collect limits
        var limits = new Dictionary<LimitType, LimitInfo>();
        foreach (var limit in subscription.Plan.Limits.Where(l => !l.IsDeleted))
        {
            var current = await GetCurrentUsageAsync(tenantId, limit.LimitType, ct);
            limits[limit.LimitType] = new LimitInfo(limit.LimitValue, current);
        }

        return new TenantEntitlementSummary(
            TenantId: tenantId,
            PlanCode: subscription.Plan.Code,
            PlanName: subscription.Plan.Name,
            PlanNameAr: subscription.Plan.NameAr,
            PlanTier: subscription.Plan.Tier.ToString(),
            EnabledModules: enabledModules.ToList().AsReadOnly(),
            FeatureFlags: featureFlags,
            Limits: limits
        );
    }

    private static TenantEntitlementSummary BuildCoreOnlySummary(long tenantId)
    {
        var coreModules = ModuleMetadata.GetCoreModules().ToList();
        return new TenantEntitlementSummary(
            TenantId: tenantId,
            PlanCode: "none",
            PlanName: "No Active Plan",
            PlanNameAr: "لا توجد خطة نشطة",
            PlanTier: "None",
            EnabledModules: coreModules.AsReadOnly(),
            FeatureFlags: new Dictionary<string, bool>(),
            Limits: new Dictionary<LimitType, LimitInfo>()
        );
    }
}
