namespace TecAxle.Hrms.Application.EmployeeSubEntities.Dtos;

public class JobGradeDto
{
    public long Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MidSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public string? Currency { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
}
