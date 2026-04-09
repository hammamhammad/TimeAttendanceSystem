using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Infrastructure.Persistence.Master;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Abstract base class for background jobs that iterate over all active tenants.
/// Queries the master database for the tenant list, optionally checks module entitlements,
/// and creates a fresh DI scope per tenant with the correct TenantContext set.
///
/// In per-tenant database mode, each iteration's scoped TenantDbContext will connect
/// to the correct tenant database via the TenantConnectionResolver.
///
/// Replaces ModuleAwareJob for the per-tenant database architecture.
/// </summary>
public abstract class TenantIteratingJob : IInvocable
{
    /// <summary>
    /// The module that must be enabled for this job to execute for a tenant.
    /// Return null if the job should run for all tenants regardless of modules.
    /// </summary>
    protected abstract SystemModule? RequiredModule { get; }

    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger _logger;

    protected TenantIteratingJob(IServiceProvider serviceProvider, ILogger logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task Invoke()
    {
        // Use a scope to access the master database for tenant list
        using var masterScope = _serviceProvider.CreateScope();
        var masterContext = masterScope.ServiceProvider.GetRequiredService<MasterDbContext>();
        var entitlementService = masterScope.ServiceProvider.GetRequiredService<IEntitlementService>();

        var tenantIds = await masterContext.Tenants
            .Where(t => !t.IsDeleted && t.IsActive)
            .Select(t => t.Id)
            .ToListAsync();

        _logger.LogDebug("{JobName} starting for {Count} active tenant(s)", GetType().Name, tenantIds.Count);

        foreach (var tenantId in tenantIds)
        {
            try
            {
                // Check module entitlement if required
                if (RequiredModule.HasValue)
                {
                    var isEnabled = await entitlementService.IsModuleEnabledAsync(tenantId, RequiredModule.Value);
                    if (!isEnabled)
                    {
                        _logger.LogDebug(
                            "Skipping {JobName} for tenant {TenantId} — module {Module} not enabled",
                            GetType().Name, tenantId, RequiredModule.Value);
                        continue;
                    }
                }

                // Create a fresh DI scope for this tenant
                // The scoped TenantDbContext factory will resolve the correct database
                using var tenantScope = _serviceProvider.CreateScope();
                var tenantContext = tenantScope.ServiceProvider.GetRequiredService<TenantContext>();
                tenantContext.SetTenant(tenantId);

                await ExecuteForTenantAsync(tenantId, tenantScope.ServiceProvider);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error executing {JobName} for tenant {TenantId}",
                    GetType().Name, tenantId);
            }
        }

        _logger.LogDebug("{JobName} completed for {Count} tenant(s)", GetType().Name, tenantIds.Count);
    }

    /// <summary>
    /// Execute the job logic for a specific tenant.
    /// The tenant context is already set on the scoped service provider.
    /// Use scopedServices.GetRequiredService to get tenant-scoped dependencies.
    /// </summary>
    protected abstract Task ExecuteForTenantAsync(long tenantId, IServiceProvider scopedServices);
}
