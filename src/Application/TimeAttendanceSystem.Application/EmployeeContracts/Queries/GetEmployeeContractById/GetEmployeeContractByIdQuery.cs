using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContractById;

public record GetEmployeeContractByIdQuery(long Id) : IRequest<Result<EmployeeContractDto>>;
