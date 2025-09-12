using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Commands.UpdateDepartment;

public record UpdateDepartmentCommand(
    long Id,
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
    int SortOrder,
    bool IsActive
) : ICommand<Result>;