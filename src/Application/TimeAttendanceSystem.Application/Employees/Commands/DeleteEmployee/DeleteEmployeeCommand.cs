using MediatR;
using TimeAttendanceSystem.Application.Common;

namespace TimeAttendanceSystem.Application.Employees.Commands.DeleteEmployee;

/// <summary>
/// Command to delete an employee (soft-delete using IsDeleted flag)
/// </summary>
public record DeleteEmployeeCommand(long Id) : IRequest<Result<Unit>>;
