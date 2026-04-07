using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;
using TecAxle.Hrms.Domain.Shifts;

namespace TecAxle.Hrms.Domain.Attendance;

public class OnCallSchedule : BaseEntity
{
    public long EmployeeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public OnCallType OnCallType { get; set; }
    public long? ShiftId { get; set; }
    public string? Notes { get; set; }
    public string? NotesAr { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public Employee Employee { get; set; } = null!;
    public Shift? Shift { get; set; }
}
