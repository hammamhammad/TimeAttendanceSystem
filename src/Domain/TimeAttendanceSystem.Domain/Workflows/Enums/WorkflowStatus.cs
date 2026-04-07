namespace TecAxle.Hrms.Domain.Workflows.Enums;

/// <summary>
/// Defines the status of a workflow instance throughout its lifecycle.
/// Tracks the overall state of the approval process.
/// </summary>
public enum WorkflowStatus
{
    /// <summary>
    /// Workflow is pending and waiting to be processed.
    /// Initial state when a request is submitted.
    /// </summary>
    Pending = 1,

    /// <summary>
    /// Workflow is actively in progress.
    /// At least one step has been processed or is waiting for action.
    /// </summary>
    InProgress = 2,

    /// <summary>
    /// Workflow has been fully approved.
    /// All required approval steps have been completed successfully.
    /// </summary>
    Approved = 3,

    /// <summary>
    /// Workflow has been rejected at one of the approval steps.
    /// The request will not be processed.
    /// </summary>
    Rejected = 4,

    /// <summary>
    /// Workflow has been cancelled by the requester or administrator.
    /// The request is withdrawn and will not be processed.
    /// </summary>
    Cancelled = 5,

    /// <summary>
    /// Workflow has expired due to timeout without action.
    /// May trigger escalation or automatic rejection.
    /// </summary>
    Expired = 6,

    /// <summary>
    /// Workflow has been frozen due to module deactivation.
    /// The module required by this workflow's entity type has been disabled.
    /// Frozen workflows cannot be approved/rejected/escalated.
    /// If the module is re-enabled, frozen workflows resume from their previous state.
    /// After 90 days frozen, workflows are automatically cancelled.
    /// </summary>
    Frozen = 7
}
