using FluentAssertions;
using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using Xunit;

namespace TecAxle.Hrms.Payroll.Tests;

public class AbsenceDeductionCalculatorTests
{
    private readonly AbsenceDeductionCalculator _sut = new();

    private static PayrollCalculationContext Ctx(PayrollCalendarPolicy policy) => new()
    {
        Period = new PayrollPeriod { Id = 1, BranchId = 1, StartDate = new DateTime(2026, 4, 1), EndDate = new DateTime(2026, 4, 30) },
        Employee = new Employee { Id = 1, FirstName = "T", LastName = "U", EmployeeNumber = "T-1", BranchId = 1, HireDate = DateTime.UtcNow, EmploymentStatus = EmploymentStatus.Active, JobTitle = "X", IsActive = true },
        SalarySegments = Array.Empty<EmployeeSalary>(),
        AllowanceAssignments = Array.Empty<AllowanceAssignment>(),
        AttendanceRecords = Array.Empty<AttendanceRecord>(),
        Adjustments = Array.Empty<PayrollAdjustment>(),
        PublicHolidayDates = new HashSet<DateTime>(),
        OvertimeConfigByDate = new Dictionary<DateTime, TecAxle.Hrms.Domain.Settings.OvertimeConfiguration>(),
        CalendarPolicy = policy
    };

    [Fact]
    public void ZeroAbsences_ProducesZeroDeduction()
    {
        var ctx = Ctx(new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = 30, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true });
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 10000m, AbsentDays = 0 };

        _sut.Apply(ctx, result, dailyRateBasis: 30);

        result.AbsenceDeduction.Should().Be(0m);
        result.Details.Should().BeEmpty();
    }

    [Fact]
    public void FixedBasis30_ComputesDailyRateFromBase()
    {
        var ctx = Ctx(new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = 30, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true });
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 9000m, AbsentDays = 2 };

        _sut.Apply(ctx, result, dailyRateBasis: 30);

        // 9000 / 30 = 300/day, 2 days = 600
        result.AbsenceDeduction.Should().Be(600m);
        result.Details.Should().ContainSingle(d => d.ComponentType == SalaryComponentType.OtherDeduction && d.Amount == -600m);
    }

    [Fact]
    public void WorkingDays_Basis_AppliesFewerDaysHigherDailyRate()
    {
        var ctx = Ctx(new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.WorkingDays, StandardHoursPerDay = 8m, TreatPublicHolidaysAsPaid = true, EffectiveFromDate = DateTime.MinValue, IsActive = true });
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 22000m, AbsentDays = 1 };

        _sut.Apply(ctx, result, dailyRateBasis: 22);

        // 22000 / 22 = 1000/day. 1 absent day => 1000.
        result.AbsenceDeduction.Should().Be(1000m);
    }

    [Fact]
    public void ZeroBasis_OrZeroBase_ProducesZero()
    {
        var ctx = Ctx(new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = 30, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true });
        var result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 0m, AbsentDays = 5 };
        _sut.Apply(ctx, result, dailyRateBasis: 30);
        result.AbsenceDeduction.Should().Be(0m);

        result = new PayrollCalculationResult { EmployeeId = 1, BaseSalary = 10000m, AbsentDays = 5 };
        _sut.Apply(ctx, result, dailyRateBasis: 0);
        result.AbsenceDeduction.Should().Be(0m);
    }
}
