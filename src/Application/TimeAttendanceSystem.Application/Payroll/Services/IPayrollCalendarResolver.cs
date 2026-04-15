using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Resolves the daily-rate basis for a payroll period per the tenant/branch
/// <c>PayrollCalendarPolicy</c>. Eliminates the hardcoded 30-day assumption.
/// </summary>
public interface IPayrollCalendarResolver
{
    /// <summary>
    /// Number of days that divides the basic salary to produce the daily rate.
    /// Per policy: calendar days / working days (excluding off-days) / fixed basis.
    /// Never returns 0; falls back to the period's calendar days if a policy produces 0.
    /// </summary>
    int GetDailyRateBasis(PayrollCalculationContext ctx);

    /// <summary>Standard hours per day used to convert daily rate to hourly rate (for OT).</summary>
    decimal GetStandardHoursPerDay(PayrollCalendarPolicy policy);
}

public sealed class PayrollCalendarResolver : IPayrollCalendarResolver
{
    public int GetDailyRateBasis(PayrollCalculationContext ctx)
    {
        var policy = ctx.CalendarPolicy;
        var periodStart = ctx.Period.StartDate.Date;
        var periodEnd = ctx.Period.EndDate.Date;
        var calendarDays = (periodEnd - periodStart).Days + 1;

        switch (policy.BasisType)
        {
            case PayrollDailyBasisType.FixedBasis:
            {
                var fixedDays = policy.FixedBasisDays ?? 30;
                return fixedDays <= 0 ? calendarDays : fixedDays;
            }
            case PayrollDailyBasisType.WorkingDays:
            {
                // Note: shift/off-day per employee is too granular here; use ISO weekend (Fri/Sat) by default.
                // Branch can override via FixedBasis. A finer-grained per-employee resolver can extend this later.
                var workingDays = 0;
                for (var d = periodStart; d <= periodEnd; d = d.AddDays(1))
                {
                    if (d.DayOfWeek == DayOfWeek.Friday || d.DayOfWeek == DayOfWeek.Saturday) continue;
                    if (!policy.TreatPublicHolidaysAsPaid && ctx.PublicHolidayDates.Contains(d)) continue;
                    workingDays++;
                }
                return workingDays <= 0 ? calendarDays : workingDays;
            }
            case PayrollDailyBasisType.CalendarDays:
            default:
                return calendarDays;
        }
    }

    public decimal GetStandardHoursPerDay(PayrollCalendarPolicy policy)
        => policy.StandardHoursPerDay > 0 ? policy.StandardHoursPerDay : 8m;
}
