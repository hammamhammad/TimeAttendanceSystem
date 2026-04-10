using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Modules;
using TecAxle.Hrms.Domain.Subscriptions;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Orchestrates safe module deactivation and reactivation for a tenant.
/// Freezes/unfreezes in-flight workflows and logs entitlement changes.
/// </summary>
public class ModuleDeactivationService : IModuleDeactivationService
{
    private readonly IApplicationDbContext _context;
    private readonly IMasterDbContext _masterContext;
    private readonly IEntitlementService _entitlementService;
    private readonly ILogger<ModuleDeactivationService> _logger;

    public ModuleDeactivationService(
        IApplicationDbContext context,
        IMasterDbContext masterContext,
        IEntitlementService entitlementService,
        ILogger<ModuleDeactivationService> logger)
    {
        _context = context;
        _masterContext = masterContext;
        _entitlementService = entitlementService;
        _logger = logger;
    }

    public async Task DeactivateModuleAsync(
        long tenantId,
        SystemModule module,
        string reason,
        string performedBy,
        long? performedByUserId,
        CancellationToken ct = default)
    {
        // 1. Freeze in-flight workflows for this module's entity types
        var entityTypes = ModuleMetadata.GetEntityTypesForModule(module);
        if (entityTypes.Count > 0)
        {
            try
            {
                var activeStatuses = new[] { WorkflowStatus.Pending, WorkflowStatus.InProgress };

                // Get workflow instances that need freezing
                var workflows = await _context.WorkflowInstances
                    .Where(wi => activeStatuses.Contains(wi.Status)
                                 && entityTypes.Contains(wi.EntityType)
                                 && !wi.IsDeleted)
                    .Include(wi => wi.WorkflowDefinition)
                    .ToListAsync(ct);

                foreach (var workflow in workflows)
                {
                    // Store the previous status so we can restore it on reactivation
                    var previousContext = string.IsNullOrEmpty(workflow.ContextJson)
                        ? new Dictionary<string, object>()
                        : JsonSerializer.Deserialize<Dictionary<string, object>>(workflow.ContextJson)
                          ?? new Dictionary<string, object>();

                    previousContext["FrozenPreviousStatus"] = workflow.Status.ToString();
                    previousContext["FrozenAt"] = DateTime.UtcNow.ToString("O");
                    previousContext["FrozenReason"] = $"Module '{module}' deactivated: {reason}";

                    workflow.ContextJson = JsonSerializer.Serialize(previousContext);
                    workflow.Status = WorkflowStatus.Frozen;
                    workflow.ModifiedAtUtc = DateTime.UtcNow;
                    workflow.ModifiedBy = performedBy;
                }

                if (workflows.Count > 0)
                {
                    _logger.LogInformation(
                        "Frozen {Count} workflow(s) for tenant {TenantId} due to module {Module} deactivation",
                        workflows.Count, tenantId, module);
                }
            }
            catch (Exception ex) when (ex.InnerException?.Message.Contains("does not exist") == true
                                       || ex.Message.Contains("does not exist"))
            {
                _logger.LogWarning(
                    "Skipping workflow freeze for tenant {TenantId} — WorkflowInstances table does not exist (migrations may be pending)",
                    tenantId);
            }
        }

        // 2. Log entitlement change
        _masterContext.EntitlementChangeLogs.Add(new EntitlementChangeLog
        {
            TenantId = tenantId,
            ChangeType = EntitlementChangeType.ModuleAddOnRemoved,
            AffectedModule = module,
            NewValue = JsonSerializer.Serialize(new { Module = module.ToString(), Action = "Deactivated" }),
            Reason = reason,
            PerformedByUserId = performedByUserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = performedBy
        });

        await _context.SaveChangesAsync(ct);
        await _masterContext.SaveChangesAsync(ct);

        // 3. Invalidate cache
        _entitlementService.InvalidateCache(tenantId);
    }

    public async Task ReactivateModuleAsync(
        long tenantId,
        SystemModule module,
        string performedBy,
        long? performedByUserId,
        CancellationToken ct = default)
    {
        // 1. Unfreeze workflows for this module's entity types
        var entityTypes = ModuleMetadata.GetEntityTypesForModule(module);
        if (entityTypes.Count > 0)
        {
            try
            {
                var frozenWorkflows = await _context.WorkflowInstances
                    .Where(wi => wi.Status == WorkflowStatus.Frozen
                                 && entityTypes.Contains(wi.EntityType)
                                 && !wi.IsDeleted)
                    .ToListAsync(ct);

                foreach (var workflow in frozenWorkflows)
                {
                    // Restore previous status from context
                    var previousStatus = WorkflowStatus.InProgress; // default fallback
                    if (!string.IsNullOrEmpty(workflow.ContextJson))
                    {
                        try
                        {
                            var context = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(workflow.ContextJson);
                            if (context != null && context.TryGetValue("FrozenPreviousStatus", out var statusEl))
                            {
                                if (Enum.TryParse<WorkflowStatus>(statusEl.GetString(), out var parsed))
                                {
                                    previousStatus = parsed;
                                }
                            }

                            // Clean up freeze metadata
                            var cleanContext = new Dictionary<string, object>();
                            foreach (var kvp in context!)
                            {
                                if (!kvp.Key.StartsWith("Frozen"))
                                    cleanContext[kvp.Key] = kvp.Value;
                            }
                            workflow.ContextJson = cleanContext.Count > 0
                                ? JsonSerializer.Serialize(cleanContext)
                                : null;
                        }
                        catch
                        {
                            // If context is malformed, just restore to InProgress
                        }
                    }

                    workflow.Status = previousStatus;
                    workflow.ModifiedAtUtc = DateTime.UtcNow;
                    workflow.ModifiedBy = performedBy;
                }

                if (frozenWorkflows.Count > 0)
                {
                    _logger.LogInformation(
                        "Unfroze {Count} workflow(s) for tenant {TenantId} due to module {Module} reactivation",
                        frozenWorkflows.Count, tenantId, module);
                }
            }
            catch (Exception ex) when (ex.InnerException?.Message.Contains("does not exist") == true
                                       || ex.Message.Contains("does not exist"))
            {
                _logger.LogWarning(
                    "Skipping workflow unfreeze for tenant {TenantId} — WorkflowInstances table does not exist (migrations may be pending)",
                    tenantId);
            }
        }

        // 2. Log entitlement change
        _masterContext.EntitlementChangeLogs.Add(new EntitlementChangeLog
        {
            TenantId = tenantId,
            ChangeType = EntitlementChangeType.ModuleAddOnAdded,
            AffectedModule = module,
            NewValue = JsonSerializer.Serialize(new { Module = module.ToString(), Action = "Reactivated" }),
            Reason = "Module reactivated via plan change",
            PerformedByUserId = performedByUserId,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = performedBy
        });

        await _context.SaveChangesAsync(ct);
        await _masterContext.SaveChangesAsync(ct);

        // 3. Invalidate cache
        _entitlementService.InvalidateCache(tenantId);
    }
}
