using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.RejectStep;

/// <summary>
/// Handler for RejectStepCommand.
/// Rejects a workflow step and updates the related entity status (workflow is always completed on rejection).
/// </summary>
public class RejectStepCommandHandler : IRequestHandler<RejectStepCommand, Result<bool>>
{
    private readonly IWorkflowEngine _workflowEngine;
    private readonly IApplicationDbContext _context;

    public RejectStepCommandHandler(
        IWorkflowEngine workflowEngine,
        IApplicationDbContext context)
    {
        _workflowEngine = workflowEngine;
        _context = context;
    }

    public async Task<Result<bool>> Handle(RejectStepCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.RejectAsync(
            request.WorkflowInstanceId,
            request.UserId,
            request.Comments);

        if (!result.IsSuccess)
        {
            return Result.Failure<bool>(result.Error ?? "Failed to reject. User may not have permission or workflow is not in correct state.");
        }

        // Rejection always completes the workflow - update entity status
        await UpdateEntityStatusAsync(request.WorkflowInstanceId, cancellationToken);

        return Result.Success(true);
    }

    /// <summary>
    /// Updates the related entity status to rejected.
    /// </summary>
    private async Task UpdateEntityStatusAsync(long workflowInstanceId, CancellationToken cancellationToken)
    {
        // Reload workflow instance
        var workflowInstance = await _context.WorkflowInstances
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId, cancellationToken);

        if (workflowInstance == null)
        {
            return;
        }

        // Update entity status based on entity type
        switch (workflowInstance.EntityType)
        {
            case WorkflowEntityType.Vacation:
                await UpdateVacationStatusAsync(workflowInstance, cancellationToken);
                break;

            case WorkflowEntityType.Excuse:
                await UpdateExcuseStatusAsync(workflowInstance, cancellationToken);
                break;

            case WorkflowEntityType.RemoteWork:
                await UpdateRemoteWorkStatusAsync(workflowInstance, cancellationToken);
                break;

            // Other entity types can be added here
        }
    }

    private async Task UpdateVacationStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var vacation = await _context.EmployeeVacations
            .FirstOrDefaultAsync(v => v.Id == workflowInstance.EntityId, cancellationToken);

        if (vacation != null)
        {
            vacation.IsApproved = false;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task UpdateExcuseStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == workflowInstance.EntityId, cancellationToken);

        if (excuse != null)
        {
            excuse.ApprovalStatus = Domain.Excuses.ApprovalStatus.Rejected;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }

    private async Task UpdateRemoteWorkStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var remoteWork = await _context.RemoteWorkRequests
            .FirstOrDefaultAsync(rw => rw.Id == workflowInstance.EntityId, cancellationToken);

        if (remoteWork != null)
        {
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Rejected;
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
