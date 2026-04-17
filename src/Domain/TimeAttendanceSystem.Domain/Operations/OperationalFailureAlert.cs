using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Operations;

/// <summary>
/// Phase 1 (v14.1): Operational failure alert — a single visible, actionable row for HR/admin
/// whenever something async fails in a way that would previously have been audit-only
/// (lifecycle automation, workflow routing, approval-to-execution, payroll side-effects).
///
/// Unlike <see cref="Lifecycle.LifecycleAutomationAudit"/> which captures every attempt
/// (including success / skipped), this table captures ONLY unresolved failures so that
/// the HR dashboard has a finite, prioritized work list. Resolving a failure sets
/// <see cref="IsResolved"/> = true but preserves the row for audit.
/// </summary>
public class OperationalFailureAlert : BaseEntity
{
    public OperationalFailureCategory Category { get; set; }

    /// <summary>Source entity (e.g. "AllowanceRequest", "WorkflowInstance", "LoanApplication").</summary>
    public string SourceEntityType { get; set; } = string.Empty;
    public long SourceEntityId { get; set; }

    /// <summary>Employee the failure affects. Null for org-level failures.</summary>
    public long? EmployeeId { get; set; }

    /// <summary>Short failure code (e.g. "MissingPrerequisite", "FailedRouting", "ExecutionError", "DuplicateAssignment").</summary>
    public string FailureCode { get; set; } = string.Empty;

    /// <summary>Human-readable reason for HR eyes.</summary>
    public string Reason { get; set; } = string.Empty;

    /// <summary>Full exception message if applicable.</summary>
    public string? ErrorMessage { get; set; }

    public OperationalFailureSeverity Severity { get; set; } = OperationalFailureSeverity.Warning;

    public DateTime FailedAtUtc { get; set; } = DateTime.UtcNow;

    public bool IsResolved { get; set; }
    public DateTime? ResolvedAtUtc { get; set; }
    public long? ResolvedByUserId { get; set; }
    public string? ResolutionNotes { get; set; }

    /// <summary>Whether a retry is safe. Executor failures that hit transient DB/network errors should be true.</summary>
    public bool IsRetryable { get; set; }
    public int RetryCount { get; set; }
    public DateTime? LastRetryAtUtc { get; set; }

    /// <summary>Optional JSON blob with anything that helps troubleshooting (config values, handler-specific payloads).</summary>
    public string? MetadataJson { get; set; }
}
