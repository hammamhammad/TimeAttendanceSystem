using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.DeleteEmployee;

public record DeleteEmployeeCommand(long EmployeeId) : IRequest<Result<Unit>>;