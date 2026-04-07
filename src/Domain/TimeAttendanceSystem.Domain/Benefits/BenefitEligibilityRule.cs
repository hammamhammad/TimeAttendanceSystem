using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Branches;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitEligibilityRule : BaseEntity
{
    public long BenefitPlanId { get; set; }
    public EligibilityRuleType RuleType { get; set; }
    public int? MinServiceMonths { get; set; }
    public int? MinJobGradeLevel { get; set; }
    public int? MaxJobGradeLevel { get; set; }
    public EmploymentStatus? EmploymentStatusRequired { get; set; }
    public ContractType? ContractTypeRequired { get; set; }
    public long? DepartmentId { get; set; }
    public long? BranchId { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public BenefitPlan BenefitPlan { get; set; } = null!;
    public Department? Department { get; set; }
    public Branch? Branch { get; set; }
}
