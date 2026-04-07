using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Application.OnCallSchedules.Queries.Common;

public class OnCallScheduleDto
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string? EmployeeNameAr { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string? BranchName { get; set; }
    public string? DepartmentName { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public OnCallType OnCallType { get; set; }
    public string OnCallTypeName { get; set; } = string.Empty;
    public long? ShiftId { get; set; }
    public string? ShiftName { get; set; }
    public string? Notes { get; set; }
    public string? NotesAr { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}
