using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.EmployeeTransfers.Queries.GetEmployeeTransfers;

public record GetEmployeeTransfersQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    TransferStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
