using FluentAssertions;
using TecAxle.Hrms.Application.Payroll.Services;
using Xunit;

namespace TecAxle.Hrms.Payroll.Tests;

public class ProrationCalculatorTests
{
    private readonly ProrationCalculator _sut = new();
    private static readonly DateTime PeriodStart = new(2026, 4, 1);
    private static readonly DateTime PeriodEnd   = new(2026, 4, 30);

    [Fact]
    public void EffectiveRange_Covers_Whole_Period_Returns_1()
    {
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2024, 1, 1), null);
        f.Should().Be(1m);
    }

    [Fact]
    public void EffectiveRange_Starts_Mid_Period_Prorates()
    {
        // Starts Apr 15 inclusive → 16 days out of 30.
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2026, 4, 15), null);
        f.Should().BeApproximately(16m / 30m, 0.000001m);
    }

    [Fact]
    public void EffectiveRange_Ends_Mid_Period_Prorates()
    {
        // Ends Apr 14 inclusive → 14 days out of 30.
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2024, 1, 1), new DateTime(2026, 4, 14));
        f.Should().BeApproximately(14m / 30m, 0.000001m);
    }

    [Fact]
    public void EffectiveRange_Fully_Outside_Returns_0()
    {
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2026, 5, 1), new DateTime(2026, 5, 31));
        f.Should().Be(0m);
    }

    [Fact]
    public void EffectiveRange_Entirely_Inside_Period_Prorates_By_Length()
    {
        // Apr 5 .. Apr 10 inclusive = 6 days.
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2026, 4, 5), new DateTime(2026, 4, 10));
        f.Should().BeApproximately(6m / 30m, 0.000001m);
    }

    [Fact]
    public void EffectiveRange_Exactly_Matches_Period()
    {
        var f = _sut.GetFraction(PeriodStart, PeriodEnd, PeriodStart, PeriodEnd);
        f.Should().Be(1m);
    }

    [Fact]
    public void GetOverlapDays_Returns_Inclusive_Overlap()
    {
        _sut.GetOverlapDays(PeriodStart, PeriodEnd, new DateTime(2026, 4, 1), new DateTime(2026, 4, 1)).Should().Be(1);
        _sut.GetOverlapDays(PeriodStart, PeriodEnd, new DateTime(2026, 4, 1), new DateTime(2026, 4, 30)).Should().Be(30);
        _sut.GetOverlapDays(PeriodStart, PeriodEnd, new DateTime(2026, 3, 15), new DateTime(2026, 4, 5)).Should().Be(5);
        _sut.GetOverlapDays(PeriodStart, PeriodEnd, new DateTime(2026, 4, 25), new DateTime(2026, 5, 10)).Should().Be(6);
    }

    [Fact]
    public void End_Before_Start_Returns_Zero_Days_And_Zero_Fraction()
    {
        _sut.GetOverlapDays(PeriodStart, PeriodEnd, new DateTime(2026, 4, 20), new DateTime(2026, 4, 10)).Should().Be(0);
        _sut.GetFraction(PeriodStart, PeriodEnd, new DateTime(2026, 4, 20), new DateTime(2026, 4, 10)).Should().Be(0m);
    }
}
