using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Terminations.Queries.Common;

public class TerminationRecordDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public TerminationType TerminationType { get; set; }
    public DateTime TerminationDate { get; set; }
    public DateTime LastWorkingDate { get; set; }
    public string? Reason { get; set; }
    public string? ReasonAr { get; set; }
    public long? ResignationRequestId { get; set; }
    public long? ProcessedByUserId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
