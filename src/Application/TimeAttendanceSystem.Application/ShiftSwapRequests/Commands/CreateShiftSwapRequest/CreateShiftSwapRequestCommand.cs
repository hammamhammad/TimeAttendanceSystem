using TecAxle.Hrms.Application.Common;
using TecAxle.Hrms.Application.Common.Behaviors;
using TecAxle.Hrms.Domain.Modules;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CreateShiftSwapRequest;

[RequiresModule(SystemModule.ShiftSwaps)]
public record CreateShiftSwapRequestCommand(
    long SwapWithEmployeeId,
    DateTime OriginalDate,
    DateTime SwapDate,
    string? Reason,
    string? ReasonAr
) : ICommand<Result<long>>;
