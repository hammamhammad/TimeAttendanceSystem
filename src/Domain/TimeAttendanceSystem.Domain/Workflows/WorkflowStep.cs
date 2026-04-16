using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Users;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Domain.Workflows;

/// <summary>
/// Domain entity representing a single step in a workflow definition.
/// Defines the approver, conditions, and behavior for each approval stage.
/// </summary>
/// <remarks>
/// WorkflowStep Features:
/// - Sequential step ordering within workflow
/// - Multiple approver types (DirectManager, Role, SpecificUser, etc.)
/// - Conditional routing based on request data
/// - Timeout and escalation configuration
/// - Delegation support for absence handling
/// - Notification settings for step actions
///
/// Business Rules:
/// - Step order must be unique within a workflow
/// - Approval steps require approver type configuration
/// - Timeout triggers escalation when configured
/// - Conditions use JSON format for flexibility
/// </remarks>
public class WorkflowStep : BaseEntity
{
    /// <summary>
    /// Gets or sets the workflow definition this step belongs to.
    /// </summary>
    public long WorkflowDefinitionId { get; set; }

    /// <summary>
    /// Gets or sets the sequential order of this step within the workflow.
    /// Steps are processed in ascending order.
    /// </summary>
    public int StepOrder { get; set; }

    /// <summary>
    /// Gets or sets the display name of this step.
    /// Used for identification in approval interfaces.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Arabic display name of this step.
    /// Used for RTL language support.
    /// </summary>
    public string? NameAr { get; set; }

    /// <summary>
    /// Gets or sets the type of this workflow step.
    /// Determines the behavior and requirements for the step.
    /// </summary>
    public WorkflowStepType StepType { get; set; }

    /// <summary>
    /// Gets or sets how the approver is determined for this step.
    /// </summary>
    public ApproverType ApproverType { get; set; }

    /// <summary>
    /// Gets or sets the role ID when ApproverType is Role.
    /// All users with this role can approve this step.
    /// </summary>
    public long? ApproverRoleId { get; set; }

    /// <summary>
    /// Gets or sets the specific user ID when ApproverType is SpecificUser.
    /// Only this user can approve this step.
    /// </summary>
    public long? ApproverUserId { get; set; }

    /// <summary>
    /// Gets or sets the JSON condition for conditional steps.
    /// Format: {"field": "days", "operator": ">", "value": 5}
    /// </summary>
    public string? ConditionJson { get; set; }

    /// <summary>
    /// Gets or sets the timeout in hours before escalation.
    /// Null means no timeout.
    /// </summary>
    public int? TimeoutHours { get; set; }

    /// <summary>
    /// Gets or sets the step to escalate to on timeout.
    /// If null, escalation moves to next step with same approver type escalated.
    /// </summary>
    public long? EscalationStepId { get; set; }

    /// <summary>
    /// Gets or sets the action to take when the step times out.
    /// Determines behavior when TimeoutHours is exceeded.
    /// </summary>
    public TimeoutAction TimeoutAction { get; set; } = TimeoutAction.Expire;

    /// <summary>
    /// Gets or sets the next step to proceed to on approval.
    /// If null, proceeds to next sequential step or completes workflow.
    /// </summary>
    public long? OnApproveNextStepId { get; set; }

    /// <summary>
    /// Gets or sets the next step to proceed to on rejection.
    /// If null, workflow is rejected and terminated.
    /// </summary>
    public long? OnRejectNextStepId { get; set; }

    /// <summary>
    /// Gets or sets whether this step allows delegation to another user.
    /// </summary>
    public bool AllowDelegation { get; set; } = true;

    /// <summary>
    /// Gets or sets whether notifications should be sent for step actions.
    /// </summary>
    public bool NotifyOnAction { get; set; } = true;

    /// <summary>
    /// Gets or sets whether the requester should be notified when this step is reached.
    /// </summary>
    public bool NotifyRequesterOnReach { get; set; } = false;

    /// <summary>
    /// Gets or sets custom instructions for the approver.
    /// Displayed in the approval interface.
    /// </summary>
    public string? ApproverInstructions { get; set; }

    /// <summary>
    /// Gets or sets Arabic instructions for the approver.
    /// </summary>
    public string? ApproverInstructionsAr { get; set; }

    /// <summary>
    /// Gets or sets whether comments are required when approving.
    /// </summary>
    public bool RequireCommentsOnApprove { get; set; } = false;

    /// <summary>
    /// Gets or sets whether comments are required when rejecting.
    /// </summary>
    public bool RequireCommentsOnReject { get; set; } = true;

    /// <summary>
    /// The strategy used to pick a single user from the role pool when <see cref="ApproverType"/>
    /// is <see cref="ApproverType.Role"/>. Default <see cref="RoleAssignmentStrategy.LeastPendingApprovals"/>.
    /// Ignored for other approver types. (v13.6)
    /// </summary>
    public RoleAssignmentStrategy RoleAssignmentStrategy { get; set; } = RoleAssignmentStrategy.LeastPendingApprovals;

    /// <summary>
    /// When true, an approver on this step may use the non-final "Return for Correction" action
    /// instead of rejecting. The request goes back to the requester for amendment. (v13.6)
    /// </summary>
    public bool AllowReturnForCorrection { get; set; } = false;

    /// <summary>
    /// Identifier of the <c>IWorkflowValidationRule</c> to execute when <see cref="StepType"/> is
    /// <see cref="WorkflowStepType.Validation"/>. If null or unregistered at runtime the validation
    /// step fails closed (AutoRejected) — no more silent passes. (v13.6)
    /// </summary>
    public string? ValidationRuleCode { get; set; }

    /// <summary>
    /// JSON configuration passed to the validation rule at evaluation time. Rule-specific.
    /// Example for <c>vacation_balance</c>: <c>{ "minDaysRemaining": 0 }</c>. (v13.6)
    /// </summary>
    public string? ValidationConfigJson { get; set; }

    // Navigation Properties

    /// <summary>
    /// Gets or sets the workflow definition this step belongs to.
    /// </summary>
    public WorkflowDefinition WorkflowDefinition { get; set; } = null!;

    /// <summary>
    /// Gets or sets the role for role-based approvers.
    /// </summary>
    public Role? ApproverRole { get; set; }

    /// <summary>
    /// Gets or sets the specific user for user-based approvers.
    /// </summary>
    public User? ApproverUser { get; set; }

    /// <summary>
    /// Gets or sets the escalation step reference.
    /// </summary>
    public WorkflowStep? EscalationStep { get; set; }

    /// <summary>
    /// Gets or sets the step executions for this step.
    /// </summary>
    public ICollection<WorkflowStepExecution> Executions { get; set; } = new List<WorkflowStepExecution>();

    // Business Logic Methods

    /// <summary>
    /// Validates the step configuration.
    /// </summary>
    /// <returns>Tuple containing validation result and error messages</returns>
    public (bool IsValid, List<string> Errors) ValidateConfiguration()
    {
        var errors = new List<string>();

        if (string.IsNullOrWhiteSpace(Name))
        {
            errors.Add("Step name is required");
        }

        if (StepOrder <= 0)
        {
            errors.Add("Step order must be greater than 0");
        }

        if (StepType == WorkflowStepType.Approval)
        {
            if (ApproverType == ApproverType.Role && !ApproverRoleId.HasValue)
            {
                errors.Add("Role-based approval requires a role to be specified");
            }

            if (ApproverType == ApproverType.SpecificUser && !ApproverUserId.HasValue)
            {
                errors.Add("User-based approval requires a user to be specified");
            }
        }

        if (StepType == WorkflowStepType.Condition && string.IsNullOrWhiteSpace(ConditionJson))
        {
            errors.Add("Conditional step requires a condition to be specified");
        }

        if (StepType == WorkflowStepType.Validation && string.IsNullOrWhiteSpace(ValidationRuleCode))
        {
            errors.Add("Validation step requires a ValidationRuleCode (v13.6). " +
                       "Without one the step will fail closed at runtime.");
        }

        return (errors.Count == 0, errors);
    }

    /// <summary>
    /// Checks if this step requires human approval.
    /// </summary>
    /// <returns>True if human approval is needed</returns>
    public bool RequiresHumanApproval()
    {
        return StepType == WorkflowStepType.Approval && ApproverType != ApproverType.System;
    }

    /// <summary>
    /// Checks if the step has a timeout configured.
    /// </summary>
    /// <returns>True if timeout is configured</returns>
    public bool HasTimeout()
    {
        return TimeoutHours.HasValue && TimeoutHours.Value > 0;
    }

    /// <summary>
    /// Calculates the due date based on the timeout configuration.
    /// </summary>
    /// <param name="startTime">The time when the step started</param>
    /// <returns>The due date for action</returns>
    public DateTime? CalculateDueDate(DateTime startTime)
    {
        if (!HasTimeout())
        {
            return null;
        }

        return startTime.AddHours(TimeoutHours!.Value);
    }
}
