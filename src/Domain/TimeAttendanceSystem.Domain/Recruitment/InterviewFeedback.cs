using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Recruitment;

public class InterviewFeedback : BaseEntity
{
    public long InterviewScheduleId { get; set; }
    public long InterviewerEmployeeId { get; set; }
    public int TechnicalScore { get; set; }       // 1-5
    public int CommunicationScore { get; set; }   // 1-5
    public int CulturalFitScore { get; set; }     // 1-5
    public int OverallScore { get; set; }         // 1-5
    public InterviewRecommendation Recommendation { get; set; }
    public string? Strengths { get; set; }
    public string? Weaknesses { get; set; }
    public string? Comments { get; set; }

    // Navigation
    public InterviewSchedule InterviewSchedule { get; set; } = null!;
    public Employee InterviewerEmployee { get; set; } = null!;
}
