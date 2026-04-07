using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class PayrollAdjustment : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public long EmployeeId { get; set; }
    public PayrollAdjustmentType AdjustmentType { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public decimal Amount { get; set; }
    public bool IsRecurring { get; set; }
    public int? RecurringMonths { get; set; }
    public string? Reason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Navigation
    public PayrollPeriod PayrollPeriod { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
