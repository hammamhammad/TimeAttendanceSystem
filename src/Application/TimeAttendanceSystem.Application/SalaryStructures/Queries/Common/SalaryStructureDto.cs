namespace TecAxle.Hrms.Application.SalaryStructures.Queries.Common;

public class SalaryStructureDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? BranchId { get; set; }
    public string? BranchName { get; set; }
    public bool IsActive { get; set; }
    public List<SalaryComponentDto> Components { get; set; } = new();
    public DateTime CreatedAtUtc { get; set; }
}

public class SalaryComponentDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public int ComponentType { get; set; }
    public int CalculationType { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public bool IsRecurring { get; set; }
    public bool IsTaxable { get; set; }
    public bool IsSocialInsurable { get; set; }
    public int DisplayOrder { get; set; }
}
