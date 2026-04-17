using TecAxle.Hrms.Domain.Operations;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 1 (v14.1): Emits an <see cref="OperationalFailureAlert"/> AND notifies HR recipients in-app.
/// Called from:
/// - <see cref="ILifecycleEventPublisher"/> (on handler exception)
/// - Lifecycle automation handlers (on Failed / MissingPrerequisite audit row)
/// - Workflow engine (on FailedRouting terminal status)
/// - Phase 1 approval executors (on exception or validation failure)
/// - Payroll processing handler (on per-employee failure)
///
/// The emit is idempotent keyed by (Category, SourceEntityType, SourceEntityId, FailureCode):
/// if an unresolved matching row exists, <see cref="RaiseAsync"/> updates its <c>RetryCount</c>
/// and <c>LastRetryAtUtc</c> rather than creating a duplicate row.
/// </summary>
public interface IFailureAlertService
{
    Task<long> RaiseAsync(RaiseFailureAlertRequest request, CancellationToken ct = default);

    /// <summary>Mark an alert resolved (manual acknowledgement by HR).</summary>
    Task ResolveAsync(long alertId, long resolvedByUserId, string? notes, CancellationToken ct = default);

    /// <summary>Increment retry counter on an existing alert (called by retry endpoint).</summary>
    Task RecordRetryAsync(long alertId, CancellationToken ct = default);
}

public sealed class RaiseFailureAlertRequest
{
    public required OperationalFailureCategory Category { get; init; }
    public required string SourceEntityType { get; init; }
    public required long SourceEntityId { get; init; }
    public long? EmployeeId { get; init; }
    public required string FailureCode { get; init; }
    public required string Reason { get; init; }
    public string? ErrorMessage { get; init; }
    public OperationalFailureSeverity Severity { get; init; } = OperationalFailureSeverity.Error;
    public bool IsRetryable { get; init; }
    public string? MetadataJson { get; init; }

    /// <summary>If true, a new alert is raised even when an unresolved matching row exists. Default false (dedup).</summary>
    public bool ForceNew { get; init; }

    /// <summary>If true, HR recipients are not notified in-app. Default false. Useful for chatty categories.</summary>
    public bool SuppressNotification { get; init; }
}
