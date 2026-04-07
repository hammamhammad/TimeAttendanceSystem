using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class AllowanceType : BaseEntity
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public AllowanceCategory Category { get; set; } = AllowanceCategory.Allowance;
    public CalculationType DefaultCalculationType { get; set; } = CalculationType.Fixed;
    public decimal? DefaultAmount { get; set; }
    public decimal? DefaultPercentage { get; set; }
    public bool IsTaxable { get; set; }
    public bool IsSocialInsurable { get; set; }
    public bool IsActive { get; set; } = true;
    public long? BranchId { get; set; }

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<AllowancePolicy> Policies { get; set; } = new List<AllowancePolicy>();
    public ICollection<AllowanceAssignment> Assignments { get; set; } = new List<AllowanceAssignment>();
}
