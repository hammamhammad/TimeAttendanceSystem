namespace TimeAttendanceSystem.Domain.Workflows.Enums;

/// <summary>
/// Defines the types of steps that can be configured in a workflow.
/// Each step type has different behavior and purpose in the approval process.
/// </summary>
public enum WorkflowStepType
{
    /// <summary>
    /// Approval step requiring human action to approve or reject.
    /// The workflow waits at this step until an authorized user takes action.
    /// </summary>
    Approval = 1,

    /// <summary>
    /// Notification step that sends alerts but doesn't block workflow progression.
    /// Used to inform stakeholders about workflow events.
    /// </summary>
    Notification = 2,

    /// <summary>
    /// Validation step that performs automatic checks on the request.
    /// Can auto-approve, auto-reject, or route based on validation results.
    /// </summary>
    Validation = 3,

    /// <summary>
    /// Conditional step that routes the workflow based on criteria.
    /// Evaluates conditions to determine the next step in the workflow.
    /// </summary>
    Condition = 4
}
