using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Offboarding;

public class ExitInterview : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime InterviewDate { get; set; }
    public long InterviewerUserId { get; set; }
    public int? OverallSatisfactionRating { get; set; }
    public string? ReasonForLeaving { get; set; }
    public string? ReasonForLeavingAr { get; set; }
    public bool? WouldRejoin { get; set; }
    public string? LikedMost { get; set; }
    public string? ImprovementSuggestions { get; set; }
    public string? AdditionalComments { get; set; }
    public bool IsConfidential { get; set; } = true;

    // Navigation
    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
