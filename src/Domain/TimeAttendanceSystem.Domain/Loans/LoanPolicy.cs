using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Loans;

public class LoanPolicy : BaseEntity
{
    public long? BranchId { get; set; }
    public long LoanTypeId { get; set; }
    public int MaxConcurrentLoans { get; set; } = 1;
    public int MinServiceMonths { get; set; }
    public decimal MaxPercentageOfSalary { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation
    public Branch? Branch { get; set; }
    public LoanType LoanType { get; set; } = null!;
}
