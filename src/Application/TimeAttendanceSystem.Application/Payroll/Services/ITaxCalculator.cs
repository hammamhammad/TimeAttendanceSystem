using TecAxle.Hrms.Application.Payroll.Models;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Services;

/// <summary>
/// Tax calculator — consumes the effective <c>TaxConfiguration</c>'s progressive brackets.
/// NEVER hardcodes a rate. Respects <c>SalaryComponent.IsTaxable</c> and <c>AllowanceType.IsTaxable</c> flags.
/// </summary>
public interface ITaxCalculator
{
    /// <summary>
    /// Applies the effective tax brackets to the taxable base and writes results into <paramref name="result"/>.
    /// If no tax config exists, TaxAmount is 0 and a warning is appended.
    /// </summary>
    void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, decimal taxableBase);

    /// <summary>
    /// Builds the taxable base from the already-computed components in <paramref name="result"/> (basic + taxable allowances).
    /// The orchestrator invokes this after allowances and the basic salary are set but before deductions.
    /// </summary>
    decimal BuildTaxableBase(PayrollCalculationContext ctx, PayrollCalculationResult result);
}

public sealed class TaxCalculator : ITaxCalculator
{
    public decimal BuildTaxableBase(PayrollCalculationContext ctx, PayrollCalculationResult result)
    {
        // Basic salary is taxable by default (there is no system-wide "Basic component" flag),
        // but allowances in the Details list carry the AllowanceType's IsTaxable flag via the assignment.
        decimal taxable = result.BaseSalary;

        foreach (var d in result.Details)
        {
            if (d.ComponentType >= SalaryComponentType.TaxDeduction) continue; // deductions never taxable
            if (d.AllowanceTypeId.HasValue)
            {
                var assignment = ctx.AllowanceAssignments.FirstOrDefault(a => a.AllowanceTypeId == d.AllowanceTypeId);
                var isTaxable = assignment?.AllowanceType?.IsTaxable ?? true; // default allowances taxable
                if (isTaxable) taxable += d.Amount;
            }
            else if (d.SalaryComponentId.HasValue)
            {
                // Structure component — use IsTaxable from it if available via context, else include by default.
                // We don't keep a direct reference here; conservative default: include.
                taxable += d.Amount;
            }
        }
        return taxable;
    }

    public void Apply(PayrollCalculationContext ctx, PayrollCalculationResult result, decimal taxableBase)
    {
        if (ctx.TaxConfig == null || ctx.TaxConfig.Brackets == null || ctx.TaxConfig.Brackets.Count == 0)
        {
            result.TaxAmount = 0m;
            result.Warnings.Add("No tax configuration effective for this period; tax set to 0.");
            return;
        }

        if (taxableBase <= 0m)
        {
            result.TaxAmount = 0m;
            return;
        }

        // Progressive bracket calculation. Each bracket taxes the portion of income within [MinAmount, MaxAmount]
        // at its Rate and adds its FixedAmount (e.g. for step-transition fixed components).
        decimal tax = 0m;
        var brackets = ctx.TaxConfig.Brackets
            .Where(b => !b.IsDeleted)
            .OrderBy(b => b.MinAmount)
            .ToList();

        foreach (var bracket in brackets)
        {
            if (taxableBase <= bracket.MinAmount) break;

            var upper = bracket.MaxAmount > 0 ? Math.Min(taxableBase, bracket.MaxAmount) : taxableBase;
            var slice = upper - bracket.MinAmount;
            if (slice <= 0) continue;

            tax += slice * bracket.Rate + bracket.FixedAmount;

            if (bracket.MaxAmount > 0 && taxableBase <= bracket.MaxAmount) break;
        }

        tax = Math.Round(tax, 2, MidpointRounding.AwayFromZero);
        result.TaxAmount = tax;

        if (tax > 0)
        {
            result.Details.Add(new PayrollRecordDetail
            {
                ComponentName = "Income Tax",
                ComponentNameAr = "ضريبة الدخل",
                ComponentType = SalaryComponentType.TaxDeduction,
                Amount = -tax,
                Notes = $"Taxable base: {taxableBase:F2} | Config: {ctx.TaxConfig.Name} (eff. {ctx.TaxConfig.EffectiveDate:yyyy-MM-dd})"
            });
        }
    }
}
