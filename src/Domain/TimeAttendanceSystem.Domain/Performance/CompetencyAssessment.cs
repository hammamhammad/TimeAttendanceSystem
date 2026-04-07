using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Performance;

public class CompetencyAssessment : BaseEntity
{
    public long PerformanceReviewId { get; set; }
    public long CompetencyId { get; set; }
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public PerformanceRating? FinalRating { get; set; }
    public string? SelfComments { get; set; }
    public string? ManagerComments { get; set; }

    // Navigation
    public PerformanceReview PerformanceReview { get; set; } = null!;
    public Competency Competency { get; set; } = null!;
}
