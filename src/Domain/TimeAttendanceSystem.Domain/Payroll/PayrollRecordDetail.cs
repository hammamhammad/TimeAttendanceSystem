using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class PayrollRecordDetail : BaseEntity
{
    public long PayrollRecordId { get; set; }
    public long? SalaryComponentId { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public string? ComponentNameAr { get; set; }
    public SalaryComponentType ComponentType { get; set; }
    public long? AllowanceTypeId { get; set; }
    public decimal Amount { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public PayrollRecord PayrollRecord { get; set; } = null!;
    public SalaryComponent? SalaryComponent { get; set; }
    public AllowanceType? AllowanceType { get; set; }
}
