using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.EndOfService.Services;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Offboarding;
using TecAxle.Hrms.Infrastructure.Persistence;

namespace TecAxle.Hrms.BusinessRules.Tests;

public class EndOfServiceCalculatorTests
{
    private static TecAxleDbContext NewInMemoryDb()
    {
        var options = new DbContextOptionsBuilder<TecAxleDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
            .Options;
        return new TecAxleDbContext(options);
    }

    private static void SeedSaudiDefault(TecAxleDbContext db, DateTime effectiveFrom)
    {
        var p = new EndOfServicePolicy
        {
            Name = "SA Standard",
            CountryCode = "SA",
            IsActive = true,
            EffectiveFromDate = effectiveFrom,
            MinimumServiceYearsForEligibility = 0m,
            CreatedAtUtc = DateTime.UtcNow,
            CreatedBy = "test"
        };
        p.Tiers.Add(new EndOfServicePolicyTier { MinYearsInclusive = 0m, MaxYearsExclusive = 5m, MonthsPerYearMultiplier = 0.5m, SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });
        p.Tiers.Add(new EndOfServicePolicyTier { MinYearsInclusive = 5m, MaxYearsExclusive = null, MonthsPerYearMultiplier = 1.0m, SortOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });

        p.ResignationDeductions.Add(new EndOfServiceResignationDeductionTier { MinYearsInclusive = 0m, MaxYearsExclusive = 2m, DeductionFraction = 1.0m, SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });
        p.ResignationDeductions.Add(new EndOfServiceResignationDeductionTier { MinYearsInclusive = 2m, MaxYearsExclusive = 5m, DeductionFraction = 2m / 3m, SortOrder = 2, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });
        p.ResignationDeductions.Add(new EndOfServiceResignationDeductionTier { MinYearsInclusive = 5m, MaxYearsExclusive = 10m, DeductionFraction = 1m / 3m, SortOrder = 3, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });
        p.ResignationDeductions.Add(new EndOfServiceResignationDeductionTier { MinYearsInclusive = 10m, MaxYearsExclusive = null, DeductionFraction = 0m, SortOrder = 4, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });

        db.EndOfServicePolicies.Add(p);
        db.SaveChanges();
    }

    private static EndOfServiceCalculator CreateCalc(IApplicationDbContext ctx)
        => new EndOfServiceCalculator(ctx, NullLogger<EndOfServiceCalculator>.Instance);

    [Fact]
    public async Task Short_service_under_five_years_applies_half_month_multiplier_only()
    {
        await using var db = NewInMemoryDb();
        SeedSaudiDefault(db, new DateTime(2000, 1, 1));

        // 3 years exact (365 * 3 days)
        var hire = new DateTime(2022, 1, 1);
        var term = hire.AddDays(365 * 3);
        var salary = 10000m;

        var calc = CreateCalc(db);
        var r = await calc.CalculateAsync(hire, term, TerminationType.Termination, salary, 0m, "SA");

        // Basis = 10000; 3y in tier [0,5) at 0.5 month/year = 1.5 months => 15000
        r.AppliedPolicyName.Should().Be("SA Standard");
        r.TotalAmountBeforeDeduction.Should().Be(15000m);
        r.DeductionAmount.Should().Be(0m);
        r.NetAmount.Should().Be(15000m);
        r.CalculationDetails.Should().Contain("Tiers:").And.Contain("SA Standard");
    }

    [Fact]
    public async Task Long_service_combines_both_tiers()
    {
        await using var db = NewInMemoryDb();
        SeedSaudiDefault(db, new DateTime(2000, 1, 1));

        // 8 years: tier1 5y * 0.5 = 2.5mo; tier2 3y * 1.0 = 3mo; total 5.5mo * 10000 = 55000
        var hire = new DateTime(2017, 1, 1);
        var term = hire.AddDays(365 * 8);

        var calc = CreateCalc(db);
        var r = await calc.CalculateAsync(hire, term, TerminationType.Termination, 10000m, 0m, "SA");

        r.TotalAmountBeforeDeduction.Should().Be(55000m);
    }

    [Theory]
    [InlineData(1, 1.0)]          // <2y → full deduction
    [InlineData(3, 2.0 / 3.0)]    // [2,5)
    [InlineData(7, 1.0 / 3.0)]    // [5,10)
    [InlineData(12, 0.0)]         // 10+ → no deduction
    public async Task Resignation_deduction_tiers_fire_at_correct_boundaries(int years, double expectedFraction)
    {
        await using var db = NewInMemoryDb();
        SeedSaudiDefault(db, new DateTime(2000, 1, 1));

        var hire = new DateTime(2025, 1, 1);
        var term = hire.AddDays(365 * years);

        var calc = CreateCalc(db);
        var r = await calc.CalculateAsync(hire, term, TerminationType.Resignation, 10000m, 0m, "SA");

        var expected = Math.Round((decimal)expectedFraction * r.TotalAmountBeforeDeduction, 2, MidpointRounding.AwayFromZero);
        r.DeductionAmount.Should().BeApproximately(expected, 1m);
    }

    [Fact]
    public async Task No_policy_falls_back_to_seeded_saudi_logic_without_throwing()
    {
        await using var db = NewInMemoryDb();
        // No policy seeded.

        var hire = new DateTime(2017, 1, 1);
        var term = hire.AddDays(365 * 3);

        var calc = CreateCalc(db);
        var r = await calc.CalculateAsync(hire, term, TerminationType.Termination, 10000m, 0m, "SA");

        r.UsedFallback.Should().BeTrue();
        r.AppliedPolicyId.Should().BeNull();
        r.TotalAmountBeforeDeduction.Should().Be(15000m);  // 3y * 0.5 month = 1.5mo * 10000
        r.CalculationDetails.Should().StartWith("FALLBACK");
    }

    [Fact]
    public async Task Effective_dated_resolver_picks_newest_active_matching_range()
    {
        await using var db = NewInMemoryDb();

        // Old policy: 0.5/1.0 — effective 2000..2024-12-31
        var oldP = new EndOfServicePolicy
        {
            Name = "Old SA", CountryCode = "SA", IsActive = true,
            EffectiveFromDate = new DateTime(2000, 1, 1),
            EffectiveToDate = new DateTime(2024, 12, 31),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        oldP.Tiers.Add(new EndOfServicePolicyTier { MinYearsInclusive = 0m, MonthsPerYearMultiplier = 0.5m, SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });

        // New policy: 1.0 — effective 2025-01-01..
        var newP = new EndOfServicePolicy
        {
            Name = "New SA", CountryCode = "SA", IsActive = true,
            EffectiveFromDate = new DateTime(2025, 1, 1),
            CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test"
        };
        newP.Tiers.Add(new EndOfServicePolicyTier { MinYearsInclusive = 0m, MonthsPerYearMultiplier = 1.0m, SortOrder = 1, CreatedAtUtc = DateTime.UtcNow, CreatedBy = "test" });

        db.EndOfServicePolicies.AddRange(oldP, newP);
        db.SaveChanges();

        var calc = CreateCalc(db);

        // Termination in 2024 → old policy → 3y * 0.5mo = 1.5mo
        var t1 = await calc.CalculateAsync(new DateTime(2021, 1, 1), new DateTime(2024, 1, 1), TerminationType.Termination, 10000m, 0m, "SA");
        t1.AppliedPolicyName.Should().Be("Old SA");

        // Termination in 2026 → new policy → applies 1.0 month multiplier
        var t2 = await calc.CalculateAsync(new DateTime(2023, 1, 1), new DateTime(2026, 1, 1), TerminationType.Termination, 10000m, 0m, "SA");
        t2.AppliedPolicyName.Should().Be("New SA");
    }
}
