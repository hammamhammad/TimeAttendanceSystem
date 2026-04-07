using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Performance;

public class FeedbackRequest360 : BaseEntity
{
    public long PerformanceReviewId { get; set; }
    public long RequestedFromEmployeeId { get; set; }
    public FeedbackStatus Status { get; set; } = FeedbackStatus.Requested;
    public DateTime? Deadline { get; set; }
    public DateTime? SubmittedAt { get; set; }

    // Navigation
    public PerformanceReview PerformanceReview { get; set; } = null!;
    public Employee RequestedFromEmployee { get; set; } = null!;
    public Feedback360Response? Response { get; set; }
}
