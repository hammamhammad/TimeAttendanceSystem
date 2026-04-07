using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeeTransfer : BaseEntity
{
    public long EmployeeId { get; set; }
    public long FromBranchId { get; set; }
    public long ToBranchId { get; set; }
    public long? FromDepartmentId { get; set; }
    public long? ToDepartmentId { get; set; }
    public string? FromJobTitle { get; set; }
    public string? ToJobTitle { get; set; }
    public string? FromJobTitleAr { get; set; }
    public string? ToJobTitleAr { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public TransferStatus Status { get; set; } = TransferStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Branch FromBranch { get; set; } = null!;
    public Branch ToBranch { get; set; } = null!;
    public Department? FromDepartment { get; set; }
    public Department? ToDepartment { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
