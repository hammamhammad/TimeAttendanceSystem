using System.Text.Json;
using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Background job that cancels workflow instances that have been Frozen for more than 90 days.
/// Workflows are frozen when their owning module is deactivated.
/// After 90 days, it's unlikely the module will be re-enabled, so we auto-cancel.
/// </summary>
public class FrozenWorkflowCleanupJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<FrozenWorkflowCleanupJob> _logger;

    /// <summary>
    /// Number of days a workflow can remain Frozen before being auto-cancelled.
    /// </summary>
    private const int FrozenDaysThreshold = 90;

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
            var cutoffDate = DateTime.UtcNow.AddDays(-FrozenDaysThreshold);

            var frozenWorkflows = await _context.WorkflowInstances
                .Where(wi => wi.Status == WorkflowStatus.Frozen
                             && !wi.IsDeleted)
                .ToListAsync();

            var cancelledCount = 0;
            foreach (var workflow in frozenWorkflows)
            {
                // Check FrozenAt from ContextJson
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

                // Fall back to ModifiedAtUtc if FrozenAt is not available
                var effectiveFrozenDate = frozenAt ?? workflow.ModifiedAtUtc ?? DateTime.UtcNow;

                if (effectiveFrozenDate <= cutoffDate)
                {
                    workflow.Status = WorkflowStatus.Cancelled;
                    workflow.FinalComments = $"Auto-cancelled: workflow was frozen for over {FrozenDaysThreshold} days due to module deactivation.";
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
                    cancelledCount, FrozenDaysThreshold);
            }
            else
            {
                _logger.LogDebug("No frozen workflows exceeded the {Days}-day threshold", FrozenDaysThreshold);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error running frozen workflow cleanup job");
            throw;
        }
    }
}
