using MediatR;
using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.FinalSettlements.Queries.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.FinalSettlements.Queries.GetFinalSettlementByTermination;

[RequiresModule(SystemModule.Offboarding, AllowReadWhenDisabled = true)]
public record GetFinalSettlementByTerminationQuery(long TerminationId) : IRequest<Result<FinalSettlementDto>>;
