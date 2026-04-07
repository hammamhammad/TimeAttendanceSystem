using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Queries.Common;

public class EmployeeTransferDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public long FromBranchId { get; set; }
    public string FromBranchName { get; set; } = string.Empty;
    public long ToBranchId { get; set; }
    public string ToBranchName { get; set; } = string.Empty;
    public long? FromDepartmentId { get; set; }
    public string? FromDepartmentName { get; set; }
    public long? ToDepartmentId { get; set; }
    public string? ToDepartmentName { get; set; }
    public string? FromJobTitle { get; set; }
    public string? ToJobTitle { get; set; }
    public string? FromJobTitleAr { get; set; }
    public string? ToJobTitleAr { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public TransferStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }
    public long? SubmittedByUserId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
