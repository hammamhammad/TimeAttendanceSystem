using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Surveys;

public class SurveyDistribution : BaseEntity
{
    public long SurveyTemplateId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public SurveyTargetAudience TargetAudience { get; set; }
    public string? TargetIds { get; set; }
    public SurveyDistributionStatus Status { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? ReminderFrequencyDays { get; set; }
    public DateTime? LastReminderSentAt { get; set; }
    public int TotalRecipients { get; set; } = 0;
    public int TotalResponses { get; set; } = 0;

    // Navigation
    public SurveyTemplate Template { get; set; } = null!;
    public ICollection<SurveyParticipant> Participants { get; set; } = new List<SurveyParticipant>();
    public ICollection<SurveyResponse> Responses { get; set; } = new List<SurveyResponse>();
}
