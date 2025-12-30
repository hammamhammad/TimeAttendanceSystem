using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;

namespace TimeAttendanceSystem.Application.Workflows.Commands.CancelWorkflow;

/// <summary>
/// Handler for CancelWorkflowCommand.
/// </summary>
public class CancelWorkflowCommandHandler : IRequestHandler<CancelWorkflowCommand, Result<bool>>
{
    private readonly IWorkflowEngine _workflowEngine;

    public CancelWorkflowCommandHandler(IWorkflowEngine workflowEngine)
    {
        _workflowEngine = workflowEngine;
    }

    public async Task<Result<bool>> Handle(CancelWorkflowCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.CancelAsync(
            request.WorkflowInstanceId,
            request.UserId,
            request.Comments);

        if (!result.IsSuccess)
        {
            return Result.Failure<bool>(result.Error ?? "Failed to cancel workflow. User may not have permission or workflow is not in correct state.");
        }

        return Result.Success(true);
    }
}
