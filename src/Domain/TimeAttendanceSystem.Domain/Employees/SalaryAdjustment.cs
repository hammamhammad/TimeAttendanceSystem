using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Employees;

public class SalaryAdjustment : BaseEntity
{
    public long EmployeeId { get; set; }
    public SalaryAdjustmentType AdjustmentType { get; set; }

    // Current salary snapshot (at time of request)
    public decimal CurrentBaseSalary { get; set; }
    public decimal CurrentTotalPackage { get; set; }

    // Proposed changes
    public decimal NewBaseSalary { get; set; }
    public decimal AdjustmentAmount { get; set; }
    public decimal PercentageChange { get; set; }

    // Component-level adjustments (optional)
    public string? ComponentAdjustments { get; set; }

    // Effective dating
    public DateTime EffectiveDate { get; set; }
    public bool IsApplied { get; set; }
    public DateTime? AppliedAt { get; set; }

    // Request metadata
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Justification { get; set; }
    public string? DocumentUrl { get; set; }

    // Approval
    public SalaryAdjustmentStatus Status { get; set; } = SalaryAdjustmentStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }

    // Links to source
    public long? RelatedPromotionId { get; set; }
    public long? RelatedContractId { get; set; }
    public long? RelatedTransferId { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public EmployeePromotion? RelatedPromotion { get; set; }
    public EmployeeContract? RelatedContract { get; set; }
    public EmployeeTransfer? RelatedTransfer { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
