using MediatR;
using TimeAttendanceSystem.Application.Common;
using TimeAttendanceSystem.Application.Departments.Queries.GetDepartments;

namespace TimeAttendanceSystem.Application.Departments.Queries.GetDepartmentById;

public record GetDepartmentByIdQuery(long Id) : IRequest<Result<DepartmentDto>>;