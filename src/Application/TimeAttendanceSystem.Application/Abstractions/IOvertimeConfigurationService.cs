using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for managing overtime configurations and providing business logic
/// for overtime calculation rules and policies.
/// </summary>
public interface IOvertimeConfigurationService
{
    /// <summary>
    /// Gets the currently active overtime configuration with caching.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The active overtime configuration, or a default configuration if none exists</returns>
    Task<OvertimeConfiguration> GetActiveConfigurationAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new overtime configuration with validation.
    /// </summary>
    /// <param name="configuration">Configuration to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created configuration</returns>
    Task<OvertimeConfiguration> CreateConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing overtime configuration with validation.
    /// </summary>
    /// <param name="configuration">Configuration to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated configuration</returns>
    Task<OvertimeConfiguration> UpdateConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default);

    /// <summary>
    /// Activates a specific configuration and deactivates all others.
    /// </summary>
    /// <param name="configurationId">ID of the configuration to activate</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if activation was successful</returns>
    Task<bool> ActivateConfigurationAsync(long configurationId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all overtime configurations with pagination.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of configurations</returns>
    Task<(IEnumerable<OvertimeConfiguration> Items, int TotalCount)> GetConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets an overtime configuration by ID.
    /// </summary>
    /// <param name="id">Configuration ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The configuration, or null if not found</returns>
    Task<OvertimeConfiguration?> GetConfigurationByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Determines the day type (Normal, PublicHoliday, OffDay) for a specific date and branch.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Branch ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The day type for the specified date</returns>
    Task<DayType> GetDayTypeAsync(DateTime date, long branchId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the effective overtime rate multiplier for a specific date and branch.
    /// </summary>
    /// <param name="date">Date to get the rate for</param>
    /// <param name="branchId">Branch ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The overtime rate multiplier for the date</returns>
    Task<decimal> GetOvertimeRateAsync(DateTime date, long branchId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates an overtime configuration according to business rules.
    /// </summary>
    /// <param name="configuration">Configuration to validate</param>
    /// <returns>Validation result with errors if any</returns>
    (bool IsValid, List<string> Errors) ValidateConfiguration(OvertimeConfiguration configuration);

    /// <summary>
    /// Creates a default overtime configuration with standard settings.
    /// </summary>
    /// <returns>Default overtime configuration</returns>
    OvertimeConfiguration CreateDefaultConfiguration();

    /// <summary>
    /// Checks if overtime calculation is enabled for the given date and time.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="isPreShift">Whether this is pre-shift overtime</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if overtime calculation is enabled</returns>
    Task<bool> IsOvertimeEnabledAsync(DateTime date, bool isPreShift, CancellationToken cancellationToken = default);

    /// <summary>
    /// Rounds overtime hours according to the active configuration's rounding rules.
    /// </summary>
    /// <param name="overtimeHours">Raw overtime hours</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Rounded overtime hours</returns>
    Task<decimal> RoundOvertimeHoursAsync(decimal overtimeHours, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if the overtime amount meets the minimum threshold requirement.
    /// </summary>
    /// <param name="overtimeMinutes">Overtime amount in minutes</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if overtime meets minimum threshold</returns>
    Task<bool> MeetsMinimumThresholdAsync(int overtimeMinutes, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the maximum allowed overtime hours for a specific type (pre-shift or post-shift).
    /// </summary>
    /// <param name="isPreShift">Whether to get pre-shift or post-shift maximum</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Maximum overtime hours allowed</returns>
    Task<decimal> GetMaxOvertimeHoursAsync(bool isPreShift, CancellationToken cancellationToken = default);

    /// <summary>
    /// Seeds the database with a default overtime configuration if none exists.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Task representing the operation</returns>
    Task SeedDefaultConfigurationAsync(CancellationToken cancellationToken = default);
}