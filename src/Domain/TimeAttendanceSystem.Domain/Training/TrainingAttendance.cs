using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Employees;

namespace TecAxle.Hrms.Domain.Training;

public class TrainingAttendance : BaseEntity
{
    public long TrainingSessionId { get; set; }
    public long EmployeeId { get; set; }
    public DateTime AttendanceDate { get; set; }
    public TrainingAttendanceStatus Status { get; set; } = TrainingAttendanceStatus.Present;
    public TimeSpan? CheckInTime { get; set; }
    public TimeSpan? CheckOutTime { get; set; }
    public string? Notes { get; set; }

    // Navigation
    public TrainingSession Session { get; set; } = null!;
    public Employee Employee { get; set; } = null!;
}
