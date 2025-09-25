using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidays;

/// <summary>
/// Query handler for retrieving paginated public holidays with comprehensive filtering.
/// Implements efficient querying and data transformation for holiday management interfaces.
/// </summary>
public class GetPublicHolidaysQueryHandler : BaseHandler<GetPublicHolidaysQuery, Result<GetPublicHolidaysResponse>>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public GetPublicHolidaysQueryHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the retrieval of paginated public holidays with applied filters.
    /// </summary>
    /// <param name="request">Query parameters including pagination and filter criteria</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing paginated holiday data or error information</returns>
    public override async Task<Result<GetPublicHolidaysResponse>> Handle(
        GetPublicHolidaysQuery request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Use the service's paginated query method
            var (holidays, totalCount) = await _publicHolidayService.GetHolidaysPagedAsync(
                page: request.Page,
                pageSize: request.PageSize,
                searchTerm: request.SearchTerm,
                branchId: request.BranchId,
                holidayType: request.HolidayType,
                isActive: request.IsActive,
                cancellationToken: cancellationToken);

            // Transform to DTOs with additional computed fields
            var holidayDtos = new List<PublicHolidayDto>();

            foreach (var holiday in holidays)
            {
                // Get branch name if it's a regional holiday
                string? branchName = null;
                if (holiday.BranchId.HasValue)
                {
                    var branch = await Context.Branches
                        .Where(b => b.Id == holiday.BranchId.Value)
                        .Select(b => b.Name)
                        .FirstOrDefaultAsync(cancellationToken);
                    branchName = branch;
                }

                // Calculate next occurrence
                DateTime? nextOccurrence = null;
                var currentYear = DateTime.Now.Year;
                for (int year = currentYear; year <= currentYear + 5; year++)
                {
                    var holidayDate = holiday.GetHolidayDateForYear(year);
                    if (holidayDate.HasValue && holidayDate.Value >= DateTime.Today)
                    {
                        nextOccurrence = holidayDate.Value;
                        break;
                    }
                }

                // Check for conflicts (simplified - could be enhanced)
                var hasConflicts = false;
                if (request.Year.HasValue)
                {
                    var conflicts = await _publicHolidayService.GetConflictingHolidaysAsync(
                        holiday, request.Year.Value, cancellationToken);
                    hasConflicts = conflicts.Any();
                }

                var dto = new PublicHolidayDto
                {
                    Id = holiday.Id,
                    Name = holiday.Name,
                    NameAr = holiday.NameAr,
                    HolidayType = holiday.HolidayType,
                    IsActive = holiday.IsActive,
                    IsNational = holiday.IsNational,
                    BranchId = holiday.BranchId,
                    BranchName = branchName,
                    Description = holiday.Description,
                    EffectiveFromYear = holiday.EffectiveFromYear,
                    EffectiveToYear = holiday.EffectiveToYear,
                    CountryCode = holiday.CountryCode,
                    Priority = holiday.Priority,
                    PatternDescription = holiday.GetPatternDescription(),
                    NextOccurrence = nextOccurrence,
                    HasConflicts = hasConflicts,
                    CreatedAt = DateTime.UtcNow, // PublicHoliday inherits from BaseEntity but doesn't expose audit fields
                    UpdatedAt = null
                };

                holidayDtos.Add(dto);
            }

            // Calculate pagination metadata
            var totalPages = (int)Math.Ceiling((double)totalCount / request.PageSize);
            var hasNextPage = request.Page < totalPages;
            var hasPreviousPage = request.Page > 1;

            var response = new GetPublicHolidaysResponse
            {
                Holidays = holidayDtos,
                TotalCount = totalCount,
                Page = request.Page,
                PageSize = request.PageSize,
                TotalPages = totalPages,
                HasNextPage = hasNextPage,
                HasPreviousPage = hasPreviousPage
            };

            return Result.Success(response);
        }
        catch (Exception ex)
        {
            return Result.Failure<GetPublicHolidaysResponse>($"Failed to retrieve public holidays: {ex.Message}");
        }
    }
}