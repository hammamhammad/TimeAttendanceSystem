using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.EmployeeTransfers.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransferById;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetEmployeeTransferByIdQuery(long Id) : IRequest<Result<EmployeeTransferDto>>;
