namespace TimeAttendanceSystem.Application.Branches.Queries.GetBranches;

public class BranchDto
{
    public long Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string TimeZone { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public int EmployeeCount { get; set; }
    public int DepartmentCount { get; set; }
    public DateTime CreatedAtUtc { get; set; }
}