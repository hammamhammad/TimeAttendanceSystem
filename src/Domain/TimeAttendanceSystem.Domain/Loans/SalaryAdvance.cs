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

    // Phase 7 (v14.7): DeductionMonth (legacy YYYYMM int) fully removed.
    // Retirement timeline: Phase 3 doc-deprecated → Phase 6 write-frozen → Phase 7 removed
    // from code + schema. The migration back-fills any remaining
    // DeductionStartDate/EndDate pairs from the legacy value before dropping the column,
    // so no historical data is lost.

    /// <summary>
    /// Date-range deduction window. Drives payroll matching in
    /// <c>ProcessPayrollPeriodCommandHandler.IntegrateSalaryAdvancesAsync</c> — an
    /// advance is deducted in the first payroll period whose [StartDate, EndDate]
    /// window intersects this range.
    /// </summary>
    public DateTime? DeductionStartDate { get; set; }
    public DateTime? DeductionEndDate { get; set; }

    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public SalaryAdvanceStatus Status { get; set; } = SalaryAdvanceStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? PayrollRecordId { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Phase 1 (v14.1): Execution tracking.
    public bool IsExecuted { get; set; }
    public DateTime? ExecutedAtUtc { get; set; }
    public long? ExecutedByUserId { get; set; }
    public string? ExecutionError { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public PayrollRecord? PayrollRecord { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
