using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Departments.Queries.GetDepartments;

namespace TecAxle.Hrms.Application.Departments.Queries.GetDepartmentById;

public record GetDepartmentByIdQuery(long Id) : IRequest<Result<DepartmentDto>>;