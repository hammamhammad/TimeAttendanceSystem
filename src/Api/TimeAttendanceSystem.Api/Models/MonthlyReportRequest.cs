namespace TimeAttendanceSystem.Api.Models;

public class MonthlyReportRequest
{
    public int Month { get; set; }
    public int Year { get; set; }
    public List<int>? BranchIds { get; set; }
    public List<int>? DepartmentIds { get; set; }
    public List<int>? EmployeeIds { get; set; }
}