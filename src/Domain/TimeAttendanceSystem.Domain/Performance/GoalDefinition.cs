using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Performance;

public class GoalDefinition : BaseEntity
{
    public long? PerformanceReviewId { get; set; }
    public long EmployeeId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public GoalType GoalType { get; set; }
    public string? TargetValue { get; set; }
    public string? CurrentValue { get; set; }
    public string? Unit { get; set; }
    public decimal Weight { get; set; }  // percentage weight in overall score
    public GoalPriority Priority { get; set; } = GoalPriority.Medium;
    public DateTime? DueDate { get; set; }
    public GoalStatus Status { get; set; } = GoalStatus.Draft;
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public string? SelfComments { get; set; }
    public string? ManagerComments { get; set; }
    public int ProgressPercentage { get; set; }

    // Navigation
    public PerformanceReview? PerformanceReview { get; set; }
    public Employee Employee { get; set; } = null!;
}
