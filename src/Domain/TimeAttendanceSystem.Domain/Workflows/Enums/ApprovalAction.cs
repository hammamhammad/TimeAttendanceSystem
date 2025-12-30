namespace TimeAttendanceSystem.Domain.Workflows.Enums;

/// <summary>
/// Defines the possible actions that can be taken on a workflow step.
/// Records the outcome of each step execution.
/// </summary>
public enum ApprovalAction
{
    /// <summary>
    /// The step was approved and workflow continues to next step.
    /// </summary>
    Approved = 1,

    /// <summary>
    /// The step was rejected and workflow terminates with rejection.
    /// </summary>
    Rejected = 2,

    /// <summary>
    /// The step was delegated to another user for action.
    /// The delegated user becomes responsible for the step.
    /// </summary>
    Delegated = 3,

    /// <summary>
    /// The step was skipped based on workflow conditions.
    /// Used when conditional logic bypasses a step.
    /// </summary>
    Skipped = 4,

    /// <summary>
    /// The step timed out without action.
    /// May trigger escalation to next level.
    /// </summary>
    TimedOut = 5,

    /// <summary>
    /// The step was auto-approved by the system.
    /// Used for validation steps that pass automatically.
    /// </summary>
    AutoApproved = 6,

    /// <summary>
    /// The step was auto-rejected by the system.
    /// Used for validation steps that fail automatically.
    /// </summary>
    AutoRejected = 7,

    /// <summary>
    /// The step was escalated to a higher authority.
    /// Original approver was bypassed due to timeout or policy.
    /// </summary>
    Escalated = 8
}
