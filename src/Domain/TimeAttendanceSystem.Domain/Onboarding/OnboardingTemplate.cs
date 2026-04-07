using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingTemplate : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? DepartmentId { get; set; }  // null = default for all departments
    public long? BranchId { get; set; }
    public bool IsActive { get; set; } = true;
    public bool IsDefault { get; set; }

    // Navigation
    public Department? Department { get; set; }
    public Branch? Branch { get; set; }
    public ICollection<OnboardingTemplateTask> Tasks { get; set; } = new List<OnboardingTemplateTask>();
}
