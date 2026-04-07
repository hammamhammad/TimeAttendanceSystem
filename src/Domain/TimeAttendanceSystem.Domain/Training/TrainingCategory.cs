using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public bool IsActive { get; set; } = true;
    public int SortOrder { get; set; }

    // Navigation
    public ICollection<TrainingCourse> Courses { get; set; } = new List<TrainingCourse>();
}
