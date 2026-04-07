using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Recruitment;

public class InterviewSchedule : BaseEntity
{
    public long JobApplicationId { get; set; }
    public InterviewType InterviewType { get; set; }
    public long InterviewerEmployeeId { get; set; }
    public DateTime ScheduledDate { get; set; }
    public int DurationMinutes { get; set; } = 60;
    public string? Location { get; set; }
    public string? MeetingLink { get; set; }
    public InterviewResult Result { get; set; } = InterviewResult.Pending;
    public string? Notes { get; set; }
    public string? CancellationReason { get; set; }

    // Navigation
    public JobApplication JobApplication { get; set; } = null!;
    public Employee InterviewerEmployee { get; set; } = null!;
    public InterviewFeedback? Feedback { get; set; }
}
