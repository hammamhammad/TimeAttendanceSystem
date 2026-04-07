using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Timesheets;

public class ProjectTask : BaseEntity
{
    public long ProjectId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? BudgetHours { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }

    // Navigation
    public Project Project { get; set; } = null!;
}
