using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeContracts.Queries.GetEmployeeContracts;

public record GetEmployeeContractsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    ContractStatus? Status = null,
    int? ExpiringWithinDays = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
