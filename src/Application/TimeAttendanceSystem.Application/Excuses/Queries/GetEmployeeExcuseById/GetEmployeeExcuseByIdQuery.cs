using MediatR;
using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.Excuses.Queries.GetEmployeeExcuseById;

public record GetEmployeeExcuseByIdQuery(long Id) : IRequest<Result<EmployeeExcuseDetailDto>>;