using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Infrastructure.Persistence.Master;

namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

/// <summary>
/// Resolves tenant database connection strings from the master database.
/// Caches decrypted connection strings in memory for performance.
/// Falls back to default connection based on MultiTenancy.Mode.
/// </summary>
public class TenantConnectionResolver : ITenantConnectionResolver, IDisposable
{
    private readonly MasterDbContext _masterContext;
    private readonly IConnectionStringEncryption _encryption;
    private readonly IMemoryCache _cache;
    private readonly MultiTenancyOptions _options;
    private readonly ILogger<TenantConnectionResolver> _logger;
    private readonly ConcurrentDictionary<string, byte> _knownConnectionStrings = new();

    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(30);

    public TenantConnectionResolver(
        MasterDbContext masterContext,
        IConnectionStringEncryption encryption,
        IMemoryCache cache,
        IOptions<MultiTenancyOptions> options,
        ILogger<TenantConnectionResolver> logger)
    {
        _masterContext = masterContext;
        _encryption = encryption;
        _cache = cache;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<string> GetConnectionStringAsync(long tenantId, CancellationToken ct = default)
    {
        var cacheKey = $"tenant_connstr:{tenantId}";

        if (_cache.TryGetValue(cacheKey, out string? cached) && cached is not null)
            return cached;

        // In SharedDatabase mode, always return the default connection
        if (_options.Mode == TenancyMode.SharedDatabase)
        {
            var defaultConn = GetDefaultConnectionString();
            _cache.Set(cacheKey, defaultConn, CacheDuration);
            return defaultConn;
        }

        // Load tenant from master DB
        var tenant = await _masterContext.Tenants
            .AsNoTracking()
            .Where(t => t.Id == tenantId && !t.IsDeleted)
            .Select(t => new { t.EncryptedConnectionString, t.DatabaseName, t.IsActive })
            .FirstOrDefaultAsync(ct);

        if (tenant == null)
            throw new InvalidOperationException($"Tenant {tenantId} not found in master database.");

        if (!tenant.IsActive)
            throw new InvalidOperationException($"Tenant {tenantId} is not active.");

        // If tenant has a dedicated connection string, decrypt and return it
        if (!string.IsNullOrEmpty(tenant.EncryptedConnectionString))
        {
            var decrypted = _encryption.Decrypt(tenant.EncryptedConnectionString);
            _cache.Set(cacheKey, decrypted, CacheDuration);
            _knownConnectionStrings.TryAdd(decrypted, 0);
            _logger.LogDebug("Resolved dedicated database for tenant {TenantId}: {DatabaseName}", tenantId, tenant.DatabaseName);
            return decrypted;
        }

        // Hybrid mode: fall back to default
        if (_options.Mode == TenancyMode.Hybrid)
        {
            var defaultConn = GetDefaultConnectionString();
            _cache.Set(cacheKey, defaultConn, CacheDuration);
            _logger.LogDebug("Tenant {TenantId} using shared database (Hybrid mode)", tenantId);
            return defaultConn;
        }

        // PerTenantDatabase mode: tenant must have its own DB
        throw new InvalidOperationException(
            $"Tenant {tenantId} does not have a dedicated database, but system is in PerTenantDatabase mode.");
    }

    public void InvalidateCache(long tenantId)
    {
        var cacheKey = $"tenant_connstr:{tenantId}";
        _cache.Remove(cacheKey);
        _logger.LogInformation("Invalidated connection string cache for tenant {TenantId}", tenantId);
    }

    private string GetDefaultConnectionString()
    {
        return _options.DefaultTenantConnectionString
            ?? throw new InvalidOperationException(
                "DefaultTenantConnectionString is not configured, but is required for SharedDatabase/Hybrid mode.");
    }

    public void Dispose()
    {
        _knownConnectionStrings.Clear();
    }
}
