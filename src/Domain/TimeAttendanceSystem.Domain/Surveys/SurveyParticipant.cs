using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Surveys;

public class SurveyParticipant : BaseEntity
{
    public long SurveyDistributionId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime InvitedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public SurveyParticipantStatus Status { get; set; }
    public string? AnonymousToken { get; set; }

    // Navigation
    public SurveyDistribution Distribution { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
