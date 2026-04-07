using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Succession;

public class KeyPosition : BaseEntity
{
    public string JobTitle { get; set; } = string.Empty;
    public string? JobTitleAr { get; set; }
    public long? DepartmentId { get; set; }
    public long BranchId { get; set; }
    public long? JobGradeId { get; set; }
    public long? CurrentHolderId { get; set; }
    public PositionCriticality CriticalityLevel { get; set; }
    public VacancyRisk VacancyRisk { get; set; }
    public string? ImpactOfVacancy { get; set; }
    public string? ImpactOfVacancyAr { get; set; }
    public string? RequiredCompetencies { get; set; }
    public int? MinExperienceYears { get; set; }
    public bool IsActive { get; set; } = true;
    public string? Notes { get; set; }

    // Navigation
    public Department? Department { get; set; }
    public Branch Branch { get; set; } = null!;
    public JobGrade? JobGrade { get; set; }
    public Employee? CurrentHolder { get; set; }
    public ICollection<SuccessionPlan> SuccessionPlans { get; set; } = new List<SuccessionPlan>();
}
