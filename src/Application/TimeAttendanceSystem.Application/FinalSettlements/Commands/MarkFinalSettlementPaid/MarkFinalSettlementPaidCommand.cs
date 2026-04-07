using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.MarkFinalSettlementPaid;

[RequiresModule(SystemModule.Offboarding)]
public record MarkFinalSettlementPaidCommand(long TerminationRecordId) : ICommand<Result>;
