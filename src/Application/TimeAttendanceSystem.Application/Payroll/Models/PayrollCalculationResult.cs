using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Application.Payroll.Models;

/// <summary>
/// Output of <c>IPayrollCalculationService.CalculateAsync</c>: a single employee's calculated numbers
/// plus the detail breakdown and any warnings collected during input resolution and calculation.
/// </summary>
public class PayrollCalculationResult
{
    public required long EmployeeId { get; init; }

    public decimal BaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal GrossEarnings { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal SocialInsuranceEmployee { get; set; }
    public decimal SocialInsuranceEmployer { get; set; }
    public decimal OvertimePay { get; set; }
    public decimal AbsenceDeduction { get; set; }
    public decimal LoanDeduction { get; set; }
    public decimal OtherDeductions { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetSalary { get; set; }

    public decimal OvertimeHours { get; set; }
    public int WorkingDays { get; set; }
    public int PaidDays { get; set; }
    public int AbsentDays { get; set; }

    public List<PayrollRecordDetail> Details { get; } = new();
    public List<string> Warnings { get; } = new();

    /// <summary>Compact snapshot of inputs for audit/explainability, serialized to <c>CalculationBreakdownJson</c>.</summary>
    public string? CalculationBreakdownJson { get; set; }
}
