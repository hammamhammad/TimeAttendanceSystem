using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.ApproveStep;

/// <summary>
/// CQRS command for approving a workflow step.
/// </summary>
public record ApproveStepCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
