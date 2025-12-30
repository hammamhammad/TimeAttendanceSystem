using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Domain.Workflows;

/// <summary>
/// Domain entity representing a running instance of a workflow.
/// Tracks the execution state and progress of a specific request through the workflow.
/// </summary>
/// <remarks>
/// WorkflowInstance Features:
/// - Tracks current position in workflow
/// - Records all step executions and history
/// - Links to the original request entity
/// - Stores runtime context as JSON
/// - Final outcome tracking (Approved, Rejected, Cancelled)
///
/// Business Rules:
/// - One instance per request entity
/// - Instance status reflects current execution state
/// - Completed instances cannot be modified
/// - Context stores dynamic data for condition evaluation
/// </remarks>
public class WorkflowInstance : BaseEntity
{
    /// <summary>
    /// Gets or sets the workflow definition this instance is based on.
    /// </summary>
    public long WorkflowDefinitionId { get; set; }

    /// <summary>
    /// Gets or sets the type of entity this workflow is processing.
    /// </summary>
    public WorkflowEntityType EntityType { get; set; }

    /// <summary>
    /// Gets or sets the ID of the entity being processed.
    /// References the actual request (vacation, excuse, etc.).
    /// </summary>
    public long EntityId { get; set; }

    /// <summary>
    /// Gets or sets the current step in the workflow.
    /// Null if workflow hasn't started or is completed.
    /// </summary>
    public long? CurrentStepId { get; set; }

    /// <summary>
    /// Gets or sets the current status of the workflow.
    /// </summary>
    public WorkflowStatus Status { get; set; } = WorkflowStatus.Pending;

    /// <summary>
    /// Gets or sets the user who initiated this workflow.
    /// Typically the employee submitting the request.
    /// </summary>
    public long RequestedByUserId { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the workflow was initiated.
    /// </summary>
    public DateTime RequestedAt { get; set; }

    /// <summary>
    /// Gets or sets the timestamp when the workflow was completed.
    /// </summary>
    public DateTime? CompletedAt { get; set; }

    /// <summary>
    /// Gets or sets the final outcome of the workflow.
    /// Set when workflow reaches terminal state.
    /// </summary>
    public ApprovalAction? FinalOutcome { get; set; }

    /// <summary>
    /// Gets or sets the JSON context containing runtime variables.
    /// Used for condition evaluation and history tracking.
    /// </summary>
    public string? ContextJson { get; set; }

    /// <summary>
    /// Gets or sets the final comments from the last approval action.
    /// </summary>
    public string? FinalComments { get; set; }

    /// <summary>
    /// Gets or sets the user who completed the workflow (approved/rejected).
    /// </summary>
    public long? CompletedByUserId { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the workflow definition.
    /// </summary>
    public WorkflowDefinition WorkflowDefinition { get; set; } = null!;

    /// <summary>
    /// Gets or sets the current step.
    /// </summary>
    public WorkflowStep? CurrentStep { get; set; }

    /// <summary>
    /// Gets or sets the user who requested this workflow.
    /// </summary>
    public User RequestedByUser { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user who completed the workflow.
    /// </summary>
    public User? CompletedByUser { get; set; }

    /// <summary>
    /// Gets or sets the collection of step executions.
    /// History of all actions taken on this workflow instance.
    /// </summary>
    public ICollection<WorkflowStepExecution> StepExecutions { get; set; } = new List<WorkflowStepExecution>();

    // Business Logic Methods

    /// <summary>
    /// Starts the workflow by moving to the first step.
    /// </summary>
    /// <param name="firstStep">The first step of the workflow</param>
    public void Start(WorkflowStep firstStep)
    {
        CurrentStepId = firstStep.Id;
        Status = WorkflowStatus.InProgress;
        RequestedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Moves the workflow to the next step.
    /// </summary>
    /// <param name="nextStep">The next step to move to</param>
    public void MoveToStep(WorkflowStep? nextStep)
    {
        if (nextStep == null)
        {
            // No more steps - workflow is approved
            Complete(ApprovalAction.Approved);
        }
        else
        {
            CurrentStepId = nextStep.Id;
        }
    }

    /// <summary>
    /// Completes the workflow with the specified outcome.
    /// </summary>
    /// <param name="outcome">The final outcome of the workflow</param>
    /// <param name="comments">Optional final comments</param>
    /// <param name="completedByUserId">The user who completed the workflow</param>
    public void Complete(ApprovalAction outcome, string? comments = null, long? completedByUserId = null)
    {
        Status = outcome == ApprovalAction.Approved ? WorkflowStatus.Approved :
                 outcome == ApprovalAction.Rejected ? WorkflowStatus.Rejected :
                 outcome == ApprovalAction.AutoApproved ? WorkflowStatus.Approved :
                 outcome == ApprovalAction.AutoRejected ? WorkflowStatus.Rejected :
                 WorkflowStatus.Cancelled;

        FinalOutcome = outcome;
        CompletedAt = DateTime.UtcNow;
        FinalComments = comments;
        CompletedByUserId = completedByUserId;
        CurrentStepId = null;
    }

    /// <summary>
    /// Cancels the workflow.
    /// </summary>
    /// <param name="reason">Reason for cancellation</param>
    /// <param name="cancelledByUserId">User who cancelled</param>
    public void Cancel(string? reason = null, long? cancelledByUserId = null)
    {
        Complete(ApprovalAction.Rejected, reason, cancelledByUserId);
        Status = WorkflowStatus.Cancelled;
    }

    /// <summary>
    /// Checks if the workflow is in a terminal state.
    /// </summary>
    /// <returns>True if workflow is completed, rejected, or cancelled</returns>
    public bool IsTerminated()
    {
        return Status == WorkflowStatus.Approved ||
               Status == WorkflowStatus.Rejected ||
               Status == WorkflowStatus.Cancelled ||
               Status == WorkflowStatus.Expired;
    }

    /// <summary>
    /// Checks if the workflow can be modified.
    /// </summary>
    /// <returns>True if workflow can still be modified</returns>
    public bool CanBeModified()
    {
        return !IsTerminated();
    }

    /// <summary>
    /// Checks if a specific user can take action on the current step.
    /// </summary>
    /// <param name="userId">User ID to check</param>
    /// <returns>True if user can act on current step</returns>
    public bool CanUserAct(long userId)
    {
        if (IsTerminated() || CurrentStep == null)
        {
            return false;
        }

        // This is a simplified check - the actual implementation
        // needs to consider delegations and role assignments
        return CurrentStep.ApproverType == ApproverType.SpecificUser &&
               CurrentStep.ApproverUserId == userId;
    }

    /// <summary>
    /// Gets the duration of the workflow in hours.
    /// </summary>
    /// <returns>Hours elapsed since workflow started</returns>
    public double GetDurationHours()
    {
        var endTime = CompletedAt ?? DateTime.UtcNow;
        return (endTime - RequestedAt).TotalHours;
    }

    /// <summary>
    /// Gets a summary description of the workflow status.
    /// </summary>
    /// <returns>Human-readable status summary</returns>
    public string GetStatusSummary()
    {
        return Status switch
        {
            WorkflowStatus.Pending => "Waiting to start",
            WorkflowStatus.InProgress => $"In Progress - Step {CurrentStep?.StepOrder ?? 0}",
            WorkflowStatus.Approved => "Approved",
            WorkflowStatus.Rejected => "Rejected",
            WorkflowStatus.Cancelled => "Cancelled",
            WorkflowStatus.Expired => "Expired",
            _ => "Unknown"
        };
    }
}
