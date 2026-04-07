using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class AllowancePolicy : BaseEntity
{
    public long AllowanceTypeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? BranchId { get; set; }

    // Eligibility rules (JSON)
    public string? EligibilityRules { get; set; }

    // Approval
    public bool RequiresApproval { get; set; }

    // Amount constraints
    public decimal? MinAmount { get; set; }
    public decimal? MaxAmount { get; set; }
    public decimal? MaxPercentageOfBasic { get; set; }

    // Temporary allowance rules
    public bool IsTemporaryAllowed { get; set; }
    public int? MaxDurationMonths { get; set; }

    // Effective dating
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public AllowanceType AllowanceType { get; set; } = null!;
    public Branch? Branch { get; set; }
    public ICollection<AllowanceRequest> Requests { get; set; } = new List<AllowanceRequest>();
}
