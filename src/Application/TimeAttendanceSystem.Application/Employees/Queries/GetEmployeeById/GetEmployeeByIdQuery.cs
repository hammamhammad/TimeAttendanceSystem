using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Employees.Queries.GetEmployeeById;

public record GetEmployeeByIdQuery(long EmployeeId) : IRequest<Result<EmployeeDetailDto>>;