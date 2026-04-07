using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Offboarding;

public class FinalSettlement : BaseEntity
{
    public long TerminationRecordId { get; set; }
    public long EmployeeId { get; set; }
    public decimal BasicSalaryDue { get; set; }
    public decimal AllowancesDue { get; set; }
    public decimal LeaveEncashmentAmount { get; set; }
    public int LeaveEncashmentDays { get; set; }
    public decimal EndOfServiceAmount { get; set; }
    public decimal OvertimeDue { get; set; }
    public decimal LoanOutstanding { get; set; }
    public decimal AdvanceOutstanding { get; set; }
    public decimal OtherDeductions { get; set; }
    public decimal OtherAdditions { get; set; }
    public decimal GrossSettlement { get; set; }
    public decimal TotalDeductions { get; set; }
    public decimal NetSettlement { get; set; }
    public SettlementStatus Status { get; set; } = SettlementStatus.Draft;
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? PaidAt { get; set; }
    public string? CalculationDetails { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public TerminationRecord TerminationRecord { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
}
