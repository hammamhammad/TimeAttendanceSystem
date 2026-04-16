using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Default implementation of <see cref="ISystemUserResolver"/>. Resolves the system user
/// per tenant and caches the result for 5 minutes. See interface docs for resolution order.
/// </summary>
public sealed class SystemUserResolver : ISystemUserResolver
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly ITenantContext _tenantContext;
    private readonly IMemoryCache _cache;
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

    public SystemUserResolver(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        ITenantContext tenantContext,
        IMemoryCache cache)
    {
        _context = context;
        _currentUser = currentUser;
        _tenantContext = tenantContext;
        _cache = cache;
    }

    public async Task<long> GetSystemUserIdAsync(CancellationToken ct = default)
    {
        var tenantId = _currentUser.TenantId ?? _tenantContext.TenantId;
        var cacheKey = $"system-user-id:{tenantId ?? 0}";

        if (_cache.TryGetValue<long>(cacheKey, out var cached) && cached > 0)
            return cached;

        // Prefer a user flagged IsSystemUser = true. Within that set, prefer username "systemadmin".
        var systemUserId = await _context.Users
            .AsNoTracking()
            .Where(u => u.IsSystemUser && !u.IsDeleted && u.IsActive)
            .OrderByDescending(u => u.Username == "systemadmin")
            .ThenByDescending(u => u.Username == "tecaxleadmin")
            .ThenBy(u => u.Id)
            .Select(u => (long?)u.Id)
            .FirstOrDefaultAsync(ct);

        if (systemUserId.HasValue)
        {
            _cache.Set(cacheKey, systemUserId.Value, CacheDuration);
            return systemUserId.Value;
        }

        // Fallback to the authenticated user if we're running in an authenticated request
        if (_currentUser.UserId.HasValue)
            return _currentUser.UserId.Value;

        throw new InvalidOperationException(
            $"No system user (IsSystemUser=true) found for tenant {tenantId?.ToString() ?? "(no tenant context)"} and no authenticated user on request. " +
            "Ensure tenant provisioning seeded the systemadmin account.");
    }
}
