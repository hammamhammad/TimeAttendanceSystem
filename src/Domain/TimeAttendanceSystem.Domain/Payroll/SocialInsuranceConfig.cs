using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class SocialInsuranceConfig : BaseEntity
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public decimal EmployeeContributionRate { get; set; }
    public decimal EmployerContributionRate { get; set; }
    public decimal MaxInsurableSalary { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
}
