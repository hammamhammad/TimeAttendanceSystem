using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.EmployeeVacations.Queries.Common;
using TimeAttendanceSystem.Domain.Workflows.Enums;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Queries.GetEmployeeVacations;

/// <summary>
/// Query handler for retrieving employee vacation records with filtering and pagination.
/// Implements optimized database queries with proper projections and indexing.
/// </summary>
public class GetEmployeeVacationsQueryHandler : IRequestHandler<GetEmployeeVacationsQuery, Result<PagedResult<EmployeeVacationDto>>>
{
    private readonly IApplicationDbContext _context;
    private readonly HashSet<string> _validSortFields = new(StringComparer.OrdinalIgnoreCase)
    {
        "StartDate", "EndDate", "EmployeeName", "VacationTypeName", "CreatedAtUtc", "TotalDays"
    };

    public GetEmployeeVacationsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Handles the retrieval of employee vacations with comprehensive filtering and pagination.
    /// </summary>
    /// <param name="request">Query parameters with filters and pagination</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated result of employee vacation DTOs</returns>
    public async Task<Result<PagedResult<EmployeeVacationDto>>> Handle(
        GetEmployeeVacationsQuery request,
        CancellationToken cancellationToken)
    {
        // Validate pagination parameters
        if (request.Page < 1)
            return Result.Failure<PagedResult<EmployeeVacationDto>>("Page must be greater than 0");

        if (request.PageSize < 1 || request.PageSize > 100)
            return Result.Failure<PagedResult<EmployeeVacationDto>>("Page size must be between 1 and 100");

        // Build base query with includes
        var query = _context.EmployeeVacations
            .Include(ev => ev.Employee)
            .Include(ev => ev.VacationType)
            .Where(ev => !ev.IsDeleted); // Soft delete filter

        // Apply filters
        query = ApplyFilters(query, request);

        // Get total count before pagination
        var totalCount = await query.CountAsync(cancellationToken);

        // Apply sorting
        query = ApplySorting(query, request.SortBy, request.SortDescending);

        // Apply pagination and get vacation IDs first
        var vacationIds = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(ev => ev.Id)
            .ToListAsync(cancellationToken);

        // Get workflow instances for these vacations
        var workflowInstances = await _context.WorkflowInstances
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverRole)
            .Include(wi => wi.CurrentStep)
                .ThenInclude(cs => cs!.ApproverUser)
            .Include(wi => wi.WorkflowDefinition)
                .ThenInclude(wd => wd.Steps)
            .Where(wi => wi.EntityType == WorkflowEntityType.Vacation && vacationIds.Contains(wi.EntityId))
            .ToListAsync(cancellationToken);

        // Create a lookup dictionary for workflow info
        var workflowLookup = workflowInstances.ToDictionary(wi => wi.EntityId);

        // Get workflow instance IDs for step executions
        var workflowInstanceIds = workflowInstances.Select(wi => wi.Id).ToList();

        // Get all step executions for these workflow instances
        var stepExecutions = await _context.WorkflowStepExecutions
            .Include(wse => wse.Step)
            .Include(wse => wse.AssignedToUser)
            .Include(wse => wse.ActionTakenByUser)
            .Where(wse => workflowInstanceIds.Contains(wse.WorkflowInstanceId))
            .OrderBy(wse => wse.Step.StepOrder)
            .ThenBy(wse => wse.AssignedAt)
            .ToListAsync(cancellationToken);

        // Create a lookup dictionary for step executions by workflow instance ID
        var stepExecutionLookup = stepExecutions
            .GroupBy(se => se.WorkflowInstanceId)
            .ToDictionary(g => g.Key, g => g.ToList());

        // Get the vacation items with workflow info
        var items = await query
            .Where(ev => vacationIds.Contains(ev.Id))
            .Select(ev => new
            {
                ev.Id,
                ev.EmployeeId,
                ev.Employee.EmployeeNumber,
                EmployeeName = $"{ev.Employee.FirstName} {ev.Employee.LastName}",
                ev.VacationTypeId,
                VacationTypeName = ev.VacationType.Name,
                ev.StartDate,
                ev.EndDate,
                ev.TotalDays,
                ev.IsApproved,
                ev.Notes,
                ev.CreatedAtUtc,
                ev.CreatedBy,
                ev.ModifiedAtUtc,
                ev.ModifiedBy
            })
            .ToListAsync(cancellationToken);

        // Map to DTOs with workflow info
        var dtos = items.Select(ev =>
        {
            workflowLookup.TryGetValue(ev.Id, out var workflow);
            var currentStep = workflow?.CurrentStep;
            var totalSteps = workflow?.WorkflowDefinition?.Steps?.Count ?? 0;

            string? approverName = null;
            string? approverRole = null;

            if (currentStep != null)
            {
                if (currentStep.ApproverType == ApproverType.DirectManager)
                {
                    approverRole = "Direct Manager";
                }
                else if (currentStep.ApproverType == ApproverType.DepartmentHead)
                {
                    approverRole = "Department Head";
                }
                else if (currentStep.ApproverType == ApproverType.Role && currentStep.ApproverRole != null)
                {
                    approverRole = currentStep.ApproverRole.Name;
                }
                else if (currentStep.ApproverType == ApproverType.SpecificUser && currentStep.ApproverUser != null)
                {
                    approverName = currentStep.ApproverUser.Username;
                }
            }

            // Build approval history
            List<ApprovalStepDto>? approvalHistory = null;
            if (workflow != null && stepExecutionLookup.TryGetValue(workflow.Id, out var executions))
            {
                approvalHistory = executions.Select(exec => new ApprovalStepDto(
                    exec.Step.StepOrder,
                    exec.Step.Name ?? $"Step {exec.Step.StepOrder}",
                    exec.Action?.ToString() ?? "Pending",
                    exec.AssignedToUser?.Username ?? "Unknown",
                    exec.ActionTakenByUser?.Username,
                    exec.AssignedAt,
                    exec.ActionTakenAt,
                    exec.Comments
                )).ToList();
            }

            return new EmployeeVacationDto(
                ev.Id,
                ev.EmployeeId,
                ev.EmployeeNumber,
                ev.EmployeeName,
                ev.VacationTypeId,
                ev.VacationTypeName,
                ev.StartDate,
                ev.EndDate,
                ev.TotalDays,
                CalculateBusinessDays(ev.StartDate, ev.EndDate),
                ev.IsApproved,
                ev.Notes,
                IsCurrentlyActive(ev.StartDate, ev.EndDate, ev.IsApproved),
                IsUpcoming(ev.StartDate),
                IsCompleted(ev.EndDate),
                ev.CreatedAtUtc,
                ev.CreatedBy,
                ev.ModifiedAtUtc,
                ev.ModifiedBy,
                workflow?.Status.ToString(),
                approverName,
                approverRole,
                currentStep?.StepOrder,
                totalSteps > 0 ? totalSteps : null,
                approvalHistory
            );
        }).ToList();

        var result = new PagedResult<EmployeeVacationDto>(
            dtos,
            totalCount,
            request.Page,
            request.PageSize
        );

        return Result.Success(result);
    }

    /// <summary>
    /// Applies filters to the vacation query based on request parameters.
    /// </summary>
    private static IQueryable<Domain.Vacations.EmployeeVacation> ApplyFilters(
        IQueryable<Domain.Vacations.EmployeeVacation> query,
        GetEmployeeVacationsQuery request)
    {
        if (request.EmployeeId.HasValue)
            query = query.Where(ev => ev.EmployeeId == request.EmployeeId.Value);

        if (request.VacationTypeId.HasValue)
            query = query.Where(ev => ev.VacationTypeId == request.VacationTypeId.Value);

        if (request.StartDate.HasValue)
            query = query.Where(ev => ev.StartDate >= request.StartDate.Value);

        if (request.EndDate.HasValue)
            query = query.Where(ev => ev.EndDate <= request.EndDate.Value);

        if (request.IsApproved.HasValue)
            query = query.Where(ev => ev.IsApproved == request.IsApproved.Value);

        if (request.IsCurrentlyActive == true)
        {
            var today = DateTime.Today;
            query = query.Where(ev => ev.IsApproved && ev.StartDate <= today && ev.EndDate >= today);
        }

        if (request.IsUpcoming == true)
        {
            var today = DateTime.Today;
            query = query.Where(ev => ev.StartDate > today);
        }

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var searchTerm = request.SearchTerm.ToLower();
            query = query.Where(ev =>
                ev.Employee.FirstName.ToLower().Contains(searchTerm) ||
                ev.Employee.LastName.ToLower().Contains(searchTerm) ||
                ev.Employee.EmployeeNumber.ToLower().Contains(searchTerm) ||
                (ev.Notes != null && ev.Notes.ToLower().Contains(searchTerm)));
        }

        return query;
    }

    /// <summary>
    /// Applies sorting to the query based on specified field and direction.
    /// </summary>
    private IQueryable<Domain.Vacations.EmployeeVacation> ApplySorting(
        IQueryable<Domain.Vacations.EmployeeVacation> query,
        string sortBy,
        bool descending)
    {
        if (!_validSortFields.Contains(sortBy))
            sortBy = "StartDate";

        return sortBy.ToLower() switch
        {
            "startdate" => descending ? query.OrderByDescending(ev => ev.StartDate) : query.OrderBy(ev => ev.StartDate),
            "enddate" => descending ? query.OrderByDescending(ev => ev.EndDate) : query.OrderBy(ev => ev.EndDate),
            "employeename" => descending ?
                query.OrderByDescending(ev => ev.Employee.FirstName).ThenByDescending(ev => ev.Employee.LastName) :
                query.OrderBy(ev => ev.Employee.FirstName).ThenBy(ev => ev.Employee.LastName),
            "vacationtypename" => descending ? query.OrderByDescending(ev => ev.VacationType.Name) : query.OrderBy(ev => ev.VacationType.Name),
            "createddutc" => descending ? query.OrderByDescending(ev => ev.CreatedAtUtc) : query.OrderBy(ev => ev.CreatedAtUtc),
            "totaldays" => descending ? query.OrderByDescending(ev => ev.TotalDays) : query.OrderBy(ev => ev.TotalDays),
            _ => query.OrderBy(ev => ev.StartDate)
        };
    }

    /// <summary>
    /// Calculates business days between two dates (excluding weekends).
    /// </summary>
    private static int CalculateBusinessDays(DateTime startDate, DateTime endDate)
    {
        var businessDays = 0;
        var currentDate = startDate.Date;

        while (currentDate <= endDate.Date)
        {
            if (currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
            {
                businessDays++;
            }
            currentDate = currentDate.AddDays(1);
        }

        return businessDays;
    }

    /// <summary>
    /// Determines if a vacation is currently active.
    /// </summary>
    private static bool IsCurrentlyActive(DateTime startDate, DateTime endDate, bool isApproved)
    {
        var today = DateTime.Today;
        return isApproved && startDate.Date <= today && endDate.Date >= today;
    }

    /// <summary>
    /// Determines if a vacation is upcoming.
    /// </summary>
    private static bool IsUpcoming(DateTime startDate)
    {
        return startDate.Date > DateTime.Today;
    }

    /// <summary>
    /// Determines if a vacation is completed.
    /// </summary>
    private static bool IsCompleted(DateTime endDate)
    {
        return endDate.Date < DateTime.Today;
    }
}