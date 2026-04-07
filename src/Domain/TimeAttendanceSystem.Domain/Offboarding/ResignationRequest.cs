using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Offboarding;

public class ResignationRequest : BaseEntity
{
    public long EmployeeId { get; set; }
    public DateTime ResignationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public int NoticePeriodDays { get; set; }
    public int WaivedNoticeDays { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public ResignationStatus Status { get; set; } = ResignationStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public WorkflowInstance? WorkflowInstance { get; set; }
}
