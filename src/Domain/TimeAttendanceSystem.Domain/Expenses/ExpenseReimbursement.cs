using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Payroll;

namespace TecAxle.Hrms.Domain.Expenses;

public class ExpenseReimbursement : BaseEntity
{
    public long ExpenseClaimId { get; set; }
    public long? PayrollRecordId { get; set; }
    public decimal Amount { get; set; }
    public DateTime? ReimbursementDate { get; set; }
    public ReimbursementMethod Method { get; set; } = ReimbursementMethod.Payroll;
    public string? ReferenceNumber { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public ExpenseClaim ExpenseClaim { get; set; } = null!;
    public PayrollRecord? PayrollRecord { get; set; }
}
