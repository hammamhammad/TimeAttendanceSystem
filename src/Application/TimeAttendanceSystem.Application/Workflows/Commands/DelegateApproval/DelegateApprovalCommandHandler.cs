using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;

namespace TimeAttendanceSystem.Application.Workflows.Commands.DelegateApproval;

/// <summary>
/// Handler for DelegateApprovalCommand.
/// </summary>
public class DelegateApprovalCommandHandler : IRequestHandler<DelegateApprovalCommand, Result<bool>>
{
    private readonly IWorkflowEngine _workflowEngine;

    public DelegateApprovalCommandHandler(IWorkflowEngine workflowEngine)
    {
        _workflowEngine = workflowEngine;
    }

    public async Task<Result<bool>> Handle(DelegateApprovalCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.DelegateAsync(
            request.WorkflowInstanceId,
            request.CurrentUserId,
            request.DelegateToUserId,
            request.Comments);

        if (!result.IsSuccess)
        {
            return Result.Failure<bool>(result.Error ?? "Failed to delegate. User may not have permission, delegation may not be allowed, or workflow is not in correct state.");
        }

        return Result.Success(true);
    }
}
