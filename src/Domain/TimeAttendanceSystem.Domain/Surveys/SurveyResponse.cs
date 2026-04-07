using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Surveys;

public class SurveyResponse : BaseEntity
{
    public long SurveyDistributionId { get; set; }
    public long SurveyQuestionId { get; set; }
    public string? ParticipantToken { get; set; }
    public string? ResponseText { get; set; }
    public int? ResponseValue { get; set; }
    public string? SelectedOptions { get; set; }

    // Navigation
    public SurveyDistribution Distribution { get; set; } = null!;
    public SurveyQuestion Question { get; set; } = null!;
}
