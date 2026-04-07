using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.SalaryAdjustments.Queries.Common;

public class SalaryAdjustmentDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public SalaryAdjustmentType AdjustmentType { get; set; }
    public decimal CurrentBaseSalary { get; set; }
    public decimal CurrentTotalPackage { get; set; }
    public decimal NewBaseSalary { get; set; }
    public decimal AdjustmentAmount { get; set; }
    public decimal PercentageChange { get; set; }
    public string? ComponentAdjustments { get; set; }
    public DateTime EffectiveDate { get; set; }
    public bool IsApplied { get; set; }
    public DateTime? AppliedAt { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public string? Justification { get; set; }
    public string? DocumentUrl { get; set; }
    public SalaryAdjustmentStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public long? RelatedPromotionId { get; set; }
    public long? RelatedContractId { get; set; }
    public long? RelatedTransferId { get; set; }
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
