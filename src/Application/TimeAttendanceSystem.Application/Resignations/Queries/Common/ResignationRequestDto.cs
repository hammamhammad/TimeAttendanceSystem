using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Queries.Common;

public class ResignationRequestDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public DateTime ResignationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public int NoticePeriodDays { get; set; }
    public int WaivedNoticeDays { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public ResignationStatus Status { get; set; }
    public string? RejectionReason { get; set; }
    public long? ApprovedByUserId { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public string? Notes { get; set; }
    public long? SubmittedByUserId { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
