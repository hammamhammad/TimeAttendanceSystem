using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class TaxConfiguration : BaseEntity
{
    public long? BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
    public ICollection<TaxBracket> Brackets { get; set; } = new List<TaxBracket>();
}

public class TaxBracket : BaseEntity
{
    public long TaxConfigurationId { get; set; }
    public decimal MinAmount { get; set; }
    public decimal MaxAmount { get; set; }
    public decimal Rate { get; set; }
    public decimal FixedAmount { get; set; }

    // Navigation
    public TaxConfiguration TaxConfiguration { get; set; } = null!;
}
