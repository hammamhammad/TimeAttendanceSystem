using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.FinalSettlements.Commands.ApproveFinalSettlement;

[RequiresModule(SystemModule.Offboarding)]
public record ApproveFinalSettlementCommand(long TerminationRecordId) : ICommand<Result>;
