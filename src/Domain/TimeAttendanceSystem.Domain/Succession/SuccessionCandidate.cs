using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Succession;

public class SuccessionCandidate : BaseEntity
{
    public long SuccessionPlanId { get; set; }
    public long EmployeeId { get; set; }
    public long? TalentProfileId { get; set; }
    public ReadinessLevel ReadinessLevel { get; set; }
    public ReadinessTimeline ReadinessTimeline { get; set; }
    public int Priority { get; set; }
    public string? DevelopmentPlan { get; set; }
    public string? DevelopmentPlanAr { get; set; }
    public string? GapAnalysis { get; set; }
    public CandidateSuccessionStatus Status { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public SuccessionPlan SuccessionPlan { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public TalentProfile? TalentProfile { get; set; }
}
