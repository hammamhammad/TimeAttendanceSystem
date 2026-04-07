using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitPlan : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public BenefitType BenefitType { get; set; }
    public long? InsuranceProviderId { get; set; }
    public int PlanYear { get; set; }
    public DateTime EffectiveStartDate { get; set; }
    public DateTime EffectiveEndDate { get; set; }
    public decimal EmployeePremiumAmount { get; set; }
    public decimal EmployerPremiumAmount { get; set; }
    public string Currency { get; set; } = "SAR";
    public string? CoverageDetails { get; set; }
    public string? CoverageDetailsAr { get; set; }
    public int? MaxDependents { get; set; }
    public decimal DependentPremiumAmount { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public InsuranceProvider? InsuranceProvider { get; set; }
    public ICollection<BenefitPlanOption> Options { get; set; } = new List<BenefitPlanOption>();
    public ICollection<BenefitEligibilityRule> EligibilityRules { get; set; } = new List<BenefitEligibilityRule>();
    public ICollection<BenefitEnrollment> Enrollments { get; set; } = new List<BenefitEnrollment>();
}
