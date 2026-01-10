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
                    .ThenInclude(wd => wd.Steps)
            .Include(e => e.WorkflowInstance)
                .ThenInclude(i => i.RequestedByUser)
            .Include(e => e.Step)
            .Include(e => e.DelegatedFromExecution)
                .ThenInclude(d => d!.AssignedToUser)
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

        // Apply pagination and get raw data
        var rawItems = await query
            .OrderByDescending(e => e.DueAt.HasValue && e.DueAt.Value < now) // Overdue first
            .ThenBy(e => e.DueAt)
            .ThenByDescending(e => e.AssignedAt)
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        // Get entity IDs grouped by type to fetch employee information
        var vacationIds = rawItems
            .Where(e => e.WorkflowInstance.EntityType == WorkflowEntityType.Vacation)
            .Select(e => e.WorkflowInstance.EntityId)
            .Distinct()
            .ToList();

        // Fetch employee vacation details
        var vacationEmployeesList = vacationIds.Any()
            ? await _context.EmployeeVacations
                .Include(ev => ev.Employee)
                .Include(ev => ev.VacationType)
                .Where(ev => vacationIds.Contains(ev.Id))
                .Select(ev => new VacationEmployeeInfo
                {
                    EntityId = ev.Id,
                    EmployeeId = ev.EmployeeId,
                    EmployeeName = $"{ev.Employee.FirstName} {ev.Employee.LastName}",
                    EmployeeCode = ev.Employee.EmployeeNumber,
                    Summary = $"{ev.VacationType.Name}: {ev.StartDate:MMM d} - {ev.EndDate:MMM d, yyyy} ({ev.TotalDays} days)"
                })
                .ToListAsync(cancellationToken)
            : new List<VacationEmployeeInfo>();

        var vacationEmployees = vacationEmployeesList.ToDictionary(x => x.EntityId);

        // Map to DTOs with employee information
        var items = rawItems.Select(e =>
        {
            var dto = new PendingApprovalDto
            {
                WorkflowInstanceId = e.WorkflowInstanceId,
                StepExecutionId = e.Id,
                EntityType = e.WorkflowInstance.EntityType,
                EntityTypeName = e.WorkflowInstance.EntityType.ToString(),
                EntityId = e.WorkflowInstance.EntityId,
                WorkflowName = e.WorkflowInstance.WorkflowDefinition.Name,
                StepName = e.Step.Name ?? $"Step {e.Step.StepOrder}",
                RequestedByUserId = e.WorkflowInstance.RequestedByUserId,
                RequestedByUserName = e.WorkflowInstance.RequestedByUser?.Username ?? string.Empty,
                RequestedAt = e.WorkflowInstance.RequestedAt,
                AssignedAt = e.AssignedAt,
                DueAt = e.DueAt,
                IsOverdue = e.DueAt.HasValue && e.DueAt.Value < now,
                AllowDelegation = e.Step.AllowDelegation,
                ApproverInstructions = e.Step.ApproverInstructions,
                RequireCommentsOnApprove = e.Step.RequireCommentsOnApprove,
                RequireCommentsOnReject = e.Step.RequireCommentsOnReject,
                IsDelegated = e.DelegatedFromExecutionId.HasValue,
                DelegatedFrom = e.DelegatedFromExecution?.AssignedToUser?.Username,
                CurrentStep = e.Step.StepOrder,
                TotalSteps = e.WorkflowInstance.WorkflowDefinition.Steps?.Count ?? 1
            };

            // Set employee info based on entity type
            if (e.WorkflowInstance.EntityType == WorkflowEntityType.Vacation &&
                vacationEmployees.TryGetValue(e.WorkflowInstance.EntityId, out var vacInfo))
            {
                dto.EmployeeId = vacInfo.EmployeeId;
                dto.EmployeeName = vacInfo.EmployeeName;
                dto.EmployeeCode = vacInfo.EmployeeCode;
                dto.RequestSummary = vacInfo.Summary;
                dto.EntityDescription = vacInfo.Summary;
            }
            else
            {
                // Fallback for other entity types or if data not found
                dto.EmployeeName = e.WorkflowInstance.RequestedByUser?.Username ?? "Unknown";
                dto.EmployeeCode = string.Empty;
                dto.RequestSummary = $"{e.WorkflowInstance.EntityType} Request #{e.WorkflowInstance.EntityId}";
                dto.EntityDescription = dto.RequestSummary;
            }

            return dto;
        }).ToList();

        var pagedResult = new PagedResult<PendingApprovalDto>(items, totalCount, request.Page, request.PageSize);

        return Result.Success(pagedResult);
    }
}

/// <summary>
/// Helper class for vacation employee information.
/// </summary>
internal class VacationEmployeeInfo
{
    public long EntityId { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeCode { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
}
