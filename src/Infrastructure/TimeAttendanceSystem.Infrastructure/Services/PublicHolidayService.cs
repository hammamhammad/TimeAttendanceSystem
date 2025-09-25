using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Settings;
using System.Text.Json;

namespace TimeAttendanceSystem.Infrastructure.Services;

/// <summary>
/// Service implementation for managing public holidays and providing business logic
/// for holiday calendar management and integration with attendance calculations.
/// </summary>
/// <remarks>
/// PublicHolidayService Features:
/// - Comprehensive CRUD operations for holiday management
/// - Complex recurrence pattern calculations and validations
/// - Holiday calendar generation with efficient caching
/// - Branch-specific and national holiday support
/// - Import/export functionality for holiday templates
/// - Integration with overtime calculation system
/// - Multi-format export support (JSON, CSV, iCal)
/// - Conflict detection and resolution for overlapping holidays
/// - Advanced pagination and filtering capabilities
/// </remarks>
public class PublicHolidayService : IPublicHolidayService
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<PublicHolidayService> _logger;

    public PublicHolidayService(
        IApplicationDbContext context,
        ILogger<PublicHolidayService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Gets all public holidays with optional filtering and efficient querying.
    /// </summary>
    public async Task<IEnumerable<PublicHoliday>> GetHolidaysAsync(
        int? year = null,
        long? branchId = null,
        bool includeInactive = false,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var query = _context.PublicHolidays.AsQueryable();

            // Apply branch filtering
            if (branchId.HasValue)
            {
                query = query.Where(h => h.IsNational || h.BranchId == branchId.Value);
            }

            // Apply active status filtering
            if (!includeInactive)
            {
                query = query.Where(h => h.IsActive);
            }

            // Apply year filtering for applicable holiday types
            if (year.HasValue)
            {
                query = query.Where(h =>
                    // One-time holidays in the specified year
                    (h.HolidayType == HolidayType.OneTime && h.SpecificDate.HasValue && h.SpecificDate.Value.Year == year) ||
                    // Recurring holidays that are effective for the year
                    (h.HolidayType != HolidayType.OneTime &&
                     (!h.EffectiveFromYear.HasValue || h.EffectiveFromYear.Value <= year) &&
                     (!h.EffectiveToYear.HasValue || h.EffectiveToYear.Value >= year)));
            }

            var holidays = await query
                .OrderBy(h => h.Priority)
                .ThenBy(h => h.Name)
                .ToListAsync(cancellationToken);

            _logger.LogInformation("Retrieved {Count} holidays with filters: Year={Year}, BranchId={BranchId}, IncludeInactive={IncludeInactive}",
                holidays.Count, year, branchId, includeInactive);

            return holidays;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving holidays with filters: Year={Year}, BranchId={BranchId}", year, branchId);
            throw;
        }
    }

    /// <summary>
    /// Gets a specific public holiday by its identifier with detailed logging.
    /// </summary>
    public async Task<PublicHoliday?> GetHolidayByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            var holiday = await _context.PublicHolidays
                .FirstOrDefaultAsync(h => h.Id == id, cancellationToken);

            if (holiday == null)
            {
                _logger.LogWarning("Holiday with ID {HolidayId} not found", id);
            }
            else
            {
                _logger.LogDebug("Retrieved holiday: {HolidayName} (ID: {HolidayId})", holiday.Name, id);
            }

            return holiday;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving holiday with ID {HolidayId}", id);
            throw;
        }
    }

    /// <summary>
    /// Creates a new public holiday with comprehensive validation and conflict checking.
    /// </summary>
    public async Task<PublicHoliday> CreateHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default)
    {
        try
        {
            // Validate holiday configuration
            var (isValid, errors) = await ValidateHolidayAsync(holiday, cancellationToken);
            if (!isValid)
            {
                var errorMessage = string.Join(", ", errors);
                _logger.LogWarning("Holiday validation failed: {Errors}", errorMessage);
                throw new ArgumentException($"Holiday validation failed: {errorMessage}");
            }

            // Check for conflicts if this is a new holiday
            if (holiday.HolidayType != HolidayType.OneTime)
            {
                var currentYear = DateTime.Now.Year;
                var conflicts = await GetConflictingHolidaysAsync(holiday, currentYear, cancellationToken);
                if (conflicts.Any())
                {
                    _logger.LogWarning("Holiday conflicts detected for {HolidayName}: {ConflictCount} conflicts",
                        holiday.Name, conflicts.Count());
                }
            }

            // Set creation metadata - PublicHoliday inherits CreatedAt from BaseEntity

            _context.PublicHolidays.Add(holiday);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Created new holiday: {HolidayName} (ID: {HolidayId}, Type: {HolidayType})",
                holiday.Name, holiday.Id, holiday.HolidayType);

            return holiday;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating holiday: {HolidayName}", holiday.Name);
            throw;
        }
    }

    /// <summary>
    /// Updates an existing public holiday with validation and conflict checking.
    /// </summary>
    public async Task<PublicHoliday> UpdateHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default)
    {
        try
        {
            var existingHoliday = await GetHolidayByIdAsync(holiday.Id, cancellationToken);
            if (existingHoliday == null)
            {
                throw new ArgumentException($"Holiday with ID {holiday.Id} not found");
            }

            // Validate updated holiday configuration
            var (isValid, errors) = await ValidateHolidayAsync(holiday, cancellationToken);
            if (!isValid)
            {
                var errorMessage = string.Join(", ", errors);
                _logger.LogWarning("Holiday update validation failed: {Errors}", errorMessage);
                throw new ArgumentException($"Holiday validation failed: {errorMessage}");
            }

            // Update properties
            existingHoliday.Name = holiday.Name;
            existingHoliday.NameAr = holiday.NameAr;
            existingHoliday.SpecificDate = holiday.SpecificDate;
            existingHoliday.Month = holiday.Month;
            existingHoliday.Day = holiday.Day;
            existingHoliday.HolidayType = holiday.HolidayType;
            existingHoliday.IsActive = holiday.IsActive;
            existingHoliday.IsNational = holiday.IsNational;
            existingHoliday.BranchId = holiday.BranchId;
            existingHoliday.Description = holiday.Description;
            existingHoliday.EffectiveFromYear = holiday.EffectiveFromYear;
            existingHoliday.EffectiveToYear = holiday.EffectiveToYear;
            existingHoliday.DayOfWeek = holiday.DayOfWeek;
            existingHoliday.WeekOccurrence = holiday.WeekOccurrence;
            existingHoliday.CountryCode = holiday.CountryCode;
            existingHoliday.Priority = holiday.Priority;
            // UpdatedAt will be automatically set by BaseEntity

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Updated holiday: {HolidayName} (ID: {HolidayId})", existingHoliday.Name, existingHoliday.Id);

            return existingHoliday;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating holiday: {HolidayId}", holiday.Id);
            throw;
        }
    }

    /// <summary>
    /// Deletes a public holiday by its identifier with proper cleanup.
    /// </summary>
    public async Task<bool> DeleteHolidayAsync(long id, CancellationToken cancellationToken = default)
    {
        try
        {
            var holiday = await GetHolidayByIdAsync(id, cancellationToken);
            if (holiday == null)
            {
                _logger.LogWarning("Attempted to delete non-existent holiday with ID {HolidayId}", id);
                return false;
            }

            _context.PublicHolidays.Remove(holiday);
            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Deleted holiday: {HolidayName} (ID: {HolidayId})", holiday.Name, id);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting holiday with ID {HolidayId}", id);
            throw;
        }
    }

    /// <summary>
    /// Efficiently checks if a specific date is a public holiday for a given branch.
    /// </summary>
    public async Task<bool> IsHolidayAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default)
    {
        try
        {
            var holiday = await GetHolidayForDateAsync(date, branchId, cancellationToken);
            return holiday != null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if date {Date} is a holiday for branch {BranchId}", date, branchId);
            throw;
        }
    }

    /// <summary>
    /// Gets detailed holiday information for a specific date and branch.
    /// </summary>
    public async Task<PublicHoliday?> GetHolidayForDateAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Checking for holidays on date {Date} for branch {BranchId}", date.ToString("yyyy-MM-dd"), branchId);

            var query = _context.PublicHolidays
                .Where(h => h.IsActive);

            // Apply branch filtering
            if (branchId.HasValue)
            {
                query = query.Where(h => h.IsNational || h.BranchId == branchId.Value);
            }

            var holidays = await query.ToListAsync(cancellationToken);
            _logger.LogInformation("Found {HolidayCount} active holidays to check", holidays.Count);

            // Check each holiday to see if it matches the given date
            foreach (var holiday in holidays)
            {
                _logger.LogInformation("Checking holiday '{HolidayName}' (Type: {HolidayType}, SpecificDate: {SpecificDate}) against date {Date}",
                    holiday.Name, holiday.HolidayType, holiday.SpecificDate?.ToString("yyyy-MM-dd") ?? "null", date.ToString("yyyy-MM-dd"));

                if (DoesHolidayMatchDate(holiday, date))
                {
                    _logger.LogInformation("MATCH FOUND: Holiday '{HolidayName}' matches date {Date}", holiday.Name, date.ToString("yyyy-MM-dd"));
                    return holiday;
                }
                else
                {
                    _logger.LogInformation("No match: Holiday '{HolidayName}' does not match date {Date}", holiday.Name, date.ToString("yyyy-MM-dd"));
                }
            }

            _logger.LogInformation("No holidays found for date {Date}", date.ToString("yyyy-MM-dd"));
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting holiday for date {Date} and branch {BranchId}", date, branchId);
            throw;
        }
    }

    /// <summary>
    /// Generates a comprehensive holiday calendar for efficient bulk operations.
    /// </summary>
    public async Task<Dictionary<DateTime, List<PublicHoliday>>> GetHolidayCalendarAsync(
        int year,
        long? branchId = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var holidays = await GetHolidaysAsync(year, branchId, false, cancellationToken);
            var calendar = new Dictionary<DateTime, List<PublicHoliday>>();

            foreach (var holiday in holidays)
            {
                var dates = GetHolidayDatesForYear(holiday, year);
                foreach (var date in dates)
                {
                    if (!calendar.ContainsKey(date))
                    {
                        calendar[date] = new List<PublicHoliday>();
                    }
                    calendar[date].Add(holiday);
                }
            }

            // Sort holidays by priority for each date
            foreach (var dateHolidays in calendar.Values)
            {
                dateHolidays.Sort((h1, h2) => h2.Priority.CompareTo(h1.Priority));
            }

            _logger.LogInformation("Generated holiday calendar for year {Year} with {HolidayCount} holiday dates",
                year, calendar.Count);

            return calendar;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating holiday calendar for year {Year}", year);
            throw;
        }
    }

    /// <summary>
    /// Gets all holiday dates for a specific month with optimized processing.
    /// </summary>
    public async Task<IEnumerable<DateTime>> GetHolidayDatesForMonthAsync(
        int year,
        int month,
        long? branchId = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var holidays = await GetHolidaysAsync(year, branchId, false, cancellationToken);
            var dates = new List<DateTime>();

            foreach (var holiday in holidays)
            {
                var holidayDates = GetHolidayDatesForMonth(holiday, year, month);
                dates.AddRange(holidayDates);
            }

            var sortedDates = dates.Distinct().OrderBy(d => d).ToList();

            _logger.LogDebug("Found {Count} holiday dates for {Year}-{Month:D2}", sortedDates.Count, year, month);

            return sortedDates;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting holiday dates for {Year}-{Month:D2}", year, month);
            throw;
        }
    }

    /// <summary>
    /// Validates a holiday configuration with comprehensive business rule checking.
    /// </summary>
    public async Task<(bool IsValid, List<string> Errors)> ValidateHolidayAsync(
        PublicHoliday holiday,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var errors = new List<string>();

            // Basic validation from domain entity
            var (isBasicValid, basicErrors) = holiday.ValidateHoliday();
            errors.AddRange(basicErrors);

            // Additional business rule validations
            if (!holiday.IsNational && !holiday.BranchId.HasValue)
            {
                errors.Add("Branch ID is required for regional holidays");
            }

            if (holiday.BranchId.HasValue && holiday.IsNational)
            {
                errors.Add("National holidays cannot be assigned to a specific branch");
            }

            // Check for duplicate names (excluding the current holiday if updating)
            var existingHoliday = await _context.PublicHolidays
                .Where(h => h.Name == holiday.Name && h.Id != holiday.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (existingHoliday != null)
            {
                errors.Add($"A holiday with the name '{holiday.Name}' already exists");
            }

            // Validate branch existence if specified
            if (holiday.BranchId.HasValue)
            {
                var branchExists = await _context.Branches
                    .AnyAsync(b => b.Id == holiday.BranchId.Value, cancellationToken);

                if (!branchExists)
                {
                    errors.Add($"Branch with ID {holiday.BranchId.Value} does not exist");
                }
            }

            return (errors.Count == 0, errors);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating holiday: {HolidayName}", holiday.Name);
            throw;
        }
    }

    /// <summary>
    /// Detects conflicts between holidays on the same dates with detailed analysis.
    /// </summary>
    public async Task<IEnumerable<PublicHoliday>> GetConflictingHolidaysAsync(
        PublicHoliday holiday,
        int year,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var existingHolidays = await GetHolidaysAsync(year, holiday.BranchId, false, cancellationToken);
            var conflicts = new List<PublicHoliday>();

            var holidayDates = GetHolidayDatesForYear(holiday, year);

            foreach (var existingHoliday in existingHolidays.Where(h => h.Id != holiday.Id))
            {
                var existingDates = GetHolidayDatesForYear(existingHoliday, year);
                if (holidayDates.Any(d1 => existingDates.Any(d2 => d1.Date == d2.Date)))
                {
                    conflicts.Add(existingHoliday);
                }
            }

            if (conflicts.Any())
            {
                _logger.LogInformation("Found {ConflictCount} conflicting holidays for {HolidayName} in year {Year}",
                    conflicts.Count, holiday.Name, year);
            }

            return conflicts;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking for conflicting holidays for {HolidayName} in year {Year}", holiday.Name, year);
            throw;
        }
    }

    /// <summary>
    /// Updates the active status of a holiday with proper validation.
    /// </summary>
    public async Task<bool> SetHolidayActiveStatusAsync(long id, bool isActive, CancellationToken cancellationToken = default)
    {
        try
        {
            var holiday = await GetHolidayByIdAsync(id, cancellationToken);
            if (holiday == null)
            {
                return false;
            }

            holiday.IsActive = isActive;
            // UpdatedAt will be automatically set by BaseEntity

            await _context.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("Updated holiday {HolidayName} active status to {IsActive}", holiday.Name, isActive);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating active status for holiday ID {HolidayId}", id);
            throw;
        }
    }

    /// <summary>
    /// Gets holidays with advanced pagination and filtering capabilities.
    /// </summary>
    public async Task<(IEnumerable<PublicHoliday> Items, int TotalCount)> GetHolidaysPagedAsync(
        int page = 1,
        int pageSize = 10,
        string? searchTerm = null,
        long? branchId = null,
        HolidayType? holidayType = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var query = _context.PublicHolidays.AsQueryable();

            // Apply search filter
            if (!string.IsNullOrWhiteSpace(searchTerm))
            {
                var lowerSearchTerm = searchTerm.ToLower();
                query = query.Where(h =>
                    h.Name.ToLower().Contains(lowerSearchTerm) ||
                    (h.NameAr != null && h.NameAr.ToLower().Contains(lowerSearchTerm)) ||
                    (h.Description != null && h.Description.ToLower().Contains(lowerSearchTerm)));
            }

            // Apply branch filter
            if (branchId.HasValue)
            {
                query = query.Where(h => h.IsNational || h.BranchId == branchId.Value);
            }

            // Apply holiday type filter
            if (holidayType.HasValue)
            {
                query = query.Where(h => h.HolidayType == holidayType.Value);
            }

            // Apply active status filter
            if (isActive.HasValue)
            {
                query = query.Where(h => h.IsActive == isActive.Value);
            }

            var totalCount = await query.CountAsync(cancellationToken);

            var items = await query
                .OrderBy(h => h.Priority)
                .ThenBy(h => h.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(cancellationToken);

            _logger.LogDebug("Retrieved page {Page} of holidays (PageSize: {PageSize}, Total: {TotalCount})",
                page, pageSize, totalCount);

            return (items, totalCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving paged holidays");
            throw;
        }
    }

    /// <summary>
    /// Imports holidays from predefined templates with validation and conflict handling.
    /// </summary>
    public async Task<int> ImportHolidayTemplateAsync(
        string countryCode,
        int year,
        long? branchId = null,
        CancellationToken cancellationToken = default)
    {
        try
        {
            var templateHolidays = GetHolidayTemplate(countryCode, year);
            var importedCount = 0;

            foreach (var template in templateHolidays)
            {
                template.BranchId = branchId;
                template.IsNational = !branchId.HasValue;

                // Check if holiday already exists
                var existing = await _context.PublicHolidays
                    .Where(h => h.Name == template.Name &&
                               h.HolidayType == template.HolidayType &&
                               (h.IsNational || h.BranchId == branchId))
                    .FirstOrDefaultAsync(cancellationToken);

                if (existing == null)
                {
                    await CreateHolidayAsync(template, cancellationToken);
                    importedCount++;
                }
                else
                {
                    _logger.LogDebug("Skipped existing holiday: {HolidayName}", template.Name);
                }
            }

            _logger.LogInformation("Imported {ImportedCount} holidays for country {CountryCode} and year {Year}",
                importedCount, countryCode, year);

            return importedCount;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error importing holiday template for country {CountryCode} and year {Year}", countryCode, year);
            throw;
        }
    }

    /// <summary>
    /// Exports holidays to various formats with comprehensive data serialization.
    /// </summary>
    public async Task<byte[]> ExportHolidaysAsync(
        int year,
        long? branchId = null,
        string format = "json",
        CancellationToken cancellationToken = default)
    {
        try
        {
            var holidays = await GetHolidaysAsync(year, branchId, false, cancellationToken);

            var exportData = format.ToLower() switch
            {
                "json" => ExportToJson(holidays, year),
                "csv" => ExportToCsv(holidays, year),
                "ical" => ExportToICal(holidays, year),
                _ => throw new ArgumentException($"Unsupported export format: {format}")
            };

            _logger.LogInformation("Exported {HolidayCount} holidays for year {Year} in {Format} format",
                holidays.Count(), year, format.ToUpper());

            return exportData;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error exporting holidays for year {Year} in format {Format}", year, format);
            throw;
        }
    }

    #region Private Helper Methods

    private bool DoesHolidayMatchDate(PublicHoliday holiday, DateTime date)
    {
        var year = date.Year;
        _logger.LogInformation("DoesHolidayMatchDate: Checking holiday '{HolidayName}' for year {Year}", holiday.Name, year);

        var holidayDate = holiday.GetHolidayDateForYear(year);
        _logger.LogInformation("DoesHolidayMatchDate: GetHolidayDateForYear returned {HolidayDate} for holiday '{HolidayName}'",
            holidayDate?.ToString("yyyy-MM-dd") ?? "null", holiday.Name);

        if (holidayDate.HasValue && holidayDate.Value.Date == date.Date)
        {
            _logger.LogInformation("DoesHolidayMatchDate: MATCH - Holiday '{HolidayName}' matches date {Date}", holiday.Name, date.ToString("yyyy-MM-dd"));
            return true;
        }

        // Check monthly holidays
        if (holiday.HolidayType == HolidayType.Monthly)
        {
            _logger.LogInformation("DoesHolidayMatchDate: Checking monthly holiday '{HolidayName}' for month {Month}", holiday.Name, date.Month);
            var monthlyDates = holiday.GetHolidayDatesForMonth(year, date.Month);
            var monthlyMatch = monthlyDates.Any(d => d.Date == date.Date);
            _logger.LogInformation("DoesHolidayMatchDate: Monthly check for '{HolidayName}' returned {Result}", holiday.Name, monthlyMatch);
            return monthlyMatch;
        }

        _logger.LogInformation("DoesHolidayMatchDate: No match for holiday '{HolidayName}' and date {Date}", holiday.Name, date.ToString("yyyy-MM-dd"));
        return false;
    }

    private IEnumerable<DateTime> GetHolidayDatesForYear(PublicHoliday holiday, int year)
    {
        var dates = new List<DateTime>();

        if (holiday.HolidayType == HolidayType.Monthly)
        {
            for (int month = 1; month <= 12; month++)
            {
                dates.AddRange(holiday.GetHolidayDatesForMonth(year, month));
            }
        }
        else
        {
            var date = holiday.GetHolidayDateForYear(year);
            if (date.HasValue)
            {
                dates.Add(date.Value);
            }
        }

        return dates;
    }

    private IEnumerable<DateTime> GetHolidayDatesForMonth(PublicHoliday holiday, int year, int month)
    {
        if (holiday.HolidayType == HolidayType.Monthly)
        {
            return holiday.GetHolidayDatesForMonth(year, month);
        }
        else
        {
            var date = holiday.GetHolidayDateForYear(year);
            if (date.HasValue && date.Value.Month == month)
            {
                return new[] { date.Value };
            }
        }

        return Enumerable.Empty<DateTime>();
    }

    private List<PublicHoliday> GetHolidayTemplate(string countryCode, int year)
    {
        // This would typically load from a data source or configuration
        // For now, providing basic templates for common countries
        return countryCode.ToUpper() switch
        {
            "US" => GetUSHolidayTemplate(year),
            "UK" => GetUKHolidayTemplate(year),
            "SA" => GetSaudiArabiaHolidayTemplate(year),
            _ => new List<PublicHoliday>()
        };
    }

    private List<PublicHoliday> GetUSHolidayTemplate(int year)
    {
        return new List<PublicHoliday>
        {
            new() { Name = "New Year's Day", HolidayType = HolidayType.Annual, Month = 1, Day = 1, IsNational = true, Priority = 1 },
            new() { Name = "Independence Day", HolidayType = HolidayType.Annual, Month = 7, Day = 4, IsNational = true, Priority = 1 },
            new() { Name = "Christmas Day", HolidayType = HolidayType.Annual, Month = 12, Day = 25, IsNational = true, Priority = 1 },
            new() { Name = "Martin Luther King Jr. Day", HolidayType = HolidayType.Floating, Month = 1, DayOfWeek = DayOfWeek.Monday, WeekOccurrence = 3, IsNational = true, Priority = 2 },
            new() { Name = "Memorial Day", HolidayType = HolidayType.Floating, Month = 5, DayOfWeek = DayOfWeek.Monday, WeekOccurrence = -1, IsNational = true, Priority = 2 },
            new() { Name = "Labor Day", HolidayType = HolidayType.Floating, Month = 9, DayOfWeek = DayOfWeek.Monday, WeekOccurrence = 1, IsNational = true, Priority = 2 },
            new() { Name = "Thanksgiving", HolidayType = HolidayType.Floating, Month = 11, DayOfWeek = DayOfWeek.Thursday, WeekOccurrence = 4, IsNational = true, Priority = 1 }
        };
    }

    private List<PublicHoliday> GetUKHolidayTemplate(int year)
    {
        return new List<PublicHoliday>
        {
            new() { Name = "New Year's Day", HolidayType = HolidayType.Annual, Month = 1, Day = 1, IsNational = true, Priority = 1 },
            new() { Name = "Christmas Day", HolidayType = HolidayType.Annual, Month = 12, Day = 25, IsNational = true, Priority = 1 },
            new() { Name = "Boxing Day", HolidayType = HolidayType.Annual, Month = 12, Day = 26, IsNational = true, Priority = 1 }
        };
    }

    private List<PublicHoliday> GetSaudiArabiaHolidayTemplate(int year)
    {
        return new List<PublicHoliday>
        {
            new() { Name = "National Day", NameAr = "اليوم الوطني", HolidayType = HolidayType.Annual, Month = 9, Day = 23, IsNational = true, Priority = 1 },
            new() { Name = "Founding Day", NameAr = "يوم التأسيس", HolidayType = HolidayType.Annual, Month = 2, Day = 22, IsNational = true, Priority = 1 }
        };
    }

    private byte[] ExportToJson(IEnumerable<PublicHoliday> holidays, int year)
    {
        var exportData = holidays.Select(h => new
        {
            h.Name,
            h.NameAr,
            h.HolidayType,
            h.IsNational,
            h.BranchId,
            h.Description,
            Pattern = h.GetPatternDescription(),
            DatesForYear = GetHolidayDatesForYear(h, year).Select(d => d.ToString("yyyy-MM-dd"))
        });

        var json = JsonSerializer.Serialize(exportData, new JsonSerializerOptions
        {
            WriteIndented = true,
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });

        return System.Text.Encoding.UTF8.GetBytes(json);
    }

    private byte[] ExportToCsv(IEnumerable<PublicHoliday> holidays, int year)
    {
        var csv = new System.Text.StringBuilder();
        csv.AppendLine("Name,NameAr,Type,IsNational,BranchId,Description,Pattern,DatesForYear");

        foreach (var holiday in holidays)
        {
            var dates = string.Join(";", GetHolidayDatesForYear(holiday, year).Select(d => d.ToString("yyyy-MM-dd")));
            csv.AppendLine($"\"{holiday.Name}\",\"{holiday.NameAr ?? ""}\",\"{holiday.HolidayType}\"," +
                          $"{holiday.IsNational},\"{holiday.BranchId?.ToString() ?? ""}\",\"{holiday.Description ?? ""}\", " +
                          $"\"{holiday.GetPatternDescription()}\",\"{dates}\"");
        }

        return System.Text.Encoding.UTF8.GetBytes(csv.ToString());
    }

    private byte[] ExportToICal(IEnumerable<PublicHoliday> holidays, int year)
    {
        var ical = new System.Text.StringBuilder();
        ical.AppendLine("BEGIN:VCALENDAR");
        ical.AppendLine("VERSION:2.0");
        ical.AppendLine("PRODID:-//Time Attendance System//Public Holidays//EN");

        foreach (var holiday in holidays)
        {
            var dates = GetHolidayDatesForYear(holiday, year);
            foreach (var date in dates)
            {
                ical.AppendLine("BEGIN:VEVENT");
                ical.AppendLine($"UID:holiday-{holiday.Id}-{date:yyyyMMdd}@timeattendance.system");
                ical.AppendLine($"DTSTAMP:{DateTime.UtcNow:yyyyMMddTHHmmssZ}");
                ical.AppendLine($"DTSTART;VALUE=DATE:{date:yyyyMMdd}");
                ical.AppendLine($"SUMMARY:{holiday.Name}");
                if (!string.IsNullOrEmpty(holiday.Description))
                {
                    ical.AppendLine($"DESCRIPTION:{holiday.Description}");
                }
                ical.AppendLine("END:VEVENT");
            }
        }

        ical.AppendLine("END:VCALENDAR");
        return System.Text.Encoding.UTF8.GetBytes(ical.ToString());
    }

    #endregion
}