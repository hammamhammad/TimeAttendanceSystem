using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.FinalSettlements.Queries.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlementByTermination;

public record GetFinalSettlementByTerminationQuery(long TerminationId) : IRequest<Result<FinalSettlementDto>>;
