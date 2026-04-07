using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class SalaryComponent : BaseEntity
{
    public long SalaryStructureId { get; set; }
    public long? AllowanceTypeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public SalaryComponentType ComponentType { get; set; }
    public CalculationType CalculationType { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public bool IsRecurring { get; set; } = true;
    public bool IsTaxable { get; set; }
    public bool IsSocialInsurable { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation
    public SalaryStructure SalaryStructure { get; set; } = null!;
    public AllowanceType? AllowanceType { get; set; }
}
