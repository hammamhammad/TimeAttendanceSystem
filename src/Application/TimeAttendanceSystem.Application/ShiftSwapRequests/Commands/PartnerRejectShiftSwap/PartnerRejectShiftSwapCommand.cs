using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.PartnerRejectShiftSwap;

[RequiresModule(SystemModule.ShiftSwaps)]
public record PartnerRejectShiftSwapCommand(long Id, string? RejectionReason) : ICommand<Result>;
