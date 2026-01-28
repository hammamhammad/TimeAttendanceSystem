using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;
using TimeAttendanceSystem.Shared.Common.Exceptions;

namespace TimeAttendanceSystem.Application.Features.RemoteWorkRequests.Queries.GetRemoteWorkRequestById;

/// <summary>
/// Handler for getting a remote work request by ID.
/// Includes workflow status and approval history for complete request information.
/// </summary>
public class GetRemoteWorkRequestByIdQueryHandler : IRequestHandler<GetRemoteWorkRequestByIdQuery, Result<RemoteWorkRequestDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRemoteWorkRequestByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<RemoteWorkRequestDto>> Handle(GetRemoteWorkRequestByIdQuery request, CancellationToken cancellationToken)
    {
        // Get the remote work request with related entities
        var remoteWork = await _context.RemoteWorkRequests
            .Include(a => a.Employee)
            .Include(a => a.CreatedByUser)
            .Include(a => a.ApprovedByUser)
            .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

        if (remoteWork == null)
            throw new NotFoundException("Remote work request not found");

        // Build the basic DTO
        var dto = new RemoteWorkRequestDto
        {
            Id = remoteWork.Id,
            EmployeeId = remoteWork.EmployeeId,
            EmployeeName = remoteWork.Employee != null ? $"{remoteWork.Employee.FirstName} {remoteWork.Employee.LastName}" : null,
            StartDate = remoteWork.StartDate,
            EndDate = remoteWork.EndDate,
            Reason = remoteWork.Reason,
            CreatedByUserId = remoteWork.CreatedByUserId,
            CreatedByUserName = remoteWork.CreatedByUser?.Username,
            Status = remoteWork.Status,
            ApprovedByUserId = remoteWork.ApprovedByUserId,
            ApprovedByUserName = remoteWork.ApprovedByUser?.Username,
            ApprovedAt = remoteWork.ApprovedAt,
            RejectionReason = remoteWork.RejectionReason,
            ApprovalComments = remoteWork.ApprovalComments,
            RemoteWorkPolicyId = remoteWork.RemoteWorkPolicyId,
            WorkingDaysCount = remoteWork.WorkingDaysCount,
            CreatedAtUtc = remoteWork.CreatedAtUtc,
            ModifiedAtUtc = remoteWork.ModifiedAtUtc,
            WorkflowInstanceId = remoteWork.WorkflowInstanceId
        };

        // Get workflow information if exists
        if (remoteWork.WorkflowInstanceId.HasValue)
        {
            var workflow = await _context.WorkflowInstances
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverRole)
                .Include(wi => wi.CurrentStep)
                    .ThenInclude(cs => cs!.ApproverUser)
                .Include(wi => wi.WorkflowDefinition)
                    .ThenInclude(wd => wd.Steps)
                .FirstOrDefaultAsync(wi => wi.Id == remoteWork.WorkflowInstanceId.Value, cancellationToken);

            if (workflow != null)
            {
                dto.WorkflowStatus = workflow.Status.ToString();
                dto.TotalSteps = workflow.WorkflowDefinition?.Steps?.Count ?? 0;

                var currentStep = workflow.CurrentStep;
                if (currentStep != null)
                {
                    dto.CurrentStepOrder = currentStep.StepOrder;

                    // Determine current approver name/role
                    if (currentStep.ApproverType == ApproverType.DirectManager)
                    {
                        dto.CurrentApproverRole = "Direct Manager";
                    }
                    else if (currentStep.ApproverType == ApproverType.DepartmentHead)
                    {
                        dto.CurrentApproverRole = "Department Head";
                    }
                    else if (currentStep.ApproverType == ApproverType.Role && currentStep.ApproverRole != null)
                    {
                        dto.CurrentApproverRole = currentStep.ApproverRole.Name;
                    }
                    else if (currentStep.ApproverType == ApproverType.SpecificUser && currentStep.ApproverUser != null)
                    {
                        dto.CurrentApproverName = currentStep.ApproverUser.Username;
                    }
                }

                // Get approval history (step executions)
                var stepExecutions = await _context.WorkflowStepExecutions
                    .Include(wse => wse.Step)
                    .Include(wse => wse.AssignedToUser)
                    .Include(wse => wse.ActionTakenByUser)
                    .Where(wse => wse.WorkflowInstanceId == workflow.Id)
                    .OrderBy(wse => wse.Step.StepOrder)
                    .ThenBy(wse => wse.AssignedAt)
                    .ToListAsync(cancellationToken);

                dto.ApprovalHistory = stepExecutions.Select(exec => new RemoteWorkApprovalStepDto
                {
                    StepOrder = exec.Step.StepOrder,
                    StepName = exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                    Status = exec.Action?.ToString() ?? "Pending",
                    AssignedToName = exec.AssignedToUser?.Username ?? "Unknown",
                    ActionByName = exec.ActionTakenByUser?.Username,
                    AssignedAt = exec.AssignedAt,
                    ActionAt = exec.ActionTakenAt,
                    Comments = exec.Comments
                }).ToList();
            }
        }

        return Result<RemoteWorkRequestDto>.Success(dto);
    }
}
