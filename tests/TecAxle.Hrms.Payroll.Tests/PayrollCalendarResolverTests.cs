using FluentAssertions;
using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Application.Payroll.Services;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using Xunit;

namespace TecAxle.Hrms.Payroll.Tests;

public class PayrollCalendarResolverTests
{
    private readonly PayrollCalendarResolver _sut = new();

    private static PayrollCalculationContext Build(PayrollCalendarPolicy policy, HashSet<DateTime>? holidays = null) => new()
    {
        Period = new PayrollPeriod { Id = 1, BranchId = 1, StartDate = new DateTime(2026, 4, 1), EndDate = new DateTime(2026, 4, 30) },
        Employee = new Employee { Id = 1, FirstName = "T", LastName = "U", EmployeeNumber = "T-1", BranchId = 1, HireDate = DateTime.UtcNow, EmploymentStatus = EmploymentStatus.Active, JobTitle = "X", IsActive = true },
        SalarySegments = Array.Empty<EmployeeSalary>(),
        AllowanceAssignments = Array.Empty<AllowanceAssignment>(),
        AttendanceRecords = Array.Empty<AttendanceRecord>(),
        Adjustments = Array.Empty<PayrollAdjustment>(),
        PublicHolidayDates = holidays ?? new HashSet<DateTime>(),
        OvertimeConfigByDate = new Dictionary<DateTime, TecAxle.Hrms.Domain.Settings.OvertimeConfiguration>(),
        CalendarPolicy = policy
    };

    [Fact]
    public void CalendarDays_Returns_30_For_April()
    {
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.CalendarDays, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetDailyRateBasis(Build(policy)).Should().Be(30);
    }

    [Fact]
    public void FixedBasis_Returns_Configured_Value()
    {
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = 26, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetDailyRateBasis(Build(policy)).Should().Be(26);
    }

    [Fact]
    public void FixedBasis_With_Null_Days_Falls_Back_To_30()
    {
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.FixedBasis, FixedBasisDays = null, StandardHoursPerDay = 8m, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetDailyRateBasis(Build(policy)).Should().Be(30);
    }

    [Fact]
    public void WorkingDays_Excludes_Friday_And_Saturday_Weekend()
    {
        // April 2026: 8 weekend days (Fri + Sat). 30 - 8 = 22 working days.
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.WorkingDays, StandardHoursPerDay = 8m, TreatPublicHolidaysAsPaid = true, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetDailyRateBasis(Build(policy)).Should().Be(22);
    }

    [Fact]
    public void WorkingDays_Excludes_Unpaid_Public_Holidays()
    {
        var holidays = new HashSet<DateTime> { new DateTime(2026, 4, 8) }; // Wed
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.WorkingDays, StandardHoursPerDay = 8m, TreatPublicHolidaysAsPaid = false, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        // 22 working days minus 1 unpaid holiday = 21
        _sut.GetDailyRateBasis(Build(policy, holidays)).Should().Be(21);
    }

    [Fact]
    public void WorkingDays_Paid_Holidays_Do_Not_Subtract()
    {
        var holidays = new HashSet<DateTime> { new DateTime(2026, 4, 8) };
        var policy = new PayrollCalendarPolicy { BasisType = PayrollDailyBasisType.WorkingDays, StandardHoursPerDay = 8m, TreatPublicHolidaysAsPaid = true, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetDailyRateBasis(Build(policy, holidays)).Should().Be(22);
    }

    [Fact]
    public void GetStandardHoursPerDay_Returns_Policy_Value()
    {
        var policy = new PayrollCalendarPolicy { StandardHoursPerDay = 7.5m, BasisType = PayrollDailyBasisType.CalendarDays, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetStandardHoursPerDay(policy).Should().Be(7.5m);
    }

    [Fact]
    public void GetStandardHoursPerDay_NonPositive_Falls_Back_To_8()
    {
        var policy = new PayrollCalendarPolicy { StandardHoursPerDay = 0m, BasisType = PayrollDailyBasisType.CalendarDays, EffectiveFromDate = DateTime.MinValue, IsActive = true };
        _sut.GetStandardHoursPerDay(policy).Should().Be(8m);
    }
}
