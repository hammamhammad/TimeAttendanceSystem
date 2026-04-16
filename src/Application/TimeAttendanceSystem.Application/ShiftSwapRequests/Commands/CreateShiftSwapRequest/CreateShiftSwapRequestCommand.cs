using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CreateShiftSwapRequest;

public record CreateShiftSwapRequestCommand(
    long SwapWithEmployeeId,
    DateTime OriginalDate,
    DateTime SwapDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result<long>>;
