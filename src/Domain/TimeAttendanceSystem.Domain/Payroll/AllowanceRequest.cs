using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Payroll;

public class AllowanceRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public long AllowanceTypeId { get; set; }
    public long? AllowancePolicyId { get; set; }
    public AllowanceRequestType RequestType { get; set; }
    public decimal? RequestedAmount { get; set; }
    public decimal? RequestedPercentage { get; set; }
    public DateTime EffectiveFromDate { get; set; }
    public DateTime? EffectiveToDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Justification { get; set; }
    public string? SupportingDocumentUrl { get; set; }
    public AllowanceRequestStatus Status { get; set; } = AllowanceRequestStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? ApprovalComments { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Phase 1 (v14.1): Approval-to-execution tracking.
    // After workflow approval, the AllowanceRequestExecutor materializes an AllowanceAssignment.
    // IsExecuted guards against duplicate execution on retry/recalculation.
    public bool IsExecuted { get; set; }
    public DateTime? ExecutedAtUtc { get; set; }
    public long? ExecutedByUserId { get; set; }
    public string? ExecutionError { get; set; }
    public long? ResultingAssignmentId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public AllowanceType AllowanceType { get; set; } = null!;
    public AllowancePolicy? AllowancePolicy { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
    public ICollection<AllowanceAssignment> ResultingAssignments { get; set; } = new List<AllowanceAssignment>();
}
