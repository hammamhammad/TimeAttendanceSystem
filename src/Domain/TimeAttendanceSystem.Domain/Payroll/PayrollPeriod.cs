using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Payroll;

public class PayrollPeriod : BaseEntity
{
    public long BranchId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public PayrollPeriodType PeriodType { get; set; } = PayrollPeriodType.Monthly;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public PayrollPeriodStatus Status { get; set; } = PayrollPeriodStatus.Draft;
    public decimal TotalGross { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal TotalNet { get; set; }
    public int EmployeeCount { get; set; }
    public long? ProcessedByUserId { get; set; }
    public DateTime? ProcessedAt { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Lock state (payroll production-fix). Set when the period transitions to Paid.
    public DateTime? LockedAtUtc { get; set; }
    public long? LockedByUserId { get; set; }

    public bool IsLocked => LockedAtUtc.HasValue || Status == PayrollPeriodStatus.Paid;

    // Navigation
    public Branch Branch { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<PayrollRecord> Records { get; set; } = new List<PayrollRecord>();
    public ICollection<PayrollAdjustment> Adjustments { get; set; } = new List<PayrollAdjustment>();
    public ICollection<BankTransferFile> BankTransferFiles { get; set; } = new List<BankTransferFile>();
}
