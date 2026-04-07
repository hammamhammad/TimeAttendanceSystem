using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.RejectStep;

/// <summary>
/// CQRS command for rejecting a workflow step.
/// </summary>
public record RejectStepCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
