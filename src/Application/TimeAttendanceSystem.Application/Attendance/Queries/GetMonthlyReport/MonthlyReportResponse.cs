namespace TimeAttendanceSystem.Application.Attendance.Queries.GetMonthlyReport;

public class MonthlyReportResponse
{
    public MonthlyReportPeriod Period { get; set; } = null!;
    public MonthlyReportSummary Summary { get; set; } = null!;
    public MonthlyReportStatistics SummaryStatistics { get; set; } = null!;
    public List<MonthlyEmployeeRecord> EmployeeRecords { get; set; } = new();
    public List<DailyBreakdown> DailyBreakdown { get; set; } = new();
}

public class MonthlyReportPeriod
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}

public class MonthlyReportSummary
{
    public int TotalEmployees { get; set; }
    public int TotalWorkingDays { get; set; }
    public int TotalPresentDays { get; set; }
    public int TotalAbsentDays { get; set; }
}

public class MonthlyReportStatistics
{
    public int TotalEmployees { get; set; }
    public int TotalPresentDays { get; set; }
    public int TotalAbsentDays { get; set; }
    public int TotalLateDays { get; set; }
    public int TotalOvertimeDays { get; set; }
    public decimal TotalOvertimeHours { get; set; }
    public decimal AverageWorkingHours { get; set; }
    public decimal AverageAttendanceRate { get; set; }
    public int PerfectAttendanceEmployees { get; set; }
}

public class MonthlyEmployeeRecord
{
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string? Branch { get; set; }
    public int TotalWorkingDays { get; set; }
    public int PresentDays { get; set; }
    public int AbsentDays { get; set; }
    public int LateDays { get; set; }
    public int OvertimeDays { get; set; }
    public decimal TotalWorkingHours { get; set; }
    public decimal TotalOvertimeHours { get; set; }
    public decimal AttendanceRate { get; set; }
    public bool PerfectAttendance { get; set; }
}

public class DailyBreakdown
{
    public DateTime Date { get; set; }
    public int PresentEmployees { get; set; }
    public int AbsentEmployees { get; set; }
    public int LateEmployees { get; set; }
    public decimal TotalOvertimeHours { get; set; }
}