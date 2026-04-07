using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Employees;

public class JobGrade : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public int Level { get; set; }
    public decimal? MinSalary { get; set; }
    public decimal? MidSalary { get; set; }
    public decimal? MaxSalary { get; set; }
    public string? Currency { get; set; } = "SAR";
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }

    // Navigation
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}
