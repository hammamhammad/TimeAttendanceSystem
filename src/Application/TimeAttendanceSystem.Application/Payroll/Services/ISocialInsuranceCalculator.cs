using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Social insurance calculator — consumes the effective <c>SocialInsuranceConfig</c> and checks <c>EmployeeInsurance</c>.
/// Caps the insurable base at <c>MaxInsurableSalary</c>. Respects <c>AllowanceType.IsSocialInsurable</c>.
/// </summary>
public interface ISocialInsuranceCalculator
{
    void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result);
}

public sealed class SocialInsuranceCalculator : ISocialInsuranceCalculator
{
    public void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result)
    {
        if (ctx.SocialInsuranceConfig == null)
        {
            result.Warnings.Add("No social insurance configuration effective for this period; SI set to 0.");
            return;
        }

        // If the employee has no active EmployeeInsurance record for the period, exclude them with a warning.
        // This is deliberate: auto-inclusion by default could produce incorrect deductions for contractors or exempt staff.
        if (ctx.EmployeeInsurance == null)
        {
            result.Warnings.Add($"Employee has no active insurance enrollment overlapping the period; SI set to 0.");
            return;
        }

        var config = ctx.SocialInsuranceConfig;
        var maxInsurable = config.MaxInsurableSalary > 0 ? config.MaxInsurableSalary : decimal.MaxValue;

        // Build insurable base: basic + SI-eligible allowances.
        decimal insurable = result.BaseSalary;
        foreach (var d in result.Details)
        {
            if (d.ComponentType >= SalaryComponentType.TaxDeduction) continue;
            if (d.AllowanceTypeId.HasValue)
            {
                var assignment = ctx.AllowanceAssignments.FirstOrDefault(a => a.AllowanceTypeId == d.AllowanceTypeId);
                var isInsurable = assignment?.AllowanceType?.IsSocialInsurable ?? true;
                if (isInsurable) insurable += d.Amount;
            }
        }

        insurable = Math.Min(insurable, maxInsurable);
        if (insurable <= 0) return;

        var employee = Math.Round(insurable * config.EmployeeContributionRate, 2, MidpointRounding.AwayFromZero);
        var employer = Math.Round(insurable * config.EmployerContributionRate, 2, MidpointRounding.AwayFromZero);

        result.SocialInsuranceEmployee = employee;
        result.SocialInsuranceEmployer = employer;

        if (employee > 0)
        {
            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Social Insurance (Employee)",
                ComponentNameAr = "التأمينات الاجتماعية (موظف)",
                ComponentType = SalaryComponentType.SocialInsuranceDeduction,
                Amount = -employee,
                Notes = $"Insurable base: {insurable:F2} @ {config.EmployeeContributionRate:P2} | Config: {config.Name}"
            });
        }

        // Employer contribution is recorded as informational detail only; not in net pay calculation.
        if (employer > 0)
        {
            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Social Insurance (Employer)",
                ComponentNameAr = "التأمينات الاجتماعية (صاحب العمل)",
                ComponentType = SalaryComponentType.Benefit,
                Amount = employer,
                Notes = $"Employer contribution @ {config.EmployerContributionRate:P2} (informational; not deducted from net)"
            });
        }
    }
}
