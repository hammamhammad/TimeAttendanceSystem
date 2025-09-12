using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Queries.GetEmployeeById;

public record GetEmployeeByIdQuery(long EmployeeId) : IRequest<Result<EmployeeDetailDto>>;