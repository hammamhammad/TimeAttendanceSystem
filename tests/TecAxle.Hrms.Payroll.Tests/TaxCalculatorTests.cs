using FluentAssertions;
using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using Xunit;

namespace TecAxle.Hrms.Payroll.Tests;

public class TaxCalculatorTests
{
    private readonly TaxCalculator _sut = new();

    private static PayrollCalculationContext CtxWith(TaxConfiguration? taxConfig, List<AllowanceAssignment>? allowances = null) => new()
    {
        Period = new PayrollPeriod { Id = 1, BranchId = 1, StartDate = new DateTime(2026, 4, 1), EndDate = new DateTime(2026, 4, 30) },
        Employee = new Employee { Id = 1, FirstName = "Test", LastName = "User", EmployeeNumber = "T-1", BranchId = 1, HireDate = DateTime.UtcNow, EmploymentStatus = EmploymentStatus.Active, JobTitle = "X", IsActive = true },
        SalarySegments = Array.Empty<EmployeeSalary>(),
        AllowanceAssignments = allowances ?? new List<AllowanceAssignment>(),
        AttendanceRecords = Array.Empty<AttendanceRecord>(),
        Adjustments = Array.Empty<PayrollAdjustment>(),
        PublicHolidayDates = new HashSet<DateTime>(),
        TaxConfig = taxConfig,
        OvertimeConfigByDate = new Dictionary<DateTime, TecAxle.Hrms.Domain.Settings.OvertimeConfiguration>(),
        CalendarPolicy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = 30, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true }
    };

    [Fact]
    public void NoTaxConfig_SetsTaxZero_AndAddsWarning()
    {
        var ctx = CtxWith(null);
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 10000m };

        _sut.Apply(ctx, result, taxableBase: 10000m);

        result.TaxAmount.Should().Be(0m);
        result.Warnings.Should().Contain(w => w.Contains("No tax configuration"));
    }

    [Fact]
    public void EmptyBrackets_SetsTaxZero()
    {
        var ctx = CtxWith(new TaxConfiguration { Name = "Empty", Brackets = new List<TaxBracket>() });
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 10000m };

        _sut.Apply(ctx, result, 10000m);

        result.TaxAmount.Should().Be(0m);
    }

    [Fact]
    public void ZeroTaxableBase_ReturnsZero_EvenWithBrackets()
    {
        var config = new TaxConfiguration
        {
            Name = "T",
            Brackets = new List<TaxBracket> { new() { MinAmount = 0, MaxAmount = 10000, Rate = 0.10m } }
        };
        var ctx = CtxWith(config);
        var result = new PayrollCalculationResult { EmployeeId = 1 };

        _sut.Apply(ctx, result, 0m);

        result.TaxAmount.Should().Be(0m);
    }

    [Fact]
    public void SingleBracket_AppliesFlatRate()
    {
        var config = new TaxConfiguration
        {
            Name = "Flat",
            Brackets = new List<TaxBracket> { new() { MinAmount = 0, MaxAmount = 0, Rate = 0.20m } }
        };
        var ctx = CtxWith(config);
        var result = new PayrollCalculationResult { EmployeeId = 1 };

        _sut.Apply(ctx, result, 5000m);

        // 5000 * 20% = 1000
        result.TaxAmount.Should().Be(1000m);
    }

    [Fact]
    public void ThreeBrackets_Progressive_TopSliceIncluded()
    {
        // 0..5000 @ 0%, 5000..10000 @ 10%, 10000+ @ 20%
        var config = new TaxConfiguration
        {
            Name = "Progressive",
            Brackets = new List<TaxBracket>
            {
                new() { MinAmount = 0,     MaxAmount = 5000,   Rate = 0.00m },
                new() { MinAmount = 5000,  MaxAmount = 10000,  Rate = 0.10m },
                new() { MinAmount = 10000, MaxAmount = 999999, Rate = 0.20m }
            }
        };
        var ctx = CtxWith(config);
        var result = new PayrollCalculationResult { EmployeeId = 1 };

        _sut.Apply(ctx, result, 11066.67m);

        // 0 (bracket 1) + 500 (bracket 2: 5000*10%) + 213.33 (bracket 3: 1066.67*20%) = 713.33
        result.TaxAmount.Should().Be(713.33m);
    }

    [Fact]
    public void BaseExactlyAtBracketBoundary_StopsAtBoundary()
    {
        var config = new TaxConfiguration
        {
            Name = "Edge",
            Brackets = new List<TaxBracket>
            {
                new() { MinAmount = 0, MaxAmount = 5000,  Rate = 0.00m },
                new() { MinAmount = 5000, MaxAmount = 10000, Rate = 0.10m }
            }
        };
        var ctx = CtxWith(config);
        var result = new PayrollCalculationResult { EmployeeId = 1 };

        _sut.Apply(ctx, result, 5000m);

        // At exactly 5000 — only bracket 1 applies (0%). No bleed into bracket 2.
        result.TaxAmount.Should().Be(0m);
    }

    [Fact]
    public void AddsTaxDeductionDetailLine_WhenTaxNonZero()
    {
        var config = new TaxConfiguration
        {
            Name = "T",
            Brackets = new List<TaxBracket> { new() { MinAmount = 0, MaxAmount = 0, Rate = 0.10m } }
        };
        var ctx = CtxWith(config);
        var result = new PayrollCalculationResult { EmployeeId = 1 };

        _sut.Apply(ctx, result, 1000m);

        result.Details.Should().ContainSingle(d => d.ComponentType == SalaryComponentType.TaxDeduction && d.Amount == -100m);
    }
}
