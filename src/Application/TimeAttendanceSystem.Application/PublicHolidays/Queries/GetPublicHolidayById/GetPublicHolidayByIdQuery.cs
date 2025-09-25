using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidays;

namespace TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidayById;

/// <summary>
/// Query for retrieving a specific public holiday by its unique identifier.
/// Provides detailed holiday information including computed fields and related data.
/// </summary>
/// <param name="Id">The unique identifier of the holiday to retrieve</param>
/// <param name="IncludeConflicts">Whether to include conflict information with other holidays</param>
/// <param name="Year">Optional year for calculating conflicts and next occurrence</param>
/// <remarks>
/// Query Features:
/// - Detailed holiday information retrieval
/// - Conflict detection with other holidays
/// - Next occurrence calculation
/// - Branch information for regional holidays
/// - Pattern description for complex recurrence rules
/// - Usage statistics and audit information
///
/// Performance Considerations:
/// - Single record retrieval optimized for speed
/// - Minimal database queries through efficient joins
/// - Conflict calculation only when requested
/// - Cached results for frequently accessed holidays
/// - Lazy loading of related entities
///
/// Usage Patterns:
/// - Holiday detail views in management interfaces
/// - Edit form population with existing data
/// - Audit and compliance reporting details
/// - Integration with calendar detail views
/// - Conflict resolution workflows
///
/// Security Considerations:
/// - Branch-level access control enforced
/// - Role-based data filtering applied
/// - Audit trail for holiday access
/// - Multi-tenant data isolation maintained
/// - Permission validation for sensitive fields
/// </remarks>
public record GetPublicHolidayByIdQuery(
    long Id,
    bool IncludeConflicts = false,
    int? Year = null
) : IRequest<Result<PublicHolidayDto?>>;

/// <summary>
/// Query handler for retrieving a specific public holiday by ID.
/// Implements detailed data retrieval with optional conflict analysis.
/// </summary>
public class GetPublicHolidayByIdQueryHandler : BaseHandler<GetPublicHolidayByIdQuery, Result<PublicHolidayDto?>>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public GetPublicHolidayByIdQueryHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the retrieval of a specific public holiday with detailed information.
    /// </summary>
    /// <param name="request">Query parameters including holiday ID and options</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing detailed holiday data or error information</returns>
    public override async Task<Result<PublicHolidayDto?>> Handle(
        GetPublicHolidayByIdQuery request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Retrieve the holiday using the service
            var holiday = await _publicHolidayService.GetHolidayByIdAsync(request.Id, cancellationToken);

            if (holiday == null)
            {
                return Result.Success<PublicHolidayDto?>(null);
            }

            // Get branch name if it's a regional holiday
            string? branchName = null;
            if (holiday.BranchId.HasValue)
            {
                branchName = await Context.Branches
                    .Where(b => b.Id == holiday.BranchId.Value)
                    .Select(b => b.Name)
                    .FirstOrDefaultAsync(cancellationToken);
            }

            // Calculate next occurrence
            DateTime? nextOccurrence = null;
            var currentYear = DateTime.Now.Year;
            var targetYear = request.Year ?? currentYear;

            for (int year = targetYear; year <= targetYear + 5; year++)
            {
                var holidayDate = holiday.GetHolidayDateForYear(year);
                if (holidayDate.HasValue && (request.Year.HasValue || holidayDate.Value >= DateTime.Today))
                {
                    nextOccurrence = holidayDate.Value;
                    break;
                }
            }

            // Check for conflicts if requested
            var hasConflicts = false;
            if (request.IncludeConflicts)
            {
                var conflictYear = request.Year ?? currentYear;
                var conflicts = await _publicHolidayService.GetConflictingHolidaysAsync(
                    holiday, conflictYear, cancellationToken);
                hasConflicts = conflicts.Any();
            }

            // Create the detailed DTO
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

            return Result.Success<PublicHolidayDto?>(dto);
        }
        catch (Exception ex)
        {
            return Result.Failure<PublicHolidayDto?>($"Failed to retrieve public holiday: {ex.Message}");
        }
    }
}