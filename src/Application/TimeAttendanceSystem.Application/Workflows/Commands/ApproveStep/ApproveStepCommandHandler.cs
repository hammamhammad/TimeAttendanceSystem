using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Workflows.Services;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Commands.ApproveStep;

/// <summary>
/// Handler for ApproveStepCommand.
/// Approves a workflow step and updates the related entity status if workflow completes.
/// Integrates with leave balance management for vacation approvals.
/// </summary>
public class ApproveStepCommandHandler : IRequestHandler<ApproveStepCommand, Result<bool>>
{
    private readonly IWorkflowEngine _workflowEngine;
    private readonly IApplicationDbContext _context;
    private readonly ILeaveAccrualService _leaveAccrualService;

    public ApproveStepCommandHandler(
        IWorkflowEngine workflowEngine,
        IApplicationDbContext context,
        ILeaveAccrualService leaveAccrualService)
    {
        _workflowEngine = workflowEngine;
        _context = context;
        _leaveAccrualService = leaveAccrualService;
    }

    public async Task<Result<bool>> Handle(ApproveStepCommand request, CancellationToken cancellationToken)
    {
        var result = await _workflowEngine.ApproveAsync(
            request.WorkflowInstanceId,
            request.UserId,
            request.Comments);

        if (!result.IsSuccess)
        {
            return Result.Failure<bool>(result.Error ?? "Failed to approve. User may not have permission or workflow is not in correct state.");
        }

        // Check if workflow has completed and update entity status
        await UpdateEntityStatusIfWorkflowCompleteAsync(request.WorkflowInstanceId, cancellationToken);

        return Result.Success(true);
    }

    /// <summary>
    /// Updates the related entity status if the workflow has completed.
    /// </summary>
    private async Task UpdateEntityStatusIfWorkflowCompleteAsync(long workflowInstanceId, CancellationToken cancellationToken)
    {
        // Reload workflow instance to check if it's complete
        var workflowInstance = await _context.WorkflowInstances
            .Include(wi => wi.WorkflowDefinition)
            .FirstOrDefaultAsync(wi => wi.Id == workflowInstanceId, cancellationToken);

        if (workflowInstance == null ||
            (workflowInstance.Status != WorkflowStatus.Approved && workflowInstance.Status != WorkflowStatus.Rejected))
        {
            return; // Workflow not complete yet
        }

        // Update entity status based on workflow outcome and entity type
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
            .Include(v => v.Employee)
            .FirstOrDefaultAsync(v => v.Id == workflowInstance.EntityId, cancellationToken);

        if (vacation == null) return;

        var vacationYear = vacation.StartDate.Year;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            vacation.IsApproved = true;
            await _context.SaveChangesAsync(cancellationToken);

            // Confirm leave usage - converts pending balance to used balance
            await _leaveAccrualService.ConfirmLeaveUsageAsync(
                vacation.EmployeeId,
                vacation.VacationTypeId,
                vacation.TotalDays,
                vacation.Id,
                vacationYear,
                cancellationToken);

            // TODO: Trigger attendance recalculation for vacation period
            // This will be implemented when attendance recalculation service is ready
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            vacation.IsApproved = false;
            await _context.SaveChangesAsync(cancellationToken);

            // Release reserved balance - returns pending balance to available
            await _leaveAccrualService.ReleaseLeaveBalanceAsync(
                vacation.EmployeeId,
                vacation.VacationTypeId,
                vacation.TotalDays,
                vacation.Id,
                vacationYear,
                cancellationToken);
        }
    }

    private async Task UpdateExcuseStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var excuse = await _context.EmployeeExcuses
            .FirstOrDefaultAsync(e => e.Id == workflowInstance.EntityId, cancellationToken);

        if (excuse == null) return;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            excuse.ApprovalStatus = Domain.Excuses.ApprovalStatus.Approved;
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            excuse.ApprovalStatus = Domain.Excuses.ApprovalStatus.Rejected;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    private async Task UpdateRemoteWorkStatusAsync(Domain.Workflows.WorkflowInstance workflowInstance, CancellationToken cancellationToken)
    {
        var remoteWork = await _context.RemoteWorkRequests
            .FirstOrDefaultAsync(rw => rw.Id == workflowInstance.EntityId, cancellationToken);

        if (remoteWork == null) return;

        if (workflowInstance.FinalOutcome == ApprovalAction.Approved)
        {
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Approved;
        }
        else if (workflowInstance.FinalOutcome == ApprovalAction.Rejected)
        {
            remoteWork.Status = Domain.RemoteWork.RemoteWorkRequestStatus.Rejected;
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
