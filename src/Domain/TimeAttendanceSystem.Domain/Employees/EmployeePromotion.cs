using TecAxle.Hrms.Domain.Branches;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Workflows;

namespace TecAxle.Hrms.Domain.Employees;

public class EmployeePromotion : BaseEntity
{
    public long EmployeeId { get; set; }
    public string OldJobTitle { get; set; } = string.Empty;
    public string NewJobTitle { get; set; } = string.Empty;
    public string? OldJobTitleAr { get; set; }
    public string? NewJobTitleAr { get; set; }
    public string? OldGrade { get; set; }
    public string? NewGrade { get; set; }
    public long? OldDepartmentId { get; set; }
    public long? NewDepartmentId { get; set; }
    public decimal? OldBaseSalary { get; set; }
    public decimal? NewBaseSalary { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public PromotionStatus Status { get; set; } = PromotionStatus.Pending;
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }

    // Workflow integration
    public long? WorkflowInstanceId { get; set; }
    public long? SubmittedByUserId { get; set; }

    // Navigation
    public Employee Employee { get; set; } = null!;
    public Department? OldDepartment { get; set; }
    public Department? NewDepartment { get; set; }
    public WorkflowInstance? WorkflowInstance { get; set; }
}
