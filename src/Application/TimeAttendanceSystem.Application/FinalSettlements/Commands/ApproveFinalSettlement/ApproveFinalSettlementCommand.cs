using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.ApproveFinalSettlement;

public record ApproveFinalSettlementCommand(long TerminationRecordId) : ICommand<Result>;
