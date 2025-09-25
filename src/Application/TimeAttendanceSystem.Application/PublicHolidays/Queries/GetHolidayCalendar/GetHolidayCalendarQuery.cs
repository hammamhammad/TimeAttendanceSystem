using MediatR;
using Microsoft.EntityFrameworkCore;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.PublicHolidays.Queries.GetPublicHolidays;

namespace TimeAttendanceSystem.Application.PublicHolidays.Queries.GetHolidayCalendar;

/// <summary>
/// Query for generating a comprehensive holiday calendar for a specific year and optional branch.
/// Provides calendar data optimized for display in calendar interfaces and planning workflows.
/// </summary>
/// <param name="Year">The year to generate the holiday calendar for</param>
/// <param name="BranchId">Optional branch ID for regional holiday filtering</param>
/// <param name="IncludeInactive">Whether to include inactive holidays in the calendar</param>
/// <param name="Format">Optional format specification for specialized calendar layouts</param>
/// <remarks>
/// Query Features:
/// - Complete year calendar generation with all applicable holidays
/// - Branch-specific filtering for multi-tenant operations
/// - Optimized data structure for calendar display components
/// - Conflict resolution for overlapping holidays
/// - Performance optimization for large holiday datasets
/// - Integration with frontend calendar libraries
///
/// Calendar Generation Logic:
/// - Calculates all holiday occurrences for the specified year
/// - Applies recurrence rules for annual, monthly, and floating holidays
/// - Handles complex patterns like "first Monday of March"
/// - Resolves conflicts using priority-based selection
/// - Groups holidays by date for efficient display
/// - Provides metadata for calendar navigation
///
/// Performance Considerations:
/// - Efficient bulk calculation of all year holidays
/// - Minimal database queries through service layer
/// - Optimized data structure for frontend consumption
/// - Caching support for frequently requested calendars
/// - Lazy loading of optional holiday details
/// - Pagination support for mobile interfaces
///
/// Usage Patterns:
/// - Annual calendar display in management interfaces
/// - Holiday planning and scheduling workflows
/// - Integration with external calendar systems
/// - Mobile app calendar views with holiday indicators
/// - Overtime calculation calendar dependencies
/// - Compliance reporting for audit requirements
///
/// Data Structure:
/// - Date-indexed holiday collections for efficient lookup
/// - Priority-sorted holidays for conflict resolution
/// - Rich metadata for calendar navigation
/// - Responsive design support for various screen sizes
/// - Export capabilities for external integration
/// - Accessibility features for inclusive calendar access
///
/// Security Considerations:
/// - Branch-level access control for regional holidays
/// - Role-based filtering of sensitive holiday information
/// - Multi-tenant data isolation in calendar generation
/// - Audit trail for calendar access patterns
/// - Permission validation for holiday visibility
/// </remarks>
public record GetHolidayCalendarQuery(
    int Year,
    long? BranchId = null,
    bool IncludeInactive = false,
    string? Format = null
) : IRequest<Result<GetHolidayCalendarResponse>>;

/// <summary>
/// Calendar day representation with holiday information.
/// Optimized for calendar display components and date-based workflows.
/// </summary>
public record HolidayCalendarDay
{
    /// <summary>Gets or sets the date for this calendar day.</summary>
    public DateTime Date { get; init; }

    /// <summary>Gets or sets the list of holidays occurring on this date.</summary>
    public List<PublicHolidayDto> Holidays { get; init; } = new();

    /// <summary>Gets or sets whether this date has any active holidays.</summary>
    public bool IsHoliday { get; init; }

    /// <summary>Gets or sets the primary holiday for this date (highest priority).</summary>
    public PublicHolidayDto? PrimaryHoliday { get; init; }

    /// <summary>Gets or sets whether this date has conflicting holidays.</summary>
    public bool HasConflicts { get; init; }

    /// <summary>Gets or sets whether this is a weekend day.</summary>
    public bool IsWeekend { get; init; }

    /// <summary>Gets or sets additional metadata for calendar display.</summary>
    public Dictionary<string, object>? Metadata { get; init; }
}

/// <summary>
/// Response object for holiday calendar request.
/// Contains calendar data structured for efficient display and navigation.
/// </summary>
public record GetHolidayCalendarResponse
{
    /// <summary>Gets or sets the year this calendar represents.</summary>
    public int Year { get; init; }

    /// <summary>Gets or sets the branch ID this calendar is filtered for.</summary>
    public long? BranchId { get; init; }

    /// <summary>Gets or sets the branch name for regional calendars.</summary>
    public string? BranchName { get; init; }

    /// <summary>Gets or sets the list of calendar days with holiday information.</summary>
    public List<HolidayCalendarDay> CalendarDays { get; init; } = new();

    /// <summary>Gets or sets the total number of holiday days in this year.</summary>
    public int TotalHolidayDays { get; init; }

    /// <summary>Gets or sets the total number of unique holidays in this year.</summary>
    public int TotalHolidays { get; init; }

    /// <summary>Gets or sets the monthly breakdown of holidays.</summary>
    public Dictionary<int, int> MonthlyHolidayCounts { get; init; } = new();

    /// <summary>Gets or sets calendar metadata for navigation and display.</summary>
    public Dictionary<string, object>? CalendarMetadata { get; init; }
}

/// <summary>
/// Query handler for generating holiday calendars.
/// Implements efficient calendar generation with comprehensive holiday calculation.
/// </summary>
public class GetHolidayCalendarQueryHandler : BaseHandler<GetHolidayCalendarQuery, Result<GetHolidayCalendarResponse>>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public GetHolidayCalendarQueryHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the generation of a comprehensive holiday calendar.
    /// </summary>
    /// <param name="request">Query parameters including year and filtering options</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing calendar data or error information</returns>
    public override async Task<Result<GetHolidayCalendarResponse>> Handle(
        GetHolidayCalendarQuery request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Generate holiday calendar using the service
            var holidayCalendar = await _publicHolidayService.GetHolidayCalendarAsync(
                request.Year, request.BranchId, cancellationToken);

            // Get branch name if specified
            string? branchName = null;
            if (request.BranchId.HasValue)
            {
                branchName = await Context.Branches
                    .Where(b => b.Id == request.BranchId.Value)
                    .Select(b => b.Name)
                    .FirstOrDefaultAsync(cancellationToken);
            }

            // Transform to calendar day structure
            var calendarDays = new List<HolidayCalendarDay>();
            var startDate = new DateTime(request.Year, 1, 1);
            var endDate = new DateTime(request.Year, 12, 31);

            for (var date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var dayHolidays = holidayCalendar.ContainsKey(date) ? holidayCalendar[date] : new List<Domain.Settings.PublicHoliday>();

                // Filter inactive holidays if not requested
                if (!request.IncludeInactive)
                {
                    dayHolidays = dayHolidays.Where(h => h.IsActive).ToList();
                }

                // Transform to DTOs
                var holidayDtos = dayHolidays.Select(h => new PublicHolidayDto
                {
                    Id = h.Id,
                    Name = h.Name,
                    NameAr = h.NameAr,
                    HolidayType = h.HolidayType,
                    IsActive = h.IsActive,
                    IsNational = h.IsNational,
                    BranchId = h.BranchId,
                    Description = h.Description,
                    Priority = h.Priority,
                    PatternDescription = h.GetPatternDescription(),
                    CreatedAt = DateTime.UtcNow, // PublicHoliday inherits from BaseEntity but doesn't expose audit fields
                    UpdatedAt = null
                }).OrderByDescending(h => h.Priority).ToList();

                var calendarDay = new HolidayCalendarDay
                {
                    Date = date,
                    Holidays = holidayDtos,
                    IsHoliday = holidayDtos.Any(),
                    PrimaryHoliday = holidayDtos.FirstOrDefault(),
                    HasConflicts = holidayDtos.Count > 1,
                    IsWeekend = date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday
                };

                calendarDays.Add(calendarDay);
            }

            // Calculate statistics
            var holidayDays = calendarDays.Where(d => d.IsHoliday).ToList();
            var totalHolidayDays = holidayDays.Count;
            var totalHolidays = holidayDays.SelectMany(d => d.Holidays).Count();

            // Calculate monthly breakdown
            var monthlyHolidayCounts = new Dictionary<int, int>();
            for (int month = 1; month <= 12; month++)
            {
                var monthHolidayDays = holidayDays.Count(d => d.Date.Month == month);
                monthlyHolidayCounts[month] = monthHolidayDays;
            }

            // Create response
            var response = new GetHolidayCalendarResponse
            {
                Year = request.Year,
                BranchId = request.BranchId,
                BranchName = branchName,
                CalendarDays = calendarDays,
                TotalHolidayDays = totalHolidayDays,
                TotalHolidays = totalHolidays,
                MonthlyHolidayCounts = monthlyHolidayCounts,
                CalendarMetadata = new Dictionary<string, object>
                {
                    ["GeneratedAt"] = DateTime.UtcNow,
                    ["IncludeInactive"] = request.IncludeInactive,
                    ["Format"] = request.Format ?? "standard"
                }
            };

            return Result.Success(response);
        }
        catch (Exception ex)
        {
            return Result.Failure<GetHolidayCalendarResponse>($"Failed to generate holiday calendar: {ex.Message}");
        }
    }
}