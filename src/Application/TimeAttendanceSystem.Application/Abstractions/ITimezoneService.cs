using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Application.Abstractions;

/// <summary>
/// Phase 2: Centralized timezone resolution + UTC ↔ branch-local conversion.
///
/// The attendance pipeline stores UTC as the source of truth (<c>AttendanceTransaction.TransactionTimeUtc</c>)
/// but every derived value — local time, <c>AttendanceDate</c> bucket, date-of-week flags,
/// holiday match, overtime day-type — must be computed against the branch's effective timezone.
/// Prior to Phase 2 three different code paths had three slightly different implementations
/// (mobile handler: convert; manual-punch controller: `// TODO`; edit-path: stored UTC as local).
///
/// This service unifies all three paths. Resolution rules:
///   1. <c>Branch.TimeZone</c> (IANA or Windows id, e.g. "Asia/Riyadh" / "Arab Standard Time").
///   2. <c>CompanySettings.DefaultTimeZoneId</c> when branch value is empty/invalid.
///   3. "UTC" as final fallback (never throws).
///
/// The returned <see cref="TimeZoneInfo"/> is cached in-process keyed by id to avoid repeated
/// lookups; invalid ids are cached as UTC to avoid hammering the OS tz database on bad data.
/// </summary>
public interface ITimezoneService
{
    /// <summary>Resolve the effective timezone for a branch (or null → tenant default / UTC).</summary>
    Task<TimeZoneInfo> GetBranchTimeZoneAsync(long? branchId, CancellationToken ct = default);

    /// <summary>Resolve from a preloaded branch entity (no DB hit).</summary>
    TimeZoneInfo GetBranchTimeZone(Branch? branch);

    /// <summary>Convert a UTC instant to the branch's local clock. Input kind is coerced to UTC.</summary>
    Task<DateTime> ToBranchLocalAsync(DateTime utc, long? branchId, CancellationToken ct = default);

    /// <summary>Convert a branch-local wall-clock time to UTC. DST ambiguity / invalid is resolved to UTC (best effort).</summary>
    Task<DateTime> FromBranchLocalAsync(DateTime local, long? branchId, CancellationToken ct = default);

    /// <summary>
    /// Compute the <c>AttendanceDate</c> bucket (date-only) from a UTC instant using the branch's
    /// local clock. This is the authoritative date used by attendance aggregation, late/early
    /// calculations, holiday matching, and overtime day-type classification.
    /// Returned DateTime has <see cref="DateTimeKind.Unspecified"/> so dictionary/HashSet
    /// lookups compare by value only (matches the pattern used in <c>PayrollInputResolver</c>).
    /// </summary>
    Task<DateTime> GetAttendanceDateAsync(DateTime utc, long? branchId, CancellationToken ct = default);
}
