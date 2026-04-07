using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Payroll;

public class EmployeeSalary : BaseEntity
{
    public long EmployeeId { get; set; }
    public long SalaryStructureId { get; set; }
    public decimal BaseSalary { get; set; }
    public string Currency { get; set; } = "SAR";
    public DateTime EffectiveDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Reason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public bool IsCurrent { get; set; } = true;

    // Navigation
    public Employee Employee { get; set; } = null!;
    public SalaryStructure SalaryStructure { get; set; } = null!;
    public ICollection<EmployeeSalaryComponent> Components { get; set; } = new List<EmployeeSalaryComponent>();
}
