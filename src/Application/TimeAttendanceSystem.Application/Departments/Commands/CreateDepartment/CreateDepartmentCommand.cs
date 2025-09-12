using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Commands.CreateDepartment;

public record CreateDepartmentCommand(
    long BranchId,
    string Code,
    string Name,
    string? NameAr,
    string? Description,
    string? DescriptionAr,
    long? ParentDepartmentId,
    long? ManagerEmployeeId,
    string? CostCenter,
    string? Location,
    string? Phone,
    string? Email,
    int SortOrder = 0,
    bool IsActive = true
) : ICommand<Result<long>>;