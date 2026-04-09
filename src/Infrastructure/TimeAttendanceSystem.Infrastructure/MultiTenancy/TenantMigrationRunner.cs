using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Infrastructure.Persistence.Master;

namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

/// <summary>
/// Applies pending EF Core migrations across all tenant databases.
/// Can be run at startup or as a CLI command.
/// </summary>
public class TenantMigrationRunner
{
    private readonly MasterDbContext _masterContext;
    private readonly IConnectionStringEncryption _encryption;
    private readonly ILogger<TenantMigrationRunner> _logger;

    public TenantMigrationRunner(
        MasterDbContext masterContext,
        IConnectionStringEncryption encryption,
        ILogger<TenantMigrationRunner> logger)
    {
        _masterContext = masterContext;
        _encryption = encryption;
        _logger = logger;
    }

    /// <summary>
    /// Applies pending migrations to all active tenant databases that have a dedicated database.
    /// </summary>
    public async Task ApplyPendingMigrationsAsync(CancellationToken ct = default)
    {
        var tenants = await _masterContext.Tenants
            .Where(t => t.IsActive && !t.IsDeleted && t.EncryptedConnectionString != null)
            .Select(t => new { t.Id, t.DatabaseName, t.EncryptedConnectionString })
            .ToListAsync(ct);

        _logger.LogInformation("Applying migrations to {Count} tenant database(s)", tenants.Count);

        var successCount = 0;
        var failureCount = 0;

        foreach (var tenant in tenants)
        {
            try
            {
                var connectionString = _encryption.Decrypt(tenant.EncryptedConnectionString!);
                var options = new DbContextOptionsBuilder<Persistence.TecAxleDbContext>()
                    .UseNpgsql(connectionString)
                    .Options;

                await using var tenantContext = new Persistence.TecAxleDbContext(options);
                var pending = await tenantContext.Database.GetPendingMigrationsAsync(ct);
                var pendingList = pending.ToList();

                if (pendingList.Count > 0)
                {
                    await tenantContext.Database.MigrateAsync(ct);
                    _logger.LogInformation(
                        "Applied {Count} migration(s) to tenant {TenantId} ({DbName})",
                        pendingList.Count, tenant.Id, tenant.DatabaseName);
                }

                // Update migration version
                var trackedTenant = await _masterContext.Tenants.FindAsync(new object[] { tenant.Id }, ct);
                if (trackedTenant != null)
                {
                    trackedTenant.DatabaseMigrationVersion = "latest";
                    trackedTenant.ModifiedAtUtc = DateTime.UtcNow;
                }

                successCount++;
            }
            catch (Exception ex)
            {
                failureCount++;
                _logger.LogError(ex,
                    "Failed to apply migrations to tenant {TenantId} ({DbName})",
                    tenant.Id, tenant.DatabaseName);
            }
        }

        await _masterContext.SaveChangesAsync(ct);
        _logger.LogInformation(
            "Migration run complete: {Success} succeeded, {Failures} failed out of {Total}",
            successCount, failureCount, tenants.Count);
    }
}
