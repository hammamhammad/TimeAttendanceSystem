using TimeAttendanceSystem.Domain.Excuses;

namespace TimeAttendanceSystem.Application.Excuses.Queries.GetEmployeeExcuseById;

public class EmployeeExcuseDetailDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string BranchName { get; set; } = string.Empty;
    public DateTime ExcuseDate { get; set; }
    public ExcuseType ExcuseType { get; set; }
    public string ExcuseTypeDisplay { get; set; } = string.Empty;
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public double DurationHours { get; set; }
    public string Reason { get; set; } = string.Empty;
    public ApprovalStatus ApprovalStatus { get; set; }
    public string ApprovalStatusDisplay { get; set; } = string.Empty;
    public string? AttachmentUrl { get; set; }
    public string? ReviewerComments { get; set; }
    public long? ReviewedByUserId { get; set; }
    public string? ReviewerName { get; set; }
    public DateTime? ReviewedAtUtc { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? UpdatedAtUtc { get; set; }
}