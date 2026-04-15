using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class PayrollRecord : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public decimal BaseSalary { get; set; }
    public decimal TotalAllowances { get; set; }
    public decimal GrossEarnings { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal SocialInsuranceEmployee { get; set; }
    public decimal SocialInsuranceEmployer { get; set; }
    public decimal OvertimePay { get; set; }
    public decimal AbsenceDeduction { get; set; }
    public decimal LoanDeduction { get; set; }
    public decimal OtherDeductions { get; set; }
    public decimal NetSalary { get; set; }
    public int WorkingDays { get; set; }
    public int PaidDays { get; set; }
    public decimal OvertimeHours { get; set; }
    public int AbsentDays { get; set; }
    public PayrollRecordStatus Status { get; set; } = PayrollRecordStatus.Pending;
    public string? Notes { get; set; }
    public DateTime? PaySlipGeneratedAt { get; set; }

    // Lock + audit (payroll production-fix)
    public DateTime? LockedAtUtc { get; set; }
    public long? LockedByUserId { get; set; }
    public int CalculationVersion { get; set; } = 1;
    public long? LastRunId { get; set; }

    /// <summary>
    /// JSON snapshot of the resolved inputs used to produce this record
    /// (effective salary, allowances, configs). Supports later explainability and re-audit.
    /// </summary>
    public string? CalculationBreakdownJson { get; set; }

    // Navigation
    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<PayrollRecordDetail> Details { get; set; } = new List<PayrollRecordDetail>();

    public bool IsLocked => LockedAtUtc.HasValue || Status == PayrollRecordStatus.Finalized;
}
