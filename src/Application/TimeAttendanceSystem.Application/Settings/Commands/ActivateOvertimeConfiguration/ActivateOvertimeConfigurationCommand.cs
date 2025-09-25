using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Settings.Commands.ActivateOvertimeConfiguration;

/// <summary>
/// Command for activating an overtime configuration.
/// Makes the specified configuration the active one and deactivates others.
/// </summary>
/// <param name="Id">Unique identifier of the overtime configuration to activate</param>
public record ActivateOvertimeConfigurationCommand(long Id);

/// <summary>
/// Command handler for activating overtime configurations.
/// Ensures only one configuration is active at a time.
/// </summary>
public class ActivateOvertimeConfigurationCommandHandler
{
    private readonly IOvertimeConfigurationService _overtimeConfigService;

    public ActivateOvertimeConfigurationCommandHandler(IOvertimeConfigurationService overtimeConfigService)
    {
        _overtimeConfigService = overtimeConfigService;
    }

    /// <summary>
    /// Handles the activation of an overtime configuration.
    /// </summary>
    /// <param name="command">Command containing the configuration ID to activate</param>
    /// <param name="cancellationToken">Cancellation token for async operations</param>
    /// <returns>Result containing success status or error information</returns>
    public async Task<Result<bool>> Handle(
        ActivateOvertimeConfigurationCommand command,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var success = await _overtimeConfigService.ActivateConfigurationAsync(command.Id, cancellationToken);

            if (!success)
            {
                return Result.Failure<bool>("Failed to activate overtime configuration. Configuration may not exist or may be invalid.");
            }

            return Result.Success(true);
        }
        catch (Exception ex)
        {
            return Result.Failure<bool>($"Failed to activate overtime configuration: {ex.Message}");
        }
    }
}