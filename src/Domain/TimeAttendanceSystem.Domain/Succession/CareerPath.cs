using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Succession;

public class CareerPath : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public ICollection<CareerPathStep> Steps { get; set; } = new List<CareerPathStep>();
}
