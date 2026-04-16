using TecAxle.Hrms.Application.Common;

namespace TecAxle.Hrms.Application.ShiftSwapRequests.Commands.CancelShiftSwapRequest;

public record CancelShiftSwapRequestCommand(long Id) : ICommand<Result>;
