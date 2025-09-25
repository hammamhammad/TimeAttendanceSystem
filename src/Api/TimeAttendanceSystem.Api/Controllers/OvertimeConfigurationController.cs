using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Application.Settings.Queries.GetOvertimeConfigurations;
using TimeAttendanceSystem.Application.Settings.Commands.CreateOvertimeConfiguration;
using TimeAttendanceSystem.Application.Settings.Commands.UpdateOvertimeConfiguration;
using TimeAttendanceSystem.Application.Settings.Commands.ActivateOvertimeConfiguration;

namespace TimeAttendanceSystem.Api.Controllers;

/// <summary>
/// API controller for managing overtime configurations.
/// Provides endpoints for CRUD operations and configuration management.
/// </summary>
[ApiController]
[Route("api/v1/overtime-configurations")]
[Authorize]
public class OvertimeConfigurationController : ControllerBase
{
    private readonly GetOvertimeConfigurationsQueryHandler _getConfigurationsHandler;
    private readonly CreateOvertimeConfigurationCommandHandler _createHandler;
    private readonly UpdateOvertimeConfigurationCommandHandler _updateHandler;
    private readonly ActivateOvertimeConfigurationCommandHandler _activateHandler;
    private readonly IOvertimeConfigurationService _overtimeConfigService;

    public OvertimeConfigurationController(
        GetOvertimeConfigurationsQueryHandler getConfigurationsHandler,
        CreateOvertimeConfigurationCommandHandler createHandler,
        UpdateOvertimeConfigurationCommandHandler updateHandler,
        ActivateOvertimeConfigurationCommandHandler activateHandler,
        IOvertimeConfigurationService overtimeConfigService)
    {
        _getConfigurationsHandler = getConfigurationsHandler;
        _createHandler = createHandler;
        _updateHandler = updateHandler;
        _activateHandler = activateHandler;
        _overtimeConfigService = overtimeConfigService;
    }

    /// <summary>
    /// Gets a paginated list of overtime configurations with optional filtering.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page (1-100)</param>
    /// <param name="search">Optional search term</param>
    /// <param name="isActive">Optional filter by active status</param>
    /// <returns>Paginated list of overtime configurations</returns>
    [HttpGet]
    [Authorize(Policy = "SettingsRead")]
    public async Task<IActionResult> GetOvertimeConfigurations(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? search = null,
        [FromQuery] bool? isActive = null)
    {
        var query = new GetOvertimeConfigurationsQuery(page, pageSize, search, isActive);
        var result = await _getConfigurationsHandler.Handle(query);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return Ok(result.Value);
    }

    /// <summary>
    /// Gets a specific overtime configuration by ID.
    /// </summary>
    /// <param name="id">Configuration ID</param>
    /// <returns>Overtime configuration details</returns>
    [HttpGet("{id}")]
    [Authorize(Policy = "SettingsRead")]
    public async Task<IActionResult> GetOvertimeConfigurationById(long id)
    {
        try
        {
            var configuration = await _overtimeConfigService.GetConfigurationByIdAsync(id);

            if (configuration == null)
            {
                return NotFound(new { error = "Overtime configuration not found" });
            }

            var dto = new OvertimeConfigurationDto(
                configuration.Id,
                configuration.EnablePreShiftOvertime,
                configuration.EnablePostShiftOvertime,
                configuration.NormalDayRate,
                configuration.PublicHolidayRate,
                configuration.OffDayRate,
                configuration.MinimumOvertimeMinutes,
                configuration.ConsiderFlexibleTime,
                configuration.MaxPreShiftOvertimeHours,
                configuration.MaxPostShiftOvertimeHours,
                configuration.RequireApproval,
                configuration.OvertimeGracePeriodMinutes,
                configuration.WeekendAsOffDay,
                configuration.RoundingIntervalMinutes,
                configuration.PolicyNotes,
                configuration.IsActive,
                configuration.EffectiveFromDate,
                configuration.EffectiveToDate,
                configuration.CreatedAtUtc,
                configuration.CreatedBy ?? "System"
            );

            return Ok(dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to retrieve overtime configuration: {ex.Message}" });
        }
    }

    /// <summary>
    /// Gets the currently active overtime configuration.
    /// </summary>
    /// <returns>Active overtime configuration or null if none exists</returns>
    [HttpGet("active")]
    [Authorize(Policy = "SettingsRead")]
    public async Task<IActionResult> GetActiveOvertimeConfiguration()
    {
        try
        {
            var configuration = await _overtimeConfigService.GetActiveConfigurationAsync();

            if (configuration == null)
            {
                return NotFound(new { error = "No active overtime configuration found" });
            }

            var dto = new OvertimeConfigurationDto(
                configuration.Id,
                configuration.EnablePreShiftOvertime,
                configuration.EnablePostShiftOvertime,
                configuration.NormalDayRate,
                configuration.PublicHolidayRate,
                configuration.OffDayRate,
                configuration.MinimumOvertimeMinutes,
                configuration.ConsiderFlexibleTime,
                configuration.MaxPreShiftOvertimeHours,
                configuration.MaxPostShiftOvertimeHours,
                configuration.RequireApproval,
                configuration.OvertimeGracePeriodMinutes,
                configuration.WeekendAsOffDay,
                configuration.RoundingIntervalMinutes,
                configuration.PolicyNotes,
                configuration.IsActive,
                configuration.EffectiveFromDate,
                configuration.EffectiveToDate,
                configuration.CreatedAtUtc,
                configuration.CreatedBy ?? "System"
            );

            return Ok(dto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to retrieve active overtime configuration: {ex.Message}" });
        }
    }

    /// <summary>
    /// Creates a new overtime configuration.
    /// </summary>
    /// <param name="request">Overtime configuration data</param>
    /// <returns>Created configuration ID</returns>
    [HttpPost]
    [Authorize(Policy = "SettingsManagement")]
    public async Task<IActionResult> CreateOvertimeConfiguration([FromBody] CreateOvertimeConfigurationRequest request)
    {
        // Get current user (simplified - in real implementation, get from authentication context)
        var currentUser = User.Identity?.Name ?? "System";

        var command = new CreateOvertimeConfigurationCommand(
            request.EnablePreShiftOvertime,
            request.EnablePostShiftOvertime,
            request.NormalDayRate,
            request.PublicHolidayRate,
            request.OffDayRate,
            request.MinimumOvertimeMinutes,
            request.ConsiderFlexibleTime,
            request.MaxPreShiftOvertimeHours,
            request.MaxPostShiftOvertimeHours,
            request.RequireApproval,
            request.OvertimeGracePeriodMinutes,
            request.WeekendAsOffDay,
            request.RoundingIntervalMinutes,
            request.PolicyNotes,
            request.IsActive,
            request.EffectiveFromDate,
            request.EffectiveToDate,
            currentUser
        );

        var result = await _createHandler.Handle(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return CreatedAtAction(
            nameof(GetOvertimeConfigurationById),
            new { id = result.Value },
            new { id = result.Value });
    }

    /// <summary>
    /// Updates an existing overtime configuration.
    /// </summary>
    /// <param name="id">Configuration ID</param>
    /// <param name="request">Updated configuration data</param>
    /// <returns>Success status</returns>
    [HttpPut("{id}")]
    [Authorize(Policy = "SettingsManagement")]
    public async Task<IActionResult> UpdateOvertimeConfiguration(long id, [FromBody] UpdateOvertimeConfigurationRequest request)
    {
        var command = new UpdateOvertimeConfigurationCommand(
            id,
            request.EnablePreShiftOvertime,
            request.EnablePostShiftOvertime,
            request.NormalDayRate,
            request.PublicHolidayRate,
            request.OffDayRate,
            request.MinimumOvertimeMinutes,
            request.ConsiderFlexibleTime,
            request.MaxPreShiftOvertimeHours,
            request.MaxPostShiftOvertimeHours,
            request.RequireApproval,
            request.OvertimeGracePeriodMinutes,
            request.WeekendAsOffDay,
            request.RoundingIntervalMinutes,
            request.PolicyNotes,
            request.IsActive,
            request.EffectiveFromDate,
            request.EffectiveToDate
        );

        var result = await _updateHandler.Handle(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Activates a specific overtime configuration.
    /// </summary>
    /// <param name="id">Configuration ID to activate</param>
    /// <returns>Success status</returns>
    [HttpPatch("{id}/activate")]
    [Authorize(Policy = "SettingsManagement")]
    public async Task<IActionResult> ActivateOvertimeConfiguration(long id)
    {
        var command = new ActivateOvertimeConfigurationCommand(id);
        var result = await _activateHandler.Handle(command);

        if (result.IsFailure)
        {
            return BadRequest(new { error = result.Error });
        }

        return NoContent();
    }

    /// <summary>
    /// Deactivates a specific overtime configuration.
    /// </summary>
    /// <param name="id">Configuration ID to deactivate</param>
    /// <returns>Success status</returns>
    [HttpPatch("{id}/deactivate")]
    [Authorize(Policy = "SettingsManagement")]
    public async Task<IActionResult> DeactivateOvertimeConfiguration(long id)
    {
        try
        {
            // Get the configuration to deactivate
            var configuration = await _overtimeConfigService.GetConfigurationByIdAsync(id);

            if (configuration == null)
            {
                return NotFound(new { error = "Overtime configuration not found" });
            }

            if (!configuration.IsActive)
            {
                return BadRequest(new { error = "Configuration is already inactive" });
            }

            // Update the configuration to inactive
            var command = new UpdateOvertimeConfigurationCommand(
                id,
                configuration.EnablePreShiftOvertime,
                configuration.EnablePostShiftOvertime,
                configuration.NormalDayRate,
                configuration.PublicHolidayRate,
                configuration.OffDayRate,
                configuration.MinimumOvertimeMinutes,
                configuration.ConsiderFlexibleTime,
                configuration.MaxPreShiftOvertimeHours,
                configuration.MaxPostShiftOvertimeHours,
                configuration.RequireApproval,
                configuration.OvertimeGracePeriodMinutes,
                configuration.WeekendAsOffDay,
                configuration.RoundingIntervalMinutes,
                configuration.PolicyNotes,
                false, // Set IsActive to false
                configuration.EffectiveFromDate,
                configuration.EffectiveToDate
            );

            var result = await _updateHandler.Handle(command);

            if (result.IsFailure)
            {
                return BadRequest(new { error = result.Error });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to deactivate overtime configuration: {ex.Message}" });
        }
    }

    /// <summary>
    /// Gets overtime configuration summary for dashboard display.
    /// </summary>
    /// <returns>Summary of current overtime settings</returns>
    [HttpGet("summary")]
    [Authorize(Policy = "SettingsRead")]
    public async Task<IActionResult> GetOvertimeConfigurationSummary()
    {
        try
        {
            var activeConfig = await _overtimeConfigService.GetActiveConfigurationAsync();

            if (activeConfig == null)
            {
                return Ok(new
                {
                    isConfigured = false,
                    message = "No active overtime configuration found",
                    defaultConfiguration = _overtimeConfigService.CreateDefaultConfiguration().GetConfigurationSummary()
                });
            }

            return Ok(new
            {
                isConfigured = true,
                configurationId = activeConfig.Id,
                summary = activeConfig.GetConfigurationSummary(),
                preShiftEnabled = activeConfig.EnablePreShiftOvertime,
                postShiftEnabled = activeConfig.EnablePostShiftOvertime,
                normalDayRate = activeConfig.NormalDayRate,
                holidayRate = activeConfig.PublicHolidayRate,
                offDayRate = activeConfig.OffDayRate,
                minimumMinutes = activeConfig.MinimumOvertimeMinutes,
                effectiveFromDate = activeConfig.EffectiveFromDate
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = $"Failed to retrieve overtime configuration summary: {ex.Message}" });
        }
    }
}