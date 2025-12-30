using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.RejectStep;

/// <summary>
/// CQRS command for rejecting a workflow step.
/// </summary>
public record RejectStepCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
