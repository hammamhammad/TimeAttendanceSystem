using MediatR;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.PublicHolidays.Commands.UpdatePublicHoliday;

/// <summary>
/// Command for updating an existing public holiday in the system.
/// Provides comprehensive update functionality while maintaining data integrity
/// and validating business rules for holiday modifications.
/// </summary>
/// <param name="Id">The unique identifier of the holiday to update</param>
/// <param name="Name">The updated name of the public holiday</param>
/// <param name="NameAr">The updated Arabic name of the public holiday (optional)</param>
/// <param name="SpecificDate">Updated specific date for one-time holidays</param>
/// <param name="Month">Updated month for recurring holidays (1-12)</param>
/// <param name="Day">Updated day of the month for annual holidays (1-31)</param>
/// <param name="HolidayType">Updated type of holiday recurrence pattern</param>
/// <param name="IsActive">Updated active status of the holiday</param>
/// <param name="IsNational">Updated scope - whether this holiday applies to all branches</param>
/// <param name="BranchId">Updated specific branch ID for regional holidays</param>
/// <param name="Description">Updated description or notes about the holiday</param>
/// <param name="EffectiveFromYear">Updated year from which this holiday becomes effective</param>
/// <param name="EffectiveToYear">Updated year until which this holiday is valid</param>
/// <param name="DayOfWeek">Updated day of the week for floating holidays</param>
/// <param name="WeekOccurrence">Updated week occurrence for floating holidays (1-5, -1 for last)</param>
/// <param name="CountryCode">Updated country code for international holiday support</param>
/// <param name="Priority">Updated priority when multiple holidays fall on same date</param>
/// <remarks>
/// Command Features:
/// - Complete holiday update functionality with validation
/// - Maintains referential integrity and business rule compliance
/// - Supports changing holiday types with appropriate validation
/// - Handles scope changes between national and regional holidays
/// - Validates effective date ranges and recurrence patterns
/// - Integrates with conflict detection for updated configurations
///
/// Update Validation:
/// - Holiday existence verification before update
/// - Holiday type-specific parameter validation
/// - Scope change validation (national/regional)
/// - Effective date consistency checking
/// - Conflict detection with other holidays
/// - Branch existence verification for regional holidays
///
/// Business Rules:
/// - Cannot change holiday ID or creation metadata
/// - Type changes must include all required parameters
/// - National to regional scope changes require BranchId
/// - Regional to national scope changes clear BranchId
/// - Priority changes trigger conflict re-evaluation
/// - Effective date changes validated for logical consistency
///
/// Update Scenarios:
/// - Name/description changes for better clarity
/// - Date adjustments for one-time or recurring holidays
/// - Scope changes from national to regional or vice versa
/// - Activation/deactivation for temporary suspension
/// - Priority adjustments for conflict resolution
/// - Type changes with complete parameter updates
///
/// Audit Considerations:
/// - All changes are logged through the base entity
/// - Previous values maintained in audit trail
/// - User context captured for change tracking
/// - Integration with attendance recalculation if needed
/// - Notification system for affected overtime calculations
/// </remarks>
public record UpdatePublicHolidayCommand(
    long Id,
    string Name,
    string? NameAr,
    DateTime? SpecificDate,
    int? Month,
    int? Day,
    HolidayType HolidayType,
    bool IsActive,
    bool IsNational,
    long? BranchId,
    string? Description,
    int? EffectiveFromYear,
    int? EffectiveToYear,
    DayOfWeek? DayOfWeek,
    int? WeekOccurrence,
    string? CountryCode,
    int Priority
) : IRequest<Result>;

/// <summary>
/// Command handler for updating public holidays.
/// Validates business rules and updates existing public holiday entities using the PublicHolidayService.
/// </summary>
public class UpdatePublicHolidayCommandHandler : BaseHandler<UpdatePublicHolidayCommand, Result>
{
    private readonly IPublicHolidayService _publicHolidayService;

    public UpdatePublicHolidayCommandHandler(
        IPublicHolidayService publicHolidayService,
        IApplicationDbContext context,
        ICurrentUser currentUser) : base(context, currentUser)
    {
        _publicHolidayService = publicHolidayService;
    }

    /// <summary>
    /// Handles the update of an existing public holiday with comprehensive validation.
    /// </summary>
    /// <param name="request">Command containing updated public holiday data</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result indicating success or failure of the update operation</returns>
    public override async Task<Result> Handle(
        UpdatePublicHolidayCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            // Create updated domain entity from command
            var holiday = new PublicHoliday
            {
                Id = request.Id,
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

            // Update holiday using service (includes validation and conflict checking)
            await _publicHolidayService.UpdateHolidayAsync(holiday, cancellationToken);

            return Result.Success();
        }
        catch (ArgumentException ex)
        {
            return Result.Failure($"Validation failed: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result.Failure($"Failed to update public holiday: {ex.Message}");
        }
    }
}