using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Loans;

public class LoanType : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal MaxAmount { get; set; }
    public int MaxRepaymentMonths { get; set; }
    public decimal InterestRate { get; set; }
    public bool RequiresGuarantor { get; set; }
    public bool IsActive { get; set; } = true;
}
