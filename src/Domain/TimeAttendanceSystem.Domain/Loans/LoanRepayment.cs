using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Domain.Loans;

public class LoanRepayment : BaseEntity
{
    public long LoanApplicationId { get; set; }
    public long? PayrollRecordId { get; set; }
    public int InstallmentNumber { get; set; }
    public decimal Amount { get; set; }
    public decimal? PrincipalAmount { get; set; }
    public decimal? InterestAmount { get; set; }
    public DateTime DueDate { get; set; }
    public DateTime? PaidDate { get; set; }
    public LoanRepaymentStatus Status { get; set; } = LoanRepaymentStatus.Scheduled;
    public decimal BalanceRemaining { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public LoanApplication LoanApplication { get; set; } = null!;
    public PayrollRecord? PayrollRecord { get; set; }
}
