using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Workflows.Enums;

namespace TecAxle.Hrms.Application.Workflows.Commands.StartWorkflow;

/// <summary>
/// CQRS command for starting a workflow for an entity.
/// </summary>
public record StartWorkflowCommand(
    WorkflowEntityType EntityType,
    long EntityId,
    long RequestedByUserId,
    long? BranchId = null
) : IRequest<Result<long>>;
