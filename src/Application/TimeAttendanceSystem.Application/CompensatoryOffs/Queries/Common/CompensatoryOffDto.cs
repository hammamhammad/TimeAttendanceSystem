using TecAxle.Hrms.Domain.LeaveManagement;

namespace TecAxle.Hrms.Application.CompensatoryOffs.Queries.Common;

public class CompensatoryOffDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public DateTime EarnedDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string? ReasonAr { get; set; }
    public CompensatoryOffStatus Status { get; set; }
    public string StatusName { get; set; } = string.Empty;
    public long? UsedVacationId { get; set; }
    public decimal? HoursWorked { get; set; }
    public long? ApprovedByUserId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
