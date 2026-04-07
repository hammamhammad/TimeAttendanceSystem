using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Domain.Attendance;

namespace TecAxle.Hrms.Domain.Timesheets;

public class TimesheetEntry : BaseEntity
{
    public long TimesheetId { get; set; }
    public long ProjectId { get; set; }
    public long? ProjectTaskId { get; set; }
    public DateTime EntryDate { get; set; }
    public decimal Hours { get; set; }
    public decimal OvertimeHours { get; set; }
    public string? Notes { get; set; }
    public bool IsAutoPopulated { get; set; }
    public long? AttendanceRecordId { get; set; }

    // Navigation
    public Timesheet Timesheet { get; set; } = null!;
    public Project Project { get; set; } = null!;
    public ProjectTask? ProjectTask { get; set; }
    public AttendanceRecord? AttendanceRecord { get; set; }
}
