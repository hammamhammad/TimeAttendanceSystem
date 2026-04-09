using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.Infrastructure.MultiTenancy;

/// <summary>
/// Creates TecAxleDbContext instances connected to specific tenant databases.
/// Used by login handler for dynamic tenant authentication.
/// </summary>
public class TenantDbContextFactory : ITenantDbContextFactory
{
    private readonly ITenantConnectionResolver _resolver;

    public TenantDbContextFactory(ITenantConnectionResolver resolver)
    {
        _resolver = resolver;
    }

    public async Task<IApplicationDbContext> CreateForTenantAsync(long tenantId, CancellationToken ct = default)
    {
        var connectionString = await _resolver.GetConnectionStringAsync(tenantId, ct);
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseNpgsql(connectionString)
            .ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning))
            .Options;

        return new ApplicationDbContextAdapter(new TecAxleDbContext(options));
    }
}
