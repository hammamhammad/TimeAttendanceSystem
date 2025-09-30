using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.EmployeeVacations.Queries.Common;

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

        // Apply pagination
        var items = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(ev => new EmployeeVacationDto(
                ev.Id,
                ev.EmployeeId,
                ev.Employee.EmployeeNumber,
                $"{ev.Employee.FirstName} {ev.Employee.LastName}",
                ev.VacationTypeId,
                ev.VacationType.Name,
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
                ev.ModifiedBy
            ))
            .ToListAsync(cancellationToken);

        var result = new PagedResult<EmployeeVacationDto>(
            items,
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