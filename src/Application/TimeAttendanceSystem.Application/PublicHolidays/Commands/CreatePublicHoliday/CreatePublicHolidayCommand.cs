using MediatR;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.PublicHolidays.Commands.CreatePublicHoliday;

/// <summary>
/// Command for creating a new public holiday in the system.
/// Encapsulates all business logic and validation for public holiday creation
/// with support for various holiday types and recurrence patterns.
/// </summary>
/// <param name="Name">The name of the public holiday</param>
/// <param name="NameAr">The Arabic name of the public holiday (optional)</param>
/// <param name="SpecificDate">Specific date for one-time holidays</param>
/// <param name="Month">Month for recurring holidays (1-12)</param>
/// <param name="Day">Day of the month for annual holidays (1-31)</param>
/// <param name="HolidayType">Type of holiday recurrence pattern</param>
/// <param name="IsActive">Whether this holiday is currently active</param>
/// <param name="IsNational">Whether this holiday applies to all branches</param>
/// <param name="BranchId">Specific branch ID for regional holidays</param>
/// <param name="Description">Optional description or notes about the holiday</param>
/// <param name="EffectiveFromYear">Year from which this holiday becomes effective</param>
/// <param name="EffectiveToYear">Year until which this holiday is valid</param>
/// <param name="DayOfWeek">Day of the week for floating holidays</param>
/// <param name="WeekOccurrence">Week occurrence for floating holidays (1-5, -1 for last)</param>
/// <param name="CountryCode">Country code for international holiday support</param>
/// <param name="Priority">Priority when multiple holidays fall on same date</param>
/// <remarks>
/// Command Features:
/// - Support for all holiday types: OneTime, Annual, Monthly, Floating
/// - Flexible recurrence patterns with validation
/// - Branch-specific and national holiday configurations
/// - Priority-based conflict resolution
/// - Comprehensive validation of holiday parameters
/// - Integration with overtime calculation system
///
/// Holiday Type Patterns:
/// - OneTime: Requires SpecificDate for single occurrence
/// - Annual: Requires Month and Day for yearly recurrence
/// - Monthly: Requires Day or DayOfWeek+WeekOccurrence for monthly recurrence
/// - Floating: Requires Month, DayOfWeek, and WeekOccurrence for calculated dates
///
/// Business Rules:
/// - National holidays cannot have BranchId specified
/// - Regional holidays must have valid BranchId
/// - Holiday name must be unique within scope (national vs branch)
/// - Effective dates must be logically consistent
/// - Floating holidays require complete pattern specification
///
/// Validation Logic:
/// - Holiday type-specific parameter validation
/// - Date range and occurrence validation
/// - Branch existence verification for regional holidays
/// - Conflict detection with existing holidays
/// - Priority assignment for overlapping dates
///
/// Usage Examples:
/// - National Annual: Christmas Day (Month=12, Day=25, IsNational=true)
/// - Floating Holiday: Thanksgiving (Month=11, DayOfWeek=Thursday, WeekOccurrence=4)
/// - Regional OneTime: Company Anniversary (SpecificDate=2024-03-15, BranchId=123)
/// - Monthly Recurring: First Monday Safety Meeting (DayOfWeek=Monday, WeekOccurrence=1)
/// </remarks>
public record CreatePublicHolidayCommand(
    string Name,
    string? NameAr,
    DateTime? SpecificDate,
    int? Month,
    int? Day,
    HolidayType HolidayType,
    bool IsActive = true,
    bool IsNational = true,
    long? BranchId = null,
    string? Description = null,
    int? EffectiveFromYear = null,
    int? EffectiveToYear = null,
    DayOfWeek? DayOfWeek = null,
    int? WeekOccurrence = null,
    string? CountryCode = null,
    int Priority = 1
) : IRequest<Result<long>>;

/// <summary>
/// Command handler for creating public holidays.
/// Validates business rules and creates new public holiday entities using the PublicHolidayService.
/// </summary>
public class CreatePublicHolidayCommandHandler : BaseHandler<CreatePublicHolidayCommand, Result<long>>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public CreatePublicHolidayCommandHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the creation of a new public holiday with comprehensive validation.
    /// </summary>
    /// <param name="request">Command containing public holiday data</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing the created holiday ID or error information</returns>
    public override async Task<Result<long>> Handle(
        CreatePublicHolidayCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Create domain entity from command
            var holiday = new PublicHoliday
            {
                Name = request.Name,
                NameAr = request.NameAr,
                SpecificDate = request.SpecificDate,
                Month = request.Month,
                Day = request.Day,
                HolidayType = request.HolidayType,
                IsActive = request.IsActive,
                IsNational = request.IsNational,
                BranchId = request.BranchId,
                Description = request.Description,
                EffectiveFromYear = request.EffectiveFromYear,
                EffectiveToYear = request.EffectiveToYear,
                DayOfWeek = request.DayOfWeek,
                WeekOccurrence = request.WeekOccurrence,
                CountryCode = request.CountryCode,
                Priority = request.Priority
            };

            // Create holiday using service (includes validation and conflict checking)
            var createdHoliday = await _publicHolidayService.CreateHolidayAsync(holiday, cancellationToken);

            return Result.Success(createdHoliday.Id);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<long>($"Validation failed: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result.Failure<long>($"Failed to create public holiday: {ex.Message}");
        }
    }
}