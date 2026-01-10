namespace TimeAttendanceSystem.Domain.Workflows.Enums;

/// <summary>
/// Defines the action to take when a workflow step times out.
/// This determines what happens when the step's TimeoutHours is exceeded.
/// </summary>
public enum TimeoutAction
{
    /// <summary>
    /// Mark the workflow instance as expired/failed.
    /// This is the default behavior when no action is specified.
    /// </summary>
    Expire = 0,

    /// <summary>
    /// Escalate to the configured escalation step.
    /// Requires EscalationStepId to be set on the workflow step.
    /// If EscalationStepId is not set, falls back to Expire behavior.
    /// </summary>
    Escalate = 1,

    /// <summary>
    /// Automatically approve the request when timeout is reached.
    /// The workflow will proceed to the next step as if approved.
    /// </summary>
    AutoApprove = 2,

    /// <summary>
    /// Automatically reject the request when timeout is reached.
    /// The workflow will be marked as rejected with a timeout reason.
    /// </summary>
    AutoReject = 3
}
