using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Commands.ApproveStep;

/// <summary>
/// CQRS command for approving a workflow step.
/// </summary>
public record ApproveStepCommand(
    long WorkflowInstanceId,
    long UserId,
    string? Comments = null
) : IRequest<Result<bool>>;
