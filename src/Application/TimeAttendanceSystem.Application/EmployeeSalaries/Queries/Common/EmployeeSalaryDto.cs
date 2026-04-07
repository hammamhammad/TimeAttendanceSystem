namespace TecAxle.Hrms.Application.EmployeeSalaries.Queries.Common;

public class EmployeeSalaryDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public long SalaryStructureId { get; set; }
    public string SalaryStructureName { get; set; } = string.Empty;
    public decimal BaseSalary { get; set; }
    public string Currency { get; set; } = "SAR";
    public DateTime EffectiveDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrent { get; set; }
    public string? Reason { get; set; }
    public List<EmployeeSalaryComponentDto> Components { get; set; } = new();
    public decimal TotalPackage { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}

public class EmployeeSalaryComponentDto
{
    public long Id { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public int ComponentType { get; set; }
    public decimal Amount { get; set; }
    public decimal? OverrideAmount { get; set; }
}
