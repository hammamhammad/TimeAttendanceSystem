using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetWorkflowInstance;

/// <summary>
/// Handler for GetWorkflowInstanceQuery.
/// </summary>
public class GetWorkflowInstanceQueryHandler : IRequestHandler<GetWorkflowInstanceQuery, Result<WorkflowInstanceDto>>
{
    private readonly IApplicationDbContext _context;

    public GetWorkflowInstanceQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<WorkflowInstanceDto>> Handle(GetWorkflowInstanceQuery request, CancellationToken cancellationToken)
    {
        WorkflowInstance? instance;

        if (request.WorkflowInstanceId.HasValue)
        {
            instance = await _context.WorkflowInstances
                .Include(i => i.WorkflowDefinition)
                    .ThenInclude(d => d.Steps.Where(s => !s.IsDeleted))
                .Include(i => i.RequestedByUser)
                .Include(i => i.CurrentStep)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.Step)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.AssignedToUser)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.ActionTakenByUser)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.DelegatedToUser)
                .FirstOrDefaultAsync(i => i.Id == request.WorkflowInstanceId.Value && !i.IsDeleted, cancellationToken);
        }
        else if (request.EntityType.HasValue && request.EntityId.HasValue)
        {
            instance = await _context.WorkflowInstances
                .Include(i => i.WorkflowDefinition)
                    .ThenInclude(d => d.Steps.Where(s => !s.IsDeleted))
                .Include(i => i.RequestedByUser)
                .Include(i => i.CurrentStep)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.Step)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.AssignedToUser)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.ActionTakenByUser)
                .Include(i => i.StepExecutions.Where(e => !e.IsDeleted))
                    .ThenInclude(e => e.DelegatedToUser)
                .OrderByDescending(i => i.RequestedAt)
                .FirstOrDefaultAsync(i => i.EntityType == request.EntityType.Value &&
                                         i.EntityId == request.EntityId.Value &&
                                         !i.IsDeleted, cancellationToken);
        }
        else
        {
            return Result.Failure<WorkflowInstanceDto>("Either WorkflowInstanceId or EntityType and EntityId must be provided.");
        }

        if (instance == null)
        {
            return Result.Failure<WorkflowInstanceDto>("Workflow instance not found.");
        }

        var now = DateTime.UtcNow;
        var currentExecution = instance.StepExecutions
            .FirstOrDefault(e => e.Action == null);

        var dto = new WorkflowInstanceDto
        {
            Id = instance.Id,
            WorkflowDefinitionId = instance.WorkflowDefinitionId,
            WorkflowName = instance.WorkflowDefinition.Name,
            EntityType = instance.EntityType,
            EntityTypeName = instance.EntityType.ToString(),
            EntityId = instance.EntityId,
            Status = instance.Status,
            StatusName = instance.Status.ToString(),
            RequestedByUserId = instance.RequestedByUserId,
            RequestedByUserName = instance.RequestedByUser?.Username ?? string.Empty,
            RequestedAt = instance.RequestedAt,
            CompletedAt = instance.CompletedAt,
            CurrentStepOrder = instance.CurrentStep?.StepOrder ?? 0,
            CurrentStepName = instance.CurrentStep?.Name ?? string.Empty,
            TotalSteps = instance.WorkflowDefinition.Steps.Count,
            CurrentAssignedToUserId = currentExecution?.AssignedToUserId,
            CurrentAssignedToUserName = currentExecution?.AssignedToUser?.Username,
            CurrentStepDueAt = currentExecution?.DueAt,
            IsCurrentStepOverdue = currentExecution?.DueAt.HasValue == true && currentExecution.DueAt.Value < now,
            History = instance.StepExecutions
                .OrderBy(e => e.Step.StepOrder)
                .ThenBy(e => e.AssignedAt)
                .Select(e => new WorkflowStepExecutionDto
                {
                    Id = e.Id,
                    StepOrder = e.Step.StepOrder,
                    StepName = e.Step.Name,
                    AssignedToUserId = e.AssignedToUserId,
                    AssignedToUserName = e.AssignedToUser?.Username,
                    AssignedAt = e.AssignedAt,
                    ActionTakenByUserId = e.ActionTakenByUserId,
                    ActionTakenByUserName = e.ActionTakenByUser?.Username,
                    ActionTakenAt = e.ActionTakenAt,
                    Action = e.Action,
                    ActionName = e.Action?.ToString(),
                    Comments = e.Comments,
                    DelegatedToUserId = e.DelegatedToUserId,
                    DelegatedToUserName = e.DelegatedToUser?.Username,
                    DueAt = e.DueAt,
                    IsOverdue = e.DueAt.HasValue && e.DueAt.Value < now && e.Action == null
                })
                .ToList()
        };

        return Result.Success(dto);
    }
}
