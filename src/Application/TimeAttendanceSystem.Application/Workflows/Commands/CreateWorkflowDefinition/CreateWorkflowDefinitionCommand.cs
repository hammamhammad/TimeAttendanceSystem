using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CreateWorkflowDefinition;

/// <summary>
/// CQRS command for creating a new workflow definition in the Time Attendance System.
/// Defines approval workflow configuration for various entity types (Vacation, Excuse, RemoteWork, etc.).
/// </summary>
public record CreateWorkflowDefinitionCommand(
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    WorkflowEntityType EntityType,
    long? BranchId,
    bool IsDefault,
    List<CreateWorkflowStepDto> Steps
) : IRequest<Result<long>>;

/// <summary>
/// DTO for creating a workflow step within a workflow definition.
/// </summary>
public record CreateWorkflowStepDto(
    int StepOrder,
    string Name,
    string? NameAr,
    WorkflowStepType StepType,
    ApproverType ApproverType,
    long? ApproverRoleId,
    long? ApproverUserId,
    string? ConditionJson,
    int? TimeoutHours,
    long? EscalationStepId,
    long? OnApproveNextStepId,
    long? OnRejectNextStepId,
    bool AllowDelegation = true,
    bool NotifyOnAction = true,
    bool NotifyRequesterOnReach = false,
    string? ApproverInstructions = null,
    string? ApproverInstructionsAr = null,
    bool RequireCommentsOnApprove = false,
    bool RequireCommentsOnReject = true
);
