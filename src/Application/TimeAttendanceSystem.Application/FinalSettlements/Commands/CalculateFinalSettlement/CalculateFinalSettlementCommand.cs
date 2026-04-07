using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.CalculateFinalSettlement;

[RequiresModule(SystemModule.Offboarding)]
public record CalculateFinalSettlementCommand(long TerminationRecordId) : ICommand<Result<long>>;
