using TimeAttendanceSystem.Domain.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployeeById;

public class EmployeeDetailDto
{
    public long Id { get; set; }
    public long BranchId { get; set; }
    public string BranchName { get; set; } = string.Empty;
    public string BranchCode { get; set; } = string.Empty;
    public string EmployeeNumber { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FirstNameAr { get; set; } = string.Empty;
    public string LastNameAr { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public string FullNameAr => $"{FirstNameAr} {LastNameAr}";
    public string? NationalId { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public Gender? Gender { get; set; }
    public DateTime? HireDate { get; set; }
    public EmploymentStatus EmploymentStatus { get; set; }
    public string? JobTitle { get; set; }
    public string? JobTitleAr { get; set; }
    public long? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public long? ManagerEmployeeId { get; set; }
    public string? ManagerName { get; set; }
    public string? ManagerEmployeeNumber { get; set; }
    public WorkLocationType WorkLocationType { get; set; }
    public string? PhotoUrl { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public DateTime? ModifiedAtUtc { get; set; }
    public string? CreatedBy { get; set; }
    public string? ModifiedBy { get; set; }
    
    public LinkedUserDto? LinkedUser { get; set; }
    public List<EmployeeDto> DirectReports { get; set; } = new();
}

public class LinkedUserDto
{
    public long UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}

public class EmployeeDto
{
    public long Id { get; set; }
    public string EmployeeNumber { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? JobTitle { get; set; }
}