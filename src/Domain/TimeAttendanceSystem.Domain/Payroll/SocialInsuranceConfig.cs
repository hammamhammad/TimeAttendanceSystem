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

    /// <summary>
    /// Optional ISO nationality code this config applies to (e.g. "SA" for Saudi-only rates under GOSI).
    /// Null means the config applies to all nationalities. Resolver picks the most specific match per employee.
    /// </summary>
    public string? AppliesToNationalityCode { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
}
