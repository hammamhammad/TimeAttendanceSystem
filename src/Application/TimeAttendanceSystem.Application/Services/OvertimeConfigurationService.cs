using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Services;

/// <summary>
/// Service implementation for managing overtime configurations and providing business logic
/// for overtime calculation rules and policies.
/// </summary>
public class OvertimeConfigurationService : IOvertimeConfigurationService
{
    private readonly ISettingsRepository _settingsRepository;
    private readonly ILogger<OvertimeConfigurationService> _logger;

    public OvertimeConfigurationService(
        ISettingsRepository settingsRepository,
        ILogger<OvertimeConfigurationService> logger)
    {
        _settingsRepository = settingsRepository;
        _logger = logger;
    }

    public async Task<OvertimeConfiguration> GetActiveConfigurationAsync(CancellationToken cancellationToken = default)
    {
        var config = await _settingsRepository.GetActiveOvertimeConfigurationAsync(cancellationToken);

        if (config == null)
        {
            _logger.LogWarning("No active overtime configuration found, returning default configuration");
            return CreateDefaultConfiguration();
        }

        // Check if configuration is still effective
        var now = DateTime.UtcNow;
        if (config.EffectiveFromDate > now || (config.EffectiveToDate.HasValue && config.EffectiveToDate < now))
        {
            _logger.LogWarning("Active overtime configuration {ConfigId} is not effective for current date, returning default", config.Id);
            return CreateDefaultConfiguration();
        }

        return config;
    }

    public async Task<OvertimeConfiguration> CreateConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default)
    {
        var (isValid, errors) = ValidateConfiguration(configuration);
        if (!isValid)
        {
            throw new ArgumentException($"Invalid overtime configuration: {string.Join(", ", errors)}");
        }

        // If this is being set as active, deactivate others
        if (configuration.IsActive)
        {
            _logger.LogInformation("Creating new active overtime configuration, will deactivate existing ones");
        }

        var created = await _settingsRepository.CreateOvertimeConfigurationAsync(configuration, cancellationToken);

        _logger.LogInformation("Created overtime configuration {ConfigId} with summary: {Summary}",
            created.Id, created.GetConfigurationSummary());

        return created;
    }

    public async Task<OvertimeConfiguration> UpdateConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default)
    {
        var (isValid, errors) = ValidateConfiguration(configuration);
        if (!isValid)
        {
            throw new ArgumentException($"Invalid overtime configuration: {string.Join(", ", errors)}");
        }

        var existing = await _settingsRepository.GetOvertimeConfigurationByIdAsync(configuration.Id, cancellationToken);
        if (existing == null)
        {
            throw new ArgumentException($"Overtime configuration with ID {configuration.Id} not found");
        }

        var updated = await _settingsRepository.UpdateOvertimeConfigurationAsync(configuration, cancellationToken);

        _logger.LogInformation("Updated overtime configuration {ConfigId} with summary: {Summary}",
            updated.Id, updated.GetConfigurationSummary());

        return updated;
    }

    public async Task<bool> ActivateConfigurationAsync(long configurationId, CancellationToken cancellationToken = default)
    {
        var configuration = await _settingsRepository.GetOvertimeConfigurationByIdAsync(configurationId, cancellationToken);
        if (configuration == null)
        {
            _logger.LogWarning("Cannot activate overtime configuration {ConfigId}: not found", configurationId);
            return false;
        }

        var (isValid, errors) = ValidateConfiguration(configuration);
        if (!isValid)
        {
            _logger.LogWarning("Cannot activate overtime configuration {ConfigId}: validation failed: {Errors}",
                configurationId, string.Join(", ", errors));
            return false;
        }

        var success = await _settingsRepository.ActivateOvertimeConfigurationAsync(configurationId, cancellationToken);

        if (success)
        {
            _logger.LogInformation("Activated overtime configuration {ConfigId}", configurationId);
        }
        else
        {
            _logger.LogWarning("Failed to activate overtime configuration {ConfigId}", configurationId);
        }

        return success;
    }

    public async Task<(IEnumerable<OvertimeConfiguration> Items, int TotalCount)> GetConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        return await _settingsRepository.GetOvertimeConfigurationsAsync(page, pageSize, cancellationToken);
    }

    public async Task<OvertimeConfiguration?> GetConfigurationByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _settingsRepository.GetOvertimeConfigurationByIdAsync(id, cancellationToken);
    }

    public async Task<DayType> GetDayTypeAsync(DateTime date, long branchId, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);

        // First check if it's a public holiday - this takes highest priority
        var isPublicHoliday = await _settingsRepository.IsPublicHolidayAsync(date, branchId, cancellationToken);
        if (isPublicHoliday)
        {
            return DayType.PublicHoliday;
        }

        // Check if it's an off day (configured rest days)
        var isOffDay = await _settingsRepository.IsOffDayAsync(date, branchId, cancellationToken);
        if (isOffDay)
        {
            return DayType.OffDay;
        }

        // Check if weekend should be treated as off day
        if (config.WeekendAsOffDay && (date.DayOfWeek == DayOfWeek.Saturday || date.DayOfWeek == DayOfWeek.Sunday))
        {
            return DayType.OffDay;
        }

        // Default to normal day
        return DayType.Normal;
    }

    public async Task<decimal> GetOvertimeRateAsync(DateTime date, long branchId, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);
        var dayType = await GetDayTypeAsync(date, branchId, cancellationToken);

        return config.GetOvertimeRate(dayType);
    }

    public (bool IsValid, List<string> Errors) ValidateConfiguration(OvertimeConfiguration configuration)
    {
        if (configuration == null)
        {
            return (false, new List<string> { "Configuration cannot be null" });
        }

        var (isValid, errors) = configuration.ValidateConfiguration();

        // Additional business validations
        if (configuration.IsActive && configuration.EffectiveFromDate > DateTime.UtcNow.AddDays(30))
        {
            errors.Add("Active configuration cannot have effective date more than 30 days in the future");
        }

        return (errors.Count == 0, errors);
    }

    public OvertimeConfiguration CreateDefaultConfiguration()
    {
        return new OvertimeConfiguration
        {
            EnablePreShiftOvertime = false,
            EnablePostShiftOvertime = true,
            NormalDayRate = 1.5m,
            PublicHolidayRate = 2.0m,
            OffDayRate = 2.5m,
            MinimumOvertimeMinutes = 15,
            ConsiderFlexibleTime = true,
            MaxPreShiftOvertimeHours = 2.0m,
            MaxPostShiftOvertimeHours = 4.0m,
            RequireApproval = false,
            OvertimeGracePeriodMinutes = 5,
            WeekendAsOffDay = true,
            RoundingIntervalMinutes = 1,
            PolicyNotes = "Default overtime configuration with standard rates and policies.",
            IsActive = true,
            EffectiveFromDate = DateTime.UtcNow,
            EffectiveToDate = null,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "System",
            IsDeleted = false
        };
    }

    public async Task<bool> IsOvertimeEnabledAsync(DateTime date, bool isPreShift, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);

        return isPreShift ? config.EnablePreShiftOvertime : config.EnablePostShiftOvertime;
    }

    public async Task<decimal> RoundOvertimeHoursAsync(decimal overtimeHours, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);

        return config.RoundOvertimeHours(overtimeHours);
    }

    public async Task<bool> MeetsMinimumThresholdAsync(int overtimeMinutes, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);

        return config.MeetsMinimumThreshold(overtimeMinutes);
    }

    public async Task<decimal> GetMaxOvertimeHoursAsync(bool isPreShift, CancellationToken cancellationToken = default)
    {
        var config = await GetActiveConfigurationAsync(cancellationToken);

        return isPreShift ? config.MaxPreShiftOvertimeHours : config.MaxPostShiftOvertimeHours;
    }

    public async Task SeedDefaultConfigurationAsync(CancellationToken cancellationToken = default)
    {
        var existingConfig = await _settingsRepository.GetActiveOvertimeConfigurationAsync(cancellationToken);

        if (existingConfig == null)
        {
            _logger.LogInformation("No active overtime configuration found, seeding default configuration");

            var defaultConfig = CreateDefaultConfiguration();
            await _settingsRepository.CreateOvertimeConfigurationAsync(defaultConfig, cancellationToken);

            _logger.LogInformation("Successfully seeded default overtime configuration");
        }
        else
        {
            _logger.LogDebug("Active overtime configuration already exists, skipping seed");
        }
    }
}