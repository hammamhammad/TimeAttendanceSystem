using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;

public record GetDepartmentsQuery(
    long? BranchId = null,
    bool IncludeTree = false,
    bool? IsActive = null,
    string? Search = null,
    long? ParentDepartmentId = null,
    bool IncludeInactive = false
) : IRequest<Result<List<DepartmentDto>>>;