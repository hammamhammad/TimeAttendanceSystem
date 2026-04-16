namespace TecAxle.Hrms.Domain.Workflows.Enums;

/// <summary>
/// Type of system-triggered action recorded against a workflow instance.
/// Used by <see cref="WorkflowSystemActionAudit"/> to preserve a forensic audit trail
/// for timeouts, escalations, auto-approvals, fallback routing, and expirations —
/// actions previously attributed to the literal user "0" before v13.6.
/// </summary>
public enum WorkflowSystemActionType
{
    /// <summary>
    /// A step execution exceeded its <c>DueAt</c> before any approver acted.
    /// Records the transition from pending to a configured <see cref="TimeoutAction"/>.
    /// </summary>
    Timeout = 1,

    /// <summary>
    /// The workflow was routed to an escalation step (either configured <c>EscalationStepId</c>
    /// or the tenant fallback chain).
    /// </summary>
    Escalation = 2,

    /// <summary>
    /// A step was auto-approved by the system (timeout → AutoApprove, or a validation rule passed).
    /// </summary>
    AutoApprove = 3,

    /// <summary>
    /// A step was auto-rejected by the system (timeout → AutoReject, or a validation rule failed closed).
    /// </summary>
    AutoReject = 4,

    /// <summary>
    /// The workflow was expired because no further approver could be resolved — the escalation
    /// target was missing and the tenant fallback chain also failed.
    /// </summary>
    Expire = 5,

    /// <summary>
    /// Approver resolution fell back to the tenant's <c>WorkflowFallbackApproverUserId</c> /
    /// <c>WorkflowFallbackApproverRole</c>. The primary approver (direct manager, department head,
    /// branch manager, or role pool) could not be resolved.
    /// </summary>
    FallbackRouting = 6
}
