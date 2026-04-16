using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.Resignations.Queries.GetResignationRequests;

public record GetResignationRequestsQuery(
    long? EmployeeId = null,
    long? BranchId = null,
    ResignationStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
