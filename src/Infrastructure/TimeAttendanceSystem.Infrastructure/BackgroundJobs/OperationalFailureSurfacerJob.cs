using Coravel.Invocable;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Lifecycle;
using TecAxle.Hrms.Domain.Operations;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Infrastructure.BackgroundJobs;

/// <summary>
/// Phase 2 (v14.2): Closes the last lifecycle/workflow silent-failure blind spot.
///
/// The Phase 1 direct emission paths only fire when:
///   - a lifecycle handler THROWS (caught by <see cref="Services.LifecycleEventPublisher"/>);
///   - a workflow step enters <see cref="WorkflowStatus.FailedRouting"/>.
///
/// But a lifecycle handler can also write a <c>LifecycleAutomationAudit</c> row with
/// <see cref="LifecycleAutomationStatus.Failed"/> or
/// <see cref="LifecycleAutomationStatus.MissingPrerequisite"/> *without* throwing — e.g.
/// when the handler validates that an offer letter has no template configured and records
/// a MissingPrerequisite outcome. Prior to this job those rows were audit-only.
///
/// This job sweeps the audit table and raises a deduplicated <see cref="OperationalFailureAlert"/>
/// for each (SourceEntityType, SourceEntityId, AutomationType) where the latest audit is
/// <c>Failed</c> or <c>MissingPrerequisite</c> and no unresolved matching alert already exists.
///
/// <b>Idempotency</b>: the dedup is enforced by <c>IFailureAlertService.RaiseAsync</c>
/// which matches on (Category, SourceEntityType, SourceEntityId, FailureCode, IsResolved=false)
/// and increments <c>RetryCount</c> on re-raise instead of inserting duplicates.
///
/// <b>Cadence</b>: scheduled hourly (same cadence as <c>WorkflowTimeoutProcessingJob</c>).
///
/// <b>Scope</b>: only the most recent audit row per (source entity, automation type) matters.
/// If a later row is Succeeded / DuplicateSuppressed, the earlier failure is considered resolved
/// by a subsequent retry; no alert is raised.
/// </summary>
public sealed class OperationalFailureSurfacerJob : IInvocable
{
    private readonly IApplicationDbContext _context;
    private readonly IFailureAlertService _alerts;
    private readonly ILogger<OperationalFailureSurfacerJob> _logger;

    public OperationalFailureSurfacerJob(
        IApplicationDbContext context,
        IFailureAlertService alerts,
        ILogger<OperationalFailureSurfacerJob> logger)
    {
        _context = context;
        _alerts = alerts;
        _logger = logger;
    }

    public async Task Invoke()
    {
        await SurfaceLifecycleFailuresAsync();
    }

    private async Task SurfaceLifecycleFailuresAsync()
    {
        // Look back a bounded window (7 days) to keep the query cheap while still catching
        // rows written before this job was deployed on first run.
        var since = DateTime.UtcNow.AddDays(-7);

        // Group audit rows by (source entity, automation type), keeping only the latest.
        // EF translates this to a correlated subquery on PostgreSQL.
        var latestPerKey = await _context.LifecycleAutomationAudits
            .Where(a => !a.IsDeleted && a.TriggeredAtUtc >= since)
            .GroupBy(a => new { a.SourceEntityType, a.SourceEntityId, a.AutomationType })
            .Select(g => g.OrderByDescending(x => x.TriggeredAtUtc).First())
            .ToListAsync();

        var candidateFailures = latestPerKey
            .Where(a => a.Status == LifecycleAutomationStatus.Failed
                     || a.Status == LifecycleAutomationStatus.MissingPrerequisite)
            .ToList();

        if (candidateFailures.Count == 0) return;

        // Pre-load the set of unresolved alerts matching our candidates so we only call
        // RaiseAsync for rows that aren't already surfaced. The service also dedupes, so
        // this is an optimisation, not a correctness requirement.
        var keys = candidateFailures
            .Select(c => new { c.SourceEntityType, c.SourceEntityId, Code = FailureCode(c.Status) })
            .ToList();

        var alreadyOpen = await _context.OperationalFailureAlerts
            .Where(a => !a.IsDeleted
                     && !a.IsResolved
                     && a.Category == OperationalFailureCategory.LifecycleAutomation)
            .Select(a => new { a.SourceEntityType, a.SourceEntityId, a.FailureCode })
            .ToListAsync();

        int raised = 0, skipped = 0;
        foreach (var audit in candidateFailures)
        {
            var code = FailureCode(audit.Status);
            var isOpen = alreadyOpen.Any(x =>
                x.SourceEntityType == audit.SourceEntityType
                && x.SourceEntityId == audit.SourceEntityId
                && x.FailureCode == code);

            if (isOpen)
            {
                skipped++;
                continue;
            }

            try
            {
                await _alerts.RaiseAsync(new RaiseFailureAlertRequest
                {
                    Category = OperationalFailureCategory.LifecycleAutomation,
                    SourceEntityType = audit.SourceEntityType,
                    SourceEntityId = audit.SourceEntityId,
                    FailureCode = code,
                    Reason = BuildReason(audit),
                    ErrorMessage = audit.ErrorMessage,
                    Severity = audit.Status == LifecycleAutomationStatus.Failed
                        ? OperationalFailureSeverity.Error
                        : OperationalFailureSeverity.Warning,
                    IsRetryable = audit.Status == LifecycleAutomationStatus.Failed,
                    MetadataJson = audit.ContextJson
                });
                raised++;
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex,
                    "OperationalFailureSurfacerJob: could not raise alert for audit {AuditId} (source {SourceType}#{SourceId}).",
                    audit.Id, audit.SourceEntityType, audit.SourceEntityId);
            }
        }

        _logger.LogInformation(
            "OperationalFailureSurfacerJob: scanned {Scanned} lifecycle audit rows, raised {Raised}, skipped {Skipped} (already open).",
            candidateFailures.Count, raised, skipped);
    }

    private static string FailureCode(LifecycleAutomationStatus s) => s switch
    {
        LifecycleAutomationStatus.Failed => "HandlerFailed",
        LifecycleAutomationStatus.MissingPrerequisite => "MissingPrerequisite",
        _ => "Unknown"
    };

    private static string BuildReason(LifecycleAutomationAudit a)
    {
        var statusWord = a.Status == LifecycleAutomationStatus.Failed
            ? "failed"
            : "was skipped because a prerequisite is missing";
        var reasonSuffix = string.IsNullOrWhiteSpace(a.Reason) ? "" : $" — {a.Reason}";
        return $"Lifecycle automation {a.AutomationType} for {a.SourceEntityType} #{a.SourceEntityId} {statusWord}{reasonSuffix}.";
    }
}
