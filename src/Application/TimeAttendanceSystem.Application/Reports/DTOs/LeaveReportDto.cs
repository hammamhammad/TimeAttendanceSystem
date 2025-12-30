using TimeAttendanceSystem.Application.Reports.Queries;

namespace TimeAttendanceSystem.Application.Reports.DTOs;

public class LeaveReportItem
{
    public long EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string DepartmentName { get; set; } = string.Empty;
    public string LeaveType { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int TotalDays { get; set; }
    public string Status { get; set; } = string.Empty; // Approved, Pending, Rejected
    public string Reason { get; set; } = string.Empty;
}

public class LeaveReportSummary
{
    public ReportFilter Filter { get; set; } = new();
    public List<LeaveReportItem> Items { get; set; } = new();
    public int TotalRequests { get; set; }
    public int TotalApprovedDays { get; set; }
}
