using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitionById;

/// <summary>
/// Query to get a single workflow definition by ID.
/// </summary>
public record GetWorkflowDefinitionByIdQuery(long Id) : IRequest<Result<WorkflowDefinitionDetailDto>>;

/// <summary>
/// Detailed DTO for workflow definition including steps.
/// </summary>
public class WorkflowDefinitionDetailDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public WorkflowEntityType EntityType { get; set; }
    public string EntityTypeName { get; set; } = string.Empty;
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public bool IsActive { get; set; }
    public bool IsDefault { get; set; }
    public int Version { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
    public List<WorkflowStepDto> Steps { get; set; } = new();
}

/// <summary>
/// DTO for workflow step.
/// </summary>
public class WorkflowStepDto
{
    public long Id { get; set; }
    public int StepOrder { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public WorkflowStepType StepType { get; set; }
    public string StepTypeName { get; set; } = string.Empty;
    public ApproverType ApproverType { get; set; }
    public string ApproverTypeName { get; set; } = string.Empty;
    public long? ApproverRoleId { get; set; }
    public string? ApproverRoleName { get; set; }
    public long? ApproverUserId { get; set; }
    public string? ApproverUserName { get; set; }
    public string? ConditionJson { get; set; }
    public int? TimeoutHours { get; set; }
    public TimeoutAction TimeoutAction { get; set; }
    public string TimeoutActionName { get; set; } = string.Empty;
    public long? EscalationStepId { get; set; }
    public long? OnApproveNextStepId { get; set; }
    public long? OnRejectNextStepId { get; set; }
    public bool AllowDelegation { get; set; }
    public bool NotifyOnAction { get; set; }
    public bool NotifyRequesterOnReach { get; set; }
    public string? ApproverInstructions { get; set; }
    public string? ApproverInstructionsAr { get; set; }
    public bool RequireCommentsOnApprove { get; set; }
    public bool RequireCommentsOnReject { get; set; }
}
