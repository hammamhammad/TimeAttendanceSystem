using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingTask : BaseEntity
{
    public long OnboardingProcessId { get; set; }
    public long? OnboardingTemplateTaskId { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string? TaskNameAr { get; set; }
    public string? Description { get; set; }
    public OnboardingTaskCategory Category { get; set; }
    public long? AssignedToEmployeeId { get; set; }
    public OnboardingTaskStatus Status { get; set; } = OnboardingTaskStatus.Pending;
    public DateTime DueDate { get; set; }
    public DateTime? CompletedDate { get; set; }
    public long? CompletedByUserId { get; set; }
    public bool IsRequired { get; set; } = true;
    public int Priority { get; set; } = 1;
    public string? Notes { get; set; }

    // Navigation
    public OnboardingProcess OnboardingProcess { get; set; } = null!;
    public OnboardingTemplateTask? TemplateTask { get; set; }
    public Employee? AssignedToEmployee { get; set; }
}
