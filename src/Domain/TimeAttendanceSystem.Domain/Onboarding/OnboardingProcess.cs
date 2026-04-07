using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Onboarding;

public class OnboardingProcess : BaseEntity
{
    public long EmployeeId { get; set; }
    public long OnboardingTemplateId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? ExpectedCompletionDate { get; set; }
    public DateTime? ActualCompletionDate { get; set; }
    public OnboardingStatus Status { get; set; } = OnboardingStatus.NotStarted;
    public long? BuddyEmployeeId { get; set; }
    public long? MentorEmployeeId { get; set; }
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public string? Notes { get; set; }
    public long? OfferLetterId { get; set; }  // link to recruitment

    // Navigation
    public Employee Employee { get; set; } = null!;
    public OnboardingTemplate OnboardingTemplate { get; set; } = null!;
    public Employee? BuddyEmployee { get; set; }
    public Employee? MentorEmployee { get; set; }
    public ICollection<OnboardingTask> Tasks { get; set; } = new List<OnboardingTask>();
    public ICollection<OnboardingDocument> Documents { get; set; } = new List<OnboardingDocument>();
}
