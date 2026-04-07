using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Performance;

public class PerformanceReviewCycle : BaseEntity
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public ReviewCycleType CycleType { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public DateTime? SelfAssessmentDeadline { get; set; }
    public DateTime? ManagerAssessmentDeadline { get; set; }
    public ReviewCycleStatus Status { get; set; } = ReviewCycleStatus.Planning;
    public long? CompetencyFrameworkId { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public CompetencyFramework? CompetencyFramework { get; set; }
    public ICollection<PerformanceReview> Reviews { get; set; } = new List<PerformanceReview>();
}
