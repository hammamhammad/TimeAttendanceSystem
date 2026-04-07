using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerApproveShiftSwap;

[RequiresModule(SystemModule.ShiftSwaps)]
public record PartnerApproveShiftSwapCommand(long Id) : ICommand<Result>;
