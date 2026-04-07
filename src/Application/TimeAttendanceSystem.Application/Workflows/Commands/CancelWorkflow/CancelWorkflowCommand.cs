using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Workflows.Commands.CancelWorkflow;

/// <summary>
/// CQRS command for cancelling a workflow.
/// </summary>
public record CancelWorkflowCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
