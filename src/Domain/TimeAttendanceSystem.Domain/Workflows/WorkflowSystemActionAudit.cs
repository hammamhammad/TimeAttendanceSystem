using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Domain.Workflows;

/// <summary>
/// Append-only audit trail of system-triggered actions against a workflow instance:
/// timeouts, escalations, auto-approvals, auto-rejections, expirations, and fallback routing.
/// Added in v13.6 to replace the previous pattern where timeout/escalation actions were recorded
/// with <c>CreatedBy = "0"</c> and no explanatory detail.
/// </summary>
/// <remarks>
/// - One row per system action. A single step execution may produce multiple rows if the engine
///   cascades (e.g. timeout → escalate → fallback → expire).
/// - <see cref="SystemUserId"/> is resolved via <c>ISystemUserResolver</c> at the moment the action
///   fires, so the row always points to a real user (never 0).
/// - <see cref="DetailsJson"/> carries the forensic payload: source step, escalation target,
///   resolved approver (if any), fallback path walked, reason strings.
/// - Indexed on <c>(WorkflowInstanceId, TriggeredAtUtc)</c> for the admin audit browser.
/// </remarks>
public class WorkflowSystemActionAudit : BaseEntity
{
    /// <summary>
    /// The workflow instance this system action was recorded against.
    /// </summary>
    public long WorkflowInstanceId { get; set; }

    /// <summary>
    /// The specific step execution that triggered the action, if applicable.
    /// Null when the action applies to the instance as a whole (e.g. whole-workflow expire).
    /// </summary>
    public long? StepExecutionId { get; set; }

    /// <summary>
    /// The type of system action recorded. See <see cref="WorkflowSystemActionType"/>.
    /// </summary>
    public WorkflowSystemActionType ActionType { get; set; }

    /// <summary>
    /// UTC moment the system action fired.
    /// </summary>
    public DateTime TriggeredAtUtc { get; set; }

    /// <summary>
    /// The system user the action is attributed to — resolved via <c>ISystemUserResolver</c>.
    /// Never 0 and never null in v13.6+; the previous string-"0" pattern has been eliminated.
    /// </summary>
    public long SystemUserId { get; set; }

    /// <summary>
    /// Forensic JSON payload. Typical shapes:
    /// <list type="bullet">
    ///   <item><c>{ "reason": "escalation_target_unresolved", "sourceStepId": 42, "fallbackAttempted": true }</c></item>
    ///   <item><c>{ "reason": "no_approver", "approverType": "DepartmentHead", "departmentId": 17 }</c></item>
    ///   <item><c>{ "reason": "timeout_auto_approve", "dueAtUtc": "2026-04-16T10:00Z" }</c></item>
    /// </list>
    /// </summary>
    public string? DetailsJson { get; set; }

    /// <summary>
    /// Short human-readable reason (≤500 chars). Duplicated from <see cref="DetailsJson"/> for
    /// quick scanning in the admin UI without parsing the JSON.
    /// </summary>
    public string? Reason { get; set; }

    // Navigation
    public WorkflowInstance WorkflowInstance { get; set; } = null!;
    public WorkflowStepExecution? StepExecution { get; set; }
    public User SystemUser { get; set; } = null!;
}
