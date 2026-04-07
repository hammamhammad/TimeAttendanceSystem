using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class EmployeeSalaryComponent : BaseEntity
{
    public long EmployeeSalaryId { get; set; }
    public long SalaryComponentId { get; set; }
    public decimal Amount { get; set; }
    public decimal? OverrideAmount { get; set; }

    // Navigation
    public EmployeeSalary EmployeeSalary { get; set; } = null!;
    public SalaryComponent SalaryComponent { get; set; } = null!;
}
