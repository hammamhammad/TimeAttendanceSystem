using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Succession;

public class CareerPathStep : BaseEntity
{
    public long CareerPathId { get; set; }
    public long? FromJobGradeId { get; set; }
    public long ToJobGradeId { get; set; }
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public int? TypicalDurationMonths { get; set; }
    public string? RequiredCompetencies { get; set; }
    public int StepOrder { get; set; }

    // Navigation
    public CareerPath CareerPath { get; set; } = null!;
    public JobGrade? FromJobGrade { get; set; }
    public JobGrade ToJobGrade { get; set; } = null!;
}
