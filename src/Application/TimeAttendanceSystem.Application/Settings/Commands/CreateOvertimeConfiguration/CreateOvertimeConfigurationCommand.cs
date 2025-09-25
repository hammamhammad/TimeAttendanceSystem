using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Settings.Commands.CreateOvertimeConfiguration;

/// <summary>
/// Command for creating a new overtime configuration.
/// Encapsulates all business logic and validation for overtime configuration creation.
/// </summary>
/// <param name="EnablePreShiftOvertime">Enable overtime calculation for work before scheduled shift start</param>
/// <param name="EnablePostShiftOvertime">Enable overtime calculation for work after scheduled shift end</param>
/// <param name="NormalDayRate">Overtime rate multiplier for normal working days</param>
/// <param name="PublicHolidayRate">Overtime rate multiplier for public holidays</param>
/// <param name="OffDayRate">Overtime rate multiplier for off days/weekends</param>
/// <param name="MinimumOvertimeMinutes">Minimum minutes of overtime before it's counted</param>
/// <param name="ConsiderFlexibleTime">Whether to account for flexible work time when calculating overtime</param>
/// <param name="MaxPreShiftOvertimeHours">Maximum pre-shift overtime hours allowed per day</param>
/// <param name="MaxPostShiftOvertimeHours">Maximum post-shift overtime hours allowed per day</param>
/// <param name="RequireApproval">Whether overtime requires manager approval</param>
/// <param name="OvertimeGracePeriodMinutes">Grace period in minutes before overtime calculation begins</param>
/// <param name="WeekendAsOffDay">Automatically treat weekends as off days for rate calculation</param>
/// <param name="RoundingIntervalMinutes">Rounding interval for overtime hours</param>
/// <param name="PolicyNotes">Additional notes about overtime policies and rules</param>
/// <param name="IsActive">Whether this configuration should be active immediately</param>
/// <param name="EffectiveFromDate">Date when this configuration becomes effective</param>
/// <param name="EffectiveToDate">Optional end date for this configuration</param>
/// <param name="CreatedBy">Username or identifier of who is creating this configuration</param>
public record CreateOvertimeConfigurationCommand(
    bool EnablePreShiftOvertime,
    bool EnablePostShiftOvertime,
    decimal NormalDayRate,
    decimal PublicHolidayRate,
    decimal OffDayRate,
    int MinimumOvertimeMinutes,
    bool ConsiderFlexibleTime,
    decimal MaxPreShiftOvertimeHours,
    decimal MaxPostShiftOvertimeHours,
    bool RequireApproval,
    int OvertimeGracePeriodMinutes,
    bool WeekendAsOffDay,
    int RoundingIntervalMinutes,
    string? PolicyNotes,
    bool IsActive,
    DateTime EffectiveFromDate,
    DateTime? EffectiveToDate,
    string CreatedBy
);

/// <summary>
/// Command handler for creating overtime configurations.
/// Validates business rules and creates new overtime configuration entities.
/// </summary>
public class CreateOvertimeConfigurationCommandHandler
{
    private readonly IOvertimeConfigurationService _overtimeConfigService;

    public CreateOvertimeConfigurationCommandHandler(IOvertimeConfigurationService overtimeConfigService)
    {
        _overtimeConfigService = overtimeConfigService;
    }

    /// <summary>
    /// Handles the creation of a new overtime configuration.
    /// </summary>
    /// <param name="command">Command containing overtime configuration data</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing the created configuration ID or error information</returns>
    public async Task<Result<long>> Handle(
        CreateOvertimeConfigurationCommand command,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Create domain entity from command
            var configuration = new OvertimeConfiguration
            {
                EnablePreShiftOvertime = command.EnablePreShiftOvertime,
                EnablePostShiftOvertime = command.EnablePostShiftOvertime,
                NormalDayRate = command.NormalDayRate,
                PublicHolidayRate = command.PublicHolidayRate,
                OffDayRate = command.OffDayRate,
                MinimumOvertimeMinutes = command.MinimumOvertimeMinutes,
                ConsiderFlexibleTime = command.ConsiderFlexibleTime,
                MaxPreShiftOvertimeHours = command.MaxPreShiftOvertimeHours,
                MaxPostShiftOvertimeHours = command.MaxPostShiftOvertimeHours,
                RequireApproval = command.RequireApproval,
                OvertimeGracePeriodMinutes = command.OvertimeGracePeriodMinutes,
                WeekendAsOffDay = command.WeekendAsOffDay,
                RoundingIntervalMinutes = command.RoundingIntervalMinutes,
                PolicyNotes = command.PolicyNotes,
                IsActive = command.IsActive,
                EffectiveFromDate = command.EffectiveFromDate,
                EffectiveToDate = command.EffectiveToDate,
                CreatedAtUtc = DateTime.UtcNow,
                CreatedBy = command.CreatedBy,
                IsDeleted = false
            };

            // Create configuration using service (includes validation)
            var createdConfiguration = await _overtimeConfigService.CreateConfigurationAsync(configuration, cancellationToken);

            return Result.Success(createdConfiguration.Id);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<long>($"Validation failed: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result.Failure<long>($"Failed to create overtime configuration: {ex.Message}");
        }
    }
}