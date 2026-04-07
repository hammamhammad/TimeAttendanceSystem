using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContracts;

[RequiresModule(SystemModule.EmployeeLifecycle, AllowReadWhenDisabled = true)]
public record GetEmployeeContractsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    ContractStatus? Status = null,
    int? ExpiringWithinDays = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
