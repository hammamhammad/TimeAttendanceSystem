using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Application.Workflows.Services;

/// <summary>
/// Outcome of an approver-resolution attempt for a workflow step.
/// </summary>
public sealed record ApproverResolution
{
    /// <summary>The UserId that will be assigned, or null if no approver could be resolved.</summary>
    public long? UserId { get; init; }

    /// <summary>How the approver was resolved — used to pick between primary and fallback audit rows.</summary>
    public ApproverResolutionSource Source { get; init; }

    /// <summary>Short machine-friendly reason describing why this source was chosen.</summary>
    public string Reason { get; init; } = "";

    /// <summary>Optional forensic detail bag persisted into <c>WorkflowSystemActionAudit.DetailsJson</c>
    /// when the source is a fallback path.</summary>
    public Dictionary<string, object?>? Details { get; init; }

    public static ApproverResolution Ok(long userId, ApproverResolutionSource source, string reason,
        Dictionary<string, object?>? details = null)
        => new() { UserId = userId, Source = source, Reason = reason, Details = details };

    public static ApproverResolution None(string reason, Dictionary<string, object?>? details = null)
        => new() { UserId = null, Source = ApproverResolutionSource.Unresolved, Reason = reason, Details = details };
}

/// <summary>
/// Identifies whether an approver was resolved via the primary (configured) path or via a fallback.
/// Used by the workflow engine to decide whether to write a <c>FallbackRouting</c> audit row.
/// </summary>
public enum ApproverResolutionSource
{
    /// <summary>No approver was found — primary and all fallbacks failed.</summary>
    Unresolved = 0,

    /// <summary>The directly configured approver (DirectManager, DepartmentHead, BranchManager, SpecificUser, Role).</summary>
    Primary = 1,

    /// <summary>The tenant-level <c>WorkflowFallbackApproverUserId</c> override.</summary>
    FallbackUser = 2,

    /// <summary>The tenant-level <c>WorkflowFallbackApproverRole</c> role (first suitable active user).</summary>
    FallbackRole = 3
}

/// <summary>
/// Resolves a single approver user for a workflow step, honoring:
/// <list type="bullet">
///   <item><c>ApproverType</c> (DirectManager / Role / SpecificUser / DepartmentHead / BranchManager / System)</item>
///   <item><c>WorkflowStep.RoleAssignmentStrategy</c> for role-based approvals</item>
///   <item>Tenant-level fallback chain (<c>WorkflowFallbackApproverUserId</c> → <c>WorkflowFallbackApproverRole</c>)</item>
///   <item>Liveness checks — inactive users / missing employee links trigger fallback</item>
/// </list>
/// Extracted from <c>WorkflowEngine</c> in v13.6 so it's unit-testable in isolation and
/// so every approver-resolution caller shares the same safety semantics.
/// </summary>
public interface IApproverResolver
{
    /// <summary>
    /// Resolves the approver for the given step within the context of the given workflow instance.
    /// Mutates the <c>WorkflowRoleAssignmentCursor</c> table (with <c>SaveChangesAsync</c>) if the
    /// step uses <c>RoundRobin</c>. Does NOT call <c>SaveChanges</c> itself.
    /// </summary>
    Task<ApproverResolution> ResolveAsync(
        WorkflowInstance instance,
        WorkflowStep step,
        CancellationToken ct);
}
