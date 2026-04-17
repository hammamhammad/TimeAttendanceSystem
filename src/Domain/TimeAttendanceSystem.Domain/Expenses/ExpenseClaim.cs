using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Expenses;

public class ExpenseClaim : BaseEntity
{
    public long EmployeeId { get; set; }
    public string ClaimNumber { get; set; } = string.Empty;
    public long? ExpensePolicyId { get; set; }
    public decimal TotalAmount { get; set; }
    public string? Currency { get; set; } = "SAR";
    public string? Description { get; set; }
    public ExpenseClaimStatus Status { get; set; } = ExpenseClaimStatus.Draft;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    /// <summary>
    /// Phase 1 (v14.1): Chosen reimbursement method when the claim is approved.
    /// Controls what the ExpenseClaimExecutor produces on execute:
    /// - Payroll → creates ExpenseReimbursement(Method=Payroll), to be picked up by next payroll run.
    /// - BankTransfer / Cash → creates ExpenseReimbursement(Method=&lt;non-payroll&gt;) in "payable" state.
    /// Defaults to Payroll for backward compatibility.
    /// </summary>
    public Domain.Common.ReimbursementMethod ReimbursementMethod { get; set; } = Domain.Common.ReimbursementMethod.Payroll;

    // Phase 1 (v14.1): Execution tracking.
    public bool IsExecuted { get; set; }
    public DateTime? ExecutedAtUtc { get; set; }
    public long? ExecutedByUserId { get; set; }
    public string? ExecutionError { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public ExpensePolicy? ExpensePolicy { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<ExpenseClaimItem> Items { get; set; } = new List<ExpenseClaimItem>();
    public ExpenseReimbursement? Reimbursement { get; set; }
}
