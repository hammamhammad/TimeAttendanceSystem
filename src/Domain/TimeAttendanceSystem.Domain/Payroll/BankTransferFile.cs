using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Domain.Payroll;

public class BankTransferFile : BaseEntity
{
    public long PayrollPeriodId { get; set; }
    public string FileName { get; set; } = string.Empty;
    public BankFileFormat FileFormat { get; set; }
    public DateTime GeneratedAt { get; set; }
    public long GeneratedByUserId { get; set; }
    public decimal TotalAmount { get; set; }
    public int RecordCount { get; set; }
    public string? FileUrl { get; set; }

    // Navigation
    public PayrollPeriod PayrollPeriod { get; set; } = null!;
}
