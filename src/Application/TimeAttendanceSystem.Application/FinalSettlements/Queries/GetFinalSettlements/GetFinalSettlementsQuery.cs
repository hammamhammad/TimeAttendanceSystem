using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Domain.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlements;

public record GetFinalSettlementsQuery(
    long? BranchId = null,
    SettlementStatus? Status = null,
    int Page = 1,
    int PageSize = 20
) : IRequest<Result<object>>;
