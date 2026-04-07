using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Expenses;

public class ExpenseClaimItem : BaseEntity
{
    public long ExpenseClaimId { get; set; }
    public long? ExpenseCategoryId { get; set; }
    public string Description { get; set; } = string.Empty;
    public string? DescriptionAr { get; set; }
    public decimal Amount { get; set; }
    public string? ReceiptUrl { get; set; }
    public DateTime ExpenseDate { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public ExpenseClaim ExpenseClaim { get; set; } = null!;
    public ExpenseCategory? ExpenseCategory { get; set; }
}
