using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;

namespace TimeAttendanceSystem.Application.Workflows.Commands.StartWorkflow;

/// <summary>
/// Handler for StartWorkflowCommand.
/// </summary>
public class StartWorkflowCommandHandler : IRequestHandler<StartWorkflowCommand, Result<long>>
{
    private readonly IWorkflowEngine _workflowEngine;

    public StartWorkflowCommandHandler(IWorkflowEngine workflowEngine)
    {
        _workflowEngine = workflowEngine;
    }

    public async Task<Result<long>> Handle(StartWorkflowCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.StartWorkflowAsync(
            request.EntityType,
            request.EntityId,
            request.RequestedByUserId,
            request.BranchId);

        if (!result.IsSuccess || result.Value == null)
        {
            return Result.Failure<long>(result.Error ?? "Failed to start workflow. No applicable workflow definition found.");
        }

        return Result.Success(result.Value.Id);
    }
}
