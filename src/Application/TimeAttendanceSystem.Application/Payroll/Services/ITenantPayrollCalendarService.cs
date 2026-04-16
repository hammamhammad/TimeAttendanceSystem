using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Convenience helper for one-off monthly daily-rate resolution outside the payroll pipeline
/// (leave encashment, final settlement, etc.). Wraps <see cref="IPayrollCalendarResolver"/> with
/// DB lookup of the active <see cref="PayrollCalendarPolicy"/> for a given branch + reference date.
/// Falls back to calendar days in the reference month if no policy is configured.
/// </summary>
public interface ITenantPayrollCalendarService
{
    /// <summary>
    /// Returns the number of days to divide the monthly salary by in order to derive the daily rate,
    /// using the <see cref="PayrollCalendarPolicy"/> effective for <paramref name="referenceDate"/>
    /// (branch-specific first, tenant-wide fallback). Falls back to <c>DateTime.DaysInMonth</c> if
    /// no policy exists — safe default that matches legacy behavior for calendar months.
    /// </summary>
    Task<int> GetMonthlyDailyBasisAsync(long? branchId, DateTime referenceDate, CancellationToken ct = default);
}

public sealed class TenantPayrollCalendarService : ITenantPayrollCalendarService
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<TenantPayrollCalendarService> _logger;

    public TenantPayrollCalendarService(IApplicationDbContext context, ILogger<TenantPayrollCalendarService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<int> GetMonthlyDailyBasisAsync(long? branchId, DateTime referenceDate, CancellationToken ct = default)
    {
        var policy = await ResolvePolicyAsync(branchId, referenceDate, ct);
        var calendarDays = DateTime.DaysInMonth(referenceDate.Year, referenceDate.Month);

        if (policy == null)
        {
            _logger.LogDebug(
                "No PayrollCalendarPolicy found for branch {BranchId} at {Date}; falling back to calendar days ({Days}).",
                branchId, referenceDate, calendarDays);
            return calendarDays;
        }

        return policy.BasisType switch
        {
            PayrollDailyBasisType.FixedBasis => (policy.FixedBasisDays.HasValue && policy.FixedBasisDays.Value > 0)
                ? policy.FixedBasisDays.Value
                : calendarDays,
            PayrollDailyBasisType.WorkingDays => CountWorkingDays(referenceDate, policy),
            PayrollDailyBasisType.CalendarDays => calendarDays,
            _ => calendarDays
        };
    }

    private async Task<PayrollCalendarPolicy?> ResolvePolicyAsync(long? branchId, DateTime referenceDate, CancellationToken ct)
    {
        // Branch-specific first
        if (branchId.HasValue)
        {
            var branchPolicy = await _context.PayrollCalendarPolicies
                .AsNoTracking()
                .Where(p => p.IsActive && !p.IsDeleted
                    && p.BranchId == branchId.Value
                    && p.EffectiveFromDate <= referenceDate
                    && (p.EffectiveToDate == null || p.EffectiveToDate >= referenceDate))
                .OrderByDescending(p => p.EffectiveFromDate)
                .FirstOrDefaultAsync(ct);
            if (branchPolicy != null) return branchPolicy;
        }

        // Tenant-wide fallback (BranchId null)
        return await _context.PayrollCalendarPolicies
            .AsNoTracking()
            .Where(p => p.IsActive && !p.IsDeleted
                && p.BranchId == null
                && p.EffectiveFromDate <= referenceDate
                && (p.EffectiveToDate == null || p.EffectiveToDate >= referenceDate))
            .OrderByDescending(p => p.EffectiveFromDate)
            .FirstOrDefaultAsync(ct);
    }

    private static int CountWorkingDays(DateTime referenceDate, PayrollCalendarPolicy policy)
    {
        var start = new DateTime(referenceDate.Year, referenceDate.Month, 1);
        var end = start.AddMonths(1).AddDays(-1);
        var count = 0;
        for (var d = start; d <= end; d = d.AddDays(1))
        {
            if (d.DayOfWeek == DayOfWeek.Friday || d.DayOfWeek == DayOfWeek.Saturday) continue;
            count++;
        }
        return count > 0 ? count : DateTime.DaysInMonth(referenceDate.Year, referenceDate.Month);
    }
}
