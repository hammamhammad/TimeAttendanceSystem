using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Surveys;

public class SurveyQuestion : BaseEntity
{
    public long SurveyTemplateId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public string? QuestionTextAr { get; set; }
    public SurveyQuestionType QuestionType { get; set; }
    public bool IsRequired { get; set; } = true;
    public int DisplayOrder { get; set; }
    public string? SectionName { get; set; }
    public string? SectionNameAr { get; set; }
    public string? OptionsJson { get; set; }
    public int? MinValue { get; set; }
    public int? MaxValue { get; set; }
    public string? MinLabel { get; set; }
    public string? MaxLabel { get; set; }
    public string? MinLabelAr { get; set; }
    public string? MaxLabelAr { get; set; }

    // Navigation
    public SurveyTemplate Template { get; set; } = null!;
    public ICollection<SurveyResponse> Responses { get; set; } = new List<SurveyResponse>();
}
