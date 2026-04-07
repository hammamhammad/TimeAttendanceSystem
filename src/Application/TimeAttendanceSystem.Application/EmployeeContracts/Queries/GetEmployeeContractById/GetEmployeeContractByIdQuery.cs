using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeContracts.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContractById;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetEmployeeContractByIdQuery(long Id) : IRequest<Result<EmployeeContractDto>>;
