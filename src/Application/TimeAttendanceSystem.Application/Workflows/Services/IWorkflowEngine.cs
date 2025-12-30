using TimeAttendanceSystem.Domain.Workflows;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Services;

/// <summary>
/// Service interface for managing workflow execution and approval processes.
/// Provides core workflow engine functionality for starting, processing, and completing workflows.
/// </summary>
public interface IWorkflowEngine
{
    /// <summary>
    /// Starts a workflow for an entity based on the configured workflow definition.
    /// </summary>
    /// <param name="entityType">Type of entity starting the workflow</param>
    /// <param name="entityId">ID of the entity</param>
    /// <param name="requestedByUserId">User initiating the request</param>
    /// <param name="branchId">Optional branch scope for workflow selection</param>
    /// <param name="contextData">Optional context data for condition evaluation</param>
    /// <returns>Result containing the workflow instance or error</returns>
    Task<WorkflowResult<WorkflowInstance>> StartWorkflowAsync(
        WorkflowEntityType entityType,
        long entityId,
        long requestedByUserId,
        long? branchId = null,
        Dictionary<string, object>? contextData = null);

    /// <summary>
    /// Approves the current step of a workflow instance.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <param name="userId">User performing the approval</param>
    /// <param name="comments">Optional comments for the approval</param>
    /// <returns>Result indicating success or failure</returns>
    Task<WorkflowResult<bool>> ApproveAsync(long workflowInstanceId, long userId, string? comments = null);

    /// <summary>
    /// Rejects the current step of a workflow instance.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <param name="userId">User performing the rejection</param>
    /// <param name="comments">Required comments for rejection</param>
    /// <returns>Result indicating success or failure</returns>
    Task<WorkflowResult<bool>> RejectAsync(long workflowInstanceId, long userId, string comments);

    /// <summary>
    /// Delegates the current step to another user.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <param name="userId">User performing the delegation</param>
    /// <param name="delegateToUserId">User to delegate to</param>
    /// <param name="comments">Optional reason for delegation</param>
    /// <returns>Result indicating success or failure</returns>
    Task<WorkflowResult<bool>> DelegateAsync(long workflowInstanceId, long userId, long delegateToUserId, string? comments = null);

    /// <summary>
    /// Cancels a workflow instance.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <param name="userId">User performing the cancellation</param>
    /// <param name="reason">Reason for cancellation</param>
    /// <returns>Result indicating success or failure</returns>
    Task<WorkflowResult<bool>> CancelAsync(long workflowInstanceId, long userId, string? reason = null);

    /// <summary>
    /// Gets the workflow instance for an entity.
    /// </summary>
    /// <param name="entityType">Type of entity</param>
    /// <param name="entityId">ID of the entity</param>
    /// <returns>Workflow instance if found</returns>
    Task<WorkflowInstance?> GetWorkflowInstanceAsync(WorkflowEntityType entityType, long entityId);

    /// <summary>
    /// Gets the current status of a workflow instance.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <returns>Current workflow status</returns>
    Task<WorkflowStatusInfo?> GetWorkflowStatusAsync(long workflowInstanceId);

    /// <summary>
    /// Gets all pending approvals for a user.
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>List of pending workflow step executions</returns>
    Task<List<PendingApproval>> GetPendingApprovalsAsync(long userId);

    /// <summary>
    /// Checks if a user can approve a specific workflow instance.
    /// </summary>
    /// <param name="workflowInstanceId">ID of the workflow instance</param>
    /// <param name="userId">User ID to check</param>
    /// <returns>True if user can approve</returns>
    Task<bool> CanUserApproveAsync(long workflowInstanceId, long userId);

    /// <summary>
    /// Gets the appropriate workflow definition for an entity type and branch.
    /// </summary>
    /// <param name="entityType">Type of entity</param>
    /// <param name="branchId">Optional branch ID</param>
    /// <returns>Most appropriate workflow definition</returns>
    Task<WorkflowDefinition?> GetApplicableWorkflowAsync(WorkflowEntityType entityType, long? branchId);

    /// <summary>
    /// Processes timed-out steps and triggers escalation.
    /// </summary>
    /// <returns>Number of steps processed</returns>
    Task<int> ProcessTimeoutsAsync();
}

/// <summary>
/// Result wrapper for workflow operations.
/// </summary>
public class WorkflowResult<T>
{
    public bool IsSuccess { get; private set; }
    public T? Value { get; private set; }
    public string? Error { get; private set; }
    public List<string> ValidationErrors { get; private set; } = new();

    public static WorkflowResult<T> Success(T value) => new()
    {
        IsSuccess = true,
        Value = value
    };

    public static WorkflowResult<T> Failure(string error) => new()
    {
        IsSuccess = false,
        Error = error
    };

    public static WorkflowResult<T> ValidationFailure(List<string> errors) => new()
    {
        IsSuccess = false,
        ValidationErrors = errors,
        Error = string.Join("; ", errors)
    };
}

/// <summary>
/// Information about the current workflow status.
/// </summary>
public class WorkflowStatusInfo
{
    public long WorkflowInstanceId { get; set; }
    public WorkflowStatus Status { get; set; }
    public string CurrentStepName { get; set; } = string.Empty;
    public int CurrentStepOrder { get; set; }
    public int TotalSteps { get; set; }
    public string? AssignedToUserName { get; set; }
    public DateTime RequestedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public DateTime? DueAt { get; set; }
    public List<WorkflowStepHistory> History { get; set; } = new();
}

/// <summary>
/// History entry for a workflow step.
/// </summary>
public class WorkflowStepHistory
{
    public int StepOrder { get; set; }
    public string StepName { get; set; } = string.Empty;
    public string? ActionTakenByUserName { get; set; }
    public ApprovalAction? Action { get; set; }
    public DateTime? ActionTakenAt { get; set; }
    public string? Comments { get; set; }
}

/// <summary>
/// Pending approval information for a user.
/// </summary>
public class PendingApproval
{
    public long WorkflowInstanceId { get; set; }
    public long StepExecutionId { get; set; }
    public WorkflowEntityType EntityType { get; set; }
    public long EntityId { get; set; }
    public string EntityDescription { get; set; } = string.Empty;
    public string RequestedByUserName { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public string StepName { get; set; } = string.Empty;
    public DateTime AssignedAt { get; set; }
    public DateTime? DueAt { get; set; }
    public bool IsOverdue { get; set; }
    public bool AllowDelegation { get; set; }
}
