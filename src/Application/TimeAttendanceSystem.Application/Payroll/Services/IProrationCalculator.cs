namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Proration policy — given a payroll period and an effective window,
/// returns the fraction of the period that the record applies to (0..1).
/// Centralized so salary / allowance / insurance / tax all prorate consistently.
/// </summary>
public interface IProrationCalculator
{
    /// <summary>
    /// Returns the applicable fraction in the range [0, 1] for the overlap between the period and the effective window.
    /// </summary>
    decimal GetFraction(DateTime periodStart, DateTime periodEnd, DateTime effectiveFrom, DateTime? effectiveTo);

    /// <summary>Inclusive overlap in days, or 0 if there is no overlap.</summary>
    int GetOverlapDays(DateTime periodStart, DateTime periodEnd, DateTime effectiveFrom, DateTime? effectiveTo);
}

public sealed class ProrationCalculator : IProrationCalculator
{
    public decimal GetFraction(DateTime periodStart, DateTime periodEnd, DateTime effectiveFrom, DateTime? effectiveTo)
    {
        var periodDays = (periodEnd.Date - periodStart.Date).Days + 1;
        if (periodDays <= 0) return 0m;

        var overlap = GetOverlapDays(periodStart, periodEnd, effectiveFrom, effectiveTo);
        if (overlap <= 0) return 0m;
        if (overlap >= periodDays) return 1m;

        return Math.Round((decimal)overlap / periodDays, 6);
    }

    public int GetOverlapDays(DateTime periodStart, DateTime periodEnd, DateTime effectiveFrom, DateTime? effectiveTo)
    {
        var ps = periodStart.Date;
        var pe = periodEnd.Date;
        var ef = effectiveFrom.Date;
        var et = (effectiveTo ?? DateTime.MaxValue).Date;

        var start = ef > ps ? ef : ps;
        var end = et < pe ? et : pe;
        if (end < start) return 0;
        return (end - start).Days + 1;
    }
}
