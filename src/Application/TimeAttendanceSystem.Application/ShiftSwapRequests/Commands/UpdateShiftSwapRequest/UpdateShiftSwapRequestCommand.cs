using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.UpdateShiftSwapRequest;

[RequiresModule(SystemModule.ShiftSwaps)]
public record UpdateShiftSwapRequestCommand(
    long Id,
    DateTime SwapDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result>;
