using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;

namespace TecAxle.Hrms.Application.EndOfService.Services;

public sealed class EndOfServiceCalculator : IEndOfServiceCalculator
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<EndOfServiceCalculator> _logger;

    public EndOfServiceCalculator(IApplicationDbContext context, ILogger<EndOfServiceCalculator> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<EndOfServiceComputation> CalculateAsync(
        DateTime hireDate,
        DateTime terminationDate,
        TerminationType terminationType,
        decimal baseSalary,
        decimal totalAllowances,
        string? countryCode = null,
        CancellationToken ct = default)
    {
        // Service duration
        var totalDays = (terminationDate.Date - hireDate.Date).Days;
        if (totalDays < 0) totalDays = 0;

        var totalServiceYears = Math.Round((decimal)totalDays / 365.0m, 4, MidpointRounding.AwayFromZero);
        var serviceYears = totalDays / 365;
        var remainingDaysAfterYears = totalDays % 365;
        var serviceMonths = remainingDaysAfterYears / 30;
        var serviceDays = remainingDaysAfterYears % 30;

        var calcBasis = baseSalary + totalAllowances;

        var result = new EndOfServiceComputation
        {
            TotalServiceYears = totalServiceYears,
            ServiceYears = serviceYears,
            ServiceMonths = serviceMonths,
            ServiceDays = serviceDays,
            CalculationBasis = calcBasis
        };

        // Resolve the policy (country preferred, then null-country fallback).
        var policy = await ResolvePolicyAsync(countryCode, terminationDate, ct);

        if (policy == null)
        {
            _logger.LogWarning(
                "No EndOfServicePolicy resolved for country {Country} and date {Date}; falling back to seeded Saudi default formula.",
                countryCode ?? "(any)", terminationDate);

            ApplySeededSaudiFallback(result, terminationType);
            result.UsedFallback = true;
            result.CalculationDetails =
                $"FALLBACK (no policy found) | Service: {serviceYears}y {serviceMonths}m {serviceDays}d | " +
                $"Basis: {calcBasis:N2} | Total: {result.TotalAmountBeforeDeduction:N2} | " +
                $"Deduction: {result.DeductionAmount:N2} | Net: {result.NetAmount:N2}";
            return result;
        }

        // Eligibility gate
        if (totalServiceYears < policy.MinimumServiceYearsForEligibility)
        {
            result.AppliedPolicyId = policy.Id;
            result.AppliedPolicyName = policy.Name;
            result.AppliedPolicySnapshotJson = SerializeSnapshot(policy);
            result.TotalAmountBeforeDeduction = 0m;
            result.DeductionAmount = 0m;
            result.NetAmount = 0m;
            result.CalculationDetails =
                $"Not eligible: service {totalServiceYears:N2}y < MinimumServiceYearsForEligibility {policy.MinimumServiceYearsForEligibility:N2}y " +
                $"(policy: {policy.Name})";
            return result;
        }

        // Apply earning tiers: each tier claims the portion of service years in [Min, Max) and earns
        // MonthsPerYearMultiplier months of salary for that portion.
        var orderedEarnTiers = policy.Tiers
            .OrderBy(t => t.SortOrder)
            .ThenBy(t => t.MinYearsInclusive)
            .ToList();

        decimal totalMonths = 0m;
        var tierBreakdown = new List<string>();

        foreach (var tier in orderedEarnTiers)
        {
            var tierMin = tier.MinYearsInclusive;
            var tierMax = tier.MaxYearsExclusive ?? totalServiceYears;

            if (totalServiceYears <= tierMin) continue;

            var overlapTop = Math.Min(totalServiceYears, tierMax);
            var yearsInTier = overlapTop - tierMin;
            if (yearsInTier <= 0m) continue;

            var monthsInTier = yearsInTier * tier.MonthsPerYearMultiplier;
            totalMonths += monthsInTier;

            tierBreakdown.Add(
                $"[{tier.MinYearsInclusive:N2}..{(tier.MaxYearsExclusive?.ToString("N2") ?? "∞")}] " +
                $"{yearsInTier:N2}y × {tier.MonthsPerYearMultiplier:N3} = {monthsInTier:N3}mo");
        }

        // Benefit = months × monthly salary (calculation basis)
        var totalAmount = Math.Round(totalMonths * calcBasis, 2, MidpointRounding.AwayFromZero);

        // Resignation deductions
        decimal deduction = 0m;
        string? deductionDescription = null;
        if (terminationType == TerminationType.Resignation && policy.ResignationDeductions.Count > 0)
        {
            var deductionTier = policy.ResignationDeductions
                .OrderBy(t => t.SortOrder)
                .ThenBy(t => t.MinYearsInclusive)
                .FirstOrDefault(t =>
                    totalServiceYears >= t.MinYearsInclusive &&
                    (!t.MaxYearsExclusive.HasValue || totalServiceYears < t.MaxYearsExclusive.Value));

            if (deductionTier != null)
            {
                var frac = Math.Clamp(deductionTier.DeductionFraction, 0m, 1m);
                deduction = Math.Round(totalAmount * frac, 2, MidpointRounding.AwayFromZero);
                deductionDescription =
                    $"Resignation deduction tier [{deductionTier.MinYearsInclusive:N2}..{(deductionTier.MaxYearsExclusive?.ToString("N2") ?? "∞")}] " +
                    $"@ {frac:P2}";
            }
        }

        result.AppliedPolicyId = policy.Id;
        result.AppliedPolicyName = policy.Name;
        result.AppliedPolicySnapshotJson = SerializeSnapshot(policy);
        result.TotalAmountBeforeDeduction = totalAmount;
        result.DeductionAmount = deduction;
        result.NetAmount = totalAmount - deduction;

        var tierSummary = tierBreakdown.Count > 0 ? string.Join(" + ", tierBreakdown) : "no tiers matched";
        result.CalculationDetails =
            $"Policy: {policy.Name} (#{policy.Id}) | " +
            $"Service: {serviceYears}y {serviceMonths}m {serviceDays}d ({totalServiceYears:N2}y) | " +
            $"Basis: {calcBasis:N2} | Tiers: {tierSummary} | Total months: {totalMonths:N3} | " +
            $"Total: {totalAmount:N2}" +
            (deductionDescription != null ? $" | {deductionDescription} = {deduction:N2}" : "") +
            $" | Net: {result.NetAmount:N2}";
        return result;
    }

    private async Task<EndOfServicePolicy?> ResolvePolicyAsync(string? countryCode, DateTime terminationDate, CancellationToken ct)
    {
        var candidates = _context.EndOfServicePolicies
            .AsNoTracking()
            .Include(p => p.Tiers)
            .Include(p => p.ResignationDeductions)
            .Where(p => p.IsActive && !p.IsDeleted
                && p.EffectiveFromDate <= terminationDate
                && (p.EffectiveToDate == null || p.EffectiveToDate >= terminationDate));

        // Prefer country-specific over null-country
        EndOfServicePolicy? result = null;
        if (!string.IsNullOrWhiteSpace(countryCode))
        {
            var cc = countryCode.ToUpperInvariant();
            result = await candidates
                .Where(p => p.CountryCode != null && p.CountryCode.ToUpper() == cc)
                .OrderByDescending(p => p.EffectiveFromDate)
                .FirstOrDefaultAsync(ct);
        }

        result ??= await candidates
            .Where(p => p.CountryCode == null)
            .OrderByDescending(p => p.EffectiveFromDate)
            .FirstOrDefaultAsync(ct);

        return result;
    }

    /// <summary>
    /// Replicates the pre-v13.3 hardcoded Saudi formula so that calculation never silently returns
    /// zero when someone deletes the seeded policy. Always accompanied by a warning log.
    /// </summary>
    private static void ApplySeededSaudiFallback(EndOfServiceComputation r, TerminationType type)
    {
        // Pre-v13.3 behavior: first 5 years = 0.5 month/year; after 5 years = 1 month/year
        decimal totalAmount;
        if (r.TotalServiceYears <= 5)
            totalAmount = (r.CalculationBasis / 2m) * r.TotalServiceYears;
        else
            totalAmount = (r.CalculationBasis / 2m) * 5m + r.CalculationBasis * (r.TotalServiceYears - 5m);

        totalAmount = Math.Round(totalAmount, 2, MidpointRounding.AwayFromZero);

        decimal deduction = 0m;
        if (type == TerminationType.Resignation)
        {
            if (r.TotalServiceYears < 2) deduction = totalAmount;
            else if (r.TotalServiceYears < 5) deduction = Math.Round(totalAmount * (2m / 3m), 2, MidpointRounding.AwayFromZero);
            else if (r.TotalServiceYears < 10) deduction = Math.Round(totalAmount * (1m / 3m), 2, MidpointRounding.AwayFromZero);
        }

        r.TotalAmountBeforeDeduction = totalAmount;
        r.DeductionAmount = deduction;
        r.NetAmount = totalAmount - deduction;
    }

    private static string SerializeSnapshot(EndOfServicePolicy policy)
    {
        var snapshot = new
        {
            policyId = policy.Id,
            policyName = policy.Name,
            countryCode = policy.CountryCode,
            effectiveFrom = policy.EffectiveFromDate,
            effectiveTo = policy.EffectiveToDate,
            minimumServiceYearsForEligibility = policy.MinimumServiceYearsForEligibility,
            tiers = policy.Tiers.OrderBy(t => t.SortOrder).Select(t => new
            {
                min = t.MinYearsInclusive,
                max = t.MaxYearsExclusive,
                monthsPerYear = t.MonthsPerYearMultiplier
            }),
            resignationDeductions = policy.ResignationDeductions.OrderBy(t => t.SortOrder).Select(t => new
            {
                min = t.MinYearsInclusive,
                max = t.MaxYearsExclusive,
                fraction = t.DeductionFraction
            })
        };
        return JsonSerializer.Serialize(snapshot);
    }
}
