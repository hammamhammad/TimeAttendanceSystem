using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Performance;

public class PerformanceReview : BaseEntity
{
    public long PerformanceReviewCycleId { get; set; }
    public long EmployeeId { get; set; }
    public long ReviewerEmployeeId { get; set; }
    public ReviewStatus Status { get; set; } = ReviewStatus.Draft;
    public PerformanceRating? SelfRating { get; set; }
    public PerformanceRating? ManagerRating { get; set; }
    public PerformanceRating? FinalRating { get; set; }
    public string? SelfAssessmentComments { get; set; }
    public string? ManagerComments { get; set; }
    public string? OverallComments { get; set; }
    public DateTime? SelfAssessmentDate { get; set; }
    public DateTime? ManagerReviewDate { get; set; }
    public DateTime? ApprovedDate { get; set; }
    public DateTime? AcknowledgedDate { get; set; }
    public long? ApprovedByUserId { get; set; }
    public long? RelatedPromotionId { get; set; }
    public long? RelatedSalaryAdjustmentId { get; set; }
    public long? RelatedPipId { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public PerformanceReviewCycle ReviewCycle { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public Employee ReviewerEmployee { get; set; } = null!;
    public EmployeePromotion? RelatedPromotion { get; set; }
    public SalaryAdjustment? RelatedSalaryAdjustment { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<GoalDefinition> Goals { get; set; } = new List<GoalDefinition>();
    public ICollection<CompetencyAssessment> CompetencyAssessments { get; set; } = new List<CompetencyAssessment>();
    public ICollection<FeedbackRequest360> FeedbackRequests { get; set; } = new List<FeedbackRequest360>();
}
