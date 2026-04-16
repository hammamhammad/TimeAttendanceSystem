using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Tenants;

namespace TecAxle.Hrms.Application.Validation;

/// <summary>
/// Provides tenant-scoped business-rule thresholds for FluentValidation validators.
/// Returns a cached, best-effort view — safe defaults if no tenant/settings are resolvable.
/// Synchronous by design: FluentValidation rule chains are synchronous and must be able to
/// read a value without awaiting; <see cref="WarmAsync"/> hydrates the cache ahead of validation.
/// </summary>
public interface IValidationSettingsProvider
{
    /// <summary>Warms the internal cache for the current tenant. Safe to call multiple times.</summary>
    Task WarmAsync(CancellationToken ct = default);

    /// <summary>Current snapshot of validation thresholds — safe fallback defaults if unresolved.</summary>
    ValidationThresholds Current { get; }
}

public sealed class ValidationThresholds
{
    public int MaxVacationDaysPerRequest { get; init; } = 365;
    public int MaxVacationFuturePlanningYears { get; init; } = 2;
    public int MaxShiftGracePeriodMinutes { get; init; } = 120;
    public int ExcuseBackwardWindowDays { get; init; } = 365;
    public int ExcuseForwardWindowDays { get; init; } = 30;
    public int MaxUploadSizeMb { get; init; } = 10;
    public int PasswordMinLength { get; init; } = 8;
    public int AttendanceCorrectionMaxRetroactiveDays { get; init; } = 30;
}

/// <summary>
/// Default implementation. Reads <see cref="TenantSettings"/> lazily on first access (or via
/// <see cref="WarmAsync"/>) and caches per scoped lifetime — which matches request lifetime.
/// </summary>
public sealed class ValidationSettingsProvider : IValidationSettingsProvider
{
    private readonly IApplicationDbContext _context;
    private ValidationThresholds? _cached;

    public ValidationSettingsProvider(IApplicationDbContext context)
    {
        _context = context;
    }

    public ValidationThresholds Current => _cached ?? new ValidationThresholds();

    public async Task WarmAsync(CancellationToken ct = default)
    {
        if (_cached != null) return;

        var s = await _context.TenantSettings
            .AsNoTracking()
            .FirstOrDefaultAsync(t => !t.IsDeleted, ct);

        _cached = s == null
            ? new ValidationThresholds()
            : new ValidationThresholds
            {
                MaxVacationDaysPerRequest = s.MaxVacationDaysPerRequest,
                MaxVacationFuturePlanningYears = s.MaxVacationFuturePlanningYears,
                MaxShiftGracePeriodMinutes = s.MaxShiftGracePeriodMinutes,
                ExcuseBackwardWindowDays = s.ExcuseBackwardWindowDays,
                ExcuseForwardWindowDays = s.ExcuseForwardWindowDays,
                MaxUploadSizeMb = s.MaxUploadSizeMb,
                PasswordMinLength = s.PasswordMinLength,
                AttendanceCorrectionMaxRetroactiveDays = s.AttendanceCorrectionMaxRetroactiveDays,
            };
    }
}
