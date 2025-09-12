using TimeAttendanceSystem.Domain.Common;
using TimeAttendanceSystem.Domain.Employees;

namespace TimeAttendanceSystem.Domain.Branches;

public class Department : BaseEntity
{
    public long BranchId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? NameAr { get; set; }
    public string? Description { get; set; }
    public string? DescriptionAr { get; set; }
    public long? ParentDepartmentId { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public string? CostCenter { get; set; }
    public string? Location { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public Branch Branch { get; set; } = null!;
    public Department? ParentDepartment { get; set; }
    public ICollection<Department> SubDepartments { get; set; } = new List<Department>();
    public ICollection<Employee> Employees { get; set; } = new List<Employee>();
}