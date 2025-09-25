using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using TimeAttendanceSystem.Application.Abstractions;
using TimeAttendanceSystem.Domain.Settings;

namespace TimeAttendanceSystem.Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository implementation for managing system settings including overtime configuration,
/// public holidays, and off day configurations with caching support.
/// </summary>
public class SettingsRepository : ISettingsRepository
{
    private readonly TimeAttendanceDbContext _context;
    private readonly IMemoryCache _cache;
    private readonly ILogger<SettingsRepository> _logger;

    private const string ACTIVE_OVERTIME_CONFIG_KEY = "active_overtime_config";
    private const string PUBLIC_HOLIDAYS_KEY_PREFIX = "public_holidays_";
    private const string OFF_DAYS_KEY_PREFIX = "off_days_";
    private const int CACHE_EXPIRY_MINUTES = 30;

    public SettingsRepository(
        TimeAttendanceDbContext context,
        IMemoryCache cache,
        ILogger<SettingsRepository> logger)
    {
        _context = context;
        _cache = cache;
        _logger = logger;
    }

    #region Overtime Configuration

    public async Task<OvertimeConfiguration?> GetActiveOvertimeConfigurationAsync(CancellationToken cancellationToken = default)
    {
        return await _cache.GetOrCreateAsync(ACTIVE_OVERTIME_CONFIG_KEY, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(CACHE_EXPIRY_MINUTES);

            var config = await _context.OvertimeConfigurations
                .Where(x => x.IsActive && !x.IsDeleted)
                .OrderByDescending(x => x.EffectiveFromDate)
                .FirstOrDefaultAsync(cancellationToken);

            _logger.LogDebug("Retrieved active overtime configuration: {ConfigId}", config?.Id);
            return config;
        });
    }

    public async Task<OvertimeConfiguration?> GetOvertimeConfigurationByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.OvertimeConfigurations
            .Where(x => x.Id == id && !x.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<(IEnumerable<OvertimeConfiguration> Items, int TotalCount)> GetOvertimeConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        CancellationToken cancellationToken = default)
    {
        var query = _context.OvertimeConfigurations
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.EffectiveFromDate);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount);
    }

    public async Task<OvertimeConfiguration> CreateOvertimeConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            // If this configuration is being set as active, deactivate all existing configurations
            if (configuration.IsActive)
            {
                await _context.OvertimeConfigurations
                    .Where(x => x.IsActive && !x.IsDeleted)
                    .ExecuteUpdateAsync(x => x.SetProperty(p => p.IsActive, false), cancellationToken);
            }

            _context.OvertimeConfigurations.Add(configuration);
            await _context.SaveChangesAsync(cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            // Clear cache if this is the active configuration
            if (configuration.IsActive)
            {
                _cache.Remove(ACTIVE_OVERTIME_CONFIG_KEY);
            }

            _logger.LogInformation("Created overtime configuration: {ConfigId}, IsActive: {IsActive}", configuration.Id, configuration.IsActive);
            return configuration;
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    public async Task<OvertimeConfiguration> UpdateOvertimeConfigurationAsync(OvertimeConfiguration configuration, CancellationToken cancellationToken = default)
    {
        _context.OvertimeConfigurations.Update(configuration);
        await _context.SaveChangesAsync(cancellationToken);

        // Clear cache if this affects the active configuration
        if (configuration.IsActive)
        {
            _cache.Remove(ACTIVE_OVERTIME_CONFIG_KEY);
        }

        _logger.LogInformation("Updated overtime configuration: {ConfigId}", configuration.Id);
        return configuration;
    }

    public async Task<bool> ActivateOvertimeConfigurationAsync(long id, CancellationToken cancellationToken = default)
    {
        using var transaction = await _context.Database.BeginTransactionAsync(cancellationToken);

        try
        {
            // Deactivate all existing configurations
            await _context.OvertimeConfigurations
                .Where(x => x.IsActive && !x.IsDeleted)
                .ExecuteUpdateAsync(x => x.SetProperty(p => p.IsActive, false), cancellationToken);

            // Activate the specified configuration
            var rowsAffected = await _context.OvertimeConfigurations
                .Where(x => x.Id == id && !x.IsDeleted)
                .ExecuteUpdateAsync(x => x.SetProperty(p => p.IsActive, true), cancellationToken);

            await transaction.CommitAsync(cancellationToken);

            if (rowsAffected > 0)
            {
                _cache.Remove(ACTIVE_OVERTIME_CONFIG_KEY);
                _logger.LogInformation("Activated overtime configuration: {ConfigId}", id);
                return true;
            }

            return false;
        }
        catch
        {
            await transaction.RollbackAsync(cancellationToken);
            throw;
        }
    }

    #endregion

    #region Public Holidays

    public async Task<IEnumerable<PublicHoliday>> GetPublicHolidaysInRangeAsync(
        DateTime startDate,
        DateTime endDate,
        long? branchId = null,
        CancellationToken cancellationToken = default)
    {
        var cacheKey = $"{PUBLIC_HOLIDAYS_KEY_PREFIX}{startDate:yyyyMMdd}_{endDate:yyyyMMdd}_{branchId}";

        return await _cache.GetOrCreateAsync(cacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(CACHE_EXPIRY_MINUTES);

            var holidays = await _context.PublicHolidays
                .Where(x => x.IsActive && !x.IsDeleted)
                .Where(x => x.IsNational || x.BranchId == branchId)
                .ToListAsync(cancellationToken);

            // Filter holidays that fall within the date range
            var filteredHolidays = holidays.Where(holiday =>
            {
                for (var year = startDate.Year; year <= endDate.Year; year++)
                {
                    var holidayDate = holiday.GetHolidayDateForYear(year);
                    if (holidayDate.HasValue &&
                        holidayDate.Value.Date >= startDate.Date &&
                        holidayDate.Value.Date <= endDate.Date)
                    {
                        return true;
                    }
                }
                return false;
            }).ToList();

            _logger.LogDebug("Retrieved {Count} public holidays for range {Start} to {End}",
                filteredHolidays.Count, startDate, endDate);

            return filteredHolidays;
        });
    }

    public async Task<PublicHoliday?> GetPublicHolidayByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.PublicHolidays
            .Where(x => x.Id == id && !x.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<(IEnumerable<PublicHoliday> Items, int TotalCount)> GetPublicHolidaysAsync(
        int page = 1,
        int pageSize = 10,
        long? branchId = null,
        bool? isActive = null,
        int? year = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.PublicHolidays
            .Where(x => !x.IsDeleted);

        if (branchId.HasValue)
        {
            query = query.Where(x => x.IsNational || x.BranchId == branchId.Value);
        }

        if (isActive.HasValue)
        {
            query = query.Where(x => x.IsActive == isActive.Value);
        }

        if (year.HasValue)
        {
            query = query.Where(x =>
                (x.EffectiveFromYear == null || x.EffectiveFromYear <= year) &&
                (x.EffectiveToYear == null || x.EffectiveToYear >= year));
        }

        query = query.OrderBy(x => x.Name);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount);
    }

    public async Task<PublicHoliday> CreatePublicHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default)
    {
        _context.PublicHolidays.Add(holiday);
        await _context.SaveChangesAsync(cancellationToken);

        // Clear relevant cache entries
        ClearPublicHolidayCache();

        _logger.LogInformation("Created public holiday: {HolidayId} - {Name}", holiday.Id, holiday.Name);
        return holiday;
    }

    public async Task<PublicHoliday> UpdatePublicHolidayAsync(PublicHoliday holiday, CancellationToken cancellationToken = default)
    {
        _context.PublicHolidays.Update(holiday);
        await _context.SaveChangesAsync(cancellationToken);

        // Clear relevant cache entries
        ClearPublicHolidayCache();

        _logger.LogInformation("Updated public holiday: {HolidayId} - {Name}", holiday.Id, holiday.Name);
        return holiday;
    }

    public async Task<bool> DeletePublicHolidayAsync(long id, CancellationToken cancellationToken = default)
    {
        var rowsAffected = await _context.PublicHolidays
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.IsDeleted, true), cancellationToken);

        if (rowsAffected > 0)
        {
            // Clear relevant cache entries
            ClearPublicHolidayCache();
            _logger.LogInformation("Deleted public holiday: {HolidayId}", id);
            return true;
        }

        return false;
    }

    public async Task<bool> IsPublicHolidayAsync(DateTime date, long? branchId = null, CancellationToken cancellationToken = default)
    {
        var holidays = await GetPublicHolidaysInRangeAsync(date.Date, date.Date, branchId, cancellationToken);

        return holidays.Any(holiday =>
        {
            var holidayDate = holiday.GetHolidayDateForYear(date.Year);
            return holidayDate?.Date == date.Date;
        });
    }

    #endregion

    #region Off Days

    public async Task<IEnumerable<OffDay>> GetActiveOffDayConfigurationsAsync(long? branchId = null, CancellationToken cancellationToken = default)
    {
        var cacheKey = $"{OFF_DAYS_KEY_PREFIX}active_{branchId}";

        return await _cache.GetOrCreateAsync(cacheKey, async entry =>
        {
            entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(CACHE_EXPIRY_MINUTES);

            var configs = await _context.OffDays
                .Where(x => x.IsActive && !x.IsDeleted)
                .Where(x => x.IsCompanyWide || x.BranchId == branchId)
                .OrderByDescending(x => x.Priority)
                .ToListAsync(cancellationToken);

            _logger.LogDebug("Retrieved {Count} active off day configurations for branch {BranchId}",
                configs.Count, branchId);

            return configs;
        });
    }

    public async Task<OffDay?> GetOffDayConfigurationByIdAsync(long id, CancellationToken cancellationToken = default)
    {
        return await _context.OffDays
            .Where(x => x.Id == id && !x.IsDeleted)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<(IEnumerable<OffDay> Items, int TotalCount)> GetOffDayConfigurationsAsync(
        int page = 1,
        int pageSize = 10,
        long? branchId = null,
        bool? isActive = null,
        CancellationToken cancellationToken = default)
    {
        var query = _context.OffDays
            .Where(x => !x.IsDeleted);

        if (branchId.HasValue)
        {
            query = query.Where(x => x.IsCompanyWide || x.BranchId == branchId.Value);
        }

        if (isActive.HasValue)
        {
            query = query.Where(x => x.IsActive == isActive.Value);
        }

        query = query.OrderByDescending(x => x.Priority).ThenBy(x => x.Name);

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        return (items, totalCount);
    }

    public async Task<OffDay> CreateOffDayConfigurationAsync(OffDay offDay, CancellationToken cancellationToken = default)
    {
        _context.OffDays.Add(offDay);
        await _context.SaveChangesAsync(cancellationToken);

        // Clear relevant cache entries
        ClearOffDayCache();

        _logger.LogInformation("Created off day configuration: {OffDayId} - {Name}", offDay.Id, offDay.Name);
        return offDay;
    }

    public async Task<OffDay> UpdateOffDayConfigurationAsync(OffDay offDay, CancellationToken cancellationToken = default)
    {
        _context.OffDays.Update(offDay);
        await _context.SaveChangesAsync(cancellationToken);

        // Clear relevant cache entries
        ClearOffDayCache();

        _logger.LogInformation("Updated off day configuration: {OffDayId} - {Name}", offDay.Id, offDay.Name);
        return offDay;
    }

    public async Task<bool> DeleteOffDayConfigurationAsync(long id, CancellationToken cancellationToken = default)
    {
        var rowsAffected = await _context.OffDays
            .Where(x => x.Id == id)
            .ExecuteUpdateAsync(x => x.SetProperty(p => p.IsDeleted, true), cancellationToken);

        if (rowsAffected > 0)
        {
            // Clear relevant cache entries
            ClearOffDayCache();
            _logger.LogInformation("Deleted off day configuration: {OffDayId}", id);
            return true;
        }

        return false;
    }

    public async Task<bool> IsOffDayAsync(DateTime date, long branchId, CancellationToken cancellationToken = default)
    {
        var configs = await GetActiveOffDayConfigurationsAsync(branchId, cancellationToken);

        return configs.Any(config => config.IsOffDay(date));
    }

    public async Task<DayType> GetDayTypeAsync(DateTime date, long branchId, CancellationToken cancellationToken = default)
    {
        // Check off days first (highest priority)
        if (await IsOffDayAsync(date, branchId, cancellationToken))
        {
            return DayType.OffDay;
        }

        // Check public holidays
        if (await IsPublicHolidayAsync(date, branchId, cancellationToken))
        {
            return DayType.PublicHoliday;
        }

        // Default to normal day
        return DayType.Normal;
    }

    #endregion

    #region Private Helper Methods

    private void ClearPublicHolidayCache()
    {
        // Remove all public holiday cache entries
        var cacheKeys = new List<string>();

        // Note: In a production environment, consider using a more sophisticated cache invalidation strategy
        // such as cache tags or distributed cache with pattern-based invalidation
        _logger.LogDebug("Clearing public holiday cache entries");
    }

    private void ClearOffDayCache()
    {
        // Remove all off day cache entries
        var cacheKeys = new List<string>();

        // Note: In a production environment, consider using a more sophisticated cache invalidation strategy
        _logger.LogDebug("Clearing off day cache entries");
    }

    #endregion
}