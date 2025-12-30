using TimeAttendanceSystem.Application.Reports.Queries;

namespace TimeAttendanceSystem.Application.Reports.DTOs;

public class AttendanceReportItem
{
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string ShiftName { get; set; } = string.Empty;
    public TimeSpan? CheckIn { get; set; }
    public TimeSpan? CheckOut { get; set; }
    public string Status { get; set; } = string.Empty; // Present, Absent, Late, OnLeave
    public double WorkedHours { get; set; }
    public int LateMinutes { get; set; }
    public int OvertimeMinutes { get; set; }
    public bool IsRegularHoliday { get; set; }
    public bool IsPublicHoliday { get; set; }
    
    // Weekly stats
    public double WeeklyTotalHours { get; set; }
    public double WeeklyRequiredHours { get; set; }
    public double WeeklyOvertimeHours { get; set; }
    public double WeeklyShortageHours { get; set; }
}

public class AttendanceReportSummary
{
    public ReportFilter Filter { get; set; } = new();
    public List<AttendanceReportItem> Items { get; set; } = new();
    public int TotalDays { get; set; }
    public int TotalPresent { get; set; }
    public int TotalAbsent { get; set; }
    public int TotalLate { get; set; }
    public int TotalLeaves { get; set; }
}
