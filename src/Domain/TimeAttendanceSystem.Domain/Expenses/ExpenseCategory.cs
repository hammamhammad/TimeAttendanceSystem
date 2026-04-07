using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Expenses;

public class ExpenseCategory : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public decimal? MaxAmount { get; set; }
    public bool RequiresReceipt { get; set; } = true;
    public bool IsActive { get; set; } = true;
}
