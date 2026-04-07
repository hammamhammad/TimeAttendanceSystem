using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Performance;

public class CompetencyFramework : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<Competency> Competencies { get; set; } = new List<Competency>();
}
