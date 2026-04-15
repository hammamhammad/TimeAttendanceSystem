using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Absence deduction calculator — uses the configurable daily-rate basis (no hardcoded 30).
/// </summary>
public interface IAbsenceDeductionCalculator
{
    void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, int dailyRateBasis);
}

public sealed class AbsenceDeductionCalculator : IAbsenceDeductionCalculator
{
    public void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, int dailyRateBasis)
    {
        if (result.AbsentDays <= 0 || result.BaseSalary <= 0m || dailyRateBasis <= 0)
        {
            result.AbsenceDeduction = 0m;
            return;
        }

        var dailyRate = result.BaseSalary / dailyRateBasis;
        var deduction = Math.Round(result.AbsentDays * dailyRate, 2, MidpointRounding.AwayFromZero);

        result.AbsenceDeduction = deduction;
        result.Details.Add(new PayrollRecordDetail
        {
            ComponentName = "Absence Deduction",
            ComponentNameAr = "خصم غياب",
            ComponentType = SalaryComponentType.OtherDeduction,
            Amount = -deduction,
            Notes = $"{result.AbsentDays} absent day(s) × {dailyRate:F2}/day (basis: {dailyRateBasis} days | policy: {ctx.CalendarPolicy.BasisType})"
        });
    }
}
