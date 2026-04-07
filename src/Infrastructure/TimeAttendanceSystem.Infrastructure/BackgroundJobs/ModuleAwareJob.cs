using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Infrastructure.Services;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Abstract base class for background jobs that are module-aware.
/// Iterates over all active tenants and only executes for tenants that have
/// the required module enabled in their subscription.
/// </summary>
public abstract class ModuleAwareJob : IInvocable
{
    /// <summary>
    /// The module that must be enabled for this job to execute for a tenant.
    /// </summary>
    protected abstract SystemModule RequiredModule { get; }

    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger _logger;

    protected ModuleAwareJob(IServiceProvider serviceProvider, ILogger logger)
    {
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    public async Task Invoke()
    {
        using var scope = _serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<IApplicationDbContext>();
        var entitlementService = scope.ServiceProvider.GetRequiredService<IEntitlementService>();
        var tenantContext = scope.ServiceProvider.GetRequiredService<TenantContext>();

        // Get all active tenant IDs
        var tenantIds = await context.Tenants
            .Where(t => !t.IsDeleted && t.IsActive)
            .Select(t => t.Id)
            .ToListAsync();

        foreach (var tenantId in tenantIds)
        {
            try
            {
                var isEnabled = await entitlementService.IsModuleEnabledAsync(tenantId, RequiredModule);
                if (!isEnabled)
                {
                    _logger.LogDebug(
                        "Skipping {JobName} for tenant {TenantId} — module {Module} not enabled",
                        GetType().Name, tenantId, RequiredModule);
                    continue;
                }

                // Set tenant context for this iteration
                tenantContext.SetTenant(tenantId);

                await ExecuteForTenantAsync(tenantId, scope.ServiceProvider);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Error executing {JobName} for tenant {TenantId}",
                    GetType().Name, tenantId);
            }
            finally
            {
                tenantContext.Clear();
            }
        }
    }

    /// <summary>
    /// Execute the job logic for a specific tenant. The tenant context is already set.
    /// </summary>
    protected abstract Task ExecuteForTenantAsync(long tenantId, IServiceProvider scopedServices);
}
