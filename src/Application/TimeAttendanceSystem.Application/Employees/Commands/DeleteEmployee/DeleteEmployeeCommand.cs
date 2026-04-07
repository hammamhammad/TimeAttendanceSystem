using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Employees.Commands.DeleteEmployee;

/// <summary>
/// Command to delete an employee (soft-delete using IsDeleted flag)
/// </summary>
public record DeleteEmployeeCommand(long Id) : IRequest<Result<Unit>>;
