using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Performance;

public class Competency : BaseEntity
{
    public long CompetencyFrameworkId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public string? Category { get; set; }
    public string? CategoryAr { get; set; }
    public int DisplayOrder { get; set; }

    // Navigation
    public CompetencyFramework CompetencyFramework { get; set; } = null!;
}
