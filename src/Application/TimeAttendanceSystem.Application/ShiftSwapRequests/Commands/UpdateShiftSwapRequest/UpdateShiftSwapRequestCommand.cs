using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.UpdateShiftSwapRequest;

public record UpdateShiftSwapRequestCommand(
    long Id,
    DateTime SwapDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result>;
