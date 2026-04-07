using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Performance;

public class PerformanceImprovementPlan : BaseEntity
{
    public long EmployeeId { get; set; }
    public long ManagerEmployeeId { get; set; }
    public long? PerformanceReviewId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Goals { get; set; }  // JSON: list of improvement goals
    public string? Milestones { get; set; }  // JSON: milestone dates and descriptions
    public PipStatus Status { get; set; } = PipStatus.Draft;
    public string? OutcomeNotes { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Employee ManagerEmployee { get; set; } = null!;
    public PerformanceReview? PerformanceReview { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
