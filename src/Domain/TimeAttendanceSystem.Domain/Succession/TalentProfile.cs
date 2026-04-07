using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Succession;

public class TalentProfile : BaseEntity
{
    public long EmployeeId { get; set; }
    public PerformanceRating? PerformanceRating { get; set; }
    public PotentialRating PotentialRating { get; set; }
    public NineBoxPosition NineBoxPosition { get; set; }
    public ReadinessLevel ReadinessLevel { get; set; }
    public RetentionRisk RetentionRisk { get; set; }
    public string? CareerAspiration { get; set; }
    public string? CareerAspirationAr { get; set; }
    public string? StrengthsSummary { get; set; }
    public string? DevelopmentAreas { get; set; }
    public DateTime? LastAssessmentDate { get; set; }
    public long? AssessedByUserId { get; set; }
    public bool IsHighPotential { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public ICollection<TalentSkill> Skills { get; set; } = new List<TalentSkill>();
}
