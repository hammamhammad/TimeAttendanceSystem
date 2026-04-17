using System.Text.Json;
using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that cancels workflow instances that have been Frozen beyond the tenant's
/// configured threshold (<see cref="Domain.Company.CompanySettings.FrozenWorkflowCleanupDays"/>,
/// default 90). Workflows are frozen when their owning module is deactivated — after the threshold,
/// it's unlikely the module will be re-enabled, so we auto-cancel.
/// </summary>
public class FrozenWorkflowCleanupJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<FrozenWorkflowCleanupJob> _logger;

    /// <summary>Fallback when no CompanySettings row exists — matches the pre-v13.3 hardcoded value.</summary>
    private const int DefaultFrozenDaysThreshold = 90;

    public FrozenWorkflowCleanupJob(IApplicationDbContext context, ILogger<FrozenWorkflowCleanupJob> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task Invoke()
    {
        _logger.LogInformation("Starting frozen workflow cleanup job at {Time}", DateTime.UtcNow);

        try
        {
            var settings = await _context.CompanySettings.AsNoTracking().FirstOrDefaultAsync();
            var threshold = settings?.FrozenWorkflowCleanupDays ?? DefaultFrozenDaysThreshold;
            var cutoffDate = DateTime.UtcNow.AddDays(-threshold);

            var frozenWorkflows = await _context.WorkflowInstances
                .Where(wi => wi.Status == WorkflowStatus.Frozen
                             && !wi.IsDeleted)
                .ToListAsync();

            var cancelledCount = 0;
            foreach (var workflow in frozenWorkflows)
            {
                DateTime? frozenAt = null;
                if (!string.IsNullOrEmpty(workflow.ContextJson))
                {
                    try
                    {
                        var context = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(workflow.ContextJson);
                        if (context != null && context.TryGetValue("FrozenAt", out var frozenAtEl))
                        {
                            if (DateTime.TryParse(frozenAtEl.GetString(), out var parsed))
                                frozenAt = parsed;
                        }
                    }
                    catch { /* If context is malformed, use ModifiedAtUtc */ }
                }

                var effectiveFrozenDate = frozenAt ?? workflow.ModifiedAtUtc ?? DateTime.UtcNow;

                if (effectiveFrozenDate <= cutoffDate)
                {
                    workflow.Status = WorkflowStatus.Cancelled;
                    workflow.FinalComments = $"Auto-cancelled: workflow was frozen for over {threshold} days due to module deactivation.";
                    workflow.CompletedAt = DateTime.UtcNow;
                    workflow.ModifiedAtUtc = DateTime.UtcNow;
                    workflow.ModifiedBy = "SYSTEM";
                    cancelledCount++;
                }
            }

            if (cancelledCount > 0)
            {
                await _context.SaveChangesAsync(default);
                _logger.LogInformation("Cancelled {Count} frozen workflow(s) that exceeded {Days}-day threshold",
                    cancelledCount, threshold);
            }
            else
            {
                _logger.LogDebug("No frozen workflows exceeded the {Days}-day threshold", threshold);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running frozen workflow cleanup job");
            throw;
        }
    }
}
