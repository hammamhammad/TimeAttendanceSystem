using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Repository interface for managing system settings including overtime configuration,
/// public holidays, and off day configurations.
/// </summary>
public interface ISettingsRepository
{
    #region Overtime Configuration

    /// <summary>
    /// Gets the currently active overtime configuration.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The active overtime configuration, or null if none exists</returns>
    Task<OvertimeConfiguration?> GetActiveOvertimeConfigurationAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets an overtime configuration by ID.
    /// </summary>
    /// <param name="id">Configuration ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The overtime configuration, or null if not found</returns>
    Task<OvertimeConfiguration?> GetOvertimeConfigurationByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all overtime configurations with pagination.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of overtime configurations</returns>
    Task<(IEnumerable<OvertimeConfiguration> Items, int TotalCount)> GetOvertimeConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new overtime configuration.
    /// </summary>
    /// <param name="configuration">The overtime configuration to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created overtime configuration</returns>
    Task<OvertimeConfiguration> CreateOvertimeConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing overtime configuration.
    /// </summary>
    /// <param name="configuration">The overtime configuration to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated overtime configuration</returns>
    Task<OvertimeConfiguration> UpdateOvertimeConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default);

    /// <summary>
    /// Activates an overtime configuration and deactivates all others.
    /// </summary>
    /// <param name="id">Configuration ID to activate</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if activation was successful</returns>
    Task<bool> ActivateOvertimeConfigurationAsync(long id, CancellationToken cancellationToken = default);

    #endregion

    #region Public Holidays

    /// <summary>
    /// Gets all active public holidays for a specific date range.
    /// </summary>
    /// <param name="startDate">Start date of the range</param>
    /// <param name="endDate">End date of the range</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of public holidays in the date range</returns>
    Task<IEnumerable<PublicHoliday>> GetPublicHolidaysInRangeAsync(
        DateTime startDate,
        DateTime endDate,
        long? branchId = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a public holiday by ID.
    /// </summary>
    /// <param name="id">Holiday ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The public holiday, or null if not found</returns>
    Task<PublicHoliday?> GetPublicHolidayByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all public holidays with pagination and filtering.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="branchId">Optional branch ID filter</param>
    /// <param name="isActive">Optional active status filter</param>
    /// <param name="year">Optional year filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of public holidays</returns>
    Task<(IEnumerable<PublicHoliday> Items, int TotalCount)> GetPublicHolidaysAsync(
        int page = 1,
        int pageSize = 10,
        long? branchId = null,
        bool? isActive = null,
        int? year = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new public holiday.
    /// </summary>
    /// <param name="holiday">The public holiday to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created public holiday</returns>
    Task<PublicHoliday> CreatePublicHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing public holiday.
    /// </summary>
    /// <param name="holiday">The public holiday to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated public holiday</returns>
    Task<PublicHoliday> UpdatePublicHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes a public holiday.
    /// </summary>
    /// <param name="id">Holiday ID to delete</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if deletion was successful</returns>
    Task<bool> DeletePublicHolidayAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if a specific date is a public holiday.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if the date is a public holiday</returns>
    Task<bool> IsPublicHolidayAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default);

    #endregion

    #region Off Days

    /// <summary>
    /// Gets all active off day configurations for a specific branch.
    /// </summary>
    /// <param name="branchId">Branch ID (null for company-wide configurations)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>List of active off day configurations</returns>
    Task<IEnumerable<OffDay>> GetActiveOffDayConfigurationsAsync(long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets an off day configuration by ID.
    /// </summary>
    /// <param name="id">Configuration ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The off day configuration, or null if not found</returns>
    Task<OffDay?> GetOffDayConfigurationByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all off day configurations with pagination and filtering.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="branchId">Optional branch ID filter</param>
    /// <param name="isActive">Optional active status filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of off day configurations</returns>
    Task<(IEnumerable<OffDay> Items, int TotalCount)> GetOffDayConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        long? branchId = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new off day configuration.
    /// </summary>
    /// <param name="offDay">The off day configuration to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created off day configuration</returns>
    Task<OffDay> CreateOffDayConfigurationAsync(OffDay offDay, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing off day configuration.
    /// </summary>
    /// <param name="offDay">The off day configuration to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated off day configuration</returns>
    Task<OffDay> UpdateOffDayConfigurationAsync(OffDay offDay, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes an off day configuration.
    /// </summary>
    /// <param name="id">Configuration ID to delete</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if deletion was successful</returns>
    Task<bool> DeleteOffDayConfigurationAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if a specific date is an off day.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Branch ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if the date is an off day</returns>
    Task<bool> IsOffDayAsync(DateTime date, long branchId, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the day type (Normal, PublicHoliday, OffDay) for a specific date.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Branch ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The day type for the specified date</returns>
    Task<DayType> GetDayTypeAsync(DateTime date, long branchId, CancellationToken cancellationToken = default);

    #endregion
}