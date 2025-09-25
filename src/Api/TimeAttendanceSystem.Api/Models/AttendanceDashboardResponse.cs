namespace TimeAttendanceSystem.Api.Models;

public class AttendanceDashboardResponse
{
    public AttendanceStatisticsResponse TodayStats { get; set; } = new();
    public List<DailyStatisticsResponse> WeeklyTrend { get; set; } = new();
    public List<AttendanceRecordResponse> IncompleteRecords { get; set; } = new();
    public List<RecentTransactionResponse> RecentTransactions { get; set; } = new();
}

public class DailyStatisticsResponse
{
    public DateTime Date { get; set; }
    public int TotalEmployees { get; set; }
    public int PresentEmployees { get; set; }
    public int AbsentEmployees { get; set; }
    public int LateEmployees { get; set; }
}

public class RecentTransactionResponse
{
    public long Id { get; set; }
    public long EmployeeId { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string EmployeeName { get; set; } = string.Empty;
    public int TransactionType { get; set; }
    public string TransactionTypeText { get; set; } = string.Empty;
    public DateTime TransactionTimeUtc { get; set; }
    public DateTime TransactionTimeLocal { get; set; }
    public bool IsManual { get; set; }
    public string? EnteredByUserName { get; set; }
    public string? Notes { get; set; }
    public string? Location { get; set; }
    public string? DeviceId { get; set; }
}

public class AttendanceStatisticsResponse
{
    public int TotalEmployees { get; set; }
    public int PresentEmployees { get; set; }
    public int AbsentEmployees { get; set; }
    public int LateEmployees { get; set; }
    public int OvertimeEmployees { get; set; }
    public double AverageWorkingHours { get; set; }
    public double TotalOvertimeHours { get; set; }
    public double AttendanceRate { get; set; }
    public DateRangePeriod Period { get; set; } = new();
}

public class DateRangePeriod
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}