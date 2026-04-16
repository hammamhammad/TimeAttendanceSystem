using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using TecAxle.Hrms.Application.Abstractions;

namespace TecAxle.Hrms.Infrastructure.Services;

public sealed class SystemUserResolver : ISystemUserResolver
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;
    private readonly IMemoryCache _cache;
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);
    private const string CacheKey = "system-user-id";

    public SystemUserResolver(
        IApplicationDbContext context,
        ICurrentUser currentUser,
        IMemoryCache cache)
    {
        _context = context;
        _currentUser = currentUser;
        _cache = cache;
    }

    public async Task<long> GetSystemUserIdAsync(CancellationToken ct = default)
    {
        if (_cache.TryGetValue<long>(CacheKey, out var cached) && cached > 0)
            return cached;

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
            _cache.Set(CacheKey, systemUserId.Value, CacheDuration);
            return systemUserId.Value;
        }

        if (_currentUser.UserId.HasValue)
            return _currentUser.UserId.Value;

        throw new InvalidOperationException(
            "No system user (IsSystemUser=true) found and no authenticated user on request. " +
            "Ensure seed data created the systemadmin account.");
    }
}
