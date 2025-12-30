using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Users;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Domain.Workflows;

/// <summary>
/// Domain entity representing the execution of a single workflow step.
/// Records the assignment, action taken, and outcome for audit purposes.
/// </summary>
/// <remarks>
/// WorkflowStepExecution Features:
/// - Records who was assigned to approve
/// - Tracks who actually took the action (may differ due to delegation)
/// - Stores action timestamp and comments
/// - Supports delegation tracking
/// - Due date tracking for timeout management
///
/// Business Rules:
/// - Each step execution is immutable once action is taken
/// - Delegation creates new assignment without losing original
/// - Comments may be required based on step configuration
/// - Timeout tracked via DueAt timestamp
/// </remarks>
public class WorkflowStepExecution : BaseEntity
{
    /// <summary>
    /// Gets or sets the workflow instance this execution belongs to.
    /// </summary>
    public long WorkflowInstanceId { get; set; }

    /// <summary>
    /// Gets or sets the workflow step being executed.
    /// </summary>
    public long StepId { get; set; }

    /// <summary>
    /// Gets or sets the user assigned to approve this step.
    /// </summary>
    public long AssignedToUserId { get; set; }

    /// <summary>
    /// Gets or sets when the step was assigned.
    /// </summary>
    public DateTime AssignedAt { get; set; }

    /// <summary>
    /// Gets or sets the user who actually took the action.
    /// May differ from AssignedToUserId due to delegation.
    /// </summary>
    public long? ActionTakenByUserId { get; set; }

    /// <summary>
    /// Gets or sets when the action was taken.
    /// </summary>
    public DateTime? ActionTakenAt { get; set; }

    /// <summary>
    /// Gets or sets the action taken on this step.
    /// </summary>
    public ApprovalAction? Action { get; set; }

    /// <summary>
    /// Gets or sets the comments provided with the action.
    /// </summary>
    public string? Comments { get; set; }

    /// <summary>
    /// Gets or sets the user this step was delegated to.
    /// Only set when action is Delegated.
    /// </summary>
    public long? DelegatedToUserId { get; set; }

    /// <summary>
    /// Gets or sets the due date for action before timeout.
    /// </summary>
    public DateTime? DueAt { get; set; }

    /// <summary>
    /// Gets or sets whether this execution was created by delegation.
    /// </summary>
    public bool IsDelegated { get; set; } = false;

    /// <summary>
    /// Gets or sets the original execution this was delegated from.
    /// </summary>
    public long? DelegatedFromExecutionId { get; set; }

    /// <summary>
    /// Gets or sets whether a reminder has been sent for this step.
    /// </summary>
    public bool ReminderSent { get; set; } = false;

    /// <summary>
    /// Gets or sets when the reminder was sent.
    /// </summary>
    public DateTime? ReminderSentAt { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the workflow instance.
    /// </summary>
    public WorkflowInstance WorkflowInstance { get; set; } = null!;

    /// <summary>
    /// Gets or sets the workflow step being executed.
    /// </summary>
    public WorkflowStep Step { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user assigned to this step.
    /// </summary>
    public User AssignedToUser { get; set; } = null!;

    /// <summary>
    /// Gets or sets the user who took the action.
    /// </summary>
    public User? ActionTakenByUser { get; set; }

    /// <summary>
    /// Gets or sets the user this was delegated to.
    /// </summary>
    public User? DelegatedToUser { get; set; }

    /// <summary>
    /// Gets or sets the original execution this was delegated from.
    /// </summary>
    public WorkflowStepExecution? DelegatedFromExecution { get; set; }

    // Business Logic Methods

    /// <summary>
    /// Records an approval action on this step.
    /// </summary>
    /// <param name="userId">User taking the action</param>
    /// <param name="comments">Optional comments</param>
    public void Approve(long userId, string? comments = null)
    {
        TakeAction(ApprovalAction.Approved, userId, comments);
    }

    /// <summary>
    /// Records a rejection action on this step.
    /// </summary>
    /// <param name="userId">User taking the action</param>
    /// <param name="comments">Required comments for rejection</param>
    public void Reject(long userId, string comments)
    {
        TakeAction(ApprovalAction.Rejected, userId, comments);
    }

    /// <summary>
    /// Delegates this step to another user.
    /// </summary>
    /// <param name="delegatingUserId">User doing the delegation</param>
    /// <param name="delegateToUserId">User to delegate to</param>
    /// <param name="comments">Reason for delegation</param>
    public void Delegate(long delegatingUserId, long delegateToUserId, string? comments = null)
    {
        ActionTakenByUserId = delegatingUserId;
        ActionTakenAt = DateTime.UtcNow;
        Action = ApprovalAction.Delegated;
        DelegatedToUserId = delegateToUserId;
        Comments = comments;
    }

    /// <summary>
    /// Marks this step as timed out.
    /// </summary>
    public void MarkTimedOut()
    {
        Action = ApprovalAction.TimedOut;
        ActionTakenAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Marks this step as skipped.
    /// </summary>
    /// <param name="reason">Reason for skipping</param>
    public void Skip(string? reason = null)
    {
        Action = ApprovalAction.Skipped;
        ActionTakenAt = DateTime.UtcNow;
        Comments = reason;
    }

    /// <summary>
    /// Records an auto-approval action.
    /// </summary>
    public void AutoApprove()
    {
        Action = ApprovalAction.AutoApproved;
        ActionTakenAt = DateTime.UtcNow;
        Comments = "Automatically approved by system";
    }

    /// <summary>
    /// Records an auto-rejection action.
    /// </summary>
    /// <param name="reason">Reason for auto-rejection</param>
    public void AutoReject(string reason)
    {
        Action = ApprovalAction.AutoRejected;
        ActionTakenAt = DateTime.UtcNow;
        Comments = reason;
    }

    /// <summary>
    /// Marks this step as escalated.
    /// </summary>
    /// <param name="reason">Reason for escalation</param>
    public void Escalate(string? reason = null)
    {
        Action = ApprovalAction.Escalated;
        ActionTakenAt = DateTime.UtcNow;
        Comments = reason ?? "Escalated due to timeout";
    }

    /// <summary>
    /// Records a reminder was sent.
    /// </summary>
    public void MarkReminderSent()
    {
        ReminderSent = true;
        ReminderSentAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Checks if this execution is pending action.
    /// </summary>
    /// <returns>True if no action has been taken</returns>
    public bool IsPending()
    {
        return !Action.HasValue;
    }

    /// <summary>
    /// Checks if this execution has exceeded its due date.
    /// </summary>
    /// <returns>True if overdue</returns>
    public bool IsOverdue()
    {
        return DueAt.HasValue && DateTime.UtcNow > DueAt.Value && IsPending();
    }

    /// <summary>
    /// Gets the time remaining until due date.
    /// </summary>
    /// <returns>TimeSpan until due, negative if overdue</returns>
    public TimeSpan? GetTimeUntilDue()
    {
        if (!DueAt.HasValue)
        {
            return null;
        }

        return DueAt.Value - DateTime.UtcNow;
    }

    /// <summary>
    /// Gets the response time for this execution.
    /// </summary>
    /// <returns>TimeSpan between assignment and action</returns>
    public TimeSpan? GetResponseTime()
    {
        if (!ActionTakenAt.HasValue)
        {
            return null;
        }

        return ActionTakenAt.Value - AssignedAt;
    }

    // Private helper method
    private void TakeAction(ApprovalAction action, long userId, string? comments)
    {
        ActionTakenByUserId = userId;
        ActionTakenAt = DateTime.UtcNow;
        Action = action;
        Comments = comments;
    }
}
