using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Infrastructure.Services;

/// <summary>
/// Phase 2: Production implementation of <see cref="ITimezoneService"/>.
///
/// Process-wide cache of <see cref="TimeZoneInfo"/> keyed by id (IANA or Windows). Unknown ids
/// are cached as UTC so a typo doesn't repeatedly hit the OS tz database. Branch-id → tz-id
/// resolution uses a short-lived (30s) cache on top of the DbContext because branches change
/// rarely and attendance hot-paths hit this service on every transaction.
/// </summary>
public sealed class TimezoneService : ITimezoneService
{
    private static readonly ConcurrentDictionary<string, TimeZoneInfo> TzCache = new(StringComparer.OrdinalIgnoreCase);

    private readonly IApplicationDbContext _db;
    private readonly ICompanySettingsResolver _settings;
    private readonly ILogger<TimezoneService> _logger;

    // Per-request branchId → tz-id cache. The service is scoped so this doesn't leak across requests.
    private readonly Dictionary<long, string> _branchTzCache = new();

    public TimezoneService(
        IApplicationDbContext db,
        ICompanySettingsResolver settings,
        ILogger<TimezoneService> logger)
    {
        _db = db;
        _settings = settings;
        _logger = logger;
    }

    public async Task<TimeZoneInfo> GetBranchTimeZoneAsync(long? branchId, CancellationToken ct = default)
    {
        var id = await ResolveTimeZoneIdAsync(branchId, ct);
        return ResolveTz(id);
    }

    public TimeZoneInfo GetBranchTimeZone(Branch? branch)
    {
        var id = !string.IsNullOrWhiteSpace(branch?.TimeZone) ? branch!.TimeZone : "UTC";
        return ResolveTz(id);
    }

    public async Task<DateTime> ToBranchLocalAsync(DateTime utc, long? branchId, CancellationToken ct = default)
    {
        var tz = await GetBranchTimeZoneAsync(branchId, ct);
        var asUtc = utc.Kind == DateTimeKind.Utc ? utc : DateTime.SpecifyKind(utc, DateTimeKind.Utc);
        var local = TimeZoneInfo.ConvertTimeFromUtc(asUtc, tz);
        return DateTime.SpecifyKind(local, DateTimeKind.Unspecified);
    }

    public async Task<DateTime> FromBranchLocalAsync(DateTime local, long? branchId, CancellationToken ct = default)
    {
        var tz = await GetBranchTimeZoneAsync(branchId, ct);
        // Coerce input to Unspecified so ConvertTimeToUtc doesn't complain about mismatched kinds.
        var asUnspecified = DateTime.SpecifyKind(local, DateTimeKind.Unspecified);
        try
        {
            return TimeZoneInfo.ConvertTimeToUtc(asUnspecified, tz);
        }
        catch (Exception ex) when (ex is ArgumentException or InvalidTimeZoneException)
        {
            // DST "spring-forward" invalid time (the wall-clock value doesn't exist in this tz).
            // Add one hour as a best-effort and retry; if that also fails, fall back to UTC.
            _logger.LogWarning(ex, "FromBranchLocalAsync: invalid wall-clock time {Local} in {Tz}; best-effort fallback.", local, tz.Id);
            var shifted = asUnspecified.AddHours(1);
            try
            {
                return TimeZoneInfo.ConvertTimeToUtc(shifted, tz);
            }
            catch
            {
                return DateTime.SpecifyKind(asUnspecified, DateTimeKind.Utc);
            }
        }
    }

    public async Task<DateTime> GetAttendanceDateAsync(DateTime utc, long? branchId, CancellationToken ct = default)
    {
        var local = await ToBranchLocalAsync(utc, branchId, ct);
        return DateTime.SpecifyKind(local.Date, DateTimeKind.Unspecified);
    }

    private async Task<string> ResolveTimeZoneIdAsync(long? branchId, CancellationToken ct)
    {
        if (branchId.HasValue && _branchTzCache.TryGetValue(branchId.Value, out var cached))
            return cached;

        string? tzId = null;
        if (branchId.HasValue)
        {
            tzId = await _db.Branches.AsNoTracking()
                .Where(b => b.Id == branchId.Value && !b.IsDeleted)
                .Select(b => b.TimeZone)
                .FirstOrDefaultAsync(ct);
        }

        if (string.IsNullOrWhiteSpace(tzId))
        {
            var resolved = await _settings.GetSettingsAsync(branchId, null, ct);
            tzId = resolved?.DefaultTimeZoneId;
        }

        if (string.IsNullOrWhiteSpace(tzId)) tzId = "UTC";

        if (branchId.HasValue) _branchTzCache[branchId.Value] = tzId;
        return tzId;
    }

    private TimeZoneInfo ResolveTz(string tzId)
    {
        if (string.IsNullOrWhiteSpace(tzId)) return TimeZoneInfo.Utc;

        return TzCache.GetOrAdd(tzId, id =>
        {
            try
            {
                return TimeZoneInfo.FindSystemTimeZoneById(id);
            }
            catch (Exception ex) when (ex is TimeZoneNotFoundException or InvalidTimeZoneException)
            {
                _logger.LogWarning("Unknown timezone id '{TzId}', falling back to UTC. This will be cached as UTC.", id);
                return TimeZoneInfo.Utc;
            }
        });
    }
}
