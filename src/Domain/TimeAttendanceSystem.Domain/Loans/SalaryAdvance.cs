using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Payroll;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Loans;

public class SalaryAdvance : BaseEntity
{
    public long EmployeeId { get; set; }
    public decimal Amount { get; set; }
    public string? Currency { get; set; } = "SAR";
    public DateTime RequestDate { get; set; }
    public int DeductionMonth { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public SalaryAdvanceStatus Status { get; set; } = SalaryAdvanceStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? PayrollRecordId { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public PayrollRecord? PayrollRecord { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
