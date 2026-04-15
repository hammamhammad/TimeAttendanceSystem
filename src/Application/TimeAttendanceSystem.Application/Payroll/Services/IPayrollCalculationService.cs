using System.Text.Json;
using TecAxle.Hrms.Application.Payroll.Exceptions;
using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Attendance;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Orchestrates per-employee payroll calculation. Stateless — safe to call per employee in a loop.
/// Uses <see cref="IPayrollInputResolver"/> for effective-date resolution, then delegates arithmetic
/// to dedicated calculators. NEVER hardcodes multipliers or day-count assumptions.
/// </summary>
public interface IPayrollCalculationService
{
    Task<PayrollCalculationResult> CalculateAsync(
        Employee employee,
        PayrollPeriod period,
        IReadOnlyList<PayrollAdjustment> adjustmentsForEmployee,
        CancellationToken ct);
}

public sealed class PayrollCalculationService : IPayrollCalculationService
{
    private readonly IPayrollInputResolver _resolver;
    private readonly IProrationCalculator _proration;
    private readonly IPayrollCalendarResolver _calendar;
    private readonly ITaxCalculator _tax;
    private readonly ISocialInsuranceCalculator _si;
    private readonly IOvertimePayCalculator _overtime;
    private readonly IAbsenceDeductionCalculator _absence;

    public PayrollCalculationService(
        IPayrollInputResolver resolver,
        IProrationCalculator proration,
        IPayrollCalendarResolver calendar,
        ITaxCalculator tax,
        ISocialInsuranceCalculator si,
        IOvertimePayCalculator overtime,
        IAbsenceDeductionCalculator absence)
    {
        _resolver = resolver;
        _proration = proration;
        _calendar = calendar;
        _tax = tax;
        _si = si;
        _overtime = overtime;
        _absence = absence;
    }

    public async Task<PayrollCalculationResult> CalculateAsync(
        Employee employee,
        PayrollPeriod period,
        IReadOnlyList<PayrollAdjustment> adjustmentsForEmployee,
        CancellationToken ct)
    {
        var ctx = await _resolver.BuildContextAsync(employee, period, adjustmentsForEmployee, ct);
        var result = new PayrollCalculationResult { EmployeeId = employee.Id };

        if (ctx.SalarySegments.Count == 0)
        {
            throw new PayrollCalculationException(
                $"Employee {employee.Id} has no effective salary for period {period.StartDate:yyyy-MM-dd}..{period.EndDate:yyyy-MM-dd}.",
                employee.Id,
                "EmployeeSalary");
        }

        // -------- Basic salary (with mid-period proration if the salary changed) --------
        var baseSalary = ResolveEffectiveBaseSalary(ctx, result);
        result.BaseSalary = baseSalary;

        // -------- Salary structure components (from latest effective salary in the period) --------
        var primarySalary = ctx.SalarySegments.Last(); // already ordered by EffectiveDate
        foreach (var comp in primarySalary.Components)
        {
            var sc = comp.SalaryComponent;
            var amount = comp.OverrideAmount ?? comp.Amount;

            result.Details.Add(new PayrollRecordDetail
            {
                SalaryComponentId = sc.Id,
                ComponentName = sc.Name,
                ComponentNameAr = sc.NameAr,
                ComponentType = sc.ComponentType,
                Amount = amount
            });

            if (sc.ComponentType >= SalaryComponentType.TaxDeduction)
                result.OtherDeductions += amount;
            else
                result.TotalAllowances += amount;
        }

        // -------- Pass 1: Allowance assignments (Fixed + PercentageOfBasic, stackable, prorated) --------
        // PercentageOfGross allowances are deferred to Pass 2 (after overtime) because the base for
        // those includes base salary + other allowances + overtime, and must not depend on itself.
        var deferredPctOfGross = new List<AllowanceAssignment>();
        foreach (var a in ctx.AllowanceAssignments)
        {
            var fraction = _proration.GetFraction(ctx.Period.StartDate, ctx.Period.EndDate, a.EffectiveFromDate, a.EffectiveToDate);
            if (fraction <= 0) continue;

            if (a.CalculationType == CalculationType.PercentageOfGross)
            {
                deferredPctOfGross.Add(a);
                continue;
            }

            var amountBase = ResolveAllowanceAmount(a, baseSalary, provisionalGross: null);
            var amount = Math.Round(amountBase * fraction, 2, MidpointRounding.AwayFromZero);
            if (amount == 0) continue;

            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = a.AllowanceType?.Name ?? "Allowance",
                ComponentNameAr = a.AllowanceType?.NameAr,
                ComponentType = SalaryComponentType.OtherAllowance,
                AllowanceTypeId = a.AllowanceTypeId,
                Amount = amount,
                Notes = fraction < 1m
                    ? $"Allowance #{a.Id} prorated ({fraction:P1}) | Eff. {a.EffectiveFromDate:yyyy-MM-dd}..{a.EffectiveToDate:yyyy-MM-dd}"
                    : $"Allowance #{a.Id}"
            });
            result.TotalAllowances += amount;
        }

        // -------- Manual adjustments --------
        foreach (var adj in ctx.Adjustments)
        {
            var isDeduction = adj.AdjustmentType is PayrollAdjustmentType.Penalty
                or PayrollAdjustmentType.LoanInstallment
                or PayrollAdjustmentType.InsuranceDeduction
                or PayrollAdjustmentType.TaxAdjustment;

            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = adj.Description,
                ComponentNameAr = adj.DescriptionAr,
                ComponentType = isDeduction ? SalaryComponentType.OtherDeduction : SalaryComponentType.Benefit,
                Amount = isDeduction ? -adj.Amount : adj.Amount,
                Notes = adj.Reason
            });

            if (isDeduction) result.OtherDeductions += adj.Amount;
            else result.TotalAllowances += adj.Amount;
        }

        // -------- Attendance-derived counts --------
        result.AbsentDays = ctx.AttendanceRecords.Count(a => a.Status == AttendanceStatus.Absent);
        result.WorkingDays = ctx.AttendanceRecords.Count(a => a.Status == AttendanceStatus.Present || a.Status == AttendanceStatus.Late);
        result.PaidDays = result.WorkingDays;

        // -------- Overtime (policy-driven, day-type-aware) --------
        var dailyRateBasis = _calendar.GetDailyRateBasis(ctx);
        var standardHoursPerDay = _calendar.GetStandardHoursPerDay(ctx.CalendarPolicy);
        var hourlyBasis = dailyRateBasis > 0 && standardHoursPerDay > 0
            ? baseSalary / dailyRateBasis / standardHoursPerDay
            : 0m;
        _overtime.Apply(ctx, result, hourlyBasis);
        if (result.OvertimePay > 0) result.TotalAllowances += result.OvertimePay;

        // -------- Pass 2: PercentageOfGross allowances --------
        // The provisional gross here is base + all Pass-1 allowances + overtime (but NOT
        // pct-of-gross allowances themselves, to avoid self-reference). Pct allowances are
        // then added on top. A tenant that wants "stacking" pct-of-gross should split them
        // into separate assignments with distinct effective windows if the business rule differs.
        if (deferredPctOfGross.Count > 0)
        {
            var provisionalGross = baseSalary + result.TotalAllowances;
            foreach (var a in deferredPctOfGross)
            {
                var fraction = _proration.GetFraction(ctx.Period.StartDate, ctx.Period.EndDate, a.EffectiveFromDate, a.EffectiveToDate);
                if (fraction <= 0) continue;

                var amountBase = ResolveAllowanceAmount(a, baseSalary, provisionalGross);
                var amount = Math.Round(amountBase * fraction, 2, MidpointRounding.AwayFromZero);
                if (amount == 0) continue;

                result.Details.Add(new PayrollRecordDetail
                {
                    ComponentName = a.AllowanceType?.Name ?? "Allowance",
                    ComponentNameAr = a.AllowanceType?.NameAr,
                    ComponentType = SalaryComponentType.OtherAllowance,
                    AllowanceTypeId = a.AllowanceTypeId,
                    Amount = amount,
                    Notes = $"Allowance #{a.Id} @ {(a.Percentage ?? 0m):F2}% of gross ({provisionalGross:F2}){(fraction < 1m ? $" prorated ({fraction:P1})" : "")}"
                });
                result.TotalAllowances += amount;
            }
        }

        // -------- Absence deduction (policy-driven daily basis) --------
        _absence.Apply(ctx, result, dailyRateBasis);

        // -------- Tax --------
        var taxableBase = _tax.BuildTaxableBase(ctx, result);
        _tax.Apply(ctx, result, taxableBase);

        // -------- Social insurance --------
        _si.Apply(ctx, result);

        // -------- Final totals --------
        result.GrossEarnings = Math.Round(baseSalary + result.TotalAllowances, 2, MidpointRounding.AwayFromZero);
        result.TotalDeductions = Math.Round(
            result.TaxAmount +
            result.SocialInsuranceEmployee +
            result.AbsenceDeduction +
            result.OtherDeductions, 2, MidpointRounding.AwayFromZero);
        result.NetSalary = Math.Round(result.GrossEarnings - result.TotalDeductions, 2, MidpointRounding.AwayFromZero);

        // -------- Warnings + audit snapshot --------
        result.Warnings.AddRange(ctx.Warnings);
        result.CalculationBreakdownJson = BuildBreakdownSnapshot(ctx, result, dailyRateBasis, hourlyBasis);

        return result;
    }

    /// <summary>
    /// If a single salary applies for the full period, returns its base.
    /// If the salary changed mid-period, returns a time-weighted average across slices.
    /// </summary>
    private decimal ResolveEffectiveBaseSalary(PayrollCalculationContext ctx, PayrollCalculationResult result)
    {
        if (ctx.SalarySegments.Count == 1)
            return ctx.SalarySegments[0].BaseSalary;

        decimal weighted = 0m;
        foreach (var s in ctx.SalarySegments)
        {
            var from = s.EffectiveDate;
            var to = s.EndDate;
            var frac = _proration.GetFraction(ctx.Period.StartDate, ctx.Period.EndDate, from, to);
            weighted += s.BaseSalary * frac;
        }
        result.Warnings.Add(
            $"Mid-period salary change detected for employee {ctx.Employee.Id}; base salary prorated across {ctx.SalarySegments.Count} slice(s).");
        return Math.Round(weighted, 2, MidpointRounding.AwayFromZero);
    }

    private static decimal ResolveAllowanceAmount(AllowanceAssignment a, decimal baseSalary, decimal? provisionalGross)
    {
        return a.CalculationType switch
        {
            CalculationType.PercentageOfBasic => Math.Round(baseSalary * (a.Percentage ?? 0m) / 100m, 2, MidpointRounding.AwayFromZero),
            CalculationType.PercentageOfGross => provisionalGross.HasValue
                ? Math.Round(provisionalGross.Value * (a.Percentage ?? 0m) / 100m, 2, MidpointRounding.AwayFromZero)
                : 0m,
            _ => a.Amount
        };
    }

    private static string BuildBreakdownSnapshot(PayrollCalculationContext ctx, PayrollCalculationResult result, int dailyRateBasis, decimal hourlyBasis)
    {
        var snapshot = new
        {
            ctx.Period.Id,
            Employee = ctx.Employee.Id,
            Salary = new { result.BaseSalary, Segments = ctx.SalarySegments.Select(s => new { s.Id, s.EffectiveDate, s.EndDate, s.BaseSalary }) },
            AllowanceIds = ctx.AllowanceAssignments.Select(a => a.Id),
            TaxConfig = ctx.TaxConfig != null ? new { ctx.TaxConfig.Id, ctx.TaxConfig.EffectiveDate, BracketCount = ctx.TaxConfig.Brackets?.Count ?? 0 } : null,
            SocialInsuranceConfig = ctx.SocialInsuranceConfig != null ? new { ctx.SocialInsuranceConfig.Id, ctx.SocialInsuranceConfig.EffectiveDate, ctx.SocialInsuranceConfig.EmployeeContributionRate, ctx.SocialInsuranceConfig.EmployerContributionRate, ctx.SocialInsuranceConfig.MaxInsurableSalary, ctx.SocialInsuranceConfig.AppliesToNationalityCode } : null,
            EmployeeInsurance = ctx.EmployeeInsurance?.Id,
            CalendarPolicy = new { ctx.CalendarPolicy.BasisType, ctx.CalendarPolicy.FixedBasisDays, ctx.CalendarPolicy.StandardHoursPerDay, DailyRateBasisUsed = dailyRateBasis, HourlyBasisUsed = hourlyBasis },
            OvertimeConfigIdsUsed = ctx.OvertimeConfigByDate.Values.Select(v => v.Id).Distinct(),
            PublicHolidayDates = ctx.PublicHolidayDates.Select(d => d.ToString("yyyy-MM-dd")).ToArray(),
            Totals = new { result.GrossEarnings, result.TotalDeductions, result.NetSalary, result.TaxAmount, result.SocialInsuranceEmployee, result.SocialInsuranceEmployer, result.OvertimePay, result.AbsenceDeduction }
        };
        return JsonSerializer.Serialize(snapshot);
    }
}
