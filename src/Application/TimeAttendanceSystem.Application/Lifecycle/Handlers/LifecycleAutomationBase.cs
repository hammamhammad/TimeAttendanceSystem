using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Lifecycle;
using TecAxle.Hrms.Domain.Company;

namespace TecAxle.Hrms.Application.Lifecycle.Handlers;

/// <summary>
/// Shared plumbing for every <c>INotificationHandler&lt;TEvent&gt;</c> in the lifecycle chain:
/// resolve settings, check master kill-switch + automation flag, dedupe via idempotency key,
/// and append exactly one <see cref="LifecycleAutomationAudit"/> row per attempt (success,
/// skip, disabled, duplicate, failed, missing-prerequisite).
/// </summary>
public abstract class LifecycleAutomationBase
{
    protected readonly IApplicationDbContext Context;
    protected readonly ILogger Logger;

    protected LifecycleAutomationBase(IApplicationDbContext context, ILogger logger)
    {
        Context = context;
        Logger = logger;
    }

    protected async Task<CompanySettings?> LoadSettingsAsync(CancellationToken ct)
    {
        // The request is already scoped to the correct tenant DB by TenantResolutionMiddleware,
        // so there is at most one CompanySettings row in this context.
        return await Context.CompanySettings.AsNoTracking().FirstOrDefaultAsync(ct);
    }

    protected async Task<bool> AlreadySucceededAsync(
        string sourceEntityType, long sourceEntityId,
        LifecycleAutomationType automationType, CancellationToken ct)
    {
        return await Context.LifecycleAutomationAudits.AnyAsync(
            a => a.SourceEntityType == sourceEntityType
                 && a.SourceEntityId == sourceEntityId
                 && a.AutomationType == automationType
                 && a.Status == LifecycleAutomationStatus.Succeeded
                 && !a.IsDeleted,
            ct);
    }

    protected async Task WriteAuditAsync(
        LifecycleAutomationType automationType,
        string sourceEntityType, long sourceEntityId,
        LifecycleAutomationStatus status,
        DateTime triggeredAtUtc,
        string? targetEntityType = null,
        long? targetEntityId = null,
        string? reason = null,
        string? errorMessage = null,
        long? triggeredByUserId = null,
        object? context = null,
        CancellationToken ct = default)
    {
        try
        {
            var audit = new LifecycleAutomationAudit
            {
                AutomationType = automationType,
                SourceEntityType = sourceEntityType,
                SourceEntityId = sourceEntityId,
                TargetEntityType = targetEntityType,
                TargetEntityId = targetEntityId,
                Status = status,
                Reason = Truncate(reason, 1000),
                ErrorMessage = Truncate(errorMessage, 2000),
                TriggeredAtUtc = triggeredAtUtc,
                CompletedAtUtc = DateTime.UtcNow,
                TriggeredByUserId = triggeredByUserId,
                ContextJson = context == null ? null : JsonSerializer.Serialize(context),
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = "LIFECYCLE-AUTOMATION"
            };

            Context.LifecycleAutomationAudits.Add(audit);
            await Context.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            // Never let audit-writing bring down the originating command.
            Logger.LogError(ex,
                "Failed to persist LifecycleAutomationAudit ({Source} {SourceId} {Type} {Status})",
                sourceEntityType, sourceEntityId, automationType, status);
        }
    }

    private static string? Truncate(string? value, int max)
        => string.IsNullOrEmpty(value) || value!.Length <= max ? value : value[..max];
}
