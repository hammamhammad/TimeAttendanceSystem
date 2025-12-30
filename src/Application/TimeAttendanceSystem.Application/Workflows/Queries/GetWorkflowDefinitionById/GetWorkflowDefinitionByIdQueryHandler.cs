using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowDefinitionById;

/// <summary>
/// Handler for GetWorkflowDefinitionByIdQuery.
/// </summary>
public class GetWorkflowDefinitionByIdQueryHandler : IRequestHandler<GetWorkflowDefinitionByIdQuery, Result<WorkflowDefinitionDetailDto>>
{
    private readonly IApplicationDbContext _context;

    public GetWorkflowDefinitionByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<WorkflowDefinitionDetailDto>> Handle(GetWorkflowDefinitionByIdQuery request, CancellationToken cancellationToken)
    {
        var workflowDefinition = await _context.WorkflowDefinitions
            .Include(w => w.Branch)
            .Include(w => w.Steps.Where(s => !s.IsDeleted))
                .ThenInclude(s => s.ApproverRole)
            .Include(w => w.Steps.Where(s => !s.IsDeleted))
                .ThenInclude(s => s.ApproverUser)
            .FirstOrDefaultAsync(w => w.Id == request.Id && !w.IsDeleted, cancellationToken);

        if (workflowDefinition == null)
        {
            return Result.Failure<WorkflowDefinitionDetailDto>("Workflow definition not found.");
        }

        var dto = new WorkflowDefinitionDetailDto
        {
            Id = workflowDefinition.Id,
            Name = workflowDefinition.Name,
            NameAr = workflowDefinition.NameAr,
            Description = workflowDefinition.Description,
            DescriptionAr = workflowDefinition.DescriptionAr,
            EntityType = workflowDefinition.EntityType,
            EntityTypeName = workflowDefinition.EntityType.ToString(),
            BranchId = workflowDefinition.BranchId,
            BranchName = workflowDefinition.Branch?.Name,
            IsActive = workflowDefinition.IsActive,
            IsDefault = workflowDefinition.IsDefault,
            Version = workflowDefinition.Version,
            CreatedAt = workflowDefinition.CreatedAtUtc,
            CreatedBy = workflowDefinition.CreatedBy,
            ModifiedAt = workflowDefinition.ModifiedAtUtc,
            ModifiedBy = workflowDefinition.ModifiedBy,
            Steps = workflowDefinition.Steps
                .OrderBy(s => s.StepOrder)
                .Select(s => new WorkflowStepDto
                {
                    Id = s.Id,
                    StepOrder = s.StepOrder,
                    Name = s.Name,
                    NameAr = s.NameAr,
                    StepType = s.StepType,
                    StepTypeName = s.StepType.ToString(),
                    ApproverType = s.ApproverType,
                    ApproverTypeName = s.ApproverType.ToString(),
                    ApproverRoleId = s.ApproverRoleId,
                    ApproverRoleName = s.ApproverRole?.Name,
                    ApproverUserId = s.ApproverUserId,
                    ApproverUserName = s.ApproverUser?.Username,
                    ConditionJson = s.ConditionJson,
                    TimeoutHours = s.TimeoutHours,
                    EscalationStepId = s.EscalationStepId,
                    OnApproveNextStepId = s.OnApproveNextStepId,
                    OnRejectNextStepId = s.OnRejectNextStepId,
                    AllowDelegation = s.AllowDelegation,
                    NotifyOnAction = s.NotifyOnAction,
                    NotifyRequesterOnReach = s.NotifyRequesterOnReach,
                    ApproverInstructions = s.ApproverInstructions,
                    ApproverInstructionsAr = s.ApproverInstructionsAr,
                    RequireCommentsOnApprove = s.RequireCommentsOnApprove,
                    RequireCommentsOnReject = s.RequireCommentsOnReject
                })
                .ToList()
        };

        return Result.Success(dto);
    }
}
