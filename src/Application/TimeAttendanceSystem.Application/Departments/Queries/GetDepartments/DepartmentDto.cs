namespace TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;

public class DepartmentDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? ParentDepartmentId { get; set; }
    public string? ParentDepartmentName { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public string? ManagerName { get; set; }
    public string? CostCenter { get; set; }
    public string? Location { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public int EmployeeCount { get; set; }
    public int Level { get; set; }
    public string Path { get; set; } = string.Empty; // Full hierarchy path
    public bool HasChildren { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    
    public List<DepartmentDto> Children { get; set; } = new();
}