using Microsoft.EntityFrameworkCore;
using TecAxle.Hrms.Application.Abstractions;
using TecAxle.Hrms.Application.Payroll.Exceptions;
using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Builds a fully-resolved <see cref="PayrollCalculationContext"/> for one employee and one period.
/// THIS is where all effective-date resolution happens — calculators are pure downstream.
///
/// Resolution rules (documented in PAYROLL_PRODUCTION_FIX_REVIEW.md):
/// 1. Records whose [EffectiveFrom, EffectiveTo] intersect [PeriodStart, PeriodEnd] are candidates.
/// 2. Salary / TaxConfig / SocialInsuranceConfig: latest EffectiveDate &lt;= PeriodEnd wins;
///    if multiple overlap mid-period, all slices are returned (prorated by orchestrator).
/// 3. AllowanceAssignment: all overlapping assignments apply (they are stackable).
/// 4. SocialInsuranceConfig: filter by AppliesToNationalityCode if set (null = applies to all).
/// 5. OvertimeConfiguration: per-date lookup — allows mid-period config changes per day.
/// 6. Overlapping records where only one should apply (e.g. two current salaries) → PayrollCalculationException.
/// </summary>
public interface IPayrollInputResolver
{
    Task<PayrollCalculationContext> BuildContextAsync(
        Employee employee,
        PayrollPeriod period,
        IReadOnlyList<PayrollAdjustment> adjustmentsForEmployee,
        CancellationToken ct);
}

public sealed class PayrollInputResolver : IPayrollInputResolver
{
    private readonly IApplicationDbContext _db;

    public PayrollInputResolver(IApplicationDbContext db) => _db = db;

    public async Task<PayrollCalculationContext> BuildContextAsync(
        Employee employee,
        PayrollPeriod period,
        IReadOnlyList<PayrollAdjustment> adjustmentsForEmployee,
        CancellationToken ct)
    {
        var periodStart = period.StartDate.Date;
        var periodEnd = period.EndDate.Date;

        // --- Salary segments (effective-dating honored). May produce multiple slices when salary changes mid-period.
        var salarySegments = await _db.EmployeeSalaries
            .Include(s => s.Components.Where(c => !c.IsDeleted))
                .ThenInclude(c => c.SalaryComponent)
            .Where(s => s.EmployeeId == employee.Id
                        && !s.IsDeleted
                        && s.EffectiveDate.Date <= periodEnd
                        && (s.EndDate == null || s.EndDate.Value.Date >= periodStart))
            .OrderBy(s => s.EffectiveDate)
            .ToListAsync(ct);

        // Detect clearly-overlapping salaries where BOTH are marked IsCurrent.
        // (It's fine if one is closed via EndDate; only "two open-ended current" rows are an anomaly.)
        var openCurrent = salarySegments.Where(s => s.IsCurrent && s.EndDate == null).ToList();
        if (openCurrent.Count > 1)
        {
            throw new PayrollCalculationException(
                $"Employee {employee.Id} has {openCurrent.Count} open-ended current salary records. Resolve before processing payroll.",
                employee.Id,
                "EmployeeSalary");
        }

        // --- Allowance assignments overlapping the period.
        var allowances = await _db.AllowanceAssignments
            .Include(a => a.AllowanceType)
            .Where(a => a.EmployeeId == employee.Id
                        && !a.IsDeleted
                        && a.Status == AllowanceAssignmentStatus.Active
                        && a.EffectiveFromDate.Date <= periodEnd
                        && (a.EffectiveToDate == null || a.EffectiveToDate.Value.Date >= periodStart))
            .ToListAsync(ct);

        // --- Attendance
        var attendance = await _db.AttendanceRecords
            .Where(a => a.EmployeeId == employee.Id
                        && !a.IsDeleted
                        && a.AttendanceDate.Date >= periodStart
                        && a.AttendanceDate.Date <= periodEnd)
            .ToListAsync(ct);

        // --- Public holidays relevant for OT day-type classification and working-day basis.
        // PublicHoliday supports recurrence (Annual/OneTime/etc.), so resolve to concrete dates for the period's years.
        var holidayRules = await _db.PublicHolidays
            .Where(h => !h.IsDeleted && h.IsActive
                        && (h.BranchId == null || h.BranchId == period.BranchId))
            .ToListAsync(ct);

        var publicHolidayDates = new HashSet<DateTime>();
        var yearsInPeriod = new HashSet<int>();
        for (var y = periodStart.Year; y <= periodEnd.Year; y++) yearsInPeriod.Add(y);
        foreach (var rule in holidayRules)
        {
            foreach (var year in yearsInPeriod)
            {
                var date = rule.GetHolidayDateForYear(year);
                if (!date.HasValue) continue;
                // Normalize to Unspecified so HashSet lookups by AttendanceDate.Date (potentially Utc)
                // match regardless of DateTimeKind (GetHashCode mixes Kind into the hash).
                var dateOnly = DateTime.SpecifyKind(date.Value.Date, DateTimeKind.Unspecified);
                var ps = DateTime.SpecifyKind(periodStart, DateTimeKind.Unspecified);
                var pe = DateTime.SpecifyKind(periodEnd, DateTimeKind.Unspecified);
                if (dateOnly >= ps && dateOnly <= pe)
                    publicHolidayDates.Add(dateOnly);
            }
        }

        // --- Tax configuration (branch-specific first, else tenant-wide).
        var taxConfig = await _db.TaxConfigurations
            .Include(t => t.Brackets.Where(b => !b.IsDeleted))
            .Where(t => !t.IsDeleted
                        && t.IsActive
                        && t.EffectiveDate.Date <= periodEnd
                        && (t.BranchId == period.BranchId || t.BranchId == null))
            .OrderByDescending(t => t.BranchId != null)    // prefer branch-specific
            .ThenByDescending(t => t.EffectiveDate)         // then latest effective
            .FirstOrDefaultAsync(ct);

        // --- Social insurance config (nationality-aware).
        var employeeNationality = employee.Nationality;
        var siConfigs = await _db.SocialInsuranceConfigs
            .Where(s => !s.IsDeleted
                        && s.IsActive
                        && s.EffectiveDate.Date <= periodEnd
                        && (s.BranchId == period.BranchId || s.BranchId == null))
            .OrderByDescending(s => s.BranchId != null)
            .ThenByDescending(s => s.EffectiveDate)
            .ToListAsync(ct);

        var siConfig = siConfigs.FirstOrDefault(s =>
                string.Equals(s.AppliesToNationalityCode, employeeNationality, StringComparison.OrdinalIgnoreCase))
            ?? siConfigs.FirstOrDefault(s => string.IsNullOrEmpty(s.AppliesToNationalityCode));

        // --- Employee insurance enrollment overlapping the period.
        var employeeInsurance = await _db.EmployeeInsurances
            .Where(ei => !ei.IsDeleted
                         && ei.IsActive
                         && ei.EmployeeId == employee.Id
                         && ei.StartDate.Date <= periodEnd
                         && (ei.EndDate == null || ei.EndDate.Value.Date >= periodStart))
            .OrderByDescending(ei => ei.StartDate)
            .FirstOrDefaultAsync(ct);

        // --- Phase 1 (v14.1): Active benefit enrollments with payroll deduction enabled
        // whose effective window overlaps the period.
        var benefitEnrollments = await _db.BenefitEnrollments
            .Include(e => e.BenefitPlan)
            .Where(e => !e.IsDeleted
                        && e.EmployeeId == employee.Id
                        && e.Status == Domain.Common.BenefitEnrollmentStatus.Active
                        && e.PayrollDeductionEnabled
                        && e.EmployeeMonthlyContribution > 0
                        && e.EffectiveDate.Date <= periodEnd
                        && (e.TerminationDate == null || e.TerminationDate.Value.Date >= periodStart))
            .ToListAsync(ct);

        // --- Calendar policy (branch override beats tenant default; latest effective wins).
        var calendarPolicy = await _db.PayrollCalendarPolicies
            .Where(p => !p.IsDeleted
                        && p.IsActive
                        && p.EffectiveFromDate.Date <= periodEnd
                        && (p.EffectiveToDate == null || p.EffectiveToDate.Value.Date >= periodStart)
                        && (p.BranchId == period.BranchId || p.BranchId == null))
            .OrderByDescending(p => p.BranchId != null)
            .ThenByDescending(p => p.EffectiveFromDate)
            .FirstOrDefaultAsync(ct)
            ?? DefaultCalendarPolicy();   // backward-compat fallback: 30-day fixed basis

        // --- Overtime configurations — build a per-date map. Config can change within the period.
        var otConfigs = await _db.OvertimeConfigurations
            .Where(o => !o.IsDeleted
                        && o.IsActive
                        && o.EffectiveFromDate.Date <= periodEnd
                        && (o.EffectiveToDate == null || o.EffectiveToDate.Value.Date >= periodStart))
            .OrderBy(o => o.EffectiveFromDate)
            .ToListAsync(ct);

        var otByDate = new Dictionary<DateTime, Domain.Settings.OvertimeConfiguration>();
        for (var d = periodStart; d <= periodEnd; d = d.AddDays(1))
        {
            var active = otConfigs
                .Where(o => o.EffectiveFromDate.Date <= d
                            && (o.EffectiveToDate == null || o.EffectiveToDate.Value.Date >= d))
                .OrderByDescending(o => o.EffectiveFromDate)
                .FirstOrDefault();
            // Key with Unspecified kind so lookups by att.AttendanceDate.Date match regardless of Kind.
            var key = DateTime.SpecifyKind(d, DateTimeKind.Unspecified);
            if (active != null) otByDate[key] = active;
        }

        var ctx = new PayrollCalculationContext
        {
            Period = period,
            Employee = employee,
            SalarySegments = salarySegments,
            AllowanceAssignments = allowances,
            AttendanceRecords = attendance,
            Adjustments = adjustmentsForEmployee,
            PublicHolidayDates = publicHolidayDates,
            TaxConfig = taxConfig,
            SocialInsuranceConfig = siConfig,
            EmployeeInsurance = employeeInsurance,
            OvertimeConfigByDate = otByDate,
            CalendarPolicy = calendarPolicy,
            BenefitEnrollments = benefitEnrollments
        };

        if (taxConfig == null)
            ctx.Warnings.Add("No tax configuration resolved for this branch/period — tax will be 0.");
        if (siConfig == null)
            ctx.Warnings.Add("No social insurance configuration resolved for this branch/period — SI will be 0.");
        if (otByDate.Count == 0 && attendance.Any(a => a.OvertimeHours > 0))
            ctx.Warnings.Add("Overtime hours recorded but no overtime configuration active during the period.");

        return ctx;
    }

    private static PayrollCalendarPolicy DefaultCalendarPolicy() => new()
    {
        BasisType = PayrollDailyBasisType.FixedBasis,
        FixedBasisDays = 30,
        StandardHoursPerDay = 8m,
        TreatPublicHolidaysAsPaid = true,
        EffectiveFromDate = DateTime.MinValue,
        IsActive = true
    };
}
