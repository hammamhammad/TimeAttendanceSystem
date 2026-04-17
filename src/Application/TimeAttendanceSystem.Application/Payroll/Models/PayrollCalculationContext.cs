using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Benefits;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Settings;

namespace TecAxle.Hrms.Application.Payroll.Models;

/// <summary>
/// Fully-resolved inputs required to calculate one employee's payroll for one period.
/// Built by <c>IPayrollInputResolver</c>; consumed by the calculators.
/// All effective-date resolution is done BEFORE this object is built — calculators are pure.
/// </summary>
public class PayrollCalculationContext
{
    public required PayrollPeriod Period { get; init; }
    public required Employee Employee { get; init; }

    /// <summary>Resolved employee salary records that overlap the period (ordered by EffectiveDate).</summary>
    public required IReadOnlyList<EmployeeSalary> SalarySegments { get; init; }

    public required IReadOnlyList<AllowanceAssignment> AllowanceAssignments { get; init; }
    public required IReadOnlyList<AttendanceRecord> AttendanceRecords { get; init; }
    public required IReadOnlyList<PayrollAdjustment> Adjustments { get; init; }

    /// <summary>Concrete public-holiday calendar dates falling inside the payroll period (already resolved).</summary>
    public required IReadOnlySet<DateTime> PublicHolidayDates { get; init; }

    /// <summary>Effective tax configuration for the period (null = no tax config configured).</summary>
    public TaxConfiguration? TaxConfig { get; init; }

    /// <summary>Effective social-insurance config best matching the employee (nationality-aware).</summary>
    public SocialInsuranceConfig? SocialInsuranceConfig { get; init; }

    /// <summary>Active employee-insurance record whose coverage overlaps the period (null = not enrolled).</summary>
    public EmployeeInsurance? EmployeeInsurance { get; init; }

    /// <summary>OT configs per distinct day in the period (keyed by date, value = config active that day).</summary>
    public required IReadOnlyDictionary<DateTime, OvertimeConfiguration> OvertimeConfigByDate { get; init; }

    public required PayrollCalendarPolicy CalendarPolicy { get; init; }

    /// <summary>
    /// Phase 1 (v14.1): Active benefit enrollments with payroll deduction enabled whose effective
    /// window overlaps the payroll period. Consumed by the BenefitDeductionIntegrator to produce
    /// an employee-premium deduction line. Empty list = no benefit deductions.
    /// </summary>
    public IReadOnlyList<BenefitEnrollment> BenefitEnrollments { get; init; } = Array.Empty<BenefitEnrollment>();

    /// <summary>
    /// Non-fatal issues captured during input resolution. Calculators may append more.
    /// Surfaced to <c>PayrollRunAuditItem.WarningsJson</c>.
    /// </summary>
    public List<string> Warnings { get; } = new();
}
