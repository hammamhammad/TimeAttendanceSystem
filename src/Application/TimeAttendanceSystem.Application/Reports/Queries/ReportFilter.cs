namespace TimeAttendanceSystem.Application.Reports.Queries;

public class ReportFilter
{
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }
    public long? BranchId { get; set; }
    public long? DepartmentId { get; set; }
    public long? EmployeeId { get; set; }
}
