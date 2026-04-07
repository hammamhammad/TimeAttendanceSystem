using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Surveys;

public class SurveyTemplate : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string? TitleAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public SurveyType SurveyType { get; set; }
    public bool IsAnonymous { get; set; } = true;
    public bool IsActive { get; set; } = true;
    public int? EstimatedDurationMinutes { get; set; }

    // Navigation
    public ICollection<SurveyQuestion> Questions { get; set; } = new List<SurveyQuestion>();
    public ICollection<SurveyDistribution> Distributions { get; set; } = new List<SurveyDistribution>();
}
