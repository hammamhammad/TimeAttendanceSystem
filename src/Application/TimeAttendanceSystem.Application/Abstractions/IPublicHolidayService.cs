using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Application.Abstractions;

/// <summary>
/// Service interface for managing public holidays and providing business logic
/// for holiday calendar management and integration with attendance calculations.
/// </summary>
public interface IPublicHolidayService
{
    /// <summary>
    /// Gets all public holidays with optional filtering.
    /// </summary>
    /// <param name="year">Optional year to filter holidays</param>
    /// <param name="branchId">Optional branch ID to filter regional holidays</param>
    /// <param name="includeInactive">Whether to include inactive holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Collection of holidays matching the criteria</returns>
    Task<IEnumerable<PublicHoliday>> GetHolidaysAsync(
        int? year = null,
        long? branchId = null,
        bool includeInactive = false,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets a public holiday by its unique identifier.
    /// </summary>
    /// <param name="id">Holiday ID</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The holiday if found, null otherwise</returns>
    Task<PublicHoliday?> GetHolidayByIdAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Creates a new public holiday with validation.
    /// </summary>
    /// <param name="holiday">Holiday to create</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The created holiday</returns>
    Task<PublicHoliday> CreateHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing public holiday with validation.
    /// </summary>
    /// <param name="holiday">Holiday to update</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>The updated holiday</returns>
    Task<PublicHoliday> UpdateHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default);

    /// <summary>
    /// Deletes a public holiday by its identifier.
    /// </summary>
    /// <param name="id">Holiday ID to delete</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if deleted successfully, false if not found</returns>
    Task<bool> DeleteHolidayAsync(long id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks if a specific date is a public holiday for a given branch.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Branch ID for regional holiday checking</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if the date is a holiday, false otherwise</returns>
    Task<bool> IsHolidayAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets the holiday information for a specific date and branch.
    /// </summary>
    /// <param name="date">Date to check</param>
    /// <param name="branchId">Branch ID for regional holiday checking</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Holiday information if the date is a holiday, null otherwise</returns>
    Task<PublicHoliday?> GetHolidayForDateAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default);

    /// <summary>
    /// Generates a holiday calendar for a specific year and branch.
    /// </summary>
    /// <param name="year">Year to generate calendar for</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Dictionary of dates and their corresponding holidays</returns>
    Task<Dictionary<DateTime, List<PublicHoliday>>> GetHolidayCalendarAsync(
        int year,
        long? branchId = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets all holiday dates for a specific month and branch.
    /// </summary>
    /// <param name="year">Year</param>
    /// <param name="month">Month (1-12)</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Collection of holiday dates in the specified month</returns>
    Task<IEnumerable<DateTime>> GetHolidayDatesForMonthAsync(
        int year,
        int month,
        long? branchId = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Validates a holiday configuration according to business rules.
    /// </summary>
    /// <param name="holiday">Holiday to validate</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Validation result with errors if any</returns>
    Task<(bool IsValid, List<string> Errors)> ValidateHolidayAsync(
        PublicHoliday holiday,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Checks for conflicts between holidays on the same date.
    /// </summary>
    /// <param name="holiday">Holiday to check for conflicts</param>
    /// <param name="year">Year to check conflicts for</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Collection of conflicting holidays</returns>
    Task<IEnumerable<PublicHoliday>> GetConflictingHolidaysAsync(
        PublicHoliday holiday,
        int year,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Activates or deactivates a holiday.
    /// </summary>
    /// <param name="id">Holiday ID</param>
    /// <param name="isActive">New active status</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if status changed successfully</returns>
    Task<bool> SetHolidayActiveStatusAsync(long id, bool isActive, CancellationToken cancellationToken = default);

    /// <summary>
    /// Gets holidays with pagination support.
    /// </summary>
    /// <param name="page">Page number (1-based)</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <param name="searchTerm">Optional search term</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="holidayType">Optional holiday type filter</param>
    /// <param name="isActive">Optional active status filter</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Paginated list of holidays with total count</returns>
    Task<(IEnumerable<PublicHoliday> Items, int TotalCount)> GetHolidaysPagedAsync(
        int page = 1,
        int pageSize = 10,
        string? searchTerm = null,
        long? branchId = null,
        HolidayType? holidayType = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Imports holidays from a predefined template.
    /// </summary>
    /// <param name="countryCode">Country code for holiday template</param>
    /// <param name="year">Year to import holidays for</param>
    /// <param name="branchId">Optional branch ID for regional holidays</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Number of holidays imported</returns>
    Task<int> ImportHolidayTemplateAsync(
        string countryCode,
        int year,
        long? branchId = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Exports holidays to a specific format.
    /// </summary>
    /// <param name="year">Year to export</param>
    /// <param name="branchId">Optional branch filter</param>
    /// <param name="format">Export format (ical, csv, json)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Exported data as byte array</returns>
    Task<byte[]> ExportHolidaysAsync(
        int year,
        long? branchId = null,
        string format = "json",
        CancellationToken cancellationToken = default);
}