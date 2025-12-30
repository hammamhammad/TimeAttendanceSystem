using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.Workflows.Queries.GetPendingApprovals;

/// <summary>
/// Handler for GetPendingApprovalsQuery.
/// </summary>
public class GetPendingApprovalsQueryHandler : IRequestHandler<GetPendingApprovalsQuery, Result<PagedResult<PendingApprovalDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetPendingApprovalsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<PagedResult<PendingApprovalDto>>> Handle(GetPendingApprovalsQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;

        var query = _context.WorkflowStepExecutions
            .Include(e => e.WorkflowInstance)
                .ThenInclude(i => i.WorkflowDefinition)
            .Include(e => e.WorkflowInstance)
                .ThenInclude(i => i.RequestedByUser)
            .Include(e => e.Step)
            .Where(e => e.AssignedToUserId == request.UserId &&
                       e.Action == null &&
                       !e.IsDeleted &&
                       !e.WorkflowInstance.IsDeleted &&
                       (e.WorkflowInstance.Status == WorkflowStatus.Pending ||
                        e.WorkflowInstance.Status == WorkflowStatus.InProgress))
            .AsQueryable();

        // Apply filters
        if (request.EntityType.HasValue)
        {
            query = query.Where(e => e.WorkflowInstance.EntityType == request.EntityType.Value);
        }

        if (request.IsOverdue.HasValue)
        {
            if (request.IsOverdue.Value)
            {
                query = query.Where(e => e.DueAt.HasValue && e.DueAt.Value < now);
            }
            else
            {
                query = query.Where(e => !e.DueAt.HasValue || e.DueAt.Value >= now);
            }
        }

        // Get total count
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply pagination and project to DTO
        var items = await query
            .OrderByDescending(e => e.DueAt.HasValue && e.DueAt.Value < now) // Overdue first
            .ThenBy(e => e.DueAt)
            .ThenByDescending(e => e.AssignedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(e => new PendingApprovalDto
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
                AssignedAt = e.AssignedAt,
                DueAt = e.DueAt,
                IsOverdue = e.DueAt.HasValue && e.DueAt.Value < now,
                AllowDelegation = e.Step.AllowDelegation,
                ApproverInstructions = e.Step.ApproverInstructions,
                RequireCommentsOnApprove = e.Step.RequireCommentsOnApprove,
                RequireCommentsOnReject = e.Step.RequireCommentsOnReject
            })
            .ToListAsync(cancellationToken);

        var pagedResult = new PagedResult<PendingApprovalDto>(items, totalCount, request.Page, request.PageSize);

        return Result.Success(pagedResult);
    }

    private static string GetEntityDescription(WorkflowEntityType entityType, long entityId)
    {
        // This is a placeholder - in production, you would fetch the actual entity description
        return $"{entityType} #{entityId}";
    }
}
