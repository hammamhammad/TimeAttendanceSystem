using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingTemplateTask : BaseEntity
{
    public long OnboardingTemplateId { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string? TaskNameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public int DueDaysAfterJoining { get; set; }
    public int Priority { get; set; } = 1;
    public int DisplayOrder { get; set; }
    public bool IsRequired { get; set; } = true;

    // Navigation
    public OnboardingTemplate OnboardingTemplate { get; set; } = null!;
}
