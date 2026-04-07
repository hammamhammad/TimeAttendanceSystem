using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Loans;

public class LoanApplication : BaseEntity
{
    public long EmployeeId { get; set; }
    public long LoanTypeId { get; set; }
    public long? LoanPolicyId { get; set; }
    public decimal RequestedAmount { get; set; }
    public decimal? ApprovedAmount { get; set; }
    public int RepaymentMonths { get; set; }
    public decimal? MonthlyInstallment { get; set; }
    public decimal InterestRate { get; set; }
    public string? Purpose { get; set; }
    public string? PurposeAr { get; set; }
    public LoanApplicationStatus Status { get; set; } = LoanApplicationStatus.Draft;
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public decimal? OutstandingBalance { get; set; }
    public string? Notes { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public LoanType LoanType { get; set; } = null!;
    public LoanPolicy? LoanPolicy { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<LoanRepayment> Repayments { get; set; } = new List<LoanRepayment>();
}
