using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeePromotions.Queries.Common;

public class EmployeePromotionDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string OldJobTitle { get; set; } = string.Empty;
    public string NewJobTitle { get; set; } = string.Empty;
    public string? OldJobTitleAr { get; set; }
    public string? NewJobTitleAr { get; set; }
    public string? OldGrade { get; set; }
    public string? NewGrade { get; set; }
    public long? OldDepartmentId { get; set; }
    public string? OldDepartmentName { get; set; }
    public long? NewDepartmentId { get; set; }
    public string? NewDepartmentName { get; set; }
    public decimal? OldBaseSalary { get; set; }
    public decimal? NewBaseSalary { get; set; }
    public DateTime RequestDate { get; set; }
    public DateTime EffectiveDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public PromotionStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }
    public long? SubmittedByUserId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
