using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.EmployeeVacations.Queries.Common;

namespace TimeAttendanceSystem.Application.EmployeeVacations.Queries.GetEmployeeVacations;

/// <summary>
/// CQRS query for retrieving employee vacation records with filtering and pagination.
/// Supports comprehensive filtering options for various use cases.
/// </summary>
/// <param name="EmployeeId">Filter by specific employee (optional)</param>
/// <param name="VacationTypeId">Filter by specific vacation type (optional)</param>
/// <param name="StartDate">Filter vacations starting from this date (optional)</param>
/// <param name="EndDate">Filter vacations ending before this date (optional)</param>
/// <param name="IsApproved">Filter by approval status (optional)</param>
/// <param name="IsCurrentlyActive">Filter for currently active vacations (optional)</param>
/// <param name="IsUpcoming">Filter for upcoming vacations (optional)</param>
/// <param name="SearchTerm">Search in employee names or notes (optional)</param>
/// <param name="Page">Page number for pagination (1-based)</param>
/// <param name="PageSize">Number of items per page (max 100)</param>
/// <param name="SortBy">Sort field (StartDate, EndDate, EmployeeName, VacationTypeName)</param>
/// <param name="SortDescending">Sort direction (default ascending)</param>
/// <remarks>
/// Query Features:
/// - Comprehensive filtering capabilities
/// - Full-text search in employee names and notes
/// - Pagination with configurable page size
/// - Multiple sorting options
/// - Performance optimized with proper indexing
/// - Includes related data (Employee, VacationType) for display
///
/// Use Cases:
/// - HR dashboard showing all employee vacations
/// - Employee self-service showing personal vacations
/// - Manager view showing team vacation schedules
/// - Calendar integration with date-based filtering
/// - Reporting and analytics with flexible filtering
///
/// Performance Considerations:
/// - Uses database indexes for efficient filtering
/// - Projection to DTO reduces data transfer
/// - Pagination prevents large result sets
/// - Lazy loading disabled for predictable performance
/// </remarks>
public record GetEmployeeVacationsQuery(
    long? EmployeeId = null,
    long? VacationTypeId = null,
    DateTime? StartDate = null,
    DateTime? EndDate = null,
    bool? IsApproved = null,
    bool? IsCurrentlyActive = null,
    bool? IsUpcoming = null,
    string? SearchTerm = null,
    int Page = 1,
    int PageSize = 20,
    string SortBy = "StartDate",
    bool SortDescending = false
) : IRequest<Result<PagedResult<EmployeeVacationDto>>>;

/// <summary>
/// Filter options for vacation queries with validation.
/// </summary>
public class VacationQueryFilters
{
    public long? EmployeeId { get; set; }
    public long? VacationTypeId { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool? IsApproved { get; set; }
    public string? SearchTerm { get; set; }
    public int Year { get; set; } = DateTime.Now.Year;
    public int? Month { get; set; }

    /// <summary>
    /// Validates the filter parameters.
    /// </summary>
    public bool IsValid()
    {
        if (StartDate.HasValue && EndDate.HasValue && StartDate > EndDate)
            return false;

        if (Year < 2000 || Year > DateTime.Now.Year + 10)
            return false;

        if (Month.HasValue && (Month < 1 || Month > 12))
            return false;

        return true;
    }
}