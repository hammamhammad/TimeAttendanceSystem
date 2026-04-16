using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.CalculateFinalSettlement;

public record CalculateFinalSettlementCommand(long TerminationRecordId) : ICommand<Result<long>>;
