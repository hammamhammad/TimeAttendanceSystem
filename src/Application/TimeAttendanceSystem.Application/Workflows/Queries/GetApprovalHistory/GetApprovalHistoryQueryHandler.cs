using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetApprovalHistory;

/// <summary>
/// Handler for GetApprovalHistoryQuery.
/// </summary>
public class GetApprovalHistoryQueryHandler : IRequestHandler<GetApprovalHistoryQuery, Result<PagedResult<ApprovalHistoryDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetApprovalHistoryQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PagedResult<ApprovalHistoryDto>>> Handle(GetApprovalHistoryQuery request, CancellationToken cancellationToken)
    {
        var query = _context.WorkflowStepExecutions
            .Include(e => e.WorkflowInstance)
                .ThenInclude(i => i.WorkflowDefinition)
            .Include(e => e.WorkflowInstance)
                .ThenInclude(i => i.RequestedByUser)
            .Include(e => e.Step)
            .Include(e => e.DelegatedToUser)
            .Where(e => e.ActionTakenByUserId == request.UserId &&
                       e.Action != null &&
                       e.ActionTakenAt.HasValue &&
                       !e.IsDeleted)
            .AsQueryable();

        // Apply filters
        if (request.EntityType.HasValue)
        {
            query = query.Where(e => e.WorkflowInstance.EntityType == request.EntityType.Value);
        }

        if (request.Action.HasValue)
        {
            query = query.Where(e => e.Action == request.Action.Value);
        }

        if (request.FromDate.HasValue)
        {
            query = query.Where(e => e.ActionTakenAt >= request.FromDate.Value);
        }

        if (request.ToDate.HasValue)
        {
            query = query.Where(e => e.ActionTakenAt <= request.ToDate.Value);
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and project to DTO
        var items = await query
            .OrderByDescending(e => e.ActionTakenAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new ApprovalHistoryDto
            {
                WorkflowInstanceId = e.WorkflowInstanceId,
                StepExecutionId = e.Id,
                EntityType = e.WorkflowInstance.EntityType,
                EntityTypeName = e.WorkflowInstance.EntityType.ToString(),
                EntityId = e.WorkflowInstance.EntityId,
                EntityDescription = GetEntityDescription(e.WorkflowInstance.EntityType, e.WorkflowInstance.EntityId),
                WorkflowName = e.WorkflowInstance.WorkflowDefinition.Name,
                StepName = e.Step.Name,
                RequestedByUserId = e.WorkflowInstance.RequestedByUserId,
                RequestedByUserName = e.WorkflowInstance.RequestedByUser != null
                    ? e.WorkflowInstance.RequestedByUser.Username
                    : string.Empty,
                RequestedAt = e.WorkflowInstance.RequestedAt,
                Action = e.Action!.Value,
                ActionName = e.Action!.Value.ToString(),
                ActionTakenAt = e.ActionTakenAt!.Value,
                Comments = e.Comments,
                DelegatedToUserId = e.DelegatedToUserId,
                DelegatedToUserName = e.DelegatedToUser != null
                    ? e.DelegatedToUser.Username
                    : null,
                WorkflowFinalStatus = e.WorkflowInstance.Status,
                WorkflowFinalStatusName = e.WorkflowInstance.Status.ToString()
            })
            .ToListAsync(cancellationToken);

        var pagedResult = new PagedResult<ApprovalHistoryDto>(items, totalCount, request.Page, request.PageSize);

        return Result.Success(pagedResult);
    }

    private static string GetEntityDescription(WorkflowEntityType entityType, long entityId)
    {
        return $"{entityType} #{entityId}";
    }
}
