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

    // Navigation
    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public ICollection<PayrollRecordDetail> Details { get; set; } = new List<PayrollRecordDetail>();
}
