using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowInstance;

/// <summary>
/// Query to get a workflow instance by ID or by entity.
/// </summary>
public record GetWorkflowInstanceQuery : IRequest<Result<WorkflowInstanceDto>>
{
    /// <summary>
    /// Workflow instance ID (use this OR EntityType+EntityId).
    /// </summary>
    public long? WorkflowInstanceId { get; init; }

    /// <summary>
    /// Entity type to find workflow for.
    /// </summary>
    public WorkflowEntityType? EntityType { get; init; }

    /// <summary>
    /// Entity ID to find workflow for.
    /// </summary>
    public long? EntityId { get; init; }
}

/// <summary>
/// DTO for workflow instance detail.
/// </summary>
public class WorkflowInstanceDto
{
    public long Id { get; set; }
    public long WorkflowDefinitionId { get; set; }
    public string WorkflowName { get; set; } = string.Empty;
    public WorkflowEntityType EntityType { get; set; }
    public string EntityTypeName { get; set; } = string.Empty;
    public long EntityId { get; set; }
    public WorkflowStatus Status { get; set; }
    public string StatusName { get; set; } = string.Empty;
    public long RequestedByUserId { get; set; }
    public string RequestedByUserName { get; set; } = string.Empty;
    public DateTime RequestedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int CurrentStepOrder { get; set; }
    public string CurrentStepName { get; set; } = string.Empty;
    public int TotalSteps { get; set; }
    public long? CurrentAssignedToUserId { get; set; }
    public string? CurrentAssignedToUserName { get; set; }
    public DateTime? CurrentStepDueAt { get; set; }
    public bool IsCurrentStepOverdue { get; set; }
    public List<WorkflowStepExecutionDto> History { get; set; } = new();
}

/// <summary>
/// DTO for workflow step execution history.
/// </summary>
public class WorkflowStepExecutionDto
{
    public long Id { get; set; }
    public int StepOrder { get; set; }
    public string StepName { get; set; } = string.Empty;
    public long? AssignedToUserId { get; set; }
    public string? AssignedToUserName { get; set; }
    public DateTime AssignedAt { get; set; }
    public long? ActionTakenByUserId { get; set; }
    public string? ActionTakenByUserName { get; set; }
    public DateTime? ActionTakenAt { get; set; }
    public ApprovalAction? Action { get; set; }
    public string? ActionName { get; set; }
    public string? Comments { get; set; }
    public long? DelegatedToUserId { get; set; }
    public string? DelegatedToUserName { get; set; }
    public DateTime? DueAt { get; set; }
    public bool IsOverdue { get; set; }
}
