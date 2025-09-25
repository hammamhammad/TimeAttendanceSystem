using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Settings.Commands.UpdateOvertimeConfiguration;

/// <summary>
/// Command for updating an existing overtime configuration.
/// Encapsulates all business logic and validation for overtime configuration updates.
/// </summary>
/// <param name="Id">Unique identifier of the overtime configuration to update</param>
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
/// <param name="IsActive">Whether this configuration should be active</param>
/// <param name="EffectiveFromDate">Date when this configuration becomes effective</param>
/// <param name="EffectiveToDate">Optional end date for this configuration</param>
public record UpdateOvertimeConfigurationCommand(
    long Id,
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
    DateTime? EffectiveToDate
);

/// <summary>
/// Command handler for updating overtime configurations.
/// Validates business rules and updates existing overtime configuration entities.
/// </summary>
public class UpdateOvertimeConfigurationCommandHandler
{
    private readonly IOvertimeConfigurationService _overtimeConfigService;

    public UpdateOvertimeConfigurationCommandHandler(IOvertimeConfigurationService overtimeConfigService)
    {
        _overtimeConfigService = overtimeConfigService;
    }

    /// <summary>
    /// Handles the update of an existing overtime configuration.
    /// </summary>
    /// <param name="command">Command containing updated overtime configuration data</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing success status or error information</returns>
    public async Task<Result<bool>> Handle(
        UpdateOvertimeConfigurationCommand command,
        CancellationToken cancellationToken = default)
    {
        try
        {
            // Get existing configuration
            var existingConfiguration = await _overtimeConfigService.GetConfigurationByIdAsync(command.Id, cancellationToken);
            if (existingConfiguration == null)
            {
                return Result.Failure<bool>($"Overtime configuration with ID {command.Id} not found");
            }

            // Update configuration properties
            existingConfiguration.EnablePreShiftOvertime = command.EnablePreShiftOvertime;
            existingConfiguration.EnablePostShiftOvertime = command.EnablePostShiftOvertime;
            existingConfiguration.NormalDayRate = command.NormalDayRate;
            existingConfiguration.PublicHolidayRate = command.PublicHolidayRate;
            existingConfiguration.OffDayRate = command.OffDayRate;
            existingConfiguration.MinimumOvertimeMinutes = command.MinimumOvertimeMinutes;
            existingConfiguration.ConsiderFlexibleTime = command.ConsiderFlexibleTime;
            existingConfiguration.MaxPreShiftOvertimeHours = command.MaxPreShiftOvertimeHours;
            existingConfiguration.MaxPostShiftOvertimeHours = command.MaxPostShiftOvertimeHours;
            existingConfiguration.RequireApproval = command.RequireApproval;
            existingConfiguration.OvertimeGracePeriodMinutes = command.OvertimeGracePeriodMinutes;
            existingConfiguration.WeekendAsOffDay = command.WeekendAsOffDay;
            existingConfiguration.RoundingIntervalMinutes = command.RoundingIntervalMinutes;
            existingConfiguration.PolicyNotes = command.PolicyNotes;
            existingConfiguration.IsActive = command.IsActive;
            existingConfiguration.EffectiveFromDate = command.EffectiveFromDate;
            existingConfiguration.EffectiveToDate = command.EffectiveToDate;

            // Update configuration using service (includes validation)
            await _overtimeConfigService.UpdateConfigurationAsync(existingConfiguration, cancellationToken);

            return Result.Success(true);
        }
        catch (ArgumentException ex)
        {
            return Result.Failure<bool>($"Validation failed: {ex.Message}");
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to update overtime configuration: {ex.Message}");
        }
    }
}