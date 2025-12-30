using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CancelWorkflow;

/// <summary>
/// CQRS command for cancelling a workflow.
/// </summary>
public record CancelWorkflowCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
