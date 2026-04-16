using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.MarkFinalSettlementPaid;

public record MarkFinalSettlementPaidCommand(long TerminationRecordId) : ICommand<Result>;
