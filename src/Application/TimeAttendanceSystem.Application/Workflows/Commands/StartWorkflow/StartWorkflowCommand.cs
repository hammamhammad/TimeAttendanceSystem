using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.StartWorkflow;

/// <summary>
/// CQRS command for starting a workflow for an entity.
/// </summary>
public record StartWorkflowCommand(
    WorkflowEntityType EntityType,
    long EntityId,
    long RequestedByUserId,
    long? BranchId = null
) : IRequest<Result<long>>;
