using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Benefits;

public class BenefitPlanOption : BaseEntity
{
    public long BenefitPlanId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal EmployeeCost { get; set; }
    public decimal EmployerCost { get; set; }
    public string Currency { get; set; } = "SAR";
    public CoverageLevel CoverageLevel { get; set; }
    public bool IsDefault { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public BenefitPlan BenefitPlan { get; set; } = null!;
}
